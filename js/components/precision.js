import { ensureGsapPlugins, prefersReducedMotion } from "./motion-utils.js";

/**
 * Precision — desktop : pin stage + master timeline scrub.
 * Mobile : panels empilés + fade-up batch (pas de pin).
 * Cleanup explicite au resize / breakpoint (visibilité / transforms).
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

  const stage = section.querySelector(".precision-stage, .c-precision__stage");
  const metricEl = section.querySelector("[data-metric], .precision-metric");
  const labelEl = section.querySelector(
    "[data-metric-label], .precision-metric-label"
  );
  const bar = section.querySelector("[data-bar], .precision-progress-bar");
  const glow = section.querySelector(".precision-glow, .c-precision__glow");
  const panels = () =>
    gsap.utils.toArray(section.querySelectorAll(".precision-panel"));
  const dots = () =>
    gsap.utils.toArray(section.querySelectorAll("[data-step-dot]"));

  /** État neutre lisible (surtout avant layout mobile empilé). */
  const resetPrecisionLayout = () => {
    const list = panels();
    if (list.length) {
      gsap.set(list, {
        clearProps: "opacity,visibility,transform,y,x",
      });
      list.forEach((panel, i) => {
        panel.classList.toggle("is-active", i === 0);
        panel.style.visibility = "";
        panel.style.opacity = "";
      });
    }
    if (bar) gsap.set(bar, { clearProps: "transform,scaleX" });
    if (glow) gsap.set(glow, { clearProps: "transform,x,y,scale" });
    if (metricEl) metricEl.textContent = String(steps[0].value);
    if (labelEl) labelEl.textContent = steps[0].label;
    dots().forEach((dot, n) => dot.classList.toggle("is-active", n === 0));
  };

  const ctx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 992px)": () => {
        resetPrecisionLayout();
        const list = panels();
        if (!stage || list.length === 0) return;

        const metric = { value: steps[0].value };
        const stepDots = dots();

        gsap.set(list, { opacity: 0, y: 24, visibility: "hidden" });
        gsap.set(list[0], { opacity: 1, y: 0, visibility: "visible" });
        if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top 10%",
            end: () => `+=${Math.round(window.innerHeight * 1.55)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const i = Math.min(
                steps.length - 1,
                Math.floor(self.progress * steps.length + 0.001)
              );
              stepDots.forEach((dot, n) =>
                dot.classList.toggle("is-active", n === i)
              );
              list.forEach((panel, n) =>
                panel.classList.toggle("is-active", n === i)
              );
              if (labelEl) labelEl.textContent = steps[i].label;
              if (metricEl) metricEl.textContent = String(Math.round(metric.value));
            },
          },
        });

        tl.addLabel("step0", 0);
        if (bar) tl.to(bar, { scaleX: 1 / 3 }, "step0");
        if (glow) tl.to(glow, { x: -8, y: -4, scale: 1.03 }, "step0");
        tl.to(metric, { value: steps[0].value, duration: 0.001 }, "step0");

        tl.addLabel("step1", 0.5);
        tl.to(
          list[0],
          { opacity: 0, y: -16, visibility: "hidden", duration: 0.25 },
          "step1-=0.25"
        );
        tl.fromTo(
          list[1],
          { opacity: 0, y: 24, visibility: "visible" },
          { opacity: 1, y: 0, duration: 0.25 },
          "step1-=0.15"
        );
        tl.to(metric, { value: steps[1].value, duration: 0.35 }, "step1-=0.2");
        if (bar) tl.to(bar, { scaleX: 2 / 3, duration: 0.35 }, "step1-=0.2");
        if (glow) {
          tl.to(glow, { x: -16, y: -8, scale: 1.06, duration: 0.35 }, "step1-=0.2");
        }

        tl.addLabel("step2", 1);
        tl.to(
          list[1],
          { opacity: 0, y: -16, visibility: "hidden", duration: 0.25 },
          "step2-=0.25"
        );
        tl.fromTo(
          list[2],
          { opacity: 0, y: 24, visibility: "visible" },
          { opacity: 1, y: 0, duration: 0.25 },
          "step2-=0.15"
        );
        tl.to(metric, { value: steps[2].value, duration: 0.35 }, "step2-=0.2");
        if (bar) tl.to(bar, { scaleX: 1, duration: 0.35 }, "step2-=0.2");
        if (glow) {
          tl.to(
            glow,
            { x: -24, y: -14, scale: 1.1, duration: 0.35 },
            "step2-=0.2"
          );
        }

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          resetPrecisionLayout();
        };
      },

      "(max-width: 991px)": () => {
        resetPrecisionLayout();

        const list = panels();
        if (list.length === 0) return;

        // Metric / barre : scrub léger sur la section (pas de pin)
        if (bar) {
          gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
          gsap.to(bar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 55%",
              scrub: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const i = Math.min(
                  steps.length - 1,
                  Math.floor(self.progress * steps.length + 0.001)
                );
                if (metricEl) metricEl.textContent = String(steps[i].value);
                if (labelEl) labelEl.textContent = steps[i].label;
                dots().forEach((dot, n) =>
                  dot.classList.toggle("is-active", n === i)
                );
                list.forEach((panel, n) =>
                  panel.classList.toggle("is-active", n <= i)
                );
              },
            },
          });
        }

        gsap.set(list, { y: 28, opacity: 0 });
        ScrollTrigger.batch(list, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });

        return () => {
          resetPrecisionLayout();
        };
      },
    });
  }, root);

  return () => ctx.revert();
}
