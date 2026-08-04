---
type: Study Note
title: Least-to-Most Prompting Enables Complex Reasoning in Large Language Models
description: Historical study notes on least-to-most prompting, a decomposition-and-sequential-solving method for extrapolating from simple demonstrations to harder reasoning problems.
resource: https://arxiv.org/abs/2205.10625v3
source: /archive/least-to-most-prompting.pdf
tags: [decomposition, prompting, reasoning, generalization]
timestamp: 2026-07-13T00:04:46Z
---

# Least-to-Most Prompting Enables Complex Reasoning in Large Language Models - Study Notes

**Authors**: Denny Zhou, Nathanael Schärli, Le Hou, Jason Wei, Nathan Scales, Xuezhi Wang, Dale Schuurmans, Claire Cui, Olivier Bousquet, Quoc Le, and Ed Chi  
**Venue**: ICLR 2023; arXiv:2205.10625v3 [cs.AI]  
**Version date**: April 16, 2023  
**Pages**: 61

## What It Is

Least-to-most prompting is a few-shot inference procedure for problems whose test instances require more reasoning than the demonstrations. Rather than ask the model to complete one long chain from scratch, it first asks the model to decompose the original problem into an ordered list of easier subproblems. It then solves those subproblems sequentially, adding each generated answer to the context for the next one.

The method's essential claim is not simply that decomposition helps. Its subproblems are normally **dependent**: each answer becomes a building block for a later answer. The original question is commonly the final subproblem. This makes the prompt act like a demonstrated base case plus recursive extension rule, without model training or fine-tuning.

## The Problem It Targets

Few-shot chain-of-thought (CoT) can improve same-difficulty reasoning, but a single completion may fail when a test problem is longer or more compositional than its worked examples. The paper calls this easy-to-hard generalization: demonstrations show a small procedure, while test cases require executing it more times or composing it in new ways.

Least-to-most turns that extrapolation into an explicit loop. It attempts to keep every individual model call within the difficulty range represented by the prompt while preserving intermediate results across calls.

## How It Works

1. **Decompose** — use few-shot examples to map the original problem to an ordered list of simpler subproblems.
2. **Solve in order** — issue a solving prompt containing worked solution examples, the completed subproblem/answer pairs so far, and the next subproblem.
3. **Carry forward state** — append the new answer and repeat. The last answer supplies the final result.

The decomposition and solving prompts can be separate, as in the symbolic and SCAN experiments. For GSM8K, the authors also use a simplified one-shot form that elicits a decomposition and then sends a second request for the final answer. Least-to-most can be combined with CoT or self-consistency, but neither is required by the method.

## Experimental Design

The paper evaluates 2022-era GPT-3 models, especially `code-davinci-002`, on three settings:

- **Last-letter concatenation**: given a word list, concatenate its final letters; test lists are longer than the examples.
- **SCAN compositional generalization**: translate language commands to action sequences, including the length split where test sequences are longer than training examples.
- **Math and reading-comprehension arithmetic**: GSM8K and numerical subsets of DROP, with results broken down by the number of expected reasoning steps.

The comparisons include standard few-shot prompting and CoT. The appendix also varies the number and form of examples, model version, prompt engineering, and analyzes failures. The reported values are historical results for the named models, prompts, benchmark versions, and post-processing—not present-day performance predictions.

## Results That Stood Out

- On last-letter concatenation with `code-davinci-002`, least-to-most achieved 94.0%, 88.4%, 83.0%, 76.4%, and 74.0% accuracy as list length increased from 4 to 12; CoT reached 84.2%, 69.2%, 50.2%, 39.8%, and 31.8%. More CoT examples improved it somewhat but did not close the long-list gap in the reported comparison.
- On SCAN's length split, `code-davinci-002` achieved 99.7% with least-to-most, versus 16.7% for standard prompting and 16.2% for CoT. The method used a 14-example command-mapping prompt and an 8-example decomposition prompt, plus a postprocessor that expanded the model's compact Python-like output representation.
- On numerical DROP, least-to-most reached 82.45% on non-football passages and 73.42% on football passages, versus CoT's 74.77% and 59.56%. On GSM8K it made a smaller overall change: 62.39% versus 60.87% for CoT.
- The GSM8K split is more revealing than its aggregate: with a one-shot, two-step demonstration, least-to-most improved accuracy on problems requiring five or more expected steps from 39.07% to 45.23%, while it was slightly worse on two-step problems (74.53% versus 76.68%).
- Better in-domain prompt engineering raised both methods, but did not make least-to-most universally superior: on the paper's best GSM8K prompts, CoT scored 68.613% and least-to-most 68.01%.

## What the Error Analyses Show

Decomposition does not remove the need to validate intermediate state. On the long list task, most sampled least-to-most failures were dropped, added, or misordered letters during concatenation—not incorrect letter lookup. On SCAN, the strongest model still confused modifiers such as `twice`/`thrice` after `around` and sometimes interpreted `after` as `and`.

In 20 sampled DROP failures, 4 came from a bad or absent decomposition, 13 from solving a decomposed question incorrectly, and 3 exposed incorrect benchmark labels. The method can make the source of a failure more inspectable, but it can also propagate a wrong answer through every later prompt.

## Limitations

- Decomposition examples did not transfer reliably across domains; the authors say a math-word-problem decomposition prompt was not effective for a commonsense question. New domains need their own demonstrated decomposition procedure.
- The especially strong last-letter and SCAN results rely on problems with straightforward decompositions and controlled symbolic formats. They do not establish comparable benefits for open-ended work.
- Results depend on discontinued, 2022-era GPT-3 model variants, hand-authored demonstrations, benchmark-specific prompt choices, and output post-processing. They require a contemporary evaluation before use in a live system.
- Sequential calls increase latency, token use, and the chance that an early error contaminates later state. The paper does not provide a general recovery or verification mechanism.
- A correct decomposition can be close to solving the task itself. The method shifts difficulty into decomposition rather than making it disappear.

## Analyst Takeaways

1. **Use a dependency-aware decomposition when the task extrapolates in depth.** Independent subquestions fit a fan-out/fan-in workflow; least-to-most is for a linear chain where later steps actually need earlier results.
2. **Demonstrate recursion, not only explanations.** The paper's useful prompt pattern teaches a base case and an extension step. This is more specific than asking a model to "break it down."
3. **Measure accuracy by task depth.** Aggregate scores concealed the paper's main GSM8K effect. Evaluate simple and deep cases separately, along with direct-answer and CoT controls.
4. **Make intermediate answers typed and checkable.** The SCAN postprocessor and error analyses suggest using structured state plus deterministic validation where possible, rather than silently trusting accumulated prose.
5. **Treat decomposer quality as a gating condition.** Before building an agent loop around this method, test whether the proposed subproblems are complete, ordered, and solvable in the target domain.

## Vault Ideas Extracted

* [Least-to-Most Prompting](/vault/least-to-most-prompting.md)
