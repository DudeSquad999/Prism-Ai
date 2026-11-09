"""Contract checks for the static browser workspace's local AI integration."""

from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class BrowserAIContractTests(unittest.TestCase):
    def test_browser_client_uses_ollama_api_without_cloud_keys(self) -> None:
        source = (ROOT / "demo.js").read_text(encoding="utf-8")
        self.assertIn("/api/tags", source)
        self.assertIn("/api/chat", source)
        self.assertIn("stream: true", source)
        self.assertIn("OLLAMA_ORIGINS", source)
        self.assertIn("aiStorageKey", source)
        self.assertNotIn("apiKey:", source)
        self.assertNotIn("Authorization: Bearer", source)

    def test_all_browser_entry_points_expose_ai_status_and_controls(self) -> None:
        for relative in ("index.html", "demo/index.html", "docs/index.html"):
            with self.subTest(page=relative):
                page = (ROOT / relative).read_text(encoding="utf-8")
                self.assertIn('id="connectionBadge"', page)
                self.assertIn('id="composerStatus"', page)
                self.assertIn('id="cancelAI"', page)
                self.assertIn('src=', page)

    def test_browser_guide_explains_local_ai_privacy_and_cors(self) -> None:
        guide = (ROOT / "docs/browser-demo.md").read_text(encoding="utf-8")
        self.assertIn("OLLAMA_ORIGINS", guide)
        self.assertIn("sent directly to the Ollama server", guide)
        self.assertIn("does not include a live web-search tool", guide)


if __name__ == "__main__":
    unittest.main()
