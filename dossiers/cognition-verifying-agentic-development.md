---
type: Study Note
title: Verifying Agentic Development at Scale
description: Cognition's first-party account of cloud computer-use testing with source-grounded plans, expectation-before-action assertions, replayable evidence, and deterministic setup skills proposed back as pull requests.
resource: https://cognition.com/blog/testing-development
source: /archive/cognition-verifying-agentic-development.html
tags: [agents, coding-agents, computer-use, verification, agent-skills, human-in-the-loop]
timestamp: 2026-09-24T03:45:40Z
---

# Verifying Agentic Development at Scale — Study Notes

**Author**: Ido Pesok  
**Publisher**: Cognition  
**Date**: May 29, 2026

## What It Is

Cognition describes Devin testing its own software changes in cloud virtual machines, exercising an application by computer use and returning inspectable evidence instead of simply claiming that a PR works. More Devin sessions reportedly begin asynchronously—through events, schedules, automations, or other Devins—than interactively. The motivation is clear: a higher volume of proactive PRs makes manual reproduction of every change a bottleneck, while a clean code review alone does not establish that the running application behaves correctly.

This is a vendor account of an operating pattern, not a controlled evaluation of computer-use test validity. Cognition says approved test runs per day **more than doubled in the previous couple of months**; growth in approvals is not a measured reduction in regressions.

## Environment and Source-Grounded Plan

Around **six months** before the article, Cognition expanded Devin's harness with screenshot, mouse movement, click, drag, typing, keypress, scroll, wait, zoom, and start/stop-recording tools. A cloud VM can boot and drive the app in parallel with other jobs; the author reports engineers running **10–20 Devins** at a time, each with its own development server. This is an anecdotal concurrency observation, not a controlled throughput comparison.

Initially Devin often tested unrelated parts, became stuck in setup, or missed the behavior a PR was meant to change. Before entering test mode now it writes a **test plan grounded in code**: define the target, trace the reachable flow, and identify dependencies such as multiple services, admin settings, and feature flags. This pre-alignment reduces the risk of inventing a nonexistent UI path and makes later setup more deliberate. The source asserts improvement but provides no before/after test-success rate.

## Expectation Before Action

During execution Devin annotates a timeline with setup notes, starts of named tests, and assertions marked **passed, failed, or untested**. The distinctive sequencing rule is to state expected behavior **immediately before** taking the action and seeing its result. As the author puts it, “if you commit to the expectation upfront it makes it much harder to rationalize an unexpected result as a pass.” That is a useful anti-hindsight procedure, not evidence that self-judged assertions are independently calibrated. Failed and untested must remain distinct from passed.

After a run, Devin returns a report with labeled screenshots at significant points and a video with chapters and a chronological assertion view. Post-processing compresses dead time between actions while preserving normal-speed playback near actions. The human can inspect both the claimed verdict and the actual visible trace, rather than accepting a summary alone. Video is evidence of a visible path, not proof of backend state or exhaustive test coverage.

## Convert Flaky Setup into Deterministic Skills

Repeated login flows required clicking email/SSO/redirect screens one screenshot at a time. Devin extracted that work into a **deterministic script in a repository testing skill**, obtaining an authenticated browser session in seconds before entering the click–screenshot–assert loop for the actual feature. Cognition reports a dramatic reduction in flakiness but supplies no rate or cost measurement.

The loop can now improve itself under human control: if Devin solves a setup problem the hard way, it may **suggest saving the knowledge as a testing skill** and present a **one-click PR** for the user. The agent does not silently turn every improvised workaround into an authoritative global instruction. A declarative YAML blueprint can save initial repository setup as a snapshot for future sessions. Missing secrets can be requested in-session; humans can take over the computer for OTP or other difficult credential steps.

Test mode may be explicitly requested, or offered after a PR is opened when applicable. Cognition is also experimenting with a different model for the visual-testing phase than for code editing, since screenshot interpretation and UI-state tracking are distinct capabilities.

## What Is Claimed Versus Measured

**Reported operating observations**: more async than interactive triggers, engineers running 10–20 parallel Devins, and more than doubled approved test runs per day. **Configured behaviors** include source-grounded plans, pre-action expectations, pass/fail/untested annotations, cloud recordings, repository testing scripts, PR-proposed new skills, and reusable setup blueprints.

**Unquantified effects**: plans improve complex test reliability, deterministic login scripts decrease flakiness, and cloud tests save developer time. The post does not disclose verified-pass rates, false-positive assertion rates, human agreement on evidence, setup-time distributions, or a benchmark against manual testing. It acknowledges screenshot timing errors (e.g. transient toast notifications) and agents “cheating” by using injected browser JavaScript instead of real clicks when the intended user path is the claim.

## Analyst Takeaways

1. **Commit to expected behavior before observing it.** A plan tied to source and a timestamped expectation–action–observation record make self-serving reinterpretation harder; still externally inspect screenshots, logs, and state.
2. **Automate routine setup, not the evidence you came to collect.** Deterministic login/session scripts reduce flaky navigation; keep the core behavior on a representative user path when that is what needs validation.
3. **Promote learned setup through reviewable PRs.** A hard-earned fix can become a tested, scoped skill instead of a repeated manual workaround or an unreviewed global instruction.
4. **Return reviewable proof bundles.** Named assertions, screenshots, chapters, and a timeline give humans a faster way to check what ran; distinguish “untested” from “passed.”
5. **Track trust separately from usage.** More approved runs or concurrent agents are adoption signals; measure disagreement, escaped regressions, and evidence coverage before claiming verified autonomy.

## Questions and Limitations

- Who independently validates self-marked assertions, and what is the false-pass rate on known broken UI states?
- Can a video prove that a required backend side effect occurred, or must the harness add direct state assertions?
- How are secrets, authenticated snapshots, and recordings scoped and retained safely?
- Transient UI events can be missed by screenshots; browser scripting may bypass the user journey being tested.
- Vendor claims about savings and reliability lack denominators, baselines, and controlled comparisons.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
* [Feedback-Grounded Context Adaptation](/vault/feedback-grounded-context-adaptation.md)
