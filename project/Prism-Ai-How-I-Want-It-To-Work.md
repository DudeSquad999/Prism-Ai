# How Prism AI Is Intended to Work

## Purpose

Prism AI is the project owner's vision for an AI experience that makes different ways of approaching a question easier to inspect. Instead of treating one generated answer as the only view, Prism AI is intended to present selected perspectives, compare them, and produce a clear synthesis with visible uncertainty.

This document describes product direction and proposed architecture. It does not claim that every capability is implemented today.

## Core idea

A user brings a question, goal, or decision. Prism AI helps them explore it through a small set of clearly labeled perspectives, then highlights what those perspectives share, where they differ, and what still needs verification or human judgment.

The goal is not to imply that more responses automatically create truth. The goal is to make assumptions, tradeoffs, and uncertainty easier to see.

## Intended user flow

1. The user writes a prompt or selects an example.
2. The user chooses which perspectives to include.
3. Prism AI presents each perspective in a consistent, comparable format.
4. A synthesis identifies agreements, tensions, confidence limits, and possible next steps.
5. The user can adjust the selected perspectives or continue the exploration.

## Perspective layer

Perspectives are roles or lenses, not claims that separate models are inherently better at every task. A perspective should state its purpose and limits.

| Perspective | Intended contribution | Example limitation |
| --- | --- | --- |
| Analytical | Break a problem into assumptions, constraints, and steps | May underemphasize emotional or practical context |
| Creative | Generate alternatives and reframes | May produce ideas that need feasibility checks |
| Practical | Focus on execution, tradeoffs, and next actions | May favor near-term solutions |
| Skeptical | Look for missing evidence, risks, and contradictions | May slow decisions when evidence is limited |

## Synthesis layer

The synthesis is intended to be more than a summary. It should help the user understand:

- What the selected perspectives agree on
- Where their assumptions or recommendations differ
- Which claims are observations, inferences, examples, or open questions
- What uncertainty remains
- What a responsible next step could be

A synthesis should avoid pretending that disagreement has been solved when it has only been described.

## Proposed memory direction

A future Prism AI implementation may use a user-controlled memory layer to retain relevant context across interactions. Memory should be optional, inspectable, editable, and removable by the user.

Important design requirements include:

- Explain why a memory item is relevant
- Let users view, correct, delete, or disable stored information
- Minimize retention by default
- Avoid storing sensitive information unless a user intentionally chooses to do so
- Distinguish user-provided facts from generated inferences

## Proposed verification direction

A future verification layer may identify factual claims that would benefit from checking. It should present source context, confidence limits, and the difference between verified support and an unverified assertion.

Verification should not be described as perfect. Reliable behavior depends on the quality, relevance, freshness, and interpretation of available evidence.

## Transparency and uncertainty

Prism AI should use clear labels such as:

- Demonstration content
- User-provided context
- Generated interpretation
- Claim needing verification
- Conflicting evidence
- Insufficient information

The interface should make it easy to see when an output is uncertain instead of hiding uncertainty behind polished language.

## Current prototype

The repository includes a local static prototype. It demonstrates the intended interface with prewritten example content only. It does not send prompts to a server, call a model provider, use API keys, collect analytics, or make network requests.

## MVP direction

A practical MVP could focus on a narrow, testable experience:

- User-selected perspectives
- Consistent response cards
- A transparent synthesis format
- Explicit uncertainty labels
- Local sample data or carefully scoped test inputs

The MVP should be evaluated with real users and clear criteria before expanding into persistent memory or automated claim checking.

## Future exploration

Possible future directions include memory controls, evidence review, configurable perspectives, comparison history, and richer collaboration. These are exploration areas, not promises or claims of current functionality.

## Non-goals

Prism AI should not:

- Claim universal factual accuracy
- Claim that any single AI model is always best
- Hide uncertainty or sources behind a single final answer
- Collect sensitive data by default
- Present a static demonstration as a live AI system