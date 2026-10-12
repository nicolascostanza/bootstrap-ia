---
name: brainstorm
description: Espacio guiado de ideacion con feedback positivo y negativo (red-team) para refinar una idea o producto antes de construir: entrevista, benchmarks, scorecard y veredicto. Usalo cuando el usuario ejecute /brainstorm, diga "tengo una idea", "quiero validar esto", "pensemos el producto", o antes de /new-startup.
license: MIT
compatibility: opencode
metadata:
  bloque: refinement
  default: guided+adversarial
---

# Brainstorm guiado (con red-team)

Refiná una idea **antes** de definirla o construirla. Sale un documento aprobado, con fortalezas, riesgos, benchmarks y un veredicto.

## Cuándo usar / cuándo no

- **Usalo** para ideas nuevas, pivots o features grandes donde todavía no está claro *qué* ni *para quién*.
- **No lo uses** si todo lo que importa ya está definido: aplicá el triage y ofrecé pasar directo a `/new-startup`.

## Principios de conversación

1. **Una pregunta por mensaje.** Sin listas de opciones colgando (dirigen la respuesta).
2. **Primero describir, después proponer.** Menú de opciones solo si está trabado o dice "no sé".
3. **Playback por bloques** (~200-300 palabras) cada vez que entendés una parte; alterná playback con la siguiente pregunta.
4. **Marcá qué es suposición tuya** y qué dijo el usuario. Solo lo suyo entra como suyo.
5. **Opt-out**: en el primer mensaje avisá que si prefiere, salteás las preguntas y arrancás con defaults.
6. **Sin jerga de proceso.** Preguntas ancladas en lo concreto ("contame la última vez que…").
7. **Nunca inventes datos.** Lo que no se sabe va como `[VERIFICAR]`.

## Fases

### 1. Encuadre
Un mensaje: opt-out + **una** pregunta abierta, por ejemplo "¿cuál es el momento en que desearías que esto exista?".

### 2. Descubrimiento
Preguntas de a una, con playback. Territorio a cubrir (no leerlo como cuestionario):

- qué es y qué lo hace especial
- para quién es, y qué hace hoy sin esto
- por qué ahora
- qué significa éxito para el usuario
- goals / non-goals / **anti-goals** (qué lo haría fracasar aunque funcione)
- prior art: qué vio, qué amó, qué odió
- estado actual y qué intentó antes
- decisiones de stack que quiera tomar (el resto sale de `bootstrap.config.json`)

### 3. Recon (ofrecido, no impuesto)
Ofrecé investigar competencia y mercado con búsqueda web. Delegá a `@user-researcher`. Decí qué vas a mirar y esperá el OK.

### 4. Red-team + benchmarks
Delegá a `@skeptic` (subagente independiente). Debe devolver:

- **Fortalezas** honestas (no cumplidos).
- **Riesgos y objeciones**, priorizados por impacto.
- **Supuestos no validados** y el experimento más barato para cada uno.
- **Comparables y benchmarks** (3-5): qué hacen, pricing, señales de mercado.
- **Preguntas que el founder no se hizo.**

### 5. Scorecard + veredicto
Puntuá 1-5 con justificación breve:

| Dimensión | 1-5 |
|---|---|
| Severidad del problema | |
| Disposición a pagar | |
| Diferenciación / defensibilidad | |
| Factibilidad en el stack del kit | |
| Timing ("por qué ahora") | |
| Distribución sin presupuesto | |

**Veredicto**: `avanzar` / `ajustar` / `validar antes` / `matar`, con las 3 condiciones para pasar al bootstrap.

## Benchmarks y criterios para pasar

Definí métricas objetivo antes de arrancar, por ejemplo:

- N de entrevistas que confirman el dolor.
- Al menos 1 dispuesto a pagar.
- Comparables con métricas conocidas (churn, precio).

Enlazá con `validation-kill-criteria` (apuestas + criterios de muerte).

## HARD GATE

**Nada se construye ni se bootstrapea** hasta que la idea esté aprobada (documento o chat). Si el usuario decide seguir igual, registrá las objeciones aceptadas en `docs/idea.md` y seguí — pero que quede escrito.

## Red flags

| Pensamiento | Realidad |
|---|---|
| "Ofrezco opciones para ahorrarle esfuerzo" | Las opciones dirigen. Primero que describa. |
| "Relleno defaults sensatos" | Decílos en voz alta; un default que no escuchó es uno que no pudo rechazar. |
| "Dijo 'está bueno' sobre la idea" | Aprueba lo que vio. Una descripción no escrita no está aprobada. |
| "El score dio alto, listo" | El score orienta; la decisión es del fundador y queda escrita. |

## Salida

`docs/idea.md` (plantilla `kit/docs-template/idea.md`) + actualización de `docs/validation.md`. Cerrá ofreciendo `/new-startup`.
