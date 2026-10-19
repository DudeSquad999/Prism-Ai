# Install Prism AI on Windows

Prism AI is an early-stage research and writing project for Windows. It includes:

- Prism Chat for research, conversations, projects, and Markdown documents.
- Prism Studio for AI-assisted LaTeX writing and document workflows.

AI answers and citations can be wrong. Verify important claims before using them.

## Before you start

You will need:

- A Windows computer.
- Sufficient disk space for the applications and any local models you choose to download.
- Internet access to download the installer.
- A configured local model or cloud AI provider to use live AI features.

Prism Studio uses Tectonic for PDF compilation. Initial setup and first-time TeX package downloads may require internet access.

Local-model performance depends on your hardware, available memory, and selected model. Cloud-provider availability, pricing, and usage limits depend on your provider account.

## 1. Download the Windows installer

1. Open the [latest Prism AI release](https://github.com/DudeSquad999/Prism-Ai/releases/latest).
2. Expand **Assets** if the download list is collapsed.
3. Download the Windows installer. For v3.1.0, the filename is:

   `Prism-3.1.0-Setup.exe`

For installation, do not choose:

- `Prism-3.1.0-source.zip`
- `Source code (zip)`
- `Source code (tar.gz)`

Those downloads contain source code rather than the Windows installer.

The installer filename may change in future releases. Check the release notes for the version you are downloading.

## 2. Install and launch

1. Run the downloaded installer.
2. Follow its setup prompts.
3. Launch Prism Chat or Prism Studio using the installed shortcuts.

Choose:

- **Prism Chat** for research, conversations, projects, and Markdown documents.
- **Prism Studio** for AI-assisted LaTeX writing and PDF workflows.

If installation or startup fails, use the troubleshooting section below.

## 3. Choose how to run AI

Live AI features require either:

- A local model through Ollama, or
- Your own API key for a supported cloud provider.

Prism Chat also includes an offline demo fallback when live AI is unavailable. Demo behavior is not evidence that a live AI provider is connected.

### Option A: Use a local model through Ollama

The general setup sequence is:

1. Install Ollama.
2. Download a model suitable for your computer.
3. Configure Prism to use Ollama and your downloaded model.

For additional guidance, see [Use Prism AI with Ollama](local-models.md).

Model inference runs on your computer when using a local model. This does not mean that every application feature works without internet access: research retrieval and initial downloads may still require a connection.

### Option B: Use a cloud provider

The release notes list support for:

- Google Gemini
- Anthropic
- OpenAI

You will need your own API key for the provider you choose.

Configure the provider and API key in the application you intend to use. Do not assume that configuring one application also configures the other.

When you use a cloud provider, content included in your requests is sent to that provider. Charges, availability, data handling, and usage limits depend on your account and provider configuration.

Never include an API key in screenshots, public issues, or shared project files.

## 4. Check that setup worked

First, confirm that the application opens.

Then, if you configured live AI:

1. Start a conversation or AI-assisted task using non-sensitive sample content.
2. Confirm that you receive a response.
3. Check for connection, authentication, or model errors.

In Prism Chat, receiving an offline demo response does not confirm that your live AI configuration works.

For Prism Studio, check PDF compilation separately. A working AI connection does not establish that Tectonic is configured correctly.

## Troubleshooting

### I downloaded a ZIP instead of the installer

Return to the [latest release](https://github.com/DudeSquad999/Prism-Ai/releases/latest) and choose the Windows `.exe` asset.

For v3.1.0, choose `Prism-3.1.0-Setup.exe`.

### Live AI features are unavailable

Confirm that you have configured either:

- Ollama with a downloaded local model, or
- A supported cloud provider with a valid API key.

Check any error message shown by the application. Do not publish your API key when asking for help.

### Prism Chat shows demo content

Prism Chat includes an offline demo fallback when live AI is unavailable.

Demo responses do not confirm a working local-model or cloud-provider connection. Check your AI configuration and any connection errors.

### PDF compilation fails

Prism Studio uses Tectonic for PDF compilation.

Confirm that the TeX engine is configured and inspect the compilation error. Initial setup and first-time package downloads may require internet access.

AI configuration and PDF compilation are separate: one can work while the other fails.

### Installation or startup fails

Report the problem through [GitHub Issues](https://github.com/DudeSquad999/Prism-Ai/issues).

Include the information below. If the application never opened, write “not configured” for the AI provider.

```text
Prism version:
Application: Windows installer / Prism Chat / Prism Studio
Windows version:
Downloaded filename:
AI provider or local model, if configured:

Steps to reproduce:
1.
2.
3.

Expected behavior:

Actual behavior:

Error message:
```

Remove API keys, private research, personal information, and private file paths before posting logs or screenshots.

## Privacy and safety

- Use non-sensitive sample content while testing your setup.
- Cloud AI requests send included content to the configured provider.
- Keep API keys private.
- Do not expose the applications to the public internet without appropriate authentication and security controls.
- Verify important AI-generated claims and citations.

## Related documentation

- [Use Prism AI with Ollama](local-models.md)
- [Organize research and create Markdown notes](research-workflow.md)
- [Write and compile LaTeX documents](latex-workflow.md)
- [Understand the static browser demo](browser-demo.md)
