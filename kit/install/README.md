# Instalación global

Hace que el kit esté disponible en **cualquier proyecto** de opencode.

## Instalar

```bash
node kit/install/install.mjs
```

Copia agentes, comandos y skills a `~/.config/opencode/` (en Windows: `%USERPROFILE%\.config\opencode`).

## Usar

1. Abrí opencode en la carpeta de tu startup.
2. Ejecutá `/new-startup`.
3. Los comandos tienen `agent: founder` en su frontmatter, así que corren con el orquestador sin config extra.

## Desinstalar

Borrá de `~/.config/opencode/`:

- `agent/founder.md`
- `command/new-startup.md`
- `command/configure.md`
- `skills/bootstrap-startup/`

## Notas

- El instalador **sobrescribe** archivos con el mismo nombre. No toca otros agentes ni skills existentes.
- Si querés versionar distintas versiones del kit en distintos proyectos, preferí el modo **Template** o **Copia** en lugar del global.
