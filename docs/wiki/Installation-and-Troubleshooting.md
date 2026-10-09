# Installation and troubleshooting

## Install Prism Chat and Prism Studio

1. Open the [latest release](https://github.com/DudeSquad999/Prism-Ai/releases/latest).
2. Read the release notes.
3. Under **Assets**, download the Windows package. Do not choose a source-code ZIP when you want the packaged applications.
4. Extract the ZIP before running anything inside it.
5. Read the included `READ ME FIRST.txt`, if present, and follow instructions for that exact release.
6. Run the documented installer and follow its prompts.
7. Configure an AI provider or local model if you want live AI features.

Use [GETTING_STARTED.md](../../GETTING_STARTED.md) for the maintained setup guide. Use the actual filename shown under Assets and report mismatches.

## The app does not start

- Confirm that you extracted the ZIP rather than running files from inside the archive.
- Read the release-specific setup notes.
- Keep a terminal window open if the app instructions require it.
- Record the exact error message and app version.
- Do not download replacement installers or DLLs from untrusted sites.

## AI responses are unavailable

- Confirm a provider or local model is configured.
- For cloud AI, check the provider's account status, API key configuration, quota, and billing.
- For Ollama, confirm it is installed, the intended model is downloaded, and its local service is running.
- Never share your API key in an issue, screenshot, or discussion.

A demo/offline fallback is not equivalent to a live AI model.

## PDF compilation fails in Prism Studio

PDF compilation requires a working TeX engine configured for the application. Check the release's setup instructions and record the exact error and engine version.

## The static demo is not responding like an AI

That is expected. The root `index.html`, `styles.css`, and `app.js` form a visual demo with fixed example content. The question field is display-only; it does not call a model or generate new answers.

## What to include in a bug report

- Component: static demo, Prism Chat, Prism Studio, Windows setup, or docs.
- Release version and package filename, or source commit for the demo.
- Windows and browser versions when relevant.
- Steps to reproduce, expected result, and actual result.
- Sanitized errors or screenshots.

Remove usernames, private paths, personal content, credentials, and API keys before posting.
