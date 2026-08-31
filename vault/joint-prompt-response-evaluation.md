---
type: Synthesis
title: Joint Prompt–Response Evaluation
description: Scoring the input prompt and the generated response on separate rubrics in a single evaluation pass, and treating divergence between the two scores as the diagnostic signal.
tags: [evaluation, llm-as-judge, prompting]
timestamp: 2026-08-25T00:00:00Z
---

# Joint Prompt–Response Evaluation

Most evaluation treats the prompt as fixed apparatus and scores only what comes out. Joint prompt–response evaluation scores both sides of the exchange against separate criterion sets in one pass, so the resulting record says not just how good the output was but what the input contributed to it.

The unit of evaluation is the pair `(P, a)`: the composed prompt actually sent — engineered instruction plus task query — and the response it produced. The prompt is scored on intrinsic properties (clarity and structure, linguistic quality, bias and inclusivity), the response on output properties (correctness, coherence, relevance, objectivity, clarity, conciseness). Neither aggregate is folded into the other.

## Why Two Scores Beat One

The value is in the *disagreement*, not the average. Four regimes fall out:

| Prompt score | Response score | Reading |
|---|---|---|
| High | High | Working as intended. |
| Low | Low | Fix the prompt first; the model may not be the problem. |
| High | Low | Form without substance — the prompt looks well-engineered but steers badly. |
| Low | High | The model is compensating for a weak prompt. Fragile under model change. |

The high/low quadrant is the one a blended score destroys. Jailbreak prompts are the sharpest instance: their explicit, directive command structure reads as *better* prompt engineering by every surface criterion, while response quality collapses. Any metric that scores prompt form alone would rank them as improvements.

## Practical Use

- Log the two aggregates as separate fields and alert on divergence, not on the mean. A widening gap between prompt quality and response quality is an early signal that a prompt is being over-engineered toward the judge's form preferences.
- Use the prompt-side score to decide *where* to intervene. A low prompt score with a low response score is a prompt-engineering task; a high prompt score with a low response score is a model, retrieval, or task-fit problem.
- Keep prompt-side scores comparable only within one prompt convention. If some tasks supply an engineered instruction and others pass raw input text, the prompt axis partly measures whether an instruction exists at all, and cross-task comparison becomes meaningless.
- Pair the rubric with per-criterion rationales when the output will feed a revision loop; see [Rationale-Guided Prompt Rewriting](/vault/rationale-guided-prompt-rewriting.md).

## Limitations

- Prompt-side criteria are proxies for effectiveness, not measures of it. Clarity, grammaticality, and fairness are things a human can recognize in a prompt; none of them establish that the prompt elicits the right behavior from a particular model.
- Likert rubrics applied to competent modern models compress badly. When almost every score lands between 3.8 and 4.9, the axis separates strong from weak systems but cannot rank near-neighbors.
- An axis at ceiling is uninformative even when its definition is sound. Check the score distribution and its correlation with human judgment before trusting an axis in a decision.
- Not every prompt-side axis gets validated just because the framework has one. Subjective axes such as fairness need their own human-agreement evidence.
- The evaluator brings its own preferences to both sides. Fix one evaluator per comparison and treat absolute levels as arbitrary.

## Related

- [Quality Versus Correctness Prompt Evaluation](/vault/quality-versus-correctness-prompt-evaluation.md) — the complementary split: that page divides the *response* metric into judged-quality and checkable-accuracy tracks, while this one divides the *artifact* scored into prompt and response.

## Sources

- [PEEM dossier](/dossiers/peem-prompt-engineering-evaluation-metrics.md) — defines a 3-axis prompt rubric plus a 6-axis response rubric with per-axis rationales; the jailbreak case (prompt score +0.73, response score −0.93) is the framework's clearest evidence that scoring both sides is necessary.
