---
name: parallel-work
description: Define cuando y como paralelizar o mandar a background trabajo (fan-out de reviews, tests, recon, red-team) de forma portable entre opencode, Claude Code y Codex. Usalo al revisar cambios, cerrar una feature, hacer recon o red-team, o cuando haya trabajo independiente que se pueda acelerar.
license: MIT
compatibility: opencode
metadata:
  bloque: refinement
  default: auto
  maxConcurrent: 3
---

# Trabajo en paralelo

## Regla de oro

Paralelizá **solo** trabajo independiente: sin archivos compartidos y sin orden entre sí. Si comparten salida o se necesitan → secuencial.

## Cuándo NO paralelizar

- Hay dependencia de orden (B necesita el resultado de A).
- Dos o más **escriben** los mismos archivos → secuencial, o cada uno en su worktree.
- Es una tarea chica: el overhead supera el ahorro.
- El fan-out es grande y la cuota/tokens importan (ver Costo).

## Aislamiento

- **Escritores** (editan archivos): cada uno en su **worktree** (`/worktree`).
- **Lectores** (analizan y reportan): comparten el checkout.

## Mecanismo por harness

Detectá el harness con `node kit/dev/harness.mjs`. Si no hay soporte de background, corré **foreground secuencial** y decilo.

| Harness | Cómo lanzar en paralelo/background |
|---|---|
| opencode (v1) | tool `task` (bloqueante); background detrás de flag experimental |
| opencode (v2) | tool `subagent` en background; Code Mode (`Promise.all`) para tools MCP |
| Claude Code | subagents en background (default); agent view (`claude agents`); `/batch` |
| Codex | subagents (default); custom agents |

## Caps y costo

- Default: **máximo 3** concurrentes (`bootstrap.config.json` → `engineering.parallelism`).
- La concurrencia multiplica tokens/cuota: usala donde rinde (verificación y review), no para implementación masiva.
- Límites del harness: Claude 20, Codex 6.

## Background shell

Comandos largos (install, tests, build, `sync --check`, `ports.mjs`) → mandalos a background cuando el harness lo permita y seguí con otra cosa; avisá cuando terminan.

## Recetas (fan-out)

- **Review**: en paralelo `code-reviewer` + `ui-reviewer` + `product-reviewer` (+ `security-auditor` si es sensible), luego **consolidás** en un solo veredicto.
- **Cierre de feature**: tras implementar, en paralelo tests (`qa-tester`) + code review + product review (+ UI si cambió), después el gate.
- **Recon/red-team**: `user-researcher` (benchmarks) + `skeptic` (riesgos) en paralelo.
- **Release**: pre-checks en paralelo.

## Agregación

El orquestador (`founder`) junta los resultados y produce **una** salida consolidada: veredicto único, top-3 por severidad y decisiones. No pegues los reportes crudos.

## Multi-harness

Para correr **distintos harness a la vez** (opencode + Claude + Codex) en paralelo, usá **Orca**: crea un worktree por harness/sesión y lanza cada uno ahí. Ver `kit/multitool/README.md`.

## Red flags

| Pensamiento | Realidad |
|---|---|
| "Lanzo todo en paralelo" | Sin independencia real es más lento y rompe archivos. |
| "Dos agentes editan el mismo repo" | Cada escritor en su worktree. |
| "Pego los 4 reportes crudos" | Consolidá en un veredicto. |

## Salida

Trabajo despachado en paralelo (o secuencial justificado) + salida consolidada.
