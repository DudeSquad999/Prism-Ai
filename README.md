# Prism AI

**A local-first AI research and writing workspace for Windows.**

Prism AI helps you organize sources and notes, chat with local or cloud AI models, and move from research material to finished Markdown or LaTeX documents.

[Download the Windows release](https://github.com/DudeSquad999/Prism-Ai/releases/latest) · [Try the browser demo](demo/) · [Setup guide](docs/installation.md) · [Report an issue](https://github.com/DudeSquad999/Prism-Ai/issues)

![Prism AI research-to-writing workflow](docs/images/prism-ai-workflow.gif)

## Why Prism AI

- **Local-first workflow:** Use a configured local model through Ollama when you want AI processing on your own machine.
- **Research to writing:** Keep sources, conversations, notes, drafts, and documents in one workspace.
- **Made for Windows:** Prism Chat handles research and Markdown; Prism Studio handles AI-assisted LaTeX and PDF workflows.

> **Early-stage software:** AI answers and citations can be wrong. Prism helps you organize and inspect information, but you are responsible for verifying important claims.

---

## What Prism AI includes

Prism AI includes two Windows desktop applications and a separate static browser demo.

### Prism Chat

Prism Chat is for research projects, conversations, sources, and Markdown documents.

Use it to:

- Create research projects and organize conversations.
- Work with a configured local model or cloud AI provider.
- Collect article extracts and scholarly abstracts from supported sources.
- Open source cards through clickable citation markers.
- Create, edit, save, and download Markdown documents.
- Export conversations, sources, and tasks as Markdown.

### Prism Studio

Prism Studio is for AI-assisted writing, LaTeX documents, and document workflows.

Use it to:

- Write and revise papers, articles, and Beamer presentations in LaTeX.
- Review AI-proposed revisions before applying them.
- Search related work and retrieve BibTeX references.
- Compile PDFs using Tectonic.
- Import and export project ZIP files, including Overleaf-compatible projects.

### Browser demo

The browser demo is a static preview of the interface. It does not connect to AI models or demonstrate the live Windows applications.

For details, see [What the browser demo includes](docs/browser-demo.md).

---

## Install on Windows

1. Open the [latest release](https://github.com/DudeSquad999/Prism-Ai/releases/latest).
2. Under **Assets**, download the Windows `.exe` installer.
3. Run the installer and follow the setup prompts.
4. Configure a local model through Ollama or add a cloud-provider API key.
5. Open **Prism Chat** to create a research project and begin working with sources.
6. Open **Prism Studio** when you are ready to draft or revise a document.

For detailed instructions, see [Install Prism AI on Windows](docs/installation.md).

Do not download the source-code ZIP if you only want to run the applications. Application packages are published under [Releases](https://github.com/DudeSquad999/Prism-Ai/releases/latest).

---

## AI and privacy

Prism AI can use a local model or a cloud provider.

### Local models

When you configure a local model through Ollama, model inference runs on your own machine. Performance depends on your hardware, the selected model, and available memory. You may need to download the model before first use.

### Cloud providers

When you configure Google Gemini, Anthropic, or OpenAI, content included in your request is sent to that provider. Provider availability, pricing, data handling, and usage limits depend on your account and provider configuration.

### Protect your information

Do not put API keys, passwords, private research, or personal information in public GitHub issues, discussions, screenshots, or posts.

---

## Important limitations

Prism AI is early-stage software.

- Features and behavior may change between releases.
- Windows is the supported platform in the current release.
- Live AI features require a configured local model or cloud provider.
- AI answers and citations can be incorrect.
- Matching a quote in retrieved text does not prove that a larger claim is true.
- Research retrieval uses article extracts and abstracts rather than complete research-paper PDFs.
- PDF compilation requires a configured TeX engine; first-time package downloads may require internet access.
- The browser demo is static and does not connect to AI models.

> **Catalog:** The in-app catalog is currently inaccurate and is not planned for correction. Development is focused on the core research and writing workflows rather than ongoing catalog maintenance. Use the documentation and release notes to confirm available features.

---

## Documentation

| Guide | What it covers |
|---|---|
| [Install Prism AI on Windows](docs/installation.md) | Download, installation, AI configuration, and troubleshooting |
| [Use Prism AI with Ollama](docs/local-models.md) | Local-model setup and privacy considerations |
| [Organize research and create Markdown notes](docs/research-workflow.md) | Prism Chat research workflow |
| [Write and compile LaTeX documents](docs/latex-workflow.md) | Prism Studio writing and PDF workflow |
| [Browser demo](docs/browser-demo.md) | What the static demo includes and does not include |
| [Changelog](CHANGELOG.md) | User-visible changes by release |

---

## Contributing

Contributions are welcome.

Helpful contributions include:

- Documentation and tutorials.
- Bug reports with clear reproduction steps.
- Windows installation and setup feedback.
- Research and writing workflow suggestions.
- UI, accessibility, and usability improvements.
- Small code improvements with a clear explanation.

Before opening a pull request, read [CONTRIBUTING.md](CONTRIBUTING.md).

For security issues, follow [SECURITY.md](SECURITY.md). Do not post security vulnerabilities publicly.

---

## Roadmap

Prism AI is under active development. The `project/` folder contains plans and design notes, not guarantees.

Planned work may include:

- Improving the research-to-writing workflow.
- Expanding local model support and setup guidance.
- Improving project organization and memory features.
- Making installation and onboarding simpler.
- Improving documentation, testing, and release quality.

Feature requests and workflow feedback are welcome through [Issues](https://github.com/DudeSquad999/Prism-Ai/issues).

---

## License

This project is licensed under the terms in [LICENSE](LICENSE).
