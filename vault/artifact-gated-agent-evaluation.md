---
type: Synthesis
title: Artifact-Gated Agent Evaluation
description: Scoring an agent's final deliverable only after it satisfies explicit validity, safety, and provenance preconditions, then measuring quality with the most direct available signal.
tags: [evaluation, verification, agents, computer-use]
timestamp: 2026-07-14T16:06:03Z
---

# Artifact-Gated Agent Evaluation

Artifact-gated agent evaluation makes a verified deliverable—not a persuasive action trace or a generic quality impression—the unit of success. First test whether the output is admissible: present, readable, in the required location and shape, and free of failures that make further scoring meaningless. Only then calculate graded quality against a reference, rubric, executable test, or other task-appropriate signal.

## The Pattern

1. Define the required output artifacts and the conditions that make each one eligible for scoring.
2. Apply hard gates for non-negotiable properties: valid format, required companion files, safety or provenance conditions, and any behavior that must hold before quality matters.
3. Compare admissible artifacts with the most direct available evaluator: exact values, structured fields, executable behavior, geometry, or deterministic state before a model judge.
4. When perceptual judgment is unavoidable, ask narrow reference-grounded questions about observable properties and aggregate their answers in code.
5. Report full-pass rate, partial score, timeout rate, resource use, and failure category separately so apparent progress is not confused with completed work.

## Practical Use

Use this pattern for computer-use agents, coding agents, document workflows, robotic simulations, and any system that leaves artifacts behind. A CAD task might require a parseable file and collision-free path before scoring dimensional similarity; a report workflow might require all requested files and valid citations before evaluating completeness; a code task might require installation and test gates before quality or maintainability review.

Keep references and evaluator-only state isolated from the acting agent. Make the evaluator reproducible where possible, and record which gate failed so failures guide engineering rather than collapse into one opaque zero.

## Limitations

- Gates can reject a legitimate alternative solution when they encode one tool, file layout, or workflow too narrowly.
- A passing artifact can still be unsafe, unhelpful, or wrong on dimensions the evaluator omitted; gate coverage is not a substitute for task design and review.
- Some creative and perceptual outputs lack a deterministic comparator. Constrained model judgments can add signal but remain model-dependent and need calibration.
- Final-artifact scoring does not explain whether the agent’s intermediate reasoning, permissions, or side effects were acceptable. Add trace, policy, and environment checks when those properties matter.

## Sources

- [Agents’ Last Exam dossier](/dossiers/agents-last-exam.md) — ALE uses deliverable-based checks, gate-and-score composition, reference isolation, and targeted visual probes for long-horizon professional workflows.
