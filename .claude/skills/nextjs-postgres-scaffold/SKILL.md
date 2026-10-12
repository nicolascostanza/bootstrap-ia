---
name: nextjs-postgres-scaffold
description: Procedimiento del kit para crear el proyecto base Next.js + TypeScript + Postgres con todas las decisiones de bootstrap.config.json aplicadas, usando CLIs reales y verificacion con build y tests. Usalo cuando el usuario ejecute /scaffold, pida "crear el proyecto", "scaffold", "inicializar la app" o armar la base de la startup.
license: MIT
compatibility: opencode
metadata:
  bloque: B5
  metodo: clis-reales+verificacion
---

# Scaffold Next.js + Postgres

## Regla de oro

**Nunca generar boilerplate a mano.** Se usan los CLIs reales y se verifica cada paso con `build` + tests. Si un comando falla, se resuelve antes de seguir.

## Paso 0 — Leer decisiones

Leé `bootstrap.config.json`. De ahí salen: `packageManager`, `styling`, `database`, `auth`, `layout`, `testing`, `lint`, `validation` y `accessibility`. No asumas valores.

## Paso 1 — App Next.js (CLI)

```bash
pnpm create next-app@latest . --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-pnpm --yes
```

- Registrá la versión de Next instalada y **fijala** en `package.json`.
- Verificá: `pnpm build`.

## Paso 2 — UI (CLI shadcn)

```bash
pnpm dlx shadcn@latest init -d
pnpm dlx shadcn@latest add button input card dialog dropdown-menu toast skeleton
```

- Ajustá los tokens (color/radio/tipografía) según `styling-ui`.
- Si `styling` es un default distinto (Tailwind solo, CSS Modules, MUI), adaptá según ese skill.

## Paso 3 — Base de datos (Drizzle)

```bash
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
```

- Creá `drizzle.config.ts`, `db/schema/index.ts`, `db/queries/`.
- Verificá `pnpm drizzle-kit generate` sin errores y aplicá a la branch de Neon de desarrollo.

## Paso 4 — Auth (Neon Auth / Better Auth)

- Instalá el SDK vigente (verificá el nombre y la versión actuales en la doc oficial antes de fijar).
- Configurá **Google + email magic link/OTP**. Sin 2FA telefónico.
- Rutas protegidas del grupo `(app)/` verifican sesión en el servidor.

## Paso 5 — Archivos base del kit

```bash
pnpm add zod
```

`lib/env.ts` usa el validador del kit (`engineering.validation`, default Zod).

Copiá desde `kit/scaffold/` (global: `~/.config/opencode/kit/scaffold/`):

- `.env.example`
- `lib/env.ts`, `lib/errors.ts`, `lib/logger.ts`, `lib/http.ts`
- `lib/adapters/email.ts` (implementación de referencia del patrón adapter)
- `scripts/ports.mjs` (copiá `kit/dev/ports.mjs`)
- Si `engineering.devEnv` es `devcontainer`, copiá `kit/dev/devcontainer/` a `.devcontainer/`
- Si `docs/` no existe, creá el árbol de documentación (skill `project-structure`)

En `package.json`, dejá el `dev` script como `"dev": "next dev --port ${PORT:-3000}"`. Agregá `.worktrees/` a `.gitignore`.

Completá las env en `.env` (nunca commitear).

## Paso 6 — Testing

- Jest: `pnpm add -D jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event msw jest-axe @next/jest`
- Playwright: `pnpm create playwright` y `pnpm add -D @axe-core/playwright`
- Configurá cobertura (90% dominio, ratchet), MSW handlers y un test de humo por capa.
- En `playwright.config.ts`: `headless: true` y artefactos en fallo (`trace: "retain-on-failure"`, `screenshot: "only-on-failure"`, `video: "retain-on-failure"`). Scripts: `test:e2e`, `test:e2e:headed`, `test:e2e:ui`, `e2e:report`.
- Verificá: `pnpm test` y `pnpm test:e2e` (al menos `@critical`).

## Paso 7 — CI

- Copiá `.github/workflows/ci.yml` (lint → typecheck → test → build → e2e @critical).
- Configurá la branch de Neon por PR.

## Paso 8 — Verificación final

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

- Deploy de preview.
- Generá los artefactos multi-tool: `node ~/.config/opencode/kit/sync/sync.mjs --target .`.
- Actualizá `PROJECT_STATE.md` y `docs/roadmap.md`.

## Reglas

- Un paso a la vez; no sigas sin verificación verde.
- Operaciones destructivas (borrar DB/branch, reset) siempre se confirman.
- Si una herramienta cambió de API, consultá la doc oficial actual y fijá la versión; no adivines.
- Cero secretos en el repo; `.env.example` solo con claves vacías.
