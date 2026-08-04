---
type: Study Note
title: Agent-Sentry: Bounding LLM Agents via Execution Provenance
description: Study notes on a runtime prompt-injection defense that learns normal action provenance from benign traces, deterministically handles most consequential calls, and reserves an LLM intent judge for unresolved cases.
resource: https://arxiv.org/abs/2603.22868v2
source: /archive/agent-sentry-execution-provenance.pdf
tags: [agent-security, prompt-injection, provenance, tool-use, agents, llm-as-judge]
timestamp: 2026-07-14T16:14:45Z
---

# Agent-Sentry — Study Notes

**Authors**: Rohan Sequeira, Stavros Damianakis, Umar Iqbal, and Konstantinos Psounis
**Venue**: arXiv:2603.22868v2 [cs.CR]; DOI: 10.48550/arXiv.2603.22868
**Version date**: May 8, 2026
**Pages**: 20

## What It Is

Agent-Sentry is a runtime defense for tool-using agents aimed at indirect prompt injection. It learns an empirical envelope of benign execution from prior traces, then checks each proposed **action** tool call against that envelope. Its central representation is a provenance graph that records the user prompt, ordered tool calls, and the declared sources and derivation type of every argument.

The proposed pipeline deliberately avoids asking an LLM to judge every call. A structural classifier first decides allow, block, or ambiguous from control-flow and per-argument provenance features. For ambiguous calls, a deterministic allowlist checks selected sensitive values only when their provenance is trusted. A bounded LLM judge handles the remaining cases by comparing the proposed action with the user's request and short, delimited excerpts of the relevant untrusted retrievals.

## Problem and Threat Model

An agent can combine an exposed tool set in execution paths its developer did not explicitly program. An indirect injection can enter through an externally authored retrieval, influence a later argument or action, and create an effect the user did not ask for. Agent-Sentry targets those unauthorized action calls, not text-only deception in a final answer, direct jailbreaks from a user prompt, or network tampering before a tool response reaches the agent.

The system assumes the agent scaffold, system prompt, tool implementations, underlying LLM, and user are trusted. Retrieval tools are classified as trusted or untrusted according to whether an external party can author their content; state-changing or externally visible tools are action tools. These assumptions are important: a compromised tool adapter, a malicious user request, or a convincing fake invoice that appears semantically legitimate are not eliminated by the proposed mechanism.

## How the Pipeline Works

1. **Instrument a trace.** The agent reports, for each argument, source call identifiers and whether the value was copied verbatim, derived, or generated. Prompt instructions and extended tool schemas collect the metadata, then strip it before the original tool executes. The trace becomes a directed acyclic provenance graph; an edge is labeled by the argument it supplied.
2. **Classify action structure.** Layer 1 can use a 17-feature XGBoost model or a rule-based classifier. Features cover action position, preceding retrievals/actions, source trust, prompt anchoring, untrusted-hop depth, sensitive-argument patterns, derivation type, and value matches against prior untrusted retrievals. The rule variant combines eleven anomaly and benign-confirmation detectors into rules mined from labeled traces.
3. **Verify finite, sensitive values.** Layer 2 checks an allowlist of `(tool, argument, value)` triples collected from benign executions. It is intentionally limited to relatively stable identifiers such as recipients, account references, credentials, file IDs, and product IDs; free-text bodies, URLs, dynamic amounts, and OTPs remain ambiguous rather than receiving a meaningless allowlist decision. A value from an untrusted or unverifiable source does not become safe merely because its string was seen before.
4. **Judge only the residual.** Layer 3 receives the original user prompt, pending action, argument provenance, a small prior-call window, and bounded excerpts from relevant untrusted retrievals. It treats the excerpts as data, looks for audience-shifting imperatives or authority claims, identifies whether the action's value came from descriptive versus imperative text, and returns allow or block.
5. **Learn and monitor coverage.** Novel but benign behavior is expected. The paper's intended response is to surface it as ambiguous, inspect or adjudicate it, and periodically refit the structural layers—while tracking utility, attack block rate, ambiguity, judge-routing rate, freshness, and distribution shift.

## Evidence and Results

The authors create Agent-Sentry Bench from seven AgentDojo/AgentDyn agents: 3,299 benign and 2,081 successful-injection traces (5,380 total), generated from 757 task specifications and 3,734 paraphrases. The benchmark is more varied than their Native-Trace Bench, which contains 670 traces from the original suites. All reported measurements replay captured traces, so they measure enforcement decisions on those traces rather than a live, end-to-end interaction distribution.

On five-fold cross-validation over Agent-Sentry Bench, the full XGBoost pipeline reports **96.4% utility** and **96.8% attack block rate (ABR)**. Layer 1 terminates 96.1% of action decisions, Layer 2 0.8%, and Layer 3 3.1%. The rule-based variant reports 89.3% utility and 95.3% ABR, but routes 31.0% of decisions to the judge. The authors report deterministic Layers 1–2 under 10 ms per trace for XGBoost; given a stated 1.2-second judge call and roughly two actions per trace, their calculated average full-pipeline addition is 0.073 seconds per trace.

The native benchmark exposes the coverage trade-off. When trained on Agent-Sentry Bench and transferred without native traces, XGBoost reports 64.4% utility / 90.9% ABR and the rules report 79.1% / 95.0%. The paper attributes lower utility to native prompts that delegate sensitive values entirely to untrusted retrievals and to previously unseen structures. With five-fold fitting on native traces, the reported XGBoost result is 69.1% utility / 91.2% ABR; the rules are 87.1% / 93.2%. These are useful stress signals, but the small native benign sets and supplementing XGBoost with Agent-Sentry-Bench data limit broad comparative claims.

The paper also reports that a tuned Layer-3 judge alone reaches 98.0% utility and 95.4% ABR on Agent-Sentry Bench, but an intentionally untuned judge shifts to 82.0% / 75.5% on Qwen 3.5-35B and 70.5% / 81.6% on Qwen 2.5-7B. That sensitivity supports the architectural choice to restrict judge exposure; it does not prove that the judge reliably recognizes all attacks. Across three injection delivery phrasings on Native-Trace Bench, reported ABR ranges from 90.8% to 92.3%, consistent with the claim that structural signals are less wording-dependent than input classifiers.

## Analyst Takeaways

1. **Place a provenance-aware reference monitor at consequential sinks.** Record which sources contributed every action argument and make unknown provenance explicitly unsafe or reviewable. This is more durable than treating a clean-looking string as authority.
2. **Use an escalation ladder, not one universal model call.** Fast structural rules or learned anomaly scores can admit routine behavior, deterministic checks can resolve narrowly grounded identifiers, and a semantic judge can be a controlled exception path. The safety case should not rest on an LLM judge's prompt alone.
3. **Separate identity reuse from authorization.** A recipient or account value observed in benign traffic can still be wrong in the present task. Check its origin, derivation, current user intent, and destination-specific policy—not just membership in an allowlist.
4. **Treat coverage as a security and product metric.** Training traces define an empirical normality boundary, not a policy guarantee. Grouped task-level holdouts, drift monitoring, reviews of ambiguous calls, and a conservative path for new workflows are required before extending the learned bound.

## Questions and Limitations

- The system relies on provenance metadata reported by the same LLM whose behavior may have been influenced. Cross-checking values against raw source text and treating unresolved IDs as unknown helps, but it is not an independent information-flow tracker.
- The structural fingerprint can be imitated. An attacker who supplies a value in a plausible-looking document, follows an expected tool sequence, and aligns with an ambiguous user request may evade both structural checks and the bounded judge.
- The benchmark retains only successful benign and successful injection traces, uses particular agents, tool taxonomies, and driving models, and evaluates replayed trajectories. Reported rates therefore do not establish robustness under adaptive deployment traffic or side effects that change a future trajectory after a block.
- The system blocks unauthorized action calls, not deceptive summaries, direct user jailbreaks, compromised trusted components, policy violations already implicit in a user's request, or aggregate harm from individually allowed actions.
- Periodic retraining can also enlarge an attack surface if contaminated or poorly labeled traces are admitted as benign. Production deployment needs trace integrity, provenance of labels, rollbackable model versions, and review thresholds in addition to the paper's pipeline.

## Vault Ideas Extracted

* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
