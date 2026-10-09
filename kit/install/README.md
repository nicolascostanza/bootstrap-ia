# Instalación global

Hace que el kit esté disponible en **cualquier proyecto** de opencode.

## Instalar

El instalador vive **en el repo del kit**. Corrélo **desde la carpeta del kit**:

```bash
cd bootstrap-ia
node kit/install/install.mjs
```

O desde cualquier carpeta, con la ruta absoluta al script:

```bash
node "C:/Users/Nikito/Desktop/NICO/proyectos/boostrap-ia/kit/install/install.mjs"
```

Copia agentes, comandos y skills a `~/.config/opencode/` (en Windows: `%USERPROFILE%\.config\opencode`). El script localiza sus archivos por su propia ubicación, así que funciona sin importar dónde estés parado.

**Una sola vez.** Después de instalarlo y reiniciar opencode, ya podés abrir una carpeta vacía cualquiera y usar `/new-startup`.<br>
No se corre dentro de la carpeta vacía: ahí no existe `kit/install/install.mjs`.

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
