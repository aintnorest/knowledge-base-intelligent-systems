---
type: Synthesis
title: Prompt Security Taxonomy
description: A structured overview of attack vectors targeting LLMs through their prompt interfaces, including adversarial attacks, backdoors, injection, and model stealing.
tags: [prompt-injection, adversarial-robustness, taxonomy, prompting]
timestamp: 2026-07-11T16:36:00Z
---

# Prompt Security Taxonomy

A structured classification of security vulnerabilities in LLMs that are exploited through prompt manipulation, distinct from traditional software vulnerabilities.

## Attack Categories

### 1. Adversarial Attacks

- **Mechanism**: Deliberately manipulate input prompts to cause incorrect or harmful outputs.
- **Form**: Subtle perturbations in text that mislead the model's understanding.
- **Risk**: Incorrect legal interpretations, wrong medical advice, biased responses.

### 2. Data Poisoning

- **Mechanism**: Inject malicious data into the training set to corrupt the model's learning.
- **Relation to prompt engineering**: Carefully designed prompts can detect anomalies or unexpected behaviors that indicate poisoning.
- **Challenge**: May go undetected during training; only manifests in specific prompt contexts.

### 3. Backdoor Attacks

- **Mechanism**: Embed hidden vulnerabilities triggered by specific prompts.
- **Key insight**: Backdoors can be activated by **natural language prompts** (Imperio), not just special tokens.
- **ProAttack**: Uses the prompt itself as the backdoor trigger — the attack vector is the same channel as normal usage.
- **Detection difficulty**: Backdoors remain dormant until triggered; normal inputs produce normal outputs.

### 4. Prompt Injection

- **Mechanism**: Insert malicious inputs into prompts to manipulate the model's output.
- **Result**: Generation of harmful or misleading information, bias amplification.

### 5. Prompt Leaking

- **Mechanism**: Extract sensitive or proprietary information embedded in prompts.
- **Risk**: Exposure of system prompts, personal data, or intellectual property.

### 6. Prompt Hacking

- **Definition**: A class of attacks that provoke unintended behaviors by strategically crafting malicious inputs.
- **Key difference from traditional hacking**: Exploits the model's input processing, not software vulnerabilities.
- **Accessibility**: Can be executed without sophisticated technical skills.
- **OWASP**: The OWASP LLM Prompt Hacking project provides taxonomy and educational resources.

### 7. Model Stealing

- **Mechanism**: Systematically query the target model to reconstruct its functionality or extract proprietary knowledge.
- **Query-based extraction**: Build a surrogate model by observing inputs and outputs.
- **Example**: Extraction of OpenAI's projection matrix through carefully crafted prompts.
- **Prompt stealing**: Infer the original system prompt from the model's responses (PRSA framework).

## Defenses

- **Adversarial training**: Train models on adversarial examples to improve robustness.
- **Prompt validation**: Strict validation of input prompts before processing.
- **Anomaly detection**: Monitor for suspicious querying patterns.
- **Response filtering**: Filter outputs for harmful or off-policy content.
- **Query limiting**: Restrict the number of queries per user to prevent extraction.
- **Defensive perturbations**: Add noise to outputs to mislead potential attackers.

## Sources

- [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) — Liu et al. (2024), Schulhoff et al. (2023), Sha et al. (2024)
