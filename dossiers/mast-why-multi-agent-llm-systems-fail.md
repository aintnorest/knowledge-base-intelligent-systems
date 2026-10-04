---
type: Study Note
title: "Why Do Multi-Agent LLM Systems Fail?"
description: MAST organizes multi-agent failures into system design, inter-agent misalignment and verification, with trace annotation and bounded orchestration interventions.
resource: https://arxiv.org/abs/2503.13657v3
source: /archive/mast-why-multi-agent-llm-systems-fail.pdf
tags: [multi-agent, reliability, orchestration, evaluation, agents]
timestamp: 2026-10-04T05:19:16Z
---

# Why Do Multi-Agent LLM Systems Fail? — Study Notes

**Authors**: Mert Cemri, Melissa Z. Pan, Shuyi Yang, and collaborators  
**Status**: NeurIPS 2025 Datasets and Benchmarks Track paper; this note uses arXiv:2503.13657v3, October 26, 2025.

## What It Is

A study of failure patterns in LLM multi-agent systems, introducing the **Multi-Agent System Failure Taxonomy (MAST)** and **MAST-Data**. The dataset contains **1,642 annotated execution traces** across frameworks and coding, mathematical and general-purpose tasks. The paper reports seven systems in its aggregate description and four model families; framework counting is not completely consistent across sections.

## Problem and Motivation

Adding agents, roles and communication does not reliably improve task outcomes. Whole-system accuracy conceals whether a run failed because of ambiguous roles, lost context, a misleading handoff, an unchallenged assumption, or a weak completion check. The authors seek consistent observed-failure labels that can guide system design, rather than attributing every problem to the base model.

## Mechanism as an Idea

MAST develops **14 failure modes in three families**:

- **System design**: task or role disobedience, repeated steps, lost conversation history, and failure to recognize termination.
- **Inter-agent misalignment**: conversational reset, missing clarification, derailment, withheld information, ignored peer input, and disagreement between reasoning and action.
- **Task verification**: premature ending, missing or incomplete verification, and incorrect verification.

This classification locates design and coordination opportunities without asserting that every labeled incident has an isolated causal origin. A single trace can contain several interacting failures.

The taxonomy starts with grounded-theory analysis of **150 traces from five frameworks**. Six experts spend more than 20 hours each examining traces; iterative coding, comparison and disagreements refine the labels. Three agreement rounds involve three experts independently labeling five traces per round and then resolving disagreements. Human agreement reaches **Cohen's κ = 0.88**.

A few-shot model judge scales annotation. Against human annotations it reports **94% accuracy**, **0.77 recall**, **0.833 precision**, **0.80 F1**, and **κ = 0.77**. A further human agreement round on new systems and domains reaches **κ = 0.79**. Agreement supports reproducible coding; it is not proof that labels exhaust the causes of failure.

The examples make a useful distinction between **message transport and semantic coordination**. A specialist can discover the correct credential requirement but fail to tell its supervisor. A planner can interpret a hypothetical check as a performed check. Either interaction can be well-formed while withholding the information needed for a correct next action.

## Results and Admissions

Reported system failure rates range from **41% to 86.7%**, but the systems are evaluated on different tasks and benchmarks. These figures demonstrate common failures, not a controlled leaderboard of frameworks.

Figure 1 allocates observed failures to system design (**44.2%**), inter-agent misalignment (**32.3%**), and verification (**23.5%**). Step repetition (**15.7%**), termination unawareness (**12.4%**) and reasoning–action mismatch (**13.2%**) are prominent individual labels. **Figure 2 gives different aggregate category shares—37.17%, 31.41%, 31.41%—without clearly reconciling the denominator.** These aggregates should not be merged or averaged.

The authors test targeted interventions, with effects bounded by the tested system:

- For ChatDev on **32 ProgramDev-v0 tasks**, baseline success is **25.0%**. A package of role clarity, hierarchical oversight and verification prompting reaches **34.4%**; an adjusted cyclic topology, explicit executive completion authority and bounded iteration reaches **40.6%**. The **15.6 percentage-point** increase is a bundled design result, not the isolated causal effect of a single verification instruction.
- On HumanEval, the corresponding ChatDev results are **89.6%**, **90.3%**, and **91.5%**. The larger ProgramDev improvement does not transfer unchanged to the easier evaluation.
- For AG2 on **200 GSM-Plus tasks**, across six repetitions, GPT-4 baseline accuracy is **84.75% ± 1.94%**, prompt intervention **89.75% ± 1.44%**, and topology intervention **85.50% ± 1.18%**. The topology effect is not significant (**p = 0.4**). With GPT-4o, baseline **84.25% ± 1.86%** rises to **89.00% ± 1.38%** for prompting and **88.83% ± 1.51%** for topology; the latter has **p = 0.03**.

Verification failure is not equivalent to neglecting to run any check. A verifier may test compilation while failing to assess application behavior. The appendix also examines successful trajectories with flawed intermediate behavior, reinforcing that MAST labels and final task outcomes answer different questions.

## Analyst Takeaways

1. **Agent count is not a reliability mechanism.** More specialists add handoff, context and termination obligations; reliability depends on whether the information needed to finish actually moves through the system.
2. **Audit delivery and consumption of findings.** A structured handoff should establish what was learned, whether it was communicated, and whether the recipient's next decision used it. Correct message shape alone does not establish semantic coordination.
3. **Give completion an explicit owner and evidence contract.** Stopping ambiguity and premature stopping are opposite manifestations of an unclear completion boundary. An owner still needs task-level evidence, not only subordinate assurance.
4. **Judge artifacts at the abstraction level of the requirement.** Build success can be necessary without proving behavior. Verification should match the requested outcome rather than whichever check is cheapest to perform.
5. **Use taxonomies to design experiments, not to declare causes.** A cluster of repetition or ignored-peer labels suggests an intervention target. A controlled comparison is still needed to show that the proposed orchestration change improves that workload.

## Questions and Limitations

- The taxonomy is explicitly non-exhaustive. Grounded-theory saturation in selected traces does not demonstrate coverage of all multi-agent environments or future architectures.
- Dataset bookkeeping is ambiguous: the construction section describes five initial systems, two generalization systems, and Manus, while still saying seven frameworks. The failure-rate plot includes six. Framework populations should be checked before using the dataset for system-level comparisons.
- Figure 4's category shares (**41.8%, 36.9%, 21.3%**) concern an initial 210-trace subset and are not interchangeable with the overall figures. The unexplained Figure 1–2 mismatch remains distinct from this legitimate subset difference.
- Model-generated annotations have imperfect recall and depend on rubric definitions, examples and trace visibility. Human agreement does not eliminate shared interpretation bias.
- Intervention packages change several variables simultaneously; their gains are benchmark- and model-dependent. The results do not justify universal hierarchical or cyclic orchestration.
- Some label boundaries describe behaviors rather than causes. Repetition may arise from misunderstood feedback, insufficient capability, or a broken environment; correcting the symptom alone may not repair the task.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
