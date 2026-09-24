---
type: Synthesis
title: "Verification-Centric Generated-Review Evaluation"
description: "Evaluating AI-generated critique through evidence support, known-error detection, actionability, rubric adherence, and manipulation resistance rather than text similarity alone."
tags: [evaluation, peer-review, code-review, llm-as-judge, verification, prompt-injection]
timestamp: 2026-07-22T00:32:30Z
---

# Verification-Centric Generated-Review Evaluation

Similarity to a human reference review is not enough evidence that an AI critic is useful. A generated critique may match tone and topics while missing a central contradiction, inventing an unsupported weakness, ignoring the governing rubric, or following adversarial text embedded in the artifact it reviews. Verification-centric evaluation measures those failure modes separately.

## Evaluation Pattern

1. Turn each substantive critique into a checkable claim and link it to supporting or contradicting source evidence.
2. Measure factual grounding, useful actionability, analytical depth, topic coverage, and task- or venue-specific rubric adherence as separate dimensions.
3. Add known-defect probes: real errors where available and controlled inserted contradictions where natural ground truth is scarce. Preserve whether each result is synthetic or natural.
4. Break error-detection results down by severity and by the evidence required to find the defect, not only by an aggregate score.
5. Compare score or focus distributions with competent human reviews without treating human-text overlap as the sole target.
6. Test the reviewer itself against indirect instructions, misleading claims, and document manipulations; log whether it detects, ignores, or obeys them.
7. Audit model-judge calibration, model version, retrieval corpus, cost, and human disagreement samples.

## Practical Use

Use this pattern for paper review, code review, policy analysis, incident postmortems, or any agent that critiques an untrusted artifact. The output should identify evidence, uncertainty, and a practical next action instead of merely supplying a fluent score or summary.

Synthetic defects make benchmarks scalable and unambiguous, but they can have artifacts and can be easier than naturally occurring failures. Treat a result on them as controlled capability evidence and pair it with human adjudication or natural-error data before making deployment claims.

## Code Review Evidence

For code review, assess each comment on verifiable issue validity, severity, actionability, and what happens when a repair acts on it. Do not assess it on text overlap, comment count or an LLM label. Keep these axes separate:

- **Emitted-finding correctness.** Ericsson's pilot: 197/206 findings judged correct.
- **Importance.** Only 135 of those 197 correct findings were rated medium or high.
- **Recall on known issues.** In c-CRAB, four review tools individually pass 20.1–32.1% of 234 human-derived executable targets, though 77/92 sampled extra AI comments were judged useful.
- **Proxies for acceptance.** AutoCommenter's useful ratio covers only comments that received feedback (~10%), and its ~40% fix rate is inferred from changed lines. BitsAI-CR's "Outdated Rate" measures later edits to flagged lines, not confirmed fixes.

Headline deployment numbers are not adjudicated precision or recall. Anthropic reports substantive comments on 54% of PRs (up from 16%) and fewer than 1% of findings marked incorrect by engineers. CodeAgent confirms 449/483 flags, which is not recall among all defects. OpenAI's 98% versus 58.3% is targeted recall on an internal custom-rule suite, with no published negative-case scores. Google Conductor describes broad review categories with no detection measurements.

For rule-based review, pair known violations with safe counterexamples and unrelated diffs ([Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)). Sample unmarked comments, measure misses weighted by severity, and compare against a human-reviewed baseline. A 100-problem math pilot found self-review falsely rejected 18/52 correct answers versus 1/52 for cross-family review. This motivates a code-specific test of reviewer independence; it is not yet evidence about code review.

## Limitations

- Evidence retrieval and LLM judging can themselves introduce omissions, bias, and prompt sensitivity.
- Multiple quality dimensions can be correlated, so a dashboard is more honest than an uncalibrated composite score.
- Resistance to one manipulation template does not establish robustness to adaptive document attacks.

## Sources

- [ReviewEval dossier](/dossiers/revieweval-ai-generated-reviews.md) — multi-axis measures of factuality, actionability, depth, similarity/coverage, and guideline adherence.
- [Beyond Imitation dossier](/dossiers/beyond-imitation-llm-assisted-peer-review.md) — graph-grounded synthetic contradictions, reviewer-focus analysis, and explicit manipulation tests.
- [Custom Code Review rules for Codex dossier](/dossiers/openai-custom-code-review-rules.md) — 98% versus 58.3% internal custom-finding recall; negative-case scores not published.
- [Conductor Update: Introducing Automated Reviews dossier](/dossiers/google-conductor-automated-reviews.md) — review categories announced without detection measurements.
- [Bringing Code Review to Claude Code dossier](/dossiers/claude-code-review.md) — comment-rate and marked-incorrect figures, not adjudicated precision or recall.
- [AI-Assisted Assessment of Coding Practices in Modern Code Review dossier](/dossiers/google-autocommenter-coding-practices.md) — sparse-feedback useful ratio and inferred fix rate.
- [BitsAI-CR: Automated Code Review via LLM in Practice dossier](/dossiers/bytedance-bitsai-cr-code-review.md) — precision filter and an outdated-rate proxy.
- [Using Agentic AI for contextualized and multifaceted code review at Ericsson dossier](/dossiers/ericsson-contextual-multifaceted-code-review.md) — correctness versus importance without recall.
- [Code Review Agent Benchmark dossier](/dossiers/c-crab-code-review-agent-benchmark.md) — executable targets from human review concerns.
- [CodeAgent: Autonomous Communicative Agents for Code Review dossier](/dossiers/codeagent-communicative-code-review.md) — confirmed flags without an exhaustive missed-defect audit.
- [Reviewer Capability Governs Rejection Targeting, Not Repair Skill: Evidence from LLM Execute–Review–Revise Pipelines dossier](/dossiers/reviewer-capability-rejection-targeting.md) — self versus cross-family reviewer false rejection in a math pilot.
- [AI writes code faster. Your job is still to prove it works. dossier](/dossiers/ai-code-review-proof.md) — reviewer noise and human verification of AI findings.
