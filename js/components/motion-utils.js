/**
 * Helpers motion partagés — réutilisables hors de cette démo.
 * - prefersReducedMotion : a11y (pas d’anim scroll si l’OS le demande)
 * - ensureGsapPlugins : register ScrollTrigger une fois (échec clair si CDN manquant)
 * - scheduleScrollTriggerRefresh / bindScrollTriggerResizeRefresh :
 *   re-mesure après resize (pins Work/Precision, rails, spines)
 */

/** @returns {boolean} true si l’utilisateur demande moins de motion */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Enregistre ScrollTrigger ; throw si GSAP n’est pas chargé sur la page. */
export function ensureGsapPlugins() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    throw new Error("GSAP and ScrollTrigger must be loaded before components.");
  }
  gsap.registerPlugin(ScrollTrigger);
}

let refreshTimer = 0;

/**
 * Debounce ScrollTrigger.refresh — obligatoire au resize (pins / rails).
 * @param {number} [delayMs=120]
 */
export function scheduleScrollTriggerRefresh(delayMs = 120) {
  if (typeof ScrollTrigger === "undefined") return;
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, delayMs);
}

/**
 * Écoute resize + orientationchange → refresh ST.
 * @returns {() => void} cleanup
 */
export function bindScrollTriggerResizeRefresh() {
  if (typeof window === "undefined") return () => {};

  const onResize = () => scheduleScrollTriggerRefresh(140);
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onResize);

  return () => {
    window.clearTimeout(refreshTimer);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
  };
}
