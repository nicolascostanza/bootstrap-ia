---
name: discovery-loop
description: Loop de descubrimiento de clientes: entrevistas recurrentes, registro de aprendizajes y decisiones. Usalo para mantener contacto semanal con usuarios, validar hipotesis con evidencia y evitar construir a ciegas.
license: MIT
compatibility: opencode
metadata:
  bloque: B13
  default: semanal
---

# Loop de descubrimiento

## Cadencia

- **Semanal**: al menos 2-3 conversaciones con usuarios o ICP.
- **Mensual**: síntesis de aprendizajes y decisión (seguir/pivotar/ajustar).
- El contacto no se delega ni se terciariza al inicio.

## Protocolo de entrevista

1. Preguntá por **comportamiento pasado**, no opiniones ni intenciones.
2. Buscá el "momento del dolor": ¿qué hacía antes de buscar solución?
3. Preguntá cuánto le cuesta el problema (dinero, tiempo, frustración).
4. No pitchees en la entrevista de descubrimiento.
5. Cerrá con: ¿te puedo mostrar algo en las próximas semanas?

## Registro (CRM de aprendizajes)

En `docs/validation.md`, tabla:

| Fecha | Quién | Insight textual | Evidencia | Decisión |
|---|---|---|---|---|

- Una fila por conversación; citas textuales cuando sean fuertes.
- Etiquetar: `dolor`, `job`, `objecion`, `disparador`, `willingness-to-pay`.

## Reglas

- Si tres personas del ICP mencionan el mismo dolor, es señal; una sola, no.
- Separar evidencia de interpretación.
- Toda feature debe poder mapearse a un insight registrado.
- Si no hay tiempo para entrevistas, el problema no es falta de tiempo: es prioridad.
- Lo derivado a investigación lo ejecuta `@user-researcher`.

## Salida

Bitácora viva en `docs/validation.md` y ajustes en `docs/vision.md`, el índice `docs/prd.md` y las specs afectadas.
