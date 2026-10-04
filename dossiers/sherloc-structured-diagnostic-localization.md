---
type: Study Note
title: "SHERLOC: Structured Diagnostic Localization for Code Repair Agents"
description: Repository localization with root-cause and solution guidance improves several repair agents and lowers search cost, but misleading diagnoses hurt strong agents and the headline quality filter is retrospective.
resource: https://arxiv.org/abs/2606.24820v2
source: /archive/sherloc-structured-diagnostic-localization.pdf
tags: [coding-agents, verification, context-engineering, evaluation, agents]
timestamp: 2026-10-04T07:48:58Z
---

# SHERLOC: Structured Diagnostic Localization for Code Repair Agents — Study Notes

**Authors**: Hovhannes Tamoyan, Sean Narenthiran, Erik Arakelyan, Mira Mezini, and Boris Ginsburg  
**Venue**: arXiv:2606.24820v2 [cs.CL]; abstract-page comments report acceptance to EMNLP 2026 Main Conference; no same-work publisher DOI identified  
**Date**: First submitted June 23, 2026; revised August 31, 2026; manuscript header September 1, 2026

## What It Is

A training-free repository localizer that outputs **diagnostic findings**, not just suspected files. It explores from an issue description and repository snapshot without executing tests or observing coverage, then supplies locations and explanations to a separate repair agent. This is relevant to making failures actionable for agents, but is not an experiment comparing many unit tests with fewer workflow tests.

## Problem

A file path says where to look, not why behavior is wrong or what direction a repair should take. Meanwhile, repository agents spend substantial context and interaction on navigation before editing. Location accuracy can also overstate diagnosis quality: a correct file accompanied by a false root-cause explanation may actively mislead repair.

## Mechanism as an Idea

Pair a reasoning model with bounded repository inspection, literal search, hierarchy, and import-dependency views. A deterministic executor mediates actions; context truncation, repeated-call detection, unambiguous malformed-call recovery, and forced synthesis keep exploration bounded. Emit code spans with a location explanation, root cause, solution idea, dependencies, and testing impact. These are hypotheses derived from inspection, not an independent behavioral oracle.

Evaluate file retrieval and structure-agnostic line spans separately, then inject the findings into repair agents and measure held-out patch resolution and cost. Controls include masked issue identifiers, findings shuffled from other tasks, and patch-conditioned oracle findings. Diagnostic-field ablations retain the same predicted locations while changing the explanation supplied to repair.

## Findings

- **Localization:** Qwen3-235B-A22B-Thinking-2507 achieves **84.33 ± 0.72% accuracy@1** on SWE-Bench Lite and **81.27 ± 1.16% recall@1** on Verified over **three seeds**. At roughly **30B**, Qwen3 reaches **75.07 ± 1.24%** Verified recall@1. On Verified, the headline localizer's chunk coverage recall is **41.28%** and chunk precision **53.47%**; successful file retrieval does not imply complete edit-span coverage (§4.1, Table 3).
- **Deployable transfer versus headline selection:** across **five repair backbones × two frameworks** on **500 Verified tasks**, unfiltered findings average **+4.39 percentage points** resolution. The headline **+5.95 pp** takes the best unfiltered or quality-filtered result per setting. The filter uses a judge shown the gold patch and retrospectively chooses existing outcomes; it is **not deployable test-time evidence** (§§1, 4.6–4.7).
- **Benefits depend on the repair agent:** Qwen3-Coder-30B with SWE-Agent goes from **44.7% to 54.0%**; Qwen3-Next-80B with OpenHands goes from **38.6% to 50.4%**. MiniMax-M2.5 drops from **72.2% to 67.2%** with OpenHands; that **−5.0 pp** effect survives Holm correction (**p = .0168**). Five settings show corrected significant positive transfer; stronger agents can stay flat or worsen (Tables 11, 14).
- **Actionable explanation adds signal:** with predicted locations held unchanged, Qwen3-Coder-30B/SWE-Agent scores **54.0%** with all fields, **52.0%** without dependencies/testing impact, **50.8%** after also removing solution idea, and **51.2%** with only solution idea. Baseline is **44.7%**. This is evidence about diagnostic content, not the superiority of a particular serialization or test size (Table 9).
- **Span coverage correlates with repair:** among **371** cases with exactly correct file sets, complete coverage of gold edit chunks (**144 cases**) averages **82.5%** resolution versus **59.9%** with incomplete coverage (**227 cases**). The **+22.6 pp** association is not a randomized granularity intervention; easier cases can have both more complete localization and better repair (Table 13).
- **Cost:** pipeline accounting adds the standalone localizer's **28.6k tokens** per issue. Mean localization-token reduction is **36.7%**, total-token reduction **23.1%**. Savings are not universal for total work: Qwen3-Coder-Next/OpenHands increases full-run tokens **1.4%** despite reducing localization tokens **36.6%** (Table 15).
- **Familiarity and reliability:** masked issue paths with tools retained yield **79.96% recall@1** versus **57.86%** in the heavily masked text-only condition. A patch-free multi-trace verifier reaches **79.0% precision / 70.0% recall** against retrospective quality labels at threshold **4.0**; downstream repair with that selection is not evaluated (§§4.3, 4.7).

## Analyst Takeaways

1. **Extend diagnosability with evidence, not confident labels.** For `guides/test-quality.md`, a useful handoff combines the failing case, independent expected/actual difference, implicated code, and an explicitly provisional explanation. This paper supports supplying actionable diagnosis; it does not authorize deriving expected behavior from the proposed patch.
2. **Do not conflate localization granularity with test granularity.** File and chunk metrics describe predicted edit regions. No tests run in this localizer; its gains cannot establish that small unit tests cause better agent repair. [The placebo-controlled study](/dossiers/fault-localization-placebo-code-repair.md) also shows that narrowing edits can lose to fresh generation in a different setting.
3. **Keep broad context and allow diagnosis rejection.** A precise span should focus inspection, not prohibit discovering another affected region. A plausible but wrong explanation can cost correctness even while saving search tokens.
4. **Report deployable and oracle-assisted outcomes separately.** The unfiltered average is the practical transfer result. Gold-patch scoring and retrospective fallback quantify a possible reliability opportunity, not a shipped protection against misleading findings.

## Questions and Limitations

- Public Python-heavy SWE-Bench repositories dominate evaluation. Familiarity controls do not remove training exposure; transfer to private/unseen repositories, other languages, and frontier commercial repair agents is open.
- Gold edit locations are one reference repair, not proof that alternative locations are wrong. Complete span coverage and finding quality are conditional associations, not isolated causal effects of narrower tests.
- Downstream uncertainty is across benchmark instances, not repeated end-to-end seeds. The study does not match the complete diagnostic pipeline against a fresh-attempt repair baseline or independently isolate all effects of locations, explanations, prompts, and compute.
- The main text and Table 15 give **44.7→54.0 (+9.3 pp)** for Qwen3-Coder-30B/SWE-Agent, while Table 14 gives paired **+9.6 pp**; the paper does not reconcile this. Do not silently substitute one for the other.
- Cost prose sometimes omits the localizer: §L says Qwen3-Next-80B/SWE-Agent localization falls to **32.9k**, while Table 15's total pipeline is **61.5k**, including **28.6k** localizer tokens. Use full pipeline accounting. Token counts across differently sized backbones are not equal serving cost.
- Judge-conditioned quality filtering and the patch-free verifier's agreement scores do not establish a deployable repair gain. Generalizing these to autonomous correctness gates would exceed the evidence.

## Vault Ideas Extracted

* [Test-Failure Localization for Agents](/vault/test-failure-localization-for-agents.md) — diagnostic actionability can help without proving a unit-test ratio.
