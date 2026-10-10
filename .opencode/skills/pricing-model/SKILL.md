---
name: pricing-model
description: Define precios, planes y unit economics del negocio (MRR, CAC, LTV, churn, margen). Usalo al elegir un modelo de precios, armar planes, calcular cuanto cobrar o evaluar la economia de la startup.
license: MIT
compatibility: opencode
metadata:
  bloque: B11
  default: subscription
---

# Pricing y unit economics

## Default

- Modelo: **suscripción** (`bootstrap.config.json` → `finance.pricing`).
- Alternativas: freemium, usage-based, one-time, mixto.
- Pagos: adapter (`finance.payments`, default MercadoPago) — cambiar de proveedor no toca la app.

## Cómo definir el precio

1. Definí el **valor** que entrega (tiempo/dinero que ahorra o genera).
2. Mirá comparables y disposición a pagar (entrevistas, no suposiciones).
3. Elegí anclaje: por usuario, por uso o por valor.
4. Armá 2-3 planes con una diferencia clara; el del medio es el objetivo.
5. Definí el plan gratis (si hay) como adquisición, nunca como producto completo.

## Unit economics

| Métrica | Fórmula | Sano (SaaS) |
|---|---|---|
| MRR | suma de suscripciones activas | creciente |
| Churn mensual | bajas / activos | < 5% |
| CAC | costo adquisición / clientes | recuperar < 12 meses |
| LTV | ARPU / churn | LTV/CAC > 3 |
| Margen bruto | (ingreso - costo variable) / ingreso | > 70% |

- Modelá escenarios base/pesimista/optimista con supuestos explícitos.
- Incluí costos de infra (ver `finops-guardrails`) y comisiones de pago.

## Reglas

- Precio bajo no compensa un mal producto; precio alto sin valor mata la conversión.
- Subir precios es normal: dejá la puerta abierta a re-pricing.
- Nunca prometer "gratis para siempre" sin modelo de negocio detrás.
- Los pagos pasan por el adapter: `lib/payments`, nunca llamadas directas dispersas.

## Salida

Modelo de pricing + tabla de unit economics en `docs/metrics.md`, con escenarios y supuestos.
