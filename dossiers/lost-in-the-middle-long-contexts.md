---
type: Study Note
title: Lost in the Middle: How Language Models Use Long Contexts
description: Personal study notes on controlled evidence-position tests showing that long-context language models often underuse relevant information placed in the middle of their input.
resource: https://arxiv.org/abs/2307.03172v3
source: /archive/lost-in-the-middle-long-contexts.pdf
tags: [long-context, retrieval, evaluation]
timestamp: 2026-07-14T15:53:29Z
---

# Lost in the Middle: How Language Models Use Long Contexts - Study Notes

**Authors**: Nelson F. Liu, Kevin Lin, John Hewitt, Ashwin Paranjape, Michele Bevilacqua, Fabio Petroni, Percy Liang
**Venue**: arXiv:2307.03172v3 [cs.CL]
**Version date**: November 20, 2023
**Pages**: 18
**Project**: nelsonliu.me/papers/lost-in-the-middle

## What It Is

This paper is a controlled study of whether language models can actually use information across a long input, rather than merely accept a large token budget. It holds the relevant evidence fixed, varies its position and the amount of distractor context, then measures whether the model can answer a question or retrieve an exact value.

The central result is a serial-position pattern: many tested models perform best when the needed information is at the start or end of the prompt and substantially worse when it is in the middle. The authors call this a U-shaped performance curve and argue that a context-window limit is not evidence of robust long-context use.

## The Problem It Targets

Retrieval-augmented QA and document-processing systems often respond to poor recall by adding more retrieved passages to a prompt. That improves the chance that the answer is present, but it also makes the reader search through more material. A model that cannot reliably attend to the middle of that material can lose accuracy even when retrieval succeeds.

The paper separates two failure modes that are otherwise easy to conflate: the retriever may fail to supply the evidence, or the reader may receive it but fail to find and use it. Position-controlled tests isolate the second failure.

## Experimental Design

### Multi-Document Question Answering

The authors use 2,655 NaturalQuestions-Open items with paragraph answers. Each prompt contains exactly one Wikipedia passage containing an annotated answer and `k - 1` Contriever-retrieved distractor passages. They vary both the answer passage's position and the number of documents (10, 20, or 30), while keeping the desired answer unchanged. Accuracy is whether a predicted answer contains an annotated answer.

They evaluate MPT-30B-Instruct, LongChat-13B (16K), GPT-3.5-Turbo and its 16K variant, and Claude-1.3 and its 100K variant. Closed-book and one-document oracle settings distinguish a model's parametric knowledge and its ability to use a single supplied answer passage from its performance amid distractors.

### Synthetic Key-Value Retrieval

To remove linguistic relevance as a confounder, the second task serializes 75, 140, or 300 random UUID key-value pairs as JSON. Given one key, the model must return its corresponding UUID value. Moving the target pair changes only its location, not the lookup problem.

### Diagnostic Variants

The paper tests encoder-decoder models (Flan-T5-XXL and Flan-UL2), query-aware contextualization that repeats the query before and after the documents or JSON, instruction-tuned versus base MPT-30B, randomized distractor order, GPT-4 on a subset, and Llama-2 variants. It also runs a retriever-reader NaturalQuestions case study in which the number of retrieved documents increases from 5 to 50.

## Important Results

- Across multi-document QA settings, performance is generally highest with the answer passage first or last and lowest in middle positions. With 20 documents, GPT-3.5-Turbo scores 75.8% with the answer first, falls to 53.8% at the middle tested position, and reaches 63.2% with the answer last. Its closed-book accuracy is 56.1%, so poorly placed evidence can be less useful than no supplied documents.
- Larger nominal windows did not eliminate the effect. GPT-3.5-Turbo and GPT-3.5-Turbo (16K), as well as Claude-1.3 and Claude-1.3 (100K), had nearly identical position trends in the tested ranges.
- On exact UUID lookup, Claude-1.3 variants were nearly perfect, while GPT-3.5, MPT-30B-Instruct, and LongChat often again struggled most with targets in the middle. Thus semantic ambiguity is not necessary for the failure.
- Encoder-decoder models were relatively position-robust while evaluated within their training-time lengths, but showed the same U-shaped trend when evaluated beyond those lengths. This is suggestive evidence that bidirectional contextualization and length generalization both matter, not a general proof that one architecture solves long context.
- Repeating the query before and after the data made all tested models nearly perfect on the synthetic key-value task; GPT-3.5-Turbo (16K) reached perfect accuracy with 300 pairs, versus a 45.6% worst case without it. The intervention barely improved multi-document QA and could reduce performance outside the first position, so exact retrieval and semantic evidence use are different capabilities.
- In open-domain QA, reader accuracy saturated far before Contriever recall. Moving beyond 20 retrieved documents improved GPT-3.5-Turbo by only about 1.5 percentage points and Claude-1.3 by about 1 point, despite more retrieved evidence and a larger prompt.

## What I Take From It

1. **Evaluate context by evidence location, not only total length.** A long-context claim should report best-, middle-, and worst-position performance for a fixed task, source set, and token budget. An average can hide a catastrophic placement-specific failure.
2. **Rank and truncate for the reader, not only retrieval recall.** More passages are not automatically safer. If the reader's usable-context curve saturates, spend the budget on reranking, deduplication, focused retrieval, or multi-stage reading rather than blindly increasing top-*k*.
3. **Separate lookup from use.** A model may retrieve an exact string once the query is made visible during contextualization yet still fail to synthesize the relevant passage into a correct answer. Test both capabilities before applying a prompting fix broadly.
4. **Treat context order as an operational parameter.** Ordering retrieved evidence is part of the system's behavior and should be versioned, ablated, and monitored alongside the retriever and generator.
5. **Use the paper as a test pattern, not a current leaderboard.** The evaluated APIs and models are from 2023. The controlled protocol remains useful, but the numerical gaps must be remeasured on the deployed model, workload, and prompt template.

## Questions and Limitations

- The multi-document task deliberately contains exactly one answer passage, whereas production questions can require multiple sources, contain conflicting evidence, or have no answer. The U-shaped finding may interact differently with fusion and synthesis tasks.
- Most central experiments use greedy decoding and a limited set of 2023 models. Sampling, tool use, structured retrieval, and current long-context architectures may shift the magnitude or shape of the failure.
- The paper proposes reranking and truncation as practical directions but does not establish an end-to-end method that reliably fixes semantic multi-document QA.
- Accuracy based on annotated answer-string inclusion is appropriate for the controlled setup but does not evaluate citation fidelity, reasoning quality, or resistance to unsupported answers.
- Position effects may be caused by a mixture of architecture, training distribution, prompt format, and model scale. The diagnostic experiments narrow possibilities but do not identify one causal mechanism.

## Vault Ideas Extracted

* [Position-Robust Context Evaluation](/vault/position-robust-context-evaluation.md)
* [Context Ordering as Retrieval Control](/vault/context-ordering-as-retrieval-control.md)
