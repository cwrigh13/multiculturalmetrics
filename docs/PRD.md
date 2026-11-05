# Product Requirements Document — Multicultural Metrics Dashboard

**Georges River Libraries**

---

## 1. Document control

| Field | Value |
|---|---|
| Document | Multicultural Metrics Dashboard — Product Requirements Document |
| Type | Build specification (author is the builder) |
| Version | 0.1 (draft) |
| Owner | Librarian (Diversity), Georges River Libraries |
| Reports to | Team Leader Content & Discovery → Coordinator Cultural Services |
| Status | Draft for own use — contains open items requiring confirmation |
| Date | [TO VERIFY: insert date on first save] |

---

## 2. Problem statement and background

Georges River Libraries delivers targeted services to culturally and linguistically diverse (CALD) communities and is required to evaluate that delivery against agreed benchmarks. Evaluation is currently manual, ad hoc, and not consolidated into a single view. There is no consistent record of performance against the State Library of NSW (SLNSW) multicultural benchmarks over time, and no efficient way to present activity data to internal management or external stakeholders.

The governing standard is the *NSW Multicultural Library Service Benchmarks* (State Library of NSW, 2024 update; reviewed December 2025). It is a **five-level maturity scale** (Level 1 Entry to Level 5 Exemplary) across five areas. It is not a set of numeric pass/fail targets. An earlier prototype incorrectly modelled the benchmarks as invented numeric thresholds and fused them with program-activity data; this PRD corrects that.

Source: https://pls.sl.nsw.gov.au/statewide-services/multicultural-services-public-libraries/benchmarking-multicultural-services

---

## 3. Goals and non-goals

### Goals
- Record and track the library's self-assessed maturity level against each of the five SLNSW benchmark areas over time.
- Present descriptive program-activity data (attendance, new members, by community, suburb, and period) in a clear, filterable view.
- Reduce the effort of *presenting* CALD service evaluation, and provide a transparent view for internal and external stakeholders.

### Non-goals (with rationale)
- **No AI/LLM feature in v1.** The site is statically hosted; a hidden API key cannot exist on static hosting, and an exposed key is a security failure. Excluded until a server-side proxy is available.
- **No live data integration.** No backend or database exists; the Spydus LMS and council systems cannot be queried at runtime. Data is supplied via committed files.
- **No reduction in data *collection* effort claimed.** A static dashboard reduces presentation effort, not the effort of gathering source data. Claims are scoped accordingly.

---

## 4. Success metrics

No baseline currently exists for any measure. Each metric below requires a Phase 0 baseline before a target can be set. Targets marked **[TO SET]** are deliberately left open until the baseline exists.

| # | Original measure | SMART restatement | Baseline required |
|---|---|---|---|
| 1 | Streamline evaluation | Establish current hours to compile one annual CALD service evaluation. Reduce presentation/compilation time by **[TO SET]%** within the first full reporting cycle after launch. | Yes — time current process |
| 2 | Enhance transparency | Dashboard published and accessible to all named stakeholders (s.5) by **[TO VERIFY: date]**; record number of distinct stakeholder accesses per quarter. | Yes — current access is effectively zero |
| 3 | Drive improvement | At least one documented service-improvement action arising from a benchmark gap, per reporting cycle. | No — countable from launch |
| 4 | Support strategic planning | Benchmark and analytics data cited in at least one Cultural Services planning or Council reporting document per year. | No — countable from launch |

Metrics 1 and 2 cannot be made fully SMART until baselines are set in Phase 0. Metrics 3 and 4 are measurable from launch.

---

## 5. Users and the decision each supports

| User | Role on this tool | Decision it must support |
|---|---|---|
| Librarian (Diversity) | Primary user; evaluator; maintainer | Where the service sits against each benchmark; where to focus improvement effort |
| Library staff | Secondary viewers | Awareness of CALD program performance |
| Coordinator Cultural Services / management | Decision-makers | Resourcing and planning for multicultural services |
| External stakeholders (Council, community organisations) | Read-only audience | Whether the service is meeting its CALD obligations transparently |

---

## 6. Scope

### In scope
- Benchmark self-assessment module (five areas × five levels, with evidence notes and dated history).
- Descriptive program-analytics module, with filters.
- CSV-driven data, committed to the repository.
- Static accessible web presentation.

### Out of scope
- AI features, live integrations, write-back/persistence of user input, authentication, and any personal or identifiable data.

---

## 7. Functional requirements (MoSCoW)

**Must**
- Load program data and benchmark-assessment data from CSV files committed to the repository, parsed client-side with strict type coercion.
- Display the current self-assessed maturity level (1–5) for each of the five SLNSW benchmark areas.
- Display program analytics: total programs, total attendance, total new members, for the current filter selection.
- Filter analytics by target community, suburb, and time period.
- Clearly separate the benchmark module from the analytics module in the interface, with the analytics layer labelled as activity data, not benchmark scores.
- Meet WCAG 2.1 AA [confirm council mandate — s.11].

**Should**
- Show benchmark maturity-level history over time per area (from dated rows in the benchmark CSV).
- Provide an in-browser CSV upload for previewing new data before it is committed (preview only; not persisted).
- Show an evidence note alongside each benchmark level.

**Could**
- Export the current filtered view as an image or printable summary for inclusion in reports.
- Display [TO SOURCE] placeholders for ALIA and IFLA standards once held.

**Won't (v1)**
- AI question-answering, live data, saved user sessions, user accounts.

---

## 8. Benchmark module specification

**Model.** Five fixed areas, each assessed at one of five levels:

1. Planning for relevant library services
2. Organisational capacity
3. Quality of service and collections
4. Promotions and delivery
5. Evaluation

Levels: 1 Entry, 2 Improving, 3 Average, 4 Enhanced, 5 Exemplary.

**Input.** Each assessment is one row in `benchmarks.csv`: area, level (1–5), evidence note, assessment date, assessor. Tracking over time is achieved by adding new dated rows; nothing is overwritten.

**Display.** For each area, show the most recent level and its evidence note. Where multiple dated rows exist, plot level against date to show movement.

**Rules.** Do not compute or invent numeric thresholds. The only quantitative element in the source standard is that formal audience research occurs at least biennially (Benchmark 5, Exemplary level); represent this as a descriptor, not a calculated score. The maturity level is a human judgement recorded with evidence, never derived automatically from activity data.

---

## 9. Analytics module specification

**Purpose.** Descriptive activity reporting, kept visually and conceptually distinct from the benchmark module.

**Inputs.** `programs.csv` (schema in s.10).

**Filters.** Target community, suburb, time period. Filter order: community → suburb → period. Filter options are generated dynamically from values present in the data, so no record is unreachable.

**Summary values** (recomputed on each filter change, over the filtered set):
- Total programs = count of rows
- Total attendance = sum of `attendance`
- Total new members = sum of `new_members`
- Average attendance per program = total attendance ÷ total programs (guard against division by zero; display "—" when zero programs)

**Charts.** Attendance by target community and attendance by program type, for the filtered set.

---

## 10. Data specification

### `programs.csv`

| Field | Type | Allowed values / format | Required |
|---|---|---|---|
| `date` | date | `YYYY-MM-DD` | Yes |
| `program_name` | string | free text | Yes |
| `program_type` | string (enum) | e.g. ESL Class, Cultural Celebration, Storytime, Digital Literacy, Settlement Info, Book Club, Cultural Workshop — [confirm final list] | Yes |
| `target_community` | string (enum) | Mandarin; Cantonese; Nepali; Greek; Arabic; Italian; All CALD communities (Italian added for active Italian-community programming; see `data-dictionary.md`) | Yes |
| `language_used` | string (enum) | English; Multilingual; Mandarin; Cantonese; Nepali; Greek; Arabic. Leave blank if not recorded; a non-blank value must be one of these. | No (program-level language is not always recorded) |
| `attendance` | integer ≥ 0 | numeric only | Yes |
| `new_members` | integer ≥ 0 | numeric only | Yes |
| `suburb` | string (enum) | Hurstville, Kogarah, Penshurst, South Hurstville, Oatley — [confirm] | Yes |
| `feedback` | string | free text, non-identifying only | No |

### `benchmarks.csv`

| Field | Type | Allowed values | Required |
|---|---|---|---|
| `area` | string (enum) | one of the five fixed areas | Yes |
| `level` | integer | 1–5 | Yes |
| `evidence_note` | string | free text | Yes |
| `assessment_date` | date | `YYYY-MM-DD` | Yes |
| `assessor` | string | name/role | Yes |

### Validation and coercion (on load)
- Coerce every numeric field with `Number()`; reject the row and surface an error if the result is `NaN`. (This prevents the string-versus-number defect that corrupted the prototype, e.g. an attendance value entered as text.)
- Validate `date` parses to a valid date; reject otherwise.
- Validate `level` is an integer 1–5.
- Trim whitespace on enums; reject values outside the allowed set with a clear message naming the offending row.

### Community taxonomy — open item
The prototype split Chinese-language speakers across two uncontrolled labels (`Chinese` and `Mandarin`), making the largest local CALD group unfilterable as one. Define a single controlled taxonomy before populating data. **[TO CONFIRM: basis — language spoken at home, or service-target group — and the final category list.]**

### Edit-and-commit workflow
1. Edit the relevant CSV in a spreadsheet application.
2. Save as CSV (UTF-8).
3. Commit the file to the repository.
4. GitHub Pages redeploys; the dashboard reflects the change on reload.

A separate runbook should document this for any successor. **[TO VERIFY: who else, if anyone, will maintain this.]**

---

## 11. Non-functional requirements

- **Accessibility.** WCAG 2.1 AA. **[Confirm whether council-mandated; treat as required regardless.]**
- **Performance.** Client-side parsing of CSVs of expected size (hundreds to low thousands of rows) must render without noticeable delay.
- **Privacy and records.** Aggregate data only; no personal or identifiable information stored or displayed. `feedback` must be non-identifying. Align with NSW local-government and State Records obligations. **[TO VERIFY: applicable council records-management requirement.]**
- **Hosting limits.** Static only; no backend, database, server-side code, or secrets in client code.

---

## 12. Assumptions, constraints, dependencies

- **Assumption.** The author builds and maintains the tool solo.
- **Constraint.** Static GitHub Pages hosting (binding; shapes every data decision).
- **Constraint.** Benchmark model fixed to the SLNSW five-level maturity scale.
- **Dependency.** SLNSW benchmark source document (held). ALIA and IFLA standards **[TO SOURCE]**. Local figures **[TO VERIFY]** (see s.13).

---

## 13. Open questions and decisions required before build

1. Final community taxonomy and its basis (s.10).
2. Final enum lists for `program_type`, `language_used`, `suburb`.
3. Confirmed local figures, each with source:
   - CALD population proportion — [TO VERIFY: ABS Census 2021, Georges River LGA, language spoken at home]
   - LOTE collection size — [TO VERIFY: Spydus collection report]
   - Specialist multicultural staffing FTE — [TO VERIFY: council workforce data]
4. Whether ALIA and IFLA standards are in scope for v1 or deferred (currently [TO SOURCE]).
5. Council accessibility and records-management mandates (s.11).
6. Whether anyone other than the author will maintain the tool (sets runbook depth).

---

## 14. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| False precision in benchmarks | Loss of credibility if figures don't reconcile with the SLNSW source | Use the maturity scale only; no invented numeric targets; cite the source edition in a methodology note |
| Mis-attributed standards | Numbers labelled SLNSW that are actually IFLA/obsolete | Keep ALIA/IFLA explicitly [TO SOURCE]; attribute any future numeric formula to IFLA, not SLNSW |
| Stale committed data | Dashboard shows out-of-date figures | Document update cadence; show "data current as at" date from the latest row |
| Scope creep toward unsupported features | Wasted effort, broken features | Treat the non-goals (s.3) as binding; route any live-data or AI need to a separate future phase |
| Single-maintainer bus factor | Tool unmaintainable if author leaves | Data dictionary + update runbook written for a non-developer successor |
| Type-error in CSV data | Corrupted totals | Strict coercion and row-level validation on load (s.10) |

---

## 15. Phased delivery

- **Phase 0 — Establish foundations.** Measure baselines (evaluation effort, current stakeholder access). Source or formally defer ALIA/IFLA. Confirm local figures and taxonomy. Output: baselines documented; data definitions locked.
- **Phase 1 — Build core.** Benchmark module and analytics module on committed CSVs, with validation, filters, and accessibility. Output: working dashboard on the confirmed data model.
- **Phase 2 — Enhance.** Benchmark history visualisation, export/print, ALIA/IFLA layer if sourced.
- **Future (out of v1).** Any live-data or AI capability, contingent on a non-static hosting decision.

---

## 16. Acceptance criteria

- Benchmark module displays a current level (1–5) and evidence note for all five SLNSW areas, sourced from `benchmarks.csv`.
- No invented numeric benchmark target appears anywhere in the interface.
- Analytics module computes the four summary values correctly over any filter combination, with no record made unreachable by the filter taxonomy.
- All numeric CSV fields are validated as numbers on load; a non-numeric value produces a clear error, not a corrupted total.
- Benchmark and analytics modules are visually and labelled as distinct.
- No API key, secret, personal data, or live integration exists in the deployed site.
- The interface meets WCAG 2.1 AA.
- A "data current as at" date is visible, derived from the data.
- A data dictionary and an update runbook exist and are sufficient for a non-developer to maintain the data.

---

*Source for benchmark model: NSW Multicultural Library Service Benchmarks, State Library of NSW (2024 update). Local figures and ALIA/IFLA standards are marked for verification or sourcing and must not be presented as confirmed until obtained.*
