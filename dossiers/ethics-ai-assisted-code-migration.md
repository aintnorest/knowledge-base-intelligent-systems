---
type: Study Note
title: "The Ethics of AI-Assisted Code Migration in Regulated Financial Systems: Accountability, Transparency, and Human Oversight in LLM-Driven Software Conversion"
description: "Practitioner position paper on accountability, provenance and automation bias in regulated code migration, recommending three human review checkpoints and source-versus-target differential testing without empirical outcome data."
resource: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6252918
source: /archive/ethics-ai-assisted-code-migration.pdf
tags: [governance, human-in-the-loop, verification, provenance, coding-agents, enterprise]
timestamp: 2026-09-24T03:48:01Z
---

# The Ethics of AI-Assisted Code Migration in Regulated Financial Systems: Accountability, Transparency, and Human Oversight in LLM-Driven Software Conversion — Study Notes

**Author**: Ronit Sharma  
**Venue**: SSRN 6252918, independent researcher  
**Date**: February 2026

## What It Is

A practitioner-grounded ethical argument about using LLMs to migrate legacy financial code. Converting a codebase is different from autocomplete: the new implementation must preserve externally consequential semantics across language, framework, and data-handling boundaries. The author draws on experience at one major financial institution but gives no identifiable implementation, error-rate dataset, experimental comparison, or numerical migration outcome. This is a position/framework paper, not evidence that the proposed process has been tested at scale.

## Three Risks and Three Controls

1. **Accountability gap → mandatory checkpoints.** A developer may be accountable for migrated code that they did not write and cannot fully understand. A senior engineer first selects suitable modules and excludes work too critical or complex to delegate; a human reviews components during migration; a designated engineer certifies the result after review and testing. The sign-off is intended to attach responsibility to a meaningful decision, not to model output alone.
2. **Transparency deficit → provenance record.** Record original module and framework/language version, model and version, migration date/configuration, subsequent manual edits, reviewer identity, and approval. This links an audited calculation back to source and accepted change, rather than treating generated code as though it had no derivation.
3. **Automation bias → differential testing.** Run original and converted systems against real or representative input corpora and compare outputs at the appropriate granularity; escalate discrepancies for human investigation. Test date boundaries, rounding, nulls, currency conversions, and other domain-specific edge cases. Compilation and passing target-only unit tests do not establish behavioral equivalence.

The paper cites an industry-survey claim of over **97%** AI-tool adoption but presents no original survey or validated effect size for its controls. Its financial scenarios, including employee stock-option vesting and loan systems, are illustrative of stakes rather than observed incident counts.

## Analyst Takeaways

1. **Preserve an independent source oracle.** Replay inputs on old and new implementations, compare externally meaningful outputs with explicit tolerance/normalization rules, and retain mismatches as review artifacts.
2. **Make ownership specific.** Name an approver for scope, each risky component, and final deployment; provide enough evidence and authority to reject a change. An uninformed signature does not close the accountability gap.
3. **Capture migration lineage in the same place as the change.** Source revision, transformation run, tested corpus, differences, accepted exceptions, manual edits, and the reviewer’s rationale should survive a future audit or incident.

## Questions and Limitations

- One institution's unnamed practice informs the argument; there is no sample of migrations, quantified frequency of semantic divergence, controlled review comparison, or proof of cross-industry generalization.
- Differential tests cover observed/constructed inputs, not every possible transaction; original systems can themselves contain defects, undocumented intentional changes, or nondeterministic behavior.
- Replaying real financial data requires strict privacy and access controls. Regulatory obligations differ by jurisdiction; this paper does not establish a legal compliance interpretation.

## Vault Ideas Extracted

* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md)
