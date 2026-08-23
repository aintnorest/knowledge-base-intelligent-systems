---
type: Synthesis
title: Prompt Rule Identity
description: A prompt rule's identity includes properties its text does not carry — where it sits, how precisely it matches, and which direction it cuts — so a restructure that preserves wording verbatim can still break the rule, and fixtures are what expose the missing dimension.
tags: [prompting, context-engineering, evaluation, verification, reliability]
timestamp: 2026-08-23T00:00:00Z
---

# Prompt Rule Identity

A conservation ledger for a prompt rewrite usually inventories rule *text*: every normative statement, carried or moved or dropped with a reason. That is the right instrument and it is incomplete, because some rules carry load in properties the text does not record. A doctrine can depend on standing first. A detection rule can depend on matching exactly rather than judging similarity. A judgment rule can depend on a direction its wording never states. Preserve the sentence, move the sentence, and the rule is gone.

## The Pattern

1. A working prompt is restructured — reorganized into a clean section skeleton, deduplicated to one normative home per topic, with every rule's text carried forward verbatim under an itemized ledger.
2. The prompt diff looks conservative. No rule was dropped. Every statement is accounted for.
3. Requalification fails anyway, on fixtures that had been passing, in ways the diff does not explain.
4. Each failure isolates to a property of the rule that lived outside its wording:
   - **Position.** A doctrine that had opened the prompt — and said so in as many words: *say this plainly, first, because it is the one rule this audit exists to enforce correctly* — was preserved verbatim but demoted below the role, goal, success-criteria, and constraints blocks. Its guard fixture began failing. Restoring first position, under its own heading, before the goal, fixed it.
   - **Match precision.** A detection rule against copying the prompt's own worked examples was applied by resemblance, and false-accused an honest fixture persona who legitimately worked in the same domain as an example. Narrowing it with a domain-word carve-out then let a genuinely copied category label through. Only exact whole-string comparison held both fixtures — shared vocabulary is not leakage; a copied string is.
   - **Direction.** A rule against *overclaiming* had never stated which way an overclaim runs. The auditor blocker-flagged a sentence that reached beyond the evidence while *understating* the subject, and scored the same sentence twice under two rules at two severities. The fix was to define overclaim as reaching beyond evidence **in the subject's favor**, making self-diminishing statements a separate and lesser defect class.
5. The repairs are rules in their own right, not fixture accommodations. Each names a real property of the job that the original prompt had been carrying implicitly.

## Why It Happens

A prompt is read positionally, not as a set. Opening and closing positions carry weight that middle-of-document positions do not, so a rule's rank in the document is a real part of its instruction strength. When the original author wrote "say this first," the placement *was* the emphasis; a restructure that honors the sentence and discards the slot has performed a silent demotion that no textual diff will show.

Detection rules fail differently. Asking a model to judge whether something "resembles" or "was copied from" an example invites a similarity judgment, and similarity has no threshold the model and the fixture author agree on. The two ways to tighten it — judge harder, or carve out the confusing category — trade false positives for false negatives against each other. A mechanical predicate (exact whole-string match against a named table) is the only formulation that is stable in both directions, because it stops asking for a judgment at all.

Judgment rules fail on direction because the natural language of a defect often encodes an asymmetry the writer never had to say. *Overclaim* obviously means overclaim in one direction to a human who knows the job. Restated cleanly and stripped of its worked examples, the word keeps its meaning and loses its sign — and the model applies it to any unestablished assertion, including ones that hurt the subject.

Underneath all three: an itemized ledger is a defense against silent loss of *content*, and these were losses of *encoding*. The ledger did its job and still let them through, because nobody had written down that the doctrine's slot, the detector's mechanicalness, and the judgment's sign were load-bearing.

## How To Work With It

- Extend the conservation ledger past rule text. For each rule, record the dimension it depends on: **position** for doctrine-class rules (the one thing the job exists to get right), **match semantics** for detection-class rules (exact, whole-string, against a named table), **direction** for judgment-class rules (which way the defect cuts, and what the opposite-direction case is instead).
- When a rule's own wording contains its emphasis — "first", "before anything else", "this is the rule that matters" — treat that as a placement constraint the restructure must satisfy, and then delete the self-referential phrasing only once the placement actually holds.
- Prefer mechanical predicates to similarity judgments in any rule whose job is detection. If the rule needs an exception to avoid false accusations, that is a signal the predicate is judgment-shaped and should be replaced, not carved out.
- Give every defect name a direction and a sibling. Define what the defect is *not* — the opposite-sign case — and assign that case its own, usually lesser, severity. A defect that can be scored twice under two rules will be.
- Make zero-repair requalification the acceptance test for a restructure. If a rewrite that changed no rule requires fixtures to be edited to pass, the fixtures were pinning something the rewrite broke. Repairing them converts a discovered regression into a lost one.
- Expect the exposed dimensions to become permanent rules. Each of these was recorded as a real property of the job, stated positively and alone in the prompt, with its history kept in an external decisions record rather than as a superseded-rule construction inside the prompt.

## Evidence

First-party, GSL resume pipeline, the V2y restructure (`gsl` repo, `docs/resume-prompt-decisions.md`, the two 2026-08-18 V2y entries — the six restructuring rulings, and "Three check-calibration rules found during requalification").

Four production prompts were rewritten under six owner rulings — one normative home per topic, no provenance or decision dates inside a prompt, no unresolvable external references — going from 2,410 to 1,935 lines while carrying every normative statement through an itemized conservation ledger. The rewrite of the cross-family auditor requalified cleanly on content but produced spurious blocker findings on drafts that should carry none. Requalification against four fixtures isolated three distinct causes, each now a rule in the prompt and each a dimension the ledger had not been recording:

- **Position was load-bearing.** The user-confirmed-evidence doctrine, preserved verbatim but moved below four blocks, broke the severed-context regression fixture. Restored to first position under its own heading; the decisions record states the finding plainly: *a rule's placement can be part of the rule*.
- **Detection needed mechanical precision.** The auditor's own Check 1 example table uses fleet, vehicle, and routing vocabulary, and one eval persona legitimately works in that field. Resemblance-based leakage detection flagged the honest draft; a domain-word carve-out then let a copied category label through. The shipped rule compares whole distinctive strings literally against the example table and the evidence packet, and says outright that shared vocabulary is not leakage. The usual mitigation — make examples share no surface with any fixture persona — was unavailable, because one fixture deliberately pins the example labels as leakage bait.
- **The judgment needed a sign.** `overclaimed` now means the wording reaches beyond the evidence *in the candidate's favour*. A sentence bounding or diminishing the candidate's own work asserts something the packet never established but understates rather than overstates; it is a positioning defect scored `material`, never a blocker. Without the direction, the auditor scored one self-diminishing sentence twice, once as misplacement and once as fabrication.

A corroboration rule and a final severity sweep were added alongside, binding a blocker to a row the auditor's own claim audit marks unsupported or overclaimed — a blocker sitting beside an audit that says every claim is supported is a contradiction in the auditor's own output.

The restructure's overall result is the counterweight: across all four prompts it requalified 20/20 fixtures with zero fixture repairs. The three failures above were not a repair budget; they were the only three places where a hidden dimension existed, and the fixtures found all three.

## Limitations

- Three findings from one restructure of one prompt family. Position, match semantics, and direction are the dimensions this incident happened to expose; the general claim is that rules have non-textual properties, not that these are the complete list.
- The position finding is a single fixture on a single model family, with no ablation across the intermediate placements. That the doctrine works first and fails fifth is observed; how much of the effect is ordinal rank versus proximity to the goal block is not.
- Exact whole-string matching held two fixtures. It is mechanically stable, not semantically complete — a paraphrased copy of an example still passes it, and the rule is accepted here because the specific failure was a copied literal string.
- The zero-repair standard is affordable only where fixtures are cheap to run and were built to pin behavior rather than wording. A suite pinning model prose byte-for-byte would fail this test for uninteresting reasons.

## Related

- [[context-collapse]] — the failure the conservation ledger defends against; this page is the residue that survives the defense, where the loss is a rule's encoding rather than its content.
- [[recency-checklist-deliberation-explosion]] — the other half of position as a load-bearing property: the closing slot amplifies compliance, including with instructions that are ruinous to obey literally.
- [[incremental-delta-context-updates]] — the general prescription (patch, do not rewrite); the ledger is what makes a full restructure behave like a delta, and these three findings are what it still misses.
- [[anti-leakage-system-prompt]] — leakage as a prompt-level concern; here the leak runs the other way, out of the prompt's own examples and into the output, and detecting it needs a mechanical test rather than a judgment.
