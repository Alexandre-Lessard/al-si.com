AL-SI – Portfolio Site
======================

Modern bilingual (FR/EN) portfolio for Alexandre Lessard (full‑stack developer & network administrator), built with Vite + React. It includes hero, services, about, contact, a sticky footer nav with language toggle, and mobile-friendly animations.

Features
--------
- Bilingual content (FR/EN) via a simple translations object
- Sticky footer nav with auto-collapse/hamburger on mobile
- Smooth scrolling to sections
- Dark theme UI with Space Grotesk
- SEO/meta tags + JSON-LD Person schema
- robots.txt and sitemap.xml included
- Lazy-loaded hero image; easy to swap to WebP/AVIF

Tech Stack
----------
- Vite + React
- CSS (single `index.css`)
- react-transition-group (nav animation)

Structure
---------
```
src/
  main.jsx
  App.jsx
  i18n.js
  index.css
  sections/
    Hero.jsx
    Services.jsx
    About.jsx
    Contact.jsx
    Footer.jsx
public/
  favicon.ico
  robots.txt
  sitemap.xml
  share-card.png   # replace with your OG image
index.html
```

Getting Started
---------------
```bash
npm install
npm run dev
```
Open the printed localhost URL. For a production build:
```bash
npm run build
npm run preview
```

Translations
------------
All copy lives in `src/i18n.js`. To edit or add languages, update the `translations` object and pass the `lang` prop as needed. The footer menu and hero/header use these strings.

Images
------
- Hero image is imported in `Hero.jsx`. Replace it with your own asset and consider converting to `.webp` for better performance.
- Keep `loading="lazy"` on `<img>` elements.

SEO
---
- `index.html` contains title/description, Open Graph/Twitter tags, JSON-LD Person schema, and favicon link.
- `public/robots.txt` and `public/sitemap.xml` are provided—update URLs to match your domain.
- Ensure `/share-card.png` exists or replace it with your OG image.

Accessibility & UX
------------------
- `lang` attribute is set dynamically based on the language toggle.
- Smooth scrolling is enabled via `scroll-behavior: smooth`.
- Contrast is tuned for dark theme; verify with Lighthouse if you adjust colors.
- External links opened in new tabs should have `rel="noreferrer"` (already applied to Facebook).

Styling Notes
-------------
- All styles are in `src/index.css`. Classes align with component classNames (e.g., `services__grid`, `floating-nav-content`).
- The sticky footer nav uses CSSTransition for enter/exit animation and auto-collapses on mobile with a centered hamburger toggle.

Scripts
-------
- `npm run dev` – start development server
- `npm run build` – production build
- `npm run preview` – preview the production build

Contributing
------------
Issues and PRs are welcome. Please keep styling consistent with the existing CSS and update `i18n.js` for any new content.

License
-------
MIT (adjust as you prefer).
