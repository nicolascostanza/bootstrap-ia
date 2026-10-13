export { createSdk } from "./client";
export type { Sdk, SdkOptions } from "./client";

// src/generated/ se produce con `pnpm --filter @org/sdk generate`
// (openapi-ts sobre openapi/openapi.yaml). Re-exportá los modelos acá.
