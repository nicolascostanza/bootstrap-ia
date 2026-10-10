---
name: metrics-activation
description: Define la metrica norte, el "aha moment" y el funnel de activacion instrumentado con PostHog. Usalo al definir que medir, instrumentar eventos, evaluar activacion o entender donde se pierden los usuarios.
license: MIT
compatibility: opencode
metadata:
  bloque: B13
  default: posthog
---

# Métricas y activación

## La métrica norte

Una sola métrica que representa el valor entregado (no vanity metrics como signups o visitas).

## El "aha moment"

- Definí el **evento concreto** que indica que el usuario recibió valor.
- Definí el tiempo objetivo hasta ese evento (minutos/horas/días).
- Definí el % de activación objetivo.

Ejemplos: "creó su primer proyecto y lo compartió", "envió su primera campaña", "registró su primera venta".

## Funnel mínimo

| Etapa | Evento | Meta |
|---|---|---|
| Visita | `page_view` | — |
| Signup | `signup_completed` | — |
| Activación | `activation_event` | % definido |
| Pago | `subscription_started` | % definido |

## Instrumentación (PostHog)

- Nombres de eventos en `snake_case` y estables (renombrar rompe series).
- Propiedades mínimas: `userId`, `plan`, `source`, contexto del flujo.
- **Nunca** enviar PII ni datos sensibles a analytics.
- Instrumentar el evento de activación **antes** de lanzar la feature.
- Un evento por acción significativa; no instrumentar clicks triviales.

## Reglas

- Si una feature no mueve la métrica norte ni un peldaño del funnel, cuestioná su prioridad.
- Revisar el funnel semanalmente en el arranque.
- Definir umbrales de alerta (caída de activación, error de pago).
- Medir antes de opinar: nada de decisiones de producto sin dato.

## Salida

`docs/metrics.md` completo + lista de eventos con su definición.
