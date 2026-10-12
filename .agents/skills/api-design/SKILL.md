---
name: api-design
description: Estandares de API del kit (Server Actions, route handlers, validacion con Zod, formato de errores, idempotencia, rate limiting). Usalo al crear endpoints, webhooks, server actions o al definir contratos entre frontend y backend.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: server-actions+route-handlers
---

# API — convenciones

## Default

- Mutaciones internas: **Server Actions**.
- Endpoints HTTP (webhooks, API pública, integraciones): **Route Handlers** en `app/api/`.
- Validación de entrada/salida con el validador del kit (`engineering.validation`, default **Zod**).

## Reglas

### Contrato

- Todo input se valida con Zod **antes** de tocar lógica. Si falla: 400 con detalle por campo.
- Toda salida tiene forma estable. Éxito: `{ data }`. Error: `{ error: { code, message, details? } }`.
- Códigos: `400` input inválido, `401` sin sesión, `403` sin permiso, `404` no existe, `409` conflicto, `429` rate limit, `500` error inesperado.
- Nunca exponer stack traces ni mensajes internos al cliente.

### Server Actions

- En `actions.ts` del dominio, con `"use server"`.
- Toda action: validar input → verificar sesión/permisos → llamar al service → `revalidatePath`/`revalidateTag`.
- Retornan resultado tipado; no lanzan errores crudos al cliente.

### Route Handlers

- Autenticación explícita al inicio del handler.
- Idempotencia en operaciones repetibles (webhooks): clave de idempotencia o chequeo de estado.
- Webhooks: verificar firma **siempre** antes de procesar.

### Rate limiting

- Todo endpoint público y toda action de auth/email: rate limit por IP/usuario.
- Respuesta `429` con `Retry-After`.

### Versionado

- API pública con prefijo `/api/v1/`. Cambios rompientes = nueva versión.

## Cómo afecta al scaffold

- Crea `lib/http.ts` (helpers de respuesta), `lib/rate-limit.ts` y un ejemplo de action + handler.
- La spec (`docs/specs/<feature>.md`) documenta el contrato por feature.

## Checklist

- [ ] Input validado con Zod.
- [ ] Auth verificada antes de la lógica.
- [ ] Errores con forma estándar y sin filtrar internos.
- [ ] Rate limit en endpoints sensibles.
