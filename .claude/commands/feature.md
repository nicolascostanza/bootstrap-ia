---
description: "Implementa una feature completa (spec → plan → codigo → tests → review → PR)."
---

Feature a implementar: `$ARGUMENTS`

Ejecutá el flujo completo del kit:

1. **Spec**: si no existe, agregá la feature a `docs/prd.md` con criterios de aceptación `Dado/Cuando/Entonces` y su contrato técnico (endpoints/actions, modelo de datos, adapter si aplica).
2. **Plan**: si hay decisiones técnicas relevantes, delegá al subagente `@architect` y registrá el ADR si corresponde. Cargá los skills del kit que apliquen.
3. **Implementación**: implementá respetando `nextjs-conventions`, `react-conventions`, `typescript-conventions`, `api-design`, `data-postgres`, `security`.
4. **Tests**: delegá a `@qa-tester`; un test por criterio de aceptación. Verificá cobertura.
5. **Review**: delegá a `@code-reviewer` y aplicá los cambios solicitados.
6. **Git**: rama `feat/<slug>` desde `main`, Conventional Commits, y dejá el PR listo con el template.
7. **Cierre**: cargá `verification-before-completion` y mostrá la evidencia (`lint` + `typecheck` + `test` + `build`, comando y salida). Actualizá `PROJECT_STATE.md`.

No mergees sin aprobación del usuario. Reportá al final: qué se hizo, archivos clave, resultado de tests y próximo paso.
