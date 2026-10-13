# Testing mobile

Reemplaza la parte Playwright del kit (web) por el equivalente mobile.

## Stack

- **Unit / componentes**: `jest-expo` + **React Native Testing Library (RNTL)**.
- **E2E**: **Maestro** (flujos en YAML). Alternativa: Detox (más pesado, nativo).

`mobile.testing: "jest-expo+rntl+maestro"`.

## Unit / componentes

```bash
pnpm add -D jest-expo jest @testing-library/react-native
```

- Consultá **por rol/texto** (igual que en web con RTL), no por implementación.
- `userEvent` de RNTL por encima de `fireEvent`.
- Mockeá solo los **bordes de red** (fetch, SDKs) — mismo principio que MSW en web (en RN, mocks de módulos o un server local).

## E2E (Maestro)

```bash
pnpm dlx maestro
maestro test .maestro/
```

Flujos en `.maestro/*.yaml`. Etiquetá por criticidad como en web: `@critical` (on-PR) y `@full` (nightly).

## Cobertura y a11y

- Cobertura objetivo del **dominio/servicios** (misma política del kit, ratchet).
- **a11y mobile**: `accessibilityLabel`/`accessibilityRole` en RN (ver skill `accessibility`); Probá con VoiceOver (iOS) / TalkBack (Android).

## CI

- Unit en cada PR (rápido).
- E2E Maestro: en emulador/simulador (o Maestro Cloud) — `@critical` en PR, `@full` nightly.

## Reglas

- Probá **comportamiento**, no implementación.
- Los tests de dominio no deberían necesitar simulador (aislalos).
- Un flujo Maestro = un journey crítico y estable; evitá pasos frágiles por coordenadas.
