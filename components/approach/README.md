# Approach

`initApproach(root?)` — `ScrollTrigger.batch` + `once: true` sur `.reveal-card` / `.c-approach__card`.

Peer dep : GSAP 3 + ScrollTrigger. Cleanup via `ctx.revert()`.
Hover lift sur `.approach-item__inner` (pas sur le nœud animé par GSAP).
