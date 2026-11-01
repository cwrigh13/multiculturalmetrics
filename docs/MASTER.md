# Multicultural Metrics Dashboard — Master Document

*Georges River Libraries. Single source of orientation for the project: what it is, where it stands, what is unresolved, and the step-by-step plan to a working product. Where a canonical document already owns a topic (PRD, data dictionary, tech stack, build plan), this points to it rather than restating it.*

*Status as at 2 November 2026: design and documentation settled; build at Phase 2 (repo scaffold).*

---

## 1. What it is

A web application that measures and evaluates how well Georges River Libraries delivers targeted services to culturally and linguistically diverse (CALD) communities, against established benchmarks. One of three diversity web apps tied to Court's KPIs, alongside Babel Fish (translation bridge) and Find a Community Resource at the Library. This app covers KPI 3: evaluating CALD service delivery against agreed benchmarks.

- Live (prototype): https://cwrigh13.github.io/multiculturalmetrics/
- Repository: https://github.com/cwrigh13/multiculturalmetrics

## 2. Why it exists

Evaluation of CALD services is currently manual, scattered across systems (program data, collections, census, staffing), and not tracked against the benchmark over time, so year-to-year reporting rarely lines up. The dashboard reduces the effort of presenting that evaluation and makes it consistent and transparent.

A sharper reason emerged in development: an early prototype invented numeric benchmark targets and attributed them to the State Library of NSW, which has none. The deeper purpose became producing evaluation that is source-honest and defensible, not just tidy.

## 3. What it does

Two parts, kept strictly separate:

1. **Benchmark self-assessment.** Self-assessed maturity level (1 Entry to 5 Exemplary) against the five areas of the NSW Multicultural Library Service Benchmarks (State Library of NSW, 2024): planning; organisational capacity; quality of service and collections; promotions and delivery; evaluation. Each area carries an evidence note and is tracked over time. Collections sit here, assessed qualitatively, not as a numeric collection scorecard.
2. **Program analytics.** Descriptive activity data: total programs, attendance, new members, filterable by community, suburb and period, with charts. Labelled explicitly as activity data, not benchmark scores.

Deliberately does not: pull live data, hold personal information, or run an AI panel. It reduces presentation effort, not data-collection effort.

## 4. Who it is for

- Court (Diversity Librarian) — primary user and evaluator.
- Management line — Team Leader Content & Discovery, Coordinator Cultural Services — act on it for resourcing and planning.
- External stakeholders (Council, community organisations) — transparent, read-only audience.

## 5. Locked decisions (constraints — do not reopen)

- Static site on GitHub Pages. No backend, database, CI beyond Pages auto-deploy, secrets, or AI feature.
- Path A, no build: vanilla HTML, CSS, native ES modules. One vendored dependency: PapaParse in `/vendor`.
- Data in committed CSVs in `/data`, parsed and validated client-side.
- Benchmark model: SLNSW five-level maturity self-assessment. No invented numeric targets.
- Spydus cannot feed the dashboard; static hosting rules out live integration. All data entered by hand.
- Community taxonomy (language spoken at home): Mandarin, Cantonese, Nepali, Greek, Arabic, All CALD communities.
- Suburbs: Hurstville, Kogarah, Penshurst, South Hurstville, Oatley.
- Program types: ESL Class, Cultural Celebration, Storytime, Digital Literacy, Settlement Info, Book Club, Cultural Workshop.
- Brand: Work Sans headings only, Arial body/data; teal #00A5A5 with #007582/#005174 for white text; red #CD1719, grey #878787 accents; logo placeholder, dragon not recreated.

## 6. Documents that already exist

In `/docs`: PRD, data-dictionary.md (canonical schema), benchmark-sources-and-methodology.md, tech-stack.md, BUILD-PLAN.md (the build tracker), phase-0-baseline-plan.md, privacy-data-handling-note.md, accessibility-conformance-note.md (template), staff-user-guide.md (template), stakeholder-one-pager.md, README.md, CHANGELOG.md. Plus the white paper, Medium article, and the wireframe HTML.

## 7. What still needs to be resolved

| # | Open item | Why it matters | Where it is tracked |
|---|---|---|---|
| 1 | ALIA and IFLA standards not sourced | KPI names all three sources; only SLNSW is implemented | benchmark-sources-and-methodology.md [TO SOURCE] |
| 2 | No baseline for success measures | "Reduce effort" and "transparency" can't be measured without a starting point | phase-0-baseline-plan.md |
| 3 | Success measures aren't SMART | KPI 3's four measures are restated objectives, not quantified, time-bound measures | PRD §4 |
| 4 | Exact Arabic population figure | Needed before any local figure is presented as fact | data-dictionary.md / Phase 0 Baseline C |
| 5 | Real benchmark self-assessment | Current levels are sample placeholders, not an actual assessment | to be done using the methodology doc |
| 6 | Real program data | Sample rows only; real attendance data must be entered | data-dictionary.md schema |
| 7 | Build not started | Only the repo skeleton exists | BUILD-PLAN.md Phase 2 onward |

## 8. Step-by-step plan to a working product

Ordered. Each step names who acts. Build steps defer to BUILD-PLAN.md rather than duplicating it. Claude Code prompts are given where Claude Code can genuinely do the work; account, billing, and GitHub web-UI actions are manual.

### Phase A — Resolve blockers (mostly off-screen work; do before/alongside the build)

**A1. Establish baselines (Court, manual).** Run phase-0-baseline-plan.md: time one evaluation cycle, record current stakeholder access. Converts PRD §4 measures from aspirational to real. Done when: a baseline figure exists for evaluation effort and for stakeholder access.

**A2. Confirm local figures (Court, manual).** Pull the Georges River CALD/language figures from ABS Census 2021 and the Arabic figure. Done when: each figure has a source and date; no [TO VERIFY] remains in the taxonomy grounding.

**A3. Source or defer ALIA and IFLA (Court, manual).** Obtain the ALIA and IFLA multicultural standards, or formally decide they are out of scope for v1. Done when: benchmark-sources-and-methodology.md has real citations or a recorded deferral.

**A4. Do the real benchmark self-assessment (Court, using the methodology doc).** For each of the five areas, decide the level 1–5 and write the evidence note. Done when: five real assessments exist to load into benchmarks.csv.

### Phase B — Environment setup (web route)

On a work PC with no local install, the route is claude.ai in the browser with the GitHub connector: Claude reads and writes the `multiculturalmetrics` repo directly, and you preview via the live GitHub Pages URL instead of a local server. Repo: https://github.com/cwrigh13/multiculturalmetrics

**B1. Connect GitHub to claude.ai (Court, manual).** In claude.ai, add the GitHub connector and authorise it for the `cwrigh13` account and the `multiculturalmetrics` repo. The exact menu and steps are at https://support.claude.com — follow those rather than a remembered path. Caveat: a work-managed PC may block the OAuth authorisation; if it fails, that is IT policy, not something you did wrong, and you would need the local route (below) on a personal machine instead. Done when: claude.ai can see the `multiculturalmetrics` repo.

**B2. Put the documentation set into the repo (Court, browser).** Through the GitHub website, create a `docs/` folder in the repo and upload the document set (Add file, then Upload files). Alternatively, once B1 is connected, ask Claude to commit them. Done when: `/docs` and its files appear in the repo on GitHub.

**B3. Confirm Claude can read the repo (Claude in claude.ai, connected).**
```
Read every file in /docs of the multiculturalmetrics repo and give me a one-line
summary of each, so I can confirm you can see the project documentation. Change nothing.
```
Done when: Claude lists the docs and summarises them.

*Local-machine route (alternative, for a personal machine only): install Claude Code per https://docs.claude.com, then `git clone https://github.com/cwrigh13/multiculturalmetrics.git`, add the docs to `docs/`, and `git add docs/ && git commit && git push`. Use this only if the work PC blocks the connector.*

### Phase C — Build (work through BUILD-PLAN.md)

Run these prompts in whichever Claude you set up in Phase B: the connected claude.ai session (web route) or Claude Code (local route). The prompts are the same. On the web route there is no local preview, so the loop is: Claude commits to the repo, GitHub Pages redeploys, you open the live URL to check the result. The agent labels below say "Claude Code"; read them as "the connected Claude" if you are on the web route.

**C1. Scaffold and vendor dependency (Claude Code — BUILD-PLAN 2.1–2.3).**
```
Read tech-stack.md section 8 and BUILD-PLAN.md phase 2. Create the repo structure
(index.html, /css, /js, /vendor, /data) with no build tooling, no package.json, no
framework. Vendor PapaParse as a single committed file in /vendor, pinned to current
stable at install, no CDN. Write index.html as a minimal accessible shell: lang="en-AU",
a heading, and two clearly separated labelled regions (benchmark self-assessment;
program analytics). Done when the page loads with no console errors and two labelled
regions.
```

**C2. Create the real CSVs (Claude Code — BUILD-PLAN 3.1–3.2).**
```
Read data-dictionary.md. Create data/programs.csv and data/benchmarks.csv with headers
matching the schema EXACTLY. For programs.csv add the real program rows I provide (ask me
for them); all numeric fields must be plain numbers; use only the locked enum values and
the community taxonomy. For benchmarks.csv add one row per the five SLNSW areas using the
real levels and evidence notes I provide. Do not invent data or numeric benchmark targets.
```

**C3. Build and prove the validation layer in isolation (Claude Code — BUILD-PLAN 4.1–4.3).**
```
Read data-dictionary.md validation rules and tech-stack.md. Write /js/validate.js (pure
functions, no DOM): coerce attendance, new_members, level with Number() and reject NaN
rows; level integer 1–5; valid dates; enum values trimmed and checked; empty required
field rejected; every rejection names the row. Write /js/load.js using the vendored
PapaParse to fetch and validate both CSVs. Then make a throwaway /js/_selftest.html that
loads a fixture with one bad row (attendance "abc") and one good row and prints which was
accepted or rejected. Done when the bad attendance row is rejected with a row-identifying
message and the good row is accepted. No new dependencies, no test framework.
```

**C4. Analytics module (Claude Code — BUILD-PLAN 5.1–5.3).**
```
Read the PRD analytics spec and tech-stack.md section 5. Build /js/analytics.js:
four summary figures (total programs, attendance, new members, average attendance per
program, guarding divide-by-zero); filters for community, suburb and period with options
generated dynamically from the data (no hardcoded lists, no special-case rules); recompute
on change; two hand-rolled inline SVG bar charts (attendance by community, by program type)
with a numeric label on every bar and an adjacent data table. Label the module as activity
data, not benchmark scores. Keyboard-operable, visible focus.
```

**C5. Benchmark module (Claude Code — BUILD-PLAN 6.1–6.2).**
```
Read benchmark-sources-and-methodology.md and the PRD benchmark spec. Build
/js/benchmark.js: show the five areas, each with its current level (1–5) and evidence
note from benchmarks.csv; where an area has multiple dated rows, show its level over time
as a hand-rolled SVG with a data table. Do not compute or invent numeric targets; do not
derive level from activity data. Render in a region clearly separate from analytics.
```

**C6. Accessibility pass (Claude Code — BUILD-PLAN 7).**
```
Read accessibility-conformance-note.md. Make the whole interface meet WCAG 2.1 AA:
keyboard-operable with visible focus; text and chart contrast; meaning never by colour
alone; labelled controls; data-load errors announced in text; usable at 320px with no
horizontal scroll. Fix issues found. No new dependencies.
```

**C7. Manual validation and data-current date (Claude Code — BUILD-PLAN 8).**
```
Read README.md's manual validation checklist. Add a visible "Data current as at" date
derived from the latest data row. Walk every checklist item and report pass/fail, fixing
any failure.
```

### Phase D — Deploy and close out

**D1. Turn on GitHub Pages (Court, manual).** In the repo on GitHub: Settings, then Pages, set the source to serve the repository (no build action). Follow the on-screen options; do not add a deploy workflow. Done when: the Pages URL serves the dashboard.

**D2. Verify live (Court, manual).** Visit https://cwrigh13.github.io/multiculturalmetrics/ and confirm it loads with data and no console errors, matching local behaviour.

**D3. Complete build-dependent docs (Claude Code — BUILD-PLAN 10).**
```
The interface now exists. Complete these templates against the real build, inventing
nothing: accessibility-conformance-note.md (real test results, date, tester);
staff-user-guide.md (real steps and screenshots); data-update-runbook.md (confirm the
actual edit/commit tools). Update CHANGELOG.md v0.1 with today's date.
```

**D4. First real reporting use (Court, manual).** Use the live dashboard to produce one CALD service evaluation. Compare the effort against the A1 baseline — this is what tells you whether the tool met its purpose.

## 9. Definition of done (v1)

- Live on GitHub Pages, serving real committed CSV data with validation on load.
- Benchmark module shows real levels and evidence for all five areas; no invented numeric target anywhere.
- Analytics module computes correctly across all filters; no record unreachable.
- Benchmark and analytics are visually and semantically separate.
- WCAG 2.1 AA met; no personal data; no secrets; no live feeds.
- Baselines established so the success measures can be assessed.
- Data dictionary, runbook, accessibility note and user guide complete.
