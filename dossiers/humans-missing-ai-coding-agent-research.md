---
type: Study Note
title: "Position: Humans are Missing from AI Coding Agent Research"
description: "Research agenda that treats task alignment, steerability, human verifiability and adaptation as distinct coding-agent capabilities beyond autonomous task resolution."
resource: https://arxiv.org/abs/2608.12355v1
source: /archive/humans-missing-ai-coding-agent-research.pdf
tags: [coding-agents, agents, human-in-the-loop, evaluation, verification, agent-memory]
timestamp: 2026-09-24T03:45:50Z
---

# Position: Humans are Missing from AI Coding Agent Research — Study Notes

**Authors**: Zora Zhiruo Wang, John Yang, Kilian Lieret, Alexa Tartaglini, Valerie Chen, Yuxiang Wei, Zijian Wang, Lingming Zhang, Karthik Narasimhan, Ludwig Schmidt, Graham Neubig, Daniel Fried, and Diyi Yang  
**Venue**: arXiv:2608.12355v1 [cs.HC]; PDF header dates this version July 4, 2026  
**Genre**: Position paper with supporting SWE-bench Verified patch analyses, not a deployed intervention study

## What It Is

The authors argue that coding-agent research overweights solo task completion and undermeasures usefulness in a human developer's actual loop. They distinguish four interaction capabilities: **task alignment** (infer and revise what this user means), **steerability** (offer consequential control points and respond to interventions), **verifiability** (make the artifact legible enough for a human to judge), and **adaptability** (improve across sessions without forgetting prior capabilities). These dimensions can be measured separately; autonomous benchmark resolution is not a proxy for all four.

## Proposed Human–Agent Contract

1. **Task alignment**: compare agent-inferred task specification with human-intended constraints; ask when critical under-specification can only be resolved by the user. The proposal's intent-similarity equation does not yet supply a reliable instrument for eliciting latent human intent.
2. **Steerability**: segment work into decision-bearing intervals and offer control points at trade-offs or branch choices. Test whether an intervention actually changes the subsequent trajectory toward the user's intended alternative; structural agreement with an expert's control-point segmentation is only a diagnostic proxy.
3. **Verification**: measure agreement between a human's judgment of a deliverable and a defensible reference judgment, not the number of tests produced. Adapt evidence to the task—render a web page, display a data-pipeline summary or loss curves, record a CLI interaction, and include execution/tests where appropriate. If the same agent writes both implementation and tests, review whether the tests capture independent requirements.
4. **Adaptability**: evaluate later sessions against the same user's evolving preferences and repository practices, including conflict resolution and regression preservation; simply retaining a Markdown instruction file is not evidence that it improved future collaboration.

## Supporting Patch Analysis

- On **successfully resolved** SWE-bench Verified tasks, cleaned agent patches (test, non-Python and newly created files excluded) tend to exceed the corresponding human “gold” patch in character count. The source calls a patch bloated if this ratio is **>1.5**; every studied model has a bloated-patch fraction **>15%**, with a positive trend against model release date. The paper does not establish that a shorter gold patch is always the best implementation.
- Two LLM judges label reasons among *already longer, resolved* patches: verbose implementation around **57–60%**, scope creep **51–66%**, overly defensive code **19–34%**, excessive documentation **19–28%**, and overengineering **9–12%**, depending on judge. These are labels from models whose rubric assumes the gold patch is minimal and optimal—not independently verified defect rates.
- On resolved task patches, **Claude Haiku 4.5 flags 66%**, **GPT-5 mini flags 62%**, and **both flag 57%** as functionally discrepant from the gold patch. The paper reports **>50%** for every tested solver, around one-third with standard-behavior or edge-case differences, roughly **20%** missing gold functionality and **>10%** unrelated changes. A *discrepancy from one reference* can be a valid alternative or reveal an ambiguous specification; this is not a measured 57% wrong-answer rate. Passing tests alone did not settle behavior equivalence.

## Infrastructure Agenda

- Collect realistic, privacy-preserving human interactions and build diverse user simulators conditioned on expertise, preferences, instruction clarity and mid-task changes; validate simulated behavior against real users instead of assuming homogeneous cooperative users.
- Offer task- and user-shaped oversight artifacts and measure the *cost* of interpreting them. More explanations, tests or alerts can increase cognitive burden without improving judgment.
- Define metrics for turns to recover intent, intervention frequency and effectiveness, human verification effort, collaboration quality and later satisfaction; put them beside task resolution, not inside a single opaque score.
- Extend the loop beyond software engineering to agent-written programs controlling finance, homes or physical systems, where effects may be hard or impossible to undo by a Git revert.

## Analyst Takeaways

1. **Measure meaningful human control.** Ask whether the human can intervene before a high-cost choice and whether the agent incorporates the correction, rather than count review prompts.
2. **Pick verification artifacts by the outcome.** Code diffs and unit tests are useful but not sufficient to assess visual design, deployed behavior, persistent data or tacit intent; make the result inspectable by its actual user.
3. **Treat bloat and reference mismatch as review queues.** Question unnecessary abstraction, scope creep and edge-case divergence in passing patches, but allow justified differences from a particular reference.
4. **Run a multi-session HIL evaluation.** A light factory should test whether repository-specific guidance survives into future tasks and whether user corrections reduce future friction without causing drift elsewhere.

## Questions and Limitations

- The four dimensions and equations are proposed constructs; no end-to-end experiment demonstrates that optimizing them causes better deployment outcomes.
- Human intent is partly implicit, contested and changing; gold judgments and user simulators can encode one evaluator's preferences.
- Gold patch length is a fallible quality standard. The judge prompt explicitly assumes the human patch is minimal and optimal, and the two-judge “agreement” is not a human validation of defect labels.
- Conditioning on successfully resolved SWE-bench cases excludes failures; Python-only patch cleaning and a finite model/release set constrain generalization.
- Oversight is costly, and more interrupts can impair autonomy; the paper poses but does not resolve the optimal intervention schedule or the required independent evidence level.

## Vault Ideas Extracted

* [Clarification Need Decision](/vault/clarification-need-decision.md)
* [Repository-Relative Code Quality](/vault/repository-relative-code-quality.md)
