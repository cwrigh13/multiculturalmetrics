# Measuring What We Do: A Source-Honest Approach to Evaluating Multicultural Library Services

**A white paper from Georges River Libraries**

*Audience: NSW public library sector peers. Status: draft. Figures marked [TO VERIFY] require a named source before publication; standards marked [TO SOURCE] are planned but not yet held.*

---

## 1. Executive summary

Public libraries in NSW are expected to evaluate their services to culturally and linguistically diverse (CALD) communities against an agreed benchmark. In practice that evaluation is often manual, scattered across documents, and not tracked against the benchmark over time. The result is reporting that is hard to compare year on year and easy to overstate.

Georges River Libraries has built a small, deliberately limited tool to address this: the Multicultural Metrics Dashboard. It does two things, kept strictly separate. First, it records the library's self-assessed maturity level against the five areas of the *NSW Multicultural Library Service Benchmarks* (State Library of NSW, 2024), with an evidence note for each, and tracks how those levels change over time. Second, it presents descriptive program-activity data — attendance, new members, broken down by community, suburb, and period — as a clearly labelled separate layer, not as a benchmark score.

The tool is a static web page maintained by one librarian, with its data held in a spreadsheet committed to the project repository. It has no database, no live integration with library or council systems, and no automated reporting. Its purpose is narrow and honest: to reduce the effort of *presenting* CALD service evaluation and to make that evaluation consistent and defensible. It does not reduce the effort of collecting the underlying data, and it makes no claim to.

This paper sets out the problem, the standard the work is anchored to, the design, and — at equal length — what the tool deliberately does not do. The most important design decision is also the least glamorous: refusing to manufacture precision the source standard does not contain.

---

## 2. The problem

Evaluating library services to CALD communities is difficult for reasons that are structural, not incidental.

The data is dispersed. Program attendance sits in booking systems or manual counts; collection figures sit in the library management system; community demographics sit in census data; staffing sits in council workforce records. Pulling these together for an annual report is laborious, and because it is done from scratch each time, the result is rarely comparable with the previous year.

The benchmark is qualitative, which is a strength of the standard but a challenge for reporting. The governing framework is a maturity scale, not a tally. Translating "we run several multilingual programs and have a LOTE collection development policy" into a defensible position on that scale requires judgement, and that judgement is easy to lose between reporting cycles if it is not recorded with its reasoning.

Most importantly, evaluation of this kind is vulnerable to false precision. It is tempting to express performance as numbers — percentages met, targets hit — because numbers look rigorous. But if those numbers are not grounded in the actual standard, the rigour is an illusion that collapses the moment someone checks the source. An early prototype of this very project demonstrated the risk: it presented invented numeric "benchmark targets" attributed to the State Library of NSW that do not appear in the SLNSW standard at all. The framework is a five-level scale; the prototype rendered it as numeric pass/fail thresholds. Anyone comparing the dashboard to the published benchmarks would have found they did not reconcile.

The problem this tool addresses is therefore not only effort. It is producing evaluation that is consistent over time, honest about its sources, and defensible to anyone who checks. Effort reduction is a benefit; source-honesty is the point.

---

## 3. Context: the standard

NSW is among the most culturally and linguistically diverse jurisdictions in Australia, and public libraries serve their CALD communities through collections in languages other than English (LOTE), multilingual programs, settlement and digital-literacy support, and community partnerships.

The relevant standard is the *NSW Multicultural Library Service Benchmarks*, maintained by the State Library of NSW. The benchmarks were originally created in 2003, revised following a statewide research project in 2017, and updated in 2024 to reflect contemporary terminology. They are written as a five-point scale that a library uses to track its progress, across five areas of service:

1. Planning for library services relevant to CALD clients
2. Organisational capacity to develop and deliver multicultural services and collections
3. Quality of services and collections
4. Promotions and delivery
5. Evaluation of library services

The scale runs from Level 1 (Entry) — activities that are unplanned and ad hoc — to Level 5 (Exemplary), where the needs of the CALD population are fully integrated into the library's mainstream planning and operation. A library will typically sit at different levels for different areas.

The framework is overwhelmingly qualitative. Each level is described in terms of practice — whether a multicultural collection development policy exists, whether cross-cultural training is compulsory, whether feedback mechanisms reach non-English-speaking users — not in terms of numeric thresholds. The one quantitative element is in the Evaluation area, where the Exemplary level specifies that formal audience research is carried out at least biennially. This distinction is the foundation of the tool's design: the benchmarks are a maturity model, and any tool that represents them faithfully must model maturity, not invent a scoreboard.

Two further standards are named in the library's governing objective for this work — those of the Australian Library and Information Association (ALIA) and the International Federation of Library Associations and Institutions (IFLA). These are not yet incorporated and are marked [TO SOURCE]. Where numeric collection guidance is eventually wanted, IFLA's multicultural community guidelines are the appropriate source; the SLNSW benchmarks are not, and the tool will attribute any such figure correctly.

---

## 4. The approach

The dashboard is built around a single discipline: keep the benchmark assessment and the activity data apart, and never let one masquerade as the other.

The **benchmark module** records, for each of the five SLNSW areas, the library's current self-assessed level from 1 to 5, together with an evidence note explaining why that level was assigned and the date of assessment. Because each assessment is stored as a dated entry rather than overwritten, the tool builds a history: it can show that, for example, the Evaluation area moved from Improving to Average over a given period, and why.

The **analytics module** presents descriptive activity data — counts of programs, attendance, and new members — filterable by target community, suburb, and time period. This is activity reporting. It tells you what the library did and how many people came. It is explicitly not a measure of benchmark performance, and the interface labels it as such.

The separation matters because conflating the two is precisely how evaluation becomes misleading. High attendance at multilingual events is good, but it does not by itself place the library at a particular maturity level for, say, organisational capacity or planning. Treating activity volume as a benchmark score is the false-precision trap in a different form. By keeping the layers distinct and differently labelled, the tool lets each speak honestly: the maturity assessment carries the considered judgement and its evidence; the analytics carry the raw activity.

---

## 5. How it works

The tool is intentionally simple.

It is a static web page. The data behind it lives in spreadsheet (CSV) files committed to the project's code repository — one for program activity, one for the benchmark assessments. When the librarian updates the figures, they edit the spreadsheet, save it, and commit it; the published page reflects the change on its next load. There is no login, no server, and no database.

The benchmark module reads the assessment spreadsheet and displays the current level and evidence note for each area, with the option to show how levels have moved over time. The analytics module reads the activity spreadsheet, applies whatever filters the user selects, and recalculates its summary figures — total programs, total attendance, total new members, and average attendance per program — over the filtered set.

Data is validated as it loads: numeric fields must be numbers, dates must be valid, and benchmark levels must fall between 1 and 5. This guards against a class of silent error — for instance, an attendance figure accidentally entered as text — that would otherwise corrupt the totals without warning.

---

## 6. What it deliberately does not do

The tool's limits are design decisions, not shortcomings to be apologised for. Stating them plainly is part of being source-honest.

**It does not pull live data.** It has no connection to the library management system, the booking system, or any council database. Every figure is entered by hand into a spreadsheet. This is a direct consequence of static hosting and is accepted as a constraint.

**It does not reduce data-collection effort.** It reduces the effort of presenting and visualising data that has already been gathered. The gathering remains manual. Any claim that the tool saves time must be confined to presentation, not collection.

**It holds aggregate data only.** No personal or identifiable information is stored or displayed. Feedback, where recorded, is non-identifying.

**It has no automated analysis or AI feature.** An earlier prototype included an AI question-answering panel; it could not function on static hosting without exposing a secret key, which would be a security failure, so it has been removed.

**It is maintained by one person.** This is a real risk to continuity, addressed through documentation rather than pretended away.

---

## 7. Benefits, honestly scoped

Within those limits, the tool offers concrete value.

It makes CALD service evaluation **consistent over time**. Because benchmark assessments are dated and retained with their evidence, the library can show movement against the standard across reporting cycles rather than reconstructing a position from memory each year.

It improves **transparency**. A single, accessible view of where the service sits against each benchmark area, and what its programs are delivering, can be shared with management, Council, and community partners without assembling a bespoke report each time.

It reduces **presentation effort**. The recurring work of turning gathered data into a clear summary is largely handled by the tool.

It models **source-honesty** in a way that is reusable. The discipline of representing the benchmarks as they actually are — and flagging every unconfirmed figure rather than inventing one — is itself a transferable practice for any library doing this kind of evaluation.

These benefits are deliberately modest. Overstating them would repeat the error the tool was built to avoid.

---

## 8. Limitations and risks

The principal risk is the one already described: **false precision and mis-attribution**. The design mitigates it by modelling the SLNSW benchmarks as the five-level maturity scale they are, refusing to generate numeric benchmark targets, and attributing any future numeric guidance to its correct source. The accompanying methodology documentation records exactly which standard, edition, and level descriptors are used.

**Stale data** is a risk inherent to manual entry; the tool mitigates it by displaying the date to which its data is current.

**Single-maintainer dependency** is mitigated through a data dictionary and an update runbook written so that a successor without a technical background can keep the tool running.

**Unconfirmed local figures** — such as the proportion of the local government area that speaks a language other than English, the size of the LOTE collection, or specialist staffing levels — are not asserted until sourced. [TO VERIFY: ABS Census 2021, Georges River LGA, language spoken at home; library management system collection report; council workforce data.]

---

## 9. Next steps and future scope

Three pieces of work would materially strengthen the tool and its evaluation.

First, **establish baselines**. No baseline yet exists for the time the current evaluation process takes or for stakeholder access to performance information. Without these, claims of efficiency or transparency improvement are aspirational. A short baseline-measurement exercise should precede any target-setting.

First-tier sourcing also covers **the local figures** marked [TO VERIFY], drawn from the census, the library management system, and council records.

Second, **source ALIA and IFLA standards** [TO SOURCE] and decide whether they enter the tool as additional reference points, with any numeric element correctly attributed.

Third, **revisit architecture only if a genuine need arises**. Live data or automated analysis would require hosting the tool can presently not support. That is a future decision, not a current gap, and should be driven by demonstrated need rather than feature ambition.

---

## 10. References

- State Library of New South Wales. *NSW Multicultural Library Service Benchmarks* (2024 update; benchmarks originally created 2003, revised 2017). Available at: https://pls.sl.nsw.gov.au/statewide-services/multicultural-services-public-libraries/benchmarking-multicultural-services
- State Library of New South Wales. *Living Learning Libraries — a population approach: Standards and Guidelines for NSW Public Libraries* (7th edition).
- Australian Library and Information Association — multicultural service guidance. **[TO SOURCE]**
- International Federation of Library Associations and Institutions — *Multicultural Communities: Guidelines for Library Services.* **[TO SOURCE]**
- Australian Bureau of Statistics. Census of Population and Housing 2021, Georges River local government area — language used at home. **[TO VERIFY: retrieve and cite specific figures]**

*All bracketed items must be resolved before this paper is presented as final. No figure in this document should be treated as confirmed while it carries a [TO VERIFY] or [TO SOURCE] marker.*
