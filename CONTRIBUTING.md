# Contributing to Prism AI

Before participating, please read the [Code of Conduct](CODE_OF_CONDUCT.md). For help choosing between a discussion, bug report, feature request, and pull request, see the [Community Guide](docs/COMMUNITY_GUIDE.md).

## Understand the project first

Read the [README](README.md) for the project overview and repository map.

- The root `index.html`, `styles.css`, and `app.js` are a static interface demo with prewritten content, not a live AI application.
- The Windows release notes describe separately packaged Prism Chat and Prism Studio applications. Use [Getting Started](GETTING_STARTED.md) for release setup instructions.
- The [design goals](Prism-Ai-How-I-Want-It-To-Work.md) and [roadmap](ROADMAP.md) describe intended direction, not proof that features are implemented.

Do not substitute changes to the demo for changes to the packaged applications. For application or installer work, identify the actual source files and matching release version first. If the source is not available in the repository, raise that gap in an issue rather than guessing or recreating the application.

## Report a bug or suggest an improvement

Use the repository's bug-report or feature-request form. Identify the component and version. Keep each issue focused on one problem or closely related set of changes.

Never post API keys, credentials, private conversations, or personal project data. Sanitize logs and screenshots before sharing.

## Keep changes small and understandable

1. Check existing issues and pull requests for related work.
2. Create a branch for the change.
3. Preserve the existing appearance and behavior unless the change explicitly calls for otherwise.
4. Avoid unrelated renaming, file moves, dependency updates, or large rewrites.
5. Update documentation when setup or user-visible behavior changes.
6. Open a pull request explaining the problem, solution, affected files, and verification performed.

If a change affects imports, asset paths, installer paths, or saved data, check those dependencies before moving or renaming files.

## Verification

For static demo changes, open `index.html` in a browser and check the interactions you changed, keyboard navigation, narrow-window layout, and browser console. Record the browser used and actual results; do not claim checks you did not perform.

For Windows application or installer changes, use [TESTING.md](TESTING.md). Record the Windows version, release or source commit, tested provider where relevant, and PASS, FAIL, or NOT TESTED results. A checklist alone is not evidence that the application works.

Do not test destructive changes with personal project data. For release packaging, confirm that the documented version, attached filename, setup instructions, and source reference agree.

## Pull request checklist

- [ ] The component and reason for the change are clear.
- [ ] Changes are limited to the intended scope.
- [ ] No secrets or private data are included.
- [ ] Relevant documentation is updated.
- [ ] Actual test results and untested areas are recorded.
- [ ] Any behavior change or remaining limitation is disclosed.

## Security and privacy

Never commit API keys, credentials, private conversations, or real user data. For a possible vulnerability, follow [SECURITY.md](SECURITY.md) rather than posting exploit details publicly.

## License

Review [LICENSE](LICENSE) before contributing.
