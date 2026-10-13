# Distribución mobile (EAS + stores + OTA)

## EAS (Expo)

- **EAS Build**: compila iOS/Android en la nube (no requiere Xcode/Android Studio local).
- **EAS Submit**: sube el binario a App Store Connect / Google Play.
- **EAS Update**: OTA de JS/estilos/assets a los canales (`preview`, `production`).

```bash
eas build --profile production --platform all
eas submit --profile production --platform all
eas update --branch production --message "fix: copy"
```

Perfiles en `eas.json` (dev/preview/production); canales vía `channel`.

## Qué puede ir por OTA (EAS Update) y qué no

- **Sí (OTA)**: JS, estilos, imágenes/assets referenciados por JS, lógica de negocio.
- **No (requiere build + review)**: código nativo, nuevos módulos/permisos, bump de SDK, cambios en `app.json` nativo (iconos, splash, entitlements), versiones nativas.

Regla: si tocaste `ios/`/`android/` (o permisos/SDK), es **build**, no OTA.

## Stores

- iOS: App Store Connect + **TestFlight** para betas. Cuenta **Apple Developer** (paga, anual).
- Android: **Play Console** (pago, único) + tracks internal/closed/open.
- Versionado: `app.json` `version` (visible) + build number (`ios.buildNumber`/`android.versionCode`, o `eas.json` `autoIncrement`).
- Review: cada build de producción pasa por revisión de la store.

## CI (GitHub Actions)

- Build con **eas-cli** usando `EXPO_TOKEN` (secret).
- Publicar a un canal OTA en cada merge a `main` (si `mobile.updates`).
- Preview por PR: build `preview` (internal distribution) + `eas update --branch preview`.

## Checklist

- [ ] `eas init` hecho; `projectId` en `app.json`.
- [ ] Perfiles de `eas.json` definidos.
- [ ] `EXPO_TOKEN` en secrets de CI.
- [ ] Versiones (version + build number) bajo control.
- [ ] Camino OTA definido (qué va y qué no).
