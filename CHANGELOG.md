# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado [SemVer](https://semver.org/lang/es/).

## [Unreleased]

### Agregado

- **Track de librerías/SDK — monorepo** (`library.layout`): kinds `core+adapters` y `sdk`. Config `library.layout`/`apiSpec`/`sdkTargets`; plantilla `kit/scaffold/library-monorepo/` (pnpm workspaces: `packages/core` con ports + `packages/adapters/*` + `packages/sdk`; CI/release con Changesets); `library-scaffold/references/monorepo.md`; árbol monorepo en `project-structure`.
- **Track `mobile`** (`project.type` incluye `mobile`): `mobile.framework` (**Expo** default; `native` Kotlin+Swift; `kmp`), `targets`, `router`, `updates` (EAS OTA), `distribution` (EAS), `testing` (`jest-expo+rntl+maestro`), `payments` (stores) y `shared` (monorepo con la web). Comando `/mobile`, skill `mobile-scaffold` (+ `references/`: `expo`, `native`, `kmp`, `distribution`, `monetization`, `testing`, `shared`) y plantilla `kit/scaffold/mobile/` (Expo). `/release` y `ci-cd` suman la rama mobile; `project-structure` agrega los árboles; `bootstrap-startup` agrega la Ronda M.

## [0.2.0] - 2026-10-12

### Pull requests

- #1 docs: branch protection activa en main y develop
- #3 feat: toolkit de UX (Impeccable) como referencia opcional
- #5 feat: track de librerías/SDK (project.type, library.*, /library)

### Agregado

- Validación explícita en el config: `engineering.validation` (default **Zod**; alternativas `valibot`, `arktype`, `none`).
- Accesibilidad explícita: `engineering.accessibility` (default **WCAG 2.2 AA**) y skill `accessibility`.
- Soporte **multi-tool**: `kit/sync/sync.mjs` genera artefactos para **Claude Code** (`.claude/agents`, `.claude/commands`, `.claude/skills`, `CLAUDE.md`, `.mcp.json`) y **Codex** (`.codex/agents`, `.codex/config.toml`, `.agents/skills`).
- Fuente MCP neutra en `kit/config/mcp.json` (una sola fuente → opencode, Claude y Codex) y documentación en `kit/multitool/`.
- **`/brainstorm`**: espacio guiado de ideación con red-team, benchmarks, scorecard y veredicto; artefacto `docs/idea.md`.
- **Subagente `skeptic`**: red-team adversarial (fortalezas, riesgos, supuestos, comparables).
- **Skill `verification-before-completion`**: evidencia reproducible antes de declarar terminado.
- Plantilla `kit/docs-template/idea.md`.
- **`/worktree` + skill `worktrees`**: aislamiento por feature con herramientas nativas (Orca/opencode) y `git worktree` como fallback.
- **`kit/dev/ports.mjs`**: puertos determinísticos por worktree (FNV-1a + probing), con `--write`, `--list`, `--count`.
- **Skill `dev-environment`** (opt-in): nativo vs devcontainer vs compose-only, con plantillas `.devcontainer/` (app + servicios opcionales) y checklist cross-platform.
- **Product review**: skill `product-review` + subagente `product-reviewer` + comando `/product-review` (feedback de producto sobre una feature ya hecha).
- **Paralelismo**: skill `parallel-work` (fan-out portable: review, tests, recon) + helper `kit/dev/harness.mjs` (detecta harness y capacidades).
- **Estructura de proyecto**: skill `project-structure`, índice `docs/README.md` y plantilla `docs/specs/_template.md`.
- **Landing con scroll**: skill `scroll-landing` + comando `/landing` (track propio), helper `kit/dev/frames.mjs` (video → frames WebP con ffmpeg) y plantillas `kit/scaffold/landing/` (motor de image-sequence vanilla + componente Next + demo).
- **Video gratis**: `scroll-landing/references/free-video.md` (stock / AI gratis con first/last-frame / local) con licencias y recomendación por caso.
- **E2E headless**: `testing.e2eHeadless` + `testing.e2eOnFailure` (default headless, artefactos en fallo); skill `testing-e2e` con sección de navegador y scripts de debug.
- **Git flow completo**: templates `kit/scaffold/.github/` (PR template + `ci.yml` + `e2e-nightly.yml`), `CONTRIBUTING.md`, y `kit/dev/neon-branch.mjs` (branch de Neon por PR).
- **Toolkit de UX (Impeccable)**: `product.uxToolkit`, `design-system/references/impeccable.md` y referencias en `ux-designer`, `ui-reviewer`, `landing-page`, `scroll-landing` y `ci-cd` (detector opcional).
- **Track de librerías/SDK**: `project.type` + `deliverables`, config `library.*`, skills `library-scaffold` y `library-monetization` (+`references/monetization.md`), comando `/library` y plantillas `kit/scaffold/library/` (tsdown + Changesets + publint/attw + vitest).

### Cambiado

- Scaffold instala `zod`, `jest-axe` y `@axe-core/playwright`.
- Comandos neutros entre herramientas (sin referencias a `tool task`/`tool skill`) y `sync` integrado en `/new-startup` y `/scaffold`.
- `/new-startup` advierte (sin bloquear) si no existe `docs/idea.md` y ofrece `/brainstorm`.
- `/feature` cierra con evidencia mostrada (`verification-before-completion`).
- `bootstrap.config.json`: `product.brainstorm = guided+adversarial`.
- `sync.mjs`: si un comando colisiona con un skill del mismo nombre, gana el skill.
- **Git Flow**: features desde `develop`, `release/X.Y.Z` hacia `main` (con back-merge), `hotfix` desde `main`. CI del kit (`.github/workflows/ci.yml`) y rama `develop` creada.
- `new-startup` agrega la **Ronda 0 (tipo)** y la **Ronda L (librería)**; `/release` ramifica por `project.type`; `project-structure` documenta el árbol de librería.
- `git-flow` y `ci-cd` documentan branch protection (`gh api`) y release/versionado; `/feature` usa la branch del worktree y crea el PR con `gh pr create`; `/release` sube `package.json.version`.
- `/feature` ofrece crear el worktree antes de codear; scaffold deja el `dev` script con `--port ${PORT:-3000}`, copia `scripts/ports.mjs` y agrega `.worktrees/` al `.gitignore`.
- `/feature` cierra sugiriendo `/product-review`.
- `/review`, `/feature` y `/brainstorm` ahora lanzan sus subagentes en **paralelo** y consolidan; `bootstrap.config.json` agrega `engineering.parallelism` (3).
- **Specs por feature**: viven en `docs/specs/<feature>.md`; `docs/prd.md` pasa a ser índice. `prd-writer`, `/prd`, `/feature`, `qa-tester`, `product-review` y `/test` apuntan a la spec.
- Scaffold y `/new-startup` generan el árbol de documentación.
- `bootstrap.config.json`: `engineering.worktrees`, `ports`, `portsBase`, `portsRange`, `dbPerWorktree`, `devEnv`.

## [0.1.0] - 2026-10-10

### Agregado

- **B0 — Fundación**: `opencode.json`, `bootstrap.config.json`, `AGENTS.md`, `PROJECT_STATE.md`, `.gitignore`, `.gitattributes`, `README.md`.
- **B1 — Orquestación**: agente `founder`, skill `bootstrap-startup`, comandos `/new-startup` y `/configure`, 10 plantillas de docs, instalador global.
- **B2 — Estándares técnicos** (13 skills): `nextjs-conventions`, `react-conventions`, `typescript-conventions`, `styling-ui`, `data-postgres`, `api-design`, `testing-unit-jest`, `testing-e2e`, `git-flow`, `ci-cd`, `security`, `observability`, `performance`.
- **B3 — Agentes de ingeniería**: `architect`, `code-reviewer`, `debugger`, `qa-tester`, `refactorer`, `devops`, `security-auditor`.
- **B4 — Workflow**: `/feature`, `/test`, `/review`, `/release`, `/hotfix`.
- **B5 — Scaffold**: skill `nextjs-postgres-scaffold`, `/scaffold`, `kit/scaffold/` (env, errors, logger, http, adapter de referencia).
- **B6 — MCP**: Neon, GitHub, Vercel; documentación en `kit/mcp/`.
- **B7 — Producto**: `product-manager`, `user-researcher`, skill `prd-writer`, `/prd`.
- **B8 — Diseño/UX**: `ux-designer`, `ui-reviewer`, skill `design-system`, `/design`.
- **B9 — GTM**: `growth-strategist`, `copywriter`, skills `landing-page` y `gtm-launch`, `/gtm`.
- **B10 — Fundraising**: `pitch-coach`, skill `pitch-deck`, `/pitch`.
- **B11 — Ops/Legal/Finanzas**: `ops-analyst`, skills `pricing-model` y `legal-docs`.
- **B12 — Distribución**: instalación multi-máquina, config global versionada, `/status`, template de GitHub.
- **B13 — Founder OS**: `metrics-activation`, `validation-kill-criteria`, `discovery-loop`, `deliverability-dns`, `finops-guardrails`, `onboarding-activation`.

### Cambiado

- Entrevista de `/new-startup` en rondas interactivas (A→E) con opción de defaults.
- Instalador idempotente que crea la config global sin pisar claves existentes y migra tokens de Neon en texto plano a `{env:NEON_API_KEY}`.
