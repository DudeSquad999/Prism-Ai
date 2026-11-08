"""Tests for the repository link and asset checker."""

import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from check_repo import scan_repo


class RepositoryCheckTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.root = Path(self.temp_dir.name)

    def tearDown(self) -> None:
        self.temp_dir.cleanup()

    def write(self, relative: str, content: str = "") -> Path:
        path = self.root / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
        return path

    def test_existing_markdown_link_and_image_pass(self) -> None:
        self.write("docs/guide.md", "# Guide\n")
        self.write("docs/image.png", "placeholder")
        self.write("README.md", "[Guide](docs/guide.md) ![Image](docs/image.png)")
        self.assertEqual(scan_repo(self.root), [])

    def test_missing_markdown_link_is_reported(self) -> None:
        self.write("README.md", "[Missing](docs/missing.md)")
        issues = scan_repo(self.root)
        self.assertEqual(len(issues), 1)
        self.assertIn("missing local reference", issues[0])

    def test_html_asset_and_css_url_are_checked(self) -> None:
        self.write("index.html", '<script src="app.js"></script><img src="missing.png">')
        self.write("app.js", "/* test file */")
        self.write("styles.css", "body { background: url('missing-bg.png'); }")
        issues = scan_repo(self.root)
        self.assertEqual(len(issues), 2)
        self.assertTrue(any("missing.png" in issue for issue in issues))
        self.assertTrue(any("missing-bg.png" in issue for issue in issues))

    def test_external_and_fragment_links_are_ignored(self) -> None:
        self.write("README.md", "[External](https://example.com) [Anchor](#section)")
        self.assertEqual(scan_repo(self.root), [])

    def test_reference_cannot_escape_repository(self) -> None:
        self.write("README.md", "[Outside](../outside.md)")
        issues = scan_repo(self.root)
        self.assertEqual(len(issues), 1)
        self.assertIn("escapes repository", issues[0])


if __name__ == "__main__":
    unittest.main()
