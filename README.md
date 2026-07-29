# al-si.com

Personal website and portfolio of Alexandre Lessard, full-stack developer.

**[al-si.com](https://al-si.com)**

## Overview

Bilingual (FR/EN) showcase site presenting my services, projects and professional background. Designed to be fast, accessible and well-indexed on Google.

## Tech stack

| Technology         | Role                       |
| ------------------ | -------------------------- |
| React 19           | User interface             |
| Vite 7             | Build and dev server       |
| Tailwind CSS v4    | Utility-first styles       |
| Framer Motion      | Animations and transitions |
| Cloudflare Pages   | Hosting, CDN and DNS       |
| Google Analytics 4 | Traffic tracking           |

## Technical decisions

**SPA over SSG/SSR**: The site is a single-page application. Googlebot renders JavaScript, and SEO meta tags live in the static `index.html`. An SSR framework would add complexity with no measurable benefit for a showcase site.

**Tailwind CSS v4 without shadcn/ui**: shadcn/ui is compatible with Tailwind v4, but the overhead is disproportionate for a site this size. Reusable components (`Button`, `SectionHeader`, `ScrollReveal`) are handmade.

**Framer Motion for animations**: Used for scroll reveal, nav transitions and hero entrance animations. The library accounts for most of the JS bundle, but the visual result justifies the cost.

**Bilingual via i18n object**: All content lives in `src/i18n.js`. No i18n library — just an object with `fr` and `en` keys. Simple and sufficient.

**Structured SEO**: JSON-LD (schema.org Person), OG/Twitter meta tags, sitemap.xml, robots.txt. Everything is in `index.html` to be accessible without JavaScript.

## Articles

The site hosts long-form technical articles, pre-rendered in FR and EN.

Latest: [Running modern LLMs on a 2014 Tesla K80](https://al-si.com/en/article/llm-modernes-tesla-k80-2014) — bringing an out-of-support Kepler card back into service to serve 27B–35B models locally, with benchmarks and documented failures.

## License

Copyright (c) 2026 Alexandre Lessard. All rights reserved. See [LICENSE](LICENSE).
