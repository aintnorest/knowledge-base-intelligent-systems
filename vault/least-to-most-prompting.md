---
type: Synthesis
title: Least-to-Most Prompting
description: A sequential prompting pattern that decomposes a hard problem into ordered, dependent subproblems and carries each solved result forward to address easy-to-hard generalization.
tags: [prompting, decomposition, reasoning, generalization]
timestamp: 2026-07-13T00:04:46Z
---

# Least-to-Most Prompting

Least-to-most prompting is a task-solving pattern for work that is harder or deeper than the examples available in context. First generate an ordered decomposition; then solve its subproblems from easiest to hardest, making each answer available to the next step. The final subproblem is often the original task expressed with the required intermediate facts now established.

It differs from a generic decomposition pipeline in its dependency structure. It is not a parallel list of independently answerable questions followed by aggregation. It is an incremental state machine: prior answers are part of the input for later steps.

## Procedure

1. Provide examples that show how target problems become a complete, ordered list of subproblems.
2. Produce and validate a decomposition for the new problem.
3. Solve one subproblem at a time, retaining the original task and completed state.
4. Represent each answer in a compact, checkable form; validate it before it becomes context for a dependent step.
5. Return the final answer, with the intermediate state available for audit or repair.

The demonstrations should teach a base case and an extension pattern, not just verbose reasoning. For a recursively structured task, this lets the model repeat a learned small operation rather than attempt a long novel completion in one pass.

## Practical Use

Use this when task difficulty grows primarily with the number of dependent operations: multi-step calculations, constrained transformations, long compositional commands, or evidence synthesis that must establish facts in a particular order. Compare it with direct answering, a single chain of thought, and an independent-subquestion pipeline on slices grouped by task depth.

For production workflows, keep the carried state structured, cap the step count, and attach an appropriate check at each boundary: arithmetic evaluation, schema validation, retrieval citation checks, program execution, or a verifier. A failed intermediate check should trigger repair, replanning, or escalation—not automatic continuation.

## Limitations

- A plausible but incomplete decomposition can make every later result wrong; the method needs decomposition-quality evaluation.
- Decomposition demonstrations tend to be domain-specific and may not transfer to a new problem family.
- Sequential calls increase cost and latency, while state accumulation can exceed context limits.
- It helps most when task depth is the bottleneck. It may add overhead or regress simple cases, and it is not a substitute for tools, retrieval, or verification.
- Historical benchmark gains from 2022-era GPT-3 models do not establish the same effect on a current model or deployment.

## Sources

- [Least-to-Most Prompting Enables Complex Reasoning in Large Language Models dossier](/dossiers/least-to-most-prompting.md) — primary evidence for the two-stage method, easy-to-hard evaluations, prompt sensitivity, error analyses, and limitations.
