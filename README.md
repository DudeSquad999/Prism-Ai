# Prism AI

Prism AI explores a more transparent AI experience: multiple perspectives, structured comparison, user control, memory, and verification, with visible uncertainty rather than a single opaque answer.

## Start here

| Your goal | Where to go |
| --- | --- |
| Install the Windows applications | [Getting Started](GETTING_STARTED.md) |
| Download a published package | [Releases](https://github.com/DudeSquad999/Prism-Ai/releases) |
| Explore the local interface demo | Open `index.html` in your browser |
| Understand the intended design | [Design goals](Prism-Ai-How-I-Want-It-To-Work.md) |
| See planned work | [Roadmap](ROADMAP.md) |
| Check a release before publishing | [Windows test checklist](TESTING.md) |

## Demo, releases, and plans are different

### Interface demo in this repository

The root files `index.html`, `styles.css`, and `app.js` form a local static interface prototype. The prototype uses prewritten example content. It does not call AI models, connect to providers, send network requests, or store user prompts.

Open `index.html` in a browser to explore the demo. It is not the Windows installer or evidence that the planned AI features are implemented.

### Packaged Windows applications

The published v2.0.0 release notes describe two applications:

- **Prism Chat:** conversations, research, projects, and Markdown documents.
- **Prism Studio:** LaTeX writing, AI-assisted revisions, references, and PDF compilation.

The attached Windows package is `PrismV2.0.0.zip`. Follow [Getting Started](GETTING_STARTED.md) for the download link and installation instructions. These application descriptions come from the release notes; they are not an independent verification of the package.

The root demo files are not the Chat and Studio source folders described in the Windows package layout. Do not treat the repository source download as interchangeable with the attached Windows application package.

### Project direction

The design documents describe intended behavior and future exploration. Planned capabilities are not guarantees of implementation, accuracy, or delivery dates.

## Repository map

| File | Purpose |
| --- | --- |
| `README.md` | Project overview and navigation |
| `GETTING_STARTED.md` | Windows release download, setup, and usage overview |
| `TESTING.md` | Release test plan; not proof that tests passed |
| `ROADMAP.md` | Planned work and priorities |
| `Prism-Ai-How-I-Want-It-To-Work.md` | Intended product behavior and design goals |
| `How-LLMs-Work-Comparison.md` | Language-model comparison and project context |
| `index.html` | Static demo page |
| `styles.css` | Demo styling |
| `app.js` | Demo interactions |
| `.gitignore` | Git ignore rules |
| `LICENSE` | License terms |

## Release history

| Version | What its release notes describe |
| --- | --- |
| [v2.0.0](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v2.0.0) | Combined Windows setup for Prism Chat and Prism Studio |
| [v1.0.0](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v1.0.0) | Experimental PyTorch Transformer with local training, text generation, and terminal chat |

Use the instructions for the version you downloaded. The v1 training workflow, the v2 Windows applications, and the root static demo are different deliverables.

## Limitations and privacy

- Comparing multiple perspectives does not automatically make an answer correct.
- The v2 release notes describe research retrieval from extracts and abstracts; finding a matching quote does not verify the truth of a claim.
- Live AI in the packaged applications requires a configured provider or local model. Cloud requests send included content to that provider.
- Keep API keys, private conversations, and personal project data out of public uploads and issue reports.
- The v2 release notes describe an early-stage local application. Do not expose it to the public internet without appropriate authentication and security controls.
- [TESTING.md](TESTING.md) is a checklist. Only recorded test results can establish which checks were actually performed.

## Feedback and bug reports

[Open an issue](https://github.com/DudeSquad999/Prism-Ai/issues) and identify the component: static demo, Prism Chat, Prism Studio, or Windows Setup.

Include the version, steps to reproduce, expected behavior, actual behavior, and relevant error messages or screenshots. Remove credentials and private information before posting.

## License

See [LICENSE](LICENSE) for the license terms.
