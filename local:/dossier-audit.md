# Dossier audit worklist (non-clean items, batches 2-6 parsed; batch 1 raw below)

## anthropic-skill-authoring-best-practices.md
- verdict: update
- source_type: docs
- lines: 22, 28, 32, 34
- reason: Keep degrees-of-freedom, shallow references, eval-first. Cut the 500-line and 100-line-TOC rules, gerund naming, token examples, forward-slash paths, run/read labels, three-scenario count, checklist inventory (22, 28, 32, 34).
- vault_flags: vault/model-aware-harness-design.md: lines 39,45 name `gpt-5.3-codex` phase values, Claude Code `context: fork`, `paths`, `allowed-tools`, Codex `.agents/skills`, `agents/openai.yaml` | vault/progressive-skill-disclosure.md: line 25 spec field lengths, budgets, directory names

## bing-webmaster-tools-ai-performance.md
- verdict: update
- source_type: blog
- lines: 17-18, 115-119, 126-131
- reason: Measurement model, disclaimers and limits are durable. Cut UI navigation path, short link and post tags (17-18), IndexNow/Bing Places pitches (115-119). Reduce H2/H3 and JSON-LD tactic list to the self-contained-excerpt principle (126-131).
- vault_flags: none

## github-copilot-review-effort-levels.md
- verdict: delete
- source_type: docs
- lines: 4, 19, 23, 29, 35-36
- reason: Changelog of setting names (Lite/Balanced, formerly Low/Medium), plan tiers and billing. Default/override model is thin and duplicated by the sibling copilot-code-review-concepts dossier.
- vault_flags: vault/cost-aware-inference-control.md: line 27 Copilot tier names and credit prices | vault/risk-tiered-review-and-approval.md: line 22 Copilot Lite/Balanced, credit prices, admin-enabled Copilot approvals setting

## say-what-you-mean-structured-output.md
- verdict: update
- source_type: blog
- lines: 31, 41-51, 55-61, 87
- reason: Confound and parser analysis is durable. Cut notebook and file inventories (31, 87), the outlines.generate call and regex code block (41-51), and the Pydantic class (55-61). Describe the constraints in prose.
- vault_flags: none

## dossiers/evaluating-agent-skills-output-quality.md
- verdict: update
- source_type: docs
- lines: 18, 22, 28, 30, 34
- reason: Restates the evals.json schema fields, the iteration-N/with_skill/without_skill layout, the timing/grading/feedback/benchmark.json files and the skill-creator tool. Keep the paired-baseline model, effect assertions, cost-quality delta and the admitted small-sample limit.
- vault_flags: vault/evaluated-skill-routing.md: body line 27 names the Codex discovery budget, the Claude Code 1,536-character description cap, the when_to_use key and disable-model-invocation: true

## dossiers/generative-engine-optimization-implementation-guide.md
- verdict: update
- source_type: other
- lines: 37, 41-42, 45, 53-54, 64
- reason: The implementation-area list gives markup steps: one <main>, stable IDs, JSON-LD CI gate on @type, fetching as each crawler user-agent, a ten-step order, llms.txt/manifest paths. Keep the pipeline model, chunk-as-unit idea, measurement design and unverified-claims section.
- vault_flags: none

## dossiers/promptomatix-automatic-prompt-optimization.md
- verdict: update
- source_type: paper
- lines: 35-36
- reason: Minor. Line 35 lists [TASK]/[RULES]/[OUTPUT_FORMAT] marker syntax and DSPy module names. Line 36 lists quick/moderate/heavy preset values. Summarize these as inferred configuration and a budget tradeoff.
- vault_flags: none

## dossiers/anthropic-agent-skills-platform-overview.md
- verdict: update
- source_type: docs
- lines: 26-29, 31
- reason: Surface bullets restate skill_id/container, /v1/skills, prebuilt IDs, ~/.claude/skills paths, zip-upload-via-settings, paid plans, naming/XML rules. Keep the no-network API sandbox, no cross-surface sync, per-user sharing, ZDR exclusion, scan limits.
- vault_flags: vault/model-aware-harness-design.md: line 45 names Claude Code frontmatter keys (context: fork, paths, allowed-tools), Codex .agents/skills scan scopes and agents/openai.yaml | vault/progressive-skill-disclosure.md: line 25 restates spec field-length limits (name 1–64, description 1–1,024) and folder names; borderline, since host budgets (1%, 2%/8,000, 5,000/25,000 reattach) are dated behavior worth keeping

## dossiers/axi-agent-experience-interface.md
- verdict: update
- source_type: readme
- lines: 37, 40, 46, 48
- reason: Principles and benchmarks are durable, but it restates specific tool commands and flags (--full, --help, open, fill --submit, click --query, tables --url). Describe fused navigate/submit/filter operations generically.
- vault_flags: vault/bounded-tool-observations.md: line 11 names the `--full` flag as the expansion mechanism (minor; generalize)

## dossiers/openai-build-agent-skills.md
- verdict: update
- source_type: docs
- lines: 22, 24, 28, 30
- reason: Restates invocation syntax (@, /skills, $skill, $skill-creator), scan paths, ~/.codex/config.toml, surface lists, openai.yaml key syntax, $skill-installer. Keep the dated 2%/8,000 cap, the implicit/explicit boundary, collision behavior, and that an opt-out exists.
- vault_flags: vault/evaluated-skill-routing.md: line 27 names settings `disable-model-invocation: true`, `policy.allow_implicit_invocation: false` in `agents/openai.yaml`, and the `when_to_use` key with its 1,536-char cap | vault/model-aware-harness-design.md: line 45 names .agents/skills scopes, agents/openai.yaml, Claude Code frontmatter extension keys

## dossiers/personas-system-prompts-not-helpful.md
- verdict: update
- source_type: paper
- lines: 141-151
- reason: The 'Released Artifacts' section mirrors the repo file inventory (data/*.csv, scripts, notebooks). Cut it; the Drive-dependency caveat already appears under Limitations.
- vault_flags: none

## dossiers/shopify-roast-structured-ai-workflows.md
- verdict: update
- source_type: blog
- lines: 24, 26, 38, 42
- reason: Restates step syntax (workflow.yml, prompt.md, ERB, $(), ^ prefix, BaseStep), the tool/Raix feature inventory, and the Ruby 3.0+/API-key setup. Keep the hybrid-workflow model, resume-from-step, AI-to-deterministic promotion, use cases, and the claims critique.
- vault_flags: none

## dossiers/claude-code-skills-reference.md
- verdict: update
- source_type: docs
- lines: 22, 24, 28, 35-36, 41, 45, 49
- reason: Keep: allowed-tools grants but does not restrict, fork gets no history, text outlives permissions, dated compaction budgets. Cut: placement paths, --add-dir, frontmatter-key inventory, skillOverrides, !-injection/$ARGUMENTS syntax, plugin-eval commands.
- vault_flags: vault/evaluated-skill-routing.md: line 27 body names Claude Code's 1,536-char cap, `when_to_use`, `disable-model-invocation: true`, and Codex's discovery budget | vault/model-aware-harness-design.md: line 45 body lists `context: fork`, `paths`, `allowed-tools`, `.agents/skills`, `agents/openai.yaml` | vault/progressive-skill-disclosure.md: line 25 body gives spec field character limits, folder names, and Claude Code truncation

## dossiers/designing-refining-maintaining-agent-skills-perplexity.md
- verdict: update
- source_type: blog
- lines: 26, 41
- reason: Mostly durable practice (routing evals, gotchas flywheel, tax-code experience). Line 26 restates a naming rule; line 41 a scripts/references/assets folder rule. Rewrite both as the separation principle.
- vault_flags: vault/evaluated-skill-routing.md: line 27 body carries Claude Code and Codex settings and limits | vault/progressive-skill-disclosure.md: line 25 body carries spec field limits and folder names

## dossiers/openai-codex-prompting-guide.md
- verdict: update
- source_type: docs
- lines: 22, 47, 57-62, 70, 72, 76
- reason: Keep: model/harness coupling, dated preamble reversal, layered instruction precedence, head+tail truncation, contradictions, limits. Cut: reasoning-effort settings, tool-schema recipe, parallel-calls toggle, ~/.codex and AGENTS.override paths/headers, phase values, /responses/compact and encrypted_content.
- vault_flags: vault/model-aware-harness-design.md: line 39 body names `gpt-5.3-codex` and the `phase` field | vault/prompt-model-drift.md: line 35 body names `gpt-5.3-codex` and `phase` | vault/bounded-tool-observations.md: line 11 body uses the `--full` flag example; line 25 body gives Codex's 10,000-token cap

## dossiers/vllm-ollama-performance-practicality.md
- verdict: update
- source_type: blog
- lines: 26, 32, 35
- reason: Benchmark, saturation curves and trade-offs are durable. Cut the `vllm serve`/port-8000/endpoint list (26) and the --gpu-memory-utilization flag (32). Line 35: keep 'thinking disabled', drop /no_think.
- vault_flags: none

## dossiers/anthropic-claude-code-quality-postmortem.md
- verdict: update
- source_type: blog
- lines: 30, 34, 60, 63
- reason: Keep the incident model. Cut the `/effort` command, `ultrathink` and current xhigh/high defaults (30), the `clear_thinking_20251015` header and `keep:1` (34), `CLAUDE.md` (60), and `/feedback` and @ClaudeDevs (63).
- vault_flags: vault/model-aware-harness-design.md: line 45 restates skill frontmatter keys (context: fork, paths, allowed-tools), .agents/skills and agents/openai.yaml paths | vault/prompt-model-drift.md: line 35 names `gpt-5.3-codex` and the `phase` metadata key

## dossiers/claude-prompting-best-practices.md
- verdict: update
- source_type: docs
- lines: 22, 50-52, 56
- reason: Durable mechanics are fine. Cut the model roster (22). Rewrite table rows 50-52 and 56 as dated behavior, dropping the `budget_tokens` and `thinking` parameter names and HTTP 400 codes.
- vault_flags: vault/prompt-model-drift.md: line 35 names `gpt-5.3-codex` and the `phase` key

## dossiers/github-copilot-code-review-concepts.md
- verdict: update
- source_type: docs
- lines: 19, 23, 25, 30, 36-37
- reason: Keep: approval authority boundary, head-branch instructions, excluded files, runner-dependent context. Cut: surface list, who-can-enable/trigger options, MCP defaults, admin override chain, credit $ ranges, settings-audit and tier-name advice.
- vault_flags: vault/risk-tiered-review-and-approval.md: line 22 Lite/Balanced tiers, credit $ ranges, admin approval setting in body | vault/cost-aware-inference-control.md: line 27 Lite/Balanced tiers and credit $ ranges in body | vault/normative-source-grounded-ai-assistance.md: line 19 Copilot approvals setting and enterprise/org/repo enablement in body | vault/calibrated-code-review-rules.md: line 30 names Copilot runner dependency and exclusions in body (minor)

## dossiers/google-conductor-automated-reviews.md
- verdict: update
- source_type: blog
- lines: 26, 31
- reason: Cut the `gemini extensions install` command (31). Optionally generalize the `plan.md`/`spec.md` file names (26). The review-dimension analysis is durable.
- vault_flags: vault/machine-readable-agent-specifications.md: line 34 names `AGENTS.md` in body (minor)

## dossiers/prompt-report.md
- verdict: update
- source_type: paper
- lines: 67
- reason: Minor. Line 67 names DSPy as the case study's search tool. Rewrite as an automated prompt-optimization search, or drop the name.
- vault_flags: none

## dossiers/vllm-or-llamacpp-inference-engine-selection.md
- verdict: update
- source_type: blog
- lines: 28
- reason: The benchmark and tradeoffs are durable, and the line 26 versions are dated test conditions. Rewrite line 28 without the `-ngl 99` flag and the thread-count settings.
- vault_flags: none


# Batch 1 raw report (5 updates: google-search-generative-ai-optimization-guide, agent-skills-format-specification, function-calling, cognition-devin-builds-devin, openai-gpt-5-prompting-guide)

{"text":"{\n  \"summary\": \"I audited all 43 dossiers in batch 1. 38 are clean, 5 need an update and none need deletion. The five updates are the Google AI-optimization guide, the Agent Skills spec, OpenAI function calling, Cognition's Devin post and the GPT-5 prompting guide. Four linked vault notes name vendor directives or config keys in their body text: publisher-ai-usage-controls, progressive-skill-disclosure, evaluated-skill-routing and model-aware-harness-design. A fifth, prompt-model-drift, has a borderline mention of a version-gated key.\",\n  \"files\": [\n    {\n      \"path\": \"dossiers/google-search-generative-ai-optimization-guide.md\",\n      \"description\": \"update (docs). Line 50 lists the technical requirements; line 51 gives the Search Console option values and how long changes take to spread; lines 85-90 give directive syntax, including max-snippet:[number] and the data-nosnippet element list. Keep the boundary claims: a page must be snippet-eligible to be used, and Google-Extended does not control AI Overviews.\"\n    },\n    {\n      \"path\": \"dossiers/agent-skills-format-specification.md\",\n      \"description\": \"update (docs). Lines 23-27 list every frontmatter field with its limits; line 31 contains the validate command. Keep the loader model, the idea that the description is an interface, and the point that allowed-tools is experimental and not a security boundary.\"\n    },\n    {\n      \"path\": \"dossiers/function-calling.md\",\n      \"description\": \"update (docs). Lines 22-28 are a how-to step list and line 30 lists the API's controls. The durable part is the boundary: the model proposes a call and the host authorizes and executes it.\"\n    },\n    {\n      \"path\": \"dossiers/cognition-devin-builds-devin.md\",\n      \"description\": \"update (blog). Line 31 describes review-UI severity labels and the Auto-Review trigger options; line 38 names the playbook command. The rest is useful first-party experience.\"\n    },\n    {\n      \"path\": \"dossiers/openai-gpt-5-prompting-guide.md\",\n      \"description\": \"update (docs/cookbook). Line 36 gives the setting name, its default and a newly added setting value; the Responses API sections name the setting that carries reasoning across turns. The flagged part is small; the τ-Bench result, the Cursor case and the generation-drift lessons are durable.\"\n    },\n    {\n      \"path\": \"vault/publisher-ai-usage-controls.md\",\n      \"description\": \"Vault flag: the body names robots.txt, noindex, nosnippet, max-snippet:[n], max-image-preview and data-nosnippet (lines 17-19, 26-27, 38, 40).\"\n    },\n    {\n      \"path\": \"vault/progressive-skill-disclosure.md\",\n      \"description\": \"Vault flag: line 25 restates the SKILL.md field limits (name 1–64, description 1–1,024) and the size budgets.\"\n    },\n    {\n      \"path\": \"vault/evaluated-skill-routing.md\",\n      \"description\": \"Vault flag: line 27 names Claude Code's when_to_use field with its 1,536-character cap, and the disable-model-invocation: true setting.\"\n    },\n    {\n      \"path\": \"vault/model-aware-harness-design.md\",\n      \"description\": \"Vault flag: lines 39 and 45 name gpt-5.3-codex phase metadata, context: fork, paths, allowed-tools, .agents/skills and agents/openai.yaml.\"\n    }\n  ],\n  \"architecture\": \"Only the docs, cookbook and product-blog dossiers break the rule; the arXiv, SSRN, DOI and preprint dossiers are clean. None is a pure documentation mirror, because each docs dossier also carries a boundary claim or an admitted limitation. All 27 paper dossiers and the conceptual or experience blogs (Anthropic skills, Copilot application card, Stripe Minions, Code Agent Orchestra, agent-memory essay, GitHub Trust Layer, Snapcompact, Demystifying evals) are clean. Most of the operational residue has spread into the vault through the Agent Skills and Google clusters.\",\n  \"report\": \"{\\\"audits\\\":[\\n{\\\"file\\\":\\\"dossiers/adaptive-ai-test-governance.md\\\",\\\"verdict\\\":\\\"clean\\\",\\\"source_type\\\":\\\"paper\\\",\\\"lines\\\":\\\"\\\",\\\"reason\\\":\\\"Conceptual governance framework paper; no operational content.\\\",\\\"vault_flags\\\":[]},\\n{\\\"file\\\":\\\"dossiers/agent-skills-format-specification.md\\\",\\\"verdict\\\":\\\"update\\\",\\\"source_type\\\":\\\"docs\\\",\\\"lines\\\":\\\"23-27, 31\\\",\\\"reason\\\":\\\"Lines 23-27 inventory the frontmatter fields with character limits and name rules; line 31 has the validate command. Keep the loader model, the description as decision surface, and allowed-tools as experimental and not a boundary.\\\",\\\"vault_flags\\\":[\\\"vault/progressive-skill-disclosure.md: line 25 restates the name 1–64 and description 1–1,024 limits and the token/line budget…\n}\n\n[Some lines truncated to 768 chars]","details":{"totalLines":43,"displayContent":{"text":"{\n  \"summary\": \"I audited all 43 dossiers in batch 1. 38 are clean, 5 need an update and none need deletion. The five updates are the Google AI-optimization guide, the Agent Skills spec, OpenAI function calling, Cognition's Devin post and the GPT-5 prompting guide. Four linked vault notes name vendor directives or config keys in their body text: publisher-ai-usage-controls, progressive-skill-disclosure, evaluated-skill-routing and model-aware-harness-design. A fifth, prompt-model-drift, has a borderline mention of a version-gated key.\",\n  \"files\": [\n    {\n      \"path\": \"dossiers/google-search-generative-ai-optimization-guide.md\",\n      \"description\": \"update (docs). Line 50 lists the technical requirements; line 51 gives the Search Console option values and how long changes take to spread; lines 85-90 give directive syntax, including max-snippet:[number] and the data-nosnippet element list. Keep the boundary claims: a page must be snippet-eligible to be used, and Google-Extended does not control AI Overviews.\"\n    },\n    {\n      \"path\": \"dossiers/agent-skills-format-specification.md\",\n      \"description\": \"update (docs). Lines 23-27 list every frontmatter field with its limits; line 31 contains the validate command. Keep the loader model, the idea that the description is an interface, and the point that allowed-tools is experimental and not a security boundary.\"\n    },\n    {\n      \"path\": \"dossiers/function-calling.md\",\n      \"description\": \"update (docs). Lines 22-28 are a how-to step list and line 30 lists the API's controls. The durable part is the boundary: the model proposes a call and the host authorizes and executes it.\"\n    },\n    {\n      \"path\": \"dossiers/cognition-devin-builds-devin.md\",\n      \"description\": \"update (blog). Line 31 describes review-UI severity labels and the Auto-Review trigger options; line 38 names the playbook command. The rest is useful first-party experience.\"\n    },\n    {\n      \"path\": \"dossiers/openai-gpt-5-prompting-guide.md\",\n      \"description\": \"update (docs/cookbook). Line 36 gives the setting name, its default and a newly added setting value; the Responses API sections name the setting that carries reasoning across turns. The flagged part is small; the τ-Bench result, the Cursor case and the generation-drift lessons are durable.\"\n    },\n    {\n      \"path\": \"vault/publisher-ai-usage-controls.md\",\n      \"description\": \"Vault flag: the body names robots.txt, noindex, nosnippet, max-snippet:[n], max-image-preview and data-nosnippet (lines 17-19, 26-27, 38, 40).\"\n    },\n    {\n      \"path\": \"vault/progressive-skill-disclosure.md\",\n      \"description\": \"Vault flag: line 25 restates the SKILL.md field limits (name 1–64, description 1–1,024) and the size budgets.\"\n    },\n    {\n      \"path\": \"vault/evaluated-skill-routing.md\",\n      \"description\": \"Vault flag: line 27 names Claude Code's when_to_use field with its 1,536-character cap, and the disable-model-invocation: true setting.\"\n    },\n    {\n      \"path\": \"vault/model-aware-harness-design.md\",\n      \"description\": \"Vault flag: lines 39 and 45 name gpt-5.3-codex phase metadata, context: fork, paths, allowed-tools, .agents/skills and agents/openai.yaml.\"\n    }\n  ],\n  \"architecture\": \"Only the docs, cookbook and product-blog dossiers break the rule; the arXiv, SSRN, DOI and preprint dossiers are clean. None is a pure documentation mirror, because each docs dossier also carries a boundary claim or an admitted limitation. All 27 paper dossiers and the conceptual or experience blogs (Anthropic skills, Copilot application card, Stripe Minions, Code Agent Orchestra, agent-memory essay, GitHub Trust Layer, Snapcompact, Demystifying evals) are clean. Most of the operational residue has spread into the vault through the Agent Skills and Google clusters.\",\n  \"report\": \"{\\\"audits\\\":[\\n{\\\"file\\\":\\\"dossiers/adaptive-ai-test-governance.md\\\",\\\"verdict\\\":\\\"clean\\\",\\\"source_type\\\":\\\"paper\\\",\\\"lines\\\":\\\"\\\",\\\"reason\\\":\\\"Conceptual governance framework paper; no operational content.\\\",\\\"vault_flags\\\":[]},\\n{\\\"file\\\":\\\"dossiers/agent-skills-format-specification.md\\\",\\\"verdict\\\":\\\"update\\\",\\\"source_type\\\":\\\"docs\\\",\\\"lines\\\":\\\"23-27, 31\\\",\\\"reason\\\":\\\"Lines 23-27 inventory the frontmatter fields with character limits and name rules; line 31 has the validate command. Keep the loader model, the description as decision surface, and allowed-tools as experimental and not a boundary.\\\",\\\"vault_flags\\\":[\\\"vault/progressive-skill-disclosure.md: line 25 restates the name 1–64 and description 1–1,024 limits and the token/line budget…\n}","startLine":1,"lineNumbers":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]},"fileSize":14488,"meta":{"source":{"type":"internal","value":"agent://DossierAudit1"},"limits":{"columnTruncated":{"maxColumn":768,"unit":"chars"}}},"resolvedPath":"/Users/cjalatorre/.omp/agent/sessions/-development-projects-knowledge-base-intelligent-systems/2026-09-28T17-22-08-838Z_01a0e909-cd46-7708-9351-26cbedc29032/DossierAudit1.md","contentType":"text/markdown"}}

# Vault flags (all)

## vault/evaluated-skill-routing.md
- vault/evaluated-skill-routing.md: line 27 names Claude Code 1,536-char description cap, `disable-model-invocation: true` key, Codex discovery budget
- vault/evaluated-skill-routing.md: line 27 Claude Code char cap and `disable-model-invocation` key
- vault/evaluated-skill-routing.md: line 27 vendor char cap and config key
- vault/evaluated-skill-routing.md: body line 27 names the Codex discovery budget, the Claude Code 1,536-character description cap, the when_to_use key and disable-model-invocation: true
- vault/evaluated-skill-routing.md: body line 27 names the Codex discovery budget, the Claude Code 1,536-character cap, the when_to_use key and disable-model-invocation: true
- vault/evaluated-skill-routing.md: line 27 names settings `disable-model-invocation: true`, `policy.allow_implicit_invocation: false` in `agents/openai.yaml`, and the `when_to_use` key with its 1,536-char cap
- vault/evaluated-skill-routing.md: line 27 body names Claude Code's 1,536-char cap, `when_to_use`, `disable-model-invocation: true`, and Codex's discovery budget
- vault/evaluated-skill-routing.md: line 27 body carries Claude Code and Codex settings and limits

## vault/progressive-skill-disclosure.md
- vault/progressive-skill-disclosure.md: line 25 lists SKILL.md name/description char limits, token/line budgets, scripts/references/assets dirs, Claude Code truncation
- vault/progressive-skill-disclosure.md: line 25 spec field lengths, budgets, directory names
- vault/progressive-skill-disclosure.md: line 25 spec limits and Claude Code truncation
- vault/progressive-skill-disclosure.md: body line 25 gives SKILL.md YAML name/description length limits, the scripts/references/assets directories and Claude Code truncation
- vault/progressive-skill-disclosure.md: line 25 restates spec field-length limits (name 1–64, description 1–1,024) and folder names; borderline, since host budgets (1%, 2%/8,000, 5,000/25,000 reattach) are dated behavior worth keeping
- vault/progressive-skill-disclosure.md: line 25 body gives spec field character limits, folder names, and Claude Code truncation
- vault/progressive-skill-disclosure.md: line 25 body carries spec field limits and folder names
- vault/progressive-skill-disclosure.md: line 25 restates YAML field limits, folder names, token/line budgets, client truncation caps

## vault/source-adapter-decoupling.md
- vault/source-adapter-decoupling.md: line 21 body enumerates vendor tool chain (yt-dlp, native X search, Brave→Exa→Serper→keyless)

## vault/cost-aware-inference-control.md
- vault/cost-aware-inference-control.md: line 27 names Copilot Lite/Balanced tiers and AI-credit prices ($0.05–$1, $0.25–$5) and Actions minutes
- vault/cost-aware-inference-control.md: line 27 Copilot tier names and credit prices
- vault/cost-aware-inference-control.md: line 27 Lite/Balanced tiers and credit $ ranges in body

## vault/model-aware-harness-design.md
- vault/model-aware-harness-design.md: lines 39,45 name `gpt-5.3-codex` phase values, Claude Code `context: fork`, `paths`, `allowed-tools`, Codex `.agents/skills`, `agents/openai.yaml`
- vault/model-aware-harness-design.md: lines 39,45 vendor frontmatter keys, directory paths, model phase metadata
- vault/model-aware-harness-design.md: body line 45 names the context: fork, paths and allowed-tools keys, .agents/skills scan scopes and agents/openai.yaml
- vault/model-aware-harness-design.md: line 45 names Claude Code frontmatter keys (context: fork, paths, allowed-tools), Codex .agents/skills scan scopes and agents/openai.yaml
- vault/model-aware-harness-design.md: line 45 names .agents/skills scopes, agents/openai.yaml, Claude Code frontmatter extension keys
- vault/model-aware-harness-design.md: line 45 body lists `context: fork`, `paths`, `allowed-tools`, `.agents/skills`, `agents/openai.yaml`
- vault/model-aware-harness-design.md: line 39 body names `gpt-5.3-codex` and the `phase` field
- vault/model-aware-harness-design.md: line 45 restates skill frontmatter keys (context: fork, paths, allowed-tools), .agents/skills and agents/openai.yaml paths
- vault/model-aware-harness-design.md: line 45 restates skill frontmatter keys and discovery directories per vendor
- vault/model-aware-harness-design.md: line 45 restates vendor skill keys and paths

## vault/risk-tiered-review-and-approval.md
- vault/risk-tiered-review-and-approval.md: line 22 Copilot Lite/Balanced, credit prices, admin-enabled Copilot approvals setting
- vault/risk-tiered-review-and-approval.md: line 22 Copilot tiers, credit prices, approval setting
- vault/risk-tiered-review-and-approval.md: line 22 Lite/Balanced tiers, credit $ ranges, admin approval setting in body

## vault/file-native-context-retrieval.md
- vault/file-native-context-retrieval.md: line 27 body names AGENTS.md/CLAUDE.md file conventions (moderate)
- vault/file-native-context-retrieval.md: body line 27 names the ~100-line AGENTS.md index, CI doc checks and the Claude Code CLAUDE.md plus glob/grep hybrid; move these to Sources
- vault/file-native-context-retrieval.md: body line 27 names AGENTS.md/CLAUDE.md conventions and vendor harness specifics

## vault/machine-readable-agent-specifications.md
- vault/machine-readable-agent-specifications.md: line 34 body names nested AGENTS.md convention (minor)
- vault/machine-readable-agent-specifications.md: line 34 names `AGENTS.md` in body (minor)
- vault/machine-readable-agent-specifications.md: line 34 names nested `AGENTS.md` in body (minor)

## vault/reversible-query-conditioned-compaction.md
- vault/reversible-query-conditioned-compaction.md: body line 32 describes Claude Code's compaction and its five-most-recent-files reattachment; vendor behavior belongs in Sources

## vault/bounded-tool-observations.md
- vault/bounded-tool-observations.md: line 11 names the `--full` flag as the expansion mechanism (minor; generalize)
- vault/bounded-tool-observations.md: line 11 body uses the `--full` flag example; line 25 body gives Codex's 10,000-token cap

## vault/prompt-model-drift.md
- vault/prompt-model-drift.md: line 35 body names `gpt-5.3-codex` and `phase`
- vault/prompt-model-drift.md: line 35 names `gpt-5.3-codex` and the `phase` metadata key
- vault/prompt-model-drift.md: line 35 names `gpt-5.3-codex` and the `phase` key

## vault/skill-supply-chain-admission.md
- vault/skill-supply-chain-admission.md: line 17 names `.mcp.json` in body (minor)
- vault/skill-supply-chain-admission.md: line 17 `.mcp.json` in body (minor)

## vault/normative-source-grounded-ai-assistance.md
- vault/normative-source-grounded-ai-assistance.md: line 19 Copilot approvals setting and enterprise/org/repo enablement in body

## vault/calibrated-code-review-rules.md
- vault/calibrated-code-review-rules.md: line 30 names Copilot runner dependency and exclusions in body (minor)

