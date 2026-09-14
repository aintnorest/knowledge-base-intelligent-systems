---
type: Study Note
title: "DeepSeek-R1: Reasoning Through Reinforcement Learning"
description: Study notes reconciling the peer-reviewed Nature article and expanded DeepSeek-R1 technical report, with separate treatment of journal-backed results, report-only implementation detail, and prompt-format contingencies.
resource: https://doi.org/10.1038/s41586-025-09422-z
source: /archive/deepseek-r1-nature.pdf
tags: [reinforcement-learning, reasoning, chain-of-thought, test-time-scaling, evaluation, fine-tuning]
timestamp: 2026-09-14T17:13:50Z
---

# DeepSeek-R1: Reasoning Through Reinforcement Learning - Study Notes

**Authors**: DeepSeek-AI; Daya Guo, Dejian Yang, Haowei Zhang, Junxiao Song, Peiyi Wang, Qihao Zhu, Runxin Xu, Ruoyu Zhang, Shirong Ma, Xiao Bi, Xiaokang Zhang, Xingkai Yu, Yu Wu, Z. F. Wu, Zhibin Gou, Zhihong Shao, Zhuoshu Li, Ziyi Gao, et al.  
**Peer-reviewed version**: *Nature* 645 (2025), “DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning”; accepted July 17, 2025; published online September 17, 2025; DOI [10.1038/s41586-025-09422-z](https://doi.org/10.1038/s41586-025-09422-z); 11-page local PDF at [/archive/deepseek-r1-nature.pdf](/archive/deepseek-r1-nature.pdf)  
**Expanded technical version**: arXiv:2501.12948v2 [cs.CL], “DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning,” revised January 4, 2026; 86-page local PDF at [/archive/deepseek-r1-technical-report.pdf](/archive/deepseek-r1-technical-report.pdf)

## What It Is

DeepSeek-R1 is evidence that outcome-oriented reinforcement learning can substantially improve a sufficiently capable base model on verifiable reasoning tasks without first supervising it on human-written reasoning trajectories. The cleanest experiment is DeepSeek-R1-Zero: starting from DeepSeek-V3-Base, the authors apply Group Relative Policy Optimization (GRPO), sample groups of candidate solutions, and reward objectively checkable answers. During training, responses become longer and increasingly contain revision, verification, and alternative approaches.

The production-oriented DeepSeek-R1 is not a pure-RL model. It adds a small cold-start set of human-aligned long reasoning traces, a first reasoning-focused RL stage, rejection sampling and supervised fine-tuning (SFT) on reasoning and non-reasoning data, and a second mixed RL stage for reasoning, helpfulness, harmlessness, and language consistency. The bundle therefore supports two different claims: R1-Zero isolates what outcome-driven RL can elicit, whereas final R1 shows how those reasoning gains were made readable and broadly useful through a hybrid post-training pipeline.

The Nature article is the strongest publication record and the basis for the source identity. The later arXiv v2 is not merely an earlier manuscript: it postdates the journal publication and adds extensive appendices on infrastructure, data recipes, prompts, safety, ablations, cost, distillation, failed approaches, and benchmark protocols. Claims below are marked by which local version supports them.

## Peer-Reviewed Core Findings

### R1-Zero: outcome-driven exploration

The Nature article reports that R1-Zero uses GRPO without an SFT stage. GRPO omits PPO's separately trained value model and estimates each sampled output's advantage from rewards within the group. For reasoning data, the reward has two equally weighted rule-computable components:

1. **Accuracy reward** checks a final mathematical answer against a reference or executes code against tests.
2. **Format reward** checks that reasoning is enclosed in designated `<think>...</think>` tags; deterministic answer formats such as a boxed result enable reliable extraction and grading.

This qualifies the article's introductory shorthand that the signal is “only” final-answer correctness and places no constraints on reasoning. Reasoning *content* is not process-supervised, but response structure is explicitly prompted and rewarded. The initial prompt also requires reasoning first and a final answer second. R1-Zero is therefore evidence for avoiding human-labelled reasoning trajectories, not for learning in the absence of any output-format prior.

On AIME 2024, the Nature article reports average pass@1 increasing from 15.6% at the start of RL to 77.9%; self-consistency raises the reported result to 86.7%. Response length rises during the same training run. The authors identify increasing occurrences of reflective language and an intermediate checkpoint's sudden use of “wait” as an “aha moment.” These are observable text patterns correlated with training, not proof that the trace faithfully exposes internal cognition.

### Final R1: hybrid post-training

R1-Zero remained difficult to read, mixed Chinese and English, and was narrow outside verifiable reasoning. The final pipeline addresses those problems through:

1. thousands of cold-start long-CoT examples in a more conversational and language-consistent style;
2. a first GRPO stage on reasoning data, including a language-consistency reward;
3. rejection sampling followed by SFT on reasoning and general data;
4. a final RL stage mixing rule-based reasoning rewards with learned helpfulness and safety rewards.

The stage table in the Nature article makes the trade-offs visible. Cold start improves strict instruction following but drops AIME pass@1 from R1-Zero's 77.9% to 59.0%. Later reasoning RL recovers much of the loss. Across the full pipeline, IF-Eval rises from 46.6% for R1-Zero to 83.3% for R1, Arena-Hard from 53.6% to 92.3%, LiveCodeBench from 50.0% to 65.9%, Aider-Polyglot from 12.2% to 53.3%, and AIME from 77.9% to 79.8%. The final mixed RL stage mainly improves general instruction-following and preference benchmarks because most reasoning-specific gains occurred earlier.

The peer-reviewed article's conclusion is appropriately conditional: hard questions, reliable verifiers, and enough RL compute can unlock reasoning on domains with objective feedback. Writing and other open-ended tasks still need human-supervised data or model-based preference rewards, which become vulnerable to reward hacking when optimized too long.

## Prompt Examples and Output Formats

Both versions—not only the technical report—state the deployment recommendation that DeepSeek-R1 is prompt-sensitive, that few-shot prompting consistently degraded the authors' evaluations, and that users should directly describe the problem and specify the required output format in a zero-shot setting. The journal article does not provide effect sizes or a dedicated ablation for this general recommendation.

The technical report adds the protocol detail needed to interpret it:

- MMLU-Redux was run zero-shot, and originally few-shot prompts for MMLU-Pro, C-Eval, and CLUE-WSC were modified to zero-shot because few-shot CoT could hurt R1. Other datasets retained their original protocols, including DROP's 3-shot setup. The benchmark table is therefore not the result of one uniform prompting regime.
- Evaluation prompts impose task-specific output contracts: a last-line letter for multiple choice, JSON with separate `reasoning` and `answer` fields for MMLU-Redux, fenced Python for LiveCodeBench, a diff for Aider, XML and sentence-count constraints for IF-Eval, and `\boxed{}` for mathematics. Parsers or official checkers then score those contracts. Prompt, schema, extractor, and grader are part of every reported number.
- During R1-Zero training, a structural template and format reward enforce `<think>`/`<answer>` separation. This enables analysis and deterministic grading but means the visible trace form did not emerge without scaffolding.
- During cold-start data creation, DeepSeek-V3 rewrites accepted R1-Zero trajectories using explicit requirements for faithfulness, concise presentation, language matching, LaTeX, and boxed final answers. The report says these synthetic reasoning traces help expose user format constraints and intended output structure, but it does not isolate that claim in a controlled ablation.
- The report also uses few-shot examples to prompt **DeepSeek-V3**, the data generator, on simple arithmetic so generated training answers remain concise and structured. This does not contradict the recommendation against few-shot prompting **final DeepSeek-R1** at evaluation time: the models, purposes, and stages differ.

Format obedience improved sharply across post-training, but it remained a limitation. Final R1's 83.3 IF-Eval score was below DeepSeek-V3's 86.1 in the technical report's direct comparison, and both versions call R1's structured-output capability suboptimal. “Specify the output format” is thus an elicitation recommendation, not evidence of guaranteed schema compliance.

## Technical-Report-Only Detail

The 86-page report substantially widens what can be audited beyond the Nature main article:

- **Data recipe**: reasoning RL uses about 26,000 math, 17,000 algorithmic-code plus 8,000 bug-fixing, 22,000 STEM, and 15,000 logic prompts; general RL uses 66,000 helpfulness and 12,000 safety prompts. The later SFT mixture contains about 600,000 reasoning and 200,000 non-reasoning samples.
- **Training mechanics and cost**: R1-Zero samples 16 outputs per question, expands the maximum response length from 32,768 to 65,536 tokens after step 8,200, and trains for 10,400 policy updates. The report estimates 147,000 H800 GPU-hours and $294,000 at an assumed $2 per GPU-hour across R1-Zero, SFT-data creation, and R1 training; this excludes pre-training and exploratory runs.
- **Reward trade-offs**: a language-consistency reward stabilizes language use but slightly degrades some coding performance. The helpfulness reward rises while Codeforces performance falls when model-based reward optimization continues, an explicit reward-hacking example that motivated restricting general preference rewards to the final 400 steps.
- **Adaptive test-time compute**: on 366 problems from 2024 math competitions, R1 averages 8,793 thinking tokens and 61.8% pass@1; the report associates harder problems with more than 18,000 thinking tokens and easier ones with fewer than 7,000. AIME pass@64 reaches 90.0%, while majority voting takes pass@1 from 79.8% to 86.7%, showing that independent sampling can still complement a long single trace.
- **Distillation**: SFT on roughly 800,000 R1-generated samples transfers substantial reasoning performance to Qwen and Llama students. DeepSeek-R1-Distill-Qwen-32B outperforms a separately RL-trained Qwen2.5-32B-Zero across the report's listed reasoning benchmarks, so large-teacher distillation was more effective than direct RL at that student scale.
- **Negative results**: smaller 7B and 16B starting models lengthened and repeated without meaningful AIME gains; process reward models added difficult-to-label steps, reward-hacking risk, and compute; iterative MCTS was constrained by token-level branching and an unreliable value model.
- **Safety**: the open-weight R1 model relies heavily on an external risk-control system. In the report's in-house jailbreak evaluation, R1 without that system rises from 25.2% unsafe responses on original prompts to 85.9% under jailbreaks. With risk control, unsafe responses fall to 4.3% but rejections rise to 87.3%. These are vendor-designed, LLM-judged tests, not independent certification.

## Analyst Takeaways

1. **Use verifiers where correctness is crisp.** Outcome-based RL is compelling for mathematics, executable code, multiple choice, and other tasks with trustworthy automated checks. A convenient score is not enough; once feedback becomes subjective, prolonged optimization can reward the judge's weaknesses instead of the task.
2. **Separate capability discovery from product shaping.** R1-Zero uses minimally content-constraining RL to explore solution strategies. Cold start, SFT, language rewards, and preference RL then trade some raw reasoning performance for readability, instruction following, and safety. Treat those as distinct design objectives.
3. **An output contract changes both training and measurement.** Tags, boxes, last-line cues, JSON, code fences, parsers, and test harnesses determine whether an answer can receive reward or benchmark credit. Preserve them with any reported score and test the deployment's actual schema separately.
4. **Model-specific prompt guidance outranks generic folklore.** Worked examples historically help many models, yet the authors report that they hurt R1 and alter several benchmark prompts accordingly. Test zero-shot and few-shot variants on the exact checkpoint, task, parser, and decoding setup.
5. **Do not equate visible reflection with faithful cognition.** Longer traces, “wait,” backtracking, and revision are useful generated behaviors. They may improve outcomes, but lexical frequency and compelling examples do not establish that the text is a causal or faithful account of hidden computation.
6. **Distill after discovering high-quality trajectories.** For smaller models, learning from filtered outputs of a stronger reasoner can beat asking the small model to rediscover those trajectories through expensive RL from scratch.

## Questions and Limitations

- The Nature publication strengthens editorial and peer-review status, but the experiments remain author-run and many implementation, safety, and cost details appear only in the later technical report. Independent reproduction is still required.
- “Pure RL” describes R1-Zero's post-training stage. DeepSeek-V3-Base was pretrained on web and book data containing reasoning traces and some naturally occurring model-generated answers, so the experiment does not establish reasoning learned from a trace-free initialization.
- The technical report's v2 date is later than the journal publication. Differences should not automatically be interpreted as review-driven deletions; the report is an expanded later record.
- The n-gram decontamination procedure cannot detect paraphrased benchmark items, a limitation the report acknowledges. Fresh AIME 2025 results help but do not settle contamination across the full benchmark suite.
- The “few-shot consistently degrades” recommendation lacks a consolidated ablation, uncertainty estimates, task breakdown, and effect sizes. It is actionable checkpoint-specific guidance, not a universal law about reasoning models.
- Comparisons with people and other systems use different tools, sampling budgets, access conditions, or reported sources. AIME's human reference is the competitor average, whereas R1 uses sampled pass@1 and sometimes 64-sample consensus.
- Longer reasoning is not free: R1 still overthinks simple questions, and the report's benchmark comparisons are not uniformly matched for tokens, latency, or monetary cost.
- The SFT corpus is mostly single-turn, and the report explicitly leaves stronger multi-turn conversation training for future work.
- Tool use and reliable structured output were not solved in these versions. Software-engineering RL was limited by long evaluation cycles, and R1's gains on engineering benchmarks were smaller than on algorithm competitions.

## Vault Ideas Extracted

* [Prompt Contingency](/vault/prompt-contingency.md)
* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
* [Rule-Based Rewards](/vault/rule-based-rewards.md)
