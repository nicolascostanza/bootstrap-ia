---
description: Crea el proyecto base (Next.js + Postgres + auth + testing) con CLIs reales y verificacion.
agent: founder
---

Scaffold solicitado: `$ARGUMENTS`

1. Leé `bootstrap.config.json` y `docs/` para conocer las decisiones y el alcance del MVP.
2. Cargá el skill `nextjs-postgres-scaffold` y ejecutá sus pasos en orden.
3. Delegá a `@architect` cualquier decisión estructural pendiente y a `@devops` la parte de CI/deploy.
4. Verificá cada paso: no avances sin `build`/tests verdes.
5. Generá los artefactos multi-tool: `node ~/.config/opencode/kit/sync/sync.mjs --target .` (o `node <ruta-del-kit>/kit/sync/sync.mjs --target .` si tenés el kit clonado).
6. Al terminar: deploy de preview y actualización de `PROJECT_STATE.md` + `docs/roadmap.md`.

Operaciones destructivas: siempre pedí confirmación antes.
