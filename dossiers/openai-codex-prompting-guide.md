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
**Artifact**: Archived prose notebook without executable results

## What It Is

This is an implementation guide for people building a coding-agent harness directly on the Responses API rather than using the Codex SDK. Its useful object is not generic prompt-writing advice. It is a coupled configuration for a particular model family: a supplied system prompt, model-familiar tool shapes, conversation-history rules, repository-instruction loading, compaction, and a protocol for distinguishing working updates from the final answer.

The guide's central claim is that harness details are part of model performance. It recommends starting from the Codex CLI rather than transplanting a prompt and tools tuned for another model or provider. Its recommendations are scoped to the named model generation, not portable defaults.

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

For `gpt-5.3-codex`, the recommendation reverses: concise working updates can be prompted, provided the harness preserves the protocol distinction between intermediate assistant messages and final answers across later requests. Losing that distinction during history reconstruction is said to significantly degrade performance.

The later-generation guidance treats updates as short, purposeful progress reports rather than a stream of tool logs. The collaboration style can vary independently of whether the harness preserves the working/final boundary.

The practical lesson is not "always narrate" or "never narrate." Preamble behavior is a model-and-protocol feature. On older Codex versions, prompt-driven updates are a stopping hazard; on 5.3, phase-aware updates are supported, but only when the harness preserves the classification that separates commentary from final closure. The broad migration paragraph still says to remove preambles without explicitly scoping that instruction to older models, so implementers must resolve the editorial tension using the later, version-specific section.

## Tool and Harness Design

The guide strongly prefers interfaces close to Codex's training distribution:

1. Familiar editing, shell, planning, and image-inspection interfaces can reduce friction relative to novel tool shapes; capabilities and invocation contracts should match the actual host.
2. Custom search and external tools need semantically distinct names and observable result formats so the model can distinguish their evidence from other channels.
3. Independent tool calls can run together, but the conversation history must preserve each call's association with its output.

Tool results are also a context-design surface. As of the ingest date, the guide recommended a fixed-size output budget and retained the beginning and end while marking an omitted middle. This protects context at the cost of potentially hiding task-critical evidence; no universal cutoff is established.

The example itself is a freshness warning: its editing demonstration invokes an older model than the one targeted by the surrounding prose. Copying examples mechanically can select a different model from the intended deployment.

## How AGENTS.md Becomes Context

Codex CLI assembles repository instructions from broader to more local scopes along the working-directory path. Later, deeper instructions take precedence, subject to discovery rules and a size limit.

Each discovered instruction is injected as a separate user-role message rather than merely concatenated with its neighbors. This makes precedence a context-assembly behavior: changing working directory can change the effective prompt, and a compatible harness must preserve scope, order, role, override behavior, and limits.

## Compaction and Long Runs

Compaction carries a compressed representation of accumulated conversation into later requests, but the conversation submitted for compaction must itself fit within the context window. The feature extends a trajectory; it does not make context limits disappear.

The guide presents compaction as first-class support for multi-hour runs, but supplies no retention benchmark or failure analysis. A production harness should test repeated compaction on exact repository facts, pending obligations, tool state, and decisions that become relevant much later.

## Analyst Takeaways

1. **Version the model, prompt, tools, and history protocol together.** Later-generation preambles depend on preserving the distinction between working updates and final answers; a prompt-only migration is incomplete.
2. **Treat the starter prompt as executable configuration.** It contains real policy choices about autonomy, stopping, concurrency, edits, reviews, frontend quality, and final delivery. Adapt each choice intentionally and evaluate the resulting system rather than collecting isolated slogans.
3. **Match learned interfaces before inventing abstractions.** Familiar editing and terminal tools, call/output ordering, and distinctive custom-tool results all assume interface shape changes model behavior.
4. **Repository instruction files are scoped prompt layers.** Root-to-leaf loading gives local directories a deliberate override channel, but correctness depends on faithfully reproducing discovery and injection semantics.
5. **Resolve contradictory instructions before deployment.** Dirty-tree tolerance versus "stop immediately," and global preamble removal versus 5.3 preamble prompting, can produce unstable behavior if both branches remain unconditional.
6. **Tune with behavioral evaluations, not prompt aesthetics.** The guide recommends repeated metaprompting for recurring slow-start or awkward-update failures, then measuring candidate instruction changes on an evaluation rather than accepting one self-diagnosis.

## Questions and Limitations

- This is a living vendor cookbook page with no visible publication date, revision identifier, changelog, or frozen target. The archived notebook is a point-in-time capture; model names, APIs, prompt text, and recommendations can change at the canonical URL.
- The guide says the prompt was optimized on internal evaluations but provides no tasks, baselines, scores, variance, safety slices, or ablations. Claims of significant degradation from lost message classification are operationally important but not independently quantifiable from this artifact.
- The target prose addresses a later Codex generation than the starter prompt's origin and the editing example's invocation. Advice should not be assumed to transfer backward, forward, or to general GPT-5 models.
- The prompt contains environment- and tool-name-specific instructions. Copying it into a harness without the named tools, message roles, concurrency support, or file-reference behavior creates instructions the model cannot faithfully follow.
- The captured truncation budget and middle-elision strategy are recommendations, not evaluated universal bounds; exact outputs, errors, or evidence near the omitted middle may be task-critical.
- Compaction is described functionally but not evaluated across repeated cycles, delayed recall, or recovery of details discarded from the active history.
- The metaprompting advice acknowledges that model-proposed fixes can overfit one conversation. Multiple generations and a representative evaluation are required before turning a diagnosis into durable policy.

## Vault Ideas Extracted

* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Prompt-Model Drift](/vault/prompt-model-drift.md)
* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
* [Repeated-Compaction Evaluation](/vault/repeated-compaction-evaluation.md)
