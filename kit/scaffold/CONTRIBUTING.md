# Contribuir

## Flujo (GitHub Flow)

- `main` siempre desplegable. **Nunca** se commitea directo a `main`.
- Cada feature nace en su propio worktree: `/worktree` → una feature = un worktree = una branch = un PR.
- Rama: `<tipo>/<descripcion-corta>` (`feat/`, `fix/`, `chore/`). Corta (≤ ~2 días).

## Commits (Conventional Commits)

- Formato: `tipo(alcance): descripción` en imperativo y minúscula.
- Tipos: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`.
- Un commit = un cambio lógico. Sin "wip" en el PR final.

## PRs

- Creá el PR: `gh pr create --base main --fill` (usa `pull_request_template.md`).
- Título y descripción claros: qué, por qué, cómo probar.
- PRs chicos (< 400 líneas de diff). Rebasá `main` antes de pedir review.
- Checks obligatorios verdes (lint, typecheck, test + cobertura, build, e2e `@critical`, a11y).
- Al menos 1 aprobación (o el agente `code-reviewer` en solitario).
- **Squash merge** a `main`; borrar la rama al mergear.

## Release

- `package.json.version` es la fuente de verdad (SemVer).
- `CHANGELOG.md` se arma desde los commits convencionales (`/release`).
- Tag `vX.Y.Z` en `main`.

## Ramas protegidas

- `main` protegida: sin push directo, checks requeridos, 1 review (ver `git-flow` para el `gh api`).

## Definition of Done

- Tests verdes + cobertura (ratchet) + a11y sin errores + build limpio + evidencia mostrada.
