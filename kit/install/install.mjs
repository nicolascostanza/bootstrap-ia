import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = resolve(__dirname, "..", "..");
const CONFIG_DIR = join(homedir(), ".config", "opencode");
const GLOBAL_CONFIG = join(CONFIG_DIR, "opencode.json");
const CONFIG_TEMPLATE = join(KIT_ROOT, "kit", "config", "opencode.global.json");
const DEFAULTS_SRC = join(KIT_ROOT, "bootstrap.config.json");
const DEFAULTS_DEST = join(CONFIG_DIR, "kit", "config", "bootstrap.defaults.json");

const TARGETS = [
  { from: ".opencode/agent", to: "agent" },
  { from: ".opencode/command", to: "command" },
  { from: ".opencode/skills", to: "skills" },
  { from: "kit", to: "kit" },
];

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

async function copyDefaults() {
  if (!existsSync(DEFAULTS_SRC)) {
    console.warn("[skip] no existe bootstrap.config.json");
    return;
  }
  await mkdir(dirname(DEFAULTS_DEST), { recursive: true });
  await cp(DEFAULTS_SRC, DEFAULTS_DEST, { force: true });
  console.log(`[ok] defaults -> ${DEFAULTS_DEST}`);
}

async function ensureGlobalConfig() {
  if (!existsSync(CONFIG_TEMPLATE)) {
    console.warn("[skip] no existe kit/config/opencode.global.json");
    return;
  }
  const template = JSON.parse(await readFile(CONFIG_TEMPLATE, "utf8"));
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
  for (const [name, server] of Object.entries(template.mcp ?? {})) {
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
  const merged = { $schema: template.$schema, ...current, mcp };
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

  await copyDefaults();
  await ensureGlobalConfig();

  console.log(`\nListo: ${total} archivos instalados.`);
  console.log("Env vars por maquina (no se commitean): NEON_API_KEY, GITHUB_TOKEN");
  console.log("Vercel: opencode mcp auth vercel");
  console.log("Reinicia opencode para que tome los cambios.");
  console.log("En cualquier proyecto nuevo ya podes usar /new-startup y /scaffold.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
