---
type: Study Note
title: "From Anatomy to Smells: An Empirical Study of SKILL.md in Agent Skills"
description: Qualitative anatomy and automated smell study of popular skill files; widespread authoring-pattern flags persist, but their task-level harms remain unmeasured.
resource: https://arxiv.org/abs/2607.01456v2
source: /archive/skill-md-anatomy-and-smells.pdf
tags: [agent-skills, coding-agents, evaluation, reliability, agents]
timestamp: 2026-09-24T03:44:03Z
---

# From Anatomy to Smells: An Empirical Study of SKILL.md in Agent Skills — Study Notes

**Authors**: David Boram Hong, Aaron Imani, and Iftekhar Ahmed  
**Affiliation**: University of California, Irvine  
**Venue**: arXiv:2607.01456v2 [cs.SE]  
**Date**: July 3, 2026  
**Pages**: 12

## What It Is

An empirical anatomy of `SKILL.md` rather than an end-to-end agent-performance benchmark. The authors classify the semantic components present in **238** marketplace skills, derive authoring advice from **29** multivocal literature sources, operationalize **26** deviations as “skill smells,” and observe how these flags change across revision histories. The design helps reviewers ask concrete questions about skill packaging; it does *not* show that removing any particular flag increases task success.

## Corpus and Method

From a skills.sh dump of **133,149** skills, the study filters to English skills, at least **10 weekly downloads**, and top-decile repository stars (threshold **8,000**); it deduplicates names and samples one skill per repository. Of **241** sampled skills, three were unavailable, leaving **238**. Two authors independently coded **128** development files at H2-section granularity, negotiated a taxonomy of **13 higher-level and 44 lower-level** components, then applied the codebook to the remaining **110**.

The best-practice review retained **29 of the top 50** relevant web/grey-literature results and found **26** endorsed practices, but explicit practices covered only **7 of 13** body-component classes. To evaluate semantic smell detection, two reviewers labeled **53** files and a Qwen3.6-27B 4-bit model handled semantically judged flags alongside static checks. Reported weighted precision **0.79**, recall **0.78**, F1 **0.78**. For evolution, the authors inspect **142** skills with at least two commits and track the last observed state across **35** weeks, rather than randomly intervening on skill designs.

## Taxonomy and Results

Smell families cover under-specified versus over-prescribed guidance, missing validation/feedback, missing follow-through guards, context bloat, missing safeguards, insufficient grounding, security hazards, conventions, and output structure. Examples: **No Validation Step** omits a check after generation; **Missing Decision Tree** offers no criterion for choosing branches; **Series of Commands** hardcodes an inflexible sequence; **Undelegated Detail** embeds material better reached on demand. These often point in opposite directions, so the goal is appropriate decision support, not maximal instruction volume.

The study reports **11/26** smells in more than half the sample, only **one** smell-free file, and **10.5** flags per file on average. Examples in Table IV include Rationalization Loophole **223 (94%)**, Buried Gotchas **192 (81%)**, Execute Without a Plan **185 (78%)**, Never Asks Human **184 (77%)**, No Validation Step **165 (69%)**, and Series of Commands **148 (62%)**. Some have near-zero prevalence: XML in description **0**, overly long skill name **0**. The table header says “Entire Sample (228 Skills),” while the method and percentages use **238**; do not infer a new denominator from that likely typo.

Across the 142 multi-commit histories, the paper finds no systematic decline in flags; most persist after introduction. Weekly membership changes over time, so the authors also examine the period when all 142 are present and report broadly stable prevalence. This is persistence of *detected conventions*, not proof that every one is a performance defect.

## Analyst Takeaways

1. **Review a skill as an executable workflow artifact, not passive documentation.** Verify trigger text, applicability decisions, real outputs, safety boundaries and validation points as part of a change review.
2. **Use smells to prompt investigation, not enforce a universal template.** “Never Asks Human” can be a false problem in a harmless deterministic script; “Series of Commands” may be warranted when sequence is essential. Ask which failure a rule prevents.
3. **Balance specificity with flexibility.** Retain short, verifiable decision points and hard-won gotchas, while moving low-frequency documentation or deterministic transformations behind focused references or scripts.
4. **Track quality across revisions.** A root file can accumulate stale paths, rigid instructions and missing checks even as the code evolves; re-evaluate the whole skill after edits, not only the changed lines.

## Questions and Limitations

- Popular, English-language skills in highly starred repositories are not representative of all marketplace skills or private organizational skill libraries.
- The literature review is mostly web guidance; a smell may encode a disputed norm. The particularly broad rationalization, plan and human-feedback categories risk false positives without task context.
- Detector F1 **0.78** on a small labeled set means prevalence numbers are estimates with classification error; only one quantized model was used for semantic labels.
- No controlled with/without intervention establishes causal effects on agent correctness, safety, token use or code-review quality. The paper extrapolates from adjacent LLM research and explicitly calls for those experiments.

## Vault Ideas Extracted

* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
* [Skill Artifact Quality Gates](/vault/skill-artifact-quality-gates.md)
