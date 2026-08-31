---
type: Synthesis
title: Quality Versus Correctness Prompt Evaluation
description: Measuring a prompt change on two separate tracks — judged response quality on tasks where quality is what varies, and accuracy on tasks with a checkable answer — because an intervention can move one without moving the other.
tags: [evaluation, prompting, llm-as-judge, verification, reliability]
timestamp: 2026-08-25T00:00:00Z
---

# Quality Versus Correctness Prompt Evaluation

A prompt change has two distinct possible effects, and one evaluation number cannot report both. **Quality** is how good the response is judged to be — clarity, relevance, tone, completeness, appropriateness for the reader. **Correctness** is whether the answer is right against a checkable standard. A prompt intervention can raise either while leaving the other flat, and several common interventions raise only the first.

The pattern is a two-track protocol: run quality on task items where quality is the thing that varies, run correctness on task items that have a verifiable answer, and report them separately — including which interventions were inapplicable to each track.

## Why Collapsing Them Misleads

Most surface-level prompt levers act on presentation. Audience framing, role assignment, tone directives, simplification requests, style imitation, and incentive phrasing all change how an answer reads. A judge comparing a styled response with a plain one will frequently prefer the styled one, and that preference is a real result about quality — it is just not evidence about accuracy.

Reporting a single blended preference score therefore transfers credibility earned on presentation to a claim about capability. The failure is asymmetric and predictable: interventions that only affect register appear to "improve the model," and the improvement evaporates on any task with a right answer.

The reverse also occurs. An intervention that improves accuracy — decomposition, worked examples, tool routing — can make responses longer, more mechanical, or less pleasant, and lose on a preference comparison while winning on the metric that matters.

## The Protocol

1. **Split the item pool by what varies.** Open-ended items where many answers are acceptable go to the quality track. Items with a verifiable answer — reasoning, arithmetic, extraction, classification, code that runs — go to the correctness track.
2. **Pair, holding the question fixed.** For each item, generate a response with and without the intervention, varying nothing else. The pair is the unit of analysis.
3. **Score each track with its own instrument.** Quality by human or calibrated LLM judgment on a stated scale; correctness by an executable check, reference answer, or task-specific rule — not by the same judge.
4. **Record applicability.** Some interventions cannot be applied to some tracks at all — an interactive clarification-seeking directive or a style-preserving revision template has no meaning on a math item. Report which interventions were excluded from which track and why. A technique that only ever appears on the quality track is a style lever, and the exclusion list says so.
5. **Report absolute and relative correctness.** A large relative gain on a low absolute base still means most answers are wrong; the absolute number keeps that visible.
6. **Check item-level movement, not only the aggregate.** Register-level changes tend to produce offsetting per-item swings — see [Prompt Contingency](/vault/prompt-contingency.md).

## Guarding the Quality Track

The quality track is where measurement is most fragile, because the intervention is often visible in the output.

- **Blind and randomize.** A judge who can identify the treated response is scoring the treatment, not the answer.
- **Report agreement.** Inter-rater agreement, or judge-versus-human agreement for an LLM judge, is part of the result.
- **Watch for length and formatting bias.** Judges reward longer, more structured, more confident text; a treated response usually has more of all three. See [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md).
- **Fix the scale.** "57% quality improvement" is uninterpretable without stating what was being rated and on what range.

Quality itself should not be collapsed into one universal taste score. A useful rubric separates at least information utility, information quality, and style quality, then weights their concrete defects for the document's purpose. Expert annotations of news and short factual QA show why: relevance, density, coherence, tone, and bias mattered more for news, while factuality and structure dominated QA. Ask raters to identify evidence spans and defect categories before issuing a global verdict; those local judgments can be more reproducible and more actionable than the binary label.

## Practical Use

When adopting a prompt technique, name which track it is supposed to move before measuring. If the answer is "quality," accept that the technique's value is presentational and stop claiming capability gains for it. If the answer is "correctness," measure it on items with checkable answers and treat any judged-preference gain as a bonus rather than as the result.

The same split applies to format-control interventions: conformance to a schema is a third thing again, easy to measure and easy to mistake for either of the other two. See [Answer Engineering](/vault/answer-engineering.md).

## Limitations

- The split is cleaner in benchmarks than in products, where "good answer" often genuinely means both correct and well-presented. In that case, report both and set a policy for trade-offs rather than averaging them.
- Two tracks means two item pools and two instruments, which roughly doubles evaluation cost.
- Correctness is only as good as the checkable standard; a weak reference answer reintroduces judgment through the back door.

## Related

- [Joint Prompt–Response Evaluation](/vault/joint-prompt-response-evaluation.md) — the complementary split: this page divides the response metric into two tracks, while that one scores the prompt and the response as separate artifacts.

## Sources

- [Principled Instructions Are All You Need for Questioning LLaMA-1/2, GPT-3.5/4 dossier](/dossiers/principled-instructions-questioning-llms.md) — separates "boosting" (human-judged quality gain, measured on simpler items) from "correctness" (accuracy, measured on complex reasoning items) across 26 prompt principles, and excludes five principles from the correctness track as inapplicable.
- [Measuring AI “Slop” in Text dossier](/dossiers/measuring-ai-slop-in-text.md) — decomposes low-quality prose into utility, information-quality, and style defects; finds that the predictive dimensions differ between news and factual QA.
