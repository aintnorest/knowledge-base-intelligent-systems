---
type: Study Note
title: "PEARL: Self-Evolving Assistant for Time Management with Reinforcement Learning"
description: Study notes on PEARL and CalConflictBench, a long-horizon preference-learning benchmark and reinforcement-learning approach for calendar conflict resolution.
resource: https://arxiv.org/abs/2601.11957v4
source: /archive/pearl-self-evolving-assistant-time-management-reinforcement-learning.pdf
tags: [agents, agent-memory, reinforcement-learning, long-horizon, evaluation]
timestamp: 2026-07-30T18:00:00Z
---

# PEARL: Self-Evolving Assistant for Time Management with Reinforcement Learning - Study Notes

**Authors**: Bingxuan Li, Jeonghwan Kim, Cheng Qian, Xiusi Chen, Eitan Anzenberg, Niran Kundapur, Heng Ji  
**Venue**: arXiv:2601.11957 [cs.CL]  
**Publication date**: January 19, 2026 (arXiv v1)  
**Version date**: June 23, 2026 (v4)  
**Pages**: 20

## What It Is

PEARL (Preference Evolving Agent with Reinforcement Learning) addresses calendar-conflict resolution as a long-horizon, preference-sensitive agent task. At each round, an agent must accept one overlapping event, rank alternatives, and explain its decision from organizational context and a history of prior choices. The hidden user policy can evolve as new evidence appears.

The accompanying CalConflictBench creates synthetic role-specific annual calendars and conflict trajectories. The benchmark is designed to expose a common agent failure: treating organizational urgency as an unconditional rule instead of learning the user's personal hard constraints and trade-offs.

## Approach

PEARL augments a language agent with an external **Strategy Hub**: interpretable preference strategies inferred from history are retrieved and updated after each round. Training uses round-wise rewards for decision correctness, ranking quality, and memory use, with a curriculum that shifts weight from early preference inference toward later preference-consistent actions.

The evaluation presents history in a single turn at each decision point, even though the task represents a sequential calendar year. Thus a model's apparent memory ability is partly a context-interpretation and state-update problem, not proof of durable autonomous storage.

## Results

The paper reports that baseline agents have high error rates—Qwen-3-30B-Think averages 35%—and that PEARL reduces average error by 55% versus the strongest baseline (error-reduction rate 0.76) on CalConflictBench. The result supports the authors' benchmark and training setup, not a claim that a real calendar agent can be delegated high-impact scheduling decisions.

## Limitations

The benchmark uses synthetic organizations, curated preference principles, generated event metadata, and a unique ground-truth resolution for conflicts that are often underdetermined in life. Human verification improves surface plausibility but does not substitute for real users, evolving consent, privacy, calendar permissions, reversible actions, or longitudinal deployment studies. RL rewards and memory updates can also overfit the benchmark's hidden policy grammar.

## Analyst Takeaways

1. **Persistent assistance needs an explicit preference state.** Conversation history alone is a weak substitute for inspectable, revisable strategies.
2. **Separate inference from authority.** An agent may propose rankings, but accepting/declining meetings needs permissions, confirmation policies, and an audit trail.
3. **Model hard constraints explicitly.** Personal commitments, accessibility, health, and delegation limits should not be inferred solely from organizational importance signals.
4. **Evaluate longitudinally.** Test preference drift, correction, forgetting, privacy boundaries, and rollback—not only one decision at a time.
