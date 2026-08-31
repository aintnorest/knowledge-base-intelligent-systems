---
type: Synthesis
title: Bias as Prior Dominance
description: An operational definition of bias as the inverse divergence between a system's output distribution given its input and its input-independent prior, with harmful bias defined as the divergence between the representation actually used and the normatively permitted one.
tags: [evaluation, governance, reliability]
timestamp: 2026-08-25T19:29:18Z
---

# Bias as Prior Dominance

Bias discussions stall because the word covers too much. One way to make it arguable is to define it measurably. Treat any entity capable of bias as a function `f` mapping inputs `A` to outputs `O`, with internal structure and parameters `X`. Then:

> `B = D( P_f(o | a; X) ‖ P_f(o; X) )^-1`

Bias is the *inverse* KL-divergence between the posterior — the output distribution given the input — and the prior, the output distribution ignoring the input. The more the output tracks the input, the larger the divergence and the smaller the bias. In the limit where the two distributions coincide, divergence is zero and bias is infinite: an entity proceeding entirely on prior disposition, evidence be damned.

This restates the APA sense of bias as "partiality: an inclination or predisposition for or against something," and isolates the two elements that matter: a **choice**, and that choice being influenced by information prior to the present context.

## Bias in This Sense Is Not a Defect

The definition is deliberately value-neutral, and that is its most useful property. Inductive bias is what makes learning possible; heuristics and biases are adaptive; priors are central to accounts of perception and cognition. Any function that does not attend to its input is useless, so every useful function is biased in this sense.

Which relocates the argument: the contested question is never "what do you mean by bias?" but **"what do you mean by harmful?"** — and harm is inescapably normative, a judgment that some behaviors are good and others are not.

## The Harmful-Bias Refinement

Harmful bias then becomes a statement about *which information the function uses*:

> `B_h = D( P_f(o | r_f(a); X) ‖ P_f(o | r_n(a); X) )^-1`

where `r_f(a)` is the representation of input `a` that the function actually computes on, and `r_n(a)` is that same representation with normatively unacceptable information removed — protected demographic categories, for example. Harmful bias is the divergence between the model as it is and a counterfactual model that could not see what it is not supposed to use.

The formulation's value is the discipline it imposes: you cannot compute `B_h`, or even argue about it, without first stating explicitly which information is off-limits for which inferences. That statement is normative work that no statistical procedure supplies, and the definition makes its absence visible.

## Practical Use

- Use it as a **pre-registration device** for bias claims: before asserting a system is harmfully biased, name `r_n` — the information the system should not have been using. Many published bias claims do not.
- The framing suits settings the definition was built for: probabilistic input–output dependence, largely black-box internal structure, and representations doing the causal work.
- The `r_f` versus `r_n` contrast maps onto practical ablation designs — compare behavior when the sensitive signal is present, removed, or counterfactually swapped — even where the divergences themselves are not computable.
- It also makes an argument available in the other direction: showing that a system's outputs *do* track its inputs is a defense against the "it just repeats its prior" charge, separately from whether the tracking is normatively acceptable.

## Limitations

- Presented by its author as a characterization to argue with, not a definitive or consensus definition; no measurement protocol accompanies it.
- Both quantities are hard to estimate in practice. The input-independent prior over outputs and the counterfactual normatively-restricted representation are not directly observable for a large model.
- Inverting the divergence makes "bias" a large number when the divergence is small, which is intuitive at the extremes and awkward in the middle; the scale has no natural units and no calibrated interpretation.
- All the difficulty is displaced into specifying `r_n`, which is a contested normative question, not a modeling one — the definition organizes the disagreement rather than resolving it.
- Removing an attribute from a representation does not remove its proxies; a defensible `r_n` has to account for correlated signal.

## Sources

- [Large Language Models Are Biased Because They Are Large Language Models dossier](/dossiers/llms-are-biased-because-they-are-llms.md) — develops the definition through Adcock and Collier's background-concept / systematized-concept / operationalization ladder, and uses the harmful-bias refinement to argue that the real dispute is over normativity.
