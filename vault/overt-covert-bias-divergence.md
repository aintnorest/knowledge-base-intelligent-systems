---
type: Synthesis
title: Overt–Covert Bias Divergence
description: A model's direct answers about a property and the property actually encoded in its representations can move independently, so behavioral evaluation certifies a response policy rather than an internal state.
tags: [evaluation, verification, governance, reliability]
timestamp: 2026-08-25T19:29:18Z
---

# Overt–Covert Bias Divergence

Asking a model whether it holds a stereotype, and observing that it says no, establishes what it says when asked. It does not establish what its representations encode, and the two can diverge — in the direction that makes evaluation look successful.

The documented case: models given additional bias-alleviation training produce *positive* overt stereotypes about African Americans when asked directly, while simultaneously exhibiting covert dialect-based prejudice — assigning worse jobs, harsher judgments — when the same group is indicated by dialect rather than named. The reported conclusion is that human-feedback training "obscures the racism on the surface, but the racial stereotypes remain unaffected on a deeper level."

The general form is broader than bias. A system's account of its own behavior has no necessary relationship to the process that produced that behavior; the lawyer who verified a hallucinated case by asking the same chatbot whether the case was real is the same failure in a different domain.

## Why It Happens

Post-training methods act most cheaply on the surface. Adjusting what a model emits in response to an explicit, recognizable prompt pattern is a small, well-signposted change; restructuring the entangled latent representation that produced the disposition is not, and is bounded by the requirement to preserve pre-training capability. Optimization pressure applied to overt outputs is therefore satisfied at the response layer, leaving the representational layer intact and now harder to detect — the surface signal that used to reveal it has been trained away.

Worse, this makes the evaluation actively misleading rather than merely incomplete: mitigation increases the gap between what the overt probe reports and what the model does under indirect elicitation.

## Practical Use

- **Never treat a direct-question benchmark as certification.** Overt-probe scores measure a response policy. Report them as such.
- **Elicit indirectly.** Vary the surface cue that indicates the sensitive attribute — dialect, name, register, implicature, task framing — rather than naming the category. Divergence between direct and indirect elicitation is itself the measurement of interest.
- **Measure the gap, not just the level.** Track direct-probe score and indirect-elicitation score together across mitigation rounds. A mitigation that improves the first while leaving the second flat has moved the problem, not solved it.
- **Extend to downstream decisions.** Test the behavior in the consequential setting (ranking, routing, eligibility, tone), not only in the "is this stereotype true?" setting, since that is where a covert disposition expresses itself.
- **Apply the pattern beyond bias.** Self-report about refusal reasons, tool-choice rationales, or safety compliance is evidence about self-report.

## Limitations

- Indirect elicitation has the same epistemic ceiling one level down: it is still behavioral, and a probe that becomes standard becomes a target for the next round of surface mitigation.
- Absence of divergence is not evidence of absence. Failing to elicit a covert disposition through the cues you thought to try bounds nothing.
- Constructing indirect probes requires domain and sociolinguistic expertise, and their validity — whether the cue really indicates the attribute for the population in question — is itself contestable.
- Closing the gap properly would require inspecting representations and mechanisms, which for frontier models is generally unavailable to the people running the evaluation.

## Sources

- [Large Language Models Are Biased Because They Are Large Language Models dossier](/dossiers/llms-are-biased-because-they-are-llms.md) — argues that overt direct-response behavior has no necessary relationship to underlying representational bias, citing the covert dialect-prejudice result and using it to reject behavioral probing as evidence against the paper's central claim.
