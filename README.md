> **Author Note:** AI helped me write, format, and structure this description because I am a dyslexic student. I have built an early working prototype of this system, and this document explains how the prototype is designed and where the project is heading.

# Neurosymbolic AI Engine

> **Status:** 🧪 *Working Prototype / Evolving Architecture*  
> *A dual-process (System 1 / System 2) hybrid AI architecture combining neural language capabilities with deterministic symbolic logic, continuous truth maintenance, abstract world modeling, and persistent factual memory.*

---

## 1. System Vision & Architecture

Standard Large Language Models (LLMs) operate strictly as statistical next-token predictors. Because factual knowledge is frozen inside dense parameter weights, LLMs struggle with hallucinations, real-time factual updates, multi-step logic, and persistent state tracking.

This project decouples **Language Comprehension** (Neural Subsystem) from **Logic, Memory, and Truth** (Symbolic Subsystem).

### 1.1 Prototype State vs. Target Blueprint

* **Current Prototype Capabilities:** The active code prototype successfully extracts candidate triples from text, ingests them into a graph structure (`NetworkX`), runs basic Truth Maintenance System (TMS) conflict resolution in Python, and handles dynamic belief updates without model retraining.
* **Target Architecture:** Scaling the prototype into a production pipeline with custom continuous learning layers, latent space world models (JEPA-inspired), and hybrid neurosymbolic query generation.

### 1.2 Architecture Flow

```mermaid
flowchart TD
    subgraph S1 ["System 1: Neural Subsystem (Perception & Generation)"]
        U_In[Raw User Input / Multi-Modal Stream] --> Extractor[Neural Feature & Triple Extractor]
        Generator[Neural Language Synthesizer] --> U_Out[Grounded Response Output]
    end

    subgraph S2 ["System 2: Symbolic Core Engine (Reasoning & Memory)"]
        Extractor --> Ingestion[Triple Ingestion & Normalization]
        
        subgraph GraphMemory ["Factual Memory Layer"]
            KG[(Semantic Knowledge Graph)]
        end
        
        subgraph LogicLayer ["Inference & Verification Layer"]
            TMS[Truth Maintenance System]
            LogicEngine[Symbolic Inference Engine]
            WorldModel[Abstract World Model / State Simulator]
        end

        Ingestion --> TMS
        TMS <-->|Belief Revision & Dependency Audit| KG
        LogicEngine <-->|Pattern Queries & Rule Deduction| KG
        WorldModel <-->|Constraint Checks & State Simulation| LogicEngine
        
        LogicEngine --> Constraints[Verified Facts & Deduction Proofs]
        Constraints --> Generator
    end

    subgraph MemoryControl ["Continual Learning & Persistence Layer"]
        CLP[Continual Learning Pipeline] <-->|Real-time Memory Stream| KG
        Persistence[(Persistent Storage Engine)] <-->|Graph Serialization| KG
    end

    style S1 fill:#1e293b,stroke:#475569,stroke-width:2px,color:#fff
    style S2 fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    style MemoryControl fill:#1c1917,stroke:#78350f,stroke-width:2px,color:#fff
```

---

## 2. Core Subsystem Specifications

### 2.1 Dual-Process Information Pipeline

```mermaid
flowchart LR
    A[Unstructured Input] -->|Neural Encoding| B(Candidate Triples)
    B -->|Symbolic Verification| C{Truth Maintenance}
    C -->|Valid / Non-Conflicting| D[(Knowledge Graph)]
    C -->|Contradiction| E[AGM Belief Revision]
    E -->|Override / Retract| D
    D -->|Rule Execution| F[Inferred Knowledge]
    F -->|Latent Verification| G[Abstract World Model]
    G -->|Verified Proof| H[Grounded Neural Output]
```

---

### 2.2 Semantic Knowledge Graph Schema

Factual memory is represented as an attributed multi-relational graph $G = (V, E, M)$, where $V$ represents entity/concept nodes, $E$ represents directional relation edges, and $M$ represents edge metadata.

```mermaid
classDiagram
    class Node {
        +UUID node_id
        +String label
        +String entity_type
        +Dict attributes
    }

    class Edge {
        +UUID edge_id
        +UUID source_node_id
        +UUID target_node_id
        +String predicate
        +Metadata metadata
    }

    class Metadata {
        +Float confidence_score
        +String source_provenance
        +Timestamp timestamp
        +List~UUID~ dependency_ids
        +Boolean is_active
    }

    Node "1" -- "many" Edge : Outgoing Relations
    Node "1" -- "many" Edge : Incoming Relations
    Edge "1" *-- "1" Metadata : Encapsulates
```

---

### 2.3 Truth Maintenance System (TMS) State Machine

The TMS tracks justification networks and applies belief revision to resolve contradictions dynamically without retraining neural components.

```mermaid
stateDiagram-v2
    [*] --> Ingestion: New Triple Received
    
    Ingestion --> ConflictCheck: Scan KG for Matching (Subject, Object)
    
    state ConflictCheck {
        [*] --> CheckAntonym: Test Relation Antonym Rules
        CheckAntonym --> CheckMutEx: Test Mutually Exclusive Attributes
        CheckMutEx --> Evaluated: Return Scan Result
    }

    ConflictCheck --> Consistent: No Conflicts Detected
    ConflictCheck --> Inconsistent: Contradiction Flagged

    state Inconsistent {
        [*] --> EvaluateProvenance: Compare Confidence & Timestamps
        EvaluateProvenance --> HigherConfidence: New Fact Stronger
        EvaluateProvenance --> LowerConfidence: Stored Fact Stronger

        HigherConfidence --> RetractBelief: Retract Stored Edge & Dependencies
        LowerConfidence --> RejectFact: Mark New Fact Inactive
    }

    Consistent --> CommitGraph: Write Edge to Graph
    RetractBelief --> CommitGraph: Overwrite & Update Graph State
    RejectFact --> AuditLog: Append to Discard Log

    CommitGraph --> TriggerInference: Notify Logic Engine
    AuditLog --> [*]
    TriggerInference --> [*]
```

---

### 2.4 End-to-End Execution Sequence Flow

This sequence details how a prompt containing contradictory or updated information flows through the engine to produce a verified response.

```mermaid
sequenceDiagram
    autonumber
    actor User as User / External API
    participant NL as Neural Interface (Parse/Gen)
    participant TMS as Truth Maintenance System
    participant KG as Semantic Knowledge Graph
    participant Logic as Symbolic Logic Engine
    participant WM as Abstract World Model

    User->>NL: Input: "Alex switched to a vegan diet."
    NL->>TMS: Extract Triple: (Alex, follows_diet, Vegan)
    TMS->>KG: Query existing relations for (Alex, follows_diet, *)
    KG-->>TMS: Return: (Alex, follows_diet, Omnivore) [Conf: 0.85, Time: t-1]

    rect rgb(30, 41, 59)
        note over TMS,KG: Conflict Resolution Protocol
        TMS->>TMS: Evaluate Metadata: New Conf (0.95) > Stored Conf (0.85)
        TMS->>KG: Retract Edge: (Alex, follows_diet, Omnivore)
        TMS->>KG: Invalidate Downstream Inferences: (Alex, eats, Meat)
        TMS->>KG: Commit Edge: (Alex, follows_diet, Vegan) [Conf: 0.95, Time: t-0]
    end

    TMS->>Logic: Trigger Forward-Chaining Inference
    Logic->>KG: Fetch Rules matching "follows_diet: Vegan"
    Logic->>KG: Deduce New Rule: (Alex, dislikes, Meat)
    Logic->>WM: Validate Inferred State in Latent Representation Space
    WM-->>Logic: State Validation Passed (Stability Score: 0.98)
    Logic->>KG: Commit Verified Inference: (Alex, dislikes, Meat)

    Logic->>NL: Pass Deductive Proof Tree & State Constraints
    NL-->>User: Output: "Updated Alex's profile to vegan. Inferred that Alex avoids meat products."
```

---

### 2.5 Abstract World Model Transition Dynamics

The Abstract World Model models conceptual and physical transition dynamics in representation space, ensuring logical inferences adhere to world constraints.

```mermaid
flowchart LR
    subgraph StateSpace ["Latent Representation Space"]
        S0["Current World State (S₀)"]
        S1["Predicted World State (S₁)" ]
    end

    subgraph ActionModel ["Transition Prediction"]
        Action["Proposed Action / Deduction (A)"]
        Predictor["Predictor Network (JEPA Architecture)"]
    end

    subgraph ConstraintVerification ["Validation Gate"]
        Invariants["World Invariants & Physical Rules"]
        Evaluator{"Invariant Check"}
        Approved["State Approved"]
        Rejected["State Rejected / Constraint Violation"]
    end

    S0 --> Predictor
    Action --> Predictor
    Predictor --> S1
    S1 --> Evaluator
    Invariants --> Evaluator
    Evaluator -->|Pass| Approved
    Evaluator -->|Fail| Rejected
```

---

### 2.6 Continual Learning & Memory Stream Routing

```mermaid
flowchart TD
    Stream[Continuous Data Input Stream] --> Router{Data Type Classifier}
    
    Router -->|Factual / Relational| SymbolicPath[Symbolic Memory Pipeline]
    Router -->|Linguistic / Pattern| NeuralPath[Neural Memory Buffer]

    subgraph Symbolic Processing
        SymbolicPath --> Parser[Triple Extractor]
        Parser --> TMSEngine[TMS Conflict Evaluation]
        TMSEngine --> KGUpdate[(Knowledge Graph Ingestion)]
    end

    subgraph Neural Processing
        NeuralPath --> ReplayBuffer[Experience Replay Buffer]
        ReplayBuffer --> ParametricUpdate[Periodic Sparse Fine-Tuning]
    end

    KGUpdate --> SyncedState[(Unified Memory Core)]
    ParametricUpdate --> SyncedState
```

---

## 3. Mathematical & Logical Formalization

### 3.1 Graph Representation

Knowledge is structured as an attributed multi-graph:

$$G = (V, E)$$

Where an edge $e \in E$ is defined as a tuple:

$$e = (u, v, r, c, s, t)$$

* $u, v \in V$: Source and target entity nodes.
* $r$: Relation predicate type.
* $c \in [0, 1]$: Confidence score derived from source authority and extraction certainty.
* $s$: Provenance source identifier.
* $t \in \mathbb{R}^+$: Timestamp marker.

### 3.2 Belief Revision & Conflict Resolution Rule

Let $e_{\text{new}} = (u, v, r_{\text{new}}, c_{\text{new}}, s_{\text{new}}, t_{\text{new}})$ be an incoming relation, and $E_{\text{conflict}} \subset E$ be the set of existing edges that logically contradict $e_{\text{new}}$:

$$\text{Action}(e_{\text{new}}) = 
\begin{cases} 
\text{Commit}(e_{\text{new}}) \text{ and } \text{Retract}(E_{\text{conflict}}), & \text{if } c_{\text{new}} > \max_{e \in E_{\text{conflict}}} c(e) \\
\text{Reject}(e_{\text{new}}), & \text{otherwise}
\end{cases}$$

**Note:** This rule assumes confidence scores are on a unified scale. In practice, scores from different sources (neural extraction vs. curated data) may need calibration before comparison.

---

## 4. Architectural Comparison

| Capability | Standard Token LLMs | Classic Symbolic Systems | This Engine |
| --- | --- | --- | --- |
| **Language Processing** | Native / High | Non-Existent / Rigid | **Neural Front-End (Fluent)** |
| **Fact Storage** | Implicit Weight Matrices | Explicit Static Rulebases | **Dynamic Attributed Multi-Graph** |
| **Belief Revision** | Requires Retraining / Fine-Tuning | Manual Database Overwrite | **Real-time Automated TMS** |
| **Hallucination Rate** | High (Unbounded) | Minimal | **Reduced (Graph-Grounded, but depends on extraction quality)** |
| **Logical Inference** | Probabilistic Pattern Matching | Deterministic Deduction | **Deterministic Forward/Backward Chaining** |
| **State Tracking** | Context Window Dependent | Structural Dependency Graphs | **Latent World Model & Graph Persistence** |

---

## 5. Implementation Roadmap

```mermaid
gantt
    title System Implementation Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1: Core Data Layer
    Data Schemas & Knowledge Graph Engine  :active, p1a, 2026-10-01, 30d
    Attributed Multi-Graph API Implementation :p1b, 2026-10-15, 30d
    
    section Phase 2: Truth Maintenance
    TMS Ingestion & Conflict Detection Algorithms :p2a, 2026-11-01, 45d
    AGM Belief Revision Engine                  :p2b, 2026-11-15, 45d

    section Phase 3: Neural & Symbolic Integration
    Neural Triple Extractor Subsystem         :p3a, 2026-12-15, 30d
    Symbolic Logic Chaining Engine            :p3b, 2027-01-01, 45d

    section Phase 4: World Model & Validation
    Latent State Predictor Network            :p4a, 2027-02-01, 60d
    End-to-End System Evaluation & Grounding  :p4b, 2027-03-15, 45d
```

---

## Next Steps

* **Python Prototype Core:** Draft data classes for the Semantic Knowledge Graph, Edge Metadata, and TMS.
* **Logic Engine Expansion:** Formalize forward/backward chaining rules and pattern-matching logic.
* **Benchmark & Eval:** Measure extraction quality, conflict resolution accuracy, and inference correctness.
