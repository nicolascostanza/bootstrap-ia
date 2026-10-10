# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado [SemVer](https://semver.org/lang/es/).

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
