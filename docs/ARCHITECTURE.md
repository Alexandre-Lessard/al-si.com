# Architecture

Reference for understanding how the site is built.

## Project structure

```
pages/                        # Vike file-based routes, pre-rendered at build time
  +config.js                  # Vike config (prerender on, vike-react)
  +Layout.jsx                 # Page chrome: Nav + Footer + background
  +Head.jsx                   # Title, meta, canonical, hreflang, OG, JSON-LD
  +onBeforeRoute.js           # Strips the /fr or /en prefix into pageContext.locale
  index/
    +Page.jsx                 # Homepage: renders the sections in order
    +onBeforePrerenderStart.js  # Emits /fr and /en
  article/@slug/              # Article routes (see "Article system" below)
  _error/+Page.jsx            # 404 page, pre-rendered once as 404.html
functions/
  _middleware.js              # Cloudflare Pages: routes bare URLs to a locale
src/
  urls.js                     # Canonical URL shape (locale prefix + trailing slash)
  i18n.js                     # All FR/EN content
  styles.js                   # Shared CSS classes (section, container)
  icons.jsx                   # Inline SVG icons for services
  components/
    ui.jsx                    # Reusable components (Button, SectionHeader)
    Card.jsx                  # Reusable card wrapper used across sections
    ScrollReveal.jsx          # Framer Motion fade-in on scroll wrapper
    LanguageToggle.jsx        # FR/EN toggle button (desktop and mobile)
    ArticleLayout.jsx         # Reusable article layout (back link, header, prose)
  sections/
    Nav.jsx                   # Fixed nav, hide on scroll, mobile hamburger
    Hero.jsx                  # Hero with promise, photo, CTAs and proof anchor
    ProofBand.jsx             # 3 mini case archetypes shown right after Hero
    Services.jsx              # 3-card services grid with descriptions
    HowItWorks.jsx            # 4-step process (discussion, scoping, build, launch)
    Projects.jsx              # 3-card projects grid with situation/intervention/result
    Testimonials.jsx          # 3-card client testimonials grid
    Faq.jsx                   # Accordion FAQ (multi-open, animated)
    About.jsx                 # About paragraphs, audience, method, recent, stats
    Articles.jsx              # Articles grid
    Contact.jsx               # CTA banner with contact buttons
    Footer.jsx                # Copyright
  articles/
    index.js                  # Article registry (slug -> component)
    LlmTeslaK80.jsx           # Article: running modern LLMs on a 2014 Tesla K80
public/
  alexandre-lessard.webp      # Personal photo (65KB)
  logo.svg                    # AL-SI logo (SVG, 3 colors)
  share-card.png              # OG image for social sharing (1536x1024)
  favicon.ico
  robots.txt
  _headers                    # CSP, security headers, cache policy
scripts/
  generate-sitemap.mjs        # Post-build sitemap from the pages that exist
index.css                     # Tailwind v4 theme, global styles
```

## Homepage section order

Sections are rendered in this order in `pages/index/+Page.jsx`:

1. `Hero` — promise, photo, CTAs
2. `ProofBand` — 3 mini cases for instant credibility
3. `Services` — 3 service categories with descriptions
4. `HowItWorks` — 4-step process
5. `Projects` — 3 project cards with structured situation/intervention/result
6. `Testimonials` — 3 client testimonials
7. `Faq` — accordion answering common prospect objections
8. `About` — paragraphs, audience, method, recent experience, stats
9. `Articles` — articles grid (currently 1 published article)
10. `Contact` — final CTA with scheduling link, email, social

## How content works

All site text lives in `src/i18n.js`. It's an object with two keys: `fr` and `en`. Each site section has its own key in the object.

To modify text, edit `i18n.js`. Components read directly from this object via `translations[lang]`.

Language comes from the URL, not from component state: `pages/+onBeforeRoute.js` reads the `/fr` or `/en` prefix and exposes it as `pageContext.locale`, which every page passes down as a `lang` prop. The FR/EN toggle (`LanguageToggle.jsx`, rendered by `Nav.jsx`) is a plain link to the same page under the other prefix, and stores the choice in a `lang` cookie that the Cloudflare middleware reads on the next visit to a bare URL.

## How styling works

The theme is defined in `index.css` via `@theme` (Tailwind v4). Main colors:

- `--color-accent: #ff8b5f` (orange)
- `--color-bg: #050505` (black)
- `--color-surface: rgba(255, 255, 255, 0.03)` (cards)

Shared classes between sections are in `src/styles.js`:

- `sectionClasses`: padding, max-width, border
- `containerClasses`: max-width and horizontal padding

## How navigation works

`Nav.jsx` uses:

- `IntersectionObserver` to detect the active section
- Scroll listener for hide/show on scroll (down = hide, up = show)
- `AnimatePresence` from Framer Motion for the mobile menu

## SEO

Meta tags, OG, Twitter, JSON-LD, canonical and hreflang are emitted by `pages/+Head.jsx` and baked into each pre-rendered HTML file, so they are visible without executing JavaScript. `robots.txt` is in `public/`; `sitemap.xml` is generated after the build by `scripts/generate-sitemap.mjs`, which walks `dist/client/` so it can never advertise a page that does not exist.

### URL shape — the trailing slash matters

Cloudflare Pages serves every pre-rendered page at its directory URL, **with** a trailing slash, and answers the slashless form with a 308 redirect. So `/fr/` is the page and `/fr` is a redirect to it.

That makes the trailing slash load-bearing: a canonical tag pointing at a URL that redirects is discarded by Google, which then picks its own canonical instead — and every URL in the sitemap would be reported as "page with redirect" rather than indexed.

`src/urls.js` is the single source of truth. `localePath(locale, barePath)` always returns a slash-terminated URL, and it is used by the canonical and hreflang tags, the sitemap generator, the language toggle and the internal links. `functions/_middleware.js` repeats the rule inline because Pages Functions are bundled separately and cannot import from `src/`. `src/__tests__/urls.test.js` locks the invariant down.

Anything that builds a URL by hand needs the slash too — `href="/fr/"`, not `href="/fr"`.

## Useful scripts

```bash
npm run dev          # Development server
npm run build        # Production build in dist/
npm run preview      # Preview the build
npm run deploy       # Build + deploy to Cloudflare Pages
```

## Deployment

The site is deployed on [Cloudflare Pages](https://pages.cloudflare.com/) via Wrangler CLI.

### Setup

1. Copy `.env.example` to `.env`
2. Fill in your Cloudflare account ID (found in the Cloudflare dashboard under any domain > Overview > right sidebar)
3. Run `npm run deploy`

The deploy script (`scripts/deploy.sh`) builds the project and deploys the `dist/` folder. On first run, you may need to authenticate with `npx wrangler login`.

### Custom domain

The custom domain (al-si.com) is configured in the Cloudflare Pages dashboard under the project's Custom Domains tab. DNS is managed by Cloudflare.

## Article system

The site supports full-page articles at `/{fr|en}/article/{slug}/`, pre-rendered at build time like every other page.

### Routing

Routing is file-based, under `pages/article/@slug/`:

- `+Page.jsx` — reads `pageContext.routeParams.slug`, resolves the component from the registry and renders it. An unknown slug renders nothing (in practice unreachable, since only registered slugs are pre-rendered).
- `+onBeforePrerenderStart.js` — emits `/fr/article/<slug>` and `/en/article/<slug>` for every slug in the registry. **An article is only pre-rendered if it is in the registry.**
- `+title.js` / `+description.js` — page title and meta description, read from `i18n.articles.items` for the current locale.

The `/fr` or `/en` prefix is stripped by `pages/+onBeforeRoute.js` and exposed as `pageContext.locale`. `pages/+Layout.jsx` reads `routeParams.slug` and switches `Nav.jsx` into article mode (back link + language toggle, no section links, IntersectionObserver disabled).

Canonical and hreflang tags in `pages/+Head.jsx` are derived from the path, so article pages get correct SEO tags with no per-article work. `scripts/generate-sitemap.mjs` walks `dist/client/` after the build, so article URLs land in `sitemap.xml` automatically.

### ArticleLayout

Props: `title`, `subtitle`, `date`, `lang`, `backHref`, `badge` (optional).

The badge displays in the header, below the subtitle — used to frame the context of an article (e.g. an experimental lab). Article body content is wrapped in `.prose-custom`, styled in `index.css` (headings, tables, code blocks, blockquotes).

### Adding an article

1. Create `src/articles/MyArticle.jsx` with FR and EN content, rendered through `ArticleLayout`
2. Register it in `src/articles/index.js`: `'my-slug': MyArticle`
3. Add an entry in `src/i18n.js` under `articles.items` (both FR and EN) with `slug: 'my-slug'`

`src/__tests__/articles.test.js` enforces that registry and i18n entries stay in sync in both directions.

## Project cards

Each project in `i18n.js` under `projects.items` has the following fields:

- `title` — project name
- `subtitle` — short one-line descriptor shown under the title
- `situation` — short paragraph describing the starting context and need
- `intervention` — short paragraph describing what was built
- `result` — short paragraph describing the outcome (rendered in accent color)
- `tags` — array of stack/keyword tags
- `image` — path to a file in `public/` (SVG displayed at 75% with opacity, PNG as object-cover)
- `url` (optional) — public URL of the project
- `github` (optional) — GitHub repository URL
- `githubOnly` (optional) — when true and `url` is absent, the entire card links to `github`
- `gradient` (optional) — Tailwind classes for the image area background

A GitHub icon appears in the top right of any card with a `github` field, clickable independently from the card's main link.

## FAQ section

`Faq.jsx` renders an accordion of items from `i18n.faq.items`. Multiple items can be opened simultaneously. State is local to the component and keyed by the question text (stable across renders). Animations use Framer Motion's `AnimatePresence` and respect `prefers-reduced-motion`.

## About section

`About.jsx` renders, in order:

- `paragraphs` — general intro paragraphs
- `audience` — who the audience is, with a label and text
- `method` — labeled list of working principles
- `recent` — recent experience block
- `stats` — sidebar of three stats (value + label)

## Adding a section

1. Create `src/sections/NewSection.jsx`
2. Add FR/EN content in `src/i18n.js` (parity is enforced by `src/__tests__/i18n.test.js`)
3. Import and place the component in `pages/index/+Page.jsx`
4. If the section should appear in the nav, add the id in `Nav.jsx` (`ids` array in IntersectionObserver, plus an entry in `navLinks`) and a label in `i18n.nav` for both languages
