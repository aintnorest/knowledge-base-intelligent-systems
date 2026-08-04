---
type: Study Note
title: "AutoPDL: Automatic Prompt Optimization for LLM Agents"
description: Personal study notes on AutoPDL, which jointly searches prompting patterns, instructions, and few-shot demonstrations as executable PDL programs using successive halving.
resource: https://arxiv.org/abs/2504.04365v5
source: /archive/autopdl-automatic-prompt-optimization-llm-agents.pdf
tags: [prompt-optimization, agents, tool-use, chain-of-thought, in-context-learning]
timestamp: 2026-07-13T18:08:50Z
---

# AutoPDL: Automatic Prompt Optimization for LLM Agents — Study Notes

**Authors**: Claudio Spiess, Mandana Vaziri, Louis Mandel, and Martin Hirzel
**Venue**: AutoML 2025 (earlier version); arXiv:2504.04365v5 [cs.AI]
**Date**: October 31, 2025
**Pages**: 20
**Code**: [IBM Prompt Declaration Language](https://github.com/IBM/prompt-declaration-language)

## What It Is

AutoPDL frames agent prompting as a constrained AutoML search. Instead of optimizing only an instruction or a set of few-shot examples, it searches the joint configuration of a prompting pattern—Zero-Shot, chain-of-thought (CoT), ReWOO, or ReAct—plus the instruction and demonstrations that instantiate that pattern. The output is an executable YAML-based PDL prompt program, not an opaque winning string.

The important practical claim is conditional: no single prompting pattern won across the paper's models and tasks. A search can select a simple CoT program for one model/task pair, a ReWOO program for another, a ReAct program when tool feedback matters, or retain zero-shot when none of the candidates improves the validation result.

## How the Search Works

1. Supply disjoint example-bank, validation, and final-test splits, together with a task loss. The example bank provides few-shot examples or preconstructed trajectories; validation selects candidates; test is used only after selection.
2. Define a PDL search space over the pattern, demonstration count and sampled examples, instruction, and, where relevant, tool-call system prompt. The tested pattern set is Zero-Shot, CoT, ReWOO, and ReAct.
3. Sample 100 concrete prompt-program candidates. In the reported setup, the first validation subset contains 16 examples, and candidate loss is negative accuracy.
4. Apply successive halving: evaluate candidates on the current validation subset, retain the better half, then double the subset size until one candidate remains. This concentrates evaluations on promising candidates without scoring every candidate on the maximum allocation.
5. Persist the selected configuration as a PDL program with its concrete demonstrations and values. Run that program on the held-out test set, while retaining the readable source program for inspection and modification.

PDL represents model calls, structured outputs, tools, data, and control flow declaratively. The paper's ReAct implementation loops through thought, action, and observation; ReWOO plans actions before tool observations and asks a later call for the answer. Its tools were a SymPy-backed calculator for math, a first-result Wikipedia search for FEVER, and Python execution for programming.

## Experimental Design

The main evaluation covers FEVER fact verification, GSM8K math, and MBPP+ Python synthesis. It uses seven IBM watsonx-hosted open models from 3B to 70B parameters—Llama 3.1/3.2/3.3 and Granite 3.1, Granite 13B Instruct V2, Granite 20B Code, and Granite 34B Code—with greedy decoding. Each configuration was optimized three times and reported as mean accuracy, standard deviation, and the best pattern of the highest-scoring run.

The authors also test two transfer settings. For GSM-Hard, they use GSM8K as the demonstration bank while optimizing against GSM-Hard validation examples. For a commercial-model check, they execute Llama 3.1 70B's selected programs on `gpt-4o-mini-2024-07-18` rather than running a fresh frontier-model search.

## Results That Matter

The abstract reports a mean accuracy gain of **9.21 ± 15.46 percentage points** across the stated evaluations and a maximum of **67.5 points**. The largest individual gain is FEVER on Granite 13B Instruct V2: 6.5% zero-shot to 74.0% optimized, using 3-shot ReWOO. That dramatic result comes from a weak baseline and should not be read as a general ReWOO advantage.

The pattern choice varies materially:

- On FEVER, optimized programs improved all seven models by 3.5–67.5 points; CoT and ReWOO each appear as the selected pattern for several models, while ReAct was not selected.
- On GSM8K, only CoT was selected among improved cases, with gains from 3.5 to 9.9 points; three tested models retained zero-shot as best.
- On MBPP+, ReAct was selected for three models, including Granite 34B Code's 12.6-point gain (48.7% to 61.3%), consistent with execution feedback being useful for some code tasks; four models retained zero-shot.
- In the cross-model experiment, Llama-selected prompts reportedly improved `gpt-4o-mini` by 4.0 points on FEVER, 9.3 on GSM-Hard, and 13.1 on GSM8K, while MBPP+ did not improve. This is transfer evidence for those saved programs, not proof that a program optimized for one model is broadly portable.

## My Takeaways

1. **Search the program shape as well as its wording.** If a task can be solved by direct response, few-shot reasoning, planned tool use, or an interactive agent loop, fixing the pattern before optimization discards a consequential design choice. Keep the candidate patterns few, explicit, and executable.

2. **Use progressive resource allocation for expensive evaluations.** Start many candidates on a small validation slice, discard clear losers, and enlarge the slice only for survivors. Preserve the candidate seed, splits, scoring rules, and every pruning decision; early noise can otherwise decide the result.

3. **Treat the selected prompt as deployable source code.** Save the resolved program, tool definitions, model identifier, decoder settings, demonstrations, task metric, and data provenance. A result that cannot be read, executed, diffed, and rolled back is difficult to trust or adapt.

4. **Make zero-shot an active baseline and transfer a hypothesis.** Include it in the search, especially when prompts can add cost or instability. A configuration selected on an inexpensive model can be a useful candidate for a frontier model, but validate it against that target model and task before relying on it.

## Questions and Limitations

- The search is still combinatorial and potentially costly. Successive halving reduces evaluation allocation, but each agentic candidate can make multiple model and tool calls, and early scores on 16 examples can be noisy.
- The paper searches a deliberately small pattern library, demonstration counts of 0, 3, or 5, and a small selection of ReAct system prompts. It does not establish that the selected program is globally optimal or that the library covers the relevant workflow shapes.
- Tool behavior, trajectory templates, answer parsers, model versions, and dataset splits are part of the evaluated configuration. In particular, FEVER uses a first-Wikipedia-result search, and MBPP+ tool trajectories are rule-based from reference solutions; gains may not transfer to different tools or live environments.
- Results are based on three benchmarks, seven primarily open models, greedy decoding, and three optimization runs. The 67.5-point FEVER result has high practical interest but is concentrated in one low-baseline model/task pair.
- Cross-model transfer reuses programs optimized for Llama 3.1 70B and tests a dated `gpt-4o-mini` snapshot. It is evidence that saved artifacts can be worth testing elsewhere, not evidence to skip target-model validation.

## Vault Ideas Extracted

* [Prompt Optimization](/vault/prompt-optimization.md)
* [Declarative LM Pipeline Compilation](/vault/declarative-lm-pipeline-compilation.md)
