# Expo — procedimiento completo

Default del kit (`mobile.framework: expo`). React Native + Expo: un código para iOS + Android.

## Paso 1 — Crear la app (CLI real)

```bash
pnpm create expo-app@latest . --template default
```

- Trae TypeScript + **Expo Router** (file-based) + `expo` SDK actual.
- Registrá la versión del SDK Expo y **fijala**.
- Verificá arranque: `pnpm expo start` (o `pnpm expo start --web`).

## Paso 2 — Router

`mobile.router: expo-router`:

```
app/
├─ _layout.tsx        # Stack/Tabs raíz
└─ index.tsx          # primera pantalla
```

Rutas por archivos; `expo-router` ya viene en el template default.

## Paso 3 — Base del kit

Copiá `kit/scaffold/mobile/` (global: `~/.config/opencode/kit/scaffold/mobile/`):

| Archivo | Para qué |
|---|---|
| `app.json` | Config Expo (name, slug, scheme, ids iOS/Android, `expo-router`, `newArchEnabled`) |
| `eas.json` | Perfiles de build (development/preview/production) + canales OTA |
| `tsconfig.json` | Extiende `expo/tsconfig.base` + `strict` |
| `jest.config.js` | `jest-expo` |
| `.env.example` | Claves `EXPO_PUBLIC_*` (vacías) |
| `.easignore` | Qué **no** subir al build |
| `lib/env.ts` | Validación con el validador del kit (`engineering.validation`, default Zod) |

Ajustá `name`, `slug`, `scheme`, `ios.bundleIdentifier`, `android.package`.

## Paso 4 — EAS (build + OTA)

```bash
eas init            # vincula el proyecto a tu cuenta EAS
eas build --profile development --platform ios   # (o android)
```

- **EAS Build**: compila en la nube (sin Xcode/Android Studio local).
- **EAS Updates** (`mobile.updates: eas-updates`): OTA de **JS/estilos/assets** a los canales `preview`/`production`. Ojo con los límites (ver `distribution.md`).

## Paso 5 — Testing

- Unit/componentes: **jest-expo** + **React Native Testing Library (RNTL)**.
- E2E: **Maestro** (flujos en YAML). Detalle en `testing.md`.

## Paso 6 — Servicios

- Analytics: `posthog-react-native`.
- Errores: `@sentry/react-native` (con `expo` plugin).
- Push: `expo-notifications`.
- Tipos compartidos: ver `shared.md` (monorepo).

## Paso 7 — Verificación

```bash
pnpm typecheck && pnpm test
maestro test .maestro/    # si hay flujos
```

## Reglas

- **Env de cliente con `EXPO_PUBLIC_`** (se inlinea en el bundle → nada secreto).
- Verificá versiones del SDK y de las libs (la API cambia entre SDKs); consultá la doc oficial.
- Escape a nativo cuando haga falta: `expo prebuild` (genera `ios/` y `android/`) + config plugins.
