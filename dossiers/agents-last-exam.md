---
type: Study Note
title: Agents' Last Exam
description: Personal study notes on ALE, a broad benchmark for generalist computer-use agents completing long-horizon professional workflows with deliverable-based verification.
resource: https://arxiv.org/abs/2606.05405v2
source: /archive/agents-last-exam.pdf
tags: [computer-use, agents, benchmark, evaluation, verification]
timestamp: 2026-07-14T16:06:03Z
---

# Agents’ Last Exam — Study Notes

**Authors**: Yiyou Sun et al.

**Venue**: arXiv:2606.05405v2 [cs.AI]

**Date**: June 2026
**Pages**: 40

## What It Is

Agents’ Last Exam (ALE) is a benchmark for generalist computer-use agents doing long-horizon, economically relevant professional work. The authors organize 1,490 runnable task instances from 960 expert-authored workflows into 13 industry clusters and 55 subdomains derived from SOC 2018 and O*NET, supplemented with emerging digital-work categories. Rather than ask for an answer or a short UI action, each task requires a professional deliverable—such as a CAD artifact, simulation result, financial workbook, program, report, animation, or game state—that can be checked against hidden references or a structured rubric.

Its target agent is a **generalist computer-use agent (GCUA)**: a system that combines model reasoning, visual perception, orchestration, tool/API use, and a runtime such as a VM or shell. This is deliberately broader than a CLI-only coding agent or a GUI agent limited to mouse and keyboard actions.

## The Problem It Addresses

Benchmark results have not reliably indicated whether agents can perform economically consequential work. Existing evaluations often trade among realistic workflows, industry breadth, long horizons, and automatic verification. Human grading supports richer tasks but is expensive and difficult to reproduce; narrow automated benchmarks are easier to run but can miss the interaction of software, files, domain knowledge, and multi-artifact delivery that professional workflows require.

ALE tries to make that trade-off more favorable by collecting workflows practitioners have already performed, converting them into runnable VM tasks, and making the output artifact—not the apparent plausibility of the agent’s trajectory—the evaluation target.

## How the Benchmark Works

1. **Collect expert workflows.** Practitioners submit prior projects with a description, inputs, target software, expected deliverable, and evaluation specification. Submissions then pass first review, implementation and engineer dry runs, and committee quality control.
2. **Separate task, agent, and environment.** A task’s `main.py` declares its description and resources in `load()`, prepares a deterministic VM state in `start()`, and scores artifacts in `evaluate()`. The agent sees task information and works through shell, GUI, file, and API actions; hidden references remain outside its workspace.
3. **Score deliverables with the closest checkable signal.** The paper uses exact/hash checks, structured numeric or tabular comparisons, geometric distance, visual comparison, behavioral state, free-text rubrics, and executable tests. Most workflows combine signals.
4. **Gate before scoring quality.** A missing, malformed, unsafe, or non-provenance-bearing artifact can force a zero before a continuous quality score is considered. For example, a manufacturing toolpath must clear a collision gate before geometry similarity earns credit.
5. **Limit contamination.** Of the reported 1,490 instances, 150 are public; the rest are private or awaiting QC. The intended rolling release moves retired public tasks out and fresh private tasks in.

## Important Results

- The authors report that the hardest Last-Exam tier remains unsaturated: in their main table, the listed mainstream configurations score 0–2.6% full-pass rate on its 38 tasks. Codex with GPT-5.5 reaches 38.1% pass on the 67-task Near-Term tier, 22.7% on Full-Spectrum, and 0% on Last-Exam; its reported overall rate is 24.0%.
- The benchmark measures partial completion separately from full pass. A configuration can achieve a materially higher mean score than full-pass rate, which exposes workflows where an agent produced some valid work but missed an essential artifact, constraint, or final verification step.
- Within the authors’ OpenClaw-controlled model comparison, changing the foundation model spans 16.8 percentage points of overall pass rate (4.3% to 21.1%), compared with 4.9–7.2 points when changing the harness under a fixed strong backbone. This is local evidence that model choice dominated harness choice in their tested configurations, not proof that harness engineering is generally unimportant.
- The failure analysis attributes 47% of classifiable failures to approach errors, 31% to understanding errors, and 22% to execution errors. It also reports that agents underuse GUI actions relative to task demand and often substitute ad-hoc scripts when they lack domain knowledge.
- Deterministic evaluation is the default: static analysis of the open task workflows finds 93.2% code-based judges and 6.8% LLM-as-judge workflows. When visual judging is necessary, the paper uses narrow, artifact-specific yes/no probes that code combines, rather than a single holistic quality score.
- Resource use does not track success monotonically in the reported runs. The paper shows configurations with more cost, time, or tokens sometimes scoring below more efficient ones; those measures should therefore be reported as trade-offs, not substituted for task success.

## What I Take From It

1. **The evaluator should own the definition of done.** Agent traces can reveal diagnosis, but an independently checked deliverable establishes whether the job’s required state was actually reached.
2. **Gates encode non-negotiable requirements.** Check file presence, parseability, required artifacts, safety constraints, provenance, or behavioral preconditions before awarding similarity or rubric credit. Otherwise partial progress and shortcut outputs can look better than usable work.
3. **Use LLM judging as a narrow sensor, not the score integrator.** When source code cannot compare a visual or creative result, constrain the model to observable pass/fail questions against a reference and retain the weighting and gating logic in code.
4. **Benchmark breadth is not deployment readiness.** ALE is much closer to professional work than short-form benchmarks, but a pass still depends on the task’s environment, reference, evaluator, and chosen workflow. It is evidence about the defined task surface, not an estimate of universal labor substitution or economic impact.

## Questions and Limitations

- The paper reports 1,490 total instances and 150 public instances, but its evaluation discussion also refers to 152 public tasks and tier counts of 67, 55, and 38. The tier sets may overlap, but the exact public-release accounting is not made explicit in the paper and should be confirmed before comparing aggregate results.
- Each run has a five-hour cap, and only a subset of configurations have three independent runs. Agent outcomes can vary with sampling, environmental timing, software changes, and harness implementation, so single-run comparisons should not be read as precise rankings.
- A deterministic score is only as good as its task specification. A reference can encode one acceptable workflow or overlook a real-world quality requirement; gates can also overconstrain legitimate alternative deliverables.
- The benchmark’s taxonomy is grounded in U.S. occupational classifications and non-physical digital work. It does not establish coverage of physical labor, organizational coordination outside the VM, changing requirements, or production accountability.
- Private tasks and rolling release help with contamination, but they reduce independent auditability. The paper’s public subset representativeness analysis is encouraging (reported cluster-level correlation `r=0.89` for one configuration), not a guarantee for every agent or future task pool.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
