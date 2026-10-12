#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const API = "https://console.neon.tech/api/v2";

function parseArgs(argv) {
  const opts = {};
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => argv[(i += 1)];
    if (arg === "create" || arg === "delete" || arg === "url") opts.cmd = arg;
    else if (arg === "--name") opts.name = next();
    else if (arg === "--project") opts.project = next();
    else if (arg === "--parent") opts.parent = next();
    else if (arg === "--database") opts.database = next();
    else if (arg === "--role") opts.role = next();
    else if (arg === "--help" || arg === "-h") opts.help = true;
  }
  return opts;
}

function gitBranch() {
  const result = spawnSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" });
  return result.status === 0 ? result.stdout.trim() : "";
}

async function api(path, { method = "GET", token, body } = {}) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(`${response.status}: ${json.message || text}`);
  return json;
}

async function findBranch(project, name, token) {
  const { branches } = await api(`/projects/${project}/branches`, { token });
  return branches.find((branch) => branch.name === name);
}

async function main() {
  const opts = parseArgs(process.argv);
  const token = process.env.NEON_API_KEY;

  if (opts.help || !opts.cmd) {
    console.log("Uso: node scripts/neon-branch.mjs <create|delete|url> --project <id> [--name <branch>] [--parent <branch-id>] [--database <db>] [--role <role>]");
    console.log("Requiere NEON_API_KEY. Si omitís --name, usa la branch de git actual.");
    process.exit(opts.help ? 0 : 1);
  }
  if (!token) {
    console.error("Falta NEON_API_KEY en el entorno.");
    process.exit(1);
  }
  if (!opts.project) {
    console.error("Falta --project <id>.");
    process.exit(1);
  }

  const name = opts.name || gitBranch();
  if (!name) {
    console.error("No pude determinar la branch (pasá --name).");
    process.exit(1);
  }

  if (opts.cmd === "create") {
    const existing = await findBranch(opts.project, name, token);
    if (existing) {
      console.log(`La branch ya existe: ${existing.id}`);
      return;
    }
    const created = await api(`/projects/${opts.project}/branches`, {
      method: "POST",
      token,
      body: {
        branch: { name, ...(opts.parent ? { parent_id: opts.parent } : {}) },
        endpoints: [{ type: "read_write" }],
      },
    });
    console.log(`Branch creada: ${created.branch.id} (${name})`);
  } else if (opts.cmd === "delete") {
    const branch = await findBranch(opts.project, name, token);
    if (!branch) {
      console.log(`No existe la branch ${name}`);
      return;
    }
    await api(`/projects/${opts.project}/branches/${branch.id}`, { method: "DELETE", token });
    console.log(`Branch borrada: ${branch.id} (${name})`);
  } else if (opts.cmd === "url") {
    const branch = await findBranch(opts.project, name, token);
    if (!branch) {
      console.error(`No existe la branch ${name}`);
      process.exit(1);
    }
    const query = new URLSearchParams({ branch_id: branch.id });
    if (opts.database) query.set("database_name", opts.database);
    if (opts.role) query.set("role_name", opts.role);
    const { uri } = await api(`/projects/${opts.project}/connection_uri?${query.toString()}`, { token });
    console.log(uri);
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
