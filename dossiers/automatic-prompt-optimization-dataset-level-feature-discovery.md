---
type: Study Note
title: Automatic Prompt Optimization for Dataset-Level Feature Discovery
description: Study notes on a multi-agent method that optimizes prompts for a shared, interpretable text-feature schema using downstream classifier performance and anti-label-leakage feedback.
resource: https://arxiv.org/abs/2601.13922v1
source: /archive/automatic-prompt-optimization-dataset-level-feature-discovery.pdf
tags: [prompt-optimization, multi-agent, agents, evaluation]
timestamp: 2026-07-13T18:05:15Z
---

# Automatic Prompt Optimization for Dataset-Level Feature Discovery — Study Notes

**Authors**: Adrian Cosma, Oleg Szehr, David Kletz, Alessandro Antonucci, and Olivier Pelletier
**Venue**: IJCAI 2026
**Preprint**: arXiv:2601.13922v1 [cs.CL]
**Pages**: 10

## What It Is

This paper treats feature *discovery* from labelled text as prompt optimization. The target is not a per-document class prediction or a fixed annotation schema; it is one global set of human-readable feature definitions that an LM can extract across a corpus and that supports a downstream classifier.

The proposed system has four LM roles: a **FeatureProposer** creates a typed feature schema and extraction instructions; an **Extractor** realizes those features for each text; a **PerformanceFeedback** module summarizes dataset-level classifier evidence; and an **InterpretabilityScorer** scores the feature definitions and flags label leakage. A **ReflectiveProposer** uses the textual feedback to revise the FeatureProposer instruction. Bayesian optimization then searches combinations of sampled corpus examples and candidate instructions.

## Why This Formulation Matters

Standard prompt optimizers normally receive one feedback signal for one prediction. Here, the prompt induces a shared schema, so its quality is only visible after extracting that schema over many examples and training a simple downstream model. The paper formalizes the objective as maximizing a metric over the extracted feature vectors and labels, rather than optimizing individual text outputs.

That distinction matters for interpretability. An extractor can produce a feature such as `sentiment_label` or `safety_risk_score` that effectively performs the final classification itself. Such a feature can yield strong F1 while conveying little useful structure. The authors therefore combine F1 with an LM interpretability score that penalizes opaque names, ungrounded descriptions, and target-label proxies.

## How the Optimization Loop Works

1. Sample multiple small, labelled text sets from the training corpus. They ground feature proposals but are not conventional input/output demonstrations.
2. For an instruction-plus-example-set prompt, have the FeatureProposer emit roughly 5–10 global definitions. Each includes a snake-case name, type, description, and extraction prompt.
3. Instantiate the Extractor with that schema and run it over a separate annotation split. Train and validate a logistic-regression classifier on the realized features; compute F1, SHAP importance, mutual information, and coverage.
4. Give the performance statistics to PerformanceFeedback and the definitions to InterpretabilityScorer. The latter returns a set-level score and textual criticism, including a strong penalty for label leakage.
5. Let ReflectiveProposer rewrite the FeatureProposer instruction using the sampled examples and both textual feedback streams. The no-text-feedback variant corresponds to DSPy's grounded proposal/MIPRO-style baseline.
6. Use Bayesian optimization to explore candidate instruction/example-set pairs and retain the one with the best combined score. The default combines F1 and interpretability with λ = 0.75 on F1.

The reported default uses 16 training examples per class, 16 sampled example sets of 16 texts, a 512-example annotation set, one reflection round, and `max(Nd², 128)` search iterations. Qwen3-4B/14B, Llama-8B, and Gemma3-27B were each used as the same underlying model for all LM roles; the authors use structured generation, 16k context, temperature 0.75 for feature proposal, and greedy decoding elsewhere.

## Results That Matter

The evaluations use Yahoo Finance and Twitter financial-news sentiment datasets plus ToxicChat's input-only toxicity subset. Across the financial datasets and four tested backbones, the paper reports that reflective, dataset-level feedback improves on unoptimized and scalar-feedback variants while producing more concrete feature definitions, such as `economic_event`, `job_loss_indicator`, and `risk_assessment_tone`.

On ToxicChat with Qwen3-14B, Table 1 reports F1 of **0.907 ± 0.006** for the ReflectiveProposer method, versus **0.849 ± 0.071** unoptimized; the adapted per-example MIPRO comparison reports **0.750 ± 0.039** (or **0.796 ± 0.027** with its interpretability variant). This is evidence from the paper's specific setup, not a general ranking of optimizers.

The ablations also indicate practical trade-offs:

- F1-only optimization can obtain artificially high scores through target-label features; adding interpretability feedback trades against that shortcut and is meant to preserve source-grounded structure.
- More sampled example sets generally helped until search budget became inadequate for the larger instruction/example space, where gains diminished or slightly reversed.
- More reflection rounds improved Yahoo results mostly on the first iteration; later instructions became more specific about useful versus overly abstract features.
- The estimated cost is dominated by running the Extractor over the annotation set for every evaluated candidate, rather than by the one global schema proposal or constant-number feedback calls.

## My Takeaways

1. **Optimize a schema as a corpus-level artifact.** If an LM is meant to create reusable columns for analytics or downstream models, evaluate the entire proposed schema after realization across a representative split. Per-record correctness alone does not measure whether the columns are consistently useful.

2. **Treat label-proxy detection as a first-class constraint.** A feature extraction pipeline can silently collapse into an LLM classifier. Require definition-level review for target synonyms and extraction prompts that request the answer directly, then check whether retained features are readable, traceable to the text, and useful under the downstream model.

3. **Make feedback inspectable, not just scalar.** F1, SHAP, mutual information, and coverage give different clues about a schema failure. Turning them into textual feedback lets a proposal model address a specific defect, but the feedback itself still needs review because it is model-generated.

4. **Spend the model budget where the multiplicity is.** The extraction pass happens once per annotation item per candidate and dominates cost. Use the smallest extractor that meets schema and grounding requirements; a better reflective prompt cannot make an infeasible search budget cheap.

## Questions and Limitations

- The interpretability scorer is itself an LM judgment. The paper motivates its leakage checks but does not show independent human agreement, adversarial leakage tests, or a formal guarantee that a high-scored feature is non-proxy.
- The reported experiments are limited to three classification datasets, fixed splits, a simple logistic-regression downstream model, and selected open-weight backbones. Results may differ for regression, multilabel work, high-cardinality schemas, or a production decision policy.
- Dataset-level optimization is expensive: every candidate requires extraction over a substantial annotation split. The paper's asymptotic analysis explicitly makes the extractor throughput the dominant term.
- Smaller models sometimes failed structured output or produced generic, weakly grounded refinement instructions. BAML reduced some format failures but did not guarantee strict compliance; model capacity and instruction following remain constraints.
- The approach improves prompt instructions and sampled examples for FeatureProposer while holding the helper-module prompts fixed. It does not establish that jointly optimizing the scorer or extractor prompts would remain stable or improve results.

## Vault Ideas Extracted

* [Dataset-Level Feature Discovery](/vault/dataset-level-feature-discovery.md)
* [Prompt Optimization](/vault/prompt-optimization.md)
