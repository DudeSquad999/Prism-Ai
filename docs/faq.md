# Prism AI FAQ

Answers to common questions about Prism Chat, Prism Studio, local AI, research workflows, and the Windows installer.

## What is Prism AI?

Prism AI is an early-stage Windows research and writing workspace with two companion applications:

- **Prism Chat** organizes research projects, conversations, source material, and Markdown notes.
- **Prism Studio** supports LaTeX papers and presentations, references, reviewable AI-proposed edits, and PDF compilation with Tectonic.

See the [project README](../README.md) for the current overview and screenshots.

## Is Prism AI a chatbot, a LaTeX editor, or both?

It is a two-part workspace. Use Prism Chat for research organization and conversations. Use Prism Studio for LaTeX writing and document compilation. They are separate applications, and configuring an AI provider in one does not automatically configure the other.

## Does the browser workspace use a live AI model?

It can. The [browser workspace](https://dudesquad999.github.io/Prism-Ai/) starts in sample mode, but you can connect it to Ollama running on your own computer. Go to **Settings**, connect to Ollama, and choose one of the installed models. The browser sends chat prompts directly to that Ollama server.

The browser workspace does not include cloud API keys, live web search, citation verification, or document uploads. Read the [browser workspace guide](browser-demo.md) for setup and privacy details. The Windows applications remain separate and have their own provider settings.

## Can I use a local AI model with Ollama?

Prism supports local models through Ollama. You need Ollama installed, a model downloaded, and the provider configured in the specific Prism application you want to use.

The current [Ollama guide](local-models.md) describes the general sequence and known limitations. Exact application controls and a tested model/hardware recommendation are still being documented. Do not assume that installing Ollama or seeing a sample response proves a live connection is working.

## Does Prism AI work completely offline?

Do not assume that every part of Prism works offline. Local model inference can run on your computer after the model is installed and configured. However, initial model downloads, research retrieval, and first-time TeX package downloads may require internet access. A cloud AI provider also requires network access and sends the request content to that provider.

## Does Prism include a hosted AI subscription or API access?

The documented setup uses either a local model through Ollama or your own account/API key with a supported cloud provider. Check the [installation and provider documentation](installation.md) for the current supported options. Do not share API keys in public issues, screenshots, or discussions.

## Does Prism Chat automatically configure Prism Studio?

No. Configure and check the provider separately in each application. A working connection in Prism Chat does not prove that Prism Studio is configured, and vice versa.

## Does Prism guarantee accurate research citations?

No. Treat AI-generated explanations, source summaries, and references as material to verify. Open the original source and confirm that it supports the claim you plan to use. A matching quote or citation marker is not proof that the wider claim is accurate.

Prism Studio can retrieve reference records, including BibTeX entries, but users remain responsible for checking publication details and the final bibliography.

## How do I write and compile a LaTeX document?

Open Prism Studio and start from a paper template, blank document, or Beamer presentation template. You can also import an existing ZIP project, including an Overleaf-compatible project. Review AI-proposed edits before applying them. Prism Studio uses Tectonic for PDF compilation; first-time package downloads may need internet access.

See the [LaTeX workflow guide](latex-workflow.md).

## Where can I download the Windows installer?

Use the [GitHub Releases page](https://github.com/DudeSquad999/Prism-Ai/releases/latest). Download the Windows installer asset from the latest published release. Source-code ZIP and TAR archives are not Windows installers.

## What should I do if something does not work?

1. Check the [installation guide](installation.md) and the relevant workflow guide.
2. Confirm that you configured the provider in the correct Prism application.
3. For Ollama, confirm that the model download completed and that the model name matches the one selected in Prism.
4. In the browser workspace, check the connection badge and confirm the selected Ollama model is connected. If the response is in sample mode, review the Ollama setup steps and the allowed browser origin.
5. Report reproducible problems in [GitHub Issues](https://github.com/DudeSquad999/Prism-Ai/issues).

Include the Prism version, Windows version, application (Chat or Studio), steps to reproduce, expected result, actual result, and relevant error message. Remove API keys, tokens, private documents, personal information, and unnecessary local file paths before sharing logs or screenshots.

## Where can I ask a question or suggest an improvement?

- [GitHub Discussions](https://github.com/DudeSquad999/Prism-Ai/discussions) for questions, feedback, ideas, and workflow examples.
- [Q&A](https://github.com/DudeSquad999/Prism-Ai/discussions/categories/q-a) for setup and usage questions.
- [Feature ideas](https://github.com/DudeSquad999/Prism-Ai/discussions/categories/ideas) for proposed improvements.
- [r/PrismAIApp](https://www.reddit.com/r/PrismAIApp/) for community discussion.

Prism AI is actively developed. Features and setup details can change between releases, so check the current release notes and documentation before relying on a workflow.
