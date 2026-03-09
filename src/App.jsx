import { useState, useEffect } from 'react';
import Nav from './sections/Nav.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Services from './sections/Services.jsx';
import Projects from './sections/Projects.jsx';
import Articles from './sections/Articles.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import { articles } from './articles/index.js';

function App() {
  const [lang, setLang] = useState('fr');
  const [articleSlug, setArticleSlug] = useState(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Hash-based article navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#article\/(.+)$/);
      setArticleSlug(match ? match[1] : null);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Scroll to top when entering an article
  useEffect(() => {
    if (articleSlug) window.scrollTo(0, 0);
  }, [articleSlug]);

  const handleBack = () => {
    window.location.hash = '';
  };

  // Validate slug — redirect to homepage if article doesn't exist
  const ArticleComponent = articleSlug ? articles[articleSlug] : null;
  useEffect(() => {
    if (articleSlug && !articles[articleSlug]) {
      window.location.hash = '';
    }
  }, [articleSlug]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(at 90% 15%, rgba(255, 123, 84, 0.35), transparent 55%),
          radial-gradient(at 85% 70%, rgba(128, 42, 22, 0.45), transparent 45%),
          #050505
        `,
      }}
    >
      <Nav lang={lang} setLang={setLang} articleSlug={articleSlug} onBack={handleBack} />
      <main>
        {ArticleComponent ? (
          <ArticleComponent lang={lang} onBack={handleBack} />
        ) : (
          <>
            <Hero lang={lang} />
            <About lang={lang} />
            <Services lang={lang} />
            <Projects lang={lang} />
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
