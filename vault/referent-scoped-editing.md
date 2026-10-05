---
type: Synthesis
title: Referent-Scoped Editing
description: Separating selection from linguistic action and enforcing replacement boundaries outside the model reduces reference burden and collateral edits without guaranteeing semantic correctness.
tags: [interaction-design, prompting, verification, reliability, evaluation]
timestamp: 2026-10-05T23:22:57Z
---

# Referent-Scoped Editing

Specify **what an operation refers to** by selection or pointing, and **what it should do** in language. When the operation replaces a selected region, let the model generate the replacement while an external applicator splices it into that region. Unselected content is then preserved mechanically rather than by an instruction the model might ignore.

## How It Works

Keep the artifact visible and give selected spans or objects stable references. Provide the context needed to interpret the action, but separate that read context from the authorized replacement region. Show references before execution and actual changes afterward. Reify a successful action as a reusable operation with variable target bindings, and retain operation-level undo so experimentation need not require regenerating the whole artifact.

Three properties must be assessed separately:

- **Reference precision:** does the selected or pointed-to object match the user's intended referent? Mapping a visible object to the model's representation is itself an interpretation boundary.
- **Effect confinement:** can the applicator change only the permitted region? A reference in a whole-artifact rewrite does not impose that boundary. Referenced objects may differ from affected objects: an instruction can mention an object precisely to preserve it.
- **Semantic correctness:** is the bounded replacement actually right, and does it preserve required relationships with the surrounding artifact? Precise selection and perfect confinement cannot establish this.

[Model-Aware Harness Design](/vault/model-aware-harness-design.md) applies the related distinction to edit representations and observation-sensitive anchors: locating and applying a change is separate from choosing the correct change.

## Practical Use and Limits

Use this pattern for targeted revisions where collateral changes are costly to inspect. Bind reusable actions to new targets explicitly; reuse reduces articulation work but does not make generation deterministic. Preserve enough surrounding context to support coherent edits, and inspect both the replacement and its relationships with unchanged material. Set-based or open-ended changes may be easier to describe linguistically than select individually.

A small peer-reviewed editing study with **12 participants and 288 trials** found mean trial times of **56 versus 117 seconds** and prompt counts of **1.90 versus 3.67**. Participant-rated closeness favored the bundled interface, but this was subjective, not independently verified correctness; the code-specific difference was nonsignificant. Selection, confinement, feedback, reuse, and undo were not ablated, so the gains cannot be assigned to one component. Predetermined tasks, experienced participants, time-limited trials, and a restricted baseline limit transfer. The reported prompt-length difference also conflicts with the displayed means.

Operation-level undo restores local artifact state; it is **not rollback of external effects**. Nor does a smaller review surface establish error-detection accuracy or safe autonomous execution. Keep semantic checking distinct from perceived control; see [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md).

## Sources

- [DirectGPT: A Direct Manipulation Interface to Interact with Large Language Models dossier](/dossiers/directgpt-direct-manipulation-llms.md) — peer-reviewed CHI 2024 evidence for separating references and actions, externally confined replacement, reusable operations, and undo; small bundled-feature study measures efficiency and subjective closeness, with nonsignificant code results and inconsistent prompt-length arithmetic.
