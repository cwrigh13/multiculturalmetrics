# Data Update Runbook

*Status: template pending confirmation of the maintainer's actual tools.*
*Assumption (label, replace if wrong): data is edited in **Microsoft Excel** and committed via the **GitHub website**. If you use GitHub Desktop or another editor, the commit steps change.*

This runbook is written so a successor with no developer background can keep the dashboard's data current. It does not require coding.

## What you are updating

Two files in the `data/` folder of the repository:

- `data/programs.csv` — program activity (one row per program).
- `data/benchmarks.csv` — benchmark self-assessments (one dated row per assessment).

Field meanings and allowed values are in `data-dictionary.md`. Read it before your first edit.

## Updating program activity

1. In the repository, open the `data` folder and click `programs.csv`.
2. Click **Download** (or the raw-file download) to get a local copy.
3. Open it in Excel.
4. Add or edit rows. One program per row. Fill every required column. Use the date format `YYYY-MM-DD`. Enter numbers as numbers (no text, no commas, no "approx").
5. Use only the allowed values for `program_type`, `target_community`, `language_used`, and `suburb` listed in the Data Dictionary. A new value that is not in the list will be rejected when the page loads.
6. Keep `feedback` non-identifying — no names or details that could identify an individual.
7. Save as **CSV UTF-8** (not .xlsx). Excel: File → Save As → "CSV UTF-8 (Comma delimited)".

## Committing the change (GitHub website)

1. In the repository, open `data/programs.csv`.
2. Click the pencil (Edit) icon, then **upload** or paste the updated content. The simplest reliable path: delete the old file and **Add file → Upload files**, drag in your saved CSV, keeping the same filename.
3. In the "Commit changes" box, write a short note, e.g. `Update programs.csv — added June 2026 programs`.
4. Click **Commit changes**.
5. Wait a minute for GitHub Pages to redeploy, then reload the dashboard.

## Updating a benchmark assessment

1. Open `data/benchmarks.csv` the same way.
2. **Add a new row** for the area you are re-assessing — do not overwrite the old one. History is kept by adding dated rows.
3. Fill: `area` (one of the five exact names), `level` (1–5), `evidence_note` (why this level), `assessment_date` (`YYYY-MM-DD`), `assessor`.
4. Assign the level using the rule in `benchmark-sources-and-methodology.md`, section 3.
5. Save as CSV UTF-8 and commit as above.

## After every update — check

- [ ] The dashboard loads with no error message.
- [ ] Totals look right; no `NaN` or blank where a number should be.
- [ ] The new programs or assessment appear.
- [ ] The "data current as at" date has moved.

If the page shows a data error, it will name the row. Fix that row in Excel, save as CSV UTF-8, and commit again.

## What not to do

- Do not edit the site's code files to change data. Data lives only in the CSVs.
- Do not save the data file as `.xlsx`. It must stay `.csv`.
- Do not put personal or identifying information in any field.
