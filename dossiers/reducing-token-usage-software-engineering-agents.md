---
type: Study Note
title: Reducing Token Usage of Software Engineering Agents
description: Study notes on Hrubec's diploma thesis evaluating source-code minification in a state-in-context software-repair agent, including its token savings, repair-quality trade-off, and transformation-induced patch failures.
resource: https://doi.org/10.34726/hss.2025.136382
source: /archive/reducing-token-usage-software-engineering-agents.pdf
tags: [coding-agents, token-efficiency, context-engineering, agents]
timestamp: 2026-07-14T16:07:15Z
---

# Reducing Token Usage of Software Engineering Agents — Study Notes

**Author**: Nicolas Hrubec
**Institution**: Technische Universität Wien, Diploma Thesis
**Date**: November 12, 2025
**Pages**: 76
**DOI**: [10.34726/hss.2025.136382](https://doi.org/10.34726/hss.2025.136382)

## What It Is

This thesis tests a direct proposition for repository-scale repair agents: before placing source files in an LLM's repair prompt, minify the code while preserving executable semantics. It reimplements the DirectSolve state-in-context agent, evaluates it on SWE-bench Verified, and contrasts a raw-code baseline with transformations that remove or shorten lexical material.

The intervention is deliberately lighter-weight than learned prompt compressors. It targets code that the agent already selected for repair, using blank-line and operator-whitespace reduction, removal of comments, docstrings, and imports, indentation reduction, and identifier shortening. The core contribution is empirical rather than a claim of lossless agent reasoning: substantial input-token savings are possible, but every transformation must be judged by end-task repair success and patch validity.

## Why Code Context Is the Target

The agent first ranks repository files, then aggregates files up to a fixed 100,000-token repair budget and produces one SEARCH/REPLACE patch, with up to five resamples when patch creation fails. In the preliminary prompt analysis, repair code accounts for 91.8% of tokens, compared with 8.0% for ranking and 0.2% for repair instructions. In the repository analysis, identifiers, string literals, comments, and whitespace are large lexical contributors; function calls, assignments, and method signatures dominate the structural view.

That diagnosis matters because it separates two costs. A compact repository representation can reduce ranking overhead, but it does not address the much larger repair-context payload. The thesis therefore uses a trie of paths for ranking—about 48% lower ranking cost than a flat list, with recall falling from 90.56% to 87.67%—and reserves code minification for the repair stage.

## Transformation and Patch Pipeline

1. Exclude test, build, benchmark, and documentation files before context aggregation, then rank the remaining repository with a trie representation.
2. Apply selected source transformations before constructing the repair prompt. Comment/docstring removal and whitespace reductions leave Python behavior unchanged; identifier shortening can preserve names through a source map; import removal is applied last because it prevents later AST parsing.
3. Ask the model to produce SEARCH/REPLACE blocks against the transformed code.
4. Match the transformed SEARCH block to the original file with a matcher tolerant of whitespace, comment, and docstring changes. Reverse identifier aliases in both blocks before applying a patch.
5. Restore the original repository after extracting the diff, then measure official SWE-bench resolution, tokens, and price-based cost.

This is not full reversibility. The implementation reverses identifiers, but normally applies minified replacement text directly to the original source, which can introduce nonfunctional formatting changes. It also relies on test success rather than proving that a generated patch matches developer intent.

## Results That Matter

On the full SWE-bench Verified evaluation with GPT-5-mini, the compressed configuration reduced mean repair input from 90,535 to 52,776 tokens: a **42%** reduction. Resolution fell from **50.0%** (252 tasks) to **38.0%** (188 tasks), a 12-percentage-point reduction. The full compression run omitted dedenting because that transformation was particularly damaging.

The 100-instance ablations explain the trade-off. Removing docstrings produced the largest single input reduction (87,325 to 68,202 tokens) and the lowest reported per-instance cost ($0.1475 versus $0.1867 baseline), while resolution decreased from 46% to 43%. Removing comments reached 77,849 input tokens with 45% resolved; reducing operator whitespace reached 80,132 with 41%. Identifier shortening and import changes gave smaller or mixed benefits. Supplying an identifier source map did not improve the tested result: the no-map renaming variants averaged 47.33% resolution versus 45.33% with maps, at nearly identical cost.

Dedenting was the decisive counterexample. Alone it reduced resolution to 36%; when added to stacked transformations, resolution dropped from 47% to 27% in the ablation. Failure inspection traced this chiefly to invalid patch indentation, despite instructions to emit four-space Python indentation. The model's patch could apply cleanly yet leave an `IndentationError`, showing that a semantics-preserving input transformation can still fail at the representation boundary between model output and the original program.

## Analyst Takeaways

1. **Measure the dominant prompt component before optimizing.** In this agent, reducing rank-path verbosity was useful but secondary to reducing repair-code context. Token accounting by stage prevents an attractive local optimization from receiving disproportionate engineering effort.
2. **Use removable code text as a tested budget lever, not assumed noise.** Comments and docstrings can be runtime-irrelevant yet still help an LLM understand intent. Their value is an empirical question tied to the repair task, model, and benchmark.
3. **Treat transformations as interfaces, not just preprocessors.** An agent that reads transformed code but must patch original code needs source maps, robust matching, format normalization, and syntax checks. A transformation's safety for execution does not establish safety for model-mediated editing.
4. **Report success, tokens, failures, and total cost together.** A 42% input reduction is meaningful, but its 12-point resolution loss changes whether it is appropriate for a workload. Cost claims also depend on model pricing, selected files, retries, and output-token behavior.

## Questions and Limitations

- The results come from one custom state-in-context agent, a 100,000-token repair cap, SWE-bench Verified, and two OpenAI models. They do not demonstrate the same frontier for tool-loop, retrieval-first, or non-Python agents.
- LLM sampling and file selection vary between runs. The thesis reports broad trends but does not hold the selected repair context fixed or average repeated runs for every configuration.
- Test-passing is the primary outcome; it may accept plausible patches that do not solve the developer's intended root cause or introduce untested side effects.
- Directly applying transformed replacement text creates style artifacts, and dedenting can create invalid syntax. A formatter or explicit source map for every transformation could improve this boundary but was not evaluated.
- The work's published 2026 arXiv extension has a related but different title; this dossier records the 2025 TU Wien diploma thesis identified by its own DOI.

## Vault Ideas Extracted

* [Code-Context Minification](/vault/code-context-minification.md)
* [Transformation-Aware Patch Application](/vault/transformation-aware-patch-application.md)
