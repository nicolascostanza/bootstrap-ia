# Contribuir

## Flujo (Git Flow)

- **`main`**: producción. Solo recibe **releases** y **hotfixes**. Siempre desplegable.
- **`develop`**: integración. Recibe features y fixes. Base de trabajo.
- **`feat/*`, `fix/*`**: nacen de **`develop`** y vuelven a **`develop`** por PR.
- **`release/X.Y.Z`**: nace de **`develop`** → PR a **`main`** → back-merge a **`develop`**.
- **`hotfix/<slug>`**: nace de **`main`** → PR a **`main`** → back-merge a **`develop`**.
- Cada feature en su worktree (`/worktree`): una feature = un worktree = una branch = un PR.
- Nunca commitees directo a `main` ni a `develop`.

## Commits (Conventional Commits)

- Formato: `tipo(alcance): descripción` en imperativo y minúscula.
- Tipos: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`.

## PRs

- Base: **`develop`** (features/fixes) o **`main`** (release/hotfix).
- Creá el PR: `gh pr create --base develop --fill` (usa `pull_request_template.md`).
- PRs chicos (< 400 líneas). Rebasá la base antes de pedir review.
- Checks verdes (lint, typecheck, test + cobertura, build, e2e `@critical`, a11y).
- 1 aprobación (o el agente `code-reviewer` en solitario).
- **Squash merge**; borrar la rama. Tras release a `main`, **back-merge** a `develop`.

## Release

- `package.json.version` es la fuente de verdad (SemVer).
- `CHANGELOG.md` desde los commits convencionales (`/release`).
- Tag `vX.Y.Z` en `main`.

## Ramas protegidas

- `main` y `develop`: sin push directo, PR + 1 review, sin force-push (ver `git-flow`).

## Definition of Done

- Tests verdes + cobertura (ratchet) + a11y sin errores + build limpio + evidencia mostrada.
