---
type: Study Note
title: Secure code execution
description: smolagents' first-party threat model and tradeoff between local restricted interpretation, isolated snippets, and whole-agent isolation for code-generating agents.
resource: https://huggingface.co/docs/smolagents/tutorials/secure_code_execution
source: /archive/smolagents-secure-code-execution.html
tags: [agents, agent-security, sandboxing, tool-use, multi-agent]
timestamp: 2026-09-28T18:39:32Z
---

# Secure code execution — Study Notes

**Publisher**: Hugging Face, smolagents documentation  
**Version**: Captured September 28, 2026; page presents a versioned documentation selector, but the canonical URL is unpinned

## What It Is

smolagents favors code as an action language: an agent can compose operations, store intermediate results, and express control flow rather than issuing unrelated structured tool calls. That expressivity also gives faulty or manipulated model output a powerful execution surface. The documented threat model includes accidental harmful code, compromised models or dependencies, prompt-injected retrieved material, and adversarial users of public agents; potential consequences include filesystem damage and abuse of credentials, compute, or network access.

## Local Interpretation Is a Partial Guard

The default CodeAgent executes generated code in the local environment through a custom AST interpreter rather than unrestricted Python. The interpreter restricts imports, rejects operations not explicitly implemented, and limits the number of elementary operations to bound some infinite loops. The authors report no observed environmental damage across their diverse uses of this interpreter, but provide no attack count, adversarial evaluation, or safety guarantee.

Authorized modules can expose dangerous submodules, and even legitimate operations can consume resources: the source illustrates image processing filling a disk with large files. A language-level interpreter cannot by itself enforce comprehensive process, filesystem, resource, and network isolation against a determined attacker or vulnerable imported dependency. “Safer than ordinary local interpretation” is therefore a narrower claim than “secure sandbox.”

## Which Part of the Agent Is Isolated?

Isolating only generated code snippets keeps the parent agent and model calls outside the remote environment. This avoids placing model credentials inside the execution environment and is simpler for a single-agent workflow, but state crosses the boundary and other local agent/tool paths remain outside it. The documentation says its standard remote snippet-executor path does not yet support managed multi-agent calls because nested model calls inside the sandbox lack the credentials retained by the local process.

Running the entire agent system inside the sandbox admits richer multi-agent execution and confines more of the computation, but may require provisioning model credentials inside the very environment that runs generated code. Greater process coverage trades against secret exposure, environmental complexity, and latency; neither placement is automatically safe without controlling accessible resources and network effects. The page names several backend products, but the transferable decision is placement of the trust boundary, not selection of a specific provider.

## Analyst Takeaways

1. Code-action expressivity and execution risk are coupled; local AST restrictions are useful defense in depth, not an OS security boundary.
2. Isolating a snippet instead of the entire agent changes both uncovered execution paths and which credentials must cross the boundary.
3. Multi-agent support is constrained by where model calls and credentials live, not simply by whether a remote code runner accepts code.
4. Treat the reported absence of observed damage as operational experience, not a measured escape-resistance result.

## Vault Ideas Extracted

* [Executable Code Actions](/vault/executable-code-actions.md)
* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
