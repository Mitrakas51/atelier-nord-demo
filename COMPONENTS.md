# Composants réutilisables

| Composant | Init | JS | CSS | Snippet |
|---|---|---|---|---|
| Smooth scroll | `initSmoothScroll(root)` | `js/components/smooth-scroll.js` | Lenis CDN | `components/smooth-scroll/` |
| Scroll lines | `initScrollLines` / `initMarquee` | `js/components/scroll-lines.js` | `css/components/scroll-lines.css` | `components/scroll-lines/` |
| Hero | `initHero(root)` | `js/components/hero.js` | (global) | `components/hero/` |
| Approach | `initApproach(root)` | `js/components/approach.js` | `css/components/approach.css` | `components/approach/` |
| Showcase | `initShowcase(root)` | `js/components/showcase.js` | `css/components/showcase.css` | `components/showcase/` |
| Work | `initWork(root)` | `js/components/work.js` | `css/components/work.css` | `components/work/` |
| Precision | `initPrecision(root)` | `js/components/precision.js` | `css/components/precision.css` | `components/precision/` |
| Process | `initProcess(root)` | `js/components/process.js` | (global) | `components/process/` |
| Contact | `initContact(root)` | `js/components/contact.js` | (global) | `components/contact/` |
| Utils | helpers | `js/components/motion-utils.js` | — | — |

Peer deps : **GSAP 3** + **ScrollTrigger** + **Lenis** (smooth desktop). Bootstrap 5 optionnel (grille / accordion de la démo).

Pins desktop (max 2) : Precision (stage scrub) + Work (rail horizontal ≥992). Mobile allégé.

Intégration : copier JS + CSS composant + coller `snippet.html`, puis `initX(document)` après DOM ready.
