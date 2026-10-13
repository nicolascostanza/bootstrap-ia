# Spec OpenAPI

1. Poné el contrato del API en `openapi.yaml` (OpenAPI 3.1).
2. Generá el cliente TypeScript (sin Java):

   ```bash
   pnpm --filter @org/sdk generate
   ```

   Usa `@hey-api/openapi-ts` (`openapi-ts -i openapi/openapi.yaml -o src/generated`).

3. Re-exportá los modelos/tipos generados desde `src/index.ts`.

Opciones de generador: `@hey-api/openapi-ts` (TS, sin Java, default), `orval`, `kubb`, o
`openapi-generator`/`kiota` (si necesitás clientes en otros lenguajes).

El cliente base (`src/client.ts`) queda como wrapper fino sobre lo generado.
