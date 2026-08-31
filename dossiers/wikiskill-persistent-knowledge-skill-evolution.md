---
type: Study Note
title: "WikiSkill: Compiling Agent Experience into Persistent Knowledge for Skill Evolution"
description: "Three-layer framework that consolidates immutable agent traces into a persistent wiki, then uses validation-gated updates to evolve reusable skills."
resource: https://arxiv.org/abs/2608.27454v1
source: /archive/wikiskill-persistent-knowledge-skill-evolution.pdf
tags: [agents, agent-skills, self-improvement, agent-memory, verification, generalization]
timestamp: 2026-08-31T22:15:22Z
---

# WikiSkill: Compiling Agent Experience into Persistent Knowledge for Skill Evolution — Study Notes

**Authors**: Liyan Tang, Cyrus Rashtchian, Chun-Sung Ferng, Andrew Tomkins, Da-Cheng Juan, and Tu Vu  
**Venue**: arXiv:2608.27454v1 [cs.AI]  
**Date**: August 27, 2026  
**Pages**: 28

## What It Is

WikiSkill inserts a persistent knowledge layer between raw agent experience and executable skills. Its workspace has three deliberately different lifecycles: immutable execution traces in `raw/`, compounding patterns and evolution records in `wiki/`, and reversible procedural artifacts in `skills/`. The claim is that skill evolution works better when lessons from prior attempts remain organized and inspectable instead of being scattered through proposal histories.

Each iteration runs four stages: an Inference Agent executes training tasks with the active skills; a Wiki Maintainer performs root-cause analysis and consolidates successful and failed patterns; a Skill Proposer uses the wiki and current traces to edit skills; and a validation gate accepts or rolls back the candidate. Skill changes can be rejected, while the wiki retains the experiment and its outcome so a later proposer need not rediscover or repeat it.

## Results

Across LiveMath, SealQA, SpreadsheetBench, OfficeQA, and ALFWorld, WikiSkill has the highest five-task average for each of five tested models. Relative to the strongest compared skill-evolution baseline, average gains range from 3.3 to 12.0 points depending on model. Within Qwen, WikiSkill improves the no-skill average by 12.3 points at 4B, 17.5 at 9B, and 23.9 at 27B; the 9B model with skills (47.4%) exceeds the 27B model without them (39.4%).

Skills transfer across model sizes and families, sometimes beating self-evolved skills. That transfer is not universally positive: low-level workarounds useful to a small model can constrain a stronger model or consume its interaction budget. The results separate two capabilities often conflated by self-improvement systems—discovering a useful procedure and executing it reliably.

Ablations support the architectural separation. The Skill Proposer benefits from the persistent wiki, while giving the rollout agent wiki access during evolution degrades final skill quality. Raw historical knowledge is useful to the optimizer but can distract the task executor or let it bypass the procedural artifact being evaluated.

## Analyst Takeaways

1. **Give artifacts different retention rules.** Evidence should be immutable, learned patterns cumulative, and deployed procedures reversible.
2. **Record rejected interventions as knowledge.** Rollback without memory invites the optimizer to repeat failed edits.
3. **Keep optimizer knowledge out of the execution path by default.** Evaluate the skill rather than an executor that can mine all training history.
4. **Test source–target pairs before distributing a skill.** Procedural knowledge may be portable, but model-specific workarounds can create negative transfer.

## Questions and Limitations

- The framework uses labeled train/validation/test splits and repeated benchmark evolution; production tasks may lack clean validators.
- Full skill injection avoids retrieval confounds but does not test progressive disclosure at larger skill-library scale.
- Wiki growth, stale patterns, poisoning, and long-run maintenance cost remain open.
- The benchmarks are broad but still bounded environments with tractable scoring.

## Vault Ideas Extracted

* [Memory Lifecycle Governance](/vault/memory-lifecycle-governance.md)
* [Score-Gated Refinement](/vault/score-gated-refinement.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
