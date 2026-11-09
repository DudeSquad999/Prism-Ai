# Good first issues

These are deliberately scoped contribution opportunities. Confirm that an item is still open before starting. The browser preview is separate from the Windows applications, and changes to this repository do not modify the installed Windows product.

## 1. Add Playwright smoke tests for the browser preview

**Scope:** Add a small Playwright test suite for the published root preview. Cover first load, creating a sample project, editing a note, and export/import of demo data.

**Acceptance checks:**
- Tests run headlessly in GitHub Actions.
- Tests use sample data and do not require credentials or external AI services.
- Failures identify the affected workflow.
- Existing browser behavior and local-only preview disclaimers remain intact.

**Out of scope:** Rewriting the demo architecture or testing the Windows applications.

## 2. Improve keyboard navigation and visible focus

**Scope:** Audit the root browser preview for keyboard access to primary navigation, dialogs, forms, and project actions. Fix a small, clearly documented set of focus-order or visible-focus defects.

**Acceptance checks:**
- Every changed interactive control can be reached and operated by keyboard.
- Focus remains visible and is not lost when the UI updates.
- A short manual test record lists browser, viewport, and tested controls.

**Out of scope:** Claiming full WCAG conformance without a complete audit.

## 3. Extend the local reference checker

**Scope:** Add validation for Markdown heading fragments and HTML anchor references to `scripts/check_repo.py`, with focused unit tests in `tests/`.

**Acceptance checks:**
- Existing local-path checks continue to pass.
- Valid anchors pass and missing anchors fail with source-file context.
- External URLs and fenced code examples are not misclassified.
- Tests cover duplicate headings and percent-encoded fragments.

**Out of scope:** Network crawling or checking external website uptime.

## 4. Write an Ollama troubleshooting decision tree

**Scope:** Improve `docs/local-models.md` with a concise decision tree for common connection failures, clearly separating Chat and Studio configuration.

**Acceptance checks:**
- Each step maps to an observable symptom and a safe diagnostic action.
- No model or Windows hardware combination is described as verified unless tested.
- API keys and private data are never requested in public reports.
- Links point to the current installation and support guidance.

**Out of scope:** Changing the Windows applications or promising a specific model's performance.

## Contribution process

Read [CONTRIBUTING.md](../CONTRIBUTING.md), check the live issue list, and comment on the relevant issue before starting. Pull requests should state exactly what was tested and what remains unverified.
