# bootstrap-ia

Kit de opencode para bootstrapear startups: agentes, skills, comandos, estándares técnicos y plantillas que codifican ** cómo trabajar** en cada etapa (ingeniería, producto, diseño, marketing, ops, finanzas, fundraising) para ir de idea a MVP desplegado lo más rápido posible.

## Principio central

**Todo por defecto, todo configurable.** Cada decisión vive en `bootstrap.config.json` y se puede cambiar **paso a paso** con `/configure`. Nada está escondido en los prompts.

## Cómo se usa

| Modo | Cómo | Cuándo |
|---|---|---|
| **Template** | `gh repo create <startup> --template <org>/bootstrap-ia` | Startup nueva desde cero |
| **Copia** | Copiar `.opencode/` + `opencode.json` al proyecto | Proyecto existente |
| **Global** | `node kit/install/install.mjs` (ver `kit/install/README.md`) | Kit siempre disponible en cualquier carpeta |

## Flujo por startup

```
/new-startup        # entrevista → bootstrap.config.json + docs/ + roadmap + PROJECT_STATE.md
/scaffold           # crea el proyecto Next.js con CLIs reales (B5)
/feature            # spec → plan → implementación → tests → review → PR (B4)
/configure <área> <valor>   # cambia una decisión y re-aplica
/status             # estado y próximo paso
```

## Estructura

```
bootstrap-ia/
├─ opencode.json            # config del kit (default_agent, permisos)
├─ bootstrap.config.json    # decisiones y defaults (fuente única de verdad)
├─ AGENTS.md                # reglas base para los agentes
├─ PROJECT_STATE.md         # memoria entre sesiones
├─ .opencode/
│  ├─ agent/founder.md      # agente primario orquestador
│  ├─ skills/               # workflows reutilizables
│  └─ command/              # slash commands
├─ kit/
│  ├─ docs-template/        # plantillas de documentación
│  └─ install/              # instalación global
└─ docs/                    # decisiones de diseño del propio kit
```

## Defaults principales

- **Stack**: Next.js + TypeScript + Postgres (Neon) · pnpm · Drizzle · Tailwind + shadcn/ui
- **Auth**: Neon Auth (Better Auth), Google + email magic link/OTP
- **Testing**: Jest + RTL + Playwright · 90% dominio (ratchet) · MSW · axe · Stryker
- **Observabilidad**: Sentry + Axiom + Better Stack
- **Analytics**: PostHog
- **Pagos**: MercadoPago (AR) detrás de adapter
- **Git**: GitHub Flow + Conventional Commits

## Plan por bloques

`B0 Fundación → B1 Orquestación → B2 Estándares técnicos → B3 Agentes ingeniería → B4 Workflow dev → B5 Scaffold → B6 MCP → B7 Producto → B8 Diseño → B9 GTM → B10 Fundraising → B11 Ops/Legal/Finanzas → B12 Distribución → B13 Founder OS`

Estado actual en [`PROJECT_STATE.md`](./PROJECT_STATE.md).
