# skills

> English | [简体中文](./README.zh.md)

Open-source skills for Cursor, Codex, OpenClaw, and other agents. Install using the **official** [skills CLI](https://skills.sh/docs/cli).

## Install a skill

Use the official CLI (you will be prompted to choose which agents to install to):

```bash
npx skills add https://github.com/goodpostidea-tech/skills --skill you-skills
```

This is the same CLI used by [Anthropic](https://github.com/anthropics/skills) and the open agent skills ecosystem. No custom installer—full trust and the same experience as installing from official sources.

- **Docs**: [skills.sh/docs/cli](https://skills.sh/docs/cli)

## Repo structure

Skills live under the `skills/` directory (same convention as anthropics/skills, vercel-labs/skills):

```
skills/
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
