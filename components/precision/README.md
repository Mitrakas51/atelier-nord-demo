# Precision

`initPrecision(root?)` — section `#precision`.

- **≥992px** : pin `.precision-stage` + timeline scrub (panels / métrique / barre / glow).
- **&lt;992px** : panels empilés, batch fade-up + barre scrub sans pin.
- **Resize** : reset visibilité/transforms au changement de breakpoint.

Peer : GSAP + ScrollTrigger. Reduced-motion → skip.
