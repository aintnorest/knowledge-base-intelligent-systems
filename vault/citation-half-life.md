---
type: Synthesis
title: Citation Half-Life
description: Treating a document's citation rate in AI-generated answers as a decaying quantity — with content held constant — and the operating consequences of measuring visibility as decay rather than accrual.
tags: [retrieval, evaluation, provenance, reliability]
timestamp: 2026-08-11T20:53:27Z
---

# Citation Half-Life

Citation half-life (`t½`) is the expected time for a document's citation rate in generative AI answers to fall to half its initial value **with the document itself unchanged**. It reframes visibility in AI search as a decaying quantity rather than an accrued position.

## Why Citations Decay

The document is static; the system around it is not. Four mechanisms push the rate down independently:

1. **Model updates** — retraining or fine-tuning shifts what the model recalls and prefers.
2. **Retrieval index refresh** — re-crawling and re-embedding change which candidates are even eligible.
3. **Competing content entry** — newer documents displace the page in a fixed-size retrieved set.
4. **Content staleness** — recency signals and dated claims lower the page's fit for the same query.

Reported modifiers: platforms decay at different rates because they refresh on different cadences; fast-moving domains (technology, finance) decay faster than stable ones (legal, regulated, academic); and first-party pages decay faster than established third-party publications, which are propped up by persistent inbound authority.

## Operating Consequences

- **Decay is a property of the system, not an execution failure.** Falling citations after a successful content push are the expected trajectory, not evidence that the work was wrong.
- **Monitor on a cadence derived from the decay rate**, not from campaign milestones. Alert on rate drops and framing shifts rather than reviewing quarterly.
- **Refresh beats replace.** Updating an established page is usually cheaper than publishing a new one, because a new page faces a compound cold start: no citation history, no inbound authority, no indexing head start.
- **Budget for maintenance, not just production.** If visibility half-lives, a content portfolio has an ongoing carrying cost proportional to the number of pages you want to keep cited.

## Limitations

The concept is currently a useful metaphor with weak measurement behind it. Published estimates of `t½` are scarce and generally rest on practitioner observation rather than controlled study. A single decay constant also conflates the four mechanisms above, which have different remedies — a page losing citations to model refresh needs different action than one losing them to a better competitor. Estimating it properly requires holding content genuinely constant, sampling repeatedly against a nondeterministic system, and recording model version and surface at every observation; otherwise measured "decay" may be sampling noise or a platform change. Treat exponential decay as a first-order fit, not an established law: step changes at model releases are at least as plausible as smooth decay.

## Sources

- [Answer Engine Optimization: A Measurement Framework](/dossiers/answer-engine-optimization-measurement-framework.md) — introduces citation half-life, lists platform/industry/source-type modifiers, and argues for continuous optimization over one-time audits; acknowledges the concept is not empirically validated.
