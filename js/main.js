/**
 * Orchestration Atelier Nord (landing polish).
 * Smooth scroll (Lenis) d’abord, puis inits composants.
 * Scroll lines après les pins (work/precision) pour une course de draw juste.
 * Resize → ScrollTrigger.refresh (anti bugs pin / rails).
 * Deps CDN : GSAP + ScrollTrigger + Lenis avant ce module.
 */
import {
  bindScrollTriggerResizeRefresh,
} from "./components/motion-utils.js";
import { initSmoothScroll } from "./components/smooth-scroll.js";
import { initScrollLines, initMarquee } from "./components/scroll-lines.js";
import { initHero } from "./components/hero.js";
import { initApproach } from "./components/approach.js";
import { initShowcase } from "./components/showcase.js";
import { initWork } from "./components/work.js";
import { initPrecision } from "./components/precision.js";
import { initProcess } from "./components/process.js";
import { initContact } from "./components/contact.js";

const unbindResizeRefresh = bindScrollTriggerResizeRefresh();

const cleanups = [
  unbindResizeRefresh,
  initSmoothScroll(document),
  initMarquee(document),
  initHero(document),
  initApproach(document),
  initShowcase(document),
  initWork(document),
  initPrecision(document),
  initProcess(document),
  initContact(document),
  // Après les pins : maxScroll / géométrie spines = hauteur page réelle
  initScrollLines(document),
];

/** Re-mesure globale une fois le layout + pins stabilisés. */
function refreshScrollMetrics() {
  if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
}

requestAnimationFrame(() => {
  requestAnimationFrame(refreshScrollMetrics);
});
window.addEventListener("load", refreshScrollMetrics, { once: true });
if (document.fonts?.ready) {
  document.fonts.ready.then(refreshScrollMetrics).catch(() => {});
}

/** Revert toutes les animations / triggers (debug / tests). */
window.__atelierNordCleanup = () => {
  cleanups.forEach((fn) => typeof fn === "function" && fn());
};
