# Prism AI documentation

Practical guides for installing Prism, exploring its workflows, and configuring AI.

> **New to Prism?** Start with the [first-session guide](first-session.md) for a quick orientation. To install the Windows apps, follow the [installation guide](installation.md). To explore without installing, open the [interactive browser demo](browser-demo.md).

## Get started

| Guide | What it covers |
|---|---|
| [Your first Prism session](first-session.md) | Choose a workspace, try a small research-to-writing workflow, and share useful feedback |
| [Install Prism AI](installation.md) | Download, install, configure, and troubleshoot the Windows apps |
| [Try the browser demo](browser-demo.md) | Explore the sample workspace and understand its limits and privacy |
| [Use local models with Ollama](local-models.md) | Configure local AI and check for connection issues |

## Work in Prism

| Guide | What it covers |
|---|---|
| [Research and Markdown](research-workflow.md) | Organize projects, sources, conversations, and notes in Prism Chat |
| [LaTeX writing](latex-workflow.md) | Draft, revise, reference, and compile documents in Prism Studio |

## Project resources

- [Repository structure and maintenance checks](PROJECT_STRUCTURE.md)
- [Project overview and screenshots](../README.md)
- [Project wiki](https://github.com/DudeSquad999/Prism-Ai/wiki)
- [Release notes](../CHANGELOG.md)
- [Roadmap](../project/ROADMAP.md)
- [Contributing guidelines](../CONTRIBUTING.md)
- [Community feedback on Reddit](https://www.reddit.com/r/PrismAIApp/)

## Repository maintenance

Run the repository checks from the project root:

```powershell
python -m unittest discover -s tests -v
python scripts/check_repo.py
```

See [project structure](PROJECT_STRUCTURE.md) for file ownership and safe editing guidance.

## Archived guides

[Getting Started with Prism AI v2.0.0](../guides/GETTING_STARTED.md) describes an older release. For the current release, use the [installation guide](installation.md).
