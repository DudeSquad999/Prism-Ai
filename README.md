<div align="center">
  <img src="prism-banner.png" alt="Prism AI: your research, your ideas, your AI" width="100%">
  <h1>AI research and LaTeX writing for Windows</h1>
  <p><strong>Research deeply. Write with clarity.</strong></p>
  <p>Bring research projects, Markdown notes, and AI-assisted papers together in one workspace.</p>
  <p>Explore ideas in Prism Chat. Develop your document in Prism Studio. Choose local Ollama or cloud AI.</p>
  <p>
    <a href="https://github.com/DudeSquad999/Prism-Ai/releases/tag/v3.1.0"><img alt="Prism AI 3.1.0" src="https://img.shields.io/badge/release-3.1.0-6b52d9"></a>
    <img alt="Windows" src="https://img.shields.io/badge/platform-Windows-6b52d9">
    <a href="LICENSE"><img alt="Apache-2.0 License" src="https://img.shields.io/github/license/DudeSquad999/Prism-Ai"></a>
  </p>
  <p>
    <a href="https://github.com/DudeSquad999/Prism-Ai/releases/download/v3.1.0/Prism-3.1.0.exe"><strong>Download Prism AI 3.1.0</strong></a>
    · <a href="#see-prism">See the interface</a>
    · <a href="docs/installation.md">Installation guide</a>
    · <a href="https://dudesquad999.github.io/Prism-Ai/">Try the interactive browser demo</a>
  </p>
</div>

Prism AI is a Windows research and writing workspace made up of two companion apps: **Prism Chat** helps you organize projects, conversations, source material, and Markdown notes; **Prism Studio** helps you draft and compile LaTeX papers and presentations. Use the AI provider that fits your work: run a model locally with Ollama or connect your own supported cloud provider.

> **Release and screenshots:** Prism AI 3.1.0 is an early-stage Windows release. Screenshots below come from a supplied v7.1 preview set. They illustrate workflows but are not verified images of the 3.1.0 release; actual screens and features may differ. The [3.1.0 changelog](CHANGELOG.md) describes the published release.

[Browser demo](#try-the-browser-demo) · [Workflow](#from-research-question-to-paper) · [Chat and Studio](#two-companion-apps) · [AI options](#choose-your-ai-setup) · [Screenshots](#see-prism) · [FAQ](#frequently-asked-questions) · [Guides](#documentation-and-project-links)

## Try the browser demo

[Open the interactive Prism AI demo](https://dudesquad999.github.io/Prism-Ai/) to explore a sample project without installing anything or creating an account. Create projects, try scripted chat examples, edit a Markdown draft, manage tasks, and export your demo data. The demo saves work in your browser only; its sample sources and chat replies are fictional, and it does not connect to AI, search the web, or upload your content. Read the [browser demo guide](docs/browser-demo.md) for details.

## From research question to paper

| 01 · Explore | 02 · Organize | 03 · Develop | 04 · Deliver |
|---|---|---|---|
| Ask questions and investigate a topic in Chat. | Keep conversations, retrieved sources, and notes with a research project. | Move your outline into Studio and shape it into a LaTeX document. | Review changes, check references, and compile a PDF. |

Keep the evidence close as your work evolves. Prism helps connect research and writing, while leaving you in control of which sources to trust, which edits to accept, and which AI provider to use.

## Two companion apps

### Prism Chat · research and ideas

Build a home for each research effort. Create projects, investigate questions, review source cards, and keep notes with the conversation.

- Find article extracts and scholarly abstracts from sources that include Wikipedia and Crossref, with optional Tavily or OpenAlex sources.
- Follow citation markers to sources and inspect matching passages.
- Create, edit, save, download, and export Markdown notes and research material.
- Keep project conversations and material together as you develop an outline.

### Prism Studio · writing and publishing

Start with a blank document, a paper template, a presentation template, or an imported project. Work in LaTeX and stay in charge of every change.

- Draft papers, articles, and Beamer presentations.
- Review proposed edits before applying, rejecting, or undoing them.
- Search related work with arXiv and Crossref, retrieve BibTeX, and check references.
- Compile PDFs with Tectonic; import or export project ZIP files, including Overleaf-compatible projects.

AI suggestions, retrieved sources, and citations can be wrong. Check important claims and inspect changes before using them in submitted or published work.

## Choose your AI setup

|  | Local model · Ollama | Cloud provider |
|---|---|---|
| **Supported in 3.1.0** | Local models through Ollama | Google Gemini, Anthropic, or OpenAI |
| **Where inference runs** | On your computer after setup | With the provider you configure |
| **What you provide** | Ollama and a model compatible with your hardware | Your provider account and API key |
| **Keep in mind** | Model downloads need internet; local inference does not make every feature offline. | Requests containing your content are sent to that provider. Review its privacy, pricing, and usage terms. |

Prism does not supply a cloud API key. Local model speed and quality depend on your computer and selected model. Follow the [Ollama setup guide](docs/local-models.md) or the [full installation guide](docs/installation.md) for details.

## See Prism

The following supplied v7.1 preview images give a quick look at the intended workspace. They are illustrative only and may differ from the Prism AI 3.1.0 applications. Select an image to open it at full size.

| Research workspace · dark preview | Writing workspace · dark preview |
|---|---|
| [![Prism Chat research workspace in dark theme, supplied v7.1 preview](docs/screenshots/v71_chat_1440x900_dark.png)](docs/screenshots/v71_chat_1440x900_dark.png) | [![Prism Studio LaTeX workspace in dark theme, supplied v7.1 preview](docs/screenshots/v71_studio_1440x900_dark.png)](docs/screenshots/v71_studio_1440x900_dark.png) |

<details>
<summary><strong>Explore the full screenshot gallery</strong> · 21 supplied preview images</summary>

### Home, chat, and projects

| Home · dark | Home · light |
|---|---|
| [![Prism home screen in dark theme](docs/screenshots/v71_home_1440x900_dark.png)](docs/screenshots/v71_home_1440x900_dark.png) | [![Prism home screen in light theme](docs/screenshots/v71_home_1440x900_light.png)](docs/screenshots/v71_home_1440x900_light.png) |

| Chat · dark | Chat · light |
|---|---|
| [![Prism Chat in dark theme](docs/screenshots/v71_chat_1440x900_dark.png)](docs/screenshots/v71_chat_1440x900_dark.png) | [![Prism Chat in light theme](docs/screenshots/v71_chat_1440x900_light.png)](docs/screenshots/v71_chat_1440x900_light.png) |

| Projects · dark | Projects · light |
|---|---|
| [![Prism projects view in dark theme](docs/screenshots/v71_projects_1440x900_dark.png)](docs/screenshots/v71_projects_1440x900_dark.png) | [![Prism projects view in light theme](docs/screenshots/v71_projects_1440x900_light.png)](docs/screenshots/v71_projects_1440x900_light.png) |

The sample project in this preview is labeled fictional and kept separate from personal work:

[![Confirmation dialog for opening the clearly labeled fictional sample project](docs/screenshots/v71_sample_project_open.png)](docs/screenshots/v71_sample_project_open.png)

### Research and personalization

| Evidence library | My Prism · dark | My Prism · light |
|---|---|---|
| [![Prism evidence library](docs/screenshots/v71_library_1440x900_dark.png)](docs/screenshots/v71_library_1440x900_dark.png) | [![My Prism settings in dark theme](docs/screenshots/v71_myprism_1440x900_dark.png)](docs/screenshots/v71_myprism_1440x900_dark.png) | [![My Prism settings in light theme](docs/screenshots/v71_myprism_1440x900_light.png)](docs/screenshots/v71_myprism_1440x900_light.png) |

| Writing-style review | AI profiles · dark | AI profiles · light |
|---|---|---|
| [![My Prism writing-style sample analysis with a reviewable suggestion](docs/screenshots/v71_myprism_writing_sample_analyzed.png)](docs/screenshots/v71_myprism_writing_sample_analyzed.png) | [![AI profiles in dark theme](docs/screenshots/v71_profiles_1440x900_dark.png)](docs/screenshots/v71_profiles_1440x900_dark.png) | [![AI profiles in light theme](docs/screenshots/v71_profiles_1440x900_light.png)](docs/screenshots/v71_profiles_1440x900_light.png) |

| Teach Prism | Add a teaching item |
|---|---|
| [![Teach Prism settings](docs/screenshots/v71_teaching_1440x900_dark.png)](docs/screenshots/v71_teaching_1440x900_dark.png) | [![Dialog for adding a scoped Prism teaching item](docs/screenshots/v71_teaching_add_dialog.png)](docs/screenshots/v71_teaching_add_dialog.png) |

### AI setup, writing, and workflow previews

| AI choice · dark | AI choice · light |
|---|---|
| [![AI choice in dark theme](docs/screenshots/v71_aichoice_1440x900_dark.png)](docs/screenshots/v71_aichoice_1440x900_dark.png) | [![AI choice in light theme](docs/screenshots/v71_aichoice_1440x900_light.png)](docs/screenshots/v71_aichoice_1440x900_light.png) |

| Prism Studio · dark | Prism Studio · light |
|---|---|
| [![Prism Studio with LaTeX editor and assistant in dark theme](docs/screenshots/v71_studio_1440x900_dark.png)](docs/screenshots/v71_studio_1440x900_dark.png) | [![Prism Studio with LaTeX editor and assistant in light theme](docs/screenshots/v71_studio_1440x900_light.png)](docs/screenshots/v71_studio_1440x900_light.png) |

| Chat prompt · preview | Overnight planning · preview |
|---|---|
| [![Chat composer with a typed example message](docs/screenshots/v71_chat_composer_typed.png)](docs/screenshots/v71_chat_composer_typed.png) | [![Overnight planning view](docs/screenshots/v71_overnight_1440x900_dark.png)](docs/screenshots/v71_overnight_1440x900_dark.png) |

</details>

## Get started with 3.1.0

1. **Download the Windows installer:** [Prism-3.1.0.exe](https://github.com/DudeSquad999/Prism-Ai/releases/download/v3.1.0/Prism-3.1.0.exe). You can also view the [3.1.0 release and its notes](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v3.1.0). Choose the `.exe` installer, not the source-code ZIP or tar archive.
2. **Install and open an app:** Start with Prism Chat for research, or Prism Studio for LaTeX writing.
3. **Configure AI if you want live AI features:** Set up [Ollama and a local model](docs/local-models.md), or configure your own Google Gemini, Anthropic, or OpenAI API key. Check configuration separately in each application you use.
4. **Try a small task:** Use non-sensitive sample content first. Check that the selected provider responds; an offline demo response in Chat does not prove a live AI connection.
5. **Write and check:** In Studio, review any proposed edits and compile a small PDF to confirm your LaTeX setup.

See the [installation and troubleshooting guide](docs/installation.md) for provider configuration, startup problems, and PDF compilation.

## Frequently asked questions

<details>
<summary><strong>Is Prism AI 3.1.0 the same version as the screenshots?</strong></summary>

No. The gallery uses supplied v7.1 preview screenshots. They are included to illustrate intended workflows, not to claim that the 3.1.0 release has the same screens or every shown feature. The [3.1.0 changelog](CHANGELOG.md) is the source for confirmed release details.

</details>

<details>
<summary><strong>Does Prism work without an internet connection?</strong></summary>

Local model inference runs on your computer after Ollama and the model are set up. Initial downloads, some research retrieval, and first-time TeX package downloads may still require internet access. Cloud AI requires a connection to your chosen provider.

</details>

<details>
<summary><strong>Does Prism Chat's demo response mean AI is connected?</strong></summary>

No. Chat includes an offline demo fallback. Check your provider configuration and any connection status rather than treating a demo response as proof that a live model is working.

</details>

<details>
<summary><strong>Where does my content go?</strong></summary>

With a local model, inference happens on your computer. When you use cloud AI, request content is sent to the provider you configure. Review that provider's data practices and terms. Avoid sending sensitive material unless you have checked that the setup is appropriate.

</details>

<details>
<summary><strong>Can I use my Overleaf project?</strong></summary>

Studio supports importing and exporting project ZIP files, including Overleaf-compatible projects. Review the imported files and compile the document in your own setup.

</details>

<details>
<summary><strong>Is the browser demo the full application?</strong></summary>

No. It is an interactive, browser-only product preview: you can manage sample projects, tasks, source cards, chat examples, and Markdown drafts, with data saved locally in your browser. Chat replies and sources are fictional examples; the demo does not connect to AI, search the web, verify citations, or upload data. See the [browser demo guide](docs/browser-demo.md) for privacy, import, and reset details. For live AI features, install the Windows applications.

</details>

## Documentation and project links

| Start here | Learn more |
|---|---|
| [Documentation index](docs/README.md) | [Project wiki](https://github.com/DudeSquad999/Prism-Ai/wiki) |
| [Installation guide](docs/installation.md) | [Roadmap](project/ROADMAP.md) |
| [Research and Markdown workflow](docs/research-workflow.md) | [LaTeX writing workflow](docs/latex-workflow.md) |
| [Local models with Ollama](docs/local-models.md) | [Interactive browser demo guide](docs/browser-demo.md) |
| [Contributing](CONTRIBUTING.md) | [Apache 2.0 license](LICENSE) |
| [Report a bug or request a feature](https://github.com/DudeSquad999/Prism-Ai/issues) | [3.1.0 release notes](CHANGELOG.md) |

## License

The current Prism AI codebase is released under the [Apache License 2.0](LICENSE), which allows use, modification, and redistribution and includes an express patent license. Versions previously distributed under MIT remain available under the terms of their original license. Contributions and constructive feedback are welcome; see [CONTRIBUTING.md](CONTRIBUTING.md) to get started.
