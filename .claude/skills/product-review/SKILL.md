---
name: product-review
description: Revisa una feature ya implementada desde producto (no codigo ni UI): alineacion con la hipotesis, job-to-be-done, alcance, criterios de aceptacion, metrica/activacion, bordes de negocio y oportunidades de mejora, con un veredicto. Usalo cuando el usuario ejecute /product-review, diga "revisa esta feature", "esta bien esto de producto", "feedback de producto", o al cerrar una feature.
license: MIT
compatibility: opencode
metadata:
  bloque: refinement
---

# Product review

Revisa que una feature sea la **correcta de producto**, no solo que esté bien hecha.

## Cuándo usar

- Al cerrar una feature (sugerido al final de `/feature`).
- Cuando pidan feedback de producto sobre algo ya hecho.
- **No** es code review (eso es `code-reviewer`) ni UI review (eso es `ui-reviewer`).

## Checklist

1. **Alineación**: ¿sirve a la hipótesis/visión (`docs/vision.md`) y al ICP? ¿Es scope creep?
2. **Job-to-be-done**: ¿resuelve un job real? ¿el resultado es observable por el usuario?
3. **Alcance**: ¿demasiado grande o chico? ¿se puede cortar a la mitad y seguir valiendo?
4. **Criterios de aceptación**: ¿existen en `docs/prd.md` y son testeables?
5. **Métrica/activación**: ¿el evento está instrumentado (ver `metrics-activation`)? ¿mueve la métrica norte o un peldaño del funnel?
6. **Estados de producto**: primer valor, camino de error de negocio, bordes.
7. **Bordes de negocio**: legal/privacidad (`legal-docs`), costo (`finops-guardrails`), carga de soporte.
8. **Oportunidades**: qué daría más impacto con menos esfuerzo (RICE).

## Formato de salida

Por hallazgo: **severidad** (`bloqueante`/`importante`/`menor`), **tema**, **observación**, **sugerencia concreta**.

Veredicto: `lista` / `ajustar alcance` / `faltan criterios o métrica` / `posponer`.

Cerrá con los 3 cambios de mayor impacto.

## Reglas

- No revisás código ni UI: eso lo hacen `code-reviewer` y `ui-reviewer`.
- Cero datos inventados: lo que falte va como `[VERIFICAR]`.
- Si la feature no mueve la métrica norte ni un peldaño del funnel, cuestioná su prioridad.
- No reescribís el PRD: dejás recomendaciones.
- Salida en `docs/reviews/<feature>.md` (creá la carpeta si no existe).
