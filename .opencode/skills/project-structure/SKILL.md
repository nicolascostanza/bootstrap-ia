---
name: project-structure
description: Define la estructura de carpetas canonica de un proyecto del kit (docs/ core + subcarpetas, una spec por feature, codigo Next.js, y donde van los artefactos fijos de cada herramienta). Usalo al crear el proyecto, al decidir donde va un archivo, o cuando haya que agregar una carpeta o documento nuevo.
license: MIT
compatibility: opencode
metadata:
  bloque: refinement
  docs: hybrid (core plano + subcarpetas)
  specs: per-feature
---

# Estructura del proyecto

## Árbol canónico

```
<startup>/
├─ bootstrap.config.json        # decisiones (fuente única)
├─ PROJECT_STATE.md             # memoria entre sesiones
├─ AGENTS.md                    # reglas del proyecto (multi-tool)
├─ CLAUDE.md                    # @AGENTS.md (Claude)
├─ README.md · CHANGELOG.md
├─ docs/
│   ├─ README.md                # índice de la documentación
│   ├─ vision · idea · prd · roadmap · metrics · validation ·
│   │  gtm · design-brief · deliverability · finops · onboarding · legal · pitch
│   ├─ specs/<feature>.md       # una spec por feature
│   ├─ adr/NNN-titulo.md        # decisiones de arquitectura
│   ├─ reviews/<feature>.md     # product reviews
│   └─ research/                # investigación y entrevistas
├─ app/                         # Next.js App Router: (marketing) (app) api
├─ features/<dominio>/          # components hooks actions.ts schemas.ts types.ts
├─ lib/                         # env errors logger http rate-limit + adapters/
├─ db/                          # schema queries seed
├─ scripts/ports.mjs
├─ .worktrees/                  # gitignoreado
├─ .devcontainer/               # opt-in (devEnv=devcontainer)
└─ .claude/ · .codex/ · .agents/  # multi-tool (ubicación fija)
```

## Reglas

- **Un archivo por tema**; las **specs** van una por feature en `docs/specs/` (no todas en `prd.md`).
- `docs/prd.md` es el **índice** de features + alcance del MVP; el detalle vive en la spec.
- **Ubicación fija** (no mover): `.claude/`, `.codex/`, `.agents/`, `AGENTS.md`, `CLAUDE.md`, `.worktrees/` — así los descubre cada herramienta.
- **Fijos**: `bootstrap.config.json`, `PROJECT_STATE.md`, `scripts/ports.mjs`.
- **Configurables**: `engineering.layout` (`single-nextjs` | `split-backend`) y `engineering.devEnv`.
- Al **agregar una carpeta de docs**, actualizá `docs/README.md`.
- Código: `lib/adapters/*` solo en bordes de swap; en `app/` solo composición, sin lógica de negocio.

## Estructura de librería (`project.type = library`)

**Layout `single`** (`library.kind` = `util` / `ui` / `framework`):

```
<lib>/
├─ package.json          # exports (types primero), files:["dist"], type:module
├─ tsdown.config.ts · tsconfig.json · vitest.config.ts
├─ .changeset/config.json
├─ .github/workflows/{ci.yml,release.yml}
├─ src/ · dist/          # dist no se commitea
└─ README.md · LICENSE · CHANGELOG.md
```

**Layout `monorepo`** (`library.kind` = `core+adapters` / `sdk`):

```
<lib>/
├─ pnpm-workspace.yaml            # packages/* + packages/adapters/*
├─ package.json · tsconfig.base.json · .changeset/config.json
├─ .github/workflows/{ci.yml,release.yml}
└─ packages/
   ├─ core/                       # ports (interfaces) + lógica agnóstica
   ├─ adapters/<tool>/            # implementan ports de core (core+adapters)
   └─ sdk/                        # cliente del API (kind sdk)
```
Sentido de dependencia: `adapters → core`, `sdk → core`. `core` nunca importa adapters.

## Estructura mobile (`project.type` incluye `mobile`)

**Expo (default):**

```
<app>/
├─ app/                     # Expo Router (_layout.tsx, index.tsx)
├─ lib/env.ts               # validación de env (EXPO_PUBLIC_*)
├─ app.json · eas.json · tsconfig.json · jest.config.js
├─ .maestro/                # flujos E2E (Maestro)
└─ .easignore · .env        # .env no se commitea
```

**Nativo (Kotlin + Swift):** `android/` (Gradle + Compose) + `ios/` (SwiftUI, proyecto vía Tuist/XcodeGen).
**KMP:** `shared/` (`commonMain`/`androidMain`/`iosMain`) + `androidApp/` + `iosApp/`.

**Monorepo web + mobile** (`mobile.shared = monorepo`):

```
<monorepo>/
├─ pnpm-workspace.yaml
├─ apps/web/     · apps/mobile/
└─ packages/shared/   # tipos, schemas Zod y lógica pura (sin dependencias de plataforma)
```

## Cómo crece `docs/`

- **Core plano**: los documentos vivos del negocio y producto.
- **Subcarpetas cuando haya volumen**: `specs/` (siempre, una por feature), `adr/`, `reviews/`, `research/`.
- No categorices antes de tener 15+ docs: agrega fricción y churn sin beneficio.

## Salida

El scaffold genera el árbol; los agentes escriben en las rutas canónicas.
