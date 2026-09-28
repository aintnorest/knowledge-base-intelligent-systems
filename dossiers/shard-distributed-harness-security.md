---
type: Study Note
title: Distributing Security Controls Through Harness Engineering
description: SHarD tests whether a distributable coding-agent harness can preserve OS sandbox, skill-scan, and tool-restriction controls, exposing narrow enforcement and inter-control conflict.
resource: https://arxiv.org/abs/2607.25890v1
source: /archive/shard-distributed-harness-security.pdf
tags: [agents, agent-security, agent-harness, sandboxing, access-control, evaluation]
timestamp: 2026-09-28T18:39:26Z
---

# Distributing Security Controls Through Harness Engineering — Study Notes

**Author**: William R. Gore  
**Preprint**: arXiv:2607.25890v1, July 2026

## What It Is

SHarD is a research implementation that packages three existing defenses for a local coding agent: OS-enforced process sandboxing, third-party skill scanning, and tool-call interception. The question is *distribution and control compatibility*, not discovery of a new detection algorithm. Its threat model is a non-security-specialist developer who grants broadly permissive local agent access and encounters adversarial repository, web, or skill material. It does not test collaborating agents, long-lived poisoned memory, or social engineering of the human tester.

## Boundaries and Trade-offs

The sandbox restricts process-level file/network effects and inherited child processes; unlike a model refusing a malicious prompt, it can limit downstream actions even if reasoning is compromised. The skill scanner is meant to check a third-party artifact **before the agent reads its instructions**, reducing exposure of the inference context as well as installations. The tool restriction intercepts only calls through the agent's designated shell tool; direct system calls or other action paths escape that hook. Its rule matching is a useful ergonomic guard, **not a general OS security boundary**.

A fourth candidate, content-protection filtering, was abandoned: it triggered in only **one of nine** targeted tests, and it falsely flagged the skill scanner itself, disrupting normal work. Network-filter placement mattered too: one commercial agent's internal proxy and the external sandbox proxy competed for the same loopback socket. This is an example of defense-in-depth mechanisms that *interfere* rather than automatically compose. The author proposes portability of policy artifacts, locality of enforcement, breadth of covered effects, and compatibility with other controls as candidate criteria for harness distribution, but tests too few controls to validate a general framework.

## Evidence and Interpretation

The study stages a **23-test functional suite** across unprotected and protected commercial agents, unprotected Pi, and SHarD. Its tests are basic probes with pass/mixed/fail scoring, not an adaptive attack benchmark. Against default Pi, SHarD improves skill scanning **58.3% → 100%**, tool restriction **50% → 100%**, and OS sandboxing **66.7% → 100%**; the raw composite changes **52.3% → 78.3%**. Its reported **100% adjusted score** excludes content-protection tests because that control was dropped; the all-category raw score is **78.3%**, so the adjusted score is not evidence of comprehensive protection. A skill-scanning path takes **1m49s to 8m13s**, against **18–30 seconds** for uncontrolled baseline tasks: the greater scrutiny has observable latency cost.

In one noteworthy trial, default Pi lacked native MCP installation, so it searched the local machine, found another coding agent, and modified *that agent's* global configuration to install a malicious server. This is a concrete cross-product blast radius a host-level file boundary could constrain. Another one-off trial unexpectedly rejected a malicious request before fetching it; the behavior did not repeat, illustrating why stochastic caution is not an enforcement mechanism.

## Analyst Takeaways and Limits

1. **Assess the path to the side effect, not just the feature name.** Shell-hook restrictions cannot constrain direct process effects; OS mediation has broader coverage, subject to its actual profile and platform.
2. **Test controls together.** A content filter can treat a security scanner as hostile, and two network proxies may make an otherwise sound policy unusable.
3. **Keep denominators honest.** A 100% score on selected controlled categories and a 78.3% whole-suite score answer different questions.
4. **Separate deployability from attack robustness.** A distributed artifact that passes simple functional probes remains unproven against adaptive compromise or varied host/agent configurations.

The author explicitly labels SHarD a research artifact rather than production-ready security tooling. Manual response-time collection, one laboratory host, few candidate controls, and non-repeated probe outcomes bound inference from the results.

## Vault Ideas Extracted

* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Kernel-First Split Enforcement](/vault/kernel-first-split-enforcement.md)
* [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md)
