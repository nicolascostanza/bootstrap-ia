---
description: "Revisa cambios en paralelo por capa (codigo, UI, producto, seguridad) y consolida el veredicto."
---

Alcance: `$ARGUMENTS`

Si está vacío, revisá los cambios sin commitear y el diff contra `main` (`git diff main...HEAD`, `git status`).

Cargá el skill `parallel-work` y lanzá en paralelo (máx `engineering.parallelism`, default 3):

- `code-reviewer` (siempre)
- `ui-reviewer` (si cambió UI)
- `product-reviewer` (si es una feature)
- `security-auditor` (si toca auth, pagos, datos o endpoints)

Consolidá en un **veredicto único**: bloqueantes primero, top-3 por severidad y próximos pasos. No pegues los reportes crudos.
