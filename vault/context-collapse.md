---
type: Synthesis
title: Context Collapse
description: Failure mode where iterative LLM rewriting compresses accumulated context into a shorter, less informative artifact and erases useful knowledge.
tags: [compaction, context-engineering, agent-memory, agents]
timestamp: 2026-07-12T19:02:08Z
---

# Context Collapse

A failure mode in context adaptation where a model rewrites an accumulated context into a much shorter summary, dropping the concrete details that made the context useful.

## The Pattern

1. A system accumulates useful task knowledge over many iterations.
2. An LLM is asked to rewrite or summarize the entire context.
3. The rewrite favors concision and abstraction.
4. Specific rules, schemas, edge cases, and failure modes disappear.
5. Downstream performance drops because the model no longer has the detailed operational knowledge it relied on.

## Why It Happens

LLMs are often trained and prompted to summarize, compress, and remove apparent redundancy. That behavior is helpful for human-readable notes, but harmful when the context is serving as executable guidance for an agent or domain reasoner.

## How To Avoid It

- Store context as itemized entries rather than one monolithic prompt.
- Apply local delta updates instead of full rewrites.
- Use deterministic merge logic where possible.
- Keep metadata for entries, such as helpful/harmful counts.
- Run de-duplication as a pruning step, not as an unrestricted rewrite.

## Sources

- [Agentic Context Engineering dossier](/dossiers/agentic-context-engineering.md) - reports an AppWorld example where a useful 18k-token context collapsed to 122 tokens and performance fell below the no-context baseline.
- First-party, GSL resume pipeline (`gsl` repo, `docs/resume-prompt-decisions.md`, the 2026-08-18 V2y entries) - the confirming counter-case: a four-prompt production restructure that cut 2,410 lines to 1,935 requalified 20/20 fixtures with zero fixture repairs, because it was done as an itemized conservation ledger - every normative statement inventoried, then carried, moved, or dropped with a named reason - rather than as a rewrite. The ledger is why nothing was silently shed at a 20% length reduction. Its residue is instructive too: the three requalification failures were losses of rule *encoding* (position, match precision, direction), not of rule text, which a text-level ledger cannot see. See [[prompt-rule-identity]].
