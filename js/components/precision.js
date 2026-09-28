import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Precision block: scrub title + short pin (desktop).
 * Do not animate the pinned root — only children (GSAP docs).
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initPrecision(root = document) {
  ensureGsapPlugins();
  const section = root.querySelector(".c-precision, .section-precision");
  if (!section) return () => {};
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
        const title = section.querySelector(".precision-title, .c-precision__title");
        if (title) {
          gsap.fromTo(
            title,
            { y: 40, opacity: 0.35 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "center 45%",
                scrub: 0.6,
              },
            }
          );
        }

        const glow = section.querySelector(".precision-glow, .c-precision__glow");
        if (glow) {
          gsap.to(glow, {
            x: -30,
            y: -20,
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 40%",
              scrub: true,
            },
          });
        }

        const visual = section.querySelector(".precision-visual, .c-precision__visual");
        if (visual) {
          ScrollTrigger.create({
            trigger: visual,
            start: "top 18%",
            end: "+=280",
            pin: true,
            pinSpacing: true,
          });
        }
      },
    });
  }, root);

  return () => ctx.revert();
}
