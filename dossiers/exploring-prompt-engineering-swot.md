---
type: Study Note
title: Exploring Prompt Engineering
description: Personal study notes on a systematic review of prompt engineering techniques using linguistic framing, technique taxonomy, SWOT analysis, and evaluation metrics.
resource: https://arxiv.org/abs/2410.12843v1
source: /archive/exploring-prompt-engineering-swot.pdf
tags: [prompting, survey, evaluation]
timestamp: 2026-07-12T21:41:53Z
---

# Exploring Prompt Engineering - Study Notes

**Authors**: Aditi Singh, Abul Ehtesham, Gaurav Kumar Gupta, Nikhil Kumar Chatta, Saket Kumar, Tala Talaei Khoei  
**Venue**: arXiv:2410.12843v1 [cs.CL]  
**Date**: October 9, 2024  
**Pages**: 14

## What It Is

This paper is a survey of prompt engineering techniques for large language models, organized around a SWOT analysis: strengths, weaknesses, opportunities, and threats. It reviews more than 100 papers, links prompt engineering to linguistic principles, categorizes common techniques, and lists evaluation metrics used to judge prompt effectiveness.

The paper is not primarily an empirical benchmark. Its value is as a compact taxonomy and risk map for prompt methods.

## The Problem It Addresses

Prompt engineering is often presented as a list of recipes: use chain-of-thought, add examples, ask the model to use tools, try self-consistency, and so on. The paper tries to make that advice more systematic by asking what each technique is good for, where it is fragile, what future work it enables, and what deployment risks it introduces.

The authors also argue that prompt design is partly a linguistic problem. They connect prompt engineering to four "Linguistics for AI" pillars: unified agent frameworks, human-inspired explanatory modeling, learning from linguistic scholarship, and using heuristic evidence for meaning extraction.

## Technique Map

The survey covers fifteen prompting families:

- **Automatic Reasoning and Tool-use (ART)** - combines model reasoning with external tool execution.
- **Chain-of-thought prompting** - elicits intermediate reasoning steps before an answer.
- **Directional stimulus prompting** - adds tokens or cues that steer the model toward desired content.
- **Few-shot prompting** - includes input/output examples inside the prompt.
- **Generated knowledge prompting** - asks the model to generate useful background knowledge before answering.
- **Graph prompting** - uses graph structures, subgraphs, or graph embeddings to enrich prompts.
- **Iterative prompting** - refines prompts through response analysis and feedback loops.
- **Least-to-most prompting** - decomposes a complex task into simpler subproblems and solves them in order.
- **Multimodal chain-of-thought** - combines textual and visual information through multi-step reasoning.
- **ReAct prompting** - interleaves reasoning, action, and observation.
- **Self-ask prompting** - decomposes questions into subquestions and integrates their answers.
- **Self-consistency** - samples multiple reasoning paths and selects the most frequent answer.
- **Sequential prompting** - feeds earlier predictions into later extraction or ranking steps.
- **Tree of Thoughts** - searches over branching intermediate reasoning states.
- **Zero-shot prompting** - gives an instruction without examples.

Many of these already appear elsewhere in this knowledge base. The distinctive contribution here is less the definitions and more the comparative SWOT frame.

## SWOT Takeaways

The SWOT table is useful because it makes prompt methods look like engineering choices rather than universal upgrades.

- Reasoning-heavy methods such as CoT, least-to-most, self-ask, and Tree of Thoughts increase problem-solving structure, but they add prompt design complexity and can consume more resources.
- Tool-using methods such as ART and ReAct improve actionability and factual grounding, but they inherit reliability and integration risks from external tools.
- Example-based and generated-knowledge methods can reduce labelled-data needs, but they are sensitive to example quality, knowledge quality, bias, and model capability.
- Graph and multimodal prompting expand the kinds of structure prompts can exploit, but their benefits depend on the quality of knowledge graphs, entity linking, visual reasoning, and cross-modal integration.
- Self-consistency improves answer stability by aggregating samples, but it can be expensive and does not remove underlying bias.
- Zero-shot prompting has the lowest setup cost, but may lose to few-shot or more tailored prompts when tasks are specialized.

The practical lesson is that a prompt technique should be chosen against the task, model, resource budget, and failure mode. The same method can be a strength in one setting and a threat in another.

## Evaluation Metrics

The paper lists metrics commonly paired with prompt-engineering evaluations:

- **Classification**: accuracy, AUC, F1, recall.
- **Semantic similarity**: BERTScore, METEOR, STS-B.
- **Text overlap and diversity**: BLEU, GLEU, ROUGE.
- **Language acceptability**: CoLA, perplexity.
- **Information retrieval and ranking**: HIT@N and NDCG@N.
- **Correlation and regression**: correlation with human annotations and mean absolute error.

The important point is not that every prompt should use all of these. The metric has to match the task. A retrieval prompt, a summarization prompt, a reasoning prompt, and a recommendation prompt are asking different evaluation questions.

## My Takeaways

1. **The SWOT frame is the useful part.** The individual technique definitions are familiar, but the strength/weakness/opportunity/threat grid forces a more operational question: what can go wrong if this prompt pattern succeeds only partially?

2. **Prompt engineering is a selection problem.** The paper reinforces that the right technique depends on the task structure. A graph prompt, a self-consistency prompt, and a zero-shot instruction are not substitutes; they solve different coordination problems.

3. **Evaluation should be technique-aware.** Prompting papers often report a headline score, but this survey's metrics table shows that the measurement surface changes by technique. Ranking, language quality, factuality, classification, and reasoning stability need different instruments.

4. **The linguistic framing is suggestive but underdeveloped.** The paper makes a reasonable link between linguistic principles and prompt design, but it does not deeply operationalize those principles into a repeatable design method.

## What I Would Question

- The survey is broad but shallow in places. Some techniques are defined through formulas and cited examples, but the paper does not consistently compare effect sizes or experimental conditions.
- The SWOT categories are useful as a planning checklist, but they sometimes read like high-level judgments rather than evidence-weighted conclusions.
- The paper treats fine-tuning as part of the prompt-engineering discussion in the abstract and implication statement, but the body focuses mainly on prompting techniques. I would keep prompt design, prompt tuning, and model fine-tuning conceptually separate when making implementation decisions.
- Because this is a survey, I would go to the underlying technique papers before using it as primary evidence for a production prompt strategy.

## Vault Ideas Extracted

* [Prompt-Technique SWOT Analysis](/vault/prompt-technique-swot-analysis.md)
* [LLM Evaluation Methods](/vault/llm-evaluation-methods.md)
