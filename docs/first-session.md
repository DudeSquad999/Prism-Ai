# Your first Prism AI session

This guide helps you decide whether Prism fits your workflow and gives you a practical first task to try.

Prism AI is an early-stage Windows research and writing workspace with two companion applications:

- **Prism Chat** organizes research projects, conversations, source material, and Markdown notes.
- **Prism Studio** supports LaTeX papers and presentations, reviewable AI-proposed edits, references, and PDF compilation.

## 1. Explore before installing

Open the [Prism AI browser preview](https://dudesquad999.github.io/Prism-Ai/).

You can explore a sample workspace without installing the Windows applications or creating an account. Try creating a sample project, editing a Markdown draft, managing tasks, or exporting demo data.

**Important:** The browser preview uses fictional sample sources and scripted replies. It does not connect to an AI model, search the web, verify citations, or upload your work. It demonstrates the interface and selected interactions, not live AI functionality. See the [browser demo guide](browser-demo.md) for details.

## 2. Install the Windows applications

When you're ready to try the installed software:

1. Open the [Prism AI releases](https://github.com/DudeSquad999/Prism-Ai/releases/latest).
2. Download the Windows `.exe` installer from the release assets. The source-code ZIP and tar archives are not installers.
3. Run the installer and launch Prism Chat or Prism Studio.
4. Follow the [Windows installation guide](installation.md) if you need setup or troubleshooting help.

The current documented public release is **3.1.0**. Check the release page for the actual latest published version before downloading.

## 3. Choose the right workspace

| Start in | Use it for |
|---|---|
| **Prism Chat** | Research projects, conversations, retrieved source material, and Markdown notes |
| **Prism Studio** | LaTeX papers, articles, Beamer presentations, references, and PDF compilation |

You can read the [research workflow](research-workflow.md) and [LaTeX workflow](latex-workflow.md) for more detail.

## 4. Configure live AI

Live AI features require either a local model through Ollama or your own API key for a supported cloud provider.

- For local inference, follow [Use Prism AI with Ollama](local-models.md).
- For cloud AI, use your own supported provider account and API key. The installation guide lists the providers documented for the current release.

Configure the provider separately in each application you use. Do not assume that configuring Prism Chat also configures Prism Studio.

The exact Ollama controls and a tested model recommendation are still being documented. See [issue #37](https://github.com/DudeSquad999/Prism-Ai/issues/37) for the open documentation task. Do not rely on an untested model recommendation.

## 5. Complete one small workflow

Use non-sensitive sample content for your first attempt.

1. In **Prism Chat**, create a project around one focused question.
2. Explore the available source cards and citation markers. Open original sources and check whether they actually support the claims you plan to use.
3. Create and save a short Markdown note with the most useful points.
4. In **Prism Studio**, start a small paper or presentation from a blank document or template.
5. Review any AI-proposed edits before applying them. Check references and compile a small PDF with Tectonic.

This is a suggested way to evaluate the two applications. It does not imply that Chat automatically transfers a project into Studio.

## 6. Check the result

Before relying on your work:

- Verify important claims against the original sources.
- Check that references point to the intended publications.
- Read AI-proposed changes before accepting them.
- Confirm PDF compilation succeeds independently of the AI connection.

A successful demo response is not proof that a live model is connected. Prism Chat can show offline demo behavior when live AI is unavailable.

## 7. Share useful feedback

Prism is an early-stage independent project. Clear feedback is more useful than a general rating.

[Open a bug report or feature request](https://github.com/DudeSquad999/Prism-Ai/issues) and include:

- Which application you used: Prism Chat, Prism Studio, or the browser preview.
- Your Prism version and Windows version, when relevant.
- What you were trying to do.
- What you expected and what actually happened.
- Steps to reproduce the problem and any error message.

Never include API keys, passwords, private research, or unnecessary personal information in a public issue.

You can also [join the Prism AI community on Reddit](https://www.reddit.com/r/PrismAIApp/) to share workflows and discuss improvements.

## Related guides

- [Windows installation and troubleshooting](installation.md)
- [Browser demo behavior and privacy](browser-demo.md)
- [Ollama and local models](local-models.md)
- [Research and Markdown workflow](research-workflow.md)
- [LaTeX writing workflow](latex-workflow.md)
- [Project changelog](../CHANGELOG.md)
