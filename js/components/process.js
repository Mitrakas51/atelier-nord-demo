import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Process timeline — barre de progression + activation des étapes.
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
        const steps = section.querySelectorAll(".process-step, .c-process__step");

        if (track && progress) {
          gsap.to(progress, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top 65%",
              end: "bottom 50%",
              scrub: 0.4,
              onUpdate: (self) => {
                const active = Math.min(
                  steps.length - 1,
                  Math.floor(self.progress * steps.length)
                );
                steps.forEach((el, i) => el.classList.toggle("is-active", i <= active));
              },
            },
          });
        }

        gsap.from(steps, {
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
      "(max-width: 991px)": () => {
        gsap.from(section.querySelectorAll(".process-step, .c-process__step"), {
          y: 24,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      },
    });
  }, root);

  return () => ctx.revert();
}
