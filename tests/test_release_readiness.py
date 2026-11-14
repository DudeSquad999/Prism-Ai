"""Tests for the release-readiness README checks."""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from check_release_readiness import has_trusted_shields_badge, has_windows_installer


class ReleaseReadinessHelperTests(unittest.TestCase):
    def test_accepts_https_shields_image_host(self) -> None:
        readme = '<img src="https://img.shields.io/badge/License-MIT-yellow.svg">'
        self.assertTrue(has_trusted_shields_badge(readme))

    def test_rejects_lookalike_shields_host(self) -> None:
        readme = '<img src="https://img.shields.io.attacker.example/badge.svg">'
        self.assertFalse(has_trusted_shields_badge(readme))

    def test_rejects_shields_mentioned_only_in_a_query_string(self) -> None:
        readme = '<img src="https://example.com/?next=https://img.shields.io">'
        self.assertFalse(has_trusted_shields_badge(readme))

    def test_rejects_non_https_badges(self) -> None:
        readme = '<img src="http://img.shields.io/badge/License-MIT">'
        self.assertFalse(has_trusted_shields_badge(readme))

    def test_accepts_the_pinned_installer_command(self) -> None:
        readme = "irm https://raw.githubusercontent.com/DudeSquad999/Prism-Ai/Main/scripts/install.ps1 | iex"
        self.assertTrue(has_windows_installer(readme))

    def test_rejects_an_unrelated_installer_command(self) -> None:
        self.assertFalse(has_windows_installer("irm https://example.com/install.ps1 | iex"))


if __name__ == "__main__":
    unittest.main()
