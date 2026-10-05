---
type: Synthesis
title: Expertise-Mediated Agent Steering
description: Task-specific knowledge enables humans to define requirements, recognize consequential errors, and steer recovery while delegating implementation to agents.
tags: [human-in-the-loop, coding-agents, verification, agents, evaluation]
timestamp: 2026-10-05T21:56:50Z
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

## Limitations

The qualitative evidence is a preprint with short observation windows and recruitment favoring experienced, positively inclined agent users. The larger study is first-party observational research: expertise and success are inferred from the same transcripts using overlapping signals such as checking and correction, leaving shared classifier bias and reverse causation possible. Its verified-success proxy adds transcript-visible evidence to judged success; it does not establish deployment, maintainability, security, or realized value.

Neither study demonstrates causal productivity gains, an optimal oversight practice, or a universal autonomous chunk size. Their populations, tools, periods, and activity units differ, so steps per prompt and actions per prompt are not directly comparable. Expertise supports steering but does not guarantee correct requirements or complete verification.

## Sources

- [Professional Software Developers Don't Vibe, They Control: AI Agent Use for Coding in 2025 dossier](/dossiers/professional-developers-control-ai-agents.md) — qualitative arXiv v1 preprint with 13 observations and 99 surveys; documents design ownership, bounded execution, artifact checks, and selection-sensitive positive sentiment without causal productivity evidence.
- [Agentic coding and persistent returns to expertise dossier](/dossiers/anthropic-agentic-coding-returns-to-expertise.md) — Anthropic's June 2026 first-party transcript analysis separates planning from execution and associates task expertise with success and recovery across occupations; shared inference signals limit causal interpretation.
