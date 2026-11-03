// Fetches the data CSVs, parses them with the vendored PapaParse (global window.Papa,
// loaded by a classic <script> tag before any module), and validates every row.
// Requires HTTP: fetch does not work over file://.

import { PROGRAMS_SCHEMA, BENCHMARKS_SCHEMA, validateRows } from './validate.js';

// Resolved against this module, so the paths work from any page that imports it.
export const PROGRAMS_URL = new URL('../data/programs.csv', import.meta.url);
export const BENCHMARKS_URL = new URL('../data/benchmarks.csv', import.meta.url);

function getPapa() {
  const Papa = globalThis.Papa;
  if (!Papa || typeof Papa.parse !== 'function') {
    throw new Error('PapaParse is not loaded. Add <script src="vendor/papaparse.min.js"></script> before the module script.');
  }
  return Papa;
}

// Parses CSV text in header mode and validates it against a schema.
// Blank lines are kept during parsing so each row's index maps to its CSV line.
export function parseAndValidate(text, schema) {
  const result = getPapa().parse(text, { header: true, skipEmptyLines: false });
  return validateRows(result.data, schema, {
    headerFields: result.meta.fields,
    parseErrors: result.errors,
  });
}

// Fetches one CSV and validates it. A failed fetch becomes an error, not a throw.
export async function loadCsv(url, schema) {
  let response;
  try {
    response = await fetch(url, { cache: 'no-store' });
  } catch (err) {
    return { valid: [], errors: [{ file: schema.file, line: null, field: null, message: `${schema.file}: could not be fetched (${err.message}).` }] };
  }
  if (!response.ok) {
    return { valid: [], errors: [{ file: schema.file, line: null, field: null, message: `${schema.file}: could not be fetched (HTTP ${response.status}).` }] };
  }
  return parseAndValidate(await response.text(), schema);
}

// Loads both data files. Returns { programs, benchmarks, errors }.
export async function loadAll({ programsUrl = PROGRAMS_URL, benchmarksUrl = BENCHMARKS_URL } = {}) {
  const [programs, benchmarks] = await Promise.all([
    loadCsv(programsUrl, PROGRAMS_SCHEMA),
    loadCsv(benchmarksUrl, BENCHMARKS_SCHEMA),
  ]);
  return {
    programs: programs.valid,
    benchmarks: benchmarks.valid,
    errors: [...programs.errors, ...benchmarks.errors],
  };
}
