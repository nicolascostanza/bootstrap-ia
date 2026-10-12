---
name: git-flow
description: Estandares de Git del kit con Git Flow (develop como integracion, release/* hacia main, hotfix desde main), ramas cortas, Conventional Commits, PR template y review. Usalo al crear ramas, commitear, abrir PRs, preparar releases, resolver hotfixes o definir el flujo del repositorio.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: git-flow+conventional-commits
  alternativas: github-flow, trunk-based
---

# Git — convenciones (Git Flow)

## Default y alternativas

- **Default**: Git Flow — `develop` integra, `release/*` va a `main`, `hotfix/*` sale de `main`.
- Alternativas: GitHub Flow (ramas cortas directo a main), trunk-based (feature flags).
- Configurable en `bootstrap.config.json` → `engineering.git`.

## Ramas

- **`main`**: producción. Solo recibe **releases** y **hotfixes**. Siempre desplegable.
- **`develop`**: integración. Recibe features y fixes. Es la base de trabajo.
- **`feat/<slug>`** y **`fix/<slug>`**: nacen de **`develop`** y vuelven a **`develop`** (PR).
- **`release/<X.Y.Z>`**: nace de **`develop`** → PR a **`main`** → back-merge a **`develop`**.
- **`hotfix/<slug>`**: nace de **`main`** → PR a **`main`** → back-merge a **`develop`**.
- Cortas (≤ ~2 días). Nunca commitear directo a `main` ni a `develop`.
- Cada feature nace en su worktree (`/worktree`), que crea la branch desde `develop`.

## Commits (Conventional Commits)

- Formato: `tipo(alcance): descripción` en imperativo y minúscula.
- Tipos: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`.
- Un commit = un cambio lógico. Sin "wip" en el PR final.

## PRs

- Creá el PR con la **base correcta**: `gh pr create --base develop` (features/fixes) o `--base main` (release/hotfix).
- Título y descripción claros: qué, por qué, cómo probar.
- PRs chicos (< 400 líneas de diff). Rebase de la base antes de pedir review.
- Checks verdes (lint, typecheck, test + cobertura, build, e2e `@critical`, a11y).
- **Squash merge**; borrar la rama al mergear.
- Tras mergear una `release/*` a `main`: **back-merge** a `develop`.

## Review

- Al menos 1 aprobación (o el agente `code-reviewer` en trabajo en solitario).
- Comentarios accionables; el autor resuelve y re-pide review.
- No mergear con checks en rojo ni conflictos.

## Ramas protegidas

Protegé `main` y `develop` (sin push directo, PR + 1 review, sin force-push):

```bash
gh api -X PUT repos/OWNER/REPO/branches/main/protection --input protection.json
gh api -X PUT repos/OWNER/REPO/branches/develop/protection --input protection.json
```

`protection.json`:

```json
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": { "required_approving_review_count": 1 },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
```

Con `enforce_admins: false`, el dueño (admin) puede mergear en solitario sin quedar bloqueado. Cuando haya CI, agregá `required_status_checks` con el nombre del check.

## Release y versionado

- `package.json.version` es la fuente de verdad (SemVer).
- `CHANGELOG.md` se arma desde los commits convencionales; tag `vX.Y.Z` en `main`.
- Flujo: `release/X.Y.Z` desde `develop` → PR a `main` → tag → back-merge a `develop`.

## Cómo afecta al scaffold

- Copia `kit/scaffold/.github/` (`pull_request_template.md`, `workflows/ci.yml`, `workflows/e2e-nightly.yml`) y `kit/scaffold/CONTRIBUTING.md`.
- Crea la branch `develop` además de `main`.

## Checklist

- [ ] Rama con formato correcto y basada en `develop` (o `main` para hotfix).
- [ ] Commits convencionales.
- [ ] Sin secretos ni archivos generados.
- [ ] Checks verdes y PR a la base correcta.
