# FinOps — [PENDIENTE: nombre]

## Goal

Mantener la infraestructura en **$0 mientras sea posible**, con alertas antes de tocar cualquier tope.

## Free tiers y sus límites

| Servicio | Límite free | Qué pasa al superarlo | Alerta |
|---|---|---|---|
| Neon | 100 CU-h/mes, 1 GB storage | Compute se suspende | [PENDIENTE] |
| PostHog | 1M eventos/mes | Deja de ingerir | [PENDIENTE] |
| Axiom | 500 GB/mes | Deja de ingerir | [PENDIENTE] |
| Sentry | 5k errores/mes | Se corta | [PENDIENTE] |
| Vercel | 100 GB bandwidth | Cobra / limita | [PENDIENTE] |
| Render | 750 h/mes | Cobra $7+/mes | [PENDIENTE] |

## Presupuesto objetivo

| Etapa | Presupuesto mensual |
|---|---|
| MVP / validación | $0 |
| Primeros usuarios pagos | < $30 |
| Tracción | < $100 |

## Guardarraíles

- [ ] Alertas de gasto configuradas en cada proveedor.
- [ ] Límite de spending en Vercel y Render.
- [ ] Revisión mensual de costos.
