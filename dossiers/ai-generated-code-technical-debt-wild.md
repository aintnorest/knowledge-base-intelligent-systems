---
type: Study Note
title: "Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild"
description: "Commit-level study of static-analysis debt introduced and repaired by five AI coding tools across 6,299 public repositories, including survival at repository HEAD."
resource: https://arxiv.org/abs/2603.28592v2
source: /archive/ai-generated-code-technical-debt-wild.pdf
tags: [code-quality, coding-agents, agents, evaluation, reliability, provenance]
timestamp: 2026-09-24T03:45:10Z
---

# Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild — Study Notes

**Authors**: Yue Liu, Ratnadira Widyasari, Yanjie Zhao, Ivana Clairine Irsan, Junkai Chen, and David Lo  
**Venue**: arXiv:2603.28592v2 [cs.SE]; version dated April 26, 2026  
**Artifact**: Public dataset and replication package, `github.com/yueyueL/tech-debt-ai-coding`

## What It Is

A longitudinal, repository-mining study of detectable code-level debt in commits explicitly attributed to Copilot, Claude, Cursor, Gemini or Devin. Unlike analyses of freshly generated snippets, it compares a file just before and after each attributed commit and checks whether each newly flagged issue remains at the current HEAD. This records **visible AI-involved commits**, not all AI-assisted code; attribution by Git metadata does not separate the machine-written lines from human edits in a coauthored commit.

## Collection and Measurement

- Discover candidate repositories via GitHub Archive push events (January 2024–October 2025) and the GitHub API; scan all branches of full histories for actor login, author email/name and `Co-authored-by` evidence. Filter to repositories with at least 100 stars and production Python, JavaScript or TypeScript files. Initial rules detect 29 tools, but the final comparison restricts to five tools with substantial attributed volume: **302,579 commits in 6,299 repositories** (Copilot 118,012; Claude 138,249; Cursor 19,587; Gemini 12,429; Devin 14,302).
- Exclude tests, docs, generated code and other non-production paths. Compare ESLint/Pylint (smells and correctness) plus Semgrep (security) before/after each commit; match shifted findings by rule/message/nearby line and count unmatched *post* findings only on changed lines. Count unmatched *pre* findings as fixed.
- Follow the introducing file to HEAD, including renamed files when possible, and match rule plus code context there. This is persistence of a *static-analysis warning*, not verified user harm or exploitability.
- Manual attribution check: **99/99 available commits** from a random 100 were confirmed, with one unavailable (conservative 99% of sample). Of 99 evaluable warning examples, the detection pipeline achieved **85.9% precision** for issue validity and **86.7% precision, 81.2% recall** for persistence classification against adjudicated annotations. Those rates make exact population totals estimates rather than error-free census counts.

## Main Results

- The paper counts **484,366 introduced findings**, in **3,946 repositories** and **27,677 commits** (9.1% of the 302,579 analyzed commits). Of findings, **432,748 (89.3%)** are code smells, **28,931 (6.0%)** correctness, and **22,687 (4.7%)** security. The most frequent rules include **41,374 broad exception handlers**, **28,272 unused variables/parameters**, **23,856 undefined references**, and **8,677 path-join/resolve traversal warnings**. A rule hit need not be an exploit.
- The paper's *per-tool chart* reports commits with at least one warning from **17.4% (Copilot)** to **29.1% (Gemini)**, with Claude 24.4%, Cursor 25.7%, Devin 23.8%. Its overall 9.1% (27,677/302,579) is inconsistent with every per-tool share being above 17%; denominators or filters are insufficiently reconciled in the text. Do not substitute one for the other or cite either as a comparable adoption-wide failure rate without this caveat.
- Mean findings introduced *per attributed commit* range from **0.89 for Devin** to **1.95 for Claude**; task mix, commit size, language and user practices are uncontrolled, so this is no causal vendor ranking.
- AI-involved commits both add and remove warnings: **432,748 smells introduced vs. 439,817 fixed** (net −7,069); **28,931 correctness introduced vs. 25,189 fixed** (net +3,742); **22,687 security introduced vs. 15,345 fixed** (net +7,342). This is why the claim “AI only creates debt” is too broad, but higher-severity categories warrant scrutiny.
- Persistence uses a smaller trackable denominator than introduction: **105,364/464,900 findings (22.7%)** survive at HEAD. The source does not reconcile this 464,900 tracking set with all 484,366 introductions; it explicitly reports cohorts, including **4,893/21,421 (22.8%)** surviving beyond nine months, **17,307/89,135 (19.4%)** at six–nine months, and **31,492/111,551 (28.2%)** at three–six months. HEAD-survival is not a constant-time hazard estimate.
- Examples make the categories tangible: Devin adds an undefined `cache=cache` in Firecrawl and a maintainer removes it 42 days later; Copilot adds SQL construction with an interpolated table name in Data Formulator before later refactoring; a Copilot `shell=True` pattern is later removed in `hysteria2`. These are illustrative cases, not prevalence of exploitable bugs.

## Analyst Takeaways

1. **Run before/after code-level checks, not just an after snapshot.** Newly introduced and removed findings belong to different ledgers; code-motion and line shifts require careful matching.
2. **Prioritize correctness and security over aggregate warning count.** Net reductions of easy smells can coexist with net increases in deeper, consequential issue categories.
3. **Assign a debt owner beyond merge.** Track AI-touched modules against current HEAD and review surviving findings at an agreed horizon; merge acceptance is not debt retirement.
4. **Report tool and task mix.** The metric measures attributed *commits*, not pure agent edits; a human-in-the-loop factory should review line provenance and changed behavior before blaming a named vendor.
5. **Check independent outcomes.** Static-analysis warnings are useful triage; combine with executable tests, security analysis, code reuse review and observed maintenance effort.

## Questions and Limitations

- No reliable human-only control group, no random assignment of tools, and no coverage of unlabeled AI use, private projects, unpopular projects, languages other than Python/JS/TS, test quality, architectural drift or documentation debt.
- Semgrep security warnings combine genuine vulnerabilities and latent risky patterns without a quantitative exploitability split; manual warning validation estimates nontrivial false positives.
- HEAD disappearance can result from deleting or wholesale rewriting a file rather than deliberate repair, and matching warnings across versions can miss persistence.
- The 9.1% overall versus 17.4–29.1% per-tool warning-commit rates, and 484,366 introduction versus 464,900 trackable findings, demand transparent denominator reconciliation before comparative use.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Repository Drift Garbage Collection](/vault/repository-drift-garbage-collection.md)
* [Repository-Relative Code Quality](/vault/repository-relative-code-quality.md)
