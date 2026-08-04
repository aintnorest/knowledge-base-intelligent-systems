---
type: Study Note
title: A Systematic Survey of Prompt Engineering in Large Language Models
description: Personal study notes on an application-centric survey of prompt engineering techniques for large language models.
resource: https://arxiv.org/abs/2402.07927v2
source: /archive/systematic-survey-prompt-engineering-llms.pdf
tags: [prompting, taxonomy, reasoning]
timestamp: 2026-07-12T21:41:16Z
---

# A Systematic Survey of Prompt Engineering in Large Language Models - Study Notes

**Authors**: Pranab Sahoo, Ayush Kumar Singh, Sriparna Saha, Vinija Jain, Samrat Mondal, Aman Chadha  
**Venue**: arXiv:2402.07927v2 [cs.AI]  
**Date**: March 16, 2025  
**Pages**: 12

## What It Is

A compact survey that organizes prompt engineering techniques by application area rather than by historical lineage or prompt format. The paper covers more than 40 techniques across LLM reasoning, hallucination reduction, user interaction, optimization, knowledge-based reasoning, tone control, code generation, user-intent clarification, and metacognitive abstraction.

Its strongest contribution is the taxonomy: prompt engineering is treated as a toolbox for different failure modes and product goals, not as a single generic practice.

## The Problem It Addresses

Prompt engineering has expanded quickly from zero-shot and few-shot prompting into a crowded field of specialized techniques. Without a systematic map, it becomes hard to decide whether a task needs examples, search over reasoning paths, retrieval, verification, code execution, prompt optimization, or a user-intent repair step.

The paper responds by classifying techniques according to the job they do. That framing is useful for choosing interventions: use RAG/CoVe/CoN/CoK for factuality problems, ToT/GoT/BoT for search-heavy reasoning, PoT/CoC/SCoT for computation or code-heavy tasks, and RaR or Step-Back prompting when the issue is ambiguous framing or missing abstraction.

## The Taxonomy

The survey groups techniques into twelve application areas:

1. **New tasks without extensive training** - zero-shot and few-shot prompting.
2. **Reasoning and logic** - CoT, Auto-CoT, self-consistency, LogiCoT, Chain-of-Symbol, ToT, GoT, S2A, Thread of Thought, Chain-of-Table, Self-Refine, Code Prompting, ECHO, Logic-of-Thought, IAP, EEDP, Layer-of-Thoughts, Narrative-of-Thought, BoT, CD-CoT, R-CoT, and Chain of Draft.
3. **Hallucination reduction** - RAG, ReAct, Chain-of-Verification, Chain-of-Note, and Chain-of-Knowledge.
4. **User interaction** - Active-Prompt.
5. **Fine-tuning and optimization** - Automatic Prompt Engineer.
6. **Knowledge-based reasoning and generation** - ART.
7. **Consistency and coherence** - Contrastive Chain-of-Thought.
8. **Emotion and tone** - Emotion Prompting.
9. **Code generation and execution** - Scratchpad, Program of Thoughts, Structured CoT, and Chain-of-Code.
10. **Optimization and efficiency** - OPRO.
11. **User intent** - Rephrase and Respond.
12. **Metacognition and self-reflection** - Step-Back prompting.

The paper also summarizes each technique by application, prompt acquisition style, prompt turn structure, model, dataset, and metric.

## Important Technique Clusters

### Reasoning Search and Structure

The paper treats reasoning prompts as a progression from linear reasoning to structured search and domain-specific representations. CoT produces stepwise traces; self-consistency samples multiple traces and votes; ToT and GoT add search, evaluation, branching, and recombination; Chain-of-Table and EEDP adapt reasoning representations to tabular and graph-structured inputs.

Several reported results illustrate why representation matters. Chain-of-Symbol substantially improves spatial reasoning on Brick World while reducing prompt tokens. ToT produces large gains on Game of 24 compared with plain CoT. Chain-of-Draft targets the opposite pressure: keeping reasoning concise enough to reduce token use and latency while preserving accuracy.

### Verification and Hallucination Reduction

The hallucination section distinguishes retrieval from verification. RAG adds external evidence to the prompt. ReAct interleaves reasoning with actions, such as Wikipedia lookups. CoVe has the model draft an answer, plan verification questions, answer those questions independently, and revise. CoN and CoK extend the idea to retrieval-augmented settings where documents may be noisy, irrelevant, or insufficient.

The useful pattern is not just "add context"; it is context plus a mechanism for deciding whether the context is relevant, enough, and consistent with the answer.

### Automation and Optimization

The paper includes two automation-oriented methods that are especially relevant to production prompt work. APE generates candidate instructions and selects high-performing prompts, outperforming human-authored prompts on many BIG-Bench instruction-induction tasks in the cited work. OPRO uses LLMs as optimizers that iteratively propose better solutions or prompts from natural-language performance history.

This reinforces the idea that prompt engineering becomes an evaluation and search problem once there are enough examples and metrics.

### Code and Tool-Oriented Prompting

Scratchpads, Program of Thoughts, Structured CoT, and Chain-of-Code all use intermediate representations to make reasoning more executable, inspectable, or structurally aligned with the task. PoT delegates computation to an interpreter, while CoC asks the model to express semantic and symbolic subtasks as code-like steps that can be emulated.

## My Takeaways

1. **Application-first taxonomy is the useful part.** The paper is less deep than the larger survey already in the knowledge base, but it is good at mapping techniques to failure modes.

2. **Prompt engineering is converging with orchestration.** Many techniques are really small control loops: generate, retrieve, critique, verify, select, execute, or revise. The prompt is only one part of the system behavior.

3. **Representation choice is a core design decision.** Natural language, symbols, tables, graphs, code, short drafts, and narratives each induce different model behavior. "Prompting" often means choosing the right intermediate form.

4. **Efficiency is becoming first-class.** Chain-of-Draft, EEDP, Chain-of-Symbol, and OPRO all make cost, latency, or token budget part of the technique rather than an afterthought.

## What I Would Question

- The survey is broad and compressed. Some complex techniques receive only a paragraph, so it is best used as a map into primary papers rather than as implementation guidance.
- Several performance numbers are presented without enough experimental context to support strong cross-technique comparison. The table is helpful for orientation but should not be read as a leaderboard.
- The title emphasizes LLMs, but some included methods touch VLMs or LMMs. That is reasonable for coverage, but the scope boundaries are loose.

## Vault Ideas Extracted

* [Application-Centric Prompt Taxonomy](/vault/application-centric-prompt-taxonomy.md)
* [Prompt Optimization](/vault/prompt-optimization.md)
* [Retrieval Augmentation for Hallucination Reduction](/vault/retrieval-augmentation.md)
