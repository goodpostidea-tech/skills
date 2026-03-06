# Web 技术栈参考指南

## 推断规则

根据项目特征选择推荐栈：

| 项目特征 | 推荐栈 | 理由 |
|---------|--------|------|
| 内容展示为主、SEO 重要 | Next.js + PostgreSQL | SSR/SSG 能力强 |
| 复杂交互、实时数据 | React + Node.js + MongoDB | 全 JS 生态、灵活 |
| 数据密集型后台管理 | Vue 3 + FastAPI + PostgreSQL | 开发效率高 |
| 简单 CRUD、快速上线 | Next.js + Supabase | 全栈一体、托管数据库 |
| 高并发 API 服务 | React + Go + PostgreSQL | Go 性能优异 |
| 原型验证 / MVP | Next.js + Prisma + SQLite→PG | 极速启动 |

---

## 主流栈详情

### 栈 A：Next.js 全栈（推荐 MVP 首选）
- **前端**：Next.js 14 (App Router), Tailwind CSS, shadcn/ui
- **后端**：Next.js API Routes / Server Actions
- **数据库**：PostgreSQL + Prisma ORM
- **认证**：NextAuth.js / Clerk
- **部署**：Vercel + Supabase / Railway
- **适合**：内容平台、SaaS、管理后台
- **优点**：一个仓库全搞定，Vercel 部署极简
- **缺点**：业务复杂后 API 层难以拆分

### 栈 B：React + Node.js 分离架构
- **前端**：React 18, Vite, Tailwind CSS, Zustand
- **后端**：Node.js + Express / Fastify, Zod 校验
- **数据库**：MongoDB + Mongoose / PostgreSQL + Drizzle
- **认证**：JWT + Refresh Token
- **部署**：Netlify / Vercel (前端) + Railway / Render (后端)
- **适合**：团队协作、前后端分工明确的项目
- **优点**：职责清晰，扩展灵活
- **缺点**：跨域、部署配置更复杂

### 栈 C：Vue 3 + FastAPI
- **前端**：Vue 3, Vite, Pinia, Element Plus / Naive UI
- **后端**：Python FastAPI, Pydantic, SQLAlchemy
- **数据库**：PostgreSQL
- **认证**：JWT (python-jose)
- **部署**：Docker Compose
- **适合**：有 Python 背景的团队、数据处理密集型
- **优点**：Python 生态（ML/数据），自动生成 OpenAPI 文档
- **缺点**：前后端语言不统一

### 栈 D：Next.js + Supabase（极速原型）
- **前端 + 后端**：Next.js 14
- **BaaS**：Supabase（PostgreSQL + Auth + Storage + Realtime）
- **部署**：Vercel + Supabase Cloud
- **适合**：独立开发者、快速验证想法
- **优点**：几乎零后端代码，实时订阅开箱即用
- **缺点**：vendor lock-in 风险，复杂业务逻辑受限

---

## 通用技术决策因素

**选 SQL（PostgreSQL）当**：数据关系复杂、需要事务、团队熟悉 SQL  
**选 NoSQL（MongoDB）当**：文档结构多变、需要水平扩展、原型阶段  
**选 BaaS（Supabase/Firebase）当**：快速 MVP、独立开发者、预算有限  

**选 TypeScript 全栈**：团队规模 > 2 人，项目预期维护 > 6 个月  
**选 Monorepo（Turborepo）**：前后端代码共享 types，多包管理需求  
