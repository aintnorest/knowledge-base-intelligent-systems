---
type: Study Note
title: "SandBlaster: Reversing the Apple Sandbox"
description: Reverse-engineering study that reconstructs human-readable iOS sandbox policies from binary decision graphs and tests syntactic fidelity by recompilation.
resource: https://arxiv.org/abs/1608.04303v1
source: /archive/sandblaster-apple-sandbox-reversing.pdf
tags: [sandboxing, access-control, verification, reliability]
timestamp: 2026-09-28T18:39:26Z
---

# SandBlaster: Reversing the Apple Sandbox — Study Notes

**Authors**: Răzvan Deaconescu, Luke Deshotels, Mihai Bucicoiu, William Enck, Lucas Davi, and Ahmad-Reza Sadeghi  
**Preprint**: arXiv:1608.04303v1, August 2016

## What It Is

Apple's iOS/macOS sandbox enforces process permissions through kernel-side rules about operations, decisions, and argument-dependent filters. Built-in iOS policies are compiled to binary graphs, making them difficult to inspect. SandBlaster reconstructs a human-readable policy language from iOS **7–9** binaries so security researchers can compare what a process is permitted to do. This is a study of historical iOS policy internals—not evidence that current macOS or agent sandboxes have the same rules.

## The Policy Model and Reconstruction

An operation such as file reading, network access, or service lookup follows a decision graph: each predicate has match and non-match successors; a terminal allows or denies. A default decision applies when no more-specific rule matches. The vast majority of examined iOS policies are deny-by-default—**103 of 121** built-in profiles in iOS 9.3.1—yet exceptions matter: 'sandboxed' does not imply one uniform file or network allowlist.

The binary format changes across generations. iOS 5–8 store separate profiles in a service binary; iOS 9 bundles them in the sandbox kernel extension. The authors infer operation/filter mappings by compiling controlled, known policy expressions and comparing binary output. They reconstruct logical **not/any/all** predicates by traversing match/non-match paths and reducing decision graphs; regex filters require recovering a serialized nondeterministic automaton and converting it back to a readable expression. This matters because a graph dump may expose nodes but obscure which *combinations* of predicates actually authorize an effect.

The reconstructed policy is not necessarily the exact author-written text. Compilation adds implicit rules; the researchers remove recognized ones to approximate the original. Decompilation also depends on version-specific operation mappings and on whether seemingly equivalent logical expressions compile differently. Where the default is deny, attention can focus on paths to an allow terminal, but that shortcut cannot be applied unchanged to allow-default profiles.

## Findings, Validation, and Limits

The study reverses built-in profiles across iOS 7, 8, and 9 and reports that resulting readable policies can be **recompiled with minor or no changes**, with minor edits needed for iOS versus macOS token differences. Recompilation validates syntactic reconstruction, **not semantic equivalence** between the compiled original and reconstructed profile. The authors explicitly leave application-level execution tests on a device for future work. Apple's hidden defaults, OS-version changes, and kernel-enforcement details mean a readable policy alone does not prove actual containment for an arbitrary running process.

## Analyst Takeaways

1. **Inspect the enforced artifact, not merely its source policy.** Hidden defaults and compiler transformations can add rules not obvious from human-authored text.
2. **Reverse both branches of authorization predicates.** A simple allowlist summary misses nested negation, conjunction, fallback, and operation-specific exceptions.
3. **Differentiate syntax proof from behavior proof.** A round-trippable human-readable profile is useful audit evidence, but execution probes are needed to validate its actual effects.
4. **Date OS boundary claims.** This study's measured policy inventory and storage layouts describe iOS 7–9 circa 2016, not contemporary sandbox defaults.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Kernel-First Split Enforcement](/vault/kernel-first-split-enforcement.md)
* [Policy Compilation Fidelity](/vault/policy-compilation-fidelity.md)

