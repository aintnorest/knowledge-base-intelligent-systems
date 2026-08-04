---
type: Study Note
title: 'TextGrad: Automatic “Differentiation” via Text'
description: Personal study notes on TextGrad, a framework that propagates LLM-generated natural-language critiques through compound AI computation graphs to revise text-valued components.
resource: https://arxiv.org/abs/2406.07496v1
source: /archive/textgrad-automatic-differentiation-via-text.pdf
tags: [prompt-optimization, self-improvement, llm-as-judge]
timestamp: 2026-07-13T18:15:11Z
---

# TextGrad: Automatic “Differentiation” via Text — Study Notes

**Authors**: Mert Yuksekgonul, Federico Bianchi, Joseph Boen, Sheng Liu, Zhi Huang, Carlos Guestrin, and James Zou

**Venue**: arXiv:2406.07496v1 [cs.CL]

**Date**: June 11, 2024
**Pages**: 41

## What It Is

TextGrad is an open-source optimization framework for compound AI systems whose components are not numerically differentiable. It represents prompts, LLM responses, code, SMILES strings, and even serialized numerical-planner parameters as variables in a computation graph. An LLM writes natural-language criticism of a downstream result; the framework passes that criticism backward through the contexts in which a variable was used, then asks an LLM-based optimizer to revise the variable.

The paper calls these critiques **textual gradients** and frames the procedure as an analogy to automatic differentiation, not as a claim that the feedback is a mathematical derivative. The useful abstraction is broader than prompt tuning: optimize an instance at test time (a solution, code, molecule, or plan) or optimize a shared prompt over a task dataset with the same graph API.

## The Computation Model

For a simple `prompt -> prediction -> evaluation` graph, a backward engine first critiques the prediction against the evaluation, then receives that feedback plus the prompt/prediction conversation and critiques the prompt. In the general graph, each variable collects feedback from every successor; a `TextualGradientDescent` step receives the variable, its role description, its contexts, and its accumulated critiques, then returns replacement text.

Three design choices make the framework practical:

1. **Role descriptions** tell the backward engine what a span represents (for example, a reusable system prompt rather than a final numerical answer). They are a primary channel for injecting user knowledge into the optimizer.
2. **Composable operations** register predecessor variables on forward calls and define a corresponding backward operation. The paper demonstrates LLM calls and text concatenation, with arbitrary tools or simulators usable when an appropriate feedback operation is supplied.
3. **Optimization extensions** reinterpret familiar mechanisms in text: concatenate per-example feedback for minibatches, append natural-language constraints to updates, and provide prior variable versions as a momentum-like history.

The analogy has an important cost implication: for a graph with `n` edges, one iteration can require up to `n` additional LLM calls for backward feedback, before the calls needed to evaluate and update the artifact.

## Evidence Across Tasks

The paper uses GPT-4o for its instance-optimization experiments and a stronger GPT-4o feedback engine to improve a cheaper GPT-3.5-Turbo reasoning model's system prompt.

- **LeetCode Hard**: over five seeds on 39 problems, the authors report a 0.36 completion rate after five zero-shot TextGrad iterations, versus 0.31 for their one-shot, five-iteration Reflexion rerun and 0.26 for their zero-shot baseline. The paper notes that its re-extracted dataset may differ from the one used in the original Reflexion work.
- **Test-time answer refinement**: with three solution updates and majority voting, it reports GPT-4o accuracy of 55.0% on GPQA Diamond, compared with 51.0% for its chain-of-thought baseline; MMLU Machine Learning rises from 85.7% to 88.4%, and College Physics from 91.2% to 95.1%.
- **Shared-prompt optimization**: TextGrad trains an instruction-only GPT-3.5-Turbo prompt using minibatches of three and 12 iterations, accepting an iteration when validation improves. It reports 91.9% on BBH Object Counting (versus 77.8% zero-shot CoT and 84.9% DSPy BFSR), and ties the reported DSPy baseline on Word Sorting (79.8%) and GSM8K (81.1%). Combining TextGrad's instruction with DSPy's selected demonstrations reached 82.1% on GSM8K in this experiment.
- **Scientific proof of concept**: for 58 DOCKSTRING protein targets, the framework uses Vina docking and RDKit QED feedback to modify SMILES strings. For radiotherapy, it changes text-serialized objective weights of a matRad inverse planner; across five prostate-cancer plans, it reports target-dose and organ-at-risk metrics better than the clinician plans under the paper's selected metrics.

These are paper-specific results with 2024 models, custom objectives, and bounded tasks—not evidence that unrestricted self-critique safely improves a production system.

## Why the Framework Matters

TextGrad makes the *location* of feedback explicit. Rather than feed an overall critique straight back into the whole prompt or whole agent, it preserves the forward context and sends a variable-specific request upstream. That provides a useful pattern for compound systems: identify a mutable component, retain its trace context, define an outcome signal, generate targeted feedback, and revise only the component permitted to change.

It also clarifies a boundary with DSPy. DSPy compiles a declared program against examples and a metric; TextGrad supplies a generic feedback-and-rewrite mechanism that can optimize both program parameters and single test-time artifacts. The two can be complementary, as the paper's GSM8K combination suggests.

## Limitations and Questions

- Textual gradients are critiques generated by an LLM, not reliable causal derivatives. A fluent diagnosis can be wrong, and feedback can propagate a bad premise through the graph.
- The reported prompts ask the model itself to judge answers, solutions, and plans. External tests, deterministic metrics, labels, or expert review are stronger signals than ungrounded self-evaluation; retain independent holdouts and acceptance gates.
- The paper's solution-refinement result spends multiple test-time calls and majority-votes across revisions. Compare against an equivalently budgeted baseline and report latency, cost, and regressions.
- Natural-language constraints may become less reliably followed when numerous or interacting. Treat schemas, safety policies, and irreversible tool actions as enforceable system constraints, not merely optimizer prose.
- Molecule and radiotherapy results are in-silico/planning demonstrations. The authors explicitly state that experimental and clinical assessment remains outside the paper's scope.
- A graph-level final score can conceal a harmful or unsupported intermediate action. Validate important component-level invariants in addition to final answer quality.

## Analyst Takeaways

1. **Use feedback paths, not just feedback text.** Preserve which output, tool result, and downstream objective gave rise to a proposed revision; context makes a critique actionable and auditable.
2. **Restrict the optimization surface.** Revise the smallest well-defined variable that can plausibly address the failure, then evaluate the whole system again. This limits coupled drift.
3. **Make critiques advisory and gates authoritative.** An LLM can propose a change, but independent tests, validators, and safety checks should decide whether it is retained.
4. **Budget graph optimization explicitly.** The backward graph multiplies LLM calls; a small measured gain may not pay for its inference cost or operational risk.

## Vault Ideas Extracted

* [Textual Feedback Backpropagation](/vault/textual-feedback-backpropagation.md)
* [Prompt Optimization](/vault/prompt-optimization.md)
