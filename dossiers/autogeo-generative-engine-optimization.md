---
type: Study Note
title: "What Generative Search Engines Like and How to Optimize Web Content Cooperatively"
description: Study notes on AutoGEO, a framework that mines generative-engine content preferences into explicit rules and applies them through a prompt-based rewriter and an RL-trained compact rewriter, evaluated for visibility gain and answer utility together.
resource: https://arxiv.org/abs/2510.11438v1
source: /archive/autogeo-generative-engine-optimization.pdf
tags: [generative-search, retrieval, evaluation, reinforcement-learning, prompting, benchmark]
timestamp: 2026-08-11T20:53:33Z
---

# What Generative Search Engines Like and How to Optimize Web Content Cooperatively — Study Notes

**Authors**: Yujiang Wu, Shanshan Zhong (equal contribution), Yubin Kim, Chenyan Xiong — Carnegie Mellon University and Vody
**Venue**: ICLR 2026 (conference paper); preprint arXiv:2510.11438v1
**Also at**: OpenReview forum `K8EinVWtUB`; code and rule sets at https://github.com/cxcscmu/AutoGEO
**Pages**: 31 (10 main + appendices)

## What It Is

AutoGEO is a framework for **Generative Engine Optimization (GEO)**: rewriting a web document so that a retrieval-augmented, LLM-backed answer engine (Google AI Overview, ChatGPT-style search) is more likely to draw on and cite it. The paper's premise is that prior GEO work is a bag of hand-written heuristics — add technical terms, add quotations, stuff keywords — with no principled account of what these engines actually reward.

AutoGEO answers that by *learning* the preference from engine behavior. It observes which of two candidate documents an engine leaned on more, has LLMs explain the difference, distills those explanations into a compact set of natural-language rules, and then uses that rule set two ways: as a prompt for a frontier-model rewriter (**AutoGEO_API**) and as a reward signal for RL-training a small rewriter (**AutoGEO_Mini**, Qwen3-1.7B).

The second half of the contribution is evaluative. The authors argue GEO must be scored on two axes at once: visibility for the content owner (**GEO** metrics) and answer quality for the engine and its users (**generative engine utility**, GEU). A method that raises visibility by degrading the answer is not optimization but parasitism.

## The Problem Being Solved

Generative engines have become a distribution channel that content providers cannot influence with classic SEO. Ranking position no longer describes the outcome; what matters is how much of a document survives into a synthesized answer and where in that answer it lands. Existing GEO work either applies ad-hoc rewriting styles or resorts to adversarial prompt injection into page content (Nestaas et al., 2024), and neither approach explains *why* an engine surfaces one source over another.

Preference-rule learning exists elsewhere (AutoRule, Constitutional AI, rubrics-as-rewards), but the authors argue those pipelines are task-shaped and typically distill rules from hundreds of samples. GEO analysis has tens of thousands of engine observations, which breaks naive single-pass merging on context limits.

## How Rule Extraction Works

The engine is modeled as RAG: for query `q`, retrieve candidate set `D_q`, generate answer `a = G(q, D_q)` with in-line citations. Document visibility follows GEO-Bench's objective metrics:

`Vis(d, a) = Word(d, a) + Pos(d, a) + Overall(d, a)`

where **Word** is the normalized word count of answer sentences citing `d`, **Pos** applies exponential decay so earlier answer text weighs more, and **Overall** integrates the two.

For each query, AutoGEO takes the *maximum-contrast pair* — the two candidates with the largest visibility gap — and runs a four-stage LLM pipeline (Alg. 1):

1. **Explainer** — compares the winning and losing document against the produced answer and writes a free-text rationale. Its prompt seeds the comparison with directness, completeness, relevance, structure, specificity, and conciseness.
2. **Extractor** — distills each rationale into concise, reusable, JSON-formatted rules about what makes a good source document.
3. **Merger** — consolidates insights across queries into candidate rules. Because the insight pool exceeds any context window, merging is **hierarchical** (Alg. 2): chunk by token budget, merge each chunk independently, recurse on the merged output until it fits, then do a final consolidation. The merge prompt explicitly demands atomic rules and gives a worked example of *over-merging* to avoid (do not fuse "be factual" with "give multiple viewpoints").
4. **Filter** — strips query dependence. Any rule that only says "answer the query" is dropped; a rule with a general principle plus a query reference keeps the principle. This is what makes the rule set applicable at authoring time, before any query is known.

The output is roughly 15–20 short imperative rules per engine/domain. Recurring ones: state the conclusion first, cover the topic comprehensively, cite authoritative sources, keep a single topic focus (strip nav/ads), explain mechanisms and causes rather than surface facts, use logical structure with headings and lists, be self-contained without external links, stay current, present balanced views, use clear unambiguous language, be concise, give actionable steps.

## How the Rules Become Rewriters

**AutoGEO_API** simply embeds the rule set into an instruction template as "Quality Guidelines to Follow" alongside the target document, and asks a strong model (Gemini-2.5-Pro) to regenerate the page. No training. Plug-and-play across engines.

**AutoGEO_Mini** distills this into Qwen3-1.7B:

- **Cold start.** AutoGEO_API acts as teacher over the Researchy-GEO training split. Pairs are kept only if the rewrite strictly beats the original on all three GEO metrics *and* passes fidelity filters (key point recall > 0.8, key point contradiction = 0). About 4,000 of 10,000 samples survive. A judge model normalizes output formatting. Full fine-tuning beat LoRA here (Table 14).
- **GRPO with a three-part reward.** For each of 8 sampled rewrites: `R_out` = the visibility sum from Eq. 1; `R_rule` = fraction of rules an LLM verifier judges "Followed" (the verifier prompt requires a per-rule label plus justification); `R_sem` = key point recall plus key point contradiction from DeepResearchGym, anchoring the rewrite to the original meaning. Components are z-score normalized *within the group* before summing, so no single scale dominates.

The RL ablation (Table 7) puts the rule reward first in importance: removing it drops Overall from 38.53 to 31.41, versus 34.38 without the outcome reward and 37.04 without the rule prompt.

## Results That Matter

- **Both models beat every hand-designed baseline.** On Gemini engines (Table 1), Overall visibility goes from ~20 (vanilla) to 34.05 / 34.92 / 43.76 for AutoGEO_API across E-commerce, GEO-Bench, and Researchy-GEO. The best heuristic baseline, Fluency Optimization, reaches only 22.99 / 23.73 / 27.75. Headline claim: +35.99% average on GEO metrics, up to +50.99% over the strongest baseline.
- **Compact model, ~0.7% of the cost.** AutoGEO_Mini averages +20.99% over baselines while its rewriting inference costs ~0.0071x AutoGEO_API and can run offline on CPU. Rule extraction is a one-time per-engine cost (roughly $1.4–$3.6 per dataset) that amortizes to negligible at million-document scale.
- **Utility is preserved, and the adversarial contrast is the sharpest result.** Hijack and poisoning prompt-injection attacks raise visibility to ~31 but push KPR, citation precision, clarity, and insight *below* vanilla. AutoGEO reaches 43.76 while nudging those same utility metrics slightly up (Table 5). Cooperative rewriting outperformed the attacks on their own metric.
- **Rules transfer across models more than across domains.** Rule-set overlap between Gemini/GPT/Claude engines is 79–84%; between the two open-domain datasets it is 88%, but E-commerce overlaps the others by only 35–40%. E-commerce uniquely wants step-by-step guidance, product specifics, and pros/cons, and de-emphasizes explanatory depth. Engine-specific rules always win, but transferred rules still beat vanilla (penalties of 1.3–7.8% across engines, 0.3–5.1% across datasets).
- **The global-adoption experiment.** When *every* document in the candidate set is rewritten with the same rule set instead of just the target, relative visibility collapses back to vanilla (~19.3) — the advantage was positional, not absolute. But GEU rises across the board (KPR 40.33→45.76, precision 96.05→98.97, clarity 60.10→64.15, insight 51.07→59.38). The zero-sum game reduces to no private gain and a better commons.
- **Hardest cases improve most in relative terms.** On the lowest-visibility documents, vanilla 9.46 → 35.83 (API) / 30.24 (Mini), versus 16.78 for Fluency Optimization.
- **Extractor and Merger carry the pipeline.** Removing them costs the most (Overall 43.76 → 41.78 / 40.28); dropping Explainer or Filter barely moves the number. The signal is in the data, not in any single prompt stage.
- **Rules survive human inspection.** 20 CS-graduate annotators rated clarity, semantic validity, and decisionability above 2.5/3 on average; 95.47% of rules were medium or high on all three. Domain attribution was weaker: 42.31% assigned to the correct specific domain, 34.62% called "Mixed."
- **Use a stronger external LLM to mine rules.** Gemini-extracted rules beat self-referential extraction on GPT and Claude engines (e.g., Claude Overall 30.51 vs 24.61).

## Analyst Takeaways

1. **What generative engines reward looks like good technical writing.** The learned rule set is almost entirely legible editorial advice — conclusion first, one topic, self-contained, structured, sourced, concise, mechanism-explaining. This is the opposite of the keyword-era SEO reflex, and keyword stuffing is in fact the weakest baseline in the table. It is also a usable checklist for any document intended to be consumed by a retrieval pipeline, including internal documentation and knowledge bases.
2. **Contrastive outcome pairs are a cheap preference-mining substrate.** The method needs no labels, only an observable outcome differential between two items processed by the same black-box system. The Explainer/Extractor/Merger/Filter decomposition plus hierarchical merging is a reusable recipe whenever tens of thousands of comparisons must become a handful of interpretable rules.
3. **Explicit rules pull double duty.** The same artifact serves as prompt context and as a verifiable reward. That is the practical value of keeping the learned preference in natural language rather than in weights: it can be read, audited, edited, and reused across deployment forms.
4. **Filter for query independence if you want the artifact to be authoring-time usable.** Removing query-conditioned clauses is a small step that converts a retrieval-time preference into a content-production standard.
5. **Report the ecosystem metric next to your own.** The adversarial comparison and the global-adoption test are the intellectually honest parts of this paper. Any optimizer acting on a shared system should be measured on what happens to the system, and on what happens when everyone adopts it.
6. **Distillation into a small model is where the economics live.** Filtering teacher outputs by the actual target metric before SFT, then adding group-normalized multi-objective GRPO, took a 1.7B model to most of the frontier model's gain at ~0.7% of the cost.

## Limits and Questions

- **Simulated engines, not production ones.** Every "generative engine" here is the authors' own RAG pipeline over 5 ClueWeb22 candidates with a fixed answering prompt. Real AI Overviews and ChatGPT search involve proprietary retrieval, ranking, freshness, domain authority, spam classifiers, and multi-turn behavior. The rules may reflect the answering *prompt* as much as the model.
- **Five candidates per query is a small arena.** Visibility is measured as a share of a tiny pool, which likely inflates both the vanilla ~20 baseline and the achievable gains.
- **GEO metrics are proxies for traction, not traffic.** Word count and position of cited text are not clicks, conversions, or revenue, and the paper does not connect them to any downstream business outcome.
- **The cooperativeness claim is fragile.** It holds for *this* rule set under *these* GEU metrics. Utility does drop in places (E-commerce citation recall 96.81→94.46 for API, Claude precision 96.51→84.98), and the metrics themselves are LLM-judged. A GEO model trained harder on the outcome reward would presumably rediscover the adversarial region.
- **The global-adoption finding undercuts the practical pitch.** If universal adoption erases individual advantage, GEO's private return depends on being early or on competitors not optimizing — an equilibrium worth stating plainly to anyone planning a GEO program.
- **Homogenization risk is acknowledged only as "stylistic."** A web where every page opens with "Key Conclusion:" and follows the same 15 rules is measurably more parseable and arguably less diverse; the paper does not examine what is lost.
- **Rewrites are LLM-generated at scale.** Fidelity is enforced by key-point recall/contradiction judged by gpt-4o-mini, not by human review. The euthanasia case study rewrite is visibly better-structured but also visibly more generic.
- **No defense side.** The paper shows adversarial injection is inferior to cooperative rewriting on the attacker's own terms, but says nothing about how an engine should detect either.

## Vault Ideas Extracted

* [Generative Engine Optimization](/vault/generative-engine-optimization.md)
* [Contrastive Preference Rule Extraction](/vault/contrastive-preference-rule-extraction.md)
* [Rule-Based Rewards](/vault/rule-based-rewards.md)
* [Cooperative Optimization Evaluation](/vault/cooperative-optimization-evaluation.md)
