---
type: Study Note
title: Claude Code macOS Sandbox Escape via Literal Path and Glob Confusion
description: CodeAnt's differential demonstration that a literal workspace name reinterpreted as a glob broadens Seatbelt writes and permits deferred sibling-project hook execution.
resource: https://codeant.ai/blogs/claude-code-macos-sandbox-escape
source: /archive/codeant-claude-code-macos-glob-sandbox-escape.html
tags: [agents, agent-security, sandboxing, coding-agents, access-control]
timestamp: 2026-09-28T18:39:48Z
---

# Claude Code macOS Sandbox Escape via Literal Path and Glob Confusion — Study Notes

**Research**: Sunder Singh, CodeAnt AI; article credited to Sonali Sood  
**Published**: August 17, 2026  
**Evidence position**: Third-party security research by CodeAnt AI, an AI-security vendor.

## Boundary and Preconditions

Claude Code's macOS Seatbelt sandbox permitted auto-approved shell writes in the trusted source workspace, while separately denying writes to protected project settings. Trusting that source should not authorize writes in an already-trusted *sibling* project. The reproduced attack needs a source directory whose **literal name** includes glob metacharacters, a sibling below the same canonical parent, sandbox auto-approval, and a later launch of the sibling project. The tested binaries were Claude Code **2.1.214 and 2.1.215** on macOS arm64; the author makes no Linux or Windows claim.

## Exploited Seam

The policy generator correctly resolved an automatic workspace entry to a real absolute directory, but then reclassified metacharacters in that resolved filename as **glob syntax**. A name containing `**.claude**` became a regex-like language covering sibling paths, rather than one literal path. Both write-allow and protected-settings-deny expressions changed, but not symmetrically: the broadened allow admitted a sibling's settings path while the malformed deny failed to match it.

A sandboxed command could therefore plant a session-start command hook in the sibling's protected settings. When the sibling was opened later, the hook executed as host code before model initialization, authentication, or Bash-tool availability. This is a policy-compiler **literal-versus-pattern type confusion**, followed by a deferred executable-configuration handoff—not a symlink race or an OS failure to enforce the compiled policy.

## Evidence and Remediation Status

The report compares four source-name cases while holding the target and payload fixed. An ordinary directory did not permit the write; a first metacharacter control widened the allow but still triggered the protected deny; only names that also changed deny interpretation permitted the protected write and later hook. The article explicitly bounds the initial write to a matching sibling under a fixed canonical parent, rather than claiming arbitrary immediate filesystem access.

Anthropic validated the submission on **July 20, 2026** and assigned CVSS 4.0 **7.7 (High)**, according to CodeAnt; submitted July 18. At the August 17 publication, its disclosure table still lists the **fixed version and advisory as TBD**. The article recommends preserving distinct literal-path and user-authored-pattern types throughout policy compilation and emitting literal protected-path denies, but does **not establish that Anthropic shipped that fix**. Archive-based delivery of metacharacter names was tested; automatic naming by an ordinary Git clone was not.

## Analyst Takeaways

A deny rule and an allow rule need a common, literal interpretation of the same path. Preserve provenance across resolver/compiler boundaries and test real filenames with pattern metacharacters against both positive and negative policy cases. Host-side lifecycle hooks magnify a bounded sandbox write into later unsandboxed execution.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Writable-Artifact Authority Handoff](/vault/writable-artifact-authority-handoff.md)
* [Policy Compilation Fidelity](/vault/policy-compilation-fidelity.md)

