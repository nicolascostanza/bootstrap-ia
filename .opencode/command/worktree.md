---
description: Aisla el trabajo en un git worktree por feature (nativo de Orca/opencode, con fallback git) y asigna puertos.
agent: founder
---

Acción: `$ARGUMENTS`

Interpretá:

- vacío o `new [nombre]` → crear/abrir un worktree para la feature actual.
- `list` → listar worktrees y sus puertos (`node scripts/ports.mjs --list`).
- `clean` → limpiar worktrees ya mergeados (confirmá antes de borrar).

Cargá el skill `worktrees` y seguí sus pasos (detección → nativo → git fallback → setup → baseline → puerto). Nunca crees worktrees anidados.
