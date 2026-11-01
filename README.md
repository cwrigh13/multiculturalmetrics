# Multicultural Metrics Dashboard

*Status: complete (v0.1 draft, evolves with the build).*

A static web tool for Georges River Libraries that does two separate things:

1. **Benchmark self-assessment** — records the library's self-assessed maturity level (1–5) against the five areas of the *NSW Multicultural Library Service Benchmarks* (State Library of NSW, 2024), with an evidence note per area, and tracks change over time.
2. **Program analytics** — presents descriptive activity data (attendance, new members, by community, suburb, and period) as a clearly labelled separate layer, not as a benchmark score.

The two are kept distinct by design. Activity volume is not a benchmark score.

## Architecture

- Static site, hosted on GitHub Pages. No backend, no database, no server-side code.
- Data lives in CSV files committed to this repository and parsed in the browser.
- No API keys or secrets in client code. No live integration with Spydus or council systems. No AI feature.

## Where the data lives

| File | Holds |
|---|---|
| `data/programs.csv` | One row per program: date, name, type, target community, language used, attendance, new members, suburb, optional feedback. |
| `data/benchmarks.csv` | One dated row per benchmark assessment: area, level (1–5), evidence note, assessment date, assessor. |

Field definitions, types, and validation rules are in `data-dictionary.md` (the canonical schema). How to update the data is in `data-update-runbook.md`.

## Running locally

It is a static page. Either open `index.html` directly, or serve the folder, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deployment

GitHub Pages auto-deploys on commit to the published branch. There is no build step and no pipeline. Editing a CSV and committing it is sufficient; the page reflects the change on next load.

## Backup

The Git repository and its commit history are the backup. There is no separate database to back up.

## Manual validation checklist (run after any data change)

- [ ] Page loads without console errors.
- [ ] Summary totals are plausible (no `NaN`, no absurd values).
- [ ] A non-numeric value in a numeric CSV field is rejected with a clear message, not silently summed.
- [ ] Each of the five benchmark areas shows a current level and evidence note.
- [ ] Filters return the expected records; no community or suburb present in the data is unreachable.
- [ ] "Data current as at" date reflects the latest row.

## Documents

PRD, Benchmark Sources & Methodology, Data Dictionary, Data Update Runbook, Phase 0 Baseline Plan, Privacy Note, Accessibility Note, Staff User Guide, Stakeholder One-Pager, and this README. See the `/docs` folder.
