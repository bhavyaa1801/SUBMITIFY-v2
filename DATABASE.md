# Database Design

> Submitify 2.0 Database Design

The database is designed around the **Document Model**.

Instead of storing generated PDFs or fixed experiment fields, Submitify stores a structured representation of the document.

This allows the same architecture to support multiple document types without changing the schema.

---

# Core Principle

The database never stores

- PDFs
- HTML
- Hardcoded Aim/Algorithm/Code fields

Instead it stores

```
Document
        │
        ▼
Experiments
        │
        ▼
Sections
```

Everything else is generated from this structure.

---

# Domain Model

```
Document
│
├── Metadata
│
├── Experiments
│       │
│       ▼
│   Sections
│
└── Generated Files (Future)
```

---

# Entity Relationships

```
Document
    │
    ├──────────────┐
    ▼              ▼
Metadata      Experiments
                    │
                    ▼
                Sections
```

Relationship

```
Document

1

↓

Many

Experiments

1

↓

Many

Sections
```

---

# Entity: Document

Represents one academic document.

Example

```
DBMS Practical File

Computer Networks Lab

Operating Systems Assignment
```

Each document contains

- Metadata
- Cover Page Information
- Index
- Experiments

Suggested Fields

| Field | Description |
|--------|-------------|
| id | Unique document identifier |
| title | Document title |
| profile | Programming / Theory / SQL |
| created_at | Creation timestamp |
| updated_at | Last modification |

---

# Entity: Metadata

Metadata stores project information.

This information is used to generate the Cover Page.

Fields

| Field | Description |
|--------|-------------|
| university |
| department |
| semester |
| subject |
| subject_code |
| programming_language |
| faculty_name |
| student_name |
| roll_number |
| logo_path |

One Metadata record belongs to one Document.

---

# Entity: Experiment

Each document contains multiple experiments.

Examples

```
Experiment 1

Experiment 2

Experiment 3
```

Fields

| Field | Description |
|--------|-------------|
| id |
| document_id |
| experiment_number |
| question |
| order |

Relationship

```
Document

1

↓

Many

Experiments
```

---

# Entity: Section

Instead of storing

```
Aim

Algorithm

Code

Output
```

each Experiment stores a collection of Sections.

This removes the rigidity of the current architecture.

Fields

| Field | Description |
|--------|-------------|
| id |
| experiment_id |
| title |
| type |
| content |
| order |

Relationship

```
Experiment

1

↓

Many

Sections
```

---

# Example

Programming Experiment

```
Experiment

Question

↓

Sections

Aim

Algorithm

Source Code

Output
```

---

Theory Assignment

```
Experiment

↓

Sections

Answer
```

---

SQL Lab

```
Experiment

↓

Sections

Aim

Theory

SQL Query

Output
```

The schema never changes.

Only the data changes.

---

# Section Types

Supported types

- paragraph
- code
- table
- list

Future

- equation
- image
- diagram

The renderer uses the section type to determine how content should be displayed.

---

# Document Profiles

The database stores the selected profile.

Examples

- Programming Lab
- Theory Assignment
- SQL Lab
- Mathematics
- Generic Report

Each profile determines

- Section order
- Required sections
- Rendering rules

The AI only fills the content.

---

# Cover Page

The Cover Page is **not stored**.

It is generated dynamically using Metadata.

```
Metadata

↓

Cover Template

↓

Cover Page
```

---

# Index

The Index is **not stored**.

It is generated dynamically from the Experiment list.

```
Experiments

↓

Index Generator

↓

Index
```

Whenever experiments are reordered,

the generated index automatically updates.

---

# Generated Files

Future version

Generated files may be stored separately.

```
Document

↓

Generated Files

↓

PDF

DOCX
```

Initially,

documents will simply be regenerated when requested.

---

# Why this Design?

Current Version

```
Experiment

Aim

Algorithm

Code

Output
```

Problem

Adding new document types requires changing the database.

---

Submitify 2.0

```
Experiment

↓

Sections[]
```

Advantages

- Flexible
- Generic
- Easy to extend
- Supports multiple document types
- No schema changes required

---

# Future Expansion

The current schema is intentionally generic.

Future features can be added without redesigning the database.

Examples

- Save Projects
- Version History
- Multiple Templates
- User Accounts
- Collaborative Editing
- AI Regenerate Section
- Image Support
- Equation Support

---

# Database Philosophy

The database stores **structured content**, not rendered documents.

```
Database

↓

Document Model

↓

HTML Renderer

↓

Preview

↓

Export
```

The Document Model remains the single source of truth throughout the application.