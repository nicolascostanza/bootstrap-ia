---
name: testing-e2e
description: Estandares de tests end-to-end del kit con Playwright (journeys criticos, tags @critical y @full, auth con storageState, datos aislados, estabilidad). Usalo al escribir o correr tests E2E, al definir el alcance o cuando un test E2E sea flaky.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: playwright
  alcance: broad
  cadencia: critical on-pr, full nightly
---

# Testing E2E — Playwright

## Default

- Playwright. Alcance **amplio**, con cadencia por tags:
  - `@critical`: en cada PR.
  - `@full`: nightly / pre-merge.
- Correr contra **entorno de preview**, no local.

## Reglas

### Qué cubrir

- Journeys de usuario completos: registro, login, acción central del producto, pago, onboarding.
- Cada flujo crítico tiene su test `@critical`; los secundarios van como `@full`.
- Nunca testear lo que ya cubre un test unitario/integración.

### Cómo escribir

- Page Objects / helpers en `e2e/helpers/`, tests en `e2e/`.
- Selectores por rol/texto (`getByRole`); `data-testid` solo cuando no hay otra opción.
- Auth vía `storageState` (loguin una vez, reusar) — nunca loguearse por UI en cada test.
- Sin `waitForTimeout`/`sleep`. Usar aserciones auto-waiting (`expect(locator).toBeVisible()`).
- Datos de test creados y limpiados por el propio test (idempotente).

### Aislamiento

- **Branch de Neon por PR** como DB de test.
- Un worker por DB/entorno para evitar colisiones; tests independientes entre sí.

### Estabilidad

- `retries: 1` en CI; `trace: "on-first-retry"`, `video`/screenshot on failure.
- Si un test es flaky, se arregla o se borra. Nunca se lo re-intenta en silencio.

### CI

- `@critical` en el check obligatorio del PR.
- `@full` en workflow nocturno con reporte de resultados.

## Cómo afecta al scaffold

- `playwright.config.ts`, carpeta `e2e/`, script `test:e2e:critical` y workflow nightly.

## Checklist

- [ ] Flujos críticos con `@critical`.
- [ ] Auth por `storageState`.
- [ ] Sin sleeps.
- [ ] Corre contra preview con DB efímera.
