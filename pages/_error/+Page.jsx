import { usePageContext } from 'vike-react/usePageContext';

export default function ErrorPage() {
  const pageContext = usePageContext();
  const is404 = pageContext.is404 ?? pageContext.abortStatusCode === 404;
  const locale = pageContext.locale || 'fr';
  const isEn = locale === 'en';
  const homeUrl = isEn ? '/en' : '/fr';

  const title = is404
    ? isEn
      ? 'Page not found'
      : 'Page introuvable'
    : isEn
      ? 'Something went wrong'
      : 'Une erreur est survenue';
  const subtitle = is404
    ? isEn
      ? 'The page you are looking for does not exist or has been moved.'
      : "La page que vous cherchez n'existe pas ou a été déplacée."
    : isEn
      ? 'Sorry about that. Please try again later.'
      : 'Désolé. Veuillez réessayer plus tard.';
  const cta = isEn ? 'Back to homepage' : "Retour à l'accueil";

  return (
    <section className="w-[min(1200px,calc(100%-48px))] md:w-[min(1200px,calc(100%-80px))] mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center pt-24 pb-20">
      <p className="text-accent text-sm font-medium uppercase tracking-[0.15em] mb-4">{is404 ? '404' : 'Error'}</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h1>
      <p className="text-base text-muted max-w-md mb-8">{subtitle}</p>
      <a
        href={homeUrl}
        className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-sm bg-accent text-black hover:bg-white border border-transparent hover:border-accent transition-all duration-300"
      >
        {cta}
      </a>
    </section>
  );
}
