---
type: Study Note
title: Verbosity Bias in Preference Labeling by Large Language Models
description: Study notes on a short preprint that measures GPT-4's preference for longer answers in open-ended judging, contrasts it with human preference labels, and proposes an accuracy-parity metric for verbosity bias.
resource: https://arxiv.org/abs/2310.10076v1
source: /archive/verbosity-bias-preference-labeling-llms.pdf
tags: [llm-as-judge, evaluation, reinforcement-learning, reliability]
timestamp: 2026-08-25T18:05:00Z
---

# Verbosity Bias in Preference Labeling by Large Language Models — Study Notes

**Authors**: Keita Saito, Akifumi Wachi, Koki Wataoka, Youhei Akimoto (University of Tsukuba & RIKEN AIP; LY Corporation)
**Venue**: arXiv:2310.10076v1 [cs.CL], 16 October 2023 — preprint, under review
**Pages**: 10

## What It Is

A short, early-generation workshop-scale paper about a single question: when an LLM is used in place of a human preference labeler, does it prefer longer answers more than the humans it is replacing?

It does three things:

1. Shows that GPT-4, judging pairs of answers to open-ended creative prompts, reliably picks the longer one, with the preference strengthening as the word-count gap widens.
2. Shows on HH-RLHF that GPT-4 and GPT-3.5 agree with human labels when the human also picked the longer answer, and disagree sharply when the human picked the shorter one.
3. Proposes a signed accuracy-parity metric that treats "which answer is longer" as a sensitive attribute and reports the difference in judge error rate between the two groups.

The paper is thin on scale and statistics, and its models are now historical. Its lasting value is conceptual: it defines verbosity bias relative to a *human oracle* rather than relative to an assumed quality-neutral perturbation, and it gives that definition a number.

## The Problem It Frames

RLHF replaces scarce expert data with human preference labels; RLAIF replaces the human labeler with an LLM. The paper puts a price on the swap — roughly $0.75 per human evaluation (3 minutes at $15/hour, citing Wang et al. 2023) against about $0.05 for their own LLM evaluation, a 15× reduction — and notes the labor-conditions critique of cheap human annotation as an additional motivation.

The catch is that the LLM labeler carries its own biases into the reward model, which then carries them into the policy. If the judge systematically rewards length, the trained model learns to pad. The failure surfaces downstream as bloated summaries and chatbots that answer a one-line question with five paragraphs.

The paper places verbosity bias alongside two other judge biases it inherits from prior work:

| Bias | Definition | Stated handling |
|---|---|---|
| Position bias | `P̂(y₀,y₁) ≠ 1 − P̂(y₁,y₀)`; GPT-4 favors the first option, ChatGPT the second | Evaluate both orderings; count disagreement as a draw |
| Self-enhancement bias | Judge prefers its own generations | Mostly moot in RLAIF, where both candidates come from the same policy |
| Verbosity bias | Judge prefers the longer answer at equal quality | The paper's subject |

## Experiment 1 — Does GPT-4 Prefer Longer Answers?

Setup: three prompts from the MT-Bench "creative" category (Hawaii travel blog, email to a professor about a paper, blog comparing smartphones), 100 answers generated per prompt by Vicuna-7b-v1.5 at temperature 0.7. Pairs of those answers go into the MT-Bench pairwise judge template; GPT-4 returns `[[A]]`, `[[B]]`, or `[[C]]`. Each pair is judged in both orders and scored as a draw unless both orders agree.

The category choice is itself a finding the authors state plainly: other categories were excluded because their answers did not vary enough in word count to see the effect, *and* because GPT-4 judged them poorly. That is a convenience selection, and it caps how far the result generalizes.

Result: score correlates positively with word-count difference across all three prompts and in aggregate; when the length gap is large, GPT-4 almost always picks the longer answer. The curve's *shape* differs per prompt — questions 1 and 2 give smooth monotone preference, question 3 is high-variance near parity. The authors draw the right conclusion from that: verbosity preference is not a function of word count alone, so a single post-hoc length correction cannot be applied across prompts.

The authors also concede the decisive limitation themselves: this experiment shows *preference*, not *bias*. Vicuna's longer samples may genuinely be better. Without ground truth the direction is unidentifiable — which is why the second experiment exists.

## Experiment 2 — Does It Prefer Longer Answers More Than Humans Do?

Setup: HH-RLHF (Bai et al. 2022a), which supplies one human preference label per prompt over a pair of full conversations. Because there is only one label per item, the human preference curve cannot be reconstructed per prompt as in Experiment 1; instead the paper plots judge–human agreement against the chosen/rejected word-count difference, pooled over items.

The framing here is the paper's best idea. In RLAIF the judge's job is to *replicate the human labeler*, not to be objectively right. Humans in HH-RLHF also favor longer answers (Figure 4). That is fine — it is not the judge's business to correct human taste. Bias is therefore defined as *divergence from the human label conditioned on length*, which sidesteps the unanswerable question of which answer was truly better.

Result: for pairs where the human chose the longer response, agreement is high; where the human chose the shorter response, agreement collapses, because the models pick the longer answer regardless. The authors' proposed explanation is that GPT-3.5/GPT-4 learned "prefer the longer one" as a cheap heuristic that fits the average human label, and they explicitly leave the mechanism open.

The paper never states the evaluated sample size in text; the per-bin counts printed in Figure 5 sum to roughly 900 pairs for GPT-4 and roughly 450 for GPT-3.5, heavily concentrated in the small-difference bins.

## The Metric

Define `y₀`, `y₁` as the candidate pair, `Y ∈ {0,1}` the human-preferred index, `Y′ ∈ {0,1}` the judge's choice, and sensitive attribute `S ∈ {0,1}` indicating which response is longer. Then `S = Y` means the human preferred the longer answer.

Equal opportunity would require `P(Y′=0 | S=0, Y=0) = P(Y′=0 | S=1, Y=0)`; the paper generalizes to accuracy parity, `P(Y′=Y | S=Y) = P(Y′=Y | S=1−Y)`. Rather than the usual absolute deviance, it reports a signed difference in *inaccuracy*:

```
verbosity bias = P(Y′ ≠ Y | S = 1−Y) − P(Y′ ≠ Y | S = Y)
```

That is: the judge's error rate on pairs where the human preferred the shorter answer, minus its error rate where the human preferred the longer one. Positive means length-favoring; negative means brevity-favoring. The sign matters because the direction flips by task — Huang et al. (2023) find GPT-4 preferring *short* summaries on faithfulness and coverage under single-answer grading.

| Model | Verbosity bias (Eq. 6) |
|---|---|
| GPT-4 | 0.328 |
| GPT-3.5 | 0.428 |

GPT-4 is better than GPT-3.5 but not close to unbiased. The authors read this as a correction to the impression left by the earlier "repetitive list attack" result — GPT-4 under 10% attack success, GPT-3.5 and Claude-v1 over 90% — which made GPT-4 look nearly immune. In a general open-ended setting it is not.

The paper's own stated limitation on the metric is important: it only splits pairs into two groups by *which* answer is longer, and is blind to *how much* longer. A judge that is accurate on large gaps and inaccurate on small ones (a concave, symmetric alignment curve) would score near zero. Their recommendation — publish the alignment-versus-length-difference plot alongside the scalar — is the right one.

## Takeaways

1. **Define judge bias against whatever the judge is replacing.** Perturbation attacks assume the perturbation is quality-neutral. Anchoring on human labels drops that assumption and measures the thing RLAIF actually needs: substitutability for the labeler.
2. **Bias is asymmetric, so measure it conditionally.** Pooled judge–human agreement looked acceptable here; the failure lived entirely in the minority slice where the human preferred the shorter answer. An aggregate agreement number would have hidden it.
3. **A scalar bias number needs its curve.** The metric is group-level and can read zero on a genuinely biased judge. Ship both.
4. **Don't expect a global length correction to work.** The response curve varies by prompt, so any debiasing has to be conditioned on the prompt or task slice — or handled at the judging protocol level instead (rubric axes, length-matched pairs, explicit "do not reward length" instruction, controlled candidate lengths).
5. **Reporting `< 10% attack success` is not evidence of an unbiased judge.** Narrow adversarial probes and distributional bias measurements answer different questions.

## Questions and Limitations

- **Scale and statistics.** Three prompts and one generator model in Experiment 1; a few hundred to ~900 pooled HH-RLHF pairs in Experiment 2. No confidence intervals, no significance tests, no seeds or repeated runs. The two headline numbers should be treated as indicative, not precise.
- **Human labels as oracle.** HH-RLHF helpfulness labels are single-annotator and noisy. The "human alignment" denominator therefore mixes judge error with label noise, and the reported bias absorbs any length-correlated annotator noise.
- **Confounding remains.** Length correlates with content coverage, specificity, and formatting. The paper measures divergence from human labels conditioned on length; it does not isolate length as the causal driver of the judge's decision. A length-matched or content-controlled pair construction would.
- **Citation slip.** Section 6 attributes the limited "repetitive list attack" setting to Wang et al. (2023), but Section 3.2 correctly attributes it to Zheng et al. (2023) (MT-Bench). Wang et al. is the position-bias/fair-evaluators paper. Worth noting if quoting the comparison.
- **Prose quality.** Several typos ("consistant", "innappropriate", "promblems", "inacuracy", "affect" for "effect"), consistent with an unreviewed preprint.
- **Model generation.** GPT-4 (2023), GPT-3.5, and Vicuna-7b-v1.5 are historical. The metric and protocol transfer; the numbers do not. Anyone reusing this should re-measure on current judges, and on the reasoning-model judges that did not exist when it was written.
- **No mitigation is tested.** Chain-of-thought and few-shot prompting are described in the preliminaries as known debiasing techniques, but the paper never evaluates whether either reduces its own metric.

## Vault Ideas Extracted

* [Verbosity Bias in Preference Evaluation](/vault/verbosity-bias-in-preference-evaluation.md)
* [Human-Anchored Judge-Bias Measurement](/vault/human-anchored-judge-bias-measurement.md)
* [Judge Bias as Accuracy Parity](/vault/judge-bias-as-accuracy-parity.md)
