/**
 * Helpers motion partagés — réutilisables hors de cette démo.
 * - prefersReducedMotion : a11y (pas d’anim scroll si l’OS le demande)
 * - ensureGsapPlugins : register ScrollTrigger une fois (échec clair si CDN manquant)
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
