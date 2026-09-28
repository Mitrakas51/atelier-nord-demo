/**
 * Hero — intro load + parallax photo + split titre.
 * Peer: GSAP + ScrollTrigger. Cleanup via ctx.revert().
 */
import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initHero(root = document) {
  ensureGsapPlugins();
  const hero = root.querySelector(".c-hero, .hero");
  if (!hero) return () => {};

  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const loadEls = hero.querySelectorAll(".reveal-load");
    gsap.from(loadEls, {
      y: 48,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.06,
    });

    const titleLines = hero.querySelectorAll(".hero-title .line");
    if (titleLines.length) {
      gsap.from(titleLines, {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.18,
      });
    }

    const orbit = hero.querySelector(".hero-orbit");
    if (orbit) {
      gsap.fromTo(
        orbit,
        { opacity: 0, y: 40 },
        {
          opacity: 0.7,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    const photo = hero.querySelector(".hero-photo");
    const atmosphere = hero.querySelector(".hero-atmosphere, .c-hero__atmosphere");
    if (photo) {
      gsap.set(photo, { scale: 1.08, transformOrigin: "center center" });
      gsap.to(photo, {
        yPercent: 16,
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      if (!photo.complete) {
        photo.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      }
    } else if (atmosphere) {
      gsap.to(atmosphere, {
        scale: 1.1,
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
