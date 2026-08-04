---
type: Study Note
title: AI Sandboxes: A Threat Model, Taxonomy, and Measurement Framework
description: Study notes on an assurance-oriented framework for AI sandboxes that bounds deployment claims by explicit assumptions, evidence artifacts, and their weakest claim-relevant measurement dimension.
resource: https://arxiv.org/abs/2606.18532v1
source: /archive/ai-sandboxes-threat-model-measurement-framework.pdf
tags: [sandboxing, evaluation, governance, taxonomy]
timestamp: 2026-07-14T16:26:53Z
---

# AI Sandboxes: A Threat Model, Taxonomy, and Measurement Framework — Study Notes

**Authors**: Inderjeet Singh, Haitham Mahmoud, and Andrés Murillo
**Preprint**: arXiv:2606.18532v1 [cs.CR]
**Pages**: 50

## What It Is

This is a cross-domain framework paper that treats an AI sandbox as an *assurance environment*, not simply an isolated runtime, simulator, cyber range, digital twin, benchmark, hardware-in-the-loop (HIL) rig, or regulatory pilot. Its central question is what a bounded experiment can validly support about a deployment, especially when an AI system senses, acts, communicates, and can create physical consequences.

The paper defines a sandbox as the tuple `S = (U, E, B, C, M, I, A, R)`: system under test, environment, boundary, controllable variables, monitoring, interventions, evidence artifacts, and residual risk. The point of the tuple is to keep the tested system, the apparatus around it, the artifacts it produces, and the remaining exposure separate. A result is meaningful only relative to all four.

## The Claim Boundary

The proposed claim grammar is deliberately restrictive: in a specified sandbox, under explicit assumptions, interventions, and measurement procedure, a system satisfies a property over a scenario set with stated uncertainty; this *supports*, but does not prove, a deployment claim.

The assumption gate has six components:

1. **Fidelity** — which deployment dynamics, such as sensing, timing, actuation, and human procedures, are represented.
2. **Coverage** — which scenarios, faults, attacks, and rare events the campaign includes or excludes.
3. **Observability** — which states and effects are actually measured.
4. **Containment** — which cyber, physical, data, and operational harms are bounded if something fails.
5. **Transfer** — why evidence inside the boundary should generalize beyond it.
6. **Governance** — who can inspect the artifacts and how they connect to a safety case, risk process, or regulatory record.

This prevents familiar category errors: simulation success is not field safety, a digital twin is not safe actuation, rich telemetry is not auditability without provenance and retained configuration, and regulatory-sandbox participation is not technical certification.

## Taxonomy and Staging

The authors separate five non-exclusive sandbox archetypes. Simulation-based sandboxes offer repeatable closed-loop variation but invite transfer overclaiming. Digital twins help with lifecycle observability and replay but add live-connectivity and drift risks. Adversarial or security sandboxes make attacks and faults observable under containment but can abstract away physical consequences. Regulatory sandboxes create supervised process evidence but do not supply technical proof by themselves. Agent-based sandboxes exercise stateful tool use and long-horizon behavior but frequently omit real authority, identity, privacy, and irreversible effects.

For physical AI and cyber-physical systems (CPS), the paper frames evaluation as a staged pipeline: offline evaluation, pure simulation, software-in-the-loop, HIL, supervised field trial, and continuous digital-twin monitoring. Each stage relaxes a different assumption and introduces a different risk. Cyber containment becomes essential once production interfaces enter at SIL; physical containment, such as interlocks, geofences, and emergency stops, becomes essential when HIL or field trials can affect equipment or people. Later stages are not universally better—they answer different evidence questions.

## Measurement and Evidence Composition

The framework compares evidence rather than product feature lists. Its fifteen claim-relative dimensions include fidelity, controllability, observability, containment, reproducibility, scenario portability, timing fidelity, network realism, actuator and plant realism, HIL/SIL integration, sim-to-real transfer evidence, attack and fault injection, scalability, openness/auditability, and governance artifacts.

The paper's strongest operational rule is a weakest-link cap. For a deployment claim, identify every dimension whose failure would invalidate the claim; the licensed strength of the claim is the minimum strength of those dimensions. Improving a non-bottleneck dimension cannot strengthen the claim. For example, a CARLA planning stack can be strong evidence for regression over modeled scenarios while remaining weak evidence for real urban deployment because timing and sim-to-real transfer are weak. A detector can work well on a physical water testbed yet still be weak evidence for protecting other plants if attack coverage and cross-plant transfer are weak. An agent can complete WebArena tasks while providing absent evidence for safe real-account deployment if real authority and prompt-injection resistance are not represented.

This is a conservative licensing rule, not a probability estimate. It depends on choosing claim-relevant dimensions honestly. The authors propose grounding that choice in applicable standards when possible, or otherwise in the threat model, and preserving the residual ambiguity rather than hiding it in a roll-up score.

## Threat Model: Protect the Assurance Apparatus Too

The threat model expands the protected asset beyond the AI system under test. It includes the scenario grammar, seeds, calibration files, simulator state, timing traces, telemetry bindings, HIL bridges, audit logs, safety cases, and reports that license a claim. An attacker can invalidate the conclusion without compromising the model—for example, by poisoning an asset, replaying stale digital-twin telemetry, gaming a public benchmark, selectively reporting results, or treating a limited experiment as certification.

The ten threat classes span a misaligned system under test, external infrastructure attackers, compromised tenants, insiders, supply-chain or asset compromise, twin/HIL/telemetry attacks, adversarial sensors, benchmark gaming, privacy leakage, and governance over-interpretation. The associated controls—such as isolation, signed assets, authenticated telemetry, command allowlists, interlocks, private holdouts, immutable logs, and scope review—are themselves evidence claims. A control needs archived configuration, activation evidence, test results, and logs; saying that it existed is not evidence that it protected a particular run.

## Artifact Packages and Standards

The paper groups the required evidence into scenario, platform, execution, ground-truth, perturbation, and governance artifacts. A reviewable experiment preserves scenario definitions and seeds; versions, dependency manifests, calibration, and hardware profiles; traces and intervention logs; ground truth; attack and fault specifications; and approvals, risk assessments, safety-case links, and audit records. Missing one artifact can sever an independent replay path and collapse a deployment-facing assertion into an unauditable claim.

It then maps the dimensions to standards and regulation: NIST AI RMF and TEVV, ISO/IEC 42001 and 23894, IEC 61508, ISO 26262 and SOTIF, ANSI/UL 4600, ISO/SAE 21434, IEC 62443, IoT baselines, scenario/model interchange standards, SBOM/SSDF guidance, and the EU AI Act. The mapping is useful scaffolding, but the authors emphasize that a standard, safety case, or regulatory file cannot make an uncalibrated model faithful or a narrow attacker model comprehensive. They identify a notable standardization gap around a common evidence package for sim-to-real transfer.

## My Takeaways

1. **State the deployment claim before selecting metrics.** A benchmark, simulator, HIL setup, or regulatory process is not a unit of assurance on its own. The claim determines which modeled dynamics, artifacts, and controls must be examined.

2. **Make the bottleneck visible.** A weak transfer link, omitted consequence model, incomplete attack surface, or unavailable trace limits the usable claim even when many other metrics look strong. This is more actionable than an average score because it identifies what evidence must improve next.

3. **Version the evidence environment, not only the model.** Scenarios, assets, clock settings, firmware, bridge policies, logs, calibration, human interventions, and control activation are part of the result. A reproducible model with an unreproducible apparatus is not a reproducible assurance claim.

4. **Treat control efficacy as something to test.** A sandbox boundary, telemetry signature, emergency stop, safety monitor, or audit policy is not automatically effective because it was designed. Record the configuration and exercise it under the failure conditions it is intended to handle.

## Questions and Limitations

- This is a framework and structured synthesis, not a new benchmark or controlled experiment proving that its taxonomy or weakest-link grades improve real deployments. Its heatmap codes platform families using the authors' rubric rather than an independent expert-panel assessment.
- The weakest-link rule is intentionally conservative and does not model interactions, uncertainty propagation, or trade-offs among dimensions. The hard problem of selecting the necessary-dimension set remains claim- and domain-dependent.
- The scope is broad enough to unify simulation, CPS, agentic systems, and regulation, but that breadth means its guidance needs concrete domain instantiation before use in a particular medical, industrial, vehicle, or software-agent program.
- The standards mapping is informative rather than a compliance determination. Standards evolve, differ by jurisdiction and sector, and do not replace expert legal, safety, or security review.
- Preserved artifacts enable review but do not guarantee their correctness, completeness, confidentiality, or semantic interpretation. Evidence-chain integrity requires independent checks and careful access controls.

## Vault Ideas Extracted

* [Claim-Bounded Sandbox Evidence](/vault/claim-bounded-sandbox-evidence.md)
* [Weakest-Link Assurance Composition](/vault/weakest-link-assurance-composition.md)
