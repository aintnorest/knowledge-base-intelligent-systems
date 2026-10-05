---
type: Study Note
title: "Professional Software Developers Don't Vibe, They Control: AI Agent Use for Coding in 2025"
description: Field observations and a qualitative survey show experienced developers preserving design authority through bounded agent execution, contextual instructions, and active verification, without establishing a causal productivity gain.
resource: https://arxiv.org/abs/2512.14012v1
source: /archive/professional-developers-control-ai-agents.pdf
tags: [coding-agents, human-in-the-loop, verification, code-quality, agents]
timestamp: 2026-10-05T21:48:37Z
---

# Professional Software Developers Don't Vibe, They Control — Study Notes

**Authors**: Ruanqianqian (Lisa) Huang, Avery Reyna, Sorin Lerner, Haijun Xia, and Brian Hempel  
**Published**: December 16, 2025; archived arXiv revision 1. Observations ran August 1–October 3, 2025; analyzed survey responses were submitted August 18–September 23, 2025.  
**Status**: Empirical qualitative arXiv preprint. No peer-reviewed publisher DOI or accepted venue was established for this ingest; a later arXiv revision exists, but this note describes the archived v1.

## What It Is

A study of **13 observed developers** and **99 survey respondents**, each with at least three years of professional software-development experience and prior agent use. It asks why they use coding agents, how they control them, which tasks they consider suitable, and how they feel afterward. The central finding is deliberate collaboration rather than relinquishing responsibility: developers delegate production of code while retaining authority over design, scope, and acceptance.

The title is a conclusion about this recruited sample and the authors' narrower definition of *vibe coding*—trusting the agent without careful oversight—not a population-wide finding that professionals never use AI casually.

## Problem and Motivation

Autonomous patch benchmarks and online claims of hands-off development do not explain the actual work of directing agents inside a professional workflow. Speed matters, but so do correctness, readability, maintainability, stakeholder requirements, and integration with existing software. A developer can enjoy generated code while still spending substantial effort reviewing and repairing it.

Each observed session comprised about **45 minutes of work and 30 minutes of interview**, on a participant-chosen task using their normal tools. Five tasks involved production work, three exploratory work, and five side projects; five were outside the participant's professional domain. The study therefore captures realistic interaction fragments, not full delivery lifecycles.

## Mechanism as an Idea

The observed control loop combines four responsibilities:

1. **Own the design boundary.** All 11 participants creating features controlled their design: nine formed the design themselves and two revised an agent's draft. An agent can propose alternatives without becoming the accountable decision maker.
2. **Translate expertise into task context.** Prompts supply domain objects, relevant files, intended behavior, requirements, libraries, and purpose. Specificity reduces ambiguity; simply adding more prose is not an evaluated intervention.
3. **Delegate inspectable increments.** Long plans need not authorize long autonomous runs. Participants with plans of **70 and 71 steps** restricted execution to at most **six and five steps**, respectively, before checking results. Across participants, the mean of per-participant executed-step averages was **2.1 steps per prompt**.
4. **Close the loop with artifact evidence.** Developers read changes, inspect UI behavior, execute tests, use lint feedback, intervene, and preserve rollback points. Human edits sometimes must be explicitly communicated so the agent's conversational model of the code remains current. Parallel work uses familiar version-control comparison and integration rather than assuming independent agents produce compatible changes.

Control is not synonymous with reading every line. Three participants in unfamiliar domains monitored program outputs rather than necessarily reading generated code; one used the agent to explain architecture while doing refactoring personally. All still exercised skeptical intervention. One explanatory agent unexpectedly edited a file its user was already changing, illustrating that role intent is not an enforced write boundary.

## Results and Admissions

**Observed and reported behavior, not controlled productivity measurements:**

- All **13** observed participants controlled implementation in some form; **9/13** carefully reviewed every agentic change. **50/99** survey respondents mentioned driving architecture or design requirements, although control was not explicitly asked about.
- **67/99** survey respondents mentioned software-quality attributes; **65/99** mentioned their engineering expertise as useful for agent use. Code modification averaged **3.0/5**, where 1 meant never and 5 always—approximately half the time on the response scale, not a measured fraction of code lines.
- Respondents rated task suitability **4.73/6** and enjoyment **5.11/6**. Recruitment intentionally favored experienced agent users, making positive sentiment especially selection-sensitive.
- Among respondents mentioning particular tasks, suitable:unsuitable counts were **33:1** for small straightforward tasks, **28:2** for following defined plans, and **19:2** for writing tests. Counts were **13:23** for high-level planning, **3:17** for legacy/existing-code integration, **2:15** for business/domain logic, and **5:23** for one-shot code without modification or verification. These are coded opinions among mentioners, not benchmark success rates or denominators of 99 attempted tasks.
- **4/13** observation participants and **31/99** survey respondents used multiple agents. The paper describes task parallelization and complementary roles, not a causal comparison with single-agent workflows.

Task categories use an author-selected **2.5:1** suitability ratio and report codes mentioned in at least five surveys. The method surfaces disagreements rather than establishing a universal task frontier. Perceived acceleration—including an anecdotal three-day migration versus an imagined two-week manual effort—is not timed counterfactual evidence. The authors explicitly admit that observed practices may not be optimal and require controlled validation before calling them productivity best practices.

## Analyst Takeaways

1. **Separate planning authority from execution volume.** A large plan can coexist with small inspected work units. The useful boundary is what can be understood and corrected before dependent decisions accumulate, not a universal two-step limit.
2. **Measure oversight as work.** Prompting, review, repair, and updating shared understanding can consume the apparent generation-speed gain. Positive enjoyment and perceived productivity do not establish net acceleration.
3. **Control has multiple evidence surfaces.** A UI check and a line-by-line code review answer different questions. The [human-centered coding-agent research agenda](/dossiers/humans-missing-ai-coding-agent-research.md) makes task alignment, steerability, verifiability, and adaptation distinct capabilities; this study supplies concrete interaction examples rather than proving those interventions effective.
4. **Do not generalize software expertise into an occupational gate.** [Anthropic's later transcript study](/dossiers/anthropic-agentic-coding-returns-to-expertise.md) associates task-specific expertise with success across occupations. The sources support informed steering, but differ in population, period, and measurement; neither proves that a coding job title is necessary or that domain knowledge alone guarantees maintainable production software.

## Questions and Limitations

- The invited survey drew **249 responses from 4,141 invitations**, about 6%; 104 passed screening, and five were later removed for suspiciously similar AI-generated answers. Public GitHub activity and AI/ML-heavy recruitment limit representativeness.
- The observations included **12 men and one woman**; the survey **97 men, one woman, and one undisclosed gender**. Survey experience averaged **12.8 years**, with a median of 10, but was not manually verified as observation experience was.
- Short sessions cannot establish long-run maintenance outcomes, full lifecycle success, or causal effects of oversight. The study does not compare novices and experts under matched tasks.
- Coding was negotiated to agreement rather than evaluated with inter-rater reliability. AI assisted translation, task clustering, and quote retrieval; final suitability coding was manual, after an attempted smaller-model coding approach proved inadequate.
- Broad summary language that developers avoid complex tasks and business logic should be read alongside minority positive reports and disputed planning suitability. Even the finding of control does not imply universal code inspection.
- These observations concern late-2025 tools and models. Larger autonomous chunks may become practical without removing the need to understand and accept consequential outcomes.

## Vault Ideas Extracted

* [Expertise-Mediated Agent Steering](/vault/expertise-mediated-agent-steering.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
