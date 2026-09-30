# Prism AI

Prism AI is a project vision for a more transparent AI experience. It explores how multiple perspectives, structured comparison, user control, memory, and verification could help people examine an answer instead of receiving a single opaque response.

> Status: early project documentation with a local static prototype. The prototype uses prewritten example content only. It does not call AI models, connect to providers, send network requests, or store user prompts.

## What Prism AI explores

- Multiple selectable perspectives for the same question
- Side-by-side response comparison
- A synthesis that identifies agreement, uncertainty, and open questions
- User control over which perspectives are included
- Future concepts for memory, claim checking, and transparent reasoning

## Current repository contents

| Area | Current state |
| --- | --- |
| Product vision and architecture | Documented |
| Model and workflow comparison | Documented |
| Roadmap | Documented and subject to change |
| Browser prototype | Local static demonstration with example content |
| Live model calls, accounts, storage, or backend | Not included |

## Try the local prototype

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Choose one or more perspectives, enter a prompt if you want, and select **Compare perspectives**.

The prompt field is local to your browser session. Submitted text does not leave the page and does not change the prewritten demonstration responses.

## Principles

- **Transparency:** Clearly show what is a demonstration, a plan, an inference, or an unresolved question.
- **Privacy:** Avoid collecting data by default. Do not place secrets, private prompts, or personal information in the repository.
- **User control:** Let people select perspectives and understand the limits of the output.
- **Appropriate uncertainty:** Prefer calibrated language over unsupported confidence.
- **Evidence awareness:** Treat factual claims as candidates for checking, not as automatically verified truth.

## Documentation

- [How Prism AI is intended to work](Prism-Ai-How-I-Want-It-To-Work.md)
- [How LLM workflows compare](How-LLMs-Work-Comparison.md)
- [Roadmap](ROADMAP.md)
- [Product specification](docs/PRODUCT_SPEC.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Contributing guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

## Project boundaries

Prism AI is not presented as a completed AI system or as a guarantee of factual accuracy. Model quality varies by task, prompt, available context, evaluation method, tool use, and product design. Any future memory or verification features should be evaluated for privacy, reliability, and user benefit before being presented as production capabilities.

## Authorship and AI assistance

Prism AI was created from the original ideas, product vision, and decisions of the project owner.

AI tools were used as writing and development assistants to help organize documentation, simplify wording, improve presentation, and support prototype implementation. The project owner reviewed and directed the work, and remains responsible for the project’s purpose, decisions, and published content.

## Contributing

Contributions, questions, and design feedback are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## License

This project is available under the repository's existing license.