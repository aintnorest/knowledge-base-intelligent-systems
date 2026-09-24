---
type: Study Note
title: "Skill or Skip? Learning Selective Skill Invocation in Agentic Tasks via Dual-Granularity Preference Learning"
description: "SelSkill learns whether an agent should invoke a relevant skill now, using paired invoke/skip continuations and combined episode- and decision-level preferences."
resource: https://arxiv.org/abs/2606.00510v2
source: /archive/skill-or-skip-agent-skills.pdf
tags: [agents, agent-skills, routing, reinforcement-learning, evaluation, reliability]
timestamp: 2026-09-24T03:43:40Z
---

# Skill or Skip? Learning Selective Skill Invocation in Agentic Tasks via Dual-Granularity Preference Learning — Study Notes

**Authors**: Chishui Chen, Jiaye Lin, Te Sun, Yi Yang, Junxi Wang, Cong Qin, Yangen Hu, Lu Pan, and Ke Zeng  
**Venue**: arXiv:2606.00510v2 [cs.CL]  
**Date**: August 31, 2026  
**Method**: SelSkill; Qwen3 backbone models and a fixed offline-created skill library

## What It Is

A retrieved skill may be relevant to a broad topic yet harmful at the **current decision point**. An email-composition skill, for example, can turn a request for a quick tone judgment into an irrelevant full email. SelSkill studies the conditional choice between invoking a skill and continuing without it. It does not learn the skills themselves or evolve the library; it trains a model's invocation policy using controlled comparisons.

This is a useful complement to skill retrieval. A factory needs at least three separate decisions: which existing skill is plausibly relevant, whether now is the right moment to call it, and whether its execution conditions and arguments are satisfied. Higher retrieval recall does not justify firing every retrieved capability.

## Preference Construction and Training

1. **Episode preference**: For the same task, compare successful and failed full trajectories. This supplies a global outcome signal but cannot tell whether any particular call helped or merely occurred in a successful run.
2. **Local counterfactual**: At candidate decision points, branch two rollouts from the **same trajectory prefix**. Force invocation of one named skill in one continuation and skip it in the other. Prefer success over failure; when both succeed, prefer the one taking fewer environment steps after branching; discard both-fail pairs. The shared prefix controls much of the difference between paths, though later stochastic behavior still matters.
3. **Prioritize informative forks**: Use model predictive token entropy to select uncertain skill decisions, including points following ordinary generation, rather than branching exhaustively everywhere. The paper observes increased entropy following skill injection and treats uncertainty as a heuristic, not proof that the skill is useful.
4. **Joint DPO**: Train on complete-trajectory outcome preferences plus local branch preferences, with a loss mask covering the first **three assistant turns** after each branch in the strongest reported ablation. This focuses local gradient updates near the invoke/skip choice while the global comparisons preserve task success.

The paper calls execution precision the fraction of attempted skill invocations that are valid and complete without invalid calls, unmet preconditions, malformed arguments, or execution errors. That metric is **not** precision of choosing whether a skill was necessary; it must be read alongside task success and calls per episode.

## Results

- On ALFWorld with Qwen3-8B, the skill-enabled RL initialization scores **75.8% success**, versus **78.9% with no skills**. SelSkill after three rounds reaches **86.7%**: **+10.9 points** over skill-enabled and **+7.8** over no-skill. Execution precision rises **70.9%→100.0%**, calls per episode fall **2.55→0.44**, and average steps fall **24.0→16.9**.
- On ALFWorld with Qwen3-4B, skill-enabled success is **69.5%**, then **77.3%** after two SelSkill rounds; invocation frequency stays near its baseline. This is not simply a generic skill-call suppression method.
- On BFCL with Qwen3-14B, no-skill success is **14.1%**, skill-enabled baseline **18.5%**, and SelSkill **24.2%** after two rounds. Execution precision improves **44.0%→73.5%**; calls per episode **increase** from **0.73 to 1.01**, while average steps drop **18.2→14.2**.
- On the ALFWorld one-round ablation, global-only preference training yields **75.0%** success, entropy-local-only **70.3%**, skill-call-local-only **80.5%** with **4.29 calls/episode**, and mixed signals **82.8%** with **0.66 calls/episode** and **94.1% execution precision**.
- A BFCL-trained policy transfers partially to unseen skills: PopQA exact match rises **61.0%→62.9%** relative to skill-enabled baseline, and Tau-bench average pass@1 **39.6%→41.4%**. These are modest relative to in-domain improvements.

## Analyst Takeaways

1. **Build an explicit skip path.** Trigger tests should include tasks where a capability is topically relevant but not worth loading. A skill that can solve a full workflow may distract from a small judgment or violate minimality.
2. **Use paired, identical-prefix trials for the borderline cases.** Compare invoke versus skip from the same state; inspect verified outcome, cost, and side effects. This local experiment is more diagnostic than counting calls among successful episodes.
3. **Do not optimize call reduction by itself.** The BFCL gain comes with *more* but better-executed calls. A factory should gate invocation on expected task value, valid preconditions, and authority rather than adopt “fewer tools” as the objective.
4. **Keep routing and execution metrics distinct.** Retrieval accuracy, invocation necessity, call validity, and final task correctness each expose different failures. SelSkill improves trained policy behavior; a small non-training factory can borrow the evaluation design without assuming DPO is required.
5. **Guard high-impact calls separately.** Neither a model's entropy nor a successful continuation proves a transaction, deployment, or destructive edit was authorized. Human approval and deterministic action checks remain independent.

## Questions and Limitations

- The library is fixed and built offline from training data. This study does not test continual skill creation, mutable dependencies, or simultaneous router/library evolution.
- Evaluation uses Qwen3 variants and benchmark environments; live, irreversible effects are outside its scope.
- Shared-prefix branch comparisons are more controlled than independent trajectories, but outcome differences can still reflect rollout noise; a shorter successful branch need not be safer or more maintainable.
- Entropy is only a sampling heuristic for training decisions; its calibration under new model versions, prompts, and skill formats is unknown.
- Reported execution precision measures call validity, not causal necessity. A perfectly valid invocation can still waste context or distort a correct answer.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Self-Improvement Update Targets](/vault/self-improvement-update-targets.md)
