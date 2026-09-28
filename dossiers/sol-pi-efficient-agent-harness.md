---
type: Study Note
title: "SoL-Pi: Recursively Scaling Auto-Research Loops for Efficient Agent Harness"
description: "Broad-to-deep harness search discovers four efficiency mechanisms, with frozen evaluation showing lower token traffic and cost alongside measurable capability trade-offs."
resource: https://arxiv.org/abs/2609.20519v1
source: /archive/sol-pi-efficient-agent-harness.pdf
tags: [agents, agent-harness, self-improvement, token-efficiency, evaluation, context-engineering]
timestamp: 2026-09-26T06:41:12Z
---

# SoL-Pi: Recursively Scaling Auto-Research Loops for Efficient Agent Harness — Study Notes

**Venue**: arXiv:2609.20519v1 [cs.AI]  
**Date**: September 17, 2026  
**Setting**: Pi coding-agent harness; GPT-5.6 Sol for discovery; GPT-5.6 Sol and Claude Opus 5 for EdgeBench evaluation

## What It Is

SoL-Pi is a frozen-weights, AI-led search for *reusable harness-level* token savings, rather than a cheaper model or faster inference kernel. A research agent inspects separate base-agent trajectories, proposes changes, implements and reviews candidates in isolated research lineages, then combines four retained mechanisms as extensions to Pi. The relevant unit of optimization is the **whole task**: shortening one observation or one call is not a gain if later context loss, cache rewriting, or extra tool turns outweigh it. The paper reports a promising cost–capability frontier, not an unconditional quality improvement from the four-mechanism stack.

## Search and Evaluation Boundary

1. The outer search starts with **152 proposals** across context, progress, tools, delegation, prompt/policy, and improvement/evaluation. Oracle analysis of existing trajectories seeks specific avoidable work; a broad-to-deep funnel sends selected hypotheses into disposable, independently run lineages. Each lineage iterates implementation, independent review, fixed experiments, trajectory analysis, and revision. The total search covers **535 executable development environments**, **over 3,000 runs**, and **over 60,000 agent–environment interactions**. These are scale counts, **not** evidence of a scaling law.
2. The 535 environments comprise **495 GitHub issue–PR repository tasks** at pre-fix states with offline dependencies, hidden regression tests, and checked fail-before/pass-after references; plus **40 verifier-driven synthetic tasks** allowing multiple valid solutions. Reference patches and tests are not exposed to the acting agent.
3. Capability metrics and tolerances and efficiency metrics are fixed before experimentation and kept outside optimizer control. A candidate must keep *every* capability metric within tolerance, improve at least one efficiency metric, and survive nondominance selection. The four mechanisms are developed separately, then integrated and tuned while checking capability.
4. EdgeBench is reserved for a **one-way post-freeze boundary**, not development: of its **51 publicly released tasks** (out of 134 total), **11** serve acceptance of frozen candidates and the other **40** final generalization measurement. Source/configuration/metrics/acceptance rule are frozen before evaluation; failed held-out validation rejects rather than patches a candidate. Thus do not describe all 51 tasks as an untouched final test, or the public 51 as EdgeBench's entire benchmark.

This separation is stronger than tuning and scoring on the same public cases, but the paper does not establish an equal-search-budget contest against task-level sampling or simpler manually selected interventions (see [Budget-Matched Harness-Evolution Evaluation](/vault/budget-matched-harness-evolution-evaluation.md)).

## Four Retained Mechanisms

| Mechanism | Action and boundary | Potential cost or failure |
|---|---|---|
| **Action Fusion** | Add an optional follow-up command to file-mutation tools: edit/write and then test/build/run in **one tool request** with both outcomes, removing an intermediate model turn. Keep actions separate when the command depends on inspecting the mutation result. | Compound actions need stage-specific outcomes; fusion is inappropriate when inspection changes the follow-up. |
| **Online Context Compact** | At `update_plan` step completion, estimate remaining requests using requests per completed step and unfinished steps, capped by projected context-window fill; compare repeated-input savings against cache-prefix rewrite cost. Later compactions must recover outstanding rewrite cost and pass a larger margin. Also compact near the window limit when shortening is possible, using Pi's native compaction. | The gate estimates cache economics, **not** the summarization call separately; a shorter history can drop needed facts or reduce cache reuse. |
| **ObservationPack** | Archive tool output **>10 KiB** locally; send it in full for the first **two provider requests**, then substitute a stable handle, original size, and ~1 KiB head/tail excerpt of complete lines. Retrieve exact original pages via handle as needed. Smaller output is unchanged. | The excerpt might not contain a late-needed detail; exact retrieval must work. See [Bounded Tool Observations](/vault/bounded-tool-observations.md) and [Reversible, Query-Conditioned Compaction](/vault/reversible-query-conditioned-compaction.md). |
| **Evidence-Preserving Reducer** | For logs **≥4 KiB** from a predefined build/test-command set, archive the exact original, ask lower-cost **GPT-5.6 Luna (high)** to extract a smaller evidence receipt, and check schema, source hash, exit status, exact quotes, and size deterministically. Bypass file reads/search; fall back to original for failed checks, suspected credentials, or no size reduction. | Auxiliary calls and verifier logic cost resources; verified quoted evidence does not prove the diagnostic interpretation is sufficient. The main model still diagnoses and chooses actions. See [Verified Log Evidence Receipts](/vault/verified-log-evidence-receipts.md). |

The reducer runs *before* ObservationPack projects context; ObservationPack recognizes verified receipts and skips repacking them. Action Fusion reduces decision turns; reducer and ObservationPack attack distinct sources of repeated observation cost; compaction addresses the accumulated history. This ordering matters more than treating the four as independent prompt tricks (Sec. 2.4–2.5, Fig. 4).

## Results and Trade-offs

- **EdgeBench, GPT-5.6 Sol, 51 public tasks** (Tables 1–2): Pi scores **44.833** at **2.1538B** recorded tokens and **$1,339** model API cost. Full four-mechanism SoL-Pi **[Efficiency]** scores **42.003** at **1.0990B** tokens and **$894**: **49.0%** less traffic and **33.2%** less cost, but a **2.830-point (6.3% relative)** lower score. The separately selected **[Performance]** point is *ObservationPack alone*: **47.208**, **2.0224B**, **$1,271**; it is **not** the four-component stack outperforming Pi.
- **EdgeBench, Opus 5 applied without new search** (Table 2): Pi **44.756**, **2.3697B**, **$1,741**; full stack **42.224**, **1.3101B**, **$1,158**: **44.7%** less traffic and **33.5%** less cost with a **2.532-point (5.7% relative)** lower score. Its separately selected [Performance] point is **Action Fusion alone**, scoring **50.482** at **2.1016B** and **$1,605**. Cross-backend transfer is therefore a **single additional backend's point estimate**, not proof of broad model generalization; all mechanisms activate less often and less intensely on Opus 5.
- Relative to the *different native harnesses*, full stack costs **$894 vs. $1,787** for GPT-5.6 Sol Codex and **$1,158 vs. $2,535** for Opus 5 Claude Code (**50.0% and 54.3% savings**). Those comparisons change harness and score as well as cost, and cannot be silently substituted for the Pi-controlled comparison. API costs use fixed August 17, 2026 prices; they are not measured wall-clock or research-optimization costs.
- **Add-one components** (Table 4): each reduces recorded total tokens versus Pi on both backends; not all improve score. For example, Online Context Compact on GPT-5.6 Sol scores **41.993 vs. 44.833** while lowering cost **$1,339 → $935**. Full-stack cache reads fall **2.1326B → 1.0605B** but cache writes rise **0.0141B → 0.0316B**; measure complete task cost, not cache-hit rate alone. The paper describes full-stack/standalone trigger-subset results as consistent with complementarity, but because each configuration has its **own triggered-task subset**, those comparisons do **not** isolate interaction effects.
- **Other benchmarks** (Table 3): on **63 CPU-only Terminal-Bench 4 tasks**, SoL-Pi solves **15** for **$211.12**, versus Pi's **18** for **$286.45** (cost per solved task **$14.07 vs. $15.91**). On **six IMO 2026 Lean 4 problems**, SoL-Pi and Pi each pass **3**, versus Codex's **5**; total model cost is **$62.69 vs. $75.95 vs. $114.47** respectively. Lower total cost does not make three fewer Terminal-Bench solutions interchangeable with 18, or three IMO passes interchangeable with five.
- **Two-hour kernel swarm** (Sec. 3.3, Fig. 5): coordinator + 20 SoL-Pi workers reaches a verified **1,127 cycles** for **$60.11**, versus coordinator + 20 Pi workers **1,366 cycles/$82.12**; a single Codex agent reaches **1,333 cycles/$39.20**. All start from the same 147,734-cycle starter; these are **one run per configuration**, not a variance estimate. Swarming beats the single agent's final cycle count here, but the single agent is cheaper.

## Analyst Takeaways

1. **Optimize the entire episode at fixed capability guardrails.** Record score, completion, token categories, auxiliary calls, cache-write changes, and API cost together; a cheaper task with lower success is a different operating point, not automatically a win.
2. **Keep a one-way final evaluation lane.** Use development traces for idea generation and environment verifiers for iteration; freeze and reject candidates on separate tasks without tuning back from their answers. Track acceptance and final-measurement tasks distinctly.
3. **Fuse only predictable adjacency.** A file mutation followed by a known check can save a round trip; if the next command depends on reading the mutation outcome, retain the separate decision boundary.
4. **Reduce repeated large observations without making evidence irrecoverable.** Stable source handles and exact-page recall support late inspection; a verified evidence receipt is useful for voluminous build/test logs but not a license to discard originals or trust a model's paraphrase.
5. **Account for cache economics when triggering compaction.** A plan-step checkpoint offers a natural trigger, but reprice cache reads/writes and check task quality on the deployed backend before adopting a threshold or transferring a learned policy.

## Questions and Limitations

- The paper reports point estimates for the public benchmark subset without uncertainty intervals here. “Comparable” describes its tolerance/operating-point judgment, **not a statistical equivalence test**; the complete stack scores lower than Pi on both EdgeBench backends and solves fewer Terminal-Bench tasks.
- Search uses GPT-5.6 Sol traces; lower activation on Opus 5 makes backend-invariant policy claims premature. Only one additional backend, one-way transfer, and this task distribution are measured.
- Wide development search is costly; search investment is not included in per-task API savings, and breadth/depth are not varied under a matched budget to demonstrate a scaling law or recursive compounding. The paper frames “pretraining the harness” and recursive efficient improvement as future directions.
- A source-hash/quote verifier checks provenance and literal consistency, not whether the receipt retained every clue needed for diagnosis. Observation paging and lossy history compaction create related late-recall failure modes; evaluate those against realistic delayed queries.
- API-price snapshots, task mix, baseline harness implementations, wall-clock constraints, and CPU-only Terminal-Bench exclusion limit direct deployment forecasts. The single swarm trial does not establish robust multi-agent superiority.

## Vault Ideas Extracted

* [Verified Log Evidence Receipts](/vault/verified-log-evidence-receipts.md) — distinct verified extraction boundary for large diagnostic logs.
* [Budget-Matched Harness-Evolution Evaluation](/vault/budget-matched-harness-evolution-evaluation.md) — existing counterfactual for reusable optimizer claims.
* [Bounded Tool Observations](/vault/bounded-tool-observations.md) and [Reversible, Query-Conditioned Compaction](/vault/reversible-query-conditioned-compaction.md) — existing patterns for bounded defaults with exact recovery.
