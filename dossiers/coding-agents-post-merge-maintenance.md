---
type: Study Note
title: "Not All Agents Are Equal: Code Quality and Post-Merge Maintenance Across Five Autonomous Coding Agents in the Wild"
description: "AIDev-linked comparison of five agent PR populations and matched human PRs on added-line smells, 90-day reverts, follow-up churn and review coverage."
resource: https://arxiv.org/abs/2609.17598v1
source: /archive/coding-agents-post-merge-maintenance.pdf
tags: [code-quality, coding-agents, agents, evaluation, reliability, human-in-the-loop]
timestamp: 2026-09-24T03:45:20Z
---

# Not All Agents Are Equal: Code Quality and Post-Merge Maintenance Across Five Autonomous Coding Agents in the Wild — Study Notes

**Author**: Obada Kraishan  
**Venue**: arXiv:2609.17598v1 [cs.SE], preprint dated September 17, 2026  
**Scope**: AIDev PRs in public >100-star repositories, December 2024–July 2025

## What It Is

A comparative field analysis linking provenance-labeled Codex, Devin, GitHub Copilot, Cursor and Claude Code pull requests to added-line quality signals, human reviews, and the 90 days after merge. Its principal finding cuts against a simplistic “agent code uniformly creates more debt” narrative: measured differences **among vendors** exceed many pooled agent–human differences. Its own limitations are substantial: PRs are not randomized to agents or tasks, and code-analysis and review coverage are incomplete.

## Data and Measures

- Study corpus: **37,623 PRs** in **2,807 repositories**: **33,596 agent** and **4,027 human** PRs. Humans are drawn from the **810 repositories** with agent PRs over the same activity window and capped by repository, but only **9,750 agent PRs** occur in those shared repositories; the full agent corpus also contains other projects. Merge count is **27,090**.
- Cache **58,792** GitHub API responses; enrichment succeeds for **29,730/30,721 (96.8%)** submitted PRs. Static analysis covers **8,933 PRs / 1,348,822 added Python, JavaScript and TypeScript lines** (roughly 23.7% of corpus), excluding diffs with >5,000 added lines.
- Regex catalog flags eight CWE-associated *patterns* in diff additions (not validated exploits), plus TODO/FIXME, long lines, comment share, branching and indentation. Compare per-100-added-line densities and presence rates. Maintenance sample is **26,283** merged PRs with a full 90-day follow-up: count commits touching the *most-changed file*, normalize by PR changed lines, and infer reverts from commit messages. Human review tables exist for agent PRs only.
- Mann–Whitney, Kruskal–Wallis/Dunn, Cliff's delta, odds ratios with 95% CIs, BH false-discovery correction, and a 5,000-sample bootstrap establish comparisons; statistical significance alone is not practical impact.

## Results: Security and Structure

- Pooled agent PRs show **2.9%** with at least one flagged security smell, versus **4.6%** human PRs (**OR 0.63, 95% CI 0.47–0.85, p = .003**). Per-agent shares differ: Cursor **1.6%**, Codex **2.5%**, Copilot **2.7%**, Devin **4.1%**, Claude Code **9.5%**. Per-added-line security density differs statistically across groups but agent–human Cliff's deltas are all negligible (including Claude **+0.05**); small absolute and large size-mix effects matter.
- Only hardcoded credentials (CWE-798: **0.9% agent vs. 2.2% human; OR 0.39 [0.25, 0.62]**) and eval/exec injection (CWE-95: **0.2% vs. 0.8%; OR 0.25 [0.11, 0.56]**) are significantly less prevalent after multiplicity correction. No CWE class is significantly *more* prevalent in pooled agents. Claude's credential-pattern rate (**3.3%**) exceeds the human **2.2%**, while Codex and Cursor are **0.5%** each.
- Claude Code PRs are much larger (median **495** changed lines vs. **52** human, **61–96** for the other agents), have median nesting **4** vs. **3** elsewhere, and wait longest for review. Median comment ratio is **.065 Copilot**, **.076 Claude**, **.042 Cursor**; median Codex, Devin and human PRs have no added comment line. None of those standalone metrics proves maintainability.

## Results: Maintenance and Human Attention

- Among PRs followed for 90 days, the paper finds **no agent group with greater size-normalized follow-up churn than humans**. Claude has the lowest median normalized file activity (**0.5 vs. 5.3** human; Cliff's delta **−.33**); the proxy only follows the most-changed file and does not score code correctness.
- Human PR revert rate is **11.5%**. Codex: **6.1%, OR 0.50 [0.44, 0.57], p < .001**; Devin: **14.5%, OR 1.31 [1.11, 1.54], p = .004**. Copilot **12.5%**, Cursor **11.4%**, Claude Code **10.5%** do not differ significantly from humans. The five per-vendor revert sample sizes are unequal, particularly Claude's **267** vs. Codex's **17,756**.
- Only agent PRs have measured human-review records, and coverage ranges from **5.4% (Codex)** to **51.2% (Copilot)**. Copilot averages **3.6** human reviews, **0.43** change requests, **4.0** bot reviews per PR; Claude waits a median **12.6 hours** for its first human review vs. about **1–4 hours** for other agents. This is evidence of attention allocation, not proof that a specific vendor needs more review because its code is worse.

## Analyst Takeaways

1. **Measure which agent on which task, not “AI” as one intervention.** A within-project comparator, PR size and task class matter more than a pooled label.
2. **Track downstream outcomes explicitly.** Ninety-day revert/churn and review depth answer different questions from new-warning counts. Keep window, file coverage and censoring visible.
3. **Allocate review capacity by consequence and patch complexity.** A 495-line median change deserves a different review plan than a 63-line median one; bot review volume cannot replace accountable human review.
4. **Do not optimize one smell metric blindly.** Lower regex hits do not establish exploit resistance, just as lower file churn does not establish a correct solution. Pair code scans with execution and user outcomes.

## Questions and Limitations

- Self-selection into product and task, imperfect human matching outside the shared 810 repos, and changing model versions preclude causal vendor rankings.
- Regex checks inspect added lines only and can miss context-sensitive vulnerabilities; the authors report an early path-traversal regex false-positive pattern that inflated that class roughly **150×** before correction.
- A follow-up commit to one file is a weak measure of maintenance effort; silent rewrites escape revert-by-commit-message detection, and 90 days cannot reveal long-term architectural debt.
- Only 8,933 PRs enter static analysis; reviews are observed for 5.4–51.2% of agent PRs, without human PR review records. Results are conditional on public, established Python/JS/TS projects in an early market window dominated by Codex.
- Do not read this as disproving another study's static-warning accumulation or security risk; units, sampling, detection and time horizon are different.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Repository-Relative Code Quality](/vault/repository-relative-code-quality.md)
