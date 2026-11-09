# Good first issues

These tasks are intentionally scoped for contributors who want a clear starting point. Check the linked files and open issues before beginning. The packaged Windows application source is not included in this static-preview repository, so these tasks focus on files that are available here.

### 1. Expand local-reference checker tests

**Files:** `tests/test_check_repo.py`, `scripts/check_repo.py`

Add focused tests for relative links with query strings and fragments, percent-encoded paths, CSS `url()` references, and paths that attempt to escape the repository root.

**Acceptance criteria:**
- Each behavior has a small reproducible test.
- Valid local references pass.
- Missing or out-of-root references fail with a useful message.
- Existing tests continue to pass.

### 2. Add browser-preview smoke tests

**Files:** `demo.js`, `demo/index.html`, new browser test configuration

Introduce a small Playwright smoke-test suite for the public browser preview. Cover initial load, creating a project, editing a note, and importing or exporting demo data.

**Acceptance criteria:**
- Tests run in CI with a documented browser version.
- Tests use fictional fixture data only.
- The suite does not imply that the preview connects to live AI.
- Failures identify the affected workflow.

### 3. Improve keyboard accessibility checks

**Files:** `index.html`, `demo.css`, `demo.js`

Audit the primary navigation, dialogs, form controls, and project actions for keyboard-only use. Fix missing focus visibility or unclear accessible names in the browser preview.

**Acceptance criteria:**
- Main workflows can be reached without a mouse.
- Focus remains visible in dark and light themes.
- Dialogs expose an understandable title and keyboard dismissal.
- Add a short manual verification checklist.

### 4. Add a browser-preview import and export test matrix

**Files:** `demo.js`, `tests/`, `docs/browser-demo.md`

Document and test the expected behavior for valid exports, malformed JSON, oversized imports, duplicate project IDs, and reset behavior.

**Acceptance criteria:**
- Each case has a stated expected result.
- Invalid input does not corrupt existing browser data.
- The guide explains how to recover from a rejected import.
- Tests use temporary browser storage and do not touch real user files.

