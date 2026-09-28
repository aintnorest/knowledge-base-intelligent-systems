---
type: Synthesis
title: Policy Compilation Fidelity
description: The authorization engine's effective decisions can diverge from an authored policy through compilation, cross-runtime parsing, or unverified reconstruction.
tags: [access-control, sandboxing, verification, agent-security, agents]
timestamp: 2026-09-28T19:05:31Z
---

# Policy Compilation Fidelity

Policy compilation fidelity is the agreement between an author's intended authorization decision and the decision made over the actual object and effect by an enforcement engine. A readable rule is not the enforced policy: path normalization, literal-to-pattern conversion, implicit defaults, binary compilation, and parser boundaries can change which actions are allowed or denied.

## Failure Mechanisms

1. **Literal becomes pattern.** A resolved filename containing wildcard characters is emitted as a glob instead of escaped literal data. The resulting allow may cover siblings while a corresponding protected-path deny no longer matches the same target.
2. **Matcher and actor disagree.** A gateway matches a string as one hostname, while a downstream resolver interprets its bytes as another. The enforcement point mediates traffic yet authorizes the wrong identity.
3. **Readable reconstruction is mistaken for behavioral proof.** Recovering a policy from its binary decision graph and successfully recompiling it establishes useful structural or syntactic evidence, not equivalent decisions for every operation and object. Compiler-added rules and defaults may be omitted from the reconstruction.

## Why It Matters

An OS can enforce its compiled rule exactly while still enforcing more authority than the author intended. Auditing source policy alone misses transformations between source, compiled graph, gateway, and underlying operation. Conversely, a decompiled policy that looks restrictive can conceal different effective behavior; passing a round-trip compilation check cannot settle that question.

## Practical Use

- Preserve types and provenance: literal paths remain literal through canonicalization and code generation; user-authored patterns enter through a separate, explicit route.
- Compare allow and deny decisions against the *same* canonical object, including adversarial filenames, empty sets, wildcard characters, encoded bytes, and boundary values accepted by downstream runtimes.
- Differentially probe authored rules, compiled artifacts, and actual operations under the deployed runtime. Check both positive permissions and protected negative cases; inspect default decisions and implicit compiler rules.
- Date and scope reconstructed-policy claims to the compiler and runtime studied. See [Destination Allowlist as Capability Grant](/vault/destination-allowlist-as-capability-grant.md) for why a correctly matched host can still grant harmful effects.

## Limitations

Execution probes cover sampled cases rather than proving universal equivalence; opaque engines can make full comparison difficult. Strict input normalization may reject legitimate unusual names, while permissive parsing requires exact agreement across every representation boundary. This concept concerns fidelity of an authorization rule, not whether a faithfully enforced rule grants too much authority.

## Sources

- [Claude Code macOS Sandbox Escape via Literal Path and Glob Confusion dossier](/dossiers/codeant-claude-code-macos-glob-sandbox-escape.md) — four-case differential evidence that literal workspace metacharacters widened a write allow and undermined a protected-settings deny; no shipped fix established.
- [Second Time, Same Sandbox dossier](/dossiers/oddguan-claude-code-network-allowlist-bypass.md) — shows an approved wildcard suffix matched before a null byte while a downstream resolver connected to the blocked prefix.
- [SandBlaster: Reversing the Apple Sandbox dossier](/dossiers/sandblaster-apple-sandbox-reversing.md) — reconstructs historical binary authorization graphs and explicitly separates successful recompilation from untested execution-level equivalence.
