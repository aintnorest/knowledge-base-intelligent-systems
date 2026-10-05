---
type: Synthesis
title: Domain-Grounded Requirements Review
description: Validating domain terminology, constraints, and standards scope before treating model explanations as requirement defects or warranted clarity.
tags: [requirements-engineering, reliability, verification, evaluation]
timestamp: 2026-10-05T23:22:59Z
---

# Domain-Grounded Requirements Review

Requirements review must distinguish **uncertainty in the requirement from unfamiliarity in the reviewer**. An established technical term is not ambiguous merely because a model cannot interpret it. Conversely, a reference to a standard does not establish clarity if the applicable clauses, compliance conditions, or test levels remain unspecified. Fluent explanation is a review artifact, not evidence that either judgment is warranted.

## How It Works

Ground review in validated terminology, domain constraints, and the scope of referenced standards. Ask whether competing readings remain plausible to an informed practitioner, and which observable behavior changes between them. Check that proposed counterexamples describe possible domain states: logical analysis of invented premises can produce precise but irrelevant warnings. Keep inferred constraints explicitly provisional until an accountable domain owner validates them; see the [premise trust boundary](/vault/machine-readable-agent-specifications.md).

Separate context the reviewer can recover from missing intent only the stakeholder can supply. Consult authoritative domain material before escalating unfamiliar language, then use [Clarification Need Decision](/vault/clarification-need-decision.md) for consequential unresolved choices. Record the accepted interpretation and its evidence, rather than treating a confident rationale or repeated model agreement as approval.

## Practical Use

Evaluate classification and explanation separately. In industrial requirements review, explanation ratings averaged **4.08/5 for naturalness but 3.38/5 for usefulness**. Readability can conceal false alarms on settled terminology or false reassurance about underspecified standards. Review whether a rationale identifies a real decision, supports it with domain evidence, and enables an authorized correction.

Apply the same ownership discipline during elicitation. Adaptive probing can uncover neglected needs, but suggestions can also lead respondents toward model-preferred features. Mark suggestions as proposals, preserve their provenance, and confirm both answers and summaries with the stakeholder. A smooth interview or comprehensive-looking summary does not establish faithful or complete intent.

## Limitations

The industrial evidence concerns binary classification on three datasets, not measured downstream defect reduction. Its archived institutional manuscript corresponds to a peer-reviewed conference paper, but its precise accepted-manuscript status is unconfirmed. Historical labels and expert reconsideration after explanations do not independently resolve persuasion versus genuine discovery. Retrieval of glossaries and standards is proposed, **not evaluated** as an improvement.

The elicitation evidence uses students role-playing stakeholders in simplified scenarios, with incomplete coverage and an unclear transcript-versus-summary scoring boundary. It does not establish professional equivalence or real-stakeholder fidelity. Formal-review design accounts likewise offer no quantitative validation of inferred domain premises. Grounding is therefore a necessary review discipline, not a demonstrated guarantee of completeness, calibrated detection, or fewer deployed defects.

## Sources

- [Requirements Ambiguity Detection and Explanation with LLMs: An Industrial Study dossier](/dossiers/requirements-ambiguity-detection-explanation-industrial-study.md) — peer-reviewed industrial classification study, archived institutional manuscript with unconfirmed precise version status; domain-blind false alarms, unchecked standards scope, and naturalness–usefulness gap; domain retrieval remains future work.
- [LLMREI: Automating Requirements Elicitation Interviews with LLMs dossier](/dossiers/llmrei-automating-requirements-elicitation-interviews.md) — peer-reviewed elicitation study archived as arXiv v1; student role-play, partial requirement recovery, leading suggestions, and uncertain summary fidelity limit intent-acquisition claims.
- [Requirements analysis: catching requirement bugs before they become code dossier](/dossiers/kiro-requirements-analysis.md) — vendor design account identifies implicit domain constraints as a bottleneck and frequency-supported inferred premises as a heuristic, without effectiveness measurements.
