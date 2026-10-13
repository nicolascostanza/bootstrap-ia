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

`project.type = "library"`. Tipos (`library.kind`):

- `util`, `framework`, `ui` → **esta iteración** (paquete único).
- `core+adapters`, `sdk` → **monorepo** (siguiente iteración).

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
- Para `sdk` (futuro): OpenAPI → clientes generados (OpenAPI Generator/Kiota); monorepo `packages/<lang>`.

## Cómo afecta al proyecto

`bootstrap.config.json` → `library.*`; `project-structure` documenta el árbol.

## Salida

Paquete que compila, testeado, con gates verdes y listo para publicar.
