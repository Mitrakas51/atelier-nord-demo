# Approach

`initApproach(root?)` — fade-up **par carte** au scroll (trigger individuel sur chaque `.reveal-card` / `.c-approach__card`).

Peer dep : GSAP 3 + ScrollTrigger. Cleanup via `ctx.revert()`.
Après l’anim : `clearProps: "transform"` pour laisser le hover CSS reprendre.
