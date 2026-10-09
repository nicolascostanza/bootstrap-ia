# Instalación global

Hace que el kit esté disponible en **cualquier proyecto** de opencode, en **cualquier máquina**.

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

Copia agentes, comandos, skills, plantillas y archivos base de scaffold a `~/.config/opencode/`, y crea/actualiza la **config global** con los MCP (Neon, GitHub, Vercel) sin pisar lo que ya tengas.

**Una sola vez por máquina.** Después de instalarlo y reiniciar opencode, ya podés abrir una carpeta vacía cualquiera y usar `/new-startup`.

## Varias máquinas (Windows y macOS)

El kit vive en GitHub; `~/.config/opencode/` es local. En **cada** máquina:

1. Clonar: `git clone git@github.com:nicolascostanza/bootstrap-ia.git`
2. Instalar: `cd bootstrap-ia && node kit/install/install.mjs`
3. Configurar los tokens (por máquina, nunca en el repo):
   - **Windows**: `setx NEON_API_KEY "..."` y `setx GITHUB_TOKEN "..."`
   - **macOS**: agregar a `~/.zshrc`: `export NEON_API_KEY="..."` y `export GITHUB_TOKEN="..."`
4. Autenticar Vercel (OAuth, por máquina): `opencode mcp auth vercel`
5. Reiniciar opencode.

Funciona igual en Windows y macOS: el instalador es Node y usa `~/.config/opencode` en ambas. Lo único distinto por máquina son los tokens y el OAuth.

## Actualizar el kit

```bash
cd bootstrap-ia && git pull && node kit/install/install.mjs
```

## Usar

1. Abrí opencode en la carpeta de tu startup.
2. Ejecutá `/new-startup` y después `/scaffold`.
3. Los comandos corren con el `founder` sin config extra.
4. Defaults y plantillas del kit: `~/.config/opencode/kit/`.

## Desinstalar

Borrá de `~/.config/opencode/` los archivos del kit:

- `agent/` (founder, architect, code-reviewer, debugger, devops, qa-tester, refactorer, security-auditor)
- `command/` (new-startup, configure, scaffold, feature, test, review, release, hotfix)
- `skills/` (todos los del kit)
- `kit/` (config, docs-template, scaffold, mcp, install)

Y las entradas `mcp` de `opencode.json` si no las querés.

## Notas

- El instalador **no borra** otros agentes/skills, y **no pisa** claves existentes de tu `opencode.json` (solo agrega las que faltan).
- Si querés versionar distintas versiones del kit por proyecto, usá el modo **Template** o **Copia** en lugar del global.
