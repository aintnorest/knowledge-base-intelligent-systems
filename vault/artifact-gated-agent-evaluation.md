---
type: Synthesis
title: Artifact-Gated Agent Evaluation
description: Scoring an agent's final deliverable only after it satisfies explicit validity, safety, and provenance preconditions, then measuring quality with the most direct available signal.
tags: [evaluation, llm-code-testing, verification, agents, coding-agents, computer-use]
timestamp: 2026-10-04T07:48:26Z
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
- **Protect the oracle.** Keep the patch author from editing trusted tests or verifier files. Require a failing-before/passing-after reproducer for repairs, unchanged regression behavior, and independent tests of feature composition. A reported SQL case passes 100% of visible tests but only 35% of held-out composition cases, and a lookup-table compiler reaches 97% visible and 0% held-out ([Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)).
- **Gate evidence before commitment.** Place a gate *before* consequential edits or submission, requiring task-specific repository observations first. Record audited fallback releases as not evidence-complete.
- **Stack independent gates for maintenance patches.** For static-analysis repairs, gate on build, then an analyzer re-run showing the target warning gone with no new warnings, then tests. Reported ablations show each removed gate admits more false patches ([Evidence-Gated Static Warning Repair](/vault/evidence-gated-static-warning-repair.md)).
- **Match the domain's acceptance surface.** Deploy and exercise reachable paths for a web app before judging screenshots. Check functional equivalence before post-place-and-route timing for RTL. Compare a causal-analysis script's extracted coefficient with a declared estimator, not merely confirm that it runs.
- **Keep evidence types apart.** For UI changes, pair expectations written before each action with the observed screenshot or video, and mark untested assertions explicitly. A generated review report should keep executable test outcomes separate from model-written critique.

For milestone-based coding work, admit completion only after independent validators compare running behavior with acceptance conditions defined before decomposition. A fresh reviewer can inspect the change while a separate black-box validator exercises user-visible paths; neither statement coverage nor the implementing worker's completion claim substitutes for those observations. A reported long-running example required multiple validation rounds at every milestone, demonstrating substantial correction work in that run, not general proof of production quality.

## Generated Tests Are Artifacts Too

An AI-generated test is a candidate evidence artifact, not its own acceptance authority. Separate these evidence layers rather than collapsing them into "has tests":

- **Presence and execution validity:** the artifact exists, builds, reaches the intended boundary, and runs reproducibly in isolation. Test inclusion, merge outcomes, and double counts are inventory or workflow signals, not effectiveness.
- **Oracle syntax:** an assertion or observable failure channel exists and propagates to the verdict. Syntax mining can triage missing checks but misses existing assertions outside a diff; interactions and reviewed snapshots can be valid contracts. More assertions, coverage, or fewer smell flags do not establish a stronger oracle.
- **Independent expectation:** the protected outcome comes from reviewed requirements, domain laws, or another justified authority, not merely the implementation or its author's explanation. A fresh agent seeing the same faulty body can inherit the same premise.
- **Measured fault sensitivity:** an unchanged check passes the trusted control and rejects a relevant fault for a behavioral reason. Use [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md) for repairs and [Concern-Directed Mutation Witnesses](/vault/concern-directed-mutation-witnesses.md) for injected faults. Record reasoned sensitivity as reasoning, not execution; [Context-Conditioned Test Adequacy](/vault/context-conditioned-test-adequacy.md) explains why generator-level metric rankings are not candidate-level proof.

A pass-on-current-code filter is legitimate **characterization**, not discovery of defects in that code. Preserve executable red candidates for authority-grounded diagnosis instead of discarding them or rewriting assertions to observed output. A test passing faulty code may still protect unaffected behavior; only the relevant two-sided result establishes defect discrimination. Repository-visible QA artifacts illustrate the inventory limit: 137 of 157 agent projects had conventional tests or specs, yet only 8 had explicit adversarial or prompt-injection test paths.

Generated properties and standalone reproducers need the same gate. Check the input domain, the claimed law, reproduction, assertion propagation, and the actual violation independently of report plausibility. One property-mining audit found 28/50 valid and 16/50 reportable reports, sampled from the top 80% by initial score; its refined top-score subset is not held-out calibration. A rejected calendar interpretation and an appendix that swallowed assertion failures show why convincing reports are not executable assurance. Passing public examples filters some invalid properties but does not prove a universal law. See [Minimal Property-Violation Feedback](/vault/minimal-property-violation-feedback.md) for presenting validated failures to repair agents.

Report **visible success, held-out success, failure detection, repair opportunity, and external acceptance** separately. A small code study records 15/15 visible first-attempt passes but only 14/15 hidden successes: the missed failure supplies no repair opportunity under any feedback policy. Another staged generation study reaches 52.82% public success versus 30.27% private success after rescue. Neither a green visible suite nor a merged patch validates all expectations. Require forbidden outcomes to remain reachable and falsifiable; preferences for fewer-longer tests or avoiding setup hooks remain practitioner guidance, not measured AI optima.

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
- [How Missions Work dossier](/dossiers/factory-missions-architecture.md) — prior behavioral contracts and fresh milestone validators found issues that became repair tasks in one long-running example.
- [Design choices made by LLM-based test generators prevent them from finding bugs dossier](/dossiers/llm-test-generators-validate-bugs.md) — pass-and-coverage filtering excludes bug-revealing candidates and retains bug-validating suites.
- [On the risk of coding before testing dossier](/dossiers/coding-before-testing-error-propagation.md) — faulty implementation context lowers detection relative to fresh specification-grounded generation.
- [Evaluating and Mitigating the Misguidance Effect of Buggy Code dossier](/dossiers/buggy-code-test-misguidance.md) — distinguishes shared-behavior passes from pass-buggy/fail-fixed misguidance.
- [All Smoke, No Alarm dossier](/dossiers/agent-authored-test-oracle-signals.md) — diff-level oracle syntax is triage, not complete-suite adequacy or measured sensitivity.
- [Do Autonomous Agents Contribute Test Code? dossier](/dossiers/test-inclusion-agentic-pull-requests.md) — test presence and merge outcomes do not measure effectiveness.
- [Testing with AI Agents dossier](/dossiers/ai-agent-test-frequency-quality-coverage.md) — structural assertion counts and coverage changes leave oracle correctness unmeasured.
- [Are Coding Agents Generating Over-Mocked Tests? dossier](/dossiers/coding-agents-over-mocked-tests.md) — double prevalence does not establish boundary fidelity or harm.
- [Mutation-Guided LLM-based Test Generation at Meta dossier](/dossiers/meta-ach-mutation-guided-tests.md) — generated tests carry baseline-pass/mutant-fail evidence independent of coverage gain.
- [Do Coverage and Mutation Scores Correlate with Effectiveness? dossier](/dossiers/llm-test-metrics-replicability.md) — model-ranking proxies differ from individual-suite evidence.
- [On the Diffusion of Test Smells dossier](/dossiers/llm-test-smell-diffusion.md) — lower assertion-smell rates can coexist with empty or assertion-free checks.
- [Agentic Property-Based Testing dossier](/dossiers/agentic-property-based-testing.md) — score-selected validity audit, intended-behavior rejection, and swallowed appendix assertions require artifact review.
- [PGS dossier](/dossiers/property-generated-solver-minimal-feedback.md) — public-example filtering improves but does not certify generated properties.
- [Structured Feedback Improves Repair dossier](/dossiers/veriharness-structured-feedback.md) — 15 visible passes versus 14 hidden successes leave a missed failure without feedback.
- [Test-Driven Development for Code Generation dossier](/dossiers/test-driven-development-code-generation.md) — visible and private outcomes diverge in a staged rescue pipeline.
- [Testing principles dossier](/dossiers/kody-testing-principles.md) — live-path falsifiability is practitioner guidance; test length and hook preferences are unmeasured for AI.
