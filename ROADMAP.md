# 🚀 Submitify 2.0 Roadmap

This roadmap describes the planned development phases for Submitify 2.0.

Rather than building isolated features, each milestone focuses on delivering a working part of the system.

---

# Current Status

## Planning

- [x] Project Vision
- [x] Architecture Design
- [x] Database Design
- [x] Development Roadmap
- [ ] API Design
- [ ] Folder Structure

---

# Milestone 1 — Backend Foundation

Goal

Build the backend foundation that every future module will use.

Tasks

- [ ] Initialize Go project
- [ ] Project structure
- [ ] Configuration management
- [ ] Environment variables
- [ ] Logging
- [ ] HTTP server
- [ ] Health endpoint
- [ ] PostgreSQL connection
- [ ] Docker setup
- [ ] Docker Compose

Deliverable

A running Go backend connected to PostgreSQL inside Docker.

---

# Milestone 2 — Document Engine

Goal

Build the core Document Model that powers the entire application.

Tasks

- [ ] Metadata model
- [ ] Document model
- [ ] Experiment model
- [ ] Section model
- [ ] Database schema
- [ ] CRUD operations
- [ ] Repository layer

Deliverable

Backend can create and retrieve structured documents without AI.

---

# Milestone 3 — Rendering Engine

Goal

Convert the Document Model into HTML.

Tasks

- [ ] Cover page renderer
- [ ] Index renderer
- [ ] Experiment renderer
- [ ] Generic Section renderer
- [ ] HTML templates
- [ ] Preview endpoint

Deliverable

Backend renders a complete HTML document from stored data.

---

# Milestone 4 — Frontend Foundation

Goal

Rebuild the frontend around the new architecture.

Tasks

- [ ] Landing page
- [ ] Project Details
- [ ] Question Input
- [ ] Question Review
- [ ] API integration
- [ ] State management

Deliverable

Frontend can communicate with the backend and create documents.

---

# Milestone 5 — AI Engine

Goal

Integrate AI into the document generation workflow.

Tasks

- [ ] Groq client
- [ ] Prompt builder
- [ ] Structured Outputs
- [ ] Question parser
- [ ] Document classifier
- [ ] Content generator
- [ ] Error handling

Deliverable

AI generates structured document content from user questions.

---

# Milestone 6 — Editable Preview

Goal

Allow users to edit generated documents before exporting.

Tasks

- [ ] HTML preview
- [ ] Edit mode
- [ ] Rich text editing
- [ ] Code editing
- [ ] Live preview updates
- [ ] Save changes

Deliverable

Users can edit generated documents directly from the preview.

---

# Milestone 7 — Export Engine

Goal

Export edited documents into printable formats.

Tasks

- [ ] HTML → PDF
- [ ] HTML → DOCX
- [ ] Download API
- [ ] File cleanup

Deliverable

Users can export complete academic documents.

---

# Milestone 8 — Polish

Goal

Improve usability and developer experience.

Tasks

- [ ] Better loading states
- [ ] Error pages
- [ ] Empty states
- [ ] Validation
- [ ] Better logging
- [ ] Performance improvements
- [ ] Testing
- [ ] Documentation

Deliverable

Production-ready user experience.

---

# Milestone 9 — Deployment

Goal

Deploy the complete application.

Tasks

- [ ] Docker optimization
- [ ] Railway / Fly deployment
- [ ] Frontend deployment
- [ ] PostgreSQL deployment
- [ ] Environment configuration
- [ ] Health checks
- [ ] Domain configuration

Deliverable

Publicly accessible production deployment.

---

# Future Roadmap

The architecture is designed to support future features without major rewrites.

Potential future improvements

## AI

- [ ] Regenerate individual sections
- [ ] Better prompt optimization
- [ ] Multiple LLM providers
- [ ] Image generation
- [ ] Diagram generation

---

## Documents

- [ ] Multiple university templates
- [ ] Markdown export
- [ ] HTML export
- [ ] LaTeX export
- [ ] Equation rendering

---

## Productivity

- [ ] Save projects
- [ ] Auto-save
- [ ] Version history
- [ ] Collaborative editing

---

## User Features

- [ ] Authentication (only if users actually need it)
- [ ] Personal templates
- [ ] Project dashboard

---

# Development Principles

Throughout development, the following principles should always be followed.

- Build one working module at a time.
- Never implement multiple major features simultaneously.
- Prefer reusable components over duplicated code.
- Keep the Document Model as the single source of truth.
- AI should only generate structured content.
- Rendering and exporting should remain independent from AI.
- Every milestone should end with a working, testable application.

---

# Success Criteria

Submitify 2.0 will be considered complete when it can:

- Accept manual questions or parse question papers using AI.
- Generate multiple academic document types.
- Automatically generate cover pages and indexes.
- Allow users to edit generated content before export.
- Export professional PDF and DOCX documents.
- Run inside Docker.
- Be deployed as a production-ready application.