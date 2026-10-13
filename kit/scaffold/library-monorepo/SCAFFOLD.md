# Scaffold de librería — monorepo

Para `project.type = "library"` y `library.layout = "monorepo"` (kinds `core+adapters` y `sdk`).
Copiá esta carpeta a la raíz del proyecto y ajustá nombres (`@org/…`).

| Ruta | Para qué |
|---|---|
| `pnpm-workspace.yaml` | Workspaces (`packages/*`, `packages/adapters/*`) |
| `package.json` | Raíz privada + scripts recursivos (`pnpm -r`) |
| `tsconfig.base.json` | TS strict compartido (cada paquete lo extiende) |
| `.changeset/config.json` | Versionado conjunto (Changesets) |
| `.github/workflows/{ci.yml,release.yml}` | CI (build+test+gates) y release (Changesets + publish) |
| `packages/core/` | Lógica agnóstica + **ports** (interfaces) |
| `packages/adapters/example/` | **Adapter** de ejemplo que implementa un port de `core` |
| `packages/sdk/` | Cliente del API (kind `sdk`); `src/generated/` vía OpenAPI |

## Qué quedarte según `library.kind`

- `core+adapters`: `packages/core` + `packages/adapters/*`. **Borrá** `packages/sdk`.
- `sdk`: `packages/core` (tipos/ports) + `packages/sdk`. **Borrá** `packages/adapters` (o dejalo como ejemplo).

## Instalar herramientas (versiones reales)

```bash
pnpm add -D -w tsdown typescript vitest @changesets/cli publint @arethetypeswrong/cli
# solo sdk (generador OpenAPI, sin Java):
pnpm add -D -w @hey-api/openapi-ts
```

## Ajustar

1. `name` de cada paquete (`@org/core`, `@org/adapter-x`, `@org/sdk`) y `version: 0.1.0`.
2. `exports` de cada paquete: **`types` primero**, `files: ["dist"]`, `type: module`, `engines.node`.
3. Dependencias internas con `workspace:*` (ej. adapter → `@org/core`).
4. sdk: poné el spec en `openapi/openapi.yaml` y corré `pnpm --filter @org/sdk generate`.

## Verificar

```bash
pnpm install
pnpm build && pnpm test && pnpm check:package
```

## Reglas

- **`types` primero** en cada `exports`. `files: ["dist"]` (nunca `src/`).
- `core` **no** importa ningún adapter (sentido de dependencia: adapters → core).
- Dual format → evitá estado global (dual package hazard).
- Publicación: `pnpm changeset` → merge a `main` → la Action versiona y publica (`--provenance`).
- No hand-write boilerplate: copiá la plantilla y verificá con `build`/`test`.

Ver el skill `library-scaffold` (y `references/monorepo.md`) y `library-monetization` para cobrar.
