---
type: Study Note
title: "Are Tools All We Need? Unveiling the Tool-Use Tax in LLM Agents"
description: Study notes on a controlled decomposition of tool-call formatting, protocol overhead, execution gain, and capability overlap under semantic distractors.
resource: https://arxiv.org/abs/2605.00136v1
source: /archive/tool-use-tax-llm-agents.pdf
tags: [tool-use, agents, evaluation, reasoning]
timestamp: 2026-07-22T06:16:14Z
---

# Are Tools All We Need? - Study Notes

**Authors**: Kaituo Zhang, Zhen Xiong, Mingyu Zhong, Zhimeng Jiang, Zhouyuan Yuan, Zhecheng Li, Ying Lin  
**Venue**: arXiv preprint: 2605.00136v1  
**Pages**: 26

## What It Is

This paper argues that an agent's tool interface can hurt performance even when the tool itself is useful. It calls that loss the **tool-use tax**: the aggregate degradation introduced by function-call formatting and the interaction protocol before useful tool execution is even considered.

The authors stress-test this idea using GSM8K and HotPotQA augmented with semantic distractors: thematically related background, semantic paraphrases, parallel-entity hard negatives, and hedged/uncertain statements. The supplied tools are a calculator for GSM8K and search/read/compare/calculator operations for HotPotQA.

The key insight is not “never use tools.” It is that a useful tool can deliver a positive computation gain while the surrounding protocol still causes a net loss, especially when a task is already mostly solvable with native chain-of-thought.

## Factorized Intervention Framework

The paper decomposes the path from direct reasoning to a full tool agent into four conditions sharing the same noisy input:

```text
NoTool-CoT → NoTool-FCStyle → Agent-NoopTool → Agent-Full
```

This separates three changes in accuracy:

- **Style cost (Δsty)** — the effect of adopting strict function-calling output format with no tool access.
- **Protocol overhead (Δfrc)** — the effect of entering the function-calling loop, measured by an agent whose tool returns a no-op stub.
- **Computation gain (Δcmp)** — the net effect of restoring actual tool execution.

The sum equals the full CoT-to-tool accuracy difference. Three additional probes supply oracle calculator output, clean evidence, or a one-turn interaction budget. The authors also label each failed trajectory by symptom (under-computation, tool execution error, evidence drift, integration failure, no usable output, or planning mismatch) and separately attribute a failure to the *earliest* point in the controlled degradation chain.

That distinction is valuable: a trajectory that appears to have weak planning may have first failed because the function-calling protocol perturbed an otherwise solvable task.

## Results That Stood Out

On the noisy GSM8K setting, direct CoT outperformed Agent-Full for all three reported models:

- Qwen3-4B: **85.44% CoT** versus **52.08% Agent-Full**.
- Qwen3-32B: **91.40%** versus **75.76%**.
- GPT-4.1-mini: **90.72%** versus **76.60%**.

The gap was much smaller on HotPotQA (0.62–2.47 percentage points), supporting the paper's claim that sequential computation is especially vulnerable: one protocol disruption can invalidate the remaining chain, whereas retrieval QA can sometimes recover through partial evidence or parametric knowledge.

For Qwen3-4B on GSM8K, actual tool execution gained **21.44 points**, but function-calling protocol overhead cost **54.20 points** and formatting cost another 0.60, leaving a net **−33.36-point** gap. The tool was therefore helpful in isolation but not helpful enough in the complete agent path.

## Capability Overlap Principle

The paper defines *tool-benefited* samples as cases where Agent-Full succeeds and Agent-NoopTool fails. It then asks how many of those are also solved by plain CoT. On GSM8K, that overlap is 89.6% for Qwen3-4B, 94.0% for Qwen3-32B, and 95.4% for GPT-4.1-mini.

The interpretation is subtle: a positive tool gain may be mostly redundant with a capability the model already has. If the tool then introduces a broad protocol penalty, it can hurt many more cases than it uniquely saves. The authors find lower overlap for stronger models on HotPotQA, but also note that overlap alone cannot determine the net effect—the task's tolerance to protocol noise matters too.

## G-STEP: A Targeted Recovery Gate

The proposed mitigation is a small classifier at the point where an agent would terminate its function-calling loop. It predicts whether to continue for one more tool-conditioned step or commit to the answer. Its supervision includes cases where the full agent failed but direct CoT succeeded, plus heuristics such as premature stopping before two tool calls; the optional +CRITIC variant adds a reflection step after calculator calls.

On the held-out GSM8K/Qwen3-4B split, Agent-Full scored 50.64%, the gate 69.12%, and gate plus critic 74.88%, closing 75.75% of the gap to CoT. The gains were much smaller or absent where failures were mostly genuine capability limits, which is exactly the condition under which a gate should not be expected to repair the agent.

## My Takeaways

1. **Compare an agent to the real no-tool baseline.** A tool pipeline should be judged against the direct policy users would otherwise run, not only against an intentionally weakened tool-free control.
2. **Measure the entire interaction path.** Correct tool selection is not enough; prompt format, extra turns, parsing, retries, output integration, and stop policy all contribute to net value.
3. **Separate failure appearance from failure origin.** “The agent under-computed” can be the visible result of entering a damaging protocol, not evidence that it needed a larger reasoning budget.
4. **Route tools when their capability is complementary.** The best candidate is not every request with an available tool, but a request where expected information or computation gain exceeds the added protocol cost.

## What I Would Question

- The distractors are generated and the tool environments are controlled. The measured tax may not transfer quantitatively to web browsing, enterprise APIs, or stateful side effects.
- The decomposition changes several surface features at once in each condition; it is a useful operational attribution, not a proof that each term is independent in a deployed agent.
- G-STEP relies on per-setting labels and features, including hindsight about CoT fixability. Its training and calibration burden may be material in a heterogeneous production tool ecosystem.
- The work focuses on accuracy under semantic noise. A real routing policy also needs latency, monetary cost, permissions, freshness, and safety constraints.

## Vault Ideas Extracted

* [Tool-Use Protocol Tax](/vault/tool-use-protocol-tax.md)
