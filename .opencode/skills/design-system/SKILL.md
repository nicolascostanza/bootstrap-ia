---
name: design-system
description: Define y aplica el sistema visual minimo del kit (tokens, componentes base, estados obligatorios, accesibilidad). Usalo al crear una pantalla o componente, al definir el look and feel, o cuando haya que decidir como se ven los estados de carga, vacio y error.
license: MIT
compatibility: opencode
metadata:
  bloque: B8
  default: tailwind+shadcn
---

# Design system mínimo

## Filosofía

Un fundamento **mínimo y consistente**, no un DS completo. El mayor ROI está en los **estados** y en los tokens.

## Tokens

- Color, espaciado, radio y tipografía como CSS variables en `globals.css`.
- Tokens **semánticos** (`background`, `foreground`, `muted`, `primary`, `destructive`), no de paleta.
- Dark mode por clase `.dark`, nunca duplicando componentes.

## Componentes base

- `components/ui/` (shadcn): Button, Input, Card, Dialog, Toast, Skeleton, Badge.
- Componentes de dominio en `features/<dominio>/components/`, compuestos sobre los base.
- Nada de variantes ad-hoc: si hace falta una variante, se define en el componente base.

## Estados obligatorios

| Estado | Patrón |
|---|---|
| Loading | Skeleton con la forma del contenido real |
| Empty | Ilustración/mensaje + CTA de siguiente paso |
| Error | Mensaje claro + acción de reintento |
| Success | Toast/confirmación breve y no invasiva |
| Offline | Aviso persistente + reintento automático |

## Accesibilidad (AA)

- Foco visible en todo interactivo; navegación completa por teclado.
- Contraste mínimo 4.5:1 en texto.
- Labels en inputs; errores asociados al campo.
- Verificar con `axe` en los tests de componentes.

## Cómo afecta al scaffold

- Inicializa Tailwind + shadcn con tokens del kit.
- Genera `error.tsx`, `loading.tsx`, `not-found.tsx` y `EmptyState`.
- `docs/design-brief.md` documenta el resultado.

## Checklist

- [ ] Sin colores hardcodeados.
- [ ] Dark mode funcionando.
- [ ] Los 5 estados definidos en cada vista con datos.
- [ ] `axe` sin violaciones.
