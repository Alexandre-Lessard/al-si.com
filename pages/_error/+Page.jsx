import { usePageContext } from 'vike-react/usePageContext';

// This page is pre-rendered once as /404.html and Cloudflare Pages serves that
// single file for every not-found URL, in both locales. Locale-dependent copy
// would therefore mismatch on hydration: the static HTML is always French,
// while the client resolves the locale from the URL it was served on. Both
// languages are rendered side by side so server and client output agree.
const copy = {
  notFound: {
    fr: {
      title: 'Page introuvable',
      subtitle: "La page que vous cherchez n'existe pas ou a été déplacée.",
      cta: "Retour à l'accueil",
    },
    en: {
      title: 'Page not found',
      subtitle: 'The page you are looking for does not exist or has been moved.',
      cta: 'Back to homepage',
    },
  },
  error: {
    fr: {
      title: 'Une erreur est survenue',
      subtitle: 'Désolé. Veuillez réessayer plus tard.',
      cta: "Retour à l'accueil",
    },
    en: {
      title: 'Something went wrong',
      subtitle: 'Sorry about that. Please try again later.',
      cta: 'Back to homepage',
    },
  },
};

const ctaClasses =
  'inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300';

export default function ErrorPage() {
  const pageContext = usePageContext();
  const is404 = pageContext.is404 ?? pageContext.abortStatusCode === 404;
  const { fr, en } = is404 ? copy.notFound : copy.error;

  return (
    <section className="w-[min(1200px,calc(100%-48px))] md:w-[min(1200px,calc(100%-80px))] mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center pt-24 pb-20">
      <p className="text-accent text-sm font-medium uppercase tracking-[0.15em] mb-4">{is404 ? '404' : 'Error'}</p>

      <div lang="fr-CA">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{fr.title}</h1>
        <p className="text-base text-muted max-w-md mx-auto">{fr.subtitle}</p>
      </div>

      <div lang="en" className="mt-8 pt-8 border-t border-line w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{en.title}</h2>
        <p className="text-base text-muted max-w-md mx-auto">{en.subtitle}</p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href="/fr/"
          lang="fr-CA"
          className={`${ctaClasses} bg-accent text-black hover:bg-white border border-transparent hover:border-accent`}
        >
          {fr.cta}
        </a>
        <a
          href="/en/"
          lang="en"
          className={`${ctaClasses} border border-text/30 text-text hover:border-accent hover:text-accent`}
        >
          {en.cta}
        </a>
      </div>
    </section>
  );
}
