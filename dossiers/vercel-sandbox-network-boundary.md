---
type: Study Note
title: A sandbox without a network boundary is only half a sandbox
description: Vercel's model of host-enforced TCP/DNS egress, selective TLS termination, and brokered credentials around untrusted microVM workloads.
resource: https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox
source: /archive/vercel-sandbox-network-boundary.html
tags: [agents, sandboxing, agent-security, access-control, privacy]
timestamp: 2026-09-28T00:00:00Z
---

# A sandbox without a network boundary is only half a sandbox — Study Notes

**Author:** Kevin Sundstrom  
**Publisher:** Vercel  
**Date:** August 11, 2026

## What It Is

A microVM can prevent code from touching the host yet still let it export everything it can read, probe private networks, or invoke a powerful API. Vercel treats the external network and delegated credentials as part of sandbox containment. A prompt-injected agent does not need a VM escape if its ordinary outbound path already carries sensitive data to an attacker.

## Enforcing the Boundary

A firewall outside the guest redirects outgoing TCP and DNS on the host; untrusted code inside the VM cannot simply disable the firewall. Domain and CIDR policy protect distinct surfaces: hostnames distinguish services on shared or moving IPs, while address ranges restrict private networks and protocols. TLS Server Name Indication is checked alongside destination IP before a permitted upstream connection; ordinary allowed TLS traffic is not decrypted. DNS follows the domain policy too. Unmatched traffic can be denied, and policy can contract across phases—for example, registry access during preparation but not generated-code execution.

For selected destinations needing request-granular controls, the host selectively terminates TLS with a sandbox-specific CA, inspects path/method/query/headers, then injects authentication or forwards the request to an external policy service. The bearer secret stays outside the guest; a proxy can use a platform-issued identity token for team/project/sandbox context. Unlike SNI filtering, credential injection requires trusting the TLS intermediary with plaintext. Narrow injection rules limit where the secret can travel, but even a perfectly hidden key can still authorize a harmful permitted action.

## Boundaries of the Claim

The article identifies failure cases such as a leftover DNS channel, fail-open empty policy, hostname interpretation mismatch, and an allowed package service serving as a relay. It does not experimentally establish resistance to these classes or specify exploit rates. Hostname, DNS, SNI, address, and request interpretation must agree for the advertised boundary to hold. Treat a policy's *effective* authorized operations, not the existence of an allowlist, as the property to test.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Destination Allowlist as Capability Grant](/vault/destination-allowlist-as-capability-grant.md)
* [Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md)

