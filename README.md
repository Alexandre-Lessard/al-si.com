# al-si.com

Personal website and portfolio of Alexandre Lessard, full-stack developer.

**[al-si.com](https://al-si.com)**

## Overview

Bilingual (FR/EN) showcase site presenting my services, projects and professional background. Designed to be fast, accessible and well-indexed on Google.

## Tech stack

| Technology         | Role                       |
| ------------------ | -------------------------- |
| React 19           | User interface             |
| Vike               | File-based routing and SSG |
| Vite 7             | Build and dev server       |
| Tailwind CSS v4    | Utility-first styles       |
| Framer Motion      | Animations and transitions |
| Cloudflare Pages   | Hosting, CDN and DNS       |
| Google Analytics 4 | Traffic tracking           |

## Technical decisions

**SSG over SPA**: Every page is pre-rendered to static HTML at build time by Vike. Each locale gets a real URL (`/fr/`, `/en/`) with its own title, meta tags and canonical — which a client-rendered SPA cannot express without relying on Googlebot executing JavaScript.

**Tailwind CSS v4 without shadcn/ui**: shadcn/ui is compatible with Tailwind v4, but the overhead is disproportionate for a site this size. Reusable components (`Button`, `SectionHeader`, `ScrollReveal`) are handmade.

**Framer Motion for animations**: Used for scroll reveal, nav transitions and hero entrance animations. The library accounts for most of the JS bundle, but the visual result justifies the cost.

**Bilingual via i18n object**: All content lives in `src/i18n.js`. No i18n library — just an object with `fr` and `en` keys. Simple and sufficient.

**Structured SEO**: JSON-LD (schema.org Organization), OG/Twitter meta tags, canonical and hreflang alternates are emitted from `pages/+Head.jsx` into the pre-rendered HTML, so they are readable without executing JavaScript. `sitemap.xml` is generated after the build from the pages that actually exist.

## Articles

The site hosts long-form technical articles, pre-rendered in FR and EN.

Latest: [Running modern LLMs on a 2014 Tesla K80](https://al-si.com/en/article/llm-modernes-tesla-k80-2014/) — bringing an out-of-support Kepler card back into service to serve 27B–35B models locally, with benchmarks and documented failures.

## License

Copyright (c) 2026 Alexandre Lessard. All rights reserved. See [LICENSE](LICENSE).
