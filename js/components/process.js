import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Process timeline progress + step reveals.
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initProcess(root = document) {
  ensureGsapPlugins();
  const section = root.querySelector(".c-process, .section-process");
  if (!section) return () => {};
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 992px)": () => {
        const track = section.querySelector(".process-track, .c-process__track");
        const progress = section.querySelector(
          ".process-line-progress, .c-process__progress"
        );
        if (track && progress) {
          gsap.to(progress, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top 65%",
              end: "bottom 55%",
              scrub: 0.4,
            },
          });
        }

        gsap.from(section.querySelectorAll(".process-step, .c-process__step"), {
          y: 28,
          opacity: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: track || section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      },
    });
  }, root);

  return () => ctx.revert();
}
