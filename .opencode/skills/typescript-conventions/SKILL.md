---
name: typescript-conventions
description: Estandares de TypeScript del kit (strict, sin any, tipos vs interfaces, validacion con Zod en bordes, manejo de errores tipado). Usalo al escribir o revisar codigo TS, definir tipos, validar inputs o modelar errores.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: typescript-strict
---

# TypeScript — convenciones

## Default

- `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`.
- **Prohibido `any`**. Si es inevitable, `unknown` + validación.
- Type-only imports (`import type`).

## Reglas

### Tipos

- `type` por defecto; `interface` solo cuando se busca extensión declarativa.
- Preferí uniones de literales a `enum`.
- Derivá tipos de la fuente: `z.infer<typeof schema>`, `ReturnType<...>`.
- Sin casts (`as`) salvo justificación; nunca `as any`.

### Validación en bordes

- Todo input externo (HTTP, forms, env, respuestas de terceros) se valida con el validador del kit (`engineering.validation`, default **Zod**).
- Alternativas documentadas: `valibot`, `arktype`, `none`. Cambiar de validador es editar el config y reemplazar los schemas; no cambia la arquitectura.
- Los schemas viven junto al borde que validan (`schemas.ts`), y el tipo se infiere del schema.
- `lib/env.ts` valida las variables de entorno al arrancar.

### Errores

- Errores tipados por dominio (`AppError` con `code` + `message`).
- No usar excepciones para flujo normal.
- `catch` recibe `unknown`; siempre estrechar antes de usar.

### Naming

- `PascalCase` para tipos y componentes, `camelCase` para variables/funciones.
- Booleanos con prefijo `is`/`has`/`can`.
- Nada de abreviaturas crípticas.

## Cómo afecta al scaffold

- `tsconfig.json` con los flags estrictos del kit.
- `lib/env.ts` y `lib/errors.ts` base.

## Checklist

- [ ] `tsc --noEmit` limpio.
- [ ] Cero `any` y cero `as any`.
- [ ] Todo input externo pasa por Zod.
