# skills

> English | [简体中文](./README.zh.md)

CLI to **install skills from any GitHub repo** into your local agent directories. When you run `add`, you choose **which agents to install to** (Cursor, Codex, OpenClaw, .agents, Claude Code, etc.) via an interactive checkbox. This repo also hosts open-source skills (e.g. you-skills) that you can install with the same CLI.

## Install a skill

```bash
npx @goodpostidea-tech/skills add https://github.com/goodpostidea-tech/skills --skill you-skills
```

- **Repo URL**: Any public GitHub repo that contains skill folders (e.g. this repo).
- **`--skill`**: Name of the skill folder to install (e.g. `you-skills`).
- **Which agents**: When run in a terminal (TTY), you are prompted **"Which agents do you want to install to?"** with a checkbox list (Cursor, Codex, OpenClaw, .agents, Claude Code, Continue, Amp, Cline). Use ↑↓ to move, Space to toggle, Enter to confirm. By default all are selected. Use `--target <dir>` to skip the prompt and install only to one directory.
- **Branch**: Default is `main`. Use `--branch master` (or other) if the repo uses another default branch.
- **Dry run**: Add `--dry-run` to print what would be done without copying.

### Examples

```bash
# Install you-skills from this repo
npx @goodpostidea-tech/skills add https://github.com/goodpostidea-tech/skills --skill you-skills

# Install to a custom directory
npx @goodpostidea-tech/skills add https://github.com/goodpostidea-tech/skills --skill you-skills --target ~/.codex/skills

# Repo on branch master
npx @goodpostidea-tech/skills add https://github.com/owner/repo --skill my-skill --branch master
```

## Repo structure

Skills are under the `skills/` directory (same convention as baoyu-skills and vercel-labs/skills):

```
skills/
├── cli.js           # Installer CLI
├── package.json
├── README.md
└── skills/          # Skill modules
    └── you-skills/
        └── SKILL.md
```

## Skills in this repo

| Skill       | Description |
|------------|-------------|
| you-skills | Install, run, and integrate YouSkills (local skills visualizer). Use when the user asks about you-skills, local skills visualization, or port 12434. |
