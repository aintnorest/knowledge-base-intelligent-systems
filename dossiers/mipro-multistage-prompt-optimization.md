---
type: Study Note
title: "Optimizing Instructions and Demonstrations for Multi-Stage Language Model Programs"
description: "MIPRO factorizes each module's prompt into instructions and bootstrapped demonstrations, proposes task-grounded candidates, and uses mini-batch Bayesian search to optimize their joint configuration against an end-to-end metric."
resource: https://arxiv.org/abs/2406.11695v2
source: /archive/mipro-multistage-prompt-optimization.pdf
tags: [prompt-optimization, prompting, in-context-learning, evaluation, benchmark]
timestamp: 2026-09-14T17:12:08Z
---

# Optimizing Instructions and Demonstrations for Multi-Stage Language Model Programs — Study Notes

**Authors**: Krista Opsahl-Ong, Michael J Ryan, Josh Purtell, David Broman, Christopher Potts, Matei Zaharia, and Omar Khattab  
**Venue**: EMNLP 2024  
**Preprint**: [arXiv:2406.11695v2](https://arxiv.org/abs/2406.11695v2), revised October 6, 2024  
**Pages**: 28

## What It Is

MIPRO (Multi-prompt Instruction PRoposal Optimizer) is a black-box optimizer for the prompts inside a language-model program: a pipeline whose output depends on several modular LM calls. It searches for a jointly effective assignment of **free-form instructions and few-shot demonstrations to every module**, using only the executable program, training inputs, an end-to-end metric, and any final labels that metric needs.

The key design choice is to separate two jobs that history-prompting methods such as OPRO conflate:

1. **Proposal**: use an LM plus program, dataset, and successful-trace context to generate a bounded set of plausible instructions; bootstrap candidate demonstrations from successful executions.
2. **Credit assignment and selection**: treat the candidate chosen for each module and component as categorical variables, then use a Tree-structured Parzen Estimator (TPE) surrogate to search their joint combinations from noisy mini-batch scores.

This is a prompt compiler rather than a weight-training method. It does not need model gradients, embeddings, token log-probabilities, or gold labels for intermediate calls. Its output remains a discrete, inspectable LM program configuration.

## The Optimization Problem

Let program $\Phi$ contain $m$ LM modules. Each module has a prompt template with open variables, and a complete mapping $V \mapsto S$ assigns strings to those variables. The objective is the average task metric $\mu$ achieved by the resulting program $\Phi_{V \mapsto S}$ on training data $D$.

The paper focuses the otherwise unbounded string search on two parameter families per module:

- one variable for the module's natural-language instruction; and
- $K$ variables for few-shot input/output demonstrations.

All other prompt fields stay fixed. This factorization is pragmatic rather than theoretically complete: instructions are suited to task-wide rules, while demonstrations can transmit successful local behavior without requiring intermediate supervision.

Five constraints shape the method: the string space is enormous; the metric supervises only the final task; model internals are unavailable; datasets are generally small; and evaluating a multi-call program is expensive. The resulting algorithm must solve both a **proposal problem** (find a small, useful candidate set) and a **credit-assignment problem** (decide which choices caused an end-to-end score).

## Candidate Proposal

### Bootstrapped demonstrations

For a sampled training input, the current program records the full trace of module inputs and outputs. If the final output passes the task metric at threshold $\lambda$, every module-level input/output pair in that trace becomes a candidate demonstration for its corresponding module. The optimizer repeatedly rejection-samples successful traces, builds sets of $K$ demonstrations, and later searches across these sets.

This converts final-task success into weak labels for otherwise latent intermediate steps. It is economical and often strong, but the inference is only heuristic: a correct final answer does not prove that every intermediate retrieval, summary, or rationale was correct.

### Grounded instruction proposal

A proposer LM generates instruction candidates separately for each module. Its meta-prompt can include:

- an LM-generated summary of patterns in the training data;
- the DSPy program or a summary of its control flow and intended task;
- bootstrapped examples of successful module behavior;
- prior instruction candidates with end-to-end scores;
- the seed instruction; and
- a diversity tip such as “keep it simple,” “be creative,” add a persona, or frame high stakes.

The dataset summary is itself built incrementally: the proposer observes training batches until it emits `COMPLETE` five times, then condenses the accumulated observations into two or three sentences. Program summaries are generated from DSPy pseudocode. These are generated descriptions, not authoritative task specifications.

### Learning to propose

MIPRO++ moves Bayesian optimization up one level. Rather than merely selecting from a fixed proposal pool, it tunes how instruction candidates are generated: whether to include dataset and program summaries, proposer temperature, the tip, selected bootstrapped demonstrations, and related meta-prompt options. In this paper, the evaluated 0-shot MIPRO++ variant meta-optimizes instruction proposal only; the fuller instruction-and-demonstration version is described but not established experimentally.

## Credit Assignment and the Surrogate Procedure

The paper compares three strategies:

- **Greedy/coordinate ascent** changes one module at a time. This gives cleaner local comparisons but is expensive and misses interactions where two modules must improve together. Preliminary CA-OPRO results did not justify the cost.
- **History-based OPRO** asks an LM to infer improvement from scored histories. Module-Level OPRO gives every module instruction the same program score, implicitly treating that score as an adequate proxy for each component. Program-Level OPRO exposes full multi-module histories and expects the proposer to perform credit assignment in context; long histories are costly and vulnerable to information loss.
- **Surrogate-based search** uses Optuna's multivariate TPE to model joint contributions of categorical instruction and demonstration choices. This explicitly separates credit assignment from generation and can explore interacting module configurations.

MIPRO's concrete loop is:

1. **Initialize**: upfront, generate $N$ instruction candidates and $N$ bootstrapped demonstration sets per module. Represent each choice as a categorical latent variable with a uniform prior.
2. **Propose**: TPE selects one instruction and one demonstration set for every module, producing a complete program configuration.
3. **Update**: run that program on a fresh random mini-batch of $B$ training examples and update the surrogate from the observed task score.
4. **Full evaluation**: every $S$ steps, take the configuration with the strongest mean trial score and evaluate it on the full training set.
5. **Return**: select the highest-scoring configuration among those that received full evaluation.

Mini-batching buys more configuration trials per fixed full-evaluation budget and TPE's uncertainty handling offers some tolerance to noisy scores. It does not make evaluations independent: candidates are repeatedly selected from the same finite training data, so the final winner still needs a truly untouched test set.

The paper also isolates two restrictions of the same design: **0-Shot MIPRO** searches only instructions, and **Bayesian Bootstrap** searches only demonstration sets.

## Benchmark and Results

The benchmark combines seven task/program settings: ScoNe negation reasoning; HotPotQA multi-hop retrieval and answer generation; HoVer three-hop evidence retrieval; a conditional-format HotPotQA variant; Iris classification with correct and misspelled class names; and a four-call Heart Disease opinion ensemble. Program sizes range from one LM call to four, with exact match, accuracy, custom rule checking, or Recall@21 as the end-to-end metric.

The main task model is Llama-3-8B. GPT-3.5 is the usual proposer, with stronger GPT models used on some harder tasks; demonstration bootstrapping uses Llama-3-8B by default and GPT-4o for ScoNe and HoVer. Optimizers receive budgets equivalent to 20–50 full-training evaluations depending on task; mini-batched methods perform more actual trials. Each method is run five times, and the authors use Wilcoxon signed-rank tests over per-example run averages.

Test-set results from Table 2:

| Setting | Unoptimized | Bootstrap Random Search | MIPRO |
|---|---:|---:|---:|
| ScoNe | 69.1 | 75.4 | **79.4** |
| HotPotQA | 36.1 | 45.8 | **46.4** |
| HoVer | 25.3 | 37.2 | **39.0** |
| HotPotQA Conditional | 6.0 | 10.4 | **23.3** |
| Iris | 40.9 | **94.1** | 88.6 |
| Iris-Typo | 32.0 | 58.7 | **68.7** |
| Heart Disease | 26.8 | **79.2** | 74.2 |

The table shows the practical split clearly. Demonstration-only random search is already a formidable baseline and beats the best instruction-only method in every setting except HotPotQA Conditional. Joint MIPRO has the highest listed test score in five of seven settings, but it loses to demonstration-only search on clean Iris and Heart Disease. Its largest advantage over Bootstrap Random Search is 12.9 percentage points on HotPotQA Conditional, the source of the paper's “as much as 13% accuracy” summary.

The paper's statistical claim is narrower than simply bolding the largest number: significance is assessed against the second-highest averaging optimizer, and multiple values are treated as comparable when the signed-rank test does not establish a difference. Section 6 explicitly names HotPotQA, Heart Disease, and clean Iris as exceptions to MIPRO being the best overall method, even though MIPRO's HotPotQA point estimate is slightly highest in Table 2.

## What the Ablations Teach

1. **Demonstration selection carries more than format.** Performance varies sharply across bootstrapped few-shot sets, consistent with traces conveying successful reasoning and retrieval behavior.
2. **Instructions matter most for global rules.** HotPotQA Conditional cannot express all category-dependent output rules through a small demo set, and instruction optimization repairs the deliberately misspelled Iris label. Yet the optimizer still benefits from a handwritten seed that states complex rules.
3. **Grounding is task-dependent.** It is essential in the reported Module-Level OPRO results for HotPotQA and HoVer but hurts ScoNe. MIPRO++ is motivated by precisely this non-universality.
4. **Proposal examples dominate some meta-prompts.** Learned MIPRO++ feature importances give bootstrapped proposer demonstrations the largest weight for HotPotQA; ScoNe emphasizes dataset summary, prompt tip, and demonstrations; HoVer emphasizes temperature, tips, and demonstrations.
5. **Search and proposal are separate bottlenecks.** TPE can allocate evaluations efficiently within a fixed candidate pool, but it cannot improve the pool. MIPRO++ can change proposal dynamics, but consumes trials to learn that outer process.

## Relation to DSPy

DSPy supplies the programming model that makes this optimization target concrete: modules expose typed input/output signatures, program execution yields traces, prompts are treated as tunable parameters, and a user-defined metric scores the full pipeline. Earlier DSPy optimizers such as `BootstrapFewShotWithRandomSearch` could build and select successful demonstrations for arbitrary multi-stage programs, but did not jointly tune free-form instructions across multiple prompts.

MIPRO extends that compilation story in two ways: it adds grounded instruction proposal for each DSPy module and searches the cross-product of module instructions and demonstrations with an explicit surrogate rather than random search alone. The optimizer and benchmark were released through DSPy. This tight integration is also a boundary on the evidence: the experiments use DSPy's autocomplete-style prompt rendering, run Llama 3 without a chat template because it performed better in that setup, and do not show that the same candidates or rankings transfer to other harnesses or model interfaces.

## Analyst Takeaways

1. **Factor the artifact before searching it.** Instructions and demonstrations solve different information problems. Treating them as distinct variables makes the search space interpretable and lets a deployment omit examples when context cost matters.
2. **Do not ask the proposer to be the causal analyst by default.** MIPRO's strongest systems idea is the division of labor: LMs generate semantically plausible candidates; a numeric optimizer allocates trials and models interactions.
3. **Use successful traces as candidate data, not ground truth.** End-to-end acceptance is weak supervision. In retrieval, tool-use, or safety-sensitive programs, add intermediate constraints before promoting traces to demonstrations.
4. **Benchmark every sophisticated optimizer against demo-only random search.** The simple DSPy baseline wins two test settings outright and approaches MIPRO on others. Instruction generation is not free value.
5. **Preserve the whole optimization state.** Reproduction requires the seed program, candidate instructions, accepted traces, proposer meta-prompts, model and decoding versions, mini-batch draws, surrogate settings, budget, and full-evaluation checkpoints—not merely the final prompt.
6. **Treat conditional rules as specification, not something to rediscover.** Search can polish or repair a seed, but the paper's own results show it does not reliably infer comprehensive hidden rules. Explicitly encode non-negotiable requirements and optimize within them.

## Questions and Limitations

- **Fixed models and budgets.** The main evidence centers on Llama-3-8B with particular GPT proposers and 20–50 full-evaluation-equivalent budgets. The paper does not map behavior at extremely low or high budgets or establish cross-model consistency.
- **Small, repeatedly searched datasets.** Training splits are generally 500 examples and smaller for Iris, Heart Disease, and conditional HotPotQA. Mini-batch exploration increases the number of adaptive looks at the same data and can overfit the search set.
- **Rule inference remains weak.** Complex conditional behavior still needs a handwritten seed. The optimizer cannot be assumed to recover a task specification from examples and generated summaries.
- **Proposal overfitting is visible.** Appendix H shows instructions that copy specific meta-prompt examples—a disease vignette for ScoNe, named facts for HotPotQA, and particular claims for HoVer. Some such candidates score well, so the metric and finite data do not reliably penalize semantic over-specialization.
- **Successful final outputs can mask bad stages.** Trace rejection sampling labels every intermediate step as usable when the terminal answer passes. No causal or factual check establishes that each demonstration is sound.
- **The surrogate searches only what was proposed.** Standard MIPRO cannot revise a deficient candidate set from evaluation evidence. MIPRO++ addresses proposal hyperparameters, but the paper evaluates only an instruction-only form and reports mixed results.
- **Narrow objectives.** Accuracy, exact match, format compliance, and retrieval recall omit faithfulness, unsafe intermediate behavior, latency, token cost, and robustness. Optimizing the declared metric can worsen unmeasured properties.
- **Compute and interface assumptions matter.** Experiments use up to eight A100 GPUs, external proposer/teacher models, task-specific stop tokens, and no Llama chat template. “Black box” means no model internals, not low cost or configuration independence.
- **Benchmark breadth is preliminary.** The seven settings include variants of the same tasks and relatively small one-to-four-call programs. More complex programs, tools, branching, and long-horizon state remain untested.

## Vault Ideas Extracted

- Update [Prompt Optimization](/vault/prompt-optimization.md) with MIPRO's factorized instruction/demonstration target, successful-trace proposal, and multivariate TPE selection loop.
- Update [Automatic Prompt Optimization Anatomy](/vault/automatic-prompt-optimization-anatomy.md) with the distinction between candidate-pool quality and surrogate allocation, plus periodic full-set confirmation after stochastic mini-batch trials.
