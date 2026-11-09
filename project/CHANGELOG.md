# Changelog

This file separates repository documentation changes from published application releases. Release summaries below reflect the published notes, not independent testing of the application packages.

## Unreleased

### Documentation and repository support

- Added `GETTING_STARTED.md` with the v2 Windows download link, setup steps, and documentation navigation.
- Added `TESTING.md` with a Windows release checklist. Checks remain untested unless actual results are recorded.
- Reworked `README.md` to distinguish the static interface demo, packaged applications, and planned capabilities.
- Added `CONTRIBUTING.md` with contribution scope, verification guidance, and a pull request checklist.
- Corrected the contributor guide's browser-preview paths to point to the root Pages assets and documented the alternate HTML copies.
- Published a canonical `docs/README.md` handbook index and linked it from the README and browser-preview navigation.
- Corrected the v3.1.0 installer filename and published SHA-256 reference in the test guide.
- Marked v1.0.0 and v2.0.0 release pages as historical, and corrected the v2.0.0 package filename to match its uploaded asset.
- Improved the GitHub Discussions welcome page with current release, setup, handbook, and community links.
- Added `documentation` and `help wanted` labels to the open Ollama setup verification issue.
- Reopened issue #38 because the README still uses v7.1 preview images rather than verified 3.1.0 Windows screenshots.
- Updated the Help Wanted discussion with direct links to the current Ollama and screenshot verification tasks.
- Corrected the GitHub latest-release pointer so `/releases/latest` resolves to v3.1.0, and linked the release to an Announcements discussion.
- Added a Node.js syntax check for `demo.js` to the repository-quality workflow.
- Added a documented brand-positioning strategy, including the product's differentiation and Prism-name confusion risk.
- Added bug-report and feature-request forms under `.github/ISSUE_TEMPLATE/`.

### Scope

These changes did not modify application code, interface styling, the Windows installer, or existing release attachments. They do not establish that the applications have been tested.

## v2.0.0: 2026-10-08

[Published release](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v2.0.0)

### Release contents described in the notes

- Combined Windows setup package for Prism Chat and Prism Studio.
- Prism Chat workflows for conversations, research, projects, and Markdown documents.
- Prism Studio workflows for LaTeX editing, AI-assisted revisions, references, and PDF compilation.
- AI configuration options for Google Gemini, Ollama, Anthropic, and OpenAI.

### Package and limitations

- Uploaded attachment: `PrismV2.0.0.zip`.
- The archived release page now names the actual attachment and identifies v2.0.0 as superseded by the current release.
- Live AI requires a configured provider or local model.
- Research retrieval uses extracts and abstracts. Quote matching does not establish that a claim is correct.
- The release notes do not certify independent testing of every feature or installation path.

## v1.0.0: 2026-09-23

[Published release](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v1.0.0)

### Release contents described in the notes

- Experimental Transformer language model implemented in PyTorch.
- Character-level tokenizer, local training, checkpoint saving and resuming.
- Command-line text generation and interactive terminal chat.
- CUDA support when available, with CPU fallback.

### Limitations

- An educational and experimental implementation whose output quality depends on data, configuration, and training.
- The v1 training workflow differs from the current Windows research and writing workspace; the release page now labels it as a historical prototype archive.

## Updating this file

Record completed changes under Unreleased until a corresponding release is published. When releasing, record the version and date, summarize user-visible changes and known issues, and identify the matching source and package. Keep planned work in `ROADMAP.md`. Never record tests as passed unless they were executed and their results are available.
