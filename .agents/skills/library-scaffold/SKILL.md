---
name: library-scaffold
description: Crea una libreria o SDK publicable (TypeScript) con build, versionado, gates de calidad y publish segun library.kind. Usalo cuando project.type=library, al ejecutar /library, o al crear un paquete publicable con tsdown+changesets.
license: MIT
compatibility: opencode
metadata:
  bloque: library-track
  default: tsdown+changesets+publint+attw
---

# Librería / SDK — scaffold

## Cuándo

`project.type = "library"`. Dos layouts según `library.kind` (`library.layout`):

- `util`, `framework`, `ui` → **paquete único** (`single`).
- `core+adapters`, `sdk` → **monorepo** pnpm workspaces + Changesets (`monorepo`).

## Estructura

```
<lib>/
├─ package.json          # exports (types primero), files:["dist"], type:module
├─ tsdown.config.ts      # build ESM+CJS + .d.ts
├─ tsconfig.json
├─ vitest.config.ts
├─ .changeset/config.json
├─ .github/workflows/{ci.yml,release.yml}
├─ src/index.ts
├─ README.md · LICENSE
```

## Procedimiento

1. `pnpm init` y copiá `kit/scaffold/library/` (global: `~/.config/opencode/kit/scaffold/library/`).
2. Instalá herramientas con versiones reales: `pnpm add -D tsdown typescript vitest @changesets/cli publint @arethetypeswrong/cli` (verificá las últimas).
3. Ajustá `package.json`: `name` (scoped `@org/…`), `exports` (**`types` primero**), `files: ["dist"]`, `type: module`, `engines.node`.
4. Build con `tsdown` según `library.format` (`dual` → esm+cjs; `esm-only`).
5. Tests con `vitest` (default en libs).
6. Gates: `pnpm check:package` = `publint && attw --pack .`.
7. CI (`ci.yml`) + release (`release.yml` con Changesets + `npm publish --provenance`).
8. Docs: `typedoc` + README real.
9. Verificá: `pnpm build && pnpm test && pnpm check:package`.
10. Primera publicación (manual): `pnpm build && npx changeset version && npm publish --access public`.

## Reglas

- **`types` primero** en cada condición de `exports`.
- `files: ["dist"]`: nunca publicar `src/`, tests ni `.env`.
- Dual format → ojo con el **dual package hazard** (evitá estado global/singletons).
- npm: **Granular Access Token** (los classic están deprecados); `--access public` en paquetes scoped.
- No hand-write boilerplate: `pnpm init` + plantillas + verificación con `build`/`test`.
- Para `sdk`: OpenAPI → cliente TS generado (`@hey-api/openapi-ts`, sin Java); `packages/sdk`.

## Monorepo (`core+adapters` / `sdk`)

Plantilla: `kit/scaffold/library-monorepo/` (global: `~/.config/opencode/kit/scaffold/library-monorepo/`).
Detalle y decisiones en `references/monorepo.md`.

```
<lib>/
├─ pnpm-workspace.yaml        # packages/* + packages/adapters/*
├─ package.json               # raíz privada + scripts pnpm -r
├─ tsconfig.base.json
├─ .changeset/config.json
├─ .github/workflows/{ci.yml,release.yml}
└─ packages/
   ├─ core/                   # lógica + ports (interfaces), sin deps de adapters
   ├─ adapters/<tool>/        # implementan ports de core (core+adapters)
   └─ sdk/                    # cliente del API (kind sdk)
```

1. Copiá `kit/scaffold/library-monorepo/` a la raíz y ajustá `@org/…`.
2. `pnpm add -D -w tsdown typescript vitest @changesets/cli publint @arethetypeswrong/cli`
   (y `@hey-api/openapi-ts` si es `sdk`).
3. `core+adapters`: `packages/core` + `packages/adapters/*` (borrá `sdk`).
   `sdk`: `packages/core` + `packages/sdk` (poné `openapi/openapi.yaml` y `pnpm --filter @org/sdk generate`).
4. Internos con `workspace:*`. **Sentido de dependencia: adapters → core** (core nunca importa adapters).
5. Verificá `pnpm install && pnpm build && pnpm test && pnpm check:package`.

## Cómo afecta al proyecto

`bootstrap.config.json` → `library.*` (`kind`, `layout`, `apiSpec`, `sdkTargets`); `project-structure` documenta el árbol.

## Salida

Paquete que compila, testeado, con gates verdes y listo para publicar.
