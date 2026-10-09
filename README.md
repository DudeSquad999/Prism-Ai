# Prism AI

An early-stage AI research and writing project with two Windows applications: **Prism Chat** for research and project work, and **Prism Studio** for AI-assisted LaTeX writing.

The repository also includes a separate static interface demo exploring more transparent AI workflows, including inspectable perspectives, user control, and visible uncertainty.

**Start here:** [Download the Windows release](https://github.com/DudeSquad999/Prism-Ai/releases/latest) · [Getting started](GETTING_STARTED.md) · [Report a bug](https://github.com/DudeSquad999/Prism-Ai/issues/new/choose) · [Roadmap](ROADMAP.md)

## Project status

Prism AI is an early-stage project. The downloadable applications, browser demo, and proposed architecture are different parts of the project.

| Part | What it is | Status |
|---|---|---|
| **Prism Chat** | Research, conversations, projects, and Markdown documents | Included in the published v2.0.0 Windows package, as described in its release notes |
| **Prism Studio** | AI-assisted LaTeX writing and document workflows | Included in the published v2.0.0 Windows package, as described in its release notes |
| **Static interface demo** | Root `index.html`, `styles.css`, and `app.js` | Fixed example content; does not call AI models or make network requests |
| **Proposed architecture** | Ideas such as perspective comparison, memory, synthesis, and broader verification | Design direction; not a claim that every capability is implemented |

The application descriptions below summarize the published release notes. They are not independent verification that every feature or installation path has been tested. See [TESTING.md](TESTING.md) for the release testing checklist.

## Prism Chat

The v2.0.0 release notes describe a conversation-first research and project workspace with:

- Ask, Research, Create, and Project workflows.
- Projects with goals, supporting context, and organized conversations.
- Research retrieval using article extracts and scholarly abstracts.
- Clickable citation markers and source cards.
- Quote matching against retrieved source text.
- Markdown document creation, editing, saving, and downloading.
- Task and project proposals that users review before creating them.
- Markdown conversation export.
- An offline demo fallback when live AI is not configured.

**Important:** quote matching checks whether text appears in retrieved material. It does not prove that a source or claim is accurate.

## Prism Studio

The v2.0.0 release notes describe an AI-assisted LaTeX workspace with:

- Paper, blank-document, and Beamer presentation templates.
- AI-proposed revisions that users can review before applying.
- Controls to apply, reject, or undo individual AI edits.
- Literature search and BibTeX reference retrieval.
- Bibliography checks using Crossref and arXiv.
- PDF compilation using a configured TeX engine.
- AI-assisted investigation of compilation errors.
- Project snapshots for comparing and restoring work.
- Project ZIP import and export.

PDF compilation requires a configured TeX engine.

## Install the Windows applications

1. Open the [latest release](https://github.com/DudeSquad999/Prism-Ai/releases/latest).
2. Read the release notes and download the Windows package under **Assets**. Do not choose “Source code” if you want the packaged applications.
3. For v2.0.0, the package is named `PrismV2.0.0.zip`.
4. In Windows, extract the ZIP before running the installer.
5. Follow the instructions in [GETTING_STARTED.md](GETTING_STARTED.md) and in the downloaded package.

The v2.0.0 release notes list these default local addresses:

| Application | Default address |
|---|---|
| Prism Chat | http://127.0.0.1:8000 |
| Prism Studio | http://127.0.0.1:8001 |

These instructions summarize the release documentation; they do not certify that installation or features have been independently tested.

## AI configuration

The v2.0.0 release notes list Google Gemini, OpenAI, Anthropic, and Ollama as options. Cloud providers require your own API key; Ollama requires a locally installed model.

Live AI features require a configured provider or local model. The offline fallback in Prism Chat is a demo mode, not a replacement for a configured model. Cloud AI requests send the included content to the configured provider, and provider usage may incur charges.

## Explore the static interface demo

The files in the repository root are a separate visual prototype.

1. Download the repository source using **Code → Download ZIP**.
2. Extract the ZIP.
3. Open `index.html` in a browser.

The demo uses fixed example content. It does not call AI models, send prompts, or make network requests. It is not the Windows installer and does not demonstrate the Windows applications’ live AI behavior.

Downloading repository source is not the same as downloading the Windows release.

## Screenshots and previews

Screenshots should be added only after capturing the actual application or demo. Label each image with the component and version it represents.

Suggested screenshots:
- Prism Chat, labeled with the app version.
- Prism Studio, labeled with the app version.
- Optional: the static interface demo, clearly labeled **“Static interface prototype — fixed example content.”**

Do not use a static-demo screenshot as evidence of released application functionality. Remove API keys, private paths, usernames, and personal information before uploading images.

## Privacy and limitations

- The v2.0.0 release notes describe project data as stored locally, but content included in cloud AI requests is sent to the configured provider.
- Keep API keys, private conversations, and personal project data out of public uploads and issue reports.
- Research retrieval uses extracts and abstracts; it is not the same as reviewing an entire paper.
- AI-generated answers, citations, edits, and reference checks can be wrong or incomplete.
- Quote matching does not establish factual accuracy.
- Local-model speed and quality depend on your hardware and selected model.
- Do not expose the local applications to the public internet without appropriate authentication and security controls.

**Prism AI does not eliminate hallucinations or guarantee factual accuracy.** Check important claims against reliable sources and review generated changes before applying them.

## Roadmap and design direction

The design documents discuss ways to make AI perspectives, assumptions, and uncertainty easier to inspect. Perspective comparison, memory, synthesis, and broader verification are design ideas—not a promise that every part is available today.

- [Roadmap](ROADMAP.md)
- [Intended design and architecture](Prism-Ai-How-I-Want-It-To-Work.md)
- [LLM workflow comparison](How-LLMs-Work-Comparison.md)

Priorities may change based on testing and feedback. The roadmap is not a delivery-date commitment.

## Repository guide

| File | Purpose |
|---|---|
| `README.md` | Project overview and navigation |
| `GETTING_STARTED.md` | Windows release download and setup guide |
| `TESTING.md` | Release testing checklist; not proof that tests passed |
| `CHANGELOG.md` | Changes and release summaries |
| `ROADMAP.md` | Planned work and priorities |
| `Prism-Ai-How-I-Want-It-To-Work.md` | Intended product behavior and design goals |
| `How-LLMs-Work-Comparison.md` | Language-model comparison and project context |
| `index.html`, `styles.css`, `app.js` | Static demo page, styling, and interactions |
| `CONTRIBUTING.md` | Contribution guidance |
| `.github/ISSUE_TEMPLATE/` | Bug-report and feature-request forms |
| `LICENSE` | License terms |

The root demo files are not the Prism Chat or Prism Studio application source.

## Release history

- [v2.0.0](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v2.0.0): Windows package for Prism Chat and Prism Studio.
- [v1.0.0](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v1.0.0): earlier experimental PyTorch Transformer implementation with training, text generation, and terminal chat.

These releases have different purposes and setup instructions. See [CHANGELOG.md](CHANGELOG.md) for additional context.

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Useful contributions include clearer setup instructions, reproducible bug reports, recorded Windows installation and application test results, small improvements to the static demo, and focused fixes.

For bug reports, identify the component (static demo, Prism Chat, Prism Studio, or Windows setup), the version and operating system, steps to reproduce, expected and actual behavior, and relevant error messages. Remove API keys and private information before submitting.

## License

See [LICENSE](LICENSE) for the license terms. Third-party dependencies, AI providers, and models may have separate licenses, terms, and usage costs.

## Support the project

If Prism AI is useful to you, consider starring the repository and sharing a specific bug report or improvement suggestion.
