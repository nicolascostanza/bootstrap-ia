---
name: finops-guardrails
description: Guardarrailes de costo de infraestructura para mantenerse en $0 el mayor tiempo posible: limites de free tiers, alertas de gasto y revision mensual. Usalo al configurar servicios cloud, al evaluar costos, o cuando haya que evitar sorpresas de facturacion.
license: MIT
compatibility: opencode
metadata:
  bloque: B13
  meta: $0 hasta validar
---

# FinOps — guardarraíles

## Meta

Infraestructura cerca de **$0** hasta validar, con alertas **antes** de tocar cualquier límite.

## Free tiers a cuidar

| Servicio | Límite free | Qué pasa al superarlo |
|---|---|---|
| Neon | 100 CU-h/mes, 1 GB storage | Compute se suspende |
| Vercel | 100 GB bandwidth/mes | Cobra o limita |
| PostHog | 1M eventos/mes | Deja de ingerir |
| Axiom | 500 GB/mes | Deja de ingerir |
| Sentry | 5k errores/mes | Se corta |
| Render | 750 h/mes; Postgres free expira a los 30 días | Cobra $7+/mes |
| Resend | 3k emails/mes (100/día) | Se corta |

## Guardarraíles

- [ ] Alertas de gasto/uso activadas en cada proveedor.
- [ ] Límite de spending configurado (Vercel, Render).
- [ ] Base de datos de **producción en Neon**, no en Render free (expira).
- [ ] Logs con sampling/rotación para no inflar GB.
- [ ] Revisión mensual de costos (15 min).
- [ ] Presupuesto por etapa: MVP $0 · primeros ingresos < $30 · tracción < $100.

## Reglas

- No activar un servicio pago sin agotar el free tier o justificación clara.
- Nunca dejar una tarjeta asociada a un recurso sin límite.
- Preferir servicios con free tier real y scale-to-zero.
- Si un límite se acerca, resolver antes de que corte (mejor degradar que romper).
- Costos de IA (si aplica): límite por usuario y por día, y monitoreo de tokens.

## Salida

Tabla de límites y alertas configuradas; revisión mensual en `docs/finops.md`.
