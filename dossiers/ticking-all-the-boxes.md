---
type: Study Note
title: "TICKing All the Boxes: Generated Checklists Improve LLM Evaluation and Generation"
description: Instruction-specific binary checklists improve judge–human preference agreement and provide targeted self-refinement and selection feedback, without proving that checklist satisfaction or extra judging calls guarantee correctness.
resource: https://arxiv.org/abs/2410.03608v1
source: /archive/ticking-all-the-boxes.pdf
tags: [llm-as-judge, evaluation, decomposition, self-improvement, test-time-scaling, agents]
timestamp: 2026-10-04T06:41:38Z
---

# TICKing All the Boxes — Study Notes

**Authors**: Jonathan Cook, Tim Rocktäschel, Jakob Foerster, Dennis Aumiller, and Alex Wang; Oxford, UCL, and Cohere affiliations.  
**Status**: Preprint; ICLR 2025 submission ([OpenReview 1dUdNzLJRF](https://openreview.net/forum?id=1dUdNzLJRF)), acceptance not confirmed. The forum and public-note endpoints returned browser verification or HTTP 403 during ingest, so no decision is asserted. This dossier uses arXiv:2410.03608v1, October 4, 2024—the only revision listed in arXiv's submission history at ingest.

## What It Is

**TICK** (Targeted Instruct-evaluation with ChecKlists) generates a task-specific list of yes/no evaluation questions, answers them for a candidate response, and aggregates the answers into a score. **STICK** (Self-TICK) uses the generating model as its own checklist generator and evaluator, either to diagnose revisions or select among sampled responses. The durable idea is to make the criteria behind a judgment explicit rather than requesting one opaque quality impression.

## Problem and Motivation

A single preference or quality score collapses different requirements—format, content coverage, reasoning, factuality—into an uninspectable tradeoff. Human-written checklists help, but curating one for every instruction is expensive. The authors ask whether models can generate usable instruction-specific checklists automatically and whether the resulting feedback improves both evaluation and generation.

## Mechanism as an Idea

- Generate concise questions covering explicit instruction requirements and clearly relevant implicit domain criteria. Each question should target a distinct requirement; yes means the requirement was met.
- Judge the candidate against each requirement. The archived method uses **separate question-level prompts**, with the instruction and response visible in each. Section 3.1.2 and Appendix G.2 describe one question and one answer per evaluation, normally preceded by reasoning. It is not a single call answering the entire checklist.
- Compute the candidate's pass rate as the fraction of yes answers. For dataset-level instruction following, DRFR pools satisfied requirements across instructions; it is not an unweighted average of instruction-level pass rates.
- Turn two candidate pass rates into a preference, or retain the best-scoring sampled candidates. Keep ties visible rather than inventing a unique winner.
- In refinement, diagnose failed requirements and revise while preserving passed requirements. An all-yes checklist retains the original response. This is a **revision trigger**, not a demonstrated monotonic accept/revert gate after every edit.

### What the Ablations Actually Establish

The archived revision does **not** report a controlled separate-question-versus-batched-checklist inference ablation. Its evaluator ablation in Figure 2 compares direct binary answering, reasoning before answering, and majority voting across repeated reasoning-based judgments. Reasoning improves question-level accuracy; majority voting at 5 and 15 samples improves it further, at additional compute. These are changes to deliberation and sampling, not evidence that one call per criterion beats one call for all criteria.

A different comparison in Table 4 contrasts direct scoring, checklist-guided holistic scoring without required item answers, and explicit item answers aggregated as TICK. That comparison supports **explicit criterion decisions and aggregation** over merely showing a checklist, but changes several protocol features and does not isolate call partitioning. Alongside [CheckEval](/dossiers/checkeval-reliable-checklist-judging.md), which batches binary questions, this separates **semantic decomposition** from **inference decomposition**: narrower criteria do not logically require separate judge calls.

## Results and Admissions

The checklist-validation study uses **612 internal instructions**, with three independently written human checklists per instruction. A selected and sometimes corrected checklist becomes the reference; overlap with that reference measures resemblance, not an independent guarantee of criterion completeness. GPT-4o-generated checklist scores correlate with scores from human checklists at **Pearson r = 0.772 on Internal and 0.853 on InFoBench** (Table 3a). Question-level accuracy against three-human majority labels is **0.826 for GPT-4o, 0.781 for Command-R+, and 0.778 for Llama3.1-70B** with reasoning (Table 3b).

With GPT-4o judging model-response pairs on Internal, exact win/tie/loss agreement with human preferences is (Table 4):

| Protocol | Exact agreement | Inverted preference | Weighted label distance ↓ |
|---|---:|---:|---:|
| Direct preference | 29.3% | 21.0% | 0.917 |
| Direct scoring | 46.4% | 4.8% | 0.583 |
| Checklist-guided holistic scoring | 48.7% | 4.1% | 0.553 |
| TICK | 52.2% | 3.5% | 0.514 |

The headline **46.4% → 52.2%** is a **5.8 percentage-point** improvement in exact preference-label agreement, not 52.2% task accuracy. All these judge protocols use reasoning; this comparison does not use majority voting.

For self-improvement:

- A single STICK revision on LiveBench raises Command-R+ reasoning **29.2 → 37.0**, the **+7.8-point** headline. Its overall score rises **32.0 → 35.8**, while unstructured Self-Refine falls to **23.7**. GPT-4o overall rises **55.4 → 56.2**, but reasoning remains **53.3** and language falls **50.9 → 50.4** (Table 1). The effect is not uniform across models or domains.
- Four-iteration Command-R+ experiments report **+6.5 points on InFoBench** and **+7.1 on WildBench** for STICK refinement. By the fourth iteration, quality plateaus or regresses; on LiveBench, additional revisions after the first start to degrade results (Section 4.1).
- **Best-of-8**, not arbitrary Best-of-N, raises Command-R+ InFoBench DRFR **0.843 → 0.894** and single-turn WildBench WB-Score **64.9 → 71.2** (Table 5). The WildBench table and abstract support **+6.3 points**. The introduction and Section 4.2 instead say **+5.3**, an unreconciled arithmetic/text inconsistency; this dossier uses the table values, not both as interchangeable results. WildBench's underlying holistic score is scaled in the reported table, so this is a score-point gain, not a success-rate increase.
- Human checklist-then-score evaluation raises **Krippendorff's α from 0.194 to 0.256**, while mean scores remain **3.347 vs. 3.351** on Command-R+ WildBench responses (Table 6). Agreement remains low. Humans answer the checklist and then give a holistic rating; this is not a human binary-pass-fraction score.

## Analyst Takeaways

1. **Expose the criterion decisions, not just the rubric.** Explicit labels make omitted requirements and failed checks inspectable, and outperform checklist-guided holistic scoring in this experiment.
2. **Do not credit the gain to judge multiplicity.** This revision evaluates one requirement per call, but does not isolate that design from binary labels, reasoning, checklist specificity, or aggregation.
3. **Use failed checks as actionable feedback, not an obligation to rewrite forever.** The all-pass stop preserves some incumbents; repeated refinement still regresses, and stronger initial models gain less.
4. **Keep quality separate from compliance.** In Appendix H.4, a response falsely claiming to have visited external sources receives **9/10 yes labels** from one annotator but a **2/5 overall rating**. A generated checklist can silently assume capabilities the model lacks.
5. **Calibrate the decomposition as well as the answers.** Generating and judging with the same model can propagate shared blind spots. Better agreement is useful but does not remove self-preference, hallucination, or domain errors.

## Questions and Limitations

- The internal instruction set and trained-annotator process limit independent replication; the archived text promises dataset release rather than establishing that release here.
- Checklists are a heuristic, not advantageous for every task. Simple knowledge retrieval may need a direct correctness check rather than additional checklist generation.
- Item count induces weighting. Splitting one requirement into several questions can increase its influence, and high pass rates can conceal a fatal failure.
- InFoBench and WildBench improvements rely on model-based benchmark evaluators; LiveBench supplies objective ground-truth scoring but shows category-level regressions. Best-of-8 comparisons are not a matched-total-compute proof against every alternative.
- Human preference definitions emphasize near-identical responses for ties, and averaging three labels adds further ties. The very low direct-preference agreement is specific to this protocol, not a universal ranking of pairwise judging.
- The retrieved arXiv revision establishes separate calls, but no batching ablation. A claim that it proves separate criterion judges are generally more consistent would exceed the source.

## Vault Ideas Extracted

* [Decomposed Checklist Evaluation](/vault/decomposed-checklist-evaluation.md)
* [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md)
* [Score-Gated Refinement](/vault/score-gated-refinement.md)
