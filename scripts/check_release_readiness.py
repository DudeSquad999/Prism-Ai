#!/usr/bin/env python3
"""Validate public-facing release-readiness requirements for Prism AI."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
EMOJI = re.compile("[\U0001F300-\U0001FAFF\u2600-\u27BF]")
IMAGE_SOURCE = re.compile(r'<img\b[^>]*\bsrc=["\']([^"\']+)["\']', re.IGNORECASE)
INSTALLER_COMMAND = re.compile(
    r"(?m)^\s*irm\s+https://raw\.githubusercontent\.com/"
    r"DudeSquad999/Prism-Ai/Main/scripts/install\.ps1\s+\|\s*iex\s*$"
)


def require(condition: bool, message: str, errors: list[str]) -> None:
    if not condition:
        errors.append(message)


def has_windows_installer(readme: str) -> bool:
    return INSTALLER_COMMAND.search(readme) is not None


def has_trusted_shields_badge(readme: str) -> bool:
    for candidate in IMAGE_SOURCE.findall(readme):
        try:
            parsed = urlsplit(candidate)
        except ValueError:
            continue
        if (
            parsed.scheme == "https"
            and parsed.hostname is not None
            and parsed.hostname.casefold() == "img.shields.io"
            and parsed.username is None
            and parsed.password is None
        ):
            return True
    return False


def main() -> int:
    errors: list[str] = []
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    nonempty = [line.strip() for line in readme.splitlines() if line.strip()]

    require(len(nonempty) >= 2, "README must contain a title and description.", errors)
    if len(nonempty) >= 2:
        require(nonempty[0] == "# Prism AI", "README must start with the Prism AI H1 title.", errors)
        require(
            len(nonempty[1]) < 120 and not nonempty[1].startswith("#"),
            "README must have a plain one-line description under 120 characters after the title.",
            errors,
        )

    require(has_windows_installer(readme), "README must document the pinned one-command PowerShell installer.", errors)

    banner_path = ROOT / "prism-banner.png"
    require(banner_path.is_file(), "Root prism-banner.png is missing.", errors)
    require(
        any("prism-banner.png" in source for source in IMAGE_SOURCE.findall(readme)),
        "README must embed the root prism-banner.png image.",
        errors,
    )
    require(has_trusted_shields_badge(readme), "README must include an HTTPS image hosted by img.shields.io.", errors)
    require("License: MIT" in readme or "MIT license" in readme, "README must identify the repository's MIT license.", errors)

    license_text = (ROOT / "LICENSE").read_text(encoding="utf-8")
    require(license_text.startswith("MIT License"), "Root LICENSE must contain the repository's existing MIT License.", errors)

    require((ROOT / ".github/workflows/ci.yml").is_file(), "The requested .github/workflows/ci.yml workflow is missing.", errors)
    require((ROOT / ".github/ISSUE_TEMPLATE/bug_report.yml").is_file(), "Bug report YAML form is missing.", errors)
    require((ROOT / ".github/ISSUE_TEMPLATE/feature_request.yml").is_file(), "Feature request YAML form is missing.", errors)

    first_issues = (ROOT / "docs/good-first-issues.md").read_text(encoding="utf-8")
    issue_count = len(re.findall(r"^### \d+\.", first_issues, flags=re.MULTILINE))
    require(3 <= issue_count <= 5, "Good first issues must define three to five scoped tasks.", errors)

    support = (ROOT / "docs/support.md").read_text(encoding="utf-8").lower()
    require("24 hours" in support and "acknowledge" in support, "Support policy must state the 24-hour acknowledgement commitment.", errors)

    install = (ROOT / "scripts/install.ps1").read_text(encoding="utf-8")
    require(
        "Get-FileHash" in install
        and "36b261bff2efb42195aa137d50f38cd81c7901f8c9aa78bbb761b5fb4f5947c9" in install,
        "Installer must verify the published v3.1.0 SHA-256 digest.",
        errors,
    )

    testing = (ROOT / "guides/TESTING.md").read_text(encoding="utf-8")
    require("<details>" in testing and "</details>" in testing, "The long test report must be preserved inside a details section.", errors)

    release_notes = ROOT / "docs/releases/v1.0.0.md"
    require(release_notes.is_file(), "Historical v1.0.0 release notes are missing.", errors)
    if release_notes.is_file():
        require("historical" in release_notes.read_text(encoding="utf-8").lower(), "v1.0.0 notes must identify the release as historical.", errors)

    docs = sorted(ROOT.rglob("*.md"))
    for path in docs:
        if any(part in {".git", "node_modules", ".venv", "venv"} for part in path.parts):
            continue
        content = path.read_text(encoding="utf-8")
        relative = path.relative_to(ROOT)
        require("—" not in content, f"{relative} contains an em dash.", errors)
        require(EMOJI.search(content) is None, f"{relative} contains an emoji.", errors)

    if errors:
        print("Release-readiness checks failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Release-readiness checks passed across {len(docs)} Markdown files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
