# Architecture technique

Reference interne pour comprendre comment le site est construit.

## Structure du projet

```
src/
  main.jsx                    # Point d'entree React
  App.jsx                     # Layout principal, gestion de la langue
  i18n.js                     # Tout le contenu FR/EN
  styles.js                   # Classes CSS partagees (section, container)
  icons.jsx                   # Icones SVG inline pour les services
  components/
    ui.jsx                    # Composants reutilisables (Button, SectionHeader)
    ScrollReveal.jsx          # Wrapper Framer Motion fade-in au scroll
  sections/
    Nav.jsx                   # Navigation fixe, hide on scroll, mobile hamburger
    Hero.jsx                  # Hero avec photo et CTA
    About.jsx                 # A propos + experience recente + stats
    Services.jsx              # Grille de 3 cartes de services
    Projects.jsx              # Grille de 4 cartes projets
    Articles.jsx              # Grille d'articles (a venir)
    Contact.jsx               # Banniere CTA avec boutons contact
    Footer.jsx                # Copyright
public/
  alexandre-lessard.webp      # Photo personnelle (65KB)
  share-card.png              # Image OG pour partage social (1200x630)
  favicon.ico
  robots.txt
  sitemap.xml
index.html                    # HTML statique avec meta tags, JSON-LD, GA4
index.css                     # Theme Tailwind v4, styles globaux
```

## Comment fonctionne le contenu

Tout le texte du site est dans `src/i18n.js`. C'est un objet avec deux cles : `fr` et `en`. Chaque section du site a sa propre cle dans l'objet.

Pour modifier du texte, editer `i18n.js`. Les composants lisent directement depuis cet objet via `translations[lang]`.

La langue est geree dans `App.jsx` avec un `useState`. Le toggle FR/EN est dans `Nav.jsx`.

## Comment fonctionne le style

Le theme est defini dans `index.css` via `@theme` (Tailwind v4). Les couleurs principales :
- `--color-accent: #ff8b5f` (orange)
- `--color-bg: #050505` (noir)
- `--color-surface: rgba(255, 255, 255, 0.03)` (cartes)

Les classes partagees entre sections sont dans `src/styles.js` :
- `sectionClasses` : padding, max-width, bordure
- `containerClasses` : max-width et padding horizontal

## Comment fonctionne la navigation

`Nav.jsx` utilise :
- `IntersectionObserver` pour detecter la section active
- Scroll listener pour hide/show au scroll (down = hide, up = show)
- `AnimatePresence` de Framer Motion pour le menu mobile

## SEO

Les meta tags, OG, Twitter et JSON-LD sont dans `index.html` (statique, pas genere par React). C'est important pour le SEO car ces tags sont visibles sans executer JavaScript.

Le sitemap et robots.txt sont dans `public/`.

## Scripts utiles

```bash
npm run dev          # Serveur de developpement
npm run build        # Build production dans dist/
npm run preview      # Preview du build
npm run seo:rankings # Verifier les rankings Google (necessite SERPAPI_KEY)
npm run seo:audit    # Audit SEO technique
npm run seo:compare  # Comparer avant/apres
```

## Deploiement

Le site est deploye sur GitHub Pages. Le build (`dist/`) est pousse via GitHub Actions ou manuellement. Cloudflare sert de CDN et gere le DNS pour al-si.com.

## Ajouter une section

1. Creer `src/sections/NouvelleSection.jsx`
2. Ajouter le contenu FR/EN dans `src/i18n.js`
3. Importer et placer le composant dans `App.jsx`
4. Si la section doit apparaitre dans la nav, ajouter l'id dans `Nav.jsx` (tableau `ids` dans l'IntersectionObserver et `navLinks`)
