---
name: testing-unit-jest
description: Estandares de tests unitarios e integracion del kit con Jest, React Testing Library y MSW. Usalo al escribir tests de logica, componentes o integraciones, o cuando haya que decidir como mockear, que testear y como alcanzar la cobertura objetivo.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: jest+rtl+msw
  cobertura: 90 dominio (ratchet)
---

# Testing unitario — Jest + RTL + MSW

## Default

- Jest + React Testing Library (componentes) + MSW (red).
- Cobertura objetivo: **90% en dominio/servicios** con gate de ratchet (nunca baja).
- Probar **comportamiento**, no implementación.

## Reglas

### Qué testear

- Dominio y servicios: lógica, ramas, bordes, errores. Prioridad máxima.
- Componentes: comportamiento visible para el usuario (render, interacción, estados).
- Integración: service + DB con branch de Neon del PR.

### Cómo escribir

- Estructura **Arrange-Act-Assert**.
- RTL: consultar por **rol/texto** (`getByRole`, `getByLabelText`). Prohibido por clase CSS o `data-testid` salvo último recurso.
- Interacciones con **`userEvent`**, no `fireEvent`.
- Un assert principal por test; nombre que describe comportamiento: `it("muestra error cuando el email es inválido")`.
- Sin snapshots grandes/estructurales: solo casos puntuales y justificados.

### Mocking

- Mockear **solo en los bordes de red** con MSW. Prohibido mockear módulos internos.
- DB en integración: branch de Neon efímera por PR.
- Timers/relojes deterministas (`jest.useFakeTimers` cuando aplique).

### Anti-patrones

- Tests que replican la implementación (tautológicos).
- `waitFor` innecesario o con timeouts largos.
- Dependencias entre tests; cada test es independiente.

### Cobertura

- `coverageThreshold` con ratchet: falla si baja del mínimo registrado.
- Cobertura no es objetivo en sí: mutation testing (Stryker) valida la calidad de los tests.

## Cómo afecta al scaffold

- `jest.config.ts`, `jest.setup.ts`, MSW handlers base, y tests de ejemplo por capa.

## Checklist

- [ ] Tests consultan por rol/texto.
- [ ] Mock solo de red (MSW).
- [ ] Cobertura de dominio ≥ umbral y no baja.
- [ ] Sin tests acoplados a la implementación.
