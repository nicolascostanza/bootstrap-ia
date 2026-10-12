---
name: prd-writer
description: Escribe specs de feature del kit (una por feature en docs/specs/) con criterios de aceptacion Given/When/Then, contrato tecnico y alcance explicito, y mantiene el indice en docs/prd.md. Usalo al definir una feature, escribir una spec, derivar criterios de aceptacion o actualizar el indice de features.
license: MIT
compatibility: opencode
metadata:
  bloque: B7
  flujo: sdd-light+bdd-criteria
---

# Spec de feature — cómo escribirla

## Dónde va

- Una **spec por feature** en `docs/specs/<feature>.md` (plantilla `kit/docs-template/specs/_template.md`).
- `docs/prd.md` es el **índice**: alcance del MVP + tabla de features que linkea a cada spec.

## Estructura de la spec

- **Contexto**: por qué existe, para quién y qué resultado busca (link al roadmap).
- **Criterios de aceptación**: `Dado/Cuando/Entonces` (uno por criterio).
- **Contrato técnico**: Server Action / endpoint, modelo de datos, adapter, eventos de analytics.
- **Fuera de alcance**.
- **Tests derivados**: unit / component / E2E (`@critical` o `@full`).

## Reglas

- **Un criterio = un test.** Si no se puede testear, el criterio está mal escrito.
- El criterio describe **comportamiento observable**, no implementación.
- Una spec corta (una página). Los detalles de arquitectura van al ADR.
- Todo input externo se valida con el validador del kit (`engineering.validation`, default Zod).
- Incluí estados vacío/error/carga cuando la feature muestra datos (ver `styling-ui`).
- Al crear una spec, agregá su fila al índice en `docs/prd.md`.

## Antipatrones

- Criterios vagos ("funciona bien", "es rápido").
- Features sin resultado de negocio ni métrica.
- Spec que dicta la implementación en lugar del comportamiento.
- Alcance sin "fuera de alcance".
- Todas las features en `prd.md` (debe ser un índice, no una colección).

## Salida

`docs/specs/<feature>.md` + fila en el índice de `docs/prd.md` + backlog RICE en `docs/roadmap.md`.
