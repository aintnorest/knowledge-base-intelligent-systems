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

## The Gate Is Relative to Its Verifier

A score-monotone refinement loop guarantees only that the *measured* score does not fall under its protocol. Without a calibrated verifier, a strict decrease in measured risk can still harm real utility. With stochastic measurement, a single comparison can admit a worse candidate. In Bilevel Coordinated Reflection's probe experiment, a single noisy verifier admitted 28.4% of worsening proposals, and five probes lowered that to 6.8% at added cost. Keep the protocol fixed for incumbent and candidate, validate independently, and re-anchor after drift ([Verifier Co-Evolution](/vault/verifier-co-evolution.md)).

A revision proposal is not evidence that revision is warranted. Intrinsic critique can replace correct answers with incorrect ones when it cannot reliably decide which incumbents to preserve. An oracle that stops revision on correct answers supplies the very capability under evaluation, so its gains cannot be credited to unsupported self-correction. Evaluate an intrinsic gate without privileged correctness labels, give initial generation and revision the same complete requirements, and compare repeated critique with independent sampling and selection at comparable inference cost. In one controlled study, same-model conversational debate improved over one answer but lost to matched-response voting; response counts did not exactly match token cost. That result does not settle whether genuinely diverse reviewers help, or whether revision grounded in external feedback succeeds.

## Expanding the Pool, Not Just Selecting From It

Selection alone fails when every candidate is wrong. Verification-guided expansion keeps the verifier's *diagnosis* (which criterion failed, what counterexample exists, what is still unknown) and uses it to build new alternatives: a local fix, a repair of another viable candidate, and a fresh approach. The original winner is retained, and all candidates are re-judged against the original task criteria. In Verify–Repair–Reselect, all five initial LiveCodeBench candidates were wrong for 117 Gemma and 215 Qwen problems; the method recovered 18 and 7. Those gains were offset by 18 and 8 new errors on previously solved cases, and the method beat fixed-pool selection in 9 of 16 settings without matched total budgets. For code, re-selecting on public tests can amplify visible-suite gaming, so the final gate must include held-out or human-owned outcome checks.

## Criterion Feedback Is Not a Retention Gate

A checklist can make revision feedback actionable: identify failed requirements, repair them, and preserve passed ones. An all-pass checklist can also suppress unnecessary revision. But a rule that triggers revision on any failed check does not guarantee that the new candidate is better; that requires a separate incumbent–candidate comparison and a retention decision.

STICK demonstrates the distinction. One checklist-guided revision raises Command-R+ LiveBench reasoning from 29.2 to 37.0 and overall score from 32.0 to 35.8, while stronger-model and category gains are much smaller or negative. Further revisions on LiveBench start to degrade results. Use decomposed feedback to locate changes, not to justify unlimited refinement or claim monotonic improvement. Independently validate the selected artifact, and preserve the incumbent when the proposed repair fails the declared gate.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Content Refinement Agent with AgentReview
- [WikiSkill dossier](/dossiers/wikiskill-persistent-knowledge-skill-evolution.md) — validation-gates skill changes, rolls back degrading candidates, and preserves their outcomes in a persistent wiki.
- [Bilevel Coordinated Reflection: A Game-Theoretic Approach to Multi-Agent LLM Systems dossier](/dossiers/bilevel-coordinated-reflection.md) — verifier calibration condition and single- versus five-probe false acceptance.
- [LLM-as-an-Improver: Turning Verification into Better Candidates dossier](/dossiers/llm-as-an-improver-verify-repair-reselect.md) — diagnosis-driven candidate expansion with both recoveries and regressions.
- [SpecBench: Measuring Reward Hacking in Long-Horizon Coding Agents dossier](/dossiers/specbench-long-horizon-reward-hacking.md) — visible-score reselection can favor reward-hacked candidates.
- [Large Language Models Cannot Self-Correct Reasoning Yet dossier](/dossiers/llms-cannot-self-correct-reasoning.md) — intrinsic correct-to-incorrect transitions and ICLR 2024 comparisons exposing oracle-retention, response-budget and prompt-information confounds.
- [TICKing All the Boxes dossier](/dossiers/ticking-all-the-boxes.md) — checklist-triggered self-refinement and all-pass stopping, not a demonstrated accept/revert gate; one-step gains coexist with regressions from further revision.
