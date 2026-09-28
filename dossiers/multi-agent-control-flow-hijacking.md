---
type: Study Note
title: "Multi-Agent Systems Execute Arbitrary Malicious Code"
description: Error-like content and peer status messages reroute multi-agent control flow into unauthorized code execution despite local refusals.
resource: https://arxiv.org/abs/2503.12188v2
source: /archive/multi-agent-control-flow-hijacking.pdf
tags: [agents, agent-security, multi-agent, prompt-injection, orchestration]
timestamp: 2026-09-28T18:40:14Z
---

# Multi-Agent Systems Execute Arbitrary Malicious Code — Study Notes

**Authors**: Harold Triedman, Rishi Jha, and Vitaly Shmatikov  
**Publication**: COLM 2025; arXiv:2503.12188v2

## The Failure Mode

Attacker-controlled files, webpages, images, or video/audio present a plausible *access error* and claim that fulfilling the harmless user's request requires an alternative executable route. A browsing agent may recognize the danger but still report “blocked; obtain a key / run a script” as task-status metadata. The orchestrator promotes this lower-trust explanation to a work plan and asks a code agent to execute it. The danger is a redirected **action-trace suffix**, not merely a model directly obeying “ignore previous instructions.” Refusal by one agent can coexist with a later peer's unsafe execution.

The adversary controls encountered content, not the user's authorized request or the orchestrator's original instructions. The mechanism works when the system accepts a resource's account of its own access procedure as authority to invoke a different, more powerful tool. Some attacks chain a webpage's fake access instruction to a downloaded file containing executable content. An incidental file that the user did not specifically request can also enter the control flow.

## Observed Results

In controlled laboratory runs of AutoGen, CrewAI, and MetaGPT, web-redirect success for GPT-4o was 58%, 65%, and 73% under AutoGen Magentic-One, Selector, and Round-Robin respectively; CrewAI reached 62% and MetaGPT 90%. GPT-4o-mini with AutoGen Round-Robin reached 100% in the tested configuration. Traditional indirect-injection templates achieved only 0–1% in the compared scenarios. A local-file attack under GPT-4o/Magentic-One reached 97%; in a separate benign-directory request, an incidental attack file was touched in 35 of 40 runs. The paper compares a direct malicious user request, which succeeded in just 6% in its illustrated configuration, with harmful metadata presented as a task obstacle, 28 of 40 successes.

The researchers monitored a controlled reverse-shell destination and used an execution hook with a unique marker; results refer to actual attempted execution, not merely a generated suggestion. Model, orchestrator, attack template, input medium, and request wording vary; the aggregate numbers are not predictions for current deployments. No production service was attacked and defenses were discussed rather than tested. The 2025 model versions and framework defaults matter.

## Boundaries

The reported attack exploits the legitimacy of *repairing an error* in a multi-agent workflow. A safe resource viewer alone cannot enforce the desired policy if it passes attacker-authored operational claims to a more privileged planner. Tool results and status summaries need provenance and action-admission boundaries when they propose executable remediation. The paper's demonstration does not establish that all adversarial errors succeed, nor that every local refusal fails; it shows a concrete way to route around local caution.

## Vault Ideas Extracted

* [Control-Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md)

