---
type: Synthesis
title: Shared Alternatives Before Commitment
description: Separating divergence, shared critique, and synthesis makes concrete alternatives available for comparing tradeoffs before a team commits to an approach.
tags: [interaction-design, human-in-the-loop, decomposition, evaluation, agents]
timestamp: 2026-10-05T21:56:59Z
---

# Shared Alternatives Before Commitment

Creating alternatives privately and sharing only the favorite is different from **sharing several concrete alternatives for critique**. Shared examples give collaborators something to compare, question, and borrow from before one proposal becomes the commitment everyone must defend. The reusable pattern separates divergent exploration from critique and subsequent synthesis.

## How It Works

1. **Diverge before selection.** Develop materially different approaches under the same brief. Make their consequential assumptions, supported cases, and tradeoffs visible, not just their labels.
2. **Share the alternatives.** Give reviewers access to the candidates rather than only the creator's preferred answer. Critique properties across options: what should be kept, changed, combined, or investigated?
3. **Bring evidence into comparison.** Where feasible, prototype the uncertain behavior and show observed consequences alongside unresolved questions. A demonstration is evidence only for the cases it actually exercises.
4. **Synthesize after critique.** Choose or combine useful properties and record why the resulting approach fits the goal. Convergence after exploration need not mean picking an untouched candidate.

This can turn an abstract architecture choice into a discussion of observed tradeoffs. When full prototypes are costly, scoped alternatives for the uncertain subproblem are a practical design option, not an established equivalent to complete prototypes. Carry the decision into an [editable shared plan](/vault/editable-plans-as-boundary-objects.md) so later evidence can reopen it.

## Evidence and Limits

A controlled human-design study distinguished sharing multiple designs from creating multiple designs but exposing only one. Sharing several designs improved reported critique-related outcomes, rapport, feature borrowing, and final-ad quality measures; privately creating alternatives did not reproduce the shared condition's final-quality advantage. Reduced personal attachment and richer comparative reasoning are plausible explanations, not separately proven causes.

That evidence concerns a short advertising task with human pairs, not agents or software implementation. Agent-generated variants can share the same wrong premise, and superficial differences can create a false sense of exploration. A practitioner proposal to compare agent-built prototypes motivates the transfer but does not establish agent gains, independence, affordability, or reliable automated visual explanations.

Bound the comparison to decisions a reviewer can understand. More options can overload attention; parallel experiments add generation, integration, and review cost. Measure quality against the actual goal: in the human study, ratings and click-through performance did not significantly correlate, and more clicks did not establish deeper engagement. Uneven ad exposure, excluded ads, and nested ratings further limit broad claims. No tested option count is a universal optimum.

## Inspecting Generated Alternatives

Keep **creating variants**, **inspecting their differences**, and **improving final quality** separate. Generation supplies candidates, not necessarily meaningful diversity. Full-text side-by-side grids can reduce memory and scrolling demands; in-text repetition or similarity cues can guide attention without replacing the original responses. Lexical-position resemblance is not semantic agreement or truth: clustering can miss paraphrases or merge unrelated sentences, while interleaving matched sentences can remove consequential context.

A peer-reviewed **24-person** study found more listed model differences with a bundled comparison interface (**p<.01**), but participants also spent longer inspecting outputs. The differences were not independently validated, so this is neither demonstrated characterization accuracy nor inspection efficiency. At **nine responses** in an email-rewriting task, there was no significant interface advantage in time or self-rated final success; no final-quality advantage was established. Task and response count changed together, preventing a causal scale-threshold claim. The source also leaves mean-versus-median group ordering inconsistent.

Parallel prompt paths offer bounded alternatives for comparative debugging: change a local instruction or intermediate artifact, then inspect the downstream result. Qualitative evidence supports this use, not a controlled benefit attributable to parallelism alone. [Decomposed Prompting](/vault/decomposed-prompting.md) covers the editable-chain mechanism and its coherence costs. Paths using the same model may share failures; more visible differences need not produce a better final artifact.

## Sources

- [Prototyping Dynamics: Sharing Multiple Designs Improves Exploration, Group Rapport, and Results dossier](/dossiers/prototyping-dynamics-sharing-multiple-designs.md) — peer-reviewed CHI 2011 human experiment separates sharing several designs from creating several but sharing only one; ratings and click-through outcomes diverge.
- [Planning with Agents: Divided Worlds, Boundary Objects, and Thicker Interfaces dossier](/dossiers/maggie-appleton-planning-with-agents.md) — practitioner proposal for reality-tested agent alternatives and interactive comparison; demonstrations do not establish controlled quality or cost gains.
- [Supporting Sensemaking of Large Language Model Outputs at Scale dossier](/dossiers/supporting-sensemaking-llm-outputs-at-scale.md) — peer-reviewed CHI 2024 evidence for full-text grids with in-text comparison cues; more listed differences accompanied longer inspection, without validated differences or an email-quality advantage at nine responses.
- [AI Chains: Transparent and Controllable Human-AI Interaction by Chaining Large Language Model Prompts dossier](/dossiers/ai-chains-transparent-controllable-interaction.md) — peer-reviewed CHI 2022 qualitative evidence for comparing parallel prompt paths and downstream effects; the bundled study does not isolate parallel comparison.
