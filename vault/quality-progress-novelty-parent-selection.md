---
type: Synthesis
title: Quality–Progress–Novelty Parent Selection
description: Choosing which candidate a search expands next by combining current score with parent-relative improvement and direction novelty, so structurally distinct branches survive long enough to be recombined.
tags: [test-time-scaling, agents, agent-harness, reinforcement-learning]
timestamp: 2026-08-11T17:30:00Z
---

# Quality–Progress–Novelty Parent Selection

In any search that repeatedly expands a stored population — program evolution, tree search over solutions, iterative plan refinement — the highest-leverage decision is which existing candidate to extend next. Sampling proportional to current score is the default and is a local optimizer: expansion concentrates on the incumbent, and a branch that is behind on absolute score but improving fast or exploring a different approach gets starved before it can pay off.

Three complementary signals, all computable from records the search already keeps:

- **Quality** — the candidate's normalized current score. Preserves selection pressure toward what is working.
- **Progress** — how much it improved over its strongest parent. A lower-scoring node with a large recent gain is on a trajectory, not at a plateau.
- **Novelty** — how underexplored its method family or approach is relative to the population. Protects the structural diversity that recombination later needs.

Combine them as a weighted sum and sample by softmax with a temperature, rather than taking the argmax. The weights encode how much exploration the budget can afford.

## Why It Helps

Recombination has nothing to work with if score-only selection has already pruned every structurally different branch. The mechanism is easiest to see in a concrete trace: a parent ranked sixth by absolute score but first by recent gain — retaining a distinct feature representation — went from 10.47% to 17.09% selection probability within the same ten-candidate pool once gain and novelty were weighted at 0.6 and 0.3 against score at 1.0. It was then selected, refined, and its child beat the score-only outcome on held-out evaluation. Elsewhere in the same system, a targeted recombination of a strong-features parent and a robust-parsing parent outperformed seven successive repairs of a single lineage.

The same shape applies when choosing which stored state an RL update should practice on: there, a useful fitness combines parent reward, the *variance* of that parent's children's rewards (regions where outcomes are still informative), and a visit-based cooling term that stops one incumbent from consuming the rollout budget.

## Practical Use

Applies wherever a persistent candidate pool is expanded under a budget. Start from score-only as the baseline and add terms one at a time — each additional factor needs to justify the exploration it buys.

Novelty needs a definition specific to the domain: method family, tool sequence, architectural choice, or a clustering over candidate embeddings. A novelty term over a poorly chosen equivalence class is noise.

Normalize each factor within the current pool before weighting, and recompute after each insertion. Absolute scales drift as search improves; the comparison that matters is against the pool as it stands now.

Log the selection probabilities. Being able to recompute what score-only *would* have picked, on the same pool, is the cleanest way to show the selector actually changed a decision.

## Limitations

- Fixed weights are a hyperparameter the search cannot adapt per task; a task with a narrow solution space wants less novelty pressure than an open-ended one.
- Progress measured against the immediate parent rewards noisy jumps and single lucky evaluations as readily as genuine trajectories.
- Exploring more branches costs budget. Under a tight step limit, spreading expansion can end with several half-developed candidates and no strong one.
- When the selector ships alongside changes to retrieval and memory, its individual contribution cannot be read off the end-to-end result.

## Sources

- [Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering](/dossiers/frontis-ma1-ai4ai-recursive-self-improvement.md) — replaces AIRA-Evo's fitness-only parent sampling with softmax over score/gain/novelty, and separately uses reward + child-reward-variance + visit cooling to pick RL training states; the paper notes the selector ships with other changes and warns against attributing the end-to-end gain to the three weights alone.
