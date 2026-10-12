---
name: landing
description: Crea una landing con experiencia de scroll (frames scrubbed) sin costos, a partir de un brief.
---

Objetivo de landing: `[argumentos del usuario]`

Track propio (no requiere `/new-startup`). Pasos:

1. Cargá el skill `scroll-landing`.
2. Intake (una sola tanda): oferta, acción primaria, ICP, objeciones, prueba, fuente de tráfico y tono.
3. Outline + copy: delegá el copy a `@copywriter` y las pantallas a `@ux-designer`.
4. Assets (**stock primero**, ver skill `scroll-landing` → `references/free-video.md`): stock (Pexels/Mixkit), AI gratis (Hailuo/Kling, i2v + first/last-frame) o local. Extraé frames con `node scripts/frames.mjs --input <video> --out public/sequence`.
5. Montá la secuencia (`ScrollSequence.tsx` o `scrub-image-sequence.js`) en el hero.
6. Verificá: `build`, LCP, `prefers-reduced-motion`, a11y (`@ui-reviewer`) y performance (skill `performance`).
7. Deploy de preview y resumen.

Si el proyecto no tiene app Next.js, decilo y ofrecé una landing mínima o usar `index.html` standalone.
