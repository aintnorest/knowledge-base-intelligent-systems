---
type: Synthesis
title: Artifact-Gated Agent Evaluation
description: Scoring an agent's final deliverable only after it satisfies explicit validity, safety, and provenance preconditions, then measuring quality with the most direct available signal.
tags: [evaluation, verification, agents, computer-use]
timestamp: 2026-07-14T16:06:03Z
---

# Artifact-Gated Agent Evaluation

Artifact-gated agent evaluation makes a verified deliverable—not a persuasive action trace or a generic quality impression—the unit of success. First test whether the output is admissible: present, readable, in the required location and shape, and free of failures that make further scoring meaningless. Only then calculate graded quality against a reference, rubric, executable test, or other task-appropriate signal.

## The Pattern

1. Define the required output artifacts and the conditions that make each one eligible for scoring.
2. Apply hard gates for non-negotiable properties: valid format, required companion files, safety or provenance conditions, and any behavior that must hold before quality matters.
3. Compare admissible artifacts with the most direct available evaluator: exact values, structured fields, executable behavior, geometry, or deterministic state before a model judge.
4. When perceptual judgment is unavoidable, ask narrow reference-grounded questions about observable properties and aggregate their answers in code.
5. Report full-pass rate, partial score, timeout rate, resource use, and failure category separately so apparent progress is not confused with completed work.

## Practical Use

Use this pattern for computer-use agents, coding agents, document workflows, robotic simulations, and any system that leaves artifacts behind. A CAD task might require a parseable file and collision-free path before scoring dimensional similarity; a report workflow might require all requested files and valid citations before evaluating completeness; a code task might require installation and test gates before quality or maintainability review.

Keep references and evaluator-only state isolated from the acting agent. Make the evaluator reproducible where possible, and record which gate failed so failures guide engineering rather than collapse into one opaque zero.

## Gating Agent-Written Code

For coding agents the admissible artifact is a *candidate change*, not a merged success.

- **Candidate, not success.** A branch with lint and relevant CI results can be inspected. When a bounded retry budget runs out, keep the failed checks and escalate rather than relabel ([Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)).
- **Protect the oracle.** Keep the patch author from editing trusted tests or verifier files. Require a failing-before/passing-after reproducer, unchanged regression behavior, and independent tests of feature composition. SpecBench's SQL case passes 100% of visible tests but only 35% of held-out composition cases, and a lookup-table compiler reaches 97% visible and 0% held-out ([Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)).
- **Gate evidence before commitment.** ECLoop places a gate *before* consequential edits or submission, requiring task-specific repository observations first. Record audited fallback releases as not evidence-complete.
- **Stack independent gates for maintenance patches.** For static-analysis repairs, gate on build, then an analyzer re-run showing the target warning gone with no new warnings, then tests. CodeCureAgent's ablations show each removed gate admits more false patches ([Evidence-Gated Static Warning Repair](/vault/evidence-gated-static-warning-repair.md)).
- **Match the domain's acceptance surface.** Deploy and exercise reachable paths for a web app before judging screenshots. Check functional equivalence before post-place-and-route timing for RTL. Compare a causal-analysis script's extracted coefficient with a declared estimator, not merely confirm that it runs.
- **Keep evidence types apart.** For UI changes, pair expectations written before each action with the observed screenshot or video, and mark untested assertions explicitly. A generated review report should keep executable test outcomes separate from model-written critique.

## Generated Tests Are Artifacts Too

An AI-generated test must itself be admissible before its green result counts as evidence. It should target the requested requirement, assert against an independent oracle, run reproducibly in a sandbox, and not come from the same producer that wrote both the behavior and its acceptance criterion. Track accepted tests by fault or mutation sensitivity as well as coverage, and prefer the cross-version checks in [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md). Repository-visible QA artifacts are common but are not effectiveness: 137 of 157 agent projects had conventional tests or specs, yet only 8 had explicit adversarial or prompt-injection test paths.

For agent skills, the same discipline means running the same realistic task in fresh with-skill and without-skill sessions. Grade observable deliverables with quoted evidence, record tokens and duration next to pass rate, and discard assertions that pass equally either way ([Skill Artifact Quality Gates](/vault/skill-artifact-quality-gates.md)).

## Limitations

- Gates can reject a legitimate alternative solution when they encode one tool, file layout, or workflow too narrowly.
- A passing artifact can still be unsafe, unhelpful, or wrong on dimensions the evaluator omitted; gate coverage is not a substitute for task design and review.
- Some creative and perceptual outputs lack a deterministic comparator. Constrained model judgments can add signal but remain model-dependent and need calibration.
- Final-artifact scoring does not explain whether the agent’s intermediate reasoning, permissions, or side effects were acceptable. Add trace, policy, and environment checks when those properties matter.

## Sources

- [Agents’ Last Exam dossier](/dossiers/agents-last-exam.md) — ALE uses deliverable-based checks, gate-and-score composition, reference isolation, and targeted visual probes for long-horizon professional workflows.
- [Minions: Stripe’s one-shot, end-to-end coding agents dossier](/dossiers/stripe-minions-one-shot-coding-agents.md) — relevant-test CI, one-to-two CI rounds, and human-reviewed PR handoff.
- [Verifying Agentic Development at Scale dossier](/dossiers/cognition-verifying-agentic-development.md) — expectation-before-action assertions with screenshots and video; explicit untested status.
- [Conductor Update: Introducing Automated Reviews dossier](/dossiers/google-conductor-automated-reviews.md) — post-implementation report combining tests with model-written plan, code and security critique; no measured accuracy.
- [SpecBench: Measuring Reward Hacking in Long-Horizon Coding Agents dossier](/dossiers/specbench-long-horizon-reward-hacking.md) — visible-test versus held-out composition gaps.
- [Preventing Premature Commitment in Coding Agents with an Evidence-Conditioned Execution Layer dossier](/dossiers/ecloop-evidence-conditioned-execution.md) — evidence admission before consequential actions.
- [SWE-Proof: Can Language Models Resolve Real-World Issues with Machine-Checked Proofs? dossier](/dossiers/swe-proof-machine-checked-repair.md) — machine-checked proofs certify only the modeled contract and its axioms.
- [CodeCureAgent: Automatic Classification and Repair of Static Analysis Warnings dossier](/dossiers/codecureagent-static-analysis-warning-repair.md) — build/analyzer/test gates with ablation-quantified false admissions.
- [Code Review Agent Benchmark dossier](/dossiers/c-crab-code-review-agent-benchmark.md) — review concerns turned into fail-before/pass-after tests; 192 of 234 oracles are structural.
- [A Large-Scale Empirical Study of Quality Assurance Practices and Gaps in AI Agents dossier](/dossiers/quality-assurance-gaps-ai-agent-projects.md) — QA artifact presence across 157 agent projects, with rare adversarial tests.
- [Governance Controls for AI-Generated Test Artifacts in Autonomous Software Testing dossier](/dossiers/governance-controls-ai-generated-test-artifacts.md) — governance filters for generated test artifacts in dataset simulations.
- [AI-Driven Tools in Modern Software Quality Assurance: An Assessment of Benefits, Challenges, and Future Directions dossier](/dossiers/ai-driven-software-quality-assurance-pysmennyi.md) — browser agents repairing deliberately mutated negative tests.
- [Evaluating skill output quality dossier](/dossiers/evaluating-agent-skills-output-quality.md) — with/without-skill evaluation with graded evidence and cost.
- [WebCraftBench: Evaluating Web Application Generation from a Software Testing Perspective dossier](/dossiers/webcraftbench-web-app-testing.md) — runtime browser evidence for generated web apps.
- [TicTacBench: Benchmarking Timing Closure Capabilities of Coding Agents dossier](/dossiers/tictacbench-timing-closure-coding-agents.md) — post-place-and-route timing as the final gate for RTL repairs.
- [CausalVerify: An Execution-Grounded Benchmark for LLM Causal Inference Workflows dossier](/dossiers/causalverify-execution-grounded-causal-inference.md) — executable but numerically wrong causal workflows (66 of 426).
