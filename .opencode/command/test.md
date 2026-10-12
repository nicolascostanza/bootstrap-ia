---
description: Escribe o ejecuta tests para una feature o modulo (Jest, RTL, Playwright).
agent: qa-tester
---

Objetivo de testing: `$ARGUMENTS`

Cargá `testing-unit-jest` y `testing-e2e`, y:

1. Identificá los criterios de aceptación aplicables en la spec (`docs/specs/<feature>.md`).
2. Escribí los tests en el nivel correcto:
   - Unit (Jest) para dominio/servicios.
   - Component (RTL) para UI, consultando por rol/texto y con `userEvent`.
   - E2E (Playwright) para journeys, con tag `@critical` o `@full`.
3. Ejecutá la suite y la cobertura.
4. Reportá: criterios cubiertos, cobertura actual vs umbral (ratchet), fallos y huecos.

No modifiques el código de producción para hacer pasar un test: si el test revela un bug, reportalo.
