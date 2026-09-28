# Atelier Nord — Démo intégration Front-end

Landing one-page pour illustrer une **intégration maquette → HTML / CSS / JS** :

- HTML5 sémantique, responsive
- **Bootstrap 5**
- JavaScript vanilla
- **GSAP** + **ScrollTrigger**

Réalisée dans le cadre d’une candidature freelance (intégrateur / Front-end).  
**Three.js / 3D web volontairement hors scope.**

## Démo en ligne

**Live :** [https://atelier-nord-demo-green.vercel.app](https://atelier-nord-demo-green.vercel.app)

**Code :** [github.com/Mitrakas51/atelier-nord-demo](https://github.com/Mitrakas51/atelier-nord-demo)

## Lancer en local

Pas de build. Sert le dossier :

```bash
npx serve .
```

Puis ouvre l’URL affichée (les modules ES nécessitent un serveur local, pas un double-clic fichier).

## Effets ScrollTrigger

1. Smooth scroll desktop (**Lenis**, sync ticker GSAP)  
2. Ribbons SVG fixed (draw scrubbé sur toute la page)  
3. Entrée hero + parallax photo  
4. Fade-up + stagger des cartes « Approche »  
5. Showcase : clip-path image scrubbé  
6. Pin horizontal « Réalisations » (desktop ≥992)  
7. Pin scène « Précision » + panneaux (desktop ≥992)  
8. Barre de progression du process (desktop)  

Mobile : pas de pin, trails SVG désactivés (`matchMedia`).  
Respect de `prefers-reduced-motion`.

## Structure

```
index.html          # page
css/styles.css      # styles
js/main.js          # orchestration
js/components/      # modules réutilisables (init*)
components/*/       # snippets HTML pour réemploi
```

## Déployer sur Vercel

1. Pousse ce repo sur GitHub  
2. [vercel.com](https://vercel.com) → Import project  
3. Framework preset : **Other**  
4. Build command : *(vide)* · Output : `.`  
5. Deploy  

## Auteur

Sébastien Louis — [GitHub](https://github.com/sebachien)

---

> Repo **public** (Vercel / recruteur). Le workspace de développement agent est séparé (`demo-gsap-scroll`).

<!-- deploy-check 2026-09-28 15:30 -->

