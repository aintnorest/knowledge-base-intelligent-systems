---
type: Research Paper
title: "Generative Engine Optimization in Practice: A Framework-Agnostic Implementation Guide"
description: "A synthesis of two practitioner GEO guides into a stack-independent implementation method covering content structure, answer-first writing, attribution signals, entity consistency, structured data, AI crawlability, freshness, and a measurement loop."
tags: [retrieval, context-engineering, knowledge-graphs, evaluation, provenance]
timestamp: 2026-08-11T20:55:03Z
version: "1.0"
---

# Generative Engine Optimization in Practice

## A Framework-Agnostic Implementation Guide

**Authored:** 2026-08-11

**Document type:** Synthesis of two practitioner sources, with generalization and evidence grading by the author

**Primary sources:**

- **[S]** Paul Bratslavsky, *A Brief Guide to Generative Engine Optimization for Developers*, Strapi blog, published 2025-09-15, updated 2026-06-14 — <https://strapi.io/blog/generative-engine-optimization-geo-guide>
- **[D]** Nerando Johnson, *GEO: Generative Engine Optimization — Applied*, DEV Community, 2025-11-30 — <https://dev.to/nerajno/geo-generative-engine-optimization-applied-27a3>

> **What this document is.** This is an original synthesis authored on 2026-08-11. It is not a reproduction of either source. Where a claim, framing, metric, or tactic originates in one of the two sources it is marked **[S]** or **[D]**; unmarked material is the author's generalization, reconciliation, or critique. Both sources illustrate their advice with a specific stack — [S] with a headless CMS and a React/Node toolchain, [D] with a static-site component framework. **All stack-specific instruction has been deliberately removed here.** Every recommendation below is expressed as a property of the delivered HTTP response and the published content, so it can be implemented on any CMS, static generator, hand-written site, or application server.

> **Evidence boundary.** Both sources are practitioner guides, not controlled studies. Neither reports an experiment, an effect size, or a measured citation lift; [S] explicitly concedes that impacts on AI citation "have not been empirically established" for its own recommended stack, and [D] cites no study at all. Treat everything here as a *defensible engineering default* justified by how retrieval-augmented answer systems are known to work — not as a demonstrated ranking effect. Section 11 lists the claims most in need of measurement.

---

## Abstract

Generative Engine Optimization (GEO) is the practice of publishing content so that an AI answer system can fetch it, parse it, isolate a self-contained fact, and attribute that fact to you. It differs from search engine optimization in its unit of success: SEO competes for a position in a ranked list of links, whereas GEO competes for inclusion inside a synthesized answer **[S][D]**. That difference changes what an implementer actually edits — from title tags, keyword density, and anchor text toward semantic document structure, extractable passages, consistent entity naming, validated structured data, machine-readable access policy, and a citation-based measurement loop.

This paper reconciles two independent practitioner guides into one framework-agnostic method. It contributes: (1) a pipeline model of what an AI answer system does to a page, which explains *why* each tactic is recommended; (2) nine implementation areas expressed as response-level properties rather than stack instructions; (3) an explicit separation of the two sources' well-supported advice from their weakly supported claims; and (4) a measurement and iteration loop whose primary metric is citation inclusion rather than sessions.

---

## 1. What GEO Is, and Two Useful Definitions

The two sources define GEO compatibly but from different distances.

[D] gives the operational definition: GEO means "structuring your content so AI engines like ChatGPT, Claude, and Google Gemini can easily parse, understand, and cite your work," so that content is simultaneously "human-readable (good UX) and machine-readable (good parsing for AI and search engines)." [D] reduces implementation to three pillars: **semantic HTML structure, explicit content formatting, and structured data markup**.

[S] gives the architectural metaphor: GEO is "the practice of building clean, documented 'interfaces' for large language models the same way you build REST endpoints for humans and machines," where "the goal shifts from ranking on a search results page to being the data source an AI assistant trusts enough to quote." [S] extends the metaphor consistently — markup is "a type system for your content," structured data is "TypeScript for content," a page is "an API response that must be parsed, vectorized, and cited," and a passing AI citation is "a unit test" for the content.

Both framings converge on one working definition used throughout this paper:

> **GEO is the discipline of making a published claim independently extractable and confidently attributable by a machine reader that will never render your page for a human.**

That phrasing is load-bearing. Three properties fall out of it directly, and they are the spine of everything in Sections 4–8:

1. **Extractable** — the answer exists as a contiguous, self-contained span, not as a conclusion the reader assembles across sections.
2. **Locatable** — document structure tells the machine which span answers which question, before any semantic scoring happens.
3. **Attributable** — the page states unambiguously who published it, when, and about which entities, in a form that survives boilerplate stripping.

A fourth property, **reachable**, is prior to all three and is treated separately in Section 9: none of this matters if the fetch fails, the content is not in the delivered markup, or your access policy excludes the crawler.

### 1.1 The distinction from SEO, stated precisely

[S] tabulates the shift as: keyword meta tags → JSON-LD typed entities; keyword-stuffed anchor text → internal links mapped to topic clusters and canonical entities; `robots.txt` for a search crawler → `llms.txt` plus index-notification pings for LLM crawlers; page speed tuned for Core Web Vitals → lightweight markup and pre-rendering so tokenizers stay within context budget. [D] states the same contrast more simply: "Traditional SEO focuses on keyword optimization and page ranking, while GEO emphasizes semantic structure and explicit answers that AI can cite directly."

Both sources agree GEO is not a replacement discipline. [D] is explicit that the two are not a choice: "GEO techniques like semantic HTML and structured data actually improve traditional SEO performance while adding AI discoverability." This paper adopts that position. Nothing recommended here degrades conventional search performance, and most of it — valid structured data, clean heading hierarchy, fast crawlable responses, accessible markup — has been ordinary technical-SEO and accessibility advice for a decade. **The genuine novelty in GEO is not the tactics; it is the objective function and the measurement loop.**

---

## 2. The Pipeline You Are Actually Optimizing For

[S] offers the most useful mental model in either source: treat an AI crawler as "a mini-compiler." It requests raw HTML, strips boilerplate with a parser, tokenizes every sentence, and builds vector embeddings. Generalizing that into the stages an implementer can affect:

| Stage | What happens | What an implementer controls | Failure mode |
|---|---|---|---|
| 1. Discovery | The system learns the URL exists | Sitemaps, internal links, index notifications, stable URLs | Content is never seen |
| 2. Fetch | The URL is requested and a status returned | Access policy, latency, rate limits, auth walls | Timeout, block, or 4xx |
| 3. Render/parse | Markup becomes a document tree | Whether content is in the delivered response or injected client-side | Empty or skeletal document |
| 4. Boilerplate strip | Navigation, chrome, and ads are discarded | Semantic sectioning that marks main content as main content | Body text discarded with the chrome |
| 5. Chunk | Document is split into retrievable units | Heading hierarchy, paragraph independence, section length | Answer split across chunks, or diluted in a huge one |
| 6. Embed/index | Chunks become vectors and metadata | Terminology consistency, entity naming, structured data | Chunk fails to match the query it answers |
| 7. Retrieve | Chunks are selected for a specific question | Question-shaped headings, direct answers | Not retrieved despite being indexed |
| 8. Synthesize and cite | An answer is composed and sources named | Self-containment, unambiguous attribution metadata | Used without citation, or cited wrongly |

Two consequences deserve emphasis because both sources gesture at them without stating them plainly.

**The chunk is the unit of competition, not the page.** Stages 5–8 operate on fragments. A page that is excellent as a whole but whose key claim is distributed across three sections has no single chunk that answers the question. This is the mechanical reason behind [D]'s "self-contained statements" rule and [S]'s "atomic fact an LLM will quote" framing, and it is the single highest-leverage idea in either source.

**Token budget is a real constraint, but the sources' specific numbers are dated and should be ignored.** [S] warns that "context windows in production models top out at tens of thousands of tokens, so bloated markup or repetitive phrasing eats precious budget," and elsewhere advises passages that "fit within typical 4k-token context windows." As of this writing those figures badly understate deployed context lengths. The *durable* form of the claim is not about a specific window size: retrieval systems select a small number of chunks under a per-query budget regardless of total model capacity, so **verbosity competes against you for selection, not for capacity**. Optimize for information density per chunk, not against a numeric window.

---

## 3. Implementation Method: Nine Areas

The remaining sections are ordered by leverage-per-effort as assessed by this author, not by the order used in either source. Areas 4–6 change what you write; 7–8 change how machines identify you; 9–10 change whether you are reachable and current; 11 closes the loop.

---

## 4. Content Structure and Headings

Both sources make document structure their first recommendation, and both make the same two moves.

**Use structural elements that carry meaning.** [D] prescribes HTML5 semantic elements — `<article>`, `<section>`, `<header>`, `<footer>`, `<main>`, with `<nav>` and `<aside>` for peripheral content — because they "provide clear content hierarchy that AI models can interpret," and directs implementers to "replace generic `<div>` containers." [S] shows the same refactor as a diff, replacing a `<div>` wrapping a bolded pseudo-heading with `<header>`/`<h1>` plus a `<main>` containing labelled `<section>` elements with explicit IDs, arguing these "act like named parameters, telling the crawler 'this is the primary title' and 'this subsection is callable.'"

Framework-agnostic rule: **the delivered document must distinguish primary content from chrome using structure, not CSS class names.** Exactly one `<main>`. Navigation, headers, footers, and promotional modules outside it. Each addressable topic in its own sectioning element with a stable `id`. This survives boilerplate stripping (stage 4) and gives chunkers legible boundaries (stage 5). Class names like `class="post"` communicate nothing to a parser; `<article>` does.

**Make every heading a specific, unique claim about what follows.** [D] is the more concrete source here: use "clear, unique headings that represent key facts and topics," and avoid generic headings — "Avoid generic headings like 'Introduction' or 'Details'—instead use specific titles like 'How to Implement JSON-LD…' or 'Benefits of Semantic HTML for AI Parsing.'" [S] adds that non-hierarchical headings cause the model to treat the data "like a malformed payload."

Practical heading rules that generalize:

- One `<h1>` stating what the page answers. No level skips (`h2` → `h4`).
- Headings phrased as the question a user would ask, or as the assertion the section proves. "Rate limits reset every 60 seconds" outperforms "Rate Limits"; "How do I rotate an API key?" outperforms "Key Management."
- Heading text unique within the site, not merely within the page. Twelve pages with an `<h2>Overview</h2>` produce twelve chunks whose titles carry no retrieval signal.
- Sections sized to one idea. A section long enough to be split mid-argument will be.

**Explicit question-and-answer blocks.** [D] recommends "dedicated question-and-answer blocks or summary sections that AI can directly reference in conversational responses," and adds an FAQ section to its own worked example. This is worth doing for a specific reason the source does not state: an FAQ entry is *natively* the shape of the retrieval unit — a question string adjacent to a short, complete answer — which makes question-to-chunk matching nearly trivial. Do not, however, let an FAQ become the only place complete answers live; the body prose should still stand alone.

**Information architecture as a graph.** [S] recommends organizing pages "like microservices," where "each topic cluster becomes a content module, its internal links the dependency injection that lets crawlers traverse context." [D] independently recommends "logical hierarchies," breadcrumbs, "consistent URL structures," and "rich internal link structures that help AI understand topic relationships and content depth." Generalized: one canonical page per concept, a hub page per cluster, descriptive anchor text naming the target concept (never "click here" or "read more"), and stable URLs that do not churn. Anchor text is entity-labelling as much as navigation.

**Accessibility is not a separate workstream.** [D] makes the observation explicitly — "Accessible content is inherently more parseable by AI. Follow WCAG guidelines for semantic markup, ARIA labels, and clear content structure." This deserves more prominence than either source gives it. Screen readers and AI extractors consume the same signals: heading order, landmark roles, label associations, alt text, table headers. A site that passes an accessibility audit has already done most of the structural work GEO asks for, which makes accessibility the cheapest available proxy metric for machine-readability.

---

## 5. Answer-First, Self-Contained Writing

This is the highest-leverage area and the one where the two sources agree most precisely.

[D]: "Write concise, complete statements that generative models can easily extract and cite without requiring additional context… Each paragraph should be able to stand alone as a complete thought. Avoid vague references that require reading previous sections for context. This helps AI extract and cite specific facts accurately."

[S]: write "semantically rich, answer-first passages"; the strategic question shifts from "How do I win the click?" to "How do I provide the atomic fact an LLM will quote?"

The unifying rule: **write so that any single paragraph, lifted out of the page and shown alone, remains true, complete, and correctly scoped.** Concretely:

1. **Answer in the first sentence after the heading.** Then qualify, then explain, then illustrate. Background before answer is the dominant failure pattern in technical writing and it puts the answer in the wrong chunk.
2. **Resolve pronouns and deixis to nouns at paragraph start.** "It supports three modes" is unusable when extracted. "The rate limiter supports three modes" is citable. Same for "as mentioned above," "this approach," "the former."
3. **Repeat the subject on purpose.** Cross-paragraph pronoun economy is good prose style and bad extraction hygiene. Where the two conflict, favor extraction: state the subject noun in each paragraph that makes a claim about it.
4. **Put numbers, units, versions, and dates inside the sentence that makes the claim.** "The limit is 100" is not extractable; "The default limit is 100 requests per minute per API key as of v3.2" is.
5. **Scope every claim.** State the conditions under which it holds inside the same sentence or the next. An extracted absolute claim that was true only under an unstated condition is how a correct page becomes a source of a wrong answer.
6. **Front-load the page with a direct summary answer.** A short lead paragraph that answers the page's title question is the single highest-value paragraph on the page.
7. **Prefer definite tables and lists for enumerable facts.** Structured comparisons chunk cleanly and survive extraction better than the same content in prose.

**Author's caution, supported by neither source directly:** self-containment taken to an extreme produces repetitive, robotic prose that degrades the human experience and looks like the low-quality machine-oriented content that answer engines actively down-weight. The target is *paragraph-level independence with normal readability*, not the same sentence restated in every section. [D]'s own framing — "human-readable (good UX) *and* machine-readable" — is the right constraint; when the two genuinely conflict, this author's rule is to keep the human version and add an explicit summary block rather than to distort the prose.

---

## 6. Citations, Statistics, Quotations, and Authority Signals

**What the sources actually say.** [S] argues authority is a first-class GEO input: strengthen "E-E-A-T signals—experience, expertise, authoritativeness, trustworthiness—because AI ranking algorithms favor authoritative voices when assembling conversational answers," and warns of a compounding loop — "fewer citations reduce perceived authority, which lowers future extraction probability," producing "winner-takes-most dynamics" once an answer system settles on a trusted source. [D] recommends, under entity optimization, that you "link to authoritative sources."

**What the sources do not say, and this paper will not fabricate.** A well-known line of GEO research reports that adding cited sources, statistics, and quotations to a page raises its visibility in generated answers by double-digit percentages. **Neither of these two sources cites that work, reports such an experiment, or provides any comparable statistic.** [D] contains no numbers at all; [S]'s only quantitative content is illustrative code and a claim about pipeline duration. Any effect size in this area must be sourced from research outside these two documents. This paper therefore treats the following as *reasoned practice*, not measured effect:

- **Cite your own claims, inline, with named sources and dates.** A page whose factual assertions carry visible attribution is easier for a synthesizer to verify, and easier for it to justify quoting.
- **Prefer first-party, verifiable numbers.** Publish the measurement you actually ran, with sample size, date, and method, rather than restating a third-party statistic. A number nobody else has is a number only you can be cited for.
- **Attach every statistic to its date and scope.** Undated figures are extraction hazards; they get quoted years later as current.
- **Use short, attributed quotations from named authorities where they carry weight** — a quotation is a pre-formed citable unit, and it names a second entity your page is associated with.
- **Link outward to primary sources, not to aggregators.** [D]'s "link to authoritative sources" is more useful read as *link to the definition, spec, or dataset itself*.
- **Make authorship and expertise explicit on the page**, not only in metadata: named author, role, date published, date substantively updated, and what the author's basis for the claim is.

**The compounding argument, evaluated.** [S]'s claim that early citation advantage self-reinforces is plausible for systems whose retrieval is influenced by aggregate link and mention signals, and is unverified for systems that retrieve fresh per query. This author's position: treat it as a reason to start early and to build durable authority signals, not as evidence that late entrants are locked out. [S] has an obvious commercial interest in urgency, and the reader should discount accordingly.

---

## 7. Entity and Terminology Consistency

[S] states the idea best in either source: "Entities are primary keys for ideas. Tag the same author, product, or API consistently across pages and you maintain referential integrity inside the model's knowledge graph." It continues: an About page, a code repository README, and an API specification "all pointing to the same `Organization` schema entry give the engine confidence to merge those rows." [D] adds the writing-side rule: "Reference specific entities (people, places, organizations, concepts) consistently throughout your content… use schema markup to define relationships between entities."

The framework-agnostic practice:

1. **Maintain a written entity list** for the site: products, features, APIs, people, the organization itself. For each, record one canonical name, an optional short form, disallowed variants, and one canonical URL that serves as its identifier.
2. **Use the canonical name on first mention in every document**, then the short form. Never let marketing-driven renames propagate partially — a half-renamed product is two weakly-attested entities instead of one strong one.
3. **Give each important entity one canonical page** that defines it, and link every mention of that entity to that page. The URL becomes the entity's de-facto identifier across your corpus.
4. **Declare identity in structured data and keep it identical everywhere** (Section 8): the same organization identifier, the same author identifier, the same canonical URL for the same thing.
5. **Cross-reference off your own domain.** Point profile pages, repositories, package registries, and documentation at the same canonical identifiers so that off-site mentions merge into the same node rather than fragmenting.
6. **Define your terminology on the page where you use it.** Novel or overloaded terms need a one-sentence definition adjacent to first use; a synthesizer cannot infer your private vocabulary.

This is the least glamorous area in GEO and, in this author's assessment, the most under-rated: entity fragmentation silently divides every other signal you generate, and it is invisible in conventional analytics.

---

## 8. Structured Data and Schema

Both sources treat schema.org JSON-LD as the interoperable contract layer, and both give essentially the same instruction.

[S]: schema.org "acts as TypeScript for content: add types once, stop guessing later," with the operational warning — "Run your markup through schema validators before shipping; broken JSON-LD is as dangerous as a failing type check." [D]: structured data "provides AI platforms with explicit metadata about your content's authorship, publication date, and subject matter," and recommends adding it to "blog posts, articles, product pages, and documentation." [D] names the highest-value types: "BlogPosting, Article, FAQPage, HowTo, and Person schemas are highly effective for GEO because they provide clear content structure and context." [S] uses `Article` and `TechArticle` with `headline`, `author`, `datePublished`, `keywords`, and `mainEntityOfPage`, and additionally shows the equivalent expressed as inline microdata attributes.

Stack-independent guidance:

- **Emit JSON-LD in the delivered response**, in a `<script type="application/ld+json">` block. It is the format both sources use and the one least entangled with presentation markup. Inline microdata is a valid alternative but couples semantics to layout, and this author does not recommend maintaining both for the same facts.
- **Type what the page actually is.** Article/BlogPosting/TechArticle for editorial content; FAQPage where genuine Q&A exists; HowTo for procedures; Product, Organization, Person, BreadcrumbList, WebSite where applicable. Over-typing a page as something it is not is a correctness bug, not a growth tactic.
- **Never let structured data disagree with the visible page.** Headline, author, and dates must match what a human sees. Divergence between markup and rendered content is both a policy violation for major engines and a direct source of mis-citation.
- **Always populate identity and time fields**: `headline`, `author` (as a typed `Person` or `Organization`, not a bare string), `datePublished`, `dateModified`, `description`, `mainEntityOfPage`, and a canonical `@id` per entity. These are the fields a synthesizer needs to attribute you correctly.
- **Validate in CI and fail the build.** This is [S]'s strongest process contribution — it demonstrates a headless-browser test that extracts the JSON-LD block, asserts the expected `@type` and required properties, runs on every push, and adds "under 30 seconds to the pipeline." Generalize the pattern, discard the tooling: any test runner that can fetch a rendered URL, parse the JSON-LD, and assert on required fields will do, and an external structured-data validator can be invoked as a second gate. Broken schema fails silently in production forever; a build gate is the only reliable defense.
- **Centralize schema generation.** [S] notes that distributed systems each emitting their own markup drift apart, and recommends a shared, versioned schema package that services import. The framework-agnostic form: generate structured data from one source of truth in one place, never hand-author it per page.
- **Store the structured fields with the content, not derived at render time from prose.** [S] recommends persisting a structured-data field alongside each content record so each record can serve its own metadata. The general principle: metadata that is reconstructed by scraping your own rendered output will eventually disagree with it.

---

## 9. Reachability: Crawl Access, Rendering, and Machine-Readable Policy

A page that cannot be fetched, or whose content is not in the fetched bytes, fails before any of Sections 4–8 apply. This area is where the two sources are thinnest and where implementers most often lose.

**Deliver content in the response.** [S] warns that if "your primary answer is buried after fold-out menus or heavy client-side rendering, the model may drop it altogether," and recommends pre-rendering and verifying "that server-side output matches client-side intent." This is the single most common catastrophic GEO failure and it is entirely binary: fetch your own URL with a plain HTTP client, no JavaScript execution, and confirm the answer text and the JSON-LD are present in the returned body. Many AI fetchers do not execute JavaScript; those that do may not wait. Content behind interaction — accordions that load on click, tabs, infinite scroll, modal gates — is content that does not exist for a machine reader.

**State access policy explicitly, and decide it deliberately.** [S] positions `llms.txt` "plus IndexNow pings for LLM crawlers" as the GEO-era counterpart to `robots.txt` for a search crawler, and demonstrates serving a manifest under the `/.well-known/` path declaring the source domain, a content license, and the permitted endpoints — "letting crawlers discover allowed paths programmatically." [D] does not address crawler access at all.

The honest framework-agnostic position, since this is an area of fast churn and active contention:

- **`robots.txt` remains the only broadly honored access-control mechanism.** AI crawlers are increasingly identified by distinct user-agent tokens for crawling, for live retrieval, and for training. These are *separate decisions*: you may wish to permit answer-time retrieval (which can cite you) while restricting training collection (which cannot). Enumerate the agents you intend to allow or deny, and re-review the list periodically as vendors add tokens.
- **Do not block by accident.** A default-deny rule, an aggressive bot-mitigation product, a CDN challenge page, or a geo-restriction will remove you from AI answers as effectively as deleting the page. Verify by requesting your own URLs with the relevant user-agent strings and confirming a 200 with full content rather than a challenge or an empty shell.
- **`llms.txt` is a proposed convention, not a standard, and support is not established.** Both [S]'s framing and this author's reading agree it is cheap to publish and unproven in effect. Treat it as an inexpensive, low-risk declaration: a plain-language index of your most citable pages and how you would like to be attributed. Do not treat it as an access control, and do not let it substitute for the fundamentals in Sections 4–8. A manifest at a well-known path declaring source, license, and permitted paths is a reasonable extension of the same idea.
- **Publish an accurate sitemap with real `lastmod` values** and keep it as the authoritative discovery surface; support whatever index-notification mechanism your search partners offer for publish and update events, which is the generalized form of [S]'s IndexNow recommendation.
- **State licensing terms where a machine can find them** — in the manifest, in page metadata, or both. Attribution requirements that exist only in a legal page nobody parses do not travel with your content.
- **Serve fast, and do not rate-limit yourself out of the index.** [S] claims "AI bots often abandon pages exceeding a few-second load budget," but is admirably careful elsewhere to note there is "no evidence that AI bots commonly skip pages solely for missing sub-2s core rendering thresholds," offering instead the defensible version: slow pages "may be crawled less frequently or prioritized lower by some crawlers." Adopt the weak claim. Separately, [S] recommends rate-limiting machine-facing endpoints to survive aggressive crawling — a real operational concern, but one to tune carefully, because a 429 to a retrieval fetch is an uncited answer.

---

## 10. Freshness and Content Maintenance

Neither source treats freshness as a standalone topic — [D] does not address it at all — but [S] contains three distinct freshness ideas worth consolidating, because content decay is the failure mode that quietly reverses GEO gains.

**Freshness of the content.** Answer systems favor current material for time-sensitive questions, and, more importantly, a stale page that is still confidently extracted becomes a source of confidently wrong answers. Practices: maintain an accurate `dateModified` that reflects *substantive* revision only (bumping it for a typo trains nothing and misleads); date every volatile claim in the sentence that makes it; put the last-substantively-reviewed date on the visible page as well as in the markup; keep a review cadence for pages that make numeric or version-specific claims; and consolidate rather than accumulate — three overlapping half-current pages compete with each other and split entity signal, whereas one canonical maintained page does not.

**Freshness of the interface.** [S]'s sharpest maintenance insight is to "think of content structure as versioned API contracts": each time a model updates its context window or retrieval strategy, "you may need a 'v2' of your markup—new schema types, refreshed entity definitions, tighter summaries—so the AI endpoint keeps resolving correctly." The generalizable claim is that **GEO markup is not write-once**; the consuming systems change, so scheduled revalidation of structured data and periodic re-review of the entity list belong in the maintenance calendar. [S]'s concrete cadence — "automate schema revalidation nightly and refresh embeddings weekly" — is stack-specific and arbitrary; the durable requirement is *a recurring automated check*, at whatever interval your publication rate warrants.

**Freshness of notification.** Publishing an update the index never learns about is a no-op. Emit an update event on publish — sitemap regeneration plus whatever index-notification mechanism is available — so that discovery is not left to the next crawl cycle. [S] recommends webhooks on content change triggering exactly this.

---

## 11. Measurement and the Iteration Loop

This is where GEO differs most from SEO in practice, and both sources converge on the same primary metric.

**The primary metric: citation inclusion.** [S] defines the **AI citation rate** as "the percentage of large-language-model answers that reference your domain," computed as citations divided by total answers in a sampling window. [D] names the same thing as **AI citation frequency** — "monitor how often your content appears in AI-generated responses. Test by querying AI platforms with relevant questions in your domain." [S] adds the framing that makes it operational: "Think of AI citations as unit tests: if [an assistant] references your page, the test passes."

**The supporting metrics.** [D] adds three: **source attribution** (whether systems attribute correctly when they do cite you), **conversational reach** (engagement from users arriving via AI recommendation), and **structured data validation** (using rich-results and schema validators). [S] adds **entity-recognition accuracy**, given as `true_positives / (true_positives + false_positives + false_negatives)` — recognizably an F1-style score over whether your entities are correctly identified in machine output — plus operational telemetry: crawl latency, schema validation pass rates, and index size. [S] also recommends correlating business outcomes (conversion, signup velocity) with citation movement: "When those curves move together, your implementation works effectively."

**A framework-agnostic measurement design.** Neither source specifies a rigorous protocol, so this is the author's construction, and it is the part most worth stealing:

1. **Define a fixed prompt set** — 30 to 100 questions your content should be the best answer to, written as real users phrase them, held constant over time. Without a stable prompt set, nothing is comparable across runs.
2. **Sample on a fixed cadence, across multiple answer systems**, recording for each run: prompt, system and version, date, whether your domain was cited, which URL, whether the cited claim was represented accurately, and which competitors were cited.
3. **Report four numbers per window**: citation rate (share of prompts citing you), share of voice against named competitors, attribution accuracy (share of citations that describe your content correctly), and coverage (share of prompts where *any* source you would consider authoritative was cited).
4. **Instrument the referral side as best you can.** Referrals from assistant interfaces are undercounted and often invisible; treat measured AI referral traffic as a floor, and watch branded-query volume and direct traffic as corroborating signals — [S]'s claim that "AI answers drive measurable increases in branded queries and assisted conversions, even when raw session counts stay flat" is unsourced but matches the mechanism, since a cited-but-not-clicked answer produces a later branded search.
5. **Track the technical health metrics separately** — schema validation pass rate, fetch success rate per crawler user-agent, share of pages whose answer text is present without JavaScript, share of pages with complete identity metadata. These are leading indicators; citation rate is lagging.
6. **Attribute changes honestly.** Answer systems change models, retrieval, and citation policy without notice, so a movement in your citation rate may be entirely exogenous. Always read your own series against a control set of pages you did not change, and against competitor share of voice in the same runs.

**The iteration loop.** [S] frames it as DevOps practice — "iterative, automated, and monitored," reviewing citation changes and schema errors each sprint, opening tickets automatically on failing schema tests or citation-rate drops, and, notably, running "A/B tests comparing revised markup against control pages, measuring inclusion in AI answers rather than page views." That last instruction is the correct objective function and the concrete expression of the whole discipline. The generalized loop:

> **select a page cluster → make one class of change (structure, answer-first rewrite, schema, entity naming) → wait for re-crawl and re-index → re-run the fixed prompt set → compare against unchanged control pages → keep, revert, or extend.**

Two warnings the sources omit. **Latency:** re-crawl, re-index, and answer-cache turnover mean the feedback loop is measured in weeks, not the hours a CI pipeline implies — do not draw conclusions from a single post-change sample. **Variance:** generative answers are stochastic and personalized; a single query proves nothing, which is precisely why the fixed prompt set with repeated sampling is non-negotiable.

---

## 12. Implementation Order

Synthesized priority for a team starting from an ordinary website, ordered by expected return per unit of effort:

1. **Verify reachability.** Fetch representative URLs without JavaScript and as each relevant crawler user-agent. Fix empty responses, blocks, and challenges first. (Section 9)
2. **Fix document structure** on the highest-value pages: one `<main>`, semantic sections, clean unique heading hierarchy. (Section 4)
3. **Rewrite for answer-first self-containment** on those same pages — the highest-leverage editorial change. (Section 5)
4. **Add and validate structured data**, with a CI gate that fails the build. (Section 8)
5. **Establish the entity list** and normalize naming and canonical URLs across the corpus. (Section 7)
6. **Stand up measurement**: fixed prompt set, baseline run, control pages. Do this before step 7 so later changes are attributable. (Section 11)
7. **Add attribution and authority signals**: visible authorship, dated claims, first-party data, outbound primary-source links. (Section 6)
8. **Publish access and discovery surfaces**: sitemap with real `lastmod`, explicit robots policy, optional `llms.txt`/manifest, update notification. (Section 9)
9. **Institute maintenance**: review cadence, scheduled schema revalidation, consolidation of overlapping pages. (Section 10)
10. **Run the loop.** (Section 11)

Steps 1–5 are all things a competent technical writer and web developer can do without new tooling. That is the paper's central practical claim: **most of GEO is ordinary craft applied with an unusual objective, and the unusual part is step 6.**

---

## 13. Limitations and Open Questions

**Both sources are guides, not evidence.** No experiment, effect size, or measured lift appears in either. [S] is published by a vendor whose product is recommended in its final section, and it discloses that impacts "have not been empirically established"; [D] is an individual practitioner's applied walkthrough whose stated purpose is implementation rather than validation. The tactics are mechanically plausible and low-risk; their *magnitudes* are unknown from these sources.

**Specific claims this author regards as unverified:** that AI bots abandon pages over a few-second load budget (contradicted within [S] itself); that early citation advantage produces durable winner-takes-most lock-in; that structured data raises citation probability independent of the content quality it accompanies; that `llms.txt` is honored by consequential systems; that markup versioning is required at any particular cadence.

**Open questions worth measuring** if anyone has the sampling infrastructure: the marginal citation effect of JSON-LD holding page text constant; whether FAQ-shaped sections are retrieved preferentially over equivalent prose; how much paragraph-level self-containment matters once a retriever already returns the enclosing section; whether entity consistency measurably increases attribution accuracy; and how quickly a substantive content update propagates into cited answers across systems.

**Durability.** This is a snapshot of practice as of 2026-08-11, synthesizing sources from late 2025 with a mid-2026 update. Crawler tokens, access conventions, retrieval architectures, and citation behavior all churn. The pipeline model in Section 2 and the measurement design in Section 11 should outlast the specific tactics; the tactics should be re-derived from the pipeline as the systems change.

---

## References

1. **[S]** Paul Bratslavsky. *A Brief Guide to Generative Engine Optimization for Developers.* Strapi blog. Published 2025-09-15, updated 2026-06-14. <https://strapi.io/blog/generative-engine-optimization-geo-guide>
2. **[D]** Nerando Johnson. *GEO: Generative Engine Optimization — Applied.* DEV Community, part 2 of the "GEO for Developers" series. 2025-11-30. <https://dev.to/nerajno/geo-generative-engine-optimization-applied-27a3>

Both sources were retrieved and read in full on 2026-08-11. Secondary works referenced by [D] in its own resource list (an a16z strategic overview, Moz and Ahrefs schema guides, schema.org documentation, and [S] itself) were **not** consulted for this synthesis and none of their content is represented here.
