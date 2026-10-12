---
description: "Revisa una feature desde producto (alineacion, alcance, criterios, metrica, oportunidades) y deja feedback."
---

Feature a revisar: `$ARGUMENTS`

Si `$ARGUMENTS` está vacío, revisá la feature en curso: usá `git diff main...HEAD` y `docs/prd.md`.

Cargá el skill `product-review` y producí el review en `docs/reviews/<feature>.md` con el veredicto y el top 3 de mejoras.
