---
name: bootstrap-startup
description: Entrevista al founder y genera la configuracion, documentacion y roadmap de una startup nueva con enfoque de minimo delivery. Usalo cuando el usuario ejecute /new-startup, diga "arrancar una startup", "nueva idea", "bootstrap", "definir mi MVP", o quiera partir de cero vision, PRD, GTM, metas y defaults tecnicos.
license: MIT
compatibility: opencode
metadata:
  fase: B1
  modo: guided
---

# Bootstrap de startup

Define y documenta una startup nueva partiendo de defaults sensatos, dejando todo configurable y listo para scaffoldear.

## Cuando usar

Cuando el usuario quiere **arrancar una idea desde cero** o rehacer sus definiciones: visión, propuesta de valor, MVP, PRD, GTM, roadmap, métricas y decisiones técnicas.

## Modos

1. `quick` — acepta todos los defaults de `bootstrap.config.json` y genera todo sin preguntar salvo lo esencial (nombre, problema, ICP).
2. `guided` (default) — recorre las decisiones por área, mostrando el default y permitiendo cambiarlo.
3. `revisar` — re-ejecutable: lee `bootstrap.config.json` y `docs/` existentes, muestra las decisiones actuales y pregunta **solo** qué cambiar.

## Paso a paso

1. **Leer estado**: abrí `bootstrap.config.json` y `PROJECT_STATE.md` (si existen). No vuelvas a preguntar lo ya decidido.
2. **Entrevista** con la tool `question`. Agrupá así (en `quick` solo el grupo A):
   - **A. Negocio**: nombre, problema, cliente ideal (ICP), propuesta de valor, modelo de negocio, etapa.
   - **B. Stack**: package manager, styling, DB/ORM, auth, testing, layout (app única o split), hosting.
   - **C. Capacidades**: email, mensajería, analytics, observabilidad, pagos.
   - **D. Producto/GTM**: priorización, canales, posicionamiento, tono de marca.
   - **E. Legal/Finanzas**: jurisdicción, docs legales, pricing, facturación.
   - Mostrá siempre el default recomendado y permití aceptarlo sin fricción.
3. **Escribir config**: actualizá `bootstrap.config.json` con las respuestas (sin borrar claves existentes).
4. **Generar documentación** en `docs/`, con las secciones de `kit/docs-template/`:
   - `vision.md` — problema, ICP, propuesta de valor, hipótesis.
   - `prd.md` — alcance del MVP, criterios de aceptación Given/When/Then por feature.
   - `gtm.md` — posicionamiento, canales, mensajes, assets.
   - `design-brief.md` — dirección visual, componentes base, estados (loading/empty/error/success/offline).
   - `roadmap.md` — hitos y orden de ataque del MVP.
   - `metrics.md` — métrica norte, activación ("aha moment"), unit economics.
   - `validation.md` — hipótesis falsables y criterios de muerte con timebox.
   - `deliverability.md` — dominio, SPF/DKIM/DMARC, email de marca.
   - `finops.md` — límites de free tiers y alertas de gasto.
   - `onboarding.md` — primera experiencia y activación.
5. **Definir MVP**: listá features, cortá a lo esencial, y creá un backlog priorizado (RICE) con las tareas ordenadas.
6. **Seleccionar skills**: incluí en `docs/roadmap.md` los skills del kit aplicables a cada feature.
7. **Actualizar `PROJECT_STATE.md`**: estado, próximo paso y decisiones tomadas.
8. **Crear el repo de la startup** (preguntar antes): cada startup tiene su **propio** repo en GitHub; `bootstrap-ia` es solo el kit. Preguntá nombre y visibilidad (default privado) y ejecutá:
   - `git init -b main` si la carpeta todavía no es un repo.
   - `gh repo create <nombre> --private --source=. --remote=origin --push`.
   Si el usuario solo quiere los docs, salteá este paso.
9. **Cerrar**: mostrá un resumen de 5 líneas y proponé el siguiente paso (normalmente `/scaffold`).

## Reglas

- **No implementes código** en este flujo; solo definición, documentación y planificación.
- El kit `bootstrap-ia` **nunca** se usa como repo de la startup: cada startup crea su propio repo con su nombre.
- Nunca inventes datos del negocio: lo que falte va como `[PENDIENTE]` en el doc.
- Si el usuario cambia una tecnología, verificá que exista una alternativa documentada en `bootstrap.config.json`; si no, agregala como opción antes de aplicarla.
- Mantené todo coherente: cada decisión de `bootstrap.config.json` debe reflejarse en los docs.

## Salida esperada

- `bootstrap.config.json` actualizado.
- `docs/` con los 10 documentos.
- Backlog priorizado del MVP.
- `PROJECT_STATE.md` actualizado.
- Resumen + próximo paso.
