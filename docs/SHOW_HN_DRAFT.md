# Show HN: Prism AI, an open-source Windows research and LaTeX writing workspace

**Suggested title:** Show HN: Prism AI, an open-source Windows research and writing workspace

**Post draft:**

I built Prism AI because I wanted a more organized path from a research question to a finished document on Windows.

The current product has two companion applications:

- **Prism Chat** organizes research projects, conversations, source material, and Markdown notes.
- **Prism Studio** supports LaTeX writing, references and BibTeX, and PDF compilation.

The goal is not to hide the research process behind one generated answer. The workflow is designed around keeping project material organized, reviewing source context, and inspecting AI-proposed edits before applying them.

## Architecture and design decisions

Prism supports local models through Ollama and cloud providers configured with the user's own API key. Chat and Studio have separate provider configuration, so setup in one application does not silently configure the other. Local inference keeps model execution on the user's machine, while cloud requests send included content to the selected provider.

The browser preview is a separate, local-only demonstration. It uses fictional sample sources and fixed example replies. It does not connect to an AI model, search the web, verify citations, or represent the live Windows applications.

The current repository contains the public browser preview, documentation, maintenance scripts, and release information. The complete Windows application source is not represented by the static preview code, so a change to the preview should not be mistaken for a change to the installed applications.

## Technical hurdles

The hardest product decisions are around trust and boundaries: clearly separating retrieved source material from generated text, making users review AI-proposed document changes, keeping local and cloud provider behavior understandable, and avoiding claims that a browser demo or a mocked test proves live AI correctness.

LaTeX compilation adds another practical workflow boundary. Prism Studio uses Tectonic for PDF compilation, which means first-run package downloads and network requirements need to be explained separately from local model inference.

## Benchmarks and current limitations

I am not publishing performance numbers yet. There is no reproducible public benchmark suite covering startup time, response latency, memory use, model/hardware combinations, or PDF compilation time for the current Windows release. I would rather publish measured results with exact hardware, model, application version, and test procedure than invent a benchmark or compare unlike environments.

The current release is early-stage and Windows is the documented platform. The repository's test report explicitly distinguishes maintainer-reported Windows checks from Linux, browser automation, and Wine results. Live cloud-provider validation and several Windows-specific behaviors remain open validation items.

## What feedback would help

- Is the separation between research organization and LaTeX production useful?
- What evidence or citation controls would you expect before trusting a research workspace?
- What should be measured in a fair local-versus-cloud workflow benchmark?
- Which Windows setup or document-compilation failures should be prioritized?

Project: https://github.com/DudeSquad999/Prism-Ai

Browser preview: https://dudesquad999.github.io/Prism-Ai/

I welcome critical feedback, especially from people who use LaTeX, local models, or research workflows. Please distinguish issues in the live Windows applications from behavior in the browser preview when reporting them.
