# Prism AI 3.1.0 — Test Report

Status: PARTIALLY TESTED

This report separates maintainer-reported Windows checks from a supplied
development report covering Linux, browser automation, and Wine.

Results apply only to the environments and checks described here.
They do not establish that every feature works on Windows.

## Test environments

| Environment | Recorded details |
| --- | --- |
| Real Windows | Windows 11 Home; Prism v3.1.0; checks reported by the project maintainer |
| Development | Linux sandbox; Python 3.14.3 |
| Windows compatibility testing | Wine 10.0; installer reportedly bundles Python 3.12.10 |
| Development source | Reported as `release/v3.1`, three commits above baseline `e0eef48`; exact branch-tip commit not supplied |

The exact Windows installer filename used, package hash, test date,
and matching source commit were not recorded.

The Linux/Wine results below come from the supplied development report.
They have not been independently reproduced for this document.
The tested development build has not been confirmed to match the
installed Windows package.

## 1. Real Windows results

| Check | Result | Scope |
| --- | --- | --- |
| Installation and Prism Chat launch | PASS — maintainer reported | Installation options and warning behavior were not recorded |
| Chat conversation persistence | PASS — maintainer reported | A conversation and message remained visible after closing and reopening Chat |

These checks do not verify live AI, project persistence, Prism Studio,
PDF compilation, upgrades, or other Windows behavior.

## 2. Automated development checks

All results in this section are reported from the development environment.

| Check | Reported result |
| --- | --- |
| JavaScript syntax: Chat, Studio, shared UI | PASS |
| Python syntax/imports: launcher and new modules | PASS |
| Package audit | PASS — 5,183 files inspected |
| Wheels match `requirements-lock.txt` | PASS — 29 Windows cp312 packages |
| Brand consistency | PASS — checked against `brand/prism-mark.svg` |
| Chat unit/API tests | 146 passed, 1 skipped |
| Studio unit/API tests | 15 passed, including Tectonic compilation on Linux |

The skipped Chat test required an unavailable original 2.x database.

The package audit reportedly checked for excluded private/development
files and required runtime files. It is not a security guarantee.

Reported automated coverage included:

- Connect AI configuration and error handling.
- Launcher startup, reuse, status, shutdown, restart, and port fallback.
- Chat-to-Studio preview, confirmation, conversion, and handoff.
- Stale-draft refusal and protection against overwriting.
- Studio project-origin persistence.
- Brand consistency.

### Mocked provider checks

A fake AI server reportedly exercised invalid keys, missing models,
rate limits, timeouts, server failures, unreachable services, model
listing, and download progress/cancellation.

Passing mocked checks does not prove that a live provider works.

## 3. Live services

These results were reported on Linux, not Windows.

| Check | Reported result | Limitation |
| --- | --- | --- |
| Ollama 0.40.1 model download through Prism | PASS — `qwen2.5:0.5b`, approximately 398 MB | Linux Ollama only |
| Ollama connection, missing-model error, chat and follow-up | PASS — 3 tests | Does not verify Ollama for Windows |
| Connect AI wizard with real Ollama | PASS — detected service, listed model, sent test message, displayed “AI ready” | Development environment only |
| Gemini, OpenAI, Anthropic with real keys | NOT RUN | Live cloud connections remain unverified |
| Research with live Wikipedia/Crossref and scripted AI output | Invented quote was marked “Quote not found — unsupported” | One observed case, not a general accuracy evaluation |

Quote matching checks whether text appears in retrieved material.
It does not establish that the source or broader claim is correct.

## 4. Browser checks

Chromium/Playwright checks reportedly covered:

- First run and Connect AI screens.
- Chat, research, sources, Settings, and Diagnostics.
- Draft creation and AI edit comparison.
- Chat-to-Studio preview, creation, and opening.
- Studio editor, PDF view, and compilation errors.
- Dark/light themes and widths of 360, 400, 640, and 900 pixels.

No browser console errors were reported in those checks.

Reported fixes:

- Header overlap at narrow widths.
- Missing checklist bullets after LaTeX conversion.
- Duplicate draft titles after conversion.

Studio assistant diff cards were not visually captured. The report
states that related behavior was covered by Studio unit tests.

Screenshot paths in the development report:
`screenshots/before`, `screenshots/after`, and `screenshots/compare`.
Their availability in the public repository has not been confirmed here.

## 5. Installer checks under Wine 10.0

Wine results are not equivalent to real-Windows results.

| Check | Reported result |
| --- | --- |
| Silent fresh installation and shortcut targets | PASS |
| Upgrade from 3.0.0, old-file cleanup, data retention, automatic backup | PASS |
| Background startup | PASS after fix |
| Starting another copy reuses the running instance | PASS |
| Status, Diagnostics, packaged favicon, Chat UI | PASS |
| Chat-to-Studio handoff | PASS |
| Exit stops servers and releases the running instance | PASS after fix |
| Uninstall removes program files/shortcuts and retains data | PASS |
| Tray icon | NOT VERIFIED — failed to display under headless Wine |

The report describes fixes for a startup hang during concurrent
`platform.system()` calls and a helper thread preventing shutdown.
Those diagnoses and fixes have not been independently reproduced here.

## 6. Remaining validation

No specific real-Windows result is recorded for:

- SmartScreen, Windows Defender, tray behavior, or error dialogs.
- Console-free background-launch details.
- Running-app detection during install/uninstall and file locking.
- Upgrades, backups, and uninstallation.
- Prism Studio launch, document persistence, and PDF compilation.
- Tectonic first-time package downloads.
- Ollama installation, connection, or GPU detection on Windows.
- Screen readers or high-DPI scaling.

Live cloud-provider requests also remain untested.

The development report records a Tectonic package-download failure
under Wine during 3.0 testing. That path was not retested under Wine
in 3.1 and does not establish behavior on real Windows.

## 7. Adding test results

For each new result, record:

- Application version and exact package filename.
- Package hash and matching source commit, when available.
- Operating system, relevant hardware, test date, and tester.
- Provider/model, if applicable.
- Steps performed and expected versus actual behavior.
- PASS, FAIL, or NOT TESTED.
- Sanitized errors or an issue link.

Do not mark a check as passed solely because it appears in release
notes or passed in a different environment.

Never publish credentials, private conversations, personal research,
or sensitive information in logs, screenshots, or test reports.

## Related instructions

For v3.1.0, the listed Windows installer is
`Prism-3.1.0-Setup.exe`; no ZIP extraction is required.
For later releases, follow their accompanying instructions.

- [Windows installation](../docs/installation.md)
- [Ollama setup](../docs/local-models.md)
- [Contributing](../CONTRIBUTING.md)
- [Releases](https://github.com/DudeSquad999/Prism-Ai/releases)
