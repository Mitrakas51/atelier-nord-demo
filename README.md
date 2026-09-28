# Atelier Nord — Démo intégration Front-end

Landing one-page pour illustrer une **intégration maquette → HTML / CSS / JS** :

- HTML5 sémantique, responsive
- **Bootstrap 5**
- JavaScript vanilla
- **GSAP** + **ScrollTrigger**

Réalisée dans le cadre d’une candidature freelance (intégrateur / Front-end).  
**Three.js / 3D web volontairement hors scope.**

## Démo en ligne

> Après déploiement Vercel, remplacer par l’URL :  
> `https://….vercel.app`

## Lancer en local

Pas de build. Sert le dossier :

```bash
npx serve .
```

Puis ouvre l’URL affichée (les modules ES nécessitent un serveur local, pas un double-clic fichier).

## Effets ScrollTrigger

1. Entrée hero + scrub léger sur le fond  
2. Fade-up + stagger des cartes « Approche »  
3. Scrub du titre « Précision »  
4. Pin court du bloc visuel (tablette / desktop)  
5. Barre de progression du process (desktop)  

Mobile : pin / scrub lourds réduits (`matchMedia`).  
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
