---
type: Study Note
title: "Names Are All You Need: Effective and Safe Regression Test Selection for Python"
description: "NameRTS uses name–code-element reachability plus runtime-informed pruning to shorten Python regression runs while measuring missed affected tests explicitly."
resource: https://arxiv.org/abs/2605.25356v1
source: /archive/namerts-python-regression-test-selection.pdf
tags: [verification, code-quality, reliability, evaluation]
timestamp: 2026-09-24T03:44:20Z
---

# Names Are All You Need: Effective and Safe Regression Test Selection for Python — Study Notes

**Authors**: You Wang, Michael Pradel, and Zhongxin Liu  
**Affiliations**: Zhejiang University and CISPA Helmholtz Center for Information Security  
**Venue**: arXiv:2605.25356v1 [cs.SE], ACM manuscript with unassigned DOI placeholder  
**Date**: May 25, 2026

## What It Is

NameRTS selects which Python *test files* to run after a code change. Its target is not simply test reduction: a selector is **safe on a commit only if it selects every test file actually affected** by that commit. Python's eager imports make file-level dependencies so dense that a conservative file graph seldom skips tests, while dynamic dispatch makes a precise and safe call graph hard to construct. The proposed alternative connects code elements (functions, classes, globals) and *names* that define or refer to them in a bipartite graph. Starting from changed elements, graph reachability propagates to tests that use reachable names.

## How Selection Works

- Analyze code definitions and uses, imports, class context, decorators, and pytest fixture injections. Distinguish names that can be resolved within a file or class hierarchy from ambiguous attribute accesses, which retain broader candidates for safety.
- An initialization run captures dynamic imports and tests' runtime invocations for selected high-impact or **critical** functions. Prior execution restricts implausible name matches before traversing unchanged code; after a modified element is reached, the test is already selected. The reported default instruments the top **N=500** critical function names.
- Treat registry decorators and import-time behavior specially; where the analysis cannot establish a narrower relationship, conservatively expand selection. Run each test file in an isolated process where possible so shared state does not make invocation records depend on test order.
- Report skipped-test fraction, end-to-end time reduction *including* initialization and instrumentation, and the commit-level safe rate independently. A smaller suite is not useful if a skipped test covers a regression.

The authors curate **500 consecutive source-changing commits** (50 per project) from ten substantial open-source Python projects, instrument modified functions and use a language server for offline ground truth, then compare NameRTS with BabelRTS and a strengthened conservative file-level baseline, EkstaP. The printed ACM DOI `10.1145/nnnnnnn.nnnnnnn` is a template, not a registered identifier for this version.

## Key Results

| Selection method | Test files skipped | End-to-end time saved | Commits with all affected tests selected |
|---|---:|---:|---:|
| NameRTS | **69.90%** | **45.59%** | **99.6%** |
| BabelRTS | 28.36% | 21.95% | 76.6% |
| EkstaP, safer file-level comparison | 7.42% | 3.10% | 100% |

The offline oracle would skip 80.69% of tests. NameRTS's mean precision among selected test files is 66.65%, versus 24.25% for BabelRTS. Its two unsafe commits are informative: cached shared state in `pylint` hid a critical-function invocation when the isolation mechanism could not run there; an external `docutils` callback into `sphinx` was absent from the analyzed project graph. This is **not** a proof of perfect safety. BabelRTS's apparent 97.63% reduction on Matplotlib accompanies only a 14% safe rate, an excellent example of why savings must be paired with missed-test measurement.

Instrumentation, per-commit selection, and one-time initialization cost **4.45%**, **3.22%**, and **2.38%** of full-suite time, respectively—10.04% combined. The initial cost amortizes after about five commits on average. Disabling runtime critical-function pruning reduces test reduction from 69.90% to 48.46% and time reduction from 45.59% to 30.47%; disabling name-element matching has smaller but real effects (68.33% and 42.49%). Larger N beyond 500 keeps skipping some additional files but eventually loses runtime savings to monitoring overhead.

## Analyst Takeaways

1. **Use selective tests as a fast feedback tier, not a correctness certificate.** This paper's strongest selector still missed affected files on two commits. For agent-authored changes, keep a full-suite gate before accepting or merging consequential patches, especially where callbacks, plugins, shared state, or dynamic execution are involved.
2. **Put an affected-test recall gate beside any CI time metric.** A faster run that misses failures is not a net quality gain. Benchmark the selector against real changed-code/test reachability and inspect every unsafe case.
3. **Python dependency granularity matters.** A conservative file graph is effectively all-tests under eager importing; names plus runtime observations offer a better savings/safety frontier without claiming precise static call resolution.
4. **Make initialization and isolation explicit in the cost model.** Running one full suite to prime the selector and separately executing tests can erase savings in short-lived branches or suites that cannot isolate state.
5. **Have an escape hatch for unmodeled dynamics.** `eval`, `exec`, external callbacks, plugin loading, fixture behavior, and import side effects should trigger conservative fallbacks when the selector cannot bound their impact.

## Questions and Limitations

- The safety ground truth follows instrumented modified functions and resolved references with manual inspection of import-time invocations; it is a carefully constructed proxy, not proof of every possible behavioral dependence.
- The study covers pytest-based projects and 50 consecutive commits per project, selected to build and run successfully; other CI histories, tests that mutate shared services, and differently structured repositories may behave differently.
- `pylint` cannot use the test-file isolation deployed elsewhere, revealing how fragile previously observed runtime dependencies can be when the environment changes.
- Reflective `eval`/`exec`, external library callbacks, and special Python runtime patterns are not fully modeled. The paper's 99.6% safe rate is empirical and should never be described as universal safety.
- No coding agent is evaluated. The value to a software factory is an inferred CI design application, not an observed gain in agent patch correctness or developer throughput.

## Vault Ideas Extracted

* [Safety-Constrained Regression Test Selection](/vault/safety-constrained-regression-test-selection.md)
