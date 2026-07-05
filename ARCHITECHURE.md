# Submitify 2.0 - Architecture Design Document

> Version: 2.0
>
> Backend: Go
>
> Frontend: React + TailwindCSS
>
> Database: PostgreSQL
>
> AI: Groq API
>
> Deployment: Docker

---

# Vision

Submitify 2.0 is an AI-powered academic document generator and editor.

Unlike the current version, it is **not limited to programming practical files**.

The goal is to support multiple academic document types while maintaining a consistent user experience.

Examples:

- Programming Labs
- Theory Assignments
- SQL / DBMS Labs
- Networking Labs
- DAA
- AI
- Mathematics
- Future document types

The architecture should allow adding new document types without changing the core system.

---

# Core Philosophy

The most important design decision is:

> **AI never generates PDFs.**

AI only generates structured document content.

The Document Model becomes the single source of truth.

```
AI
      │
      ▼
Document Model
      │
 ┌────┼───────────┐
 ▼    ▼           ▼
Preview Edit   Export
```

Everything in the application revolves around the Document Model.

---

# User Flow

```
Landing Page
      │
      ▼
Project Details
      │
      ▼
Question Input
      │
 ┌────┴───────────┐
 │                │
 ▼                ▼
Paste Text    Upload Question Paper
 │                │
 └──────┬─────────┘
        ▼
AI Question Parser
        ▼
Structured Questions
        ▼
Review Questions
        ▼
AI Document Classification
        ▼
Load Document Profile
        ▼
AI Content Generation
        ▼
Document Model
        ▼
Editable Document Preview
        ▼
Export
   ├── PDF
   └── DOCX
```

---

# Step 1 - Project Details

The user enters project metadata.

Example:

- University
- Department
- Semester
- Subject
- Subject Code
- Programming Language
- Faculty Name
- Student Name
- Roll Number
- University Logo

These become

```
Document.Metadata
```

No AI is involved.

---

# Step 2 - Question Input

Two input methods are supported.

## Manual Input

User pastes questions.

Example

```
1. Implement Bubble Sort.

2. Implement Merge Sort.
```

The pasted text is **also passed through the AI Parser**.

Manual input and uploaded question papers both follow the exact same pipeline.

---

## Question Paper Parsing

User uploads a question paper.

Pipeline

```
Question Paper
        │
        ▼
Text Extraction
        │
        ▼
AI Parser
        │
        ▼
Structured Questions
```

Regex parsing is completely removed.

---

# Step 3 - Review Questions

The review screen already exists and will remain.

Users can:

- Edit questions
- Delete questions
- Add questions
- Reorder questions

This guarantees that incorrect AI parsing can always be fixed before generation.

---

# Step 4 - AI Document Classification

Instead of maintaining hundreds of subjects, AI classifies the document into a small set of document profiles.

Possible profiles

- Programming Lab
- Theory Assignment
- SQL Lab
- Mathematics
- Generic Report

AI answers only one question:

> Which document profile best matches these questions?

AI never decides the document structure.

---

# Step 5 - Document Profiles

Each profile defines the document structure.

## Programming Lab

Sections

- Aim
- Algorithm
- Source Code
- Output

---

## Theory Assignment

Sections

- Answer

---

## SQL Lab

Sections

- Aim
- Theory
- SQL Query
- Output

---

Future profiles can easily be added.

Examples

- Networking Lab
- Physics Lab
- Chemistry Lab
- Operating Systems
- AI Lab

Only new profiles are added.

The renderer never changes.

---

# Step 6 - AI Content Generation

The AI receives

- Metadata
- Question
- Document Profile

Example

```
Question

Implement Bubble Sort

Sections

Aim

Algorithm

Source Code

Output
```

AI fills only these predefined sections.

It never invents new section names.

This guarantees consistency across generated documents.

---

# Step 7 - Document Model

The Document Model is the heart of Submitify.

```
Document
│
├── Metadata
├── Cover Page
├── Index
├── Experiments
└── Exports
```

Everything in the system uses this model.

---

## Metadata

Stores project information.

Example

- University
- Department
- Semester
- Subject
- Subject Code
- Student
- Faculty
- Programming Language
- Logo

---

## Cover Page

Automatically generated.

Uses Metadata.

No AI required.

---

## Index

Automatically generated.

Uses the reviewed question list.

If questions are reordered,

the Index updates automatically.

---

## Experiments

Current version

```
Experiment

Aim

Algorithm

Code

Output
```

New version

```
Experiment

↓

Sections[]
```

This removes the rigidity of the current architecture.

---

## Section

Every experiment contains multiple sections.

Each section contains

```
Title

Type

Content

Order
```

Example

```
Title

Source Code

Type

code

Content

int main() { ... }

Order

3
```

Examples of supported section types

- paragraph
- code
- table
- equation (future)
- list

---

# Step 8 - Rendering Engine

The renderer never knows what an "Aim" is.

It simply renders sections based on their type.

Example

```
paragraph

↓

<p>

-------------------

code

↓

<pre>

-------------------

table

↓

<table>

-------------------

equation

↓

KaTeX (Future)
```

The renderer remains completely generic.

---

# Step 9 - Editable Preview

This is the biggest UX improvement.

Current

```
Generate

↓

Preview

↓

Download
```

New

```
Generate

↓

Editable Preview

↓

Download
```

The preview still contains

- Cover Page
- Index
- Experiments

The difference is that users can edit the generated content directly.

Users edit the **document**, not JSON.

Example

```
Aim

↓

Click

↓

Edit

↓

Save

↓

Preview Updates
```

Code sections open a code editor.

Paragraphs become editable text.

The editing experience should feel similar to Google Docs or Notion.

Internally

```
User Edit

↓

Update Document Model

↓

Re-render HTML

↓

Refresh Preview
```

The user never notices the internal process.

---

# Step 10 - Export

Once editing is complete

```
Document Model
      │
      ▼
HTML Rendering
      │
 ┌────┴────┐
 ▼         ▼
PDF      DOCX
```

PDF and DOCX are simply export formats.

The Document Model remains the source of truth.

---

# AI Responsibilities

The AI performs only three responsibilities.

## 1. Question Parsing

```
Raw Text

↓

Structured Questions
```

---

## 2. Document Classification

```
Questions

↓

Programming

Theory

SQL

Math

Generic
```

---

## 3. Content Generation

```
Question

+

Document Profile

↓

Filled Sections
```

AI never renders HTML.

AI never generates PDFs.

AI never handles exporting.

---

# Backend Responsibilities

The backend is responsible for

- Project Metadata
- Document Profiles
- Document Model
- HTML Rendering
- Editable Preview
- PDF Export
- DOCX Export
- PostgreSQL
- File Uploads
- AI Integration
- Logging
- Docker
- Deployment

---

# High-Level Architecture

```
                    User
                      │
                      ▼
              Project Details
                      │
          ┌───────────┴────────────┐
          ▼                        ▼
   Paste Questions         Upload Question Paper
          │                        │
          └────────────┬───────────┘
                       ▼
                AI Question Parser
                       ▼
             Structured Questions
                       ▼
                Review Questions
                       ▼
          AI Document Classification
                       ▼
              Document Profile
                       ▼
             AI Content Generation
                       ▼
                Document Model
      ┌───────────────┼────────────────┐
      ▼               ▼                ▼
 Cover Generator  Index Generator  Experiment Renderer
      │               │                │
      └───────────────┴────────────────┘
                      ▼
            Editable HTML Preview
                      ▼
              User Edits Content
                      ▼
            Updated Document Model
                      ▼
              Export PDF / DOCX
```

---

# Technology Stack

## Frontend

- React
- TailwindCSS

## Backend

- Go
- net/http
- PostgreSQL
- Docker
- HTML Templates

## AI

- Groq API
- Structured Output

## Export

- HTML → PDF
- HTML → DOCX

---

# Future Enhancements

The architecture is intentionally designed so future features can be added without major rewrites.

Examples

- More Document Profiles
- Multiple University Templates
- Save / Load Projects
- Authentication (if users actually need it)
- Regenerate Individual Sections
- Markdown Export
- HTML Export
- KaTeX Equation Support
- Image Generation
- Version History
- Auto Save
- Collaborative Editing

---

# Final Design Principle

The Document Model is the heart of Submitify 2.0.

Every feature should extend the Document Model instead of bypassing it.

```
Metadata
      │
Questions
      │
AI
      │
Document Model
      │
 ┌────┼─────────┐
 ▼    ▼         ▼
Preview Edit  Export
```

If a future feature naturally fits into the Document Model, the architecture remains clean, maintainable, and extensible.

---
