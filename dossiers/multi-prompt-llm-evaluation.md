---
type: Study Note
title: "State of What Art? A Call for Multi-Prompt LLM Evaluation"
description: "A 6.5M-instance study showing that semantically equivalent task instructions can change both model scores and rankings, and proposing purpose-specific maximum, average, and combined multi-prompt metrics."
resource: https://doi.org/10.1162/tacl_a_00681
source: /archive/multi-prompt-llm-evaluation.pdf
tags: [evaluation, prompting, reliability, benchmark]
timestamp: 2026-09-14T17:12:26Z
---

# State of What Art? A Call for Multi-Prompt LLM Evaluation — Study Notes

**Authors**: Moran Mizrahi, Guy Kaplan, Dan Malkin, Rotem Dror, Dafna Shahaf, and Gabriel Stanovsky<br>
**Publication**: *Transactions of the Association for Computational Linguistics* 12 (2024), 933–949<br>
**DOI**: [10.1162/tacl_a_00681](https://doi.org/10.1162/tacl_a_00681)<br>
**Source capture**: arXiv:2401.00595v3 [cs.CL], 6 May 2024

## What It Is

This paper makes a large empirical case that a benchmark prompt is not a neutral wrapper around a task. Across roughly 6.5 million model–instruction–example evaluations, semantically equivalent instruction templates changed both absolute accuracy and the ordering of models. A leaderboard based on one benchmark-authored instruction can therefore conflate model capability with accidental prompt compatibility.

The contribution has two parts. First, the authors construct thousands of paraphrased task instructions and quantify prompt brittleness across 39 tasks from LMENTRY, BIG-bench Lite (BBL), and BIG-bench Hard (BBH). Second, they reject a universal replacement score and propose three aggregations for different intended users: maximum prompt performance for a developer who will tune and freeze one prompt, average prompt performance for a model developer who cares about robustness, and a combined score for a platform exposed to varied prompts.

The paper's strongest result is not that “prompting matters”—that was already familiar—but that prompt choice can reverse comparative conclusions at enough scale to undermine single-prompt model rankings. Its metric proposal is directionally useful, though each metric measures performance under a *constructed prompt set*, not context-free model capability.

## Evidence Base: What the 6.5M Figure Contains

The study covers 39 tasks from three benchmarks:

| Benchmark | Tasks | Instruction construction | Main evaluation detail |
|---|---:|---|---|
| LMENTRY | 10 | Three automatic generation methods seeded by benchmark prompts | The 10 lowest-scoring tasks from the original benchmark; the narrative says about 240 validated paraphrases per task, while Table 2 totals imply about 219 |
| BIG-bench Hard | 15 | Three automatic generation methods seeded by benchmark prompts | Classification and multiple-choice tasks; about 175 validated paraphrases per task |
| BIG-bench Lite | 14 | 7–12 human-written paraphrases per task from prior work | Written after the evaluated models were trained, reducing a prompt-leakage explanation |

The three automatic methods are direct rephrasing, a chain-of-thought procedure that first describes the task and then writes templates, and a gradual three-call procedure that induces a task description and instruction from the seed plus examples. GPT-3.5-Turbo generates the candidates. One in-group annotator checks every generated paraphrase for coherence and task relevance; a second annotator double-labels 375 randomly sampled instructions. The reported validity rate is 90% for LMENTRY and about 84% for BBH. Double-annotation agreement is high in raw accuracy (0.953 for LMENTRY and 0.916 for BBH), but Cohen's κ is only 0.774 and 0.491 respectively because the labels are imbalanced.

For tractability, every instruction is evaluated on a random subset of 100 task examples. The paper's footnote derives the approximately 6.5M scale from the products of prompts, models, and those 100 examples for 10 LMENTRY and 15 BBH tasks: roughly `240 × 16 × 100 × 10 + 175 × 11 × 100 × 15`. BBH uses only the 11 largest of the 16 open instruction-tuned models and appends a prediction-format example because all models otherwise perform too poorly for useful comparison. The 14 BBL tasks provide a separate manual-paraphrase check and do not appear in that headline footnote calculation.

The “20 models” headline combines 16 open instruction-tuned models in the main experiment—Flan-T5 variants, T0/T0pp, LLaMA-based instruction models, Falcon, MPT, and Minotaur, spanning 80M to 15B parameters—with a separate, budget-limited LMENTRY experiment on four OpenAI models: davinci, text-davinci-002, text-davinci-003, and GPT-3.5-Turbo. It is not one uniform 20-model-by-39-task design.

## How Brittle Are Single-Prompt Results?

### Rankings change with the instruction

Kendall's W treats each instruction template as a judge ranking the models. If prompts were interchangeable, W would approach 1. Instead:

- all 10 LMENTRY tasks have weak agreement, with W from 0.271 to 0.540;
- BBH is more stable but still mostly moderate, ranging from 0.628 to 0.873; and
- BBL spans weak to strong agreement, from 0.316 to 0.913, despite using human-written post-training paraphrases.

A tied-data Friedman test finds statistically significant prompt-dependent ranking differences for 21 of the 25 automatically paraphrased LMENTRY and BBH tasks. Looking at the most divergent prompt pairs, 15 of those 25 tasks contain a pair with negative Kendall's τ: more model pairs are ordered oppositely than consistently. T0pp, for example, ranks first under one BBH paraphrase and ninth under another; Alpaca-7B and Alpaca-13B move between the top and bottom of a LMENTRY ranking.

This matters because benchmark rankings invite a model-selection interpretation. The evidence says that on many tasks the selected model is partly a consequence of which valid wording the benchmark author happened to publish.

### Absolute accuracy changes too

The instability is not merely shuffling nearly tied systems. The authors define divergence as the number of standard deviations between a model's score on the benchmark's original instruction and its mean score over paraphrases. Alpaca-13B's original-instruction score is more than one standard deviation above its paraphrase mean on 7 of 10 LMENTRY tasks.

Tiny surface edits can have model-specific, opposite effects. Replacing “excludes” with “lacks” reduces Flan-T5-large accuracy by an average 28% but raises Flan-T5-XL by 46% in the same edit analysis. Punctuation, quoting placeholders, and substituting “word” with “term” also produce large changes. The post-training BBL paraphrases recreate the broader pattern, making memorization of the automatically generated strings an insufficient explanation.

### Closed models are not exempt

The four-OpenAI-model study is smaller and uses approximations to control API spend. Average performance is estimated by assigning a random paraphrase to each example and repeating the experiment 20 times. Maximum performance is approximated by a staged search: all roughly 175 prompts see 10 examples, the best 100 see 10 more, and the best 10 see the remaining examples.

The benchmark's original prompt beats estimated average performance in 72.5% of model–task cases; for davinci, the original prompts add 21 accuracy points on average over the paraphrase estimate. Conversely, prompt search pushes text-davinci-002's estimated maximum above 90% on 8 of 10 tasks. Across the four models, 26 of 40 original-versus-maximum differences are significant by McNemar's test. Original-prompt rankings agree with average-prompt rankings on only 5 of 10 tasks and with maximum-prompt rankings on only 4 of 10.

## Three Metrics for Three Intended Users

Let `ε(M, T, i)` be model `M`'s task performance on dataset `T` under instruction `i`, and let `IT` be a set of paraphrased instructions.

### Maximum performance (`MaxP`): a fixed downstream application

`MaxP(M, T, IT) = max_i ε(M, T, i)`

This is for a product developer who can search for a good instruction and then embed user input in that fixed template—for example, a stable sentiment-classification pipeline. It asks which model has the highest *elicitable* performance after prompt selection. The authors appropriately advise selecting the prompt on one sample set and validating it on fresh held-out examples to avoid overfitting.

`MaxP` is not a robustness measure and is not representative of ordinary users. It also inherits winner's-curse risk: the more prompts tested on a small sample, the more likely the apparent maximum is noise unless selection and final evaluation are separated.

### Average performance (`AvgP`): model development and robustness

`AvgP(M, T, IT) = (1 / |IT|) Σ_i ε(M, T, i)`

This is aimed at LLM developers publishing a model expected to respond to many semantically equivalent phrasings. Averaging suppresses a lucky or unlucky benchmark prompt and directly rewards consistency across the chosen prompt collection.

But “average” requires a distribution. Equal weighting over GPT-3.5-generated paraphrases measures robustness to that generator and its three construction procedures, not necessarily to actual user language, dialects, errors, or domain-specific instructions. A deployable version should define or sample the intended user population rather than treating any paraphrase bag as canonical.

### Combined Performance Score (`CPS`): varied, user-visible prompting

The paper first defines saturation as `Sat = 1 − (MaxP − AvgP)`, then `CPS = Sat × MaxP`. It proposes CPS for a multi-purpose platform or chatbot that needs both a strong best case and limited degradation away from the best prompt.

This expresses a valid product distinction, but the particular scalar is a policy choice rather than an empirically validated utility function. With `AvgP` fixed, CPS can even decrease when `MaxP` increases once `MaxP > (1 + AvgP) / 2`; that is a strong and somewhat hidden penalty for peak/mean separation. A production platform would be better served by reporting the pair `(MaxP, AvgP)`, lower-tail prompt performance, and a deployment-weighted prompt distribution before collapsing them into one number.

## What Multi-Prompt Evaluation Changes About Model Choice

The aggregate metrics do not merely smooth single-prompt results. For the vast majority of studied tasks, the top three systems under the original benchmark instruction differ from the leaders under `AvgP` and `MaxP`, and rankings differ across the proposed metrics themselves.

The LMENTRY “rhyming word” task makes the distinction concrete: Falcon-Instruct-7B and Vicuna-13B both reach `MaxP = 0.74`, yet their averages are only 0.17 and 0.15. Across LMENTRY, LLaMA-based models are competitive with T5-based systems on maximum performance but lag on average because many paraphrases produce near-zero accuracy. A downstream engineer willing to optimize and freeze a prompt could rationally choose the former; a model developer or user-facing service should not infer equivalent robustness.

Manual filtering appears unnecessary *for reproducing model rankings* in this construction. Kendall's τ between rankings computed before and after filtering is 0.963/0.978/0.948 for LMENTRY and 0.991/0.983/0.966 for BBH under `MaxP`/`AvgP`/`CPS`, excluding one LMENTRY task affected by an evaluation-script error. This is useful cost evidence for broad ranking studies, not a license to deploy unverified prompts: invalid paraphrases can still distort user-facing interpretations, individual examples, and absolute scores.

## Cost and Practical Trade-offs

Multi-prompt evaluation multiplies inference by the number of templates. The authors cap every prompt at 100 examples, reduce BBH to 11 models, and omit closed APIs from the full run. They estimate that the complete suite on GPT-4 alone would cost thousands of dollars. They also avoid closed models in the main study because providers may invisibly wrap prompts or route requests, compromising control over the tested instruction.

The OpenAI experiment demonstrates two budget-saving approximations: randomized prompt assignment with repeated trials for `AvgP`, and staged elimination for `MaxP`. The near-identical filtered/unfiltered rankings suggests another saving—skip exhaustive human validation when the goal is aggregate model ordering—but the paper does not report total tokens, GPU-hours, wall-clock time, annotation hours, or confidence-versus-budget curves. It therefore establishes that exhaustive evaluation is expensive without telling a practitioner how many prompts or examples are sufficient for a desired ranking confidence.

A practical implementation should spend budget according to the intended decision: estimate a prompt distribution for robustness, use held-out successive screening for best-prompt selection, and attach uncertainty to both scores and rankings. Running hundreds of equal-weight paraphrases merely because they are available can be more expensive without being more representative.

## Analyst Takeaways

1. **Treat the benchmark instruction as an experimental factor.** Publish the exact prompt and evaluate more than one semantically valid template. A single score without prompt variance is not enough evidence for comparative capability.
2. **Choose the aggregation from the deployment contract.** `MaxP` fits a searched-and-frozen pipeline; `AvgP` fits broad robustness; a user-facing product needs a prompt distribution and tail behavior, not an unexplained average.
3. **Separate capability, elicitation, and reliability.** Peak score approximates what prompt search can elicit; mean and spread describe sensitivity. Calling either one “the model's performance” discards the distinction the experiment exposes.
4. **Select prompts and evaluate models on different data.** Hundreds of prompts times only 100 examples creates powerful multiple-selection bias. A held-out final set is essential for any `MaxP` claim.
5. **Report ranking stability directly.** Kendall's W across prompts, pairwise Kendall's τ, and prompt-conditioned confidence intervals answer whether a leaderboard decision survives wording changes better than one aggregate scalar.
6. **Do not confuse generated diversity with user diversity.** The prompt generator, seed instruction, filtering policy, and weighting rule define the evaluation population and should be versioned with the benchmark.
7. **Use unfiltered paraphrases selectively.** Their ranking stability makes them attractive for cheap broad screening, but semantic validation remains necessary when interpreting absolute scores or exposing instructions to users.

## Questions and Limitations

- **The headline design is not fully crossed.** The 16 open models receive the broad main evaluation; the four OpenAI models are tested only in a small LMENTRY study. “20 models, 39 tasks” should not be read as every model evaluated on every task.
- **The 6.5M count is an approximate Cartesian-product count, not 6.5M independent task items.** Each instruction reuses a random set of 100 benchmark examples, so observations share tasks, examples, prompt-generation ancestry, and models.
- **The prompt counts do not reconcile cleanly.** Section 4.1 says validation yields about 240 LMENTRY paraphrases per task and the 6.5M footnote uses 240, but Table 2 reports 2,186 valid LMENTRY paraphrases across 10 tasks—about 219 per task. The headline computation is therefore only an order-of-magnitude account.
- **Prompt-set validity is conditional.** Automatic paraphrases originate from one GPT-3.5-Turbo snapshot and benchmark seed prompts. They may cluster stylistically, duplicate one another, or preserve artifacts familiar from instruction tuning; no semantic-diversity or natural-user representativeness measure is reported.
- **Human validation is narrow.** One research-group annotator filters the full collection, only 375 items are double-annotated, and BBH's κ of 0.491 is merely moderate despite high raw agreement. The validity label itself only checks coherence and task relevance.
- **Task selection limits generality.** LMENTRY deliberately selects its 10 weakest tasks; BBH is restricted to 15 classification/multiple-choice tasks; BBL follows a 14-task subset from prior work. Open-ended generation, dialogue, tools, safety behavior, multilingual prompting, and long-context tasks are not tested.
- **Scoring can amplify formatting effects.** BIG-bench uses exact string match, and BBH prompts receive an added prediction-format example. Some measured “prompt sensitivity” may be output-format compliance rather than semantic task understanding—still operationally important, but a narrower failure mode.
- **`MaxP` is statistically optimistic without a clean holdout.** The paper advises held-out validation, yet the reported main maximum scores search many prompts over 100-example subsets, and the OpenAI greedy estimate selects among finalists using the remaining examples rather than reporting a subsequent untouched test.
- **No uncertainty budget is provided.** The paper does not show how ranking stability changes with the number of prompts or examples, so it offers no principled stopping rule for affordable evaluation.
- **The model cohort is historically and architecturally bounded.** Main models top out at 15B and predate current frontier systems. Provider-side prompt wrapping, model routing, and checkpoint drift make closed-model replication especially difficult.
- **One benchmark implementation error is acknowledged.** The LMENTRY “ends with word” anomaly is attributed mostly to its official evaluation script, demonstrating that adding prompts does not repair a flawed task metric.
- **CPS lacks external validation.** Its functional form encodes one peak-versus-robustness preference, can behave non-monotonically in peak score, and is not validated against actual platform utility or user satisfaction.

## Vault Ideas Extracted

* Update [Prompt Contingency](/vault/prompt-contingency.md) with the 6.5M-scale ranking evidence, especially the 15/25 tasks containing negative-τ prompt pairs and the opposite effects of the same “excludes”→“lacks” edit across Flan-T5 sizes.
* Update [LLM Evaluation Methods](/vault/llm-evaluation-methods.md) with purpose-conditioned `MaxP`, `AvgP`, and `(Sat × MaxP)` evaluation, plus the requirement to define the prompt distribution and isolate prompt selection from final testing.
* Update [Prompt Optimization](/vault/prompt-optimization.md) with `MaxP` as the downstream prompt-search objective, the held-out-selection requirement, and the finding that peak performance can make LLaMA-based models look competitive while average paraphrase performance exposes fragility.
