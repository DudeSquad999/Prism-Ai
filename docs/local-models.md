# Use Prism AI with Ollama and local models

Prism AI supports local models through Ollama. When configured to use a local model, model inference the processing that generates AI responses runs on your computer rather than at a cloud AI provider.

Local AI configuration is separate from installing the Prism Windows applications.

## Before you start

You will need:

- Prism AI installed on Windows. See the [installation guide](installation.md).
- Ollama installed on the computer that will run the model.
- Enough memory and storage for your selected model.
- Internet access to download Ollama and the model initially.

Hardware requirements depend on the model. This guide does not specify a tested model or minimum memory requirement.

## 1. Install Ollama

Download Ollama from its website:

https://ollama.com/

Follow its installation instructions, then start Ollama.

## 2. Download a local model

Use Ollama's instructions to download a model suitable for your hardware.

Keep a note of the exact model name, including any version or size tag. You may need that name when configuring Prism.

Downloading a model and connecting Prism to it are separate steps. Having Ollama installed does not, by itself, mean Prism is using it.

## 3. Configure Prism to use Ollama

Open the Prism application you intend to use: Prism Chat or Prism Studio.

In its AI configuration controls:

1. Select Ollama as the provider.
2. Select or enter the model you downloaded.
3. Save or apply the configuration if the application requires it.

The exact settings location, field names, and save controls are not yet documented in this guide.

Do not assume that configuring Prism Chat also configures Prism Studio. Check the configuration in each application you use.

## 4. Check the connection in Prism Chat

Start with a short request using non-sensitive sample content, such as:

> Write one sentence explaining what Markdown is.

Check whether the application reports a connection error or produces a live response.

Prism Chat includes an offline demo fallback when live AI is unavailable. A demo response does not confirm that Ollama is connected.

If the application does not clearly distinguish a live response from demo content, do not treat the response alone as proof of a successful connection. Include that uncertainty when reporting a setup problem.

## Troubleshooting

### The downloaded model is not available in Prism

Check that:

- Ollama is running.
- The model download completed.
- You selected Ollama rather than a cloud provider.
- The model name entered in Prism matches the downloaded model.

Record any error message shown by Prism or Ollama.

### Prism Chat shows demo content

Prism Chat can fall back to offline demo behavior when live AI is unavailable.

Check your Ollama configuration. Demo content does not establish that your local model is connected.

### Responses are slow

Performance depends on:

- Your CPU, GPU, and available memory.
- The selected model.
- The amount of conversation history or document content included.
- Other applications using your computer's resources.

A smaller model or shorter request may reduce resource requirements, but performance and response quality will vary.

### Prism Studio cannot compile a PDF

Ollama configuration and PDF compilation are separate.

Prism Studio uses Tectonic for PDF compilation. A working local model does not establish that the TeX engine is configured correctly.

See the [installation guide](installation.md) for the PDF troubleshooting section.

### You still need help

Open a [GitHub issue](https://github.com/DudeSquad999/Prism-Ai/issues) with:

```text
Prism version:
Application: Prism Chat / Prism Studio
Windows version:
Ollama version:
Exact model name:

Steps taken:
1.
2.
3.

Expected result:

Actual result:

Error message:
```

Remove private content, API keys, personal information, and private file paths before posting.

## Privacy and internet access

Using a local model means model inference runs on your computer. It does not mean every Prism feature works offline.

Research retrieval, initial model downloads, and first-time TeX package downloads may require internet access.

If you switch to a cloud AI provider, content included in those requests is sent to that provider.

You remain responsible for the security of your computer, installed software, credentials, and project files. Do not share sensitive material in public issues, screenshots, or logs.

## Documentation status

This guide describes the general setup sequence.

It does not yet provide:

- A tested model recommendation.
- Verified minimum hardware requirements.
- Exact Ollama configuration controls for each Prism application.
- A confirmed application-specific connection test.

These details should be added after testing the released Windows applications.
