---
type: Study Note
title: Executable Code Actions Elicit Better LLM Agents
description: Personal study notes on Wang et al.'s ICML 2024 CodeAct framework, which represents agent actions as executable Python to compose tools, retain intermediate state, and learn from execution feedback.
resource: https://arxiv.org/abs/2402.01030v4
source: /archive/executable-code-actions-llm-agents.pdf
tags: [agents, tool-use, fine-tuning]
timestamp: 2026-07-23T20:03:07Z
---

# Executable Code Actions Elicit Better LLM Agents - Study Notes

**Authors**: Xingyao Wang, Yangyi Chen, Lifan Yuan, Yizhe Zhang, Yunzhu Li, Hao Peng, and Heng Ji  
**Venue**: ICML 2024; arXiv:2402.01030v4 [cs.CL]  
**Date**: 2024  
**Pages**: 25

## What It Is

CodeAct makes executable Python the action language of a multi-turn LLM agent. Instead of emitting one text command or one JSON function call, the model writes a code cell that can call tools, store results in variables, branch, loop, compose package APIs, and print a final answer. An interpreter returns results or errors as the next observation.

The paper’s claim is interface-oriented: general-purpose code is already a familiar representation for code-pretrained models and provides explicit control flow and data flow that rigid one-call formats lack. It is not a claim that arbitrary generated code should run with unrestricted authority.

## The Interaction Loop

At each turn, an agent receives a user or environment observation, optionally reasons in natural language, emits Python, and receives execution output. The output may be a tool result, a value to reuse in a later call, or an error trace that supports self-debugging.

That enables a single action to express multi-tool computation such as lookup, filtering, conditional fallback, aggregation, and final rendering. It also lets the agent use ordinary packages such as pandas, SymPy, scikit-learn, SQLite, or plotting libraries rather than requiring a bespoke natural-language tool vocabulary for every task.

## Evaluation Evidence

The authors compare code, JSON, and text action formats in two settings.

- On repurposed API-Bank atomic calls, CodeAct was comparable to or better than the alternatives for most of the 17 tested models. This is a narrow test: the task calls one tool, so code’s control-flow advantage is mostly absent.
- M3 ToolEval is an 82-item human-curated benchmark requiring multiple tools across up to ten interaction turns. CodeAct was the best-performing format for 12 of 17 models and the lowest-turn format for 12 of 17. For GPT-4-1106-preview, it improved task success by 20.7 absolute points over the next-best text format while using 2.1 fewer turns on average.
- The absolute open-model gap remained large in zero shot: the best open model reached 13.4% on M3 ToolEval versus 74.4% for the best closed model in the paper’s comparison.

The authors create CodeActInstruct from about 7,000 selected multi-turn trajectories spanning web search, math with libraries, code self-debugging, tabular reasoning, and embodied planning. A Mistral-7B CodeActAgent trained on it reached 57.4 on in-domain MINT code actions and 32.4 on out-of-domain MINT, ahead of the paper’s compared open baselines while retaining general-task performance through a mixture with ordinary conversation data.

## What the Data Selection Teaches

The training set filters for executable actions, recovery after an initial error, and a valid agent-user interaction shape. It discards trajectories that fail parsing, only generate errors, or fail to answer the user. This is a useful example of treating execution feedback as a teaching signal rather than collecting only successful final answers.

However, the selection is also a source of bias: a model can learn the paper’s interpreter grammar and correction conventions without acquiring a portable notion of safe or useful tool execution.

## Analyst Takeaways

1. **A code cell is a compositional action container.** It can connect tool outputs through named state and ordinary control flow instead of forcing an orchestration layer to reconstruct the composition from many isolated calls.
2. **Execution output should be a first-class observation.** Errors, values, and artifacts enable repair only when the environment returns them in a usable, bounded form.
3. **The action language should match the tool surface.** Code is attractive when packages and dataflow are the real interface; a small typed call can be safer and clearer when an action has one narrow effect.
4. **Keep authority separate from expressiveness.** A flexible program representation needs sandboxing, package allowlists, resource limits, secrets isolation, and approval gates before it can operate outside a controlled environment.

## Questions and Limitations

- M3 ToolEval has 82 items, a fixed tool environment, a simple zero-shot prompt, and a ten-turn cap. Its score does not establish robust performance on a live service or a large tool catalog.
- Generated Python enlarges the attack and failure surface: imports, filesystem access, network access, subprocesses, resource exhaustion, and data exfiltration need policy enforcement outside the model’s output grammar.
- The paper’s code interface may benefit models with strong Python pretraining more than models trained on other languages or tool-call conventions.
- Its training data are synthetic trajectories from stronger models and selected task domains; generalization to unfamiliar packages, adversarial observations, and irreversible side effects is not demonstrated.

## Vault Ideas Extracted

* [Executable Code Actions](/vault/executable-code-actions.md)
