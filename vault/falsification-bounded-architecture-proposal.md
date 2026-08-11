---
type: Synthesis
title: Falsification-Bounded Architecture Proposal
description: Publishing an unvalidated system design with its claim boundary, falsification conditions, matched baseline ladder, and reproducibility protocol stated up front, so the proposal is readable as a hypothesis rather than a result.
tags: [evaluation, verification, governance, reliability]
timestamp: 2026-08-11T20:53:50Z
---

# Falsification-Bounded Architecture Proposal

A discipline for writing up a system design that has not been measured. Instead of presenting an architecture as if adoption were justified, the write-up states what is being claimed, what evidence would refute it, which simpler alternatives must be beaten, and what a future empirical paper would have to release. The design stays useful as a hypothesis while remaining honest that it is one.

This is a genre discipline, not an evaluation method. It governs what a document asserts, not how a system is tested.

## What the Write-Up Must Contain

1. **A narrow central claim.** One sentence naming the specific thing being asserted — not the general area the work touches. Broad framing ("memory matters") is unfalsifiable and therefore not a claim.
2. **An explicit claim boundary.** Which components are borrowed rather than contributed, and what the paper is *not* asserting. Related work sections usually establish novelty; a claim boundary establishes the opposite, and that is the part readers need.
3. **Falsification conditions.** The conditions under which the claim would be wrong or would have to narrow, written by the author before any result exists. These should be reachable by a reasonable experiment, not rhetorical.
4. **A matched baseline ladder.** Ordered comparators from the simplest credible alternative up to the full proposal, with the budget held equal across rungs. The most informative rung is usually the one immediately below the full system, because it isolates whether the distinguishing mechanism earns its cost.
5. **Metrics chosen before results.** Including the costs — latency, token spend, storage, human review time — not only the quality axes the design is expected to win on.
6. **A reproducibility protocol.** What a future empirical paper would publish or escrow: data or generator, schemas, versions, seeds, protocols, per-item traces, negative cases such as rejected candidates, and per-stratum rather than only aggregate metrics.
7. **A stated evidence status.** An unambiguous line saying no measurements are reported, and naming what is *not* released — thresholds, datasets, production implementation.
8. **Failure modes and dual use.** The risks the design itself creates, including the ways it could be misused if it works.

## Why It Helps

Architecture proposals accumulate influence through citation long before anyone tests them, and a design described confidently is read as a design that works. Pre-committing to falsification conditions and a baseline ladder makes the proposal cheap to check and hard to over-claim from. It also does real work for the reader deciding whether to build on it: the ladder tells them what to implement first, and the falsification conditions tell them what to measure to find out whether they should continue.

For the author it constrains scope creep. A design that cannot name what would refute it usually has not isolated its own mechanism.

## Practical Use

- Apply the same reading protocol to incoming proposals: find the narrow claim, the omitted rung of the baseline ladder, and the evidence status. A proposal missing all three is a framing contribution at best.
- When adopting a proposed architecture internally, implement the baseline ladder rather than the top rung. The intermediate rungs are the cheap way to discover the mechanism does not pay.
- Separate the framing from the machinery when borrowing. A useful conceptual distinction can survive even when the proposed implementation is impractical.

## Limitations

- Self-stated falsification conditions can be chosen to be easy to survive. They constrain the author only as much as the author allows.
- Rigorous framing is frequently mistaken for evidence; a well-structured proposal with zero measurements can be cited as though it were validated.
- The discipline says nothing about whether the design is any good. It makes the claim checkable, not correct.
- Reproducibility protocols promised for a future paper are commitments, not artifacts, and often go unredeemed.

## Sources

- [Causal Influence Control for Persistent Memory dossier](/dossiers/causal-influence-control-persistent-memory.md) — states a one-sentence central claim, its own falsification conditions, a five-rung matched baseline ladder, pre-committed metrics, a reproducibility escrow list, and an explicit declaration that no benchmark measurements are reported.
