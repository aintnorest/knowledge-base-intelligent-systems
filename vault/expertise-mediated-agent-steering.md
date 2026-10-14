---
type: Synthesis
title: Expertise-Mediated Agent Steering
description: Task-specific knowledge enables humans to define requirements, recognize consequential errors, and steer recovery while delegating implementation to agents.
tags: [human-in-the-loop, coding-agents, verification, agents, evaluation]
timestamp: 2026-10-14T13:00:00Z
---

# Expertise-Mediated Agent Steering

Task-specific expertise makes delegation effective by supplying what an implementation agent cannot safely infer: the intended behavior, relevant constraints, signs of failure, and criteria for acceptance. The human need not perform every implementation step, but must be able to recognize consequential discrepancies and redirect the work. Occupational identity is not a substitute for this knowledge: a domain specialist can understand a task without being a programmer, while a programmer can be unfamiliar with its domain.

## Separate Three Responsibilities

- **Planning authority:** decide what problem to solve, which constraints matter, and what counts as completion. An agent may draft an approach without becoming the accountable decision maker.
- **Execution activity:** produce and change artifacts, run checks, and explore implementation choices. More agent actions do not necessarily mean more useful work or less human control.
- **Acceptance responsibility:** inspect evidence against requirements, decide whether the result is adequate, and direct repair when it is not. A passing test or user affirmation is evidence, not proof of production correctness.

A long plan need not authorize a long unattended run. Choose inspectable increments around consequential dependencies and the human's ability to detect and correct errors, rather than a fixed number of steps. Keep acceptance criteria visible and communicate human changes that invalidate the agent's working understanding. Use code inspection, behavioral checks, or domain-specific outputs according to the failure being tested; none is universally sufficient.

## Evidence and Its Interpretation

A qualitative study of 13 observed developers and 99 survey respondents found all observed participants controlling implementation in some form; 9/13 carefully reviewed every agentic change. Among 11 participants creating features, nine formed the design themselves and two revised an agent draft. The reported mean of per-participant execution averages was 2.1 steps per prompt, illustrating bounded delegation rather than establishing an optimal chunk size.

A separate observational analysis of approximately 400,000 sessions from 235,000 people attributed about 70% of planning decisions and 20% of execution decisions to users. Adjusted transcript-based verified success was about 15% for novice-rated sessions versus 28–33% for intermediate through expert. In sessions with strong failure evidence, it rose from about 4% for novices to 15% for experts. These associations are consistent with informed steering and recovery, not proof that expertise caused the difference.

The distinction from occupation matters: in code-changing sessions, inferred software-related occupations had 34% verified success versus 29% for other occupations, while at least partial success was 89% versus 88%. This does not establish occupational equivalence or make a job title an eligibility gate for agent use.

## Acquiring the Expertise That Steering Requires

Delegation can remove opportunities to acquire the knowledge that later acceptance and recovery depend on. In a randomized experiment with 52 developers learning an unfamiliar library, chat assistance lowered immediate unaided quiz performance (**d = 0.738, p = 0.010**) without a significant average task-time difference. The largest descriptive gap was in debugging, but that exploratory subarea analysis does not establish a separate causal effect on each skill. Unlike the observational agent-session evidence above, assignment to assistance was randomized; the study still does not show that a particular interaction pattern causes learning or that its results transfer to autonomous agents.

Preserve opportunities to explain behavior and diagnose failures, and assess unaided understanding separately from assisted completion. [Skill-Preserving AI Assistance](/vault/skill-preserving-ai-assistance.md) develops this distinction between cognitive engagement and ritual copying. A feedback loop in which delegation depletes future steering expertise is a long-run concern to investigate, not a demonstrated result of the short experiment.

Larger gains among people with lower prior proxies also do not establish higher final competence. A separate eligibility-threshold study found larger coding-share shifts among maintainers below median platform-status proxies; low- versus high-tenure estimates were **+11.2 versus +2.5 percentage points**. Those proxies and event-share changes do not measure task knowledge, learning, or safe unattended work. Relative activity gains can coexist with the higher absolute session success associated with expertise above: the studies concern different populations, technologies, and outcomes, not conflicting tests of the same ability construct.

## Limitations

The qualitative evidence is a preprint with short observation windows and recruitment favoring experienced, positively inclined agent users. The larger study is first-party observational research: expertise and success are inferred from the same transcripts using overlapping signals such as checking and correction, leaving shared classifier bias and reverse causation possible. Its verified-success proxy adds transcript-visible evidence to judged success; it does not establish deployment, maintainability, security, or realized value.

Neither study demonstrates causal productivity gains, an optimal oversight practice, or a universal autonomous chunk size. Their populations, tools, periods, and activity units differ, so steps per prompt and actions per prompt are not directly comparable. Expertise supports steering but does not guarantee correct requirements or complete verification.

## Sources

- [Professional Software Developers Don't Vibe, They Control: AI Agent Use for Coding in 2025 dossier](/dossiers/professional-developers-control-ai-agents.md) — qualitative arXiv v1 preprint with 13 observations and 99 surveys; documents design ownership, bounded execution, artifact checks, and selection-sensitive positive sentiment without causal productivity evidence.
- [Agentic coding and persistent returns to expertise dossier](/dossiers/anthropic-agentic-coding-returns-to-expertise.md) — Anthropic's June 2026 first-party transcript analysis separates planning from execution and associates task expertise with success and recovery across occupations; shared inference signals limit causal interpretation.
- [How AI Impacts Skill Formation dossier](/dossiers/how-ai-impacts-skill-formation.md) — preregistered randomized arXiv preprint on unfamiliar-library learning with GPT-4o chat assistance; immediate unaided quiz deficit and exploratory debugging/interaction findings, not long-run expertise depletion or autonomous-agent evidence.
- [Generative AI and the Nature of Work dossier](/dossiers/generative-ai-nature-of-work.md) — April 2025 working paper on GitHub Copilot eligibility and public activity; larger local task shifts among lower platform-proxy maintainers do not measure final competence or overturn expertise–success associations.
