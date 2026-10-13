---
name: library-monetization
description: Define como cobrar una libreria o SDK (freemium, open-core, paid-only) con license keys y un MoR (Polar), incluyendo el gate online y el flujo de compra. Usalo al definir o implementar la monetizacion de una libreria.
license: MIT
compatibility: opencode
metadata:
  bloque: library-track
  default: freemium+polar
---

# Monetización de librerías

Guía completa en `references/monetization.md`.

## Modelos

- `freemium` (default): core **MIT gratis** + features **pro** gated por license key.
- `open-core`: core MIT + paquete **pro** privado/npm que lo extiende.
- `paid-only`: todo pago.

## Flujo

1. **Core gratis** en npm (genera awareness).
2. **Pro** detrás de `LIBRARY_LICENSE_KEY`.
3. **Polar** (MoR) emite y valida la key; su **webhook** avisa a tu API (guardás la licencia).
4. **Gate** (`licenseGate: online`): `requirePro()` valida **online con cache** (TTL).
5. **Offline** (upgrade): key **firmada** con pubkey embebida.

## Borde gratis / pago

- **Gratis** = lo que da awareness (1 proyecto, uso local, límites bajos).
- **Pago** = valor a escala (equipos, CI, cloud, límites altos, soporte).

## Reglas

- **No reimplementes** impuestos/licencias: usá un MoR (Polar/Creem/Lemon Squeezy).
- No loguear la license key ni mandarla a analytics.
- El **core no depende del pro**.
- Precio: one-time perpetual primero (barrera baja) → suscripción después.

## Salida

Modelo elegido en `library.monetization` + guía de implementación del gate.
