---
name: gtm-launch
description: Plan de go-to-market y lanzamiento del kit (posicionamiento, canales, mensajes, hitos y metricas). Usalo al preparar el lanzamiento de un producto o feature, definir canales de adquisicion o armar el plan de los primeros usuarios.
license: MIT
compatibility: opencode
metadata:
  bloque: B9
  default: contenido+seo+comunidades
---

# Go-to-market y lanzamiento

## Default

- Canales por defecto (`bootstrap.config.json` → `marketing.channels`): **contenido + SEO + comunidades**.
- Posicionamiento: framework de April Dunford.
- Bootstrapped: sin presupuesto de ads al inicio.

## Posicionamiento (5 pasos)

1. Alternativas competitivas (incluye "no hacer nada").
2. Atributos únicos.
3. Valor para el cliente.
4. Mejor segmento (para quién el valor es máximo).
5. Categoría de mercado.

## Canales (elegir 2-3)

| Canal | Cuándo sirve | Métrica |
|---|---|---|
| Contenido/SEO | Problema buscado activamente | Visitas → signups |
| Comunidades | Audiencia ya reunida | Respuestas → signups |
| Product-led | Producto compartible | Invitaciones → activación |
| Outreach directo | B2B, pocos clientes | Respuestas → demos |
| Paid ads | Solo con validación y CAC medido | CAC vs LTV |

## Plan de lanzamiento

1. Definí el evento de conversión y el "aha moment" (ver `metrics-activation`).
2. Elegí canales y armá el calendario de las 3 primeras semanas.
3. Prepará assets: landing, emails, 3-5 posts.
4. Definí métricas y umbrales por canal.
5. Lanzá, medí y cortá lo que no tracciona en un ciclo.

## Reglas

- Un canal a la vez; no lanzar 5 canales con presupuesto cero.
- Todo canal tiene métrica y fecha de revisión.
- El lanzamiento es un proceso, no un día.
- Nunca comprar audiencias ni usar spam.

## Salida

`docs/gtm.md` completo con posicionamiento, canales, mensajes, calendario y métricas.
