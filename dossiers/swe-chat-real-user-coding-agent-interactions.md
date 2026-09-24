---
type: Study Note
title: "SWE-chat: Coding Agent Interactions From Real Users in the Wild"
description: "Public opt-in coding-session dataset joining user prompts, agent traces, tool calls and attributed commits; measures code survival, collaboration cost, security warnings and pushback."
resource: https://arxiv.org/abs/2604.20779v1
source: /archive/swe-chat-real-user-coding-agent-interactions.pdf
tags: [coding-agents, agents, human-in-the-loop, evaluation, reliability, verification]
timestamp: 2026-09-24T03:45:40Z
---

# SWE-chat: Coding Agent Interactions From Real Users in the Wild — Study Notes

**Authors**: Joachim Baumann, Vishakh Padmakumar, Xiang Li, John Yang, Diyi Yang, and Sanmi Koyejo  
**Venue**: arXiv:2604.20779v1 [cs.AI], April 22, 2026  
**Material**: Living dataset of opted-in public Entire.io CLI session checkpoints, linked Git history and line-attributed code

## What It Is

A window into how real developers *interact* with coding agents, not merely whether an agent can close a curated issue. Developers explicitly install Entire.io's CLI checkpoint logger and push their logs to public branches. The resulting sample joins prompts, responses, tool events, code diffs and human-versus-agent line attribution. The authors analyze coding mode, code retained in commits, cost per committed line, security findings and user corrections. This is observational behavior among self-selected public users; it is not a randomized comparison of “vibe coding” and collaboration.

## Collection and Measurement

- At the April 2026 snapshot: about **6,000 sessions**, **205 public repositories** (more than 200), **13,000 checkpoints**, **63,000 user prompts**, **355,000 agent tool calls** and **2.7 million logged events**. Supported agents include Claude Code, OpenCode, Gemini CLI, Cursor and Factory AI Droid; about **85%** of the analyzed usage is Claude Code. Streamed events and a small set of extended-thinking traces are also included, but not all code outside checkpointed sessions.
- Classify prompt intent, user persona, user pushback and session success with LLMs chosen against **100 adjudicated human gold labels per task**, testing 9–11 models and multiple prompts. For human annotators, prompt-pushback κ is **0.832**, user-persona κ **0.662**, and continuous session-success agreement ICC(2,1) **0.503**. “Average success 82%” is an annotation of the transcript, **not** an independently executed task pass rate.
- Code mode depends on agent share of *committed* lines: **human-only 0% (22.7% sessions)**, **collaborative >0–<99% (36.5%)**, **vibe >99% (40.8%)**; the figure caption elsewhere says ≥99%, a slight boundary inconsistency. Agents write **55.8%** of all committed lines (mean of line attribution); mode assignment is conditional on attributable commits.
- “Coding efficiency” counts agent-produced lines retained in commits divided by total agent work, including agent self-overwrites. “Code survival” divides committed agent lines by the agent's *net* output, excluding its self-overwrites. These are not synonymous. Semgrep compares snapshots immediately before and after commits, limiting newly introduced/fixed findings to changed files; a finding is a rule hit, not a confirmed exploitable vulnerability.

## User Workflows and Intervention

- The largest specific user intent is **understanding existing code/behavior (19.0% of prompts)**, ahead of new-code requests (**13.4%**), git operations (**13.4%**) and debugging (**13.0%**); **26.6%** fall in “other.” About **33%** of tool calls execute bash commands, and **48%** read/edit/search files. Agents often explore before editing; one-shot patch tasks miss a large share of usage.
- The share of vibe sessions doubles from about **20% to >40%** over the observation window. Nonetheless expert-nitpicker behavior remains common even when users delegate all code authorship; users iteratively steer implementation rather than disappear from the workflow.
- For Claude Code turn-level analysis, agents proactively ask for clarification in roughly **1.1–2.6%** of turns across modes (**1.4%** human-only, **1.6%** collaborative, **1.1%** vibe). Users interrupt **3.3–6.0%**, and push back after roughly **39%** of turns; one summary calls interruption plus pushback **44%** of turns. Corrections dominate rejections and failure reports. The extreme **99.9th percentile** of turn duration grows beyond **100 minutes**, while median stays below one minute.

## What Gets Kept, at What Cost

- Across modes involving agents, **44.3% coding efficiency** versus **50.3% net-output survival**: most raw agent-written lines are not in user commits. Collaborative sessions record **38.2%/44.1%** efficiency/survival and vibe sessions **59.0%/64.6%**; higher retention under vibe coding could mean better targeting *or* less inspection.
- Per 100 committed lines, median token use in vibe sessions is **204,000**, about **3×** the collaborative median; median reported dollar costs are **$0.13 vibe, $0.05 collaborative, $0.07 human-only**. Median session time per 100 lines: **12.6 minutes vibe, 4.8 collaborative, 8.6 human-only**. These normalized metrics do not account for work outside logged sessions or task difficulty; low denominator (tiny commits) may be unstable.
- Newly introduced Semgrep security findings per **1,000 added lines**: **0.76 vibe**, **0.14 collaborative**, **0.08 human-only** (roughly 5× and 9× contrasts); fixed findings per 1,000 lines: **0.52**, **0.08**, **0.04**, respectively. The vibe mode has the largest positive introduced-minus-fixed gap (**+0.24/1,000 lines**). An example interpolates user input into `subprocess.run(..., shell=True)`; this is a concrete command-injection risk, not evidence that every warning was exploited.
- Approximately **90%** of sessions are LLM-scored at least **50/100** on overall success. Among the **50 lowest-rated** sessions, the authors note early interruption, irrelevant work and agent failure to deliver. That rating should not be converted to a 90% verified success rate.

## Analyst Takeaways

1. **Evaluate with real collaboration traces.** Include code-understanding requests, iterative corrections, incomplete specifications and multi-turn recovery; one-shot benchmark pass rates miss major workloads.
2. **Keep the human in a consequential loop.** Agents rarely ask while users frequently correct them. Put low-cost check-in points at scope decisions, destructive operations and the transition from exploration to implementation, rather than requiring a confirmation for every read.
3. **Distinguish retained *net* output from total effort.** A high code-survival fraction can hide cycles of self-rewrites; compare committed outcome with tokens, elapsed time, human effort and eventually maintenance.
4. **Use differential security checks and inspect severity.** The 0.76 versus 0.14 versus 0.08 Semgrep findings/1,000 lines warrant closer inspection of high-autonomy changes, but neither findings nor coding mode prove causation or exploitability.
5. **Cost-optimize for shared work rather than maximal autonomy.** In this sample, collaborative sessions have the shortest time and lowest reported dollar cost per committed line; trial a bounded HIL workflow on your actual tasks rather than infer a universal optimum.

## Questions and Limitations

- Public, licensed, opted-in Entire.io users are early adopters; the agent mix is heavily Claude Code; private, non-committed and unlogged work is under-observed.
- Users select tasks and interaction modes; mode labels derive from committed code and are not treatments. Counting per committed line also conditions on having a suitable nonzero denominator.
- LLM-annotated success/persona/pushback can disagree with experts (success ICC **0.503**); direct execution outcomes are not measured for every task.
- Semgrep detections include false positives and miss unseen vulnerabilities. The comparison counts changed-file findings, not security incidents or end-to-end exploitability.
- New commits can include code authored outside the agent session; attribution and deletion semantics may not reflect all developer effort or later maintainability.
- Privacy processing removes PII from prompts/responses via Presidio and searches for credentials via TruffleHog; those procedures reduce but do not guarantee absence of sensitive text in public logs.

## Vault Ideas Extracted

* [Clarification Need Decision](/vault/clarification-need-decision.md)
* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Repository-Relative Code Quality](/vault/repository-relative-code-quality.md)
