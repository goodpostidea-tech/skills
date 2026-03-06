# skills

> [English](./README.md) | 简体中文

用于从**任意 GitHub 仓库**安装 skill 到本机各 agent 目录的 CLI。执行 `add` 时，会通过交互式多选让你**选择安装到哪些 agents**（Cursor、Codex、OpenClaw、.agents、Claude Code 等）。本仓库也提供若干开源 skill（如 you-skills），可用同一 CLI 安装。

## 安装某个 skill

```bash
npx @goodpostidea-tech/skills add https://github.com/goodpostidea-tech/skills --skill you-skills
```

- **仓库地址**：任意包含 skill 目录的公开 GitHub 仓库（例如本仓库）。
- **`--skill`**：要安装的 skill 目录名（例如 `you-skills`）。
- **安装到哪些 agents**：在终端（TTY）下运行时，会提示 **「Which agents do you want to install to?」**，并列出多选列表（Cursor、Codex、OpenClaw、.agents、Claude Code、Continue、Amp、Cline）。用 ↑↓ 移动，空格勾选/取消，回车确认。默认全选。使用 `--target <目录>` 可跳过选择，只安装到指定目录。
- **分支**：默认 `main`。若仓库默认分支为其他（如 `master`），可用 `--branch master`。
- **试跑**：加 `--dry-run` 只打印将要执行的操作，不实际复制。

### 示例

```bash
# 从本仓库安装 you-skills
npx @goodpostidea-tech/skills add https://github.com/goodpostidea-tech/skills --skill you-skills

# 只安装到指定目录
npx @goodpostidea-tech/skills add https://github.com/goodpostidea-tech/skills --skill you-skills --target ~/.codex/skills

# 指定仓库分支
npx @goodpostidea-tech/skills add https://github.com/owner/repo --skill my-skill --branch master
```

## 仓库结构

Skill 均放在 `skills/` 目录下（与 baoyu-skills、vercel-labs/skills 等约定一致）：

```
skills/
├── cli.js           # 安装器 CLI
├── package.json
├── README.md
└── skills/          # skill 模块
    └── you-skills/
        └── SKILL.md
```

## 本仓库中的 skills

| Skill       | 说明 |
|------------|------|
| you-skills | 安装、运行与集成 YouSkills（本地 skills 可视化）。当用户询问 you-skills、本地 skills 可视化或 12434 端口时使用。 |
