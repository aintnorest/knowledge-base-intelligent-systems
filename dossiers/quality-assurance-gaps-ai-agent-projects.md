---
type: Study Note
title: "A Large-Scale Empirical Study of Quality Assurance Practices and Gaps in AI Agents"
description: "Repository-level analysis of 157 agent projects showing broad ordinary test adoption but sparse adversarial checks and inconsistent control coverage across model-to-action routes."
resource: https://arxiv.org/abs/2609.17698v1
source: /archive/quality-assurance-gaps-ai-agent-projects.pdf
tags: [agents, verification, agent-security, evaluation, access-control, reliability]
timestamp: 2026-09-24T03:45:30Z
---

# A Large-Scale Empirical Study of Quality Assurance Practices and Gaps in AI Agents — Study Notes

**Authors**: Wuyang Dai, Moses Openja, Jiho Shin, Hung Viet Pham, and Song Wang  
**Venue**: arXiv:2609.17698v1 [cs.SE], September 15, 2026  
**Replication artifact**: `anonymous.4open.science/r/Quality-Assurance-Practices-and-Gaps-in-AI-Agents-85F2/`

## What It Is

An empirical map of **repository-visible quality-assurance practices** in popular open-source tool-using agent projects. The authors separate execution surfaces, safeguards, testing artifacts and risk scenarios so that the presence of a test directory or an approval prompt cannot stand in for end-to-end control of model-mediated actions. This is a descriptive study of artifacts and coded *potential* risks, not a runtime exploit study or a measured prevalence of security breaches.

## Corpus and Coding

- Search/snowball candidate agent repositories; a May 21, 2026 query rerun returned **5,852 summed raw hits before deduplication/filtering**. Retain **157** public GitHub projects with at least 100 stars, a model API, executable entrypoint/manifest and at least one action surface. Composition: **42 SWE automation (26.8%)**, **31 personal/multichannel (19.7%)**, **30 coding assistants (19.1%)**, **21 research/information (13.4%)**, **19 browser/computer-use (12.1%)**, **14 domain-specific (8.9%)**.
- Inspect docs, code, configs, tests, examples, CI and deployment artifacts. Code each project in four layers: where action is exposed; which permissions, isolation, approval, redaction and domain controls are visible; what testing/evaluation exists; and which chains could reach a sensitive asset. One artifact can serve multiple roles. Labels are anchored to repository-visible files, but classification is an inductively refined rubric, not a demonstrated guarantee that safeguards work.
- Example cross-route risk: a CLI path demands confirmation for shell execution while an API, plugin, setup hook or headless mode exposes equivalent authority without the same boundary. Another chain feeds secrets from MCP or a signed-in browser session to model-selected tool output.

## Findings

- Conventional tests/specs appear in **137/157 projects (87.3%)**; security/safety-oriented tests in **95 (60.5%)**; evaluation, benchmark, adversarial or red-team-like paths in **78 (49.7%)**; specifically prompt-injection/adversarial/jailbreak/red-team testing paths in **8 (5.1%)**. Categories overlap and reflect visible artifacts; the 8 does not measure how many projects are safe from injection.
- Execution-surface challenges are near-universal by coding rubric: outbound network/API effects **156/157 (99.4%)**, credential configuration exposure **155 (98.7%)**, file/workspace escape **153 (97.5%)**, overlapping action paths **152 (96.8%)**, commands changing host process/environment **148 (94.3%)**. These counts identify review-relevant situations, not verified boundary escapes.
- Against affected projects, **36.1%** of the credential-exposure group lack a matching secret-management/redaction practice; **34.6%** of network/API-route projects lack permission/policy controls; **30.1%** of file-access and **30.4%** of command-execution groups lack sandbox/isolation. In safeguard-specific coding, **27.1%** of plugin/MCP-authority projects lack direct registration/configuration practice and **26.9%** of browser-session projects lack browser/domain-scoping controls.
- For the particular testing-gap denominator used in Table VI, **97.8%** of projects with applicable untrusted-context/adversarial scenarios lack a corresponding injection/adversarial test, **52.4%** lack evaluation/red-team-like paths, and **39.7%** lack security/safety-oriented tests. These percentages are conditional on *affected projects* and cannot simply be subtracted from 157 or treated as overall test-category rates.
- The risk-chain coding gives concrete denominator examples: **149 (94.9%)** projects have a secret-to-tool chain candidate; **137/149 (91.9%)** of these show authorization/approval practices, while **96/149 (64.4%)** show secret management/redaction. **45 (28.7%)** contain an untrusted-context-to-action candidate, and only **25/45 (55.6%)** have matching redaction. A broad approval practice may coexist with an uncovered secret path.

## Practical Model-to-Action QA

1. Build an inventory by **protected action and asset**—delete, shell, write, network egress, credential read, extension install, browser session—not merely by user interface. Enumerate every CLI, API, MCP, plugin, browser, hook and batch route to each capability.
2. Bind an appropriate safeguard at **each action boundary**. Authorization for a shell command is different from secret redaction or workspace isolation; a configuration flag does not prove effective mediation.
3. Turn candidate risk chains into failure-oriented, replayable scenarios with trigger, untrusted input, protected asset, required control, and a check that fails if that control is removed. Include mode switches, persistent state, multi-step tool use and signed-in browser state.
4. Distinguish executable evidence from artifact presence. A README promise, a unit test of a helper, and an end-to-end attempt to cross an action boundary support different assurance claims.

## Analyst Takeaways

1. **Put QA on every authority path, not only a happy-path demo.** In a light AI software factory, separate the code-writing sandbox from real production credentials, and test equivalent shell/file/egress capabilities across modes.
2. **Budget for agent-specific adversarial tests.** The 137 projects with conventional tests are not equivalent to eight with explicit adversarial test artifacts; prioritize tests that prove boundaries rather than superficial “has tests” counts.
3. **Use reviewable policy and observed effects together.** A safeguard registered in source is not evidence that the live tool call was stopped; examine execution traces and attempted boundary crossings.
4. **Preserve denominator and label semantics.** The study does not demonstrate that all 149 secret-to-tool *candidate chains* leaked secrets or that all 36.1% without a specific matched rule lack protection in production.

## Questions and Limitations

- Fixed, non-exhaustive sample of popular public projects, with an overrepresentation of coding and browser agents; hosted protections and actual deployment policies may be invisible.
- Automated search and LLM-assisted summaries may miss controls; the rubric evolved inductively, and **inter-rater agreement was not computed during taxonomy construction**. Consensus records improve clarity but do not replace independent validity measures.
- Counts reflect the presence of codable mechanisms and scenario candidates, not control completeness, test quality, vulnerabilities, attacks, or causal risk reduction. A rule that fails to match a safeguard may be a coverage gap in the study as well as in the project.
- An end-to-end test might still miss novel paths or changes in a provider and tool ecosystem; ongoing inventory, authority enforcement and negative-path checks remain necessary.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
