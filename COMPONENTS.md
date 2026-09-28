# Composants réutilisables

| Composant | Init | JS | CSS | Snippet |
|---|---|---|---|---|
| Hero | `initHero(root)` | `js/components/hero.js` | (global) | `components/hero/` |
| Approach | `initApproach(root)` | `js/components/approach.js` | `css/components/approach.css` | `components/approach/` |
| Showcase | `initShowcase(root)` | `js/components/showcase.js` | `css/components/showcase.css` | `components/showcase/` |
| Work | `initWork(root)` | `js/components/work.js` | `css/components/work.css` | `components/work/` |
| Precision | `initPrecision(root)` | `js/components/precision.js` | `css/components/precision.css` | `components/precision/` |
| Process | `initProcess(root)` | `js/components/process.js` | (global) | `components/process/` |
| Contact | `initContact(root)` | `js/components/contact.js` | (global) | `components/contact/` |
| Utils | helpers | `js/components/motion-utils.js` | — | — |

Peer deps : **GSAP 3** + **ScrollTrigger**. Bootstrap 5 optionnel (grille / accordion de la démo).

Intégration : copier JS + CSS composant + coller `snippet.html`, puis `initX(document)` après DOM ready.
