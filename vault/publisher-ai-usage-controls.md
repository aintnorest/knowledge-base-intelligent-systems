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
| Fetch | `robots.txt` crawler restrictions | Whether a cooperating crawler retrieves bytes | URL discovery; a blocked URL may still be listed from external links |
| Index | `noindex` on a crawlable page | Whether an honoring index retains the page | Immediate expiry of cached copies |
| Snippet / preview | `nosnippet`, `max-snippet`, `data-nosnippet` | The text eligible for display; some platforms also tie this to generated-answer input | Indexing, which is a separate decision |
| Generative inclusion | A separate answer-surface control, where offered | Eligibility for a generated answer | Indexing, ranking, or training |
| Training / external grounding | A separate training-access policy, where offered | Model training or assistant grounding under that policy | Inclusion in other search or answer surfaces |

## The Three Confusions Worth Naming

1. **Training access is not answer-surface control.** Training permissions and generated-answer eligibility are distinct decisions. Withholding training access does not, by itself, exclude content from a search-generated answer.
2. **Snippet controls can become AI-input controls.** A display-oriented cap may also limit direct input to generated answers on platforms that tie these uses together. An old cap can therefore suppress grounding unexpectedly; do not infer that all platforms treat snippet ineligibility as a complete generated-answer opt-out.
3. **`robots.txt` is not `noindex`.** Blocking the crawler prevents fetching but not listing, and it also prevents the crawler from ever seeing a `noindex` directive on the page. To remove a page, allow crawling and serve `noindex`.

## Carve-Outs and Precedence

Controls are not absolute. Separately granted permissions, such as structured data, feeds or licensing agreements, may permit uses outside the default crawling or snippet path. A restriction on one path should not be assumed to revoke independent grants.

Changes also propagate asynchronously: caches and derived artifacts may lag, and a later opt-out cannot recall training already completed. Treat these controls as prospective, not retroactive.

## Practical Use

1. Write down the intended outcome first — not indexed, not previewed, not used in generated answers, not used for training — then map each to its own mechanism. There is rarely one switch.
2. Audit inherited snippet caps and page-level robots directives for unintended suppression; confirm the effect on each relevant platform.
3. Enumerate vendors separately. Token names, directive semantics, and console controls differ per platform, and a policy written for one search engine says nothing about another assistant's fetcher.
4. Use element-level exclusion such as `data-nosnippet` when only part of a page is sensitive, rather than suppressing the whole page.
5. Log crawler traffic by user agent. Declared policy and observed fetching diverge, and the access layer is the only one you can independently verify.

## Limitations

These are cooperative controls: they bind crawlers that choose to honor them, and they say nothing about third parties that scrape, about content redistributed by others, or about models already trained. They also govern *use*, not *outcome* — none of them gives the publisher a say in whether a generated answer that does use the content represents it fairly or links back to it. And the levers are almost entirely subtractive: a publisher can withhold content from a generative surface but has no documented mechanism to affirmatively add it.

## Sources

- [Optimizing Your Website for Generative AI Features on Google Search](/dossiers/google-search-generative-ai-optimization-guide.md) — Google ties snippet eligibility to generative-feature eligibility, extends `nosnippet`/`max-snippet` to direct AI input, supports `max-image-preview` and a console-level inclusion control, and states its training crawler token does not affect Search inclusion or ranking; these are platform-specific behaviors.
