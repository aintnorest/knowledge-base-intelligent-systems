---
type: Synthesis
title: Dual-Surface Example Contamination
description: A worked example in a prompt serves two roles at once — a demonstration the model may copy, and, where a checker is keyed to it, the denylist defining what "copied" means — and the two roles pull example design in opposite directions, so the resolution is mechanical detection semantics rather than better example prose.
tags: [prompting, in-context-learning, evaluation, verification, reliability]
timestamp: 2026-08-23T00:00:00Z
---

# Dual-Surface Example Contamination

A worked example in a prompt is a template, and the model that reads it may copy it — in structure, and sometimes in content. That is the familiar surface, and every standard defense targets it. The second surface appears once some checker in the same pipeline is asked to catch example-copying: the examples it is keyed to stop being only a demonstration and become the reference set that defines what "copied" means. One artifact is now doing two jobs, and the property that makes it good at the first — being distinctive enough to be memorable — makes it worse at the second wherever detection works by resemblance.

The two roles do not have to sit in the same prompt, and tracing which prompt holds which role is the first thing to get right. Getting it wrong produces a data-flow story the wiring does not support.

## The Pattern

1. A prompt carries worked examples, because examples are the strongest signal in a prompt.
2. Defenses are applied to the copying surface: wrap the examples in a tagged block, use obviously synthetic personas, add a never-carry-anything-out-of-here banner, prefer contrastive minimal pairs over full artifacts a model can lift wholesale.
3. Somewhere in the same pipeline, a checker's job includes catching example leakage — content in the finished artifact that came from instructions rather than from evidence. Its reference set is a named example table, usually its own.
4. A real subject legitimately works in the example's domain and uses the same ordinary domain words. Nothing was copied. A checker judging by resemblance reads it as plagiarism.
5. Tightening in either direction trades one error class for the other — the general property of judgment-shaped detection rules, covered in [[prompt-rule-identity]]. The fix is a mechanical predicate rather than a better-calibrated judgment.
6. The design pressures on the example now conflict. A vivid, specific, memorable example suppresses vague imitation where the example is read as a demonstration, and simultaneously widens the resemblance shadow a resemblance-based auditor casts over every honest subject in that domain.
7. The obvious hygiene rule — pick examples that share no surface with any real or fixture subject — may not be available, because a suite that tests leakage detection needs a fixture in which the collision actually exists.

## Where The Contamination Can Actually Travel

Naming the routes matters more than the metaphor, because a checker's examples reach the artifact by a different path than a writer's examples, and one of the two paths is easy to assert and hard to find.

**Route one: a drafting prompt's own examples reach its own output.** This is direct and needs no wiring argument. The examples sit in the same request as the generation they inform.

**Route two: a checker's examples reach the artifact downstream, through the findings the checker emits.** A checker that detects leakage has to quote what it found; a finding therefore legitimately carries the example string it matched. Where a pipeline feeds findings into a revision call, the checker's vocabulary is now inside the reviser's input. If the reviser is instructed to apply recommended wording as given — a reasonable rule, usually adopted after a reviser paraphrased a good recommendation into a worse one — then the space in which the reviser would have caught an ungrounded string has narrowed by exactly the amount that rule widened compliance.

**The route that does not exist unless the wiring puts it there: a checker's examples reaching a draft written before the checker ran.** A drafting model cannot copy from a prompt it is never shown. If the two prompts are separate files sent on separate calls, distinctive strings unique to the checker's table have no upstream path into the first draft at all, and a page claiming otherwise is describing a pipeline it has not traced. What the two prompts genuinely may share is *domain vocabulary*, when both sets of examples were written in the same synthetic world — and shared domain vocabulary is the honest-overlap case, not the leak.

Route two is a wiring fact, checkable by reading the workflow. Whether it has ever fired is a separate question, and usually the answer is that it has not.

## Why It Happens

An example is a demonstration and, where a checker is keyed to it, a denylist — and those two roles want opposite things. As a demonstration it should be concrete and specific enough that a model reads a pattern off it. As a denylist it should be narrow, so its entries are unlikely to appear in honest output for any other reason. Distinctiveness serves the first and undermines the second, though only against detection that works by resemblance: an exact whole-string test is indifferent to how vivid the string is, which is most of the argument for using one.

The auditor's position makes resemblance the tempting predicate. It sees a finished artifact and did not watch it being written, so the *causal origin* of a phrase — whether it arrived from the evidence or from the instructions — is not directly observable to it. What is observable is *grounding*: the auditor holds the evidence packet, so it can check whether the string appears there. That is a different question from origin and a decidable one, which is why the workable predicate is a conjunction — an exact match against the named table **and** absence from the evidence — rather than an inference about where a phrase came from.

And the test suite pushes back on the obvious mitigation. A fixture that pins leakage detection has to contain leaked content, which means the leaked strings must be real strings from the real example table. Once a fixture depends on the collision, the example text is no longer free to move, and the exactness has to live in the rule instead.

## How To Work With It

- Before writing the data-flow story, read the wiring. Establish which prompts a drafting model actually sees, and by what route any other prompt's text could reach the artifact. A leak needs a path, and "same pipeline" is not a path.
- When adding a worked example, enumerate both roles. Ask what a model reading it might copy, and separately ask what any checker keyed to it will start flagging in honest work.
- Make leakage detection mechanical, and state the whole predicate: an exact, whole-string match against a named table **and** absence from the evidence packet. Either half alone is the wrong rule — the match alone convicts honest domain overlap, the absence alone convicts anything the packet failed to mention. This is the general finding in [[prompt-rule-identity]] applied to this rule.
- Keep the example set and the detection reference the same named list, and say so in the rule. Where the predicate is exact-string, adding an example is not enough: its new distinctive strings have to be registered in the reference list, or the detector simply does not cover them.
- Reuse one synthetic domain across a prompt's examples rather than inventing a fresh persona per example. A new example in an already-established synthetic world inherits the existing never-carry banner, and it keeps any resemblance shadow concentrated in one predictable region instead of spreading it across the vocabulary. Note what this does *not* buy: an exact-match denylist gains nothing from domain reuse, because it keys on strings, not domains.
- Do not try to solve the auditor's problem in the example text. If a false accusation is fixable by rewording an example, the detection rule is still judgment-shaped and will fail on the next collision.
- Hold both fixtures. One that pins a genuine copy — deliberate bait, with the collision the hygiene rule would have forbidden — and one where a subject honestly overlaps the example's domain. A suite with only one of the two silently accepts whichever error the rule currently prefers.
- Treat leakage detection as a capability, not just a rule. When the checker's model or effort level changes, the example-leakage fixture is the one that answers whether the new configuration can still see a copy at all.
- Where findings feed a revision step, treat finding text as a channel out of the checker's prompt. The reviser's grounding triage is what stands between a quoted example string and the document; an apply-wording-as-given rule is worth having and worth scoping so that it never exempts a string from that triage.

## Evidence

First-party, GSL resume pipeline (`gsl` repo, `docs/resume-prompt-decisions.md`, the 2026-08-18 V2y check-calibration entry, the V2r matrix retro-recorded 2026-08-23, V3c's craft rulings, and the V3g output-discipline rules; prompts at `parts/bundles/resume_check/prompt.md` and `parts/bundles/resume_author/prompt.md`; wiring at `workflows/resume/workflow.toml`). The pipeline drafts a tailored resume with one model call (`resume_author`), audits the draft against its evidence packet with a separate cross-family call (`resume_check`), and folds the audit's findings back into the document with a third (`resume_revise`).

The auditor's Check 1 carries a three-row worked example table showing the shape of a coverage report. Its rows use fleet, vehicle, and routing vocabulary — `CAN bus diagnostics`, `fleet routing optimization`, and the category labels `Vehicle Network Diagnostics` and `Dispatch and Routing Systems`. That same table is the reference set for the auditor's example-leakage check.

**The two roles are held by two different prompts, and their routes differ.** A grep of the drafting-side prompts for those four strings finds none of them in `resume_author`, `resume_prepare`, or `resume_revise`; all four live only in `resume_check`'s prompt (its Check 1 table, and the Check 2 clause that restates them as the comparison list) and in `resume_check`'s own hand-built fixtures. The one overlap is domain vocabulary, not a string: the author prompt offers `CAN bus tooling` in its own example of durable specific tools, alongside `ROS 2` and `Zephyr RTOS`. That is the shared-vocabulary case the rule explicitly declines to fire on, and it is not the checker's table. The drafting call is never shown the checker's prompt, so the checker's distinctive labels have no upstream route into a first draft.

**The downstream route is real and is wired.** `resume_check`'s findings are read into the audit reducer (`findings = "check.findings"`), surface as `audit.result.findings_or_decisions`, and are passed to `resume_revise` as its `findings_or_decisions` input. Each `critic_finding` carries `evidence` and `required_action` free text. The V3g unit then added a rule to the reviser: when triage lands USE and the `required_action` supplies replacement wording the evidence supports, *apply that wording as given* — added because the reviser had folded extra words in from a finding's explanation. So checker-prompt example content reaching the document is a documentable path: the checker would have to emit its own example vocabulary into a finding, and the reviser's evidence triage would have to pass it. Nothing in the record shows this happening. It is a route worth naming and watching, not an incident.

**Fixture 05 is a detection probe, not a captured leak.** Its `_gate` states the scenario in full: *a Skills category label ("Dispatch and Routing Systems") copied verbatim from this very prompt's own Check 1 worked-example table, not derived from the posting or the evidence packet, must be caught as generated-only example leakage even though every fact listed under the label is independently true — content stays, the label is the violation.* The fixture's `doc` is hand-authored with the label already in it, and its assertions require the verdict `revise`, a `blocker`, and the string `Dispatch and Routing Systems` inside `findings[].evidence`. It pins that the auditor catches the label; it neither exhibits nor requires a production mechanism by which the label arrived. Note the assertion's own second-order consequence: on a correct catch, the checker's example string is *supposed* to travel downstream in the finding.

The calibration finding, from V2y requalification:

- **Resemblance false-accused an honest draft.** One eval persona legitimately works in that field. Judging leakage by subject-matter resemblance flagged a draft that had copied nothing.
- **A domain-word carve-out then under-caught.** Narrowing the rule with an exception for the confusing vocabulary let a genuinely copied category label through.
- **Exact whole-string comparison, conjoined with absence from evidence, held both fixtures.** The shipped rule takes every Skills category label in the draft and every distinctive multi-word string in the Check 1 table and compares them literally; a label that reproduces one of those strings character for character *and* appears nowhere in the profile, accomplishments, or skills inputs is leakage. It says outright that shared vocabulary is not leakage, and adds a clause against explaining a real match away as coincidence. The content under a leaked label may stay; the label is the violation.
- **The hygiene rule was unavailable by construction.** The commissioned prompt research recommended that examples share no surface with any fixture persona. Fixture 05 deliberately pins the example labels as leakage bait, so the collision is the test. The exactness had to live in the detection rule instead of the example text, and the pipeline's standing conventions now record that the Check 1 table's exact labels must not be reworded.

Two corroborating observations from other units:

- **Domain reuse buys banner coverage, not denylist coverage (V3c).** The author prompt's contrastive density example — a ~30-word two-line bullet against a ~55-word three-line counterexample — was written inside the same synthetic warehouse-and-fleet persona domain the block's other examples already establish, rather than introducing a fresh one. It inherits that block's blanket never-carry-anything-out-of-here banner and the closing self-check line asserting nothing was carried out of the examples, and it opens no new region of vocabulary. What it does *not* inherit is the checker's exact-match list, which enumerates four specific strings from a different prompt: any new distinctive string would have to be registered there to be detectable at all. Domain reuse is a real economy on the banner side and no economy on the denylist side.
- **Detecting leakage is itself a model capability (V2r).** In the checker effort/model matrix, four cheaper configurations each failed a different fixture in a different direction. `luna@high` failed fixture 05 specifically — the example-leakage catch — and its failure direction was recorded as *blind*: it never saw the copied label. An example-design policy that relies on a downstream checker to absorb contamination therefore carries a model-capability dependency, and the fixture that proves it is exactly the one a cheaper configuration is likely to lose. See [[complementary-failure-directions-under-downgrade]].

## Limitations

- One pipeline, one auditor, one example table. The two-role framing is a structural claim about any prompt whose examples a checker is also keyed to; the evidence is one incident that exercised the demonstration role and the denylist role at once.
- The false accusation and the missed catch are each a single fixture. They establish that the two error directions exist and trade against each other, not their relative rates in production.
- The findings-to-reviser route is established from the wiring and the prompts, not from an observed leak. It says the path is open; it does not say anything has travelled it, and the reviser's own evidence triage is an unmeasured barrier standing in it.
- Exact whole-string matching is mechanically stable, not semantically complete. A paraphrased copy of an example passes it. It is accepted here because the observed failure was a copied literal string, and because the alternative was a judgment with no agreed threshold.
- Domain reuse concentrates any resemblance shadow rather than removing it: every honest subject in that one synthetic domain is maximally exposed to a resemblance-based reader. This is a good trade mainly because the domain is synthetic and the shipped detection rule is exact rather than resemblance-based.
- The capability observation is one leg of a fail-fast matrix. Its untested tail means the leg's pass count carries no information; the direction of the failure is the finding.

## Related

- [[prompt-rule-identity]] — the sibling that covers rule identity in general, including the match-precision finding this page depends on: a detection rule's exactness is part of the rule, and a judgment-shaped predicate should be replaced rather than carved out. This page's own claim is the two-role conflict and the routes by which each role's text can move.
- [[complementary-failure-directions-under-downgrade]] — the checker matrix behind the capability dependency; the example-leakage fixture is one of four that each cheaper configuration failed differently.
- [[anti-leakage-system-prompt]] — leakage as a prompt-level concern from the other direction; here the leak would run out of a prompt's own examples, and the same examples are what the detector is aimed at.
- [[in-context-learning]] — why examples are load-bearing at all; this page is the cost side of putting them in a pipeline that also audits its own output for them.
