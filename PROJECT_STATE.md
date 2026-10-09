# PROJECT_STATE — bootstrap-ia

> Memoria entre sesiones. Actualizar tras cada hito.

## Estado actual

- **Fase**: B6 completado (MCP Neon + GitHub + Vercel). Listo para B7.
- **Kit version**: 0.1.0
- **Repo**: privado, `bootstrap-ia`.

## Próximo paso

- B7 — Producto: agentes `product-manager`, `user-researcher`, skill `prd-writer`, comando `/prd`.

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
