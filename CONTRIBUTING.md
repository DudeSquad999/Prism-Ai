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

The `demo/` folder contains a separate static browser preview.
Changing that folder does not change the Windows applications.

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

The static preview files are in `demo/`.

Keep the preview clearly distinguished from the live Windows
applications. Do not imply that fixed example responses are live
AI output.

### Windows-application changes

The v3.1.0 release lists the application source package as
`Prism-3.1.0-source.zip`.

See [Releases](https://github.com/DudeSquad999/Prism-Ai/releases)
for the package and its accompanying instructions.

The source package and the repository's `demo/` folder serve
different purposes.

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
