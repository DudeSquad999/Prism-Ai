# Prism AI Product Specification

## Product summary

Prism AI is a project vision for an AI experience that helps users inspect a question through multiple selected perspectives. It aims to make agreement, disagreement, uncertainty, and possible next steps easier to understand.

The repository's current browser experience is a local static demonstration. It uses prewritten content and does not call an AI model, make network requests, persist prompts, or provide automated verification.

## Problem

A single polished AI response can hide alternative assumptions, unresolved tradeoffs, and uncertainty. Users may need a clearer way to compare lenses on a question before deciding what to do next.

## Intended users

- People exploring ambiguous questions or decisions
- Learners who benefit from comparing reasoning approaches
- Builders and researchers evaluating transparent AI interaction patterns

## Product goals

- Make perspective selection understandable and user controlled
- Present comparable responses in a consistent structure
- Provide a synthesis that separates agreement, uncertainty, and open questions
- Preserve user agency instead of implying that the system has final authority
- Make product limits clear

## Non-goals

- Guarantee factual accuracy
- Replace expert advice in high-stakes areas
- Present multiple generated responses as independent verification
- Collect user data by default
- Imply that the static prototype uses live models

## Current static prototype

### Inputs

- Optional prompt text stored only in the page while it is open
- Perspective selection controls
- A local compare action

### Outputs

- Prewritten response cards
- A prewritten synthesis panel
- Example uncertainty and next-step labels

### Constraints

- No API keys or secrets
- No provider integration
- No backend
- No analytics or tracking
- No network requests
- No persistent storage

## Future MVP hypotheses

A future MVP could test whether user-selected perspectives and transparent synthesis help people identify tradeoffs more effectively than a single generic response.

Potential measures:

- User understanding of each perspective
- Ability to identify uncertainty and open questions
- Perceived usefulness for a defined task
- Whether the comparison adds value relative to complexity

## Safety and privacy requirements

- Clearly label generated, illustrative, verified, and uncertain information.
- Make any future memory opt-in, inspectable, editable, and removable.
- Avoid retention of sensitive data by default.
- Provide transparent explanation for any future evidence or verification behavior.
- Encourage appropriate professional help for high-stakes decisions.

## Decisions still owned by the project owner

The project owner retains responsibility for the product's purpose, priorities, direction, accepted tradeoffs, and published content. Future capabilities should be adopted only after review against this vision and real user needs.