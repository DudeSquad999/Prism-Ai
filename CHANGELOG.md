# Changelog

All notable user-visible changes to Prism AI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to semantic versioning where practical.

## [3.1.0] - 2026-10-13

Prism AI 3.1.0 is a Windows release containing Prism Chat and Prism Studio. It is an early-stage release; review the installation guide and limitations before use.

### Added

- **Prism Chat** for research projects, conversations, source material, and Markdown documents.
- **Prism Studio** for AI-assisted LaTeX writing and document workflows.
- Local-model support through Ollama.
- Cloud-provider support through user-configured Google Gemini, Anthropic, or OpenAI API keys.
- Refreshed release and installation documentation.

### Before installing

- Download the Windows `.exe` installer from the [3.1.0 release page](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v3.1.0). GitHub's source-code archives are not installers.
- See the [installation guide](docs/installation.md) and [Ollama setup guide](docs/local-models.md).

### Limitations and privacy

- Windows is the supported platform for this release.
- Live AI requires a configured local model or cloud provider. Prism Chat may show offline demo behavior when live AI is unavailable.
- Cloud requests send included content to the provider you configure. Local inference does not mean every feature works offline.
- Retrieved sources, AI answers, and citations can be incomplete or wrong. Review original sources and verify important claims.
- Prism AI is early-stage software; features and behavior may change between releases.
