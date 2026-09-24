---
type: Study Note
title: The Code Agent Orchestra - what makes multi-agent coding work
description: Addy Osmani's practitioner taxonomy of subagents, coordinated teams, and local or cloud coding-agent orchestrators, with explicit dependency, ownership, review, and integration gates.
resource: https://addyosmani.com/blog/code-agent-orchestra/
source: /archive/code-agent-orchestra.html
tags: [multi-agent, orchestration, coding-agents, human-in-the-loop, verification, agents]
timestamp: 2026-09-24T03:45:44Z
---

# The Code Agent Orchestra - what makes multi-agent coding work — Study Notes

**Author**: Addy Osmani  
**Publisher**: AddyOsmani.com; companion to an O'Reilly AI CodeCon talk, personal guidance rather than Google policy  
**Published**: March 26, 2026

## What It Is

Osmani describes a shift from directing one synchronous coding assistant to assigning bounded work to multiple independent agent contexts. His practical taxonomy is more useful than his claims about inevitable productivity: ordinary subagents support delegated parallel work; coordinated agent teams add task/dependency state and peer messages; local worktree and cloud services extend that pattern across projects and longer sessions. The critical scarce resource is still human verification and integration.

## Three Coordination Patterns

1. **Parent and subagents.** In his Link Shelf Express/SQLite demonstration, one worker builds `db.js`, another `validation.js`, and a third builds `server.js` after receiving both reports. The first pair can run concurrently; the API worker has a real dependency. Each child has a bounded context, while the parent owns dependency management and integration. The demo says roughly 220k tokens total, but gives no comparable single-agent benchmark.
2. **Agent Teams.** An experimental Claude Code setup adds a shared task list with pending/in-progress/completed/blocked states, dependency unblocking, peer-to-peer communication, and claimed file locking. In a search-feature demo, backend communicates the `GET /search?q=` response contract to frontend while tests await the API. The author proposes plan approval, a reviewer worker, and hooks on task completion; these are described configurations, not measured controls.
3. **Scaled orchestration.** In-process helpers/teams, local orchestrators with isolated worktrees and diff review, and async cloud agents in separate VMs or containers serve different latency and oversight needs. Worktrees separate source trees; they do not by themselves isolate process state, credentials, test services, or merge semantics. Tool names and prices are snapshots, not durable design premises.

The post advocates a staged production line—plan, spawn, monitor, verify, integrate, retrospect—with one file owner per task, a defined API contract for cross-slice work, and human judgment on architecture and scope. A stateless-but-iterative 'Ralph Loop' variant picks a small task, implements, validates, commits on passing evidence, then resets context; continuity resides in task state, history, progress, and curated guidance.

## Quality and Memory Controls

Osmani suggests task-completion hooks for tests/lint, preimplementation plan approval, bounded retries and tokens, a read-only reviewer teammate, and post-task lessons proposed for `AGENTS.md`. The important distinction is that a discovered lesson should be approved before becoming persistent policy; the article at one point says every session adds to `AGENTS.md`, but elsewhere explicitly requires lead approval for each line. Treat the human-curated rule as the safer interpretation.

His talk cites a study claiming generated `AGENTS.md` rules reduced success roughly 3% and raised inference costs over 20%, while human-written files raised success about 4%. These are secondhand figures within a practitioner talk; inspect the study's task/model conditions before using them as universal estimates. Similarly '3x throughput,' a 3–5 teammate sweet spot, MAX_ITERATIONS=8, one reviewer per 3–4 builders, and 5–10 minute check-ins are illustrative prescriptions, not controlled results established in this essay.

## Analyst Takeaways

1. **Fan out only when dependencies and ownership are legible.** A parent should fix the shared API/interface first, then parallelize truly independent slices and reserve an explicit integration owner.
2. **Use bounded reports, not full context replication.** Give each worker the relevant files and return the API contract, evidence and blockers; central orchestration becomes costly when every agent's raw trace passes through the lead.
3. **Distinguish isolation layers.** One worktree per agent prevents source-edit collisions but says nothing about ports, databases, secrets, or whether the final merge makes sense.
4. **Put verification on the critical path.** Increase concurrent builders only while tests, review and merge can keep pace; an automatic reviewer cannot replace independent test evidence or human acceptance.
5. **Curate persistent rules.** A session-specific workaround can poison future tasks. Require evidence and approval before adding it to shared agent guidance.

## Questions and Limitations

- The demo does not publish task artifacts, controlled baselines, confidence intervals, defect outcomes, or the costs of review and integration; its throughput claims are not generalizable measurements.
- File locks and shared task states are product-specific assertions at the time of writing. Verify the actual deployed tool's guarantees before depending on them.
- The sample task's API worker waits for two reports. At larger scales, dependency tracking, integration conflict resolution, flaky checks, and reviewer bandwidth can dominate saved coding time.
- A reviewer agent seeing only a scoped diff may miss architectural inconsistency across agents; its 'green review' is not a release authorization.
- This is Osmani's personal account and talk, not Google policy.

## Vault Ideas Extracted

* [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)
* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Scoped Guideline Memory](/vault/scoped-guideline-memory.md)
