---
type: Study Note
title: "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?"
description: A Python repository-task evaluation finds no significant resolution benefit from generated or developer-committed context files versus omission, despite increased testing, exploration, reasoning, and inference cost.
resource: https://arxiv.org/abs/2602.11988v3
source: /archive/evaluating-agents-md-repository-context-files.pdf
tags: [context-engineering, coding-agents, evaluation, token-efficiency, benchmark, agents]
timestamp: 2026-10-14T13:00:00Z
---

# Evaluating AGENTS.md — Study Notes

**Authors**: Thibaud Gloaguen, Niels Mündler-Sasahara, Mark Niklas Müller, Veselin Raychev, and Martin Vechev.  
**Published**: Archived arXiv:2602.11988v3, September 29, 2026.  
**Status**: Empirical preprint introducing CTXbench; the archived manuscript labels itself “Preprint” and establishes no peer-reviewed venue.

## What It Is

A controlled comparison of coding-agent runs with **no repository context file**, an **LLM-generated file**, or a **developer-committed file**. It combines SWE-bench Lite with CTXbench, a new benchmark drawn from repositories already using such guidance. The central result is not that agents ignore instructions: they follow them, perform more work, and cost more, without a statistically significant increase in issue resolution against the no-file baseline.

This is evidence about the marginal contribution of these files to Python patch tasks under the evaluated harnesses. It does not show that repository knowledge is unnecessary, that explicit nonstandard requirements should be discarded, or that context files cannot improve security or maintainability.

## Problem and Motivation

Agent-facing repository guidance is widely recommended, but documentation of adoption and practitioner enthusiasm do not establish end-to-end effectiveness. Automatically summarizing a codebase may merely restate information an agent can already retrieve. Instructions can also create additional obligations—more exploration, tests, and tool use—whose execution cost exceeds any navigation benefit.

The useful question is therefore **what additional information or behavior a persistent instruction buys**, relative to the same repository without that instruction, rather than whether the file appears comprehensive.

## Design and Mechanism

### Two Complementary Task Sets

- **SWE-bench Lite:** 300 tasks from popular Python repositories, without developer-provided context files; compares no-file and generated-file conditions.
- **CTXbench:** 138 bug-fix and feature-addition instances from **5,694 PRs across 12 Python repositories**, selected for existing root-level context files, tests, and at least 400 PRs. The final distribution ranges from three instances in graphiti to 17 in openai-agents-python. This complements, rather than represents all of, the long tail of repositories.

CTXbench uses GPT-5.2/Codex to filter deterministic, testable changes, construct environments, rewrite issue descriptions using the original PR patch, and generate regression tests. Generated tests must fail before the fix and pass after it; authors manually inspect all instances and revise over-specific tests in **25/138**. Evaluation combines these new tests with original repository tests that pass on the reference-patched code. Mean modified-code coverage is **75%**, with a **2.5%–100%** range. Mean task-description length is **211.6 words**; developer context files average **641 words and 9.7 sections**, ranging from 24 to 2,003 words.

### Matched Context Interventions

Four model–harness configurations are evaluated: Sonnet 4.5/Claude Code, GPT-5.2/Codex, GPT-5.1 Mini/Codex, and Qwen3-30B-Coder/Qwen Code. Each configuration receives **one sampled completion per task per condition**, not repeated estimates of stochastic variability. Generated guidance is produced from the pre-patch repository using the agent's recommended initialization approach; developer guidance also comes from the pre-patch state. File names vary with the harness, but the intervention is repository-level guidance loaded into the agent's context.

Environments are prepared before task execution. Agents have Internet access; CTXbench removes commit history and remotes. Authors report manually checking traces for reference-PR lookup and finding none, with web access under 1% of calls. Claude Code can delegate to Haiku 4.5 subagents, so the four configurations are not a harness-controlled comparison of model intelligence.

Success means the submitted patch passes every evaluation test. Additional metrics are environment-interaction steps, inference cost, reasoning tokens where exposed, and time to first interaction with a file changed by the reference patch. Shell-call intents are classified using GPT-OSS-120B and manually consolidated; these behavioral labels are proxies, not independently verified measures of useful work.

## Results and Admissions

### Resolution: No Significant Gain Against Omission

Table 5 reports these success rates; all values are percentages, not relative changes:

| Benchmark / context | Sonnet 4.5 | GPT-5.2 | GPT-5.1 Mini | Qwen3-30B |
|---|---:|---:|---:|---:|
| SWE-bench / none | 59.9 | 56.6 | 47.7 | 31.1 |
| SWE-bench / generated | 58.7 | 54.4 | 47.6 | 32.4 |
| CTXbench / none | 73.2 | 65.2 | 54.3 | 45.7 |
| CTXbench / generated | 65.2 | 68.1 | 50.7 | 47.1 |
| CTXbench / developer | 70.3 | 68.1 | 55.8 | 53.6 |

Reported standard errors are approximately **2.7–3.2 percentage points** on SWE-bench and **3.8–4.3 points** on CTXbench. Two-sided Cochran–Mantel–Haenszel tests give **p = 0.87** for generated versus none on SWE-bench, **p = 0.37** on CTXbench, and **p = 0.21** for developer versus none on CTXbench. Developer files outperform generated ones in the pooled CTXbench comparison (**p = 0.038**), which is not evidence that either significantly beats omission.

Generated files reduce success in **five of eight** model–benchmark settings. Developer files improve three of four configurations but reduce Sonnet success by **2.9 points**. From the displayed rates, unweighted mean changes are **−0.55 points** for generated SWE-bench, **−1.825 points** for generated CTXbench, and **+2.1 points** for developer CTXbench. These arithmetic summaries are distinct from the source's inconsistently specified percentage claims below.

### Cost and Behavior: Instructions Produce Extra Work

Table 2 shows higher mean steps and cost in every context-file condition. The paper reports average generated-file cost increases of **20% on SWE-bench and 23% on CTXbench**. Illustrative CTXbench costs per task are **$0.38 → $0.57 generated / $0.54 developer** for GPT-5.2, and **$1.15 → $1.33 / $1.30** for Sonnet. Qwen cost is estimated from average OpenRouter pricing, not the actual local-serving bill. These are inference costs, not total engineering cost, and no separately itemized file-generation cost is given.

Table 6 supports higher pooled costs with **p < 0.00001** for generated SWE-bench, **p = 0.00064** for generated CTXbench, and **p = 0.0126** for developer CTXbench. Step-increase p-values are **0.0287**, **0.00004**, and **0.00002**, respectively.

Trace analysis finds more tests, file search/reading, and repository-specific tool use. One named dependency tool averages **1.6 calls when mentioned versus fewer than 0.01 otherwise**; repository-specific tools average **2.5 versus fewer than 0.05**. Mention-conditioned comparisons support instruction uptake but are not randomized tests of individual instructions: tool relevance and repository differences can also affect use.

Generated guidance increases reasoning tokens by **22%/10%** for GPT-5.2/GPT-5.1 Mini on SWE-bench and **14%/10%** on CTXbench. Developer files increase them by **20%/2%** on CTXbench. Extra reasoning is observed; the claim that instructions make the task intrinsically harder is the authors' interpretation rather than an identified causal mechanism.

### Overviews and Ablations

Eight of 12 developer files contain a repository overview. Generated overviews appear in **100%, 99%, 36%, and 95%** of files for Sonnet, GPT-5.2, GPT-5.1 Mini, and Qwen, respectively. Context files do not meaningfully reduce steps to the first reference-changed file; GPT-5.1 Mini sometimes searches for and rereads guidance already present in context. This localization metric excludes **3%** of instances that never touch a reference-changed file.

Stronger generators and alternate generation prompts produce no consistent advantage. Binning by file length reveals no clear accuracy or cost relationship; this does **not** establish that length never matters. Removing generated testing, tooling, or overview sections yields no significant accuracy change. For GPT-5.2, removing testing guidance lowers CTXbench cost from **$0.4715 to $0.3730 (p = 0.023)** and SWE-bench cost from **$0.3272 to $0.2756 (p = 0.0035)** in Table 7's ablation runs.

A revealing countercondition removes documentation, examples, and documentation-directory contents **after generating the context file**. Without those other information sources, generated context improves success by a reported **2.7% on average** and outperforms developer files across the three tested configurations; Sonnet is omitted for cost. This artificial documentation-removal intervention supports a redundancy explanation, not a recommendation to delete documentation or a proven effect in naturally undocumented projects.

## Analyst Takeaways

1. **Treat persistent guidance as an intervention, not free context.** Compare actual task outcomes, compliance with important requirements, and total cost before promoting generated summaries or accumulated lessons into default policy. This strengthens [Scoped Guideline Memory](/vault/scoped-guideline-memory.md) with direct counterfactual evidence.
2. **Separate information gain from behavioral obligations.** A concise instruction can induce repeated work; a longer reference can provide indispensable missing knowledge. The observed absence of a length relationship argues against reducing this result to token count alone.
3. **Navigation needs end-to-end evidence.** A repository index can be useful architecture without guaranteeing faster localization or better patches. [File-Native Context Retrieval](/vault/file-native-context-retrieval.md) describes the navigable pattern; this study supplies a boundary condition where extra overview text mostly duplicates available documentation.
4. **Adherence and useful outcomes are different axes.** The observed failure is largely obeying guidance without better resolution, not demonstrated inability to obey dense rules. [Instruction-Density Compliance Decay](/vault/instruction-density-compliance-decay.md) covers a distinct mechanism and should not be cited as the explanation here.
5. **Preserve genuinely additional requirements.** Test-based resolution does not measure style, maintainability, security, or organization-specific constraints. A useful evaluation must include the reason guidance was introduced, rather than declaring a mandatory requirement wasteful because benchmark success is unchanged.

## Inconsistencies and Limitations

- **Effect-size wording:** the introduction calls the developer-over-generated advantage “7%,” without saying relative or absolute. Table 5 yields **4.175 percentage points** unweighted; averaging per-model relative improvements gives about **7.3%**, a plausible reconciliation but not an explicit source definition. The claimed **2.4%** developer-over-none gain does not match the displayed **2.1-point** unweighted mean. Treat the tables and clearly identified units as primary.
- **Cost summary conflicts:** the claim that developer guidance increases cost “at most 19%” conflicts with the displayed GPT-5.2 increase **$0.38 → $0.54**, approximately **42%**. Nineteen percent is closer to an average of per-model increases than a maximum. The main-results prose also uses **p < 0.001%** for generated cost increases, while Table 6 gives **p = 0.00064** on CTXbench, or **0.064%**. The increase remains significant, but the prose threshold does not hold for that test.
- **Table labeling and run alignment:** Table 5 labels its CTXbench block “PLAN-BENCH,” despite its caption and matching rates identifying CTXbench. Table 7's full-file GPT-5.2 cost baselines (**$0.4715/$0.3272**) do not match Table 2's generated costs (**$0.57/$0.43**) for CTXbench/SWE-bench; the text does not explain the discrepancy. Table 8's original-description accuracy baselines also differ slightly from Table 5. Do not mix these runs to compute causal deltas.
- **Repository count:** the setup says SWE-bench Lite spans **11** repositories, whereas Figure 10 displays **12** named repositories. CTXbench's Figure 2 counts do sum to 138.
- **Benchmark construction:** rewritten tasks and tests see the reference patch. Human review and fail-before/pass-after checks reduce leakage and overfitting, but cannot prove reference-independent adequacy; some original tests failing on the reference patch are excluded. Rewriting SWE-bench descriptions raises no-context success from **57.0% to 70.8%** for GPT-5.2 and **30.3% to 46.9%** for Qwen in Table 8, demonstrating that specification treatment materially changes difficulty.
- **Population and replication:** Python-only open-source tasks, 12 selected context-adopting repositories, one completion per condition, and model-specific harnesses limit generalization to proprietary code, other languages, interactive steering, and stochastic robustness. Context-file presence in version control does not prove human authorship; length and AI-detector differences are supporting signals, not provenance verification.
- **Nulls are not equivalence:** nonsignificant resolution effects do not establish zero benefit in every repository or requirement family. The reported pre-/post-training-cutoff comparison finds no consistent difference, but cannot rule out all contamination. No direct security, maintainability, runtime-efficiency, or long-run policy-compliance outcomes are measured.

## Vault Ideas Extracted

- [Scoped Guideline Memory](/vault/scoped-guideline-memory.md) — added measured instruction-induced work, controlled omission as an evaluation baseline, and the distinction between nonredundant requirements and generated summaries.
- [File-Native Context Retrieval](/vault/file-native-context-retrieval.md) — added the repository-overview localization null and documentation-removal countercondition, separating navigable evidence from redundant up-front prose.
- [Instruction-Density Compliance Decay](/vault/instruction-density-compliance-decay.md) — added the boundary between compliance failure and compliant-but-unproductive work; the study does not establish count-driven compliance decay.
