---
type: Study Note
title: "SkillWeaver: Web Agents can Self-Improve by Discovering and Honing Skills"
description: "Web agents autonomously explore sites, turn successful Playwright trajectories into reusable Python APIs, then test and refine those APIs for reuse across agents."
resource: https://arxiv.org/abs/2504.07079v1
source: /archive/skillweaver-web-agent-skill-learning.pdf
tags: [agents, agent-skills, self-improvement, computer-use, tool-use, verification]
timestamp: 2026-09-24T03:43:40Z
---

# SkillWeaver: Web Agents can Self-Improve by Discovering and Honing Skills — Study Notes

**Authors**: Boyuan Zheng, Michael Y. Fatemi, Xiaolong Jin, Zora Zhiruo Wang, Apurva Gandhi, Yueqi Song, Yu Gu, Jayanth Srinivasa, Gaowen Liu, Graham Neubig, and Yu Su  
**Venue**: arXiv:2504.07079v1 [cs.AI]  
**Date**: April 9, 2025  
**Setting**: WebArena and four live websites from Online-Mind2Web

## What It Is

SkillWeaver treats an unfamiliar website as a place where a web agent can learn its own callable Playwright helpers. Its “APIs” are Python browser-automation functions, **not the site's server-side REST endpoints**. The agent explores a site without supervised demonstrations, proposes reusable short-horizon tasks, practices interactions, synthesizes successful traces into parameterized functions, and tests/refines those functions before adding them to a growing library.

The factory-level idea is to spend uncertain exploration once, distill stable portions into tested executable actions, and expose only applicable actions to subsequent workers. This differs from merely replaying a successful transcript: the function has arguments, stated preconditions, a usage log, and code that can be composed with other learned functions.

## Discovery, Synthesis, Honing

1. **Proposal**: A model sees screenshot, URL, site name, and accessibility tree and suggests novel capabilities not already covered. It favors procedural workflows, navigation, and information extraction. Tasks advance from simple site actions toward composition.
2. **Practice and reward**: A browser agent attempts each task. An LLM reward model sees the task, action trace and screenshots, execution results, and observable page changes to judge success. Code synthesis generalizes a successful trace into an async Playwright function; static analysis catches some generation mistakes. The function's docstring records arguments, prerequisite page state, and successes/failures.
3. **Honing**: The system invokes a new API in tests; for functions with arguments it generates representative values, then debugs failures. At inference, an API selector filters the large library for task relevance and unmet preconditions before revealing callable options to the agent.

Each site gets **160 exploration iterations**, where an iteration is an attempted proposed skill or a test of an existing one. The implementation uses GPT-4o for stronger exploration and agent execution and evaluates transfer to GPT-4o-mini. Exploration and eventual evaluation are site-specific: this is adaptation within a site, not proof that one site's selectors work on a different site.

## Results and Caveats in the Source

- On five WebArena sites, GPT-4o task success rises from **22.6% to 29.8%** (about **31.8% relative**); GPT-4o-mini rises from **9.2% to 14.1%** (about **54.3% relative**). The small model receives APIs synthesized with GPT-4o, showing transfer of procedural capability across models.
- On four live sites and **57** manually assessed tasks, mean success rises from **40.2% to 56.2%**, a **39.8% relative** gain. Domain outcomes vary: flight **11.7%→29.4%**, drug **65.0%→87.0%**, cooking **62.5%→75.0%**, and car **11.1%→11.1%**.
- The learned APIs are competitive with human-crafted API support on some sites but weaker where extensive official APIs already exist (notably GitLab and Maps). Later synthesized functions can compose earlier functions.
- The paper's WebArena table reports the average relative improvement as “↑32%,” while the abstract and conclusion say **31.8%**; these are compatible rounding. Section 4.1 mistakenly says **39.8% on WebArena**, but that number belongs to the live-site table. The table values, not that sentence, are used above.
- API invocation remains a bottleneck: agents sometimes fail to select a relevant learned function or supply the wrong parameter even when the function itself works. Reaching an intermediate browser state also need not satisfy the user's complete request.

## Analyst Takeaways

1. **Turn repeated website flakiness into narrow tested capabilities, not giant workflows.** A self-improving factory can harvest one action with stable selectors, explicit arguments and preconditions, a postcondition, and a short recorded failure history; then compose those pieces.
2. **Test the real invocation boundary separately from the body.** A function that passes an isolated unit test can still fail if a worker never selects it, selects it too early, or passes malformed arguments. Evaluate discovery, routing, parameter choice, and downstream outcome as separate contracts.
3. **Spend the stronger explorer's budget once where reuse is high.** Transfer to GPT-4o-mini suggests a way to amortize exploration over cheaper executors, conditional on the target model's ability to invoke the generated APIs.
4. **Restrict autonomous practice to authorized sandboxes.** Live-site exploration can create accounts, send messages, transact, or expose private data. The authors manually checked live actions and added safety instructions; neither substitute is a hard authorization boundary.
5. **Revalidate after site drift.** A Playwright procedure embeds assumptions about roles, text, structure, login state, and navigation. Versions and outcome checks are more useful than assuming once-passing code is permanent.

## Questions and Limitations

- The automatic reward model may misjudge task completion. WebArena has functional checks, but the 57 live-site tasks rely on manual trajectory assessment; uncertainty intervals and repeated-trial variance are not supplied.
- Only four qualifying live sites were chosen from a 300-task/136-site benchmark, a selection that limits claims about broad web generalization.
- The ablation does not fully isolate the benefit of proposal, synthesis, testing, retrieval, and exploration budget under equal cost.
- Learned web code can be brittle to site updates, ambiguous selectors, sessions, and dangerous side effects; this study does not establish permission controls for deployment.
- A library generated by one model can aid a weaker model, but observed routing/argument errors show that capability transfer is not the same as reliable skill use.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Executable Code Actions](/vault/executable-code-actions.md)
* [Self-Improvement Update Targets](/vault/self-improvement-update-targets.md)
