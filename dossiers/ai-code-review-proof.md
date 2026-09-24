---
type: Study Note
title: AI writes code faster. Your job is still to prove it works.
description: Addy Osmani's proposal for an evidence-bearing pull-request contract and human ownership of risk, intent, and maintainability when AI increases code volume.
resource: https://addyosmani.com/blog/code-review-ai/
source: /archive/ai-code-review-proof.html
tags: [code-review, coding-agents, human-in-the-loop, verification, governance, agents]
timestamp: 2026-09-24T03:45:44Z
---

# AI writes code faster. Your job is still to prove it works. — Study Notes

**Author**: Addy Osmani  
**Publisher**: AddyOsmani.com (personal synthesis, not Google policy)  
**Published**: January 7, 2026

## What It Is

The central question is not whether AI can read a diff, but what the *author must prove* before asking someone else to take responsibility for a change. Osmani argues that generating code faster moves the bottleneck to checking its behavior, risk, and long-term ownership. His proposed PR contract makes proof and human review focus explicit. This is more specific than a general 'run tests' recommendation: the producer must present evidence that reduces the reviewer's uncertainty.

## Solo Work Versus Team Review

A solo developer can use test loops and manual application use as immediate feedback, but remains responsible for bugs and maintainability. Osmani says to run the app and actually use the feature, not merely read passing test output. Higher-stakes changes require deeper scrutiny.

A team additionally needs shared understanding. A human reviewer supplies context about the product, architecture, organizational constraints, on-call ownership and security. AI PR bots and second-model checks can identify candidate defects and reduce rote scanning, but comments can also be generic noise or confidently wrong; tune which findings are useful and investigate them rather than accepting an automated verdict.

For authentication, payments, secrets and untrusted input, the author explicitly calls for human threat-model review plus security tooling. The source describes several alarming external figures—over 30% of seniors shipping mostly AI-generated code, 75% more logic errors, around 18% more additions in PRs, 24% more incidents per PR, 30% higher change failure rates, approximately 45% of generated code with security flaws, 1.75× logic errors and 2.74× XSS frequency. They come from different linked reports, cohorts and definitions; this article does not harmonize them or establish causality. It also cites anecdotal 95%+ bug catch and 70–80% low-hanging-fruit capture claims without a common evaluation setup. Do not combine these as one benchmark.

## The PR Contract

The concrete four-part author handoff is:

1. **What and why:** summarize intent in one or two sentences.
2. **Proof it works:** provide executed tests and relevant manual steps, screenshots or logs—not an AI claim of success.
3. **Risk and AI role:** identify the risk tier and which portions AI generated, particularly on high-stakes paths.
4. **Review focus:** identify one or two uncertainties needing human attention, such as architecture or security.

Small, reviewable commits preserve these links between intent, implementation and evidence. Osmani treats AI review as a first pass and the human as final accountable signer. He also stresses that review transfers knowledge: a team cannot maintain code nobody can explain. The anecdote of maintainers declining a 13,000-line AI-generated PR illustrates review-capacity failure, not proof that generated code of that length is intrinsically incorrect.

## Analyst Takeaways

1. **Require observed behavior at author handoff.** A PR with a passing-status claim but no command output, run-through or inspectable result simply exports verification work to the reviewer.
2. **Direct scarce human attention using risk and uncertainty.** Critical business logic, architecture, privilege boundaries and ambiguous requirements deserve review even if static checks pass.
3. **Separate reviewer suggestions from findings.** AI comments should point to a path, failure scenario and evidence; dismiss recurring noise and validate serious findings independently.
4. **Preserve an accountable owner.** AI-generated code that no teammate understands imposes future on-call and change costs even when today's CI is green.
5. **Keep PRs conceptually bounded.** Smallness is about a coherent, verifiable change, not merely enforcing a numeric line-count threshold.

## Questions and Limitations

- The mixed statistics are drawn from different linked sources and cannot be pooled or read as a controlled comparison of AI and human work. The essay does not publish denominator, sampling, uncertainty, or baseline for its 70–80% AI review assertion.
- Coverage over 70%, proposed in the discussion of solo workflows, is a heuristic and cannot guarantee behavior was tested or security defects found.
- 'No PR without new tests or a demo' is the author's norm, not a reason to add redundant tests to changes whose meaningful proof takes another form.
- Human sign-off and PR descriptions can become rituals. Verify actual understanding with focused questions and concrete evidence rather than checking four filled-in boxes.
- Osmani's views do not constitute Google review policy.

## Vault Ideas Extracted

* [Reviewable Change Units](/vault/reviewable-change-units.md)
* [Verification-Centric Generated-Review Evaluation](/vault/verification-centric-generated-review-evaluation.md)
