import { cp, mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KIT_ROOT = resolve(__dirname, "..", "..");
const CONFIG_DIR = join(homedir(), ".config", "opencode");

const TARGETS = [
  { from: ".opencode/agent", to: "agent" },
  { from: ".opencode/command", to: "command" },
  { from: ".opencode/skills", to: "skills" },
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

async function main() {
  console.log(`Kit:    ${KIT_ROOT}`);
  console.log(`Destino: ${CONFIG_DIR}\n`);

  let total = 0;
  for (const { from, to } of TARGETS) {
    const n = await copyDir(from, join(CONFIG_DIR, to));
    console.log(`[ok] ${from} -> ${join(CONFIG_DIR, to)} (${n} archivos)`);
    total += n;
  }

  console.log(`\nListo: ${total} archivos instalados.`);
  console.log("Reiniciá opencode para que tome los cambios.");
  console.log("En cualquier proyecto nuevo ya podés usar /new-startup y /configure.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
