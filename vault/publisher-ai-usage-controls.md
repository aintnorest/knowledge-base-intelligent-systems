---
type: Synthesis
title: Publisher AI Usage Controls
description: The distinct, non-interchangeable layers a site owner can use to govern crawling, indexing, snippet extraction, generative-answer inclusion, and model training — and why conflating them produces the wrong outcome.
tags: [generative-search, governance, access-control, retrieval, provenance]
timestamp: 2026-08-11T20:55:21Z
---

# Publisher AI Usage Controls

A site owner has several mechanisms for governing what an AI system may do with their content. They look interchangeable and are not. Each operates at a different stage of the pipeline, each is enforced by a different subsystem, and setting one does not imply the others. The recurring failure is a publisher who believes they have opted out of generated answers when they have only opted out of model training — or who suppresses snippets for display reasons and silently loses generative visibility as a side effect.

## The Layers

| Layer | Typical mechanism | What it governs | What it does *not* govern |
|---|---|---|---|
| Fetch | `robots.txt` disallow for a crawler token | Whether the crawler retrieves the bytes | URL discovery; a blocked URL can still be listed from external links |
| Index | `noindex` (requires crawling to be *allowed* to be seen) | Whether the page enters the index | Whether already-indexed copies expire immediately |
| Snippet / preview | `nosnippet`, `max-snippet:[n]`, `max-image-preview`, `data-nosnippet` | How much text may be displayed *and*, on some platforms, how much may be used as direct input to a generated answer | Indexing; the page stays indexed and rankable |
| Generative inclusion | A console-level site setting | Whether the site appears in the vendor's generative answer surfaces | Indexing, classic ranking, or training |
| Training / external grounding | A separate crawler token (e.g. an "extended" token) | Use of content to train models, and grounding in the vendor's *non-Search* assistant products | Inclusion or ranking in the vendor's search product |

## The Three Confusions Worth Naming

1. **Training tokens are not answer-surface controls.** A vendor's AI-training crawler token typically governs model training and grounding in that vendor's standalone assistant — explicitly *not* inclusion or ranking in its search product, and therefore not its in-search generated answers. Disallowing it does nothing about AI Overviews-class surfaces.
2. **Snippet controls have become AI-input controls.** Directives originally defined for display length now carry a second clause: suppressing snippets can also prevent content from being used as direct input to generated answers, and a character cap can also cap how much may be used. This repurposing means a legacy `max-snippet` set years ago for display reasons is now throttling generative grounding. It also implies the converse: *snippet eligibility is a precondition for generative eligibility*, so a blanket `nosnippet` is a full opt-out of generated answers.
3. **`robots.txt` is not `noindex`.** Blocking the crawler prevents fetching but not listing, and it also prevents the crawler from ever seeing a `noindex` directive on the page. To remove a page, allow crawling and serve `noindex`.

## Carve-Outs and Precedence

Controls are not absolute. Separately granted permissions can override them: in-page structured data supplied by the publisher, product feeds, licensing agreements, and participation in commerce or advertising programs are typically treated as independent grants that a snippet cap or a generative-inclusion opt-out does not retract. Read every control as "governs the default path," not "governs all uses."

Propagation is also asynchronous. Console-level exclusions take days, caches and derived artifacts lag, and content already used to train a model is not recalled by a later opt-out. These controls are prospective, not retroactive.

## Practical Use

1. Write down the intended outcome first — not indexed, not previewed, not used in generated answers, not used for training — then map each to its own mechanism. There is rarely one switch.
2. Audit inherited settings. Legacy `max-snippet` values and template-level robots meta tags are the most common source of unintended generative suppression.
3. Enumerate vendors separately. Token names, directive semantics, and console controls differ per platform, and a policy written for one search engine says nothing about another assistant's fetcher.
4. Use element-level exclusion (`data-nosnippet`-style attributes) when only part of a page is sensitive, rather than suppressing the whole page.
5. Log crawler traffic by user agent. Declared policy and observed fetching diverge, and the access layer is the only one you can independently verify.

## Limitations

These are cooperative controls: they bind crawlers that choose to honor them, and they say nothing about third parties that scrape, about content redistributed by others, or about models already trained. They also govern *use*, not *outcome* — none of them gives the publisher a say in whether a generated answer that does use the content represents it fairly or links back to it. And the levers are almost entirely subtractive: a publisher can withhold content from a generative surface but has no documented mechanism to affirmatively add it.

## Sources

- [Optimizing Your Website for Generative AI Features on Google Search](/dossiers/google-search-generative-ai-optimization-guide.md) — makes snippet eligibility an explicit precondition for generative-feature eligibility, and its linked specifications supply the `nosnippet`/`max-snippet` AI-input clauses, the console-level inclusion control, and the statement that the training token does not affect Search inclusion or ranking.
