# Scroll lines & marquee

`initScrollLines(root?)`
- **Spines** fixed 100vh : ribbons **courbes** (cubiques) + **trails** flous (`data-spine-trail`, scrub plus lent).
- Géométrie auto (viewport) ; densités selon hauteur de page.
- Scrub `0 → getDocScrollMax()` → fin du trait en bas de page.

`initMarquee(root?)` — piste de mots scrubbée.

Peer : GSAP + ScrollTrigger. Reduced-motion → skip.
Init après les pins dans `main.js`.
