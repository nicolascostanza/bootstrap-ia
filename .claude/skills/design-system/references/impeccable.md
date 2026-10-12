# Impeccable (toolkit de UX, opcional)

Gratis y open source (<https://github.com/pbakaus/impeccable>). Multi-tool (OpenCode, Claude Code, Codex, Cursor, Gemini). Instalación: `npx skills add pbakaus/impeccable` (o `npx impeccable install`).

## Qué aporta

- **Crear**: `impeccable`, `shape`.
- **Evaluar**: `audit`, `critique`.
- **Refinar**: `typeset`, `layout`, `colorize`, `animate`, `bolder`, `quieter`, `overdrive`, `delight`.
- **Simplificar**: `distill`, `clarify`, `adapt`.
- **Endurecer**: `harden`, `onboard`, `optimize`, `polish`.
- **Sistema**: `init`, `document` (`DESIGN.md`), `extract`, `live`, `generate`.
- **Detector** de 59 "AI slop" checks que corre **en código, sin API key** → sirve como check de CI.
- Contexto: `PRODUCT.md` y `DESIGN.md`.

## Cuándo usarlo (por etapa)

| Etapa | Comandos |
|---|---|
| Definir dirección (`ux-designer`) | `shape` |
| Construir UI | `impeccable`, `polish` |
| Refinar tipografía / layout | `typeset`, `layout` |
| Revisar (`ui-reviewer`) | `critique`, `audit` (detector) |
| Documentar el sistema | `document`, `extract` |
| Landing | `polish`, `typeset`, `distill` |

## Integración con el kit

- **Instalación**: por proyecto (`npx skills add pbakaus/impeccable`); global opcional.
- **Detector en CI** (opcional): corre el detector sobre la UI y falla con hallazgos (exit code). Ver `ci-cd`.
- **Hooks** (opt-in): `impeccable hooks on` (`PostToolUse`/`Stop`) avisa al agente mientras edita.
- **Imagen / mockups**: **pago** (requiere OpenAI key) → opcional; no se usa por default.

## Reglas

- **No vendorizar** (evoluciona rápido): referenciar.
- El kit manda en **proceso** (tokens, estados obligatorios, a11y, Definition of Done); Impeccable aporta **criterio visual + detector**.
- Off por default: se activa con `product.uxToolkit`.
