# Work

`initWork(root?)` — section `#realisations`.

- **≥992px** : pin `.work-track` + scrub horizontal `.work-rail` ; cards scale/opacity.
- **&lt;992px** : grille CSS + batch fade-up `once`.
- **Resize** : cleanup `clearProps` au switch matchMedia + `ScrollTrigger.refresh` global.

Peer : GSAP + ScrollTrigger. Hover lift sur `.work-card__shell` seulement.
