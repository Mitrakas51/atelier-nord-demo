# Work (réalisations)

`initWork(root?)` — reveal **par carte** au scroll (chaque `.reveal-work` / `.work-card` a son ScrollTrigger).

Peer dep : GSAP 3 + ScrollTrigger. Cleanup via `ctx.revert()`.
`clearProps: "transform"` après anim pour préserver le hover CSS (lift + zoom image).
