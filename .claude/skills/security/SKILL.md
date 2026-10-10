---
name: security
description: Estandares de seguridad del kit (secretos, autorizacion, validacion, OWASP basico, rate limiting, webhooks, dependencias). Usalo al implementar auth, permisos, endpoints, manejo de secretos o al revisar vulnerabilidades.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  baseline: owasp-top-10
---

# Seguridad — convenciones

## Reglas

### Secretos

- Solo en `.env` (nunca commiteado). En configs: `{env:VAR}`.
- Cero secretos con prefijo `NEXT_PUBLIC_`; cero secretos en logs, errores o respuestas.
- Rotar cualquier secreto expuesto; auditar `.gitignore` antes del primer push.
- Validar env al arrancar (`lib/env.ts`) para fallar temprano.

### Autenticacion y autorizacion

- Toda ruta/action verifica sesión **en el servidor** antes de la lógica.
- Autorización por recurso (¿este usuario puede tocar este recurso?), no solo "está logueado".
- RLS en Postgres como segunda capa cuando aplique.
- Sesiones con expiración; logout invalida sesión.

### Entradas y salidas

- Todo input externo validado con Zod (HTTP, forms, webhooks, terceros).
- Escapar/sanitizar contenido de usuario antes de renderizar; nunca `dangerouslySetInnerHTML` con datos sin sanitizar.
- Consultas parametrizadas (Drizzle); cero concatenación de SQL.

### Bordes del sistema

- Webhooks: verificar firma **siempre**.
- Rate limiting en auth, email, acciones públicas y costosas.
- CORS explícito y restrictivo.
- Timeouts y límites de tamaño en cargas.

### Dependencias y headers

- `pnpm audit` en CI; actualizar vulnerabilidades críticas.
- Headers de seguridad: CSP, HSTS, X-Content-Type-Options, Referrer-Policy.
- No loguear PII innecesaria.

## Cómo afecta al scaffold

- `lib/env.ts`, `lib/rate-limit.ts`, helpers de autorización, headers en `next.config.ts`, y `pnpm audit` en CI.

## Checklist

- [ ] Sin secretos en el repo ni en logs.
- [ ] Auth + permisos por recurso en el servidor.
- [ ] Inputs validados y consultas parametrizadas.
- [ ] Firma de webhooks verificada.
- [ ] Rate limit en endpoints sensibles.
