# Monetización mobile (stores / IAP)

`mobile.payments: stores`. En mobile, cobrar pasa por las tiendas (Apple/Google). Es distinto
de `library-monetization` (npm/Polar): acá el MoR son **Apple/Google**.

## Cómo cobrar

- **IAP nativo**: StoreKit 2 (iOS) + Google Play Billing (Android). Es lo que las tiendas **exigen** para contenido/servicios digitales dentro de la app.
- **RevenueCat** (recomendado): capa sobre StoreKit/Play Billing. Centraliza recibos, entitlements, webhooks y analítica. Evitá reimplementar la validación de recibos a mano.
- **Suscripciones** vs **pago único** vs **consumibles**: definí el modelo por producto.

## Comisiones

- Apple/Google: ~**15–30%** según volumen/suscripción.
- Reglas: no podés evadir el IAP para bienes digitales dentro de la app (hay excepciones limitadas según mercado/lector). Revisá las políticas vigentes antes de diseñar el paywall.

## Patrón en el kit

- Definí el borde como **adapter** (`payments`): la app habla con una interfaz; el adapter implementa StoreKit/Play/RevenueCat. Permite testear sin tienda.
- Entitlements/estado de suscripción validados en tu backend (webhooks de la tienda/RevenueCat), no solo en el cliente.

## Reglas

- **No reimplementes** la validación de recibos ni los impuestos: usá la tienda o RevenueCat.
- No loguear/trackear datos de pago.
- Gating: el estado "pro" se valida en servidor; el cliente solo refleja.
- Precio: probá suscripción anual con trial; barrera baja para activar.
