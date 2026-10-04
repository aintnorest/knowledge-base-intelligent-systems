---
type: Study Note
title: "Terminal-Bench: Benchmarking Agents on Hard, Realistic Tasks in Command Line Interfaces"
description: Outcome-driven terminal-agent evaluation with audited task environments, model–scaffold comparisons, and separate trajectory and command failure taxonomies.
resource: https://arxiv.org/abs/2601.11868v1
source: /archive/terminal-bench-cli-agent-benchmark.pdf
tags: [benchmark, evaluation, agent-harness, coding-agents, reliability, agents]
timestamp: 2026-10-04T05:19:16Z
---

# Terminal-Bench — Study Notes

**Authors**: Mike A. Merrill, Alexander G. Shaw, Nicholas Carlini, and collaborators  
**Source version**: arXiv:2601.11868v1, January 17, 2026  
**Venue**: ICLR 2026, confirmed by the [official conference proceedings](https://proceedings.iclr.cc/paper_files/paper/2026/hash/444a3737adaee10d86ad2ef5f74468e6-Abstract-Conference.html). This note records the archived v1 rather than silently substituting the proceedings version.

## What It Is

Terminal-Bench is an evaluation framework for agents that manipulate real command-line environments. Its Terminal-Bench 2.0 dataset contains 89 hard, human-contributed tasks spanning software engineering, scientific computing, security, data work, and system administration. Each task combines an instruction, a containerized initial environment, a human-written reference solution, tests, and a time limit.

## Problem and Motivation

Narrow or saturated benchmarks miss the interdependent actions and domain knowledge needed for valuable technical work. A terminal exposes a broad action space without requiring a separate synthetic interface for every domain. But realistic environments also make benchmark correctness difficult: an agent failure might reflect missing capability, an underspecified instruction, a broken dependency, or an exploitable verifier.

## Mechanism as an Idea

The benchmark scores **final container state**, not a preferred command sequence or persuasive console narrative. Agents can choose different valid solution paths. The intended task contract has three properties: instructions and tests agree on acceptable outcomes; a reference workflow proves solvability; and shortcuts unavailable in real deployment cannot earn credit.

Task construction is itself an assurance pipeline. From 229 tasks by 93 contributors, the authors selected 89 through automated checks, model-assisted review, expert review, replay of agent failures, and adversarial attempts to exploit tests. Each accepted task received about three combined reviewer-hours across three reviewers. A passing oracle and a failing no-op agent are necessary but not sufficient evidence of task quality.

The minimal Terminus 2 scaffold uses a headless interactive terminal as its sole action surface, plus model-based context summarization at the context limit. It provides a common testbed alongside richer scaffolds; it does not prove that models can be separated completely from their interfaces.

The paper keeps two diagnostic layers distinct. A trajectory taxonomy adapted from MAST groups specification violations, repetition and stopping errors under **Execution**; context loss, derailment and reasoning–action mismatch under **Coherence**; and premature or inadequate checking under **Verification**. A separate command taxonomy describes observable invocation, filesystem, interpreter, runtime, network and other tool failures. An unsuccessful command is not automatically the cause of an unsuccessful task.

## Results and Admissions

- The paper reports six scaffolds, at least five benchmark repetitions per supported model–scaffold pair, and 32,155 task trials. Its experimental-setup sentence says 16 frontier models, although the model list and result table contain more; this is a source inconsistency.
- The result table gives **62.9% ± 3.0%** resolution for GPT-5.2 with Codex CLI, **57.8% ± 2.5%** for Claude Opus 4.5 with Terminus 2, and **56.9% ± 2.5%** for Gemini 3 Pro with Terminus 2. Intervals are reported as 95% confidence intervals. The best open-weight pairing, Kimi K2 Thinking with Terminus 2, reaches **35.7% ± 2.8%**.
- Scaffold choice matters: Gemini 2.5 Pro scores **32.6%** with Terminus 2 versus **15.7%** with OpenHands. The headline chart chooses each model's best scaffold, so it is not a fixed-interface model ranking.
- Most trials finish within 20 minutes; extreme trials run up to two hours, make hundreds of calls, and use nearly 100 million tokens. The authors find no meaningful positive association between average turns or output tokens and task success. This is observational evidence, not a causal finding that more deliberation never helps.
- Command error rates range from **9.2%** for Grok 4 to **26.7%** for GPT-OSS-120B. Among **3,800 sampled command failures**, unavailable executable names account for **24.1%**, application-level failures **9.6%**, and missing regular files **11.1%**. These denominators are failed commands, not all actions or final failed tasks.
- Failure detection at command level achieves **92.4%** agreement on 66 input–output pairs; command-category assignment achieves **82.0%** agreement on 50 annotations. The trajectory judge is compared against 120 human-labeled traces, reporting **90%** agreement, **92%** precision and **90%** recall.

Internet access preserves useful workflows but allows changing dependencies and possible discovery of public oracle solutions. The authors report no observed oracle lookup in their inspected trajectories, not a guarantee against contamination. There is no private held-out set, objective test-coverage measurement, or quantitative estimate of residual benchmark flaws.

## Analyst Takeaways

1. **Validate the measurement system before attributing failure to the agent.** Specification–test agreement, a genuine reference workflow, and adversarial shortcut review protect different validity properties.
2. **Expose environment facts instead of forcing speculative discovery.** Frequent missing-executable and missing-file errors motivate accurate capability and workspace observations. The paper measures the problem; it does not test a disclosure intervention.
3. **Use failure layers to choose the repair boundary.** A missing executable may need environment handling; ignoring its error needs observation interpretation; declaring success despite it needs independent completion evidence.
4. **Compare deployed model–scaffold pairs, not model names alone.** A neutral scaffold improves comparison discipline but remains an interface with its own state, output and compaction behavior.
5. **Measure verified progress alongside expenditure.** Large transcripts and many turns are not reliable proxies for useful work.

## Questions and Limitations

- The archived v1 mixes **89 tasks** in the main description with a **74-task** token-count caption; the human-time table's counts also total 74 despite being described as covering all tasks. Preserve these as unresolved denominators rather than treating token totals as normalized to 89 tasks.
- Appendix G contains mismatched statistics: the episode plot legend gives **r = −0.084, p = 0.733**, while prose gives **r = −0.028, p = 0.916**; the output-token plot legend gives **r = −0.073, p = 0.767**, while prose/caption give **r = −0.170, p = 0.515**. Only their shared qualitative conclusion is used here.
- Estimated human task times are author judgments, not timed human baselines. Diverse containers and internet-dependent resources limit reproducibility.
- The trace and command labels depend on model judges calibrated on small human samples. Overlapping rubric categories and rare error types can remain ambiguous.
- Final-state scoring does not establish safe intermediate behavior, maintainability, or readiness for uncontrolled production tasks.

## Vault Ideas Extracted

* [Tool-Availability Abstention](/vault/tool-availability-abstention.md)
