---
type: Study Note
title: "Prompting Science Report 4: Playing Pretend: Expert Personas Don't Improve Factual Accuracy"
description: Study notes on a six-model, two-benchmark experiment finding that expert personas do not reliably improve difficult factual multiple-choice accuracy, can trigger capability-denying refusals when mismatched, and should not be confused with personas' effects on tone or perspective.
resource: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5879722
source: /archive/expert-personas-factual-accuracy.pdf
tags: [prompting, evaluation, reliability]
timestamp: 2026-09-14T17:12:07Z
---

# Prompting Science Report 4: Playing Pretend: Expert Personas Don't Improve Factual Accuracy - Study Notes

**Authors**: Savir Basil, Ina Shapiro, Dan Shapiro, Ethan Mollick, Lilach Mollick, Lennart Meincke — Generative AI Labs, The Wharton School, University of Pennsylvania; with Glowforge and WHU affiliations  
**Venue**: Prompting Science Report 4; SSRN 5879722  
**Pages**: 40  
**Scope**: Objective multiple-choice accuracy on GPQA Diamond and a three-domain MMLU-Pro subset

## What It Is

A large repeated-sampling experiment asking a narrow practical question: does telling a language model to be an expert make it more accurate on hard factual questions? Across six contemporary reasoning and non-reasoning models, five elaborate expert roles, three deliberately low-knowledge roles, and two benchmarks, the answer is generally no.

The useful result is not that personas are inert. Some model–prompt combinations move substantially, and a mismatched role can even persuade a capable model not to answer. The result is that **expert identity is not a dependable accuracy intervention**: domain matching does not produce a consistent advantage, positive effects are model- and domain-specific, and negative effects are more common.

This report deliberately does **not** evaluate whether personas improve tone, audience fit, viewpoint simulation, emphasis, pedagogy, or user framing. Its title is defensible only inside that factual-accuracy boundary.

## Experimental Design

### Models

The six tested models span ordinary and dedicated reasoning systems:

- GPT-4o
- GPT-4o-mini
- o3-mini
- o4-mini
- Gemini 2.0 Flash
- Gemini 2.5 Flash

The report is interested in within-model changes caused by prompting, not in ranking model families against one another.

### Benchmarks and sampling

| Benchmark | Questions | Domains | Options | Runs per model–prompt pair |
|---|---:|---|---:|---:|
| GPQA Diamond | 198 | physics, chemistry, biology | 4 | 4,950 (198 × 25) |
| MMLU-Pro subset | 300 | 100 engineering, 100 law, 100 chemistry | 10 | 7,500 (300 × 25) |

GPQA Diamond is intentionally difficult: the benchmark paper reports 65% accuracy for domain PhDs (74% after discounting mistakes those experts later identified) and 34% for skilled non-experts with unrestricted web access. The selected MMLU-Pro categories are also difficult and use ten answer choices, reducing chance performance.

Every question was sampled independently 25 times for each model–prompt condition at temperature 1.0. Both datasets used zero-shot prompts so that examples could not confound the persona effect. A generic system message—“You are a very intelligent assistant, who follows instructions directly.”—was held fixed; the persona, when present, appeared in the user message immediately before the question and fixed answer-format instruction.

Each benchmark has nine primary prompt conditions: baseline, five experts, and three low-knowledge personas. The full six-model factorial therefore implies 672,300 primary responses: `6 × 9 × (4,950 + 7,500)`. The report itself emphasizes the per-pair counts rather than this derived grand total.

### Persona conditions

**GPQA expert roles**: physics, mathematics, economics, biology, chemistry.  
**MMLU-Pro expert roles**: engineering, law, chemistry, physics, history.  
**Both datasets' low-knowledge roles**: layperson (“no special training”), young child (“sometimes mixes things up”), and a four-year-old toddler who thinks the moon is made of cheese.

The expert prompts were intentionally elaborate rather than a bare “act as” instruction. Each described broad, world-class command of the field and instructed the model to answer from that expert understanding.

For domain analysis, the authors classified each question's possible expert roles as matched, adjacent, or unrelated:

| Question domain | In-domain | Adjacent | Unrelated |
|---|---|---|---|
| GPQA physics | physics | mathematics | economics |
| GPQA chemistry | chemistry | physics | economics |
| GPQA biology | biology | chemistry | economics |
| MMLU-Pro engineering | engineering | physics | law |
| MMLU-Pro chemistry | chemistry | physics | law |
| MMLU-Pro law | law | history | engineering |

### Metrics and inference

The primary outcome, **Average Rating**, is trial-level accuracy averaged across the 25 responses to every question. Supplementary analyses instead count a question as successful when the model is correct on all 25 trials, at least 23/25 trials (90%), or at least 13/25 trials (a majority). These thresholds ask different reliability questions and produced broadly similar directional results, with persona effects becoming more pronounced at stricter thresholds.

Pairwise differences use paired bootstrap-permutation tests with 5,000 replicates and 95% confidence intervals. The supplement explicitly states that its many p-values are **not corrected for multiple comparisons**, so isolated borderline findings should be treated as exploratory rather than as stable discoveries.

## Results

### Expert personas usually do not improve accuracy

On GPQA Diamond, no expert persona significantly improved any model over baseline. The only statistically significant positive persona effect of any kind was the incongruous young-child prompt on Gemini 2.5 Flash: +0.098 accuracy difference, 95% CI [0.029, 0.164], p = 0.005. That isolated reversal is evidence of model-specific prompt sensitivity, not support for pretending to lack knowledge.

On the MMLU-Pro subset, five of the six models had no expert persona with a statistically significant positive effect versus baseline, while the study counted nine significant negative expert-persona differences. Gemini 2.0 Flash was the exception: all five expert roles modestly improved overall accuracy. The engineering role, for example, gained +0.089 [0.033, 0.148], p = 0.002. This is a real exception inside the experiment, but it does not transfer even to Gemini 2.5 Flash.

The asymmetry matters: the intervention's modal effect is null, with more evidence of harm than benefit. “No reliable gain” is stronger and more useful than “personas never work.”

### Low-knowledge personas can suppress performance

Low-knowledge framing was generally harmful. On GPQA, all three low-knowledge roles reduced o4-mini accuracy; the changes versus baseline were −0.061 for toddler (p < 0.001), −0.037 for young child (p < 0.001), and −0.022 for layperson (p = 0.030). GPT-4o also fell under the toddler role by −0.052 [−0.087, −0.016], p = 0.004.

Across MMLU-Pro, the toddler role significantly reduced accuracy for four of six models. For five models, toddler was significantly worse than layperson; GPT-4o-mini was the exception and showed no significant pairwise persona differences. Toddler was also worse than young child for four models. Models therefore respond not just to topical role labels but to the competence level implied by them.

### Matching the expert to the domain does not rescue the method

GPQA produced no significant positive baseline comparison for in-domain, adjacent, or unrelated expert roles. On MMLU-Pro, the report identifies positive domain-level results for only two models:

- **Gemini 2.0 Flash, engineering**: in-domain +0.090 [0.029, 0.152], p = 0.003; adjacent +0.071 [0.010, 0.134], p = 0.024; unrelated +0.082 [0.019, 0.149], p = 0.009.
- **Gemini 2.0 Flash, chemistry**: in-domain +0.149 [0.051, 0.249], p = 0.002; adjacent +0.131 [0.029, 0.233], p = 0.010; unrelated +0.236 [0.119, 0.353], p < 0.001.
- **GPT-4o, law**: the matched law expert gained +0.042 [0.008, 0.076], p = 0.014; adjacent and unrelated roles did not.

Gemini 2.0 Flash improving under *all three* relation types in engineering and chemistry undercuts domain matching as the causal story: the benefit may come from generic expert framing or from a model-specific interaction, not from activating the right specialty. Gemini 2.5 Flash, from the same family, showed no corresponding positive pattern.

There is also a small reporting wrinkle: Table S6 gives o4-mini's in-domain law comparison as +0.037 [0.000, 0.074], p = 0.049, while the prose says only Gemini 2.0 Flash and GPT-4o had significant domain improvements. With uncorrected tests, a rounded confidence bound touching zero, and no multiplicity adjustment, the prose's more conservative summary is the safer interpretation.

### A narrow persona can cause capability-denying refusal

The most operationally important failure is not a subtle accuracy shift. Under the unrelated-expert condition on GPQA, Gemini 2.5 Flash refused an average **10.56 of 25 trials per question**, often claiming it lacked the relevant expertise or could not “in good conscience” choose an answer. Gemini 2.0 Flash showed a milder version in some physics and chemistry settings.

The domain tables show the scale of the associated Gemini 2.5 Flash losses. Unrelated roles reduced accuracy by −0.247 in GPQA physics, −0.162 in GPQA biology, −0.305 in MMLU-Pro engineering, and −0.359 in MMLU-Pro chemistry (all p ≤ 0.009). The report directly quantifies refusals only for the GPQA unrelated-expert condition, so the other losses should not automatically be attributed entirely to refusal.

This is a distinct failure mode: the prompt does not remove knowledge from the model; it narrows the identity under which the model believes it is permitted or qualified to answer. A decorative role can therefore become an accidental capability boundary.

## Analyst Takeaways

1. **Do not ship an expert persona as an accuracy optimization without an A/B evaluation.** Across this large design, “you are a world-class expert” is mostly dead prompt weight and sometimes harmful.
2. **Treat role scope as behavioral policy, not flavor text.** A narrow role can induce unjustified abstention when the task falls outside its declared specialty. If a persona is needed for tone, explicitly preserve permission to use general knowledge and measure refusal separately from wrong answers.
3. **Domain labels are weak routers.** Matching a physics role to physics did not reliably help; Gemini 2.0 Flash even improved under unrelated roles in two MMLU-Pro domains. Route to tools, retrieval, or specialized instructions based on task requirements rather than simulated professional identity.
4. **Use task instructions, examples, and verification before anthropomorphic framing.** The report's practical conclusion is that organizations are likelier to gain from iterating on task-specific instructions, demonstrations, and evaluation workflows.
5. **Keep factuality separate from presentation.** A persona may still be valuable for tone, perspective, audience adaptation, or helping a user formulate a request. None of those benefits is tested here, and none should be advertised as increased knowledge.
6. **Repeated sampling reveals failures a single answer hides.** Twenty-five trials per item make sporadic refusal and reliability shifts visible. Mean accuracy should be accompanied by thresholds or failure-mode counts relevant to deployment.

## Questions and Limitations

- **Factual multiple choice only.** The study does not test open-ended synthesis, professional work products, tool use, retrieval, conversation, persuasion, creativity, tutoring, or stylistic quality.
- **Persona placement is narrower than the broad practice.** The generic system message remained fixed and the persona was prepended to the user prompt. The results do not fully establish how persistent system-level roles behave across turns.
- **Limited domains and persona wording.** Six academic domains and one elaborate template per expert field cannot represent every profession, role description, or task-specific expert workflow.
- **Benchmark validity.** GPQA and the selected MMLU-Pro questions are intentionally hard academic items, not a sample of everyday production requests. Multiple choice also makes refusal count as wrong without measuring whether abstention would ever be desirable.
- **Model snapshot risk.** The six product names identify a late-2025-era comparison but the report does not provide immutable checkpoint identifiers in its main method. Hosted-model behavior can change under the same name.
- **Multiplicity.** Hundreds of pairwise and domain comparisons are reported with uncorrected p-values. The broad null/negative pattern is more credible than any isolated p ≈ 0.05 exception.
- **Mechanism remains observational.** The refusals strongly suggest role-induced self-restriction, but the experiment does not isolate whether this comes from instruction hierarchy, post-training, safety behavior, or learned discourse conventions.
- **No cost or latency analysis.** Unlike Prompting Science Report 2, this report measures accuracy but does not quantify token, latency, or operational overhead from the longer persona prompts.
- **The reported boundary must stay intact.** The evidence supports “expert personas do not reliably improve factual benchmark accuracy,” not “personas are useless.”

## Vault Ideas Extracted

* [Prompt Contingency](/vault/prompt-contingency.md)
* [Quality Versus Correctness Prompt Evaluation](/vault/quality-versus-correctness-prompt-evaluation.md)
* [LLM Evaluation Methods](/vault/llm-evaluation-methods.md)
