---
type: Study Note
title: "Agent Skills in the Wild: An Empirical Study of Security Vulnerabilities at Scale"
description: A marketplace security census distinguishes widespread risky patterns from confirmed malicious skills and tests a hybrid static-and-semantic scanner.
resource: https://arxiv.org/abs/2601.10338v1
source: /archive/agent-skills-security-vulnerabilities-wild.pdf
tags: [agent-skills, agent-security, evaluation, prompt-injection, access-control, agents]
timestamp: 2026-09-24T03:44:03Z
---

# Agent Skills in the Wild: An Empirical Study of Security Vulnerabilities at Scale — Study Notes

**Authors**: Yi Liu, Weizhe Wang, Ruitao Feng, Yao Zhang, Guangquan Xu, Gelei Deng, Yuekang Li, and Leo Zhang  
**Venue**: arXiv:2601.10338v1 [cs.CR]; manuscript retains placeholder ACM conference and DOI metadata  
**Date**: January 15, 2026  
**Pages**: 23

## What It Is

A security census of community-contributed Agent Skills, which combine `SKILL.md` instructions with optional executable scripts. The authors collect 42,447 skills from two marketplaces, deduplicate and filter to 31,132 analyzed skills, develop a 14-pattern taxonomy in four families, and apply SkillScan, a static-pattern scanner followed by an LLM semantic classifier. Their **26.1%** headline is a rate of *detected potentially dangerous patterns*, not a rate of confirmed intentional malware or successful exploitation.

## Threat Model and Method

Skills may be loaded as trusted procedural context and then ask the agent to read files, invoke tools, or run bundled programs under the user's authority. The four categories are instruction-level prompt injection (4 patterns), data exfiltration (4), privilege escalation (3), and supply-chain risk (3). The taxonomy intentionally includes negligent configuration alongside deliberate attacks: unpinned dependencies and excessive permissions are not equivalent to a hidden exfiltration endpoint.

Pattern creation used an initial 500-skill sample, calibration used a disjoint 300-skill sample, and final validation used a temporally later 200-skill manually annotated holdout with 63 vulnerable labels. Static rules target source and instructions; the semantic model filters suspicious syntactic matches using surrounding intent. Static-only precision/recall were **71.4%/91.2%**; combined precision/recall **86.7%/82.5%** (F1 **84.6%**). Semantic filtering therefore gained 15.3 precision points but lost 8.7 recall points. The validation base rate (31.5%) differs from the full-corpus detected rate, and the paper also reports inverse-probability-weighted precision **84.5%** and recall **83.8%**. A 25-skill pilot of high-confidence candidates found exploitable behavior in **72%**, not a population-wide dynamic verification.

## Key Results

- **8,126 / 31,132 (26.1%)** were flagged at least once: data exfiltration **4,133 (13.3%)**, privilege escalation **3,671 (11.8%)**, supply chain **2,296 (7.4%)**, and prompt injection **209 (0.7%)**. Categories overlap. An error-adjusted aggregate estimate is **26.5%**, with a reported 95% interval **23.1–30.2%**.
- Highest detected severity per skill: **1,619 (5.2%) high**, **2,522 (8.1%) medium**, and **3,985 (12.8%) low only**. Of **87** intensively reviewed highest-risk skills, only **23 (26.4%)** had clear indicators of malicious intent. Neither high severity nor an automated hit should be silently relabeled confirmed malware.
- **3,594** flagged skills (**44.2%** of flagged) cross at least two category boundaries. Script-bundling skills had a **40.6%** hit rate versus **24.2%** for instruction-only packages (reported OR **2.12**). Skills over 500 lines had reported OR **2.14** (95% CI **1.62–2.83**) versus smaller skills. These are associations, not causal effects of adding code or length.
- A stratified functional sample of 1,218 has **38.7%** flagged, higher than the whole collection by sampling design; inverse-probability weighting brings it to **27.3%**. Do not export subgroup absolute prevalence from this enriched sample as marketplace base rates.
- Illustrative worst-case examples include a purported cloud-backup script gathering credentials, hidden instructions in a code-review skill to auto-approve security-exempt comments, and remote fetched scripts plus obfuscated hooks in a dependency manager. The authors selected these for severity and diversity, not representativeness.

## Analyst Takeaways

1. **Treat a downloaded skill as third-party code plus untrusted instructions.** Inspect `SKILL.md`, scripts, references, dependencies and network destinations before activating it in a developer workstation; do not infer safety from a marketplace listing or star count.
2. **Separate triage from proof.** A broad scanner is useful for selecting human-review targets, but its 26.1% hit rate includes low-severity hygiene and dual-use functions. Confirm consequential behavior and destination ownership before accusing an author.
3. **Constrain effects independently of review.** Pin dependencies, scope filesystem/tool/network authority, and require explicit approval for risky effects; even a correctly classified skill can change through later dependency or script updates.
4. **Run both positive and negative scanner validation.** Semantic filtering reduced false alarms but also missed more positives; include benign security tools, intentionally adversarial instruction text, and unusual code packaging in the local suite.

## Questions and Limitations

- The manuscript still prints `10.1145/nnnnnnn.nnnnnnn` and `Conference’17` placeholders; these are *not* a real publisher DOI or verified conference venue. Use the arXiv identifier.
- The snapshot predates rapidly changing registries, excludes private and deleted skills, and lacks full execution-based confirmation. The text notes 17.3% became unavailable before analysis and suggests potential selection bias, not its proven direction.
- Detector performance on the small holdout and the model's run-to-run/prompt sensitivity (reported **5.5%/9.0%**) limit precision of projected rates. Category-specific estimates have wider intervals.
- The paper's language sometimes calls flags “vulnerabilities” and high-severity patterns “likely malicious”; these are judgments about risk, not proof of exploitability or author intent. The 25-case pilot and anonymized examples cannot bridge that gap for the whole population.

## Vault Ideas Extracted

* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md)
