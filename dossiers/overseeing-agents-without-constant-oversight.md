---
type: Study Note
title: "Overseeing Agents Without Constant Oversight: Challenges and Opportunities"
description: Three small computer-use-agent studies show that requirement-linked trace navigation can speed successful error finding while increasing false confidence, without a demonstrated overall accuracy improvement.
resource: https://arxiv.org/abs/2602.16844v1
source: /archive/overseeing-agents-without-constant-oversight.pdf
tags: [human-in-the-loop, interaction-design, verification, computer-use, evaluation, agents]
timestamp: 2026-10-05T21:48:59Z
---

# Overseeing Agents Without Constant Oversight — Study Notes

**Authors**: Madeleine Grunde-McLaughlin, Hussein Mozannar, Maya Murad, Jingya Chen, Saleema Amershi, and Adam Fourney; University of Washington and Microsoft Research.  
**Published**: February 18, 2026; archived arXiv revision 1.  
**Status**: Research preprint; no accepted venue or valid publisher DOI established by the archived manuscript or title searches as of October 5, 2026. Its ACM template retains dummy conference, DOI, 2018 publication, and 2007–2009 receipt/acceptance text; these are not publication evidence.

## What It Is

An iterative HCI investigation of how people verify a completed computer-use-agent run without watching every action. Three studies of **12 participants each** move from existing Magentic-UI traces, through three summary designs, to a requirement-and-assumption interface linked to execution details. The final design makes some correct error findings faster, but does not establish improved overall judgment accuracy and increases confidence most when people mistakenly accept a wrong answer.

## Problem and Motivation

Intervention rights help only after a user identifies a problem. A long action trace preserves details but is costly to reconstruct after multitasking. A short process summary can conceal the exact mismatch that matters. The user may accept the answer because the *procedure seems reasonable*, confusing narrative coherence with executed correctness.

This is especially difficult for open-world research: one can check facts the agent found while still being unable to verify whether it searched thoroughly, chose the right interpretation, or omitted an alternative. Users also revise personal notions of what counts as correct or good enough during the task.

## Mechanism as an Idea

The formative study examines a human-in-the-loop agent with plan review, live takeover, action approval, and final review. Participants run several tasks concurrently, then inspect text, screenshots, and summaries. The authors subsequently test three ways to organize completed-run evidence:

- **Flowchart**: salient actions and their sequence, with grouped repeated work and links to screenshots. It foregrounds the process.
- **Citation**: an outcome explanation with short process context and linked supporting screenshots.
- **Specification**: a list of requirements and assumptions linked to evidence. Requirements describe what must be true; assumptions expose consequential choices not fully specified beforehand.

The final treatment keeps the full trace while adding requirement status, assumptions, linked text and image annotations, detail magnification, and direct access to underlying websites. It distinguishes **completed**, **unknown**, and **contradicted** requirements rather than equating absent evidence with refutation. The intended mechanism is navigation from the user's criterion to relevant execution detail, not simply making the trace shorter.

The summary and annotations are **hand-created in Wizard-of-Oz studies**. Importantly, status follows what the agent's trace *claims*, not independent ground truth: a falsely claimed completion remains marked complete. This avoids granting the interface an oracle, but creates a plausible rubber stamp. Automating reliable requirements, assumptions, and annotations is not demonstrated.

## Results and Admissions

**Formative study**: all participants are agent-experienced employees of a large technology firm, initially unfamiliar with Magentic-UI. Among completed attempts not excluded for timing or technical problems, errors occur in **1/9 pizza-cart**, **5/10 recipe-search**, and **10/12 aquarium-price** attempts. In six aquarium runs the agent estimates an unfound youth price; only three users notice, and they still do not determine the correct answer. Defaults about residency and day-dependent ticket prices change the outcome. These are live collaborative attempts with generous, user-adjusted correctness criteria—not an autonomous benchmark failure rate.

**Exploratory design probes** use GPT-4o traces and different tasks per method, with two incorrect and one correct output per method. For incorrect outputs, correct judgments are **39.13% Flowchart, 52.17% Citation, and 65.22% Specification**. Across all trials they are **57.14%, 62.86%, and 77.14%**, respectively. Specification is slower (**524.84 seconds mean**, versus approximately **390 seconds** for the other two). The task imbalance and small exploratory sample prevent a clean causal ranking. Eight participants overlap with the formative study.

**Final counterbalanced study** uses a new sample of 12 employees, eight AssistantBench questions, GPT-5 traces, and both baseline and treatment conditions. There are two correct and two incorrect outputs in each task set. Users have a soft five-minute deadline and unrestricted browser access; some redo the investigation themselves. Table 3 reports:

| Measure | Baseline | Treatment | Hedges' g, 95% CI |
| --- | --- | --- | --- |
| Overall judgment accuracy | 72.92% | 77.08% | 0.18, [-0.52, 0.94] |
| Overall review duration | 232.87 s | 221.28 s | -0.29, [-1.95, 1.26] |
| Overall confidence, 1–7 scale | 4.17 | 4.60 | 0.56, [-1.19, 2.51] |
| Duration when correctly rejecting a wrong output | 270.79 s | 229.63 s | -0.65, [-1.54, 0.12] |
| Confidence when wrongly accepting a wrong output | 3.64 | 4.82 | 0.85, [0.01, 1.88] |

The headline **g = -0.65** applies to correct error rejection, not all review time. The overall effects have wide intervals crossing zero; the paper's language of no meaningful accuracy improvement means a small observed effect, not proof of equivalence. The false-acceptance confidence estimate is particularly concerning, but comes from a small, unequal subset rather than a powered calibration trial.

Participants appreciate requirements, assumptions, annotations, and linking; all final-study users consult the full text trace at some point. They still describe overload and a learning curve. They often check easy parts such as arithmetic while missing another criterion, and want explicit coverage of unsearched sources and unresolved information. Faster navigation is not the same as complete verification.

## Analyst Takeaways

1. **Use a criterion-to-evidence map, not a competence narrative.** A specification helps locate detail while retaining process context. It should point to observed evidence, not turn the agent's self-report into a certified check mark.
2. **Measure the reviewer, not just the agent.** Detection, false rejection, time, and confidence conditional on correctness are different outcomes. This directly supplements [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md).
3. **A plausible workflow is weak evidence.** Participants repeatedly justify wrong answers using reasonable steps. The finding supplies empirical caution to [Designing meaningful human oversight](/dossiers/designing-meaningful-human-oversight-ai.md) and [developer oversight interviews](/dossiers/human-oversight-agentic-systems-in-practice.md).
4. **Keep unresolved coverage visible.** An inspected fact can be true while the search is incomplete. Unknown requirements, unexplored paths, and assumptions should remain contestable rather than disappearing from a tidy completion view.
5. **Separate control availability from control effectiveness.** [Magentic-UI's human-centered control model](/dossiers/magentic-ui-human-centered-control.md) provides intervention affordances; this study shows why those affordances do not automatically make humans accurate validators.

## Questions and Limitations

- One agent platform, small samples, technology-firm employees, post-hoc question answering, and soft deadlines limit generalization. No field result establishes safe oversight during multitasking or irreversible actions.
- The final interface bundles multiple features; the study cannot isolate which causes faster navigation or false confidence. Automated annotation quality and omission errors remain untested.
- The design-probe scoring accepts “insufficient information” on selected tasks only after the first author revises interpretation before analysis. Methods also see different tasks. Treat their percentages as exploratory evidence.
- The formative narrative says three recipe-search outputs followed acceptable alternative paths and one participant accepted a known error; Appendix Table 4 groups four attempts as acceptable. Avoid interpreting this flexible classification as a strict ten-case benchmark.
- The abstract's strong duration language requires the subgroup and wide intervals above. Effect-size reporting does not eliminate uncertainty from 12 participants or justify an established accuracy gain.
- The manuscript's placeholder publication metadata is left untouched in the immutable archive. Revision 1's interface observations are historical study facts, not current product guarantees.

## Vault Ideas Extracted

* [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md)
