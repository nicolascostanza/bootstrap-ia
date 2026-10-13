# Kotlin Multiplatform (KMP)

`mobile.framework: kmp`. **Lógica compartida** en Kotlin + **UI nativa** (o Compose Multiplatform).

Ideal cuando querés apps nativas pero te duele mantener la lógica dos veces
(modelos, validación, networking, reglas de negocio).

## Qué compartir

- **Sí**: dominio, modelos, validación, acceso a red (Ktor), persistencia (SQLDelight), feature flags.
- **Con cuidado**: UI (Compose Multiplatform comparte UI en iOS/Android, pero no es "nativo puro").
- **No**: bordes que son distintos por plataforma (push, IAP, deep links) → `expect/actual`.

## Herramientas

- **Kotlin Multiplatform** + Gradle (Android Studio) y **Xcode** para el target iOS.
- Networking: **Ktor**. Persistencia: **SQLDelight** / Room (Android) / SQLite.
- UI: **Compose Multiplatform** (opción) o SwiftUI/Compose nativos por plataforma.
- Wizard oficial para arrancar un proyecto KMP (Android Studio / KMP wizard).

## Estructura

```
mobile/
├─ shared/            # módulo Kotlin Multiplatform (commonMain + androidMain + iosMain)
├─ androidApp/        # Compose
└─ iosApp/            # SwiftUI (consume shared como framework)
```

## Cuándo NO

- Si el equipo es 100% TS y el producto es "app de negocio" → **Expo** (más rápido).
- Si el producto es de una sola plataforma → nativo puro (`native.md`).

## Testing

- Lógica compartida: tests en `commonTest` (Kotlin).
- UI: Compose testing (Android) / XCUITest (iOS).

## Reglas

- `expect/actual` solo en los bordes (lo que difiere por plataforma).
- Compartí **lógica**, no fuerces compartir UI si sacrifica el feel nativo.
