---
type: Study Note
title: Exploring Length Generalization in Large Language Models
description: Personal study notes on Anil et al.'s NeurIPS 2022 experiments showing that ordinary and scratchpad fine-tuning can fail to extrapolate in problem length, while few-shot scratchpad prompting can induce length-robust templates in capable pretrained models.
resource: https://arxiv.org/abs/2207.04901v2
source: /archive/exploring-length-generalization-language-models.pdf
tags: [generalization, in-context-learning, chain-of-thought, reasoning]
timestamp: 2026-07-23T20:03:07Z
---

# Exploring Length Generalization in Large Language Models - Study Notes

**Authors**: Cem Anil, Yuhuai Wu, Anders Andreassen, Aitor Lewkowycz, Vedant Misra, Vinay Ramasesh, Ambrose Slone, Guy Gur-Ari, Ethan Dyer, and Behnam Neyshabur  
**Venue**: NeurIPS 2022; arXiv:2207.04901v2 [cs.CL]  
**Date**: November 14, 2022  
**Pages**: 18

## What It Is

This paper defines **length generalization** as learning on shorter/easier instances and solving longer/harder ones. It studies whether transformer language models learn a sequential algorithm or instead exploit training-length correlations that cease to work outside the training range.

The authors use synthetic parity/coin-flip tasks and Boolean variable-assignment programs, then contrast ordinary fine-tuning, scratchpad fine-tuning, and few-shot scratchpad prompting. The main result is deliberately nuanced: adding intermediate steps during fine-tuning does not by itself make a learned procedure extrapolate. In-context scratchpad examples can do much better when the pretrained model already has a compatible latent skill.

## What Fine-Tuning Misses

Models from hundreds of millions to more than one hundred billion parameters fit short training instances but often collapse on longer ones. In the parity setting, models can have similar in-distribution loss while exhibiting sharply different out-of-distribution accuracy solely from hyperparameter changes. A shuffled-operation baseline remains comparably weak at new lengths, suggesting that ordinary training can learn non-sequential shortcuts rather than execute the intended algorithm.

The variable-assignment task makes the distinction clearer. Models can tolerate an out-of-distribution number of operations when computational depth stays familiar, but not when the actual sequential dependency depth grows. Model scale alone did not resolve this failure in the tested range.

## Scratchpads: Fine-Tuning Versus Prompting

Scratchpad fine-tuning asks the model to emit an intermediate state after each step. It improves the visibility of a desired sequential algorithm, but it still failed to generalize reliably to longer inputs in these experiments.

The paper tests two plausible explanations: unseen positional distances and premature end-of-sequence behavior. Padding inputs and scratchpads to keep relevant positions comparable helped, but did not eliminate the gap. On out-of-distribution lengths, even early scratchpad steps became inaccurate, which indicates a broken attention pattern rather than merely accumulated decoding error.

Few-shot scratchpad prompting behaved differently. With a few short natural-language coin-flip examples, the pretrained 128B LaMDA model could reproduce a sequential template far beyond the exemplar length. The same broad pattern appeared in variable assignment, although the strength of the result depended on the base model’s prior ability on the task.

## The Conditional Role of Pretraining

Few-shot fine-tuning with scratchpads materially improved parity length generalization when the base model already generalized well under a prompt. It did not produce the same separation on variable assignment, where the unmodified model had little relevant competence. Rephrasing a task in an unfamiliar synthetic prompt style likewise brought the fine-tuned model’s failure mode back.

The useful inference is not that prompting universally beats training. It is that in-context examples can select and compose a pre-existing procedural template, whereas fine-tuning may need to learn that template from scratch and can settle on a shortcut instead.

## Analyst Takeaways

1. **Evaluate beyond the demonstration length.** In-distribution loss and short-instance benchmark scores are poor proxies for whether a prompting or training intervention learned a scalable procedure.
2. **Treat a scratchpad as both representation and control pattern.** Showing intermediate states helps only if the model can attend to, extend, and use the sequential dependency at new lengths.
3. **Measure capability activation separately from capability acquisition.** A few demonstrations can activate a pretrained skill; fine-tuning may be needed to acquire a missing skill, but that route has different failure modes.
4. **Test concrete distributions of difficulty.** More tokens, more operations, more dependency depth, and more positional distance are distinct shifts that should not be collapsed into one “long-context” score.

## Questions and Limitations

- The experiments are predominantly synthetic algorithmic tasks and 2022-era LaMDA/Codex-style models. Their exact scale thresholds and prompt behavior should not be taken as current-model expectations.
- The paper does not establish a general method for ensuring length generalization in natural-language reasoning, code repair, or tool use.
- “Correct” scratchpads are task-specific and can leak a privileged execution representation. A production chain of thought should not be assumed to be either faithful or externally verifiable.
- Few-shot prompting lengthens the context and can fail when examples are poorly chosen, task semantics are unfamiliar, or positional structure differs from the prompt format.

## Vault Ideas Extracted

* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
