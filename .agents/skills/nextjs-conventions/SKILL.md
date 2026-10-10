---
name: nextjs-conventions
description: Estandares de Next.js con App Router del kit. Usalo cuando se cree o modifique codigo Next.js (routes, layouts, paginas, Server Actions, route handlers, metadata, cache) o cuando haya dudas de que corre en el servidor y que en el cliente.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: nextjs-app-router
---

# Next.js — convenciones

## Default y alternativas

- **Default**: Next.js App Router + TypeScript strict.
- Alternativas: Pages Router (no recomendado en proyectos nuevos).
- Configurable en `bootstrap.config.json` → `engineering.layout`.

## Reglas

### Server vs cliente

- **Server by default**: todo es Server Component salvo que necesite estado, efectos o handlers del navegador.
- `"use client"` **lo más abajo posible** del árbol. Nunca en `layout.tsx` o páginas enteras si solo un hijo lo necesita.
- **Cero** código de servidor (DB, secretos, adapters) importado en un client component.

### Estructura de `app/`

```
app/
  (marketing)/      # rutas publicas
  (app)/            # rutas autenticadas
  api/              # route handlers (webhooks, APIs externas)
  layout.tsx
  loading.tsx
  error.tsx
  not-found.tsx
```

### Data fetching y mutaciones

- Datos iniciales en **Server Components**; nunca en `useEffect`.
- Mutaciones con **Server Actions** (`actions.ts`) validadas con Zod.
- Cache explícito: `revalidate` / `revalidatePath` / `revalidateTag` donde aplique; no confíes en defaults implícitos.

### Metadata y SEO

- Exportá `metadata` o `generateMetadata` por ruta.
- Rutas públicas: `opengraph-image`, `sitemap.ts`, `robots.ts`.

### Estados

- `loading.tsx` con skeletons, `error.tsx` por segmento, `not-found.tsx`. Nunca dejar una ruta sin loading/error.

### Variables de entorno

- Servidor: `process.env.X` sin prefijo, validado con Zod en `lib/env.ts`.
- Cliente: solo `NEXT_PUBLIC_*`, jamás secretos.

## Cómo afecta al scaffold

- Genera `app/` con route groups, `lib/env.ts`, `error.tsx`, `loading.tsx`, `not-found.tsx`.
- `next.config.ts` con las reglas del kit.

## Checklist

- [ ] Sin `"use client"` innecesario.
- [ ] Cero imports de servidor en cliente.
- [ ] Metadata en rutas públicas.
- [ ] `build` sin warnings.
