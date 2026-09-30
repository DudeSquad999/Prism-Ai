# How LLM Workflows Compare

## Scope

This document compares broad interaction patterns, not individual vendors or a universal ranking of AI models. Results depend on the task, prompt, context, model configuration, tools, evaluation method, and product design.

Prism AI is intended as a product approach for making perspectives, assumptions, and uncertainty easier to inspect. It is not a claim that combining outputs automatically produces a better or more accurate result.

## A basic single-response workflow

Many AI experiences follow a simple pattern:

1. A user enters a prompt.
2. A language model generates a response from the provided context and its learned patterns.
3. The product displays that response.

This can be fast and useful, especially for drafting, brainstorming, explanation, and transformation tasks. It can also make it difficult for a user to see omitted assumptions, alternative approaches, or uncertainty.

## A perspective-based workflow

Prism AI explores a different interaction pattern:

1. A user enters a prompt.
2. The user selects one or more perspectives.
3. Each perspective responds using a stated lens.
4. The product compares common ground, differences, risks, and open questions.
5. The product presents a synthesis with visible limits.

The value of this pattern is inspectability. It may be useful for questions where tradeoffs matter. It may be unnecessary for simple tasks where a single concise response is sufficient.

## Comparison

| Dimension | Single-response workflow | Perspective-based workflow |
| --- | --- | --- |
| Main experience | One response optimized for directness | Multiple labeled views plus synthesis |
| Speed | Often simpler and faster | May require more reading and comparison |
| User control | Usually focused on prompt wording | Can include perspective selection and comparison |
| Transparency | Depends on the product design | Can surface assumptions and disagreement more clearly |
| Risk | A polished response can appear more certain than warranted | Multiple views can still repeat the same weak assumption |
| Best fit | Straightforward drafting or answers | Tradeoffs, planning, learning, and ambiguous questions |

## Important limits

Multiple outputs do not independently verify one another by default. Similar wording from several generated responses may reflect shared training patterns, shared prompt context, or repeated assumptions.

A useful system should distinguish:

- A generated answer from a supported factual claim
- Agreement from evidence
- Confidence from certainty
- A helpful suggestion from a guaranteed outcome
- A local prototype from a live production system

## Role of verification

For claims that affect safety, health, finance, law, security, or important decisions, users should seek appropriate evidence and professional guidance. A future Prism AI verification capability should show what was checked, what sources were used, what was not checked, and how current the information is.

## Role of memory

Persistent context can make an experience more useful, but it creates privacy and control responsibilities. Any future memory feature should be opt-in, understandable, editable, and removable. A system should not imply that memory is comprehensive or perfectly accurate.

## How to evaluate workflows

Rather than claiming that one approach always wins, evaluate it against a defined task and user need. Useful evaluation questions include:

- Did the workflow help the user notice meaningful tradeoffs?
- Did it communicate uncertainty clearly?
- Did it reduce unsupported claims or make them easier to identify?
- Did it add complexity that was not useful for the task?
- Could a user understand what the system did and did not do?

## Current repository status

The included browser demonstration is static and uses prewritten content. It does not compare live models or perform automated fact checking. It exists to demonstrate the intended interaction design, not to measure model performance.