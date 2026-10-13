---
name: mobile-scaffold
description: Crea y arma una app mobile segun mobile.framework (Expo por defecto; nativo Kotlin+Swift o Kotlin Multiplatform como opciones), con distribucion EAS, OTA, testing y tipos compartidos con la web. Usalo cuando project.type incluya mobile, al ejecutar /mobile, o al crear/armar una app iOS/Android.
license: MIT
compatibility: opencode
metadata:
  bloque: mobile-track
  default: expo
  distribution: eas
---

# App mobile — scaffold

## Cuándo y qué opción

`project.type` incluye `mobile` (solo, o junto a `web-app` en monorepo). Elegís por `mobile.framework`:

- **`expo` (default)** → React Native + Expo. Un código para iOS + Android, TS, OTA con EAS Updates, escape a nativo con `expo prebuild`. Procedimiento en `references/expo.md`.
- **`native`** → apps separadas **Kotlin (Compose)** + **Swift (SwiftUI)**. Guía + CLIs oficiales en `references/native.md`.
- **`kmp`** → **Kotlin Multiplatform** (lógica compartida) + UI nativa. `references/kmp.md`.

Regla: **Expo por defecto**. Nativo/KMP solo si hay una razón concreta de plataforma (gráficos/AR/3D, cámara/audio avanzada, watchOS, APIs nuevas day-one, o equipo nativo y dolor de lógica duplicada).

## Defaults (`bootstrap.config.json` → `mobile.*`)

`framework: expo` · `targets: [ios, android]` · `router: expo-router` · `updates: eas-updates` ·
`distribution: eas` · `testing: jest-expo+rntl+maestro` · `push: expo-notifications` ·
`analytics: posthog` · `errors: sentry` · `payments: stores` · `nativeEscape: expo-prebuild` ·
`shared: monorepo`.

## Procedimiento (Expo) — resumen

1. **CLI real**: `pnpm create expo-app@latest . --template default` (Expo Router + TS). Verificá arranque.
2. **Router**: `mobile.router: expo-router` → `app/` (`_layout.tsx`, `index.tsx`).
3. **Base del kit**: copiá `kit/scaffold/mobile/` (global: `~/.config/opencode/kit/scaffold/mobile/`) — `app.json`, `eas.json`, `tsconfig.json`, `jest.config.js`, `.env.example`, `.easignore`, `lib/env.ts`.
4. **EAS**: `eas init`; canales dev/preview/production; **EAS Updates** para OTA (`updates: eas-updates`).
5. **Testing**: `jest-expo` + RNTL (unit) y **Maestro** (E2E). Ver `references/testing.md`.
6. **Servicios**: PostHog (`posthog-react-native`), Sentry (`@sentry/react-native`), push (`expo-notifications`).
7. **Shared** (si `mobile.shared = monorepo`): `apps/web` + `apps/mobile` + `packages/shared`. Ver `references/shared.md`.
8. **Verificá**: `pnpm typecheck && pnpm test` (y `maestro test`).

Detalle completo y comandos en `references/expo.md`.

## Distribución y cobro

- Publicar: `references/distribution.md` (EAS Build/Submit/Update; TestFlight/Play; **límites OTA**).
- Cobrar: `references/monetization.md` (stores IAP/RevenueCat/fees).

## Reglas

- **CLIs reales**, nunca boilerplate a mano; verificá cada paso.
- Env de cliente con prefijo **`EXPO_PUBLIC_`** (equivalente a `NEXT_PUBLIC_`); nada de secretos en el bundle.
- **OTA ≠ magia**: solo JS/estilos/assets; cambios nativos, permisos o bump de SDK necesitan build + review.
- a11y y `prefers-reduced-motion`/`reduce motion` también en mobile (ver skill `accessibility`).
- Un feature = una branch = un PR (skill `git-flow`).

## Salida

App que corre (`expo start`), con EAS configurado, tests verdes y camino de publicación claro.
