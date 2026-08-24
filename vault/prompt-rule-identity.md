---
type: Synthesis
title: Prompt Rule Identity
description: A prompt rule's identity is its wording plus its placement plus operational semantics that examples and shared assumptions were carrying unstated — so a restructure that preserves every sentence verbatim can still break the rule, and fixtures are what expose the missing part.
tags: [prompting, context-engineering, evaluation, verification, reliability]
timestamp: 2026-08-23T00:00:00Z
---

# Prompt Rule Identity

A conservation ledger for a prompt rewrite usually inventories rule *text*: every normative statement, carried or moved or dropped with a reason. That is the right instrument and it is incomplete. A rule's identity has three parts, and only the first is what the ledger counts.

**Its wording** — what the ledger inventories. **Its placement** — genuinely non-textual, a property of the document rather than the sentence, and invisible to any diff of statements. **Its operational semantics** — how precisely it matches, which direction it cuts — which *could* have been written down and were not, because worked examples and a shared understanding of the job were carrying them. The second is a loss the ledger structurally cannot see. The third is underspecification the ledger had no reason to flag, because there was nothing missing from the text that had ever been in the text.

Restructure the prompt and both go. Preserve every sentence, move one to a new slot, strip the examples that were quietly defining its terms, and the rule that survives is not the rule you had.

## The Pattern

1. A working prompt is restructured — reorganized into a clean section skeleton, deduplicated to one normative home per topic, with every rule's text carried forward verbatim under an itemized ledger.
2. The prompt diff looks conservative. No rule was dropped. Every statement is accounted for. The text-conservation audit passes.
3. Behavioral requalification fails anyway, on fixtures that had been passing, in ways the diff does not explain.
4. Each failure isolates to a part of the rule that its wording did not carry:
   - **Position (non-textual).** A doctrine that had opened the prompt — and said so in as many words: *say this plainly, first, because it is the one rule this audit exists to enforce correctly* — was preserved verbatim but demoted below the role, goal, success-criteria, and constraints blocks. Its guard fixture began failing. Restoring first position, under its own heading, before the goal, fixed it.
   - **Match precision (underspecified).** A detection rule against copying the prompt's own worked examples never said *how* to compare. Applied by resemblance, it false-accused an honest fixture persona who legitimately worked in the same domain as an example. Narrowing it with a domain-word carve-out then let a genuinely copied category label through. The rule had always meant something exact; nothing in it had ever said so.
   - **Direction (underspecified).** A rule against *overclaiming* had never stated which way an overclaim runs. The auditor blocker-flagged a sentence that reached beyond the evidence while *understating* the subject, and scored the same sentence twice under two rules at two severities. The word had a sign to anyone who knew the job, and the prompt had been relying on that.
5. The repairs are rules in their own right, not fixture accommodations. Each names a real property of the job the original prompt had been carrying implicitly.

## Why It Happens

A prompt is read positionally, not as a set. Opening and closing positions carry weight that middle-of-document positions do not, so a rule's rank in the document is a real part of its instruction strength. When the original author wrote "say this first," the placement *was* the emphasis; a restructure that honors the sentence and discards the slot has performed a silent demotion that no textual diff will show. This is the part that cannot be fixed by writing more words in the rule — the rule already contained the word "first."

The other two failures are the opposite shape, and it is worth not conflating them. Nothing about "detect copying from the examples" is inherently unstatable; the prompt simply never stated the comparison semantics, because a table of worked examples sitting beside the rule had been doing that work by demonstration. Strip the examples into their own section and the rule loses a definition it never appeared to have. Likewise *overclaim* obviously means overclaim in one direction to a human who knows the job. Restated cleanly and separated from the examples that had always shown the asymmetric case, the word keeps its meaning and loses its sign — and the model applies it to any unestablished assertion, including ones that hurt the subject.

Underneath all three: an itemized ledger is a defense against silent loss of *content*, and these were losses of *encoding*. The ledger did its job and still let them through, because nobody had written down that the doctrine's slot was load-bearing, or that the detector's exactness and the judgment's sign were being carried by something other than their own sentences.

## How To Work With It

- Extend the conservation ledger past rule text. For each rule, record what else it depends on: **position** for doctrine-class rules (the one thing the job exists to get right), **match semantics** for detection-class rules (exact, whole-string, against a named table — and against what evidence), **direction** for judgment-class rules (which way the defect cuts, and what the opposite-direction case is instead).
- Treat a rule's worked examples as part of its definition, and inventory what they were defining before moving them. If a rule's examples are being relocated to an examples block, ask what the rule now fails to say without them, and say it.
- When a rule's own wording contains its emphasis — "first", "before anything else", "this is the rule that matters" — treat that as a placement constraint the restructure must satisfy, and then delete the self-referential phrasing only once the placement actually holds.
- Where a detection rule's target has a literal surface form, prefer a mechanical predicate to a similarity judgment. Copied strings, required vocabulary, and forbidden tokens are all cases where an exact test is available and a judgment is not needed. This does not generalize to detection whose target has no canonical surface — tone, unsupported inference, an argument that does not follow — where a judgment is the only instrument and the work goes into calibrating it against fixtures instead of replacing it.
- Where a defect name encodes an asymmetry — overclaim, exaggeration, omission, inflation — state the direction and name the opposite-sign case, with its own and usually lesser severity. Not every defect name has a sign; the ones that do will be applied in both directions if the prompt does not say which one it means, and a defect that can be scored twice under two rules will be.
- Make zero-repair requalification the acceptance test for a restructure. If a rewrite that changed no rule requires fixtures to be edited to pass, the fixtures were pinning something the rewrite broke. Repairing them converts a discovered regression into a lost one.
- Expect the exposed dimensions to become permanent rules. Each of these was recorded as a real property of the job, stated positively and alone in the prompt, with its history kept in an external decisions record rather than as a superseded-rule construction inside the prompt.

## Evidence

First-party, GSL resume pipeline, the V2y restructure (`gsl` repo, `docs/resume-prompt-decisions.md`, the two 2026-08-18 V2y entries — the six restructuring rulings, and "Three check-calibration rules found during requalification").

The prompt at the centre of this is the pipeline's **auditor**: a cross-family model call that receives a drafted resume together with the **evidence packet** — the candidate's profile, accomplishments and skills, plus the owner's answers at a gap-clarification gate — and returns a per-claim audit with findings. Findings carry a severity, of which **`blocker`** is the top: reserved for a claim that reaches beyond what the packet supports, and enough to fail the draft. The **doctrine** referred to below is the auditor's founding rule: a fact the owner confirmed at that gate is full-strength evidence, never a fabrication to flag. The auditor exists because an earlier reviewer, which never received those answers, audited user-confirmed facts as fabrications.

Four production prompts were rewritten under six owner rulings — one normative home per topic, no provenance or decision dates inside a prompt, no unresolvable external references — going from 2,410 to 1,935 lines while carrying every normative statement through an itemized conservation ledger. On the auditor, the text-conservation audit passed and behavioral requalification failed: the rewrite produced spurious `blocker` findings on drafts that should carry none. Requalification against four fixtures isolated three distinct causes, each now a rule in the prompt and each something the ledger had not been recording:

- **Position was load-bearing.** The user-confirmed-evidence doctrine, preserved verbatim but moved below four blocks, broke the severed-context regression fixture. Restored to first position under its own heading; the decisions record states the finding plainly: *a rule's placement can be part of the rule*.
- **Detection needed its match semantics written down.** The auditor's own Check 1 example table uses fleet, vehicle, and routing vocabulary, and one eval persona legitimately works in that field. Resemblance-based leakage detection flagged the honest draft; a domain-word carve-out then let a copied category label through. The shipped rule compares whole distinctive strings literally against the example table *and* requires the string to be absent from the evidence packet, and says outright that shared vocabulary is not leakage. The usual mitigation — make examples share no surface with any fixture persona — was unavailable, because one fixture deliberately pins the example labels as leakage bait.
- **The judgment needed a sign.** `overclaimed` now means the wording reaches beyond the evidence *in the candidate's favour*. A sentence bounding or diminishing the candidate's own work asserts something the packet never established but understates rather than overstates; it is a positioning defect scored `material`, never a blocker. Without the direction, the auditor scored one self-diminishing sentence twice, once as misplacement and once as fabrication.

A corroboration rule and a final severity sweep were added alongside, binding a blocker to a row the auditor's own claim audit marks unsupported or overclaimed — a blocker sitting beside an audit that says every claim is supported is a contradiction in the auditor's own output.

The restructure's overall result is the counterweight: across all four prompts it requalified 20/20 fixtures with zero fixture repairs. The three failures above were not a repair budget; they are the three hidden dimensions this suite exposed, and the fixtures found all three.

## Limitations

- Three findings from one restructure of one prompt family. Position, match semantics, and direction are the dimensions this incident happened to expose. The general claim is that rules carry load outside their own sentences, not that these three are the complete list — a suite that never probed a dimension cannot report it missing.
- The position finding is a single fixture on a single model family, with no ablation across the intermediate placements. That the doctrine works first and fails fifth is observed; how much of the effect is ordinal rank versus proximity to the goal block is not.
- Exact whole-string matching is the predicate that was tested and held on two fixtures. It is not established as the only stable formulation — no other mechanical predicate was tried — and it is mechanically stable rather than semantically complete: a paraphrased copy of an example still passes it. It is accepted here because the specific failure was a copied literal string.
- Whether the match-semantics and direction failures are properly "underspecification the examples were covering" or simply rules that had never been fully written is a reading of the incident, not a measurement. What is documented is that both worked in the pre-restructure prompt and broke in the restructured one without their sentences changing.
- The zero-repair standard is affordable only where fixtures are cheap to run and were built to pin behavior rather than wording. A suite pinning model prose byte-for-byte would fail this test for uninteresting reasons.

## Related

- [[context-collapse]] — the failure the conservation ledger defends against; this page is the residue that survives the defense, where the loss is a rule's encoding rather than its content.
- [[recency-checklist-deliberation-explosion]] — the other half of position as a load-bearing property: the closing slot raises compliance, including with instructions that are expensive to obey literally.
- [[two-layer-schema-governance]] — where a per-field rule's home should be, and why a schema description is a place a rule's semantics can be stated at its point of application rather than left to examples.
- [[incremental-delta-context-updates]] — the general prescription (patch, do not rewrite); the ledger is what makes a full restructure behave like a delta, and these three findings are what it still misses.
- [[anti-leakage-system-prompt]] — leakage as a prompt-level concern; here the leak runs the other way, out of the prompt's own examples, and detecting it needs a mechanical test rather than a judgment.
