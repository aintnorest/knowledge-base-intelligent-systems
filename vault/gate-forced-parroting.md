---
type: Synthesis
title: Gate-Forced Parroting
description: When a deterministic gate requires literal vocabulary in an output, the grain of that vocabulary dictates style — a gate fed phrase-shaped terms forces the writer model to parrot its source, and no voice or authenticity instruction can overrule a check that fails the run.
tags: [agent-harness, verification, prompting, reliability]
timestamp: 2026-08-23T00:00:00Z
---

# Gate-Forced Parroting

A pipeline that enforces quality with deterministic checks rather than trusting the model has made a trade: the gate always wins. That is the point of the design, and it is also its sharpest failure mode. If a gate requires literal strings to appear in the output, then whatever produced those strings has become the pipeline's style authority. Feed it phrase-shaped terms and the writer model must reproduce the phrases verbatim or the run fails — and every instruction telling it to write in its own voice is asking it to fail the run.

## The Pattern

1. A pipeline enforces coverage deterministically: a gate checks the rendered artifact for the presence of required terms, and the run fails if any term is missing.
2. The term list is not written by hand. An upstream model extracts it from the source document.
3. Nothing constrains the *grain* of an extracted term. The upstream model, reading a document written in phrases, emits phrases — a multi-word span lifted whole out of the source.
4. The gate does exactly what it says: it looks for the literal span in the rendered text and fails anything without it.
5. The writer model, downstream, is instructed to cover the source's concepts in the subject's own words and never echo the source's phrasing. It is also required to pass the gate. The requirements are in direct conflict, and the gate is the one with teeth.
6. The artifact ships carrying verbatim source phrasing. External readers describe the output as optimized against the source rather than authored — the precise defect the voice instructions were written to prevent.
7. Debugging starts at the writer prompt, because that is where the style rules live, and finds nothing wrong with them.

## Why It Happens

In a harness-over-prompt architecture, deterministic checks are strictly stronger than prompt instructions. A prompt expresses a preference the model weighs against everything else in its context; a gate expresses a condition the artifact either satisfies or does not. When they disagree, the model's only compliant behavior is the one the gate permits. Adding emphasis to the prompt cannot change this, and the usual escalations — stronger wording, a fatal-invariant marker, a worked counterexample — all spend effort on the side of the conflict that cannot win.

The grain problem is upstream and invisible from the writer's position. A checker that asks "does this string appear" is agnostic about what kind of string it is given, and an extraction model asked for "terms" with no grain constraint will return whatever units the source presents. Short atomic vocabulary — a technology name, a domain noun, a proper name — is a coverage obligation that any sentence can satisfy in a dozen phrasings. A seven-word phrase is a coverage obligation with exactly one satisfying string. The gate is the same gate; the freedom it leaves the writer collapses to zero as the grain grows.

The failure is also hard to attribute because it presents as a style problem. The visible symptom is prose that reads as over-optimized, and prose is the writer's output, so the writer's prompt looks like the defect site. The actual constraint is two calls upstream, in a field whose schema description never said how long a term may be.

## How To Work With It

- Constrain the grain at the vocabulary source, not the consumer. Terms a deterministic gate will require verbatim should be short and atomic: technology names, domain nouns, role nouns, proper names, roughly one to three words, in the source's own spelling.
- Route phrase-shaped concepts down a different channel. A concept whose surface form is a phrase becomes either its atomic core noun in the required-term list, or a coverage obligation the writer satisfies in its own words with no literal-match check attached.
- Protect style properties at the gate's input, never by asking the model for them. Any property a gate can contradict is not really governed by the prompt, and writing it into the prompt anyway creates an instruction the model must violate.
- State the grain rule in every home that can drift, including the output schema's field description. A grain constraint that lives in prose but not in the schema will be honored until the day the schema is the last thing the model reads.
- When output reads as over-optimized against its source, audit what the gates literally require before touching the writer prompt. Read the actual required-term list from a real run. Phrase-shaped entries are the diagnosis; nothing in the prompt will explain them.
- Treat any deterministic check for literal strings as a style decision. Whoever chose the strings chose the voice.

## Evidence

First-party, GSL resume pipeline, the V3b unit (`gsl` repo, `docs/resume-prompt-decisions.md`, the 2026-08-19 V3b entry).

The pipeline renders a tailored resume as a PDF and enforces posting coverage deterministically: `infra:resume_extract_check` and `infra:resume_lint` require every entry in the run's `terms` list to appear verbatim in the rendered text. The `terms` list is emitted by an upstream model call that reads the job posting, and nothing constrained how long a term could be. One run's list contained the span `cross-team, platform-level engineering initiatives`, lifted whole from the posting. The gate then failed any document that did not contain that phrase verbatim, so the writer had no compliant output that did not parrot the posting — and the writer's own prompt carried an explicit own-words rule forbidding more than about three consecutive words copied from the posting.

Two independent external reviewers, comparing the pipeline's output against the owner's hand-built resume, split their verdicts: the pipeline won on evidence integrity and targeting, and lost on craft and authenticity, with the output reading as optimized against the posting rather than authored. The owner's criterion named authenticity as its own axis, verbatim: *especially sensitive to wanting to sound authentic and not like AI overstuffing*.

The fix was made at the vocabulary source rather than in the writer prompt. `terms` is now short atomic vocabulary — technology names, domain nouns, role nouns, proper names, one to three words, the posting's own spelling — and a posting concept whose surface form is a phrase either reduces to its atomic core nouns or leaves `terms` entirely and travels as a signal or a coverage obligation for the writer to express in the candidate's own words. The same grain rule was written into the output schema's `terms` description, so it cannot go stale in one home. Prompt-side authenticity rules shipped in the same unit (one accomplishment per bullet, own-words phrasing, tense discipline), but they are downstream of the gate and were not what unblocked the defect; a later round extended own-words to cover near-verbatim idiom echoes that survived the three-consecutive-words test.

## Limitations

- One pipeline, one gate, one incident. The mechanism — a literal-match gate makes its input vocabulary the style authority — generalizes cleanly, but the evidence for it is a single well-diagnosed case.
- The reviewer verdict is qualitative and from two reviewers on one document. It establishes that the output read as over-optimized, not how much of that impression the phrase requirement accounted for; other craft defects were fixed in the same unit, so the improvement is not attributable to the grain change alone.
- The atomic-grain rule trades a failure mode for a weaker one: a phrase reduced to its core nouns is a looser coverage check, and a concept that leaves the term list entirely is only covered if the writer chooses to cover it. What was a hard guarantee enforcing the wrong thing becomes a soft obligation enforcing the right one.
- One to three words is a heuristic fitted to this domain's vocabulary, not a derived boundary.

## Related

- [[answer-engineering]] — designing the shape of a model's output so downstream consumers can rely on it; this is the case where the downstream consumer's requirement propagates backwards and dictates the output's voice.
- [[model-aware-harness-design]] — the harness-over-prompt posture that makes gates authoritative; a gate whose input grain is wrong is that posture's characteristic failure.
- [[structured-agent-communication-contracts]] — the inter-call contract is where the grain rule belongs, including in the schema's field descriptions, because a term list is a handoff and its units are part of the contract.
