# Archivos base de scaffold

Archivos que se copian al proyecto de cada startup durante `/scaffold`, **después** de generar la app con los CLIs reales.

## Contenido

| Archivo | Qué resuelve |
|---|---|
| `.env.example` | Claves de entorno esperadas (sin valores) |
| `lib/env.ts` | Validación de env con Zod al arrancar |
| `lib/errors.ts` | `AppError` tipado con códigos y status |
| `lib/logger.ts` | Logger estructurado en JSON |
| `lib/http.ts` | Respuestas `ok`/`fail` con forma estándar |
| `lib/adapters/email.ts` | Implementación **de referencia** del patrón adapter |

> `lib/env.ts` requiere el validador del kit (`engineering.validation`, default Zod): instalalo con `pnpm add zod` antes de copiar estos archivos.

## Patrón adapter (aplicar al resto)

Cada proveedor externo vive detrás de una interfaz fina y una fábrica que elige implementación según env:

```
interface XAdapter { ...metodos... }
function createXAdapter(): XAdapter {
  if (serverEnv.X_KEY) return createRealAdapter(serverEnv.X_KEY);
  return createDevAdapter();
}
```

Adapters previstos (borde de swap): `email`, `messaging`, `auth`, `otp`, `payments`, `analytics`, `logger`, `observability`, `flags`, `jobs`.

- Interfaz **mínima** (solo lo que la app usa).
- Implementación dev que loguea (sin costo, sin red) para que el MVP funcione sin cuentas.
- Implementación real solo cuando la env está presente.
- Cambiar de proveedor = agregar una implementación, no tocar la app.

## Uso

El skill `nextjs-postgres-scaffold` indica cuándo copiar estos archivos. En instalación global están en `~/.config/opencode/kit/scaffold/`.
