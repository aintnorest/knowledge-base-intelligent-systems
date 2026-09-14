---
type: Study Note
title: "When “A Helpful Assistant” Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models"
description: A controlled evaluation of 162 speaker and audience personas across 2,410 factual questions and nine open-weight instruction models, finding no reliable aggregate accuracy gain, small category effects, and a large but impractical per-question oracle-selection ceiling.
resource: https://aclanthology.org/2024.findings-emnlp.888/
source: /archive/personas-system-prompts-not-helpful.pdf
tags: [prompting, evaluation, reliability, routing]
timestamp: 2026-09-14T17:13:14Z
---

# When “A Helpful Assistant” Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models — Study Notes

**Authors**: Mingqian Zheng, Jiaxin Pei, Lajanugen Logeswaran, Moontae Lee, David Jurgens  
**Venue**: Findings of the Association for Computational Linguistics: EMNLP 2024, pages 15126–15154  
**DOI**: [10.18653/v1/2024.findings-emnlp.888](https://doi.org/10.18653/v1/2024.findings-emnlp.888)  
**Preprint**: [arXiv:2311.10054v3](https://arxiv.org/abs/2311.10054v3), revised October 9, 2024  
**Code and data**: [Prompting-with-Social-Roles](https://github.com/Jiaxin-Pei/Prompting-with-Social-Roles)

## What It Is

A large factorial evaluation of one narrow prompt intervention: prepend a short persona such as “You are a lawyer” or “You are talking to a lawyer,” then ask an objectively scored multiple-choice question. Across 162 personas, four persona phrasings, 2,410 MMLU questions, and nine open-weight instruction models, the paper asks whether a role label raises factual answer accuracy over a no-role control.

Its answer is usefully negative. No single persona reliably beats the control in aggregate; many do nothing, and some hurt. The important qualification is that individual questions often *can* be flipped to the correct answer by some persona. An oracle that retrospectively chooses the best role for every question therefore gains substantially, but the tested deployable selection methods remain far below that ceiling and usually near random role choice.

This is not evidence that personas cannot control voice, social stance, audience adaptation, or role-play fidelity. The experiment deliberately removes those subjective outcomes so it can isolate factual accuracy. Read the title as “bare role labels do not reliably improve forced-choice factual accuracy,” not as “system personas have no purpose.”

## Persona Inventory

The authors assembled more than 300 candidate roles from prior social-role research, WordNet, historical occupation work, and an ad hoc list, then manually removed uncommon roles. The final inventory has **162 personas**, reported as **112 occupations** and **50 interpersonal roles**.

### Interpersonal roles

The relationship inventory spans family, romantic, school, work, and broader social relationships, with lexical variants added as robustness checks. Examples include:

- **Family**: parent, mother, father, son, daughter, sister, brother, cousin, grandparents and in-laws, plus variants such as mom, mommy, mama, mum, dad, daddy, and papa.
- **Romantic**: partner, husband, wife, boyfriend, girlfriend, fiancé, fiancée, and housewife.
- **School**: professor, instructor, student, coach, tutor, dean, graduate, and classmate.
- **Work**: supervisor, coworker, boss, colleague, and mentor.
- **Social/friendship**: companion, buddy, roommate, friend, best friend, close friend, stranger, and foreigner.

The prose describes six interpersonal types by treating “friend” separately from “social,” while Appendix Table 4 folds friendship roles into a single `social` row. The appendix list also appears to contain 52 entries across those five labeled rows, despite the stated total of 50. The high-level coverage is clear; the category accounting is not perfectly clean.

### Occupational and AI roles

The occupation inventory mixes MMLU-aligned expertise with broad everyday jobs. It contains explicit domain specialists—lawyer and bailiff; nurse, doctor, physician, dentist, and surgeon; software engineer, data scientist, electrical engineer, and web developer; mathematician, statistician, economist, psychologist, historian, physicist, chemist, biologist, and geneticist—alongside jobs such as baker, carpenter, clerk, driver, farmer, librarian, mechanic, musician, painter, pilot, police, secretary, tailor, and surveyor.

A separate AI-flavored set tests labels such as **chatbot**, **assistant**, **virtual assistant**, **AI language model**, **helpful assistant**, **Medical Diagnostic AI**, **Legal Research AI**, **Educational Tutor AI**, **Mathematical Modeling AI**, **Policy Analysis AI**, **Statistical Analysis AI**, and **Embedded Systems AI Engineer**.

Several counting schemes coexist in the paper. The abstract highlights six interpersonal relationship types and eight MMLU expertise domains; Section 5 collapses roles into seven analysis groups (family, romantic, school, work, social, occupation, AI); the conclusion refers to 26 categories. These are mostly different hierarchy levels, but the paper does not reconcile them explicitly. The eight question domains are Law, Medicine, Computer Science/EECS, Math, Politics, Psychology, Natural Science, and Economics. The role dictionary additionally contains history roles and a large “other occupations” bucket.

## Questions, Models, and Controls

### Question coverage

All accuracy experiments use a **2,410-question subset of MMLU**, balanced across **26 subjects** and mapped to eight broad domains:

| Domain | Included MMLU subjects |
|---|---|
| Law | professional law, international law |
| Medicine | clinical knowledge, college medicine, professional medicine |
| Computer Science / EECS | electrical engineering, college computer science, high-school computer science |
| Math | high-school statistics, college mathematics, high-school mathematics |
| Politics | US foreign policy, high-school government and politics |
| Psychology | professional psychology, high-school psychology |
| Natural Science | college physics and biology; high-school physics, chemistry, and biology; college chemistry |
| Economics | management, professional accounting, econometrics, high-school macroeconomics, high-school microeconomics |

The sampling pipeline first draws 100 items from each initial MMLU subject, measures the combined question-plus-four-options length, filters so 99% of retained candidates are under 150 words, and manually chooses popular subjects with broad domain coverage. The common four-option format and balanced domain mapping make role/question alignment testable without changing task format.

### Model coverage

The study uses nine instruction-tuned models from four open-weight families:

- **FLAN-T5-XXL** — 11B
- **Llama 3 Instruct** — 8B and 70B
- **Mistral-7B-Instruct-v0.2** — 7B
- **Qwen2.5-Instruct** — 3B, 7B, 14B, 32B, and 72B

The main cross-family analysis uses the available mid-sized and large checkpoints: FLAN-T5-XXL, Llama-3-8B/70B, Mistral-7B, and Qwen2.5-7B/72B. The additional Qwen sizes support the within-family scaling analysis.

### Persona treatment and no-role control

There are two semantic framings and one paraphrase of each, for four persona templates:

1. Speaker-specific: `You are a/an {role}.`
2. Paraphrased speaker-specific: `Imagine you are a/an {role}.`
3. Audience-specific: `You are talking to a/an {role}.`
4. Paraphrased audience-specific: `Imagine you are talking to a/an {role}.`

The **control contains the same multiple-choice question and answer-format instruction but no role context**. For Llama, Mistral, and Qwen, the persona context occupies the system message and the user message asks the question with a “reply with only the option number” instruction. FLAN-T5 has no chat-system channel, so context and question are concatenated into one text prompt followed by “Please select the correct answer number.” The model-specific control preserves the question and output instruction while removing the context string.

That is a strong control for the causal question actually posed: the role phrase is the primary changed variable. It is not a control for richer production personas, which often bundle behavior rules, policies, domain context, examples, tone, and tool instructions.

## Aggregate Findings

### A persona is not a general accuracy booster

A mixed-effects regression uses persona identity to predict answer correctness with the no-role prompt as reference and a random effect for model. **None of the best-ranked personas is statistically better than the no-role control in the pooled analysis.** At the model level, most roles have no significant effect: Figure 4 reports no-effect shares ranging from **72.8% to 100%** across the six main models. Some roles lower accuracy; the paper calls out `ecologist` on Mistral. Qwen2.5-7B and Qwen2.5-72B are statistically insensitive to all 162 personas in this analysis, while Llama-3-70B has more negatively associated roles.

Audience-specific prompts are statistically better than speaker-specific prompts, but the regression coefficients are only a few thousandths of an accuracy point. “Tell a lawyer” slightly outperforming “be a lawyer” is not a practically meaningful recipe on this evidence.

The Qwen2.5 size sweep also fails to reveal a monotonic sensitivity trend: 3B shows a small minority of affected roles, while 7B through 72B show none under the paper's significance criterion. Persona sensitivity therefore does not simply grow or shrink with parameter count.

### Social attributes move results, but only slightly

- **Explicit gender**: in a matched set of seven masculine, seven feminine, and two neutral interpersonal roles, neutral roles perform significantly better than gendered roles; masculine roles slightly outperform feminine roles. Effect sizes are small.
- **Implicit occupational gender**: the historical percentage of men in 65 occupations is not a significant predictor of accuracy (coefficient −5.79×10⁻⁴, p = 0.561).
- **Role group**: work- and school-related roles outperform the other broad groups, especially AI and occupation roles, but again by small margins.
- **Domain alignment**: an in-domain role/question pair raises accuracy by about **0.004** relative to an out-of-domain pair (p < 0.01). The direction is intuitive; the size is roughly four-tenths of one percentage point.

These comparisons show that role semantics are not entirely inert. They do **not** rescue the stronger claim that “use an expert persona” is a dependable accuracy technique.

### Proposed mechanisms explain little

The paper tests three surface explanations:

- **Role-word frequency** from Google Ngram (2018–2019) is only weakly correlated with role accuracy; absolute per-model correlations top out around 0.23.
- **Prompt–question semantic similarity**, computed with MiniLM/Sentence-BERT embeddings, is the strongest tested predictor but remains weak and model-dependent (from approximately −0.02 to 0.39 across reported models).
- **Prompt perplexity** has inconsistent directions: negative accuracy correlation for FLAN and Mistral, positive for Llama and Qwen.

A joint mixed-effects regression makes higher frequency, higher similarity, and lower perplexity statistically significant, but the large repeated dataset makes significance easier to obtain and the observed correlations remain too small and unstable to choose roles reliably. Role-performance embeddings are also highly similar for Llama, Mistral, and Qwen (pairwise cosine similarities cluster near 1), with FLAN-T5 more divergent. A persona's ranking is not robustly portable across models.

## Persona Selection: A Real Oracle Gap

The selection experiment uses the largest checkpoint from each family and compares:

- random role choice;
- the best role globally on training data;
- the best in-domain role on training data;
- the role whose prompt embedding is most similar to the question;
- a RoBERTa question/domain classifier followed by the best training-set role in its predicted domain;
- a RoBERTa multi-label classifier that predicts roles directly; and
- **best role per question on the test set**, a retrospective oracle and explicit upper bound.

The question classifier reaches **78.1%** test accuracy (paper-reported random and majority baselines: 5.2% and 6.9%). The role classifiers reach F1 scores of **0.34** for FLAN-T5-XXL, **0.39** for Mistral-7B, **0.71** for Llama-3-70B, and **0.77** for Qwen2.5-72B.

Yet classifier scores do not translate into useful accuracy routing. The per-question oracle improves aggregate accuracy by roughly **6–20 absolute points**, depending on model, proving there is exploitable-looking variation after outcomes are known. Every automatic strategy is far below that ceiling; most are only marginally better than random role choice, and on Qwen the tested strategies can be worse than random.

This is the paper's most important result. A large oracle gain does not establish a deployable optimization opportunity. It may instead measure a huge, noisy intervention space in which at least one of 162 perturbations happens to flip each item correctly. Calling the effect “largely random” is stronger than the experiment can prove—the study shows unpredictability under these selectors, not mathematical randomness—but it correctly rejects retrospective best-case selection as an operational prompt strategy.

## Released Artifacts

The linked repository makes the study substantially more inspectable. It releases:

- `data/mmlu_sample_ques.csv` — sampled MMLU items;
- `data/question_split.csv` — classifier train/validation/test split metadata;
- `data/role_info.csv` — persona labels and attributes such as category, gender, and frequency;
- inference and analysis scripts for vLLM generation, RoBERTa classifiers, perplexity, n-gram frequency, semantic similarity, and utilities;
- notebooks for dataset/role preparation, classifier-data processing, and paper plots.

The repository README points to a separate Google Drive folder for full experiment outputs. The paper's phrase “all data, results, and experiment code” should therefore be read as a GitHub repository plus an external Drive dependency, not a single self-contained archival package.

## The Boundary: Accuracy Versus Tone and Perspective

The design earns clarity by measuring only whether the selected option is correct. That creates an equally clear boundary around the result:

- **Supported**: adding a bare speaker or audience role label is not a reliable way to improve aggregate factual multiple-choice accuracy on this MMLU subset and these open-weight instruction models.
- **Not tested**: whether a persona improves tone, empathy, explanation style, pedagogical fit, audience comprehension, consistency of perspective, role-play fidelity, safety behavior, refusal behavior, or trust.
- **Not tested**: whether a detailed persona containing domain procedures, constraints, examples, or tools improves accuracy. Such a prompt changes far more than social identity.
- **Not established**: that an answer written *like* an expert is more factual. This study gives direct reason not to infer correctness from expert-sounding perspective.

The paper itself notes that providers may still define roles for security or language style. Those are separate objectives requiring separate metrics. Conversely, the forced “option number only” output suppresses most observable tone and role-play behavior, so this experiment is intentionally incapable of showing whether the model adopted the requested persona in any richer sense.

## Analyst Takeaways

1. **Default to no persona for objective QA unless validation says otherwise.** A role label spends tokens and introduces another model-specific perturbation without a demonstrated average accuracy return.
2. **Separate behavioral steering from capability claims.** Use personas when you want a voice, relationship, or interaction policy; never cite the resulting polish as evidence that answers are more correct.
3. **Keep the no-role prompt in every persona evaluation.** Comparing roles only against one another can crown a “winner” even when all of them underperform the plain control.
4. **Treat persona selection as routing and test it end to end.** A classifier's role-label F1 is irrelevant if downstream task accuracy does not beat random selection and the no-role baseline.
5. **Do not operationalize an oracle.** “Best persona per question” uses test outcomes unavailable at inference time. Its gap is a diagnosis of instability, not a production result.
6. **Prefer actionable expertise over identity labels.** If domain prompting is warranted, provide facts, procedures, tools, or constraints. “You are a doctor” contains none of them, and its observed in-domain gain is only about 0.4 points.
7. **Version persona behavior by model.** The same role's effect differs across model families, and a model upgrade can invalidate even a locally measured persona choice.

## Questions and Limitations

- The evidence is limited to MMLU multiple-choice factual questions. Open-ended factual answers, explanations, dialogue, multilingual tasks, and subjective tasks remain outside scope.
- Only four 2024-era open-weight model families are tested; no closed API models are included. Instruction tuning and system-message behavior evolve quickly.
- The prompts are minimal role labels. They do not represent the detailed system specifications called “personas” in many deployed assistants.
- The role inventory cannot cover all social identities and contains fuzzy category boundaries. Domain alignment is manually assigned, and roles such as `teacher`, `scientist`, or `assistant` are inherently multi-domain.
- The headline regressions report model-level random effects, while each question is repeatedly observed under many roles and templates. A crossed question/model/persona dependence structure would better reflect that repeated-measures design.
- Many per-role comparisons are made. The paper visualizes significance stars but does not make multiple-comparison control central to the interpretation; exact counts of “affected” roles should be treated cautiously.
- The “best role per question” upper bound searches 162 alternatives after observing test correctness. Some apparent ceiling is expected from multiple tries even if roles have no stable semantic mechanism.
- Weak correlations and failed selectors rule out the tested explanations and routing methods, not all possible predictors. “Unpredictable” should remain scoped to the available features, splits, and classifiers.
- The paper acknowledges the computational/carbon cost and the risk that gender comparisons may reinforce stereotypes. Its more defensible gender result is the near-null effect of occupational gender mix, not a ranking of masculine and feminine identities.
- The released experiment outputs depend on external Google Drive storage, which is less durable than keeping all artifacts in the versioned repository.

## Vault Ideas Extracted

- [Prompt Contingency](/vault/prompt-contingency.md) — add the cleanest role-assignment case: 162 persona labels produce item- and model-specific flips but no reliable aggregate winner over a no-role baseline.
- [Quality Versus Correctness Prompt Evaluation](/vault/quality-versus-correctness-prompt-evaluation.md) — add the boundary case that a role can shape tone or audience perspective while leaving forced-choice factual accuracy flat; each objective needs its own metric.
- [Prompt Optimization](/vault/prompt-optimization.md) — add the persona-routing oracle gap: per-question hindsight selection gains roughly 6–20 points, while similarity, training-set winners, and RoBERTa selectors remain near random and can lose to it.
