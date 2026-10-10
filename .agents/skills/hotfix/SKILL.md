---
name: hotfix
description: Corrige un bug en produccion con el minimo cambio y test de regresion.
---

Hotfix: `[argumentos del usuario]`

Ejecutá el flujo de emergencia:

1. **Diagnóstico**: delegá al subagente `@debugger` para causa raíz y evidencia.
2. **Fix mínimo**: el cambio más chico que resuelve; sin refactors ni features de paso.
3. **Test de regresión**: delegá a `@qa-tester` un test que falle sin el fix y pase con él.
4. **Rama**: `fix/<slug>` desde `main`; Conventional Commit `fix(...)`.
5. **Verificación**: `test` + `build` verdes; `@critical` E2E si aplica.
6. **Review express**: `@code-reviewer` con foco en el cambio y sus bordes.
7. **Deploy**: seguí el flujo de `/release` (versión patch).

Priorizá velocidad de mitigación sin romper lo demás. Actualizá `PROJECT_STATE.md` y reportá impacto.
