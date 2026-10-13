# Compartir con la web (monorepo)

`mobile.shared: monorepo`. Un repo con la app web y la mobile, compartiendo **tipos y lógica**.

```
<monorepo>/
├─ pnpm-workspace.yaml
├─ apps/
│  ├─ web/               # Next.js (deliverable web-app)
│  └─ mobile/            # Expo (deliverable mobile)
└─ packages/
   └─ shared/            # tipos, schemas (Zod), constantes, utilidades puras
```

- **pnpm workspaces**: `apps/*` + `packages/*`.
- `packages/shared` **sin dependencias de plataforma** (nada de `react-native`, `next`, `node:*`): tipos, Zod, lógica pura.
- Consumo: en `apps/mobile` y `apps/web` con `"@org/shared": "workspace:*"`.
- Si `engineering.database` aplica a la web, el **schema** puede vivir en `packages/shared` o en la app que lo use (no compartas el cliente de DB con mobile).

## Reglas

- `shared` = agnóstico y **sin estado global** (se usa en entornos distintos).
- Validación en los bordes: compartí los **schemas Zod** (misma fuente de verdad para web y mobile).
- Un `pnpm-workspace.yaml` raíz; CI con `pnpm -r` (ver CI del kit y `library-monorepo/SCAFFOLD.md` como referencia de workspaces + Changesets).
- Alternativa sin monorepo: publicar `packages/shared` a un registry privado y consumirlo versionado.
