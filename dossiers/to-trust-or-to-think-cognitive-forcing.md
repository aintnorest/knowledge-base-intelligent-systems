---
type: Study Note
title: "To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-assisted Decision-making"
description: A controlled nutrition-decision study finds that withholding AI advice until requested, an initial decision, or a delay reduces some error-conditioned overreliance, without improving aggregate team performance and with unequal benefits by cognitive motivation.
resource: https://doi.org/10.1145/3449287
source: /archive/to-trust-or-to-think-cognitive-forcing.pdf
tags: [reliability, interaction-design, evaluation, verification]
timestamp: 2026-10-05T23:18:26Z
---

# To Trust or to Think — Study Notes

**Authors**: Zana Buçinca, Maja Barbara Malaya, and Krzysztof Z. Gajos.  
**Published**: April 2021; Proceedings of the ACM on Human-Computer Interaction 5, CSCW1, Article 188, 21 pages.  
**Status**: Peer-reviewed CSCW paper, accepted January 2021. The archived manuscript is arXiv:2102.09692v1, posted February 19, 2021, and carries the same-work publisher DOI and publication metadata. This is non-agent AI-assisted decision-making, not an LLM-agent evaluation.

## What It Is

An experiment testing whether **changing when advice becomes available**, rather than merely improving its explanation, helps people reject incorrect AI recommendations. In a simulated meal-substitution task, cognitive forcing functions reduced overreliance for identifying the carbohydrate source, but did not eliminate it or improve aggregate performance over ordinary explanation interfaces.

## Problem and Motivation

Explanations assume people inspect their content on each decision. Instead, a plausible explanation can become a general competence signal: the person learns to follow the system rather than diagnose this particular recommendation. The authors use dual-process cognition to motivate decision-time interventions that interrupt quick acceptance and encourage an independent hypothesis. That account is a theoretical interpretation, not a direct measurement of participants' internal reasoning.

## Mechanism as an Idea

Participants chose the highest-carbohydrate ingredient in a meal photograph, then selected a lower-carbohydrate, flavor-similar replacement. The explanation displayed four candidate replacements with carbohydrate reduction and flavor similarity. The simulated AI correctly recognized the carbohydrate source on **75%** of cases; its errors deliberately omitted the highest-carbohydrate ingredient and recommended replacing the second-highest instead. Replacement ranking after recognition was deterministic, so this tests a specific upstream perception error rather than arbitrary bad reasoning.

Six reported interfaces comprised:

- **No AI**: independent decision.
- **Immediate explanation**: advice and feature-based explanation visible from the outset.
- **Uncertainty**: the same explanation, with confidence when the AI was uncertain.
- **On demand**: advice hidden until explicitly requested.
- **Update**: an initial unaided decision required before advice became visible; revision allowed afterward.
- **Wait**: advice delayed for **30 seconds**, allowing the person to form an answer before exposure.

The last three were pooled as cognitive forcing functions (CFF); the two immediate-advice interfaces were pooled as simple explainable AI (SXAI). The reusable boundary is **independent judgment before persuasive assistance**, although requesting advice does not itself establish independent thought. No individual forcing design proved superior to the others.

## Results / Admissions

**Sample and protocol**: **260 US MTurk adults recruited; 199 retained** after excluding 49 with poor task engagement and 12 assigned only to three additional exploratory conditions not reported here. Each participant encountered two of nine interfaces in two blocks, with **12 analyzed decisions per block** and three incorrect-AI cases per block. Mixed-effects models accounted for repeated participants; post-hoc comparisons used Holm–Bonferroni correction. Reported figures below are model-adjusted marginal means, not raw population rates.

- **Incorrect-AI cases, carbohydrate-source detection**: correct detection rose from **8% SXAI to 27% CFF**, versus **49% without AI** on the same cases. Following the wrong AI ingredient fell from **64% to 48%** (**p=.003, d=.36**). Different wrong human answers did not significantly change. Thus forcing helped selective rejection but left substantial harm relative to unaided decisions on AI failures.
- **Incorrect-AI cases, complete optimal replacement**: correctness rose from **3% SXAI to 9% CFF**, versus **18% no AI**. But full-answer overreliance was **30% versus 26%**, a **nonsignificant** difference. The headline reduction is therefore stronger for the ingredient-identification subdecision than for the entire decision. The categorical distributions use **663 incorrect-AI decision instances**, not 663 people.
- **All cases**: complete-decision accuracy was **17% no AI, 35% SXAI, 33% CFF**; carbohydrate-source detection was **42%, 56%, 57%**. Both assistance categories improved on no AI; **CFF did not significantly outperform SXAI** on any aggregate objective metric. H1b, the aggregate improvement hypothesis, was not supported. Teams remained below the simulated AI's 75% source-detection accuracy.
- **Acceptability**: perceived complexity was higher with CFF (**2.95 versus 2.64 on a five-point scale**). Pooled trust (**3.72 versus 3.91**) and preference (**3.62 versus 3.78**) differences were not significant, nor were differences among individual designs within categories. Higher trust and preference correlated with worse performance on AI-error cases; this supports a tension, not a demonstrated causal ranking of the three interventions.
- **Need for Cognition audit**: a four-item questionnaire and median split identified unequal descriptive benefits. On AI-error cases, high-NFC complete-decision accuracy rose **2%→11%** (**p=.002**), while low-NFC rose **3%→6%**, nonsignificantly. Source detection improved in both groups (**8%→29% high; 9%→26% low**). High-NFC source overreliance fell **77%→57%** (**p=.004**); low-NFC fell **50%→37%**, nonsignificantly. These subgroup significance patterns alone do not constitute a reported formal between-group treatment interaction. Table 5 rounds low-NFC complete correctness to 7%, while Table 4 reports 6%; the discrepancy should not be read as a second estimate of efficacy.

## Analyst Takeaways

1. **Measure rejection and successful correction separately.** Reduced agreement with wrong advice is useful only if the replacement decision is better. This strengthens [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md), which already separates engagement and confidence from judgment accuracy.
2. **Treat cognitive forcing as an error-conditioned intervention, not an aggregate-quality guarantee.** Improved handling of AI failures can coexist with unchanged total performance. Prefer neither blanket friction nor frictionless acceptance without measuring the actual task mix.
3. **The later execution-plan study changes both the intervention and task.** [Cognitive Forcing Functions for Execution Plans](/dossiers/cognitive-forcing-functions-execution-plans.md) asks for assumption or counterfactual reflection over writing plans; this source manipulates access to advice in nutrition decisions. Its controlled positive subdecision result does not resolve that preprint's contradictory adjusted accuracy analyses.
4. **Motivation is part of the interface's reliability envelope.** A review gate that works primarily for people already inclined to deliberate can widen performance disparities. This is an outcome audit, not a reason to label low-NFC users incapable of oversight.

## Questions and Limitations

- One low-stakes nutrition task, short exposure, selected crowdworkers, and a simulated error mechanism do not establish transfer to clinical experts, live agent traces, or long-term habituation.
- The study does not directly establish that analytical thought mediated the improvements. Delayed access, independent commitment, reduced exposure, and reactance are different possible pathways.
- Error-conditioned no-AI comparisons involve other participants on the same items, not a counterfactual answer from the identical person. Aggregate rates cannot prove each particular acceptance displaced a correct unaided answer.
- Pooling interventions supports a category-level comparison but not a preferred individual design. Three additional conditions were explored but not reported.
- The abstract's broad acceptability language is stronger than the pooled trust/preference significance results; the discussion occasionally says forcing improved team performance without restating the error-conditioned scope. Read these claims against the explicit null aggregate result.
- Adaptive forcing based on predicted benefit, uncertainty, and cognitive motivation is proposed future work, not an evaluated system.

## Vault Ideas Extracted

* [Complementary Human–AI Performance](/vault/complementary-human-ai-performance.md)
* [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md)
