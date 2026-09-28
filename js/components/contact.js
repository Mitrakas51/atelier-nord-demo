import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Contact — reveal panneau + preventDefault sur le formulaire démo.
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initContact(root = document) {
  ensureGsapPlugins();
  const section = root.querySelector(".c-contact, .section-contact");
  if (!section) return () => {};

  const form = section.querySelector("form");
  if (form && !form.dataset.bound) {
    form.dataset.bound = "1";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }

  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.from(section.querySelectorAll(".reveal-contact, .c-contact__panel"), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, root);

  return () => ctx.revert();
}
