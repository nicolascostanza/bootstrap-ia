---
name: landing-page
description: Estructura, copy y construccion de una landing page de conversion con el stack del kit (Next.js, Tailwind, shadcn, SEO, analytics). Usalo cuando haya que crear la pagina publica de la startup, mejorar la conversion o definir las secciones y el mensaje de una landing.
license: MIT
compatibility: opencode
metadata:
  bloque: B9
  objetivo: conversion
---

# Landing page

## Objetivo

Que el visitante entienda qué es, para quién y qué hacer a continuación — en **5 segundos**.

## Estructura (orden)

1. **Hero**: titular con resultado, subtítulo con para quién, CTA primario, prueba visual.
2. **Problema → solución**: el dolor actual y cómo se resuelve.
3. **Cómo funciona**: 3 pasos simples.
4. **Beneficios**: 3-4, orientados a resultado (no features).
5. **Prueba social**: testimonios/logos/números (o `[PENDIENTE]`).
6. **Precio**: planes claros o "empezá gratis".
7. **FAQ**: objeciones frecuentes.
8. **CTA final**: repetir la acción.

## Reglas

- Un solo CTA principal, repetido. Nada de competir con "contactanos" y "suscribite".
- Titular = resultado del cliente, no nombre de la empresa.
- Velocidad: LCP < 2.5s (ver skill `performance`); imágenes optimizadas con `next/image`.
- SEO básico: `metadata`, `sitemap.ts`, `robots.ts`, OG image.
- Accesibilidad AA (ver `design-system`).
- Analytics: instrumentar visita y conversión del CTA (PostHog).
- Copy: delegar a `@copywriter`; posicionamiento a `@growth-strategist`.
- No inventar testimonios ni métricas.

## Cómo afecta al scaffold

- Genera la ruta `(marketing)/page.tsx` con las secciones y componentes base.
- Incluye `metadata`, `sitemap` y el evento de conversión.

## Checklist

- [ ] Propuesta clara en el hero.
- [ ] Un CTA principal repetido.
- [ ] SEO + OG configurados.
- [ ] LCP dentro del objetivo.
- [ ] Evento de conversión instrumentado.
