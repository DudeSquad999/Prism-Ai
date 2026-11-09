# Prism AI brand and positioning strategy

**Status:** Working strategy for the current Windows product, not a legal clearance or a commitment to rename.

**Last reviewed:** 2026-11-08

## Product truth

Prism AI is an early-stage, Windows-first research-to-writing workspace made up of two companion applications:

- **Prism Chat** organizes research projects, conversations, source material, and Markdown notes.
- **Prism Studio** supports LaTeX papers and presentations, references, reviewable AI-proposed edits, project ZIP workflows, and PDF compilation.

Users can choose local models through Ollama or configure supported cloud providers with their own API keys. Chat and Studio require separate provider configuration.

The public browser demo is a scripted preview. It does not connect to a live model, search the web, verify citations, or represent the full Windows applications.

## Positioning

**Category:** Windows research-to-writing workspace.

**Positioning statement:** Prism AI helps Windows users move from a research question and source material to organized notes and LaTeX documents in one connected workflow, while letting them choose local Ollama inference or their own supported cloud provider.

**Primary tagline:** Your research. Your writing. Your AI.

**Supporting line:** Organize research in Prism Chat. Develop papers in Prism Studio. Choose the AI setup that fits your workflow.

## Initial audience hypothesis

These are audiences to validate, not proven customer segments:

1. Students and independent researchers who need a structured place for project notes, sources, and writing.
2. Technical writers and LaTeX users who want a more connected drafting and PDF workflow.
3. Windows users who prefer local model options or want to bring their own cloud provider.

Do not claim product-market fit, user satisfaction, or willingness to pay without direct evidence.

## Differentiation that can be claimed today

- Two companion Windows apps with distinct research and LaTeX-writing responsibilities.
- Local model choice through Ollama, alongside supported cloud providers.
- User-owned cloud API keys rather than a bundled Prism AI key.
- Reviewable AI-proposed edits in Studio.
- A browser preview that is clearly separated from live Windows features.

Do not claim that Prism guarantees citation accuracy, performs autonomous verified research, works fully offline, supports live collaboration, or contains the full Windows source in this repository unless those claims are verified in a specific release.

## Competitive context

The name and category are crowded. Two relevant public references are:

- [OpenAI Prism](https://openai.com/index/introducing-prism/) is a cloud-based, AI-native scientific writing and LaTeX workspace. Its official site currently states that the service will shut down on January 1, 2027. This is a direct product-name and category overlap, even though the products and distribution models differ.
- [Oleafly](https://oleafly.com/) presents itself as a cross-platform desktop workspace for LaTeX, Typst, and Markdown with optional local Ollama assistance and ordinary local project files. It is a relevant alternative in the local-first writing category.

This is a positioning comparison, not a claim that one product is better. Re-check competitor capabilities before publishing comparative marketing.

## Naming and search risk

“Prism AI” is distinct from the single-word “Prism,” but the overlap with OpenAI's Prism is substantial because both names appear in AI-assisted scientific writing and LaTeX search results.

This creates a discoverability and brand-confusion risk. It is not a legal conclusion about trademark rights.

Recommended approach:

- Keep **Prism AI** as the current working name; do not make an unreviewed rename in code or releases.
- Consistently qualify it as **Prism AI for Windows** in repository descriptions, release copy, social bios, and product pages.
- Use the full app names **Prism Chat** and **Prism Studio** in headings and metadata.
- Never imply affiliation with OpenAI or use OpenAI Prism screenshots, logos, or product assets.
- Before paid campaigns, commercial expansion, or a permanent brand lock-in, perform a proper trademark and domain review with qualified counsel.

## Messaging hierarchy

1. **Outcome:** Move from research questions and source material to organized notes and finished writing.
2. **Workflow:** Prism Chat for research; Prism Studio for LaTeX writing and PDF compilation.
3. **Choice:** Local Ollama or a supported cloud provider configured by the user.
4. **Control:** Review AI-proposed edits and verify sources yourself.
5. **Transparency:** Be explicit about early-stage limitations, internet requirements, and the scripted browser demo.

Use the exact published release notes as the authority for version-specific features and provider support.

## Visual direction

- Deep navy or charcoal foundation with restrained indigo, violet, and cyan accents.
- A simple prism/light-refraction motif that is recognizable at small sizes.
- Editorial spacing and clean typography; make the product feel like a serious research workspace, not a generic chatbot.
- Keep product screenshots genuine. AI-generated abstract brand art may be used for banners, but never present generated mockups as screenshots of the Windows application.
- Avoid generic robot heads, glowing brains, circuit-board clichés, and unreadable pseudo-interface imagery.

## Validation before growth spending

Prioritize evidence in this order:

| Experiment | Hypothesis | Evidence to collect | Continue when |
|---|---|---|---|
| First-session walkthrough | New users can understand the Chat/Studio split and complete one small task. | Observe 5 first-time users; record completion, confusion, and drop-off points. | Most users finish without maintainer intervention; fix repeated blockers first. |
| Ollama setup verification | Local AI can be configured and confirmed live in both apps. | Exact app steps, Ollama version, model tag, Windows version, and a real response from each app. | Both paths are repeatable and distinguish live output from demo fallback. |
| Screenshot refresh | Genuine release screenshots make the product easier to understand. | Captures from installed v3.1.0 apps with private data removed. | Every image is traceable to the actual released application. |
| Message test | The research-to-writing position is clearer than a generic “AI assistant” pitch. | Compare a small set of message variants with real visitors and record which task they expect Prism to solve. | Visitors correctly understand the two-app workflow and limitations. |

Do not scale paid promotion until the installer, first-run path, local-model setup, and product screenshots have been verified.

## Brand quality rules

- Keep one canonical product description and reuse it across GitHub, the website, release notes, and social profiles.
- Label the browser demo as scripted and local-only everywhere it appears.
- Separate shipped features from experiments, plans, and historical prototypes.
- Do not claim research accuracy or citation verification that has not been tested.
- Make the local-versus-cloud data path understandable before a user enters private material.
