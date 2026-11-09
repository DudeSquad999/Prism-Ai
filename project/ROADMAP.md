# Prism AI roadmap

Prism AI is an early-stage Windows research and writing workspace. This roadmap describes areas the project may improve; it is not a release schedule or a promise that a feature will ship. The published [3.1.0 release](../CHANGELOG.md) is the source of truth for what is available today.

## Product today

Prism has two companion Windows applications:

- **Prism Chat** organizes research projects, conversations, source material, and Markdown notes.
- **Prism Studio** supports LaTeX writing, project import and export, and PDF compilation.
- **The browser demo** is a separate, local-only preview with scripted examples. It does not connect to AI or search the web. See the [demo guide](../docs/browser-demo.md).

## Current validation gaps

These are known, tracked gaps in the current 3.1.0 release presentation and setup guidance. They are not claims that the features are broken; they identify what has not yet been independently verified.

- [Issue #37: Verify Ollama setup in Prism Chat and Prism Studio](https://github.com/DudeSquad999/Prism-Ai/issues/37) — record exact controls, model, connection checks, and live-response behavior separately for each app.
- [Issue #38: Capture verified Prism 3.1.0 Windows screenshots](https://github.com/DudeSquad999/Prism-Ai/issues/38) — the current gallery still uses clearly labelled v7.1 preview images until real release screenshots are captured.
- Repository automation checks browser-demo JavaScript syntax, Python repository-checker tests, and local Markdown/HTML/CSS references. These checks do not replace Windows-app testing.

The current [brand and positioning strategy](BRAND_POSITIONING.md) records the product's evidence-based message, competitor context, and name-confusion risk.

## Near-term focus

These are proposed priorities, not delivery commitments. Work should be selected from user feedback and issues, and each change should have a clear way to verify it.

| Area | Intended outcome | How to evaluate it |
|---|---|---|
| First-run clarity | Help new users understand Chat, Studio, and the difference between local and cloud AI setup. | A first-time user can choose an app and complete a small starter task using the installation guide. |
| Reliability | Make common setup, provider connection, and document compilation failures easier to understand and recover from. | Reproduce documented failure cases and verify that messages identify a practical next step. |
| Research workflow | Make it easier to keep conversations, source material, and notes together and review evidence before using it. | Users can find the source behind a claim and distinguish retrieved material from generated text. |
| Writing workflow | Keep drafting, reviewing changes, and compiling a document understandable as one workflow. | Users can inspect a proposed edit, choose whether to apply it, and verify the resulting PDF. |
| Browser demo | Keep the sample project, local persistence, import/export, and reset flow useful and clearly separate from live AI features. | Exercise the main workflows on desktop and mobile, including keyboard navigation and invalid imports. |
| Documentation | Keep setup and feature guides aligned with the released applications, and label preview material accurately. | Verify links and instructions against the current release before publishing documentation changes. |

## Product quality bar

For changes that touch content or user data:

- Explain what is local, what is sent to a configured provider, and when network access is required.
- Make important claims, citations, and AI-assisted edits easy to inspect rather than presenting them as verified by default.
- Give saved context, exports, and destructive actions clear user controls.
- Test accessibility, keyboard use, responsive layouts, and recovery from errors as part of the feature, not as follow-up polish.

## Longer-term exploration

The ideas below need a clear user need, feasibility check, and explicit product decision before implementation:

- Optional, user-controlled project memory with inspect, edit, export, and delete controls.
- Evidence review that displays supporting source context, publication details, and known limitations.
- Optional project sharing or collaboration with deliberate access and privacy controls.
- Repeatable evaluation of usefulness, clarity, citation quality, and failure cases across supported workflows.

## Not currently planned

- Representing the browser demo as a live AI product or factual verification service.
- Adding accounts, analytics, or server-side storage to the browser demo without a separate product and privacy decision.
- Publishing delivery dates or claiming exploratory features are committed.

## Contributing

Small, verifiable improvements to reliability, accessibility, documentation, and the research-to-writing workflow are welcome. Check the [open issues](https://github.com/DudeSquad999/Prism-Ai/issues) before starting larger work, and see [contribution guidance](../CONTRIBUTING.md) and the [security policy](../SECURITY.md).
