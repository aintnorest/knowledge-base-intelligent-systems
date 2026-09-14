---
type: Study Note
title: "Say What You Mean: A Response to 'Let Me Speak Freely'"
description: A vendor-authored rebuttal that re-runs three reasoning tasks, identifies prompt and parser confounds in a paper about format restrictions, and argues that carefully prompted constrained generation can improve exact-match accuracy.
resource: https://blog.dottxt.ai/say-what-you-mean.html
source: /archive/say-what-you-mean-structured-output.html
tags: [evaluation, prompting, verification, reliability]
timestamp: 2026-09-14T17:11:41Z
---

# Say What You Mean: A Response to 'Let Me Speak Freely' — Study Notes

- **Author**: Will Kurt
- **Publisher**: .txt
- **Format**: Technical rebuttal and vendor blog post
- **Canonical URL**: https://blog.dottxt.ai/say-what-you-mean.html
- **Publication date**: Not stated in the preserved page; the HTML contains an Org export comment dated 2026-06-23
- **Target of the rebuttal**: Tam et al., [*Let Me Speak Freely? A Study on the Impact of Format Restrictions on Performance of Large Language Models*](https://arxiv.org/abs/2408.02442)
- **Reproduction materials**: [dottxt-ai/demos/say-what-you-mean](https://github.com/dottxt-ai/demos/tree/main/say-what-you-mean)

## What It Is

A direct challenge to Tam et al.'s conclusion that structured-generation constraints significantly degrade LLM reasoning. Kurt argues that the paper's natural-language and structured arms were not comparable: they used materially different prompts, the structured prompt omitted the requested output format and schema, and a second LLM was used to recover answers from free-form responses. He then reports reimplementations with Llama-3-8B-Instruct in which constrained generation slightly beats the corresponding unconstrained arm on GSM8K, Last Letter, and Shuffle Objects.

The article's strongest contribution is not the categorical claim that structure always helps. It is the diagnosis that a benchmark of output constraints is really a benchmark of a composed system: prompt, chat template, demonstrations, decoder constraints, parser, and scorer. If those components differ between arms, the measured gap cannot be attributed to constrained decoding alone.

This is also an adversarial response from an interested party. .txt markets structured-output infrastructure and describes itself as the team behind Outlines; the reproduction uses `.txt's Outlines`, and the article explicitly says the company is passionate about structured generation. That commercial interest does not invalidate the code or numbers, but it raises the evidentiary bar. The post should be read as contested direct evidence and a concrete audit of one study, not as final authority on whether format constraints help in general.

## The Reproduction

The linked repository exposes four notebooks — `GSM8K_JSON.ipynb`, `JSON_section.ipynb`, `Last_Letter_NL_best.ipynb`, and `Shuffle_Objects.ipynb` — plus `data/` and `templates/` directories. The preserved article itself contains the essential Last Letter code and reported results, but not the notebooks or the 12 GB experimental corpus it references.

The headline reimplementation uses Llama-3-8B-Instruct and reports exact-match accuracy as follows:

| Task | Unstructured | Structured | Difference |
|---|---:|---:|---:|
| GSM8K | 0.77 | 0.78 | +0.01 |
| Last Letter | 0.73 | 0.77 | +0.04 |
| Shuffle Objects | 0.41 | 0.44 | +0.03 |

The detailed case study is Last Letter: concatenate the final letters of four names. It uses the same 150-item test split as Tam et al. For the free-form reproduction, Kurt calls `outlines.generate.text` with the paper's natural-language prompt, except that he changes the one-shot example from two names to four so it matches the evaluation inputs. For the constrained natural-language arm, he combines:

```python
answer_regex = r'answer is ([A-Za-z]{4})'
cot_regex = r'Answer: T[\w \",\\.]{30,250}. The '

struct_strict = outlines.generate.regex(
    model,
    cot_regex + answer_regex,
    sampler=greedy())
```

The regex forces a bounded 30–250-character reasoning region followed by a four-letter answer. The reported detailed Last Letter scores are 0.57 for the paper's recorded output as parsed by its AI parser, 0.65 for the reproduced unconstrained output under the strict regex, 0.66 for the same output under a flexible regex set, and 0.68 for constrained regex generation.

For JSON, the replacement prompt uses Llama's chat template, names the task and response format explicitly, provides a four-name worked example in the desired JSON shape, and terminates with an empty assistant turn so generation starts in the response role. A Pydantic model defines the constraint:

```python
class Response(BaseModel):
    reasoning: constr(max_length=250)
    answer: str = Field(pattern=r'[A-Z]{4}')
```

The article then builds a regex from that JSON Schema and checks that the demonstration embedded in the prompt matches it before generation. Under the revised JSON prompt, the reported Last Letter results are:

| Method | Accuracy |
|---|---:|
| Structured natural language | 0.68 |
| Unconstrained JSON | 0.73 |
| Constrained JSON | 0.77 |

This final 0.73-versus-0.77 comparison is the post's cleanest decoding ablation because both arms use the revised JSON prompt. The broader contrast with Tam et al. is less isolated because the rebuttal repairs several prompt components at once.

## Prompt-Arm Confounds

The article reproduces enough prompt text to make its fairness objection concrete.

The best natural-language arm tells the model what the task is, asks for step-by-step work, and specifies an answer pattern: `Answer: <think step by step>. The final answer is <answer>`. By contrast, the cited structured prompt says only `You must use the tool`; it does not identify a tool, mention JSON, provide a schema, or demonstrate the expected shape. A model could solve the word puzzle yet have no textual basis for inferring the requested serialization.

That is a serious confound: different instructions make the treatment simultaneously “constrained decoding” and “worse task specification.” But the rebuttal's repair introduces a confound of its own if read as a single causal result. It changes the chat template, fixes the demonstration's arity, adds an explicit schema and worked JSON response, primes an assistant turn, and then applies decoder constraints. Those changes establish that the original structured arm was not a fair test; they do not establish which repair caused the recovery. Only the same-revised-prompt JSON comparison isolates constrained versus unconstrained generation, and its four-point gap is modest.

The article also claims that Tam et al.'s own classification experiments sometimes favor structured generation. The preserved post does not reproduce those classification results, so that point remains an assertion here rather than inspectable evidence.

## Parser Comparison

Tam et al. use `claude-3-haiku-20240307` as a “Perfect Text Parser” to extract the task answer from free-form output. Kurt's central objection is that this gives the unconstrained arm a second model call while structured generation is designed to make extraction deterministic.

He first re-parses one recorded Llama-3-8B-Instruct, one-shot Last Letter run (`lasterletter-t3-f3`, file `text_llama-3-8b-instruct_shots_1.jsonl`) with the prompt's literal regex. Some semantically plausible answers fail that strict surface form:

- `The answer is e-S-S-E.` → `ESSE`
- `The answer is AAA R.` → `AAAR`
- `The answer is "reye".` → `REYE`
- `The final answer is: YOOI` → `YOOI`

He adds four alternate regex patterns for hyphens, optional spaces and quotes, an alternate “Concatenating them is” phrase, and apostrophe-separated letters. On the same stored generations, parser choice alone changes measured accuracy:

| Parser | Accuracy |
|---|---:|
| Strict regex | 0.35 |
| Claude 3 Haiku AI parser | 0.57 |
| Hand-curated flexible regex set | 0.61 |

This is strong evidence that answer extraction is part of the evaluated system rather than a neutral reporting step. It also cuts both ways. The strict regex undercounts reasonable answers; the LLM parser is neither deterministic nor “perfect”; and the flexible regexes were designed after inspecting misses and then scored on the same dataset, so 0.61 is vulnerable to post-hoc parser overfitting. A stronger protocol would freeze extraction rules before the held-out run, report parse failures separately from wrong answers, and adjudicate ambiguous recoveries independently.

## What the Results Do and Do Not Show

The reported results rebut a broad inference from one implementation: severe structured-arm failures below 10% on Last Letter need not follow from asking for JSON or from constrained generation itself. With a task-complete prompt, schema-compatible demonstration, proper model template, and deterministic constraint, the same model reportedly reaches 77%.

They do not prove the article's opening “clear no” for all models, tasks, schemas, or constraint implementations. The detailed evidence centers on one model and one 150-item symbolic task. The post gives point estimates without confidence intervals, repeated runs, significance tests, or a full environment and version table. The one-to-four-point headline margins on the three tasks are much smaller than the gross failure the post diagnoses and may be sensitive to implementation details. The capture does not preserve execution logs, item-level predictions, or the linked notebooks, and this ingest did not independently execute the external reproduction.

The conceptual distinction is nevertheless durable:

1. **Format conformance, answer extraction, and semantic correctness are different outcomes.** Measure all three rather than folding parse failures into task errors without disclosure.
2. **Keep the prompt fixed when testing a decoder constraint.** If schema instructions or demonstrations must change, report a factorial or staged ablation rather than attributing the whole delta to decoding.
3. **Treat the parser as benchmark code.** Version it with the prompt, validate it on held-out variants, and do not call an LLM extractor perfect.
4. **Make the prompt and schema agree.** A decoder can guarantee membership in a language; it cannot supply omitted task semantics.
5. **Compare full systems when making deployment claims, but isolate components when making causal claims.** Both views matter, and neither substitutes for the other.

## Commercial Interest and Rhetorical Posture

.txt has a direct commercial stake in confidence in structured generation: its current site sells an API and self-hosted libraries for JSON-, grammar-, and function-call-constrained output and identifies the company as the team behind Outlines. The post is published on its own blog, uses its own library, cites the company's prior experiments, and closes by inviting readers experiencing structured-generation problems to contact the company. Its rhetoric calls the paper's conclusion “fundamentally flawed” and “misinformation.”

That posture makes the post useful as primary evidence of the vendor's technical case, not a disinterested replication. The right response is neither to dismiss it for conflict of interest nor to accept its preferred conclusion. Inspect the notebooks, pin the versions and exact paper revision, rerun both implementations under the same prompt and scoring contract, and ask whether independent groups recover the item-level deltas.

## Questions and Limitations

- **No publication date in the capture.** The page exposes an author and title but no article date. The archived HTML has an Org export comment dated 2026-06-23, which should not automatically be treated as the original publication date.
- **The rebutted paper revision is not pinned.** The post links the unversioned arXiv record; that record now resolves to v3, while the language and artifacts the rebuttal examined may correspond to an earlier revision.
- **Incomplete statistical reporting.** No confidence intervals, hypothesis tests, seeds, number of repeated runs, or item-level comparison are provided in the article. On 150 Last Letter items, a four-point difference corresponds to only six items if both percentages use the same denominator.
- **Several interventions move together.** Better demonstrations and schema instructions plausibly help unconstrained generation too; the post acknowledges this but still uses the repaired full system to support a categorical claim about constraints.
- **Parser tuning is in-sample.** The flexible regex set is hand-curated from observed failures and evaluated on that same recorded set. Its 0.61 score is a diagnostic, not a clean estimate of general parser accuracy.
- **One model dominates the detailed evidence.** Llama-3-8B-Instruct on Last Letter is a useful failure analysis, not broad coverage of current models or difficult schemas.
- **Terminology is unstable.** The footnote defines “JSON-mode” as a fine-tuning process without output guarantees, while contemporary APIs use that term for several distinct mechanisms. Claims should name the actual decoder and constraint implementation rather than rely on the label.
- **The exact chain-of-thought regex is brittle.** It appears to require an `Answer: T... The ...answer is ...` surface form and caps reasoning by characters. That is enough for this demonstration but is not a general structured-reasoning interface.
- **Capture scope is limited.** The archive preserves the post, eight chart images, its stylesheet, and GoatCounter script. It does not preserve the linked GitHub notebooks, 12 GB result corpus, paper PDF, or software environment.

## Vault Ideas Extracted

- [Answer Engineering](/vault/answer-engineering.md) — parser choice changed measured accuracy on identical stored generations from 0.35 to 0.57 to 0.61.
- [Output Priming](/vault/output-priming.md) — the revised chat prompt ends with an empty assistant turn so the response begins in the desired JSON structure.
- [Quality Versus Correctness Prompt Evaluation](/vault/quality-versus-correctness-prompt-evaluation.md) — schema conformance, extraction success, and exact-match correctness need separate accounting, while component claims require fixed-prompt ablations.
