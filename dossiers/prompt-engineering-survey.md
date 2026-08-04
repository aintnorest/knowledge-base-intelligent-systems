---
type: Study Note
title: Prompt Engineering Survey
description: Personal study notes on the comprehensive survey of prompt engineering techniques for LLMs and VLMs by Chen et al.
resource: https://arxiv.org/abs/2310.14735v6
source: /archive/prompt-engineering-survey.pdf
tags: [prompting, survey, chain-of-thought, multimodal]
timestamp: 2026-07-11T16:36:00Z
---

# Prompt Engineering Survey — Study Notes

**Authors**: Banghao Chen, Zhaofeng Zhang, Nicolas Langrené, Shengxin Zhu  
**Venue**: arXiv:2310.14735v6 [cs.CL]  
**Date**: May 11, 2025 (v6)  
**Pages**: 58

## What It Is

A comprehensive, well-structured survey of prompt engineering spanning from basic techniques (role-prompting, few-shot) to advanced methodologies (chain-of-thought, tree-of-thoughts, decomposed prompting), VLM-specific approaches (CoOp, MaPLe), evaluation frameworks, real-world applications, and security vulnerabilities. The paper positions prompt engineering as a formal discipline with its own taxonomy, history, and trajectory.

## The Structure

The paper is organized into 8 sections plus a historical timeline:

1. **Basics** — Clear instructions, role-prompting, delimiters, resampling, one/few/zero-shot, temperature/top-p
2. **Advanced Methodologies** — CoT, self-consistency, generated knowledge, least-to-most, tree/graph of thoughts, decomposed prompting, active prompt, prompt pattern catalog, prompt optimization, retrieval augmentation, ART, ReAct
3. **VLM Methods** — CoOp, CoCoOp, MaPLe
4. **Evaluation** — Subjective vs objective metrics, benchmark categories
5. **Applications** — Education, content creation, programming, reasoning, dataset generation
6. **Security** — Adversarial attacks, data poisoning, backdoors, prompt injection, prompt hacking, model stealing
7. **Future Directions** — Understanding model structures, AI agents for AIGC

## Key Takeaways by Section

### Basics (Section 2)

- **Role-prompting** is surprisingly effective. Giving the model a persona ("You are a historian") aligns its output distribution without any parameter updates.
- **Zero-shot can outperform few-shot** in some scenarios. Reynolds & McDonell (2021) found that examples don't always help — sometimes they guide the model to recall a task it already knows rather than teaching it something new. This challenges the intuition that "more examples = better."
- **Temperature and top-p** are essential knobs but not always accessible (ChatGPT UI doesn't expose them). API access is required for serious prompt engineering.

### Advanced Techniques (Section 3)

- **Chain-of-Thought (CoT)** is the most impactful single technique. The "Let's think step by step" zero-shot variant is almost embarrassingly simple but produces massive gains on reasoning tasks. The survey covers golden CoT (ground-truth reasoning chains), self-consistency (sample multiple paths, take majority vote), and generated knowledge (generate facts first, then answer).
- **Tree of Thoughts (ToT)** extends CoT from a linear chain to a branching search with lookahead and backtracking. This is where prompt engineering starts looking like classical AI search algorithms.
- **Graph of Thoughts (GoT)** generalizes ToT further by allowing arbitrary graph structures where thoughts can be aggregated, refined, and combined. This feels like the natural endpoint of structured reasoning prompts.
- **Decomposed Prompting (DECOMP)** is a modular approach where a decomposer LLM breaks a task into sub-queries, each handled by a specialized sub-task handler. This is essentially a software engineering pattern applied to prompts — separation of concerns.
- **Active Prompt** selects the most "uncertain" examples (by disagreement/entropy across multiple model samples) for human annotation. This is active learning applied to few-shot exemplar selection.
- **Prompt Optimization** has matured into a subfield with distinct approaches:
  - **ProTeGi**: gradient descent in text space using "textual gradients" (natural language descriptions of prompt flaws)
  - **BPO**: black-box optimization using preference pairs to train a prompt rewriter
  - **MAPO**: model-adaptive optimization that tailors prompts to specific LLMs rather than tasks
  - **PromptAgent**: Monte Carlo Tree Search for strategic prompt planning
- **Retrieval Augmentation** is positioned as a prompt engineering technique for reducing hallucinations, not just a RAG architecture. Directly concatenating retrieved facts into the prompt is treated as a prompt-level intervention.
- **ReAct** combines reasoning traces with actionable tool use. The key insight is that reasoning-only (CoT) and action-only are both limited; interleaving them produces better results. The example of finding a lost key (Figure 16) is a perfect illustration — reasoning guides which room to check, action checks it, observation updates the reasoning.

### VLM Methods (Section 4)

- **CoOp** (Context Optimization) learns soft prompt vectors for CLIP instead of handcrafting text prompts. This is the "prompt tuning" idea for vision-language models.
- **CoCoOp** (Conditional Context Optimization) extends CoOp by making prompts input-conditional via a lightweight neural network. This handles unseen classes better.
- **MaPLe** (Multimodal Prompt Learning) jointly optimizes prompts for both vision and language branches with coupling between them. This is the most sophisticated of the three — it doesn't just tune language prompts, it tunes both modalities together.

### Evaluation (Section 5)

- The survey categorizes evaluation into **subjective** (human judgment on fluency, accuracy, novelty, relevance) and **objective** (automated metrics like BLEU, ROUGE, BERTScore, or benchmark performance).
- Key benchmark categories: Math Word Problems (GSM8K, MATH), QA (MMLU, FEVER, HotPotQA), Language Understanding (SST, AG's News), Multimodal (RefCOCO).
- **Important critique**: Automated metrics like BLEU often fail to capture human judgment. The survey explicitly warns that "the best way to evaluate depends on the specific application."

### Security (Section 7)

- **Prompt hacking** is distinct from traditional software hacking — it exploits the model's input processing rather than software vulnerabilities. The OWASP LLM prompt hacking project is mentioned as an emerging standard.
- **Backdoor attacks** can be triggered by natural language prompts (Imperio), not just specific tokens. This means backdoors can be hidden in plain sight.
- **Model stealing** via query-based extraction is a real threat. The survey cites the extraction of OpenAI's projection matrix through carefully crafted prompts.
- **ProAttack** uses the prompt itself as the backdoor trigger, which is particularly insidious because the attack vector is the same channel as normal usage.

### Future (Section 8)

- The authors propose a **5-phase evolution** of AI agents: models → prompt templates → chains → agents → multi-agents. This is a useful mental model for where the field is heading.
- Deeper understanding of model architectures (attention mechanisms, causal relationships) is identified as crucial for designing better prompts. The "Causal Transformer" from DeepMind is cited as an example.

## My Takeaways

1. **The gap between basic and advanced techniques is enormous**. A simple role prompt might get you 70% of the way there, but CoT + self-consistency + generated knowledge can push reasoning tasks from 40% to 80%+ accuracy. The survey makes a strong case for layering techniques.

2. **DECOMP and ReAct are underappreciated**. These aren't just prompt tricks — they're architectural patterns. DECOMP is microservices for LLM tasks; ReAct is the observer pattern for reasoning. I should use these more systematically.

3. **Security is not an afterthought**. The survey dedicates a full section to adversarial attacks, backdoors, and model stealing. In an era where we're building systems that ingest prompts from untrusted sources, this is essential reading. 

4. **Evaluation remains unsolved**. The tension between subjective and objective evaluation, the limitations of BLEU, and the inconsistency of automated metrics across models all point to a field that hasn't settled on how to measure success. This is both a challenge and an opportunity.

## What I Would Question

- The survey is extremely broad but sometimes shallow. Each technique gets 1–2 paragraphs. For implementation details, you need to read the original papers.
- The VLM section is shorter than it deserves. CoOp/CoCoOp/MaPLe are complex methods that could each warrant their own survey.
- Some "future directions" feel speculative rather than grounded in current research trends.

## Vault Ideas Extracted

* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
* [Self-Consistency Decoding](/vault/self-consistency-decoding.md)
* [Tree of Thoughts](/vault/tree-of-thoughts.md)
* [ReAct Framework](/vault/react-framework.md)
* [Decomposed Prompting](/vault/decomposed-prompting.md)
* [Active Prompt](/vault/active-prompt.md)
* [Prompt Optimization](/vault/prompt-optimization.md)
* [Retrieval Augmentation](/vault/retrieval-augmentation.md)
* [VLM Prompt Learning](/vault/vlm-prompt-learning.md)
* [Prompt Security Taxonomy](/vault/prompt-security-taxonomy.md)
* [LLM Evaluation Methods](/vault/llm-evaluation-methods.md)
* [AI Agent Evolution](/vault/ai-agent-evolution.md)
