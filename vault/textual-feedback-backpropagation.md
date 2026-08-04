---
type: Synthesis
title: Textual Feedback Backpropagation
description: Improving a compound AI system by tracing outcome critiques backward to the specific text-valued variables and contexts that produced them, then validating targeted revisions.
tags: [prompt-optimization, self-improvement, evaluation]
timestamp: 2026-07-13T18:15:11Z
---

# Textual Feedback Backpropagation

Textual feedback backpropagation is a pattern for optimizing a compound AI system without numerical gradients. Model-generated or tool-generated feedback about an outcome is passed through the recorded computation graph to the individual prompts, intermediate artifacts, or parameter representations that influenced it. An optimizer then proposes a targeted replacement for each mutable variable.

## Procedure

1. Represent the system as a traceable graph of variables and transformations.
2. Define the outcome signal, ideally using tests, labels, deterministic checks, or an expert-approved rubric.
3. At the output, generate or collect concrete feedback about the observed failure.
4. For each upstream mutable variable, retain its forward context and ask what change to that variable could address the downstream feedback.
5. Propose a replacement while enforcing format and scope constraints.
6. Re-run the complete graph and retain the replacement only if independent acceptance criteria pass.

## Practical Use

Use the pattern when a system has several text-bearing components—such as an instruction, retrieval query, plan, code draft, or tool-call argument—and an undifferentiable but observable objective. The graph provides a discipline that a single global "improve this" prompt lacks: it preserves where a value was used and lets the system target a component rather than blindly rewrite the whole workflow.

Keep the variable role, forward inputs and outputs, feedback source, proposed patch, evaluator result, and model versions in the trace. These records make failures diagnosable and let operators roll back a locally harmful revision.

## Limitations

- Natural-language critiques are not mathematical derivatives and do not establish causal responsibility.
- An LLM judge can make a coherent but false diagnosis; feedback quality limits update quality.
- A final score can hide invalid, unsafe, costly, or ungrounded intermediate behavior. Add component-level validators for the properties that matter.
- Each graph edge may require additional feedback calls, so cost and latency can grow quickly with graph size.
- Natural-language constraints alone are insufficient for high-stakes authorization, schema enforcement, or irreversible actions.

## Sources

- [TextGrad: Automatic “Differentiation” via Text dossier](/dossiers/textgrad-automatic-differentiation-via-text.md) — introduces graph-based propagation of LLM textual critiques, role-aware variables, and Textual Gradient Descent across prompts, solutions, code, molecules, and planner parameters.
