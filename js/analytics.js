// Program analytics module: descriptive activity data, not benchmark scores.
// Renders summary figures, filters and two inline SVG bar charts (each with a data table)
// into the "Program analytics" region. Takes rows already validated by validate.js.
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

// ---------- Formatting ----------

const integerFormat = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 0 });
const averageFormat = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 1 });

function formatInteger(n) {
  return integerFormat.format(n);
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

// ---------- Chart and table ----------

// Horizontal bar chart: category label above each bar, numeric value at the bar's end.
export function barChartSvg({ id, title, desc, data }) {
  const width = 260;
  const labelHeight = 16;
  const barHeight = 18;
  const rowGap = 10;
  const valueSpace = 48;
  const rowHeight = labelHeight + barHeight + rowGap;
  const height = data.length * rowHeight;
  const max = Math.max(0, ...data.map((d) => d.value));
  const maxBar = width - valueSpace;

  const svg = svgEl('svg', {
    class: 'bar-chart',
    viewBox: `0 0 ${width} ${height}`,
    role: 'img',
    'aria-labelledby': `${id}-title`,
    'aria-describedby': `${id}-desc`,
  });
  svg.append(svgEl('title', { id: `${id}-title` }, title));
  svg.append(svgEl('desc', { id: `${id}-desc` }, desc));

  data.forEach((d, i) => {
    const y = i * rowHeight;
    const barWidth = max === 0 ? 0 : (d.value / max) * maxBar;
    svg.append(svgEl('text', { x: 0, y: y + 12, class: 'bar-label' }, d.label));
    svg.append(svgEl('rect', {
      x: 0, y: y + labelHeight, width: barWidth.toFixed(2), height: barHeight, class: 'bar',
    }));
    svg.append(svgEl('text', {
      x: (barWidth + 6).toFixed(2), y: y + labelHeight + 13, class: 'bar-value',
    }, formatInteger(d.value)));
  });
  return svg;
}

function dataTable({ caption, categoryHeading, data }) {
  const table = el('table', { class: 'data-table' });
  table.append(el('caption', { text: caption }));
  table.append(el('thead', {}, el('tr', {},
    el('th', { scope: 'col', text: categoryHeading }),
    el('th', { scope: 'col', class: 'num', text: 'Attendance' }))));
  const tbody = el('tbody');
  for (const d of data) {
    tbody.append(el('tr', {},
      el('th', { scope: 'row', text: d.label }),
      el('td', { class: 'num', text: formatInteger(d.value) })));
  }
  table.append(tbody);
  return table;
}

function renderChart(container, { id, heading, categoryHeading, data }) {
  container.replaceChildren(el('h3', { id: `${id}-heading`, text: heading }));
  if (data.length === 0) {
    container.append(el('p', { text: 'No programs match the current filters.' }));
    return;
  }
  container.append(
    barChartSvg({
      id,
      title: heading,
      desc: `Bar chart of total attendance by ${categoryHeading.toLowerCase()} for the current filters. The same figures are in the table below.`,
      data,
    }),
    dataTable({ caption: `${heading} (table)`, categoryHeading, data }),
  );
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

  const community = selectControl('filter-community', 'Target community', 'Any community',
    distinctValues(programs, 'target_community').map((v) => ({ value: v, label: v })));
  const suburb = selectControl('filter-suburb', 'Suburb', 'Any suburb',
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
    renderChart(byCommunity, {
      id: 'chart-community', heading: 'Attendance by target community',
      categoryHeading: 'Target community', data: attendanceBy(filtered, 'target_community'),
    });
    renderChart(byType, {
      id: 'chart-type', heading: 'Attendance by program type',
      categoryHeading: 'Program type', data: attendanceBy(filtered, 'program_type'),
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
