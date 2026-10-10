---
name: styling-ui
description: Estandares de UI del kit con Tailwind CSS y shadcn/ui (tokens, dark mode, estados de loading/empty/error, accesibilidad). Usalo al crear componentes, pantallas, estilos, o cuando haya que decidir el sistema visual o swappear el enfoque de styling.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: tailwind+shadcn
  alternativas: tailwind-solo, css-modules, mui
---

# Styling y UI — convenciones

## Default y alternativas

- **Default**: Tailwind CSS + shadcn/ui (componentes copiables, no dependencia cerrada).
- Alternativas: Tailwind solo, CSS Modules, MUI.
- Configurable en `bootstrap.config.json` → `engineering.styling`. El bootstrap debe preguntar y adaptar el scaffold.

## Reglas

### Tokens

- Colores, radios y tipografía como **tokens** (CSS variables en `globals.css`).
- **Prohibido** hardcodear colores (`#fff`, `text-red-500` suelto). Usá tokens semánticos (`bg-background`, `text-muted-foreground`).
- Dark mode con clase (`.dark`) y tokens, no variantes manuales por componente.

### Componentes

- Base en `components/ui/` (shadcn). No modificar los generados salvo necesidad; envolver en `components/`.
- Un componente de dominio no importa otro de dominio distinto: subí a `components/ui/` si es compartido.

### Estados obligatorios

Toda vista con datos define:

| Estado | Implementación |
|---|---|
| Loading | Skeleton del layout real, no spinner genérico |
| Empty | Mensaje claro + CTA |
| Error | Mensaje accionable + reintento |
| Success | Confirmación / toast |
| Offline | Aviso + reintento |

### Accesibilidad

- Foco visible, contraste AA, labels en inputs, roles correctos, navegación por teclado.
- Verificar con `axe` en tests de componentes.
- Detalle y checklist: skill `accessibility`.

### Espaciado y layout

- Escala de espaciado consistente (múltiplos del sistema, ej. `gap-4`).
- Evitá `absolute` para layout; usá flex/grid.

## Cómo afecta al scaffold

- Inicializa Tailwind + shadcn con los tokens del kit.
- Genera `error.tsx`, `loading.tsx`, `not-found.tsx` y un `EmptyState`.

## Checklist

- [ ] Sin colores hardcodeados.
- [ ] Dark mode funcionando.
- [ ] Los 5 estados definidos.
- [ ] `axe` sin violaciones en componentes base.
