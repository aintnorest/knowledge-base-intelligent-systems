---
type: Synthesis
title: Output Priming
description: Ending a prompt with the opening tokens of the desired response so the model continues an already-committed form, constraining format and skipping preamble without adding instructions.
tags: [prompting, context-engineering, reliability, verification]
timestamp: 2026-08-25T00:00:00Z
---

# Output Priming

Output priming ends a prompt with the beginning of the answer you want, leaving the model to continue rather than to start. Instead of instructing "reply with JSON only," the prompt terminates with `{"label":`. Instead of "list three options," it terminates with `1.`. The desired form is demonstrated by commitment rather than described.

The mechanism is plain: a language model continues a sequence. If the sequence already contains the opening of a structure, the highest-probability continuation stays inside that structure. The tokens you supply are not a request the model may decline — they are context it must extend.

## Why It Works Where Instructions Do Not

An instruction about format competes with everything else in the prompt and with the model's default conversational habits — the preamble, the restatement of the question, the hedge, the closing offer of further help. A primer removes the opportunity for those. There is no position in the sequence where a preamble would fit.

This makes priming a **format** and **preamble** control, and only weakly a content control. It reliably determines how the answer opens; it does not prevent the model from wandering, adding commentary after the structure closes, or being wrong inside a perfectly-formed schema.

Priming is the prompt-side face of a mechanism that several APIs expose directly as a prefilled assistant turn. The prompt-suffix form works with any completion or chat interface; the prefill form is cleaner where available, since the primer lives in the response rather than in the user message.

## Practical Use

- **Schema entry.** End with the opening brace, the first key, an opening tag, or a table header row to force the container without a format lecture.
- **Preamble suppression.** End with the first word of the substantive answer when the model habitually opens with "Certainly! Here is…".
- **Enumeration.** End with `1.` or `-` to commit to a list shape and, in practice, to more than one item.
- **Register and stance.** End with the first clause of the intended voice when tone instructions are being ignored.
- **Reasoning shape.** A primer that opens a reasoning scaffold ("Step 1:") is a structural variant of a step-by-step trigger; it constrains the form of the trace rather than requesting one.

Compose it with an extractor rather than trusting it alone. Because the primer is text you wrote, your parser must account for whether the primer is part of the returned string (prompt-suffix form usually returns only the continuation; prefill form usually requires you to re-attach the primer) — see [Answer Engineering](/vault/answer-engineering.md).

## Limitations

- **It forecloses refusal and abstention.** A primer that opens an answer makes "I don't know" nearly unreachable. If the correct behavior on some inputs is to decline, to report insufficient evidence, or to signal a missing tool, a primer will manufacture a confident answer instead. Prime the *envelope* (`{"answer":`) rather than the *verdict* when abstention is a legitimate outcome, and leave a null or abstain value reachable inside the schema.
- **It can lock in a wrong branch.** Priming a classification with the first letter of a label, or a proof with a first step, commits the model before it has done the work.
- **It interacts badly with leading reasoning.** If the task benefits from intermediate reasoning, a primer that jumps straight to the final form removes the space for it. Prime the trace or prime the answer, not the answer when you wanted the trace.
- **Format success is not task success.** Well-formed output is easier to parse and easier to over-trust. Score correctness separately from conformance — see [Quality Versus Correctness Prompt Evaluation](/vault/quality-versus-correctness-prompt-evaluation.md).
- **Interface-dependent.** Some chat endpoints normalize trailing whitespace, reject a trailing assistant turn, or handle prefill differently across model versions. Verify on the exact deployed interface.

## Sources

- [Principled Instructions Are All You Need for Questioning LLaMA-1/2, GPT-3.5/4 dossier](/dossiers/principled-instructions-questioning-llms.md) — lists output primers as principle 20 under "Prompt Structure and Clarity" and reports paired human-evaluated gains across LLaMA-1/2 and GPT-3.5/4.
