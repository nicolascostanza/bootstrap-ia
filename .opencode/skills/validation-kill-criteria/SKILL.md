---
name: validation-kill-criteria
description: Define hipotesis falsables, criterios de muerte y timebox por idea para decidir rapido si pivotar o matar. Usalo al arrancar una idea, al definir apuestas, o cuando haya que decidir si seguir invirtiendo en algo que no tracciona.
license: MIT
compatibility: opencode
metadata:
  bloque: B13
---

# Validación y criterios de muerte

## Regla

Toda idea arranca con **hipótesis falsables**, **criterios de muerte** y un **timebox** definidos **antes** de construir. Sin excepciones emocionales.

## Definir una apuesta

```
Apuesta: <qué creemos>
Hipótesis falsable: <si X entonces Y, medido como Z>
Métrica: <una sola>
Umbral de éxito: <número + plazo>
Timebox: <fecha límite>
Costo máximo: <tiempo/dinero>
```

- "Falsable" = existe un resultado observable que la refuta.
- Si no se puede medir en el timebox, la hipótesis está mal formulada.

## Criterios de muerte

- Si en `<tiempo>` no se alcanza `<métrica>`, se **mata o pivotea**. Sin matices.
- Anotar la decisión y el motivo en `docs/validation.md`.

## Señales de que hay que matar/pivotear

- Los usuarios no vuelven (retención plana/cayendo).
- La activación no llega al umbral aunque el canal funciona.
- Nadie paga (disposición a pagar = 0 en entrevistas).
- El costo de adquisición supera el valor del cliente y no mejora.

## Reglas

- El fundador que define el criterio cuando está entusiasmado es el que debe respetarlo cuando está desanimado.
- Pivotar ≠ fracasar; seguir por inercia sin criterios, sí.
- Registrar aprendizajes aunque se mate la idea: el siguiente intento sale mejor.
- Nunca mover el timebox sin una razón nueva **y** registrada.

## Salida

`docs/validation.md` con apuestas, criterios de muerte y bitácora de aprendizajes.
