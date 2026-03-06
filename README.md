# skills

Open-source skills for Cursor / Codex. You can install any skill from this repo into your local skills directory.

## Install a skill

```bash
npx @goodpostidea-tech/skills add https://github.com/goodpostidea-tech/skills --skill you-skills
```

- **Repo URL**: Any public GitHub repo that contains skill folders (e.g. this repo).
- **`--skill`**: Name of the skill folder to install (e.g. `you-skills`).
- **Target**: Default is `~/.cursor/skills` (or `$CURSOR_HOME/skills` if set). Override with `--target <dir>`.
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
