---
name: dev-environment
description: Define el entorno de desarrollo del proyecto y su compatibilidad entre macOS, Linux y Windows: nativo (Node/pnpm + puertos deterministas), devcontainer opt-in o compose-only. Usalo cuando haya que decidir el entorno de desarrollo, cuando el proyecto deba correr igual en varias maquinas, o al configurar Docker, devcontainers o servicios locales.
license: MIT
compatibility: opencode
metadata:
  bloque: refinement
  default: native
  alternativas: devcontainer, compose-only
---

# Entorno de desarrollo

## Default

- `engineering.devEnv: "native"` → **sin Docker**. Node + pnpm + `scripts/ports.mjs`. Ya es cross-platform.
- Docker es **opt-in** (`devEnv: "devcontainer"`) para quien quiera toolchain idéntico. **No** es necesario para el MVP (Neon = DB cloud, Vercel = deploy).

## Cuándo cada opción

| Opción | Cuándo conviene |
|---|---|
| `native` (default) | MVP, delivery rápido, sin Docker instalado |
| `devcontainer` | toolchain idéntico entre máquinas; onboarding de un comando |
| `compose-only` | solo servicios locales (Postgres/Redis), toolchain nativo |

El devcontainer es una **capa aditiva sobre Compose**: comparten el mismo `compose.yaml`. Migrar de uno a otro no es reescribir.

## Cómo activarlo

- Cambiá `engineering.devEnv` con `/configure` y re-scaffold, o copiá `kit/dev/devcontainer/` a `<proyecto>/.devcontainer/`.
- Servicios locales (off por default): agregá `compose.services.yaml` al `dockerComposeFile` del `devcontainer.json`.
- Docker Desktop (Mac/Win) es gratis para personal; en Linux es nativo.

## Qué NO cambia

- Los **worktrees** y los **puertos** ya funcionan sin Docker: `scripts/ports.mjs` es determinístico y cross-platform.
- En modo devcontainer, cada worktree abre su propio contenedor; los puertos los maneja el forwarding y no colisionan entre worktrees.

## Checklist cross-platform (lo que realmente rompe)

- **LF** en scripts y `.env` (`.gitattributes` con `* text=auto eol=lf`). Ya viene en el kit.
- **Windows/WSL2**: repo en `~/code`, no en `/mnt/c` (I/O y file-watch se degradan).
- **Apple Silicon**: imágenes `arm64` cuando existan; `linux/amd64` solo si falta el manifest (evita emulación).
- **node_modules**: nunca bind-mountear; usá un volumen nombrado (performance y ownership).
- **Ownership/UID**: corré con el usuario del devcontainer; no escribas como root sobre el bind mount.
- **Docker Desktop**: corre en una VM Linux; binds y eventos van más lentos que en Linux nativo.

## Alternativas mencionadas (no adoptadas)

- Plugin **`opencode-devcontainers`** (opencode-only): worktree/devcontainer/puertos automáticos. Buena referencia; no lo usamos para no atarnos a una herramienta.
- **compose-only**: `docker compose up` en la terminal, sin containerizar el editor.

## Red flags

| Pensamiento | Realidad |
|---|---|
| "Con Docker los worktrees quedan compatibles" | Los worktrees ya son compatibles; Docker resuelve el *toolchain*. |
| "Agrego Docker por defecto" | Es opt-in; por defecto suma peso sin beneficio para el MVP. |
| "Bind-mounteo `node_modules` para ver cambios" | Mata la performance y el ownership; usá un volumen. |

## Salida

Decisión registrada en `bootstrap.config.json` (`engineering.devEnv`) + `.devcontainer/` si aplica + checklist cross-platform verificado.
