---
name: scroll-landing
description: Construye una landing con experiencia de scroll (video/frames scrubbed por scroll, estilo Apple) sin costos, usando video stock o propio y ffmpeg. Usalo cuando el usuario pida "landing con scroll", "efecto scroll video", "landing tipo Apple/scroll-world", o una landing de conversion con esa experiencia.
license: MIT
compatibility: opencode
metadata:
  bloque: landing-track
  default: image-sequence
  assets: free
---

# Landing con scroll

## Qué es (y qué NO)

El efecto es **técnica, no IA**: una sección pinneada dibuja en un canvas el frame que corresponde al scroll. **Es gratis.** Lo único pago es *generar el video con IA*; nosotros usamos video stock o propio.

## Pipeline gratis

1. Conseguí un video corto (stock libre o propio). Fuentes: Pexels, Pixabay, Mixkit, Coverr (revisá licencia).
2. Extraé frames:
   ```bash
   node scripts/frames.mjs --input video.mp4 --out public/sequence --fps 24 --width 1280
   ```
3. Montá la secuencia: `scrub-image-sequence.js` (vanilla) o `ScrollSequence.tsx` (Next).
4. Verificá build, LCP y `prefers-reduced-motion`.

- **Alternativa sin video**: escena WebGL (Three.js) con assets CC0.
- **Multi-clip con vuelo continuo** (escenas AI + camera flights): ver `kit/scaffold/landing/vendor/README.md` — es pago y opcional.

## Estructura de la página

- **Hero**: titular (resultado + audiencia), subtítulo, CTA primario, una prueba. **Acá vive la secuencia de scroll.**
- Problema → solución, 3-5 beneficios (resultado), cómo funciona (3 pasos), prueba social, FAQ, CTA final.
- Una oferta, una audiencia, **una** acción. Sin CTAs que compiten arriba del fold.

## Sistema visual (resumen)

- Tipografía: Geist / Manrope / Poppins (no Inter/Roboto/Arial); sin itálicas; sin ultra-bold; un solo tipo de fuente.
- Escala: usá pasos de Tailwind, nada de tamaños arbitrarios.
- Espaciado: solo la escala del sistema (0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96).
- Motion: cubic-bezier custom (`cubic-bezier(0.32,0.72,0,1)`); reveals con `IntersectionObserver`; **nunca** `window.addEventListener('scroll')` sin `rAF`.
- Fondo plano; el único gradiente permitido es en el texto del hero.
- Contenido real: sin lorem, sin marcas "Acme", sin números redondos, sin clichés ("elevate", "seamless", "unleash").
- Estados: hover / active / focus / loading / empty / error. Alt en imágenes. 404, legales, meta y OG.

## Reglas

- 100-200 frames WebP del mismo tamaño; preload en dos pasadas; DPR cap 2.
- `prefers-reduced-motion` cae a un frame representativo (ya implementado en el motor).
- LCP < 2.5s (ver `performance`); los frames no deben bloquear el hero.
- Copy a `@copywriter`; pantallas a `@ux-designer`; a11y con el skill `accessibility`.
- Deploy con el flujo del proyecto (`/release` o preview de Vercel).

## Salida

Landing construida y desplegada (o preview) + verificación de a11y y performance. Es un **track propio**: no requiere `/new-startup`.
