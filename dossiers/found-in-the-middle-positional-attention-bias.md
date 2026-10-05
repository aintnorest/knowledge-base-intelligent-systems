---
type: Study Note
title: "Found in the Middle: Calibrating Positional Attention Bias Improves Long Context Utilization"
description: "Study notes on separating document relevance from positional attention bias and intervening on late-layer attention to improve multi-document question answering, with calibration cost and version-specific reporting caveats."
resource: https://doi.org/10.18653/v1/2024.findings-acl.890
source: /archive/found-in-the-middle-positional-attention-bias.pdf
tags: [long-context, attention, retrieval, evaluation, model-architecture]
timestamp: 2026-10-05T21:48:36Z
---

# Found in the Middle: Calibrating Positional Attention Bias Improves Long Context Utilization — Study Notes

**Authors**: Cheng-Yu Hsieh, Yung-Sung Chuang, Chun-Liang Li, Zifeng Wang, Long T. Le, Abhishek Kumar, James Glass, Alexander Ratner, Chen-Yu Lee, Ranjay Krishna, Tomas Pfister  
**Published**: June 23, 2024; archived arXiv:2406.16008v2 dated July 3, 2024; publisher version August 2024  
**Status**: Peer-reviewed in Findings of ACL 2024, pages 14982–14995. The [publisher record](https://aclanthology.org/2024.findings-acl.890/) identifies the same work and DOI. The archived file is the arXiv manuscript; numerical notes below refer to that manuscript unless explicitly labeled otherwise.

## What It Is

This paper tests an attention-level explanation for lost-in-the-middle behavior: relevant documents may receive a genuine relevance signal, yet still lose to an independent positional preference for documents near the input boundaries. The authors estimate the positional component, subtract it to produce a relevance-oriented score, and use that score to redistribute document attention during generation.

The distinction matters. A model need not be unable to recognize middle evidence; it may recognize it but give still greater influence to less relevant boundary material. The work goes beyond correlating an attention heatmap with errors by intervening on attention and measuring answer changes. It does not establish the ultimate cause of the bias or show that all long-context failures share this cause.

## Problem and Motivation

[Lost in the Middle](/dossiers/lost-in-the-middle-long-contexts.md) showed that merely supplying answer-bearing evidence is insufficient when placement is unfavorable. Reranking and moving likely relevant documents toward a boundary can help, but the policy remains dependent on the reranker's accuracy and leaves the reader's positional sensitivity intact.

The proposed alternative is complementary rather than exclusive: improve the reader's use of supplied evidence while also benefiting from a better document order. The experiments use 2024-era Vicuna-7B-v1.5-16K and Tulu-2-7B, with 16K and 8K windows respectively, not current hosted frontier models.

## Mechanism as an Idea

### Separate relevance from position

For each document, the authors average the model's attention over its tokens, heads, and decoder layers when predicting the next token following the prompt. They approximate this observed document attention as a sum of a relevance term, a position-dependent bias, and noise.

A consistent dummy document is placed at corresponding positions to estimate baseline attention. Subtracting this baseline from the real document's attention cancels the modeled positional component; the dummy's constant relevance does not affect document ranking. This is a useful nuisance-variable control, not direct access to an objectively measured “true relevance.” The additive approximation remains imperfect.

### Turn the estimate into an intervention

Calibrated document relevance is converted into a normalized allocation of attention. Token weights within each document are scaled so that the document-level attention follows this relevance-oriented distribution while preserving the total mass assigned across document tokens. The approach changes internal attention without changing model weights or requiring additional relevance-label training.

The authors intervene only in the latter half of the two models' 32 decoder layers. Intervening in early layers can destabilize generation. Thus this is a model-internal intervention with a consequential layer-selection boundary, not a prompt-only recipe or a generic instruction to flatten every attention head.

### Evaluation separates ranking from answering

NaturalQuestions supplies **2,655 queries**, one gold paragraph per query, and retrieved non-answer distractors. SynthWiki supplies **990 entries** with GPT-4-generated paragraphs about fictional people, reducing reliance on known real-world answers. Each prompt contains 10 or 20 documents, and the gold document is tested at beginning, middle, and end positions. The question appears both before and after the documents.

Ranking experiments measure Recall@3 with the answer document in the middle. Answering experiments compare vanilla and calibrated attention, plus attention-based sorting, prompt-based reordering, and query-generation-based reordering. These comparisons diagnose two different abilities: recognizing which document matters and using it to produce the answer.

## Results, Experiences, and Admissions

### Measured in archived arXiv v2

- In the Vicuna error-analysis subset with 20 documents and a middle-position gold passage, the document most similar to the generated response falls in the higher-attention half in **526 of 712 cases, 74%**, versus **186, 26%** in the lower-attention half. This uses TF-IDF similarity as a proxy for content uptake and is conditional on incorrect answers, not a causal attribution over all responses.
- Tests on 100 sampled NaturalQuestions examples support the proposed ordering assumptions in **83%** and **72%** of document/position pairs. The additive model has **0.76 Spearman rank correlation** in the tested contrast; the alternative log-linear formulation reaches **0.75**. The model is useful but not exact.
- For Vicuna document ranking with the gold document in the middle, Recall@3 rises from **36.38% to 74.27%** with 10 documents and from **20.52% to 68.32%** with 20. The latter is **47.80 percentage points** versus vanilla attention. Query-generation ranking scores 68.51% and 58.15%, so the improvements over that stronger comparator are much smaller.
- On NaturalQuestions with 20 documents, Vicuna's middle-position answer score rises **47.34% → 56.19%**, and its three-position average rises **56.64% → 58.11%**. Its first-position score falls **71.93% → 66.40%**: improving middle access is not a free improvement at every placement.
- In the same setting, Tulu's middle score rises **35.32% → 43.08%**, while the average rises **46.28% → 53.91%**. On SynthWiki with 20 documents, Tulu's middle score rises **60.30% → 75.15%**, a **14.85-point** gain.
- Calibration exceeds vanilla attention in **22 of the 24** tabled dataset/model/document-count/position combinations. Middle-position gains in Table 5 range from **5.15 to 14.85 points**; the text's “6–15” is approximate and misses the 5.15-point Vicuna/SynthWiki/10-document case.
- Adding calibration to query-generation-based reordering improves that reordering baseline's average in all eight dataset/model/document-count combinations. For Vicuna/NaturalQuestions/20 documents, the average rises **59.92% → 62.22%**; for Tulu/SynthWiki/20 documents it rises **95.45% → 95.75%**.

### Claims requiring qualification

The manuscript headline is “up to 15 percentage points,” while the [ACL publisher abstract](https://aclanthology.org/2024.findings-acl.890/) says “up to 10.” These are different versions' summaries, not interchangeable statements; the DOI identifies the same work, not byte-identical documents.

The claim that reordering plus calibration consistently achieves the highest performance is too broad for archived Table 5. Attention sorting reaches **62.89%** versus the combination's **62.22%** on Vicuna/NaturalQuestions/20 documents. Standalone calibration also beats the combination for some Tulu/NaturalQuestions settings. The supported conclusion is improvement over the corresponding reordering baseline, not universal superiority to every comparator.

The method avoids weight training, but requires **O(K) extra model forward passes** to estimate calibration at K document positions. Calling it efficient relative to collecting data and tuning a model must not be confused with being cheaper than vanilla inference.

## Analyst Takeaways

1. **Attention magnitude is not relevance by itself.** Position can dominate a relevance signal. Raw attention ranking should be tested under document permutation and matched-position controls rather than treated as an explanation automatically.
2. **Ordering and reader interventions target different layers of the problem.** [Context Ordering as Retrieval Control](/vault/context-ordering-as-retrieval-control.md) can reduce exposure to weak positions. Calibration attempts to change the reader's behavior once documents are present; neither recovers missing evidence.
3. **Report the whole position curve and the comparator.** A 47.8-point ranking gain is not a 47.8-point QA gain; an endpoint loss can coexist with a better mean. Use [Position-Robust Context Evaluation](/vault/position-robust-context-evaluation.md) and distinguish within-method improvement from best-baseline superiority.
4. **Do not extrapolate from this intervention to all attention bias.** [StreamingLLM](/dossiers/streaming-llm-attention-sinks.md) shows initial-token attention can stabilize local prediction even without semantic value. Document-relevance calibration and sink preservation operate at different granularities and objectives.
5. **Synthetic breadth and realistic behavior remain complementary.** [RULER](/dossiers/ruler-real-context-size.md) tests additional recall, tracing, and aggregation demands; [Context Rot](/dossiers/context-rot-long-context-performance.md) reports task-dependent position effects rather than a universal U-shaped law.

## Questions and Limitations

- The root of positional bias remains unresolved; pretraining data, architecture, and optimization are candidate causes. The intervention provides evidence of a useful causal lever in these settings, not a unique origin story.
- The relevance-plus-position model discards dynamic and content-dependent interactions. Dummy baseline choice, document lengths, question placement, and layer/head selection may affect calibration transfer.
- Experiments use two 7B models and two English single-gold-document QA datasets, with greedy decoding and one run. No repeated-run uncertainty or proof of generalization to multi-hop dispersed evidence, contradictions, or full-window million-token inputs is supplied.
- Three gold positions do not characterize every depth. Initial qualitative analysis conditions on errors with a middle-position gold passage and should not be generalized to all generations.
- Position bias may help when the input structure intentionally prioritizes boundary material. The paper explicitly warns that removing it can hurt some tasks; the first-position regressions are measured examples.
- The appendix says the datasets should not contain uniquely identifying personal information, but NaturalQuestions uses public Wikipedia and the paper's own example names Marvin Gaye. Public availability is not equivalent to the absence of identifying information; the broad ethics wording is not supported literally.

## Vault Ideas Extracted

* [Position-Robust Context Evaluation](/vault/position-robust-context-evaluation.md)
* [Context Ordering as Retrieval Control](/vault/context-ordering-as-retrieval-control.md)
