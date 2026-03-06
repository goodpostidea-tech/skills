#!/usr/bin/env node

/**
 * skills add <repo-url> [--skill <name>] [--target <dir>] [--dry-run]
 * Install a skill into local skills directories. With TTY, prompts to choose
 * which agents to install to; otherwise installs to all known roots.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { checkbox } from '@inquirer/prompts';
import extract from 'extract-zip';

const DEFAULT_BRANCH = 'main';

/** Agent display name -> absolute skills path (env-aware). */
function getAgentChoices() {
  const home = os.homedir();
  return [
    { name: 'Cursor (.cursor/skills)', value: path.resolve(process.env.CURSOR_HOME || path.join(home, '.cursor'), 'skills') },
    { name: 'Codex (.codex/skills)', value: path.resolve(process.env.CODEX_HOME || path.join(home, '.codex'), 'skills') },
    { name: 'OpenClaw (.openclaw/skills)', value: path.resolve(path.join(home, '.openclaw', 'skills')) },
    { name: 'Universal / .agents (.agents/skills)', value: path.resolve(path.join(home, '.agents', 'skills')) },
    { name: 'Claude Code (.claude/skills)', value: path.resolve(path.join(home, '.claude', 'skills')) },
    { name: 'Continue (.continue/skills)', value: path.resolve(path.join(home, '.continue', 'skills')) },
    { name: 'Amp (.amp/skills)', value: path.resolve(path.join(home, '.amp', 'skills')) },
    { name: 'Cline (.cline/skills)', value: path.resolve(path.join(home, '.cline', 'skills')) },
  ];
}

/** All known skill roots (for non-interactive / default). */
function getDefaultSkillRoots() {
  const choices = getAgentChoices();
  return [...new Set(choices.map((c) => c.value))];
}

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 2 || args[0] !== 'add') {
    console.error('Usage: npx @goodpostidea-tech/skills add <repo-url> --skill <name> [--target <dir>] [--branch <branch>] [--dry-run]');
    console.error('Example: npx @goodpostidea-tech/skills add https://github.com/goodpostidea-tech/skills --skill you-skills');
    process.exit(1);
  }
  const repoUrl = args[1];
  let skillName = null;
  let targetDir = null;
  let dryRun = false;
  let branch = DEFAULT_BRANCH;
  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--skill' && args[i + 1]) {
      skillName = args[++i];
    } else if (args[i] === '--target' && args[i + 1]) {
      targetDir = path.resolve(args[++i]);
    } else if (args[i] === '--branch' && args[i + 1]) {
      branch = args[++i];
    } else if (args[i] === '--dry-run') {
      dryRun = true;
    }
  }
  const match = repoUrl.match(/github\.com[/:]([\w-]+)\/([\w.-]+?)(?:\.git)?\/?$/);
  if (!match) {
    console.error('Only GitHub repo URLs are supported, e.g. https://github.com/owner/repo');
    process.exit(1);
  }
  const [, owner, repo] = match;
  const repoId = `${owner}/${repo}`;
  if (!skillName) {
    console.error('--skill <name> is required. Example: --skill you-skills');
    process.exit(1);
  }
  const targetDirs = targetDir ? [targetDir] : null;
  return { repoId, owner, repo, skillName, targetDirs, branch, dryRun };
}

async function downloadZip(owner, repo, branch, destPath) {
  const url = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;
  const res = await fetch(url, { redirect: 'follow' });
  if (res.status === 404) {
    throw new Error(`Branch "${branch}" not found (404). Try --branch master?`);
  }
  if (!res.ok) {
    throw new Error(`Download failed: ${res.status}`);
  }
  const buf = await res.arrayBuffer();
  fs.writeFileSync(destPath, new Uint8Array(buf));
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

async function main() {
  const { owner, repo, skillName, targetDirs: targetDirsArg, branch, dryRun } = parseArgs();
  let targetDirs = targetDirsArg;
  if (targetDirs === null) {
    if (process.stdin.isTTY) {
      const choices = getAgentChoices();
      const selected = await checkbox({
        message: 'Which agents do you want to install to?',
        choices: choices.map((c) => ({ name: c.name, value: c.value, checked: true })),
        required: true,
        loop: true,
      });
      targetDirs = [...new Set(selected)];
    } else {
      targetDirs = getDefaultSkillRoots();
    }
  }
  const zipPath = path.join(os.tmpdir(), `skills-${repo}-${Date.now()}.zip`);
  const extractDir = path.join(os.tmpdir(), `skills-${repo}-${Date.now()}`);

  console.log(`Adding skill "${skillName}" from ${owner}/${repo} (${branch})`);
  targetDirs.forEach((d) => console.log(`  -> ${path.join(d, skillName)}`));

  if (dryRun) {
    console.log('[dry-run] Skipping download and copy.');
    return;
  }

  try {
    await downloadZip(owner, repo, branch, zipPath);
    await extract(zipPath, { dir: extractDir });
    const topDir = fs.readdirSync(extractDir)[0];
    if (!topDir) throw new Error('Archive is empty');
    const root = path.join(extractDir, topDir);
    // Prefer skills/<name> (convention), then <name> at repo root
    let skillSrc = path.join(root, 'skills', skillName);
    if (!fs.existsSync(skillSrc)) {
      skillSrc = path.join(root, skillName);
    }
    if (!fs.existsSync(skillSrc)) {
      const inSkills = fs.existsSync(path.join(root, 'skills'))
        ? fs.readdirSync(path.join(root, 'skills')).join(', ')
        : '(no skills/ folder)';
      const atRoot = fs.readdirSync(root).filter((n) => n !== 'skills').join(', ');
      throw new Error(`Skill "${skillName}" not found. Under skills/: ${inSkills}. At root: ${atRoot}`);
    }
    for (const targetDir of targetDirs) {
      const skillDest = path.join(targetDir, skillName);
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      copyRecursive(skillSrc, skillDest);
    }
    console.log(`Done. Installed to ${targetDirs.length} agent location(s).`);
  } finally {
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true });
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
