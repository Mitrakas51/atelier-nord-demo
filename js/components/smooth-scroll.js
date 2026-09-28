/**
 * Smooth scroll — Lenis syncé ticker GSAP / ScrollTrigger.
 * Desktop ≥992 ; skip reduced-motion / Lenis absent. Peer CDN Lenis.
 */
import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initSmoothScroll(root = document) {
  ensureGsapPlugins();
  if (prefersReducedMotion()) return () => {};
  if (typeof Lenis === "undefined") return () => {};

  const docEl =
    root === document || root === document.documentElement
      ? document.documentElement
      : null;

  const ctx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 992px)": () => {
        const lenis = new Lenis({
          autoRaf: false,
          duration: 1.1,
          smoothWheel: true,
          touchMultiplier: 1.5,
          anchors: true,
        });

        const onScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onScroll);

        const tick = (time) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        if (docEl) docEl.classList.add("has-lenis");

        return () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
          if (docEl) docEl.classList.remove("has-lenis");
        };
      },
    });
  }, root);

  return () => ctx.revert();
}
