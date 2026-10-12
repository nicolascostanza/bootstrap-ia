/* mountImageSequence — motor de scroll scrubbed por image sequence (canvas)
   Tecnica estilo Apple: una seccion alta ("runway") con un stage sticky dibuja en un
   canvas el frame que corresponde al progreso de scroll. Zero deps, framework-agnostic.
   Basado en la tecnica de oso95/scroll-world (MIT) y CSS-Tricks/GSAP.
   Uso:
     mountImageSequence(document.getElementById('hero'), {
       frameCount: 120,
       frameSrc: (i) => `/sequence/frame-${String(i + 1).padStart(4, '0')}.webp`,
       travel: 3,      // multiplicador de vh de scroll para toda la secuencia
       hint: 'scroll',
     });
*/
function mountImageSequence(root, options) {
  if (!root) return () => {};
  const frameCount = options.frameCount || 0;
  if (!frameCount) return () => {};

  const el = (tag, cls) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    return node;
  };
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

  const frameSrc = options.frameSrc || ((i) => `frames/frame-${String(i + 1).padStart(4, "0")}.webp`);
  const travel = options.travel || 3;
  const hint = options.hint || "scroll";
  const fallbackFrame = options.fallbackFrame ?? Math.floor((frameCount - 1) * 0.5);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  injectCSS();
  root.classList.add("si-root");

  const stage = el("div", "si-stage");
  const canvas = el("canvas", "si-canvas");
  const fallback = el("img", "si-fallback");
  fallback.alt = options.alt || "";
  fallback.decoding = "async";
  fallback.loading = "eager";
  fallback.src = frameSrc(fallbackFrame);
  const hintEl = el("div", "si-hint");
  hintEl.textContent = hint;
  stage.append(canvas, fallback, hintEl);
  root.append(stage);

  const ctx = canvas.getContext("2d", { alpha: false });
  const images = new Array(frameCount);
  let drawn = -1;
  let ticking = false;

  function sizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(stage.clientWidth * dpr));
    const h = Math.max(1, Math.round(stage.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      drawn = -1;
    }
  }

  function loadFrame(i) {
    if (i < 0 || i >= frameCount || images[i]) return;
    const img = new Image();
    img.decoding = "async";
    img.src = frameSrc(i);
    img.onload = () => {
      images[i] = img;
      if (i === 0) stage.classList.add("si-ready");
    };
  }

  function nearestLoaded(target) {
    for (let d = 1; d < frameCount; d += 1) {
      if (images[target - d]) return target - d;
      if (images[target + d]) return target + d;
    }
    return 0;
  }

  function drawFrame(i) {
    if (i === drawn) return;
    const img = images[i] || images[nearestLoaded(i)];
    if (!img) return;
    const { width, height } = canvas;
    const scale = Math.max(width / img.width, height / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
    drawn = i;
    fallback.classList.add("si-hidden");
  }

  function preload() {
    const step = 8;
    for (let i = 0; i < frameCount; i += step) loadFrame(i);
    if (reduce) return;
    const rest = [];
    for (let i = 0; i < frameCount; i += 1) if (i % step !== 0) rest.push(i);
    let k = 0;
    const pump = () => {
      const upto = Math.min(k + 6, rest.length);
      for (; k < upto; k += 1) loadFrame(rest[k]);
      if (k < rest.length) window.setTimeout(pump, 40);
    };
    window.setTimeout(pump, 120);
  }

  function progress() {
    const rect = root.getBoundingClientRect();
    const total = root.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    return clamp(-rect.top / total, 0, 1);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const p = progress();
      drawFrame(Math.round(p * (frameCount - 1)));
      hintEl.style.opacity = String(clamp(1 - p * 4));
      ticking = false;
    });
  }

  function onResize() {
    if (reduce) return;
    sizeCanvas();
    drawn = -1;
    onScroll();
  }

  if (reduce) {
    root.classList.add("si-reduced");
    root.style.height = "100vh";
    const paint = () => {
      sizeCanvas();
      drawFrame(fallbackFrame);
    };
    if (images[fallbackFrame]) paint();
    else {
      const tmp = new Image();
      tmp.onload = () => {
        images[fallbackFrame] = tmp;
        paint();
      };
      tmp.src = frameSrc(fallbackFrame);
    }
  } else {
    root.style.height = `${(travel + 1) * 100}vh`;
    sizeCanvas();
    preload();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
  }

  return function dispose() {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
  };
}

function injectCSS() {
  if (document.getElementById("si-css")) return;
  const style = document.createElement("style");
  style.id = "si-css";
  style.textContent = `
  .si-root{position:relative;background:var(--si-bg,#000);color:var(--si-ink,#fff);}
  .si-stage{position:sticky;top:0;height:100vh;overflow:hidden;}
  .si-canvas,.si-fallback{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
  .si-fallback{transition:opacity .4s ease;}
  .si-fallback.si-hidden{opacity:0;}
  .si-hint{position:absolute;left:50%;bottom:28px;transform:translateX(-50%);font:600 .74rem/1 ui-sans-serif,system-ui;letter-spacing:.16em;text-transform:uppercase;color:color-mix(in srgb,var(--si-ink,#fff) 70%,transparent);transition:opacity .3s;}
  .si-reduced .si-stage{position:relative;}
  `;
  document.head.appendChild(style);
}

if (typeof module !== "undefined" && module.exports) module.exports = { mountImageSequence };
if (typeof window !== "undefined") window.mountImageSequence = mountImageSequence;
