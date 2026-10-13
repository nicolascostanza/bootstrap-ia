# Monorepo de librería (`core+adapters` / `sdk`)

Referencia para `library.layout = "monorepo"`. Aplica cuando la librería es más que un
paquete único: núcleo + integraciones, o un SDK con cliente generado.

## Cuándo es monorepo

- `core+adapters`: hay **núcleo agnóstico** y **integraciones** intercambiables (proveedores,
  storage, transporte). El adapter es el borde de swap — el mismo patrón que en apps.
- `sdk`: hay **contrato (OpenAPI)** + **cliente generado** (+ posible wrapper y paquetes
  por lenguaje). Un paquete único no alcanza.

Regla: si no hay **dos o más artefactos publicables que evolucionan juntos**, no uses
monorepo: agregá fricción sin beneficio (un solo paquete con `tsdown` + Changesets alcanza).

## Estructura

```
<lib>/
├─ pnpm-workspace.yaml        # packages/* + packages/adapters/*
├─ package.json               # raíz privada; scripts pnpm -r (build/test/typecheck/check:package)
├─ tsconfig.base.json         # strict compartido; cada paquete lo extiende
├─ .changeset/config.json     # versionado conjunto
├─ .github/workflows/{ci.yml,release.yml}
└─ packages/
   ├─ core/                   # ports (interfaces) + lógica agnóstica
   ├─ adapters/<tool>/        # uno por integración (implementan ports de core)
   └─ sdk/                    # cliente del API (kind sdk); src/generated vía openapi-ts
```

Cada paquete es autónomo: `package.json` (con `exports` **`types` primero**, `files: ["dist"]`,
`type: module`), `tsconfig.json` (`extends` al base), `tsdown.config.ts`, `src/`.

## Sentido de dependencia (clave)

`adapters → core` y `sdk → core` (si comparte tipos). **`core` nunca importa adapters.** Las
integraciones se registran en runtime (`createCore([adapter])` / `core.register(adapter)`), no
se importan en `core`. Así el consumidor trae solo los adapters que usa (tree-shakeable) y el
núcleo queda testeable sin red.

## Herramientas

- Build: **tsdown** por paquete (`format` según `library.format`).
- Tests: **vitest** por paquete; los ports de `core` se testean con un adapter in-memory.
- Gates: `publint && attw --pack .` por paquete.
- Versionado/publish: **Changesets** en la raíz (`pnpm changeset` → Action en `main`).
- SDK: **`@hey-api/openapi-ts`** (TS, sin Java) → `src/generated`; wrapper fino en `src/client.ts`.

## Versionado y publicación

- Dependencias internas con `workspace:*`; Changesets las reescribe al publicar
  (`updateInternalDependencies: "patch"`).
- Un solo `pnpm changeset` por PR que toque paquetes. El changeset describe **qué** cambió.
- `release.yml` (Changesets Action) abre el PR de versión y publica con `--provenance`.
- Names scoped → `npm publish --access public`; **Granular Access Token** (no classic).

## Reglas

- **`types` primero** en cada condición de `exports`.
- `files: ["dist"]`: nunca publicar `src/`, tests ni `.env`.
- Dual format → ojo **dual package hazard**: evitá singletons/estado global en `core`.
- No hand-write boilerplate: copiá `kit/scaffold/library-monorepo/` y verificá con
  `pnpm install && pnpm build && pnpm test && pnpm check:package`.
- `core` sin dependencias de red ni de adapters: testeable en aislamiento.
