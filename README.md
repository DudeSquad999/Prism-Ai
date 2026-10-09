# Prism AI

Prism AI is an early-stage research and writing project with two Windows apps: **Prism Chat** and **Prism Studio**. This repository also includes a small browser demo.

[Windows downloads](https://github.com/DudeSquad999/Prism-Ai/releases/latest) · [Setup guide](GETTING_STARTED.md) · [Roadmap](ROADMAP.md)

## What's included?

- **Prism Chat:** research, conversations, projects, and Markdown documents.
- **Prism Studio:** AI-assisted LaTeX writing and document workflows.
- **Browser demo:** fixed example content; it does not use AI.

The Windows apps are described in the published v2.0.0 release notes. Not every feature has been independently tested. The roadmap and design notes describe ideas, not guarantees.

## Download the Windows apps

1. Open [Releases](https://github.com/DudeSquad999/Prism-Ai/releases/latest).
2. Download the Windows package under **Assets**, not the source-code ZIP.
3. Extract it and follow the instructions for that release and in [GETTING_STARTED.md](GETTING_STARTED.md).

## Try the browser demo

Choose **Code → Download ZIP**, extract the repository, and open `index.html`. The demo uses fixed examples and does not call AI models or demonstrate the live Windows apps.

## AI and privacy

Live AI requires a configured cloud provider or local model. Cloud requests send included content to that provider, and charges may apply. Keep API keys and private information out of public posts.

AI answers and citations can be wrong. Quote matching does not prove a claim is true. Prism Studio PDF compilation requires a configured TeX engine.

## More information

- [Testing checklist](TESTING.md)
- [Roadmap](ROADMAP.md)
- [Design notes](Prism-Ai-How-I-Want-It-To-Work.md)
- [Contributing](CONTRIBUTING.md)
- [License](LICENSE)

The root `index.html`, `styles.css`, and `app.js` are the browser demo, not the source for Prism Chat or Prism Studio.