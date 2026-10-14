---
type: Study Note
title: "The Cybernetic Teammate: A Field Experiment on Generative AI Reshaping Teamwork and Expertise"
description: A P&G innovation experiment finds AI-assisted individuals producing ideas comparable to unaided pairs, broader functional perspectives, and more positive emotions, with unresolved sample and timing inconsistencies and limited evidence for exceptional team synergy.
resource: https://doi.org/10.3386/w33641
source: /archive/cybernetic-teammate-generative-ai-teamwork.pdf
tags: [enterprise, evaluation, interaction-design]
timestamp: 2026-10-14T12:00:00Z
---

# The Cybernetic Teammate — Study Notes

**Authors**: Fabrizio Dell'Acqua, Charles Ayoubi, Hila Lifshitz, Raffaella Sadun, Ethan Mollick, Lilach Mollick, Yi Han, Jeff Goldman, Hari Nair, Stewart Taub, and Karim Lakhani.  
**Published**: April 2025, NBER Working Paper 33641; experiment conducted May–July 2024.  
**Status**: This dossier describes the archived **April 2025 NBER working paper**, whose cover explicitly states that it has not been peer-reviewed. A later *Organization Science* journal article exists under the changed title [The Cybernetic Teammate: A Field Experiment on Generative AI and Teamwork](https://doi.org/10.1287/orsc.2025.20702), with Crossref publication metadata dated July 2026. Its abstract reports 791 professionals rather than this working paper's headline 776 and includes an additional generation-versus-selection finding. The published results have **not** been verified as matching the archived paper; neither its sample nor its added conclusions is substituted into the evidence below.

## What It Is

A preregistered field experiment embedded in a one-day virtual product-development workshop at Procter & Gamble. It crosses **working alone versus in a two-person cross-functional team** with **AI access versus no AI access**. Participants develop early-stage innovation proposals for actual business-unit problems, using familiar company processes and contextual material.

The central finding is a partial substitution of collaborative functions: an AI-assisted individual produces proposals of quality comparable to an unaided human pair, and participants' proposals become less strongly tied to their professional function. AI access also improves reported emotional experience. These are observations about short-run ideation and proposal production, not proof that AI replaces durable relationships, implementation expertise, or complete teams.

The source is eligible as empirical evidence about organizational collaboration, expertise integration, and the limits of AI-assisted performance—not operational instructions for a particular tool.

## Problem and Motivation

Cross-functional teams integrate technical and market knowledge but incur scheduling, coordination, and professional-boundary costs. The study asks whether conversational AI can supply some of the performance, breadth, and motivational benefits that normally justify bringing another person into the work. It also distinguishes raising average proposal quality from increasing the chance of an exceptional idea, a potentially different organizational objective.

## Experimental Design and Mechanism

- **Population and assignment**: The paper reports 811 workshop participants and a main randomized sample of **776**, excluding 35 late arrivals or senior employees assigned nonrandomly. Assignment was stratified across four business units—Baby Care, Feminine Care, Grooming, and Oral Care—and two geographies, yielding eight randomization clusters. However, Table 1's condition counts imply **791 people**, an unresolved discrepancy detailed below.
- **Team composition**: Each pair combines one R&D and one Commercial professional. A randomly designated member shares the screen and submits the joint proposal. The unit of output analysis is the **solution**, not each employee independently. Table 1 lists 154 unaided individuals, 155 AI-assisted individuals, 115 unaided pairs, and 126 AI-assisted pairs: **550 solutions**.
- **Intervention**: The tool uses GPT-4 through an enterprise interface; July participants used GPT-4o. AI conditions receive one hour of training and recommended prompts. The treatment therefore combines AI access, training, and a structured interaction opportunity, rather than isolating the effect of a language interface or model alone.
- **Work**: Proposals address real innovation challenges, including consumer adoption, product choice, and dosing habits. The task covers the early innovation “seed” stage, not product launch. Participants can draw on their own business-unit knowledge; “non-core” innovators are not people with no relevant domain knowledge.
- **Human contribution**: The prompting design invites questions, problem reframing, candidate generation and evaluation, and iterative participant input. The reusable mechanism is **access to alternative functional perspectives with opportunities for contextual correction**. The experiment does not separately randomize these interaction components, so it cannot identify which caused the observed gains.
- **Incentives and crossover**: Best proposals are eligible for management visibility, with rewards allocated within conditions. Controls subsequently receive AI training and repeat the task, but the reported primary effects compare the **initial between-subject conditions**, not before/after crossover performance.

The authors report preregistration at [AEARCTR-0013603](https://www.socialscienceregistry.org/trials/13603). Incomplete pairs were reassigned to individual work if a teammate failed to participate; the archived paper does not fully reconcile initial assignment, reassignment, and final sample counts.

## Measurement

A blinded panel of **22 evaluators** supplied **1,595 evaluations of 550 proposals**. Appendix B describes them as experienced professionals who were MBA or engineering students or recent graduates at a top institution, not uniformly incumbent P&G domain specialists. Ratings cover overall quality, novelty, impact, business potential, and feasibility on 1–10 scales; technical-versus-commercial orientation uses a separate 1–7 scale. Final proposal scores average available ratings.

Quality and emotional-change scores are standardized relative to the unaided-individual control. Positive emotions combine enthusiasm, energy, and excitement; negative emotions combine anxiety, frustration, and distress. These are pre/post self-reports, not direct measures of social connection or durable motivation.

Regressions use the unaided individual as the omitted category. Model 1 includes condition indicators; Model 2 adds business-unit and workshop-date fixed effects; Model 3 adds demographic, tenure, band-level, and prior-AI-use controls. Standard errors are heteroskedasticity-robust. Main quality analyses have 550 solution observations; positive- and negative-emotion analyses have 533 and 530 observations respectively.

Evaluation agreement is moderate: **ICC2 = 0.452**, Kendall's tau **0.153**, and Pearson's r **0.198**. Averaging raters supports comparisons but does not make a subjective quality score an implementation or commercial-success outcome.

## Results and Admissions

### Average Performance and Effort

Table 2's unadjusted effects, relative to an unaided individual, are:

| Condition | Quality gain, control SD | Standard error | Reported significance |
|---|---:|---:|---|
| Two humans, no AI | 0.245 | 0.120 | p < 0.05 |
| Individual + AI | 0.373 | 0.106 | p < 0.01 |
| Two humans + AI | 0.392 | 0.122 | p < 0.01 |

Adjusted estimates remain positive: with full controls the gains are **0.307, 0.370, and 0.463 SD**, respectively. The authors interpret AI-assisted individuals as comparable to unaided pairs, and report no significant average difference between the two AI-enabled conditions. This is **not a formal equivalence or noninferiority demonstration**. Table 2's direct comparison of AI-assisted versus unaided pairs is nonsignificant in all specifications (**p = 0.242, 0.254, 0.216**), so improvements over the individual control must not be presented as proven incremental gains over a human team.

AI-assisted submissions are substantially longer: Table 3 estimates **+504.5 words** for individuals and **+543.7 words** for pairs, against an unaided-individual mean of **381.4 words** in Model 1. Unaided pairs add only 30.5 words nonsignificantly. Longer proposals need not be better proposals, and condition blinding cannot necessarily hide stylistic or length cues.

The prose reports **16.4% less time** for AI-assisted individuals and **12.7% less** for AI-assisted pairs. Table 4 instead reports natural-log-time coefficients of **−0.366 and −0.318**, corresponding to approximately **30.6% and 27.2% reductions** under the usual `exp(coefficient) − 1` conversion. These are not mutually corroborating percentages. Treat the speed direction as supported but the headline magnitude as unresolved. Elapsed task time also differs from total person-hours: a pair consumes two people's effort.

### Expertise and Functional Breadth

In Table 5, AI-assisted individuals improve quality in both task-familiarity groups: **+0.324 SD** among non-core innovators and **+0.433 SD** among core innovators in Model 1. Unaided pairing adds **0.023 SD** nonsignificantly among non-core innovators, versus **0.309 SD, p < 0.05** among core innovators. Teams count as core if **at least one** member regularly does product innovation; these are solution-level subgroup classifications, not matched individual expertise levels. Subsample sizes are **218 non-core and 332 core solutions**.

These results are consistent with AI helping employees broaden their contribution without requiring another task-familiar colleague. They do **not** establish that all expertise gaps disappear: subgroup significance differences are not a formal interaction test, and core and non-core workers both benefit.

Without AI, R&D and Commercial individuals tend toward their own functional orientation. With AI, their orientation distributions look more similar, consistent with broader perspective coverage. The authors report no significant quality difference by technical orientation. For human pairs, the bimodality coefficient falls from **0.564 without AI to 0.482 with AI**. They interpret this as less dominance by one functional perspective, but balanced final artifacts do not directly establish balanced speaking time, influence, or knowledge transfer.

### Emotional Experience and Confidence

Relative to unaided individuals, Model 1 positive-emotion changes are **+0.269 SD** for unaided pairs, **+0.457 SD** for AI-assisted individuals, and **+0.635 SD** for AI-assisted pairs. Negative-emotion effects are **−0.136 SD** nonsignificantly for unaided pairs, **−0.233 SD** for AI-assisted individuals, and **−0.235 SD** for AI-assisted pairs; both AI effects have p < 0.05 in Model 1.

The negative-emotion result for AI-assisted pairs is not robustly significant across specifications: it becomes **−0.157 SD, SE 0.138** with full controls. Self-reported emotional benefit supports a better immediate experience, not a causal finding that simulated sociality replaces human relationships. Positive experiences correlate with increased expected future AI use; the paper explicitly does not interpret that association as causal.

AI-enabled participants are reported as **9.2 percentage points less likely** to expect their proposal to place in the top decile, despite better average ratings. Confidence and objective performance therefore need not move together; the paper does not establish whether this expectation change improves calibration for each individual.

### Exceptional Outcomes and AI Reliance

Table 10 estimates that AI-assisted pairs are **9.2 percentage points more likely** than unaided individuals to enter the top-quality decile, from a control rate of **5.8%**—an implied **15.0%**, or **2.59 times** the baseline. The AI-assisted-individual effect is only **+1.9 points**, nonsignificant. However, direct comparisons are weaker: AI-assisted pairs versus unaided pairs give **p = 0.190**, and versus AI-assisted individuals **p = 0.061** in Model 1. Across all three specifications, neither direct contrast meets p < 0.05. The evidence supports a tail improvement over unaided individuals, not an established exceptional-performance synergy over either alternative.

Content retention counts final-submission sentences matching AI-generated sentences with at least 90% similarity, excluding the initial human prompt. Many submissions have retention above 75%, while a nontrivial group retains none. High retention is not proof of passive copying: users retaining some AI text averaged **18.7 prompts**, while those with 100% retention averaged **23.9 prompts**. Prompt count is evidence of interaction, not proof of critical scrutiny or correctness.

AI-assisted proposals are more semantically similar to one another than human-only proposals. Naive AI-only proposals cluster still more tightly. Thus human contextualization can coexist with AI-induced homogenization. The AI-only exercise is a semantic-similarity comparison, **not a matched AI-alone quality baseline**.

## Analyst Takeaways

1. **Specify which collaborative function is being substituted.** Short-run proposal breadth and quality can improve without demonstrating durable learning, safe implementation, or replacement of the social institution of a team.
2. **Separate improved human performance from strict complementarity.** [Complementary Human–AI Performance](/vault/complementary-human-ai-performance.md) requires exceeding both solo partners. This experiment lacks a matched AI-alone quality condition, and its AI-only semantic analysis cannot supply one.
3. **Optimize mean quality and exceptional outcomes separately.** Similar average scores can coexist with different tail estimates, but a significant comparison against baseline and a nonsignificant comparison against another condition do not prove those conditions differ.
4. **Distinguish access to expertise from possession of expertise.** Broader proposals are consistent with boundary spanning, not proof that people retain cross-functional knowledge or can detect consequential errors independently. [Expertise-Mediated Agent Steering](/vault/expertise-mediated-agent-steering.md) concerns requirements, diagnosis, and recovery in agent workflows; this non-agent proposal experiment does not overturn those responsibilities.
5. **Account for diversity and labor, not only output volume.** Faster, longer proposals may save elapsed time while narrowing the idea portfolio; real organizational value depends on selection, implementation, person-hours, and downstream outcomes.

## Questions, Limitations, and Internal Inconsistencies

- **Unreconciled participant count**: The narrative and abstract state 776 randomized participants, consistent with 811 minus 35 exclusions. Table 1 instead totals **154 + 155 + 230 + 252 = 791 people**. Its 115 and 126 pairs plus the 309 individuals do reconcile to 550 solutions. The archived paper does not explain the extra 15 people; do not silently choose one sample count or treat 550 as people.
- **Timing mismatch**: The prose's 16.4%/12.7% reductions do not follow from Table 4's reported log coefficients, which imply roughly 30.6%/27.2%. Adjusted log coefficients also do not recover the prose percentages.
- **Rating-count mismatch**: The main text says each solution received “more than three” ratings on average. Appendix B's 1,595 evaluations over 550 solutions instead give **2.90**, and its later **2.89** figure is also not the exact quotient.
- **Orientation-label conflict**: The variable definition says higher scores mean more technical proposals. The results prose describes Commercial participants toward higher x-axis values and calls those values more commercial; Figure 6's caption itself mixes “commercial nature” with higher values meaning more technical. The convergence claim can be recorded, but the score direction should not be inferred from that prose alone.
- **Overstated tail and mechanism claims**: “Around 3 times” rounds a 2.59-fold baseline contrast. More importantly, direct tail contrasts against other team/AI configurations are not significant at 5%. Claims about reduced interpersonal dominance, a uniquely beneficial language interface, or AI's social role are interpretations of output distributions and emotion reports, not isolated mechanism tests.
- **Assignment and missingness**: Reassigning incomplete pairs changes the original treatment configuration. The transition to final solution and emotion-analysis denominators is not fully accounted for, limiting reconstruction of an intention-to-treat analysis.
- **Limited scope**: One firm's selected employees, familiar business-unit problems, cross-functional pairs, and one-day virtual work do not establish effects in larger or same-function teams, extended coordination, repeated rework, unfamiliar domains, or sustained adoption. Trained AI conditions do not isolate access from training. Low prompting experience does not prove the observed gains are a lower bound.
- **Proxy outcomes and evidence availability**: Expert proposal ratings are not actual market returns, product feasibility tests, or independent retained-skill tests. The paper says novelty, feasibility, impact, and AI-rated robustness analyses confirm the results, but does not provide corresponding full result tables in the archived appendix. Future expertise development versus access to existing knowledge remains explicitly open.
- **Disclosures**: Harvard Business School partly funded the research; P&G supported its Digital Data Design Institute through gifts during 2023–2025, and Karim Lakhani received P&G consulting compensation in 2021–2022. Several coauthors are P&G-affiliated. These are disclosed relationships, not evidence that the reported findings are invalid.

## Vault Ideas Extracted

- Updated [Complementary Human–AI Performance](/vault/complementary-human-ai-performance.md): distinguish individual augmentation, human-team substitution, and strict both-solo complementarity; separate average and top-decile objectives and require direct statistical contrasts.
- Created [AI-Induced Work Reallocation](/vault/ai-induced-work-reallocation.md): incorporate access to cross-functional perspectives without a colleague, distinguishing broader artifacts from retained expertise and carrying the homogenization caveat.

The proposed standalone cross-functional boundary-spanning note was folded into AI-Induced Work Reallocation.
