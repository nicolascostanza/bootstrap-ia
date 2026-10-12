#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { basename, join, resolve } from "node:path";

function parseArgs(argv) {
  const opts = { write: false, json: false, list: false, count: 1 };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--write") opts.write = true;
    else if (arg === "--json") opts.json = true;
    else if (arg === "--list") opts.list = true;
    else if (arg === "--base") opts.base = Number(argv[(i += 1)]);
    else if (arg === "--range") opts.range = Number(argv[(i += 1)]);
    else if (arg === "--count") opts.count = Number(argv[(i += 1)]);
    else if (arg === "--name") opts.name = argv[(i += 1)];
  }
  return opts;
}

function git(cwd, args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

function repoInfo(cwd) {
  const root = resolve(git(cwd, ["rev-parse", "--show-toplevel"]));
  const gitDir = resolve(root, git(cwd, ["rev-parse", "--git-dir"]));
  const common = resolve(root, git(cwd, ["rev-parse", "--git-common-dir"]));
  const linked = gitDir !== common;
  const branch = git(root, ["rev-parse", "--abbrev-ref", "HEAD"]);
  return { root, linked, branch, name: linked ? basename(root) : "main" };
}

function fnv1a(text) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

function isFree(port) {
  return new Promise((done) => {
    const server = createServer();
    server.once("error", () => done(false));
    server.once("listening", () => server.close(() => done(true)));
    server.listen(port, "127.0.0.1");
  });
}

async function allocate(start, count, range) {
  for (let offset = 0; offset < range; offset += 1) {
    const candidate = start + offset;
    let free = true;
    for (let i = 0; i < count; i += 1) {
      if (!(await isFree(candidate + i))) {
        free = false;
        break;
      }
    }
    if (free) return Array.from({ length: count }, (_, i) => candidate + i);
  }
  throw new Error(`sin puertos libres en el rango ${start}..${start + range}`);
}

function upsertEnv(path, entries) {
  const lines = existsSync(path) ? readFileSync(path, "utf8").split(/\r?\n/) : [];
  const managed = new Set(Object.keys(entries));
  const kept = lines.filter((line) => {
    const key = line.split("=")[0]?.trim();
    return !managed.has(key) && line.trim() !== "";
  });
  const appended = Object.entries(entries).map(([key, value]) => `${key}=${value}`);
  writeFileSync(path, `${[...kept, ...appended].join("\n")}\n`);
}

function hashPort(name, base, range) {
  return base + 1 + (fnv1a(name) % range);
}

async function main() {
  const opts = parseArgs(process.argv);
  const base = opts.base ?? 3000;
  const range = opts.range ?? 999;
  const count = opts.count ?? 1;
  const info = repoInfo(process.cwd());
  const name = opts.name ?? info.name;

  if (opts.list) {
    const entries = git(info.root, ["worktree", "list", "--porcelain"])
      .split(/\n\n/)
      .map((block) => {
        const lines = block.split("\n");
        const path = lines.find((line) => line.startsWith("worktree "))?.slice("worktree ".length);
        if (!path) return null;
        const branch = lines.find((line) => line.startsWith("branch "))?.replace("branch refs/heads/", "");
        const wtName = resolve(path) === info.root && !info.linked ? "main" : basename(path);
        return { name: wtName, path, branch: branch ?? "(detached)", port: hashPort(wtName, base, range) };
      })
      .filter(Boolean);
    if (opts.json) console.log(JSON.stringify(entries, null, 2));
    else for (const entry of entries) console.log(`${entry.name}\t${entry.port}\t${entry.branch}\t${entry.path}`);
    return;
  }

  const ports = await allocate(hashPort(name, base, range), count, range);

  const envEntries = { PORT: ports[0], NEXT_PUBLIC_APP_URL: `http://localhost:${ports[0]}` };
  if (count > 1) {
    envEntries.NEXT_PUBLIC_API_URL = `http://localhost:${ports[1]}`;
    ports.forEach((port, i) => {
      envEntries[`PORT_${i + 1}`] = port;
    });
  }
  if (opts.write) upsertEnv(join(info.root, ".env.local"), envEntries);

  if (opts.json) {
    console.log(JSON.stringify({ worktree: name, branch: info.branch, ports }, null, 2));
    return;
  }
  console.log(`Worktree: ${name}`);
  console.log(`Branch:   ${info.branch}`);
  ports.forEach((port, i) => console.log(`PORT${i === 0 ? "" : `_${i + 1}`}:     ${port}`));
  console.log(`URL:      http://localhost:${ports[0]}`);
  if (opts.write) console.log(`Escrito:  ${join(info.root, ".env.local")}`);
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
