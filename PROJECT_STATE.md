# PROJECT_STATE — bootstrap-ia

> Memoria entre sesiones. Actualizar tras cada hito.

## Estado actual

- **Fase**: B0 + B1 (fundación + orquestación) — en ejecución.
- **Kit version**: 0.1.0
- **Repo**: privado, `bootstrap-ia`.

## Próximo paso

- B2 — Estándares técnicos (skills): `nextjs-conventions`, `react-conventions`, `typescript-conventions`, `styling-ui`, `data-postgres`, `api-design`, `testing-*`, `git-flow`, `ci-cd`, `security`, `observability`, `performance`.

## Hitos completados

- [x] Definición completa de arquitectura, decisiones y defaults (con el usuario).
- [x] B0 — Fundación del repo.
- [x] B1 — Orquestación (`founder`, `bootstrap-startup`, `/new-startup`, `/configure`, docs-template, install).

## Decisiones clave

- Todo por defecto, todo configurable: `bootstrap.config.json` es la fuente única de verdad.
- Adapters solo en bordes de swap: email, messaging, auth, otp, payments, analytics, logger, observability, flags, jobs.
- Auth: Neon Auth (Better Auth) con Google + email magic link/OTP. Sin 2FA telefónico en v1.
- Scaffold con CLIs reales + verificación (nunca generación a mano).
- SDD liviano + criterios BDD por feature.
- Testing: Jest + RTL + Playwright, 90% dominio con ratchet, E2E por tags, MSW, axe, Stryker.
- Memoria persistida en archivos (`PROJECT_STATE.md`, `roadmap.md`, `docs/`).

## Riesgos abiertos

- Instalación global: definida en `kit/install/`; validar en un proyecto real.
- Rotura por versiones: pendiente estrategia de actualización del kit.
