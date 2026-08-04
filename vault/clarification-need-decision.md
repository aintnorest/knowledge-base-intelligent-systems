---
type: Synthesis
title: Clarification Need Decision
description: A decision rule for when an AI system should interrupt the user with a clarifying question versus resolve ambiguity internally, plus how to generate a bounded, answerable question once asking is warranted.
tags: [human-in-the-loop, agents, retrieval]
timestamp: 2026-07-23T04:00:00Z
---

# Clarification Need Decision

Whether a system should ask a clarifying question is not a stylistic choice but a two-part decision: first, whether the ambiguity is even the kind the *user* can resolve (as opposed to one retrieval or reasoning can resolve internally), and second, whether the expected value of asking exceeds its cost. Systems that skip the first test annoy users with resolvable ambiguity; systems that skip the second either over-ask or default to silently guessing.

## Which Ambiguity Requires the User

Ambiguity in an information-seeking request is not one thing. Distinguish:

- **Retrieval/reasoning-resolvable ambiguity** — the system has or can obtain the missing fact itself (e.g., a linguistic ambiguity disambiguated by document context, a lexical or syntactic reading settled by co-occurring evidence). A taxonomy of eleven linguistic ambiguity types (lexical, syntactic, scopal, elliptical, collective/distributive, implicative, presuppositional, idiomatic, coreferential, generic/non-generic, type/token) shows most of these can in principle be settled from context without the speaker (Li, Liu, Wu & Smith, 2024).
- **Intent or preference ambiguity** — the query has multiple plausible facets or subtopics and only the user knows which one they meant (e.g., "jaguar" the animal vs. the car vs. the OS). This is what Qulac's faceted queries formalize: a topic decomposed into several candidate facets, each requiring a different answer (Aliannejadi, Zamani, Crestani & Croft, SIGIR 2019).
- **Genuine under-specification** — a required argument or parameter is simply missing (a time, a location, a value) and no amount of retrieval invents it. In tool-use agents this is the dominant real-world case: an analysis of real user instructions found 56% of tool-use failures came from instructions missing key information, versus 11–17% each from multiple-reference ambiguity, instruction errors, or requests beyond tool capability (Wang et al., "Learning to Ask," EMNLP 2025).

Only the latter two categories are properly resolved by asking the user; a system that asks about the first category is asking a question it should have answered itself.

## The Decision Rule

Once ambiguity is user-resolvable, ask-vs-proceed reduces to a value-of-information comparison: ask only when the expected utility gain from the answer exceeds the cost of asking. A recent decision-theoretic framework makes this explicit — compute `VoI(q) − c` for a candidate question, where `c` is the cost of imposing on the user and `VoI(q)` weighs the odds of a wrong guess against the stakes of that guess, rather than relying on a fixed, hand-tuned confidence threshold. Tested across four domains (20 Questions, medical diagnosis, flight booking, e-commerce), this policy matched or beat manually tuned thresholds and gained the most (up to 1.36 utility points) precisely in high-stakes settings, where the cost of a wrong autonomous action is large (arXiv:2601.06407, 2026).

This generalizes the earlier IR finding that clarification's value is not uniform: Qulac's oracle experiments showed that asking a good question could improve first-result precision by over 150%, but that the benefit is concentrated in short, genuinely ambiguous queries — clarification value negatively correlates with query length, and ambiguous queries benefit more than merely faceted ones. In other words, VoI is not constant across requests; it should be estimated per-request, not assumed.

Operationally, this decision is often learned as a separate classifier — "clarification need prediction" (CNP) — trained to output ask/don't-ask before question generation is invoked at all, so that generation cost is only paid when it is warranted (Zamani et al., 2020, MIMICS; recent zero-shot CNP work synthesizes ambiguous/specific query pairs to train this classifier without hand-labeled data, arXiv:2503.00179).

## Generating a Bounded Question

Once asking is warranted, the question should be scoped to what the ambiguity actually requires:

- **Ground it in facets, not open text.** Qulac-style systems retrieve or generate a small set of facets (candidate interpretations) and phrase one question that discriminates among them, rather than asking an open-ended "what do you mean?" This keeps the answer space bounded and the question answerable in one turn.
- **Keep facets coherent.** A facet set is only useful if its members sit on the same axis of contrast (e.g., "men" vs. "women" gifts) rather than mixing unrelated dimensions (e.g., "women" vs. "birthday gifts") — incoherent facet sets score fine on n-gram overlap metrics like BLEU/BERTScore but confuse users, meaning generation quality cannot be judged by text-overlap metrics alone (Litvinov, Sekulić, Aliannejadi & Crestani, 2024).
- **Ask one question at a time.** Across the datasets surveyed, the dominant setup selects or generates a single best next question per turn rather than a battery of questions, since retrieval gains taper and interruption cost compounds with each additional turn (Rahmani et al., ACL 2023 survey).
- **Prefer a trained question policy over zero-shot prompting.** Fine-tuned clarification-question generators consistently beat zero-shot prompting of the same base model on downstream usefulness, both in open-domain search and in domain-specific settings like coding assistants (Wang et al., 2025, coding-assistant clarification study).

## Practical Use

Implement this as two gated stages, not one prompt instruction: (1) a lightweight ask/proceed classifier or VoI estimate that runs before any question is drafted, conditioned on ambiguity type and the cost of a wrong action in that context; (2) a question generator invoked only after stage 1 fires, constrained to a small, coherent facet set so the user can answer in one short turn. Log which ambiguity type triggered the ask, and audit false-negative "confidently wrong" answers and false-positive over-asks separately — they have different costs and different fixes.

## Limitations

- RLHF-trained LLMs are documented to under-ask by default: single-turn preference annotation cannot see the downstream cost of a wrong guess, so annotators tend to prefer confident (but presumptuous) answers over clarifying questions. Training against simulated future turns ("double-turn preferences") measurably corrects this bias, but it means the base tendency of many deployed assistants is skewed toward proceeding even when they shouldn't (Andukuri et al./"Modeling Future Conversation Turns," ICLR 2025).
- Correctly deciding to ask is necessary but not sufficient: even after fine-tuning improves the ask/proceed decision itself, final-answer accuracy after the user responds remains the harder bottleneck — models that ask well can still fail to correctly incorporate the clarifying answer into their final response (arXiv:2605.25204, "Clarification Is Not Enough").
- The ambiguity-type boundary is not crisp in practice: linguistic-ambiguity taxonomies were built for human-language analysis, not for agent tool-use, and a live system must classify ambiguity types with its own (imperfect) judgment before this rule can even apply.
- Cost terms in the VoI calculus (user interruption cost, stakes of a wrong action) are themselves estimated, not observed; a miscalibrated cost model reproduces the same over-/under-asking failure it is meant to fix.

## Sources

- Aliannejadi, Zamani, Crestani & Croft, "Asking Clarifying Questions in Open-Domain Information-Seeking Conversations," SIGIR 2019 — https://ar5iv.labs.arxiv.org/html/1907.06554
- "Value of Information: A Framework for Human-Agent Communication" — https://arxiv.org/abs/2601.06407
- "Zero-Shot and Efficient Clarification Need Prediction in Conversational Search" — https://arxiv.org/abs/2503.00179
- Li, Liu, Wu & Smith, "A Taxonomy of Ambiguity Types for NLP," 2024 — https://arxiv.org/abs/2403.14072
- Wang et al., "Learning to Ask: When LLM Agents Meet Unclear Instruction," EMNLP 2025 — https://aclanthology.org/2025.emnlp-main.1104.pdf
- Litvinov, Sekulić, Aliannejadi & Crestani, "Analyzing Coherency in Facet-based Clarification Prompt Generation for Search," 2024 — https://arxiv.org/abs/2401.04524
- Rahmani et al., "A Survey on Asking Clarification Questions Datasets in Conversational Systems," ACL 2023 — https://aclanthology.org/2023.acl-long.152/
- "Modeling Future Conversation Turns to Teach LLMs to Ask Clarifying Questions," ICLR 2025 — https://arxiv.org/abs/2410.13788
- "Clarification Is Not Enough: Post-Clarification Answering Remains the Bottleneck in Multi-Turn QA" — https://arxiv.org/html/2605.25204
- "Curiosity by Design: An LLM-based Coding Assistant Asking Clarification Questions" — https://arxiv.org/html/2507.21285v1
