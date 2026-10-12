# Vendor

Terceros con licencia permisiva, referenciados o adaptados por el kit.

## scroll-world (oso95) — MIT

Motor de scroll-scrubbed para **clips de video con vuelo continuo** (escenas AI + camera flights que se encadenan sin cortes). Referencia: <https://github.com/oso95/scroll-world> (MIT).

- **No** se incluye verbatim: su pipeline de assets es **pago** (Monid por clip, o créditos de Higgsfield).
- Nuestro motor por defecto (`../scrub-image-sequence.js`) cubre el caso **gratis**: un video stock/propio → frames WebP → canvas.
- Si algún día generás clips pagos, instalá su skill con:

  ```bash
  npx skills add oso95/scroll-world
  ```

La técnica de scrub (pinned section + canvas + `currentTime`/frame index por scroll) es de uso libre y es la base de nuestro motor.
