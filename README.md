# skills

> English | [简体中文](./README.zh.md)

Open-source skills for Cursor, Codex, OpenClaw, and other agents. Install using the **official** [skills CLI](https://skills.sh/docs/cli).

## Install a skill

Use the official CLI (you will be prompted to choose which agents to install to):

```bash
# Install you-skills (local skills visualizer)
npx skills add https://github.com/goodpostidea-tech/skills --skill you-skills

# Install fast-sdlc (SDLC accelerator: PRD → architecture → implementation → QA)
npx skills add https://github.com/goodpostidea-tech/skills --skill fast-sdlc
```

If the CLI reports “No matching skills found” for `fast-sdlc`, list skills first or use the direct path:

```bash
npx skills add https://github.com/goodpostidea-tech/skills --list
npx skills add https://github.com/goodpostidea-tech/skills/tree/main/skills/fast-sdlc
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
    ├── fast-sdlc/
    │   ├── SKILL.md
    │   └── references/
    └── you-skills/
        └── SKILL.md
```

## Skills in this repo

| Skill       | Description |
|------------|-------------|
| fast-sdlc  | Fully automated SDLC accelerator for web apps: from idea to PRD, architecture, implementation blueprint, and QA in one flow. Trigger when the user wants to plan/design/develop a product or feature. |
| you-skills | Install, run, and integrate YouSkills (local skills visualizer). Use when the user asks about you-skills, local skills visualization, or port 12434. |
