---
type: Study Note
title: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
description: Historical study notes on the foundational few-shot chain-of-thought paper and its evidence for eliciting intermediate reasoning steps in large language models.
resource: https://arxiv.org/abs/2201.11903v6
source: /archive/chain-of-thought-prompting-elicits-reasoning.pdf
tags: [chain-of-thought, prompting, reasoning, in-context-learning]
timestamp: 2026-07-12T22:25:44Z
---

# Chain-of-Thought Prompting Elicits Reasoning in Large Language Models - Study Notes

**Authors**: Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed H. Chi, Quoc V. Le, Denny Zhou  
**Venue**: NeurIPS 2022; arXiv:2201.11903 [cs.CL]  
**Publication date**: January 28, 2022 (arXiv v1); published at NeurIPS 2022  
**Version date**: January 10, 2023 (v6)  
**Pages**: 43

## What It Is

This paper establishes **few-shot chain-of-thought prompting**: place examples of the form `question -> intermediate natural-language reasoning -> answer` in a model's context, then ask it to solve a new problem in the same way. The method changes only the inference prompt. It requires no task-specific fine-tuning or parameter update.

The paper evaluates the pattern on arithmetic word problems, commonsense questions, symbolic manipulation, and constrained robot planning. Its central historical claim is that intermediate reasoning demonstrations could unlock capabilities that standard input-output examples did not reveal in the very large language models evaluated in 2022.

## Why It Mattered in 2022

Natural-language rationales were already used in supervised training, and scratchpads had already shown the value of intermediate computation. This paper's important move was to combine rationales with in-context learning: a small number of worked examples could elicit stepwise behavior from an off-the-shelf model across multiple task families.

That made chain of thought a general prompting interface rather than a task-specific training recipe. It also helped shift prompt research from specifying only the input and expected answer toward specifying the intermediate representation a model should produce before answering.

The work was influential for three additional reasons:

1. It associated the benefit with model scale, reporting that small models often produced fluent but illogical chains while much larger models benefited.
2. It showed especially large gains on multi-step tasks where standard prompting had low or flat performance.
3. It treated the generated trace as both useful computation and a debugging surface, while explicitly warning that the trace did not establish what computation the neural network actually performed.

## Method and Experimental Scope

- **Prompt format**: a small set of manually written triples containing the input, a natural-language chain of intermediate steps, and the final answer.
- **Models**: GPT-3/InstructGPT variants, LaMDA, PaLM, UL2 20B, and Codex. The revised paper's principal large-model comparisons include GPT-3 175B, LaMDA 137B, PaLM 540B, and code-davinci-002.
- **Arithmetic**: GSM8K, SVAMP, ASDiv, AQuA, and the MAWPS subsets.
- **Commonsense and planning**: CommonsenseQA, StrategyQA, BIG-bench Date Understanding and Sports Understanding, and SayCan.
- **Symbolic tasks**: last-letter concatenation and coin-flip state tracking, including tests longer than the few-shot demonstrations.
- **Decoding**: greedy decoding for the main results. The paper notes self-consistency as follow-up work rather than evaluating it as the main method.

Most arithmetic datasets used the same eight hand-written demonstrations. The authors also varied annotators, exemplar sets, exemplar order, annotation style, and exemplar count to test robustness. Because the largest LaMDA and PaLM models were proprietary, the paper provided exact prompts and outputs and included public-API GPT-3 experiments, but full reproduction across all model families was not possible.

## Results in Their Historical Context

These results describe the paper's 2022-era models, prompts, benchmarks, and comparison set. They are historical evidence, not current model-selection guidance.

- On GSM8K, PaLM 540B rose from 17.9% with standard prompting to 56.9% with chain-of-thought prompting; adding a post-hoc external calculator raised it to 58.6%.
- GPT-3 175B rose from 15.6% to 46.9% on GSM8K, while Codex rose from 19.7% to 63.1%.
- PaLM 540B improved from 79.2% to 93.3% on aggregate MAWPS, with the largest gain on the MultiArith subset. Gains were small or negative on some easy one- and two-step subsets where baseline performance was already high.
- On the revised paper's commonsense tasks, PaLM 540B improved on StrategyQA, date understanding, sports understanding, and SayCan, but only minimally on CommonsenseQA. GPT-3's chain-of-thought results were worse than standard prompting on CommonsenseQA and essentially flat on StrategyQA.
- On the synthetic symbolic tasks, chain-of-thought demonstrations enabled much stronger in-domain and longer-sequence performance for the largest PaLM and LaMDA models. The paper appropriately describes the in-domain versions as toy tasks whose solution structure was already demonstrated.

The reported threshold was strongly model-family- and period-specific. In the paper's scaling curves, benefits appeared mainly around tens to hundreds of billions of parameters and could be negative for small models. The durable result is not a universal parameter cutoff; it is that a prompt technique can interact sharply with model capability and task difficulty.

## What the Ablations Showed

The ablations help distinguish intermediate reasoning from merely generating more tokens:

- **Equation only** helped on simpler arithmetic datasets but not much on semantically harder GSM8K questions.
- **Variable compute only**, implemented as outputting filler dots before the answer, performed near the standard baseline.
- **Reasoning after the answer** also performed near the baseline, suggesting that placing the intermediate steps before the prediction mattered in this setup.
- Different annotators and exemplar sets generally retained the arithmetic benefit, but performance still varied substantially. On the coin-flip task, for example, LaMDA 137B ranged from 71.4% to 99.6% across annotators.

The evidence therefore supports a narrower claim than "more tokens improve reasoning": for these models and tasks, semantically meaningful intermediate steps before the answer often helped, but prompt construction remained consequential.

## Error Analysis and Interpretability Limits

The paper manually inspected LaMDA 137B outputs on GSM8K. Among 50 sampled wrong answers, 8% had only a calculation error, 16% only a symbol-mapping error, and 22% were missing one step; the remaining 54% required substantial correction, usually because of semantic misunderstanding and sometimes incoherence. An external calculator improved several arithmetic results, illustrating the value of separating language-based decomposition from exact computation.

Correct final answers did not guarantee correct reasoning. That problem was less common in the sampled free-response math outputs, where accidental agreement is difficult, but the authors warned that it is more likely for multiple-choice and binary tasks. They explicitly did not claim that a generated chain is a faithful report of the model's internal computation.

## Limitations

- The headline evidence comes from a small set of 2022-era model families, several proprietary, under fixed few-shot prompts and benchmark conditions.
- Chain-of-thought annotations cost little for few-shot prompting but could be expensive at fine-tuning scale.
- Generated chains can be factually wrong, incoherent, or accidentally lead to the right answer.
- Larger prompts and intermediate outputs increase inference cost.
- Some evaluations used synthetic tasks, small test sets, or examples taken from an evaluation set because no training split existed.
- The work does not determine whether producing a plausible trace means the model is reasoning, nor whether the trace faithfully explains the answer.

## Analyst Takeaways

1. **Intermediate representations are part of the program.** A prompt can specify not only the answer format but also a decomposition procedure that allocates inference tokens to intermediate states.
2. **Use chain of thought where decomposition has work to do.** The paper's own results were strongest on difficult multi-step tasks and weakest where direct prompting was already strong or the task did not benefit from the supplied structure.
3. **Do not equate a rationale with evidence.** A generated trace is useful for diagnosis and downstream checking, but it is neither guaranteed correct nor a faithful window into internal computation.
4. **Pair language reasoning with deterministic tools when possible.** The calculator experiments show a durable systems pattern: let language handle semantic decomposition and delegate exact operations to verifiable executors.
5. **Validate the prompt-model-task combination.** Variance across models, annotators, and tasks was already visible in the founding paper.

## Current Validity

The durable contribution is the concept of eliciting an intermediate natural-language representation before the final answer. Later prompt-engineering surveys already in this knowledge base continue to treat chain of thought as a foundational reasoning technique and place self-consistency, Tree of Thoughts, code-based reasoning, and verification methods around it. That is evidence that the concept remained influential after 2022, not proof that the original benchmark gains transfer unchanged to current systems.

The specific GSM8K, MAWPS, StrategyQA, symbolic-task, and SayCan numbers; the reported state-of-the-art comparisons; the behavior of LaMDA, PaLM, GPT-3, Codex, and UL2; the approximate scale threshold; prompt lengths; inference costs; and robustness magnitudes are model- and period-specific. Their status on contemporary models **requires contemporary verification**.

More recent evidence in this repository qualifies any universal recommendation. The 2025 *Prompt Engineering is Complicated and Contingent* dossier shows on GPT-4o and GPT-4o-mini that prompt effects and measured reliability can change with the model, item, formatting, and scoring threshold. It does not directly retest chain of thought, but it supports treating the 2022 recipe as a hypothesis to evaluate locally rather than an unconditional present-tense rule.

No source currently in this knowledge base establishes whether exposed chain-of-thought traces from contemporary reasoning systems are faithful, necessary, or desirable for a given deployment. That question needs a recent evidence update. For current use, intermediate reasoning should be evaluated against direct answering, concise reasoning, tool execution, and answer-only interfaces using deployment-relevant accuracy, reliability, latency, cost, privacy, and safety criteria.

## Vault Ideas Extracted

* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
* [In-Context Learning](/vault/in-context-learning.md)
* [Prompt Contingency](/vault/prompt-contingency.md)
