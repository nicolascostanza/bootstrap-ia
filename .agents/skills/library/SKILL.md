---
name: library
description: Crea una libreria/SDK publicable segun library.kind (build, tests, gates, publish, monetizacion).
---

Objetivo: `[argumentos del usuario]`

1. Si `project.type` no es `library`, confirmá y actualizá `bootstrap.config.json`.
2. Cargá el skill `library-scaffold` y ejecutá el procedimiento según `library.kind`.
3. Si `library.monetization` no es `oss`, cargá `library-monetization` y dejá la guía y el gate.
4. Verificá `build` + `test` + `check:package` verdes.
5. Reportá el próximo paso (publicar la 1ª versión / cablear CI / agregar el pro).
