---
name: bootstrap-startup
description: Entrevista al founder y genera la configuracion, documentacion y roadmap de una startup nueva con enfoque de minimo delivery. Usalo cuando el usuario ejecute /new-startup, diga "arrancar una startup", "nueva idea", "bootstrap", "definir mi MVP", o quiera partir de cero vision, PRD, GTM, metas y defaults tecnicos.
license: MIT
compatibility: opencode
metadata:
  fase: B1
  modo: guided
---

# Bootstrap de startup

Define y documenta una startup nueva partiendo de defaults sensatos, dejando todo configurable y listo para scaffoldear.

## Regla de oro: entrevista interactiva

**Nunca vuelques un cuestionario gigante.** Hacé **una ronda por vez** (máximo 4-5 preguntas) con la tool `question`, esperá las respuestas, comentá brevemente y recién ahí pasá al siguiente bloque. Cada bloque ofrece la opción **"usar defaults de este bloque"** para no responder todo.

## Dónde trabajás

- El **directorio actual** es la startup. Todo se escribe acá: `bootstrap.config.json`, `PROJECT_STATE.md`, `docs/`.
- Si el directorio está vacío, es una startup nueva. **No** leas el `PROJECT_STATE.md` del kit como si fuera de la startup.
- Los defaults están en `kit/config/bootstrap.defaults.json` (repo) o `~/.config/opencode/kit/config/bootstrap.defaults.json` (global).
- Las plantillas están en `kit/docs-template/` (repo) o `~/.config/opencode/kit/docs-template/` (global).

## Modos

1. `quick` — acepta los defaults y pregunta solo el bloque A (negocio).
2. `guided` (default) — recorre los bloques A→E, uno por vez, permitiendo ajustar.
3. `revisar` — lee el config y los docs existentes, muestra las decisiones actuales y pregunta **solo** qué cambiar.

## Paso a paso

1. **Contexto**: si ya existen `bootstrap.config.json` / `docs/` en el directorio actual, leelos y no repreguntes lo definido.
   - Si **no** existe `docs/idea.md`, advertí (sin bloquear) que la idea no pasó por `/brainstorm` y ofrecé correrlo primero. Si el usuario decide seguir, anotá las objeciones sin resolver en `docs/validation.md`.
2. **Ronda 0 — Tipo** (siempre): ¿qué construís en este repo? `web-app` | `landing` | `library` (`mobile` próximamente). Escribí `project.type` y `deliverables`. Adaptá las rondas según el tipo (librería → Ronda L; landing → deriva a `/landing`; web-app → igual que hoy).
3. **Ronda A — Negocio** (siempre): nombre, problema, cliente ideal (ICP), propuesta de valor, modelo de negocio, etapa.
4. **Ronda B — Stack**: package manager, styling, validación (default Zod), accesibilidad (default WCAG AA), DB/ORM, auth, testing, entorno de dev (nativo o devcontainer), layout (app única / split / monorepo), hosting.
5. **Ronda C — Capacidades**: email, mensajería, analytics, observabilidad, pagos.
6. **Ronda D — Producto/GTM**: priorización, canales, posicionamiento, tono de marca.
7. **Ronda E — Legal/Finanzas**: jurisdicción, docs legales, pricing, facturación.
8. **Ronda L — Librería** (solo si `project.type = library`): `library.kind` (util/ui/framework; core+adapters/sdk luego), build, formato, publish, docs, testing (vitest), monetización, MoR, gate.
9. **Escribir `bootstrap.config.json`** en el directorio actual, partiendo de los defaults y aplicando las respuestas. No borres claves.
10. **Generar `docs/`** desde `kit/docs-template/`: los documentos core + `docs/README.md` (índice) y las subcarpetas `specs/`, `adr/`, `reviews/`, `research/` (skill `project-structure`). Las features del MVP se especifican con `/feature` en `docs/specs/`.
11. **MVP + backlog RICE** en `docs/roadmap.md`, con los skills del kit aplicables por feature.
12. **`PROJECT_STATE.md`** en el directorio actual.
13. **`AGENTS.md`**: copiá `kit/config/AGENTS.md` (global: `~/.config/opencode/kit/config/AGENTS.md`) al directorio actual si no existe.
14. **Multi-tool**: generá los artefactos de Claude Code y Codex con `node ~/.config/opencode/kit/sync/sync.mjs --target .`.
15. **Repo propio de la startup** (preguntar antes): `git init -b main` si hace falta y `gh repo create <nombre> --private --source=. --remote=origin --push`. Saltear si el usuario solo quiere docs.
16. **Cerrar**: resumen de 5 líneas + próximo paso (normalmente `/scaffold`; si `type = library`, `/library`).

## Reglas

- **No implementes código** en este flujo; solo definición, documentación y planificación.
- Una ronda de preguntas por mensaje. Nada de listas de 20 preguntas.
- Mostrá siempre el default recomendado en cada pregunta.
- El kit `bootstrap-ia` **nunca** es el repo de la startup.
- Nunca inventes datos del negocio: lo que falte va como `[PENDIENTE]`.
- Si el usuario cambia una tecnología, verificá que exista como alternativa en los defaults; si no, agregala antes de aplicarla.

## Salida esperada

- `bootstrap.config.json`, `docs/` (10 documentos), backlog RICE y `PROJECT_STATE.md`, todo en el directorio actual.
- Resumen + próximo paso.
