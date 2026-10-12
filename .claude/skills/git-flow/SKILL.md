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
- La branch la crea el worktree (o la creás al empezar). Si ya estás en una branch, **usala**; no crees otra.

### Commits (Conventional Commits)

- Formato: `tipo(alcance): descripción` en imperativo y minúscula.
- Tipos: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`.
- Ejemplo: `feat(auth): agregar login con Google`.
- Un commit = un cambio lógico. Sin commits "wip" en el PR final (se squashea).

### PRs

- Creá el PR: `gh pr create --base main --fill` (usa `pull_request_template.md`).
- Título y descripción claros: qué, por qué, cómo probar.
- Checklist del PR template: tests, cobertura, a11y, build.
- PRs chicos (< 400 líneas de diff si es posible) para revisar rápido.
- Rebase/merge de `main` antes de pedir review.
- Squash merge a `main`; borrar la rama al mergear.

### Review

- Al menos 1 aprobación (o el agente `code-reviewer` en trabajo en solitario).
- Comentarios accionables; el autor resuelve y re-pide review.
- No mergear con checks en rojo ni conflictos.

### Ramas protegidas

Configurá `main` una vez (sin push directo, checks requeridos, 1 review):

```bash
gh api -X PUT repos/OWNER/REPO/branches/main/protection --input protection.json
```

`protection.json`:

```json
{
  "required_status_checks": { "strict": true, "contexts": ["ci"] },
  "enforce_admins": false,
  "required_pull_request_reviews": { "required_approving_review_count": 1 },
  "restrictions": null
}
```

### Release y versionado

- `package.json.version` es la fuente de verdad (SemVer).
- `CHANGELOG.md` se arma desde los commits convencionales; tag `vX.Y.Z` en `main`.

## Cómo afecta al scaffold

- Copia `kit/scaffold/.github/` (`pull_request_template.md`, `workflows/ci.yml`, `workflows/e2e-nightly.yml`) y `kit/scaffold/CONTRIBUTING.md`.

## Checklist

- [ ] Rama con formato correcto y corta.
- [ ] Commits convencionales.
- [ ] Sin secretos ni archivos generados.
- [ ] Checks verdes antes del merge.
