---
description: Crea una libreria/SDK publicable segun library.kind (build, tests, gates, publish, monetizacion).
agent: founder
---

Objetivo: `$ARGUMENTS`

1. Si `project.type` no es `library`, confirmá y actualizá `bootstrap.config.json`.
2. Determiná el layout: `util`/`ui`/`framework` → `library.layout = "single"`; `core+adapters`/`sdk` → `"monorepo"`.
3. Cargá el skill `library-scaffold` y ejecutá el procedimiento según `library.kind`/`library.layout` (paquete único o monorepo `packages/`).
4. Si `library.monetization` no es `oss`, cargá `library-monetization` y dejá la guía y el gate.
5. Verificá `build` + `test` + `check:package` verdes.
6. Reportá el próximo paso (publicar la 1ª versión / cablear CI / agregar el pro).
