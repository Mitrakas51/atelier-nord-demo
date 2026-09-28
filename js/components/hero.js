import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Hero — intro staggered + léger scrub sur la photo de fond.
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
      y: 42,
      opacity: 0,
      duration: 1,
      stagger: 0.14,
      ease: "power3.out",
      delay: 0.08,
    });

    const photo = hero.querySelector(".hero-photo");
    const atmosphere = hero.querySelector(".hero-atmosphere, .c-hero__atmosphere");
    if (photo) {
      gsap.to(photo, {
        yPercent: 12,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    } else if (atmosphere) {
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
