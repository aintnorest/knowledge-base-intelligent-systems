---
type: Study Note
title: Reducing Token Usage of State-in-Context Agents using Minification
description: Personal study notes on Hrubec and Cito's replication of DirectSolve and its evaluation of Python-code minification as a repair-context cost reduction technique.
resource: https://arxiv.org/abs/2606.01326v1
source: /archive/minified-state-in-context-agents.pdf
tags: [coding-agents, token-efficiency, context-engineering, agents]
timestamp: 2026-07-14T16:02:37Z
---

# Reducing Token Usage of State-in-Context Agents using Minification - Study Notes

**Authors**: Nicolas Hrubec and Jürgen Cito (TU Wien)
**Venue**: arXiv:2606.01326v1 [cs.SE]
**Date**: May 31, 2026
**Code**: https://github.com/ipa-lab/minified-state-in-context-agent

## What It Is

This paper independently re-implements the tool-free **DirectSolve** state-in-context repair agent, then asks whether code itself can be made cheaper context without making repository repair unusable. The agent first ranks repository files from an issue description, packs the top files into a repair prompt, and emits a single SEARCH/REPLACE patch. Rather than shortening an interaction trace, the intervention transforms retrieved Python source before that repair call.

The authors reproduce the headline DirectSolve result with a cost-controlled implementation: GPT-5-mini resolves 252 of 503 SWE-bench Verified tasks (50.0% pass@1) without minification. They then apply combinations of formatting, documentation, identifier, and import transformations to the code presented to the model.

## Why Minify the Repair Context

Prompt analysis finds that the repair-stage source code accounts for about 91.8% of the agent's tokens; ranking is 8.0% and repair instructions 0.2%. Their key systems claim is therefore narrow and actionable: when a workflow's dominant input is code, reducing code representation can matter more than trimming its natural-language wrapper.

This differs from trajectory reduction. DirectSolve has little tool-loop history to compact; it pays to insert a wide repository snapshot once. The paper treats context representation as a separate optimization surface from file selection and model choice.

## Transformation and Patch Pipeline

The evaluated transformations include:

1. Removing blank lines and whitespace around operators.
2. Removing comments and docstrings.
3. Reducing indentation width (**dedent**).
4. Replacing variable, function, or class identifiers with shorter aliases, either without a mapping or with an in-prompt alias-to-original lookup table.
5. Merging imports into a synthetic de-duplicated file or removing imports.

The agent still must patch the original repository. For identifier mappings, it reverses aliases in generated SEARCH and REPLACE blocks. Its matcher tolerates formatting, comment, and docstring differences between the minified search block and original file. It does **not** reverse formatting in the replacement text, so a successful semantic edit can still introduce unintended formatting changes.

Dedentation exposes the important interface constraint: input code can use reduced indentation, but the output patch must conform to the original four-space convention. The authors add an explicit instruction, yet models sometimes emit malformed indentation and produce invalid Python patches.

## Results That Matter

On the full SWE-bench Verified benchmark with GPT-5-mini, the paper's minified configuration (excluding dedent) reduces average repair input from 90,535 to 52,776 tokens: **42% lower input context**. Resolution falls from **50.0% (252 tasks)** to **38.0% (188 tasks)**, a 12-point absolute loss. Because the authors attribute about 93% of repair cost to input tokens, the input reduction largely becomes a cost reduction for their setup.

The trade-off appears across reported difficulty buckets: input reduction is about 39.4%–42.8%, while resolution declines by 10–17 points where the baseline resolves any tasks. Repository-level outcomes vary more: `psf/requests` falls from 75% to 25%, while `pydata/xarray` falls only from 45% to 41%.

On a 100-instance GPT-4.1 ablation, removing docstrings has the largest individual token reduction (87,325 to 68,202 average input tokens) and reduces resolution from 46% to 43%. Dedent is the conspicuous failure mode: it reaches 84,754 input tokens but only 36% resolution; stacked transformations with dedent reach 27% versus a 47% uncompressed baseline in that subset. The authors' instance inspection attributes many of those losses to syntactically invalid patch indentation, not simply to lost code meaning.

## Analyst Takeaways

1. **Measure the dominant context component before optimizing.** A state-in-context repair agent should first separate ranking, instructions, selected code, and output tokens; broad prompt compression is a poor substitute for finding the actual cost center.
2. **Treat context transformation and output generation as a coupled protocol.** A transformation is viable only if search, patch rendering, reversal, formatting, and validation bridge it back to the canonical artifact.
3. **Preserve semantic cues selectively.** Comments and docstrings are removable runtime-wise but can still explain intent; alias maps retain names at an extra token cost. Their value must be measured per task, not assumed from language semantics alone.
4. **Use loss budgets, not token savings alone.** A 42% input reduction accompanied by a 12-point repair loss is a deployment choice, not an unqualified optimization. Segment by repository and task type, keep an unminified fallback, and measure task success plus total cost.

## Questions and Limitations

- The work evaluates one code-heavy, single-call repair architecture; it does not establish the same trade-off for tool-using coding agents, retrieval systems, or non-code context.
- Its DirectSolve implementation is a clean-room replication with deliberate differences: trie-style repository ranking input, a 100k repair cap, no majority voting, and up to five resamples for invalid patches. The near-equal headline score supports qualitative replication, not equivalence of every design choice.
- File selection is stochastic and can change token counts; the authors do not repeatedly fix selection for each configuration, so small differences need caution.
- Test-passing SWE-bench outcomes do not prove that a patch fully matches developer intent, and replacement formatting is not restored after minification.
- The reported OpenAI-token proxy and API prices are configuration-specific. Validate with the target tokenizer, model, code style, patch format, cache behavior, and quality target.

## Vault Ideas Extracted

* [Code Context Minification](/vault/code-context-minification.md)
