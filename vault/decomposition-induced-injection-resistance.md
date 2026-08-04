---
type: Synthesis
title: Decomposition-Induced Injection Resistance
description: The hypothesis that requiring an evaluator to pass through content-focused and evidence-checked stages can attenuate document-borne prompt injections before they influence a final judgment.
tags: [prompt-injection, llm-as-judge, decomposition, adversarial-robustness]
timestamp: 2026-07-28T21:39:03Z
---

# Decomposition-Induced Injection Resistance

Structured decomposition may reduce an evaluator's sensitivity to malicious instructions embedded in the artifact it is judging. Instead of letting the untrusted document directly drive a score, the workflow interposes content analysis, external or internal evidence checks, and a final synthesis step. Those intermediate obligations can redirect attention toward decision-relevant evidence and make a simple score-inflation instruction less effective.

## Practical Pattern

1. Treat the evaluated artifact as untrusted data at every stage.
2. Separate content extraction, claim verification, and final decision prompts and state.
3. Require criticisms and scores to reference artifact evidence or authorized external evidence.
4. Prevent document text from changing the evaluation rubric, tool policy, or stage instructions.
5. Test the complete workflow against adaptive injections and ablate each stage to identify which controls matter.

## Evidence Boundary

DeepReview reports only a small rating increase under one injected-instruction attack: 5.38 to 5.69, compared with 4.23 to 8.49 for Gemini-2.0-Flash-Thinking and 6.76 to 8.17 for DeepSeek-V3. The authors attribute the difference to the multi-stage reasoning framework, but they do not compare the same trained model with and without decomposition. The result therefore supports an association and a testable design hypothesis, not a causal or general security claim.

## Limitations

- Decomposition is not a security boundary; every model stage can still follow malicious content.
- The effect may come from fine-tuning data, model choice, prompts, or output constraints rather than decomposition itself.
- An adaptive attacker can target intermediate formats, retrieval queries, evidence selection, or the final aggregator.
- Rating inflation under one attack template does not measure data exfiltration, tool misuse, denial of service, or other injection outcomes.

Use this as defense in depth alongside privilege separation, trusted control/data boundaries, and adversarial evaluation—not as a replacement for them.

## Sources

- [DeepReview dossier](/dossiers/deepreview-structured-llm-paper-review.md) — reports lower rating inflation than tested direct-review baselines despite no adversarial training, while leaving the responsible mechanism unablated.
