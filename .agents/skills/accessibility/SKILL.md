---
name: accessibility
description: Estandares de accesibilidad del kit (WCAG AA): HTML semantico, teclado y foco, contraste, labels, ARIA cuando hace falta, movimiento reducido y testing con axe. Usalo al crear o revisar cualquier pantalla o componente, al definir el sistema visual, o cuando haya que cumplir criterios de accesibilidad.
license: MIT
compatibility: opencode
metadata:
  bloque: B8
  default: wcag-aa
---

# Accesibilidad — WCAG AA

## Default

- Nivel objetivo: **WCAG 2.2 AA** (`bootstrap.config.json` → `engineering.accessibility`).
- Testing automático: **axe** en tests de componentes y en CI (`testing.a11y`).
- No es un paso final: se diseña y se construye con accesibilidad desde el inicio.

## Qué cumplir

### Semántica

- Usá el elemento correcto: `button`, `a`, `nav`, `main`, `header`, `form`, `label`, `table`.
- Un solo `<h1>` por pantalla y jerarquía de headings sin saltos.
- Regiones landmark (`main`, `nav`, `aside`) y `lang` declarado.

### Teclado y foco

- Todo interactivo es alcanzable y operable con Tab, Enter, Espacio, Esc y flechas.
- Foco visible siempre: nunca `outline: none` sin reemplazo.
- Orden de foco lógico; al cerrar un modal el foco vuelve al disparador.
- Sin trampas de foco.

### Contraste y color

- Texto ≥ 4.5:1; texto grande ≥ 3:1; componentes e íconos ≥ 3:1.
- El color nunca es el único indicador: sumá ícono, texto o patrón.
- Gráficos y tablas no transmiten información solo por color.

### Formularios

- Cada campo con `label` asociada (el placeholder no es label).
- Errores: descripción asociada al campo (`aria-describedby`), no solo borde rojo.
- `type` e `inputmode` correctos; autocomplete cuando aplique.

### ARIA

- Regla de oro: **no ARIA es mejor que ARIA mal usado**. Preferí HTML semántico.
- Usá ARIA solo cuando no exista elemento nativo.
- Los estados (`aria-expanded`, `aria-selected`, etc.) siempre sincronizados.

### Movimiento y tiempo

- Respetá `prefers-reduced-motion`.
- Sin autoplay con sonido ni animaciones que parpadeen (>3 Hz).
- Timeouts ajustables cuando existan.

### Imágenes y contenido

- `alt` descriptivo para imágenes con contenido; `alt=""` para decorativas.
- Links descriptivos ("Ver precios", no "click acá").

## Testing

- Componentes: `jest-axe` → `expect(await axe(container)).toHaveNoViolations()`.
- E2E: `@axe-core/playwright` en las pantallas críticas (`@critical`).
- CI: el check de a11y es obligatorio (ver `ci-cd`).
- Manual: navegar la pantalla solo con teclado y verificar el foco.

## Cómo afecta al scaffold

- Genera `error.tsx`, `loading.tsx` y `not-found.tsx` accesibles.
- Configura `jest-axe` y el check de a11y en CI.
- `design-system`, `styling-ui` y `ui-reviewer` referencian este skill.

## Checklist

- [ ] Navegable 100% por teclado, con foco visible.
- [ ] Contraste AA en todo el texto.
- [ ] Labels y errores asociados en cada campo.
- [ ] Sin violaciones de `axe` en los tests.
- [ ] `prefers-reduced-motion` respetado.
