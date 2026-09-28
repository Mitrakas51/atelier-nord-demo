/**
 * Showcase — timeline scrub : clip-path image + copy.
 * Peer: GSAP + ScrollTrigger. Cleanup via ctx.revert().
 */
import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
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
    const img = reveal?.querySelector("img");
    const copyKids = gsap.utils.toArray(
      section.querySelectorAll(".c-showcase__copy > *, .showcase-copy > *")
    );

    if (!reveal && copyKids.length === 0) return;

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        end: "center 40%",
        scrub: true,
      },
    });

    if (reveal) {
      gsap.set(reveal, { clipPath: "inset(12% 14% 12% 14% round 18px)" });
      tl.to(reveal, { clipPath: "inset(0% 0% 0% 0% round 18px)" }, 0);
    }
    if (img) {
      gsap.set(img, { scale: 1.06 });
      tl.to(img, { scale: 1 }, 0);
    }
    if (copyKids.length) {
      gsap.set(copyKids, { y: 28, opacity: 0 });
      tl.to(copyKids, { y: 0, opacity: 1, stagger: 0.08 }, 0.05);
    }
  }, root);

  return () => ctx.revert();
}
