---
type: Study Note
title: Defeating Prompt Injections by Design
description: Study notes on CaMeL, a capability-enforcing agent runtime that isolates untrusted parsing from planning and checks provenance-aware policies at tool boundaries.
resource: https://arxiv.org/abs/2503.18813v2
source: /archive/defeating-prompt-injections-by-design.pdf
tags: [agent-security, prompt-injection, access-control, tool-use, agents]
timestamp: 2026-07-14T16:09:17Z
---

# Defeating Prompt Injections by Design - Study Notes

**Authors**: Edoardo Debenedetti, Ilia Shumailov, Tianqi Fan, Jamie Hayes, Nicholas Carlini, Daniel Fabian, Christoph Kern, Chongyang Shi, Andreas Terzis, and Florian Tramèr
**Venue**: arXiv:2503.18813v2 [cs.CR]; DOI: 10.48550/arXiv.2503.18813
**Version date**: June 24, 2025
**Pages**: 125

## What It Is

CaMeL (Capabilities for Machine Learning) is a proposed architecture for tool-using agents that treats an LLM as untrusted with respect to security enforcement. Instead of trying to make a single model reliably distinguish instructions from hostile retrieved text, it turns a trusted user request into restricted Python-like code, tracks the provenance and permitted readers of values during execution, and checks explicit policies before each tool call.

The design separates a **Privileged LLM** (P-LLM), which sees the trusted user request and writes the plan, from a **Quarantined LLM** (Q-LLM), which can parse untrusted content into a declared structured schema but has no tool access. A custom interpreter executes the plan. This is a concrete implementation of the Dual LLM pattern, strengthened with information-flow-style capabilities and policy enforcement.

## The Security Problem

Prompt injection is not only an instruction-following problem. An attacker who controls a note, email, web page, or tool output can change either:

1. **Control flow** — cause a different tool or sequence of actions to run.
2. **Data flow** — supply attacker-chosen arguments to an otherwise legitimate tool call, such as a recipient or attachment.

Planning with a privileged model that never sees retrieved content protects the first case, but it does not automatically make an extracted email address, filename, payment recipient, or web URL safe. CaMeL's central claim is that an agent needs an executable policy boundary at the point where data becomes an externally visible or state-changing action.

## How CaMeL Works

1. **Compile the trusted request into a plan.** The P-LLM receives the user query, tool signatures, and a constrained programming dialect. It generates code that names a fixed sequence of tools and declares schemas for unstructured-data extraction. It does not see tool-returned values or Q-LLM output.
2. **Parse untrusted data in quarantine.** The Q-LLM receives selected values and returns typed, structured fields. It has no tool-calling capability. A required `have_enough_information` field can cause a retry, but the P-LLM is not shown attacker-controlled error detail.
3. **Propagate capabilities.** Each value carries provenance and an allowed-reader set. Literals emitted from the P-LLM are tagged as user-derived; tool results retain tool and inner-source provenance; transformations carry dependencies forward.
4. **Track implicit dependencies.** The interpreter records data dependencies and, in `STRICT` mode, makes values created in a conditional or loop depend on that condition or iterable. It also conservatively taints later statements after a Q-LLM call to reduce exception-based leakage.
5. **Enforce tool policies.** Before each tool call, Python policy functions inspect the arguments and their dependency graph. Examples require an email recipient to originate with the user or require the subject, body, and attachments to be readable by every recipient. A violation is blocked in the benchmark; a deployment could request explicit user confirmation instead.

## Security Model and Evidence

The paper defines a prompt-injection security game in which an adversary chooses a compromised initial tool state and wins when the agent trace contains an action outside the set allowed for the trusted prompt. CaMeL does not enumerate that prompt-specific set at runtime; the security argument rests on the restricted plan, the isolated parser, propagated capabilities, and correctly specified policies.

On AgentDojo, the paper reports that CaMeL with Claude 3.5 Sonnet and policies had zero successful attacks across 949 evaluated attacks, versus eight for the next-best reported comparison defense (tool filter). This result applies to the benchmark's threat model and supplied policies; it is not a proof that arbitrary deployments, policies, tools, or implementation extensions are secure.

Utility is material rather than free. In the paper's defense comparison with Claude 3.5 Sonnet, benign overall task success was 63.92% for CaMeL versus 90.72% for the undefended model. The authors attribute important failures to requests where actions themselves must be discovered from untrusted data, undocumented tool-output structure that the planner cannot inspect, insufficient context given to the Q-LLM, and limitations in the restricted language/runtime. Across models, reported outcomes vary substantially; for example, CaMeL's overall benign utility is 77.3% for o3 High and 41.2% for Gemini 2.5 Pro.

The runtime also costs model tokens. With Claude 3.5 Sonnet under attack, the median task used 2.82x input tokens and 2.73x output tokens relative to native tool calling, mostly from code generation and retries rather than dependency propagation itself. The authors report that a cheaper Q-LLM reduced median cost by an estimated 12% with about a one-point utility loss in one Claude 4 Sonnet configuration.

## Where the Boundary Still Fails

- **The system cannot safely invent arbitrary actions from hostile content.** A request like “do what the email says” turns data flow back into control flow. The paper shows generated code that maps untrusted extracted action names and parameters to tools; policies then become the essential safeguard.
- **Policies are the specification and the burden.** A permissive, incomplete, or wrongly implemented policy can authorize a harmful call. Fine-grained annotations work best when the environment can identify owners, readers, and user identity; ambiguous suites trigger more confirmations.
- **Side channels remain a concern.** Conditional behavior, exceptions, timing, and shared resources can reveal protected values even when direct argument flow is blocked. `STRICT` mode reduces the demonstrated Q-LLM exception channel but causes more policy triggers and may not cover tool-induced exceptions or deployment-specific channels.
- **It does not protect every bad output.** The explicit threat model excludes text-to-text deception without a protected action, such as a malicious email summary that persuades a user to click a link. Provenance could help the UI label such text, but that is not an enforcement guarantee.
- **The trusted computing base is large.** The interpreter, tool adapters, policy functions, capability metadata, and approval UX must all be correct. The authors note lack of transaction atomicity/rollback for partially executed plans and call for formal verification.

## Analyst Takeaways

1. **Make the execution boundary—not the prompt—the security reference monitor.** Delimiters and hierarchy prompts may still be useful defense in depth, but only a non-LLM authority can reliably decide whether a real side effect is allowed.
2. **Separate “may interpret” from “may act.”** Parsing untrusted text into a narrow typed value can be useful; granting that parser the ability to select arbitrary tools or compose unchecked arguments defeats the separation.
3. **Carry provenance into every sink.** For each state-changing or external tool, define which arguments must be user-authorized, which content must already be readable by the recipients, and what dependency sources require confirmation.
4. **Test the policy/runtime pair adversarially.** Security evaluation must include data-to-control conversions, exception/termination observations, tool error messages, and approval fatigue—not just attacks that ask the model to ignore a system prompt.
5. **Constrain the agent language deliberately.** A smaller interpretable planning language makes dependency tracking and policy checks possible, but it creates a usability and coverage trade-off. Unsupported constructs and poorly described tool outputs are security-relevant product requirements, not incidental implementation issues.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Control-Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
