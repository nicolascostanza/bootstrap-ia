---
name: observability
description: Estandares de observabilidad del kit (errores con Sentry, logs con Axiom, uptime con Better Stack, logging estructurado, correlacion, alertas de negocio). Usalo al instrumentar errores, logs, alertas o al definir que se monitorea en produccion.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: sentry+axiom+better-stack
  adapter: lib/observability, lib/logger
---

# Observabilidad — convenciones

## Default

- **Errores**: Sentry. **Logs**: Axiom. **Uptime/status**: Better Stack.
- Detrás de adapters (`lib/observability`, `lib/logger`) para poder swappear.

## Reglas

### Errores

- Capturar en los **error boundaries** de Next y en el servidor (route handlers/actions).
- Todo error reportado lleva contexto: usuario (id, no PII), ruta, acción, request-id.
- No reportar errores esperados (validación) como excepciones; sí los inesperados.
- Source maps habilitados en producción.

### Logs

- **Estructurados** (JSON), con niveles (`debug`, `info`, `warn`, `error`).
- Campos fijos: `level`, `msg`, `requestId`, `userId`, `route`, `durationMs`.
- **Nunca** loguear secretos, tokens, PII ni cuerpos completos de request.
- Producción: `info` hacia arriba; `debug` solo en desarrollo.

### Trazabilidad

- `requestId` generado por request y propagado (logs + errores + respuestas).
- Medir duración de operaciones clave (queries lentas, llamadas externas).

### Uptime y negocio

- Uptime monitor en la ruta crítica (`/api/health`) cada 1-3 min.
- Status page pública si el producto lo amerita.
- Alertas de negocio: caída de activaciones, errores de pago, picos de 5xx.

### Alertas

- Alertas por **síntoma** (los usuarios no pueden pagar), no por causa aislada.
- Toda alerta tiene dueño y runbook (qué hacer cuando suena).

## Cómo afecta al scaffold

- `lib/logger.ts`, `lib/observability.ts`, `instrumentation.ts`, `/api/health`, config de Sentry y variables de entorno documentadas.

## Checklist

- [ ] Errores de servidor y cliente capturados con contexto.
- [ ] Logs estructurados sin PII.
- [ ] `requestId` propagado.
- [ ] Uptime monitor activo.
- [ ] Alertas con runbook.
