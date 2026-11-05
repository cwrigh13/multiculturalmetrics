# Data Dictionary

*Status: complete. This is the canonical schema. If it and the PRD diverge, this document and the PRD must be reconciled explicitly, not silently.*

Two CSV files are committed to the repository under `data/` and parsed client-side. All numeric fields are coerced to numbers on load; a value that cannot be coerced is rejected with a clear, row-identifying error rather than silently summed.

## `programs.csv`

| Field | Type | Allowed values / format | Required |
|---|---|---|---|
| `date` | date | `YYYY-MM-DD` | Yes |
| `program_name` | string | free text | Yes |
| `program_type` | string (enum) | ESL Class; Cultural Celebration; Storytime; Digital Literacy; Settlement Info; Book Club; Cultural Workshop | Yes |
| `target_community` | string (enum) | Mandarin; Cantonese; Nepali; Greek; Arabic; Italian; All CALD communities | Yes |
| `language_used` | string (enum) | English; Multilingual; Mandarin; Cantonese; Nepali; Greek; Arabic. Leave blank if not recorded; a non-blank value must be one of these. | No (program-level language is not always recorded) |
| `attendance` | integer | ≥ 0, numeric only | Yes |
| `new_members` | integer | ≥ 0, numeric only | Yes |
| `suburb` | string (enum) | Hurstville; Kogarah; Penshurst; South Hurstville; Oatley | Yes |
| `feedback` | string | free text, non-identifying only | No |

## `benchmarks.csv`

| Field | Type | Allowed values | Required |
|---|---|---|---|
| `area` | string (enum) | Planning; Organisational capacity; Quality of service and collections; Promotions and delivery; Evaluation | Yes |
| `level` | integer | 1–5 | Yes |
| `evidence_note` | string | free text | Yes |
| `assessment_date` | date | `YYYY-MM-DD` | Yes |
| `assessor` | string | name/role | Yes |

## Validation and coercion rules (applied on load)

- Numeric fields (`attendance`, `new_members`, `level`): coerce with `Number()`; reject the row and surface an error if the result is `NaN`.
- `level`: must be an integer 1–5.
- `date` / `assessment_date`: must parse to a valid date.
- Enum fields: trim whitespace; reject values outside the allowed set, naming the offending row.
- Empty required field: reject the row with a clear message.

## Community taxonomy — resolved

**Basis: language spoken at home.** This aligns with the ABS Census category referenced by the SLNSW benchmarks and maps directly to LOTE collections.

The confirmed controlled values for `target_community` are:

| Value | Notes |
|---|---|
| Mandarin | |
| Cantonese | |
| Nepali | |
| Greek | |
| Arabic | |
| Italian | Added for active Italian-community programming (regular Italian Friendship Group sessions). |
| All CALD communities | Use for programs serving multiple or all CALD groups, not a single language community. |

Each speaker community maps to exactly one label. Mandarin and Cantonese are listed separately as distinct languages; the prototype's overlapping `Chinese` and `Mandarin` labels are removed.

Grounding (ABS Census 2021, via Georges River Council community profile): 53.2% of residents speak a language other than English. The most common are Mandarin (12.8%), Cantonese (9.4%), Nepali (5.7%), and Greek (5.2%). Arabic is the next significant community. [TO VERIFY: exact 2021 Arabic figure — tracked in Phase 0 Baseline Plan, Baseline C.]

Excluded labels: `Chinese`, `Indian`, and `Filipino` are ethnicity/nationality categories, not languages, and are not used. As of June 2026, no targeted programs run for Spanish, Vietnamese, Tagalog, or any Indian language, so none are added. A new value should be added only when targeted programming begins for that specific language community, named by its ABS language label.
