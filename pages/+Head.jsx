import { usePageContext } from 'vike-react/usePageContext';
import { translations } from '../src/i18n.js';
import { barePath as toBarePath, localePath } from '../src/urls.js';

const SITE = 'https://al-si.com';

const ogDescriptions = {
  fr: "Quand votre projet ne rentre dans aucune case, c'est là que j'interviens. Intégration de systèmes, reprise et modernisation, plateformes sur mesure — jusqu'en production.",
  en: "When your project doesn't fit any mold, that's where I come in. Systems integration, takeover and modernization, custom platforms — all the way to production.",
};

export default function Head() {
  const pageContext = usePageContext();
  const locale = pageContext.locale || 'fr';

  // Strip /fr or /en prefix to get the bare path, then build both prefixed URLs
  const url = pageContext.urlPathname || '/';
  const barePath = toBarePath(url);
  const pathFr = localePath('fr', barePath);
  const pathEn = localePath('en', barePath);
  const canonical = locale === 'en' ? `${SITE}${pathEn}` : `${SITE}${pathFr}`;
  const articleSlug = barePath.match(/^\/article\/([^/]+)\/?$/)?.[1];
  const localizedContent = translations[locale] || translations.fr;
  const article = articleSlug ? localizedContent.articles.items.find((item) => item.slug === articleSlug) : undefined;
  const title = article
    ? `${article.title} — AL-SI`
    : locale === 'en'
      ? 'Alexandre Lessard – Integrated Solutions | Systems Integration Consultant | AL-SI'
      : 'Alexandre Lessard – Solutions intégrées | Consultant en intégration de systèmes | AL-SI';
  const description = article?.excerpt || ogDescriptions[locale] || ogDescriptions.fr;
  // The error page is pre-rendered as a single /404.html served on any unknown
  // URL, so a canonical or hreflang pointing at /fr/404 would advertise a page
  // that doesn't exist. It must stay out of the index entirely.
  const isErrorPage =
    pageContext.is404 === true || pageContext.abortStatusCode !== undefined || barePath.replace(/\/$/, '') === '/404';

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#050505" />
      {!isErrorPage && (
        <>
          <link rel="canonical" href={canonical} />
          <link rel="alternate" hrefLang="fr-CA" href={`${SITE}${pathFr}`} />
          <link rel="alternate" hrefLang="en" href={`${SITE}${pathEn}`} />
          <link rel="alternate" hrefLang="x-default" href={`${SITE}${pathFr}`} />
        </>
      )}
      <meta name="robots" content={isErrorPage ? 'noindex, follow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={isErrorPage ? SITE : canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${SITE}/share-card.jpg`} />
      <meta property="og:locale" content={locale === 'en' ? 'en_US' : 'fr_CA'} />
      <meta property="og:description" content={description} />
      {article?.datePublished && <meta property="article:published_time" content={article.datePublished} />}
      {article && <meta property="article:author" content="https://www.linkedin.com/in/alexandre-lessard-3b103991/" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE}/share-card.jpg`} />

      {/* Fonts — non-blocking via media swap pattern */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        crossOrigin="anonymous"
      />
      <span
        dangerouslySetInnerHTML={{
          __html: `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'" crossorigin="anonymous"><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" crossorigin="anonymous"></noscript>`,
        }}
      />

      {/* GA4 */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-4Y11DRD9JE" />
      <script src="/ga.js" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Alexandre Lessard – Solutions intégrées',
            alternateName: 'AL-SI',
            email: 'mailto:alex@al-si.com',
            url: SITE,
            logo: `${SITE}/logo.svg`,
            image: `${SITE}/share-card.jpg`,
            description:
              locale === 'en'
                ? "Systems integration consultant: connecting software that doesn't talk to each other, taking over and modernizing existing systems, building custom platforms, all the way to production."
                : "Consultant en intégration de systèmes : brancher ensemble des logiciels qui ne se parlent pas, reprendre et moderniser des systèmes existants, bâtir des plateformes sur mesure, jusqu'en production.",
            founder: {
              '@type': 'Person',
              name: 'Alexandre Lessard',
              url: SITE,
              sameAs: [
                'https://www.linkedin.com/in/alexandre-lessard-3b103991/',
                'https://pige.quebec/profil/tqncfcru7lde49/',
                'https://github.com/Alexandre-Lessard',
              ],
              jobTitle: locale === 'en' ? 'Systems Integration Consultant' : 'Consultant en intégration de systèmes',
              knowsLanguage: ['fr', 'en'],
            },
            address: { '@type': 'PostalAddress', addressRegion: 'QC', addressCountry: 'CA' },
            areaServed: { '@type': 'Country', name: 'Canada' },
            sameAs: [
              'https://www.linkedin.com/in/alexandre-lessard-3b103991/',
              'https://www.facebook.com/profile.php?id=100094510380507',
            ],
            knowsAbout: [
              locale === 'en' ? 'Systems integration' : 'Intégration de systèmes',
              locale === 'en' ? 'Legacy system modernization' : 'Modernisation de systèmes',
              locale === 'en' ? 'Disaster recovery' : 'Reprise après sinistre',
              locale === 'en' ? 'Local AI' : 'IA locale',
              'React',
              'Python',
              'Node.js',
              'SaaS',
              'API',
              'Vite',
              'Tailwind CSS',
              'JavaScript',
              'Automatisation',
              'Docker',
              'Linux',
              'Cloud',
              'DevOps',
            ],
          }),
        }}
      />
      {!article && !isErrorPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: localizedContent.faq.items.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            }),
          }}
        />
      )}
      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              headline: article.title,
              description,
              datePublished: article.datePublished,
              inLanguage: locale === 'en' ? 'en' : 'fr-CA',
              mainEntityOfPage: canonical,
              image: `${SITE}/share-card.jpg`,
              author: {
                '@type': 'Person',
                name: 'Alexandre Lessard',
                url: 'https://www.linkedin.com/in/alexandre-lessard-3b103991/',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Alexandre Lessard – Solutions intégrées',
                url: SITE,
                logo: {
                  '@type': 'ImageObject',
                  url: `${SITE}/logo.svg`,
                },
              },
            }),
          }}
        />
      )}
    </>
  );
}
