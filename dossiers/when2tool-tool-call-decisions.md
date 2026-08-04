---
type: Study Note
title: "LLM Agents Already Know When to Call Tools – Even Without Reasoning"
description: Study notes on WHEN2TOOL and PROBE&PREFILL, which use a hidden-state probe to route direct answers versus tool use.
resource: https://arxiv.org/abs/2605.09252v1
source: /archive/when2tool-tool-call-decisions.pdf
tags: [tool-use, routing, agents, reasoning]
timestamp: 2026-07-22T06:16:14Z
---

# LLM Agents Already Know When to Call Tools - Study Notes

**Authors**: Chung-En Sun, Linbo Liu, Ge Yan, Zimo Wang, Tsui-Wei Weng  
**Venue**: arXiv preprint: 2605.09252v1  
**Pages**: 34  
**Code**: github.com/Trustworthy-ML-Lab/when2tool

## What It Is

This paper is about the decision *whether* to call a tool, rather than whether a model can format a call correctly. Its WHEN2TOOL benchmark contains 18 tool environments (15 single-hop, 3 three-step multi-hop) across three forms of self-assessment:

1. **Computational scale** — can the model reliably compute this without a calculator or similar tool?
2. **Knowledge boundary** — does the needed fact exist in the model's parameters, or must it be looked up?
3. **Execution tracking** — does the model know the procedure but need a tool to avoid losing track of a long sequence?

Each environment has easy, medium, and hard examples. Easy tasks are normally answerable directly; hard tasks are designed so a tool is genuinely needed; medium tasks sit near the decision boundary. The benchmark contains 1,080 training and 2,700 test tasks.

## The Failure of Verbal Tool-Need Reasoning

The authors evaluate Prompt-only policies from “tools are mandatory” through “do not use any tools,” plus Reason-then-Act variants that ask the model to reason aloud about whether a tool is needed before acting.

The result is a coarse and indiscriminate trade-off. Prompts that reduce calls also suppress the calls needed for hard tasks. Reason-then-Act can improve the easy-task trade-off for some Qwen models, but it adds generation cost and can be actively harmful for others: the paper reports that two Llama models sometimes verbalize an intention to call a tool but then fail to produce a valid call, collapsing tool use and accuracy.

The useful evaluation metric is **accuracy lost per saved call**, sliced by difficulty. A policy that saves many calls only by preventing necessary calls is not efficient in the way a deployer wants.

## Probing Tool Necessity

The authors label a task as tool-necessary when the specific model fails after being forced to answer without tools; otherwise it is tool-unnecessary. They run one prompt-encoding forward pass, concatenate the last-token hidden state from all layers, and train L2-regularized logistic regression to predict that label.

Across six models, the probe reaches AUROC 0.894–0.957 on held-out tasks. The signal remains strong even where explicit Reason-then-Act generation fails. The paper interprets this as an action-selection gap: the model's representation contains information relevant to tool necessity, but its decoding policy does not reliably turn that information into a calibrated choice.

This is an operational definition of necessity, not an absolute truth label. It is model-, prompt-, and benchmark-dependent: a task is labeled “necessary” because that model failed without the tool under the study's conditions.

## PROBE&PREFILL

The proposed runtime method uses the existing prompt-encoding pass:

1. Read the last-token hidden states and apply the trained probe.
2. Compare its probability with threshold `τ`; the threshold selects an accuracy-versus-tool-cost operating point.
3. Prefill the response with either “I can solve this directly without using a tool” or “I need to use a tool for this question,” then let the model continue decoding.

The default is a *soft* prefill, which the model may override. For models that ignore it, the authors also test a *hard* prefill that forces a direct-answer or tool-call output format. The claimed overhead is under one millisecond because hidden-state extraction reuses the normal prefill forward pass and the readout is a small linear model.

## Results That Stood Out

- Averaged across the six models, the method reports a **48% reduction in tool calls** with **1.7% accuracy loss**. At comparable accuracy, the best prompt baseline reduces only 6% of calls; a baseline with similar call reduction loses about five times as much accuracy.
- At threshold 0.5, the paper reports the lowest accuracy cost per saved call across easy, medium, and hard examples (−1.6, −6.2, and −3.4, respectively), compared with much larger losses for prompt-only or reason-then-act policies.
- On the multi-hop environments, Qwen variants reportedly reduce calls by as much as 75% while preserving or improving accuracy.
- On six Search-o1 open-domain QA datasets, the authors report 20–56% fewer search calls with comparable or better accuracy on most datasets. The degree of reduction and the best operating point vary by task.

## My Takeaways

1. **Tool routing should be treated as a prediction problem.** “A tool is available” is not a good decision rule; estimate the incremental value of the call for this model and task.
2. **A low-dimensional, inspectable controller can outperform a long verbal policy.** The controller need not replace the agent; it can select the first action mode and leave the agent to complete the task.
3. **The threshold is a product policy.** It should be calibrated by task slice and include latency, price, freshness, permissions, and safety, not only accuracy and call count.
4. **Representational probes need evaluation discipline.** They can expose actionable signals, but they also introduce a new model-specific dependency that can drift after a model, prompt, or tool interface changes.

## What I Would Question

- The no-tool success label can be noisy and circular: a model may guess correctly, and the same task can become “necessary” or “unnecessary” when prompts, model versions, or answer scoring change.
- Hidden states are unavailable through many hosted APIs. The method therefore fits open weights or serving stacks that expose internal activations more readily than black-box tool-call APIs.
- Soft prefill was partly ignored by Llama models, and hard prefill changes the output contract. Both behaviors need compatibility tests with an application's parser and tool executor.
- The work optimizes whether to call a tool, not whether the tool is authorized, fresh, trustworthy, or safe. Those must remain separate gates.

## Vault Ideas Extracted

* [Latent Tool-Necessity Routing](/vault/latent-tool-necessity-routing.md)
