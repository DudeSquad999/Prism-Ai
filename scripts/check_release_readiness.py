#!/usr/bin/env python3
"""Validate the public-facing release-readiness requirements for Prism AI."""

from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EMOJI = re.compile(r"[\U0001F300-\U0001FAFF\U00002600-\U000027BF]")


def require(condition: bool, message: str, errors: list[str]) -> None:
    if not condition:
        errors.append(message)


def main() -> int:
    errors: list[str] = []
    readme_path = ROOT / "README.md"
    readme = readme_path.read_text(encoding="utf-8")
    nonempty = [line.strip() for line in readme.splitlines() if line.strip()]

    require(len(nonempty) >= 5, "README must start with five required content lines.", errors)
    if len(nonempty) >= 5:
        require(nonempty[0] == "# Prism AI", "README line 1 must be the H1 project title.", errors)
        require(len(nonempty[1]) < 120 and not nonempty[1].startswith("#"), "README line 2 must be a plain one-line description under 120 characters.", errors)
        require("irm " in nonempty[2] and "| iex" in nonempty[2], "README line 3 must contain the one-command PowerShell installer.", errors)
        require("assets/images/banner.svg" in nonempty[3], "README line 4 must show the vector banner.", errors)
        require("shields.io" in nonempty[4], "README line 5 must contain the centered Shields.io badges.", errors)
        require(len([line for line in readme.splitlines()[:5] if line.strip()]) == 5, "The required README title, description, installer, banner, and badges must occupy the first five lines.", errors)

    banner_path = ROOT / "assets/images/banner.svg"
    require(banner_path.is_file(), "assets/images/banner.svg is missing.", errors)
    if banner_path.is_file():
        try:
            svg = ET.parse(banner_path).getroot()
            require(svg.attrib.get("width") == "1200", "Banner width must be 1200.", errors)
            require(svg.attrib.get("height") == "400", "Banner height must be 400.", errors)
            require(svg.attrib.get("viewBox") == "0 0 1200 400", "Banner viewBox must be 0 0 1200 400.", errors)
        except ET.ParseError:
            errors.append("Banner SVG is not well-formed XML.")

    license_text = (ROOT / "LICENSE").read_text(encoding="utf-8")
    require("Apache License" in license_text and "Version 2.0" in license_text, "Root LICENSE must contain Apache License 2.0.", errors)
    require((ROOT / ".github/workflows/ci.yml").is_file(), "The requested .github/workflows/ci.yml workflow is missing.", errors)
    require((ROOT / ".github/ISSUE_TEMPLATE/bug_report.yml").is_file(), "Bug report YAML form is missing.", errors)
    require((ROOT / ".github/ISSUE_TEMPLATE/feature_request.yml").is_file(), "Feature request YAML form is missing.", errors)

    first_issues = (ROOT / "docs/good-first-issues.md").read_text(encoding="utf-8")
    issue_count = len(re.findall(r"^### \d+\.", first_issues, flags=re.MULTILINE))
    require(3 <= issue_count <= 5, "Good first issues must define three to five scoped tasks.", errors)

    support = (ROOT / "docs/support.md").read_text(encoding="utf-8").lower()
    require("24 hours" in support and "acknowledge" in support, "Support policy must state the 24-hour acknowledgement commitment.", errors)

    install = (ROOT / "scripts/install.ps1").read_text(encoding="utf-8")
    require("Get-FileHash" in install and "36b261bff2efb42195aa137d50f38cd81c7901f8c9aa78bbb761b5fb4f5947c9" in install, "Installer must verify the published v3.1.0 SHA-256 digest.", errors)

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
