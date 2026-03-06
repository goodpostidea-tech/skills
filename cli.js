#!/usr/bin/env node

/**
 * skills add <repo-url> [--skill <name>] [--target <dir>] [--dry-run]
 * Install a skill from a GitHub repo into the local skills directory.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import extract from 'extract-zip';

const DEFAULT_TARGET = process.env.CURSOR_HOME
  ? path.join(process.env.CURSOR_HOME, 'skills')
  : path.join(os.homedir(), '.cursor', 'skills');
const DEFAULT_BRANCH = 'main';

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 2 || args[0] !== 'add') {
    console.error('Usage: npx @goodpostidea-tech/skills add <repo-url> --skill <name> [--target <dir>] [--branch <branch>] [--dry-run]');
    console.error('Example: npx @goodpostidea-tech/skills add https://github.com/goodpostidea-tech/skills --skill you-skills');
    process.exit(1);
  }
  const repoUrl = args[1];
  let skillName = null;
  let targetDir = DEFAULT_TARGET;
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
  return { repoId, owner, repo, skillName, targetDir, branch, dryRun };
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
  const { owner, repo, skillName, targetDir, branch, dryRun } = parseArgs();
  const zipPath = path.join(os.tmpdir(), `skills-${repo}-${Date.now()}.zip`);
  const extractDir = path.join(os.tmpdir(), `skills-${repo}-${Date.now()}`);

  console.log(`Adding skill "${skillName}" from ${owner}/${repo} (${branch}) -> ${targetDir}/${skillName}`);

  if (dryRun) {
    console.log('[dry-run] Skipping download and copy.');
    return;
  }

  try {
    await downloadZip(owner, repo, branch, zipPath);
    await extract(zipPath, { dir: extractDir });
    const topDir = fs.readdirSync(extractDir)[0];
    if (!topDir) throw new Error('Archive is empty');
    const skillSrc = path.join(extractDir, topDir, skillName);
    if (!fs.existsSync(skillSrc)) {
      throw new Error(`Skill "${skillName}" not found in repo. Available: ${fs.readdirSync(path.join(extractDir, topDir)).join(', ')}`);
    }
    const skillDest = path.join(targetDir, skillName);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    copyRecursive(skillSrc, skillDest);
    console.log(`Done. Installed to ${skillDest}`);
  } finally {
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true });
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
