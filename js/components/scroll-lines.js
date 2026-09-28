/**
 * Scroll lines — spines FIXÉS viewport (courbes soft + trails).
 * Géométrie viewport ; durée draw = hauteur page (auto, pins inclus).
 * Peer: GSAP + ScrollTrigger. Cleanup via ctx.revert().
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Variantes : amplitude horizontale + phase (ribbons étirés, peu d’ondulations).
 * @type {{ start: number, amp: number, phase: number }[]}
 */
const SPINE_VARIANTS = [
  { start: 0.32, amp: 0.48, phase: 0 },
  { start: 0.2, amp: 0.36, phase: 0.55 },
  { start: 0.7, amp: 0.4, phase: 1.15 },
];

/**
 * Course de scroll réelle (page − viewport), pins inclus.
 * @returns {number}
 */
function getDocScrollMax() {
  const doc = document.documentElement;
  const body = document.body;
  const height = Math.max(
    doc.scrollHeight,
    body?.scrollHeight || 0,
    doc.offsetHeight,
    body?.offsetHeight || 0
  );
  return Math.max(height - window.innerHeight, 1);
}

/**
 * @returns {{ w: number, h: number, pageH: number, viewports: number }}
 */
function layoutMetrics() {
  const w = Math.max(window.innerWidth, 320);
  const h = Math.max(window.innerHeight, 480);
  const pageH = Math.max(
    document.documentElement.scrollHeight,
    document.body?.scrollHeight || 0,
    h
  );
  return { w, h, pageH, viewports: Math.max(pageH / h, 1) };
}

/**
 * Ribbon lisse (cubiques) — arrondis, pas d’angles vifs.
 * @param {number} w
 * @param {number} h
 * @param {number} viewports
 * @param {number} variantIndex
 * @returns {string}
 */
function buildSmoothPath(w, h, viewports, variantIndex) {
  const v = SPINE_VARIANTS[variantIndex % SPINE_VARIANTS.length];
  // Peu d’ondes → courbes longues / étirées (pas « écrasées »)
  const waves = Math.max(2, Math.min(4, Math.round(1.5 + viewports * 0.22)));

  const center = w * v.start;
  const amp = w * v.amp;
  const pad = 20;

  /** @param {number} t 0→1 */
  const xAt = (t) => {
    const wave = Math.sin(t * Math.PI * waves + v.phase);
    // Envelope douce, amplitude dominante pour étirer en largeur
    const envelope = 0.55 + 0.45 * Math.sin(t * Math.PI);
    return Math.min(w - pad, Math.max(pad, center + amp * wave * envelope));
  };

  // Moins de steps = segments plus longs, virages plus amples
  const steps = Math.max(waves * 2, 4);
  let prevX = xAt(0);
  let prevY = 0;
  let d = `M${prevX.toFixed(1)} 0`;

  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps;
    const y = t * h;
    const x = xAt(t);
    // Contrôle plus bas / haut pour des arcs allongés (moins « serrés »)
    const pull = (y - prevY) * 0.62;
    const c1y = prevY + pull;
    const c2y = y - pull;
    d += ` C${prevX.toFixed(1)} ${c1y.toFixed(1)}, ${x.toFixed(1)} ${c2y.toFixed(1)}, ${x.toFixed(1)} ${y.toFixed(1)}`;
    prevX = x;
    prevY = y;
  }

  return d;
}

/**
 * @param {SVGPathElement} path
 * @returns {number}
 */
function prepDrawPath(path) {
  if (!path || typeof path.getTotalLength !== "function") return 0;
  let length = 0;
  try {
    length = path.getTotalLength();
  } catch {
    return 0;
  }
  if (!length || !Number.isFinite(length)) return 0;

  path.setAttribute("stroke-dasharray", String(length));
  path.setAttribute("stroke-dashoffset", String(length));
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  return length;
}

/**
 * Adapte le SVG au viewport ; sync `d` sur chaque paire trait + trail.
 * @param {SVGSVGElement} svg
 * @param {SVGPathElement[]} paths
 */
function layoutSpineSvg(svg, paths) {
  const { w, h, viewports } = layoutMetrics();

  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("width", String(w));
  svg.setAttribute("height", String(h));
  svg.setAttribute("preserveAspectRatio", "none");

  /** @type {Map<string, string>} */
  const dByKey = new Map();

  paths.forEach((path) => {
    const key = path.getAttribute("data-spine") || path.className?.baseVal || "default";
    if (!dByKey.has(key)) {
      const idx = ["a", "b", "c"].indexOf(key);
      dByKey.set(key, buildSmoothPath(w, h, viewports, idx >= 0 ? idx : dByKey.size));
    }
    path.setAttribute("d", dByKey.get(key));
  });
}

/**
 * Scrub draw sur un path (trail = scrub plus lent = sillage).
 * @param {SVGPathElement} path
 * @param {number} scrub
 */
function scrubSpinePath(path, scrub) {
  prepDrawPath(path);

  gsap.fromTo(
    path,
    {
      strokeDashoffset: () => prepDrawPath(path) || 0,
    },
    {
      strokeDashoffset: 0,
      ease: "none",
      immediateRender: true,
      scrollTrigger: {
        start: 0,
        end: () => getDocScrollMax(),
        scrub,
        invalidateOnRefresh: true,
      },
    }
  );
}

/**
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initScrollLines(root = document) {
  ensureGsapPlugins();
  if (prefersReducedMotion()) return () => {};

  const wrap = root.querySelector(".c-scroll-lines__spine-wrap");
  const svg = wrap?.querySelector(".c-scroll-lines__spine");
  const spinePaths = gsap.utils.toArray(root.querySelectorAll("[data-draw-spine]"));

  if (!wrap || !svg || spinePaths.length === 0) return () => {};

  let removeRefreshInit = () => {};

  const ctx = gsap.context(() => {
    layoutSpineSvg(svg, spinePaths);

    const onRefreshInit = () => layoutSpineSvg(svg, spinePaths);
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
    removeRefreshInit = () => {
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
    };

    spinePaths.forEach((path) => {
      const isTrail = path.hasAttribute("data-spine-trail");
      // Trail un peu en retard → sillage soft derrière le trait net
      scrubSpinePath(path, isTrail ? 0.55 : 0.2);
    });
    // Resize → refresh global via main.js (bindScrollTriggerResizeRefresh)
  }, root);

  return () => {
    removeRefreshInit();
    ctx.revert();
  };
}

/**
 * Marquee horizontal scrubbé au scroll.
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initMarquee(root = document) {
  ensureGsapPlugins();
  const strip = root.querySelector(".c-marquee, .marquee-strip");
  if (!strip) return () => {};
  if (prefersReducedMotion()) return () => {};

  const track = strip.querySelector(".marquee-track");
  if (!track) return () => {};

  const ctx = gsap.context(() => {
    const distance = () => Math.max(track.scrollWidth - strip.clientWidth, 200);

    gsap.fromTo(
      track,
      { x: 0 },
      {
        x: () => -distance() * 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: strip,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );
  }, root);

  return () => ctx.revert();
}
