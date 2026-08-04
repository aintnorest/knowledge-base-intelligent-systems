---
type: Study Note
title: Design Patterns for Securing LLM Agents against Prompt Injections
description: Study notes on six system-design patterns that restrict how untrusted natural-language data can influence an LLM agent's actions, with ten application case studies.
resource: https://arxiv.org/abs/2506.08837v3
source: /archive/design-patterns-securing-llm-agents-prompt-injections.pdf
tags: [agents, agent-security, prompt-injection, tool-use, access-control]
timestamp: 2026-07-14T16:11:55Z
---

# Design Patterns for Securing LLM Agents against Prompt Injections - Study Notes

**Authors**: Luca Beurer-Kellner, Beat Buesser, Ana-Maria Creţu, Edoardo Debenedetti, Daniel Dobos, Daniel Fabian, Marc Fischer, David Froelicher, Kathrin Grosse, Daniel Naeff, Ezinwanne Ozoani, Andrew Paverd, Florian Tramèr, Václav Volhejn
**Source**: arXiv:2506.08837v3 [cs.LG, cs.CR]
**Date**: June 27, 2025 (v3)
**Pages**: 32
**DOI**: 10.48550/arXiv.2506.08837

## What It Is

This is a security-design paper, not a new prompt-defense recipe. Its central argument is that a general-purpose LLM agent which both reads arbitrary natural language and holds consequential capabilities cannot receive a dependable prompt-injection guarantee merely by becoming better at recognizing malicious text. Instead, useful application-specific agents can become meaningfully resistant when their architecture prevents untrusted content from altering consequential control flow or reaching privileged model context.

The authors lay out six composable patterns, analyze what each still permits an attacker to affect, and apply them to ten applications: OS file assistance, SQL analysis, email and calendar work, customer service, booking, product recommendation, résumé screening, medication leaflets, medical diagnosis mediation, and software engineering. The paper deliberately trades some open-endedness for an architecture whose trust boundaries can be inspected and reasoned about.

## The Security Model

The paper treats any natural-language content that an attacker can influence as potentially instruction-bearing: direct user input, emails, calendar descriptions, files, database rows, reviews, résumés, web documentation, and imported code. If such content is put into the context of a tool-using model, an injection may cause unauthorized actions, data exfiltration, modification or deletion, resource exhaustion, or harmful downstream text.

The guiding invariant is stronger than “tell the model not to follow untrusted instructions”: after an agent has ingested untrusted input, that input must not be able to cause a consequential action. At a minimum, the restricted component must lack tools that can compromise integrity or confidentiality, and its outputs must not become an unbounded channel into another privileged decision maker.

This explains the paper's skeptical stance toward LLM-level detectors, prompt hardening, and adversarial training. They can raise the attacker's cost but remain heuristic. User confirmation can be theoretically effective, but the paper notes both automation costs and the risk that tired or overloaded reviewers approve an unsafe action. The proposed patterns are system-level restrictions intended to make a limited claim easier to enforce.

## The Six Patterns

### 1. Action Selector

The LLM is a natural-language translator over a fixed allowlist of predefined actions or templates. It does not read third-party data and does not receive tool feedback. This is close to an LLM-modulated switch statement. It can be robust because the model cannot be induced to choose an arbitrary new action, but utility is limited by what the designer anticipated.

### 2. Plan Then Execute

Before processing untrusted tool output, the model commits to a fixed action plan. The later execution may read adversarial data, but that data cannot add actions or change the action sequence. The paper characterizes this as a form of control-flow integrity. It does *not* fully protect action parameters: content from a malicious calendar event could still alter the body of an email that a precommitted plan sends.

### 3. LLM Map-Reduce

Separate untrusted items are processed by isolated, unprivileged LLM calls. Each map call must return a constrained result, such as a Boolean, category, score, or other value that cannot carry an arbitrary prompt injection. A deterministic reducer can aggregate these results, or an LLM reducer may be used only after output constraints make the map results safe for it to receive. This localizes a malicious file or review's influence to its own result rather than letting it steer processing of other items.

### 4. Dual LLM

A privileged LLM can plan and invoke tools but must never inspect untrusted data. A quarantined LLM can inspect that data but has no tool access. The difficult part is the return channel: simple outputs need a strict safety constraint; for richer values, the paper proposes symbolic handles. The privileged model can pass and combine a handle such as `$VAR` without dereferencing its text, while a non-LLM orchestrator substitutes the real value only when executing a tool call. This prevents the privileged model from receiving a new instruction through the value it is manipulating.

### 5. Code Then Execute

The planner writes an explicit program, rather than an informal plan, before it processes untrusted data. The program may call tools and unprivileged LLMs. This generalizes plan-then-execute: the program fixes the control structure but can still process runtime values. It therefore blocks untrusted data from changing the chosen program, not necessarily from changing all content passed through its already-allowed calls.

### 6. Context Minimization

An input can influence one narrow stage and then be removed before a later stage. For example, a customer prompt can be translated into a database query, then removed before the result is formatted for display. This limits a copied or malicious user prompt's ability to steer post-processing. The paper also describes a stronger form in a medical setting: remove both the original prompt and a free-text intermediate summary, then use a rigid structured symptom object so that the remaining intermediate cannot itself carry an injection.

## What the Case Studies Clarify

The application examples make clear that no pattern is a blanket solution.

- **Email and calendar**: a precommitted plan stops untrusted mail from adding actions, but an attacker can still influence recipients or message content. A quarantined drafter cannot exfiltrate through tools, yet its draft can still be malicious or encode sensitive information. Action semantics and output review still matter.
- **Product reviews and résumés**: map-reduce can bound each untrusted item's effect to its own product or candidate. It does not stop an item from making itself look good; it stops it from using text instructions to degrade other items.
- **SQL and code agents**: keeping database results out of the code-generating LLM removes one injection path, but Python execution still needs sandboxing and database access still needs normal authorization controls. For software engineering, a narrow, strictly formatted API description from quarantined processing is safer than exposing arbitrary third-party prose or code, at the cost of examples and nuance.
- **Health-related applications**: context minimization can restrict which text is returned, but rigid retrieval or schemas can omit relevant contraindications or fail to represent a symptom. A security pattern cannot substitute for the application-specific correctness and regulatory requirements.

## Important Takeaways

1. **The relevant boundary is dataflow into authority, not whether a string "looks like" an instruction.** A detector needs to recognize every attack; an architecture can instead ensure that a successful injection lacks a powerful path to exploit.

2. **Precommit the decisions that must not depend on untrusted content.** Plans and programs are useful when action choice and ordering can be decided from a trusted request before external material is read. They are weaker when external content legitimately controls parameters or the next step.

3. **Quarantine needs a constrained return channel.** Removing tools from an untrusted-data processor is insufficient if it can emit arbitrary prose to a privileged agent. Typed outputs, symbolic references, and deterministic orchestration are the mechanism that closes that loop.

4. **Security claims should be narrow and application-specific.** The best design depends on the harmful side effects, the attacker-controlled sources, and which information actually needs to cross a trust boundary. General-purpose autonomy is precisely what makes a strong guarantee hard.

5. **Classical controls remain necessary.** The appendix calls for action sandboxing, strict data formatting, user permissions, calibrated confirmation, and data/action attribution. These patterns organize LLM-specific trust flow; they do not eliminate ordinary access-control or execution risks.

## What I Would Question

- The paper calls its patterns capable of “provable resistance,” but the practical guarantee depends on the real tool schemas, orchestrator, format enforcement, and treatment of side effects. A permissive or leaky implementation can invalidate the architectural intent.
- Several examples treat a constrained result as safe because it cannot encode an instruction. It may still encode a high-impact false value. That is acceptable for the stated injection boundary, but applications also need integrity, calibration, and abuse analysis for the remaining value space.
- The case studies are design analyses, not a comparative implementation benchmark. They make the threat-model reasoning concrete, but do not quantify utility loss, engineering cost, or attack success across deployed agent stacks.
- Context minimization is only as strong as the intermediate representation. A natural-language summary can preserve the attack; strict structures reduce that channel but can be too coarse for a real task.

## Vault Ideas Extracted

* [Privileged–Quarantined Agent Split](/vault/privileged-quarantined-agent-split.md)
* [Intent-Then-Isolate Execution](/vault/intent-then-isolate-execution.md)
