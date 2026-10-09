# Prism AI Roadmap

## Purpose

This roadmap organizes the project owner's current direction for Prism AI. It is a planning document, not a promise of delivery dates or production capabilities. Priorities may change as the project owner learns from testing, feedback, and implementation work.

## Current foundation

### Documentation and project clarity

- [x] Define the product vision and intended interaction model
- [x] Document the role of perspectives, synthesis, memory, and verification
- [x] Add contribution, security, issue, and pull request guidance
- [x] Clarify authorship, AI-assistance disclosure, privacy, and prototype boundaries

### Local static demonstration

- [x] Create a responsive browser prototype with prewritten example content
- [x] Include perspective selection, comparison cards, and a synthesis panel
- [x] Label the prototype as local and static
- [x] Avoid API keys, model providers, backend services, analytics, tracking, and network requests

## Next: prototype refinement

### Experience quality

- [ ] Test readability, mobile layout, keyboard navigation, and focus states
- [ ] Improve sample scenarios to demonstrate meaningful agreement and disagreement
- [ ] Add clearer empty states and explanation of what each perspective contributes
- [ ] Review color contrast and motion preferences

### Documentation quality

- [ ] Gather feedback on whether the vision and status are understandable to a new visitor
- [ ] Keep the product specification aligned with design decisions
- [ ] Document accepted and rejected design choices as the project evolves

## MVP exploration

The MVP should be scoped only after a concrete user need and evaluation method are chosen.

Potential MVP capabilities:

- [ ] Selectable perspective set for a defined use case
- [ ] Structured response format with assumptions and uncertainty labels
- [ ] User-visible synthesis of agreements, differences, and open questions
- [ ] Local or controlled sample data for product testing
- [ ] Feedback collection that is optional, transparent, and privacy-aware

Potential MVP success criteria:

- Users can explain what each perspective represents
- Users can identify uncertainty and open questions after reading a synthesis
- Users can distinguish example output from verified information
- The workflow provides value beyond a single generic response for the target use case

## Validation and safety

Before presenting advanced features as reliable capabilities, evaluate them deliberately.

- [ ] Define what a factual claim check means in the product
- [ ] Establish evidence-quality and freshness guidelines
- [ ] Design user controls for any saved context or memory
- [ ] Test whether uncertainty labels are understandable and useful
- [ ] Define limits and escalation paths for high-stakes topics
- [ ] Conduct privacy and security review before adding storage or third-party services

## Future exploration

These ideas are exploratory. They are not currently implemented commitments.

- [ ] Opt-in, user-managed memory with inspection and deletion controls
- [ ] Claim review with source context and confidence limits
- [ ] Configurable perspective libraries for different use cases
- [ ] Comparison history that remains under user control
- [ ] Collaboration features with explicit sharing controls
- [ ] Evaluation harnesses for clarity, usefulness, safety, and calibration

## Non-goals for the current prototype

- No live AI provider connections
- No API keys, tokens, or secrets
- No user accounts or persistent data storage
- No analytics or tracking
- No claims that the prototype verifies facts or calls real AI models

## How to contribute

If you want to help, start with the documentation, interface accessibility, example scenarios, or clearly scoped issues. See [CONTRIBUTING.md](../CONTRIBUTING.md) and [SECURITY.md](../SECURITY.md).