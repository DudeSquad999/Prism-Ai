# Getting Started with Prism AI

## Download v2.0.0

Prism AI v2.0.0 packages Prism Chat and Prism Studio together for Windows.

- [Release notes](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v2.0.0)
- [Download PrismV2.0.0.zip](https://github.com/DudeSquad999/Prism-Ai/releases/download/v2.0.0/PrismV2.0.0.zip)

The download link above points to the published `PrismV2.0.0.zip` attachment. If the release page's written instructions show a different filename, trust the actual attachment name and report the mismatch so the release notes can be corrected.

## Install and launch

1. Download the ZIP and select **Extract All** in Windows.
2. Open the extracted folder. Do not run the installer from inside the ZIP.
3. Run `Install Prism.bat` and follow the setup prompts.
4. Configure your AI provider or local model.
5. Launch Prism Chat or Prism Studio using its desktop shortcut. Keep its terminal window open while using the application.

| Application | Purpose | Default local address |
| --- | --- | --- |
| Prism Chat | Research, conversations, projects, and Markdown documents | http://127.0.0.1:8000 |
| Prism Studio | LaTeX writing, references, and PDF compilation | http://127.0.0.1:8001 |

These instructions summarize the published release notes; they do not certify that installation or features have been independently tested.

## AI configuration

The release notes list Google Gemini, Anthropic, OpenAI, and Ollama as supported options. Cloud providers require your own API key; Ollama requires a locally installed model. Live AI depends on a configured provider or model. Prism Chat also includes an offline demo fallback.

## Repository documentation

- [Project overview](README.md)
- [Roadmap](ROADMAP.md)
- [Prism AI design goals](Prism-Ai-How-I-Want-It-To-Work.md)
- [How language models work: comparison](How-LLMs-Work-Comparison.md)

## Release history

- [v2.0.0](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v2.0.0): Windows package for Prism Chat and Prism Studio.
- [v1.0.0](https://github.com/DudeSquad999/Prism-Ai/releases/tag/v1.0.0): release notes describe an experimental PyTorch Transformer with local training, text generation, and terminal chat. Its setup instructions differ from v2.

## Privacy and limitations

According to the v2 release notes, project data is stored locally, but content included in cloud AI requests is sent to the configured provider. Keep API keys and private project data out of public uploads and bug reports.

Prism AI is an early-stage local application. Research retrieval uses extracts and abstracts; quote matching does not establish that a claim is correct. Do not expose the applications to the public internet without appropriate authentication and security controls.

## Report a problem

[Open a GitHub issue](https://github.com/DudeSquad999/Prism-Ai/issues) and include:

- Affected component: Chat, Studio, or Windows Setup.
- Steps to reproduce.
- Expected and actual behavior.
- Relevant error messages or screenshots, with API keys and private information removed.
