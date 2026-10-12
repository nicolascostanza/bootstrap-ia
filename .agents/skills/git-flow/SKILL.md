---
name: git-flow
description: Estandares de Git del kit (GitHub Flow, ramas cortas, Conventional Commits, PR template, review). Usalo al crear ramas, commitear, abrir PRs, resolver conflictos o definir el flujo de trabajo del repositorio.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: github-flow+conventional-commits
  alternativas: git-flow-clasico, trunk-based
---

# Git — convenciones

## Default y alternativas

- **Default**: GitHub Flow — ramas cortas desde `main`, PR con checks verdes, squash merge.
- Alternativas: Git Flow clásico (equipos grandes), trunk-based (feature flags).
- Configurable en `bootstrap.config.json` → `engineering.git`.

## Reglas

### Ramas

- `main` siempre desplegable.
- Formato: `<tipo>/<descripcion-corta>` — `feat/checkout`, `fix/login-google`, `chore/upgrade-deps`.
- Cortas: máximo ~2 días de vida. Si es más grande, dividir.
- Nunca commitear directo a `main`.
- Cada feature nace en su propio worktree (`/worktree`), en `.worktrees/` (gitignoreado).

### Commits (Conventional Commits)

- Formato: `tipo(alcance): descripción` en imperativo y minúscula.
- Tipos: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`.
- Ejemplo: `feat(auth): agregar login con Google`.
- Un commit = un cambio lógico. Sin commits "wip" en el PR final (se squashea).

### PRs

- Título y descripción claros: qué, por qué, cómo probar.
- Checklist del PR template: tests, cobertura, a11y, build.
- PRs chicos (< 400 líneas de diff si es posible) para revisar rápido.
- Rebase/merge de `main` antes de pedir review.
- Squash merge a `main`; borrar la rama al mergear.

### Review

- Al menos 1 aprobación (o el agente `code-reviewer` en trabajo en solitario).
- Comentarios accionables; el autor resuelve y re-pide review.
- No mergear con checks en rojo ni conflictos.

## Cómo afecta al scaffold

- `.github/pull_request_template.md` y `CONTRIBUTING.md` con estas reglas.

## Checklist

- [ ] Rama con formato correcto y corta.
- [ ] Commits convencionales.
- [ ] Sin secretos ni archivos generados.
- [ ] Checks verdes antes del merge.
