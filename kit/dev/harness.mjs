#!/usr/bin/env node
const env = process.env;
const hasPrefix = (prefix) => Object.keys(env).some((key) => key.startsWith(prefix));

const flags = {
  opencode: Boolean(env.OPENCODE || env.OPENCODE_PID),
  orca: hasPrefix("ORCA_"),
  claude: Boolean(env.CLAUDECODE || env.CLAUDE_CODE_ENTRYPOINT),
  codex: Boolean(env.CODEX_HOME || env.CODEX_SANDBOX || env.CODEX_CI),
};

const harness = flags.claude
  ? "claude"
  : flags.codex
    ? "codex"
    : flags.orca
      ? "orca"
      : flags.opencode
        ? "opencode"
        : "unknown";

const CAPABILITIES = {
  opencode: { background: true, worktrees: true, subagents: true },
  claude: { background: true, worktrees: true, subagents: true },
  codex: { background: true, worktrees: true, subagents: true },
  orca: { background: true, worktrees: true, subagents: true },
  unknown: { background: false, worktrees: true, subagents: false },
};

const result = { harness, flags, capabilities: CAPABILITIES[harness] };

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(result, null, 2));
} else {
  const c = result.capabilities;
  console.log(`Harness:    ${harness}`);
  console.log(`Background: ${c.background ? "si" : "no"}`);
  console.log(`Worktrees:  ${c.worktrees ? "si" : "no"}`);
  console.log(`Subagents:  ${c.subagents ? "si" : "no"}`);
  console.log(`Modo:       ${c.background ? "paralelo/background disponible" : "foreground secuencial"}`);
}
