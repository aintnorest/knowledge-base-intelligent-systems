---
type: Synthesis
title: Activation-Vested Risk Budget
description: Charging a shared catastrophe-risk allowance when a recursively spawned agent is granted authority to act, not when it is spawned, so exploration inside a sealed sandbox stays cheap while the number of authorized descendants is what gets governed.
tags: [agents, multi-agent, access-control, agent-security, orchestration]
timestamp: 2026-09-28T21:40:00Z
---

# Activation-Vested Risk Budget

Recursive agents spawn helpers; some helpers eventually ask for a capability with external effects. Two trees grow at once: a **computation tree** of candidates that consume compute and observation budget, and an **authority tree** of activations that can cause the protected harm. An activation-vested risk budget accounts for catastrophe risk on the second tree only. Spawning a sandboxed candidate is free with respect to the risk allowance; the allowance is debited when a gate outside the model grants that candidate authority to act.

## Mechanism

1. Define the catastrophe set and a total allowance δ outside the model being constrained.
2. Let candidates explore inside a sandbox that actually excludes the specified harm; limit their compute and observations separately.
3. Route every path to authority through one enforced gate. Before each activation, the gate obtains a risk certificate bounded *conditional on everything known at selection time*, including why this branch was chosen.
4. Debit the certificate's bound from the shared allowance; refuse activation when the allowance would be exceeded. Cancelled or unselected candidates never spend allowance.

Under these conditions the probability of any catastrophe across an adaptively grown, unbounded tree stays within δ, without assuming independent children or a fixed tree size. For fixed gates and compute, delaying the charge to activation weakly dominates charging every spawn: the same policies remain available and speculative branches cost only compute.

## Why It Matters

The distinction locates risk correctly. A branching-process view shows that total hazard depends on the expected number of *authorized* descendants per activation, with a sharp regime change at reproduction number one; a large computation tree alone does not raise catastrophe probability. Deployed harnesses today approximate this with blunt instruments — depth caps, fan-out limits, "cannot nest" rules, or a concurrency ceiling — which throttle exploration and authority together. Those caps are cheap and enforceable, but they pay for safety with lost search breadth that a sealed sandbox would have provided for free. Separating the two trees also clarifies review: an orchestrator should be asked how many descendants can *act*, not how many it spawned.

See [Attenuated Delegation Authority](/vault/attenuated-delegation-authority.md) for how each granted authority is narrowed and attributed per hop, and [Session-Composition Authorization](/vault/session-composition-authorization.md) for checking the combined effects of descendants that were individually authorized.

## Practical Use

- Make "grant authority" an explicit, logged event distinct from "spawn"; keep the allowance ledger in the enforcement runtime, not in any agent's context.
- Calibrate risk estimates on the *selected* distribution. Marginal calibration fails when selection prefers risky branches: with half of candidates at zero risk and half at twice the mean, choosing the risky half doubles the true conditional risk.
- Keep a separate limit on sandbox compute; the risk budget bounds harm, not spend.
- Where a real gate does not yet exist, treat depth and fan-out caps as a stand-in and record what breadth they forfeit.

## Limitations

- Evidence is a proof plus a synthetic study (about 5.8% relative utility gain over spawn-time charging in 100,000 held-out episodes); no deployed gate has been evaluated.
- The guarantee collapses if the sandbox leaks side effects, the gate is compromised or bypassable, hazards are omitted from the catastrophe set, or certificates are only marginally calibrated.
- Distinguishing sandbox spawning from capability activation requires whole-process confinement of candidates; tool-level sandboxes with unconfined helpers do not qualify ([Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)).

## Sources

- [Spawn Freely, Act Sparingly: Progressive Risk Vesting for Recursive LLM-Agent Trees dossier](/dossiers/progressive-risk-vesting-agent-trees.md) — origin of the computation/authority tree split, the selection-conditional certificate bound, the branching-process criticality result, and the synthetic utility comparison.
- [Hermes Agent — Subagent Delegation and Ownership Boundaries dossier](/dossiers/hermes-subagent-delegation.md) — a deployed approximation: a default concurrency ceiling and a smaller one-shot delegation limit that throttle spawning rather than authority.
- [Claude Code agent teams dossier](/dossiers/claude-code-agent-teams-model.md) — a deployed approximation: only the lead may spawn, teams cannot be nested, and coordination cost is cited as the size limit; no separate accounting for which members may act.
