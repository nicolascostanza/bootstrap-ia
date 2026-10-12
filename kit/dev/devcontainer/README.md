# Devcontainer (opt-in)

Plantillas para `engineering.devEnv = "devcontainer"`. Copiá esta carpeta a `<proyecto>/.devcontainer/`.

| Archivo | Qué hace |
|---|---|
| `devcontainer.json` | Config del entorno (imagen Node 22, `forwardPorts`, `postCreateCommand`) |
| `compose.yaml` | Servicio `app` (fuente bind-mount, `node_modules` en volumen) |
| `compose.services.yaml` | Opcional: Postgres + Redis locales (off por default) |

## Activar servicios locales

En `devcontainer.json`, cambiá:

```json
"dockerComposeFile": ["compose.yaml", "compose.services.yaml"]
```

`DATABASE_URL`/`REDIS_URL` los setea el overlay. Por default el kit usa Neon (DB cloud), así que los servicios locales son solo si los necesitás.

## Notas

- No bind-montees `node_modules` (performance/ownership): ya está en volumen nombrado.
- En worktrees, cada uno abre su propio contenedor; los puertos se forwardean y no colisionan.
- Cross-platform: ver el skill `dev-environment` (LF, WSL2, ARM64).
