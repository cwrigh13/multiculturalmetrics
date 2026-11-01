# Benchmark Sources and Methodology

*Status: complete for SLNSW. ALIA and IFLA sections are [TO SOURCE].*

This document records exactly which standards the dashboard measures against, how they are cited, and the rule for assigning a maturity level from evidence. Its purpose is to prevent false precision and mis-attribution: the dashboard must represent each standard as it actually is, and attribute every figure to its correct source.

## 1. Primary standard

**NSW Multicultural Library Service Benchmarks**, State Library of New South Wales. Originally created 2003, revised after the 2017 statewide research project, updated 2024 to reflect contemporary terminology. Reviewed December 2025.
Source: https://pls.sl.nsw.gov.au/statewide-services/multicultural-services-public-libraries/benchmarking-multicultural-services
Downloadable PDF: linked from that page ("Multicultural library service benchmarks").

**Nature of the standard.** It is a five-point maturity scale, not a set of numeric targets. A library tracks its progress and will typically sit at different levels for different areas. The levels are:

- **Level 5 — Exemplary:** CALD needs fully integrated into ongoing planning and operation; activities are identified, measurable, and part of mainstream library activity.
- **Level 4 — Enhanced:** well-developed planning and promotion for CALD audiences, evaluated by management but not yet part of overall library activity.
- **Level 3 — Average:** a range of planning, promotion, and access activities, with limited evaluation and therefore limited feedback into planning.
- **Level 2 — Improving:** limited resources allocated to multicultural service provision.
- **Level 1 — Entry:** activities relevant to CALD needs occur but are unplanned and ad hoc.

The framework is overwhelmingly qualitative. The single quantitative element is in Benchmark 5 (Evaluation), Exemplary level: formal audience research carried out at least biennially.

## 2. The five benchmark areas and their level descriptors

Descriptors below are summarised from the SLNSW source for working use; the published PDF is authoritative where any wording matters. (SLNSW content is published under Creative Commons Attribution.)

### Benchmark 1 — Planning for relevant library services
- **Exemplary:** mechanisms let diverse community representatives identify needs; comprehensive demographic data (English language proficiency, recency of arrival, immigration category, age) informs planning; planning allocates staffing, resourcing, and planning; strong ongoing partnerships with CALD organisations.
- **Enhanced:** community engagement includes CALD input; CALD demographic data used, though not integrated with other data; multicultural planning occurs but is not integrated with whole-of-library plans; partnerships exist.
- **Average:** limited consultation; planning identifies CALD issues but not linked to resourcing; limited demographic data used (e.g. language spoken at home only); limited partnerships.
- **Improving:** engagement limited to complaints/feedback; demographic data not used in planning; CALD issues handled only within Council's community-development goals.
- **Entry:** no allowance for CALD involvement; little use of population data; informal, ad hoc planning; no social-inclusion strategy.

### Benchmark 2 — Organisational capacity
- **Exemplary:** multicultural policy integrated into overall library policy; staff capability built through training, appraisal, and support; strong relationships with communities and government; resourcing for multilingual collections/services; digital inclusion prioritised; bilingual/community-language programming offered.
- **Enhanced:** LOTE collection-development policy exists but not integrated; cross-cultural training compulsory; LOTE use monitored and funding protected; relationships being built; LOTE digital-skills and bilingual programming available.
- **Average:** collection policy mentions multicultural service but not in detail; cross-cultural training exists but not compulsory; resources allocated but not monitored; limited relationships; limited LOTE digital programming.
- **Improving:** no formal multicultural collection policy; no formal cross-cultural training; no identified resource allocation; ad hoc relationships.
- **Entry:** no policy, training, resource allocation, or community/government relationship.

### Benchmark 3 — Quality of service and collections
- **Exemplary:** comprehensive, current materials reflecting community profiles; services respond to consultation; collections easily accessed; LMS displays non-Roman script; self-check instructions in community languages; CALD contributions to local studies including oral histories with transcription/translation.
- **Enhanced:** minimum collection requirements (stock numbers, age) set for a range of language groups; services reflect diversity; some LOTE cataloguing; catalogue advice promoted to CALD clients; LMS can display non-Roman script; actively seeking local-studies contributions.
- **Average:** collection quality varies or favours the dominant group; services reflect the dominant group only; catalogue advice provided but not promoted; exploring local-studies options.
- **Improving:** multilingual material does not match the current community profile; most users served in English only; LOTE not promoted; no CALD local studies.
- **Entry:** limited or out-of-date materials; no multilingual services or cataloguing; no CALD local studies.

### Benchmark 4 — Promotions and delivery
- **Exemplary:** a fully developed multicultural communication strategy, integrated into library/council communications, matching message, recipient, and medium, resourced for LOTE needs; LOTE collections promoted; appropriate social media used for LOTE promotion.
- **Enhanced:** communication and language targeting based on client analysis; non-English communications part of mainstream; translation of documents and signage in priority languages; some consideration of diverse-group needs; LOTE promoted, including via social media.
- **Average:** a range of LOTE information media based on client research; publicity tested for cultural appropriateness before ethnic media; document translation based on client data; exploring social media.
- **Improving:** no planned multilingual promotion; translated documents not supported by demographic data; no multilingual signage; flexible delivery exists but not used for CALD needs.
- **Entry:** no promotion of multicultural services; no ethnic-media advertising; English-only documents; no multilingual signage.

### Benchmark 5 — Evaluation
- **Exemplary:** formal audience research carried out at least biennially to assess success in meeting client needs. *(The one quantitative descriptor in the standard.)*
- **Enhanced:** customer feedback mechanisms exist with responses sought from all users; comprehensive user research includes CALD participants.
- **Average:** feedback mechanisms with capacity to meet CALD needs are available; client research provides for English and other main non-English language groups.
- **Improving:** feedback mechanisms promoted only in English; some client research, but only in English.
- **Entry:** feedback only in English and complaint-based; no research into success in meeting CALD client needs.

## 3. How a level is assigned (the assessor's rule)

For each of the five areas:

1. Gather the evidence the descriptors call for (policies, training records, collection and catalogue facts, promotion artefacts, evaluation activity).
2. Identify the highest level for which the library meets substantially all descriptors. If some but not all are met, the library sits at the level below, and the unmet descriptors become the improvement target.
3. Record the assigned level (1–5), a dated evidence note stating why, and the assessor. Store as a new row in `benchmarks.csv` — never overwrite a prior assessment, so history is preserved.
4. Re-assess on a defined cadence [TO CONFIRM: cadence, e.g. annually].

No level is ever inferred automatically from program-activity figures. Activity data and benchmark level are separate.

## 4. Secondary standards

- **ALIA** multicultural service guidance — **[TO SOURCE]**. Not yet held; not represented in the tool until obtained and cited here.
- **IFLA** *Multicultural Communities: Guidelines for Library Services* — **[TO SOURCE]**. If numeric collection guidance (e.g. per-capita stock formulas) is ever wanted, it is attributable to IFLA, not SLNSW. Any such figure must cite IFLA with edition and page.

## 5. Anti-fabrication rule

No numeric "benchmark target" is to be attributed to SLNSW, because the SLNSW benchmarks contain none beyond the biennial-research descriptor. Any number entering the tool must name its source. Unheld figures remain [TO VERIFY] until sourced.
