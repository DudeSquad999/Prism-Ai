# Install Prism AI on Windows

Prism AI is a local-first AI research and writing workspace for Windows. It includes Prism Chat for research and Markdown workflows and Prism Studio for AI-assisted LaTeX writing.

## Requirements

- Windows
- Sufficient disk space for the installer and any local models you choose to use
- Internet access for the initial download and, in some cases, first-time TeX package downloads
- A configured local model or cloud provider for live AI features

## Install from a release

1. Open the [latest release](https://github.com/DudeSquad999/Prism-Ai/releases/latest).
2. Under **Assets**, download the Windows `.exe` installer.
3. Run the installer.
4. Follow the setup prompts.
5. Launch **Prism Chat** or **Prism Studio** from the installed shortcuts.

Do not download the source-code ZIP if you only want to run the applications. The source package is intended for developers, contributors, and users who want to inspect or modify the project.

## Configure AI

Prism AI can use a local model or a cloud provider.

### Use a local model with Ollama

1. Install Ollama.
2. Download a model supported by your hardware.
3. Open Prism AI settings.
4. Select Ollama and choose your configured local model.

Local-model performance depends on your hardware, the selected model, and available memory.

### Use a cloud provider

Prism AI can be configured with your own API key for Google Gemini, Anthropic, or OpenAI.

When you use a cloud provider, content included in your request is sent to that provider. Provider availability, pricing, data handling, and usage limits depend on your account and provider configuration.

## Troubleshooting

### Live AI features are unavailable

Confirm that you have configured either:

- A local model through Ollama, or
- A cloud provider with a valid API key.

### PDF compilation fails

Confirm that a TeX engine is configured. Prism Studio uses Tectonic for PDF compilation. First-time package downloads may require internet access.

### Installation or startup problems

Open a [GitHub issue](https://github.com/DudeSquad999/Prism-Ai/issues) and include:

- The application: Prism Chat, Prism Studio, or the Windows installer
- Your Windows version
- The installation method
- The AI provider or local model you configured
- Steps to reproduce the problem
- Expected behavior and actual behavior
- Relevant error messages or screenshots

Remove API keys, private research, and personal information before submitting.
