# Frequently asked questions

## Is the browser demo the actual Prism Chat app?

No. The root HTML/CSS/JavaScript is a separate static interface demo with prewritten content. It does not call AI models or send network requests.

## Where do I download the Windows applications?

Use the [latest GitHub release](https://github.com/DudeSquad999/Prism-Ai/releases/latest) and select the packaged Windows asset under **Assets**. Read the instructions for the exact release you download.

## Why does the demo question not change the answers?

The question is display-only. The demo illustrates an interface concept; it does not simulate a working model.

## Does Prism AI eliminate hallucinations?

No. Prism AI does not guarantee factual accuracy. Check generated text, citations, and reference matches against reliable sources.

## Does local project storage mean cloud providers never receive my content?

No. If you configure a cloud AI provider, content included in requests is sent to that provider. A local interface or local project storage does not prevent the cloud provider from receiving those requests.

## Does Prism Studio compile PDFs automatically?

PDF compilation depends on having a supported TeX engine installed and configured. Check the instructions for your release.

## Is every roadmap feature implemented?

No. Roadmap and design documents describe intended direction, not a promise that every idea is currently available.

## How do I report a bug or suggest a feature?

Use the [bug report form](https://github.com/DudeSquad999/Prism-Ai/issues/new?template=bug_report.yml) for reproducible defects and the [feature request form](https://github.com/DudeSquad999/Prism-Ai/issues/new?template=feature_request.yml) for proposals. Include relevant versions and never include secrets.

## Can I contribute?

Yes. Start with [CONTRIBUTING.md](../../CONTRIBUTING.md), keep changes focused, and record only the tests you actually performed.
