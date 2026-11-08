<div align="center">
  <img src="prism-banner.png" alt="Prism AI banner" width="100%">
  <h1>Prism AI</h1>
  <h3>Research and LaTeX writing for Windows</h3>
  <p><strong>Your research. Your writing. Your AI.</strong></p>
  <p>A connected workspace for exploring ideas, organizing research, and developing polished academic documents.</p>
  <p>
    <a href="https://github.com/DudeSquad999/Prism-Ai/releases/tag/v3.1.0"><img alt="Latest release 3.1.0" src="https://img.shields.io/badge/release-3.1.0-6b52d9"></a>
    <img alt="Platform Windows" src="https://img.shields.io/badge/platform-Windows-6b52d9">
    <a href="LICENSE"><img alt="Apache 2.0 license" src="https://img.shields.io/github/license/DudeSquad999/Prism-Ai"></a>
  </p>
  <p>
    <a href="https://github.com/DudeSquad999/Prism-Ai/releases/latest"><strong>Download Prism AI</strong></a>
    · <a href="https://dudesquad999.github.io/Prism-Ai/">Explore the browser demo</a>
    · <a href="docs/installation.md">Read the installation guide</a>
  </p>
</div>

---

## Overview

Prism AI is an early-stage Windows research and writing workspace built around two companion applications:

- **Prism Chat** helps you explore questions, organize research projects, keep conversations and source material together, and write Markdown notes.
- **Prism Studio** helps you draft papers and presentations in LaTeX, review AI-proposed edits, manage references, and compile PDFs.

Choose a local model through Ollama or connect your own supported cloud AI provider. Prism is designed to keep research and writing in one workflow while leaving decisions about sources, edits, and AI providers in your hands.

> **Release note:** The current documented Windows release is **3.1.0**. Prism AI is still early-stage software. Review the [changelog](CHANGELOG.md), [installation guide](docs/installation.md), and limitations described below before relying on it for important work.

## At a glance

| Prism Chat | Prism Studio |
|---|---|
| Research projects and conversations | LaTeX papers and presentations |
| Source cards and research notes | Reviewable writing suggestions |
| Markdown editing and exports | Reference lookup and BibTeX |
| Research-to-outline workflow | PDF compilation with Tectonic |

## Explore the browser demo

[**Open the interactive browser demo →**](https://dudesquad999.github.io/Prism-Ai/)

The browser demo is a free, static preview that runs without an account, API key, or installation. You can create sample projects, explore scripted chat examples, edit Markdown drafts, manage tasks, and import or export demo data.

**Demo boundaries:** The preview uses fictional sample sources and fixed example replies. It does not connect to an AI model, search the web, verify citations, analyze documents, or upload your work. Changes are saved in your browser's local storage. See the [browser demo guide](docs/browser-demo.md) for details.

## Browser demo architecture

The diagram below describes the browser-only preview implemented in [`demo.js`](demo.js). It maps the demo interface, scripted chat, project views, sample sources, tasks, Markdown drafts, import/export, browser storage, and downloads. It is not an architecture diagram for the full Windows applications or the separate private Prism web backend.

[![Architecture diagram of the Prism AI browser demo](https://gitdiagram.com/dudesquad999/prism-ai/diagram.png)](https://gitdiagram.com/dudesquad999/prism-ai?utm_source=readme&utm_medium=picture)

[![Architecture diagram](https://gitdiagram.com/diagram-badge.svg)](https://gitdiagram.com/dudesquad999/prism-ai?utm_source=readme&utm_medium=badge)

<details>
<summary><strong>View the Mermaid source</strong></summary>

```mermaid
flowchart TD

subgraph group_workspace["Demo workspace"]
  node_demo["Demo interface<br/>[demo.js]"]
  node_chat["Scripted chat<br/>[demo.js]"]
end

subgraph group_project["Project features"]
  node_project_views["Project views<br/>[demo.js]"]
  node_sources["Sample sources<br/>[demo.js]"]
  node_tasks["Project tasks<br/>[demo.js]"]
  node_draft["Markdown draft<br/>[demo.js]"]
end

subgraph group_persistence["Browser data"]
  node_project_transfer["Project import/export<br/>[demo.js]"]
  node_browser_storage[("Browser storage")]
  node_download["Browser downloads"]
end

node_visitor(("Visitor"))

node_visitor -->|"uses"| node_demo
node_demo -->|"shows scripted"| node_chat
node_demo -->|"renders"| node_project_views
node_project_views -->|"shows examples"| node_sources
node_project_views -->|"renders"| node_tasks
node_project_views -->|"opens"| node_draft
node_demo -->|"handles"| node_project_transfer
node_project_transfer -->|"downloads export"| node_download
node_project_transfer -->|"saves import"| node_browser_storage
node_demo -->|"saves locally"| node_browser_storage

click node_demo "https://github.com/DudeSquad999/Prism-Ai/blob/Main/demo.js"
click node_chat "https://github.com/DudeSquad999/Prism-Ai/blob/Main/demo.js"
click node_project_views "https://github.com/DudeSquad999/Prism-Ai/blob/Main/demo.js"
click node_sources "https://github.com/DudeSquad999/Prism-Ai/blob/Main/demo.js"
click node_tasks "https://github.com/DudeSquad999/Prism-Ai/blob/Main/demo.js"
click node_draft "https://github.com/DudeSquad999/Prism-Ai/blob/Main/demo.js"
click node_project_transfer "https://github.com/DudeSquad999/Prism-Ai/blob/Main/demo.js"

classDef toneNeutral fill:#f8fafc,stroke:#334155,stroke-width:1.5px,color:#0f172a
classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
classDef toneIndigo fill:#e0e7ff,stroke:#4f46e5,stroke-width:1.5px,color:#312e81
classDef toneTeal fill:#ccfbf1,stroke:#0f766e,stroke-width:1.5px,color:#134e4a
class node_demo,node_chat toneBlue
class node_project_views,node_sources,node_tasks,node_draft toneAmber
class node_project_transfer,node_browser_storage,node_download toneMint
class node_visitor toneIndigo
```

Generated with [GitDiagram](https://gitdiagram.com/dudesquad999/prism-ai).
</details>

## Product workflow

| Step | What happens |
|---|---|
| **01 · Explore** | Investigate a question and develop ideas in Prism Chat. |
| **02 · Organize** | Keep conversations, retrieved material, and Markdown notes with a research project. |
| **03 · Develop** | Shape an outline into a paper or presentation in Prism Studio. |
| **04 · Deliver** | Review edits, check references, and compile the document to PDF. |

## Core capabilities

### Prism Chat · Research and organization

- Create research projects and keep related conversations and notes together.
- Explore questions and review source cards and citation markers.
- Work with article extracts and scholarly abstracts from sources that include Wikipedia and Crossref, with optional Tavily or OpenAlex sources.
- Create, edit, save, download, and export Markdown notes and research material.

### Prism Studio · LaTeX writing

- Draft academic papers, articles, and Beamer presentations.
- Review proposed edits before accepting, rejecting, or undoing them.
- Search related work using arXiv and Crossref, retrieve BibTeX, and check references.
- Compile PDFs with Tectonic.
- Import and export project ZIP files, including Overleaf-compatible projects.

AI-generated text, retrieved material, and citations can be incomplete or incorrect. Check original sources and review document changes before submitting or publishing work.

## Choose your AI setup

Prism supports two approaches to AI. Availability and performance depend on the application, provider configuration, model, and your hardware.

|  | Local AI · Ollama | Cloud AI provider |
|---|---|---|
| **Providers** | Models served by Ollama | Google Gemini, Anthropic, or OpenAI |
| **Where processing happens** | On your computer | With the cloud provider you configure |
| **What you need** | Ollama and a compatible downloaded model | Your provider account and API key |
| **Important considerations** | Model downloads require internet access; local inference does not make every feature offline. | Content included in requests is sent to your selected provider. Review its privacy, pricing, and usage terms. |

Prism does not supply cloud API keys. Configure the provider separately in each application you use; configuring Prism Chat does not necessarily configure Prism Studio.

- [Ollama and local-model setup](docs/local-models.md)
- [Full installation and provider configuration](docs/installation.md)

## Screenshots

The images below are from a supplied **v7.1 preview set**. They illustrate the intended interface and workflows; they are not verified screenshots of the 3.1.0 release, and the actual release screens or features may differ.

| Prism Chat · dark preview | Prism Studio · dark preview |
|---|---|
| [![Prism Chat research workspace in dark theme](docs/screenshots/v71_chat_1440x900_dark.png)](docs/screenshots/v71_chat_1440x900_dark.png) | [![Prism Studio LaTeX workspace in dark theme](docs/screenshots/v71_studio_1440x900_dark.png)](docs/screenshots/v71_studio_1440x900_dark.png) |

| Prism home · dark preview | Prism projects · dark preview |
|---|---|
| [![Prism home screen in dark theme](docs/screenshots/v71_home_1440x900_dark.png)](docs/screenshots/v71_home_1440x900_dark.png) | [![Prism projects view in dark theme](docs/screenshots/v71_projects_1440x900_dark.png)](docs/screenshots/v71_projects_1440x900_dark.png) |

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

## Get started

1. **Download the installer.** Open the [latest GitHub release](https://github.com/DudeSquad999/Prism-Ai/releases/latest) and download the Windows `.exe` asset. GitHub's source-code ZIP and tar archives are not installers.
2. **Install and launch.** Follow the installer prompts. Open Prism Chat for research and Markdown work, or Prism Studio for LaTeX writing.
3. **Configure AI.** Set up [Ollama](docs/local-models.md) with a local model, or provide your own API key for a supported cloud provider. Configure each application you plan to use.
4. **Run a small test.** Start with non-sensitive sample content and confirm that the selected AI provider responds. A scripted or offline demo response is not proof of a live connection.
5. **Verify PDF output.** In Prism Studio, compile a small document to confirm that Tectonic is configured. AI connectivity and PDF compilation are separate checks.

For detailed steps and troubleshooting, see the [Windows installation guide](docs/installation.md).

## Documentation

| Resource | Description |
|---|---|
| [Documentation index](docs/README.md) | Overview of the available guides |
| [Installation guide](docs/installation.md) | Windows setup and troubleshooting |
| [Local models with Ollama](docs/local-models.md) | Configure local AI |
| [Research workflow](docs/research-workflow.md) | Organize research and notes |
| [LaTeX workflow](docs/latex-workflow.md) | Write and compile documents |
| [Browser demo guide](docs/browser-demo.md) | Demo features, storage, import, and privacy |
| [Project roadmap](project/ROADMAP.md) | Planned and ongoing project direction |
| [Changelog](CHANGELOG.md) | Release history and changes |
| [Testing guide](guides/TESTING.md) | Available test information |

## Current status and limitations

- **Early-stage release:** Prism AI 3.1.0 is an early-stage Windows release. Features and behavior may change.
- **Platform:** Windows is the supported platform for this release.
- **Screenshots:** The screenshots in this README come from the v7.1 preview set and may not match 3.1.0.
- **AI reliability:** AI responses, retrieved sources, and citations may be incomplete or wrong. Verify important claims against original sources.
- **Internet access:** Local model inference runs on your computer after setup, but research retrieval, initial model downloads, and first-time TeX package downloads may still require internet access.
- **Cloud privacy:** When you use a cloud provider, content included in your requests is sent to that provider. Review its data-handling policies before sharing sensitive material.

See the [3.1.0 changelog](CHANGELOG.md) and the guides for more detail.

## Contributing and support

Bug reports, documentation improvements, setup feedback, and focused contributions are welcome.

- [Report a bug or request a feature](https://github.com/DudeSquad999/Prism-Ai/issues)
- [Read the contribution guide](CONTRIBUTING.md)
- [Review the security policy](SECURITY.md)
- [Join the Prism AI community on Reddit](https://www.reddit.com/r/PrismAIApp/)

Please include reproducible steps when reporting a problem. Never post API keys, passwords, private research, or personal information in public issues.

## License

Prism AI is distributed under the [Apache License 2.0](LICENSE). Versions previously distributed under MIT remain available under the terms of their original license.

---

<div align="center">
  <strong>Prism AI</strong><br>
  Research deeply. Write with clarity.
</div>
