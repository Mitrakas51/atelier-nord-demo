import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Precision — pin de toute la scène (métrique + panneau).
 * Une seule composition figée ; le scroll fait avancer 3 étapes synchronisées.
 * @param {ParentNode} [root=document]
 * @returns {() => void}
 */
export function initPrecision(root = document) {
  ensureGsapPlugins();
  const section = root.querySelector(".c-precision, .section-precision");
  if (!section) return () => {};
  if (prefersReducedMotion()) return () => {};

  const steps = [
    { value: 96, label: "Score perf. cible" },
    { value: 4, label: "Breakpoints couverts" },
    { value: 0, label: "Surprise à la livraison" },
  ];

  const ctx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 992px)": () => {
        const stage = section.querySelector(".precision-stage, .c-precision__stage");
        const metricEl = section.querySelector("[data-metric], .precision-metric");
        const labelEl = section.querySelector(
          "[data-metric-label], .precision-metric-label"
        );
        const bar = section.querySelector("[data-bar], .precision-progress-bar");
        const panels = gsap.utils.toArray(section.querySelectorAll(".precision-panel"));
        const dots = gsap.utils.toArray(section.querySelectorAll("[data-step-dot]"));
        const glow = section.querySelector(".precision-glow, .c-precision__glow");

        if (!stage || panels.length === 0) return;

        const metric = { value: steps[0].value };
        const state = { idx: -1 };

        gsap.set(panels, { opacity: 0, y: 28, visibility: "hidden" });
        gsap.set(panels[0], { opacity: 1, y: 0, visibility: "visible" });

        const showStep = (i) => {
          if (i === state.idx) return;
          const prev = state.idx;
          state.idx = i;
          const s = steps[i] || steps[0];

          if (labelEl) {
            gsap.fromTo(
              labelEl,
              { opacity: 0.35, y: 6 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" }
            );
            labelEl.textContent = s.label;
          }

          gsap.to(metric, {
            value: s.value,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
            onUpdate: () => {
              if (metricEl) metricEl.textContent = String(Math.round(metric.value));
            },
          });

          panels.forEach((panel, n) => {
            const on = n === i;
            panel.classList.toggle("is-active", on);
            if (on) {
              gsap.fromTo(
                panel,
                { opacity: 0, y: prev < i ? 28 : -18, visibility: "visible" },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.45,
                  ease: "power3.out",
                  overwrite: "auto",
                }
              );
            } else if (n === prev) {
              gsap.to(panel, {
                opacity: 0,
                y: prev < i ? -18 : 18,
                visibility: "hidden",
                duration: 0.3,
                ease: "power2.in",
                overwrite: "auto",
              });
            } else {
              gsap.set(panel, { opacity: 0, visibility: "hidden", y: 28 });
            }
          });

          dots.forEach((dot, n) => {
            dot.classList.toggle("is-active", n === i);
          });
        };

        showStep(0);

        ScrollTrigger.create({
          trigger: stage,
          start: "top 80px",
          end: () => `+=${Math.round(window.innerHeight * 1.65)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.65,
          snap: {
            snapTo: 1 / (steps.length - 1),
            duration: { min: 0.12, max: 0.35 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const i = Math.min(
              steps.length - 1,
              Math.floor(self.progress * steps.length + 0.001)
            );
            showStep(i);
            if (bar) gsap.set(bar, { scaleX: self.progress, transformOrigin: "left center" });
          },
        });

        if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

        if (glow) {
          gsap.to(glow, {
            x: -24,
            y: -14,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top 80px",
              end: () => `+=${Math.round(window.innerHeight * 1.65)}`,
              scrub: true,
            },
          });
        }
      },
    });
  }, root);

  return () => ctx.revert();
}
