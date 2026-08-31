---
type: Study Note
title: Large Language Models Are Biased Because They Are Large Language Models
description: Study notes on Philip Resnik's Computational Linguistics position paper arguing that harmful bias is an in-principle consequence of purely distributional language modeling, not a bug that mitigation can remove.
resource: https://doi.org/10.1162/coli_a_00558
source: /archive/llms-are-biased-because-they-are-llms.pdf
tags: [governance, reinforcement-learning, evaluation, reliability, fine-tuning]
timestamp: 2026-08-25T19:29:18Z
---

# Large Language Models Are Biased Because They Are Large Language Models — Study Notes

**Author**: Philip Resnik (University of Maryland, Department of Linguistics and Institute for Advanced Computer Studies)
**Venue**: *Computational Linguistics*, Volume 51, Number 3, pages 885–906 — Position Paper
**Action editor**: Saif Mohammad. Submitted 1 January 2025; accepted 4 March 2025
**DOI**: 10.1162/coli_a_00558
**License**: CC BY-NC-ND 4.0 (© 2025 Association for Computational Linguistics)
**Pages**: 22

## What It Is

A position paper, not an experimental result. Resnik argues that harmful social bias is an *inevitable* consequence of what a large language model is: a model trained to assign high probability to human-generated text. The paper's own framing of its goal is deliberately modest — provoke discussion — with a secondary goal of convincing the reader that mitigation methods such as RLHF cannot solve the problem in principle, so the field should re-examine the foundational assumptions of LLM design rather than treat bias as a downstream defect to be patched.

The argument runs in four moves: define bias precisely enough to argue about; establish what LLMs are models *of*; observe that the latent structure underlying human text includes the harmful parts; and show that nothing in a purely distributional objective distinguishes harmful latent structure from useful latent structure. The framing device is the scorpion and the frog — the closing line of the argument is "It's in their nature."

## Defining Bias Well Enough to Argue About It

Resnik borrows Adcock and Collier's (2001) measurement-validity ladder: background concept → systematized concept → operationalization. The background concept is an LLM producing harmful outputs (discriminatory decisions, group-based generalizations, non-representative data, marginalized perspectives). The systematized concept leans on the APA Dictionary's "partiality: an inclination or predisposition for or against something," and isolates two elements: a **choice**, and that choice being **influenced by information prior to the specific context**.

Treating any biasable entity as a function `f` from inputs `A` to outputs `O` with internal structure `X`, he offers a first-pass operationalization:

> `B = D(P_f(o|a; X) || P_f(o; X))^-1`

— the inverse KL-divergence between posterior and prior. The less the output depends on the input, the more biased the function is; identical distributions give zero divergence and therefore infinite bias, matching the intuition of "proceeding on prior disposition, evidence be damned."

Two things follow that make the paper's move interesting. First, this definition is value-neutral: bias in this sense is essential to learning (Gold, Mitchell, Haussler), adaptive as heuristics (Simon, Gigerenzer), and fundamental to Bayesian perception and cognition. Any useful function is biased in this sense. So **the real question is not "what do you mean by bias?" but "what do you mean by harmful?"** — and harm is inescapably normative (Blodgett et al. 2020). Second, that yields the refined definition of harmful bias:

> `B_h = D(P_f(o|r_f(a); X) || P_f(o|r_n(a); X))^-1`

where `r_f(a)` is the representation of the input the function actually uses and `r_n(a)` is that representation with normatively unacceptable information (e.g., protected demographic categories) removed. Harmful bias is the divergence between what the model computes on and what it would be normatively permitted to compute on.

## What LLMs Are Models Of

The paper is deliberately old-fashioned here, and that is the point. A language `L` is a distribution `Pr_L(w)` over symbol sequences; a language model `M` is a distribution `Pr_M(w)` approximating it; quality is fidelity, formally relative entropy `D(p_L || p_M)`, estimated in practice as cross-entropy over a large sample — which is exactly why LMs are trained on cross-entropy loss and not something else. Generative models posit latent events `x` in a joint `Pr(x, w)`, as an HMM posits state transitions.

LLMs differ from earlier LMs in three respects only: vastly more training text, vastly more parameters, and more sophisticated architectures. They are *still just language models*, so (a) their definitional goal remains approximating `Pr_L(w)`, and (b) both `L` and `M` involve non-observable structure `x`, not only the observed `w`. Resnik notes explicitly that his argument applies to whatever future models emerge as long as the LM part remains and the training sets remain vast quantities of human text.

## The Load-Bearing Step: What Underlies Human Text

A model need not recover the same latent process as humans to approximate their distribution well — but Resnik argues it would be "shocking" if models this good at the approximation did not capture important aspects of the human latent process. He notes that this assumption is already load-bearing elsewhere: cognitive-science work using LLMs assumes it, and the octopus argument (Bender and Koller 2020) reduces to whether `Pr_L(x, w)` can be inferred from `w` alone. Anyone who says models *can* infer human latent structure from form has committed to exactly the premise the paper needs.

And then, bluntly: "a lot of what's in people's heads sucks." The `x` behind human language includes syntax and naïve physics, and *also* gender and racial stereotyping, extreme nationalism, and misinformation treated on par with fact.

## The In-Principle Argument (the *nurse* example)

Three statements, all statistically true of *nurse* in an American context:

1. A nurse is a kind of healthcare worker. — **definitional**, context-invariant, normatively fine to use.
2. A nurse is likely to wear blue clothing at work. — **contingent**, normatively acceptable to use.
3. A nurse is likely to wear a dress to a formal occasion. — **contingent**, and normatively unacceptable to use for inference in most contexts.

The claim: an LLM, as currently constituted, has no basis for distinguishing these. In embedding space and in contextual representation, *nurse* co-occurring more with *hospital* than *theater* (grounded in meaning) and *nurse* co-occurring more with *she/her* (grounded in a society that retains gendered role expectations) are the same kind of observation. Pre-training that defines quality entirely by probabilities estimated from observed language "has no way to tell these observations about distribution apart."

The paper preempts the obvious objection: an LLM can of course *generate text describing* the distinction, or be prompted into unbiased-looking responses. But there is no necessary relationship between overt direct-response behavior and underlying representational bias — Hofmann et al. (2024) find models emitting positive overt stereotypes about African Americans while exhibiting covert dialect-based prejudice.

## Why RLHF Cannot Close the Gap

Resnik first establishes where LLM power actually comes from: not mimicry, but representation learning via dimensionality reduction (Bengio, Courville, and Vincent 2013), building on the LSA lineage (Landauer and Dumais 1997) and capturing *n*th-order co-occurrence. His illustration is *Les Misérables* and *Thermopylae* — rarely co-occurring, but each frequent with *outnumbered*, so an indirect conceptual relation emerges. The result is a model where latent `x` connects to observable `w` "in literally unimaginable ways."

Against that backdrop he lists four properties of RLHF that bound what it can achieve:

1. **Feedback is human judgment about contested concepts.** Annotators follow developer-specified goals (Ouyang et al. 2022's "abusive, threatening, or offensive"), judgments are context-dependent (acceptable within a marginalized in-group, not in public discourse — Sap et al. 2019), rater diversity is limited, and developer bias shapes both rater selection and instructions. Net effect: RLHF **replaces one set of under-characterized biases derived from an enormous number of people with another set derived from a far smaller number**. Resnik suggests *essentially contested concept* (Gallie 1955) as the right vocabulary — bias may itself be one.
2. **Biases are not stable over time.** Eyeglass stigma in the Great Depression; handshake norms changing in weeks during COVID; #MeToo shifting disclosure norms within days and producing 40 state bills by February 2018. Commercial LLM releases are months to a year apart, so norms may now change faster than models do.
3. **The optimization is anchored to the pre-trained model by construction.** Standard RLHF does not optimize on human preference alone, because a `θ'` too far from `θ` loses the capability that the expensive pre-training bought (and, per Lambert et al. 2022, degenerates into reward-model-fooling gibberish). So RLHF is inherently a trade-off: push away from harmful latent structure, but not hard enough to lose the desirable latent structure entangled with it.
4. **The whole navigation happens in a sea of uncertainty.** Criteria are hard to specify, feedback is variable, rater selection is biased, norms move, representational fixes may not transfer downstream, and no mitigation method offers visibility into how underlying structure was changed.

The sharpest supporting evidence is Betley et al. (2025) on emergent misalignment: fine-tuning models to write malicious Python produced models that gave harmful advice on entirely unrelated topics (the paper quotes the hire-a-hitman response to a marital complaint). Something like "be harmful" propagated across representational space from a narrow code-generation objective. Take-away: **any steering technique — RLHF, instruction tuning, task fine-tuning, adapters, prompt engineering — operates within constraints set by pre-training that we cannot see**.

Hence the balloon metaphor: mitigation squeezes the problem from one part of the model to another. Gallegos et al. (2024) and Hofmann et al. (2024) report bias-removal attempts amplifying bias or merely obscuring it at the surface while deeper stereotypes persist. And if a next round of mitigation kills the deeper problem, how would you know there is not a deeper one still, or one displaced sideways?

## The Proposed Direction

Not "stop building LLMs," and explicitly not "return to hand-built symbolic semantics" (Resnik is blunt that GOFAI failed in its own way). His target is the **hard-core reading of the distributional hypothesis** — meaning *is* distribution. He points out that even Harris (1954) spoke of distributional relations "which correlate with *some aspect of* meaning," and Church and Mercer (1993) described classifying words "not *only* on the basis of their meanings but *also*" on co-occurrence. Distribution as *part* of meaning is the moderate reading, and it is the one LLMs abandoned.

Concrete starting points he floats:

- **Distinguish standing/conventional meaning from contextual/conveyed meaning** (Borg and Fisher 2021) in the model's representations. Conventional meaning is stable and excludes much of what we call harmful bias — nothing in the standing meaning of *nurse* pertains to gender. Card et al. (2022) already exploit this distinction to *detect* dehumanization of immigrant groups; making it explicit in representations might address generation as well.
- **Modularity separating formal from functional linguistic competence** (Mahowald et al. 2024), where normatively appropriate use lives on the functional side.
- **Cross-community work**: LLM developers with linguists, social scientists, and the knowledge-plus-data AI traditions outside the LLM mainstream.

With that structure in place, he conjectures you could operationalize principles of the form "inferences related to property or goal A must not rely on representational properties in category B," with categories stated through transparent normative reasoning.

## Conclusions and the Post-Conclusion Discussion

The conclusion: capturing latent structure is the secret sauce, and models trained purely on distribution cannot distinguish definitional patterns from normatively acceptable generalizations from normatively unacceptable ones. "It's not a bug, it's what they were meant to do." The core problem is "not NP-complete, nor AI-complete, but society-complete."

He also argues the exploration/exploitation cycle that historically corrected the field (symbolic 1970s–80s → statistical 1990s → knowledge-plus-supervision → web-scale indirect supervision → LLMs) is now stuck on exploitation, because only multi-billion-dollar organizations can afford to explore at the foundation level, and everyone else must adopt the incumbent assumptions to participate.

Section 9 is unusual and worth reading on its own: Resnik prints reviewer and pre-publication objections and answers them.

- *Is harmful LLM bias actually a thing?* He was surprised by the question, then found it "surprisingly difficult" to locate systematic empirical studies of real-world harms — the demonstrations are essentially all **in vitro** (Hirota et al. 2022; Hofmann et al. 2024's "hypothetical experiment"). His counter is regulatory-analogic: in drug development or UL appliance certification, in vitro evidence of potential harm already triggers caution far beyond what LLM deployment receives.
- *How do we know the distinctions aren't discovered distributionally?* He concedes he has no proof (contrast Bouyamourn 2023's formal proof that LLMs must hallucinate), but insists a counter-claim needs argument or valid evidence — and behavioral probing does not count, per the covert/overt divergence.
- *This was already obvious — there is no view from nowhere.* He is sympathetic, and endorses the implication that developers must state explicit normative reasoning rather than "gather a thoughtful set of principles" ad hoc.
- *People are biased too.* Two disanalogies: LLM bias is a design property and designs can be changed (human bias is society-complete, LLM bias need not be); and we have decades of experience predicting and countering human bias, versus almost no idea what to expect from an LLM under the hood.
- *What evidence would convince you?* He argues this "shouldn't be solely an empirical question" in the current benchmark mode, because confidence in safety normally rests on mechanistic understanding as well as testing. Without it, testing-then-mitigating is "a never-ending game of whack-a-mole."
- *Mightn't that lead to less useful models?* "Quite possibly, at least for some period of time" — but the arms-race terms are a choice, not a necessity.
- *You are assuming X about LLMs.* Fair: he assumes general-purpose single-pre-training-corpus models, non-systematic sampling of human text, and no non-textual grounding. If those change, the conclusions may change. A reviewer's framing that he endorses: "Under the assumptions the paper makes, its argument is valid; if someone develops an LLM that violates these assumptions, the paper makes no claims about such an LLM."

## Analyst Takeaways

1. **The argument is a scoping claim, not a doom claim.** It says: *given* pure cross-entropy training on an unsystematic human corpus with no grounding and no representational distinction between conventional and contingent meaning, harmful bias is not removable. Every one of those conditions is an engineering choice, which is where the leverage sits. Read it as a specification of what would have to change, not as a prohibition.
2. **Behavioral evaluation cannot certify a representational property.** The Hofmann covert/overt result is the operative one for anyone building bias evals: a model that answers correctly when asked directly tells you about its response policy, not about what its representations encode. Any eval program that only measures overt outputs is measuring the layer that mitigation most easily moves.
3. **Anchoring is the structural reason mitigation saturates.** The KL-style proximity term in RLHF is not an implementation detail — it is what guarantees you cannot push far enough to remove entangled structure without losing the capability you paid for. Expect diminishing returns from any post-training method that must preserve pre-training behavior.
4. **Narrow fine-tuning has non-local effects.** Betley et al.'s emergent misalignment is the concrete warning: a task-specific fine-tune can shift behavior in unrelated domains. Post-fine-tuning evaluation restricted to the fine-tuned task is insufficient.
5. **Norm drift outpaces release cadence.** Any bias criterion baked into a model at training time is a snapshot of a moving target; systems that need current norms should keep the normative layer outside the weights where it can be updated.
6. **Demand a definition before arguing about bias.** The `B_h` formulation — divergence between the representation used and the normatively permitted representation — is a usable discipline: it forces you to state which input information is off-limits before you claim something is biased.

## Questions and Limitations

- No proof and no experiments. Resnik says so explicitly: the paper does not demonstrate that pre-trained LLMs fail to encode the conventional/contingent/normative distinctions, only argues they have no mechanism or incentive to.
- The load-bearing premise — that a good approximation of `Pr_L(w)` must capture important aspects of the human latent `x` — is asserted as "would be shocking if not," supported by appeal to how other researchers already reason, not by evidence.
- The remedy is a direction, not a design. "Represent standing versus conveyed meaning" has no architecture, training objective, or evaluation attached, and the paper does not address how the normative categories themselves would be chosen, contested, or maintained.
- The evidence base for real-world harm is thin *by the paper's own admission*, which cuts both ways: it strengthens his critique of the mitigation literature while weakening the urgency claim he builds on it.
- The argument's scope is bounded by assumptions the author lists (general-purpose models, unsystematic corpora, no grounding). Curated-corpus, multimodal-grounded, or retrieval-anchored systems are outside its claims — a substantial carve-out given where deployment is heading.
- Post-2025 developments (reasoning-trained models, constitutional/rule-based alignment, large-scale synthetic data) are not addressed and would need contemporary verification against the argument.

## Vault Ideas Extracted

* [Distributional Normativity Blindness](/vault/distributional-normativity-blindness.md) — the core in-principle claim
* [Overt–Covert Bias Divergence](/vault/overt-covert-bias-divergence.md) — why behavioral evaluation cannot certify representational properties
* [Anchor-Constrained Bias Mitigation](/vault/anchor-constrained-bias-mitigation.md) — why RLHF-style steering saturates
* [Bias as Prior Dominance](/vault/bias-as-prior-dominance.md) — the KL-divergence operationalization of bias and harmful bias
