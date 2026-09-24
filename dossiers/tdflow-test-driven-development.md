---
type: Study Note
title: "TDFlow: Agentic Workflows for Test Driven Development"
description: A test-driven repository repair workflow that separates patch proposal, test-specific debugging, patch revision, and optional test generation, exposing the difference between solving trusted tests and writing them.
resource: https://arxiv.org/abs/2510.23761v2
source: /archive/tdflow-test-driven-development.pdf
tags: [coding-agents, verification, orchestration, agents, evaluation]
timestamp: 2026-09-24T03:44:35Z
---

# TDFlow: Agentic Workflows for Test Driven Development — Study Notes

**Authors**: Kevin Han, Siddharth Maddikayala, Tim Knappe, Om Patel, Austen Liao, and Amir Barati Farimani  
**Venue**: arXiv:2510.23761v2 [cs.SE]  
**Date**: January 22, 2026

## What It Is

TDFlow treats repository-level issue repair as resolving pre-existing reproduction and regression tests, not as an open-ended instruction to edit until the agent declares completion. Its most consequential distinction is between **human-written tests supplied before repair** and **agent-generated reproduction tests**: the former make the target more concrete, while the latter introduce an additional oracle-quality problem. The authors envision developers specifying desired behavior through tests and reviewing patches made by the workflow; this is not evidence that arbitrary green tests guarantee a good change.

## How the Workflow Works

1. Run the supplied reproduction tests to collect failing names, source, and error messages. When none are supplied, a Generate Tests agent writes candidate reproduction tests from the issue and can execute them.
2. An Explore Files agent reads the issue, failing tests, and repository via restricted find/view/hierarchy tools, then proposes a **global diff against the original repository**. It cannot edit files or invoke a general shell. A Revise Patch agent repairs malformed diffs without changing the underlying patch objective.
3. Run reproduction and regression tests against the patch. Launch a Debug One subagent for each failing test, each with that test's source and error, restricted repository navigation, and debugger access.
4. Aggregate debugging reports and prior failed patches into the next Explore Files context; repeat. If the iteration budget expires, select the patch passing the most reproduction tests **without breaking regression tests**, not necessarily a fully passing patch.

This separation gives each component a bounded task and tools. It can reduce irrelevant context and allows test-specific diagnosis, but also adds infrastructure and repeated calls. The design bans patch edits to test directories, confines visible repository paths, and uses manual review to identify test gaming.

## Results and What They Mean

- With human-written tests disclosed to **all** compared systems and GPT-4.1 held common, TDFlow solves **88.8%** of SWE-bench Lite's 300 tasks versus Agentless **61.0%**, SWE-agent **49.0%**, ExpeRepair **48.6%**, and OpenHands **47.8%**; average cost per issue is **$1.51** for TDFlow versus **$0.53** for Agentless. This is a test-informed comparison, not the usual hidden-test benchmark setting.
- On 500 SWE-bench Verified tasks using GPT-5 for repair components, human-written tests yield **94.3%** reported resolution at **$1.01/issue**; removing Debug One lowers this to **87.2%** at **$0.73/issue**. Agent-generated tests (Claude 4 Sonnet) yield **68.0%** in the results table at **$4.12/issue**, of which **$2.83** is attributed to test resolution. The abstract instead says **69.8%**; the paper does not reconcile this discrepancy.
- An agent-generated test is counted as a *successful reproduction test* when it fails on the buggy repository and passes after the gold patch. On instances where **all** generated tests meet that criterion, TDFlow solves **93.3%**; this conditional subgroup does not establish that generating valid tests is easy. A test that passes in both states or encodes a wrong oracle can misdirect every subsequent repair step.
- Three programmers manually inspected 800 runs using human-written tests and identified **seven** cases of test hacking (**four** Lite, **three** Verified), counted as failures. The audit does not prove no undetected gaming or behavioral omissions exist.

## Analyst Takeaways

1. **Have the human define the expectation before giving the agent a pass target.** A failing reproduction case plus preserved regression behavior is a clearer TDD contract than a task prompt ending in “make tests green.” Review whether that contract expresses intent and includes interactions, not only whether it executes.
2. **Require a red-to-green witness for generated reproduction tests.** A generated test should fail before the fix and pass against a trusted fix or independently reviewed expected behavior; without such a witness, generated tests can confidently encode the agent's mistaken hypothesis.
3. **Split discovery, patching, and failure diagnosis only when the division helps.** Debug One's 7.1-point gain is measured in this workflow; it does not isolate benefits from extra tokens, debugger affordances, or other scaffold differences. Compare against cheaper targeted diagnosis before adopting the whole architecture.
4. **Keep validation independent of the patch author.** Restrict edits to tests/verifier files and check the final behavior and maintainability with a human. TDFlow's low manually found hacking rate is not a general safety guarantee; SpecBench shows green feature tests can coexist with broken feature composition.
5. **Do not turn this into a mandate for more agent-written test files.** The companion agent-generated-tests study (arXiv:2602.07900) finds that strongly increasing incidental test creation can raise cost without improving repair resolution. The useful distinction is trustworthy expectations versus sheer test-writing volume.

## Questions and Limitations

- Providing benchmark hidden tests as agent inputs turns diagnosis into a different task from issue-only repair and may reveal exact benchmark expectations. The claimed “human-level” result is conditional on this unusually informative input.
- The run-cost and score comparisons span different models/settings; the generated-test and human-test conditions are not a controlled comparison of test authorship alone, because the former also pays for generation and may receive a different test quality distribution.
- The source gives two incompatible generated-test resolution numbers (**69.8%** in the abstract, **68.0%** in Table 2 and discussion). Prefer the explicit table when citing its experiment and retain the discrepancy.
- “Tests fail pre-fix and pass post-fix” is necessary, not sufficient, for an oracle faithfully covering the complete user request; a benchmark gold patch can itself leave other requirements unchecked.
- Unsolvable or incorrect supplied tests have no correction/early-stop path; the rigid workflow may spend its full budget pursuing a bad oracle. Generality beyond Python-centric SWE-bench and human-guided test resolution remains untested.

## Vault Ideas Extracted

* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
