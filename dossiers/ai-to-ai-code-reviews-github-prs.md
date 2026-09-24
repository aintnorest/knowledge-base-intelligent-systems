---
type: Study Note
title: AI-to-AI Code Reviews of GitHub Pull Requests
description: "ESEM 2026 characterization of signature-attributed AI-authored PRs reviewed by AI products, showing scale and product-pair differences without assessing correctness."
resource: https://doi.org/10.4230/LIPIcs.ESEM.2026.74
source: /archive/ai-to-ai-code-reviews-github-prs.pdf
tags: [code-review, agents, coding-agents, evaluation, reliability, human-in-the-loop]
timestamp: 2026-09-24T03:45:40Z
---

# AI-to-AI Code Reviews of GitHub Pull Requests — Study Notes

**Authors**: Niruthiha Selvanayagam and Taher A. Ghaleb  
**Venue**: ESEM 2026, Article 74, pp. 74:1–74:15  
**DOI**: 10.4230/LIPIcs.ESEM.2026.74  
**arXiv**: 2608.21311v1, August 21, 2026

## What It Is

A large descriptive dataset of *identifiable* AI-authored GitHub PRs that receive review events attributable to AI products. “Closed loop” here means AI involvement on both sides, **not absence of human review** or autonomous merge approval. The paper measures prevalence, cross-product versus same-product pairings, per-PR comment counts, CodeRabbit's own comment categories, and first-review latency. It expressly does not determine whether comments identify real defects or whether a PR should have merged.

This matters for a light AI software factory because assigning a second agent as reviewer does not magically introduce independence. Reviewer identity, shared model/harness, permissions, context, and quality evidence must be separately specified.

## Attribution and Dataset

The CodAGE/GHArchive snapshot spans January 1, 2024 to April 15, 2026. The authors distinguish high-confidence body signatures (e.g., Claude co-author trailers or Codex URLs) from vendor-controlled bot login signatures; user-controlled branch prefixes alone do not count. Of 4,563,819 candidate authored PRs, **1,733,535 (38.0%)** are quarantined, predominantly because only a branch prefix matched, leaving **2,830,284 unique signature-attributed AI-authored PRs**. Reviewer streams attribute 12 agent products. These are precision-oriented lower-bound counts; unattributed PRs are not proven human-authored.

Aggregation is per repository and PR number, then per PR/reviewer pair. A cross-product group counts author and reviewer with different identifiable products; the same-product group includes product self-review, not necessarily the same model weights. The two groups overlap if a PR receives both types: 4,773 such PRs. Google Jules and Gemini Code Assist count as different products despite sharing a vendor; product independence is not statistical or architectural independence.

## Observed Scale and Composition

- **248,641/2,830,284 (8.8%)** attributed AI-authored PRs had at least one attributed AI review. **45,269 (1.6%)** were cross-product and **208,145** same-product; the groups overlap. Cross-product observations span 10,345 repositories.
- Activity rises from 57 cross-product and 40 same-product PRs in 2025-Q1 to 25,492 and 57,080 in 2025-Q3 (over two orders of magnitude). Late-quarter counts are affected by archive-data lag.
- OpenAI Codex authored 31,601 cross-product PRs (69.8% of that group); Copilot was reviewer in 21,022/47,259 cross-product author–reviewer pairs, including 18,114 Codex→Copilot pairs. Copilot-authored PRs are 95.7% same-product among its AI-reviewed group, Devin 76.5%, while Claude Code is 0.5%; these are workflow patterns, not calibrated reviewer success rates.
- CodeRabbit's **self-declared** categories over 35,248 comments vary across authoring products. It labels 35.0% of comments on Claude Code PRs as refactor versus 10.5% on Copilot PRs (difference 24.5 points, 95% CI [23.1, 25.9]); association Cramér's V = 0.150. Patch size, language, repository, and configuration were not controlled, so this does not establish differential code quality.
- Three of four dual-role reviewers post **58–65% more mean comments** on same-product versus cross-product PRs: Copilot 2.35 vs 1.49, Devin 1.80 vs 1.09, Amazon Q 8.08 vs 4.94. Differences are upper-tail-heavy with small/negligible rank-effect sizes; OpenAI Codex is essentially equal (0.89 vs 0.91).
- Among 103,920 pairs with complete nonnegative times, median creation-to-first-AI-review is **1.2 minutes cross-product vs 4.7 minutes same-product**. Only 79.2% of cross-product pairs and 31.9% of same-product pairs qualify; reviewer mix (Copilot median 17.7 minutes) and missingness undercut a pairing-speed interpretation.

## Analyst Takeaways

1. **Log reviewer provenance as well as author provenance.** A policy saying “independent AI review” should identify actual product, underlying model/harness when known, review trigger, human participation, and who had merge authority.
2. **Do not use comment count or category label as a defect count.** Review output composition is not recall, precision, severity, approval, or code quality. Sample and adjudicate concrete findings against code/tests and post-merge outcomes.
3. **Evaluate cross-product review on matched PRs before treating it as diversity.** This observational dataset has no matched controls and different products may share a foundation model; construct trials holding author, patch, and context fixed.
4. **Treat minute-scale feedback as an opportunity for earlier verification, not proof of assurance.** Review start time says nothing about reviewer understanding or patch acceptance.
5. **Distinguish attribution-conditioned rates from deployment coverage.** Body signatures may disappear and bot identities evolve; missing events are not negative events.

## Questions and Limitations

- The study observes neither human co-review nor merge outcome, code correctness, missed defects, accepted suggestions, review quality, or approval authority.
- CodeRabbit's category headers are tool-produced labels, not independently validated bug types or ordered severity.
- PR and review attribution is incomplete and asymmetric; public GitHub/GHArchive misses private installations and signatures can be copied or removed.
- Product pairing, repository, language, patch size, integration defaults, and timestamp availability confound comparison of review volume and speed.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Weakest-Link Assurance Composition](/vault/weakest-link-assurance-composition.md)
