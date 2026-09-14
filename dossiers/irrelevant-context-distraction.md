---
type: Study Note
title: "Large Language Models Can Be Easily Distracted by Irrelevant Context"
description: A controlled GSM8K-derived benchmark showing that one answer-irrelevant sentence can sharply destabilize arithmetic reasoning, especially when it is topically and lexically close, while distractor-aware examples, explicit instructions, and self-consistency only partly recover robustness.
resource: https://arxiv.org/abs/2302.00093v3
source: /archive/irrelevant-context-distraction.pdf
tags: [context-engineering, evaluation, benchmark, reasoning, prompting, chain-of-thought]
timestamp: 2026-09-14T17:11:24Z
---

# Large Language Models Can Be Easily Distracted by Irrelevant Context - Study Notes

**Authors**: Freda Shi, Xinyun Chen, Kanishka Misra, Nathan Scales, David Dohan, Ed Chi, Nathanael Schärli, Denny Zhou  
**Venue**: ICML 2023, Proceedings of Machine Learning Research 202  
**Revision**: arXiv:2302.00093v3, 6 June 2023  
**Pages**: 18

## What It Is

This paper introduces **Grade-School Math with Irrelevant Context (GSM-IC)**, a controlled diagnostic for a narrow but important failure: a model can solve a short arithmetic word problem, then fail after one sentence that has no bearing on the answer is inserted into the problem. The point is not that the arithmetic is hard. The base set was deliberately selected to be easy for the tested prompts, so the intervention isolates failure to identify which facts belong in the solution.

The evaluation covers `code-davinci-002` and the RLHF-trained `text-davinci-003` with chain-of-thought (COT), zero-shot COT (0-COT), least-to-most prompting (LTM), and generated Python programs (PROGRAM). Every method loses substantial reliability. Prompt demonstrations containing an irrelevant fact, an explicit instruction to ignore irrelevant facts, and 20-sample self-consistency help, but none establishes invariant filtering.

## How GSM-IC Is Constructed

The authors first sample 1,000 problems from the GSM8K training set as a development pool, then retain 100 that at least one studied prompting method can solve. This is an intentionally easy subset: clean `code-davinci-002` accuracy is 95% for COT, 94% for LTM, 83% for PROGRAM, and 44% for 0-COT. The problems require two to seven solution steps; 60 of the 100 require two.

Each derived item preserves the original problem and answer while adding one templated sentence. The sentence is placed **immediately before the final question**. If the added role introduces a pronoun ambiguity, the authors rewrite only the question to name the intended original role explicitly. They manually check that every generated sentence is grammatical and does not change the standard solution.

Three orthogonal factors generate controlled variants:

| Factor | Lower-interference condition | Higher-interference condition |
|---|---|---|
| Topic | Off-topic fact, such as a shoe size or books read | In-topic fact about the same kind of object or activity |
| Role-name overlap | A distinct name chosen from a fixed name set | A relation built from an original role, such as “Kim’s mother” |
| Number range | A positive integer outside the original scale | A positive integer within a factor of ten of some number in the problem or solution |

For each base problem, the authors write four in-topic templates and choose four off-topic templates, create five overlapping and five non-overlapping role fillers, and select four in-range and four out-of-range number fillers. They take special care with quantities that could plausibly be shared, such as family money, and treat a generic template as in-topic whenever its subject matches the original problem. The resulting benchmark has **58,052 examples**. Experiments use a uniform **4,000-example** sample, GSM-IC-4K, covering all 100 base problems; the test set is not used for construction or analysis.

### Metrics

- **Micro accuracy** gives every generated item equal weight.
- **Macro accuracy** is deliberately severe: a base problem counts as correct only when the method answers *every* distractor variant derived from it correctly. It measures invariance, not average success.
- **Normalized accuracy** divides GSM-IC accuracy by the method’s clean accuracy on the 100 base problems, separating distractor robustness from baseline arithmetic competence.

## What Makes a Distractor Effective

Relevance is not binary in model behavior. For `code-davinci-002` with clean demonstrations, topic and role proximity matter far more than raw numerical magnitude:

| Method | In-topic vs off-topic micro | Role overlap vs none micro | In-range vs out-of-range micro |
|---|---:|---:|---:|
| COT | 63.1 vs 80.7 | 68.3 vs 76.6 | 70.2 vs 74.6 |
| LTM | 70.8 vs 83.4 | 77.0 vs 78.2 | 77.2 vs 77.8 |
| PROGRAM | 44.1 vs 63.5 | 50.7 vs 58.4 | 54.3 vs 54.5 |

The macro gaps are even sharper. COT scores 10.2% on in-topic variants versus 33.0% off-topic, and 10.3% with overlapping roles versus 22.2% without. LTM scores 23.5% versus 45.0% by topic, while PROGRAM scores 4.1% versus 24.0%. By comparison, in-range versus out-of-range macro accuracy differs by 8 points for COT, 2 for LTM, and 4 for PROGRAM.

The operative variable is therefore **semantic and lexical confusability**, not merely whether an irrelevant number resembles the problem’s numbers. The generated traces show the mechanism at the output level: models sometimes directly substitute the distractor’s number into the arithmetic; other times they mention the sentence, then alter an unrelated calculation even without using that number.

Placement is controlled rather than studied. Every distractor sits at the high-salience boundary immediately before the question. GSM-IC therefore demonstrates strong near-question interference but cannot tell whether the same sentence would be weaker at the beginning, stronger in the middle, or sensitive to distance from the queried fact.

## Main Quantitative Results

With `code-davinci-002`, clean exemplars, and greedy decoding, all four methods degrade on GSM-IC-4K:

| Method | Micro | Normalized micro | Macro |
|---|---:|---:|---:|
| COT | 72.4 | 76.2 | 6.0 |
| 0-COT | 29.0 | 65.9 | 1.0 |
| LTM | 77.5 | 82.4 | 18.0 |
| PROGRAM | 54.4 | 65.5 | 5.0 |

LTM has the strongest average robustness and remains relatively stable as solution length grows, while COT and PROGRAM drop sharply at four or more steps. That advantage is not universal: on `text-davinci-003`, LTM’s 76.3 micro exceeds COT’s 68.4, but its 5% macro trails COT’s 9%; role-overlapping distractors are especially damaging to LTM on longer items.

The micro/macro split is the paper’s most useful result. A system can look respectable on average while being almost completely non-invariant across semantically equivalent versions. The abstract’s summary is conservative: under baseline greedy prompts, no method consistently solves more than 18% of its cleanly solvable base problems across all distractors.

## Mitigations and Their Limits

### Demonstrate irrelevance in the exemplar

Replacing the single clean few-shot example with one that contains an ignored distractor consistently improves `code-davinci-002`: COT rises from 72.4/6.0 micro/macro to 76.8/14.0, LTM from 77.5/18.0 to 80.7/28.0, and PROGRAM from 54.4/5.0 to 62.2/9.0. The model can infer a local filtering policy from one example, and Table 5 finds no meaningful regression on clean GSM8K development or SVAMP. This is useful adaptation, not proof that the model has learned a general relevance criterion.

### Say what to ignore

The instruction is explicit: “Solve grade school math problems. Feel free to ignore irrelevant information given in the questions.” With clean exemplars, it raises COT to 77.8 micro and 15 macro, LTM to 80.6 and 25, and PROGRAM to 56.7 and 6. The generic first sentence alone does not explain the gain; the paper reports that “Solve grade school math problems” by itself has little effect. The instruction about irrelevant information is what changes behavior.

Instruction and distractor-aware demonstrations can combine: COT reaches 78.1/17.0, LTM 82.8/28.0, and PROGRAM 63.2/12.0. Yet adding more examples is not automatically safer. A four-example COT prompt raises clean GSM8K development accuracy from 60.3 to 66.3, but on GSM-IC problems requiring more than two steps it falls from 70.8 to 69.4. With the instruction, four examples score 70.6 versus 76.0 for one example on those longer items, while two-step performance is nearly tied (79.2 versus 79.0). More prompt content can improve clean fit while worsening distractor robustness.

### Sample multiple reasoning paths

Self-consistency samples 20 outputs at temperature 0.7 and takes a majority vote. Against greedy decoding it raises `code-davinci-002` COT from 72.4 to 88.1 micro, LTM from 77.5 to 93.4, PROGRAM from 54.4 to 74.6, and 0-COT from 29.0 to 64.3. The paper reports an overall gain of more than 11 points for every method and a 35.5-point gain for 0-COT.

The candidate pool is stronger than the vote: at least one of 20 samples contains the correct answer for **99.7%** of GSM-IC items under COT and LTM, and **96.5%** under 0-COT. But the best macro accuracy after voting is only **45%** (LTM). Sampling nearly always recovers a correct path somewhere, yet correlated distraction and aggregation still prevent consistent selection. Self-consistency is a recall mechanism, not a relevance proof.

### Beyond synthetic GSM-IC

On the football subset of DROP, where long passages naturally contain irrelevant facts, the same instruction produces smaller but consistent gains: COT improves from 67.4 to 68.9 on `code-davinci-002` and 68.2 to 69.9 on `text-davinci-003`; LTM improves from 73.4 to 74.4 and 70.2 to 72.8, respectively. This is encouraging transfer evidence, though it is not comparable in scale or control to GSM-IC.

## Analyst Takeaways

1. **Evaluate invariance, not only average accuracy.** A 72–78% micro score can coexist with 6–18% macro consistency. For systems that must survive harmless wording or context changes, per-source worst-case or all-variant success is the more honest metric.
2. **Filter by semantic role before calculating.** Models are most vulnerable when an irrelevant sentence shares topic and entities with the true solution. Numeric range has much less effect. Retrieval and context assembly should prioritize relationship-to-question, not only topical similarity.
3. **Use distractor-aware examples and direct instructions as cheap defenses, not guarantees.** Both interventions help without obvious clean-task loss here, but gains depend on method and model, and even their combination leaves low macro robustness.
4. **Treat self-consistency as candidate generation.** A 99.7% oracle recall with only 45% best macro accuracy says the bottleneck has shifted from producing a correct answer to identifying it. Verification or relevance-aware selection is the missing layer.
5. **Do not equate a larger prompt with a more robust prompt.** Four demonstrations improve clean GSM8K accuracy yet can hurt longer distractor-bearing problems. Prompt length, clean accuracy, and robustness are separate optimization axes.
6. **A benchmark about context distraction should vary placement.** Fixing the distractor immediately before the question creates a strong diagnostic, but a production evaluation should sweep location, number of distractors, and distance from the needed facts.

## Questions and Limitations

- **Synthetic arithmetic boundary.** GSM-IC contains short grade-school arithmetic problems with one templated, manually verified sentence. It does not establish the size or mechanism of distraction in open-domain synthesis, code, dialogue, tool use, or contexts containing many partially relevant and contradictory facts.
- **Easy, selected base set.** The 100 bases come from GSM8K training data and were selected because at least one evaluated prompt solved them. That isolates distraction but narrows task difficulty and may favor the studied methods.
- **Only 4,000 of 58,052 variants are evaluated in the main experiments.** The sample covers all bases, but reported model scores are not exhaustive over the released benchmark.
- **Fixed placement and dose.** One sentence is always inserted immediately before the question. There is no position sweep, distractor-count curve, or context-length study.
- **Template-factor interactions remain limited.** Topic, role overlap, and number range are useful controls, but “irrelevant” in real tasks is graded and may only become relevant through unstated assumptions. Manual validation cannot reproduce that open-world ambiguity.
- **Macro accuracy is stringent and class-size-sensitive.** Requiring success on every generated variant is operationally meaningful, but a base problem with more variants has more opportunities to fail; the metric does not summarize the distribution of failures within a class.
- **Model vintage and access.** The evidence is from two proprietary 2022–2023 GPT-3-family checkpoints, including the retired `code-davinci-002`. It should motivate a contemporary evaluation, not be treated as a current model ranking.
- **Mitigations are task-signaled.** Telling a model that irrelevant information exists is easier than recognizing it without warning. The instruction may prime skepticism in a way unavailable in deployments where relevance itself is uncertain.
- **Self-consistency is expensive and still correlated.** Twenty full samples multiply inference cost, and majority vote cannot distinguish a shared misconception from genuine agreement.

## Vault Ideas Extracted

* [Self-Consistency Decoding](/vault/self-consistency-decoding.md)
* [Prompt Contingency](/vault/prompt-contingency.md)
* [Position-Robust Context Evaluation](/vault/position-robust-context-evaluation.md)
* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
