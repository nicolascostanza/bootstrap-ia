import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = resolve(__dirname, "..", "..");
const CONFIG_DIR = join(homedir(), ".config", "opencode");
const GLOBAL_CONFIG = join(CONFIG_DIR, "opencode.json");

const TARGETS = [
  { from: ".opencode/agent", to: "agent" },
  { from: ".opencode/command", to: "command" },
  { from: ".opencode/skills", to: "skills" },
  { from: "kit", to: "kit" },
];

const EXTRA_COPIES = [
  { from: "bootstrap.config.json", to: join("kit", "config", "bootstrap.defaults.json") },
  { from: "AGENTS.md", to: join("kit", "config", "AGENTS.md") },
];

function toOpencodeHeaders(headers) {
  const out = {};
  for (const [key, value] of Object.entries(headers)) {
    out[key] = value.replace(/\$\{([A-Z0-9_]+)\}/g, "{env:$1}");
  }
  return out;
}

function toOpencodeMcp(neutral) {
  const mcp = {};
  for (const [name, server] of Object.entries(neutral.servers || {})) {
    const entry = { type: server.type || "remote", url: server.url, enabled: server.enabled !== false };
    if (server.headers) entry.headers = toOpencodeHeaders(server.headers);
    mcp[name] = entry;
  }
  return mcp;
}

async function copyDir(from, to) {
  const src = join(KIT_ROOT, from);
  if (!existsSync(src)) {
    console.warn(`[skip] no existe: ${from}`);
    return 0;
  }
  await mkdir(to, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  let count = 0;
  for (const entry of entries) {
    const s = join(src, entry.name);
    const d = join(to, entry.name);
    if (entry.isDirectory()) {
      count += await copyDir(join(from, entry.name), d);
    } else if (entry.isFile()) {
      await cp(s, d, { force: true });
      count += 1;
    }
  }
  return count;
}

async function copyExtra({ from, to }) {
  const src = join(KIT_ROOT, from);
  if (!existsSync(src)) {
    console.warn(`[skip] no existe: ${from}`);
    return;
  }
  const dest = join(CONFIG_DIR, to);
  await mkdir(dirname(dest), { recursive: true });
  await cp(src, dest, { force: true });
  console.log(`[ok] ${from} -> ${dest}`);
}

async function ensureGlobalConfig() {
  const neutralPath = join(KIT_ROOT, "kit", "config", "mcp.json");
  if (!existsSync(neutralPath)) {
    console.warn("[skip] no existe kit/config/mcp.json");
    return;
  }
  const neutral = JSON.parse(await readFile(neutralPath, "utf8"));
  const template = toOpencodeMcp(neutral);

  let current = {};
  if (existsSync(GLOBAL_CONFIG)) {
    try {
      const raw = await readFile(GLOBAL_CONFIG, "utf8");
      current = raw.trim() ? JSON.parse(raw) : {};
    } catch {
      console.warn("[warn] opencode.json existente no es JSON valido; se deja intacto");
      return;
    }
  }

  const mcp = { ...(current.mcp ?? {}) };
  let added = 0;
  for (const [name, server] of Object.entries(template)) {
    if (!(name in mcp)) {
      mcp[name] = server;
      added += 1;
    }
  }

  const neonAuth = mcp.Neon?.headers?.Authorization;
  if (typeof neonAuth === "string" && /Bearer\s+napi_/.test(neonAuth)) {
    mcp.Neon.headers.Authorization = "Bearer {env:NEON_API_KEY}";
    console.log("[fix] Neon: token en texto plano reemplazado por {env:NEON_API_KEY}");
  }

  const merged = { $schema: "https://opencode.ai/config.json", ...current, mcp };
  await mkdir(CONFIG_DIR, { recursive: true });
  await writeFile(GLOBAL_CONFIG, `${JSON.stringify(merged, null, 2)}\n`);
  console.log(`[ok] config global -> ${GLOBAL_CONFIG} (${added} MCP nuevos)`);
}

async function main() {
  console.log(`Kit:     ${KIT_ROOT}`);
  console.log(`Destino: ${CONFIG_DIR}\n`);

  let total = 0;
  for (const { from, to } of TARGETS) {
    const n = await copyDir(from, join(CONFIG_DIR, to));
    console.log(`[ok] ${from} -> ${join(CONFIG_DIR, to)} (${n} archivos)`);
    total += n;
  }

  for (const extra of EXTRA_COPIES) await copyExtra(extra);
  await ensureGlobalConfig();

  console.log(`\nListo: ${total} archivos instalados.`);
  console.log("Env vars por maquina (no se commitean): NEON_API_KEY, GITHUB_TOKEN");
  console.log("Vercel: opencode mcp auth vercel");
  console.log("Multi-tool en un proyecto: node ~/.config/opencode/kit/sync/sync.mjs --target .");
  console.log("Reinicia opencode para que tome los cambios.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
