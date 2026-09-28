---
type: Study Note
title: Oh My Pi Secret Obfuscation Model
description: A reversible provider-text redaction boundary, keyed placeholders and execution-time restoration, with explicit exclusions for static prompts and opaque payloads.
resource: https://github.com/can1357/oh-my-pi/blob/main/docs/secrets.md
source: /archive/omp-secret-obfuscation.md
tags: [agents, agent-harness, privacy, agent-security, access-control]
timestamp: 2026-09-28T18:39:25Z
---

# Oh My Pi Secret Obfuscation Model — Study Notes

## What It Is

Oh My Pi's optional, **disabled-by-default** secret obfuscation intervenes before selected provider-visible text leaves the process. It collects configured sensitive values, environment-derived values, passwords embedded in connection URLs, and recognizable credential shapes appearing in session text or tool responses. It replaces reversible matches with stable placeholders, restores them in model-authored tool arguments immediately before local execution, and re-obfuscates restored local session context before provider replay. This addresses accidental provider-context disclosure while allowing a tool to use a secret when the model refers to its placeholder; it is not a credential vault or a tool-authorization boundary.

## Reversibility and Collision Defense

Reversible placeholders use a private per-install key to produce a short HMAC-derived identifier for the exact secret, avoiding a transcript reader's straightforward dictionary-hash recovery. Different letter-case values receive distinct bases, and a case hint supports faithful restoration. A friendly label can preserve coarse semantics for the model, but is dropped if its text could itself reveal a secret. An alternative one-way replacement mode deliberately cannot restore the original value. Short obfuscate-mode values are ignored to avoid suppressing ordinary words; automatic name and shape detection therefore has a coverage boundary rather than identifying all possible secrets.

The same process restores placeholders in live tool arguments before execution. The executable tool can consequently still receive the plaintext secret, and a compromised tool or uncontrolled tool output remains a leak route. If the private placeholder key cannot persist, an ephemeral key keeps restoration working during the process but loses stable placeholders after restart.

## Explicit Blind Spots

The documented native replay coverage includes message text and dynamic tool/search descriptions, examples, and annotations. It excludes static tool definitions, system prompts, schema constraints and identifiers, execution defaults, authentication/routing fields, grammars, and image or file bytes. Unknown protocol variants and encrypted replay are opaque and cannot be retrospectively scrubbed. Newly discovered secrets can cause subsequent replay and compaction sources to be scrubbed, but the mechanism cannot retract plaintext already sent to a provider or redact a field outside its traversed text surfaces. Brokered credential custody is complementary: a local broker access token accidentally printed into visible output still needs obfuscation, while obfuscation alone does not remove a token from the host.

## Analyst Takeaways and Limits

1. **Specify the redaction surface rather than claim blanket secrecy.** Text-field traversal, static instructions, schema constraints, binary inputs, and opaque replay have different coverage.
2. **Reversible redaction protects the provider boundary, not the action boundary.** Restoration before tool execution intentionally exposes plaintext to the local executor.
3. **Keyed placeholders reduce offline guessing.** Persisted private-key custody and restart behavior become part of the protection model.
4. **Defaults matter.** This is an opt-in safeguard; no measured leak reduction or independent adversarial evaluation is given.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Control–Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Provider-Boundary Secret Substitution](/vault/provider-boundary-secret-substitution.md)

