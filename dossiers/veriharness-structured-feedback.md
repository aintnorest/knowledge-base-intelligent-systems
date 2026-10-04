---
type: Study Note
title: Structured Feedback Improves Repair in an LLM Agent Loop
description: A paired TextWorld study attributes large repair gains to validator-provided admissible alternatives, not to JSON syntax, and shows that feedback cannot repair failures a visible test misses.
resource: https://arxiv.org/abs/2607.14167v1
source: /archive/veriharness-structured-feedback.pdf
tags: [agents, verification, agent-harness, evaluation, context-engineering]
timestamp: 2026-10-04T07:38:12Z
---

# Structured Feedback Improves Repair in an LLM Agent Loop — Study Notes

**Authors**: Jaideep Ray and Ankit Goyal (independent researchers)  
**Venue**: arXiv:2607.14167v1 [cs.SE, cs.AI]; preprint, no peer-reviewed venue identified  
**Date**: July 15, 2026

## What It Is

VeriHarness separates a model that proposes candidates from executable validators that decide acceptance, bound retries, and preserve traces. The experiment asks what information the validator should give the model after a rejection. Its positive evidence concerns **repair of short action plans in TextWorld**, not repository-scale code repair. A small Python HumanEval check demonstrates the limit of the mechanism rather than a second positive result.

## Problem and Motivation

“Invalid action” tells an agent that its candidate failed without necessarily teaching it how to choose a valid replacement. More retries may simply reproduce the failure. A validator can sometimes expose the failed location, the observed value, and admissible alternatives from the current environment. The paper distinguishes the benefit of that **repair information** from the benefit of serializing it as a named-field record.

## Design and Mechanism

Code controls durable state, budgets, acceptance, and traces; the model receives a compact task state and current failure feedback. An accepted artifact must pass an external gate; self-declared success does not count. This architecture is held fixed, so the study does **not** compare code orchestration against prompt-only orchestration.

Four policies share tasks, instructions, validators, models, and call caps:

- **RawDiag** returns the original validation error without explicit repair fields.
- **LocObs** adds a stable failure label, named location, and observed value, but no expected alternatives.
- **SameNL** supplies location, observation, and admissible alternatives in prose.
- **TypedFields** supplies those same repair values in keyed JSON plus a stable failure label. Values are serialized as strings; “typed” does not mean a rich static type system.

The primary set is **50 paired generated games × four policies × two models = 400 rows**. Each game has three rooms, four objects, and a two-step quest. A candidate contains at most four commands, executes from fresh state, and succeeds only on a terminal win. On invalid actions, feedback includes up to the first **12 admissible commands**, in deterministic environment order. Models are **Qwen2.5-Coder-14B-Instruct-AWQ** on an NVIDIA L4 and **Meta-Llama-3.1-8B-Instruct-AWQ-INT4** on a T4, served by vLLM. Primary decoding is greedy, with 512 output tokens and a **four-call cap**.

## Findings

### Repair content, not JSON magic

Table 2 reports **50 games per model**:

| Policy | Qwen wins / calls | Llama wins / calls |
|---|---:|---:|
| RawDiag | 14/50 (28%) / 164 | 8/50 (16%) / 179 |
| LocObs | 18/50 (36%) / 155 | 9/50 (18%) / 174 |
| SameNL | 35/50 (70%) / 147 | 29/50 (58%) / 161 |
| TypedFields | 36/50 (72%) / 130 | 29/50 (58%) / 149 |

- **Typed versus raw:** **+44 percentage points** for Qwen (95% paired-bootstrap interval **28–60**, Holm-adjusted exact McNemar p = **3.15×10⁻⁵**) and **+42 pp** for Llama (**28–56**, p = **3.81×10⁻⁶**). The same call cap is not identical realized compute: successful policies stop earlier.
- **Alternatives matter:** adding expected alternatives to LocObs gives **+36 pp** for Qwen (interval **20–52**) and **+40 pp** for Llama (**26–54**). Merely identifying location and observation stays near raw feedback.
- **Prose is competitive:** SameNL improves **+42 pp** over raw for both models. Typed minus SameNL is only **+2 pp** for Qwen (**−8 to 12**) and **0 pp** for Llama (**−12 to 12**); adjusted p is **1.0** for each. This is no detected success advantage for the keyed representation, not proof of equivalence in every setting.
- Typed uses **17 fewer calls** than SameNL for Qwen (paired mean **−0.34/game**, interval **−0.60 to −0.06**) and **12 fewer** for Llama (**−0.24/game**, **−0.44 to −0.04**). Total prompt words fall **14%** and **10%**, while retry-prompt lengths are similar. These are whitespace-word proxies, not billing/token measurements (§4.2).

### More calls require useful information

On the same **15-game** subset, raw/typed wins at call caps **2, 4, 6, 8** are Qwen **5/8, 4/11, 4/11, 4/12** and Llama **1/5, 2/9, 2/11, 2/11** (Table 4). Raw does not improve from four through eight calls. Because independently budgeted runs are not necessarily nested trajectories, Qwen's raw count at cap two can exceed its cap-four count; this table should not be read as cumulative retries of one identical run.

Sampled Qwen decoding on **20 games × three inference seeds** gives raw wins **6, 6, 5**; prose **14, 13, 14**; typed **14, 16, 14**. Clustered typed-minus-raw is **+45 pp** (interval **23–67**, Holm p = **0.0053**); typed-minus-prose is **+5 pp** (**−3 to 15**, p = **0.499**). Across primary and robustness lanes, the paper records **880 rows and 2,652 model calls** (§3).

### A weak validator supplies no repair opportunity

The **15-task HumanEval** scope check exposes one public assertion to repair and withholds the full official suite for final scoring. Qwen passes the visible assertion on **all 15 first attempts**, so every policy stops after one call. Only **14/15** pass the hidden suite. The missed failure produces no feedback and no repair opportunity (§4.4). No success gain for code repair is demonstrated in this lane.

## Analyst Takeaways

1. **Make failures actionable without inventing an oracle.** For the factory's `guides/test-quality.md` diagnosability rule, return the case/location, actual result, and independently known expected result or valid alternatives. Preserve raw evidence too. A general failing assertion often cannot enumerate correct repairs; report only what the validator actually knows.
2. **Supports one AI-specific interface concern, not a new test ontology.** Relative to the hypothesis that human-era test practice may differ for AI, the study supports explicit repair information as a large agent-performance lever. It does not contradict independent oracles, fault sensitivity, or risk-based boundary selection; it makes their failure evidence more consumable.
3. **Do not mandate JSON for success.** Prose with the same values reaches 35 versus 36 Qwen wins and identical 29 Llama wins. Choose named fields for reliable routing and trace analysis, not an unsupported claim that keys improve model reasoning.
4. **Keep detection and repair quality separate.** HumanEval's 15 visible passes but 14 hidden passes show that perfectly delivered feedback cannot fix an undetected fault. Extend the check's behavioral sensitivity before spending more calls on a loop with no useful signal.
5. **No answer to fewer-longer versus many-small tests.** The positive task is a short plan, not a comparison of test suite granularity. Neither the four-command plan nor the single-visible-assertion scope check establishes an optimal assertion count or workflow length for coding agents.

## Questions and Limitations

- This is an unreplicated preprint with **50 generated games**, two quantized modest-size models, and a tiny code scope check. Repository repair, current frontier coding agents, real test logs, and production systems are not evaluated.
- Valid-action alternatives are privileged environment information and directly shrink the action search space. That mechanism cannot automatically transfer to open-ended code failures where no finite replacement list exists.
- The prose/keyed contrast also changes labels and framing, not punctuation alone. First-call context names the policy: typed and raw differ by **one initial win per model**, so pre-repair prompts are not byte-identical. Final gaps of 22/21 wins mostly arise after retry, but the comparison is not perfectly isolated.
- Action-list truncation and ordering are fixed, not ablated. Real validators can be flaky or incomplete; one serving error was rerun with identical settings and only the replacement retained.
- The paper calls the comparison equal-compute in its research question, but fixes maximum calls and output length rather than measured FLOPs or tokens. Models use different hardware; compare policies within model, not their hardware efficiency.
- No internal inconsistency in the primary result counts was identified. The budget table's non-monotonic raw count cautions against interpreting separate capped runs as one trajectory.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md) — separate candidate generation, external acceptance, and detected-failure coverage.
* [Agent-Ergonomic Interface Design](/vault/agent-ergonomic-interface-design.md) — add paired evidence for location/observed/expected alternatives, preserving the TextWorld scope limit.
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md) — no feedback repair can address a fault the validator fails to expose.
