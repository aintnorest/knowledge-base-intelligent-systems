---
type: Study Note
title: 'Prompt Coach: An Empirical Evaluation of an Agentic Tutor for Learning Prompt Engineering in Software Development'
description: Personal study notes on Prompt Coach, an IDE-embedded multi-agent tutor that uses dimensional assessment and Socratic guidance to teach code-generation prompting.
resource: https://arxiv.org/abs/2607.06074v1
source: /archive/prompt-coach-agentic-tutor.pdf
tags: [multi-agent, prompting, llm-as-judge, orchestration, agents]
timestamp: 2026-07-13T16:16:19Z
---

# Prompt Coach - Study Notes

**Authors**: Rohit Mehra, Kapil Singi, Vikrant Kaulgud, Vibhu Saujanya Sharma, Swapnajeet Gon Choudhury, Swati Sharma, Adam P. Burden, and Majd Sakr  
**Venue**: Accepted for the ASE 2026 Industry Showcase; arXiv:2607.06074v1 [cs.SE]  
**Date**: July 7, 2026  
**Pages**: 7  
**Implementation/data**: Not publicly released because of organizational IP and confidentiality constraints

## What It Is

*Prompt Coach* (PC) is an IDE-embedded, multi-agent tutor for helping software developers write stronger code-generation prompts. Instead of showing a generic checklist or silently rewriting the prompt, it scores the current prompt on explicit quality dimensions and asks context-grounded Socratic questions that lead the developer to refine it.

The intended learning unit is not a detached prompting lesson. It is the developer's own prompt, in the surrounding project, while they are doing software work. PC therefore uses both codebase context and a private preview of what the target LLM would generate from the current prompt.

## The Problem It Addresses

Prompt engineering is interactive, task-dependent, and partly tacit: developers learn by specifying intent, inspecting the resulting code, noticing omissions, and revising. The authors argue that static tutorials, documentation, and courses are poorly matched to that loop. They are generic, slow to update, and cannot adapt to a particular developer's blind spots or a particular codebase.

The paper's baseline makes the gap concrete. Fifteen experienced professional developers (mean 9.6 years of development experience) wrote prompts that were generally clear, but often underspecified constraints, error handling, and relevant context. Programming experience had little relation to the baseline prompt-quality score (Pearson \(r=0.11\)), so prompt construction appears to be a separate practical skill rather than an automatic by-product of seniority.

## How Prompt Coach Works

PC is a VS Code extension implemented with CrewAI, Azure services, ChromaDB retrieval, and GPT-4.1. A tutoring orchestrator coordinates four roles:

1. **Project Context Understanding Agent** ingests code and available artifacts such as design notes, style guides, and requirements, then creates a project-specific vector-backed knowledge store.
2. **Prompt Evaluator Agent** judges a submitted code-generation prompt from 0 to 100 on eight dimensions: clarity, specificity, context awareness, adaptability, inclusion of constraints, error handling, output requirements, and testability. It supplies a short rationale for each score.
3. **Socratic Guidance Agent** turns weak dimensions into targeted questions rather than prescribed edits. It retrieves project context and consults a **Consequence Preview Agent**, which privately runs the same class of target LLM to expose likely failure modes. The generated code is deliberately hidden from the developer so that the system teaches prompt construction instead of handing over an answer.
4. **Developer Modeling and Tracking Agent** records which nudges are acted on and which dimensions repeatedly remain weak. Future guidance can emphasize persistent gaps and reduce attention to demonstrated strengths.

For example, a preview that mishandles an empty list can become a question about the desired empty-input behavior. The learner must decide whether the code should return a default, raise an exception, or do something else; the tool does not smuggle in the completed implementation.

## Evaluation and Results

The early study used a single-arm, within-subject remote design with 15 developers. Each participant completed three APPS tasks before learning, spent 60 minutes using PC with those prompts, then wrote prompts for three distinct APPS tasks without PC. Tasks spanned introductory, interview, and competition complexity. The authors scored both pre- and post-learning prompts with the same LLM-as-judge setup used by PC; post-study perceptions used 7-point Likert questions.

- Overall mean prompt quality rose from **63.04 to 71.69**, a **13.73%** relative improvement (paired Wilcoxon \(p < .001\)). Thirteen of 15 participants improved; the other two had no measurable average gain, and none had a meaningful decline.
- Improvements were significant at every tested task complexity: introductory 65.63 to 74.48, interview 62.56 to 69.05, and competition 60.66 to 71.34.
- The largest gains occurred where baseline prompts were weakest: inclusion of constraints (+31.63%, \(p < .001\)), error handling (+30.66%, \(p < .001\)), and context awareness (+23.61%, \(p = .002\)). Clarity was already high and essentially unchanged; adaptability increased by 4.02% but was not significant.
- All participants agreed that the learning improved their prompt-writing skills (mean 6.33/7). Most reported trust in the guidance (93.3% agreement), perceived personalization (86.7%), and willingness to adopt it in their normal workflow (86.7%).

## My Takeaways

1. **Expose a diagnosis, not just a rewrite.** Automated prompt optimization can improve an artifact, but it may not improve the operator. Dimension scores plus questions create a feedback loop the developer can internalize.

2. **A consequence preview is a powerful teaching signal when kept private.** Showing generated code would make the interaction faster, but can collapse a learning tool into a code-completion tool. Transforming observed failures into questions preserves learner agency.

3. **The quality dimensions make coaching inspectable.** Constraints, error handling, context, output contract, and testability give an actionable vocabulary for discussing a prompt. They also allow persistent weaknesses to drive personalized guidance.

4. **The reported effect is promising but not yet causal proof.** The test compares participants with themselves after a one-hour session, not against another tutor, ordinary practice, or direct prompt rewriting. The same LLM family served as both tutor infrastructure and quality judge, which increases the importance of independent validation.

## Questions and Limitations

- The sample is small, drawn from one organization, and uses one benchmark suite; it cannot establish generalization to diverse teams, production repositories, or non-code prompting.
- The study deliberately ran in isolation without the real project context that PC is designed to exploit. That controls mechanics but leaves the main grounding claim untested in ordinary work.
- Different APPS tasks were used before and after learning. The design avoids memorization but does not fully eliminate task-difficulty effects; a controlled comparison condition would better isolate the intervention.
- Prompt-quality outcomes rely on LLM-as-judge scoring with the same model and prompting setup as the evaluator. No human-rating correlation or downstream generated-code quality is reported.
- The unavailable implementation and data prevent reproduction or inspection of the rubric, prompts, retrieval behavior, and statistical analysis.
- The authors call for larger, longer studies that measure retention and downstream code quality, compare against traditional and GenAI tutors, and deploy in real projects.

## Vault Ideas Extracted

* [In-Flow Socratic Prompt Coaching](/vault/in-flow-socratic-prompt-coaching.md)
