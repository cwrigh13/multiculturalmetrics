// Program analytics module: descriptive activity data, not benchmark scores.
// Renders summary figures, filters and two bar-in-table breakdowns (inline bar, monthly
// sparkline, total) into the "Program analytics" region. Takes rows already validated by validate.js.
// Computation functions are pure and exported; rendering uses DOM APIs only (no innerHTML).

const SVG_NS = 'http://www.w3.org/2000/svg';
const ANY = ''; // filter value meaning "no restriction"

// ---------- Pure computation ----------

// Australian financial year a YYYY-MM-DD date falls in, by its starting year (July to June).
export function financialYearStart(isoDate) {
  const year = Number(isoDate.slice(0, 4));
  const month = Number(isoDate.slice(5, 7));
  return month >= 7 ? year : year - 1;
}

export function financialYearLabel(startYear) {
  const end = String((startYear + 1) % 100).padStart(2, '0');
  return `${startYear}-${end} financial year (1 Jul ${startYear} to 30 Jun ${startYear + 1})`;
}

// Distinct values of a field present in the rows, sorted alphabetically.
export function distinctValues(rows, field) {
  return [...new Set(rows.map((r) => r[field]))].sort((a, b) => a.localeCompare(b, 'en-AU'));
}

// Period options present in the data: financial years, most recent first.
export function periodOptions(rows) {
  const starts = [...new Set(rows.map((r) => financialYearStart(r.date)))].sort((a, b) => b - a);
  return starts.map((start) => ({ value: `fy${start}`, label: financialYearLabel(start) }));
}

// Applies filters in the fixed order: community, then suburb, then period.
export function filterPrograms(rows, { community = ANY, suburb = ANY, period = ANY } = {}) {
  let out = rows;
  if (community !== ANY) out = out.filter((r) => r.target_community === community);
  if (suburb !== ANY) out = out.filter((r) => r.suburb === suburb);
  if (period !== ANY) {
    const start = Number(period.slice(2));
    out = out.filter((r) => financialYearStart(r.date) === start);
  }
  return out;
}

// The four summary values. averageAttendance is null when there are no programs.
export function summarise(rows) {
  const totalPrograms = rows.length;
  const totalAttendance = rows.reduce((sum, r) => sum + r.attendance, 0);
  const totalNewMembers = rows.reduce((sum, r) => sum + r.new_members, 0);
  const averageAttendance = totalPrograms === 0 ? null : totalAttendance / totalPrograms;
  return { totalPrograms, totalAttendance, totalNewMembers, averageAttendance };
}

// Total attendance grouped by a field, largest first (ties alphabetical).
export function attendanceBy(rows, field) {
  const totals = new Map();
  for (const r of rows) totals.set(r[field], (totals.get(r[field]) || 0) + r.attendance);
  return [...totals]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, 'en-AU'));
}

// Every calendar month (YYYY-MM) from the earliest to the latest month present in the rows.
export function monthRange(rows) {
  if (rows.length === 0) return [];
  const keys = rows.map((r) => r.date.slice(0, 7)).sort();
  let [year, month] = keys[0].split('-').map(Number);
  const [endYear, endMonth] = keys[keys.length - 1].split('-').map(Number);
  const out = [];
  while (year < endYear || (year === endYear && month <= endMonth)) {
    out.push(`${year}-${String(month).padStart(2, '0')}`);
    month += 1;
    if (month > 12) { month = 1; year += 1; }
  }
  return out;
}

// Monthly attendance per category over monthRange(rows). Months with no programs are 0.
// Returns { months: ['YYYY-MM', ...], series: Map(category -> [attendance per month]) }.
export function monthlyAttendanceBy(rows, field) {
  const months = monthRange(rows);
  const index = new Map(months.map((m, i) => [m, i]));
  const series = new Map();
  for (const r of rows) {
    if (!series.has(r[field])) series.set(r[field], months.map(() => 0));
    series.get(r[field])[index.get(r.date.slice(0, 7))] += r.attendance;
  }
  return { months, series };
}

// ---------- Formatting ----------

const integerFormat = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 0 });
const averageFormat = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 1 });

function formatInteger(n) {
  return integerFormat.format(n);
}

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function monthName(key) {
  return MONTH_ABBR[Number(key.slice(5, 7)) - 1];
}

// "Jul to Nov 2025", "Jul 2025 to Jun 2026", or "Mar 2026" for a single month.
export function monthRangeLabel(months) {
  if (months.length === 0) return '';
  const first = months[0];
  const last = months[months.length - 1];
  const firstYear = first.slice(0, 4);
  const lastYear = last.slice(0, 4);
  if (first === last) return `${monthName(first)} ${firstYear}`;
  if (firstYear === lastYear) return `${monthName(first)} to ${monthName(last)} ${lastYear}`;
  return `${monthName(first)} ${firstYear} to ${monthName(last)} ${lastYear}`;
}

// ---------- DOM helpers ----------

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  }
  node.append(...children);
  return node;
}

function svgEl(tag, attrs = {}, text) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text !== undefined) node.textContent = text;
  return node;
}

function selectControl(id, labelText, anyLabel, options) {
  const select = el('select', { id, name: id });
  select.append(el('option', { value: ANY, text: anyLabel }));
  for (const opt of options) select.append(el('option', { value: opt.value, text: opt.label }));
  const wrapper = el('div', { class: 'filter' }, el('label', { for: id, text: labelText }), select);
  return { wrapper, select };
}

// ---------- Bar-in-table ----------
// One table per breakdown is both the chart and its text alternative: category, an inline
// bar (scaled to the largest row in the current set), a monthly sparkline (scaled to its own
// row) and the total. The top row's bar and total are accented as the focal point.

// Row geometry for sparklines, in SVG user units.
const SPARK_WIDTH = 96;
const SPARK_HEIGHT = 22;
const SPARK_PAD = 3; // keeps the end dot and stroke inside the box

function sparklineSvg(values, ariaLabel) {
  const svg = svgEl('svg', {
    class: 'sparkline',
    viewBox: `0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`,
    width: SPARK_WIDTH,
    height: SPARK_HEIGHT,
    role: 'img',
    'aria-label': ariaLabel,
    focusable: 'false',
  });
  const max = Math.max(0, ...values);
  const innerW = SPARK_WIDTH - SPARK_PAD * 2;
  const innerH = SPARK_HEIGHT - SPARK_PAD * 2;
  const points = values.map((v, i) => {
    const x = values.length === 1 ? SPARK_WIDTH / 2 : SPARK_PAD + (i / (values.length - 1)) * innerW;
    const y = SPARK_PAD + innerH - (max === 0 ? 0 : (v / max) * innerH);
    return [x.toFixed(2), y.toFixed(2)];
  });
  if (points.length > 1) {
    svg.append(svgEl('polyline', {
      class: 'sparkline-line',
      points: points.map((pt) => pt.join(',')).join(' '),
    }));
  }
  const [lastX, lastY] = points[points.length - 1];
  svg.append(svgEl('circle', { class: 'sparkline-end', cx: lastX, cy: lastY, r: 2.25 }));
  return svg;
}

function barInTable({ heading, categoryHeading, data, monthly }) {
  const range = monthRangeLabel(monthly.months);
  const caption = `${heading}, current filters, largest first. Bars are scaled to the largest total. Monthly lines cover ${range}, each scaled to its own row's peak.`;
  const max = Math.max(0, ...data.map((d) => d.value));

  const table = el('table', { class: 'data-table bar-table' });
  table.append(el('caption', { text: caption }));
  table.append(el('thead', {}, el('tr', {},
    el('th', { scope: 'col', text: categoryHeading }),
    el('th', { scope: 'col', text: 'Relative size' }),
    el('th', { scope: 'col', text: 'Monthly' }),
    el('th', { scope: 'col', class: 'num', text: 'Total' }))));

  const tbody = el('tbody');
  data.forEach((d, i) => {
    const isFocus = i === 0 && d.value > 0; // exactly one accented row: the largest
    const share = max === 0 ? 0 : d.value / max;
    const percent = Math.round(share * 100);
    const values = monthly.series.get(d.label) || monthly.months.map(() => 0);

    const bar = el('span', { class: 'inline-bar-track', 'aria-hidden': 'true' },
      el('span', { class: 'inline-bar', style: `width: ${(share * 100).toFixed(2)}%` }));
    const barText = el('span', {
      class: 'visually-hidden',
      text: isFocus ? `${percent}% of largest (largest)` : `${percent}% of largest`,
    });

    tbody.append(el('tr', isFocus ? { class: 'is-focus' } : {},
      el('th', { scope: 'row', text: d.label }),
      el('td', { class: 'bar-cell' }, bar, barText),
      el('td', { class: 'spark-cell' },
        sparklineSvg(values, `Monthly attendance ${range}: ${values.map(formatInteger).join(', ')}`)),
      el('td', { class: 'num', text: formatInteger(d.value) })));
  });
  table.append(tbody);
  return el('div', { class: 'table-scroll' }, table);
}

function renderBreakdown(container, { id, heading, categoryHeading, data, monthly }) {
  container.replaceChildren(el('h3', { id: `${id}-heading`, text: heading }));
  if (data.length === 0) {
    container.append(el('p', { text: 'No programs match the current filters.' }));
    return;
  }
  container.append(barInTable({
    heading,
    categoryHeading,
    data,
    monthly,
  }));
}

// ---------- Summary ----------

function renderSummary(dl, s) {
  const items = [
    ['Total programs', formatInteger(s.totalPrograms)],
    ['Total attendance', formatInteger(s.totalAttendance)],
    ['Average attendance per program', s.averageAttendance === null ? null : averageFormat.format(s.averageAttendance)],
  ];
  dl.replaceChildren();
  for (const [label, value] of items) {
    const dd = el('dd');
    if (value === null) {
      dd.append(
        el('span', { 'aria-hidden': 'true', text: '—' }),
        el('span', { class: 'visually-hidden', text: 'Not available: no programs match' }),
      );
    } else {
      dd.textContent = value;
    }
    dl.append(el('div', { class: 'summary-item' }, el('dt', { text: label }), dd));
  }
}

// ---------- Public entry points ----------

// Renders the module into the analytics region. programs: validated rows.
// errors: load/validation errors for programs.csv, shown as text.
export function renderAnalytics(region, programs, errors = []) {
  const root = el('div', { class: 'analytics' });

  root.append(el('p', {
    class: 'module-note',
    text: 'Descriptive activity data from programs.csv. These figures are not benchmark scores and do not measure benchmark maturity.',
  }));

  if (errors.length) {
    const list = el('ul');
    for (const e of errors) list.append(el('li', { text: e.message }));
    root.append(el('div', { class: 'load-errors' },
      el('h3', { text: `Data problems: ${errors.length} ${errors.length === 1 ? 'issue' : 'issues'} in programs.csv (affected rows are excluded)` }),
      list));
  }

  const community = selectControl('filter-community', 'Target community', 'All programs',
    distinctValues(programs, 'target_community').map((v) => ({ value: v, label: v })));
  const suburb = selectControl('filter-suburb', 'Branch', 'All branches',
    distinctValues(programs, 'suburb').map((v) => ({ value: v, label: v })));
  const period = selectControl('filter-period', 'Time period', 'Any period', periodOptions(programs));

  const form = el('form', { class: 'filters' },
    el('fieldset', {}, el('legend', { text: 'Filter programs' }),
      community.wrapper, suburb.wrapper, period.wrapper));
  form.addEventListener('submit', (event) => event.preventDefault());

  const status = el('p', { class: 'filter-status', role: 'status', 'aria-live': 'polite' });
  const summary = el('dl', { class: 'summary' });
  const byCommunity = el('div', { class: 'chart' });
  const byType = el('div', { class: 'chart' });

  root.append(
    form,
    status,
    el('h3', { text: 'Summary' }),
    summary,
    el('div', { class: 'charts' }, byCommunity, byType),
  );

  function update() {
    const filtered = filterPrograms(programs, {
      community: community.select.value,
      suburb: suburb.select.value,
      period: period.select.value,
    });
    status.textContent = `Showing ${filtered.length} of ${programs.length} programs.`;
    renderSummary(summary, summarise(filtered));
    renderBreakdown(byCommunity, {
      id: 'chart-community', heading: 'Attendance by target community',
      categoryHeading: 'Target community', data: attendanceBy(filtered, 'target_community'),
      monthly: monthlyAttendanceBy(filtered, 'target_community'),
    });
    renderBreakdown(byType, {
      id: 'chart-type', heading: 'Attendance by program type',
      categoryHeading: 'Program type', data: attendanceBy(filtered, 'program_type'),
      monthly: monthlyAttendanceBy(filtered, 'program_type'),
    });
  }

  form.addEventListener('change', update);
  update();
  region.append(root);
}

// Shown when the data could not be loaded at all.
export function renderAnalyticsFailure(region, message) {
  region.append(el('p', { class: 'load-errors', text: `Program data could not be loaded: ${message}` }));
}
