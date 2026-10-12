# PROJECT_STATE — bootstrap-ia

> Memoria entre sesiones. Actualizar tras cada hito.

## Estado actual

- **Fase**: B0–B13 completados. Kit 0.1.0 funcional de punta a punta.
- **Kit version**: 0.1.0
- **Repo**: privado, `bootstrap-ia`.

## Próximo paso

- Dogfooding: usar el kit en una startup real (`/new-startup` → `/scaffold` → `/feature`) y ajustar lo que friccione.
- Validar la instalación en macOS.
- Validar el soporte multi-tool en Claude Code y Codex reales.

## Hitos completados

- [x] Definición completa de arquitectura, decisiones y defaults (con el usuario).
- [x] B0 — Fundación del repo.
- [x] B1 — Orquestación (`founder`, `bootstrap-startup`, `/new-startup`, `/configure`, docs-template, install).
- [x] B2 — Estándares técnicos (13 skills).
- [x] B3 — Agentes de ingeniería: `architect`, `code-reviewer`, `debugger`, `qa-tester`, `refactorer`, `devops`, `security-auditor`.
- [x] B4 — Comandos de workflow: `/feature`, `/test`, `/review`, `/release`, `/hotfix`.
- [x] B5 — Scaffolding ejecutable: skill `nextjs-postgres-scaffold`, comando `/scaffold` y `kit/scaffold/` (env, errors, logger, http, adapter de referencia).
- [x] B6 — MCP: Neon (activo), GitHub (pendiente de `GITHUB_TOKEN`), Vercel (OAuth). Documentado en `kit/mcp/`.
- [x] DX + multi-máquina: config global versionada (`kit/config/opencode.global.json`), defaults instalados, instalador idempotente que no pisa config, y entrevista interactiva por rondas (A→E).
- [x] B7 — Producto: `product-manager`, `user-researcher`, `prd-writer`, `/prd`.
- [x] B8 — Diseño/UX: `ux-designer`, `ui-reviewer`, `design-system`, `/design`.
- [x] B9 — GTM: `growth-strategist`, `copywriter`, `landing-page`, `gtm-launch`, `/gtm`.
- [x] B10 — Fundraising: `pitch-coach`, `pitch-deck`, `/pitch`.
- [x] B11 — Ops/Legal/Finanzas: `ops-analyst`, `pricing-model`, `legal-docs`.
- [x] B12 — Distribución: template de GitHub, `CHANGELOG.md`, `/status`.
- [x] B13 — Founder OS: `metrics-activation`, `validation-kill-criteria`, `discovery-loop`, `deliverability-dns`, `finops-guardrails`, `onboarding-activation`.
- [x] Zod explícito (`engineering.validation`) y skill `accessibility` (WCAG AA).
- [x] Soporte multi-tool: `kit/sync/sync.mjs` + `kit/config/mcp.json` (Claude Code y Codex, a nivel proyecto).
- [x] Refinamiento: `/brainstorm` (red-team con `skeptic`, benchmarks, scorecard, `docs/idea.md`) y `verification-before-completion`.
- [x] Worktrees: `/worktree` + skill `worktrees` (nativo Orca/opencode → git fallback) y `kit/dev/ports.mjs` (puertos determinísticos).
- [x] Entorno de dev: skill `dev-environment` (nativo/devcontainer/compose-only, opt-in) + plantillas `kit/dev/devcontainer/` y checklist cross-platform.
- [x] Product review: skill `product-review` + `product-reviewer` + `/product-review` (capa de producto que faltaba).
- [x] Paralelismo: skill `parallel-work` + `kit/dev/harness.mjs`; `/review`, `/feature` y `/brainstorm` hacen fan-out y consolidan.
- [x] Estructura: skill `project-structure` (docs híbrido) + specs por feature en `docs/specs/` + índice `docs/README.md`.
- [x] Landing con scroll: skill `scroll-landing` + `/landing` + `kit/dev/frames.mjs` + `kit/scaffold/landing/` (motor image-sequence gratis) + `references/free-video.md` (stock / AI gratis / local).
- [x] E2E headless: default headless, artefactos en fallo (`testing.e2eHeadless`, `testing.e2eOnFailure`) y scripts de debug.
- [x] Git flow completo: PR template, CI (`ci.yml`, `e2e-nightly.yml`), `CONTRIBUTING.md`, branch protection y `neon-branch.mjs`.
- [x] Git Flow (modelo): `develop` como integración, `release/*` a `main` con back-merge, `hotfix` desde `main`; CI del kit y rama `develop` creada.

## Decisiones clave

- Todo por defecto, todo configurable: `bootstrap.config.json` es la fuente única de verdad.
- Adapters solo en bordes de swap: email, messaging, auth, otp, payments, analytics, logger, observability, flags, jobs.
- Auth: Neon Auth (Better Auth) con Google + email magic link/OTP. Sin 2FA telefónico en v1.
- Scaffold con CLIs reales + verificación (nunca generación a mano).
- SDD liviano + criterios BDD por feature.
- Testing: Jest + RTL + Playwright, 90% dominio con ratchet, E2E por tags, MSW, axe, Stryker.
- Memoria persistida en archivos (`PROJECT_STATE.md`, `roadmap.md`, `docs/`).

## Riesgos abiertos

- Instalación global: resuelta y probada en Windows; falta validar en macOS (2 máquinas).
- Rotura por versiones: pendiente estrategia de actualización del kit.
- Branch protection del kit: **activa** (repo público). `main` y `develop` con PR + 1 review + check `ci`, sin force-push ni borrado (`enforce_admins: false` para no bloquear al dueño en solitario).
