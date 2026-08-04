---
type: Study Note
title: ReAct: Synergizing Reasoning and Acting in Language Models
description: Personal study notes on the ICLR 2023 paper that interleaves language-model reasoning, tool actions, and environment observations for grounded question answering and interactive decision making.
resource: https://arxiv.org/abs/2210.03629v3
source: /archive/react-synergizing-reasoning-and-acting.pdf
tags: [agents, tool-use, reasoning, retrieval]
timestamp: 2026-07-13T00:05:37Z
---

# ReAct: Synergizing Reasoning and Acting in Language Models — Study Notes

**Authors**: Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao  
**Venue**: ICLR 2023; arXiv:2210.03629v3 [cs.CL]  
**Date**: March 10, 2023  
**Pages**: 33

## What It Is

ReAct is a prompting paradigm in which an LLM alternates free-form **thoughts**, task-specific **actions**, and resulting **observations**. Thoughts keep a high-level plan, interpret evidence, track subgoals, and recover from surprises; actions retrieve information or change the environment; observations ground the next thought.

The paper evaluates few-shot ReAct with PaLM-540B on knowledge-intensive QA and fact verification (HotpotQA and FEVER), then on long-horizon interactive tasks (ALFWorld and WebShop). It is the primary paper behind the ReAct pattern, not a survey description of it.

## The Problem It Addresses

Reasoning-only chain-of-thought can form a useful plan but relies on frozen parametric knowledge. That makes it prone to hallucinated facts, stale knowledge, and an inability to check the world. Action-only agents can query or manipulate an environment, but lack an explicit working record of what the observations mean and what subgoal comes next; they can repeat failed actions or pursue an incoherent search.

ReAct turns language itself into part of the action space. A thought changes the model's context but not the environment; a tool action changes or queries the environment and produces an observation. The alternation creates a closed loop: reason to select a targeted action, then use the observation to revise the reasoning.

## How the Pattern Is Instantiated

For HotpotQA and FEVER, each trajectory uses dense thought-action-observation steps. The authors' small Wikipedia API has `search[entity]`, `lookup[string]`, and `finish[answer]` actions. Useful thoughts decompose a multi-hop question, state what an observation establishes or fails to establish, reformulate a search, perform small inferences, and synthesize the final answer.

For decision tasks with many actions, thoughts are intentionally sparse and appear where they add control value: decompose the goal, use commonsense to select likely locations, mark a subgoal as completed, or choose the next subgoal. The model decides when to emit thoughts rather than being forced to narrate every action. This sparse form beat an ablation that injected only dense, environment-derived "inner monologue" feedback.

The practical prompt shape is:

```text
Thought: What evidence or state change is needed next?
Action: Call one bounded tool or environment command.
Observation: Record the returned evidence or state.
Thought: Interpret that result; update the plan, reformulate, or finish.
```

The paper's approach is few-shot: humans annotate trajectories by writing thoughts over successful actions. It uses six exemplars for HotpotQA, three for FEVER, and two or three task-specific ALFWorld trajectories depending on the prompt condition.

## Important Results

- On PaLM-540B, ReAct beat action-only prompting on both knowledge tasks: 27.4 vs. 25.7 exact match on HotpotQA and 60.9 vs. 58.9 accuracy on FEVER. It was slightly below CoT on HotpotQA (29.4) but above it on FEVER (56.3).
- Combining parametric and external knowledge was strongest: ReAct followed by CoT self-consistency reached 35.1 HotpotQA EM, while CoT self-consistency followed by ReAct reached 64.6 FEVER accuracy. The fallback decision matters: use ReAct when CoT samples disagree, or use CoT when ReAct exhausts its step budget.
- Human inspection of HotpotQA trajectories found fewer false positives for ReAct than CoT (6% vs. 14%), and no hallucination category among ReAct's sampled failures versus 56% for CoT. ReAct instead paid for groundedness with retrieval and reasoning failures: 23% of its sampled failures involved non-informative search results and 47% involved reasoning errors, including loops.
- With 3,000 correct ReAct-generated trajectories for fine-tuning, ReAct became the best of the compared Standard, CoT, Act, and ReAct methods. The authors argue that learning how to access evidence generalizes better than fine-tuning a model to memorize factual answers.
- In ALFWorld, the best of six ReAct prompts achieved 71% average success, versus 45% for the best action-only prompt and 37% for the reported BUTLER baseline. On WebShop, one-shot ReAct reached 40.0% success versus 30.1% for Act and 29.1% for the imitation-learning baseline.

## What I Take From It

1. **A thought is a control state, not a required narration.** Its highest value is preserving a decision-relevant belief: what has been verified, what failed, which subgoal is complete, and which action is justified next. Long or constant self-talk can consume context without adding control.

2. **Evidence retrieval needs an explicit interpretation loop.** Search alone did not solve the QA tasks reliably. ReAct's advantage comes from stating the missing relation, selecting the next query, and checking whether the returned text actually supports the conclusion.

3. **Grounded and flexible reasoning are complementary.** External evidence reduced hallucinated factual traces but constrained the model into a brittle tool trajectory. A confidence-gated fallback between retrieval-grounded ReAct and internal self-consistency is more useful than treating either as a universal winner.

4. **Editable intermediate state is a practical alignment handle.** In one ALFWorld example, a person fixed a failed trajectory by deleting a hallucinated thought and adding a better search hint. That changed downstream behavior without parameter updates. This is only useful when the system exposes and validates the state safely.

## Questions and Limitations

- The results use PaLM-540B and task-specific, manually written few-shot demonstrations; results may depend heavily on model capability, tool grammar, and exemplar quality. The authors supplied limited GPT-3 validation, not a broad cross-model study.
- ReAct can loop, issue weak search queries, or fail to recover from uninformative observations. The paper notes that greedy decoding may contribute; it does not supply a general recovery policy.
- The Wikipedia API is deliberately simple and weaker than modern retrieval systems, while ALFWorld and WebShop are constrained benchmarks. Real tools introduce authentication, side effects, adversarial content, and much harder error handling.
- Interpretable traces are not automatically faithful accounts of a model's internal computation. They are useful operational state, but should not be treated as proof that an answer or action is justified without independently checking the cited observations.
- Connecting an LLM to real actions expands the risk surface. The paper limits its experiments to bounded environments; production systems need permission scopes, tool-level validation, budgets, and audit trails.

## Vault Ideas Extracted

* [ReAct Framework](/vault/react-framework.md)
