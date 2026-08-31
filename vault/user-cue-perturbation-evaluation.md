---
type: Synthesis
title: User-Cue Perturbation Evaluation
description: An evaluation design that holds the task content fixed and varies only what the prompt reveals about the user, measuring the resulting output delta against a no-cue baseline.
tags: [evaluation, reliability, prompting]
timestamp: 2026-08-25T19:20:00Z
---

# User-Cue Perturbation Evaluation

Score a model on the *difference* between paired runs rather than on any single run. Fix the artifact under evaluation — a math solution, an argument, a question, a document — and change only a phrase that reveals something about the user: what they prefer, what they wrote, what they believe the answer is, or whether they are challenging the model. A response that shifts is exposing a dependence on the user that the task itself does not license.

## The Design

1. **Baseline run.** Present the item with no cue. Record the response.
2. **Treatment runs.** Present the identical item with one cue appended. Use cues in *opposing* directions ("I really like this" / "I really dislike this"; correct guess / incorrect guess), so the metric separates genuine bias from a global tone shift.
3. **Compare, don't grade.** Judge each treatment response *relative to* the baseline — more positive, or more accurate, or agreeing with the stated claim — rather than scoring it on an absolute rubric.
4. **Report the signed gap** between opposing cues, averaged over items and domains. That gap is the effect size; the absolute level is not the finding.

### Metrics on the Paired Runs

Survey work imports these from the FlipFlop experiment (Laban et al., arXiv:2311.08596 — take the definitions from that primary source):

- **Agreement rate** — how often the model endorses a false premise the user supplied.
- **Flip rate** — how often a correct baseline answer is abandoned under the cue.
- **Consistency Transformation Rate (CTR)** — the share of items whose prediction changes at all between neutral and cued runs.
- **Error Introduction Rate (EIR)** — the share of *previously correct* answers that the cue turns wrong. Separates harmful flips from harmless churn.
- **Prediction Imbalance Rate (PIR)** — whether flips are directional; values far from 0.5 indicate deference rather than instability.

CTR versus EIR versus PIR is the distinction that matters: a model can be unstable
without being systematically wrong, and only a directionality metric separates
noise from deference. Reporting a single flip rate hides which one you have.

## Why It Beats Absolute Scoring

A single-run benchmark cannot distinguish "the model thinks this argument is good" from "the model thinks you want to hear that this argument is good." Paired perturbation makes the item its own control, so item difficulty, judge calibration drift, and rubric vagueness cancel out. It also works with a cheap or noisy judge: asking "which of these two comments is more positive?" is far more reliable than asking for a 0–100 quality score.

## Practical Use

- Include an objectively scorable domain alongside subjective ones. A shift on math solutions is unambiguous in a way a shift on poetry is not.
- Add a confidence control. Ask the model to state confidence in a separate turn, discard that turn from history, and check whether the effect persists on high-confidence items — otherwise the result is confounded with ordinary calibration.
- Verify the model has the correct answer *without* the cue before counting a cued error. A model that cannot attribute a poem correctly at baseline is not mimicking the user, it just doesn't know.
- The design generalizes past sycophancy: swap the user-preference cue for a demographic hint, a claimed seniority, a stated urgency, or a spoofed authority to measure other prompt-borne biases the same way.

## Limitations

The metric conflates illegitimate deference with legitimate updating — a user's stated belief sometimes *is* evidence, so a nonzero gap is not automatically a defect. Cue phrasing carries its own effects, so several paraphrases per cue are needed before attributing the delta to the stance rather than the wording. And a comparison judge that is also one of the systems under test can share the bias being measured.

## Sources

* [Towards Understanding Sycophancy in Language Models](/dossiers/understanding-sycophancy-language-models.md) — SycophancyEval builds four metrics (feedback, "are you sure?", answer, mimicry) on this pattern across five assistants.
* [Sycophancy in Large Language Models: Causes and Mitigations](/dossiers/sycophancy-large-language-models-causes-mitigations.md) — surveys five measurement families (ground-truth comparison, human evaluation, automated metrics, adversarial probing, comparative evaluation) and imports the FlipFlop CTR/EIR/PIR metrics.
