---
description: Cambia una decision del kit (ej. /configure auth clerk) y re-aplica lo necesario.
agent: founder
---

El usuario quiere configurar: `$ARGUMENTS`

Pasos:

1. Parseá `$ARGUMENTS` como `<area> <valor>`. Si falta el valor, preguntá con la tool `question`.
2. Leé `bootstrap.config.json` y localizá la clave del área.
3. Verificá que el valor sea una alternativa válida (documentada en los skills o en los comentarios del config). Si no lo es, avisá y listá las opciones.
4. Actualizá `bootstrap.config.json`.
5. Identificá qué artefactos dependen de esa decisión (docs, scaffold, código) y proponé o aplicá los cambios necesarios, sin romper lo existente.
6. Actualizá `PROJECT_STATE.md` con la decisión y el motivo.
7. Resumí en 3 líneas qué cambió y qué sigue.
