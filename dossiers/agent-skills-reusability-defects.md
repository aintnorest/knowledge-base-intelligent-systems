---
type: Study Note
title: "What Keeps Agent Skills from Being Reusable? Evidence from 138K SKILL.md Files"
description: Ecosystem-scale static defect taxonomy, lexical routing probe, and repair experiments for agent-skill portability and packaging quality.
resource: https://arxiv.org/abs/2608.08453v1
source: /archive/agent-skills-reusability-defects.pdf
tags: [agent-skills, coding-agents, evaluation, generalization, agent-security, agents]
timestamp: 2026-09-24T03:44:03Z
---

# What Keeps Agent Skills from Being Reusable? Evidence from 138K SKILL.md Files — Study Notes

**Authors**: Chi Zhang, Yimin Liu, Xinze Chen, and Ping Ji  
**Venue**: Agent Skills ’26 workshop manuscript; arXiv:2608.08453v1 [cs.AI]  
**Date**: August 9, 2026  
**Pages**: 10

## What It Is

A broad survey of the *artifact prerequisites* for a reusable skill: the agent must discover it, load useful instructions, navigate resources, execute safely, and adapt beyond the author's environment. The authors collect **138,133 SHA-256-deduplicated `SKILL.md` files** from **20,556** public repositories, derive seven categories and **31** static checks, probe routing over **20,000** skills, and try a small automated-repair workflow. A static “defect” is a risk signal, not a demonstrated failed task or proven compromise.

## Corpus and Defect Model

Collection uses sharded GitHub search, repository cloning, and agentskills.in; no popularity/freshness filter is applied. The largest repository contributes **17,284** skills (**12.9%**) and **47.0%** of repositories contribute only one, so repo skew matters. The median skill body is **169 lines / 687 words**. The authors also categorize **761** relevant issues from 12 agent-platform repositories, manually inspect 300 skill files during taxonomy development, and separate **14** spec-conformance checks (routing, body, resource structure) from **17** operational best-practice checks (prohibited material, behavioral safety, portability, persona/scope).

Detectors are regex/structure-based. They have paired positive/negative mutation fixtures and threshold sweeps, *not* independently estimated corpus-wide precision/recall on a representative human-labeled holdout. Their BM25 routing stress test indexes only frontmatter descriptions; metadata- and name/path-derived queries then try to retrieve the originating skill. This tests lexical discoverability, not an actual CLI's LLM-based skill selector or task completion.

## Findings

- **91.8%** of 138,133 files trigger at least one of 31 checks, and **89.3%** at least one Tier-1 check; mean **2.5** detected defects (median **2**). Threshold variations on 10,000 files put the headline range at **88.8–94.6%**.
- Routing affects **67.0%**; body **51.4%**; resources **36.9%**; safety **9.8%**; portability **5.8%**. Missing trigger guidance affects **52.3%**, name repeated as H1 **44.3%**, and excessive inline examples **32.1%**. These have very different severity; repeated H1 is cosmetic compared with hardcoded credentials.
- In the lexical stress test, routing-clean descriptions yield **88.5% Hit@1** versus **82.6%** for defective ones on metadata queries; name/path queries yield **26.7%** versus **24.3%**. Their interpretive claim is limited to the *discovery stage*. Query derivation may itself favor certain metadata phrasing.
- Skills marked as AI-generated (at least **19,857**, **14.4%**) average **3.23** flags versus **2.34** unmarked; safety flags **18.9%** versus **8.2%**, portability **12.8%** versus **4.6%**. The marker subset is self-selected and confounded: this does **not** show that AI authorship causes defects.
- Among **2,406** skills in highly starred repositories, **419** have zero detected flags. Qualitative examples include a 24-line React verification skill and a 220-line service workflow. The genuinely independent observation is specific local knowledge; “no name-as-heading” and similar traits partly follow by construction from selecting zero-detector hits.
- A three-rule linter covering trigger text, duplicated heading and resources detects **71.9%** of observed flag *instances*, while flagging **85.9%** of files. An LLM repair experiment on **200** defective skills fixes **58.4%** of detected defects but fixes **0%** of bypass and injection defects; the authors recommend non-bypassable safety gates rather than trusting repair.

## Analyst Takeaways

1. **Quality-gate routing first, but test real user requests.** Write a concise “use when” boundary and include near-miss prompts; BM25's 5.9-point gap signals possible missed selection, not end-to-end benefit.
2. **Prioritize critical over cosmetic findings.** Reject embedded secrets, safety bypasses and unauthorized destructive operations; review oversized bodies and missing resource separation for actual context cost; do not reject useful skills solely for repeated headings.
3. **Use local repository-specific procedures, not generic tutorials or saved chat transcripts.** The hypothesized conversation-to-skill provenance is *unmeasured*; the useful intervention is to test actual transfer to another task/environment and eliminate hardcoded paths or model names.
4. **Do not equate automated repair with security clearance.** Static detectors miss context, and the reported repair loop failed on the highest-risk injection and bypass classes; require separate human and runtime authorization boundaries.

## Questions and Limitations

- This is public-file static analysis, not measured portability on another repository/model, nor a test of whether the skills improve output correctness. Detector false-positive rates are not established by the mutation fixtures.
- The specification and authoring recommendations are partly blended in Tier 1; a repeated H1 and overlong description need not make a skill non-compliant or unusable in every runtime.
- The largest repository and platform conventions can dominate associations; issue classification and AI-generation marker presence do not establish causation.
- The repair sample is small and evaluated against the same checks it aims to fix; passing a linter is not a measured safety or usability outcome.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
* [Skill Artifact Quality Gates](/vault/skill-artifact-quality-gates.md)
