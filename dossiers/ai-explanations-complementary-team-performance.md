---
type: Study Note
title: "Does the Whole Exceed its Parts? The Effect of AI Explanations on Complementary Team Performance"
description: Human–AI teams surpassed both solo partners on selected sentiment and reasoning tasks, but explanations added no significant accuracy over recommendations with confidence and sometimes increased acceptance of incorrect advice.
resource: https://doi.org/10.1145/3411764.3445717
source: /archive/ai-explanations-complementary-team-performance.pdf
tags: [evaluation, interaction-design, reliability, verification]
timestamp: 2026-10-05T23:18:26Z
---

# Does the Whole Exceed its Parts? — Study Notes

**Authors**: Gagan Bansal, Tongshuang Wu, Joyce Zhou, Raymond Fok, Besmira Nushi, Ece Kamar, Marco Tulio Ribeiro, and Daniel S. Weld.  
**Published**: CHI 2021, May 8–13, 2021; ACM, 16 pages.  
**Status**: Peer-reviewed CHI conference paper. The archived manuscript is arXiv:2006.14779v3, posted January 12, 2021, with same-work publisher DOI and CHI citation. Non-agent AI-assisted classification and question answering, not an LLM-agent study.

## What It Is

A mixed-method evaluation of whether explanations help a human–AI team **outperform both partners acting alone**. The authors deliberately select cases where human and AI accuracies are comparable, creating room for complementary performance. Teams achieve that complementarity, but explanations do not significantly improve their accuracy over the stronger baseline of AI recommendations plus confidence.

## Problem and Motivation

Improving on an unaided person is insufficient evidence that collaboration adds value: a team can improve over the person while still underperforming autonomous AI. Likewise, showing that a person understands or predicts a model's behavior is not equivalent to showing better final decisions. For accuracy-focused teaming, the relevant comparison includes **human alone, AI alone, recommendation-plus-confidence, and explanation-assisted teams**.

Complementarity requires recoverable differences in mistakes, not merely similar headline accuracy. If the person and model fail on the same cases, there is little opportunity for selective correction. Explanations can also persuade rather than inform, increasing acceptance of both correct and incorrect advice.

## Mechanism as an Idea

The tasks were beer-review sentiment, book-review sentiment (Amzbook), and logical-reasoning questions from LSAT material. Fine-tuned RoBERTa models supplied predictions. For sentiment, post-hoc confidence calibration and LIME saliency produced word highlights; an author also prepared short expert-selected evidence spans. LSAT used author-condensed prep-book explanations for correct choices and manually constructed supporting arguments for alternatives, since usable automated explanations were unavailable.

Three explanation strategies were compared with unassisted decisions and recommendations with confidence:

- **Top-1**: explain only the predicted class or answer.
- **Top-2**: also explain the alternative, exposing contrary evidence.
- **Adaptive**: explain one prediction at high confidence and two below a task-specific confidence threshold.

For sentiment, the adaptive threshold was the median model confidence, allocating **25 of 50 cases** to each display type. The two-class display included **seven of eight model errors** in each sentiment dataset; one high-confidence error remained in the single-class display. This favorable allocation did not establish an aggregate accuracy advantage.

The essential mechanism is not “more explanation.” It is the relation between **evidence framing, uncertainty, human competence, and advice timing**. Counterevidence may encourage rejection but cannot ensure the person knows the correct answer. High-confidence failures can evade an uncertainty-based trigger entirely.

## Results / Admissions

**Study samples**: each sentiment task used **50 selected, unambiguous examples**, with AI accuracy fixed at **84%** to approximate pilot human performance (**87% Beer, 85% Amzbook**). LSAT used **20 questions**, with **65% AI accuracy** versus **67% pilot human accuracy**. Final human-only performance was not identical to pilot estimates; for Beer it was **82%±9%**.

**Participant accounting needs caution**: the paper's **1,626 users** matches recruited totals (**566 Beer + 552 Amzbook + 508 LSAT**), not an unambiguous analyzed sample. Sentiment reportedly retained 84%, with **93–101 participants per condition**. The LSAT procedure says both that **35% of 508** passed and completed the task and that there were **100 per condition**. Those claims cannot all hold across its human baseline and four team conditions. The exact LSAT retained denominator cannot be recovered reliably from this manuscript's prose; neither 1,626 nor the per-condition assertion should be presented as a clean analyzed N.

- **Complementarity without explanation**: Beer recommendation-plus-confidence accuracy was **89%±5%**, above both AI (**84%**) and final unaided humans (**82%±9%**). Confidence-only teams also surpassed both partners on Amzbook and LSAT; reported relative gains over unaided workers were **2.2% and 20.1%**, respectively. These are relative gains, not percentage-point changes. Figure 4 reports complementary performance for every team condition.
- **No significant incremental explanation benefit**: Beer Top-1 AI explanations yielded **88%±6%**, versus **89%±5%** for confidence only (**p=.24**). The analogous Top-1 comparisons were nonsignificant for Amzbook (**p=.22**) and LSAT (**p=.64**). Top-1 versus Top-2 differences were also nonsignificant on all tasks.
- **Adaptive displays did not rescue aggregate performance**: adaptive AI explanations versus confidence only were nonsignificant for Beer (**p=.31**) and Amzbook (**p=.28**); adaptive expert explanations versus confidence only were nonsignificant for LSAT (**p=.87**). Replacing adaptive AI explanations with expert ones did not significantly improve sentiment-team accuracy (**p=.19 Beer; p=.43 Amzbook**).
- **Conditional harm and task variation**: Top-1 explanations increased acceptance of recommendations and worsened decisions on AI-error cases in Beer and LSAT, while helping on correct-AI cases. Amzbook differed: Top-1 improved accuracy on wrong-AI cases by a reported **5%** over confidence alone. Thus the aggregate null is not evidence that explanations are behaviorally inert or uniformly harmful.
- **Adaptive agreement moved in the intended direction**, reducing agreement at low confidence, but this did not yield a significant aggregate accuracy gain. The person still needed to solve the rejected cases and detect high-confidence mistakes.
- **Preference is not performance**: expert adaptive explanations were descriptively rated useful more often than AI-generated ones (**53% versus 38% Beer; 50% versus 40% Amzbook**). The authors explicitly make no significance claims for these post-hoc subjective ratings; higher perceived usefulness did not produce demonstrated accuracy gains.
- **Qualitative evidence**: **409 unique coded self-reports** remained after removing 11 poor-quality responses. **190 (47%)** used advice as a prior guide; **102 (25%)** as a post-check; **90 (22%)** mostly ignored it; **23 (6%)** mostly followed it. These counts sum to 405 rather than 409, another small denominator inconsistency. Among explanation-condition responses, **138 (42%)** mentioned using explanations, **29 (9%)** speed reading, and **17 (5%)** validating the AI; explanation-use percentages have a different denominator from all respondents. Self-reports suggest pathways, not causal mediation or measured time savings.

## Analyst Takeaways

1. **Use both solo partners as baselines.** A team better than a human but worse than AI is not complementary on accuracy, although legal accountability or other objectives may still require human involvement. Evaluate those additional objectives explicitly rather than relabeling an accuracy loss.
2. **Separate persuasiveness from error discrimination.** An explanation should help distinguish when a recommendation is correct, not merely make acceptance feel justified. This directly supports [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md) and cautions against interpreting navigable evidence or confidence increases as validated oversight gains in [Overseeing Agents Without Constant Oversight](/dossiers/overseeing-agents-without-constant-oversight.md).
3. **Similar accuracy is not complementary expertise.** Inspect the joint distribution of human and model errors. The study's task differences suggest why a useful collaborator is defined by recoverable mistakes rather than its average accuracy alone.
4. **Timing and evidence framing are different intervention axes.** This study usually presents advice before an independent answer; [To Trust or to Think](/dossiers/to-trust-or-to-think-cognitive-forcing.md) explicitly changes access timing. Its pooled improvements on AI-error subdecisions should not be treated as proof that better explanations alone solve overreliance.

## Questions and Limitations

- Selected cases equalize average competence and remove ambiguous labels; they are not a representative deployment distribution. There is no general guarantee of complementarity outside these fixed samples.
- Crowdworker sentiment and short logic tasks do not establish effectiveness for expert clinical or legal decisions, live agents, or prolonged exposure.
- All participants received immediate correctness feedback and performance incentives; deployed users may have neither, changing how they learn reliance policies.
- Expert LSAT explanations for wrong alternatives were deliberately plausible justifications, not independently correct solutions. The author calls expert explanations a quality upper bound, but their persuasive quality is not an established bound on faithful or diagnostic explanation quality.
- The manuscript says significance testing used Student's t-tests with Bonferroni correction yet reports contrasts labeled z. Null significance results do not establish equivalence; claims that explanations perform similarly should be read as failure to detect an improvement.
- Time-saving and independent-reasoning interpretations come mainly from self-reports and interface reasoning. The study's primary measured outcome is accuracy, not a joint accuracy–latency–effort utility.
- Alternative explanation forms, delayed advice, interactive counterevidence, and teamwork-aware model training are proposed directions, not demonstrated fixes. The manuscript mentions an explainer-comparison appendix that is not present in the archived extracted paper.

## Vault Ideas Extracted

* [Complementary Human–AI Performance](/vault/complementary-human-ai-performance.md)
* [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md)
