---
name: fast-sdlc
description: |
  Fully automated Software Development Life Cycle (SDLC) accelerator for software projects (web apps, APIs, mobile apps, and microservices). The user only needs to describe a product idea or feature request; the agent automatically infers a suitable tech stack, then completes all five SDLC stages and outputs one structured Markdown document per stage.

  **Language rule**: Detect the language of the user's input and generate ALL output documents in that same language. For example, if the user writes in Chinese, all 5 stage documents must be written in Chinese. If the user writes in English, output in English. The skill definition itself is in English, but output language always follows the user.

  When to trigger this skill (if ANY of the following is true, use it immediately):
  - User says: "Help me plan/design/develop a [product/feature/system]"
  - User says: "Build an app from scratch…", "I have an idea…", "Make a web application…"
  - User mentions SDLC, software development lifecycle, product planning, technical design
  - User explicitly asks for PRD, system architecture, implementation plan, test cases, or deployment guide (any subset)
  - Any task that spans **from requirements to code** for a web project, even if the user does not say "SDLC"
---

# Fast SDLC — Fully Automated Software Development Lifecycle

## Overview

After receiving the user's product/feature description, **do NOT ask clarifying questions first** (unless the user explicitly requests interactive mode).
Instead, immediately execute all five stages below and produce **one separate `.md` file per stage**. Present all files together so the user can review them.

### Partial Execution

If the user only requests specific stages (e.g., "just give me a PRD", "I need architecture and implementation"), generate **only the requested stages**. Skip unrequested stages but still run Step 0 internally for consistency. Use the same file naming convention for whichever stages are generated.

### Interactive Mode

If the user requests review before proceeding (e.g., "let me review first", "confirm before continuing"), pause after Step 0 and present the inferred project type, recommended tech stack, MVP scope, and entity glossary. Wait for user confirmation before generating stage documents.

---

## Execution Flow

### Step 0 — Fast Reasoning (internal, no direct output)

Before generating any files, reason internally about:

1. **Project type** — SaaS, tool site, content platform, e-commerce, admin panel, or something else?
2. **Candidate tech stacks** — based on complexity, team size, performance needs, and common practice, list 2–3 candidates from the 5 categories in `references/tech-stacks.md` (JS/TS full-stack, Python backend, Go backend, Java/Kotlin backend, microservices)
3. **Core entities** — the 3–5 most important entities in the data model
4. **MVP scope** — which features are MVP, which can be deferred to V2
5. **Glossary** — define a consistent naming table for core entities, features, and API paths. All subsequent stages MUST use these exact names.

After this reasoning, **start generating the stage documents directly** (unless in interactive mode).
At the top of the first document, briefly state your inferred project type and recommended stack in one sentence.

---

### Stage 1 — Requirements & PRD (output: `01-PRD.md`)

Follow `references/prd-template.md` and produce a PRD containing at least:

```
# [Project Name] — Product Requirements Document (PRD)

## Background & Objectives
- One-sentence description
- Core value proposition
- Success metrics (quantifiable)
- Business model / monetization strategy (if applicable)

## Competitive Analysis
| Competitor | Strengths | Weaknesses | Our Differentiation |
|------------|-----------|------------|---------------------|
| ...        | ...       | ...        | ...                 |

## User Personas
| Persona | Description | Core Need |
|---------|-------------|-----------|
| ...     | ...         | ...       |

## User Journey Map
- End-to-end flow diagram (Mermaid flowchart) for each primary persona
- Key touchpoints, decision points, and pain points

## Functional Requirements (User Story Format)
### MVP Features (prioritized)
Priority levels: P0 (must-have) / P1 (should-have) / P2 (nice-to-have)
- [P0] As a [persona], I want [feature], so that [value]. Acceptance criteria: [conditions]
### V2 Features (deferred)
- ...

## Non-Functional Requirements
- Performance: ...
- Security: ...
- Accessibility: WCAG 2.1 AA compliance targets
- Compatibility: ...

## Risk Assessment
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| ...  | H/M/L  | H/M/L       | ...        |

## Constraints & Assumptions

## Milestone Plan
| Milestone | Scope | Owner / Role | Estimated Duration |
|-----------|-------|--------------|--------------------|
(Duration should scale with project complexity — do NOT use fixed defaults)
```

---

### Stage 2 — System Design & Architecture (output: `02-Architecture.md`)

Use `references/tech-stacks.md` as guidance and generate:

```
# [Project Name] — System Architecture

## Tech Stack Decision
### Recommended Stack (with rationale)
| Layer    | Technology | Alternative | Rationale |
|----------|-----------|-------------|-----------|

### Stack Comparison (when multiple options are viable)
...

## System Architecture Diagram (Mermaid)
- Overall architecture (frontend, backend, database, external services)

## Data Model
- Core entity ER diagram (Mermaid)
- Key fields for each entity

## API Design (RESTful / GraphQL / gRPC)
- Versioning strategy (URL path `/v1/`, header, or query param)
- Core endpoint list (method, path, description)
- Authentication & authorization flow diagram (Mermaid sequence diagram)
- RBAC / permission model (if applicable)

## Directory Structure
- Recommended project directory tree

## Deployment Architecture
- Development environment
- Production environment recommendations
- Network topology (VPC, subnets, firewall rules — if applicable)
```

---

### Stage 3 — Implementation Blueprint (output: `03-Implementation.md`)

**Important**: do **NOT** generate a full production-ready codebase.
Create an **implementation blueprint** — key code skeletons, file-level task list, and integration guidance so that a developer or coding agent can quickly implement the project.

```
# [Project Name] — Implementation Blueprint

## Project Initialization
- Scaffold commands
- Dependency install list

## File-Level Task Checklist
Ordered list of files to create/modify, each with:
- File path
- Responsibility
- Key implementation notes
- Dependencies on other files

## Core Module Implementation
For each core module, provide:
- Module responsibility
- Key code snippets (skeleton/example, not full implementation)
- Gotchas and common pitfalls

## State Management (frontend)

## Authentication Flow
- Auth strategy (session-based / JWT / OAuth2) with rationale
- Token refresh & session invalidation logic
- RBAC vs ABAC model and permission definitions

## Database Schema (SQL or ODM definitions)
- Migration tooling and workflow (e.g., Drizzle Kit, Prisma Migrate, Alembic, Flyway)
- Seed data / fixture scripts for development

## Error Handling & Logging Strategy
- Global error handler pattern (backend + frontend error boundaries)
- Structured logging format (JSON logs with correlation IDs)
- Error classification (client errors vs server errors vs infrastructure)

## Code Quality Tooling
- Linter & formatter config (ESLint/Biome, Prettier, Ruff, golangci-lint, etc.)
- Git hooks (Husky + lint-staged / pre-commit)
- PR template and code review checklist

## Third-Party Integration Guide
- Authentication providers (OAuth, SSO)
- Payment processing (Stripe, etc.)
- Email/notification services
- File storage (S3, Cloudflare R2, etc.)

## Environment Variables (`.env.example`)
## Development Startup Guide

## Agent Execution Prompt
> A ready-to-use prompt that can be fed to a coding agent to implement
> this blueprint. Summarize the tech stack, directory structure, and
> ordered task list in a single actionable instruction block.
```

---

### Stage 4 — Test Cases & QA (output: `04-QA.md`)

```
# [Project Name] — Test Plan

## Test Strategy Overview
- Test pyramid: recommended unit / integration / E2E ratio
- Coverage targets (e.g., unit > 80%, integration > 60%)
- CI integration: which tests run on PR, which on merge, which nightly

## Test Data Strategy
- Seed data / fixtures / factory approach
- Test database setup and teardown workflow
- Sensitive data handling in test environments

## Unit Test Cases
| Module | Scenario | Input | Expected Output | Priority |
|--------|----------|-------|----------------|----------|

## Integration Test Cases (API layer)
| Endpoint | Scenario | Request | Expected Response |
|----------|----------|---------|-------------------|

## E2E Test Cases (critical user journeys)
- Scenario descriptions (Gherkin format)

## Security Testing
- OWASP Top 10 checklist (XSS, CSRF, SQL injection, broken auth, etc.)
- Dependency vulnerability scanning (npm audit, Snyk, Trivy)
- Recommended penetration testing scope

## Accessibility Testing
- WCAG 2.1 AA compliance checks
- Tooling: axe-core, Lighthouse accessibility audit, screen reader testing

## Boundary Conditions & Error Scenarios
## Performance Test Recommendations
## Recommended Testing Tools (matching the tech stack)

> Note: For CI test integration details, see Stage 5 — CI/CD Pipeline section.
```

---

### Stage 5 — Deployment & Operations (output: `05-Deployment.md`)

```
# [Project Name] — Deployment & Operations Guide

## Containerization
- Dockerfile (multi-stage build)
- docker-compose.yml (dev and prod profiles)

## Infrastructure as Code (if applicable)
- IaC tooling: Terraform / Pulumi / AWS CDK / SST
- Resource definitions (compute, database, networking, DNS)
- Environment provisioning workflow

## CI/CD Pipeline
- GitHub Actions workflow (or equivalent)
- Build → lint → test → deploy stages
- Test integration: run test suites defined in Stage 4 (unit on PR, integration on merge, E2E nightly)
- Deployment strategy: blue-green / canary / rolling update

## Rollback Strategy
- How to roll back a failed deployment (automated vs manual)
- Database migration rollback approach
- Feature flags for gradual rollout (if applicable)

## Environment Management
- Environment variable inventory (dev / staging / prod)
- Secrets management: specific tooling (e.g., Vault, AWS Secrets Manager, Doppler, SOPS, .env.vault)

## Network & Security Architecture
- VPC / subnet layout (if cloud-hosted)
- WAF / DDoS protection
- Firewall rules and ingress/egress policies
- SSL certificate management (Let's Encrypt / ACM / Cloudflare)

## Observability Stack
- Logging: tool recommendations matching tech stack (e.g., Pino/Winston for Node.js, Loguru for Python, Zap for Go)
- Metrics: Prometheus + Grafana / Datadog / CloudWatch
- Tracing: OpenTelemetry + Jaeger / Zipkin
- Error tracking: Sentry / Bugsnag
- Uptime monitoring: Uptime Kuma / Better Stack / Pingdom

## Database Operations
- Connection pooling strategy (PgBouncer, built-in pool, HikariCP)
- Backup schedule and retention policy
- Read replica configuration (if applicable)
- Migration deployment workflow (how to run migrations in production safely)

## Production Checklist
- [ ] HTTPS / TLS configured
- [ ] Database backups scheduled and tested
- [ ] Error tracking integrated
- [ ] Structured logging enabled
- [ ] Rate limiting & CORS configured
- [ ] Health check endpoint implemented (`/healthz`)
- [ ] Rollback procedure tested
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] Dependency vulnerability scanning in CI

## Scaling Considerations
- Horizontal scaling strategy
- Caching layer recommendations (Redis, CDN, application-level)
- CDN configuration
- Auto-scaling policies (if applicable)
```

---

## Output Conventions

0. **Language**: All output documents MUST be written in the same language as the user's input. Detect the user's language automatically. Document file names remain in English (e.g., `01-PRD.md`), but all content inside follows the user's language.
1. **One file per stage** named exactly:
   - `01-PRD.md`
   - `02-Architecture.md`
   - `03-Implementation.md`
   - `04-QA.md`
   - `05-Deployment.md`
2. Save all files under: `./[project-name]-sdlc/` in the current working directory.
3. After generating all files, list the file paths and write a short **execution summary**:
   - Inferred tech stack (1–2 sentences)
   - 3 core MVP features (bullet list)
   - Rough complexity estimate (e.g., "suitable for a 2–3 person team, 3–4 weeks")
   - Top 1–2 risks from the risk assessment and their mitigations

## Quality Checklist

Before finishing, self-check:
- [ ] PRD contains at least one **quantifiable** success metric
- [ ] PRD includes competitive analysis and user journey map
- [ ] MVP features have priority labels (P0/P1/P2)
- [ ] PRD includes a risk assessment table
- [ ] Architecture file includes at least one Mermaid diagram
- [ ] Architecture specifies API versioning strategy
- [ ] Tech stack comparison table has >= 2 options when multiple stacks are viable
- [ ] Every API endpoint listed has a brief description
- [ ] Implementation blueprint includes error handling, logging, and code quality sections
- [ ] Database migration tooling is specified
- [ ] Test cases cover the happy path and at least **3** edge/error scenarios
- [ ] QA includes security testing (OWASP) and accessibility testing sections
- [ ] Test coverage targets are defined
- [ ] Deployment guide includes rollback strategy and observability stack
- [ ] Secrets management specifies concrete tools
- [ ] **Naming is consistent** across all 5 documents — verify against the Step 0 glossary
- [ ] No hardcoded environment-specific paths in any document
- [ ] Deployment guide matches the tech stack chosen in Stage 2

## Reference Files

- `references/tech-stacks.md` — common web stacks, characteristics, and suitable scenarios
- `references/prd-template.md` — PRD template and writing guidelines
