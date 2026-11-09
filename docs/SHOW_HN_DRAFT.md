# Show HN draft: Prism AI, a Windows research and LaTeX workspace

> Draft for maintainer review. Confirm the current release, source-availability statement, and benchmark results before posting.

## Suggested title

Show HN: Prism AI, a Windows workspace for research and LaTeX writing

## Draft post

Hi HN. I am building Prism AI, a Windows workspace designed to keep research projects and technical writing in one workflow.

It has two companion applications:

- **Prism Chat** organizes research projects, conversations, source material, and Markdown notes.
- **Prism Studio** supports LaTeX papers and presentations, BibTeX references, review of proposed edits, and PDF compilation with Tectonic.

The product can use local models through Ollama or a cloud provider configured with the user's own API key. Chat and Studio have separate provider configuration, so setup and validation need to be checked in each application.

One of the harder product decisions has been keeping the browser preview honest. It is a scripted, local-only sample workspace. It does not connect to an AI model, search the web, verify citations, or analyze uploaded documents. It is useful for exploring selected interface workflows, but it is not presented as a live product backend.

Another challenge is separating useful AI assistance from unsupported trust claims. Retrieved sources and generated answers can be incomplete or wrong, so important claims still need to be checked against original sources. Cloud requests send included content to the provider the user configures. Local inference does not mean every feature works offline.

The public repository contains the browser preview, documentation, project records, and repository tooling. The complete source for the packaged Windows applications is not currently included in this static-preview repository. I want to be explicit about that boundary rather than imply that the demo is the desktop application.

I would appreciate feedback on the research-to-writing workflow, local versus cloud AI setup, evidence review, and what technical measurements would be most useful to publish next.

## Architecture points to discuss

- Two application workflows with separate provider setup.
- Local Ollama inference versus user-configured cloud APIs.
- A scripted browser preview that is deliberately separated from live AI behavior.
- Markdown notes, BibTeX references, LaTeX authoring, and PDF compilation.
- Explicit privacy and evidence limitations.

## Benchmark publication checklist

No reproducible performance benchmark figures are currently claimed by this draft. Before posting numerical results, measure and publish:

| Measurement | Required context |
|---|---|
| Application cold start | Windows version, CPU, RAM, storage, release build, repeated runs, median and p95 |
| Local model first-token latency | Ollama version, exact model, quantization, GPU/CPU, context length, prompt size |
| Local generation throughput | Tokens per second, warm-up policy, prompt and output token counts, repeat count |
| PDF compilation time | Tectonic version, document size, package cache state, repeat count |
| Idle and active resource use | RAM, CPU, GPU memory, GPU utilization, and measurement interval |

Do not substitute estimates, isolated best runs, or results from a different application version. If the measurements are not complete, post without performance numbers and invite contributors to help define a reproducible benchmark protocol.

## Pre-publication checks

- Confirm the current release URL and installer checksum.
- Confirm that the repository source-availability statement is accurate.
- Replace no text with unsupported claims about citation verification or offline operation.
- Add only benchmark data that has been reproduced and recorded with its environment.
- Check the post against the current product screenshots and documentation.

