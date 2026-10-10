---
name: prd-writer
description: Escribe y mantiene PRDs del kit con criterios de aceptacion Given/When/Then, contrato tecnico y alcance explicito. Usalo al definir una feature, escribir una spec, derivar criterios de aceptacion o actualizar docs/prd.md.
license: MIT
compatibility: opencode
metadata:
  bloque: B7
  flujo: sdd-light+bdd-criteria
---

# PRD — cómo escribirlo

## Estructura por feature

```
## Feature: <nombre>

### Contexto
Por qué existe, para quién y qué resultado busca.

### Criterios de aceptación
Dado <contexto>
Cuando <acción>
Entonces <resultado observable>

### Contrato técnico
- Server Action / endpoint:
- Modelo de datos:
- Adapter involucrado:
- Eventos de analytics:

### Fuera de alcance
Lo que explícitamente NO entra.

### Tests derivados
Unit / Component / E2E (@critical o @full)
```

## Reglas

- **Un criterio = un test.** Si no se puede testear, el criterio está mal escrito.
- El criterio describe **comportamiento observable**, no implementación.
- Un PRD por feature; corto (una página). Los detalles técnicos van al ADR.
- Todo input externo listado en el contrato se valida con Zod (ver skill `api-design`).
- Incluí siempre el estado vacío/error/carga cuando la feature muestra datos (ver `styling-ui`).
- Marcá dependencias entre features y qué bloquea a qué.

## Antipatrones

- Criterios vagos ("funciona bien", "es rápido").
- Features sin resultado de negocio ni métrica.
- PRD que dicta la implementación en lugar del comportamiento.
- Alcance sin "fuera de alcance".

## Salida

`docs/prd.md` actualizado, backlog RICE en `docs/roadmap.md`, y los skills aplicables por feature.
