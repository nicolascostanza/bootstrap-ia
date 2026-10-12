---
name: worktrees
description: Aisla el trabajo en un git worktree por feature o sesion, usando las herramientas nativas del harness (Orca u opencode) y git como fallback, con setup del proyecto y puertos deterministas. Usalo cuando el usuario ejecute /worktree, diga "worktree", "aislar", "trabajar en paralelo", "otra rama", o antes de implementar una feature.
license: MIT
compatibility: opencode
metadata:
  bloque: refinement
  default: per-feature
---

# Worktrees

## Objetivo

Cada feature o sesión corre en su **propio worktree**: se paraleliza sin romper nada. Una feature = un worktree = una branch = un PR.

## Prioridad (nunca pelear con el harness)

1. **Detectar aislamiento**: si `GIT_DIR != GIT_COMMON` (y no es submódulo), ya estás en un worktree → no crear otro.
2. **Nativo**: dentro de Orca (hay variables `ORCA_*` en el entorno) usá `orca`; si el harness expone un tool/plugin de worktree (opencode), usalo.
3. **Fallback git**: `git worktree add .worktrees/<branch> -b <branch>`.

## Pasos

1. Detección + guard de submódulo:

```bash
git rev-parse --show-superproject-working-tree   # si responde, es submódulo → tratarlo como repo normal
GIT_DIR=$(git rev-parse --git-dir)
GIT_COMMON=$(git rev-parse --git-common-dir)
```

2. Nombre/rama: `feat/<slug>` o `fix/<slug>`.
3. Ubicación: `.worktrees/` en la raíz del repo. Verificá que esté ignorado (`git check-ignore -q .worktrees`); si no, agregalo a `.gitignore` y commiteá.
4. Crear: nativo primero, si no `git worktree add .worktrees/<branch> -b <branch>`.
5. **Setup**: `pnpm install`; copiá `.env`/`.env.local` del checkout principal (la DB es **compartida**); corré `node scripts/ports.mjs --write`.
6. **Baseline**: corré los tests; si fallan, avisá antes de seguir.
7. Reportá: path · branch · puerto · URL.

## Puertos

- Determinístico por worktree (`scripts/ports.mjs`): el mismo worktree siempre obtiene el mismo puerto, estable entre reinicios.
- Multi-servicio (futuro split front/back): `node scripts/ports.mjs --count 2 --write` deriva `base+0` web y `base+1` api.
- Cableá el `dev` script una vez: `"dev": "next dev --port ${PORT:-3000}"`.
- Cross-platform: ver el skill `dev-environment` (LF, WSL2, ARM64). En modo `devcontainer`, cada worktree abre su propio contenedor y los puertos se forwardean.

## Reglas

- Una feature = un worktree = una branch = un PR.
- La branch la crea el worktree; `/feature` usa la branch actual (no crea otra).
- **DB compartida**: no corras migraciones en dos worktrees a la vez (se pisan).
- No crees worktrees anidados.
- `main` siempre limpio y desplegable.

## Red flags

| Pensamiento | Realidad |
|---|---|
| "No estoy en un worktree, seguro" | Corré la detección; el harness crea aislamiento invisible. |
| "`git worktree` es más rápido que buscar el nativo" | Bypassear el nativo crea estado fantasma que el harness no ve. |
| "El directorio ya debe estar ignorado" | Verificá con `git check-ignore`. Un worktree no ignorado se commitea entero. |

## Salida

Worktree listo + baseline verde + puerto y URL asignados.
