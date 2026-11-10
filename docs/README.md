# Prism AI handbook

The canonical, maintained handbook for the current Prism AI Windows
release. Use it to find setup instructions, workflow guides,
troubleshooting, project information, and community resources.
Release notes remain the source of truth for version-specific
downloads and package details.

> **New to Prism?** Start with the [first-session guide](first-session.md) for a safe orientation and a practical research-to-writing workflow. For short answers, see the [Prism AI FAQ](faq.md).

## Get started

| Guide | What it covers |
|---|---|
| [Your first Prism session](first-session.md) | Choose a workspace, try a small research-to-writing workflow, and share useful feedback |
| [Prism AI FAQ](faq.md) | Product scope, live AI vs. preview, Ollama, privacy, citations, LaTeX, downloads, and troubleshooting |
| [Install Prism AI](installation.md) | Download, install, configure, and troubleshoot the Windows applications |
| [Use the browser workspace](browser-demo.md) | Explore projects, drafts, and live local AI with Ollama |
| [Use local models with Ollama](local-models.md) | Configure local AI and check for connection issues |

## Work in Prism

| Guide | What it covers |
|---|---|
| [Research and Markdown](research-workflow.md) | Organize projects, sources, conversations, and notes in Prism Chat |
| [LaTeX writing](latex-workflow.md) | Draft, revise, reference, and compile documents in Prism Studio |

## Project resources

- [Project structure and maintenance checks](PROJECT_STRUCTURE.md)
- [Project overview and screenshots](../README.md)
- [GitHub Releases](https://github.com/DudeSquad999/Prism-Ai/releases)
- [Development roadmap](../project/ROADMAP.md)
- [Contributing guidelines](../CONTRIBUTING.md)
- [GitHub Discussions](https://github.com/DudeSquad999/Prism-Ai/discussions)
- [Prism AI community on Reddit](https://www.reddit.com/r/PrismAIApp/)

## Repository maintenance

Run the repository checks from the project root. Node.js is needed for the browser-demo syntax check; Python 3.12 or newer is used for the repository tests:

```powershell
node --check demo.js
python -m unittest discover -s tests -v
python scripts/check_repo.py
```

See [project structure](PROJECT_STRUCTURE.md) for file ownership and safe editing guidance.

## Documentation accuracy

Prism AI is an early-stage project. Guides should distinguish tested behavior from planned work, examples, and limitations. Distinguish browser sample mode from a verified local Ollama connection. Do not present an Ollama model or hardware configuration as tested with the released Windows applications unless it has been verified there.


## Community, support, and release history

- [Support policy and 24-hour acknowledgement target](support.md)
- [Good first issues](good-first-issues.md)
- [Show HN launch draft and benchmark checklist](SHOW_HN_DRAFT.md)
- [Historical v1.0.0 release notes](releases/v1.0.0.md)

