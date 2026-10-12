---
name: feature
description: Implementa una feature completa (spec → plan → codigo → tests → review → PR).
---

Feature a implementar: `[argumentos del usuario]`

Ejecutá el flujo completo del kit:

0. **Aislamiento**: si no estás en un worktree y `engineering.worktrees = per-feature`, ofrecé crear uno con `/worktree` (skill `worktrees`) antes de codear.
1. **Spec**: si no existe, creá `docs/specs/<slug>.md` (plantilla `kit/docs-template/specs/_template.md`) con criterios `Dado/Cuando/Entonces` y contrato técnico, y agregá su fila al índice en `docs/prd.md`.
2. **Plan**: si hay decisiones técnicas relevantes, delegá al subagente `@architect` y registrá el ADR si corresponde. Cargá los skills del kit que apliquen.
3. **Implementación**: implementá respetando `nextjs-conventions`, `react-conventions`, `typescript-conventions`, `api-design`, `data-postgres`, `security`.
4. **Verificación en paralelo**: cargá `parallel-work` y lanzá en paralelo (máx `engineering.parallelism`, default 3): `@qa-tester` (tests por criterio de aceptación), `@code-reviewer` (código), `@ui-reviewer` (si cambió UI) y `@product-reviewer` (producto). Consolidá en un veredicto y aplicá los cambios.
5. **Git**: si ya estás en una branch de worktree, usala; si no, creá `feat/<slug>` desde `develop`. Conventional Commits y PR con `gh pr create --base develop --fill`.
6. **Cierre**: cargá `verification-before-completion` y mostrá la evidencia (`lint` + `typecheck` + `test` + `build`, comando y salida). Actualizá `PROJECT_STATE.md`.

No mergees sin aprobación del usuario. Reportá al final: qué se hizo, archivos clave, resultado de tests y próximo paso.
