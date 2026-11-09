# Prism AI browser workspace

[Documentation home](README.md) · [Installation](installation.md) · [Ollama setup](local-models.md)

Open the [Prism AI browser workspace](https://dudesquad999.github.io/Prism-Ai/). It runs as a static GitHub Pages site and does not require a Prism account or a download.

## What works in the browser

- Create, rename, switch between, and delete research projects.
- Keep conversations, tasks, source notes, and Markdown drafts together.
- Connect directly to an Ollama server running on your computer.
- Discover the models installed in Ollama and choose which one powers Prism Chat.
- Stream real model responses in Ask, Research, Documents, and Create modes.
- Use the current project draft as context for document-focused requests.
- Build a Perspectives brief from analytical, creative, practical, and skeptical review prompts.
- Save work in browser storage and import or export versioned Prism project files.
- Switch between dark and light themes.

Without an active Ollama connection, Chat remains in clearly labeled sample mode. Sample responses are examples, not generated answers.

## Connect live AI with Ollama

The browser workspace uses the Ollama HTTP API directly from your browser. The model runs on your computer; Prism does not proxy prompts through a Prism backend and this page does not contain a cloud API key.

1. Install and open [Ollama for Windows](https://ollama.com/download/windows).
2. Install at least one model. Run `ollama list` in PowerShell to see models already installed.
3. Allow the hosted Prism website to make browser requests to Ollama. In PowerShell, run:

   ```powershell
   setx OLLAMA_ORIGINS "https://dudesquad999.github.io"
   ```

4. Quit Ollama from its system-tray icon, then start Ollama again so it reads the updated environment variable.
5. Open Prism, go to **Settings**, and select **Connect and find models**.
6. Choose one of the discovered models. Open Chat and send a message.

Ollama allows additional browser origins through `OLLAMA_ORIGINS`. Use the exact origin shown in your browser if Prism is hosted elsewhere. On Windows, Ollama reads user and system environment variables when it starts, so restart the application after changing the variable.

Official setup references: [Ollama server configuration and CORS origins](https://docs.ollama.com/faq#how-can-i-allow-additional-web-origins-to-access-ollama), [Ollama chat API](https://docs.ollama.com/api/chat), and [Ollama model list API](https://docs.ollama.com/api/tags).

## AI behavior and limits

- Ask, Research, Documents, and Create send messages to the selected Ollama model when connected.
- Documents and Create include the current project draft as context so the model can help revise or extend it.
- Research mode can help scope questions and review material you provide, but this browser workspace does not include a live web-search tool.
- Prism does not retrieve sources, verify citations, analyze uploaded documents, or make factual claims reliable by itself. Check important claims against original sources.
- AI output is streamed into the conversation. You decide what to keep and can edit the project draft before exporting it.

## Data and privacy

Projects, messages, tasks, and drafts are saved in this browser's local storage. The browser workspace does not upload those records to Prism.

When you use live chat, your prompt and recent conversation context are sent directly to the Ollama server address saved in Settings. If you configure a non-local server address, that server receives the request. Do not send confidential material unless you trust the configured server.

The AI connection settings contain only the Ollama URL, selected model name, and enabled state. The browser workspace does not ask for or store provider API keys. AI settings are not included in exported project JSON files.

Use **Settings → Export projects (JSON)** to back up project work. Use **Clear all data** to remove projects and AI connection settings from this browser. Clearing site data in the browser also removes locally saved work.

## Troubleshooting

- **Could not connect:** make sure Ollama is running and the address in Settings is correct.
- **Browser blocked the request:** check that the exact Prism website origin is included in `OLLAMA_ORIGINS`, then restart Ollama.
- **No models found:** install a model and select Connect and find models again.
- **Model not found:** reconnect to refresh the model list, then choose an installed model.
- **Slow responses:** the first request may take longer while Ollama loads the model. Smaller models usually respond faster on modest hardware.

## Use the Windows applications

For the full Windows applications, including the native research and LaTeX workflows, download the [latest Prism AI release](https://github.com/DudeSquad999/Prism-Ai/releases/latest) and follow the [installation guide](installation.md). The browser workspace is a companion preview and does not replace Prism Chat or Prism Studio.
