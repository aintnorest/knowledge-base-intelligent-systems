---
type: Study Note
title: "AI in software engineering at Google: Progress and the path ahead"
description: Google's first-party account of measured code-completion acceptance, AI-assisted review-comment resolution, workflow UX, and online experimentation in internal development tools.
resource: https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead/
source: /archive/google-ai-software-engineering-progress.html
tags: [human-in-the-loop, evaluation, enterprise, coding-agents, reliability]
timestamp: 2026-09-24T03:43:02Z
---

# AI in software engineering at Google: Progress and the path ahead — Study Notes

**Authors**: Satish Chandra and Maxim Tabachnyk; co-authored with Boris Bokowski, Petros Maniatis, Ambar Murillo, and Alberto Elizondo  
**Publisher**: Google Research Blog  
**Published**: June 6, 2024

## What It Is

A first-party account of Google's deployed ML assistance across IDE, code review, code search, and related workflows. The central argument is that technically feasible model demos do not necessarily turn into valuable software-development products: prioritize feasible, high-impact tasks, ship UX that fits the next developer action, and measure adoption and downstream usefulness in live work. It reports code completion and resolving human code-review comments, which are distinct from automatically **finding** code-review issues.

## Deployed Workflows and Numbers

- Google reports **37% acceptance** of AI code-completion suggestions. The footnote defines this as accepted suggestions divided by suggestions shown for **more than 750 milliseconds while the developer is not typing**. That is not the fraction of generated suggestions accepted in all circumstances.
- Accepted AI code completions account for **50% of code characters** under a specific denominator: accepted AI characters / (manually typed characters + accepted AI characters). **Copy-pasted characters are excluded**. Thus “half the code” here is an input-character accounting convention, not half of merged code quality, authorship, or developer hours saved.
- **More than 8% of code-review comments are addressed with AI-based assistance**, a comment-resolution workflow; contextual adaptation of pasted code accounts for approximately **2% of code in the IDE**. The latter's footnote points to the completion-character measure, not whole-repository output.
- The organization mines aligned activity traces across fine-grained edits, build outcomes, fixes, copy/paste, review comments, and subsequent changes. Models use improved coding ability, context-construction heuristics, and tuning on acceptances, rejections, and corrections. Suggestions in familiar IDE surfaces take the user to the next step with a tab or click.

## Product and Evaluation Loop

The authors say features that required developers to remember an explicit trigger did not scale as well as suggestions naturally embedded in an existing workflow. They characterize the author increasingly as a reviewer of AI proposals, creating a new attention cost. Their funnel runs from an eligible coding opportunity through model response, acceptable prediction, visibility, and actual application; latency, confidence, quality, and UX can each lose potential value. Online A/B experiments, direct user research, developer productivity and satisfaction monitoring supplement offline metrics, which the authors call rough proxies for value.

## Analyst Takeaways

1. **Count useful actions, not mere exposures.** Report suggestion eligibility, visibility, acceptance, corrections, and durable outcomes separately. State denominator and observation window before repeating a “37%” or “50%” figure.
2. **Make AI-assisted review-comment resolution easy to inspect.** A suggested fix to a reviewer request should be verified against the original comment and relevant tests; its >8% usage share is not proof that the comments were resolved correctly.
3. **Budget developer attention as a scarce resource.** If the author must review ever more generated material, generation throughput can shift, rather than eliminate, the quality bottleneck.
4. **Prefer live, controlled workflow measurement to offline score alone.** Google's online experimentation and cross-tool feedback motivate the practice, but this blog does not publish the A/B effect sizes or controlled safety outcomes for the reported products.

## Questions and Limitations

- Vendor-reported aggregate figures omit sample sizes, confidence intervals, code-language breakdowns, usage cohorts, and the rate of incorrect accepted code. Acceptance and AI-character share are adoption proxies, not correctness or productivity estimates.
- The >8% review-comment figure does not specify whether AI proposed the fix, applied it, or how many required further edits or reviewer rejection.
- Predictions about broader agentic testing and maintenance workflows are forward-looking; the article's measured claims concern Google's internal tools as of 2024.

## Vault Ideas Extracted

* [Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)
* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
