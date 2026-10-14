---
type: Study Note
title: Generative AI and the Nature of Work
description: A GitHub Copilot eligibility discontinuity links free access to more coding, less project management, smaller peer groups, and greater exploration, with local causal scope and substantial reporting inconsistencies.
resource: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5007084
source: /archive/generative-ai-nature-of-work.pdf
tags: [evaluation, enterprise, code-quality]
timestamp: 2026-10-14T12:00:00Z
---

# Generative AI and the Nature of Work — Study Notes

**Authors**: Manuel Hoffmann, Sam Boysel, Frank Nagle, Sida Peng, and Kevin Xu.  
**Published**: Archived manuscript dated April 18, 2025; Harvard Business School Working Paper 25-021, SSRN 5007084; also circulated as CESifo Working Paper 11479.  
**Status**: Economics working paper, explicitly distributed as a draft for comment and discussion, not a peer-reviewed publication established by this source. GitHub provided financial and administrative support; two authors were affiliated with Microsoft and GitHub. This note covers the complete 75-page archived PDF, including all appendices, rather than assuming equivalence with later versions.

## What It Is

A natural experiment studying **how AI changes the composition of work**, not simply how fast developers produce code. GitHub's June 2022 general-access launch granted some open-source maintainers free Copilot access according to a proprietary repository-ranking threshold. The authors compare developers just on either side of that threshold and link proprietary usage records to public GitHub activity.

The main finding is a shift toward coding and away from project management, accompanied by smaller peer groups and more unfamiliar repositories and languages. These are **intent-to-treat effects of eligibility**, not the effect of every developer actually using the assistant. The studied intervention began as GPT-3-series code completion, not an autonomous coding agent or the later chat-based product.

## Problem and Economic Mechanism

Successful maintainers can become organizational bottlenecks: increased project use brings issue triage, review requests, and coordination that crowd out their preferred technical work. An assistant can lower the effective cost of coding, enable independent problem solving, and make experimentation less costly. Work can consequently move toward direct contributions rather than interactions needed to obtain help or coordinate contributions.

Appendix C formalizes this with a fixed-resource, constant-elasticity-of-substitution utility model over core work and management. Lowering the cost of core work increases its optimal **absolute quantity**; management decreases if the activities are gross substitutes and increases if they are complements. Nested versions distinguish independent/collaborative and exploratory/exploitative work. Those predictions require assumptions about relative costs and substitution; the model does not independently establish that collaboration or maintaining existing projects is wasteful. Preferences are fixed and externalities absent, despite the public-goods interpretation elsewhere.

Ability heterogeneity is motivated either by greater substitution between activities among lower-ability workers or by a larger AI-induced reduction in their coding cost. The empirical design does not distinguish these explanations. Moreover, the model is derived for activity quantities while the main outcomes are activity shares; conclusions about quantities and shares should not be interchanged.

## Data, Outcomes, and Identification

The opening population contains **187,489 developers**. The main first-year sample excludes anyone with technical-preview Copilot experience, retains active maintainers associated with ranked repositories, and reports **50,032 developers and 2,422,916 developer-week observations**. The two-year descriptive sample expands to **55,496 developers and 5,381,132 observations**. Different local analyses report different sample sizes; these are not all independent people.

Coding includes repository creation, forks, pull requests, and pushes. Project management includes issue handling, project boards, and pull-request review. Comments, reactions, stars, and unstars form a residual category. The main outcome is each category's **cumulative event count divided by cumulative total activity**, not measured time allocation, lines of useful code, or delivered software value. The full first-year sample averages **44% coding and 37% project management**. Only **16% ever use Copilot**, averaging **8.12 usage days**; API transactions supply observed usage.

The running variable is a developer's **cumulative best repository rank**, normalized so ranks below zero confer eligibility. Rank construction and the cutoff were not publicly disclosed, making precise user manipulation less plausible; users had to check eligibility themselves. Maintainers above the threshold could still pay or obtain access through other channels. Eligibility increases adoption rather than creating a clean users/nonusers split.

The main regression uses separate linear rank slopes within **±100 ranks**. Its interpretation requires potential outcomes to vary smoothly at the cutoff, no precise sorting, and no other discontinuous intervention. Density and observed-covariate checks are consistent with these assumptions, not proof of them. Shared repositories, spillovers, changing cumulative ranks, and unobserved characteristics remain relevant. Tables report **robust standard errors** without establishing developer- or repository-clustered inference for repeated observations.

The first stage, Table 1, estimates **+6.896 total usage days** (SE 1.574) and **+6.1 percentage points ever using** (SE 2.3 points), with 4,268 cross-sectional observations. Weekly estimates are **+0.125 days** and **+1.8 points cumulative exposure** across 215,169 rows. Reported F-statistics are 17.8–18.0 cross-sectionally and 435.7–557.5 in the panel. These establish an adoption discontinuity but do not convert the main eligibility estimates into universal treatment-on-user effects.

## Main Results

### Task Reallocation

Table 2 reports **+5.4 percentage points coding share**, from a **43.4% baseline**, and **−10.0 points project-management share**, from **40.2%**: relative changes of **+12.4% and −24.9%**. Each SE is about 0.2 points; N = 269,546 rows. With account age, achievements, followers, and centrality controls, estimates are **+4.1 and −8.9 points** across 248,032 rows. These are event-share changes, not 12.4% faster development or a measured 24.9% saving in management hours.

Quarterly estimates retain their signs through June 2024, peaking around the third quarter and attenuating afterward. Figure 4 uses **percent relative to baseline**; its changes must not be read as percentage-point effects. Annual eligibility reassessment is one proposed explanation for attenuation.

### Independence and Exploration

- **Activity components:** pushes and repository creation rise; forks and pull-request creation fall. Most management shares fall, but issue closing and merging rise. This is consistent with more independent resolution, not proof that every foregone interaction was unnecessary.
- **Peer groups:** Table A8 estimates **17.251 fewer collaborators** from a baseline of **21.759** (−79.3%); with controls, **14.697 fewer** from **29.947** (−49.1%). The outcome is a cumulative mean of repository peer counts, not a directly observed team layoff or organizational hierarchy.
- **New versus familiar projects:** Table 3 estimates a **0.484 log-point** increase in cumulative new-repository exposure, reported as **+62.3%**, versus **−0.087 log points** for familiar repositories, reported as **−9.1%**. Controlled estimates are +44.3% and −12.0%. The prose translates new-project exposure into roughly 15 extra repositories, an approximate interpretation rather than the regression's native unit.
- **Languages:** exposure increases by **1.753 distinct languages** from **9.245** without controls (**19.0%**); with controls, **1.152** from **5.127** (**22.5%**). Salary-weighted language exposure rises about **1.4%**, translated into **$1,683** using external language-specific median salaries. This is neither observed wages nor demonstrated proficiency. Subtracting a $120 annual subscription and extrapolating to 300,000 maintainers yields the paper's roughly $468 million annual potential, not realized economic output.

### Heterogeneity and Quality

All four median-split ability proxies—commit centrality, achievements, followers, and account tenure—show larger task shifts below the median. For example, low/high-tenure coding effects are **+11.2/+2.5 points**, and management effects **−16.0/−6.7 points**. These are relative-status measures **within an already selected maintainer population**, not independent tests of novice competence or causal learning.

Public activity by firm-affiliated developers has the same directional pattern: coding **+6.8 points** and management **−9.5 points**, versus **+5.9/−11.8** for others (Table A6). Company-email identification does not reveal private enterprise workflows.

Table A7 finds higher pull-request acceptance (**+3.6 points**, or +1.4 with controls), fewer critical vulnerabilities, and some increased security-tool adoption. Dependency scanning becomes a small nonsignificant negative with controls. Vulnerability estimates are **−1.060** from **7.801**, or **−1.405** from **4.218** with controls. These repository-level proxies do not inspect AI-generated code or establish its maintenance quality; the controlled vulnerability percentage is also misreported below.

## Robustness: Direction Persists, Magnitude Varies

The appendices contain substantive sensitivity analysis rather than only a headline robustness claim:

- Quadratic rank fits retain the main signs (**+5.08 coding / −11.43 management points**, Figure C3); Figure C4 varies bandwidths from 75% to 125% of the baseline for both linear and quadratic fits.
- Uniform, triangular, and Epanechnikov kernels give coding effects **+5.2 to +5.4 points** and management effects **−10.0 to −11.0 points** (Table C2).
- Data-driven MSE/CER bandwidths are narrower (35–51 ranks). Coding falls to **+2.3 to +4.3 points**; management ranges **−5.1 to −10.0 points** (Table C3). Robust sign is not stable effect size.
- Absolute activity measures retain positive coding and negative management coefficients (**+94.377/−68.497**, Table C4), although the table does not fully specify the aggregation unit. Tail exclusion retains the signs but reduces coding to **+2.2 points** at the strongest reported cutoff (Table C6).
- Propensity matching gives coding **+3.8/+4.2 points** and management **−9.9/−8.3 points**, without/with controls (Table C7). Matching adds its own selection and overlap assumptions; including rank, which determines eligibility, makes common-support documentation particularly important.
- Maintainer differences-in-discontinuities compare pre/post-launch differences around a fixed initial rank classification: coding **+3.2/+3.0 points**, management **−3.3/−3.6 points** (Table C8). A separate student-access difference-in-differences analysis has the same signs but contains a numerical error. Neither alternate design eliminates the need for its own identification assumptions.

The text also claims larger complier effects, but does not provide a corresponding numerical treatment-on-treated table in this archived appendix. It should not be cited as a quantified effect for all users.

## Analyst Takeaways

1. **Measure work substitution, not only generation speed.** Lower implementation cost can change which work gets done, who works together, and which projects receive attention. Fewer coordination events can reflect reduced friction, but can also mean foregone community exchange or reduced attention to existing infrastructure; those downstream effects were not measured.
2. **Separate larger gains from higher final competence.** This study's greater shifts among low-proxy maintainers do not contradict [returns to expertise in later agentic coding](/dossiers/anthropic-agentic-coding-returns-to-expertise.md). That source measures inferred task expertise and session success; this one estimates eligibility-induced activity changes using prior platform proxies. Different outcomes and technologies cannot establish that expertise ceased to matter.
3. **Independence from peers is not independence from oversight.** [Observed professional developers](/dossiers/professional-developers-control-ai-agents.md) retain design and acceptance authority when delegating to agents. Replacing requests to other developers with completion assistance does not demonstrate safe unattended implementation or eliminate review responsibility.
4. **Keep the causal claim local.** The threshold is useful evidence against simple self-selection into adoption. It does not justify extrapolating event shares to hours, public events to all private work, salary-weighted exposure to earnings, or smaller repository peer groups to flatter corporate hierarchies.

## Questions, Limitations, and Reporting Inconsistencies

**Unobserved work and outcomes:** Only public activity is observed; exact generated code and how users use suggestions are not. **45.5% of usage occurs in weeks without public activity**. The authors' suggestion to double effects for private work is conditional extrapolation, not an identified adjustment. There is no direct measurement of time saved, knowledge retention, wages, innovation quality, burnout, team performance, or hierarchy changes. Models and access routes evolve during the two-year window; business/chat usage is not fully captured.

**Sample accounting:** The introduction describes June 2022–June 2023; many table notes say July 2022–July 2023. Table A3 calls 215,169 observations for 5,521 developers a balanced local panel; Table 1 uses those rows but 4,268 cross-sectional observations, while Table 2 reports 269,546 local rows. The relationship is unexplained. The claimed balanced-panel counts are not integer multiples of their developer counts. Do not collapse these denominators into a single definitive local sample.

**Numerical conflicts:**

- Language-exposure prose says **21.8%**; Table 3 gives **19.0% without controls and 22.5% with controls**.
- Table 3's old-repository log coefficients **−0.087/−0.114** correspond to approximately **−8.3%/−10.8%** changes in the transformed outcome under the usual `exp(coefficient) − 1` conversion, not its **−9.1%/−12.0%** labels. The latter magnitudes instead match exponentiating the positive absolute coefficients.
- Table C8 student coding reports **0.0010** against baseline **0.563**, but labels this **1.7%**; the displayed ratio is about **0.18%**. The coefficient or percentage is wrong.
- Controlled critical-CVE values imply **−1.405 / 4.218 ≈ −33.3%**, not the **−33.9%** repeated in Table A7 and the prose.
- Table 2's coding/management coefficients and Table C5's residual coefficient sum to **+0.010**, rather than zero; their baselines sum to **1.004**, rather than one. Given the same reported N and specifications, an exhaustive nonoverlapping partition would add up. The discrepancy exceeds ordinary three-decimal rounding and is unexplained.
- Table A1 lists **Issue Closed twice** and omits **Issue Created**, although the latter appears in the component figures and descriptive table. This leaves the exact operational classification ambiguous.

**Presentation problems:** Figure 4 is explicitly relative-to-baseline although the text calls its changes “absolute”; Figure C3's caption describes AI usage despite plotting work shares; Table C3 misidentifies the CER column numbers; Table C7's note refers to two panels absent from the displayed matching table. The table called “windsorization” describes retaining observations within percentile bounds—tail trimming rather than capping. These do not negate the consistent directional pattern, but limit confidence in copying secondary numbers without checking their definitions.

## Vault Ideas Extracted

- Created [AI-Induced Work Reallocation](/vault/ai-induced-work-reallocation.md): reducing one activity's effective cost can shift work toward independent production and exploration; distinguish event shares from time and quality, and evaluate displaced coordination and peer exchange.
- Updated [Expertise-Mediated Agent Steering](/vault/expertise-mediated-agent-steering.md): distinguish larger eligibility-induced changes among low-platform-proxy maintainers from higher final competence and absolute success among task experts using later agents.

The proposed task-reallocation note was merged with cross-functional boundary spanning under AI-Induced Work Reallocation.
