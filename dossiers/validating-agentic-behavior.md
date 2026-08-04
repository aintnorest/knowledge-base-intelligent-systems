---
type: Study Note
title: Validating Agentic Behavior When Correct Isn't Deterministic
description: Personal study notes on GitHub's dominator-analysis Trust Layer for validating non-deterministic computer-use agent runs from a few successful execution traces.
resource: https://github.blog/ai-and-ml/generative-ai/validating-agentic-behavior-when-correct-isnt-deterministic/
source: https://github.blog/ai-and-ml/generative-ai/validating-agentic-behavior-when-correct-isnt-deterministic/
tags: [computer-use, agents, verification, evaluation]
timestamp: 2026-07-13T02:42:42Z
---

# Validating Agentic Behavior When Correct Isn't Deterministic - Study Notes

**Authors**: Gaurav Mittal and Reshabh Kumar Sharma  
**Publisher**: GitHub Blog  
**Date**: May 6, 2026; updated May 26, 2026  
**Format**: Engineering blog post; reports a Copilot cloud-agent / VS Code computer-use evaluation

## What It Is

GitHub describes a proposed independent "Trust Layer" for validating autonomous-agent behavior when multiple action paths can be valid. Rather than compare a new run against a recorded step-by-step script or accept the agent's self-report, it learns a graph of successful execution traces and tests whether the new run reaches the graph's essential milestones in the required order.

The key technical move is **dominator analysis**: a state is essential when every path from the task start to successful completion must pass through it. Thus, a loading screen can be optional while opening a search dialog and reaching search results remain required.

## The Problem It Addresses

UI and computer-use agents operate in noisy environments. Timing, rendering, transient screens, and alternative interactions can change from run to run without changing task success. Conventional assertion-based, record-and-replay, visual-regression, and black-box ML-oracle approaches can therefore create false negatives: the agent completes the task but the validator rejects its noncanonical path.

The article reframes correctness as "reliably achieving essential outcomes," not reproducing every observable intermediate state. It also treats an agent's self-assessment as insufficiently independent for judging whether the agent actually succeeded.

## How the Trust Layer Works

1. **Capture passing traces.** Collect 2–10 verified successful sessions. Model each as a Prefix Tree Acceptor (PTA): nodes are observable states (screenshots or code snapshots) and edges are actions or transitions.
2. **Build a master graph.** Merge the PTAs while preserving genuine branches. State-equivalence checks proceed from perceptual hashes and SSIM to a multimodal LLM only for ambiguous cases; merging is conservative.
3. **Extract the essential skeleton.** Apply dominator analysis to the merged graph. Nodes that dominate the successful terminal state are the required checkpoints; bypassable states are optional variation.
4. **Validate a new trace.** Compare its states to the essential sequence with topological subsequence matching. Extra states are allowed, but skipping or reordering an essential state fails validation.
5. **Explain the result.** Report essential-state coverage and the specific missing or incorrectly ordered checkpoint, rather than only a binary verdict.

## Results Reported

In a Copilot Agent custom VS Code extension test suite, the article reports that the PTA/Dominator Tree method achieved 100% accuracy, precision, recall, and F1 for distinguishing successful runs from product or agent failures. The computer-use agent's self-assessment reported 82.2% accuracy and 69.8% F1. For identifying "not a bug" cases—an agent execution failure rather than a product regression—the article reports 52.2% F1 for the structural method and 0% for self-assessment.

These are internal, scenario-specific results from an engineering post, not evidence that the reported figures generalize to arbitrary agents, tasks, or UI environments.

## My Takeaways

1. **Success traces can specify behavior without overspecifying a path.** A small collection of verified trajectories is enough to derive a practical contract when every valid route shares observable checkpoints.
2. **Make the validator independent of the actor.** An agent's confidence or completion message is a useful signal, not the source of truth. External state and an inspectable validation model make CI failures more actionable.
3. **Use an LLM narrowly.** The design reserves multimodal semantic judgment for state-equivalence ambiguities; graph structure, dominance, and ordered matching then carry the final decision. This is more auditable than asking an LLM to grade an entire execution.
4. **This validates milestones, not all requirements.** The learned skeleton is well suited to path variation, but it does not establish temporal performance, security properties, or domain correctness that is invisible in the observed state representation.

## Questions and Limitations

- The method needs 2–10 verified success traces, so it cannot define correctness from a specification or failure-only data alone.
- Conservative state merging avoids unsafe equivalences but can leave a graph fragmented; inaccurate LLM equivalence judgments can instead merge meaningfully distinct states.
- The current approach checks relative order, not duration. A run may pass despite an unacceptable delay unless temporal constraints are added.
- Screenshot-driven state is incomplete. DOM, accessibility, network, API, and persistent-data signals may be needed to prove outcomes that a UI image cannot reveal.
- Recomputing the model from newly accepted successes creates an online-learning risk: admission criteria must prevent regressions from becoming part of the accepted structure.

## Vault Ideas Extracted

* [Dominator-Based Agent Validation](/vault/dominator-based-agent-validation.md)
