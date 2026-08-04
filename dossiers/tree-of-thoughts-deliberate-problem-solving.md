---
type: Study Note
title: Tree of Thoughts: Deliberate Problem Solving with Large Language Models
description: Personal study notes on Tree of Thoughts, an inference-time framework that combines language-model generation and self-evaluation with tree search.
resource: https://arxiv.org/abs/2305.10601v2
source: /archive/tree-of-thoughts-deliberate-problem-solving.pdf
tags: [chain-of-thought, test-time-scaling, reasoning, prompting]
timestamp: 2026-07-12T23:58:44Z
---

# Tree of Thoughts: Deliberate Problem Solving with Large Language Models - Study Notes

**Authors**: Shunyu Yao, Dian Yu, Jeffrey Zhao, Izhak Shafran, Thomas L. Griffiths, Yuan Cao, Karthik Narasimhan  
**Venue**: NeurIPS 2023; arXiv:2305.10601v2 [cs.CL]  
**Date**: December 3, 2023 (v2)  
**Pages**: 14  
**Code**: github.com/princeton-nlp/tree-of-thought-llm

## What It Is

Tree of Thoughts (ToT) is an inference-time framework that turns an LLM's intermediate reasoning into an explicit search space. Instead of sampling one left-to-right chain and accepting its early decisions, the system generates several coherent intermediate "thoughts," evaluates partial solutions with the LLM itself, and uses a tree-search procedure to keep, explore, prune, or revisit alternatives.

The paper positions ToT as a generalization of input-output prompting, chain-of-thought (CoT), self-consistency, and refinement. Its distinctive contribution is not merely sampling more answers: it introduces branching and evaluation *within* a reasoning process, where an intermediate thought can be an arithmetic operation, a writing plan, or a crossword entry.

## The Problem It Solves

Standard autoregressive decoding is token-level and irreversible. CoT gives an answer a useful sequence of intermediate steps, but follows one sampled path; self-consistency samples many full paths and can vote on a final answer, but does not reconsider a bad intermediate move. That is poorly matched to tasks in which an early choice can make the remaining problem impossible.

ToT adds deliberate search for problems that need exploration, lookahead, or backtracking. It is especially useful when a partial state is meaningful enough to assess, but not so large that generating several alternatives becomes incoherent or prohibitively expensive.

## How ToT Works

The paper frames a state as the input plus the thoughts selected so far. A ToT implementation makes four task-specific choices:

1. **Thought decomposition** — choose a useful unit of progress. It should be small enough to branch over but large enough for the model to judge. The experiments use an equation line for Game of 24, a paragraph-level plan for creative writing, and a crossword word for mini crosswords.
2. **Thought generation** — either sample independent next thoughts when the space is rich (for example, several writing plans), or ask the model to propose distinct candidates together when the space is constrained (for example, arithmetic moves).
3. **State evaluation** — prompt the model to assign each state a value such as `sure`, `likely`, or `impossible`, or to vote among competing states. Evaluation can use quick lookahead, constraint checks, or comparative judgment; it only needs to guide search usefully, not be perfect.
4. **Search** — use breadth-first search (BFS) to retain the best `b` states at each shallow step, or depth-first search (DFS) to follow promising candidates and prune/backtrack when a state fails a threshold.

This modularity is central: the base model, the thought granularity, generator, evaluator, and search policy can change independently. No extra model training is required.

## Evaluation Setup

The authors use GPT-4 at temperature 0.7 on three tasks chosen to expose the weakness of linear decoding:

- **Game of 24**: form 24 from four given numbers using arithmetic operations. ToT uses a three-step BFS and a value prompt that judges whether remaining numbers can reach 24.
- **Creative writing**: write four coherent paragraphs ending in four supplied random sentences. ToT samples five plans, votes for a plan, samples five passages from it, then votes again.
- **5x5 mini crosswords**: fill ten clues while respecting crossing-letter constraints. ToT uses DFS, confidence-ranked word proposals, impossibility-based pruning, and backtracking.

The paper compares direct input-output prompting, CoT, CoT self-consistency, and (where relevant) iterative refinement. It also reports ablations for beam width, pruning, backtracking, and an oracle final-state selection.

## Results That Stood Out

- **Game of 24**: GPT-4 with IO, CoT, and 100-sample CoT self-consistency solved 7.3%, 4.0%, and 9.0% of cases, respectively. ToT reached 45% with breadth 1 and 74% with breadth 5. Even the best of 100 independent CoT samples reached only 49%.
- **Creative writing**: ToT's mean GPT-4 coherence score was 7.56 versus 6.19 for IO and 6.93 for CoT. In a 100-pair blind comparison, humans preferred ToT over CoT 41 times, preferred CoT 21 times, and found 38 ties. Refinement helped both methods, with ToT plus refinement reaching 7.91.
- **Mini crosswords**: ToT achieved 78% letter accuracy, 60% word accuracy, and solved 4 of 20 games. CoT reached 40.6%, 15.6%, and 1 game. Removing backtracking dropped word accuracy to 20% and solved only one game.
- **Generation can be the bottleneck**: on Game of 24, GPT-3.5 ToT achieved 19% versus GPT-4 ToT's 74%. Swapping generation and evaluation models suggested strong candidate generation mattered more than evaluator quality for that task.

## My Takeaways

1. **Search should operate over semantic chunks, not tokens.** A thought is an engineering interface: it exposes a state the model can generate, inspect, and hand to a conventional search algorithm.

2. **More samples and structured search are different interventions.** Best-of-*k* CoT explores complete trajectories like a bandit. ToT spends its budget where partial evidence says it is useful, which can prevent repeatedly extending dead-end prefixes.

3. **An LLM evaluator is a heuristic, not an oracle.** The crossword experiment is a useful warning: valid solutions containing rare words can be pruned as impossible. The authors' oracle-state and no-pruning results show that weak evaluation can dominate the final outcome.

4. **Backtracking is not decorative.** The large crossword ablation drop makes the case that revising a committed intermediate choice, rather than simply generating more text, is the valuable operation.

5. **Use ToT selectively.** It is a cost-for-reliability trade: on tasks GPT-4 already handles well with CoT, the extra tree expansion may offer little value. On ambiguous or constraint-heavy planning problems, it gives an actionable control loop.

## What I Would Question

- The tasks are deliberately small and tailored to search. Results do not establish that ToT's manually designed thought units, prompts, and heuristics transfer cleanly to open-ended production work.
- The creative-writing metric uses GPT-4 to judge GPT-4 outputs, and the human study is limited to paper authors. Both make the reported coherence advantage less definitive than the arithmetic results.
- Cost rises substantially. For Game of 24, the reported ToT cost was $0.74 per case, versus $0.47 for the best of 100 CoT trials; creative-writing ToT cost about five times IO or CoT. Search-budget controls are a deployment requirement, not an optional optimization.
- The framework relies on a state representation with clear constraints and an evaluator that correlates with eventual success. When neither exists, the tree may amplify confident but unhelpful self-judgments.

## Vault Ideas Extracted

* [Tree of Thoughts](/vault/tree-of-thoughts.md)
