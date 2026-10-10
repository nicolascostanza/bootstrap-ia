---
description: "Arranca el bootstrap de una startup nueva (entrevista + config + documentacion + roadmap)."
---

Cargá y ejecutá el skill `bootstrap-startup`.

Modo solicitado: `$ARGUMENTS`
Si `$ARGUMENTS` está vacío, usá `guided`.

Reglas de interacción:

- Entrevistá **por rondas de 4-5 preguntas** (A→E), una ronda por mensaje, con la tool `question`. Nunca un cuestionario gigante.
- Cada ronda ofrece la opción "usar defaults de este bloque".
- El **directorio actual** es la startup (aunque esté vacío). Los defaults y plantillas del kit están en `~/.config/opencode/kit/`.
- Al terminar, ofrecé crear el repo **propio** de la startup (nombre + privado) con `gh repo create`; `bootstrap-ia` es solo el kit.
- Cerrá con un resumen breve y el próximo paso.
