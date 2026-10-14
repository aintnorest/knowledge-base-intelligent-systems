---
type: Study Note
title: "Specification Artifacts in Open-Source Pull Request Workflows Do Not Reduce Defects: An Empirical Test of Spec-Driven Development Claims"
description: An observational study of 88,052 open-source PRs finds no robust protective association after complexity adjustment, but predominantly measures ticket references rather than spec-driven agent workflows and cannot establish causal equivalence.
resource: https://doi.org/10.4230/LIPIcs.ESEM.2026.84
source: /archive/spec-artifacts-pull-requests-do-not-reduce-defects.pdf
tags: [requirements-engineering, code-quality, evaluation, coding-agents, agents]
timestamp: 2026-10-14T12:00:00Z
---

# Specification Artifacts in Open-Source Pull Request Workflows Do Not Reduce Defects — Study Notes

**Author**: Brenn Hill, independent researcher.  
**Published**: October 5, 2026, according to the [publisher record](https://doi.org/10.4230/LIPIcs.ESEM.2026.84). ESEM 2026, Software Engineering in Practice track, LIPIcs 394, Article 84, pp. 84:1–84:20.  
**Status**: Published ESEM conference proceedings paper, not merely a preprint. This note covers the archived 20-page proceedings version; the paper links a [full version](https://zenodo.org/records/19432099) and a [dataset and replication package](https://doi.org/10.5281/zenodo.19415187), neither independently analyzed here.

## What It Is

An observational test of five claims associated with specification-driven development: fewer defects, less rework, a quality–defect dose response, a quality–rework dose response, and stronger scope constraint for AI-assisted work. It analyzes **88,052 non-bot merged PRs across 119 open-source repositories** and compares developers' specified and unspecified work, then adjusts further for code-change risk.

The defensible finding is **no robust protective association for the measured artifacts in this sample**, not proof that specifications cannot help. The construct boundary is decisive: **97.5% of the treatment is described as issue/ticket references**, only 24 PRs are detected through filled requirements sections, and no repository commits identifiable output from the named SDD tools. Tool adoption, pre-implementation specification authorship, and agent consumption of a specification remain unobserved.

## Problem and Motivation

The paper challenges the jump from a plausible chain—clearer requirements, less ambiguity, fewer defects—to asserted production-quality gains without controlled evidence. Directing implementation, validating requirements, documenting intent, and preventing downstream defects are different benefits. A faithful implementation can preserve every wrong assumption and omission in a well-written specification.

The author reports that vendor materials provide no empirical support for their quality claims. That is the paper's assessment of the cited materials, not an independently exhaustive audit of every vendor publication. Its own observational proxy likewise cannot resolve the effectiveness of the complete specification-to-agent workflow.

## Design and Measurement

### Sampling and treatment

Collection ran **March 28–April 3, 2026**, with a 365-day repository lookback; the dataset broadly covers April 2025–early April 2026. Of 100,247 collected PRs, 12,195 bot-authored PRs were excluded. Repositories span 17 languages; Python, TypeScript, Go, and Rust account for 31, 26, 17, and 13 repositories respectively.

Selection was purposive, stratified on issue-linking/process practice and visible AI adoption, rather than population-random. Repositories were added while no effect was evident and collection stopped once the null appeared stable. The authors disclose this outcome-dependent sampling and regard it as conservative for their central argument; it still makes nominal inference and population transfer less secure than a fixed, preregistered sample.

**24,298/88,052 PRs (27.6%)** were classified as specified through issue references with linking language, issue URLs, project ticket identifiers, external document links, or a substantive requirements section. A reference is evidence of an associated artifact, not proof of its quality, temporal priority, or use during implementation. The artifact audit searched all collected PR titles, bodies, and changed paths and checked default-branch file trees in April and July 2026. It found no committed output from the named tools; three repositories explicitly ignored such output. Absence from version control is not absence of private or local use.

### Outcomes and quality

- **Defects**: Basic SZZ traces backward from fixes through version history. Coverage is **77,814 PRs in 103 repositories**; 16 repositories had unreachable merge SHAs. **9,754 PRs (12.5% of covered PRs)** were labeled bug-introducing. The cited **46–71% misattribution** range comes from external SZZ research, not a direct validation of this dataset. Larger changes and older files provide more blame targets, potentially making error differential by treatment.
- **Rework**: A later PR within **30 days** changes overlapping files and uses correction-indicating language. Files touched by more than 30% of repository PRs are excluded. **11,820 PRs (13.4%)** meet this proxy. It is independent of SZZ but does not establish that the earlier PR caused the correction or measure actual repair effort. The authors report directionally consistent associations at 14-, 30-, 60-, and 90-day windows.
- **Quality**: Claude Haiku scores seven 0–100 dimensions: outcome clarity, error states, scope boundaries, acceptance criteria, data contracts, dependency context, and behavioral specificity. **25,209 PRs** received scores, including **1,015 subsequently reclassified as unspecified**; excluding these leaves the quality nulls similar. The model version is not specified. The prose reports 17,094 scores enriched with linked issue bodies; a different issue-linked partition later needs reconciliation.
- **Human validation**: On **38 independently rated PRs**, overall human–LLM agreement is moderate (**Spearman ρ = 0.42; Pearson r = 0.45**). Four dimensions have significant agreement, while error states, data contracts, and acceptance criteria have weak agreement. The rubric captures presence/completeness rather than correctness for the domain. Quality scoring requires substantial text and therefore selects a non-random subset.
- **AI attribution**: **5,989 PRs (6.8%)** have detected markers. Against 537 clearly self-disclosed examples, precision is **98.8%**, recall **24.2%**. Untagged PRs are not established human-only work, and repositories with zero detections are not established AI-free repositories.
- **Scope**: Log-transformed additions plus deletions measures churn, not directly unauthorized scope. Median churn is 55 lines, mean 698; zero-churn PRs are excluded from this analysis as missing data.

### Identification strategy

Pooled comparisons, size-controlled logistic models, and author-demeaned linear probability models progressively address confounding. Author demeaning removes stable developer differences, not task selection, changing skill/tooling, or unobserved review practices. Standard errors are clustered by author. Within-author sample sizes are **72,046, 81,647, 19,688, 21,881, and 71,932** for H1–H5; identifying-author counts are **2,181, 2,524, 2,030, 2,297, and 366** respectively.

Additional just-in-time risk controls describe change size, entropy, file age, and experience. Nearest-neighbor propensity matching uses 13 usable JIT features plus three size controls, with a 0.05-standard-deviation caliper. The author reports all 16 covariates balanced; matched defects and SZZ-independent rework carry the main argument. This is adjustment for observed profiles, not random assignment or proof that residual confounding has disappeared.

## Results and Admissions

Coefficients below are **percentage-point differences** unless stated otherwise. Neither a positive unmatched coefficient nor a nonsignificant matched coefficient identifies the causal effect of writing a specification.

| Claim | Main evidence | Interpretation |
|---|---|---|
| H1: fewer defects | **17,375 matched pairs**, −0.6pp, p = 0.133; within-author size controls +1.4pp, 95% CI [+0.5, +2.4], p = 0.003; adding JIT controls +0.6pp, p = 0.229 | Observed risk adjustment removes the positive association; no robust protective signal, not a demonstrated zero effect. |
| H2: less rework | **19,648 matched pairs**, +0.5pp, p = 0.146; within-author +1.2pp, 95% CI [+0.5, +1.9], p = 0.001; JIT-adjusted +0.9pp, p = 0.024 | No main-model protective association; regression and matching differ on significance. |
| H3: quality reduces defects | Within-author −0.0003 per quality point, 95% CI [−0.0007, +0.0001], p = 0.164 | A ten-point score difference corresponds to −0.3pp, CI [−0.7, +0.1]; exploratory and measurement-limited. |
| H4: quality reduces rework | Coefficient rounds to zero, p = 0.860 | No detected relationship; rounded confidence bounds are not exact evidence of zero uncertainty. |
| H5: stronger AI scope constraint | Specification × AI interaction **+0.000 log units**, 95% CI [−0.101, +0.102], p = 0.997 | Point estimate near zero, but the interval and low AI recall matter; churn is not a direct measure of scope compliance. |

The paper reports **12 robustness checks**, including alternative outcomes, quality dimensions, repository aggregation, quality thresholds, temporal restrictions, and complexity strata. Top-quartile and top-decile quality specifications have nonsignificant defect differences (**−0.7pp, p = 0.190; −0.5pp, p = 0.545**); the AI-plus-high-quality proxy has **175 identifying authors**, p = 0.790. These remain structured-content proxies, not observed SDD interventions.

One subgroup is protective for rework: **3,562 PRs in zero-AI-detection repositories**, **−3.3pp, nominal p = 0.014**. It fails the six-test Bonferroni threshold of **0.0083** and is explicitly treated as suggestive. There is no correction across the five main hypotheses, and all analyses are post hoc.

The task-selection explanation is plausible: specified PRs add **1.8× more lines**, touch **2.3× older files**, involve **1.3× more prior developers**, and have authors with median **64 versus 116** prior commits. Adding specification presence to a JIT defect predictor improves explained variance by only **0.0002**. These observations support confounding by indication—extra process accompanies harder work—but do not prove that this is the complete causal explanation.

## Analyst Takeaways

1. **Do not confuse artifact presence with an intervention.** A ticket reference, a rich PR description, a preapproved behavioral contract, and a structured specification actually consumed by an agent are different treatments. [How to Write a Good Spec for AI Agents](/dossiers/good-spec-ai-agents.md) proposes an outcome-first control loop; this paper does not test that loop directly.
2. **Keep direction and assurance separate.** [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md) supplies inspectable governance, not an automatic defect guarantee. [Kiro's requirements-analysis account](/dossiers/kiro-requirements-analysis.md) explicitly separates logical model checking from intent fidelity; this PR study measures neither the solver nor that review intervention.
3. **Match the evaluation to the decision.** Observational associations can diagnose selection effects and motivate experiments, but a decision to adopt specification tooling needs actual workflow exposure, acceptance evidence, effort, and downstream outcomes. [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md) is the appropriate synthesis home.
4. **Audit attribution and outcomes independently.** As with [AI-to-AI Code Reviews of GitHub Pull Requests](/dossiers/ai-to-ai-code-reviews-github-prs.md), signatures define an identifiable subset, not total adoption. Here SZZ defects and overlap-based rework also require validation; an outcome closer to production is still a proxy.

## Questions and Limitations

- **Causal identification**: The paper admits it cannot separate a true zero effect from a small benefit hidden by residual task selection. Matching requires adequate measured confounders and overlap. As an additional analyst concern, change-size controls can themselves be downstream of a specification if the intervention changes decomposition or scope; conditioning on them need not estimate its total effect.
- **Null versus equivalence**: No preregistered equivalence margin or equivalence test is reported. The main matched rows give p-values without confidence intervals. “Indistinguishable” and “any protective effect is smaller than detectable” are stronger than a nonsignificance result alone warrants. The H5 interval is not a precision-free proof of no useful difference.
- **Measurement**: Specifications may be written after implementation, never supplied to an agent, or invisible in the control group. A complete-looking rubric cannot detect all wrong premises. SZZ noise can be differential; corrective file overlap can misattribute repair. Low-recall AI attribution dilutes comparisons.
- **Sampling and observation horizon**: Purposive open-source selection, outcome-dependent expansion, and mostly pre-widespread-agentic PRs constrain transfer to commercial teams. Recent changes have less time for defects to be discovered. The author's assertion that right-censoring affects only absolute, not relative rates requires comparable discovery timing across groups and is not established by the reported analyses.
- **Unmeasured benefits**: Auditable intent, coordination, requirements discovery, and accountability are plausible uses, not benefits measured here. Conversely, the study cannot establish that an unobserved SDD tool achieves them or reduces defects.

## Internal Inconsistencies and Numerical Cautions

- **Treatment decomposition**: Table 2 counts sum to **24,297**, one fewer than its stated total of **24,298**. Its issue/ticket rows total 23,712, about **97.6%**, versus the prose's 97.5%; the core construct conclusion is unchanged.
- **Quality-enrichment denominator**: Section 4.2.2 and Table 1 report **17,094** scored PRs with issue bodies, but the same methods section partitions scores into **13,081 issue-linked** and **12,128 description-only** PRs. The latter two sum correctly to 25,209; the relationship between the two issue-associated counts is unexplained.
- **Logit versus probability**: Section 5.3 translates the size-controlled logistic quality coefficient **−0.002** into a **2pp** reduction for ten score points. It is a log-odds coefficient, not an LPM probability coefficient; a probability change needs a baseline. The within-author −0.0003 coefficient legitimately gives −0.3pp per ten points.
- **Log-scale percentages**: Section 5.5 calls +0.120 and +0.140 log-churn coefficients **+12.0% and +14.0%**. Those are linear approximations; exponentiation gives about **+12.7% and +15.0% on the churn-plus-one scale**. Neither is direct evidence of unwanted scope expansion.
- **Rhetorical overstatement**: “Confirms” that matching eliminates confounding and the conclusion's no-benefit language should be read alongside the explicit admissions about residual selection, proxy treatment, and unobserved tool use. The single protective subgroup is disclosed and multiplicity-qualified rather than concealed.

## Vault Ideas Extracted

- [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md) — updated to distinguish inspectable intent and representational completeness from domain correctness, actual workflow exposure, and demonstrated downstream assurance.
- [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md) — updated with process-adoption confounding, differential outcome noise, attribution coverage, observation horizons, and the distinction between a matched null and causal equivalence.
