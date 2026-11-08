#!/usr/bin/env python3
"""Check local links and assets in Prism AI's Markdown, HTML, and CSS files."""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
IGNORED_DIRS = {".git", ".venv", "venv", "node_modules", "__pycache__", "coverage"}
MARKDOWN_LINK = re.compile(r"!?(?:\[[^\]]*\])\((?:<([^>]+)>|([^\s)]+))[^)]*\)")
CSS_URL = re.compile(r"url\(\s*[\"']?([^\"')]+)[\"']?\s*\)", re.IGNORECASE)


class ReferenceParser(HTMLParser):
    """Collect file references from HTML tags and inline style attributes."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[str] = []
        self.in_style = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if value is None:
                continue
            if name.lower() in {"href", "src", "poster"}:
                self.references.append(value)
            elif name.lower() == "style":
                self.references.extend(CSS_URL.findall(value))
        if tag.lower() == "style":
            self.in_style = True

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "style":
            self.in_style = False

    def handle_data(self, data: str) -> None:
        if self.in_style:
            self.references.extend(CSS_URL.findall(data))


def _is_external(reference: str) -> bool:
    value = reference.strip()
    if not value or value.startswith("#") or value.startswith("//"):
        return True
    scheme = urlsplit(value).scheme.lower()
    return bool(scheme)


def _local_target(reference: str, source: Path, root: Path) -> Path | None:
    """Resolve a local URL path relative to the source document."""
    if _is_external(reference):
        return None
    parsed = urlsplit(reference.strip())
    if not parsed.path:
        return None
    raw_path = unquote(parsed.path)
    if raw_path.startswith("/"):
        target = root / raw_path.lstrip("/")
    else:
        target = source.parent / raw_path
    try:
        return target.resolve()
    except OSError:
        return target


def _inside_root(path: Path, root: Path) -> bool:
    try:
        path.relative_to(root.resolve())
        return True
    except ValueError:
        return False


def scan_repo(root: Path = ROOT) -> list[str]:
    """Return missing or unsafe local reference errors."""
    root = root.resolve()
    issues: list[str] = []

    def check(reference: str, source: Path) -> None:
        target = _local_target(reference, source, root)
        if target is None:
            return
        if not _inside_root(target, root):
            issues.append(f"{source.relative_to(root)}: reference escapes repository: {reference}")
        elif not target.exists():
            issues.append(f"{source.relative_to(root)}: missing local reference: {reference}")

    for source in sorted(root.rglob("*")):
        if not source.is_file() or any(part in IGNORED_DIRS for part in source.relative_to(root).parts):
            continue
        suffix = source.suffix.lower()
        if suffix == ".md":
            text = source.read_text(encoding="utf-8")
            # Exclude fenced code blocks so Mermaid examples and shell snippets are not mistaken for links.
            text = re.sub(r"(?ms)^\s*```.*?^\s*```\s*$", "", text)
            for match in MARKDOWN_LINK.finditer(text):
                check(match.group(1) or match.group(2), source)
            parser = ReferenceParser()
            parser.feed(text)
            for reference in parser.references:
                check(reference, source)
        elif suffix == ".html":
            text = source.read_text(encoding="utf-8")
            parser = ReferenceParser()
            parser.feed(text)
            for reference in parser.references:
                check(reference, source)
        elif suffix == ".css":
            text = source.read_text(encoding="utf-8")
            for reference in CSS_URL.findall(text):
                check(reference.strip(), source)

    return sorted(set(issues))


def main() -> int:
    issues = scan_repo()
    if issues:
        print("Repository reference check failed:")
        for issue in issues:
            print(f"  - {issue}")
        return 1
    print("Repository reference check passed: no missing local Markdown, HTML, or CSS references.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
