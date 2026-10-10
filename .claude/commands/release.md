---
description: "Prepara y ejecuta un release (version, changelog, tag, deploy, verificacion)."
---

Release: `$ARGUMENTS`

Cargá `ci-cd` y `git-flow`, y ejecutá:

1. Verificá que `main` está verde (todos los checks) y sin pendientes.
2. Definí la versión (SemVer) y actualizá `CHANGELOG.md` desde los commits convencionales.
3. Corré migraciones pendientes en el orden correcto y confirmá rollback documentado.
4. Deploy a producción; verificá `/api/health` y los monitores de uptime.
5. Tag `vX.Y.Z` y push.
6. Verificá errores post-deploy (Sentry) y logs (Axiom) durante la ventana inicial.
7. Actualizá `PROJECT_STATE.md`.

Antes de cualquier paso destructivo (rollback de DB, borrado de recursos), pedí confirmación.
