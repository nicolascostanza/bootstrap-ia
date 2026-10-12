# Landing con scroll (secuencia de frames)

Experiencia de scroll scrubbed (estilo Apple) **sin costos**: un video → frames WebP → canvas. Sin IA de video.

## Pipeline gratis

1. Conseguí un video corto (stock libre o propio). Fuentes: Pexels, Pixabay, Mixkit, Coverr (revisá la licencia).
2. Extraé frames:
   ```bash
   node scripts/frames.mjs --input video.mp4 --out public/sequence --fps 24 --width 1280 --format webp
   ```
   Requiere `ffmpeg` (Windows: `winget install Gyan.FFmpeg` · macOS: `brew install ffmpeg` · Linux: `apt install ffmpeg`).
3. Copiá `scrub-image-sequence.js` al proyecto y montá la sección.
4. Verificá build, LCP y `prefers-reduced-motion`.

## Archivos

| Archivo | Qué es |
|---|---|
| `scrub-image-sequence.js` | Motor vanilla (canvas + image sequence), zero deps |
| `ScrollSequence.tsx` | Wrapper para Next.js (App Router, client component) |
| `index.html` | Demo standalone |

## Uso en Next.js

```tsx
import { ScrollSequence } from "@/components/landing/ScrollSequence";

const frameSrc = (i: number) => `/sequence/frame-${String(i + 1).padStart(4, "0")}.webp`;

export function Hero() {
  return <ScrollSequence frameCount={120} frameSrc={frameSrc} travel={3} alt="Producto girando" />;
}
```

`travel` = cuántas pantallas de scroll dura la secuencia.

## Reglas

- 100-200 frames WebP del mismo tamaño; el motor preloadea en dos pasadas (gruesa, después fina).
- `prefers-reduced-motion` cae a **un frame representativo** (ya implementado), sin pin ni video.
- No uses `window.addEventListener('scroll')` sin `rAF` (el motor ya lo hace).
- `alt` real en el fallback (el canvas es decorativo).
- DPR cap 2 para no reventar memoria en pantallas 3x.
- Video sin audio y con keyframes densos; para clips largos, considerá scrubbing de video en vez de frames.

## Multi-clip con vuelo continuo (pago, opcional)

Para el efecto "vuelo por un mundo" (escenas AI + camera flights, tipo `scroll-world`), ver `vendor/README.md`. Ese pipeline genera los clips con IA y **cuesta**; el default de acá es gratis.
