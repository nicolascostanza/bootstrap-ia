---
description: "Crea un proyecto mobile segun mobile.framework (Expo por defecto, o nativo Kotlin+Swift / KMP)."
---

Objetivo: `$ARGUMENTS`

1. Si `project.type` no incluye `mobile`, confirmá y actualizá `bootstrap.config.json` (`project.type` + `deliverables`, ej. `["web-app","mobile"]`).
2. Cargá el skill `mobile-scaffold` y ejecutá el procedimiento según `mobile.framework` (`expo` | `native` | `kmp`).
3. Definí `mobile.targets`, distribución (`eas`) y testing (`jest-expo+rntl+maestro`).
4. Si `mobile.shared = monorepo`, dejá el layout `apps/mobile` + `packages/shared` (ver `references/shared.md`).
5. Verificá: `typecheck` + tests verdes (y `maestro test` si hay flujos).
6. Reportá el próximo paso (EAS build/submit, OTA update, publicar en stores).
