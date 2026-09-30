# Security Policy

## Scope

Prism AI currently includes documentation and a local static browser prototype. The prototype does not use a backend, user accounts, API keys, AI provider connections, analytics, tracking, or network requests.

## Reporting a vulnerability

Please do not publish sensitive security details in a public issue.

For a potential vulnerability, contact the repository owner privately through GitHub. Include:

- A clear description of the issue
- Steps to reproduce it
- The affected file or feature
- Potential impact
- Suggested mitigation, if available

Do not include credentials, tokens, passwords, private prompts, personal information, or other secrets in your report.

## Response expectations

The project owner will review reports as time permits. The repository may be experimental and may not have a formal service-level commitment. Confirmed issues will be assessed for severity, scope, and an appropriate disclosure path.

## Security principles

- Do not commit secrets or sensitive personal information.
- Keep the static prototype local and dependency-light.
- Review any future network, storage, authentication, memory, or third-party integration before implementation.
- Treat user privacy and control as design requirements, not optional additions.
- Clearly communicate feature limits and uncertainty.