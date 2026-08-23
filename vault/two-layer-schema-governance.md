---
type: Synthesis
title: Two-Layer Schema Governance
description: A structured-output schema is two artifacts in one file — `description` fields are prompt text sitting closer to constrained generation than anything else in the request, while names, types, enums and required-ness are a frozen contract with downstream consumers — and the two layers need opposite editing rules.
tags: [prompting, context-engineering, agent-harness, orchestration, reliability]
timestamp: 2026-08-23T00:00:00Z
---

# Two-Layer Schema Governance

A JSON Schema attached to a model call looks like one thing: a specification. It is two. The field names, types, enums, and required-ness are an API contract that downstream code reads. The `description` strings beside them are prose that only the model reads — positioned closer to the constrained generation than any other text in the request. Editing a description is prompt engineering. Editing the shape around it is a breaking change. The file does not distinguish them, so the reviewer has to.

## The Pattern

1. A pipeline call declares a structured output schema. It ships in one file, versioned as one unit, reviewed as one diff.
2. **Layer 1 — the descriptions.** Every `description` is instruction text the model reads while generating the field it annotates. Both major vendors' documentation for tool input schemas and structured outputs says so explicitly and recommends steering behavior through them: describe not just what a field is but what belongs in it and when.
3. **Layer 2 — the shape.** Field names, types, enums, and required-ness are a contract. In a multi-call pipeline the consumers are concrete: workflow wiring that routes one call's output into the next call's input, fold or merge steps that key on field names, and fixtures that assert on them.
4. Because the two layers share a file, one review governs both. The result is a choice between two wrong defaults: freeze the whole file, and the highest-leverage instruction channel in the request goes unused while per-field rules are restated in prose sections that drift; or edit the whole file freely, and a wording fix renames a field and breaks a consumer two calls downstream.
5. The split, stated once, is mechanical. Descriptions are freely editable and are the natural single home for per-field format rules. The shape never changes to accommodate a prompt edit.
6. The split is also checkable. A restructure that claims to have touched only descriptions can prove it: strip every `description` from both versions and diff. Byte-identical is the pass.

## Why It Happens

Position is the whole argument for layer 1. A prompt is read positionally, and a field's description is the last thing the model reads before it is forced to emit that field — the decoder is inside a constrained region and the description is the nearest instruction to it. That makes it the cheapest place to put a rule about the field's format, and the one place a rule about the field cannot drift away from the field. A grain rule, a severity definition, or a row-shape invariant restated in a prose section two screens above the schema has two homes; one of them goes stale on the next edit.

Layer 2 fails for the opposite reason: nothing reads it positionally at all. A field name is a key, and keys are matched exactly by code that has no way to guess at intent. Renaming `terms` or making a previously-optional field required is a change to every consumer that touches it, and the consumers are not in the file being edited. This is why "fix the wording by adjusting the shape" is the characteristic error — it is invisible in the diff under review and loud everywhere else.

The proximity that makes layer 1 powerful is also what makes it dangerous in one specific direction. An instruction executed literally costs whatever it costs, and some instructions cost more the more thinking budget the model has. A required field is not a suggestion the model weighs — it must be produced on every call, and it is produced with the description sitting right beside it. That combination is fine for a format rule and ruinous for anything whose honest execution is an audit loop.

## How To Work With It

- Read every `description` as prompt text. It belongs in the prompt's conservation ledger, it counts against the emphasis budget, and a change to it requires the same requalification a change to the prompt body does.
- Put a per-field format rule in that field's description, and treat the schema as the rule's home rather than a restatement of it. Where a rule genuinely needs a second home in the prompt body, state it identically in both and treat any divergence as a defect — this is the one place where the one-normative-home discipline is worth relaxing, because the schema description *is* the point of application.
- Freeze the shape against prompt problems. A wording defect is never fixed by adding, renaming, or removing a field. If the fix appears to require one, either the wording is wrong or the contract genuinely changed — and a contract change is a separate unit with its consumers, wiring, and fixtures in scope.
- Make the description-only claim provable. Programmatic description-stripping plus a byte diff turns "this restructure was cosmetic at the interface" from an assertion into a check.
- Keep out of the schema anything whose execution cost scales with the reasoning budget: self-reported counts, per-item verification tallies, "number of X you checked" fields. A required field forces the work to be done every call, and proximity makes it done literally. Deterministic gates downstream can re-measure for free.
- Audit the channel in both directions when a prompt reads as under-specified: rules that should be in a description are often sitting in prose, and rules that should not be in the schema at all are sometimes sitting in a required field.

## Evidence

First-party, GSL resume pipeline (`gsl` repo, `docs/resume-prompt-decisions.md`, the V2y, V2z, V3b and V3c entries, plus the standing conventions section; schemas at `parts/bundles/*/output.schema.json`).

The convention is recorded as a standing rule rather than a dated ruling: *schema `description` fields are a steering channel* — per-field format rules, severity definitions, row-shape invariants, and the empty-result mitigation live in `output.schema.json` descriptions rather than being restated in prose — while *the schema's shape — field names, types, required-ness, enums — is a frozen contract and is never changed to accommodate a prompt edit*. Four observations from the units that produced it:

- **The V2y restructure moved rules into layer 1 without touching layer 2.** Ledger-row semantics, the cross-family auditor's severity definitions (`blocker` / `material` / `minor`, each defined in the enum's own description), and coverage invariants ("exactly one row per entry in the input `terms` list, in the same order — never more, never fewer") were relocated out of prose and into descriptions. The unit verified the split programmatically: stripping every `description` from the before and after schemas left them byte-identical, so the interface every downstream consumer reads had not moved.
- **V3b dual-homed a rule deliberately, to stop it going stale in one home.** The `terms` grain rule — short atomic vocabulary, one to three words, the posting's own spelling, never a lifted phrase — is stated in `resume_prepare`'s prompt *and* in the `terms` field description, which also carries the reason: *a downstream string-match check requires each entry literally in the finished draft, so a phrase-shaped entry forces the resume to parrot the posting.* See [[gate-forced-parroting]] for what happened when that rule did not exist.
- **V3c moved a live rule in and a stale rule out.** The author's `doc` description now carries the whole document skeleton — headline plus summary at ~65 words, Skills 5×6, anchor role 7 bullets, and so on down to the per-bullet 25-35 word range — and the superseded word-count band was deleted from it. The decisions record states the reason for the placement directly: *the schema description channel is the last text before constrained generation.*
- **The prevention rule cuts the other way.** V2z's DO-NOT-ADOPT list, still in force, forbids self-reported counts in schemas alongside inline length markers, "verify the band before finishing", and any "count" near an imperative. The mechanism is that a required field forces the count to be produced on every call. This rule is preventive, derived from the commissioned length-targeting research after the deliberation explosion — not a post-mortem of it. The explosion itself was caused by prompt-body and closing-block counting instructions at the recency position; see [[recency-checklist-deliberation-explosion]]. No schema field has detonated in this pipeline, because none was ever allowed to hold a count.

## Limitations

- One pipeline, four schemas, one family of document-writing and auditing jobs. The governance split generalizes cleanly; the evidence for it is a single well-instrumented codebase.
- That descriptions are a steering channel is vendor-documented and consistent with observed compliance here. That they are the *highest-leverage* channel by position is an argument from placement, not a measurement: no unit in this project moved one rule from prose to description with everything else held constant and measured the delta.
- Per-family prompt conventions in this project differ in section wrapping — XML-tagged sections for one model family, a markdown skeleton for the other — but not in whether descriptions steer. Nothing here supports treating the channel itself as family-dependent.
- The byte-identical check proves the shape did not move. It says nothing about whether the relocated descriptions are correct; requalification against fixtures is what established that, and it found three defects the diff did not explain ([[prompt-rule-identity]]).
- "Freely editable" is relative to the shape only. A description edit is still a prompt edit: it changes behavior, it can regress fixtures, and it is not exempt from requalification.

## Related

- [[structured-agent-communication-contracts]] — the shape as inter-call contract; this page adds that the same file also carries a prompt, and that the two halves need opposite editing rules.
- [[effort-conditioned-prompt-qualification]] — why the proximity of the channel is a hazard as well as an asset: an instruction whose cost scales with the thinking budget is worst where compliance is strongest.
- [[gate-forced-parroting]] — the grain rule this page cites as a dual-home case, and the failure that made a schema description the right second home for it.
- [[answer-engineering]] — shaping a model's output for downstream consumption; the schema is where that shaping is written, and this page is the split between its two halves.
