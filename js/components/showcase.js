import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Showcase — reveal image (clip-path scrub) + copie fade-in.
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initShowcase(root = document) {
  ensureGsapPlugins();
  const section = root.querySelector(".c-showcase, .section-showcase");
  if (!section) return () => {};
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const reveal = section.querySelector(".c-showcase__reveal, .showcase-reveal");
    const copy = section.querySelector(".c-showcase__copy, .showcase-copy");

    if (reveal) {
      gsap.fromTo(
        reveal,
        { clipPath: "inset(12% 14% 12% 14% round 18px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 18px)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "center 45%",
            scrub: 0.7,
          },
        }
      );
    }

    if (copy) {
      gsap.from(copy.children, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, root);

  return () => ctx.revert();
}
