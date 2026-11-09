# Contributing to Prism AI

Thanks for your interest in improving Prism AI.

Useful contributions include documentation fixes, reproducible bug
reports, setup feedback, browser-preview improvements, and focused
code changes.

## Understand the project first

Read the [README](README.md) before starting.

Prism AI includes two Windows applications:

- Prism Chat for research and Markdown workflows.
- Prism Studio for AI-assisted LaTeX writing.

The public browser preview is served from the repository root: `index.html`, `demo.js`, and `demo.css`. The `demo/` folder contains an alternate entry page that reuses the root assets. The `docs/` folder contains user documentation and currently retains a matching copy of that alternate entry page. Changes to the browser preview do not change the Windows applications.

## Choose a contribution

### Documentation and setup feedback

You can help by:

- Fixing unclear or incorrect instructions.
- Reporting broken links.
- Identifying missing installation steps.
- Documenting errors you encountered and how you resolved them.

Check instructions against the actual application where possible.
Do not present a planned feature or an untested step as working.

### Bug reports

Check [existing issues](https://github.com/DudeSquad999/Prism-Ai/issues)
before opening a new report.

Use the bug-report form when available. Include:

- The affected component: installer, Prism Chat, Prism Studio,
  browser preview, or documentation.
- The application version, if applicable.
- Steps to reproduce the problem.
- Expected behavior.
- Actual behavior.
- Relevant error messages.
- What you have already tried.

Never post API keys, credentials, private conversations, private
research, or personal information.

For security vulnerabilities, follow [SECURITY.md](SECURITY.md)
rather than opening a public issue.

### Feature suggestions

Use the feature-request form when available.

Explain:

- The task you are trying to complete.
- What currently prevents or complicates that task.
- Your proposed improvement.
- Any workaround you currently use.

Describe the problem before proposing a large implementation.

### Browser-preview changes

The public GitHub Pages preview is served from the repository root:

- `index.html` contains the published page structure.
- `demo.js` contains preview behavior and browser-local state.
- `demo.css` contains the preview styles.

The `demo/index.html` file is an alternate entry page that reuses
the root assets. `docs/index.html` is a retained copy of that
alternate page. For behavior or styling changes, edit the root
`demo.js` or `demo.css`. If you deliberately change the alternate
page markup, keep its two HTML copies synchronized. Read
[`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) before
moving or duplicating preview files.

Keep the preview clearly distinguished from the live Windows
applications. Do not imply that fixed example responses are live
AI output.

### Windows-application changes

The complete Windows application source is not stored in this repository's static browser-preview code. Check the [published releases](https://github.com/DudeSquad999/Prism-Ai/releases) for the downloadable build and any version-specific source package; available assets can differ by release. Editing this browser preview does not modify the installed applications.

Before starting a Windows-app code change, open an issue to confirm:

- Which source version to use.
- How to build and run the affected application.
- Where the change should be submitted for review.
- Which tests are required.

This guide does not yet provide a complete Windows-app
build-and-submit workflow. Do not assume that editing the static
browser preview updates either Windows application.

## Keep changes focused

1. Check existing issues and pull requests.
2. Make one small, clear change at a time.
3. Avoid unrelated renaming, file moves, and rewrites.
4. Update documentation when setup or behavior changes.
5. Explain what you changed and why.
6. State what you actually tested and what remains untested.

Discuss substantial changes in an issue before investing time in
implementation.

## Testing

### Documentation

Check that:

- Links point to the intended destinations.
- File paths and download names are correct.
- Instructions distinguish verified behavior from untested steps.
- Screenshots and examples do not expose private information.

Reading instructions is not the same as successfully following them.
State whether you tested them in the application.

### Browser preview

Open `demo/index.html` in a browser and check the behavior you changed.

Include the browser you used and the checks you performed.

### Windows applications

Consult [TESTING.md](guides/TESTING.md).

If the instructions are missing or insufficient for your proposed
change, ask for clarification in the issue before proceeding.

Record only checks you actually performed. Do not claim that a
feature works merely because it appears in the README or release notes.

### Repository checks

This repository includes a browser-demo JavaScript syntax check, a local-reference checker, and unit tests for that checker. From the repository root, run:

```powershell
node --check demo.js
python -m unittest discover -s tests -v
python scripts/check_repo.py
```

The checker validates relative Markdown links and local HTML/CSS asset references. It does not test external website availability, browser behavior, or Windows application functionality.

## Submitting a pull request

A pull request proposes a change for review.

For changes made in this repository, include:

- A short explanation of the problem.
- A summary of your changes.
- A link to the related issue, if any.
- The checks you performed and their results.
- Any known limitations or untested behavior.

For Windows-app changes, confirm the submission process in an issue
first, as described above.

## License

Review [LICENSE](LICENSE) before contributing.
