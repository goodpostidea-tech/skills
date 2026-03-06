name: fast-sdlc
description: |
  Fully automated Software Development Life Cycle (SDLC) accelerator for web applications. The user only needs to describe a product idea or feature request; the agent should automatically infer a suitable tech stack, then complete all four SDLC stages and output one structured Markdown document per stage.
  
  Language: respond in the user's language when possible. This skill description is written in **English with Chinese notes**, but you should freely handle both English and Chinese user queries.

  When to trigger this skill (if ANY of the following is true, use it immediately):
  - User says: “Help me plan/design/develop a [product/feature/system]”
  - User says: “Build an app from scratch…”, “I have an idea…”, “Make a web application…”
  - User mentions SDLC, software development lifecycle, product planning, technical design
  - User explicitly asks for PRD, system architecture, implementation plan, or test cases (any subset)
  - Any task that spans **from requirements to code** for a web project, even if the user does not say “SDLC”
---

# Fast SDLC — Fully Automated Software Development Lifecycle

> 简体中文说明：  
> Fast SDLC 是一个**全自动的软件开发生命周期加速器**，针对 Web 应用项目。用户只需描述一个产品想法或功能需求，Agent 会自动推断技术栈，并依次完成 4 个阶段（PRD / 架构 / 实现方案 / 测试），每个阶段输出一份独立的 Markdown 文档。

## Overview / 概述

After receiving the user's product/feature description, **do NOT ask clarifying questions first**.  
Instead, immediately execute all four stages below, and produce **one separate `.md` file per stage**. In the end, present all four files together so the user can review or download them.

---

## Execution flow / 执行流程

### Step 0 — Fast reasoning (internal only, no direct output) / 第 0 步：快速推断（不输出，只在脑中执行）

Before you start generating any files, reason internally about:

1. **Project type** — SaaS, tool site, content platform, e‑commerce, admin panel, or something else?
2. **Candidate tech stacks** — based on complexity and common practice, list 2–3 candidates (see `references/tech-stacks.md`)
3. **Core entities** — the 3–5 most important entities in the data model
4. **MVP scope** — which features are MVP, which can be postponed to V2

After this internal reasoning, **start generating the stage documents directly**.  
At the top of the first document, briefly state your inferred project type and recommended stack in one sentence.

---

### Stage 1 — Requirements & PRD (output file: `01-PRD.md`) / 阶段 1：需求分析 & PRD

Follow `references/prd-template.md` and produce a PRD containing at least:

```
# [项目名称] — 产品需求文档 (PRD)

## 项目背景与目标
- 一句话描述
- 核心价值主张
- 成功指标（可量化）

## 用户角色 (Personas)
| 角色 | 描述 | 核心诉求 |
|------|------|----------|
| ...  | ...  | ...      |

## 功能需求（用户故事格式）
### MVP 功能
- 作为 [角色]，我希望 [功能]，以便 [价值]
### V2 功能（暂不实现）
- ...

## 非功能需求
- 性能：...
- 安全：...
- 兼容性：...

## 约束与假设
## 里程碑计划
```

---

### Stage 2 — System design & architecture (output file: `02-Architecture.md`) / 阶段 2：系统设计 & 架构

Use `references/tech-stacks.md` as guidance and generate:

```
# [项目名称] — 系统架构设计

## 技术栈决策
### 推荐方案（附理由）
| 层次 | 技术选型 | 备选方案 | 选择理由 |
|------|---------|---------|---------|

### 技术栈对比（当有多个可行方案时展示）
...

## 系统架构图（Mermaid）
- 整体架构图（前端、后端、数据库、外部服务）

## 数据模型
- 核心实体 ER 图（Mermaid）
- 每个实体的主要字段

## API 设计（RESTful / GraphQL）
- 核心接口列表（方法、路径、说明）

## 目录结构
- 推荐的项目目录树

## 部署架构
- 开发环境
- 生产环境建议
```

---

### Stage 3 — Implementation blueprint (output file: `03-Implementation.md`) / 阶段 3：代码实现方案

**Important**: do **NOT** generate a full, production‑ready codebase here.  
Instead, create an **implementation blueprint** — key code skeletons + guidance so that a developer (or another agent) can quickly implement the project.

```
# [项目名称] — 代码实现方案

## 项目初始化
- 脚手架命令
- 依赖安装清单

## 核心模块实现
为每个核心模块提供：
- 模块职责
- 关键代码片段（骨架/示例，非完整实现）
- 注意事项 / 常见坑

## 状态管理方案（前端）
## 认证方案
## 数据库 Schema（SQL 或 ODM 定义）
## 环境变量清单（.env.example）
## 开发启动指南
```

---

### Stage 4 — Test cases & QA (output file: `04-QA.md`) / 阶段 4：测试用例 & QA

```
# [项目名称] — 测试方案

## 测试策略概览
- 测试金字塔：单元 / 集成 / E2E 比例建议

## 单元测试用例
| 模块 | 测试场景 | 输入 | 预期输出 | 优先级 |
|------|---------|------|---------|--------|

## 集成测试用例（API 层）
| 接口 | 场景 | 请求 | 预期响应 |
|------|------|------|---------|

## E2E 测试用例（关键用户旅程）
- 场景描述（Gherkin 格式）

## 边界条件 & 异常场景
## 性能测试建议
## 测试工具推荐（匹配技术栈）
```

---

## Output conventions / 输出规范

1. **One file per stage** named exactly:
   - `01-PRD.md`
   - `02-Architecture.md`
   - `03-Implementation.md`
   - `04-QA.md`
2. Save all files under: `/mnt/user-data/outputs/[project-name]-sdlc/`
3. Use the `present_files` tool to present all 4 files to the user at once.
4. Finally, write a short **execution summary** for the user:
   - Inferred tech stack (1–2 sentences)
   - 3 core MVP features (bullet list)
   - Rough complexity estimate (e.g. “suitable for a 2–3 person team, 3–4 weeks of work”)

## Quality checklist / 质量检查清单

Before finishing, quickly self‑check:
- [ ] PRD contains at least one **quantifiable** success metric
- [ ] Architecture file includes at least one Mermaid diagram
- [ ] Tech stack comparison table has ≥ 2 options when multiple stacks are viable
- [ ] Every API endpoint listed has a brief description
- [ ] Test cases cover the happy path and at least **3** edge/error scenarios
- [ ] Naming is consistent across all docs (entities, API paths, feature names, etc.)

## Reference files / 参考文件

- `references/tech-stacks.md` — common web stacks, characteristics, and suitable scenarios  
- `references/prd-template.md` — detailed PRD template and writing guidelines
