/**
 * Approach — batch fade-up once des cards.
 * Peer: GSAP + ScrollTrigger. Hover sur `__inner` (pas le nœud GSAP).
 */
import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initApproach(root = document) {
  ensureGsapPlugins();
  const section = root.querySelector(".c-approach, .section-approche");
  if (!section) return () => {};
  if (prefersReducedMotion()) return () => {};

  const cards = gsap.utils.toArray(
    section.querySelectorAll(".reveal-card, .c-approach__card")
  );
  if (cards.length === 0) return () => {};

  const ctx = gsap.context(() => {
    gsap.set(cards, { y: 48, opacity: 0 });

    ScrollTrigger.batch(cards, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          overwrite: true,
        });
      },
    });
  }, root);

  return () => ctx.revert();
}
