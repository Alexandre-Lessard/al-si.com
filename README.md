# al-si.com

Site personnel et portfolio d'Alexandre Lessard, développeur full-stack.

**[al-si.com](https://al-si.com)**

## Apercu

Site vitrine bilingue (FR/EN) presentant mes services, projets et parcours professionnel. Concu pour etre rapide, accessible et bien reference sur Google.

## Stack technique

| Technologie | Role |
|---|---|
| React 19 | Interface utilisateur |
| Vite 7 | Build et dev server |
| Tailwind CSS v4 | Styles utilitaires |
| Framer Motion | Animations et transitions |
| GitHub Pages | Hebergement |
| Cloudflare | CDN et DNS |
| Google Analytics 4 | Suivi de trafic |

## Decisions techniques

**SPA plutot que SSG/SSR** : Le site est une single-page application. Googlebot rend le JavaScript, et les meta tags SEO sont dans le HTML statique (`index.html`). Un framework SSR ajouterait de la complexite sans benefice mesurable pour un site vitrine.

**Tailwind CSS v4 sans shadcn/ui** : shadcn/ui n'est pas compatible avec Tailwind v4 et l'overhead est disproportionne pour un site de cette taille. Les composants reutilisables (`Button`, `SectionHeader`, `ScrollReveal`) sont faits maison.

**Framer Motion pour les animations** : Utilise pour le scroll reveal, les transitions de la nav et les animations d'entree du hero. La librairie represente la majeure partie du bundle JS, mais le resultat visuel justifie le cout.

**Bilingue via objet i18n** : Tout le contenu est dans `src/i18n.js`. Pas de librairie i18n, juste un objet avec les cles `fr` et `en`. Simple et suffisant.

**SEO structure** : JSON-LD (schema.org Person), meta tags OG/Twitter, sitemap.xml, robots.txt. Le tout est dans `index.html` pour etre accessible sans JavaScript.

## Etude de cas SEO

Ce site fait l'objet d'une etude de cas SEO documentee. L'objectif est de mesurer l'impact des optimisations techniques sur le ranking Google. Les scripts de mesure sont dans `seo-baseline/`.

## Licence

Copyright (c) 2026 Alexandre Lessard. Tous droits reserves. Voir [LICENSE](LICENSE).
