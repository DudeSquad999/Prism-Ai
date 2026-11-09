#!/usr/bin/env python3
"""Validate release-facing repository invariants without changing project files."""

from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EM_DASH = "\u2014"
EMOJI = re.compile(r"[\U0001F000-\U0001FAFF\u2600-\u27BF]")


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)


def main() -> int:
    errors: list[str] = []
    readme_path = ROOT / "README.md"
    readme = readme_path.read_text(encoding="utf-8")
    lines = readme.splitlines()

    if len(lines) < 7 or lines[0] != "# Prism AI":
        fail("README must begin with the Prism AI H1 title.", errors)
    if len(lines) < 2 or len(lines[1]) >= 120 or lines[1].startswith("#"):
        fail("README line 2 must be a plain one-line description under 120 characters.", errors)
    if len(lines) < 3 or not lines[2].startswith("`powershell "):
        fail("README line 3 must contain the one-command PowerShell installer.", errors)
    if len(lines) < 4 or "assets/images/banner.svg" not in lines[3]:
        fail("README line 4 must embed assets/images/banner.svg.", errors)
    if len(lines) < 7 or lines[4] != '<p align="center">' or lines[6] != "</p>":
        fail("README lines 5 to 7 must center the status badges.", errors)
    if len(re.findall(r"<img\b", lines[5])) < 4:
        fail("README must show stack, license, CI, and 24-hour response badges.", errors)

    banner_path = ROOT / "assets/images/banner.svg"
    try:
        root = ET.parse(banner_path).getroot()
        if root.attrib.get("width") != "1200" or root.attrib.get("height") != "400":
            fail("Banner SVG must declare width=1200 and height=400.", errors)
        if root.tag.split("}")[-1] != "svg":
            fail("Banner asset must be an SVG document.", errors)
    except (ET.ParseError, OSError) as exc:
        fail(f"Banner SVG is missing or invalid: {exc}", errors)

    license_text = (ROOT / "LICENSE").read_text(encoding="utf-8")
    if "Apache License" not in license_text or "Version 2.0" not in license_text:
        fail("Root LICENSE must contain Apache License 2.0.", errors)

    issue_forms = [
        ROOT / ".github/ISSUE_TEMPLATE/bug_report.yml",
        ROOT / ".github/ISSUE_TEMPLATE/feature_request.yml",
    ]
    for path in issue_forms:
        if not path.is_file():
            fail(f"Missing structured issue form: {path.relative_to(ROOT)}", errors)

    starter = ROOT / "docs/good-first-issues.md"
    headings = re.findall(r"^##?\s+\d+\.", starter.read_text(encoding="utf-8"), re.MULTILINE)
    if not 3 <= len(headings) <= 5:
        fail("Good first issues must define 3 to 5 scoped tasks.", errors)

    support = (ROOT / "docs/support.md").read_text(encoding="utf-8").lower()
    if "24 hours" not in support or "acknowledg" not in support:
        fail("Support policy must document the 24-hour acknowledgement target.", errors)

    for path in sorted(ROOT.rglob("*.md")):
        if any(part in {".git", ".venv", "node_modules"} for part in path.parts):
            continue
        content = path.read_text(encoding="utf-8")
        relative = path.relative_to(ROOT)
        if EM_DASH in content:
            fail(f"{relative}: em dash found.", errors)
        if EMOJI.search(content):
            fail(f"{relative}: emoji code point found.", errors)

    if errors:
        print("Release readiness check failed:")
        for error in errors:
            print(f"  - {error}")
        return 1

    print("Release readiness check passed: README structure, SVG, Apache license, issue forms, starter tasks, response target, and Markdown typography.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
