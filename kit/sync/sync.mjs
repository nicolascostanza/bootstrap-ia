#!/usr/bin/env node
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = resolve(__dirname, "..", "..");

const OPTIONS = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (!arg.startsWith("--")) continue;
  const next = process.argv[i + 1];
  if (next && !next.startsWith("--")) {
    OPTIONS.set(arg, next);
    i += 1;
  } else {
    OPTIONS.set(arg, true);
  }
}

const TARGET = resolve(String(OPTIONS.get("--target") || process.cwd()));
const CHECK = OPTIONS.has("--check");
const ONLY = String(OPTIONS.get("--only") || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const wants = (key) => ONLY.length === 0 || ONLY.includes(key);

const first = (...paths) => paths.find((path) => existsSync(path));

const SOURCES = {
  agents: first(join(KIT_ROOT, ".opencode", "agent"), join(KIT_ROOT, "agent")),
  commands: first(join(KIT_ROOT, ".opencode", "command"), join(KIT_ROOT, "command")),
  skills: first(join(KIT_ROOT, ".opencode", "skills"), join(KIT_ROOT, "skills")),
  agentsMd: first(join(KIT_ROOT, "AGENTS.md"), join(KIT_ROOT, "kit", "config", "AGENTS.md")),
  mcp: join(KIT_ROOT, "kit", "config", "mcp.json"),
};

const drift = [];
const written = [];

async function emit(path, content) {
  if (CHECK) {
    const current = existsSync(path) ? await readFile(path, "utf8") : null;
    if (current !== content) drift.push(path);
    return;
  }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
  written.push(path);
}

async function listFiles(dir, base = dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(full, base)));
    else files.push({ rel: full.slice(base.length + 1), abs: full });
  }
  return files;
}

async function syncDir(src, dest) {
  const files = await listFiles(src);
  if (CHECK) {
    for (const file of files) {
      const target = join(dest, file.rel);
      const expected = await readFile(file.abs, "utf8");
      const current = existsSync(target) ? await readFile(target, "utf8") : null;
      if (current !== expected) drift.push(target);
    }
    return;
  }
  await rm(dest, { recursive: true, force: true });
  await mkdir(dirname(dest), { recursive: true });
  await cp(src, dest, { recursive: true });
  written.push(dest);
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  let top = null;
  let sub = null;
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const indent = line.length - line.trimStart().length;
    const text = line.trim();
    const cut = text.indexOf(":");
    if (cut === -1) continue;
    const key = text.slice(0, cut).trim().replace(/^["']|["']$/g, "");
    const value = text.slice(cut + 1).trim();
    if (indent === 0) {
      sub = null;
      top = key;
      data[key] = value === "" ? {} : value;
    } else if (indent === 2 && top) {
      if (typeof data[top] !== "object") data[top] = {};
      data[top][key] = value === "" ? {} : value;
      sub = key;
    } else if (indent >= 4 && top && sub) {
      if (typeof data[top] !== "object") data[top] = {};
      if (typeof data[top][sub] !== "object") data[top][sub] = {};
      data[top][sub][key] = value;
    }
  }
  return { data, body: match[2] };
}

async function readConfigs(dir) {
  if (!dir) return [];
  const items = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const raw = await readFile(join(dir, entry.name), "utf8");
    const { data, body } = parseFrontmatter(raw);
    items.push({
      name: entry.name.replace(/\.md$/, ""),
      description: typeof data.description === "string" ? data.description : "",
      edit: data.permission?.edit,
      bash: data.permission?.bash,
      body: `${body.trim()}\n`,
    });
  }
  return items;
}

const yamlString = (value) => JSON.stringify(value);
const tomlString = (value) => JSON.stringify(value);
const tomlMultiline = (value) => `'''\n${value.trim()}\n'''`;

function toClaudeAgent(agent) {
  const lines = ["---", `name: ${agent.name}`, `description: ${yamlString(agent.description)}`];
  const disallowed = [];
  if (agent.edit === "deny") disallowed.push("Write", "Edit", "NotebookEdit");
  if (agent.bash === "deny") disallowed.push("Bash");
  if (disallowed.length) {
    lines.push("disallowedTools:");
    for (const tool of disallowed) lines.push(`  - ${tool}`);
  }
  lines.push("---", "");
  return lines.join("\n") + agent.body;
}

function toCodexAgent(agent) {
  const lines = [
    `name = ${tomlString(agent.name)}`,
    `description = ${tomlString(agent.description)}`,
  ];
  if (agent.edit === "deny" && agent.bash === "deny") lines.push('sandbox_mode = "read-only"');
  lines.push(`developer_instructions = ${tomlMultiline(agent.body)}`);
  return `${lines.join("\n")}\n`;
}

function toClaudeCommand(command) {
  return ["---", `description: ${yamlString(command.description)}`, "---", "", command.body.trim(), ""].join("\n");
}

function toCodexCommandSkill(command) {
  const body = command.body.replace(/\$ARGUMENTS/g, "[argumentos del usuario]").trim();
  return ["---", `name: ${command.name}`, `description: ${command.description}`, "---", "", body, ""].join("\n");
}

const CODEX_COMMAND_POLICY = "policy:\n  allow_implicit_invocation: false\n";

function fromNeutralHeaders(headers, toOpencode) {
  if (!headers) return undefined;
  const out = {};
  for (const [key, value] of Object.entries(headers)) {
    out[key] = toOpencode ? value.replace(/\$\{([A-Z0-9_]+)\}/g, "{env:$1}") : value;
  }
  return out;
}

async function readMcp() {
  if (!existsSync(SOURCES.mcp)) return null;
  return JSON.parse(await readFile(SOURCES.mcp, "utf8"));
}

async function syncSkills() {
  if (!wants("skills") || !SOURCES.skills) return;
  await syncDir(SOURCES.skills, join(TARGET, ".claude", "skills"));
  await syncDir(SOURCES.skills, join(TARGET, ".agents", "skills"));
  await emit(join(TARGET, "CLAUDE.md"), "@AGENTS.md\n");
}

async function syncAgents() {
  if (!wants("agents") || !SOURCES.agents) return;
  const agents = await readConfigs(SOURCES.agents);
  for (const agent of agents) {
    await emit(join(TARGET, ".claude", "agents", `${agent.name}.md`), toClaudeAgent(agent));
    await emit(join(TARGET, ".codex", "agents", `${agent.name}.toml`), toCodexAgent(agent));
  }
}

async function syncCommands() {
  if (!wants("commands") || !SOURCES.commands) return;
  const commands = await readConfigs(SOURCES.commands);
  for (const command of commands) {
    await emit(join(TARGET, ".claude", "commands", `${command.name}.md`), toClaudeCommand(command));
    await emit(join(TARGET, ".agents", "skills", command.name, "SKILL.md"), toCodexCommandSkill(command));
    await emit(join(TARGET, ".agents", "skills", command.name, "agents", "openai.yaml"), CODEX_COMMAND_POLICY);
  }
}

function claudeMcpConfig(mcp) {
  const mcpServers = {};
  for (const [name, server] of Object.entries(mcp.servers || {})) {
    if (server.enabled === false) continue;
    const entry = { type: "http", url: server.url };
    const headers = fromNeutralHeaders(server.headers, false);
    if (headers) entry.headers = headers;
    mcpServers[name] = entry;
  }
  return `${JSON.stringify({ mcpServers }, null, 2)}\n`;
}

function codexMcpConfig(mcp) {
  const blocks = [];
  for (const [name, server] of Object.entries(mcp.servers || {})) {
    if (server.enabled === false) continue;
    const lines = [`[mcp_servers.${name}]`, `url = ${tomlString(server.url)}`];
    const auth = server.headers?.Authorization;
    const bearer = typeof auth === "string" ? auth.match(/Bearer \$\{([A-Z0-9_]+)\}/) : null;
    if (bearer) lines.push(`bearer_token_env_var = ${tomlString(bearer[1])}`);
    const extra = Object.entries(server.headers || {}).filter(([key]) => key !== "Authorization");
    if (extra.length) {
      lines.push(`[mcp_servers.${name}.http_headers]`);
      for (const [key, value] of extra) lines.push(`${tomlString(key)} = ${tomlString(value)}`);
    }
    blocks.push(lines.join("\n"));
  }
  return blocks.length ? `${blocks.join("\n\n")}\n` : "";
}

async function syncMcp() {
  if (!wants("mcp")) return;
  const mcp = await readMcp();
  if (!mcp) return;
  await emit(join(TARGET, ".mcp.json"), claudeMcpConfig(mcp));
  const codex = codexMcpConfig(mcp);
  if (codex) await emit(join(TARGET, ".codex", "config.toml"), codex);
}

async function main() {
  console.log(`Kit:     ${KIT_ROOT}`);
  console.log(`Destino: ${TARGET}${CHECK ? " (check)" : ""}\n`);

  await syncSkills();
  await syncAgents();
  await syncCommands();
  await syncMcp();

  if (CHECK) {
    if (drift.length) {
      console.error(`Drift detectado (${drift.length}):`);
      for (const path of drift) console.error(`  - ${path}`);
      process.exit(1);
    }
    console.log("Sin drift: los artefactos multi-tool estan sincronizados.");
    return;
  }

  console.log(`Listo: ${written.length} artefactos multi-tool generados.`);
  console.log("Claude Code: .claude/agents, .claude/commands, .claude/skills, CLAUDE.md, .mcp.json");
  console.log("Codex: .codex/agents, .codex/config.toml, .agents/skills");
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
