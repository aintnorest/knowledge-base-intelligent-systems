---
type: Study Note
title: "VOYAGER: An Open-Ended Embodied Agent with Large Language Models"
description: "Minecraft agent that learns reusable executable skills through an automatic curriculum, execution feedback, and task-completion checks without updating model weights."
resource: https://arxiv.org/abs/2305.16291v2
source: /archive/voyager-lifelong-learning-agent.pdf
tags: [agents, agent-skills, self-improvement, tool-use, verification, long-horizon]
timestamp: 2026-09-24T03:43:40Z
---

# VOYAGER: An Open-Ended Embodied Agent with Large Language Models — Study Notes

**Authors**: Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi “Jim” Fan, and Anima Anandkumar  
**Venue**: arXiv:2305.16291v2 [cs.AI]  
**Date**: October 19, 2023  
**Setting**: MineDojo/Minecraft, high-level Mineflayer JavaScript control

## What It Is

VOYAGER is an embodied lifelong-learning agent whose improving artifact is **a library of executable programs**, not updated model parameters. A GPT-4 curriculum proposes progressively harder goals, GPT-4 generates code to achieve each goal, and a feedback loop runs, debugs, and verifies the code before storing it as a reusable skill. GPT-3.5 writes descriptions and auxiliary knowledge, while embeddings retrieve relevant earlier procedures.

The important transfer to software agents is the conversion of repeated, fallible model-generated action sequences into replayable code with a named interface. A stored function can compose previously learned functions; repeated execution need not regenerate the same low-level decisions. This is stronger than a transcript-as-example, although its behavior still depends on environmental preconditions and control APIs.

## The Three-Part Loop

1. **Automatic curriculum**: A GPT-4 prompt sees inventory, location, nearby entities, recent completions and failures, and additional GPT-3.5-generated context. It proposes achievable but novel tasks rather than following a fixed tech-tree script. Task diversity prevents spending every iteration on a single narrow goal.
2. **Skill library**: For each verified goal, the agent saves the JavaScript program as a skill. GPT-3.5 generates a description whose embedding indexes the program. To tackle a new goal, the system embeds a suggested task plan plus environment feedback and retrieves the top five relevant programs for GPT-4 to reuse or compose.
3. **Iterative code repair**: Generated code runs against Mineflayer primitives. The next prompt receives environment observations, interpreter exceptions, previous code, and a GPT-4 critic's completion judgment and corrective advice. The agent retries up to four code-generation rounds before asking the curriculum for another task. Only a self-verified completion admits the new program to the library.

The distinction between runtime feedback and the critic matters. An exception can reveal an invalid API; an inventory observation can show missing ingredients; neither alone proves that the task's intended outcome happened. Conversely, an LLM critic that infers success from inventory can be wrong: having rotten flesh does not necessarily prove this run killed a zombie.

## Evaluation and Results

- Within 160 prompting iterations, VOYAGER discovers **63 unique items**, reported as **3.3×** the compared methods, and traverses **2.3×** longer distances.
- It reaches wooden, stone, and iron tool milestones in **6 ± 2**, **11 ± 2**, and **21 ± 7** prompting iterations, respectively; the reported speedups over relevant baselines are **15.3×**, **8.5×**, and **6.4×**. It alone reaches the diamond milestone in the reported trials, succeeding in **1/3** runs at iteration 102.
- For four unseen crafting tasks in a fresh world with cleared inventory, the full agent succeeds **3/3** times on each within a 50-iteration cap. The no-library variant also solves three of the four in **3/3** trials, but takes more iterations; AutoGPT equipped with VOYAGER's library solves some tasks that unaugmented AutoGPT does not.
- Removing the automatic curriculum cuts discovered items by **93%** relative to the full agent; removing GPT-4 self-verification cuts them by **73%**. GPT-4 code generation yields **5.7×** more discovered items than the GPT-3.5 replacement. Removing the library causes later exploration to plateau.

Baselines are the authors' MineDojo adaptations of ReAct, Reflexion, and AutoGPT, not native implementations. Three trials per milestone or transfer task leave substantial uncertainty around the exact speedups.

## Analyst Takeaways

1. **Promote a flaky flow only after it has an executable contract and an observed success condition.** Capture inputs, environment assumptions, approved operations, and an outcome check; rerun the resulting function before treating it as a reusable skill.
2. **Separate discovery from replay.** Use an expensive model for exploration and repair, then reuse the validated procedure as code, with a small routing description and on-demand body. This is a plausible cost-saving pattern, not a measured cost result for software factories in this paper.
3. **Preserve repair evidence.** Interpreter errors and state changes identify where a skill failed; a generic success label alone cannot teach reliable preconditions or distinguish a broken selector/API from a missing prerequisite.
4. **Do not equate an LLM completion judgment with a deterministic oracle.** A human-in-the-loop factory should prefer tests, artifact state, and explicit approvals for consequential code or side effects before admission to a shared skill library.
5. **Test transfer rather than merely counting stored skills.** A library's value is whether another run, world, model, or agent can retrieve and execute it without re-learning or contaminating unrelated tasks.

## Questions and Limitations

- The work uses high-level JavaScript controls and textual world state; it does not solve raw visual perception or low-level Minecraft control. Transfer to repository maintenance or volatile browser DOMs is an engineering hypothesis.
- GPT-4 access was reported as **15×** the cost of GPT-3.5 at the time. The paper does not supply a production cost-per-validated-skill analysis.
- A model-generated critic can admit false success or reject real success. The authors also observe hallucinated impossible objectives and invalid code/API calls.
- Execution of generated code and accumulated programs demands sandboxing, permissions, versioning, and rollback in a real factory; the Minecraft setting does not establish those controls.
- The retrieved top-five skill design is not tested against modern large or highly overlapping skill registries. It demonstrates a small, growing library rather than general routing at scale.

## Vault Ideas Extracted

* [Executable Code Actions](/vault/executable-code-actions.md)
* [Self-Improvement Update Targets](/vault/self-improvement-update-targets.md)
