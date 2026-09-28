import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Work — desktop : pin track + scrub horizontal du rail.
 * Mobile : batch fade-up once. Cleanup explicite au changement de breakpoint
 * pour éviter transforms / pin-spacers orphelins au resize.
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initWork(root = document) {
  ensureGsapPlugins();
  const section = root.querySelector(".c-work, .section-work");
  if (!section) return () => {};
  if (prefersReducedMotion()) return () => {};

  const track = section.querySelector(".work-track");
  const rail = section.querySelector(".work-rail");
  const cards = () => gsap.utils.toArray(section.querySelectorAll(".work-card"));

  /** Remet le rail / cards à l’état CSS (après pin desktop). */
  const resetWorkLayout = () => {
    if (rail) gsap.set(rail, { clearProps: "transform,x,y" });
    const list = cards();
    if (list.length) {
      gsap.set(list, { clearProps: "opacity,scale,transform,y,x" });
    }
  };

  const ctx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 992px)": () => {
        resetWorkLayout();
        if (!track || !rail) return;

        const list = cards();
        const getScroll = () => Math.max(0, rail.scrollWidth - track.clientWidth);

        gsap.set(list, { opacity: 0.55, scale: 0.96 });
        if (list[0]) gsap.set(list[0], { opacity: 1, scale: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: track,
            start: "top 12%",
            end: () => `+=${Math.max(getScroll(), window.innerHeight * 0.65)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        tl.to(
          rail,
          {
            x: () => -getScroll(),
            ease: "none",
          },
          0
        );

        list.forEach((card, i) => {
          if (i === 0) return;
          const at = i / Math.max(list.length - 1, 1);
          tl.to(card, { opacity: 1, scale: 1, duration: 0.2 }, at * 0.85);
        });

        section.querySelectorAll(".work-media img").forEach((img) => {
          if (!img.complete) {
            img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
          }
        });

        // Quitte le desktop → purge transforms avant le layout mobile
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          resetWorkLayout();
        };
      },
      "(max-width: 991px)": () => {
        resetWorkLayout();

        const list = cards();
        if (list.length === 0) return;

        gsap.set(list, { y: 36, opacity: 0 });
        ScrollTrigger.batch(list, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });

        return () => {
          resetWorkLayout();
        };
      },
    });
  }, root);

  return () => ctx.revert();
}
