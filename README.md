<div align="center">
  <img src="prism-banner.png" alt="Prism AI banner" width="100%">
  <h1>Prism AI</h1>
  <h3>A Windows workspace for research and LaTeX writing</h3>
  <p><strong>Your research. Your writing. Your AI.</strong></p>
  <p>Move from research questions and source material to organized notes, LaTeX documents, and PDFs in one connected workflow.</p>
  <p>
    <a href="https://github.com/DudeSquad999/Prism-Ai/releases/latest"><strong>Download Prism AI</strong></a>
    · <a href="https://dudesquad999.github.io/Prism-Ai/">Try the browser preview</a>
    · <a href="docs/first-session.md">Start here</a>
  </p>
  <p>
    <a href="https://www.instagram.com/prismhq.ai/">Instagram</a>
    · <a href="https://www.reddit.com/r/PrismAIApp/">Community</a>
    · <a href="https://github.com/DudeSquad999/Prism-Ai/discussions">GitHub Discussions</a>
  </p>
  <p>
    <img alt="Platform Windows" src="https://img.shields.io/badge/platform-Windows-6b52d9">
    <a href="LICENSE"><img alt="Apache 2.0 license" src="https://img.shields.io/github/license/DudeSquad999/Prism-Ai"></a>
    <a href="https://github.com/DudeSquad999/Prism-Ai/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/DudeSquad999/Prism-Ai"></a>
  </p>
  <p><sub>Created and developed by Aidan · Independent software project</sub></p>
</div>

---

## What is Prism AI?

Prism AI is an early-stage Windows research and writing workspace built around two companion applications.

| Prism Chat | Prism Studio |
|---|---|
| Organize research projects and conversations. | Draft papers, articles, and presentations in LaTeX. |
| Review retrieved source material and citation markers. | Review AI-proposed edits before applying them. |
| Create and export Markdown notes. | Work with references and BibTeX. |
| Develop questions into structured research notes. | Compile documents to PDF with Tectonic. |

The goal is to make the path from a question to a finished document more organized, without forcing everyone to use the same AI provider.

## Try Prism before installing

[**Open the interactive browser preview →**](https://dudesquad999.github.io/Prism-Ai/)

The browser preview lets you explore a sample workspace without installing the Windows applications or creating an account. You can create sample projects, try scripted chat examples, edit Markdown, manage tasks, and import or export demo data.

**Important:** The preview uses fictional sample sources and fixed example replies. It does not connect to an AI model, search the web, verify citations, analyze documents, or upload your work. It demonstrates selected interface interactions, not the live Windows applications. See the [browser demo guide](docs/browser-demo.md) for details.

## Get started

1. **Explore:** Open the [browser preview](https://dudesquad999.github.io/Prism-Ai/) if you want to look around first.
2. **Download:** Open the [latest GitHub release](https://github.com/DudeSquad999/Prism-Ai/releases/latest) and download its Windows `.exe` installer. Source-code ZIP and tar archives are not installers.
3. **Install:** Follow the [Windows installation guide](docs/installation.md).
4. **Configure AI:** Set up a local model through Ollama or configure your own API key for a supported cloud provider. Setup is separate in Chat and Studio.
5. **Try one workflow:** Create a small research project in Chat, save a Markdown note, then start a short LaTeX document in Studio.

For a guided walkthrough, see [Your first Prism AI session](docs/first-session.md).

## Choose your AI setup

Prism supports local models through Ollama and cloud providers configured with your own API key.

|  | Local AI · Ollama | Cloud AI provider |
|---|---|---|
| Where inference runs | On your computer | With the provider you configure |
| What you need | Ollama and a downloaded model | A provider account and API key |
| Important note | Initial model downloads and some other features may need internet access. | Content included in requests is sent to that provider. Review its privacy and pricing terms. |

The current release documentation lists Google Gemini, Anthropic, and OpenAI as cloud providers. Prism does not supply API keys. Configure each application separately; configuring Chat does not automatically configure Studio.

- [Ollama and local-model guide](docs/local-models.md)
- [Installation and provider setup](docs/installation.md)

The exact Ollama controls and a tested model recommendation are still being documented. See [issue #37](https://github.com/DudeSquad999/Prism-Ai/issues/37) for that work. Do not treat an untested model recommendation as verified.

## A look inside Prism

The screenshots below come from the **v7.1 preview set**. They show the design direction and example workflows, not verified screenshots of the current 3.1.0 Windows release. The installed release may look or behave differently.

| Prism Chat · dark preview | Prism Studio · dark preview |
|---|---|
| [![Prism Chat research workspace](docs/screenshots/v71_chat_1440x900_dark.png)](docs/screenshots/v71_chat_1440x900_dark.png) | [![Prism Studio LaTeX workspace](docs/screenshots/v71_studio_1440x900_dark.png)](docs/screenshots/v71_studio_1440x900_dark.png) |

## What to know before relying on it

- **Release status:** The latest published GitHub release currently documented in this repository is **3.1.0**. Check the [releases page](https://github.com/DudeSquad999/Prism-Ai/releases) for the actual latest published build.
- **Platform:** Windows is the supported platform for the documented release.
- **AI accuracy:** AI responses, retrieved material, and citations can be incomplete or incorrect. Check important claims against original sources.
- **Local AI:** Local model inference runs on your computer after setup. This does not mean every Prism feature works offline.
- **Cloud privacy:** Content included in cloud AI requests is sent to the provider you configure. Do not submit sensitive information unless you understand the provider's data handling.
- **Early-stage software:** Features and behavior may change. Keep backups of important work and review AI-proposed document changes.

## Documentation

| Guide | What it covers |
|---|---|
| [Documentation home](docs/README.md) | Index of all guides |
| [First session](docs/first-session.md) | A practical first workflow and feedback path |
| [FAQ](docs/faq.md) | Product scope, preview vs. live AI, Ollama, privacy, citations, downloads, and troubleshooting |
| [Installation](docs/installation.md) | Windows setup and troubleshooting |
| [Browser demo](docs/browser-demo.md) | Preview features, limitations, and privacy |
| [Local models](docs/local-models.md) | Ollama configuration |
| [Research workflow](docs/research-workflow.md) | Projects, sources, and Markdown notes |
| [LaTeX workflow](docs/latex-workflow.md) | Writing, references, and PDF compilation |
| [Changelog](CHANGELOG.md) | Published changes |
| [Roadmap](project/ROADMAP.md) | Planned and ongoing work |
| [Contributing](CONTRIBUTING.md) | How to report issues and contribute |
| [Testing](guides/TESTING.md) | Available testing guidance |
| [Security](SECURITY.md) | Responsible vulnerability reporting |

## Feedback and community

Prism is being developed in public, and honest feedback is welcome. Useful reports explain what you tried, what you expected, and what actually happened.

- [Report a bug or request a feature](https://github.com/DudeSquad999/Prism-Ai/issues)
- [Join the Prism AI Reddit community](https://www.reddit.com/r/PrismAIApp/)
- [Follow product demonstrations on Instagram](https://www.instagram.com/prismhq.ai/)
- [Join GitHub Discussions](https://github.com/DudeSquad999/Prism-Ai/discussions)

Please do not post API keys, passwords, private research, or unnecessary personal information in public issues.

## About the project

I built Prism AI because I wanted a more organized way to move from research to writing. I'm continuing to improve the applications, onboarding, documentation, and browser preview. I share product demonstrations and development updates as the project evolves.

Prism AI is distributed under the [Apache License 2.0](LICENSE). Versions previously distributed under MIT remain available under the terms of their original license.
