---
type: Study Note
title: Codex Prompting Guide
description: OpenAI's model-specific field guide for building a GPT-5.3-Codex coding-agent harness, including its full starter prompt, tool interfaces, instruction loading, compaction, and phase-aware user updates.
resource: https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide
source: /archive/openai-codex-prompting-guide.ipynb
tags: [agents, coding-agents, agent-harness, prompting, tool-use, context-engineering]
timestamp: 2026-09-14T17:12:04Z
---

# Codex Prompting Guide - Study Notes

**Publisher**: OpenAI  
**Canonical URL**: https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide  
**Target model**: `gpt-5.3-codex`  
**Artifact**: Jupyter notebook containing one 687-line Markdown cell; it has no code cells, execution counts, or captured outputs

## What It Is

This is an implementation guide for people building a coding-agent harness directly on the Responses API rather than using the Codex SDK. Its useful object is not generic prompt-writing advice. It is a coupled configuration for a particular model family: a supplied system prompt, model-familiar tool shapes, conversation-history rules, repository-instruction loading, compaction, and a protocol for distinguishing working updates from the final answer.

The guide's central claim is that harness details are part of model performance. It recommends starting from the Codex CLI rather than transplanting a prompt and tools tuned for another GPT-5 model or another provider. The current page names `gpt-5.3-codex` as the API target and recommends medium reasoning effort for interactive work, with high or xhigh reserved for difficult tasks.

## The Supplied Prompt Artifact

The notebook includes the full recommended starter prompt, derived from the GPT-5.1-Codex-Max prompt and further tuned on OpenAI's internal evaluations for correctness, completeness, quality, tool use, parallelism, and bias to action. It is a concrete artifact to adapt, not merely a list of principles.

Its major instruction blocks establish the following behavior:

- Prefer dedicated tools to raw terminal commands, use fast lexical search, parallelize independent reads, and interpret tool-added line-number prefixes as metadata.
- Act autonomously: gather context, plan, implement, test, and refine in one rollout; make reasonable assumptions instead of stopping for routine clarification.
- Favor correctness, codebase conventions, comprehensive wiring, explicit errors, type safety, reuse, and root-cause fixes over locally successful hacks.
- Preserve unrelated work in a dirty tree, avoid destructive Git operations, make coherent edits, and keep comments rare and useful.
- Batch exploration reads, use a plan only when the task warrants one, and close every plan item before the final response.
- Apply specialized policies for reviews, frontend work, and concise final answers with clickable file references.

This breadth is deliberate: the prompt governs the whole work trajectory, not just answer phrasing. The strongest reusable sections are autonomy and persistence, exploration discipline, tool selection, implementation quality, and delivery closure. The frontend block is unusually opinionated, explicitly rejecting generic typography, flat backgrounds, interchangeable layouts, and unfinished responsive behavior.

There is also one sharp internal edge: the prompt first explains how to coexist with a dirty worktree, then says to stop immediately whenever unexpected changes appear. Those rules need harness-local reconciliation; literal application can turn normal concurrent activity into a needless blocker.

## Planning and Preamble Reversal

The guide preserves two generations of advice that must be keyed to model version and API protocol.

Early migration guidance says to remove requests for upfront plans, preambles, and rollout status updates because they can make Codex stop after talking instead of completing the task. The mid-rollout section narrows this: before `gpt-5.3-codex`, updates are system-generated, so prompt instructions about intermediate messages should be omitted.

For `gpt-5.3-codex`, the recommendation reverses. The model can be prompted for concise preambles and the Responses API supplies an assistant-only `phase` field with `null`, `commentary`, or `final_answer`. A correct harness must persist assistant output items with their phase and send them back in later requests. Dropping that metadata during history reconstruction is said to cause significant performance degradation.

The 5.3 preamble recipe is specific: acknowledge and sketch the plan before tools, keep most updates to one or two sentences, update every one to three execution steps and at least every six steps or ten tool calls, report outcomes and the next few actions, and avoid log-like status prose. Friendly and pragmatic personalities then tune the collaboration style separately from cadence.

The practical lesson is not "always narrate" or "never narrate." Preamble behavior is a model-and-protocol feature. On older Codex versions, prompt-driven updates are a stopping hazard; on 5.3, phase-aware updates are supported, but only when the harness preserves the classification that separates commentary from final closure. The broad migration paragraph still says to remove preambles without explicitly scoping that instruction to older models, so implementers must resolve the editorial tension using the later, version-specific section.

## Tool and Harness Design

The guide strongly prefers interfaces close to Codex's training distribution:

1. Use the Responses API's built-in `apply_patch` tool when possible. A custom freeform patch tool with a context-free grammar is the alternative, and the notebook supplies both a Python request example and the patch grammar.
2. Expose a `shell_command` whose command is a string and whose description requires a working directory instead of `cd`. For PowerShell, describe the actual invocation shape explicitly; long-lived PTY execution and stdin are separate capabilities.
3. Give plans a structured `update_plan` tool with bounded statuses and at most one active step. Provide image inspection as an explicit path-taking tool.
4. Dedicated terminal-wrapping tools can work well when names, arguments, and outputs resemble the underlying command. A prompt directive can reserve operations such as Git for the dedicated tool.
5. Less familiar tools such as semantic search and MCP require tuning: use semantically exact names and arguments, explain when and why to call them, include good and bad examples, and make their result format distinguishable from other search channels.
6. Enable parallel tool calls in the request, prompt the model to batch independent exploration, and order the conversation items as calls followed by their corresponding outputs.

Tool results are also a context-design surface. The guide recommends an approximate 10,000-token cap, estimated from bytes, retaining half the budget from the beginning and half from the end while marking the omitted middle. That is a useful model-specific default, not evidence that the same cutoff is optimal for every task or tool.

The code example itself is a freshness warning: although the guide currently targets `gpt-5.3-codex`, its `apply_patch` demonstration still calls `gpt-5.1-Codex-Max`. Copying examples mechanically can therefore select a different model from the one the prose recommends.

## How AGENTS.md Becomes Context

Codex CLI does more than read one repository prompt. It discovers instruction files from `~/.codex`, then from the repository root through each directory on the path to the current working directory, subject to fallback names and a size cap. Later, deeper directories override earlier guidance.

Each discovered file is injected near the top of history as a separate user-role message, in root-to-leaf order, with a header naming the directory that supplied it. An `AGENTS.override.md` capture still uses the ordinary `AGENTS.md instructions for <directory>` header. This makes instruction precedence a context-assembly behavior, not merely a filesystem convention: changing the working directory can change the effective prompt, and any third-party harness that wants Codex CLI parity must reproduce discovery, order, message role, headers, overrides, and limits rather than simply concatenating files.

## Compaction and Long Runs

The Responses API compaction flow accepts the accumulated conversation, including user messages, assistant messages, and tool items, and returns an `encrypted_content` compaction item to carry into later requests. The input to `/responses/compact` must still fit the model's context window. The feature extends a trajectory; it does not make context limits disappear.

The guide presents compaction as first-class support for multi-hour runs, but supplies no retention benchmark or failure analysis. A production harness should test repeated compaction on exact repository facts, pending obligations, tool state, and decisions that become relevant much later.

## Analyst Takeaways

1. **Version the model, prompt, tools, and history protocol together.** `gpt-5.3-codex` preambles depend on preserved `phase` metadata; a prompt-only migration is incomplete.
2. **Treat the starter prompt as executable configuration.** It contains real policy choices about autonomy, stopping, concurrency, edits, reviews, frontend quality, and final delivery. Adapt each choice intentionally and evaluate the resulting system rather than collecting isolated slogans.
3. **Match learned interfaces before inventing abstractions.** The recommendations for `apply_patch`, command strings, familiar terminal-like schemas, call/output ordering, and distinctive custom-tool outputs all assume that interface shape changes model behavior.
4. **Repository instruction files are scoped prompt layers.** Root-to-leaf loading gives local directories a deliberate override channel, but correctness depends on faithfully reproducing discovery and injection semantics.
5. **Resolve contradictory instructions before deployment.** Dirty-tree tolerance versus "stop immediately," and global preamble removal versus 5.3 preamble prompting, can produce unstable behavior if both branches remain unconditional.
6. **Tune with behavioral evaluations, not prompt aesthetics.** The guide recommends repeated metaprompting for recurring slow-start or awkward-update failures, then measuring candidate instruction changes on an evaluation rather than accepting one self-diagnosis.

## Questions and Limitations

- This is a living vendor cookbook page with no visible publication date, revision identifier, changelog, or frozen target. The archived notebook is a point-in-time capture; model names, APIs, prompt text, and recommendations can change at the canonical URL.
- The guide says the prompt was optimized on internal evaluations but provides no tasks, baselines, scores, variance, safety slices, or ablations. Claims of significant degradation from missing `phase` metadata are operationally important but not independently quantifiable from this artifact.
- The target prose is `gpt-5.3-codex`, while the starter prompt originated with GPT-5.1-Codex-Max and the patch example still invokes that older model. Advice should not be assumed to transfer backward, forward, or to general GPT-5 models.
- The prompt contains environment- and tool-name-specific instructions. Copying it into a harness without the named tools, message roles, concurrency support, or file-reference behavior creates instructions the model cannot faithfully follow.
- The 10,000-token truncation rule and middle-elision strategy are presented as recommendations, not evaluated universal bounds; exact outputs, errors, or evidence near the omitted middle may be task-critical.
- Compaction is described functionally but not evaluated across repeated cycles, delayed recall, or recovery of details discarded from the active history.
- The metaprompting advice acknowledges that model-proposed fixes can overfit one conversation. Multiple generations and a representative evaluation are required before turning a diagnosis into durable policy.

## Vault Ideas Extracted

* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Prompt-Model Drift](/vault/prompt-model-drift.md)
* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
* [Repeated-Compaction Evaluation](/vault/repeated-compaction-evaluation.md)
