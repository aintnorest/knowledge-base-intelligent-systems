---
type: Synthesis
title: Score-Gated Refinement
description: Iterative improvement using simulated peer-review feedback, with monotonic score constraints to prevent degradation loops.
tags: [peer-review, agents, evaluation, verification]
timestamp: 2026-07-11T16:00:00Z
---

# Score-Gated Refinement

A quality-control pattern where an agent iteratively revises an artifact based on simulated reviewer feedback, but only accepts changes that improve (or non-degradingly tie) an overall quality score.

## The Problem

Unconstrained iterative refinement often degrades output quality. An agent may over-correct one aspect while damaging another, or chase local improvements that harm global coherence. Without an objective gate, refinement becomes a random walk.

## How It Works

1. **Generate Initial Draft** — Produce the first complete artifact.
2. **Simulate Peer Review** — Run an automated reviewer to generate structured feedback: strengths, weaknesses, questions, and decisions.
3. **Address Weaknesses** — Rewrite sections, clarify logic, strengthen arguments, integrate answers to reviewer questions directly into the artifact.
4. **Re-score** — Run the reviewer again on the revised draft.
5. **Gate Decision**:
   - **Accept** if overall score increases.
   - **Accept** if score ties AND net sub-axis gains are non-negative.
   - **Revert and Halt** if score decreases, tie-breaker is negative, or iteration limit reached.

## Key Constraints

| Constraint | Rationale |
|------------|-----------|
| **No Separate Response Letter** | Answers are woven into the artifact itself, improving the output rather than creating auxiliary documents. |
| **Ignore New Experiment Requests** | The agent is a synthesizer, not an experimental runner. Requests for new data not in the original inputs are discarded. |
| **No Explicit Limitations** | Prevents reward hacking where the agent lists missing items as "limitations" to inflate scores. |
| **Preserve Strengths** | Sections flagged as strengths by the reviewer are protected from heavy alteration. |

## Impact

- **79–81% win rate** in side-by-side quality evaluation (refined vs. unrefined)
- **0% loss rate** — refinement never degrades quality under this gate
- **+19%/+22%** simulated acceptance rate gains (CVPR/ICLR)

## Beyond Document Revision

The same monotonic gate applies to executable agent procedures. WikiSkill proposes skill edits from accumulated traces and patterns, evaluates each candidate on a held-out validation split, and rolls back a degrading skill while retaining the failure in persistent knowledge. This extends the pattern from revising one artifact to evolving a reusable procedure without forgetting rejected interventions. It also sharpens the limitation: a gate prevents measured regression only to the extent that the validation set represents future tasks.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Content Refinement Agent with AgentReview
- [WikiSkill dossier](/dossiers/wikiskill-persistent-knowledge-skill-evolution.md) — validation-gates skill changes, rolls back degrading candidates, and preserves their outcomes in a persistent wiki.
