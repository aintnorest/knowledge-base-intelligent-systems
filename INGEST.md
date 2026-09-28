# Source Ingest Playbook

Use this playbook to ingest exactly one eligible source from `inbox/` into the
knowledge base.

## Repository Model

- `inbox/` is the transient drop zone for source files.
- `archive/` stores immutable raw source files when a local copy is available.
- `dossiers/` contains one human-readable study note per source.
- `vault/` contains atomic synthesis notes supported by one or more dossiers.
- `index.md` is the root table of contents.
- `log.md` is the authoritative source registry and append-only ingest history.
- `archive/index.md` is the archive manifest.

Read `README.md`, representative dossiers, and representative vault pages
before making changes. Follow their established style where it does not
conflict with this playbook.

## Tagging

All `tags:` frontmatter must use the controlled vocabulary in `TAXONOMY.md`:
3–6 tags per page, most central first; `agents` on every agentic-systems page;
at most one genre tag. Do not invent tags during ingest — if nothing fits, use
the nearest broader tag and flag the gap in the final report as a candidate
addition to `TAXONOMY.md`.

## Candidate Reconciliation

Inspect source files in `inbox/`. Ignore `README.md`, hidden files, temporary
files, and other administrative files.

Identify each source and derive exactly one source key using the strongest
available evidence, in this order:

1. `doi:<identifier>` for a DOI or another stable publisher identifier such as
   `ssrn:<abstract-id>`
2. `arxiv:<base-id>` for an arXiv source, treating revisions of the same base
   ID as the same source unless the task explicitly requests a revision update
3. `url:<normalized-canonical-url-without-scheme>` for a web source. Derive
   the canonical URL from the page's `rel="canonical"` value when available,
   otherwise use the final HTTPS URL after redirects. Remove fragments and
   tracking parameters; normalize the host to lowercase and use one trailing-
   slash convention.
4. `sha256:<checksum>` for a local source with no stronger identifier

Search `log.md` for the exact source key before writing anything. The log is
the authoritative record: a matching key makes the candidate ineligible.

For an incoming source whose key cannot be established, use normalized title
and authors, then exact checksum, to establish the key. Filenames are
supporting evidence only. Dossier frontmatter, `archive/index.md`, and archive
metadata may corroborate an apparent historical inconsistency, but do not
supersede `log.md` as the eligibility record.

Do not re-ingest a source because another part of its earlier ingest is missing
or inconsistent. Report that inconsistency without repairing it unless the task
explicitly asks for repository repair.

If no eligible source exists, make no changes and report that result.

A source is also ineligible when its substance is operational instruction —
installation, configuration, command reference, troubleshooting — with no
stated design, threat model, limitation, measured result, or first-hand
experience. Report it as "not eligible: operational content" and leave it in
`inbox/`.

If several sources are eligible, select the one with the highest expected
long-term knowledge value. Consider technical substance, completeness,
relevance to existing topics, and potential for reusable synthesis. State the
selection rationale in the final report.

## Ingest Procedure

1. Read or extract the complete selected source before writing notes. For a
   PDF, use an available local extractor or install a lightweight library such
   as `pypdf` if necessary.
2. Choose a descriptive lowercase kebab-case slug. Never overwrite an existing
   archive, dossier, or vault file.
3. If the source is a local file, move it to `archive/<slug>.<ext>` without
   modifying its bytes. If the source is available only on the web, retain its
   canonical URL instead; do not create a placeholder archive file.
4. Create `dossiers/<slug>.md` with OKF frontmatter containing:
   - `type: Study Note`
   - `title`
   - `description`
   - `resource` when known
   - `source: /archive/<filename>` for an archived local source, or the
     canonical `https://` URL for a web-only source
   - `tags`
   - an ISO-8601 UTC `timestamp`
5. Write an evidence-grounded dossier matching the existing style. Adapt the
   headings to the source, but normally cover: what it is; the problem or
   motivation; the design or mechanism *as an idea* (how it works and why,
   not how to invoke it); important results, admissions, or experiences;
   analyst takeaways; questions or limitations; and Vault Ideas Extracted.

   Record the model, not the manual. Do not reproduce setup steps, command
   syntax, configuration keys, flag inventories, or troubleshooting lists;
   link the canonical page instead. Product-specific names may appear only
   where they identify a design choice or a limitation (for example, "the
   sandbox wraps one tool; sibling tools run under a different boundary").
   Note the version or date when a behavior is likely to change.
6. Create or update zero to four genuinely reusable vault notes. Prefer
   updating an existing matching concept over creating a near-duplicate. Each
   vault note must be understandable independently and contain:
   - OKF frontmatter with `type: Synthesis`, `title`, `description`, `tags`, and
     an ISO-8601 UTC `timestamp`
   - a concise explanation
   - practical use and limitations where applicable
   - a Sources section linking to the new dossier
   - product-independent wording: name the mechanism, the tradeoff, and the
     failure mode; never a vendor's setting, flag, or command in the body.
     Product specifics belong in the Sources bullet as evidence.
   - the note must remain correct if every product cited in Sources changed
     its implementation tomorrow.
7. Add the dossier and any newly created vault pages to `index.md`. Do not add
   a link already present.
8. Append a dated ingest entry to `log.md`. Do not rewrite prior entries. Its
   required form is:

   ```markdown
   * **Ingest**: `<source-key>` — `<title> dossier` at `/dossiers/<slug>.md` — canonical: <canonical-url-or-archive-path>
   ```

   The source key must be unique in the log. Keep related archive and vault
   changes in the same dated section.
9. For a locally archived source, append it to `archive/index.md`. Do not add a
   web-only source to the archive manifest. Raw archived sources are immutable;
   the manifest remains appendable.
10. Preserve unrelated content and pre-existing inconsistencies.

Use bundle-relative Markdown links such as `/dossiers/example.md` and
`/vault/example.md`.

## Verification

Before finishing, verify that:

- a successfully handled local source no longer exists in `inbox/`
- a locally archived file exists and retained the source checksum
- a local dossier `source:` target exists, or a web-only `source:` is a
  canonical `https://` URL
- every Markdown link added or changed by the ingest resolves to an existing
  file
- all new Markdown files contain the required frontmatter
- the source key appears exactly once in `log.md` and its canonical reference
  matches the selected source
- no duplicate index or manifest entry was introduced
- the diff contains only files required for the ingest
- the dossier and any vault notes contain no setup steps, command syntax,
  configuration keys, or troubleshooting content copied from the source

Report the selected source, why it was eligible, files created or updated,
pre-existing inconsistencies left untouched, and whether every verification
check passed.
