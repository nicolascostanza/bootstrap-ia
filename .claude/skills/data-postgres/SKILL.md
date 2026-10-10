---
name: data-postgres
description: Estandares de datos del kit: Postgres en Neon con Drizzle (schema, migraciones, queries, indices, RLS, branch por PR). Usalo al modelar tablas, escribir migraciones, queries o cuando haya que cambiar el ORM o la base de datos.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: drizzle+neon
  alternativas: prisma, sql-directo, supabase
---

# Datos — Postgres + Drizzle (Neon)

## Default y alternativas

- **Default**: Neon (Postgres serverless) + Drizzle ORM.
- Alternativas: Prisma, SQL directo con `pg`, Supabase.
- Configurable en `bootstrap.config.json` → `engineering.database` / `dbHost`.

## Reglas

### Schema

- Un archivo por dominio en `db/schema/`, exportado desde `db/schema/index.ts`.
- `snake_case` en DB, `camelCase` en el código (Drizzle mapea).
- Toda tabla: `id` (uuid o serial), `created_at`, `updated_at`.
- FKs con `onDelete` explícito; índices en columnas de filtro y en FKs.
- Nada de borrado físico para entidades de negocio: `deleted_at` (soft delete).

### Migraciones

- **Siempre** con `drizzle-kit generate` + `drizzle-kit migrate`. Nunca editar la DB a mano.
- Cada migración se revisa en PR; se prueban en la branch de Neon del PR antes de mergear.
- Datos de seed separados de migraciones (`db/seed.ts`).

### Queries

- Toda query vive en `db/queries/` o en el `service` del dominio; **nunca** en componentes.
- Seleccioná columnas explícitas; evitá `select *` en queries calientes.
- Paginación (limit/offset o cursor) en todo listado; nunca traer todo.
- Transacciones (`db.transaction`) para operaciones de múltiples pasos.

### Entornos

- **Branch de Neon por PR** para integration/E2E (`dbIsolation: neon-branch-per-pr`).
- `DATABASE_URL` por entorno vía `{env:DATABASE_URL}`; jamás en el repo.

## Cómo afecta al scaffold

- Crea `db/schema/`, `db/queries/`, `drizzle.config.ts`, `.env.example` con `DATABASE_URL`.
- CI crea/borra la branch de Neon por PR.

## Checklist

- [ ] Migración versionada y revisada.
- [ ] Índices en FKs y filtros usados.
- [ ] Cero queries en componentes.
- [ ] Listados paginados.
