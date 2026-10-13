# Nativo — Kotlin + Swift (guía)

`mobile.framework: native`. Dos apps separadas: **Android (Kotlin)** + **iOS (Swift)**.

> Elegí esto **solo** si hay una razón de plataforma: rendimiento/gráficos, AR/3D, cámara/audio
> avanzada, watchOS, APIs nuevas de Apple/Google el día 1, o equipo nativo.
> Asumí el costo: **cada feature se escribe y se mantiene dos veces**.

## Herramientas (CLIs oficiales)

- **Android**: Android Studio + **Gradle** (Kotlin DSL) + **AGP**; UI con **Jetpack Compose**; builds con `./gradlew`.
- **iOS**: **Xcode** + **SwiftUI**; scaffold reproducible con **Tuist** o **XcodeGen** (proyecto desde código, versionable); distribución con **Fastlane** (opcional).
- Gestión de dependencias: Gradle version catalog (`libs.versions.toml`) en Android; **Swift Package Manager** en iOS.

## Estructura (dos repos o monorepo)

```
mobile/
├─ android/          # Gradle, Kotlin, Compose (app/)
└─ ios/              # SwiftUI (proyecto vía Tuist/XcodeGen)
```

## Lo que hay que resolver dos veces

Prestá atención a estos bordes (no son 1:1 entre plataformas): push (FCM vs APNs), deep links,
IAP (Play Billing vs StoreKit), permisos, background, almacenamiento seguro (Keystore vs Keychain)
y cada SDK de terceros.

## Compartir lógica

Si el dolor es la lógica duplicada y querés UI nativa, considerá **KMP** (`kmp.md`) en lugar de
escribir todo dos veces.

## Testing

- Android: JUnit + Compose Testing; iOS: XCTest + SwiftUI previews.
- E2E: Espresso (Android) / XCUITest (iOS).

## Reglas

- **No hand-write** el proyecto Xcode a mano: usá Tuist/XcodeGen.
- Versioná el proyecto (Tuist/XcodeGen) para evitar merges imposibles en `.pbxproj`.
- Igual que en Expo: no exponer secretos en el bundle; a11y nativa obligatoria.
