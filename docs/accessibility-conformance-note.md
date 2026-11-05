# Accessibility Conformance Note

*Status: tested 4 November 2026 against the build at commit `f8dbd59` (automated and scripted checks; manual screen-reader pass still outstanding, see Known limitations). Results below are from that test, not assumed.*

Target: **WCAG 2.1 Level AA**. [TO VERIFY: whether Georges River Council mandates a specific conformance level; treat AA as the minimum regardless.]

## How to complete this note

1. Build the dashboard.
2. Test against each criterion below using a keyboard, a screen reader (e.g. NVDA or VoiceOver), and an automated checker (e.g. axe DevTools) plus manual inspection.
3. Record Pass / Fail / Not applicable and a note. Where Fail, record the remediation and a target date.
4. Set a re-test date for after remediation.

## How this test was run

- Page served locally over HTTP and loaded in headless Chromium (Playwright), at 1100px and 320px wide.
- Automated check: axe-core 4.14.0 with the `wcag2a`, `wcag2aa`, `wcag21a` and `wcag21aa` rule sets, run in seven states: sample data at 1100px and 320px; a test file giving the benchmark module a multi-row history and one invalid row, at 1100px and 320px; a filter combination matching zero programs at 320px; `programs.csv` returning HTTP 404; and PapaParse failing to load. Result: no violations in any state. axe-core left SVG text contrast as "needs review", so those ratios were measured by hand (below).
- Keyboard: tab order recorded in each state; each filter operated with the arrow keys; the history-table scroll container scrolled with the arrow keys.
- Contrast: WCAG relative-luminance ratios computed for every text and non-text colour pair used.

### Measured contrast ratios

| Pair | Ratio | Needs |
|---|---|---|
| Body and chart text `#1a1a1a` on white | 17.40:1 | 4.5:1 |
| Body text on benchmark panel `#f5f1f9` | 15.61:1 | 4.5:1 |
| Body text on summary tiles `#f3f6f6` | 16.02:1 | 4.5:1 |
| Muted note text `#4a4a4a` on white / on benchmark panel | 8.86:1 / 7.95:1 | 4.5:1 |
| Link `#0000ee` / visited `#551a8b` on benchmark panel | 8.43:1 / 9.88:1 | 4.5:1 |
| White level numbers on plum `#5a2d82` | 9.85:1 | 4.5:1 |
| Unreached level numbers `#4a4a4a` on white | 8.86:1 | 4.5:1 |
| Analytics bars, teal `#00727a`, on white | 5.69:1 | 3:1 |
| Benchmark history line, points and filled level boxes, plum `#5a2d82`, on white | 9.85:1 | 3:1 |
| Unreached level box dashed border `#6b6b6b` on white | 5.33:1 | 3:1 |
| Current-level outline `#1a1a1a` on white | 17.40:1 | 3:1 |
| History gridlines `#767676` on white (was `#c4c4c4`, 1.74:1) | 4.54:1 | 3:1 |
| Focus ring teal `#00727a` on white / on benchmark panel | 5.69:1 / 5.11:1 | 3:1 |
| Panel and table borders `#6b6b6b` on white | 5.33:1 | 3:1 |
| Select border `#767676` on white | 4.54:1 | 3:1 |
| Error marker `#a4141c` on white / on benchmark panel | 7.79:1 / 6.99:1 | 3:1 |

## Criteria checklist (WCAG 2.1 AA, scoped to this tool)

| Criterion | What to check on this dashboard | Result | Note |
|---|---|---|---|
| 1.1.1 Non-text content | Charts and icons have text alternatives; data is available in an accessible form, not image-only | Pass | Every SVG chart has `role="img"`, a `<title>` as its name and a `<desc>` (the history chart's desc lists every point). Each chart has an adjacent data table with the same figures. The five-box level indicator is hidden from assistive technology because the adjacent text states the level. The em dash shown for a zero-program average is hidden and replaced by the text "Not available: no programs match". |
| 1.3.1 Info and relationships | Tables use proper headers; filter controls have programmatic labels | Pass | Tables have captions, column headers with `scope="col"` and row headers with `scope="row"`. Each filter `<select>` has a `<label for>`, and the filters are grouped in a fieldset with the legend "Filter programs". Summary figures and assessment details use description lists. |
| 1.4.3 Contrast (minimum) | Text and chart colours meet 4.5:1 (3:1 for large text) against their background | Pass | Lowest text ratio 7.95:1 (see table). |
| 1.4.1 Use of colour | Benchmark status / chart meaning is not conveyed by colour alone | Pass | Every bar carries a visible numeric label; every history point carries its level number; the level is stated in text ("Level 3 of 5 — Average"); the indicator boxes are numbered, reached and unreached boxes differ by solid versus dashed border, and the current box is outlined; links are underlined; error blocks have a text heading. |
| 1.4.11 Non-text contrast | Chart elements and UI controls meet 3:1 | Pass after fix | Fail found: benchmark history gridlines `#c4c4c4` measured 1.74:1. Fixed in commit `f8dbd59` by darkening them to `#767676` (4.54:1). All other chart elements, controls and the focus ring measured 4.54:1 or higher. |
| 2.1.1 Keyboard | All filters and controls operable by keyboard | Pass | Tab order: source link, history-table scroll containers (when present), then community, suburb and period filters. Each filter changes with the arrow keys and the figures update. The history-table container is focusable and scrolls with the arrow keys. No keyboard traps. |
| 2.4.7 Focus visible | Visible focus indicator on all interactive elements | Pass | Every focusable element shows a 3px solid teal outline with 2px offset on keyboard focus (confirmed via `:focus-visible` on each tab stop). |
| 2.4.6 Headings and labels | Section headings describe content; benchmark vs analytics clearly distinguished | Pass | The single h1 names the dashboard. The two h2s are "Benchmark self-assessment" and "Program analytics (activity data, not benchmark scores)". The h3s name each benchmark area, the summary and each chart, and the h4s name each level history. Each module opens with a note stating that activity figures are not benchmark scores. The two modules are also visually distinct (plum-edged tinted panel for benchmarks; teal charts on white for analytics). |
| 3.1.1 Language of page | `lang` attribute set | Pass | `<html lang="en-AU">`. |
| 3.3.1 Error identification | CSV/data load errors are announced in text, not colour only | Pass | Validation errors appear as a text list under a heading in the relevant region, naming file, line and field (for example "benchmarks.csv line 5, field "level": 9 is outside the allowed range (1 to 5)."). A failed fetch and a missing parser both produce text messages. The red side bar is supplementary. |
| 4.1.2 Name, role, value | Custom controls expose name/role/state to assistive tech | Pass | No custom controls: filters are native `<select>` elements with labels. The landmarks are `<header>`, `<main>`, and two `<section>` regions named by their h2 via `aria-labelledby`. The filter result count is a `role="status"` live region. The history-table scroll container is `role="region"` with an `aria-label`. Confirmed in the accessibility tree; still to be confirmed with a real screen reader. |
| 1.4.10 Reflow | Usable at 320px width without horizontal scrolling | Pass | No horizontal page scroll at 320px in any tested state. A wide level-history table scrolls inside its own labelled, keyboard-focusable container, which this criterion permits for data tables. |

## Known limitations

- **No screen-reader test yet.** NVDA and VoiceOver were not available in the test environment. 1.1.1, 1.3.1 and 4.1.2 passed on accessibility-tree inspection and axe-core, but still need a manual pass with a real screen reader.
- **One browser engine.** Testing used Chromium only. Firefox and Safari (VoiceOver) are untested.
- **Local build only.** The checks ran against a local copy of commit `f8dbd59`, not the published site; GitHub Pages was not yet serving from `main` at the time of testing.
- **Placeholder data.** The live data files hold SAMPLE rows. The multi-row benchmark history and the validation-error display were tested with test data supplied only during the test; real data should be rechecked once loaded.
- **Not in this note's scope.** 1.4.4 (Resize text) and 1.4.12 (Text spacing) are AA criteria not listed above and were not tested.

## Re-test

Date of test: 4 November 2026. Tester: Claude Code (automated session; axe-core, scripted keyboard and contrast checks in headless Chromium). Next review: [to complete: after the manual screen-reader pass, and again once real data replaces the SAMPLE rows].
