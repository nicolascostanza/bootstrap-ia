# Integraciones MCP

Servidores MCP del kit: **Neon**, **GitHub** y **Vercel**. Viven en la config global (`~/.config/opencode/opencode.json`) para estar disponibles en todos los proyectos.

## Neon

```json
"Neon": {
  "type": "remote",
  "url": "https://mcp.neon.tech/mcp",
  "enabled": true,
  "headers": { "Authorization": "Bearer {env:NEON_API_KEY}" }
}
```

- Token en `NEON_API_KEY` (nivel usuario).
- URL **sin scopear** para manejar los proyectos de todas las startups.
- Rotar el token si alguna vez quedó expuesto.

## GitHub

```json
"github": {
  "type": "remote",
  "url": "https://api.githubcopilot.com/mcp/",
  "enabled": false,
  "headers": { "Authorization": "Bearer {env:GITHUB_TOKEN}" }
}
```

- Requiere un **PAT** en `GITHUB_TOKEN` (fine-grained: repos, issues, PRs, actions).
- `enabled: false` hasta que el token exista. Después, cambiar a `true` y reiniciar.
- Modo solo lectura: header `"X-MCP-Readonly": "true"` o URL `https://api.githubcopilot.com/mcp/readonly`.
- Toolsets selectivos: `"X-MCP-Toolsets": "repos,issues,pull_requests,actions"`.
- Alternativa local (Docker):

```json
"github-local": {
  "type": "local",
  "command": ["docker", "run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
  "environment": { "GITHUB_PERSONAL_ACCESS_TOKEN": "{env:GITHUB_TOKEN}" }
}
```

## Vercel

```json
"vercel": {
  "type": "remote",
  "url": "https://mcp.vercel.com",
  "enabled": true
}
```

- Autenticación por **OAuth**: la primera vez que se use, opencode abre el flujo. También `opencode mcp auth vercel`.
- Endpoint oficial: `https://mcp.vercel.com`.

## Seguridad

- Nunca commitear tokens: solo `{env:VAR}`.
- Los MCP pueden mutar infraestructura: las operaciones destructivas siempre se confirman.
- Un token por servicio y rotación ante cualquier exposición.

## Variables de entorno requeridas

| Variable | Servicio |
|---|---|
| `NEON_API_KEY` | Neon |
| `GITHUB_TOKEN` | GitHub |
| (OAuth) | Vercel |
