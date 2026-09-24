---
type: Study Note
title: "Socratic-SWE: Self-Evolving Coding Agents via Trace-Derived Agent Skills"
description: "Closed-loop coding-agent training that distills solver traces into skills for targeted repository-task generation, execution validation, and gradient-aligned curriculum selection."
resource: https://arxiv.org/abs/2606.07412v1
source: /archive/socratic-swe.pdf
tags: [agents, coding-agents, agent-skills, reinforcement-learning, verification, evaluation]
timestamp: 2026-09-24T03:43:40Z
---

# Socratic-SWE: Self-Evolving Coding Agents via Trace-Derived Agent Skills — Study Notes

**Authors**: Chuan Xiao, Zhengbo Jiao, Shaobo Wang, Wei Wang, Bing Zhao, Hu Wei, Linfeng Zhang, and Lin Qu  
**Venue**: arXiv:2606.07412v1 [cs.SE]  
**Date**: June 8, 2026 (paper date; arXiv header June 5)  
**Setting**: Qwen3.5-9B shared generator/solver policy; mini-swe-agent and little-coder harnesses

## What It Is

Socratic-SWE uses historical coding-agent traces to improve the **distribution of training tasks** offered to the next solver, rather than merely adding tips to a deployed prompt. It distills successful repair strategies and recurring failures into an Agent Skill Registry, uses those skills to generate repository-grounded repair exercises that target the current solver's weaknesses, validates those exercises with execution, and trains a shared Generator/Solver model on the accepted curriculum. New solver runs produce the next generation of traces.

The distinction is important: although it names “agent skills,” the registry is chiefly **a generator-side curriculum control artifact**, and the method updates model weights via GRPO/GDPO. It is not evidence that installing the extracted registry as a `SKILL.md` library immediately improves a frozen coding agent. For a light factory without weight training, its transferable pattern is narrower: turn repeated verified failure modes into targeted, executable regression tasks, then promote validated procedures only after held-out success.

## Closed Trace–Skill–Task Loop

1. **Capture evidence**: Solver trajectories record repository inspections, edits, commands, tests, and outcomes. Both successful and failed traces contribute; the latter identify specific capability gaps.
2. **Extract skills**: A distillation model creates entries with a name, description, applicability conditions, and ordered operations. Similar entries are deduplicated and filtered by trace coverage. The Generator samples these entries to target deficiencies, rather than emitting unrelated synthetic bugs.
3. **Construct executable tasks**: The Generator proposes a repair objective and verification signal in a real repository. A staged gate checks format, grounding in actual files, executable/reproducible verification, and semantics: the verifier must distinguish broken and repaired states, and at least one valid repair must exist.
4. **Prioritize useful tasks**: A held-out trusted task set produces a validation-gradient direction. Candidate tasks receive a generator reward equal to validation status multiplied by cosine alignment between the candidate's estimated solver gradient and that direction. This aims to select tasks that improve the solver on a target distribution, not merely tasks it cannot already solve.
5. **Train and repeat**: The Solver interacts in a sandbox without seeing the reference solution or verifier internals. Its reward combines complete repair, partial repair, and preservation of originally passing tests. Generator GRPO and Solver GDPO update shared weights; new traces revise the next curriculum.

The stronger claim is about **adaptive training**, not deterministic runtime. Even though generated tasks are checked through executable outcomes, the learned policy remains probabilistic and the verifier can still be incomplete.

## Evidence

- With **12,000 validated tasks per iteration for three iterations** (36,000 total), Socratic-SWE scores **50.40%** on SWE-bench Verified, **36.67%** on Lite, **22.85%** on Pro, and **14.61%** on Terminal-Bench 2.0. Corresponding base-agent scores are **42.60%**, **29.67%**, **17.24%**, and **10.11%**.
- The strongest compared self-evolving baseline, SSR, reaches **47.00%** on Verified after three rounds. Socratic-SWE's Verified gain over base is **+7.80 points** and over SSR **+3.40 points** under the study's matched 36,000-instance training budget.
- Removing the Skill Registry drops Verified from **50.40% to 46.20%**; replacing trace-derived skills with manual skills drops it to **48.00%**; replacing GDPO with GRPO drops it to **48.60%**. These ablations support a contribution from gap-specific task construction, but do not isolate every interaction between proposal, validation, and alignment.
- Longer training reaches **51.60%** on Verified at iteration 4 and **52.00%** at iteration 5, then nearly plateaus under a fixed repository pool. A Qwen3.5-9B skill extractor yields **49.80%** versus **50.40%** for the default Qwen3.6-27B extractor, suggesting extraction model scale is not the dominant effect in this setup.
- All compared self-evolving methods use the same Qwen3.5-9B solver, principal harness, and nominal training-instance budget; baseline adaptations and their seed-task inputs differ, so the comparison is controlled in these axes, not every training choice.

## Analyst Takeaways

1. **Make factory failure history generate better exercises.** A failed code fix is useful when it becomes an executable task illustrating a recurring failure mode, with a check that fails before repair and passes after, not just another generic admonition in the prompt.
2. **Separate a skill that *guides training* from a skill that *executes work*.** The paper's registry shapes Generator proposals; a factory must independently test whether packaging the same lesson as a reusable runtime script or instruction helps a frozen worker.
3. **Admit synthetic code tasks only through reproducible checks.** Existing-file grounding, stable tests, broken-vs-fixed discrimination, and no-regression assertions are practical filters against plausible but invalid exercises.
4. **Keep a trusted evaluation split out of the candidate generator's action space.** Gradient alignment needs its own validation direction; benchmark improvement from feedback reused in task proposal cannot demonstrate independent transfer.
5. **Use a human review gate before persistent skill or policy changes.** Tests and generated gradients validate limited properties. Inspect intended authority, data provenance, and whether a “fix” encodes benchmark quirks or weakens existing behavior.

## Questions and Limitations

- Training requires substantial compute, gradients, a stronger extraction model, sandboxed repositories, and verifiers; a lightweight frozen-model factory cannot simply copy the full algorithm.
- A fixed pool of seed repositories yields saturation by the fifth iteration; no evidence establishes open-ended improvement under continuously changing real codebases.
- Gradient alignment depends on the representativeness of a held-out BeyondSWE validation set. It measures direction on that set, not universal code quality or production maintainability.
- Generated verification can miss semantic bugs, non-functional requirements, and hidden safety constraints despite the four-stage gate.
- The paper does not report production review time, development cost per accepted task, or effects of contaminated/poisoned trace histories.

## Vault Ideas Extracted

* [Self-Improvement Update Targets](/vault/self-improvement-update-targets.md)
