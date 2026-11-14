# Prism AI

A Windows research and writing workspace for Markdown, LaTeX, and AI.

<p align="center">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square"></a>
  <a href="https://github.com/DudeSquad999/Prism-Ai/actions/workflows/ci.yml"><img alt="CI status" src="https://img.shields.io/github/actions/workflow/status/DudeSquad999/Prism-Ai/ci.yml?branch=Main&label=CI"></a>
  <a href="https://www.instagram.com/prismhq.ai/"><img alt="Instagram" src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=flat-square&logo=Instagram&logoColor=white"></a>
  <a href="https://www.reddit.com/r/PrismAIApp/"><img alt="Reddit community" src="https://img.shields.io/badge/Reddit-%23FF4500.svg?style=flat-square&logo=reddit&logoColor=white"></a>
  <a href="https://dev.to/prismaidev"><img alt="DEV Community" src="https://img.shields.io/badge/DEV.to-%230a0a0a.svg?style=flat-square&logo=devdotto&logoColor=white"></a>
</p>

<p align="center">
  <img src="prism-banner.png" alt="Prism AI research and writing workspace" width="1200">
</p>

**Your research. Your writing. Your AI.**

Prism AI brings research organization and academic writing into one Windows-first workflow. Use **Prism Chat** to organize projects and research notes, then use **Prism Studio** to develop LaTeX papers and presentations. Choose local AI with Ollama or configure a supported cloud provider with your own API key.

## Get Prism AI for Windows

[Download the latest release](https://github.com/DudeSquad999/Prism-Ai/releases/latest)

The latest published Windows release documented here is **v3.1.0**. Download the Windows installer (.exe) from the release assets. GitHub's source-code ZIP and tar archives are not installers.

**Quick install with PowerShell**

Open PowerShell and run:

    irm https://raw.githubusercontent.com/DudeSquad999/Prism-Ai/Main/scripts/install.ps1 | iex

The installer downloads the published v3.1.0 Windows installer, verifies its SHA-256 checksum, and opens it. The script is pinned to that release. Check the releases page for a newer version before installing.

Need help? Start with the [Windows installation guide](docs/installation.md).

## One workflow, two applications

| Application | What it is for |
|---|---|
| **Prism Chat** | Organize research projects, conversations, source material, and Markdown notes. |
| **Prism Studio** | Write LaTeX papers and presentations, manage BibTeX references, review AI-proposed edits, and compile PDFs with Tectonic. |

The two applications have separate AI settings. Configuring a provider in Prism Chat does not automatically configure Prism Studio.

## Choose your AI setup

**Local AI with Ollama**
- Run model inference on your own computer.
- Choose an Ollama model that fits your hardware.
- Keep in mind that downloads and some other features may still require internet access.

**Cloud AI**
- Configure your own API key for a supported provider.
- The v3.1.0 documentation lists Google Gemini, Anthropic, and OpenAI.
- Content included in requests is sent to the provider you configure. Provider pricing, privacy, and usage limits apply.

Prism does not provide cloud API keys. Review provider terms before sending private material. See the [local-model guide](docs/local-models.md) and [installation guide](docs/installation.md).

## Try the browser workspace

[Open the Prism AI browser workspace](https://dudesquad999.github.io/Prism-Ai/)

Explore projects, conversations, tasks, Markdown drafts, and the interface without installing the Windows applications or creating an account. The browser workspace can also connect directly to an Ollama server running on your computer for live model responses.

A few important distinctions:
- Without an active Ollama connection, the workspace uses clearly labeled sample responses and fictional sample source cards.
- The browser workspace does not include live web search, source retrieval, citation verification, or cloud AI providers.
- Projects and drafts are saved in your browser's local storage. When live AI is connected, prompts and recent conversation context are sent directly to the Ollama server address you configure.
- The browser workspace is a companion preview. It does not replace Prism Chat or Prism Studio.

Read the [browser workspace guide](docs/browser-demo.md) for connection instructions, privacy details, and limitations.

## Start here

1. Read [Your first Prism AI session](docs/first-session.md).
2. Install the Windows applications from the [latest release](https://github.com/DudeSquad999/Prism-Ai/releases/latest).
3. Create a focused project in Prism Chat and organize your notes.
4. Open Prism Studio to draft a short LaTeX document or presentation.
5. Review AI-proposed changes and verify important claims against original sources.

Prism does not guarantee that AI-generated answers, retrieved material, or citations are accurate. Always check important claims and references yourself.

## Documentation

- [Prism AI handbook](docs/README.md)
- [First session guide](docs/first-session.md)
- [Windows installation and troubleshooting](docs/installation.md)
- [Browser workspace guide](docs/browser-demo.md)
- [Ollama and local models](docs/local-models.md)
- [Research and Markdown workflow](docs/research-workflow.md)
- [LaTeX writing workflow](docs/latex-workflow.md)
- [FAQ](docs/faq.md)
- [Roadmap](project/ROADMAP.md)
- [Changelog](CHANGELOG.md)
- [Project structure](docs/PROJECT_STRUCTURE.md)
- [Contributing](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

For the complete documentation index, visit the [Prism AI handbook](docs/README.md).

## Project status and transparency

- **Platform:** Windows for the documented desktop release.
- **Release:** v3.1.0 is the latest published release documented in this repository. Check GitHub Releases for updates.
- **Stage:** Early-stage software. Features and behavior may change.
- **Local AI:** Local inference does not mean every feature works offline.
- **Accuracy:** AI output and citations can be incomplete or incorrect. Verify important information.
- **Privacy:** Cloud requests send included content to the provider you configure. Do not submit sensitive material unless you understand that provider's data handling.

This public repository contains the browser workspace, documentation, project records, and repository automation. It does **not** currently contain the complete source code for the packaged Windows applications. Changes to the browser workspace do not automatically change Prism Chat or Prism Studio.

The repository's [MIT License](LICENSE) applies to the files covered by that license in this repository. It does not automatically cover omitted components, third-party software, or separately distributed assets. Check the notices and license terms included with each release.

## Community and support

- [Report a bug or request a feature](https://github.com/DudeSquad999/Prism-Ai/issues)
- [GitHub Discussions](https://github.com/DudeSquad999/Prism-Ai/discussions)
- [Prism AI on Reddit](https://www.reddit.com/r/PrismAIApp/)
- [Instagram: @prismhq.ai](https://www.instagram.com/prismhq.ai/)
- [DEV Community](https://dev.to/prismaidev)

The support policy targets acknowledgement of actionable public issues and private security reports within 24 hours. This is an acknowledgement target, not a guarantee of resolution. Read the [support policy](docs/support.md).

When reporting a problem, include the affected application, Prism version, Windows version, steps to reproduce, and sanitized error messages. Never post API keys, passwords, private research, or private conversations in public.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Documentation, accessibility, testing, and browser-workspace contributions are welcome. See [good first issues](docs/good-first-issues.md) for scoped tasks.

## Project history

Prism AI began as an educational PyTorch Transformer prototype. The historical [v1.0.0 release notes](docs/releases/v1.0.0.md) describe that earlier project. It is not the current Windows research and writing product.
