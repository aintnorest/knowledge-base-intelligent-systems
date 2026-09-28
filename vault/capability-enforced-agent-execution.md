---
type: Synthesis
title: Capability-Enforced Agent Execution
description: A reference-monitor pattern that propagates data provenance and permitted-reader capabilities through an agent runtime, then checks them at every consequential tool call.
tags: [agent-security, access-control, prompt-injection, tool-use, agents]
timestamp: 2026-07-14T16:09:17Z
---

# Capability-Enforced Agent Execution

Capability-enforced agent execution makes tool use conditional on machine-checkable authority, rather than asking an LLM to remember a security policy. Values in the agent runtime carry provenance and reader/recipient permissions; a policy reference monitor examines both an argument and its transitive dependencies immediately before a tool creates an external effect.

## Operating Pattern

1. **Define protected sinks.** Enumerate actions that send, publish, alter, delete, transfer, or grant access to data.
2. **Attach authority at sources.** Label user-provided literals, retrieved records, tool outputs, and transformations with a source and permitted readers or other task-relevant rights.
3. **Propagate dependencies.** Preserve labels through data transformation and through control dependencies where a branch choice can encode sensitive information.
4. **Check each call locally.** State a policy per sink: for example, a recipient must be user-specified, and every recipient must be authorized to read the message body and attachments.
5. **Fail closed or request meaningful approval.** Block a denied action by default. If declassification is allowed, present the actual data source, destination, and consequence to a user who can make an informed decision.
6. **Audit and test the enforcement surface.** Log capability decisions and adversarially test parser output, exception paths, multi-step transformations, tool adapters, and policy changes.

Capabilities for delegated work should be intersected with parent, task, and resource authority, bound to a verified actor, and checked at the receiving tool rather than trusted as claims in a child agent's prompt. A sandbox constrains where code runs; it does not decide whether a permitted operation matches user intent. A broker may withhold transferable credentials and expose only mediated operations, but an authorized operation can still transmit data the workload can read. See [attenuated delegation authority](/vault/attenuated-delegation-authority.md) and [egress-broker credential injection](/vault/egress-broker-credential-injection.md).

## Why It Matters

An isolated planning model can prevent untrusted text from selecting a new tool sequence, yet still pass attacker-controlled values into a planned `send`, `share`, or `transfer` operation. Capabilities preserve enough provenance at the action boundary to distinguish “the user asked to share this with this recipient” from “an untrusted document supplied both the recipient and the secret.”

This is a reference-monitor design: its security promise depends on complete mediation at consequential tools and on correct policy definitions, not on whether a model recognizes adversarial prose. It can therefore complement model-level prompt-injection defenses rather than replace them.

## Practical Use

- Start with a short list of high-impact sinks and a minimal label vocabulary—such as trusted user input, untrusted tool data, and allowed readers—before attempting general semantic policy.
- Make rights concrete. An email policy can check recipient authorization for each attachment and text field; a file-sharing policy can require the target address to be user-originated.
- Treat derived data as protected when it may reveal protected inputs. Do not strip a label merely because the value was formatted, summarized, or selected by a model.
- Design approval prompts as a scarce declassification channel. Generic “continue?” dialogs cause habituation and can silently become the system's weakest policy.
- Treat every outbound channel, including name resolution and general-purpose utilities, as a possible recipient of protected data. A destination allowlist grants reachability, not permission for every operation or payload at that destination; see [destination allowlist as capability grant](/vault/destination-allowlist-as-capability-grant.md).
- Recompute effective authority after policy changes, and bind a consequential approval to the actor, tool contract, and actual arguments presented for review; see [approval bound to canonical effect](/vault/approval-bound-to-canonical-effect.md). Visibility of a tool or possession of a service identity is not itself approval to invoke it.

## Test Every Equivalent Authority Route

Agent QA should ask whether each externally reachable route to a sensitive effect is covered by *both* an enforced boundary and a test that can show the boundary failing. Unit tests for ordinary logic, a documented approval prompt or a security folder in the repository are not substitutes. An agent may reach the same authority through its CLI, API, plugin, MCP server, setup hook or headless runner. Enumerate the protected assets and every route to them. Write a replayable negative test (untrusted input, attempted prohibited action, observable denial or no effect), and confirm the test catches a deliberately disabled boundary in a throwaway environment.

A 157-project audit of public agent repositories found gaps at exactly these intersections. 148 projects expose host-process commands, and 30.4% of those lack an identifiable command-isolation practice. 155 have credential-exposure candidates, and 36.1% of those lack matching secret handling or redaction. Only 8 have explicit prompt-injection or adversarial test paths. These are descriptive repository labels, not measured breaches. The SAFE-AI position paper argues for least privilege, risk-differentiated approvals and independently verified effects, but its motivating incident citation is unreliable and its synthetic percentages should not be read as deployed reliability.

## Limitations

- A label system cannot protect against rights it never models, policies that are over-broad, compromised tool adapters, or a missing enforcement point.
- Brokered credential custody prevents direct theft of a withheld key, not misuse of an authorized request or leakage of other workload-readable data. Inspecting encrypted requests may require a trusted intermediary that handles plaintext; uninspected routes have weaker guarantees.
- Correct propagation through exceptions, branches, loops, timing, and shared resources is difficult; direct-flow checks alone can miss side channels.
- Authority metadata and user identity are often incomplete for web, SaaS, and third-party tools, increasing either false blocks or unsafe assumptions.
- This pattern limits unauthorized effects, not necessarily deceptive text displayed to a user or benign-looking sequences that are individually authorized but harmful in aggregate.

## Sources

- [Defeating Prompt Injections by Design dossier](/dossiers/defeating-prompt-injections-by-design.md) — CaMeL propagates provenance and allowed-reader capabilities through a restricted interpreter, enforcing per-tool policies in AgentDojo.
- [Parallax: Why AI Agents That Think Must Never Act dossier](/dossiers/parallax-architecturally-safe-autonomous-execution.md) — proposes executor-side sensitivity tags that propagate through agent operations and are checked before writes or network egress; the implementation and results are author-reported.
- [A Large-Scale Empirical Study of Quality Assurance Practices and Gaps in AI Agents dossier](/dossiers/quality-assurance-gaps-ai-agent-projects.md) — repository-visible QA and isolation gaps across 157 agent projects.
- [Rethinking Autonomy: Preventing Failures in AI-Driven Software Engineering dossier](/dossiers/rethinking-autonomy-ai-driven-software-engineering.md) — argues for least privilege, differentiated approval and independently audited effects.
- [Delegation Without Trust dossier](/dossiers/delegation-without-trust-authorization-broker.md) — reference broker demonstrates identity-bound attenuation and revocation; synthetic microbenchmarks do not establish deployed mediation.
- [OpenShell Security Policy Architecture dossier](/dossiers/nvidia-openshell-security-policy.md) — complete effective policy generations rederive credential provenance; local overrides and uninspected traffic weaken the gateway guarantee.
- [Code Mode: the better way to use MCP dossier](/dossiers/cloudflare-code-mode-mcp.md) — host-mediated RPC capabilities expose operations to generated code without granting generic network access or credentials.
- [Claude Code: Data Exfiltration with DNS dossier](/dossiers/claude-code-dns-exfiltration-cve-2025-55284.md) — a dated exploit composes a permitted read and diagnostic DNS call into unauthorized disclosure.
- [Two questions every security review asks us dossier](/dossiers/composio-security-review.md) — session-bound user and project identity, organizational ceilings, and mediated credentials limit but do not eliminate misuse of allowed actions.
- [Paperclip MCP Access Governance dossier](/dossiers/paperclip-mcp-gateway-governance.md) — separates tool visibility from call authorization and exact-effect approval while identifying unmanaged-client bypass routes.
