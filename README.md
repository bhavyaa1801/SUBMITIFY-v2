# Submitify 2.0

> AI-powered Academic Document Generator & Editor built with Go, PostgreSQL and React.

Submitify 2.0 is a complete redesign of the original Submitify project.

Instead of being limited to programming practical files, Submitify 2.0 is designed as a **generic academic document generation platform** capable of generating multiple types of academic documents while maintaining a clean, editable and print-ready workflow.

---
## Why Submitify?

Students spend hours formatting laboratory files, writing repetitive experiment content, creating cover pages, and maintaining indexes.

Submitify automates this workflow by combining AI-powered content generation with structured document editing, allowing students to generate complete academic documents in minutes while still retaining full control over the final output.

Instead of replacing students, Submitify accelerates the documentation process by handling repetitive work and letting users focus on reviewing and refining the generated content.

---
## Features

### Smart Question Input

- Paste questions manually
- Upload question paper
- AI-powered question parsing
- Question review before generation

---

### AI-Powered Generation

- AI Document Classification
- AI Content Generation
- Structured Outputs
- Groq API Integration
- Multi-document support

---

### Academic Document Generation

Automatically generates

- Cover Page
- Index
- Experiment Content

Supports

- Programming Labs
- Theory Assignments
- SQL / DBMS Labs
- Generic Academic Documents

---

### Editable Preview

Instead of downloading immediately,

Users can

- Preview the generated document
- Edit generated content
- Update experiments
- Modify code
- Edit paragraphs

before exporting.

---

### Export

- PDF Export
- DOCX Export

---

## Architecture

Unlike the previous version, Submitify 2.0 follows a **Document Model Architecture**.

The AI does **not** generate PDFs.

Instead,

```text
AI
      │
      ▼
Document Model
      │
 ┌────┼────────────┐
 ▼    ▼            ▼
Preview Edit     Export
```

The **Document Model** becomes the single source of truth for the entire application.

---

## Workflow

```text
Project Details
        │
        ▼
Question Input
        │
 ┌──────┴─────────┐
 │                │
 ▼                ▼
Manual Text   Question Paper
 │                │
 └──────┬─────────┘
        ▼
AI Question Parser
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
        ▼
Editable Preview
        ▼
Export
```

---

## AI Responsibilities

The AI performs only three responsibilities.

### 1. Question Parsing

Converts raw text into structured questions.

---

### 2. Document Classification

Detects the document profile.

Examples

- Programming Lab
- Theory Assignment
- SQL Lab
- Mathematics
- Generic Report

---

### 3. Content Generation

Fills predefined document sections using Structured Outputs.

The AI never

- Generates PDFs
- Generates HTML
- Decides layouts

---

## Document Model

```
Document
│
├── Metadata
├── Cover Page
├── Index
├── Experiments
└── Exports
```

Each Experiment contains

```
Experiment
│
└── Sections[]
```

Each Section

```
Title
Type
Content
Order
```

This architecture allows Submitify to support multiple document types without changing the core system.

---

## Tech Stack

### Frontend

- React
- TailwindCSS

### Backend

- Go
- net/http
- PostgreSQL
- Docker

### AI

- Groq API
- Structured Outputs

### Export

- HTML Templates
- PDF
- DOCX

---

## Project Structure

```
submitify-v2
│
├── backend
│
├── frontend
│
├── migrations
│
├── docker
│
├── docs
│
├── README.md
├── ARCHITECTURE.md
├── ROADMAP.md
├── DATABASE.md
├── API.md
└── STRUCTURE.md
```

---

## Development Status

Current Phase

- [x] Product Architecture
- [x] System Design
- [x] AI Pipeline Design
- [ ] Backend Foundation
- [ ] Database
- [ ] Renderer
- [ ] AI Integration
- [ ] Editable Preview
- [ ] Export
- [ ] Deployment

---

## Roadmap

### Phase 1

- Backend Foundation
- PostgreSQL
- Docker
- Logging
- Configuration

### Phase 2

- Document Model
- HTML Renderer
- Preview Engine

### Phase 3

- Groq Integration
- AI Parser
- AI Classification
- AI Generation

### Phase 4

- Editable Preview
- Export Engine

### Phase 5

- Deployment

---

## Documentation

Detailed project documentation is available inside the `/docs` directory.

- Architecture
- API Design
- Database Design
- Roadmap
- Folder Structure

---

## Inspiration

Submitify 2.0 is a complete architectural redesign of the original Submitify project.

Rather than rewriting the old codebase, the project rebuilds the backend from scratch using lessons learned from Version 1 while reusing successful product ideas, UI concepts and document templates.

The goal is to create a scalable, production-ready academic document generation platform.

---
