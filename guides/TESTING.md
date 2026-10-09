# Windows Release Test Checklist

Use this checklist before publishing a Prism AI Windows release. This document is a test plan, not evidence that tests have passed.

## Test record

- Version: not recorded
- Package filename: not recorded
- Matching source commit or tag: not recorded
- Windows version: not recorded
- Test date and tester: not recorded
- AI provider and model tested: not recorded
- Overall status: UNTESTED

Never include API keys, private conversations, or personal project data in this record.

## Installation and launch

- [ ] Download the intended release attachment and confirm its filename matches the instructions.
- [ ] Extract the ZIP before running the installer.
- [ ] Follow the documented installation steps on a Windows test machine.
- [ ] Confirm the Prism Chat shortcut launches Chat.
- [ ] Confirm the Prism Studio shortcut launches Studio.
- [ ] Close and relaunch each application without losing saved test data.

## Prism Chat

- [ ] Configure one supported AI provider or local model using a test configuration.
- [ ] Send a prompt and confirm a response appears.
- [ ] Create a test project and conversation; restart Chat and confirm they reopen.
- [ ] Save and reopen a Markdown artifact.
- [ ] Export a conversation and inspect the exported Markdown.
- [ ] Confirm research source links open and citation markers point to the intended sources.
- [ ] Check behavior when live AI is unavailable, including the documented offline demo fallback.

## Prism Studio

- [ ] Create a document from a supplied template.
- [ ] Compile a sample LaTeX document and open the resulting PDF.
- [ ] Save the project; restart Studio and reopen it.
- [ ] Review an AI edit, apply it, and verify the intended text changed.
- [ ] Reject an AI edit and verify the document remains unchanged.
- [ ] Test undo using disposable document content.
- [ ] Export a test project ZIP, import it, and verify its contents.

## Errors and data safety

- [ ] Check that a missing or invalid AI configuration produces a useful error without exposing credentials.
- [ ] Check that a LaTeX compilation error is visible and does not discard document content.
- [ ] Confirm public screenshots, logs, and exported test files contain no secrets or private data.
- [ ] If upgrade or backup procedures are documented for this version, test them using disposable data before relying on them.

## Documentation and packaging

- [ ] Check that the README links to [Getting Started](GETTING_STARTED.md).
- [ ] Confirm release version, attachment filename, and installation instructions agree.
- [ ] Confirm application source for the release is available and the matching commit or tag is recorded.
- [ ] List prerequisites, known failures, and features not tested.
- [ ] Do not describe the release as fully tested based only on this checklist.

## Results

Record PASS, FAIL, or NOT TESTED for each check you execute. Include reproduction steps for failures and remove sensitive information.

| Check | Result | Notes or issue link |
| --- | --- | --- |
| No tests executed in this document | NOT TESTED | Complete the test record and add results after testing. |
