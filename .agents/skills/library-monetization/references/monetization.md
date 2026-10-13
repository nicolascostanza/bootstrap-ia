# Monetización de librerías — guía

## 1. Elegir el modelo

| Modelo | Qué es | Cuándo |
|---|---|---|
| **Freemium** (default) | Core gratis + pro gated por license key | Arrancar: adopción + cobro |
| **Open-core** | Core MIT + paquete pro privado | El pro es código real, no solo flags |
| **Paid-only** | Todo pago / gratis solo no-comercial | Nicho/enterprise |

**Borde gratis/pago:** gratis = awareness (1 proyecto, uso local, límites bajos); pago = valor a escala (equipos, CI, cloud, límites altos, soporte).

## 2. Cobrar con un MoR (Merchant of Record)

No reimplementes facturación global + impuestos. Un MoR emite y valida **license keys**:

| MoR | Fee | Notas |
|---|---|---|
| **Polar** ⭐ | 4% + $0.40 | Open source, dev-first, GitHub-native, license keys, paga a OSS |
| Creem | 3.9% + $0.40 | Más barato; 0% hasta €1.000; split con socios |
| Lemon Squeezy | 5% + $0.50 | License keys integradas; de Stripe (roadmap incierto) |
| Propio (Stripe/MP + API) | ~2.9% | Control, sin markup; vos manejás impuestos/licencias |

Todos **sin mensualidad**: solo fee por venta.

## 3. Flujo de compra y entrega

1. Usuario compra (checkout del MoR).
2. El MoR genera la **license key** → email al cliente + **webhook** a tu API.
3. Tu API guarda `{ key, email, tier, expiresAt }`.
4. El usuario setea `LIBRARY_LICENSE_KEY` en su proyecto.

## 4. Gate (validación)

| Opción | Pros | Contras |
|---|---|---|
| **Online (API MoR + cache)** ⭐ | Revocación fácil; poco código | Red en la 1ª validación; "phone home" |
| Offline (key firmada) | Sin red; sin telemetría | Revocación difícil (expiración corta + re-emisión) |
| Híbrido | Lo mejor de ambos | Más complejo |

`requirePro()` (esbozo):

```ts
export function requirePro(key = process.env.LIBRARY_LICENSE_KEY) {
  if (!key) throw new Error("Requiere licencia Pro: https://…/pricing");
  // online: validar con cache (TTL) contra la API del MoR; offline: verificar firma con pubkey
}
```

## 5. Pricing

- **One-time perpetual** primero (barrera baja, valida demanda) → **suscripción** después.
- Por **seat** (equipos) o **uso** (infra). Empezá con un tier pro simple.

## 6. Alternativa open-core

Paquete `@org/pro` **privado** (GitHub Packages) que importa `@org/core` (nunca al revés). Más control del código que el gating por runtime.
