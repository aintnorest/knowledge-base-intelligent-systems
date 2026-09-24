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

## Skill-Based Self-Improvement by Update Target

"Skill-based self-improvement" covers different artifacts:

- **External executable library, frozen model**: VOYAGER and SkillWeaver.
- **The router**: SkillRouter.
- **Model weights for invoke/skip decisions over a fixed library**: Skill or Skip (via DPO).
- **Shared generator/solver weights**: Socratic-SWE uses trace-derived skills mainly to generate verified training exercises, then trains.
- **The runtime harness, model fixed**: Ecdysis.

Each has different rollback and evidence requirements. A light factory should try reversible, sandboxed skill and harness changes first, keep them distinct from model training, and measure whether each artifact transfers to held-out tasks. An improved benchmark score is not general self-evolution.

## Limitations

- Many real systems update more than one target, so taxonomy is not a substitute for an explicit causal ablation.
- Reversibility at the scaffold layer does not eliminate external side effects created while testing a change.
- Passing current tests cannot establish safety after distribution shift or adaptive attack.

## Sources

- [Self-Improvements in Modern Agentic Systems: A Survey dossier](/dossiers/self-improvements-modern-agentic-systems-survey.md) — formalizes agents as model parameters plus operational scaffold and organizes self-improvement by update target and feedback signal.
- [MemoHarness dossier](/dossiers/memoharness-agent-harnesses-experience.md) — supplies a concrete six-dimensional scaffold representation and diagnostic search loop.
- [VOYAGER: An Open-Ended Embodied Agent with Large Language Models dossier](/dossiers/voyager-lifelong-learning-agent.md) — frozen-weights executable library.
- [SkillWeaver: Web Agents can Self-Improve by Discovering and Honing Skills dossier](/dossiers/skillweaver-web-agent-skill-learning.md) — frozen-weights synthesized web APIs.
- [SkillRouter: Skill Routing for LLM Agents at Scale dossier](/dossiers/skillrouter-skill-routing.md) — trained router over a large skill registry.
- [Skill or Skip? Learning Selective Skill Invocation in Agentic Tasks via Dual-Granularity Preference Learning dossier](/dossiers/skill-or-skip-agent-skills.md) — DPO-trained invocation policy over a fixed library.
- [Socratic-SWE: Self-Evolving Coding Agents via Trace-Derived Agent Skills dossier](/dossiers/socratic-swe.md) — trace-derived skills that drive exercise generation and weight training.
- [Ecdysis: Efficient and Effective Training of Runtime Harnesses for LLM Agents dossier](/dossiers/self-evolving-agent-harness-ecdysis.md) — fixed task model with an edited, score-gated harness.
