#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

function parseArgs(argv) {
  const opts = { fps: 24, width: 1280, format: "webp", quality: 70, out: "public/sequence" };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => argv[(i += 1)];
    if (arg === "--input") opts.input = next();
    else if (arg === "--out") opts.out = next();
    else if (arg === "--fps") opts.fps = Number(next());
    else if (arg === "--width") opts.width = Number(next());
    else if (arg === "--format") opts.format = next();
    else if (arg === "--quality") opts.quality = Number(next());
    else if (arg === "--help" || arg === "-h") opts.help = true;
  }
  return opts;
}

function has(bin) {
  const result = spawnSync(bin, ["-version"], { stdio: "ignore" });
  return result.status === 0;
}

function main() {
  const opts = parseArgs(process.argv);

  if (opts.help || !opts.input) {
    console.log("Uso: node scripts/frames.mjs --input video.mp4 [--out public/sequence] [--fps 24] [--width 1280] [--format webp|jpg] [--quality 70]");
    process.exit(opts.help ? 0 : 1);
  }

  if (!has("ffmpeg")) {
    console.error("ffmpeg no esta instalado.");
    console.error("- Windows:  winget install Gyan.FFmpeg");
    console.error("- macOS:    brew install ffmpeg");
    console.error("- Linux:    sudo apt install ffmpeg");
    process.exit(1);
  }

  const out = resolve(opts.out);
  mkdirSync(out, { recursive: true });

  const codec = opts.format === "jpg" ? [] : ["-c:v", "libwebp", "-q:v", String(opts.quality)];
  const args = [
    "-y",
    "-i", resolve(opts.input),
    "-vf", `fps=${opts.fps},scale=${opts.width}:-1`,
    "-an",
    ...codec,
    join(out, `frame-%04d.${opts.format}`),
  ];

  console.log(`ffmpeg ${args.join(" ")}`);
  const run = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (run.status !== 0) process.exit(run.status ?? 1);

  const frames = readdirSync(out).filter((file) => /^frame-\d+\.(webp|jpg)$/.test(file));
  const config = { frameCount: frames.length, zeroPadding: 4, extension: opts.format, width: opts.width, fps: opts.fps };
  writeFileSync(join(out, "sequence.json"), `${JSON.stringify(config, null, 2)}\n`);

  console.log(`\nListo: ${frames.length} frames en ${out}`);
  console.log(`Config: ${join(out, "sequence.json")}`);
  console.log(`Base para el motor: /sequence/frame- (zeroPadding ${config.zeroPadding}, .${config.extension})`);
}

main();
