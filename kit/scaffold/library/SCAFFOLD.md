# Scaffold de librería

Plantillas para `project.type = "library"` (kinds `util`, `ui`, `framework`). Copiá esta carpeta a la raíz del proyecto y ajustá.

| Archivo | Para qué |
|---|---|
| `package.json` | `exports` (`types` primero), `files: ["dist"]`, `type: module`, scripts |
| `tsdown.config.ts` | Build ESM+CJS + `.d.ts` |
| `tsconfig.json` | TS strict, `verbatimModuleSyntax`, `moduleResolution: bundler` |
| `vitest.config.ts` | Tests |
| `.changeset/config.json` | Versionado (Changesets) |
| `.github/workflows/ci.yml` | build + test + `check:package` |
| `.github/workflows/release.yml` | Changesets + `npm publish --provenance` |
| `src/index.ts`, `README.md`, `LICENSE` | Contenido base |

## Instalar herramientas

```bash
pnpm add -D tsdown typescript vitest @changesets/cli publint @arethetypeswrong/cli
```

## Verificar

```bash
pnpm build && pnpm test && pnpm check:package
```

Ver el skill `library-scaffold` para el procedimiento y `library-monetization` para cobrar.
