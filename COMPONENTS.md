# Composants réutilisables

Chaque composant peut être intégré dans **n’importe quel projet** HTML (ou monté via un framework).

| Composant | JS | Snippet | Init |
|---|---|---|---|
| Hero | `js/components/hero.js` | `components/hero/snippet.html` | `initHero(root)` |
| Approach | `js/components/approach.js` | `components/approach/snippet.html` | `initApproach(root)` |
| Precision | `js/components/precision.js` | `components/precision/snippet.html` | `initPrecision(root)` |
| Process | `js/components/process.js` | `components/process/snippet.html` | `initProcess(root)` |
| Contact | `js/components/contact.js` | `components/contact/snippet.html` | `initContact(root)` |
| Utils | `js/components/motion-utils.js` | — | helpers |

## Intégration rapide

1. Charger GSAP + ScrollTrigger (CDN ou npm)
2. Copier le JS du composant + `motion-utils.js`
3. Copier le markup du snippet (+ styles depuis `css/styles.css` sections associées)
4. `import { initHero } from './hero.js'; initHero(document);`

## Peer deps
- **GSAP 3** + **ScrollTrigger** (obligatoire pour le motion)
- Bootstrap 5 : optionnel pour la grille de la démo ; les inits JS ne dépendent pas de Bootstrap
