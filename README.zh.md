# skills

> [English](./README.md) | 简体中文

面向 Cursor、Codex、OpenClaw 等 agent 的开源 skills。请使用**官方** [skills CLI](https://skills.sh/docs/cli) 安装。

## 安装某个 skill

使用官方 CLI 安装（会提示选择要安装到哪些 agents）：

```bash
# 安装 you-skills（本地 skills 可视化）
npx skills add https://github.com/goodpostidea-tech/skills --skill you-skills

# 安装 fast-sdlc（SDLC 加速：PRD → 架构 → 实现方案 → 测试）
npx skills add https://github.com/goodpostidea-tech/skills --skill fast-sdlc
```

若 CLI 提示找不到 `fast-sdlc`，可先列出再安装，或使用直接路径：

```bash
npx skills add https://github.com/goodpostidea-tech/skills --list
npx skills add https://github.com/goodpostidea-tech/skills/tree/main/skills/fast-sdlc
```

与 [Anthropic](https://github.com/anthropics/skills) 及开放 agent skills 生态使用的是同一套 CLI，无自建安装器，体验与从官方源安装一致。

- **文档**：[skills.sh/docs/cli](https://skills.sh/docs/cli)

## 仓库结构

Skill 均放在 `skills/` 目录下（与 anthropics/skills、vercel-labs/skills 等约定一致）：

```
skills/
├── package.json
├── README.md
└── skills/          # skill 模块
    ├── fast-sdlc/
    │   ├── SKILL.md
    │   └── references/
    └── you-skills/
        └── SKILL.md
```

## 本仓库中的 skills

| Skill       | 说明 |
|------------|------|
| fast-sdlc  | 全自动 Web 项目 SDLC 加速：从想法到 PRD、架构、实现方案、测试一气呵成。用户说要做产品/功能/系统规划或开发时触发。 |
| you-skills | 安装、运行与集成 YouSkills（本地 skills 可视化）。当用户询问 you-skills、本地 skills 可视化或 12434 端口时使用。 |
