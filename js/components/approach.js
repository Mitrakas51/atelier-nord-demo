import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Approach cards fade-up + stagger.
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initApproach(root = document) {
  ensureGsapPlugins();
  const section = root.querySelector(".c-approach, .section-approche");
  if (!section) return () => {};
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.from(section.querySelectorAll(".reveal-card, .c-approach__card"), {
      y: 48,
      opacity: 0,
      duration: 0.75,
      stagger: 0.14,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  }, root);

  return () => ctx.revert();
}
