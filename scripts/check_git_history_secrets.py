#!/usr/bin/env python3
"""Scan added Git history lines for common credential and private-key patterns."""

from __future__ import annotations

import re
import subprocess
import sys

PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    ("private_key", re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----")),
    ("github_token", re.compile(r"\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b")),
    ("aws_access_key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("slack_token", re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{20,}\b")),
    ("google_api_key", re.compile(r"\bAIza[0-9A-Za-z_-]{30,}\b")),
    ("openai_style_key", re.compile(r"\bsk-[A-Za-z0-9]{24,}\b")),
    ("bearer_credential", re.compile(r"(?i)\bBearer\s+[A-Za-z0-9._~+/=-]{24,}")),
    (
        "credential_assignment",
        re.compile(
            r'''(?i)\b(?:api[_-]?key|access[_-]?token|client[_-]?secret|secret[_-]?key|password)\b\s*[:=]\s*["'](?!YOUR_|CHANGEME|REPLACE|EXAMPLE|<)[A-Za-z0-9_./+=-]{16,}["']'''
        ),
    ),
)


def main() -> int:
    command = ["git", "log", "--all", "--format=COMMIT:%H", "-p"]
    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    assert process.stdout is not None
    commit = "unknown"
    path = "unknown"
    findings: set[tuple[str, str, str]] = set()

    for line in process.stdout:
        if line.startswith("COMMIT:"):
            commit = line.removeprefix("COMMIT:").strip()
            path = "unknown"
            continue
        if line.startswith("+++ b/"):
            path = line.removeprefix("+++ b/").strip()
            continue
        if not line.startswith("+") or line.startswith("+++"):
            continue

        added_line = line[1:].strip()
        for category, pattern in PATTERNS:
            if pattern.search(added_line):
                findings.add((commit, path, category))
                break

    stderr = process.stderr.read() if process.stderr else ""
    return_code = process.wait()
    if return_code:
        print(f"Git history scan could not complete (exit {return_code}).", file=sys.stderr)
        if stderr:
            print(stderr[-2000:], file=sys.stderr)
        return return_code

    if findings:
        print("Potential credential patterns found in added history lines:")
        for commit, path, category in sorted(findings):
            print(f"  {commit} {path} {category}")
        print("Values are intentionally not printed. Revoke or rotate confirmed credentials.")
        return 1

    print("Git history scan passed: no configured credential patterns matched added lines in refs reachable through git log --all.")
    print("This heuristic check supplements GitHub secret scanning and is not proof that every possible secret format is absent.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
