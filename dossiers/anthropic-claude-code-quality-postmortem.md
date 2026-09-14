---
type: Study Note
title: "An update on recent Claude Code quality reports"
description: "Anthropic's postmortem on three March–April 2026 Claude Code regressions involving reasoning-effort defaults, repeated reasoning-history deletion, and an over-constraining verbosity prompt, plus changes to evaluation and rollout practice."
resource: https://www.anthropic.com/engineering/april-23-postmortem
source: /archive/anthropic-claude-code-quality-postmortem.html
tags: [agent-harness, coding-agents, evaluation, reliability, context-engineering, agents]
timestamp: 2026-09-14T17:13:50Z
---

# An Update on Recent Claude Code Quality Reports — Study Notes

**Publisher**: Anthropic  
**Published**: April 23, 2026  
**Format**: First-party engineering incident postmortem  
**Canonical URL**: https://www.anthropic.com/engineering/april-23-postmortem

## What It Is

Anthropic attributes a month of inconsistent Claude Code quality reports to three independent product-layer changes rather than a degradation in the API or inference layer: a lower default reasoning effort, a context-pruning bug after idle sessions, and a system-prompt instruction that constrained response length. The changes reached different traffic slices on different schedules, making the combined symptom look like a broad but irregular model regression. Anthropic says Claude Code, the Claude Agent SDK, and Claude Cowork were affected, while the API was not.

The post is unusually useful because it separates model capability from the harness that elicits and sustains it. Defaults, context retention, cache behavior, and system prompts each changed the effective product even though model inference itself was reportedly unchanged.

## Incident Timeline and Root Causes

### March 4–April 7: default reasoning effort reduced

When Opus 4.6 launched in Claude Code in February, Anthropic defaulted its reasoning effort to `high`. Some users then encountered very long-tail thinking latency, enough to make the UI appear frozen, alongside disproportionate token use and usage-limit consumption. Internal evaluations found that `medium` gave slightly lower intelligence but substantially lower latency on most tasks, so on March 4 Anthropic made `medium` the default for Sonnet 4.6 and Opus 4.6.

This was a deliberate product tradeoff, not a software defect. It optimized the default for latency and quota efficiency at the cost of some task quality. Startup notices, an inline effort selector, and the return of `ultrathink` made the setting more visible, but most users kept the default and continued reporting that Claude Code felt less intelligent. Anthropic reverted the decision on April 7. The post says Opus 4.7 now defaults to `xhigh`, while all other models default to `high`; lower settings remain available through `/effort`.

### March 26–April 10: stale-session pruning repeated every turn

Claude Code normally carries prior reasoning blocks forward so the model can retain why it made earlier edits and tool calls. To make an idle session cheaper to resume after its prompt cache had expired, Anthropic intended to clear older thinking once after more than an hour of inactivity, using the `clear_thinking_20251015` API header with `keep:1`, and then resume sending full reasoning history.

A state-management bug left that clearing behavior active for every subsequent turn in the process. Each request retained only the newest reasoning block and discarded earlier ones. A user message arriving during tool use could begin another turn under the broken flag and remove reasoning from the current turn too. The resulting progressive loss of rationale explains the reported forgetfulness, repetition, and odd tool choices. It also forced continuing cache misses; Anthropic says it believes those misses caused separate reports of unexpectedly fast usage-limit depletion.

Two unrelated experiments obscured reproduction: an internal-only server-side message-queuing experiment and a thinking-display change that suppressed the bug in most tested CLI sessions. The stale-session precondition further narrowed exposure. The defect passed human and automated code review, unit and end-to-end tests, automated verification, and dogfooding, and took more than a week to identify and confirm. Anthropic fixed it on April 10 in Claude Code v2.1.101. The affected models were Sonnet 4.6 and Opus 4.6.

### April 16–April 20: verbosity instruction suppressed coding quality

Ahead of Opus 4.7, Anthropic tuned the Claude Code harness to address that model's tendency toward verbose output. One system-prompt addition said:

> “Length limits: keep text between tool calls to ≤25 words. Keep final responses to ≤100 words unless the task requires more detail.”

Anthropic shipped the instruction on April 16 after several weeks of internal testing found no regressions in the evaluations then being run. During the incident investigation, line-removal ablations with a broader evaluation set exposed a reported **3% drop for both Opus 4.6 and Opus 4.7**. The prompt was reverted on April 20. The post says this issue affected Sonnet 4.6, Opus 4.6, and Opus 4.7, although it reports the measured ablation result only for the two Opus versions.

This is direct evidence that this particular length instruction, in combination with the surrounding prompt, harmed one unnamed coding evaluation. It is not evidence that concise responses are generally worse, that every word limit reduces intelligence by 3%, or that the same effect transfers to other models, prompts, tasks, or metrics.

## Resolution and User Remediation

Anthropic says all three issues were resolved by April 20 in v2.1.116. It reset usage limits for all subscribers on April 23. The post also states that the API and inference layer were immediately confirmed unaffected, but it does not publish the diagnostic evidence behind that conclusion.

## Evaluation and Rollout Changes

Anthropic commits to several changes aimed at the blind spots exposed by the incidents:

1. **Test the public artifact.** A larger share of internal staff will use the exact public Claude Code build rather than only a feature-testing build, reducing divergence between dogfooding and customer conditions.
2. **Broaden code-review context.** In a back-test, Opus 4.7 found the stale-session bug when given all required repositories, whereas Opus 4.6 did not. Anthropic is adding multi-repository context to its Code Review tool, improving the internal version, and plans to ship the improvement to customers.
3. **Gate every prompt change per model.** Every Claude Code system-prompt change will run against a broad per-model evaluation suite. Model-specific changes should be scoped to their intended model, reinforced by guidance added to Anthropic's `CLAUDE.md`.
4. **Keep line-level ablation and auditability.** Prompt lines will continue to be removed individually to localize effects, while new tooling makes prompt changes easier to review and audit.
5. **Escalate intelligence tradeoffs.** Changes that might exchange intelligence for another objective will receive soak periods, broader evaluation, and gradual rollout rather than immediate broad release.
6. **Preserve high-signal user reports.** Reproducible examples submitted through `/feedback` or public reports were ultimately necessary to isolate the failures. Anthropic created `@ClaudeDevs` on X and says it will mirror detailed updates in centralized GitHub threads.

## Analyst Takeaways

1. **Treat harness changes as capability changes.** A stable model endpoint does not imply a stable agent product. An effort default, context-retention policy, or one prompt line can materially change realized coding performance.
2. **Test state transitions, not only fresh sessions.** The context bug required an idle threshold and then compounded across later turns. Evaluation matrices need session age, resume behavior, cache state, messages during tool use, and multi-turn persistence—not merely clean-start task success.
3. **Dogfood the release candidate users actually receive.** Internal experiments accidentally masked the defect. A production-equivalent cohort is a separate requirement from broad internal use.
4. **Pair efficiency metrics with quality guardrails.** Lower latency, fewer uncached tokens, shorter answers, and fewer quota hits are useful only if task quality remains acceptable. Each incident came from locally plausible efficiency work whose quality cost was missed or accepted poorly.
5. **Version prompt policy by model.** The verbosity change targeted Opus 4.7 behavior but affected multiple model versions. Per-model gating prevents a fix for one model from becoming an untested global intervention.
6. **Make user reports joinable to configuration.** “Quality got worse” looked noisy because independent changes affected different slices. Incident analysis becomes faster when feedback can be segmented by client version, model, effort, prompt revision, session age, cache state, and experiment flags.

## Questions and Limitations

- This is a vendor-authored retrospective, not an independent audit. It provides no raw logs, evaluation artifacts, traffic allocation, incident counts, or user-impact rates.
- The reported 3% prompt-related drop lacks the evaluation name, metric definition, baseline, sample size, variance, and whether “3%” is relative or percentage-point change. It localizes a regression but does not establish its magnitude rigorously.
- Anthropic does not quantify the intelligence difference between `medium`, `high`, and `xhigh`, the latency or token savings that motivated the default change, or the share of users affected.
- The post does not map each of the three changes separately across Claude Code, Agent SDK, and Cowork, nor explain why the affected model lists differ.
- The claim that repeated cache misses drove usage-limit reports is explicitly stated as Anthropic's belief rather than a demonstrated causal estimate.
- The post names two experiments that masked the context bug but does not explain their assignment, interaction, or why production-equivalent end-to-end coverage did not expose the mismatch.
- Back-testing shows Opus 4.7 found the bug with complete repository context and Opus 4.6 did not in that case; it does not prove that model upgrade or more context will reliably catch this class of defect.
- The announced evaluation, soak, audit, and rollout controls are commitments. The source does not yet provide evidence of their effectiveness.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md) — add production-build dogfooding, feedback segmentation by harness configuration, and soak/gradual rollout as bridges between offline scores and user outcomes.
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md) — add the concrete failure mode where an Opus 4.7 verbosity intervention leaked across model versions, motivating mechanically enforced per-model prompt scope.
* [Context Collapse](/vault/context-collapse.md) — add repeated reasoning-history deletion after idle-session resumption as an operational context-collapse mechanism that degrades tool continuity and cache efficiency.
