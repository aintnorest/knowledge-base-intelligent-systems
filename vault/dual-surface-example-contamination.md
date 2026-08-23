---
type: Synthesis
title: Dual-Surface Example Contamination
description: A worked example in a prompt leaks into two places at once — the model's output, and any checker in the same pipeline that detects example-copying — and the two surfaces pull example design in opposite directions, so the resolution is mechanical detection semantics rather than better example prose.
tags: [prompting, in-context-learning, evaluation, verification, reliability]
timestamp: 2026-08-23T00:00:00Z
---

# Dual-Surface Example Contamination

The first contamination surface is the well-known one: a worked example in a prompt is a template, and the model copies it — in structure, and sometimes in content. Every standard defense targets that surface. The second surface is the pipeline's own auditor. When a checker is asked to catch example-copying, the examples stop being only a demonstration and become the reference set that defines what "copied" means. The same example is now doing two jobs, and the property that makes it good at one — being distinctive enough to be memorable — makes it worse at the other.

## The Pattern

1. A prompt carries worked examples, because examples are the strongest signal in a prompt.
2. Defenses are applied to the output surface: wrap them in a tagged block, use obviously synthetic personas, add a never-reuse-anything-from-here banner, prefer contrastive minimal pairs over full artifacts a model can copy wholesale.
3. Somewhere in the same pipeline, a checker's job includes catching example leakage — content in the finished artifact that came from the instructions rather than from the evidence. Its reference set is the example table.
4. A real subject legitimately works in the example's domain and uses the same ordinary domain words. Nothing was copied. The auditor, judging by resemblance, calls it plagiarism.
5. Tightening in either direction trades one error class for the other — this is the general property of judgment-shaped detection rules, covered in [[prompt-rule-identity]]; the fix is a mechanical predicate rather than a better-calibrated judgment.
6. The design pressures on the example itself now conflict. A vivid, specific, memorable example suppresses vague imitation on the output surface and simultaneously widens the resemblance shadow the auditor casts over every honest subject in that domain.
7. The obvious hygiene rule — pick examples that share no surface with any real or fixture subject — may not be available, because a suite that tests leakage detection needs a fixture in which the collision actually exists.

## Why It Happens

An example is a demonstration and a denylist at the same time, and those two roles want opposite things. As a demonstration it should be concrete and specific enough that the model reads a pattern off it. As a denylist it should be narrow, so that its entries are unlikely to appear in honest output for any other reason. Distinctiveness is exactly what serves the first and undermines the second.

The auditor's position makes this worse. It sees a finished artifact and has to infer origin from surface alone — it did not watch the artifact being written, and has no access to whether a phrase arrived from the evidence packet or from the instructions. Origin is not recoverable from resemblance, so a resemblance test is being asked a question it structurally cannot answer, and the two ways to tune it trade false accusations against missed copies.

And the test suite pushes back on the obvious mitigation. A fixture that pins leakage detection has to contain leaked content, which means the leaked strings must be real strings from the real example table. Once a fixture depends on the collision, the example text is no longer free to move — and the exactness has to live somewhere else.

## How To Work With It

- When adding a worked example, enumerate both surfaces. Ask what the model might copy out of it, and separately ask what any checker keyed to it will start flagging in honest work.
- Make leakage detection mechanical: exact, whole-string comparison against a named table, with a plain statement in the rule that shared vocabulary is not leakage. This is the general finding in [[prompt-rule-identity]] applied to this specific rule.
- Keep the example set and the detection reference the same named list, and say so in the rule. A denylist that drifts out of sync with the examples it was derived from silently stops covering new ones.
- Reuse one synthetic domain across a prompt's examples instead of inventing a fresh persona per example. A new example in an already-established synthetic world inherits the existing never-carry banner and denylist coverage for free, and it keeps the resemblance shadow concentrated in one predictable region rather than spreading it across the whole vocabulary.
- Do not try to solve the auditor's problem in the example text. If the false accusation is fixable by rewording an example, the detection rule is still judgment-shaped and will fail on the next collision.
- Hold both fixtures. One that pins a genuine copy — deliberate bait, with the collision the hygiene rule would have forbidden — and one where a subject honestly overlaps the example's domain. A suite with only one of the two silently accepts whichever error the rule currently prefers.
- Treat leakage detection as a capability, not just a rule. When the checker's model or effort level changes, the example-leakage fixture is the one that answers whether the new configuration can still see a copy at all.

## Evidence

First-party, GSL resume pipeline (`gsl` repo, `docs/resume-prompt-decisions.md`, the 2026-08-18 V2y check-calibration entry, the V2r matrix retro-recorded 2026-08-23, and the V3c craft rulings; prompts at `parts/bundles/resume_check/prompt.md` and `parts/bundles/resume_author/prompt.md`).

The cross-family auditor's Check 1 carries a three-row worked example table showing the shape of a coverage report. Its rows use fleet, vehicle, and routing vocabulary — `CAN bus diagnostics`, `fleet routing optimization`, and the category labels `Vehicle Network Diagnostics` and `Dispatch and Routing Systems`. That same table is the reference set for the auditor's example-leakage check. The calibration finding, found during V2y requalification:

- **Resemblance false-accused an honest draft.** One eval persona legitimately works in that field. Judging leakage by subject-matter resemblance flagged a draft that had copied nothing.
- **A domain-word carve-out then under-caught.** Narrowing the rule with an exception for the confusing vocabulary let a genuinely copied category label through.
- **Only exact whole-string comparison held both fixtures.** The shipped rule takes every Skills category label in the draft and every distinctive multi-word string in the Check 1 table and compares them literally, says outright that shared vocabulary is not leakage, and adds a clause against explaining a real match away as coincidence — a distinctive multi-word label present in the instructions and absent from the candidate's evidence did not arrive independently. The content under a leaked label may stay; the label is the violation.
- **The hygiene rule was unavailable by construction.** The commissioned prompt research recommended that examples share no surface with any fixture persona. Fixture 05 deliberately pins the example labels as leakage bait, so the collision is the test. The exactness had to live in the detection rule instead of the example text, and the pipeline's standing conventions now record that the Check 1 table's exact labels must not be reworded.

Two corroborating observations from other units:

- **Domain reuse is free coverage (V3c).** The author prompt's new contrastive density example — a ~30-word two-line bullet against a ~55-word three-line counterexample — was written inside the same synthetic warehouse-and-fleet persona domain the block's other examples already establish, rather than introducing a fresh one. It inherits the block's blanket never-carry-anything-out-of-here banner and the closing self-check line that asserts nothing was carried out of the examples, and it widens no new region of the resemblance shadow.
- **Detecting leakage is itself a model capability (V2r).** In the checker effort/model matrix, four cheaper configurations each failed a different fixture in a different direction. `luna@high` failed fixture 05 specifically — the example-leakage catch — and its failure direction was recorded as *blind*: it never saw the copied label. An example-design policy that relies on a downstream checker to absorb the contamination therefore carries a model-capability dependency, and the fixture that proves it is exactly the one a cheaper configuration is likely to lose. See [[complementary-failure-directions-under-downgrade]].

## Limitations

- One pipeline, one auditor, one example table. The dual-surface framing is a structural claim about any pipeline whose checker is keyed to its own examples; the evidence is one incident that exercised both surfaces at once.
- The false accusation and the missed catch are each a single fixture. They establish that the two error directions exist and trade against each other, not their relative rates in production.
- Exact whole-string matching is mechanically stable, not semantically complete. A paraphrased copy of an example passes it. It is accepted here because the observed failure was a copied literal string, and because the alternative was a judgment with no agreed threshold.
- Domain reuse concentrates the resemblance shadow rather than removing it: every honest subject in that one synthetic domain is now maximally exposed, which is only a good trade because the domain is synthetic and the detection rule is exact.
- The capability observation is one leg of a fail-fast matrix. Its untested tail means the leg's pass count carries no information; the direction of the failure is the finding.

## Related

- [[prompt-rule-identity]] — the sibling that covers rule identity in general, including the match-precision finding this page depends on: a detection rule's exactness is part of the rule, and a judgment-shaped predicate should be replaced rather than carved out. This page's own claim is the dual-surface framing that makes the collision unavoidable.
- [[complementary-failure-directions-under-downgrade]] — the checker matrix behind the capability dependency; the example-leakage fixture is one of four that each cheaper configuration failed differently.
- [[anti-leakage-system-prompt]] — leakage as a prompt-level concern from the other direction; here the leak runs out of the prompt's own examples, and the same examples are what the detector is aimed at.
- [[in-context-learning]] — why examples are load-bearing at all; this page is the cost side of putting them in a pipeline that also audits its own output for them.
