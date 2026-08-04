---
type: Study Note
title: Large Language Models Are Human-Level Prompt Engineers
description: Study notes on Automatic Prompt Engineer, a black-box method that uses language models to propose, score, and select natural-language instructions from task demonstrations.
resource: https://arxiv.org/abs/2211.01910v2
source: /archive/automatic-prompt-engineer.pdf
tags: [prompt-optimization, prompting, evaluation]
timestamp: 2026-07-13T00:10:30Z
---

# Large Language Models Are Human-Level Prompt Engineers - Study Notes

**Authors**: Yongchao Zhou, Andrei Ioan Muresanu, Ziwen Han, Keiran Paster, Silviu Pitis, Harris Chan, and Jimmy Ba  
**Venue**: ICLR 2023; arXiv:2211.01910v2 [cs.LG]  
**Version date**: March 10, 2023  
**Pages**: 43

## What It Is

Automatic Prompt Engineer (APE) treats a natural-language instruction as a program to be synthesized from input-output demonstrations. Rather than ask a person to write that program, it uses an LLM to propose many plausible instructions, executes each against a target model, scores the resulting outputs, and returns the highest-scoring instruction.

The important distinction is selection. APE is not merely prompt paraphrasing or single-shot instruction induction: it is a black-box search loop over discrete language, where model-generated candidates are validated by task behavior. The proposal model and the target/scoring model can be different, which makes the method applicable even when the target is available only through an API.

## The Problem It Targets

Human-written instructions can be brittle, expensive to discover, and unintuitive with respect to a particular model. Gradient-based soft-prompt methods are also often unsuitable for hosted models because they require parameter or gradient access.

APE instead assumes a small task dataset and a measurable objective. Given demonstrations \(D_{train}=\{(Q,A)\}\), it searches for an instruction \(\rho\) that maximizes expected task score when concatenated with each input and sent to the target model. That makes prompt engineering an empirical optimization problem, not a claim that the best wording should be obvious to a human reader.

## How APE Works

1. **Propose instructions** — prompt an LLM to infer an instruction from several input-output pairs. A left-to-right “forward” template completes an instruction after the examples; an infilling-capable “reverse” model fills an instruction blank before the examples. Task-specific templates can incorporate a desired objective.
2. **Score execution** — run every candidate instruction on held-out training examples with the target model. The paper tests exact or invariant-aware execution accuracy and the target model’s log probability of the expected answer; for its instruction-induction tasks, execution accuracy correlated better with test performance.
3. **Allocate evaluation adaptively** — first score all candidates on a small subset, discard weak candidates, then score survivors on fresh subsets and finally on the full training set. This multi-stage filter spends most execution budget on promising prompts.
4. **Optionally resample locally** — iterative APE retains high-scoring instructions, asks an LLM for semantically similar variants, and repeats scoring. It improves the overall proposal distribution but usually offers only marginal gains over direct generation and selection.
5. **Deploy the winner** — choose the highest-scoring instruction and evaluate it on a separate test set. The optimized instruction can then be prepended to zero-shot or few-shot prompts.

## Experimental Design

The core zero-shot experiments use `text-davinci-002` (described as InstructGPT) on 24 Instruction Induction tasks, using five task examples to infer instruction candidates. The authors compare human instructions, a greedy one-candidate instruction generator, and APE; they also curate 21 instruction-suitable BIG-Bench tasks.

Additional experiments optimize a zero-shot chain-of-thought answer prefix and optimize prompts for TruthfulQA’s truthfulness, informativeness, or their combination. These are historical experiments on 2022-era models, APIs, benchmarks, and evaluation protocols.

## Results That Stood Out

- Across the 24 Instruction Induction tasks, APE matched or exceeded the human instruction on every task and had an interquartile-mean zero-shot score of 0.810 versus 0.749 for human prompts. It beat the greedy model-generated baseline on all tasks.
- On the curated 21-task BIG-Bench subset, APE matched or improved the human prompt on 17 tasks. This is a more qualified result than the 24/24 Instruction Induction finding; the method lost ground on several tasks, including logical-fallacy detection and ruin names.
- APE found the CoT trigger “Let’s work this out in a step by step way to be sure we have the right answer.” On `text-davinci-002`, this improved MultiArith from 78.7% with “Let’s think step by step” to 82.0%, and GSM8K from 40.7% to 43.0%. It improved 6 of 12 reported reasoning tasks.
- On TruthfulQA, instructions selected for truthfulness could exploit a refusal trade-off: some reached about 95% judged truthfulness but only 22% informativeness. Prompts selected for the combined objective reached about 40–44% both true-and-informative answers on the test set, versus roughly 30% for the human “help” prompt.
- More candidate samples improved selected-prompt quality with diminishing returns; the paper reports human-level performance around 64 samples in its analysis. Larger, instruction-tuned proposal models generated shorter and stronger candidates and could be cheaper overall because scoring long weak prompts dominates cost.

## What the Analyses Reveal

The choice of metric is part of the prompt. Execution accuracy was a better predictor of test accuracy than log probability in the paper’s 24-task analysis, but a metric can still reward behavior that violates the intended task. In the Rhymes task, several selected “instructions” asked the model to capitalize the input: because every word rhymes with itself, this exploited the benchmark’s acceptance rule and scored perfectly in zero-shot evaluation. It performed badly once nontrivial few-shot examples were added.

The same principle appears in TruthfulQA. Optimizing truthfulness alone finds refusals; optimizing informativeness alone can encourage confident but less truthful answers. APE exposes those trade-offs rather than resolving them. The scoring function, validation split, and output constraints define what the system will optimize.

## Limitations

- APE needs representative examples and a reliable, task-level score. It cannot determine whether an unmeasured property—such as safety, helpfulness, or semantic faithfulness—matters.
- Search can overfit a small validation set or exploit benchmark quirks. The paper’s rhyming example is a concrete instance; separate test sets and adversarial checks are necessary.
- Results concern discontinued models and task-specific prompt templates. They are evidence for the method, not a prediction of performance with current models.
- Proposal generation and repeated target-model execution can be costly. The paper’s efficiency argument is amortized: a discovered instruction must be reused enough times to repay search.
- Local paraphrase resampling does not reliably escape a weak initial candidate pool, and the authors find it adds little on many tasks.

## Analyst Takeaways

1. **Optimize a prompt against observable behavior, not rhetorical plausibility.** A concise, strange-looking instruction may outperform a fluent one, but it should only be accepted after behavioral validation.
2. **Treat the evaluator as the real specification.** Before prompt search, write down what a high score permits, rejects, and fails to measure. Add constraints or multiple objectives before optimizing, not after a loophole appears.
3. **Use successive halving for expensive evaluations.** Cheap early screening followed by fuller evaluation of survivors is a practical pattern for any prompt-search budget.
4. **Separate offline discovery from online inference.** Prompt search may be expensive, while the selected instruction can be a compact reusable artifact. Re-evaluate it when the target model, task distribution, or policy changes.
5. **Keep prompts and test cases versioned.** APE is an experimental procedure; reproducibility requires preserving the candidate generator, scorer, splits, model version, and selected text.

## Vault Ideas Extracted

* [Prompt Optimization](/vault/prompt-optimization.md)
