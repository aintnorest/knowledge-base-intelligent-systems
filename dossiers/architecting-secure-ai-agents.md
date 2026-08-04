---
type: Study Note
title: Architecting Secure AI Agents: Perspectives on System-Level Defenses Against Indirect Prompt Injection Attacks
description: Study notes on a position paper advocating security-aware dynamic replanning, bounded learned security judgments over structured artifacts, and human resolution of inherently ambiguous agent-security decisions.
resource: https://arxiv.org/abs/2603.30016v1
source: /archive/architecting-secure-ai-agents.pdf
tags: [agent-security, prompt-injection, agents, human-in-the-loop, access-control, orchestration]
timestamp: 2026-07-14T16:16:51Z
---

# Architecting Secure AI Agents — Study Notes

**Authors**: Chong Xiang, Drew Zagieboylo, Shaona Ghosh, Sanjay Kariyappa, Kai Greshake, Hanshen Xiao, Chaowei Xiao, and G. Edward Suh
**Venue**: arXiv:2603.30016v1 [cs.CR]
**Date**: March 31, 2026
**Pages**: 11
**DOI**: 10.48550/arXiv.2603.30016

## What It Is

This is a position paper about the architecture of general-purpose agents facing indirect prompt injection, rather than a new implemented defense or a benchmark result. Its central claim is that useful agents cannot always freeze a trusted plan before reading the world: dynamic tasks such as debugging and changing APIs require execution feedback, replanning, and often corresponding policy updates. The security problem is therefore not eliminated by plan-execution isolation; it moves to deciding when an environment-influenced plan or policy change is legitimate.

The authors propose a six-part loop: an orchestrator creates a plan and policy; a plan/policy approver reviews them; an executor proposes concrete actions; a policy enforcer permits or blocks them; the environment returns feedback; and the system may update plan and policy. They identify security-critical decision points both at enforcement and on the feedback paths that can influence future planning. The paper's practical thesis is to use rules wherever they suffice, but use learned models for irreducibly semantic decisions only after the system has narrowed both the model's input and authority. Human interaction remains necessary where the user's intent or acceptable risk is inherently ambiguous.

## The Problem With Static Isolation

Existing defenses often precommit a plan from a trusted user request and then execute it without letting untrusted text revise control flow. That can sharply constrain injection, but the paper argues it is too brittle for broad autonomy. A billing API may return an ordinary `410 Gone` and require an agent to find a replacement endpoint and change its parser. A coding agent fixing tests needs to inspect each new failure, patch the code, rerun tests, and revise its approach. A finite set of up-front conditional branches cannot cover all relevant runtime states, and the environment can influence branch selection anyway.

Policy has the same dynamic property. A global tool rule can be too restrictive—for example, forbidding a legitimate invoice-derived payment recipient—or too permissive, as when a retrieved page manipulates the amount of an otherwise allowed payment. Even a task-specific start-of-run policy may not know which production log, source file, endpoint, or diagnostic is required after an observed failure. Letting new evidence expand permissions, however, gives untrusted environmental content an indirect path to consequential authority. The unresolved core problem is to distinguish a justified update from a maliciously steered one.

## Proposed Architecture and Design Axes

The paper models an execution step as an action with input and output objects, and a plan as an ordered sequence or graph of those steps. A policy is a predicate over steps and execution history; it can express global access controls, task-specific least privilege, context-dependent constraints, or information-flow rules. Policies may be structured rules, code-level functions, or authorization languages such as Cedar.

The proposed execution loop is:

1. An **orchestrator** produces a plan and policy from the high-level task.
2. A **plan/policy approver** checks the proposed structures and can request a human decision for personalization or ambiguity.
3. An **executor** turns the plan into a concrete action.
4. A **policy enforcer** applies rule-based, model-based, or human checks before that action crosses into the environment.
5. The environment, or a rejection by the enforcer, supplies feedback.
6. The executor reports that outcome, possibly triggering a revised plan and policy.

The first design axis is policy scope, representation, and enforcement: more expressive policies can encode richer task context but are harder to verify. The second is secure processing of environment feedback: preserve enough information for recovery while limiting an attacker’s ability to influence the models that approve changes. The paper positions CaMeL as strong isolation with reduced adaptability, Progent as adaptable but vulnerable because unrestricted feedback reaches its policy adjuster, PFI as redacting feedback at a utility cost, AgentArmor as using raw environmental text in a vulnerable LLM judge, and DRIFT as reducing but not eliminating the adaptive attack surface.

## Bounded Model-Based Security Decisions

The authors reject both extremes: a purely programmatic system cannot express every context-dependent security judgment, while an unconstrained LLM judge can itself be prompt-injected. The proposed division of labor is to use deterministic mechanisms for crisp invariants—such as workspace bounds or network allowlists—and give a learned model only a narrow semantic decision over structured, system-generated artifacts. Instead of passing arbitrary web pages, emails, or tool output to a judge, pass a typed execution trace, the proposed plan/policy diff, bounded supporting evidence, and an explicit decision contract.

One proposal separates instruction recognition from deciding whether to follow an instruction. First, a model explicitly surfaces candidate instructions it intends to follow. The system then traces their provenance and applies one of three policies: reject external instructions where none are expected; require user approval where they are allowed; or reduce interruptions by predicting before retrieval whether a source should contain instructions and by judging a proposed update to a structured instruction-state record. The proposed judge sees that state and diff, not the raw source text.

The second proposal uses an LLM to synthesize a deterministic, step-specific validator for environmental feedback. In an investor-relations retrieval task, for example, a validator could extract only the revenue cell from a table with specified headers, enforce a number pattern, and preserve a DOM-path citation. The runtime applies that validator to a structured page representation rather than trusting an executor to ignore malicious prose. These are research directions, not demonstrated end-to-end defenses or guarantees.

## Human Decisions Are Not a Fallback for Every Failure

The paper distinguishes ordinary high-risk approvals from a more fundamental problem: some terms and objectives are not fully specified. “Urgent” email can have different user-specific meanings, and a coding agent's instruction to reproduce an issue can conflict with a policy against executing untrusted code. No model can resolve a subjective preference absent user input. The authors therefore put human checkpoints at plan/policy approval and action enforcement, and suggest learning preferences over time or front-loading clarification to reduce interruption burden.

## Evaluation Implications

The paper argues that existing prompt-injection benchmarks can make incomplete defenses appear both secure and useful. Many tasks are short, predictable, and lack runtime change; AgentDojo is cited as having only 6 of 97 tasks requiring policy update or replanning. Attack payloads and objectives are usually static, whereas a real attacker may alter parameters of a nominally legitimate tool call or optimize its payload against the deployed defense. The authors call for longer-horizon dynamic tasks, changing environments, task-specific attack objectives, and pluggable adaptive attackers.

This is a persuasive architectural agenda, but it does not validate a concrete system, quantify the usability cost of its checkpoints, or show that its structured artifacts cannot carry adversarial influence. A model operating over a plan diff may be safer than one reading a webpage, but it is still a learned security decision maker. Claims about reduced attack surface need threat-model-specific implementations and adaptive evaluation.

## Analyst Takeaways

1. **Treat a plan or policy update as a privileged operation.** General-purpose recovery requires change, but the change request should be explicit, attributable, bounded, and independently enforceable—not an unlogged consequence of appending raw tool output to a prompt.
2. **Constrain models by interface and authority, not only by instructions.** A semantic judge can add value where rules fail, but it should see a minimal structured artifact and return a limited decision that a deterministic layer can validate and apply.
3. **Separate task adaptation from permission expansion.** A revised plan does not automatically justify new tool, data, or egress authority. Require an evidence-bearing policy diff and evaluate the least additional privilege needed for the revised step.
4. **Test adaptation as an attack surface.** Measure recovery from benign failures alongside attacks that manipulate errors, documentation, parameters, or update proposals; fixed-payload action substitution alone will overstate security.
5. **Use human interaction for ambiguity, with an explicit product budget.** Escalate decisions whose acceptable answer depends on a user’s preference or risk tolerance, but bind approval to a concrete action, scope, and consequence to avoid habituation.

## Questions and Limitations

- The paper is a vision and design analysis. It provides no implementation, controlled comparison, or quantitative evidence that the proposed architecture improves both task success and resistance to adaptive attacks.
- A typed trace, instruction state, or plan/policy diff is not automatically safe. Its fields, encoding, provenance, and supporting-evidence path may still be manipulated or omit security-relevant context.
- The proposal that a model faithfully verbalizes intended instructions needs empirical validation, including attacks that suppress, overload, or manipulate that verbalization.
- Runtime validator synthesis moves risk into validator correctness, coverage, and the fidelity of the structured source representation. A validator can reject malformed data without establishing that an accepted value is true or appropriate.
- Dynamic policy updates create state-management questions the paper does not settle: rollback after partial side effects, freshness of prior approvals, conflicting updates, and auditing or revoking accumulated privilege.
- Human approval can resolve subjective intent but can also be inaccurate, fatigued, or poorly informed. Its security effect depends on the decision interface and authorization scope.

## Vault Ideas Extracted

* [Security-Aware Replanning](/vault/security-aware-replanning.md)
* [Bounded Model Security Adjudication](/vault/bounded-model-security-adjudication.md)
