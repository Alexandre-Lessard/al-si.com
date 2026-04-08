import { useState, useEffect, Suspense, Component } from 'react';
import Nav from './sections/Nav.jsx';
import Hero from './sections/Hero.jsx';
import ProofBand from './sections/ProofBand.jsx';
import About from './sections/About.jsx';
import Services from './sections/Services.jsx';
import HowItWorks from './sections/HowItWorks.jsx';
import Projects from './sections/Projects.jsx';
import Testimonials from './sections/Testimonials.jsx';
import Faq from './sections/Faq.jsx';
import Articles from './sections/Articles.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import { articles } from './articles/index.js';
import { translations } from './i18n';

class ArticleErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    window.history.replaceState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function App() {
  const [lang, setLang] = useState('fr');
  const [articleSlug, setArticleSlug] = useState(null);
  const t = translations[lang] || translations.fr;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Pathname-based article routing
  useEffect(() => {
    const handleRoute = () => {
      // Backward compat: redirect old hash URLs to pathname
      if (window.location.hash.match(/^#article\//)) {
        const slug = window.location.hash.replace('#article/', '');
        window.history.replaceState({}, '', `/article/${slug}`);
      }

      const match = window.location.pathname.match(/^\/article\/(.+)$/);
      setArticleSlug(match ? match[1] : null);
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  // Scroll to top, focus main, and track GA4 page view when entering an article
  useEffect(() => {
    if (articleSlug) {
      window.scrollTo(0, 0);
      document.getElementById('main')?.focus();

      if (window.gtag) {
        window.gtag('event', 'page_view', { page_path: `/article/${articleSlug}` });
      }
    }
  }, [articleSlug]);

  const handleBack = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Validate slug — redirect to homepage if article doesn't exist
  const ArticleComponent = articleSlug ? articles[articleSlug] : null;
  useEffect(() => {
    if (articleSlug && !articles[articleSlug]) {
      window.history.replaceState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [articleSlug]);

  return (
    <div
      className="min-h-screen overflow-x-clip"
      style={{
        background: `
          radial-gradient(at 90% 15%, rgba(255, 123, 84, 0.35), transparent 55%),
          radial-gradient(at 85% 70%, rgba(128, 42, 22, 0.45), transparent 45%),
          #050505
        `,
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded focus:font-medium focus:text-sm focus:outline-none"
      >
        {t.nav.skipToContent || (lang === 'en' ? 'Skip to content' : 'Aller au contenu')}
      </a>
      <Nav lang={lang} setLang={setLang} articleSlug={articleSlug} onBack={handleBack} />
      <main id="main" tabIndex="-1" className="outline-none">
        {ArticleComponent ? (
          <ArticleErrorBoundary>
            <Suspense fallback={<div className="min-h-screen" />}>
              <ArticleComponent lang={lang} onBack={handleBack} />
            </Suspense>
          </ArticleErrorBoundary>
        ) : (
          <>
            <Hero lang={lang} />
            <ProofBand lang={lang} />
            <Services lang={lang} />
            <HowItWorks lang={lang} />
            <Projects lang={lang} />
            <Testimonials lang={lang} />
            <Faq lang={lang} />
            <About lang={lang} />
            <Articles lang={lang} />
            <Contact lang={lang} />
          </>
        )}
      </main>
      <Footer lang={lang} />
    </div>
  );
}

export default App;
