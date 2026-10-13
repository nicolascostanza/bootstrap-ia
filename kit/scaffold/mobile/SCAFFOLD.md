# Scaffold mobile — Expo (default)

Para `mobile.framework = "expo"` (`project.type` incluye `mobile`). Copiá esta carpeta a la raíz
de la app Expo y ajustá.

| Archivo | Para qué |
|---|---|
| `app.json` | Config Expo: `name`, `slug`, `scheme`, ids iOS/Android, `expo-router`, `newArchEnabled` |
| `eas.json` | Perfiles de build (dev/preview/production) + canales OTA |
| `tsconfig.json` | Extiende `expo/tsconfig.base` + `strict` |
| `jest.config.js` | preset `jest-expo` |
| `.env.example` | Claves `EXPO_PUBLIC_*` (vacías) |
| `.easignore` | Qué no subir al build |
| `app/_layout.tsx`, `app/index.tsx` | Router base (Expo Router) |
| `lib/env.ts` | Validación de env con Zod |

## Arranque

```bash
pnpm create expo-app@latest . --template default
# copiá los archivos de esta carpeta encima
pnpm add zod
pnpm add -D jest-expo jest @testing-library/react-native
pnpm add @sentry/react-native posthog-react-native expo-notifications
```

Completá `.env` (nunca commitear). Ajustá `app.json` (`name`, `slug`, `scheme`, ids) y corré
`eas init` (escribe el `projectId`).

## EAS

```bash
eas init
eas build --profile development --platform ios   # o android
```

## Verificar

```bash
pnpm typecheck && pnpm test
```

## Reglas

- Env de cliente solo con `EXPO_PUBLIC_` (se inlinea → nada secreto).
- OTA (`eas update`) solo para JS/estilos/assets; cambios nativos = build + review.
- No hand-write boilerplate: `create-expo-app` + plantilla + verificación.

Nativo (Kotlin+Swift) o KMP: ver skill `mobile-scaffold` → `references/native.md` / `kmp.md`.
