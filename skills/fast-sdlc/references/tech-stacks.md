# Web Tech Stack Reference Guide

## Selection Rules

Choose a recommended stack based on project characteristics:

| Project Characteristics | Recommended Stack | Rationale |
|------------------------|-------------------|-----------|
| Content-focused, SEO matters | Next.js + PostgreSQL | Strong SSR/SSG capabilities |
| Complex interactions, real-time data | React + Node.js + MongoDB | Full JS ecosystem, flexible |
| Data-intensive admin panels | Vue 3 + FastAPI + PostgreSQL | High dev efficiency, auto OpenAPI docs |
| Simple CRUD, fast launch | Next.js + Supabase | Full-stack in one, managed database |
| High-concurrency API services | Go (Gin/Fiber) + PostgreSQL | Go excels at concurrency and performance |
| Prototype / MVP validation | Next.js + Drizzle + SQLite→PG | Fastest startup |
| Content-rich + type safety | SvelteKit + Drizzle + PostgreSQL | Minimal boilerplate, excellent DX |
| Enterprise systems, complex domains | Java Spring Boot + React/Vue | Mature ecosystem, strong typing, enterprise patterns |
| AI/ML-integrated apps | Python (FastAPI/Django) + React | Python ML ecosystem, seamless model serving |
| Microservices architecture | Go / Java / Node.js + API Gateway | Independent scaling, polyglot services |
| Real-time + event-driven | Node.js / Go + Kafka/RabbitMQ + React | Event streaming, async processing |
| Cross-platform mobile app | React Native (Expo) / Flutter | Shared codebase, single team |
| Desktop application | Tauri + React/Vue/Svelte | Tiny binary, native performance |

---

## Stack Details

### Category 1: JavaScript/TypeScript Full-Stack

#### Stack A: Next.js Full-Stack (recommended MVP default)
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui
- **Backend**: Next.js Route Handlers / Server Actions
- **Database**: PostgreSQL + Drizzle ORM (or Prisma)
- **Auth**: NextAuth.js v5 / Clerk / Lucia
- **Deployment**: Vercel + Supabase / Neon / Railway
- **Best for**: Content platforms, SaaS, admin panels
- **Pros**: Single repo, Vercel deploy is trivial, React Server Components
- **Cons**: Hard to split API layer when business logic grows complex

#### Stack B: React + Node.js Separated Architecture
- **Frontend**: React 19, Vite, Tailwind CSS, Zustand / Jotai
- **Backend**: Node.js + Hono / Fastify, Zod validation, tRPC (optional)
- **Database**: PostgreSQL + Drizzle / MongoDB + Mongoose
- **Auth**: JWT + Refresh Token / Lucia
- **Deployment**: Vercel / Cloudflare Pages (frontend) + Railway / Fly.io (backend)
- **Best for**: Team collaboration, clear frontend/backend separation
- **Pros**: Clear responsibilities, scales independently
- **Cons**: CORS config, more complex deployment

#### Stack C: Next.js + Supabase (rapid prototyping)
- **Frontend + Backend**: Next.js 15
- **BaaS**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Deployment**: Vercel + Supabase Cloud
- **Best for**: Solo developers, quick idea validation
- **Pros**: Near-zero backend code, realtime subscriptions out of the box
- **Cons**: Vendor lock-in risk, limited for complex business logic

#### Stack D: SvelteKit + Drizzle (modern full-stack)
- **Frontend + Backend**: SvelteKit 2, Tailwind CSS, Bits UI / Skeleton
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Lucia / custom session-based
- **Deployment**: Vercel / Cloudflare Pages / Node adapter
- **Best for**: Performance-critical apps, developers who prefer minimal abstractions
- **Pros**: Smallest bundle size, no virtual DOM, excellent DX, type-safe DB queries
- **Cons**: Smaller ecosystem than React/Vue, fewer UI component libraries

#### Stack E: Nuxt 3 Full-Stack
- **Frontend + Backend**: Nuxt 3, Tailwind CSS, Nuxt UI
- **Database**: PostgreSQL + Drizzle / Prisma
- **Auth**: nuxt-auth-utils / Lucia
- **Deployment**: Vercel / Cloudflare / Nitro (multi-platform)
- **Best for**: Vue teams wanting full-stack, SEO-heavy projects
- **Pros**: Auto-imports, file-based routing, Nitro server engine (deploy anywhere)
- **Cons**: Nuxt-specific patterns have a learning curve

---

### Category 2: Python Backend

#### Stack F: Vue 3 + FastAPI
- **Frontend**: Vue 3, Vite, Pinia, Element Plus / Naive UI
- **Backend**: Python FastAPI, Pydantic v2, SQLAlchemy 2.0
- **Database**: PostgreSQL
- **Auth**: JWT (PyJWT) / OAuth2 with FastAPI security
- **Deployment**: Docker Compose, Fly.io / Railway
- **Best for**: Python-background teams, data-processing-heavy projects
- **Pros**: Python ecosystem (ML/data), auto-generated OpenAPI docs, async support
- **Cons**: Two languages across frontend/backend

#### Stack G: React + Django (enterprise Python)
- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Django 5 + Django REST Framework / Django Ninja
- **Database**: PostgreSQL
- **Auth**: Django built-in auth + django-allauth / JWT
- **Task Queue**: Celery + Redis
- **Deployment**: Docker, AWS / GCP / Azure
- **Best for**: Enterprise apps, content management, projects needing built-in admin
- **Pros**: Batteries included (admin, ORM, auth, migrations), massive ecosystem, mature and battle-tested
- **Cons**: Monolithic by default, Django ORM less flexible than SQLAlchemy for complex queries

#### Stack H: Python + AI/ML Integration
- **Frontend**: React 19 / Next.js 15, Tailwind CSS
- **Backend**: FastAPI + LangChain / LlamaIndex / custom ML pipeline
- **Database**: PostgreSQL + pgvector (vector search) / Redis
- **Model Serving**: vLLM / TGI / Ollama (local) / OpenAI API / Anthropic API
- **Deployment**: Docker, AWS SageMaker / GCP Vertex AI / Modal / Replicate
- **Best for**: AI-powered products, RAG applications, chatbots, recommendation engines
- **Pros**: Seamless Python ML ecosystem, direct model access, vector DB integration
- **Cons**: GPU infrastructure costs, model versioning complexity

---

### Category 3: Go Backend

#### Stack I: React + Go (high-performance API)
- **Frontend**: React 19 / Next.js 15, Tailwind CSS
- **Backend**: Go + Gin / Fiber / Echo
- **Database**: PostgreSQL + sqlc / GORM / Ent
- **Auth**: JWT (golang-jwt) / OAuth2
- **Deployment**: Docker, Kubernetes / Fly.io / Railway
- **Best for**: High-concurrency APIs, real-time services, performance-critical backends
- **Pros**: Exceptional concurrency (goroutines), fast compile, small binary, low memory footprint
- **Cons**: More verbose than dynamic languages, smaller web framework ecosystem

#### Stack J: Go Microservices
- **Services**: Go + Gin / Fiber / gRPC
- **Communication**: gRPC (internal) + REST (external), Protocol Buffers
- **Message Queue**: NATS / Kafka / RabbitMQ
- **Service Discovery**: Consul / etcd / Kubernetes DNS
- **Database**: PostgreSQL / Redis / MongoDB (per service)
- **Observability**: OpenTelemetry + Jaeger + Prometheus + Grafana
- **Deployment**: Docker + Kubernetes (Helm charts)
- **Best for**: Large-scale distributed systems, high-throughput event processing
- **Pros**: Lightweight binaries, excellent concurrency, strong stdlib for networking
- **Cons**: Service orchestration complexity, distributed debugging overhead

---

### Category 4: Java/Kotlin Backend

#### Stack K: React + Spring Boot (enterprise standard)
- **Frontend**: React 19, Vite, Tailwind CSS / Ant Design
- **Backend**: Java 21+ / Kotlin + Spring Boot 3, Spring Security, Spring Data JPA
- **Database**: PostgreSQL / MySQL + Hibernate
- **Auth**: Spring Security + OAuth2 / JWT / Keycloak
- **Build**: Gradle (Kotlin DSL) / Maven
- **Deployment**: Docker, Kubernetes, AWS / Azure / GCP
- **Best for**: Enterprise applications, banking/finance, large team projects
- **Pros**: Extremely mature ecosystem, strong typing, enterprise patterns (DDD, CQRS), excellent tooling (IntelliJ)
- **Cons**: Verbose boilerplate, higher memory usage, slower startup (mitigated by GraalVM native image)

#### Stack L: Spring Cloud Microservices
- **Services**: Spring Boot 3 + Spring Cloud (Gateway, Config, Circuit Breaker)
- **Communication**: REST / gRPC / Spring Cloud Stream (Kafka/RabbitMQ)
- **Service Discovery**: Eureka / Consul / Kubernetes
- **Config Management**: Spring Cloud Config / Nacos
- **Database**: PostgreSQL / MySQL per service, Redis for caching
- **Observability**: Micrometer + Prometheus + Grafana, Zipkin / Jaeger for tracing
- **Deployment**: Docker + Kubernetes, Helm charts
- **Best for**: Large enterprise microservices, organizations with Java expertise
- **Pros**: Complete microservice toolkit, production-proven at scale, rich middleware integration
- **Cons**: High resource consumption, complex configuration, steep learning curve

#### Stack M: Kotlin + Ktor (lightweight JVM)
- **Frontend**: React 19 / Vue 3, Vite, Tailwind CSS
- **Backend**: Kotlin + Ktor, Exposed ORM / Ktorm
- **Database**: PostgreSQL
- **Auth**: Ktor auth plugin + JWT
- **Deployment**: Docker, Fly.io / Railway / Kubernetes
- **Best for**: Teams wanting JVM power with modern language features, lightweight APIs
- **Pros**: Kotlin coroutines (async), concise syntax, full Java interop, lightweight
- **Cons**: Smaller community than Spring, fewer enterprise libraries

---

### Category 5: Microservices & Event-Driven Architecture

#### Stack N: Node.js Microservices (NestJS)
- **Services**: NestJS (TypeScript), modular architecture, Fastify adapter
- **Communication**: REST / gRPC / NATS / RabbitMQ
- **API Gateway**: Kong / AWS API Gateway / custom NestJS gateway
- **Database**: PostgreSQL + Prisma / MongoDB per service
- **Caching**: Redis
- **Observability**: OpenTelemetry + Jaeger + Prometheus
- **Deployment**: Docker + Kubernetes
- **Best for**: TypeScript teams building microservices, backend-focused Node.js projects
- **Pros**: Opinionated structure (Angular-inspired), decorators, built-in DI, first-class microservice support
- **Cons**: NestJS overhead for simple services, Node.js single-thread limitation for CPU-heavy tasks

#### Stack O: Event-Driven / CQRS Architecture
- **Services**: Any language (Go / Java / Node.js / Python)
- **Event Bus**: Apache Kafka / AWS EventBridge / NATS JetStream
- **Event Store**: EventStoreDB / PostgreSQL (with event sourcing pattern)
- **Read Model**: Elasticsearch / Redis / PostgreSQL materialized views
- **API Layer**: GraphQL Federation / REST API Gateway
- **Deployment**: Docker + Kubernetes, managed Kafka (Confluent / AWS MSK)
- **Best for**: Complex domains (e-commerce, fintech), high-throughput event processing, audit-trail requirements
- **Pros**: Loose coupling, full audit trail, independent read/write scaling, temporal queries
- **Cons**: Eventual consistency complexity, higher infrastructure cost, steeper learning curve

---

### Category 6: Mobile & Cross-Platform

#### Stack P: React Native + Expo
- **Mobile**: React Native (Expo SDK), NativeWind (Tailwind for RN)
- **Navigation**: Expo Router (file-based)
- **Backend**: Any (Next.js API / FastAPI / Express — reuse existing backend)
- **State**: Zustand / Jotai / TanStack Query
- **Deployment**: EAS Build + EAS Submit (App Store / Google Play)
- **Best for**: Teams with React experience wanting cross-platform mobile
- **Pros**: Shared JS/TS codebase, OTA updates, huge ecosystem, Expo simplifies native modules
- **Cons**: Native performance ceiling for heavy animations, large app binary size

#### Stack Q: Flutter (cross-platform)
- **Mobile + Web + Desktop**: Flutter 3, Dart, Material 3 / Cupertino widgets
- **State**: Riverpod / Bloc
- **Backend**: Any (Go / FastAPI / Spring Boot)
- **Deployment**: Firebase App Distribution / App Store / Google Play
- **Best for**: Pixel-perfect cross-platform UI, teams starting fresh without JS baggage
- **Pros**: True single codebase (mobile + web + desktop), excellent performance, rich widget library
- **Cons**: Dart ecosystem smaller than JS/Python, larger learning curve for web developers

#### Stack R: Tauri (desktop + web)
- **Frontend**: React / Vue / Svelte / SolidJS (any web framework)
- **Backend**: Rust (Tauri core), system APIs
- **Database**: SQLite (local) / PostgreSQL (remote)
- **Deployment**: Cross-platform installers (Windows, macOS, Linux)
- **Best for**: Desktop applications with web UI, lightweight Electron alternatives
- **Pros**: Tiny bundle (~5MB vs Electron ~150MB), Rust backend performance, native system access
- **Cons**: Rust learning curve, smaller plugin ecosystem than Electron

---

## General Technology Decisions

### Language & Runtime Selection

| Language | Strengths | Choose When |
|----------|-----------|-------------|
| TypeScript/Node.js | Full-stack unification, huge ecosystem, fast iteration | MVP, SaaS, real-time apps, small-medium teams |
| Python | ML/AI ecosystem, readability, data processing | AI-integrated apps, data-heavy backends, scripting |
| Go | Concurrency, performance, small binaries | High-throughput APIs, microservices, DevOps tools |
| Java/Kotlin | Enterprise maturity, strong typing, JVM ecosystem | Enterprise systems, banking, large teams, complex domains |

### Database Selection

**Choose SQL (PostgreSQL) when**: Complex data relationships, transactions needed, team knows SQL
**Choose SQL (MySQL) when**: High read throughput, existing MySQL expertise, WordPress/PHP migration
**Choose NoSQL (MongoDB) when**: Document structure varies, horizontal scaling needed, prototyping phase
**Choose BaaS (Supabase/Firebase) when**: Rapid MVP, solo developer, limited budget
**Choose Redis when**: Caching, session storage, real-time leaderboards, pub/sub
**Choose Elasticsearch when**: Full-text search, log analytics, complex filtering

### ORM / Data Access Comparison

| Tool | Language | Strengths | Best For |
|------|----------|-----------|----------|
| Drizzle | TypeScript | Type-safe, SQL-like API, lightweight | Teams who think in SQL |
| Prisma | TypeScript | Declarative schema, great DX, rich ecosystem | Rapid development, schema-first |
| SQLAlchemy | Python | Mature, flexible, Python standard | Python backends |
| GORM | Go | Auto migrations, simple API | Go CRUD apps |
| sqlc | Go | Generates type-safe code from SQL | Go teams who prefer raw SQL |
| Hibernate/JPA | Java/Kotlin | Enterprise standard, lazy loading | Spring Boot projects |
| Exposed | Kotlin | Type-safe DSL, lightweight | Kotlin backends |

### API Layer Options

| Approach | When to Use |
|----------|-------------|
| REST (Express/Fastify/Hono) | Public APIs, microservices, simple CRUD |
| REST (Gin/Fiber/Echo) | High-performance Go APIs |
| REST (Spring Boot / Django / FastAPI) | Enterprise / Python backends |
| tRPC | Full-stack TypeScript, type-safe client-server |
| gRPC | Service-to-service communication, polyglot microservices |
| GraphQL | Complex nested data, multiple frontends |
| Server Actions (Next.js/SvelteKit) | Tightly coupled full-stack, form-heavy apps |

### Architecture Pattern Selection

| Pattern | When to Use |
|---------|-------------|
| Monolith | MVP, small team (< 5), simple domain, fast iteration needed |
| Modular Monolith | Medium complexity, single deploy unit but clear module boundaries |
| Microservices | Large team, independent scaling, polyglot needs, complex domain |
| Serverless | Event-driven workloads, variable traffic, cost-sensitive |
| Event-Driven / CQRS | Complex domains, audit requirements, separate read/write scaling |

### Deployment Platforms

| Platform | Strengths |
|----------|-----------|
| Vercel | Best Next.js/SvelteKit support, edge functions |
| Cloudflare Pages/Workers | Global edge, generous free tier, fast cold starts |
| Fly.io | Container-based, global distribution, good for backends |
| Railway | Simple container deploy, managed databases |
| AWS (ECS/EKS/Lambda) | Full ecosystem, enterprise-grade, infinite scaling |
| GCP (Cloud Run/GKE) | Kubernetes native, strong AI/ML integration |
| Azure (AKS/Container Apps) | Enterprise integration, .NET-friendly, hybrid cloud |

### Message Queue / Event Bus Selection

| Tool | Strengths | Best For |
|------|-----------|----------|
| Kafka | High throughput, event sourcing, log compaction | Large-scale event streaming, audit trails |
| RabbitMQ | Flexible routing, mature, AMQP standard | Task queues, request-reply patterns |
| NATS | Lightweight, fast, cloud-native | Microservice communication, IoT |
| Redis Pub/Sub | Simple, low latency, already in stack | Basic pub/sub, real-time notifications |
| AWS SQS/SNS | Managed, serverless-friendly | AWS-native architectures |
