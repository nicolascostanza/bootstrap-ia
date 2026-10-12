---
name: release
description: Prepara y ejecuta un release (release/* desde develop, PR a main, tag, deploy, back-merge).
---

Release: `[argumentos del usuario]`

Cargá `ci-cd` y `git-flow`, y ejecutá:

1. Verificá que `develop` está verde (todos los checks) y sin pendientes.
2. Creá `release/<X.Y.Z>` desde `develop`; subí `version` en `package.json` (SemVer) y actualizá `CHANGELOG.md` desde los commits convencionales.
3. PR de `release/<X.Y.Z>` → `main` (`gh pr create --base main`), con checks verdes.
4. Corré migraciones pendientes en el orden correcto y confirmá rollback documentado.
5. Merge a `main` → tag `vX.Y.Z` → push.
6. **Back-merge** de `main` a `develop`.
7. Verificá `/api/health`, errores (Sentry) y logs (Axiom) en la ventana inicial.
8. Actualizá `PROJECT_STATE.md`.

Antes de cualquier paso destructivo (rollback de DB, borrado de recursos), pedí confirmación.
