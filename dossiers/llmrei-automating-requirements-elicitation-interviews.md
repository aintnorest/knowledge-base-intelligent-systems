---
type: Study Note
title: "LLMREI: Automating Requirements Elicitation Interviews with LLMs"
description: A student role-playing study exposes the tradeoff between structured interview guidance and adaptive requirement discovery, with incomplete coverage, leading suggestions, and unsupported claims limiting autonomous elicitation.
resource: https://doi.org/10.1109/RE63999.2025.00013
source: /archive/llmrei-automating-requirements-elicitation-interviews.pdf
tags: [requirements-engineering, prompting, evaluation, reliability]
timestamp: 2026-10-05T23:18:21Z
---

# LLMREI — Study Notes

**Authors**: Alexander Korn, Samuel Gorsch, and Andreas Vogelsang.  
**Published**: arXiv version 1, July 3, 2025; conference publication September 2025.  
**Status**: Peer-reviewed paper in the *2025 IEEE 33rd International Requirements Engineering Conference (RE)*, pages 19–30. The archived source is arXiv:2507.02564v1, not the publisher PDF. [IEEE Computer Society metadata](https://www.computer.org/csdl/proceedings-article/re/2025/241300a019/2aFK4qcRhss) and [DOI metadata](https://www.semanticscholar.org/paper/LLMREI%3A-Automating-Requirements-Elicitation-with-Korn-Gorsch/87c518dae9e63ca5e90bc18ccc09feca259239b0) identify the same title and authors; the DOI is the source key.

## What It Is

A comparison of two GPT-4o interviewing policies for eliciting software requirements through conversation: minimal role and question-pacing guidance versus a detailed interview framework. The study evaluates **33 interviews with students role-playing stakeholders**, not 33 interviews with actual industrial stakeholders. Its contribution is an early feasibility test of conversational elicitation, not evidence that complete requirements engineering can be delegated to a chatbot.

## Problem and Motivation

Skilled interviews are expensive and inconsistent; limited analyst availability can exclude stakeholder perspectives. A conversational model might collect preliminary needs at scale, leaving human analysts to investigate complex, sensitive, or tacit concerns. But a fluent interview can still omit critical requirements or introduce the model's own assumptions into the apparent stakeholder intent.

## Mechanism as an Idea

The short policy establishes an active interviewer and bounds the number of questions per turn. The long policy supplies role, interview phases, question pathways, examples, and mistake-avoidance guidance drawn from requirements-interview literature. Its structure prioritizes introduction, topic coverage, probing, and a concluding summary.

The paper calls the long variant **least-to-most prompting**, but explicitly admits that it is not the original technique's within-task progression from easier to harder subproblems. It is session-level iterative prompt refinement informed by observed interview mistakes. Interpret its findings as a short-versus-guideline-rich policy comparison, not a clean test of canonical least-to-most reasoning.

Evaluation separates three constructs: perceived interviewer mistakes, recovery of scenario requirements, and question dependence on prior answers. Questions are labeled context-independent, parameterized, context-deepening, or context-enhancing. The last category introduces new possibilities; that can uncover neglected needs, but also lead the respondent.

A preliminary GPT-3.5 fine-tuning attempt used 50 retained transcripts from 70 historical student interviews, with full-data, split-data, and best-ten variants. It was abandoned before participant evaluation because responses became incoherent, unclear, off-purpose, or unexpectedly changed language. Data quality and model-generation differences are confounded; this is not a controlled demonstration that fine-tuning is inferior to prompting.

## Results / Admissions

- **Setting and denominators**: 17 long-policy and 16 short-policy interviews across salon (15) and ski-resort (18) scenarios. Participants were primarily computer-science students aged 20–30, native German speakers proficient in English. Sessions took about 30 minutes **including scenario reading and questionnaire completion**. The model was GPT-4o-2024-08-06. Neither production throughput nor analyst-time savings was measured.
- **Mistake ratings**: Across questionnaire responses, reviewers disagreed that a listed mistake occurred in **64.23%** of long-policy ratings and **59.1%** of short-policy ratings. These are aggregated perceptions, not objective error-free interview rates. The human comparison is **18 historical student-led interviews after mistake-based training**, not concurrent professional analysts. The authors describe similar performance, but this design does not establish professional equivalence.
- **Coverage remains partial**: The short policy recovered **60.94% fully elicited plus 12.76% partially elicited requirements**, totaling **73.7%**, against author-derived scenario lists of eight salon and twelve ski-resort requirements. These percentages describe the short-policy aggregate, not every interview and not 73.7% complete requirements. The long policy never recovered two salon requirements across its interviews; the short policy recovered each scenario requirement at least once across interviews, not necessarily together.
- **Adaptation versus structure**: Short-policy question proportions were **44.4% context-deepening and 15.3% context-enhancing**, versus **32.3% and 10.4%** for the long policy. Parameterized questions rose from **12.8% to 28.9%** with the long policy. The paper supplies proportions but no total question count in this table. More adaptive questioning is not necessarily less biased questioning.
- **Failure observations**: Suggestions sometimes steered conversation; hurried or uninterested participants caused the bot to skip planned coverage and end early. One interview produced an unsupported price estimate; another requested an email address for a follow-up meeting outside the intended scope. These are observed examples without estimated incidence rates.

## Analyst Takeaways

1. **Measure elicitation coverage separately from conversational quality.** Smooth rapport and fewer rated mistakes do not establish complete or faithful requirements. [What Prompts Don't Say](/dossiers/prompt-underspecification-what-prompts-dont-say.md) similarly separates the full acceptance set from the instructions used to obtain it.
2. **Question structure trades discovery against influence.** Detailed guidance reduces some interview mistakes but can crowd out context-specific probing. Creative suggestions should remain proposals to confirm, not be silently recorded as stakeholder-originated needs.
3. **Asking is not the same as acquiring intent.** [Clarification Need Decision](/vault/clarification-need-decision.md) concerns when and what to ask; this study adds the need to inspect whether answers and summaries actually preserve the owner's meaning.
4. **Use preliminary elicitation to focus accountable review.** [Kiro's requirements analysis](/dossiers/kiro-requirements-analysis.md) operates on a specification after needs have been expressed. Neither stage can establish tacit domain premises or authority simply by producing a convincing narrative.

## Questions and Limitations

- The methods first describe two reviewers reading each interview, but later state that requirement recovery was assessed **only from interview summaries**. It is unclear how transcript review and summary-only coverage scoring were reconciled; a summary can omit elicited details or add unsupported ones.
- The discussion claims no significant coverage difference between policies, but does not supply the corresponding test, uncertainty interval, or p-value. Do not treat the descriptive short-policy advantage as established superiority.
- Students have no real stake in the fictional systems and limited domain knowledge. Two simplified, familiar applications do not represent contentious multi-stakeholder or safety-critical elicitation.
- Human-derived mistake categories omit some LLM-specific failures, including overwhelming question batches. A fair comparison needs hallucination, suggestion influence, privacy, and summary fidelity measures as well as traditional interview errors.
- Text interaction lacks nonverbal cues that can reveal hesitation, conflict, or unspoken needs. Scaling the interview count is a proposed benefit, not a demonstrated resolution of those omissions.
- Corporate or self-hosted deployment is proposed as a privacy mitigation; it does not by itself prove that interview data are never retained or accessed.

## Vault Ideas Extracted

* [Domain-Grounded Requirements Review](/vault/domain-grounded-requirements-review.md)
* [Clarification Need Decision](/vault/clarification-need-decision.md)
