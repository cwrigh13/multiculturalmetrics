# Privacy and Data-Handling Note

*Status: complete, pending confirmation of the applicable council standard.*

## Scope of data held

The dashboard holds **aggregate data only**. It stores and displays counts — programs, attendance, new members — and the library's own benchmark self-assessments. It does **not** store or display personal or identifiable information about any individual.

- No names, contact details, dates of birth, or membership identifiers.
- The optional `feedback` field holds non-identifying comments only. Any comment that could identify an individual must not be entered.
- There is no login, no user tracking, and no collection of visitor personal data by the tool itself.

## Where data lives

Data is held in CSV files committed to the project's code repository and parsed in the browser. There is no database and no server-side store. Hosting is static (GitHub Pages).

## Obligations

The tool is intended to operate within Georges River Council's privacy and records obligations and the relevant NSW frameworks. [TO VERIFY: the specific applicable council privacy/records-management standard and any State Records NSW retention requirement that applies to the committed CSVs.]

Because the repository's commit history retains prior versions of the data files, treat the CSVs as records subject to whatever retention rule applies, and confirm that aggregate program data carries no retention or disposal obligation beyond ordinary council records practice.

## Responsibilities

- The maintainer ensures no personal or identifying information enters any field, including `feedback`.
- Any future change that would introduce personal data (e.g. a sign-in, individual-level records) is out of scope under the current architecture and would require a fresh privacy assessment before implementation.
