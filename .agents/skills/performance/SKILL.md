---
name: performance
description: Estandares de performance web del kit (Core Web Vitals, presupuesto, imagenes, bundle, cache, queries N+1). Usalo al optimizar carga, cuando la app se sienta lenta, o al definir presupuestos de rendimiento.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: core-web-vitals
---

# Performance — convenciones

## Objetivos (Core Web Vitals)

| Métrica | Objetivo |
|---|---|
| LCP | < 2.5 s |
| INP | < 200 ms |
| CLS | < 0.1 |
| Bundle inicial | < 200 KB gzip |
| TTFB | < 500 ms |

Presupuesto en CI: fallar el PR si se supera el umbral de bundle.

## Reglas

### Carga

- Server Components por defecto: menos JS al cliente.
- `next/image` para toda imagen (sizes, lazy, formatos modernos).
- `next/font` con subset y `display: swap`.
- Lazy loading de componentes pesados (`dynamic(() => ...)`), y de terceros (mapas, editores, charts).
- Evitar dependencias grandes; revisar el peso antes de instalar.

### Render

- Skeletons/streaming con Suspense en lugar de bloquear la página.
- Evitar layout shifts: reservar espacio para imágenes/embeds.
- Memoizar solo cuando haya un problema medido, no por defecto.

### Datos

- Evitar N+1: usar joins o batch en las queries.
- Cachear lecturas costosas (`revalidate`) y datos estáticos.
- Índices para las queries de las rutas calientes.
- Paginación siempre.

### Medición

- Lighthouse en CI para rutas clave.
- Monitorear Web Vitals reales (PostHog o el proveedor elegido).
- Perfil antes de optimizar: medir, no adivinar.

## Cómo afecta al scaffold

- Config de `next/image`, `next/font`, budget de bundle en CI y un test de performance para la landing.

## Checklist

- [ ] LCP/INP/CLS dentro del objetivo.
- [ ] Bundle inicial dentro del presupuesto.
- [ ] Imágenes y fuentes optimizadas.
- [ ] Sin N+1 en rutas calientes.
