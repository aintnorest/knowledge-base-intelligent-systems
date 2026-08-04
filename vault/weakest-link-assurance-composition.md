---
type: Synthesis
title: Weakest-Link Assurance Composition
description: Licensing a deployment-facing claim no more strongly than its weakest necessary evidence dimension, so improvements target real assurance bottlenecks rather than inflate aggregate scores.
tags: [reliability, evaluation, verification, governance]
timestamp: 2026-07-14T16:26:53Z
---

# Weakest-Link Assurance Composition

Many evaluation dimensions matter jointly. If a deployment claim requires realistic timing, representative coverage, containment, observability, transfer evidence, and an auditable record, strength in five dimensions cannot repair absence in the sixth. Weakest-link assurance composition therefore licenses a claim at no more than the strength of its weakest *necessary* evidence dimension.

## Method

1. Write the intended claim in operational terms: system, property, deployment context, decision, and consequence of being wrong.
2. Identify the evidence dimensions whose failure would independently invalidate that claim. Depending on the context, these can include fidelity, coverage, observability, containment, timing, network behavior, human intervention, attack/fault coverage, transfer, reproducibility, and governance.
3. Rate each dimension from preserved evidence, not product features or assertions. Treat unknown evidence as a blocker for licensing the claim.
4. Set the claim's licensed strength to the lowest necessary rating. Retain the individual ratings and assumptions rather than hiding them in one average.
5. Improve the current bottleneck, then reassess. Increasing a non-bottleneck metric does not strengthen the broader claim.
6. State the narrower claim that the current evidence does support, alongside the broader claim it does not yet license.

## Practical Use

This is useful for safety cases, security evaluations, agent benchmarks, simulation-to-field programs, and HIL test plans. For example, a high task-success score in a mock tool environment can support benchmark completion, but not safe real-account operation if authority boundaries and adversarial tool inputs were omitted. A physically realistic testbed can support a local attack-detection claim, while remaining weak evidence for general deployment if cross-site transfer and attack coverage are unestablished.

Standards, hazard analysis, and a domain threat model can help identify which dimensions are necessary. Where no applicable standard exists, record that judgment and the residual ambiguity rather than pretending the scoring rule is objective.

## Limitations

- The rule is a conservative cap, not a probability model, and it does not represent interactions or compensating controls.
- Choosing necessary dimensions is substantive engineering and governance work. An incomplete set can falsely strengthen the result; an overbroad set can make every claim unusably weak.
- A rating is only as credible as its calibration, evidence provenance, and evaluator independence. Keep raw artifacts and rationale available for review.

## Sources

- [AI Sandboxes: A Threat Model, Taxonomy, and Measurement Framework dossier](/dossiers/ai-sandboxes-threat-model-measurement-framework.md) — defines claim-relative measurement dimensions and a conservative minimum rule that caps a deployment claim at its weakest necessary evidence link.
