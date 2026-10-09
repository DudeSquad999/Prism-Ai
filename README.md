# Prism AI

Prism AI is an early-stage research and writing project with two Windows apps: **Prism Chat** and **Prism Studio**. The repository also contains a separate static interface demo.

[Windows downloads](https://github.com/DudeSquad999/Prism-Ai/releases/latest) · [Setup guide](GETTING_STARTED.md) · [Roadmap](ROADMAP.md) · [Community guide](docs/COMMUNITY_GUIDE.md)

## What's included?

| Part | Description |
|---|---|
| **Prism Chat** | Research, conversations, projects, and Markdown documents. |
| **Prism Studio** | AI-assisted LaTeX writing and document workflows. |
| **Browser demo** | A static interface with fixed examples; it does not use AI. |

Prism Chat and Prism Studio are described in the published v2.0.0 release notes. Features have not all been independently tested. The design documents and roadmap describe ideas for the future, not promises about what is already available.

## Download the Windows apps

1. Open [Releases](https://github.com/DudeSquad999/Prism-Ai/releases/latest).
2. Download the Windows package under **Assets** — not the source-code ZIP.
3. Extract it and follow the instructions included with that release and in [GETTING_STARTED.md](GETTING_STARTED.md).

Use the instructions for the version you download. The package filename and setup steps can change between releases.

## Try the browser demo

Download the repository using **Code → Download ZIP**, extract it, and open `index.html`.

The demo uses fixed example content. It does not call AI models, send prompts, or demonstrate the live Windows apps.

## AI and privacy

Live AI features require a configured cloud provider or local model. Cloud requests send the included content to that provider; charges may apply. Keep API keys and private information out of screenshots, issues, and public uploads.

AI answers and citations can be wrong. Quote matching does not prove a claim is true, and Prism AI does not guarantee factual accuracy. Prism Studio PDF compilation requires a configured TeX engine.

## Project links

- [Getting started](GETTING_STARTED.md)
- [Testing checklist](TESTING.md)
- [Roadmap](ROADMAP.md)
- [Design notes](Prism-Ai-How-I-Want-It-To-Work.md)
- [Contributing](CONTRIBUTING.md)
- [Community guide](docs/COMMUNITY_GUIDE.md)
- [Security policy](SECURITY.md)
- [License](LICENSE)

The root `index.html`, `styles.css`, and `app.js` are the browser demo, not the source for Prism Chat or Prism Studio.
