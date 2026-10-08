# Changelog

This file separates repository documentation changes from published application releases. Release summaries below reflect the published notes, not independent testing of the application packages.

## Unreleased

### Documentation and repository support

- Added `GETTING_STARTED.md` with the v2 Windows download link, setup steps, and documentation navigation.
- Added `TESTING.md` with a Windows release checklist. Checks remain untested unless actual results are recorded.
- Reworked `README.md` to distinguish the static interface demo, packaged applications, and planned capabilities.
- Added `CONTRIBUTING.md` with contribution scope, verification guidance, and a pull request checklist.
- Added bug-report and feature-request forms under `.github/ISSUE_TEMPLATE/`.

### Scope

These changes did not modify application code, interface styling, the Windows installer, or existing release attachments. They do not establish that the applications have been tested.

## v2.0.0 — 2026-10-08

[Published release](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v2.0.0)

### Release contents described in the notes

- Combined Windows setup package for Prism Chat and Prism Studio.
- Prism Chat workflows for conversations, research, projects, and Markdown documents.
- Prism Studio workflows for LaTeX editing, AI-assisted revisions, references, and PDF compilation.
- AI configuration options for Google Gemini, Ollama, Anthropic, and OpenAI.

### Package and limitations

- Uploaded attachment: `PrismV2.0.0.zip`.
- Published notes refer to `Prism-AI-Windows-v2.0.0.zip`; the attachment name and notes should be aligned.
- Live AI requires a configured provider or local model.
- Research retrieval uses extracts and abstracts. Quote matching does not establish that a claim is correct.
- The release notes do not certify independent testing of every feature or installation path.

## v1.0.0 — 2026-09-23

[Published release](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v1.0.0)

### Release contents described in the notes

- Experimental Transformer language model implemented in PyTorch.
- Character-level tokenizer, local training, checkpoint saving and resuming.
- Command-line text generation and interactive terminal chat.
- CUDA support when available, with CPU fallback.

### Limitations

- An educational and experimental implementation whose output quality depends on data, configuration, and training.
- The v1 training workflow differs from the v2 Windows application package and the repository's static interface demo.

## Updating this file

Record completed changes under Unreleased until a corresponding release is published. When releasing, record the version and date, summarize user-visible changes and known issues, and identify the matching source and package. Keep planned work in `ROADMAP.md`. Never record tests as passed unless they were executed and their results are available.
