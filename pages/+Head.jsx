import { usePageContext } from 'vike-react/usePageContext';

const SITE = 'https://al-si.com';

const ogDescriptions = {
  fr: "Concevoir, automatiser, faire évoluer. J'aide les entreprises à structurer leurs opérations et à lancer leurs idées — du cadrage initial à la mise en production.",
  en: 'Design, automate, evolve. I help businesses structure their operations and launch their ideas — from initial scoping to production.',
};

export default function Head() {
  const pageContext = usePageContext();
  const locale = pageContext.locale || 'fr';

  // Strip /fr or /en prefix to get the bare path, then build both prefixed URLs
  const url = pageContext.urlPathname || '/';
  const bareMatch = url.match(/^\/(fr|en)(\/.*)?$/);
  const barePath = bareMatch ? bareMatch[2] || '/' : url;
  const pathFr = barePath === '/' ? '/fr' : `/fr${barePath}`;
  const pathEn = barePath === '/' ? '/en' : `/en${barePath}`;
  const canonical = locale === 'en' ? `${SITE}${pathEn}` : `${SITE}${pathFr}`;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#050505" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="fr-CA" href={`${SITE}${pathFr}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE}${pathEn}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE}${pathFr}`} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${SITE}/share-card.jpg`} />
      <meta property="og:locale" content={locale === 'en' ? 'en_US' : 'fr_CA'} />
      <meta property="og:description" content={ogDescriptions[locale] || ogDescriptions.fr} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
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
                ? 'I design, automate and evolve custom web applications for businesses that want to save time, structure their operations or launch a new product.'
                : 'Je conçois, automatise et fais évoluer des applications web sur mesure pour les entreprises qui veulent gagner du temps, structurer leurs opérations ou lancer un nouveau produit.',
            founder: {
              '@type': 'Person',
              name: 'Alexandre Lessard',
              jobTitle: locale === 'en' ? 'Full-stack Developer' : 'Développeur full-stack',
              knowsLanguage: ['fr', 'en'],
            },
            address: { '@type': 'PostalAddress', addressRegion: 'QC', addressCountry: 'CA' },
            areaServed: { '@type': 'Country', name: 'Canada' },
            sameAs: [
              'https://www.linkedin.com/in/alexandre-lessard-3b103991/',
              'https://www.facebook.com/profile.php?id=100094510380507',
            ],
            knowsAbout: [
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
    </>
  );
}
