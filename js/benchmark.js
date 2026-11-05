// Benchmark self-assessment module.
// Shows the recorded maturity level (1 to 5) and evidence note for each of the five
// SLNSW benchmark areas, and each area's level history where it has more than one dated row.
// A level is a recorded human judgement from benchmarks.csv. Nothing here computes a level,
// sets a numeric target, or reads program activity data.
// Computation functions are pure and exported; rendering uses DOM APIs only (no innerHTML).

const SVG_NS = 'http://www.w3.org/2000/svg';

// The five fixed areas, in SLNSW order. `key` is the value used in benchmarks.csv.
export const AREAS = [
  { key: 'Planning', number: 1, name: 'Planning for relevant library services' },
  { key: 'Organisational capacity', number: 2, name: 'Organisational capacity' },
  { key: 'Quality of service and collections', number: 3, name: 'Quality of service and collections' },
  { key: 'Promotions and delivery', number: 4, name: 'Promotions and delivery' },
  { key: 'Evaluation', number: 5, name: 'Evaluation' },
];

// Plain-English subtitle for each area, keyed by the area value used in benchmarks.csv.
// Fixed UI text, not data. An area not in this map shows no subtitle.
export const AREA_DESCRIPTIONS = {
  'Planning': 'How we plan services using community input and data.',
  'Organisational capacity': 'Our staff, training, policy and budget for CALD services.',
  'Quality of service and collections': 'The community-language books and services we actually provide.',
  'Promotions and delivery': 'How we promote services in community languages.',
  'Evaluation': 'How we check whether services are working, with community feedback.',
};

// SLNSW maturity level names.
export const LEVEL_NAMES = { 1: 'Entry', 2: 'Improving', 3: 'Average', 4: 'Enhanced', 5: 'Exemplary' };

export function levelText(level) {
  return `Level ${level} of 5 — ${LEVEL_NAMES[level]}`;
}

// ---------- Pure computation ----------

// Groups rows by area. Each area's history is sorted by assessment_date ascending;
// rows with the same date keep their file order, so the later row in the file counts as
// the more recent. current is the last history entry, or null if the area has no rows.
export function summariseAreas(rows) {
  return AREAS.map((area) => {
    const history = rows
      .map((row, index) => ({ row, index }))
      .filter(({ row }) => row.area === area.key)
      .sort((a, b) => a.row.assessment_date.localeCompare(b.row.assessment_date) || a.index - b.index)
      .map(({ row }) => row);
    return { ...area, history, current: history.length ? history[history.length - 1] : null };
  });
}

// ---------- Formatting ----------

const dateFormat = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
});

// DD/MM/YYYY, for chart axis labels where space is tight.
export function formatShortDate(isoDate) {
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

export function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return dateFormat.format(new Date(Date.UTC(y, m - 1, d)));
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

// ---------- Level indicator ----------

// Five numbered boxes; boxes up to the level are filled and the current one is outlined.
// Decorative: the adjacent text states the level, so this is hidden from assistive tech.
function levelScale(level) {
  const scale = el('span', { class: 'level-scale', 'aria-hidden': 'true' });
  for (let n = 1; n <= 5; n += 1) {
    const classes = ['level-step'];
    if (n <= level) classes.push('is-reached');
    if (n === level) classes.push('is-current');
    scale.append(el('span', { class: classes.join(' '), text: String(n) }));
  }
  return scale;
}

// ---------- History chart and table ----------

// Level plotted against assessment, points evenly spaced in date order.
// Each point carries its level number as a visible label.
export function historySvg({ id, areaName, history }) {
  const width = 240;
  const height = 170;
  const left = 40;
  const right = 38;
  const top = 26;
  const bottom = 34;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const y = (level) => top + ((5 - level) * plotH) / 4;
  const x = (i) => left + (history.length === 1 ? plotW / 2 : (i * plotW) / (history.length - 1));

  const pointsText = history
    .map((r) => `level ${r.level} (${LEVEL_NAMES[r.level]}) on ${formatDate(r.assessment_date)}`)
    .join('; ');

  const svg = svgEl('svg', {
    class: 'history-chart',
    viewBox: `0 0 ${width} ${height}`,
    role: 'img',
    'aria-labelledby': `${id}-title`,
    'aria-describedby': `${id}-desc`,
  });
  svg.append(svgEl('title', { id: `${id}-title` }, `Level history: ${areaName}`));
  svg.append(svgEl('desc', { id: `${id}-desc` },
    `Recorded level by assessment date, earliest first: ${pointsText}. The same figures are in the table below.`));

  for (let level = 1; level <= 5; level += 1) {
    svg.append(svgEl('line', {
      x1: left, x2: width - right, y1: y(level), y2: y(level), class: 'history-grid',
    }));
    svg.append(svgEl('text', {
      x: left - 8, y: y(level) + 4, class: 'history-axis', 'text-anchor': 'end',
    }, String(level)));
  }

  svg.append(svgEl('polyline', {
    points: history.map((r, i) => `${x(i).toFixed(1)},${y(r.level)}`).join(' '),
    class: 'history-line',
  }));

  // Date labels on every point when they fit; otherwise first and last only (the table has all).
  const labelDate = (i) => history.length <= 4 || i === 0 || i === history.length - 1;

  history.forEach((r, i) => {
    svg.append(svgEl('circle', { cx: x(i).toFixed(1), cy: y(r.level), r: 5, class: 'history-point' }));
    svg.append(svgEl('text', {
      x: x(i).toFixed(1), y: y(r.level) - 9, class: 'history-value', 'text-anchor': 'middle',
    }, String(r.level)));
    if (labelDate(i)) {
      svg.append(svgEl('text', {
        x: x(i).toFixed(1), y: height - bottom + 22, class: 'history-axis', 'text-anchor': 'middle',
      }, formatShortDate(r.assessment_date)));
    }
  });

  return svg;
}

function historyTable(areaName, history) {
  const table = el('table', { class: 'data-table' });
  table.append(el('caption', { text: `Level history: ${areaName} (table)` }));
  table.append(el('thead', {}, el('tr', {},
    el('th', { scope: 'col', text: 'Assessment date' }),
    el('th', { scope: 'col', text: 'Level' }),
    el('th', { scope: 'col', text: 'Assessor' }))));
  const tbody = el('tbody');
  for (const r of history) {
    tbody.append(el('tr', {},
      el('th', { scope: 'row', text: formatDate(r.assessment_date) }),
      el('td', { text: `${r.level} — ${LEVEL_NAMES[r.level]}` }),
      el('td', { text: r.assessor })));
  }
  table.append(tbody);
  return table;
}

// ---------- Area card ----------

function areaCard(area) {
  const headingId = `benchmark-area-${area.number}`;
  const card = el('article', { class: 'benchmark-area', 'aria-labelledby': headingId });
  card.append(el('h3', { id: headingId, text: `Benchmark ${area.number}: ${area.name}` }));
  const description = Object.hasOwn(AREA_DESCRIPTIONS, area.key) ? AREA_DESCRIPTIONS[area.key] : null;
  if (description) card.append(el('p', { class: 'area-description', text: description }));

  if (!area.current) {
    card.append(el('p', { class: 'not-assessed', text: 'Not yet assessed. benchmarks.csv has no row for this area.' }));
    return card;
  }

  const { level, evidence_note: note, assessment_date: date, assessor } = area.current;
  card.append(
    el('p', { class: 'level-line' }, el('strong', { text: levelText(level) }), ' ', levelScale(level)),
    el('dl', { class: 'assessment' },
      el('div', {}, el('dt', { text: 'Evidence' }), el('dd', { text: note })),
      el('div', {}, el('dt', { text: 'Assessed' }), el('dd', { text: formatDate(date) })),
      el('div', {}, el('dt', { text: 'Assessor' }), el('dd', { text: assessor }))),
  );

  if (area.history.length > 1) {
    const historyId = `benchmark-history-${area.number}`;
    card.append(
      el('h4', { text: `Level history (${area.history.length} assessments)` }),
      historySvg({ id: historyId, areaName: area.name, history: area.history }),
      el('p', {
        class: 'history-key',
        text: 'Levels: 1 Entry, 2 Improving, 3 Average, 4 Enhanced, 5 Exemplary. Points are evenly spaced in date order.',
      }),
      el('div', {
        class: 'table-scroll', role: 'region', tabindex: '0',
        'aria-label': `Level history table: ${area.name} (scrolls horizontally on narrow screens)`,
      }, historyTable(area.name, area.history)),
    );
  }
  return card;
}

// ---------- Public entry points ----------

// Renders the module into the benchmark region. rows: validated benchmark rows.
// errors: load/validation errors for benchmarks.csv, shown as text.
export function renderBenchmark(region, rows, errors = []) {
  const root = el('div', { class: 'benchmark' });

  const source = el('a', {
    href: 'https://pls.sl.nsw.gov.au/statewide-services/multicultural-services-public-libraries/benchmarking-multicultural-services',
    text: 'NSW Multicultural Library Service Benchmarks',
  });
  root.append(el('p', { class: 'module-note' },
    'Self-assessed maturity levels against the ', source,
    ' (State Library of NSW, 2024 update). Each level is a recorded judgement on a five-level scale, supported by an evidence note. It is not calculated from program activity data and there are no numeric targets.'));

  if (errors.length) {
    const list = el('ul');
    for (const e of errors) list.append(el('li', { text: e.message }));
    root.append(el('div', { class: 'load-errors' },
      el('h3', { text: `Data problems: ${errors.length} ${errors.length === 1 ? 'issue' : 'issues'} in benchmarks.csv (affected rows are excluded)` }),
      list));
  }

  const grid = el('div', { class: 'benchmark-areas' });
  for (const area of summariseAreas(rows)) grid.append(areaCard(area));
  root.append(grid);

  region.append(root);
}

// Shown when the data could not be loaded at all.
export function renderBenchmarkFailure(region, message) {
  region.append(el('p', { class: 'load-errors', text: `Benchmark data could not be loaded: ${message}` }));
}
