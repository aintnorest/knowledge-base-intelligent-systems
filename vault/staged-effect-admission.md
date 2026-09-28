---
type: Synthesis
title: Staged Effect Admission
description: Buffer an untrusted agent's proposed external writes and release only independently authorized types, quantities, and content after execution ends.
tags: [agents, agent-security, access-control, orchestration, verification]
timestamp: 2026-09-28T19:06:02Z
---

# Staged Effect Admission

Staged effect admission separates an agent's ability to propose an externally visible write from the authority to perform it. The agent submits proposed effects into a bounded holding area; after the untrusted run ends, a trusted stage checks their operation type, quantity, content, and task scope before independently publishing only admitted effects. The agent never receives publication credentials merely because it produced an acceptable proposal.

## Operating Pattern

1. Define the finite external effect classes the task may produce and their per-run limits before agent execution.
2. Expose a proposal channel rather than a direct publish path; keep credentials and write authority in a trusted component outside the agent's execution domain.
3. After execution, examine proposals against the declared operation class, count, target, and content policy. Treat formatting or sanitization as one check, not as proof of intent or safety.
4. Release admitted proposals through a trusted publisher; reject or send ambiguous or consequential effects for accountable human approval. Record which proposal became which external write.

## Why It Matters

Hiding secrets or confining processes does not prevent harmful content from reaching a legitimate publication channel. Deferring the effect makes the boundary inspectable before an irreversible write. Unlike [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md), which mediates each consequential call as it happens, this pattern delays publication until a post-execution acceptance stage. A separate task verifier can reject failed changes before they are published, as in [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md).

## Practical Use

Use staged publication for autonomous repository changes, public comments, notifications, and other effects that can be proposed as inspectable artifacts. Keep verification and publication outside the agent, require task-specific content and scope checks in addition to type and count limits, and retain a human approval path for actions whose real-world consequence requires judgment. Keep lower-trust reports scoped to their own review surface rather than automatically promoting their prose into a privileged parent's instructions (see [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md)).

## Limitations

- Pre-publication checks can miss malicious intent, context-dependent harm, or information disclosed through an otherwise allowed artifact. Quantity caps bound volume, not semantic harm.
- The boundary fails if the agent retains another unmediated route to equivalent writes, or if checking and publication disagree about the exact proposal admitted.
- Delaying effects is unsuitable for every interactive task; live consequential actions need action-time authorization and meaningful user intervention instead.

## Sources

- [Security Architecture of GitHub Agentic Workflows dossier](/dossiers/github-agentic-workflows-security.md) — agent-proposed repository writes are held for post-exit checks on effect class, count, and sanitized content before release.
- [Predictable Results Through Strong Feedback Loops dossier](/dossiers/spotify-honk-feedback-loops.md) — independent task-relevant verification blocks PR creation on failures, while push and other external actions remain outside the coding agent.
- [Magentic-UI — Human-Centered Web Agent Control dossier](/dossiers/magentic-ui-human-centered-control.md) — consequential live browser actions require action-time approval, clarifying where post-execution admission is insufficient.
- [Paperclip Low-Trust Presets — Containing Review Work dossier](/dossiers/paperclip-low-trust-review.md) — a lower-trust reviewer's findings remain on its own issue instead of flowing as free-form instructions into a privileged parent.
