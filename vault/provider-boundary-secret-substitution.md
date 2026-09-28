---
type: Synthesis
title: Provider-Boundary Secret Substitution
description: Replace sensitive values with stable opaque placeholders before model-visible text leaves the trusted runtime and restore them only at a trusted execution boundary.
tags: [privacy, agent-security, access-control, agent-harness, agents]
timestamp: 2026-09-28T19:05:17Z
---

# Provider-Boundary Secret Substitution

Provider-boundary secret substitution replaces sensitive values in selected model-visible text with stable opaque placeholders before transmission. A trusted runtime retains the mapping and restores a placeholder only when a model-authored action reaches its local execution boundary. The model can refer to a secret without receiving its plaintext; the local executor still can. This is a confidentiality control over a defined text surface, not a credential vault or permission to execute an action.

## Operating Pattern

1. Identify the text that can cross the provider boundary, including user/session messages, tool results, and dynamic descriptions. Discover configured secrets and sensitive values appearing there before serialization.
2. Replace each reversible match with a stable keyed identifier rather than a plain predictable digest; preserve enough identity for repeated references while guarding against collisions and offline guessing. Keep the key and original mapping in the trusted runtime.
3. On a live tool call, restore recognized placeholders only immediately before trusted local execution. Re-substitute secrets in any resulting context or later provider replay that traverses the protected text path.
4. Keep restoration distinct from tool authorization: the execution gate must still check whether the requested effect and destination are allowed. [Egress broker credential injection](/vault/egress-broker-credential-injection.md) instead keeps certain credentials out of the workload entirely.

## Why It Matters

Agents often return diagnostic output and command results to a model, where a secret can leak without the model intentionally requesting it. Stable replacement retains referential utility without putting the original value in a provider-visible transcript. The protection succeeds only where the outbound and replay serializers actually apply it; redacting local output after transmission cannot retrieve plaintext already sent.

## Practical Use

Document exactly which dynamic fields are traversed and which are excluded, test a secret appearing in tool output and then referenced in a later tool call, and inspect both transmitted text and locally executed arguments. Test restart and key-loss behavior, accidental placeholder collisions, fresh secrets learned after earlier turns, and contexts that bypass the normal serializer. Apply process and egress controls independently so restored plaintext cannot be read or sent by arbitrary code.

## Limitations

- Static instructions, schema constraints or identifiers, authentication/routing fields, binary attachments, and opaque encrypted replay may fall outside text substitution. Already-transmitted plaintext remains exposed.
- Detection of secrets is incomplete; short values, unknown credential formats, alternate encodings, and attacker-controlled formatting can evade replacement or create false positives.
- A compromised executor or tool can still see and misuse a restored value. Likewise an inherited environment or broadly readable credential file may reveal it before the provider boundary; [deployment-conditioned sandbox security](/vault/deployment-conditioned-sandbox-security.md) addresses those separate exposures.

## Sources

- [Oh My Pi Secret Obfuscation Model dossier](/dossiers/omp-secret-obfuscation.md) — describes keyed stable placeholders, local restoration, text and replay coverage, and explicit exclusions and irreversible prior disclosure.
- [Configure the sandboxed Bash tool dossier](/dossiers/claude-code-bash-sandbox-model.md) — illustrates that shell children may inherit environment secrets and read credential files despite process confinement, so text substitution alone cannot protect local secret custody.
