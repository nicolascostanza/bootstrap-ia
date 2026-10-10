---
name: onboarding-activation
description: Disena la primera experiencia del usuario para llevarlo al "aha moment" rapido (signup sin friccion, primera accion de valor, emails de activacion). Usalo al definir el onboarding, mejorar la activacion o evitar que los usuarios se pierdan en la primera sesion.
license: MIT
compatibility: opencode
metadata:
  bloque: B13
---

# Onboarding y activación

## Objetivo

Llevar al usuario nuevo al **"aha moment"** en la primera sesión, con la menor fricción posible.

## Principios

1. **Time-to-value mínimo**: el usuario debe ver valor en los primeros minutos.
2. **Signup sin fricción**: Google + email magic link. Pedir el mínimo de datos.
3. **Primera acción guiada**: un solo objetivo claro, no un tour de features.
4. **Empty states que enseñan**: cada pantalla vacía explica qué hacer.
5. **Datos de ejemplo**: permitir explorar sin configurar todo primero.

## Pasos del flujo

| # | Paso | Fricción a eliminar |
|---|---|---|
| 1 | Llegada/registro | Máxima facilidad (social login) |
| 2 | Primera acción de valor | Prellenado, ejemplo, guía |
| 3 | "Aha moment" | Confirmación visible del logro |
| 4 | Retorno | Notificación/email con el próximo paso |

## Emails de activación

- **Inmediato**: bienvenida + primera acción (un link, un objetivo).
- **Día 1**: cómo lograr el resultado.
- **Día 3**: caso de uso real / prueba social.
- **Día 7**: recordatorio del valor no descubierto.

## Reglas

- Instrumentar todo el funnel (ver `metrics-activation`); sin datos no se optimiza.
- Un objetivo por sesión; no pedir configuración antes del primer valor.
- Medir el tiempo hasta el "aha moment" y reducirlo iterativamente.
- No bloquear el producto con un tour obligatorio.
- Copy del onboarding a cargo de `@copywriter`; pantallas a `@ux-designer`.

## Checklist

- [ ] Signup con Google o magic link.
- [ ] Primera acción clara en menos de 2 minutos.
- [ ] Empty states con CTA.
- [ ] Emails de activación disparados.
- [ ] Evento de activación instrumentado.
