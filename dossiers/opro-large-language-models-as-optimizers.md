---
type: Study Note
title: "Large Language Models as Optimizers"
description: "OPRO frames an LLM as a black-box candidate generator conditioned on a scored solution history, with small mathematical demonstrations and stronger evidence for task- and model-specific prompt search."
resource: https://arxiv.org/abs/2309.03409v3
source: /archive/opro-large-language-models-as-optimizers.pdf
tags: [prompt-optimization, prompting, in-context-learning, evaluation]
timestamp: 2026-09-14T17:11:29Z
---

# Large Language Models as Optimizers — Study Notes

**Authors**: Chengrun Yang, Xuezhi Wang, Yifeng Lu, Hanxiao Liu, Quoc V. Le, Denny Zhou, and Xinyun Chen  
**Affiliation**: Google DeepMind  
**Venue**: ICLR 2024  
**Preprint**: [arXiv:2309.03409v3](https://arxiv.org/abs/2309.03409v3), revised April 15, 2024  
**Pages**: 42

## What It Is

Optimization by PROmpting (OPRO) is an iterative black-box search pattern in which an LLM proposes candidate solutions after seeing a natural-language problem description and a history of earlier solutions paired with objective values. An external evaluator scores each proposal; the scored proposals then become context for the next call. There are no gradients and no weight updates.

The paper makes two claims that should not be collapsed:

1. **General optimization demonstration**: on tiny linear-regression and traveling-salesman instances, an LLM can infer useful search directions from scored examples.
2. **Prompt optimization application**: when the candidate solution is an instruction and the objective is a scorer model's task accuracy, the same loop can discover instructions that beat selected human-written baselines.

The second is the paper's substantial contribution. The mathematical experiments establish that the mechanism is not definitionally limited to prompts, but they do not make OPRO a competitive general-purpose numerical or combinatorial optimizer.

## The Core Loop: Score-Conditioned Candidate Generation

A call to the optimizer LLM receives a **meta-prompt** containing:

- a natural-language statement of the optimization objective and output constraints;
- a bounded trajectory of previous solution–score pairs, ordered from worse to better;
- task exemplars when the optimized object is a prompt; and
- meta-instructions asking for a new, distinct candidate with a better score.

The system then:

1. samples multiple new candidates;
2. evaluates each with an external objective function;
3. adds the candidate–score pairs to history;
4. retains the strongest history that fits the context window; and
5. stops at a step budget or when it no longer finds improvements.

This is **score-conditioned synthesis**, not a textual gradient. The LLM is not told an update direction and does not receive an error derivative. It must infer which textual or numerical patterns correlate with higher scores and propose a new point. The score belongs to the complete candidate under a particular evaluator, dataset sample, prompt position, and decoding configuration; it does not identify which phrase caused the gain.

In the default prompt-search setup, the meta-prompt retains the best 20 instructions, sorts them in ascending score order, and includes three randomly sampled training exemplars. The optimizer runs at temperature 1.0 and generates eight instructions per step. The scorer greedily decodes at temperature 0.0. Optimizer and scorer may be the same model or different models.

## General Optimization Experiments

### Linear regression

The continuous demonstration optimizes two scalar parameters, `(w, b)`, for a one-dimensional synthetic regression problem with 50 noisy observations. The analytic objective is withheld so that the optimizer cannot simply calculate the answer. Five random `(w, b)` pairs initialize the search; each step shows the best 20 past pairs and objective values and samples up to eight new pairs.

Across seven ground-truth settings and five runs per setting, text-bison, GPT-3.5 Turbo, and GPT-4 all reach the reported global optimum with far fewer unique points than exhaustive enumeration. The experiments also show the boundary of the result: moving the target farther outside the initial `[10, 20] × [10, 20]` region sharply increases the number of evaluations, and Appendix A reports that the models can get stuck when strong points vary along only one coordinate or point in conflicting coordinate directions.

This is evidence that an LLM can read a short tabular trajectory and sometimes extrapolate a descent direction. It is not a comparison against established derivative-free optimizers, and the two-dimensional synthetic problem is too small to support a broader numerical-optimization claim.

### Traveling salesman problem

For TSP, the meta-prompt contains node coordinates plus prior tours and lengths. Five random tours initialize each run, and the optimizer proposes up to eight tours per step. Five instances are evaluated at each size against Gurobi's optimum and the nearest-neighbor (NN) and farthest-insertion (FI) heuristics.

| Nodes | NN gap | FI gap | text-bison gap | GPT-3.5 gap | GPT-4 gap |
|---:|---:|---:|---:|---:|---:|
| 10 | 13.0% | 3.2% | 0.0% | 0.0% | 0.0% |
| 15 | 9.4% | 1.2% | 4.4% | 1.2% | 0.2% |
| 20 | 16.0% | 0.2% | 30.4% | 4.4% | 1.4% |
| 50 | 19.7% | 9.8% | 219.8% | 133.0% | 11.0% |

All three LLMs solve every 10-node instance optimally. GPT-4 remains close to FI through 50 nodes, but its exact-solution count falls to four of five at 15 nodes, two of five at 20 nodes, and zero at 50 nodes. The two weaker optimizers collapse at 50 nodes. The pattern is scaling failure, not evidence that prose has replaced specialized combinatorial search: context length grows with the instance and scored tours become a weak guide over an exploding discrete space.

The appendices add further failure modes: hallucinated objective values, duplicate candidates despite explicit novelty instructions, stalls away from even local optima, and failure to navigate the narrow valley of a two-dimensional Rosenbrock function. External evaluation is therefore not optional; the optimizer's own numerical statements cannot be trusted as scores.

## Prompt Optimization Experiments

### Search object and evaluation protocol

The candidate is a natural-language instruction concatenated at one of three positions:

- `Q_begin`: before the question;
- `Q_end`: after the question; or
- `A_begin`: at the beginning of a pretrained scorer's answer continuation.

The objective is training accuracy of the **scorer LLM**, which can differ from the **optimizer LLM**. The experiments use PaLM 2-L, PaLM 2-L-IT, text-bison, GPT-3.5 Turbo, and GPT-4 as optimizers, while PaLM 2-L and text-bison serve as scorers. GSM8K search uses 3.5% of the 7,473-example training set and evaluates the winner on all 1,319 test examples. Each BBH task uses a 20/80 train/test split of at most 250 examples. The default search lasts up to 200 steps, potentially evaluating 1,600 instructions.

This protocol makes the optimized artifact highly conditional: instruction text, scorer checkpoint, insertion position, exemplar sample, objective split, optimizer model, temperature, and search budget jointly define the result.

### GSM8K gains

With PaLM 2-L as scorer, the familiar zero-shot baseline “Let's think step by step.” reaches 71.8% test accuracy. The best PaLM 2-L-IT-generated instruction, “Take a deep breath and work on this problem step-by-step,” reaches 80.2%, an 8.4-point gain. Other optimizer models find different winners under the same scorer: PaLM 2-L reaches 79.9%, GPT-3.5 Turbo 78.5%, and GPT-4 74.5%.

The trajectory matters more than the slogan. Starting from “Let's solve the problem” at 60.5% approximate training accuracy, the PaLM 2-L-IT run reaches “Let's do the math!” at step 6 with 78.2% training accuracy; the eventual “Take a deep breath…” winner appears only at step 107 with 80.2%. A memorable phrase is one survivor from hundreds of evaluated candidates, not an independently validated causal principle.

A fixed-budget one-step baseline reinforces the iterative-search claim. On GSM8K, the best of 50 instructions generated without a scored trajectory remained the initial instruction at 64.4% training and 60.8% test accuracy. OPRO found “Let's do the math!” after 40 cumulative proposals at 78.2% training and 76.3% test. On BBH `sports_understanding`, one-step generation reached 84.0% training and 80.0% test, while OPRO reached 88.0% and 84.5% after 32 cumulative proposals.

### BBH gains — and an important loss

Across 23 Big-Bench Hard tasks, PaLM 2-L-IT-optimized instructions beat “Let's think step by step.” by more than five points on 19 tasks with PaLM 2-L as scorer and on 15 tasks with text-bison. Relative to the empty-string starting point, the corresponding counts are 20 of 23 and 15 of 23. The paper summarizes its largest task-level improvements as exceeding 50%.

Those counts matter more than the best case because they also reveal non-universality. With PaLM 2-L, the optimized instruction for `tracking_shuffled_objects_seven_objects` scores only 19.6% overall, versus 60.8% for “Let's think step by step.” The method often wins, not always; search should retain baseline competition rather than presuming optimization is monotonic on held-out data.

The found instructions are strongly task- and optimizer-shaped. PaLM 2-L-IT often produces concise or task-descriptive instructions, while GPT models produce longer prose. An appendix notes that GPT-3.5 Turbo starting from an empty string often generates imperative or interrogative text ill-suited to the `A_begin` continuation position; seeding with “Let's solve the problem” shifts later candidates toward more suitable declarative forms.

### Transfer and overfitting

The two GSM8K winners transfer positively to two other math datasets under the same scorer families. For PaLM 2-L, “Take a deep breath…” scores 95.3% on MultiArith and 54.3% on AQuA, compared with 85.7% and 44.9% for “Let's think step by step.” The text-bison winner reaches 96.8% and 37.8%, versus 92.5% and 31.9% for that baseline. This is useful same-domain transfer evidence, not proof of transfer to other domains, models, chat templates, or prompt positions.

The default protocol has no validation split. The authors' separate validation experiments show validation curves generally moving with training curves, but they also report that selected prompts' training accuracy is often 5–20 points above test accuracy. A search over up to 1,600 candidates on tiny task subsets creates a substantial multiple-comparisons and selection-overfitting risk. Early stopping, a larger search split, and an untouched promotion set are safer deployment defaults.

## What the Ablations Actually Establish

The ablations make the paper's strongest mechanistic case:

- **Scores add information**: showing integer accuracy scores produces better candidates than presenting only rank-ordered instructions; coarse 20-bucket scores also underperform the default 100-bucket representation.
- **Ordering matters**: worse-to-better order converges faster and ends higher than better-to-worse or random order, plausibly because the strongest candidates sit nearest the generation cue.
- **Examples define the task**: three task exemplars outperform no exemplars; ten do not reliably improve on three and can crowd the trajectory out of context.
- **Batching stabilizes search**: eight candidates per step performs best overall among 1, 2, 4, 8, and 16 under a fixed total-evaluation budget. Too few increases variance; too many reduces the number of feedback rounds.
- **Temperature mediates exploration and exploitation**: 1.0 performs best among 0.0–2.0. Low temperatures repeatedly emit the same instruction; high temperatures more often ignore trajectory patterns.
- **Initialization remains consequential**: weak seeds can take many steps to disappear from the retained history, and PaLM 2-L results differ materially across initial instructions.

Together, these results support a specific claim: an LLM can use visible scores, recency, exemplars, and repeated evaluation as a crude learned search operator. They do not show that it understands why a prompt works.

## Memorable Prompts Are Search Artifacts

“Take a deep breath and work on this problem step-by-step” should be stored with its experimental envelope, not promoted as universal prompt advice. It was selected for PaLM 2-L, on GSM8K, at `A_begin`, after a long best-of-many search against a small accuracy split. Semantically similar instructions can behave very differently: on the same PaLM 2-L GSM8K test set, “Let's think step by step” scores 71.8%, “Let's solve the problem together” 60.5%, and their plausible combination “Let's work together to solve this problem step by step” only 49.4%.

This sensitivity defeats post-hoc storytelling. Breath, collaboration, concision, or “step by step” may correlate with a winning candidate in one search, but the experiment does not isolate any phrase as the cause. The reusable lesson is to run scored search and held-out validation against the deployed model—not to copy the winner's prose.

## Analyst Takeaways

1. **Persist the complete search envelope.** Store model versions, prompt position, meta-prompt, seeds, candidate batches, scores, exemplar samples, decoding settings, budget, and final holdout result. The selected text alone is not the experiment.
2. **Use the evaluator as the ground truth for scores.** The optimizer hallucinates arithmetic and repeats candidates. Parse, deduplicate, execute, and score proposals outside the LLM.
3. **Keep scores and rank together.** OPRO's ablations show that ordered candidates without numeric quality gaps are a weaker feedback channel than ordered, scored candidates.
4. **Spend budget across rounds, not only breadth.** Under equal proposal counts, repeated score feedback beats one-shot generation; very large per-round batches sacrifice opportunities to condition on outcomes.
5. **Compete with simple baselines through final promotion.** Empty prompts, human instructions, and cheap one-step generation should remain eligible. OPRO has at least one large BBH regression despite strong average results.
6. **Separate search discovery from prompt doctrine.** A winner is evidence about a fixed evaluation configuration. Derive general advice only through controlled phrase ablations and replication across models, tasks, and positions.
7. **Do not generalize the mathematical demonstrations.** OPRO is attractive where the candidate is naturally textual or difficult to formalize. Conventional solvers remain the default for structured numerical and combinatorial problems.

## Questions and Limitations

- **Small and dated model set.** Core results use 2023-era proprietary PaLM and GPT API models, including fixed `-0613` GPT snapshots. The paper does not establish behavior on current reasoning models or open-weight optimizers.
- **Limited optimization baselines.** Linear regression lacks comparisons with standard derivative-free optimizers, and TSP compares only with two simple heuristics plus an oracle. “LLM as optimizer” is demonstrated, not competitively benchmarked as an optimizer class.
- **Cost is obscured by step counts.** Up to 200 rounds × eight candidates, scorer executions on a training subset, and long meta-prompts can be expensive. The paper does not provide a deployment-grade token, latency, or dollar accounting.
- **Default search reuses its training objective.** No validation set is used to select the default winner, and 5–20-point train–test gaps are common. The separate overfitting study does not eliminate selection bias in the headline runs.
- **Aggregate accuracy is weak feedback.** The optimizer does not effectively use sampled error cases, and a scalar cannot say which requirement failed. The conclusion identifies richer error feedback as future work.
- **Prompt effects are not causally identified.** The search changes many words at once; scores apply to whole instructions. Interpreting a colorful phrase as the mechanism is unsupported.
- **Context limits both domains.** Larger optimization instances or more trajectory history compete for the same context window, while truncating to the top 20 candidates discards potentially useful diversity and failure information.
- **Benchmark scope is narrow.** Prompt experiments center on GSM8K and BBH, with transfer only to two additional math datasets. Safety, factuality, latency, output-format reliability, and real application utility are not optimization objectives.
- **Reproducibility is model-dependent.** Code is linked, but proprietary scorer/optimizer checkpoints and API behavior limit exact reproduction of the reported trajectories.

## Vault Ideas Extracted

* Update [Prompt Optimization](/vault/prompt-optimization.md) with OPRO's primary score-conditioned loop, exact GSM8K/BBH evidence, and the requirement to bind winners to scorer and prompt position.
* Update [Automatic Prompt Optimization Anatomy](/vault/automatic-prompt-optimization-anatomy.md) with the score/order/exemplar/batch/temperature ablations and the equal-budget one-step comparison.
* Update [Prompt Contingency](/vault/prompt-contingency.md) with the 71.8% / 60.5% / 49.4% semantically similar GSM8K prompts and the severe BBH held-out regression.
