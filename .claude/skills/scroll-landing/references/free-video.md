# Video gratis para landings con scroll

Tres caminos para conseguir el video (o frames) sin pagar. **Default: stock primero** (rápido, cero riesgo de licencia).

> Verificá siempre la **licencia comercial** y el **watermark** antes de publicar una landing real. Los free de Luma y Pika son **NO comerciales**.

## 1. Stock (un clip continuo) — default

Un flythrough continuo (drone/aéreo/dolly) alcanza el 80% del efecto sin IA.

| Sitio | Sin crédito | Comercial | Nota |
|---|---|---|---|
| Pexels | Sí | Sí | 6.000+ clips de drone |
| Pixabay | Sí | Sí | 240.000+ clips |
| Mixkit | Sí | Por clip | 2.710 aerial / 563 drone, sin watermark |
| Coverr | Sí | Sí | Prohíbe reventa y **entrenamiento de IA** |
| Videvo / Mazwai | Algunos | Sí | Licencias mixtas (a veces requieren crédito) |
| Vecteezy | No | Condicional | Crédito + tope de presupuesto $1.000 |

Ninguna licencia permite **revender** el clip. Si hay personas/marcas, revisá **model/property release**.

## 2. AI gratis (image→video con first/last-frame)

Para el efecto bespoke (dives + conectores). Lo clave es **first/last-frame** para empalmar sin corte.

| Herramienta | Free | Watermark | Comercial | First/Last frame |
|---|---|---|---|---|
| **Hailuo (MiniMax)** | generaciones/día (cola) | Sin marca (según pruebas) | Sí | Sí |
| **Kling AI** | ~66 créditos/día | Sin marca en i2v | **Sí** | **Sí** |
| **Krea** | 10 créditos/día | Depende | Depende | vía modelo (comparar Kling/Hailuo/Wan/Luma) |
| **PixVerse** | ~30-60/día | Sin marca visible | Verificar | — |
| Pika | créditos (a veces 0) | — | **No** en free | Sí |
| Luma | ~30/mes | Marca | **No** en free | Sí |
| Runway free | 125 una vez (~2-3 videos) | Marca | Sí | Sí |

## 3. Local (100% gratis, requiere GPU) — mención

Open-source vía **ComfyUI** o **Hugging Face Spaces**:

- **Wan 2.2** — Apache 2.0, corre desde 8 GB VRAM. La opción más segura/licenciable.
- **LTX‑2.5** — ComfyUI, audio nativo, 16-32 GB VRAM, soporta first/last-frame (FLF2V).
- **HunyuanVideo 1.5** (~14 GB) · **CogVideoX** · **Mochi 1** · **Stable Video Diffusion**.

## Recomendación por caso

| Caso | Camino |
|---|---|
| Rápido, gratis, cero riesgo | Stock (clip continuo) → `frames.mjs` → scrub |
| Bespoke tipo "mundo" | Hailuo o Kling (i2v + first/last-frame) → dives + conectores |
| Sin nube, con GPU | Wan 2.2 local (ComfyUI) |
| Probar modelos | Krea |

## Nota sobre opencode-go

Los modelos de opencode-go son **LLMs** (texto/código); `deepseek-v4-flash-vision-exp` **entiende** imágenes (input) pero **no genera** imagen ni video. La generación vive fuera del agente; el kit procesa el resultado (frames + scrub).
