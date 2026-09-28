import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Work cards — reveal individuel au scroll (chaque carte / image).
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initWork(root = document) {
  ensureGsapPlugins();
  const section = root.querySelector(".c-work, .section-work");
  if (!section) return () => {};
  if (prefersReducedMotion()) return () => {};

  const cards = gsap.utils.toArray(
    section.querySelectorAll(".reveal-work, .work-card")
  );
  if (cards.length === 0) return () => {};

  const ctx = gsap.context(() => {
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }, root);

  return () => ctx.revert();
}
