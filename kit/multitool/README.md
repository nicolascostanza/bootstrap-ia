# Soporte multi-tool (Claude Code + Codex)

El kit funciona principalmente en **opencode** y de forma secundaria en **Claude Code** y **Codex CLI**. La **fuente única de verdad** vive en:

- `.opencode/agent/`, `.opencode/command/`, `.opencode/skills/`
- `AGENTS.md`
- `kit/config/mcp.json` (MCP neutro)

El generador `kit/sync/sync.mjs` convierte esa fuente a los formatos de cada herramienta, **a nivel proyecto**.

## Uso

```bash
node kit/sync/sync.mjs --target .            # genera los artefactos multi-tool
node kit/sync/sync.mjs --target . --check    # valida que no haya drift
node kit/sync/sync.mjs --target . --only skills,agents,commands,mcp
```

Con instalación global, usá `node ~/.config/opencode/kit/sync/sync.mjs --target .`.

## Qué genera

| Salida | Para | Equivalente de |
|---|---|---|
| `.claude/agents/*.md` | Claude Code | Agentes (subagents) |
| `.claude/commands/*.md` | Claude Code | Comandos (siguen siendo `/nombre`) |
| `.claude/skills/*` | Claude Code | Skills (copia) |
| `CLAUDE.md` (`@AGENTS.md`) | Claude Code | `AGENTS.md` |
| `.mcp.json` | Claude Code | MCP neutro |
| `.codex/agents/*.toml` | Codex | Agentes (custom agents) |
| `.codex/config.toml` | Codex | MCP neutro |
| `.agents/skills/*` | Codex (+ opencode) | Skills (copia) y comandos como `$nombre` |

## Conversión

- **Agente**: `description` + body; `permission.edit: deny` → Claude `disallowedTools: [Write, Edit, NotebookEdit]` y Codex `sandbox_mode = "read-only"` (solo si además `bash: deny`).
- **Comando**: en Claude queda como comando (`/nombre`, con `$ARGUMENTS`); en Codex como skill (`$nombre`) con `allow_implicit_invocation: false`.
- **MCP**: `kit/config/mcp.json` usa `${VAR}`; se convierte a `{env:VAR}` (opencode), `${VAR}` (Claude) y `bearer_token_env_var` + `http_headers` (Codex).

## Orquestación por herramienta

- **opencode** (primario): `founder` es agente primario y delega con la tool `task`.
- **Claude Code**: `founder` es un subagent; podés fijarlo como sesión con `claude --agent founder`. No se usan agent teams (experimental).
- **Codex**: `founder` está en `.codex/agents/founder.toml`; Codex spawnea subagentes cuando se lo pedís y lee `AGENTS.md`. Los flujos se invocan con `$new-startup`, `$scaffold`, etc.

## Paralelismo y multi-harness

El skill `parallel-work` define **cuándo y cómo** paralelizar o mandar a background (fan-out de reviews, tests, recon) de forma portable. Mecanismo por harness:

- **opencode** — v1: tool `task` (bloqueante); v2: tool `subagent` en background + Code Mode (`Promise.all`).
- **Claude Code** — subagents en background (default), agent view (`claude agents`), `/batch`.
- **Codex** — subagents (default), custom agents.

Cap por defecto: `engineering.parallelism` (3). Detección de harness: `node kit/dev/harness.mjs`.

Para correr **distintos harness a la vez** (opencode + Claude + Codex) en paralelo, usá **Orca**: un worktree por harness/sesión (Orca gestiona worktrees y puede lanzar codex/claude en cada uno). Es el integrador cross-harness; el kit no lo reimplementa.

## Caveats

- **Duplicado lógico en opencode**: opencode también lee `.claude/skills` y `.agents/skills`. Como el contenido es **idéntico** (generado), no cambia el comportamiento, pero un skill puede aparecer una sola vez. Si molesta, borrá `.claude/skills` o `.agents/skills` (perdés esa herramienta).
- **Claude y `AGENTS.md`**: usamos `CLAUDE.md` con `@AGENTS.md` para que funcione aunque exista `CLAUDE.local.md` o se corra `/init`.
- **Codex no tiene slash commands**: los flujos son skills invocables con `$nombre`.
- **Tokens MCP**: siguen siendo por máquina (`NEON_API_KEY`, `GITHUB_TOKEN`); Vercel se autentica por OAuth.
- **Drift**: si editás `.opencode/`, volvé a correr `sync.mjs` (o `--check` en CI).
