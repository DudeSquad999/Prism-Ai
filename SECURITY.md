# Security

## Policy status

This document provides precautions and describes the current reporting limitations. It is not a security audit, a guarantee of safety, or evidence that security tests have passed.

A security-supported version policy and a private reporting contact have not yet been established in this document. The existence of a release does not imply that it receives security updates.

## Reporting a suspected vulnerability

Do not publish exploit instructions, credentials, private data, or detailed vulnerability reports in public issues, pull requests, or discussions.

A private reporting route has not been verified. If GitHub displays a **Report a vulnerability** option in this repository's Security tab, use that private reporting workflow. This document does not claim that the option is currently enabled.

If no private option is available, you may open a public issue asking the maintainer to establish a private contact method. Include no vulnerability details or sensitive information in that request. Do not send sensitive material until a private channel has been confirmed.

When a private channel is available, include the affected version or source commit, component, potential impact, and minimal reproduction steps using disposable data. Do not include real API keys or personal project data.

No response-time or fix-time commitment is currently stated.

## Protect credentials and private data

- Keep API keys, passwords, access tokens, private conversations, and personal project data out of repository commits and public reports.
- Review logs, screenshots, exports, and release packages before publishing them.
- If a credential is exposed, revoke or rotate it with its provider; deleting a public copy alone does not make the credential safe again.
- Use disposable test data when checking installation, upgrades, imports, exports, or destructive operations.

## Local applications and cloud providers

The v2 release notes describe early-stage local applications. Do not expose them to the public internet without appropriate authentication and security controls.

According to those release notes, project data is stored locally, while content included in cloud AI requests is sent to the configured provider. Local storage does not mean that cloud requests stay on the computer.

The root static demo is a different deliverable from the packaged Windows applications. Its documented lack of live AI requests is not a security assessment of Chat, Studio, or the installer.

## Verification and release handling

Use [TESTING.md](TESTING.md) to record actual checks. Keep unexecuted checks marked untested. That checklist is not a substitute for a security review.

Identify the matching application source, version, and package before investigating a release issue. Do not claim a vulnerability is fixed until the relevant change and verification are recorded.
