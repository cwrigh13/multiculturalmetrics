# Tech Stack — Multicultural Metrics Dashboard

*Status: complete (specification). Australian English. Every choice is justified against the constraints; anything disproportionate is rejected with a reason.*

The governing principle is minimum sufficient stack. This is a static, two-module dashboard reading committed CSVs. The correct stack is small, and a document that listed fashionable tooling would be working against the project.

---

## Resolved decision — build step

**Path A — no build.** Vanilla HTML, CSS, and JavaScript (native ES modules), committed and served directly by GitHub Pages.

Rationale against the constraints:

- "Commit a file and it deploys, no build step" is a hard constraint. Path A satisfies it literally; Path B (React + Tailwind + Vite) does not — it requires a build and a deploy Action, which is exactly the CI/CD the constraints exclude.
- Maintainability by a successor: a build toolchain (Node, npm, Vite, a lockfile, an Action) is the single biggest barrier to a non-developer or occasional-developer successor keeping the site alive. Path A has none of it.
- The app's interactivity is modest: filter a few hundred rows, recompute four summary figures, render simple charts, show five benchmark levels with notes. This does not require a component framework.

The Gemini prototype's React code is therefore not carried forward as-is. Its data and structure inform the rebuild, but the implementation is plain JavaScript. Discarding the prototype's framework is cheaper than permanently owning a build pipeline.

---

## 1. Language and runtime

- **Choice:** Browser-native JavaScript (ES2020+), organised as ES modules (`<script type="module">`), no transpilation.
- **Role:** All application logic — data loading, validation, filtering, rendering.
- **Reason:** ES modules give clean file separation with zero tooling. No Babel, no bundler. Modules require serving over HTTP (not `file://`), which is satisfied by GitHub Pages and by a local static server (s.9).
- **Did not use:** TypeScript. It would reintroduce a compile step, breaking Path A. Type safety here is better served by the runtime validation layer (s.4), which is needed regardless.
- **Browser support:** ES modules and the other features used are widely supported; verify specifics against caniuse rather than asserting figures.

## 2. Framework / rendering approach

- **Choice:** No framework. Direct DOM rendering from small, named render functions.
- **Role:** Build the two module views and re-render the analytics view on filter change.
- **Reason:** State is trivial (current filters; loaded data). A framework's reconciliation and build cost buy nothing at this scale.
- **Did not use:** React + Vite (Path B — breaks the no-build constraint); React/Preact via CDN with `htm` (avoids a build but adds a runtime dependency and a mental model a successor must learn, for interactivity this project does not have).

## 3. Styling

- **Choice:** Plain CSS in committed stylesheets, with CSS custom properties (variables) holding the colour palette and spacing tokens.
- **Role:** Layout and the Georges River teal palette; responsive at 320px (WCAG reflow).
- **Reason:** Zero build. Custom properties centralise the palette so a colour change is one edit. CSS Grid/Flexbox handle the responsive layout natively.
- **Did not use:** Tailwind. Without a build, Tailwind means either the Play CDN script (explicitly not intended for production, and heavy) or a build step — both break constraints. A CSS-in-JS runtime is rejected for the same build/weight reasons.

## 4. CSV parsing and the data-validation / coercion layer

This is a named, first-class part of the stack, not an afterthought. It is where the prototype's `attendance: '300'` class of defect is prevented.

- **Parsing choice:** PapaParse, vendored as a single minified file committed to `/vendor/` (not loaded from a third-party CDN).
- **Reason for PapaParse:** robust handling of quoting, embedded commas, newlines, and headers — the edge cases naïve `split(',')` parsing gets wrong. Vendoring the file keeps the site self-contained and free of an external runtime dependency, consistent with "no live integration".
- **Validation/coercion layer:** a hand-written module applied to every row on load:
  - Numeric fields (`attendance`, `new_members`, `level`) coerced with `Number()`; reject the row and surface a clear, row-identifying error if the result is `NaN`.
  - `level` must be an integer 1–5.
  - `date` / `assessment_date` must parse to a valid date.
  - Enum fields trimmed and checked against the allowed set from the Data Dictionary; reject and name the offending row otherwise.
  - Empty required field rejected with a message.
- **Reason for hand-writing it:** the rules are specific to this schema and few. A schema-validation library would be more code to learn and pin than the rules themselves.
- **Did not use:** a CSV-to-JSON build step or a validation framework (Zod, Yup) — disproportionate for five numeric/enum rules, and Zod would pull in its own footprint.

## 5. Charting / data visualisation

- **Choice:** Hand-rolled inline SVG bar charts, generated by a small render function.
- **Role:** Attendance by community and by program type (analytics); benchmark level over time (benchmark history).
- **Reason and accessibility tradeoff:** the charts are simple, so hand-rolled SVG is feasible and gives full control over accessibility — `<title>`/`<desc>` elements, ARIA, a visible data label on each bar so meaning is not conveyed by colour alone, and an adjacent data table as the text alternative (WCAG 1.1.1, 1.4.1). This directly serves the AA target.
- **Did not use:** Chart.js (renders to `<canvas>`, which is opaque to assistive technology and hard to make AA-conformant without extra fallback work); Recharts/Victory (require React and a build); D3 (powerful but heavy and unnecessary for static bar charts).

## 6. Accessibility tooling

- **Choice:** axe DevTools (browser extension) for automated checks; manual keyboard-only navigation; a screen reader (NVDA on Windows or VoiceOver on macOS); manual contrast checks.
- **Role:** Verify WCAG 2.1 AA against the criteria listed in the Accessibility Conformance Note.
- **Reason:** automated tools catch roughly half of issues; the rest (focus order, meaningful labels, keyboard operability) need manual testing. No build-integrated pipeline is needed for a single page.
- **Did not use:** a CI accessibility gate (e.g. pa11y in an Action) — adds the CI the project is avoiding; the manual checklist is proportionate here.

## 7. Hosting and deployment

- **Choice:** GitHub Pages, serving the repository directly (no Action, no build output).
- **Mechanics:** Pages is configured to serve from the chosen branch/folder. A commit to that location is live on the next deploy, typically within a minute. Editing a CSV and committing is sufficient — exactly the stated intent.
- **Did not use:** a deploy GitHub Action, Netlify/Vercel build pipelines — all presuppose a build the project does not have.

## 8. Version control and repository structure

- **Choice:** Git on GitHub. Indicative structure:

```
/                      site root served by Pages
  index.html
  CHANGELOG.md         dated record of data updates and feature changes
  /css                 stylesheets
  /js                  ES modules (load, validate, filter, render)
  /vendor              papaparse.min.js (committed)
  /data                programs.csv, benchmarks.csv  (canonical data)
  /docs                PRD, methodology, data dictionary, runbook, etc.
```

- **Reason:** data, code, and documentation are separated and obvious. The commit history is the backup (no database to back up).

## 9. Local development

- **Choice:** any static file server, e.g. `python3 -m http.server 8000`, then visit `http://localhost:8000`.
- **Reason:** ES modules and `fetch` of the CSV files require HTTP, not `file://`. No Node, no install. Python ships on macOS/Linux; on Windows, the VS Code Live Server extension is an equivalent.
- **Did not use:** a dev server with hot reload (Vite dev) — part of the build toolchain being avoided.

## 10. Testing / verification

- **Choice:** the manual validation checklist in the README, run after every data change, plus the accessibility testing in s.6.
- **Optional, if it earns its place:** a single small unit test for the validation/coercion function (the one piece of logic where a silent error is costly), runnable in the browser or with a minimal runner. This is the only automated test that is arguably justified; everything else is manual.
- **Did not use:** Jest/Vitest with a config and CI, end-to-end frameworks (Playwright/Cypress) — far beyond what a solo static dashboard warrants; the cost of maintaining them exceeds the risk they cover here.

## 11. Dependencies

Deliberately minimal. One third-party runtime library.

| Library | Role | Why included | Version |
|---|---|---|---|
| PapaParse | CSV parsing | Correct handling of CSV edge cases that naïve parsing mishandles | Pin to current stable at install; do not hardcode a number from memory |

That is the entire third-party surface. If this list grows, each addition should be challenged against the constraints before it is accepted. No framework, no database driver, no state library, no UI kit, no build tooling appears here — by design.

---

## Summary of deliberate exclusions

| Excluded | Reason |
|---|---|
| Next.js / any SSR framework | Server rendering for a static page; needs a build and a server runtime |
| React + Vite (Path B) | Breaks the no-build / non-developer-successor constraint |
| Tailwind | Requires a build, or the non-production Play CDN |
| A database | No backend exists; data is committed CSVs |
| Redux / state library | State is trivial |
| Docker | Nothing to containerise on static hosting |
| Chart.js / Recharts / D3 | Canvas accessibility problems, or a React/build requirement, or excess weight |
| Jest / Vitest / Playwright + CI | Disproportionate to a solo static project |
| Deploy GitHub Action | No build output to deploy; Pages serves files directly |

*Consistency check: no secrets, no backend, no live data, no AI feature. The stack does not introduce any capability the static architecture cannot support.*
