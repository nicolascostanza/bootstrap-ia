---
description: Revisa una feature desde producto (alineacion, alcance, criterios, metrica, oportunidades) y deja feedback.
agent: product-reviewer
---

Feature a revisar: `$ARGUMENTS`

Si `$ARGUMENTS` está vacío, revisá la feature en curso: usá `git diff main...HEAD`, `docs/specs/<feature>.md` y el índice `docs/prd.md`.

Cargá el skill `product-review` y producí el review en `docs/reviews/<feature>.md` con el veredicto y el top 3 de mejoras.
