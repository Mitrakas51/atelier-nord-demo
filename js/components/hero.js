import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Hero intro + atmosphere scrub.
 * @param {ParentNode} [root=document]
 * @returns {() => void} cleanup
 */
export function initHero(root = document) {
  ensureGsapPlugins();
  const hero = root.querySelector(".c-hero, .hero");
  if (!hero) return () => {};

  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.from(hero.querySelectorAll(".reveal-load"), {
      y: 36,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.1,
    });

    const atmosphere = hero.querySelector(".hero-atmosphere, .c-hero__atmosphere");
    if (atmosphere) {
      gsap.to(atmosphere, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, root);

  return () => ctx.revert();
}
