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

Copia agentes, comandos, skills y `kit/` (plantillas de docs y archivos base de scaffold) a `~/.config/opencode/` (en Windows: `%USERPROFILE%\.config\opencode`). El script localiza sus archivos por su propia ubicación, así que funciona sin importar dónde estés parado.

**Una sola vez.** Después de instalarlo y reiniciar opencode, ya podés abrir una carpeta vacía cualquiera y usar `/new-startup`.<br>
No se corre dentro de la carpeta vacía: ahí no existe `kit/install/install.mjs`.

## Usar

1. Abrí opencode en la carpeta de tu startup.
2. Ejecutá `/new-startup` y después `/scaffold`.
3. Los comandos tienen `agent: founder` en su frontmatter, así que corren con el orquestador sin config extra.
4. Los archivos base de scaffold están en `~/.config/opencode/kit/scaffold/`.

## Desinstalar

Borrá de `~/.config/opencode/` los archivos del kit:

- `agent/` (founder, architect, code-reviewer, debugger, devops, qa-tester, refactorer, security-auditor)
- `command/` (new-startup, configure, scaffold, feature, test, review, release, hotfix)
- `skills/` (todos los del kit)
- `kit/` (docs-template, scaffold, install)

## Notas

- El instalador **sobrescribe** archivos con el mismo nombre. No toca otros agentes ni skills existentes.
- Si querés versionar distintas versiones del kit en distintos proyectos, preferí el modo **Template** o **Copia** en lugar del global.
