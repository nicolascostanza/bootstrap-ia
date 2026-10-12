---
name: verification-before-completion
description: Exige evidencia reproducible antes de declarar una tarea terminada (comando ejecutado y su salida real). Usalo al cerrar una feature, un fix o cualquier cambio, antes de decir "listo" o abrir un PR.
license: MIT
compatibility: opencode
metadata:
  bloque: B4
---

# Verificación antes de dar por terminado

## Regla

No declares "listo", "terminado" o "funciona" sin **evidencia reproducible**: el comando que corriste y su salida real. "Debería funcionar" no es evidencia.

## Evidencia mínima por tipo de cambio

| Cambio | Evidencia |
|---|---|
| Código de app | `lint` + `typecheck` + `test` + `build` (salida mostrada) |
| Feature con UI | + test de componente y `@critical` E2E |
| Cambio de datos | migración aplicada en branch + rollback probado |
| Fix de bug | test de regresión que falla sin el fix y pasa con él |
| Config/CI | workflow corriendo en verde |

## Cómo reportar

- Qué se verificó, con qué comando, y el resultado.
- Qué **no** se pudo verificar y por qué.
- Riesgos residuales.

## Antipatrones

- Reportar "los tests pasan" sin mostrarlos.
- Declarar éxito porque no hubo error visible.
- Verificar solo el happy path.
- Dar por hecho un deploy sin revisar logs y health check.
