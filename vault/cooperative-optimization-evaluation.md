---
type: Synthesis
title: Cooperative Optimization Evaluation
description: Evaluating an agent that optimizes against a shared system by reporting the host system's utility and the universal-adoption equilibrium alongside the optimizer's private gain.
tags: [evaluation, reliability, governance, adversarial-robustness]
timestamp: 2026-08-11T20:53:33Z
---

# Cooperative Optimization Evaluation

Whenever one party optimizes its inputs against a system that many parties share — a ranking function, an answer engine, a recommender, a marketplace, an LLM-judged review process — a single-number evaluation of "did my score go up?" is systematically misleading. Cooperative optimization evaluation adds two axes that expose what the optimizer is actually doing.

## The Three Measurements

1. **Private gain.** The optimizer's own objective: visibility, rank, conversion, acceptance rate. This is the number everyone already reports.
2. **Host utility.** What the shared system delivers to its users while the optimization is in play — answer faithfulness, citation precision, coherence, insight, user satisfaction. An optimizer that raises (1) by lowering (2) is extracting value from the commons, not creating it. Measure host utility on the *same* runs, not in a separate experiment.
3. **Universal-adoption equilibrium.** Re-run with *every* participant applying the same optimization, not just the one under test. This answers the question that determines whether the technique is worth adopting at all.

## Why the Third Measurement Matters Most

Optimization against a shared, relative objective is usually zero-sum in the limit. The common finding is that when all participants adopt the same strategy, individual advantage collapses back to baseline — the gain was positional. What happens to host utility in that regime is the interesting fork:

- **Utility rises**: the optimization was genuinely quality-improving, the private return is a first-mover return, and the end state is a better commons with no durable winner. Honest framing for a program pitch.
- **Utility falls**: a tragedy of the commons. Everyone spends effort, nobody gains position, and the shared system degrades. This is the case that should stop deployment.

Reporting only the single-optimizer result silently assumes the rest of the world stays passive, which is exactly the assumption that fails once a technique works and spreads.

## Practical Use

- Include an **adversarial arm** — the injection, spam, or gaming strategy a bad actor would use — as a baseline. The strong result is beating it on *its own* private metric while leaving host utility intact; this converts "we chose to be cooperative" from an assertion into a measured claim.
- Track host utility as a **vector, not an average**. Cooperative methods typically preserve most dimensions while quietly costing one or two; averaging hides that.
- Watch for **homogenization** in the universal-adoption arm. Uniform improvement in machine-facing quality metrics can coincide with a collapse in diversity that no utility metric captures.
- State the equilibrium finding in the summary, not the appendix. It is the part a decision-maker needs.

## Limitations

- Host utility is often measured by an LLM judge, inheriting its biases; a method that flatters the judge can look cooperative without being so.
- The universal-adoption simulation approximates a homogeneous world. Real ecosystems adopt partially, at different rates, and with different tools, so the true equilibrium sits somewhere between the two arms.
- Cooperativeness demonstrated for one rule set, objective weighting, or training budget does not carry over to a variant tuned harder on private gain. It is a property of the configuration, not of the framework.

## Sources

- [What Generative Search Engines Like and How to Optimize Web Content Cooperatively dossier](/dossiers/autogeo-generative-engine-optimization.md) — AutoGEO reports GEO visibility jointly with generative engine utility, beats prompt-injection attacks on their own visibility metric while those attacks degrade answer quality, and shows that under global adoption individual visibility returns to baseline while engine utility improves.
