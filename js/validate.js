// Validation and coercion for the two data files.
// Rules and allowed values follow docs/data-dictionary.md (the canonical schema).
// Pure functions only: no DOM access, no network, no globals.

export const PROGRAMS_SCHEMA = {
  file: 'programs.csv',
  fields: [
    'date', 'program_name', 'program_type', 'target_community', 'language_used',
    'attendance', 'new_members', 'suburb', 'feedback',
  ],
  required: [
    'date', 'program_name', 'program_type', 'target_community',
    'attendance', 'suburb',
  ],
  enums: {
    program_type: [
      'ESL Class', 'Cultural Celebration', 'Storytime', 'Digital Literacy',
      'Settlement Info', 'Book Club', 'Cultural Workshop',
    ],
    target_community: [
      'Mandarin', 'Cantonese', 'Nepali', 'Greek', 'Arabic', 'Italian', 'All CALD communities',
    ],
    language_used: [
      'English', 'Multilingual', 'Mandarin', 'Cantonese', 'Nepali', 'Greek', 'Arabic',
    ],
    suburb: ['Hurstville', 'Kogarah', 'Penshurst', 'South Hurstville', 'Oatley'],
  },
  integers: {
    attendance: { min: 0 },
    new_members: { min: 0 },
  },
  dates: ['date'],
};

export const BENCHMARKS_SCHEMA = {
  file: 'benchmarks.csv',
  fields: ['area', 'level', 'evidence_note', 'assessment_date', 'assessor'],
  required: ['area', 'level', 'evidence_note', 'assessment_date', 'assessor'],
  enums: {
    area: [
      'Planning', 'Organisational capacity', 'Quality of service and collections',
      'Promotions and delivery', 'Evaluation',
    ],
  },
  integers: {
    level: { min: 1, max: 5 },
  },
  dates: ['assessment_date'],
};

// The CSV line a data row came from: line 1 is the header, so data row index 0 is line 2.
// Assumes no quoted field spans multiple lines.
export function csvLine(rowIndex) {
  return rowIndex + 2;
}

function makeError(file, line, field, detail) {
  const where = `${file} line ${line}`;
  return {
    file,
    line,
    field,
    message: field ? `${where}, field "${field}": ${detail}` : `${where}: ${detail}`,
  };
}

function asText(value) {
  return value === undefined || value === null ? '' : String(value).trim();
}

// True for a strict YYYY-MM-DD string that names a real calendar date.
export function isValidIsoDate(text) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  if (!match) return false;
  const [year, month, day] = match.slice(1).map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  return (
    d.getUTCFullYear() === year && d.getUTCMonth() === month - 1 && d.getUTCDate() === day
  );
}

// Fields the schema requires that the header row does not contain.
export function missingColumns(headerFields, schema) {
  const present = new Set((headerFields || []).map((f) => asText(f)));
  return schema.fields.filter((f) => !present.has(f));
}

// Validates and coerces one row. Returns { row, errors }; row is null if any rule failed.
export function validateRow(raw, schema, line) {
  const errors = [];
  const row = {};

  for (const field of schema.fields) {
    const text = asText(raw[field]);

    if (text === '') {
      if (schema.required.includes(field)) {
        errors.push(makeError(schema.file, line, field, 'required value is empty.'));
      } else {
        // Blank optional value: null for numeric fields (so it is never summed as text), '' otherwise.
        row[field] = field in schema.integers ? null : '';
      }
      continue;
    }

    if (field in schema.integers) {
      const n = Number(text);
      const { min, max } = schema.integers[field];
      if (Number.isNaN(n)) {
        errors.push(makeError(schema.file, line, field, `"${text}" is not a number.`));
      } else if (!Number.isInteger(n)) {
        errors.push(makeError(schema.file, line, field, `"${text}" is not a whole number.`));
      } else if (n < min || (max !== undefined && n > max)) {
        const range = max === undefined ? `${min} or more` : `${min} to ${max}`;
        errors.push(makeError(schema.file, line, field, `${n} is outside the allowed range (${range}).`));
      } else {
        row[field] = n;
      }
      continue;
    }

    if (schema.dates.includes(field)) {
      if (isValidIsoDate(text)) {
        row[field] = text; // kept as a YYYY-MM-DD string to avoid time-zone shifts
      } else {
        errors.push(makeError(schema.file, line, field, `"${text}" is not a valid YYYY-MM-DD date.`));
      }
      continue;
    }

    if (field in schema.enums) {
      if (schema.enums[field].includes(text)) {
        row[field] = text;
      } else {
        errors.push(makeError(
          schema.file, line, field,
          `"${text}" is not an allowed value (allowed: ${schema.enums[field].join('; ')}).`,
        ));
      }
      continue;
    }

    row[field] = text;
  }

  return { row: errors.length ? null : row, errors };
}

// Validates parsed rows against a schema. rows are header-keyed objects in file order.
// headerFields is the parsed header; parseErrors are PapaParse-style errors ({ row, message }).
// Fully blank rows are skipped. Returns { valid, errors }.
export function validateRows(rows, schema, { headerFields, parseErrors = [] } = {}) {
  const errors = [];
  const valid = [];

  if (headerFields) {
    const missing = missingColumns(headerFields, schema);
    if (missing.length) {
      errors.push({
        file: schema.file,
        line: 1,
        field: null,
        message: `${schema.file} line 1: header is missing column(s): ${missing.join(', ')}. No rows were loaded.`,
      });
      return { valid, errors };
    }
  }

  const parseErrorsByRow = new Map();
  for (const e of parseErrors) {
    if (typeof e.row !== 'number') {
      errors.push({ file: schema.file, line: null, field: null, message: `${schema.file}: ${e.message}` });
      continue;
    }
    if (!parseErrorsByRow.has(e.row)) parseErrorsByRow.set(e.row, []);
    parseErrorsByRow.get(e.row).push(e);
  }

  rows.forEach((raw, index) => {
    const isBlank = Object.values(raw).every((v) => asText(v) === '');
    if (isBlank) return;

    const line = csvLine(index);
    const structural = (parseErrorsByRow.get(index) || []).map((e) =>
      makeError(schema.file, line, null, `${e.message}.`));
    const { row, errors: rowErrors } = validateRow(raw, schema, line);

    if (structural.length || rowErrors.length) {
      errors.push(...structural, ...rowErrors);
    } else {
      valid.push(row);
    }
  });

  return { valid, errors };
}

export function validatePrograms(rows, options) {
  return validateRows(rows, PROGRAMS_SCHEMA, options);
}

export function validateBenchmarks(rows, options) {
  return validateRows(rows, BENCHMARKS_SCHEMA, options);
}
