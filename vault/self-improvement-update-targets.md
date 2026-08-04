---
type: Synthesis
title: "Self-Improvement Update Targets"
description: "A systems taxonomy for distinguishing model-parameter improvement from prompt, memory, tool, and full-scaffold improvement in agent feedback loops."
tags: [self-improvement, taxonomy, agents, governance, tool-use, agent-memory]
timestamp: 2026-07-22T00:32:30Z
---

# Self-Improvement Update Targets

An agent cannot be meaningfully described as self-improving until its update target is explicit. A foundation-model agent consists of a parameterized model and an operational scaffold: prompts, memory policies, tool interfaces, and control logic. A feedback loop may update the parameters, one scaffold component, or the full coupled scaffold; those choices have different reversibility, attribution, cost, transfer, and security properties.

## Taxonomy

| Update target | Typical loop | Strength | Main risk |
| --- | --- | --- | --- |
| Model parameters | Fine-tuning, distillation, reinforcement | Persistent and potentially broad transfer | Hard to attribute, revert, or revalidate |
| Prompt policy | Optimization, critique, evolution | Fast, inspectable iteration | Template overfitting or context bloat |
| Memory policy/content | Retrieval and consolidation changes | Retains task experience | Stale or poisoned knowledge becomes persistent |
| Tool interface/routing | Selection, wrappers, new tools | Changes reachable capabilities | Wrong authority or unsafe arguments |
| Full scaffold | Workflow, code, orchestration updates | Can repair cross-component failures | Large blast radius and weak causal attribution |

## Practical Use

Run fast, reversible scaffold experiments first. Version every proposed change; record its feedback, environment, policy impact, and expected scope; then gate it with functional, regression, and safety checks. Promote repeatedly validated behavior to a slower, more persistent form only after it transfers across held-out conditions.

Critics and evaluators are part of the system's attack surface. Separate proposal from admission where possible, constrain critic updates, and retain enough evidence to replay why a change was accepted. A self-modifying memory or tool wrapper deserves the same review discipline as a code patch.

## Limitations

- Many real systems update more than one target, so taxonomy is not a substitute for an explicit causal ablation.
- Reversibility at the scaffold layer does not eliminate external side effects created while testing a change.
- Passing current tests cannot establish safety after distribution shift or adaptive attack.

## Sources

- [Self-Improvements in Modern Agentic Systems: A Survey dossier](/dossiers/self-improvements-modern-agentic-systems-survey.md) — formalizes agents as model parameters plus operational scaffold and organizes self-improvement by update target and feedback signal.
- [MemoHarness dossier](/dossiers/memoharness-agent-harnesses-experience.md) — supplies a concrete six-dimensional scaffold representation and diagnostic search loop.
