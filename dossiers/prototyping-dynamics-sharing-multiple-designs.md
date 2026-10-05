---
type: Study Note
title: "Prototyping Dynamics: Sharing Multiple Designs Improves Exploration, Group Rapport, and Results"
description: An equal-time study of 84 people distinguishes creating alternatives from sharing them: presenting several designs improved critique, borrowing, rapport, and final ad performance, with non-equivalent quality measures.
resource: https://doi.org/10.1145/1978942.1979359
source: /archive/prototyping-dynamics-sharing-multiple-designs.pdf
tags: [interaction-design, decomposition, evaluation]
timestamp: 2026-10-05T21:49:07Z
---

# Prototyping Dynamics — Study Notes

**Authors**: Steven P. Dow, Julie Fortuna, Dan Schwartz, Beth Altringer, Daniel L. Schwartz, and Scott R. Klemmer.  
**Published**: CHI 2011, May 7–12, 2011, Vancouver, Canada.  
**Status**: Peer-reviewed CHI 2011 conference paper. ACM's publisher record identifies DOI 10.1145/1978942.1979359; no arXiv version is involved.

## What It Is

A between-subjects study of **84 people in 42 pairs** designing web advertisements for FaceAIDS. It separates the effects of making multiple ideas from exposing those ideas to a collaborator. The three equal-time conditions are:

- **Share Multiple**: make three preliminary ads and share all three.
- **Share Best**: make three preliminary ads but share only one chosen design.
- **Share One**: spend the same time on one preliminary ad and share it.

After critique, each participant independently makes a final advertisement. This is evidence about human collaboration and design exploration, not an experiment with AI or agent teams.

## Problem and Motivation

A single concrete prototype helps collaborators communicate but can narrow the perceived problem and attach the creator's identity to one proposed answer. Critique then threatens the person rather than helps compare ideas. Rapid iteration alone can polish a fixed concept without exploring alternatives.

Sharing several designs may spread psychological investment, furnish material for comparison, and make it easier to borrow features without endorsing a whole proposal. These are proposed explanations; the study does not separately manipulate ego attachment, example exposure, or comparison reasoning.

## Mechanism as an Idea

Participants had 30 minutes for initial design; the multiple-design conditions started a fresh ad every ten minutes. All pairs then received ten minutes of discussion: critique followed by discussion of how best to satisfy the brief. Final designs were produced independently. Stratified randomization balanced gender and measured graphic-design knowledge; participants were independently recruited and did not have established working relationships.

The operational pattern is **individual divergence, shared comparison, then individual synthesis**. Partners can integrate properties from several concepts instead of treating one artifact as a winner to defend or reject. Broader exploration and later convergence are compatible: consensus reached after comparison is different from prematurely following one direction.

Outcomes include a live 12-day ad campaign, ratings by clients, advertising professionals and crowd workers, pairwise design similarity, self-reported rapport, speech turn-taking, and migration of features from one partner's preliminary designs to the other's final design.

## Results and Admissions

Four of 84 final ads were withheld at the client's request for inappropriate negative imagery: three Share Best, one Share Multiple. The remaining campaign produced **239 clicks from 274,539 impressions**, at **$362** total cost.

| Condition | Clicks / impressions | Final quality rating, 1–7 | Rapport change | Turns per speaking minute | Borrowed features |
| --- | --- | --- | --- | --- | --- |
| Share Multiple | 106 / 98,867 | 3.89 | +0.89 | 12.1 | 32 |
| Share Best | 57 / 77,558 | 3.63 | −1.75 | 9.1 | 18 |
| Share One | 76 / 98,038 | 3.71 | −2.11 | 8.6 | 19 |

Share Multiple had significantly higher click-through rate (reported χ² = 4.72, p < 0.05) and quality ratings (F(2,2519) = 5.075, p < 0.05). Share Best and Share One ratings did not differ significantly. Thus **creating alternatives while hiding all but one did not reproduce the final-quality advantage of sharing alternatives**.

Similarity ratings of each participant's designs were **3.85**, **3.99**, and **5.45**, respectively, on a 1–7 scale where higher means more similar. Both making and sharing alternatives supported broader exploration. Partner-design similarity rose more in Share Multiple (**+0.91**) than Share Best (**+0.55**) or Share One (**+0.52**), consistent with stronger convergence after exploration.

Share Multiple increased rapport and speaking-turn frequency, but did not significantly increase total speaking time, total turns, or balance between dominant and quieter speakers. Feature migration counts five binary categories per final ad; more borrowed features is not a direct measure of conceptual novelty or justified correctness.

**The quality measures disagree.** Ratings did not significantly correlate with campaign performance (R² = 0.018, p > 0.05). Experience improved ratings but not overall click-through performance. Experienced participants benefited more in the campaign comparison, while novices benefited more in ratings. Time spent on the destination site and pages visited did not differ significantly by condition. More clicks therefore do not establish deeper engagement or every definition of a better ad.

## Analyst Takeaways

1. **Expose alternatives, not just the privately selected favorite.** Comparison is part of collaboration, not merely a pre-meeting search cost. The Share Best condition is an especially useful control for confusing generation breadth with shared evidence breadth.
2. **Defer commitment while making critique concrete.** Alternatives let feedback target properties and tradeoffs without turning the sole artifact into a referendum on its author. The psychological explanation remains a hypothesis, even though rapport and feature-sharing outcomes support the pattern.
3. **Keep divergent search and convergent decision separate.** More variety need not prevent agreement; participants reached greater final similarity after exploring more broadly.
4. **Transfer to agents is a design hypothesis.** [Planning with Agents](/dossiers/maggie-appleton-planning-with-agents.md) proposes running competing implementations and presenting an interactive comparison. This study motivates sharing the alternatives but does not establish that model-generated options are independent, correct, affordable, or socially equivalent to human-created designs.

## Questions and Limitations

This is one short advertising task, largely with students, and pairs with no prior collaboration. Long-lived teams, power differences, cross-functional work, and costly complete prototypes could behave differently. The authors suggest prototyping selected subproblems when full alternatives are expensive, but do not test that intervention. Three alternatives are a tested condition, not an optimal universal count.

Ad exposure was not perfectly even; the paper discusses platform capacity and rotation as experimental challenges. Client exclusion changes campaign participation by condition. Several analyses use thousands of individual ratings from a much smaller set of participants and artifacts; the paper reports conventional ANOVAs rather than a hierarchical model accounting for all nesting. The strong claims should be read with those statistical units visible. Table 1's caption says experienced participants created better ads, while the campaign analysis finds no significant overall experience effect; the conditional experienced-subgroup gains and rating results should not be flattened into that caption's broad claim.

## Vault Ideas Extracted

* [Shared Alternatives Before Commitment](/vault/shared-alternatives-before-commitment.md)
