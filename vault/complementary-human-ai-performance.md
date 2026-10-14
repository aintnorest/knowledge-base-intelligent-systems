---
type: Synthesis
title: Complementary Human–AI Performance
description: Collaboration adds accuracy value only when it exceeds both solo partners through recoverable differences in errors, not merely greater acceptance of advice.
tags: [evaluation, reliability, verification]
timestamp: 2026-10-14T13:00:00Z
---

# Complementary Human–AI Performance

A human–AI team is complementary on accuracy when it outperforms **both the unaided human and the AI acting alone**. Improving over a person is insufficient if the team still performs worse than autonomous prediction. Human involvement may nevertheless serve accountability, rights, or other objectives; measure those separately rather than calling an accuracy loss complementarity.

## How It Works

Complementarity needs **recoverable differences in errors**: the person must recognize and correct some model failures while retaining useful advice on cases the model handles better. Comparable partner accuracy can create favorable conditions for this exchange, but matching averages is not enough. Shared mistakes leave little correction opportunity; a large competence gap makes surpassing the stronger partner harder. Rejecting bad advice also does not guarantee that the replacement answer is correct.

Explanations can support diagnosis or merely persuade. Controlled classification and reasoning studies found teams exceeding both solo partners with recommendations and confidence displays, but **no significant incremental accuracy benefit from the tested explanations**. Some explanation conditions increased acceptance of wrong advice while helping on correct-advice cases; effects varied by task. This is not proof that explanations are useless or equivalent to confidence displays. It is a reason to test error discrimination rather than perceived usefulness.

Advice timing is a separate intervention axis. Requiring an independent answer, making advice available on demand, or delaying it can reduce some wrong-advice acceptance without increasing overall accuracy. See [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md) for these intervention tradeoffs. In agent workflows, recognizing and repairing consequential errors is also central to [Expertise-Mediated Agent Steering](/vault/expertise-mediated-agent-steering.md); the non-agent experiments here do not establish transfer to that setting.

## What to Measure

- **Team versus best solo:** evaluate human alone, AI alone, recommendation-plus-confidence, and the proposed collaborative interface on comparable cases. Report uncertainty, not only whether the team improves over unaided people.
- **Joint errors:** identify cases where only one partner is correct, where both fail, and whether the interface actually recovers the available advantage.
- **Accuracy conditioned on AI correctness:** separate helpful uptake on correct-advice cases from harm on incorrect-advice cases; aggregate accuracy can hide opposing effects.
- **Over- and under-reliance:** measure adoption of incorrect advice and rejection of correct advice, distinguishing disagreement from successful correction. An independently recorded initial answer can help interpret revisions.
- **Other utility:** measure effort, latency, workload, and accountability outcomes when they motivate collaboration. Preference and confidence cannot substitute for final decision quality.

## Augmentation, Substitution, and Strict Complementarity

For artifact-production tasks, apply the same both-solo logic to the relevant quality outcome rather than assuming classification accuracy is the only objective. Distinguish **augmentation** (assisted people improve over unaided people), **substitution** (assistance supplies some benefit otherwise provided by a second person), and **strict complementarity** (collaboration exceeds both comparable solo partners). These require different baselines.

A workplace innovation experiment found proposal-quality gains of **0.245 SD** for unaided human pairs, **0.373 SD** for assisted individuals, and **0.392 SD** for assisted pairs, all relative to unaided individuals. Assisted individuals were described as comparable to unaided pairs, suggesting partial substitution for collaborative functions, not formal equivalence. Direct assisted-pair versus unaided-pair quality contrasts were nonsignificant. There was **no matched AI-alone quality baseline**; an AI-only semantic-similarity exercise cannot establish strict complementarity.

Tail performance needs its own direct comparisons. Assisted pairs increased top-decile proposal incidence by **9.2 percentage points** over an unaided-individual baseline of **5.8%**, but contrasts against unaided pairs and assisted individuals did not meet p < 0.05 in any reported specification. A significant baseline contrast and nonsignificant alternative contrasts do not establish exceptional team synergy or equivalence between configurations.

These proposal ratings concern short-run ideation, not commercial success, implementation, or retained expertise. The archived working paper also has unresolved sample and timing discrepancies. Evaluate person-hours and portfolio diversity alongside mean and tail quality when deciding whether to augment people or reorganize work; see [AI-Induced Work Reallocation](/vault/ai-induced-work-reallocation.md).

## Limits

The supporting peer-reviewed studies used selected crowdworker tasks, not representative expert or agent deployments. The complementarity study selected unambiguous samples with comparable pilot partner accuracy and supplied correctness feedback and performance incentives. Its reasoning-task retained-participant claims are internally inconsistent, so the recruited total is not a clean analyzed sample size. Plausible explanations for wrong alternatives were not independently correct solutions, and nonsignificant contrasts do not establish equivalence.

The advice-timing study used a simulated, specific upstream perception error in a short nutrition task. Its error-conditioned subdecision benefit did not establish an aggregate team advantage; complete decisions remained harder to correct, and motivation-dependent outcomes caution against assuming equal benefit. Neither study establishes long-term habituation, expert high-stakes outcomes, or gains in live agent collaboration.

## Sources

- [Does the Whole Exceed its Parts? The Effect of AI Explanations on Complementary Team Performance dossier](/dossiers/ai-explanations-complementary-team-performance.md) — peer-reviewed CHI 2021 evidence for both-solo baselines, complementary confidence-display teams, no significant incremental explanation gain, task-dependent wrong-advice acceptance, selected samples, and inconsistent LSAT retained-N accounting.
- [To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-assisted Decision-making dossier](/dossiers/to-trust-or-to-think-cognitive-forcing.md) — peer-reviewed CSCW 2021 advice-timing experiment separating subdecision overreliance reduction from aggregate performance, successful correction, and motivation-dependent benefit.
- [The Cybernetic Teammate dossier](/dossiers/cybernetic-teammate-generative-ai-teamwork.md) — archived April 2025 NBER working paper on P&G innovation with GPT-4/GPT-4o; augmentation and partial human-team substitution without a matched AI-alone quality baseline, and top-decile improvement only established against unaided individuals rather than other collaborative configurations.
