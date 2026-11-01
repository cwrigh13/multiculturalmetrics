# Build Plan — Multicultural Metrics Dashboard

*Status: ready to execute. A live tracker — tick each box as its "done when" check passes.*

**Build agent:** Claude Code *(swap to Cursor if preferred; the prompts are agent-neutral)*.
**Repository:** `github.com/cwrigh13/multiculturalmetrics` *(slug kept; confirm before running)*.
**Canonical documents (the agent must treat as authoritative):** `PRD`, `data-dictionary.md`, `benchmark-sources-and-methodology.md`, `tech-stack.md`. The Data Dictionary is the canonical schema.

**Fixed constraints carried into every step:** Path A no-build (vanilla HTML/CSS/native ES modules, no React/Vite/bundler/CI); one dependency only (PapaParse, vendored in `/vendor`); CSVs in `/data` parsed client-side; no backend, database, keys, secrets, or AI; benchmark and analytics layers kept separate; WCAG 2.1 AA; hand-rolled SVG charts; aggregate data only.

---

## Phase 1 — Confirm open inputs (no code yet)

These block correct filter and schema definitions. Do not start coding until both are resolved in `data-dictionary.md`.

### [x] ~~1.1 Lock the community taxonomy~~
**Plain English:** Decide how communities are categorised and list the final set, so the prototype's split of Chinese/Mandarin cannot recur and no group is unfilterable. This is a decision, not a coding task.

**Resolved (June 2026):** basis is language spoken at home (ABS Census 2021). Confirmed `target_community` values: Mandarin, Cantonese, Nepali, Greek, Arabic, All CALD communities. No targeted programs run for Spanish, Vietnamese, Tagalog, or any Indian language, so none added. Full list and grounding live in `data-dictionary.md` (canonical); this step references it rather than restating it.

**Prompt (Claude Code):**
```
Read data-dictionary.md. Do not write code. Help me finalise the target_community
taxonomy: propose a single controlled list based on EITHER language spoken at home OR
service-target group (recommend one, with reasons). The list must not split one
language community across two labels. Output the final list only; I will confirm
before you edit the Data Dictionary. Do not invent population figures.
```
**Depends on:** none. **Done when:** `data-dictionary.md` `target_community` [TO CONFIRM] is replaced with a final, confirmed list.

### [x] ~~1.2 Lock the enum lists~~
**Plain English:** Fix the allowed values for `program_type`, `language_used`, and `suburb` so validation and filters have a definite set to check against.

**Resolved (June 2026):** `program_type` = ESL Class, Cultural Celebration, Storytime, Digital Literacy, Settlement Info, Book Club, Cultural Workshop. `language_used` = English, Multilingual, Mandarin, Cantonese, Nepali, Greek, Arabic. `suburb` = Hurstville, Kogarah, Penshurst, South Hurstville, Oatley (the five branches; add "Other venue" only if off-site programs are ever recorded). Final lists live in `data-dictionary.md` (canonical).

**Prompt (Claude Code):**
```
Read data-dictionary.md. Do not write code. Confirm the final allowed-value lists for
program_type, language_used, and suburb. Flag any value in the existing sample data
that falls outside a proposed list. Output the final enums for my confirmation; do not
edit files yet.
```
**Depends on:** none. **Done when:** all three enum lists in the Data Dictionary are final, no [CONFIRM] markers remain.

---

## Phase 2 — Scaffold

### [ ] 2.1 Create the repository structure
**Plain English:** Lay down the folders and empty files so every later step has a known place to write to, matching the Tech Stack layout.
**Prompt (Claude Code):**
```
Read tech-stack.md, section 8. Create this structure in the repo, no build tooling,
no package.json, no framework: index.html; /css/styles.css; /js/ (empty for now);
/vendor/ (empty); /data/ (empty); keep /docs as-is. Create only empty or minimal
placeholder files. Do not add any dependency or config file.
Done when: the folder structure exists and matches tech-stack.md section 8.
```
**Depends on:** none. **Done when:** structure matches the Tech Stack repo layout.

### [ ] 2.2 Vendor PapaParse
**Plain English:** Place the one allowed third-party library as a committed file, rather than loading it from a CDN, so the site is self-contained.
**Prompt (Claude Code):**
```
Add PapaParse as a single committed file at /vendor/papaparse.min.js. Pin to the
current stable version at install; do not hardcode a version from memory. Do NOT load
it from a CDN and do NOT add npm or a package.json. It must be a plain committed file
referenced by a <script> tag.
Done when: /vendor/papaparse.min.js exists and is referenced from index.html.
```
**Depends on:** 2.1. **Done when:** the file is committed and referenced; no CDN link, no npm.

### [ ] 2.3 Minimal HTML shell
**Plain English:** Build the empty page skeleton with the language attribute set and labelled regions for the two modules, so the structure is accessible from the first commit.
**Prompt (Claude Code):**
```
Read tech-stack.md and the PRD. Write index.html as a minimal accessible shell: set
lang="en-AU"; include a heading; create two clearly separated, labelled landmark
regions — one "Benchmark self-assessment" and one "Program analytics (activity data,
not benchmark scores)". Load /js/main.js as type="module" and /vendor/papaparse.min.js.
No framework, no inline data, no styling beyond linking /css/styles.css.
Done when: the page loads with no console errors and shows two labelled empty regions.
```
**Depends on:** 2.1, 2.2. **Done when:** page loads cleanly with two labelled regions.

---

## Phase 3 — Data files

### [ ] 3.1 Create `programs.csv`
**Plain English:** Make the activity data file with a header row exactly matching the schema and a few clearly-marked sample rows, so the parser has real structure to read.
**Prompt (Claude Code):**
```
Read data-dictionary.md. Create data/programs.csv with a header row matching the
programs.csv schema EXACTLY (field names, order). Add 6–10 sample rows using ONLY
allowed enum values and the finalised community taxonomy. All numeric fields must be
plain numbers. Mark in a commit note that rows are sample data. Do not invent fields
not in the schema. Do not add personal or identifying information to any field.
Done when: the file matches the schema and every value sits within its allowed set.
```
**Depends on:** 1.1, 1.2. **Done when:** header and values conform to the Data Dictionary.

### [ ] 3.2 Create `benchmarks.csv`
**Plain English:** Make the benchmark file with one dated row per area, holding a starting maturity level and an evidence note, so the benchmark module has data to display.
**Prompt (Claude Code):**
```
Read data-dictionary.md and benchmark-sources-and-methodology.md. Create
data/benchmarks.csv with the exact schema (area, level, evidence_note, assessment_date,
assessor). Add one row per the five SLNSW areas with a level 1–5 and a brief evidence
note. Do NOT invent numeric benchmark targets — level is a maturity judgement only.
Use placeholder evidence notes I can replace; do not fabricate facts about the library.
Done when: five rows exist, one per area, levels within 1–5, schema exact.
```
**Depends on:** 1.1. **Done when:** five area rows, valid levels, exact schema.

---

## Phase 4 — Data and validation layer (proven in isolation)

This is the layer where the prototype's `attendance: '300'` defect is prevented. Prove it works before building any UI on it.

### [ ] 4.1 Validation/coercion module
**Plain English:** Write the rules that turn raw CSV text into trustworthy data — numbers coerced, bad rows rejected with a clear message naming the row. Pure logic, no screen output yet.
**Prompt (Claude Code):**
```
Read data-dictionary.md, "Validation and coercion rules". Write /js/validate.js as
pure functions, no DOM access. Rules: coerce attendance, new_members, level with
Number() and reject the row if NaN; level must be an integer 1–5; date and
assessment_date must parse to a valid date; enum fields trimmed and checked against the
allowed set; empty required field rejected. Every rejection returns a clear,
row-identifying message. No new dependencies. Export functions for reuse.
Done when: functions return {valid: [...], errors: [...]} with row-identifying errors.
```
**Depends on:** 1.1, 1.2. **Done when:** module exports validate functions; no DOM, no new deps.

### [ ] 4.2 CSV load module
**Plain English:** Wire PapaParse to fetch each CSV and pass every row through the validation module, so loading and checking happen together.
**Prompt (Claude Code):**
```
Read tech-stack.md. Write /js/load.js: use the vendored PapaParse to fetch and parse
data/programs.csv and data/benchmarks.csv (header mode), then pass rows through
validate.js. Return validated data plus any errors. Use fetch over HTTP (note: requires
a local static server, not file://). No new dependencies, no CDN.
Done when: load returns validated rows and an error list for each file.
```
**Depends on:** 4.1, 2.2. **Done when:** loading returns validated data and errors.

### [ ] 4.3 Isolation test of the validation layer
**Plain English:** Prove the layer rejects bad data before any interface exists — specifically the exact defect the prototype shipped, an attendance value entered as text.
**Prompt (Claude Code):**
```
Create a temporary /js/_selftest.html that loads load.js against a small inline or
fixture CSV containing one deliberately bad row (attendance = "abc") and one valid row.
Print to the page: which rows were accepted, which rejected, and the rejection message.
This is a throwaway harness, not part of the dashboard. Do not add a test framework.
Done when: the bad attendance row is rejected with a clear message naming the row, and
the valid row is accepted.
```
**Depends on:** 4.2. **Done when:** non-numeric attendance is rejected with a clear, row-identifying error (PRD acceptance criterion).

---

## Phase 5 — Analytics module

### [ ] 5.1 Summary figures
**Plain English:** Show the four headline numbers from the validated data, guarding against dividing by zero when no programs match.
**Prompt (Claude Code):**
```
Read the PRD analytics module spec. In /js/analytics.js render four summary figures
from validated programs data: total programs, total attendance (sum), total new members
(sum), average attendance per program (guard divide-by-zero, show "—" when zero). Plain
DOM rendering, no framework. Label the module as activity data, not benchmark scores.
Done when: the four figures compute correctly over the full sample data.
```
**Depends on:** 4.2, 2.3. **Done when:** four figures correct; no NaN; zero-case handled.

### [ ] 5.2 Filters
**Plain English:** Add the community, suburb, and period filters, building their options from the data itself so no record is ever unreachable, and recompute the figures when a filter changes.
**Prompt (Claude Code):**
```
Read the PRD analytics spec. Add filters for target community, suburb, and time period.
Generate community and suburb options DYNAMICALLY from values present in the data — do
NOT hardcode a list, and do NOT add special-case rules (e.g. hiding suburbs for a
community). Filter order: community -> suburb -> period. Recompute summary figures on
each change. Keyboard-operable controls with programmatic labels.
Done when: every community and suburb present in the data is reachable; figures update
on filter change.
```
**Depends on:** 5.1. **Done when:** all present values reachable; filters recompute correctly (README checklist).

### [ ] 5.3 Charts (hand-rolled SVG)
**Plain English:** Draw simple bar charts for attendance by community and by program type, built so screen-reader users and people not perceiving colour get the same information.
**Prompt (Claude Code):**
```
Read tech-stack.md section 5. Render attendance-by-community and attendance-by-
program-type as hand-rolled inline SVG bar charts (no chart library, no canvas). Each
chart: <title> and <desc>, a visible numeric data label on each bar, and an adjacent
data table as the text alternative. Meaning must not rely on colour alone. Re-render on
filter change.
Done when: charts reflect the filtered data and each has a data-table equivalent.
```
**Depends on:** 5.2. **Done when:** charts render, update on filter, have table equivalents.

---

## Phase 6 — Benchmark module

### [ ] 6.1 Current level per area
**Plain English:** Show each of the five SLNSW areas with its latest maturity level and the evidence note explaining it, kept visually distinct from the activity numbers.
**Prompt (Claude Code):**
```
Read benchmark-sources-and-methodology.md and the PRD benchmark spec. In
/js/benchmark.js render the five areas, each showing the most recent level (1–5) and
its evidence note from benchmarks.csv. Do NOT compute or invent numeric targets; do NOT
derive level from activity data. Render in a region clearly separate from analytics.
Done when: all five areas show a current level and evidence note.
```
**Depends on:** 4.2, 2.3. **Done when:** five areas each show level + note (PRD acceptance criterion).

### [ ] 6.2 History view
**Plain English:** Where an area has been assessed more than once, show how its level moved over time, again with a table alternative for accessibility.
**Prompt (Claude Code):**
```
Add a per-area history view: where multiple dated rows exist for an area, plot level
against assessment_date as a hand-rolled SVG, with an adjacent data table. No chart
library. Meaning not by colour alone.
Done when: an area with multiple dated rows shows its level history with a table
equivalent.
```
**Depends on:** 6.1. **Done when:** multi-row areas show history with table fallback.

---

## Phase 7 — Accessibility pass (WCAG 2.1 AA)

### [ ] 7.1 Keyboard and focus
**Plain English:** Make sure everything works without a mouse and the focused element is always visible.
**Prompt (Claude Code):**
```
Read accessibility-conformance-note.md. Ensure all filters, controls, and interactive
elements are fully keyboard-operable with a visible focus indicator. Fix any focus-order
or operability issues. No new dependencies.
Done when: the whole interface is usable by keyboard alone with visible focus.
```
**Depends on:** 5.3, 6.2. **Done when:** keyboard-only operation works; focus visible.

### [ ] 7.2 Colour, contrast, labels, errors, reflow
**Plain English:** Check text and chart contrast, that nothing relies on colour alone, that controls and headings are properly labelled, that data errors appear as text, and that the page works at 320px wide.
**Prompt (Claude Code):**
```
Against accessibility-conformance-note.md criteria: verify text/non-text contrast,
meaning not conveyed by colour alone, programmatic labels on controls, descriptive
headings, data-load errors announced in text (not colour), and reflow usable at 320px
with no horizontal scroll. Fix issues found. No new dependencies.
Done when: each listed criterion passes manual and axe checks.
```
**Depends on:** 7.1. **Done when:** criteria pass; results recorded in the accessibility note.

---

## Phase 8 — Manual validation

### [ ] 8.1 Run the README checklist + data-current date
**Plain English:** Walk the existing manual checklist end to end and add a visible "data current as at" date taken from the latest data row.
**Prompt (Claude Code):**
```
Read README.md "Manual validation checklist". Add a visible "Data current as at" date
derived from the latest date in the data. Then walk every checklist item and report
pass/fail. Fix any failure. Do not add tooling.
Done when: every README checklist item passes and the data-current date is shown.
```
**Depends on:** 7.2. **Done when:** all README checklist items pass.

---

## Phase 9 — Deploy

### [ ] 9.1 GitHub Pages and live verification
**Plain English:** Turn on GitHub Pages for the repo, commit, and confirm the live site behaves like the local one — with no build step in between.
**Prompt (Claude Code):**
```
Configure GitHub Pages to serve this repository directly (no build, no Action, no
deploy workflow). Confirm the deployment serves index.html and the CSVs load over HTTP.
Do not introduce a build or CI pipeline.
Done when: the live GitHub Pages URL loads the dashboard with data and no console
errors.
```
**Depends on:** 8.1. **Done when:** live URL matches local behaviour; no CI added.

---

## Phase 10 — Close out documentation

### [ ] 10.1 Update the changelog
**Plain English:** Record the initial build with its real date.
**Prompt (Claude Code):**
```
Update docs/CHANGELOG.md: replace [TO VERIFY: date] in the v0.1 entry with today's
date and confirm the Added/Data bullets match what was actually built.
Done when: v0.1 entry is dated and accurate.
```
**Depends on:** 9.1. **Done when:** changelog v0.1 dated and accurate.

### [ ] 10.2 Complete the build-dependent docs
**Plain English:** Now that the screens exist, fill the three template documents that were waiting on a built interface.
**Prompt (Claude Code):**
```
The interface now exists. Complete these templates against the real build, inventing
nothing: docs/accessibility-conformance-note.md (record actual test results, dates,
tester); docs/staff-user-guide.md (real steps and screenshots of the actual screens);
docs/data-update-runbook.md (confirm the actual edit/commit tools and correct the
labelled assumption if wrong).
Done when: no template placeholders remain in the three documents.
```
**Depends on:** 9.1. **Done when:** the three documents are complete with real content.

---

*Excluded by design, per the Tech Stack: no backend, database, build tool, framework, CI pipeline, or any dependency beyond PapaParse appears in any step. If a step seems to need one, that is a signal to stop and re-read the constraints, not to add the tool.*
