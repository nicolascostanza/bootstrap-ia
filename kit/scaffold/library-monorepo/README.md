# Monorepo de librería

Plantilla base para `project.type = "library"` con `library.layout = "monorepo"`
(`library.kind` = `core+adapters` o `sdk`). pnpm workspaces + Changesets.

Paquetes incluidos:

- `packages/core` — lógica agnóstica + **ports** (interfaces de adapter).
- `packages/adapters/example` — **adapter** de ejemplo (implementa un port de `core`).
- `packages/sdk` — cliente TypeScript (para `kind = "sdk"`).

Ver `SCAFFOLD.md` para el procedimiento y el skill `library-scaffold`.
