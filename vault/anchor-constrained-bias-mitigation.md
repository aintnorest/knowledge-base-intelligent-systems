---
type: Synthesis
title: Anchor-Constrained Bias Mitigation
description: Post-training alignment must stay close to the pre-trained model to preserve the capability that pre-training bought, which structurally bounds how far it can move behavior away from entangled undesirable structure.
tags: [reinforcement-learning, fine-tuning, governance, reliability]
timestamp: 2026-08-25T19:29:18Z
---

# Anchor-Constrained Bias Mitigation

RLHF and related post-training methods do not optimize for human preference alone. Their objective includes a term penalizing distance from the original parameters, because a policy free to move arbitrarily far degrades into text that fools the reward model while losing the capability that expensive pre-training produced. That anchoring term is not an implementation detail — it is the reason mitigation saturates.

The consequence is a trade-off with no clean setting: push the model away from latent structure that carries harmful bias, but not so hard that you lose the entangled desirable structure sitting in the same representational space. Because the two are not separable by any signal the training process has access to, "far enough to fix it" and "close enough to keep it useful" are competing rather than complementary constraints.

## Compounding Factors

The anchoring constraint is the structural limit; four practical conditions widen the uncertainty around it.

1. **The preference signal is itself a set of biases.** Feedback comes from a comparatively small annotator pool, selected and instructed by developers with their own biases, judging concepts (harm, offense, fairness) that resist single agreed definitions and whose acceptability is context- and community-dependent. The process substitutes one under-characterized set of biases for another, not a neutral standard for a biased one.
2. **Norms move faster than releases.** Social norms have shifted in weeks — pandemic handshake conventions, post-#MeToo disclosure norms — while commercial model releases are months to a year apart. Any normative criterion baked into weights is a snapshot of a moving target.
3. **Effects propagate non-locally.** Fine-tuning a model narrowly to write insecure code has produced models giving harmful advice in domains with no relation to software. Whatever the update touched, it was not confined to the fine-tuned task.
4. **There is no visibility into what changed.** No mitigation method reports how underlying structure was affected, so "we fixed it" and "we moved it somewhere we did not measure" are observationally equivalent.

Together these give the balloon behavior: squeezing the problem out of one region pushes it into another, and there is no way to see where it went.

## Practical Use

- **Budget for saturation.** Plan post-training bias work as risk reduction with diminishing returns, not as a path to removal, and decide in advance what residual you are accepting.
- **Keep the normative layer outside the weights where you can.** Policy filters, retrieval-time constraints, and explicit rules over inputs and outputs can be revised on the timescale that norms actually change; weights cannot.
- **Evaluate off-task after any fine-tune.** Non-local propagation means a task-specific fine-tune needs evaluation on unrelated safety-relevant behavior, not only on the fine-tuned task.
- **Record the preference-generation process as part of the artifact.** Rater population, instructions, and the definitions of harm used are the actual normative content of the model; treat them as documentation, not internal detail.
- **Watch the anchoring hyperparameter as a stated safety/capability trade-off**, not a tuning knob buried in a config.

## Limitations

- This bounds what post-training can achieve; it does not say the achievable reduction is worthless. Mitigation does measurably change behavior on the axes it is trained for.
- The argument is strongest for methods that must preserve pre-trained behavior. Approaches that change pre-training itself — curated corpora, altered objectives, representations that separate conventional from contingent structure — are outside its scope, though they are also outside current practice.
- "Entangled structure" is asserted from the mechanics of distributional representation learning rather than demonstrated by isolating a specific entanglement.
- The non-local propagation evidence is a small number of striking results, not a characterized law about how far and in which directions updates spread.

## Sources

- [Large Language Models Are Biased Because They Are Large Language Models dossier](/dossiers/llms-are-biased-because-they-are-llms.md) — Resnik's four-property critique of RLHF: contested human feedback, temporal instability of norms, the proximity term in the optimization criterion, and the resulting uncertainty, plus the emergent-misalignment result as evidence of non-local propagation.
