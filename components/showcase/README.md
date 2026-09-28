# Showcase

`initShowcase(root?)` — une timeline scrub : clip-path + scale image + copy fade.

Peer dep : GSAP 3 + ScrollTrigger. CSS initial clip = from GSAP (anti-flash).
Cleanup via `ctx.revert()`.
