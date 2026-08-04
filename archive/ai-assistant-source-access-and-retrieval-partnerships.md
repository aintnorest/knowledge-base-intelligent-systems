---
type: Research Paper
title: "Source Access Is a Systems Property: How AI Assistants Retrieve the Web, Platforms, and Private Corpora"
description: "A comparative research note on how assistant hosts, search infrastructure, ownership, licenses, source adapters, and user permissions determine the evidence available to AI systems."
tags: [retrieval, agent-harness, provenance, agents, research]
timestamp: 2026-07-28T22:39:52Z
version: "1.1"
---

# Source Access Is a Systems Property

## How AI Assistants Retrieve the Web, Platforms, and Private Corpora

**Research date:** July 28, 2026

**Snapshot version:** 1.1

**Document type:** Comparative technical research note

**Evidence base:** First-party product documentation, first-party partnership announcements, and source inspection of `mvanhorn/last30days-skill`

## Abstract

AI assistants do not all search the same information universe. Product ownership, search infrastructure, content licenses, source-specific APIs, crawler permissions, user authorization, and agent-harness design can give one assistant materially different access to a source than another. The common description that a particular *model* “can search Reddit” or “can search YouTube,” however, is usually technically imprecise. Live source access normally belongs to the product or tool environment surrounding the model, not to the model weights themselves.

This paper distinguishes five layers that are frequently conflated: foundation-model knowledge, the assistant host and tool policy, general web retrieval, source-specific interfaces, and private connectors. It documents representative retrieval capabilities of ChatGPT and the GPT family, Gemini, Grok, Claude, Perplexity, Microsoft Copilot, Meta AI, Mistral Vibe, GitHub Copilot, and Amazon's AI assistants. It analyzes social and video platforms, local places, publisher archives, Stack Overflow, private productivity data, commerce applications, code repositories, and prediction-market integrations. The inventory is intentionally representative rather than exhaustive.

The evidence supports a qualified version of the claim: assistants with first-party or licensed structured access can receive fresher, deeper, or more reliable evidence from particular platforms. This does not normally make public content categorically inaccessible to competitors. Other assistants may still find publicly indexed pages, but may retrieve only titles, snippets, incomplete threads, unavailable transcripts, or stale metadata. A case study of the `last30days` research skill shows the practical response to this fragmentation: separate source acquisition from reasoning, query important platforms through dedicated adapters, preserve source metadata, and allow the synthesizing model to remain replaceable.

> **Evidence boundary.** This is an architecture and documentation study. It establishes declared capabilities and disclosed relationships, not comparative recall, freshness, completeness, ranking quality, or answer accuracy. Appendix A specifies a reproducible black-box test that would be required to measure those outcomes.

## 1. Research Question

The motivating claim is that generalized lookup requests produce different results across AI assistants because the companies operating those assistants have different agreements and privileged relationships with content platforms. Reddit and YouTube are frequently used as examples: one assistant may surface current Reddit discussions or understand a YouTube video, while another returns only ordinary web pages.

This paper asks three questions:

1. Is source access meaningfully different across major AI assistants?
2. Which differences are publicly documented as of July 28, 2026?
3. Should these differences be attributed to model families, or to the retrieval systems surrounding them?

The short answer is that the differences are real, but the retrieval system is normally the correct unit of analysis.

## 2. Method and Evidence Standard

The comparison uses primary sources wherever available:

- official model and tool documentation;
- official product help centers;
- official company and platform partnership announcements; and
- implementation evidence from a pinned commit of the referenced `last30days` repository.

The paper records *documented capability*, not guaranteed behavior on every query. AI products often decide automatically whether to search, which queries to issue, how many results to inspect, and which results to cite. Vendors generally do not publish complete indexes, ranking algorithms, coverage statistics, or every commercial data agreement. Consequently, the absence of a public announcement is reported as “not publicly documented,” not as proof that no private relationship exists.

Claims use four evidence classes:

- **D1 — first-party documented:** an official product document, help page, contract announcement, or source implementation directly supports the claim.
- **D2 — documented integration with a routing caveat:** the relationship or capability is official, but the vendor does not disclose whether a particular answer uses it.
- **I — inference:** the conclusion follows from documented architecture or observed behavior but is not itself stated by the operator.
- **U — undisclosed:** no adequate public documentation was found. This means unknown, not absent.

The following terms are used consistently:

- **Native or first-party access:** the assistant operator also controls the source platform or a purpose-built retrieval interface to it.
- **Licensed structured access:** a contractual relationship supplies current platform data through an API or feed.
- **General web-index access:** the assistant receives results from a broad crawler or search index. In this paper, “open web” does not imply that every public URL is crawlable, fully indexed, or fetchable.
- **Direct URL access:** the system attempts to fetch and interpret a specific page supplied by the user or selected from results.
- **Private connector access:** the user authorizes access to non-public files, email, calendars, repositories, or other account data.

These modes are not equivalent. A search engine may discover the title of a Reddit thread without retrieving its nested comments. It may find a YouTube watch page without receiving a transcript. It may locate an X profile without seeing recent posts hidden behind dynamic loading or login requirements.

## 3. The Correct Unit of Analysis

A modern AI answer system can be represented as a five-layer pipeline:

```text
1. model knowledge from training
       |
2. assistant host, query planner, and tool policy
       |
3. general crawler or search-provider index
       |
4. source-specific API, feed, native service, or app
       |
5. user-authorized private connector
       v
retrieved evidence -> model synthesis -> cited answer
```

The foundation model is only one component. A raw model invocation has no live awareness unless the caller supplies current evidence or enables retrieval tools. The same Claude model can therefore receive Anthropic search results in Claude, Perplexity search results when chosen inside Perplexity, a developer-owned corpus in a custom application, or no live information in an unaugmented API request.

This distinction also explains why model benchmarking alone cannot predict source coverage. Switching the synthesizing model while keeping the retriever fixed may change reasoning quality, tone, or citation use without changing the underlying candidate sources. Conversely, keeping the model fixed while changing the host can replace the entire information supply chain.

## 4. Comparative Capability Map

The table is a representative map of documented systems, not an exhaustive list of assistants or integrations. “Public-web fallback” means a source may appear when indexed and retrievable; it does not guarantee full content, comments, transcripts, or engagement data.

| Product or host | General retrieval | Publicly documented differentiated sources | Public-web fallback and limits | Evidence |
|---|---|---|---|---|
| **ChatGPT / OpenAI API** | ChatGPT Search and OpenAI's web-search API tools. Current first-party model pages list web search for GPT-5.6 Sol, Terra, and Luna. | Reddit's real-time structured Data API; publisher-display agreements; user-authorized apps and company knowledge. | YouTube, X, and Meta content normally depend on public indexing unless a separate app or connector is enabled. OpenAI says ChatGPT Search sometimes uses third-party providers and names Bing and Shopify in that documentation; this does not establish that either supplies every query or every result type. | D1 for tools and agreements; D2 for per-answer routing. |
| **Gemini / Gemini API** | Google Search grounding and native use of selected Google services. | YouTube discovery and content questions; Google Maps, Flights, Hotels, and other Google services; Google Workspace and Photos with permission; Google's licensed Reddit Data API access. | Other public sites depend on Google's index and source accessibility. Documentation does not reveal whether a particular Gemini Reddit citation came through the licensed feed. Video comprehension depth can vary by video and available media or text. | D1 for services; D2 for Reddit routing and per-video depth. |
| **Grok / xAI API** | xAI real-time web search. | Dedicated `x_search` with post, user, thread, date, handle, image, and video capabilities. An X/Polymarket integration places Grok analysis in a prediction-market product. | Reddit and YouTube otherwise behave as public-web sources. The prediction-market partnership does not establish a universal market-data tool for every Grok session. | D1 for X search and the announced integration; D2 for partner-product scope. |
| **Claude / Anthropic API** | Anthropic-operated web search with citations, domain filters, repeated searches, and localization. | No publicly documented privileged Reddit, YouTube, X, or Meta feed was found. | Public platform pages can be searched or domain-filtered, but coverage depends on the provider's undisclosed index and the source's crawl and fetch behavior. | D1 for web search; U for privileged social feeds. |
| **Perplexity** | Perplexity retrieval across web material, with distinct Pro Search, Research, source-selection, and filtering workflows. | Perplexity documents forums, videos, papers, domains, and source modes, but not a social feed equivalent to the relationships above. | Selecting a GPT, Claude, or Gemini model inside Perplexity does not import that vendor's consumer-assistant retriever. Retrieval can nevertheless differ materially by Perplexity mode, so it should not be described as a single invariant backend. | D1 for product workflows; U for privileged social feeds. |
| **Microsoft Copilot** | Bing for public web; Microsoft 365 Copilot can ground through Microsoft Graph in the user's tenant. | Authorized Microsoft 365 organizational content. | Public social pages can appear when Bing indexes them. Microsoft ownership of LinkedIn is not evidence of unrestricted Copilot access to arbitrary LinkedIn data. | D1 for Bing and Graph; U for privileged social feeds. |
| **Meta AI** | Meta web search plus product-specific retrieval. | Facebook AI Mode can use public Groups and Reels; Meta AI has named news-publisher integrations across its apps and devices. | Claims about Groups and Reels are scoped to the documented Facebook experience and public content. They should not be extrapolated to private messages, private groups, or every Meta surface. | D1, with product and privacy scope. |
| **Mistral Vibe** *(formerly Le Chat)* | Web search and research-agent retrieval. | Licensed AFP newswire integration was documented for the predecessor Le Chat; broader social-source arrangements are not named. Mistral's rename notice does not separately restate every integration. | Fine-grained Reddit, YouTube, and X access is undocumented and should not be inferred. | D1 for AFP and rename; U for current per-answer routing and specific social feeds. |
| **GitHub Copilot** | Product-specific repository indexing plus optional web and external tools, depending on surface and policy. | GitHub repositories, code, pull requests, issues, and Spaces under GitHub's permission model. Multiple model families can be selected while repository retrieval remains a GitHub host capability. | It can use non-GitHub repositories only through documented workspace or indexing paths and applicable policies. | D1. |
| **Amazon Alexa+ / Alexa for Shopping** | Amazon product search, web information, and product-specific retrieval. | Amazon licensed New York Times, NYT Cooking, and The Athletic content for real-time summaries or excerpts in products such as Alexa and for model training; its shopping assistant uses Amazon's commerce corpus. | The agreement does not prove exclusivity or comprehensive Times access in every Amazon answer. | D1 for the license and product scope; U for per-answer routing. |
| **Raw or open-weight deployments** | None inherently. | Whatever the deployer adds: search APIs, source APIs, crawlers, MCP servers, databases, or files. | Two deployments of identical weights can have completely different source access. Consumer products built around DeepSeek, Qwen, Kimi, Llama, or Mistral weights must be evaluated separately from the weights. | D1 as an architectural fact; product-specific evidence still required. |

## 5. Source-Specific Findings

### 5.1 Reddit

Reddit provides the clearest example of commercial data access affecting AI retrieval.

In May 2024, Reddit and OpenAI announced that OpenAI would use Reddit's Data API, described as real-time, structured, and unique content, to bring Reddit material to ChatGPT and other OpenAI products. This is stronger evidence than the observation that ChatGPT sometimes cites a Reddit URL: it documents an authorized structured-data relationship intended to improve recent-topic understanding and display.

Google announced a similar expanded relationship in February 2024. Google stated that the Reddit Data API would provide efficient access to fresher information and enhanced signals for understanding, displaying, training on, and otherwise using Reddit content across Google products. Because Gemini's web grounding uses Google Search, it is reasonable to infer a potential retrieval advantage relative to systems using a less complete public index. It would nevertheless be an overstatement to claim that every Gemini Reddit citation comes directly from the licensed API. Google does not expose that routing decision.

Other assistants can still retrieve Reddit material through public search indexes, RSS, permitted endpoints, direct page fetching, or third-party services. The distinction is therefore not simply “access” versus “no access.” It is more often:

- structured versus page-shaped data;
- recent and complete versus stale or partial results;
- thread and comment visibility versus title and snippet visibility; and
- authorized commercial access versus best-effort crawling.

Crawler policy makes that last distinction operational, not merely contractual. Reddit announced in 2024 that it would update `robots.txt`, continue rate-limiting or blocking unknown crawlers, and selectively authorize large-scale access. Its current user agreement prohibits scraping without prior written consent while allowing conditional crawling under `robots.txt`. A licensed Data API path and an ordinary crawler are therefore subject to materially different permissions and controls.

### 5.2 YouTube

Gemini has the clearest documented native YouTube integration among the products reviewed. Google states that Gemini Apps can find YouTube videos, playlists, and channels and answer questions about video content. Gemini can also connect to YouTube history for eligible personalized experiences. This is materially different from merely discovering a watch-page URL, but the documentation does not promise uniform audiovisual understanding for every video.

Other assistants commonly return YouTube results through their general web-search providers. Their ability to understand the video itself is less predictable. It may depend on whether the page exposes captions, whether a transcript endpoint is available, whether the search provider indexed text associated with the video, or whether the host provides a dedicated video-processing tool.

The practical distinction is among four levels:

1. finding a video title and URL;
2. reading its description and metadata;
3. obtaining and interpreting a transcript; and
4. understanding audiovisual content that is not represented in the transcript.

A product that satisfies the first level should not be described as having full YouTube understanding.

### 5.3 X

xAI's Grok has the clearest documented native X integration among the products reviewed. Its `x_search` tool is not presented as a generic web query restricted to `x.com`; it is a dedicated interface for real-time X content. The tool can perform keyword and semantic searches, inspect users and threads, constrain results by handles and dates, and analyze images and videos contained in posts.

Other assistants can retrieve X pages when their general search indexes contain them. Coverage is inherently less dependable because X content is dynamic, frequently updated, sometimes login-gated, and not always fully represented in a conventional page index. A generic search result may therefore establish that a post exists without returning the complete thread, engagement state, replies, or recent profile history.

### 5.4 Facebook and Instagram

Meta has documented a first-party retrieval advantage in a specific Facebook experience. In June 2026, Meta described Facebook AI Mode as grounding answers in public content including Groups and Reels. Separately, Meta describes broader research behavior that can combine the open web with material publicly shared by creators and communities in its apps.

This is especially consequential because Facebook and Instagram pages are often difficult for third-party crawlers to index completely. Login boundaries, client-side rendering, personalized feeds, and access controls make ordinary web search a poor substitute for a platform-native retrieval path.

The documented capability concerns public content. It should not be generalized into access to private groups, messages, or account content without a separate user-authorized feature and explicit documentation.

### 5.5 Local Places and Geographic Results

Source differences are not limited to social platforms. Gemini can automatically use public information from Google Maps, Flights, Hotels, and other Google services. ChatGPT documents location-aware query rewriting, Bing as a search partner, map results on mobile, and specialized restaurant and reservation experiences. Microsoft Copilot inherits Bing's local-search index. Claude can localize web queries using approximate location, which improves relevance but is not equivalent to possessing a first-party places database.

Thus, a request such as “find a quiet restaurant near me” may be answered from materially different databases even when all assistants appear to be performing generic web search.

### 5.6 News and Publisher Archives

Publisher relationships are a major additional example and demonstrate why the five social, video, and local cases are not exhaustive.

OpenAI says it has partnered with nearly 20 media organizations representing more than 160 outlets. Its first-party announcements describe current or archived material from publishers including News Corp and the Financial Times being used for attributed summaries, excerpts, links, or answers in ChatGPT. This is documented publisher-display or content access, not proof that every ChatGPT news response searches every partner archive.

Meta announced in March 2026 that Meta AI would draw real-time news information and links from named partners including News Corp, Le Figaro, Prisa, and Süddeutsche Zeitung. Mistral separately announced an AFP partnership giving the product then called Le Chat access to roughly 2,300 daily newswire stories in six languages. By this paper's July 2026 snapshot, Mistral had renamed the product Vibe.

The New York Times Company announced a multi-year Amazon license covering The New York Times, NYT Cooking, and The Athletic. The announcement permits real-time summaries and short excerpts in Amazon products such as Alexa and training of Amazon proprietary models. Public documentation reviewed for this paper does **not** establish the claimed contract value, exclusivity against other assistants, or that every Alexa answer queries the licensed corpus; those stronger claims are omitted.

These agreements may affect freshness, permissible display, and access to archives or paywalled material, but they are not interchangeable with a general search index. Publisher deals should therefore be recorded by rights and product scope, not counted as an undifferentiated number of “search partners.”

### 5.7 Stack Overflow: A Dual-License Case

Stack Overflow is useful because it shows that licensed structured access need not be exclusive. Google Cloud and Stack Overflow announced an OverflowAPI partnership in February 2024 for Gemini-related developer experiences. OpenAI and Stack Overflow announced a separate API partnership in May 2024 intended to surface validated technical knowledge in ChatGPT.

The case supports a more precise claim than “one model owns Stack Overflow.” Two competing hosts can license the same source, while other assistants may rely on public pages, their own indexes, or another agreement. The source advantage lies in the authorized interface and product integration, not in a unique fact embedded in one model family.

### 5.8 Private Productivity Corpora and Applications

Some of the largest differences concern user-authorized data rather than public websites:

- Gemini can connect, with permission and eligibility constraints, to Gmail, Calendar, Drive, Docs, Sheets, Slides, Photos, YouTube history, Search services, and other Google data.
- Microsoft 365 Copilot grounds prompts through Microsoft Graph in the user's tenant while enforcing the user's permissions and organizational controls.
- ChatGPT apps can search or synchronize authorized services, and company knowledge can combine sources such as SharePoint, Google Drive, Slack, and GitHub. App availability, actions, plans, and administrator policy vary.

Google's ownership of Workspace, Microsoft's ownership of Microsoft 365, and GitHub's repository platform can make their integrations operationally deep. Third-party connectors may nevertheless provide overlapping access after user authorization. The relevant comparison is scope, latency, permissions, and indexing—not ownership alone.

### 5.9 Commerce, Transactions, and Code Repositories

Structured application access can be more useful than web search. OpenAI's initial ChatGPT app partners included Booking.com, Canva, Coursera, Expedia, Figma, Spotify, and Zillow. These integrations can expose structured listings or actions, but they are app-mediated capabilities and should not be described as additions to a universal web index.

Amazon's shopping assistants operate against Amazon's first-party commerce environment. Likewise, GitHub Copilot can semantically index repositories and ground answers in code, issues, pull requests, and curated Spaces. GitHub also permits model selection across multiple model families. That separation is especially instructive: changing the synthesizing model does not transfer the repository index to the model vendor; the index remains a GitHub host capability.

### 5.10 Prediction Markets and Other Specialized Sources

X and Polymarket announced a 2025 product partnership combining Polymarket predictions with X data, relevant posts, and Grok-generated explanations of market moves. This is evidence of a source-specific, product-scoped integration. It does not by itself establish that every Grok chat or API session has a dedicated, complete prediction-market feed.

Practitioner tools broaden the source list further. The pinned `last30days` implementation includes or documents paths for Hacker News, Polymarket, Bluesky, TikTok, Instagram, Threads, Pinterest, and other niche sources in addition to Reddit, YouTube, X, and the general web. This fragmentation is not limited to the vendors in the comparison table and is likely to grow as agents acquire more source adapters.

## 6. Agreements Do Not All Mean the Same Thing

Discussions of AI data agreements often collapse distinct legal and technical relationships:

1. **Training licenses** permit model development on a corpus. They may improve general model knowledge but do not necessarily provide live retrieval.
2. **Retrieval or Data API agreements** provide current structured material at answer time or to the systems that build a search index.
3. **Publisher-display agreements** may define quotation, summary, attribution, linking, or revenue terms without creating comprehensive search coverage.
4. **Advertising or distribution partnerships** affect product placement but may have little bearing on retrieval quality.
5. **Ownership** can enable deep technical integration, but only documented product behavior should be treated as evidence that the integration exists.
6. **User-authorized connectors and applications** expose private or structured data within the user's permissions; they do not make that corpus public or universally available to the host.

The Reddit agreements are relevant because the announcements explicitly describe real-time structured API access. Google's ownership of YouTube and xAI's dedicated X tool are relevant because first-party product documentation identifies native retrieval behavior. By contrast, Microsoft ownership of LinkedIn alone is insufficient evidence that every Copilot product can search arbitrary LinkedIn data.

### 6.1 Crawler Permission Is an Independent Layer

Ordinary web retrieval depends on both discovery and permission. OpenAI tells publishers that allowing `OAI-SearchBot` enables pages to be included in ChatGPT Search summaries and snippets; a disallowed page discovered elsewhere may be reduced to a link and title. Reddit says it rate-limits or blocks unknown bots and restricts scraping without written permission. Cloudflare lets site owners allow, block, or charge individual crawlers and is developing permissioned, structured indexes for AI use.

This creates a separate source-access variable even when no bilateral content license exists:

```text
public URL
    -> discoverable by an index?
    -> crawler permitted and technically able to fetch it?
    -> full content, metadata, and media available?
    -> legally and contractually usable in an answer?
```

A page can therefore be public to a human browser yet absent, partial, or title-only for a particular assistant. “Open web” is a topology, not a guarantee of equal machine access.

## 7. Search Is Usually a Host Property, Not a Model Property

Perplexity offers a useful counterexample to model-centric language. The product allows users to choose among multiple model families, but Perplexity describes workflows in which its system retrieves evidence and then a chosen model synthesizes the answer. Changing from a GPT model to Claude inside that product does not automatically replace Perplexity retrieval with ChatGPT Search or Anthropic web search. Pro Search, Research, source selection, and other Perplexity modes can themselves use materially different workflows, so the host retrieval layer should not be treated as one fixed implementation.

The same principle applies to agent frameworks and API applications. Developers can connect a model to:

- a commercial search engine such as Google, Bing, Brave, Exa, or another provider;
- platform-specific APIs for Reddit, YouTube, X, GitHub, or financial data;
- local full-text or vector indexes;
- enterprise connectors; or
- a manually curated evidence bundle.

The effective capability is therefore a property of the composed system:

```text
effective lookup capability
    = model reasoning
    + tool policy
    + retrieval providers
    + source adapters
    + credentials and permissions
    + source accessibility
    + citation and synthesis behavior
```

Evaluating only the model family ignores most of the variables that determine what evidence reaches the answer.

## 8. Case Study: `last30days-skill`

The `last30days` repository was inspected at commit [`e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9`](https://github.com/mvanhorn/last30days-skill/tree/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9). It provides a concrete example of retrieval being separated from reasoning.

An older architectural document says Reddit discovery uses the OpenAI Responses API with a domain-filtered web-search tool and describes X retrieval through a bundled Bird client or xAI. That document captures the product-access principle but is stale relative to the current Reddit pipeline. See [`docs/how-search-works.md`](https://github.com/mvanhorn/last30days-skill/blob/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9/docs/how-search-works.md#L30-L61).

The current runtime uses a heterogeneous source stack:

- **Reddit:** a free public composite is the default, with ScrapeCreators as a configured primary or conditional backfill when results are thin. Unlike the first-usable-wins chains for other sources, Reddit uses per-query, outcome-dependent conditional routing. See [`SKILL.md`](https://github.com/mvanhorn/last30days-skill/blob/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9/skills/last30days/SKILL.md#L683-L688) and [`backends.py`](https://github.com/mvanhorn/last30days-skill/blob/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9/skills/last30days/scripts/lib/backends.py#L425-L436).
- **YouTube:** `yt-dlp` is preferred, with ScrapeCreators as fallback. The implementation retrieves video metadata and transcripts rather than relying on the hosting model's generic search. See [`backends.py`](https://github.com/mvanhorn/last30days-skill/blob/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9/skills/last30days/scripts/lib/backends.py#L60-L68) and [`youtube_yt.py`](https://github.com/mvanhorn/last30days-skill/blob/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9/skills/last30days/scripts/lib/youtube_yt.py#L1-L6).
- **X:** the alternative chain is xAI's native `x_search`, a browser-authenticated Bird client, the official X CLI (`xurl`), and `xquik`. See [`xai_x.py`](https://github.com/mvanhorn/last30days-skill/blob/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9/skills/last30days/scripts/lib/xai_x.py#L102-L125) and [`env.py`](https://github.com/mvanhorn/last30days-skill/blob/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9/skills/last30days/scripts/lib/env.py#L790-L796).
- **General web:** the declared backend sequence is Brave, Exa, Serper, Parallel, and a keyless fallback, while a capable host can supply its own native search instead. See [`backends.py`](https://github.com/mvanhorn/last30days-skill/blob/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9/skills/last30days/scripts/lib/backends.py#L60-L68).
- **Planning and reranking:** Gemini, OpenAI, xAI, OpenRouter, or local deterministic logic can be selected independently of the source backends. See [`providers.py`](https://github.com/mvanhorn/last30days-skill/blob/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9/skills/last30days/scripts/lib/providers.py#L196-L217).

This is a model-agnostic research architecture. A source adapter is chosen because it can retrieve the source faithfully; a reasoning model is chosen because it can plan, rank, and synthesize effectively. The design compensates for unequal host capabilities rather than assuming one general-purpose search tool covers every platform.

## 9. Practical Implications

### 9.1 For users

Users should ask which *product and mode* they are using, not only which model appears in the model selector. Search, deep research, connectors, workspace policy, account tier, locale, and admin settings can all change the accessible evidence.

For source-sensitive research, prompts should name the desired platforms and request a coverage report. A useful instruction is:

> Search Reddit, YouTube, and the open web separately. Cite the sources actually retrieved, distinguish direct platform evidence from pages that merely discuss the platform, and report any source you could not access reliably.

Even this wording cannot manufacture missing access, but it makes gaps more visible.

### 9.2 For developers

Applications that require predictable source coverage should not depend exclusively on autonomous generic web search. They should:

1. route queries to source-specific adapters;
2. record which backend served each item;
3. preserve timestamps, URLs, authorship, and engagement metadata;
4. distinguish no results from retrieval failure;
5. give the model bounded evidence for synthesis; and
6. evaluate retrieval recall separately from answer quality.

This architecture also improves portability. The reasoning model can be replaced without rebuilding every source integration, and the search provider can be changed without treating the model as the data source.

### 9.3 For evaluators

Comparisons of “model search quality” should record at least:

- assistant host and product mode;
- exact model and version;
- search and connector settings;
- account tier and administrative policy;
- country, language, and approximate location;
- query timestamp;
- sources requested and sources actually cited;
- whether full pages, comments, transcripts, or metadata were available; and
- whether the evaluator distinguishes retrieval failure from model synthesis failure.

Without these controls, a comparison may attribute Bing, Google Search, an X-specific API, or a private connector advantage to the language model itself.

## 10. Limitations

This paper has six important limitations.

First, it relies on public documentation. Undisclosed agreements, experimental integrations, and staged rollouts may exist. Second, documentation establishes capability but not empirical recall, ranking quality, freshness, or per-query use. Third, product behavior varies by region, plan, workspace configuration, date, and automatic tool policy. Fourth, “public web access” is unstable because source sites can change robots rules, rendering, login gates, or API policies. Fifth, named integrations may operate only in particular product surfaces; a partnership announcement is not evidence of universal access across an operator's products. Sixth, the paper does not perform a controlled black-box benchmark across identical prompts; it maps architecture and declared access, not measured answer quality.

For these reasons, the capability map should be treated as a dated research snapshot rather than a permanent compatibility specification.

## 11. Conclusion

The claim that AI assistants search different sources because their operators have different agreements is substantially true, but agreements are only one part of the explanation. Ownership, crawler permission, search-provider coverage, user-authorized connectors, product mode, and agent-harness design can be equally important. The claim should be stated at the product-system level rather than the model-family level.

OpenAI and Google have documented structured Reddit relationships. Gemini has native documented YouTube integration. Grok has a dedicated real-time X search tool. Facebook AI Mode can ground answers in specified public Facebook content. Publisher licenses give ChatGPT, Meta AI, Mistral Vibe, and Amazon products different news inputs. Stack Overflow, productivity suites, commerce apps, and code repositories show that the same pattern extends well beyond five social and local examples. Claude and Perplexity provide broad retrieval, but their public documentation does not establish equivalent dedicated access to every social platform. Raw and open-weight models have no live source access unless their deployer adds it.

These differences are usually gradients of completeness, freshness, structure, and reliability—not absolute walls. Public content can often be discovered by multiple search engines, while native, licensed, or user-authorized systems may obtain richer evidence. Documentation alone cannot tell us how large the practical advantage is; that requires controlled measurement. The most robust generalized-research architecture is therefore the one illustrated by `last30days`: acquire important sources through explicit adapters, preserve provenance, and use the language model as a replaceable planner and synthesizer rather than mistaking it for the retrieval system.

## Appendix A. Reproducible Retrieval Probe

A future empirical study should run the same source-specific tasks across assistants within a narrow time window. For each run, record the product, mode, exact model, account tier, locale, connector state, timestamp, generated search queries when visible, cited URLs, and any access error.

Use known test artifacts rather than open-ended trivia:

1. **Reddit:** select a public thread created within the previous six hours. Ask for the title, author, timestamp, three top-level comments, and one nested reply. Verify each field against the live thread.
2. **YouTube:** select one recent video with captions and one without usable captions. Ask separately for metadata, transcript-derived claims, and claims requiring visual inspection. Do not infer audiovisual understanding merely because the answer summarizes the title or description.
3. **X:** select a recent multi-post thread with a known reply. Ask for the author, dates, post sequence, media description, and reply. Record whether the assistant returns a complete thread or only search snippets.
4. **Meta public content:** use a public Group post or Reel referenced by the documented Facebook feature. Include a clearly private control item that the system should not retrieve.
5. **News and publisher content:** select a newly published partner article and a comparable non-partner article. Request an attributed summary and publication metadata, never the full copyrighted text. Compare freshness and citation depth.
6. **Stack Overflow:** select a question or answer edited within the prior day. Ask for the accepted-answer status, revision time, and a specific technical detail, then compare API-shaped metadata with ordinary page retrieval.
7. **Places or commerce:** choose a listing with a same-day availability, price, or opening-hours change. Record whether the assistant exposes structured current data, a stale page, or only a referral link.

Score retrieval depth independently of prose quality:

| Grade | Retrieved artifact |
|---|---|
| **0** | No relevant result or an access failure. |
| **1** | URL or title only. |
| **2** | Search snippet, description, or limited metadata. |
| **3** | Full text, thread, comment tree, transcript, or repository passages sufficient to verify the requested claims. |
| **4** | Structured, current, source-native fields such as thread topology, revision state, live availability, or authenticated private records. |

Measure at least recall, field accuracy, freshness lag, citation correctness, and failure disclosure. Repeat trials because automatic tool invocation and ranking are stochastic. This design would test the practical consequences of the documented architecture without confusing retrieval success with the language model's writing quality.

## Appendix B. Revision History

- **1.0 — July 28, 2026:** Initial documented capability map and `last30days` case study.
- **1.1 — July 28, 2026:** Added evidence classes, crawler permissions, publisher and application cases, Stack Overflow, code and private-corpus access, scoped prediction-market integrations, product-name updates, conditional-routing details, and an empirical replication protocol. Clarified that the inventory is representative and that documented capability is not measured quality.

## References

1. OpenAI. [ChatGPT Search](https://help.openai.com/en/articles/9237897-chatgpt-search). Updated July 2026; accessed July 28, 2026.
2. OpenAI. [Models](https://developers.openai.com/api/docs/models). Accessed July 28, 2026.
3. OpenAI. [Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856). Accessed July 28, 2026.
4. Reddit. [Reddit and OpenAI Build Partnership](https://redditinc.com/news/reddit-and-oai-partner). May 16, 2024.
5. Google. [An Expanded Partnership with Reddit](https://blog.google/company-news/inside-google/company-announcements/expanded-reddit-partnership/). February 22, 2024.
6. Google AI for Developers. [Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search). Accessed July 28, 2026.
7. Google Gemini Apps Help. [Find and Ask About YouTube Content in Gemini Apps](https://support.google.com/gemini/answer/16622858?hl=en-). Accessed July 28, 2026.
8. Google Gemini Apps Help. [Use and Manage Connected Apps in Gemini](https://support.google.com/gemini/answer/13695044?hl=en-GB). Accessed July 28, 2026.
9. xAI. [X Search](https://docs.x.ai/developers/tools/x-search). Updated May 21, 2026; accessed July 28, 2026.
10. xAI. [Web Search](https://docs.x.ai/developers/tools/web-search). Accessed July 28, 2026.
11. X Help Center. [About Grok](https://help.x.com/en/using-x/about-grok). Accessed July 28, 2026.
12. Anthropic. [Web Search Tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool). Accessed July 28, 2026.
13. Anthropic. [Claude Can Now Search the Web](https://www.anthropic.com/news/web-search). March 20, 2025; update May 27, 2025.
14. Perplexity. [What Is Pro Search?](https://www.perplexity.ai/help-center/en/articles/10352903-what-is-pro-search). Updated July 21, 2026.
15. Perplexity. [Search Domain Filter](https://docs.perplexity.ai/docs/search/filters/domain-filter). Accessed July 28, 2026.
16. Microsoft. [How Web Search Works in Microsoft 365 Copilot Chat and Agents](https://support.microsoft.com/en-us/microsoft-365-copilot/how-web-search-works-in-microsoft-365-copilot-chat-and-agents). Updated February 2026.
17. Microsoft. [How Bing Delivers Search Results](https://support.microsoft.com/en-us/bing/how-bing-delivers-search-results). Updated March 2025.
18. Meta. [Introducing the Meta AI App](https://about.fb.com/news/2025/04/introducing-meta-ai-app-new-way-access-ai-assistant/). April 29, 2025; updated September 12, 2025.
19. Meta. [New AI Tools to Help You Make Things Happen on Facebook](https://about.fb.com/news/2026/06/new-ai-tools-to-help-you-make-things-happen-on-facebook/). June 15, 2026.
20. Mistral AI. [The All New Le Chat](https://mistral.ai/news/all-new-le-chat/). February 6, 2025.
21. Mistral AI. [Le Chat Dives Deep](https://mistral.ai/news/le-chat-dives-deep/). July 17, 2025.
22. Van Horn, Matt, and repository contributors. [`last30days-skill`, commit e82dbd4](https://github.com/mvanhorn/last30days-skill/tree/e82dbd41e148f90a46c6c3f92e59eb7d3f7312f9). Source inspected July 28, 2026.
23. Reddit. [Upholding Our Public Content Policy and Updating Our robots.txt File](https://redditinc.com/news/robot-txt-update). June 25, 2024.
24. Reddit. [User Agreement](https://redditinc.com/policies/user-agreement). Effective July 1, 2026; accessed July 28, 2026.
25. Cloudflare. [Introducing Pay Per Crawl](https://blog.cloudflare.com/introducing-pay-per-crawl/). July 1, 2025.
26. OpenAI. [Partnering with Axios Expands OpenAI's Work with the News Industry](https://openai.com/index/partnering-with-axios-expands-openai-work-with-the-news-industry/). January 15, 2025.
27. OpenAI. [News Corp and OpenAI Sign Landmark Multi-Year Global Partnership](https://openai.com/index/news-corp-and-openai-sign-landmark-multi-year-global-partnership/). May 22, 2024.
28. OpenAI. [Content Partnership with Financial Times](https://openai.com/index/content-partnership-with-financial-times/). April 29, 2024.
29. Meta. [Bringing More International News and Content to Meta AI](https://about.fb.com/news/2026/03/bringing-more-international-news-and-content-to-meta-ai/). March 13, 2026.
30. Mistral AI. [Purr-fectly Informed: AFP Integration](https://mistral.ai/fr/news/mistral-afp/). January 16, 2025.
31. Mistral AI. [Le Chat Is Now Vibe](https://help.mistral.ai/en/articles/682992-le-chat-is-now-vibe). Accessed July 28, 2026.
32. The New York Times Company and Amazon. [Licensing Agreement](https://s23.q4cdn.com/152113917/files/doc_news/2025/May/29/Blog-Post.pdf). May 29, 2025.
33. Stack Overflow. [Google Cloud and Stack Overflow Announce Strategic GenAI Partnership](https://stackoverflow.co/company/press/archive/google-cloud-strategic-gen-ai-partnership/). February 29, 2024.
34. OpenAI. [API Partnership with Stack Overflow](https://openai.com/index/api-partnership-with-stack-overflow/). May 6, 2024.
35. Google Gemini Apps Help. [About Personalization with Connected Apps](https://support.google.com/gemini/answer/16836988?hl=en). Accessed July 28, 2026.
36. Microsoft Learn. [How Does Microsoft 365 Copilot Work?](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture). Accessed July 28, 2026.
37. OpenAI. [Introducing Apps in ChatGPT](https://openai.com/index/introducing-apps-in-chatgpt/). October 6, 2025.
38. OpenAI. [Introducing Company Knowledge](https://openai.com/index/introducing-company-knowledge/). Accessed July 28, 2026.
39. GitHub Docs. [Indexing Repositories for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/repository-indexing). Accessed July 28, 2026.
40. GitHub Docs. [About GitHub Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces). Accessed July 28, 2026.
41. Polymarket and X. [Official Prediction Market Partnership](https://www.prnewswire.com/news-releases/polymarket-and--announce-official-prediction-market-partnership-302475432.html). June 6, 2025.
42. OpenAI. [Apps in ChatGPT](https://help.openai.com/en/articles/11487775-connectors-in-chatgpt). Accessed July 28, 2026.
43. Cloudflare. [An AI Index for All Our Customers](https://blog.cloudflare.com/an-ai-index-for-all-our-customers/). September 26, 2025.
44. Amazon. [Amazon's AI Shopping Assistant Gets New Features](https://www.aboutamazon.com/news/retail/amazon-rufus-ai-assistant-personalized-shopping-features). May 13, 2026.
45. GitHub Docs. [GitHub Copilot CLI Command Reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference). Accessed July 28, 2026.
46. Perplexity. [What Is a Session?](https://www.perplexity.ai/help-center/en/articles/10354769-what-is-a-thread). Updated July 16, 2026.
