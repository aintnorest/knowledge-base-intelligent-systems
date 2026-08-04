---
type: Study Note
title: "Rethinking the Evaluation of Harness Evolution for Agents"
description: "Study notes on a controlled Terminal-Bench comparison showing why harness evolution needs budget-matched discovery baselines and held-out transfer tests."
resource: https://arxiv.org/abs/2607.12227v1
source: /archive/rethinking-harness-evolution-evaluation.pdf
tags: [agent-harness, self-improvement, evaluation, generalization, agents]
timestamp: 2026-07-22T00:32:30Z
---

# Rethinking the Evaluation of Harness Evolution for Agents — Study Notes

**Authors**: Yike Wang, Huaisheng Zhu, Zhengyu Hu, Yige Yuan, Zhengyu Chen, Shakti Senthil, Hannaneh Hajishirzi, Yulia Tsvetkov, Pradeep Dasigi, and Teng Xiao
**Venue**: arXiv:2607.12227v1 [cs.AI]
**Date**: July 14, 2026
**Pages**: 13
**DOI**: 10.48550/arXiv.2607.12227

## What It Is

This paper challenges the common evaluation protocol for automatic agent-harness evolution. In that protocol, an optimizer repeatedly sees feedback from a public benchmark, modifies prompts, tools, memory, or middleware, and then reports performance on the same benchmark. The authors argue that this blends two distinct effects: discovering better reusable harness design and simply spending more inference on the evaluated tasks.

Their alternative is to compare methods under matched feedback and rollout budgets, then evaluate any supposedly reusable harness on tasks not used to evolve it. The paper is not a claim that harness engineering is unimportant. It is a claim that performance gains require a baseline that can spend comparable compute on task-level discovery and a split that can distinguish transfer from benchmark memorization.

## The Controlled Comparison

The paper defines four ways to spend a fixed budget. Parallel sampling draws independent task solutions. Sequential refinement revises a task trajectory. Harness evolution uses a batch of tasks to update a shared harness. Harness scaling updates a harness for one instance, making it a harness-level form of test-time scaling.

All methods use the same initial harness, specify their available feedback, and use a budget of five iterations/rollouts in the main setup. The experiments use Terminal-Bench 2.1's 89 terminal tasks with Claude Opus 4.6, GPT-5.4, and GPT-5.4 mini; the reported values are averages over two independent runs. This design matters because an evolved harness is a reusable artifact whereas the simple baselines deliberately optimize only the current task's trajectory.

## Important Results

Without unit-test feedback, parallel sampling is the strongest average method: it raises pass@1 from 68.2 for direct sampling to 72.3. Sequential refinement reaches 69.3, harness scaling 71.8, and harness evolution 67.4. The paper attributes the weak evolution result to noisy self-generated feedback, which can compound an early incorrect diagnosis into a worse shared harness.

When unit tests are available, every iterative method benefits, but the simple discovery baselines remain stronger. Parallel sampling reaches an 86.0 average pass@1, versus 75.8 for harness evolution and 82.6 for harness scaling; sequential refinement has the strongest reported pass@5 at 91.8. The authors' interpretation is that oracle selection among multiple attempts, not a reliably improved harness, explains much of the apparent benefit.

For transfer, they evolve a harness on 45 tasks, select it on 10 validation tasks, and test it on 34 held-out tasks. The held-out gain averages only 0.6 points: +1.2 for Claude Opus 4.6 and +0.0 for GPT-5.4. Inspecting edits shows plausible fixes—more verification, timeout handling, delivery reminders, and tool guidance—but many encode task-specific paths, commands, or facts. That behavior can save rediscovery time without converting previously unsolved task classes into successes.

## Analyst Takeaways

1. **Match resources before claiming an optimizer is better.** A shared-harness optimizer should be compared with trajectory-level sampling and refinement that receive the same feedback, rollout count, token budget, and model.
2. **Separate artifact selection from final measurement.** Select a harness on a validation split, then evaluate on held-out tasks; reporting its score on search tasks is evidence of fitting, not transfer.
3. **Inspect the learned artifact.** Categorize edits as general policies, environment-specific facts, task-specific procedures, or regressions. A rising persistent-context budget can be a warning sign for memorization.
4. **Choose harness-sensitive tasks.** A benchmark with little headroom or little dependence on tools, retrieval, workflow, and middleware may be a poor testbed for harness evolution.

## Questions and Limitations

- The study is centered on Terminal-Bench 2.1 and a specific family of evolution implementations; it does not prove that every possible harness optimizer fails to generalize.
- The result is conditional on the feedback signal, the five-step budget, and the models available in the experiment.
- A held-out gain of 0.6 points is not a general estimate of harness-evolution value; it is evidence that the paper's tested protocol needs stronger transfer evidence.
- Task-level scaling is not a substitute when a deployment genuinely needs a reusable artifact, but it is the required counterfactual for deciding whether that artifact is adding value.

## Vault Ideas Extracted

* [Budget-Matched Harness-Evolution Evaluation](/vault/budget-matched-harness-evolution-evaluation.md)
