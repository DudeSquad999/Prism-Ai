# Project structure

This repository contains the public Prism AI project site, the static browser preview, user documentation, project planning notes, and repository-maintenance tools. It is not the complete source tree for the Windows applications. Check each published release for the downloadable assets and any version-specific source package; do not treat this repository's browser preview as the full Windows application.

## Repository map

| Location | Purpose | Maintenance notes |
|---|---|---|
| `index.html` | Root GitHub Pages entry point | Keep at the repository root. Moving it can break the published site. |
| `demo.js` | Browser-preview behavior and state | Main JavaScript entry point used by the root page. |
| `demo.css` | Browser-preview styles | Shared by the static preview pages. |
| `demo/` | Alternate browser-preview entry page | Keep relative asset paths working when editing it. |
| `docs/index.html` | Retained copy of the alternate preview entry page | Currently mirrors `demo/index.html`; update both together unless the deployment paths are deliberately consolidated. |
| `docs/` | Current user and setup documentation | Put new installation, workflow, and browser-preview guides here. |
| `docs/screenshots/` | Product-preview screenshots | The v7.1 images are illustrative previews, not verified 3.1.0 release screenshots. |
| `guides/` | Supporting and historical guides | Keep version-specific or test-report material clearly labeled. |
| `project/` | Product direction, roadmap, and planning notes | Mark proposals as proposals; do not present them as shipped features. |
| `.github/ISSUE_TEMPLATE/` | Structured issue forms | Keep bug reports and feature requests distinct. |
| `.github/workflows/` | Automated repository checks | Workflows should be read-only and avoid secrets unless a later feature demonstrably needs them. |
| `scripts/` | Small repository-maintenance utilities | Prefer Python's standard library; document each script's purpose and invocation. |
| `tests/` | Tests for repository tooling | Keep tests independent of live provider accounts and paid services. |
| `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` | Project entry point and repository policies | Keep the root README concise and link to detailed guides. |

## Important file-layout decisions

The root `index.html`, `demo.js`, and `demo.css` are kept at the root because the public Pages preview uses root-relative project assets. Do not move them into a new folder without changing and testing the Pages configuration and every dependent URL.

The files `demo/index.html` and `docs/index.html` currently contain the same alternate preview page. They are retained for existing paths; changes to that page should be applied to both copies until the published routes have been checked and one copy can safely be retired.

The root-level `v71_chat_1440x900_dark.png` is a duplicate of the canonical image in `docs/screenshots/`. New screenshot references should use the copy under `docs/screenshots/`. Do not add more screenshots to the repository root.

## Where new work belongs

- **User instructions:** `docs/`
- **Product roadmap and design notes:** `project/`
- **Test reports and archived release guides:** `guides/`
- **Static browser-preview code:** keep the current Pages entry files and their referenced assets in their existing locations until a tested migration is planned.
- **Repository checks:** `scripts/` with tests in `tests/`
- **GitHub contribution workflow:** `.github/`

## Change checklist

Before moving, renaming, or deleting a file:

1. Search the repository for references to its current path.
2. Check whether GitHub Pages, a release package, or an external link depends on it.
3. Update all affected links and relative asset paths in the same change.
4. Run the repository quality checks and test the affected page.
5. Keep historical screenshots and release evidence clearly labeled rather than silently replacing them.

## Local quality checks

The repository uses Node.js for a syntax-only check of the browser demo and Python's standard library for its lightweight maintenance checks. From the repository root, run:

```powershell
node --check demo.js
python -m unittest discover -s tests -v
python scripts/check_repo.py
```

These checks validate the repository tooling and detect broken local Markdown, HTML, and CSS references. They do not replace manual browser testing or Windows-application testing.
