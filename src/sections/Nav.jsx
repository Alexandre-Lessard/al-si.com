import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { translations } from '../i18n';
import { containerClasses } from '../styles';

const Nav = ({ lang, setLang }) => {
  const t = translations[lang] || translations.fr;
  const nav = t.nav;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileOpenRef = useRef(mobileOpen);
  mobileOpenRef.current = mobileOpen;

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 100 && y > lastY);
      lastY = y;
      if (mobileOpenRef.current) setMobileOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = ['about', 'services', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'about', label: nav.about },
    { id: 'services', label: nav.services },
    { id: 'projects', label: nav.projects },
    { id: 'contact', label: nav.contact },
  ];

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-line/50"
    >
      <div className={`${containerClasses} flex items-center justify-between h-16`}>
        {/* Logo */}
        <a href="#accueil" className="text-lg font-bold tracking-wider hover:text-accent">
          AL-SI
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className={`text-sm font-medium transition-colors duration-200 ${
                activeSection === id ? 'text-text' : 'text-muted hover:text-text'
              }`}
            >
              {label}
            </a>
          ))}

          {/* Language toggle */}
          <div className="flex items-center border border-line rounded-full overflow-hidden ml-2">
            <button
              className={`border-0 bg-transparent px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                lang === 'fr' ? 'bg-white/[0.08] text-text' : 'text-muted'
              }`}
              onClick={() => setLang('fr')}
            >
              FR
            </button>
            <button
              className={`border-0 bg-transparent px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                lang === 'en' ? 'bg-white/[0.08] text-text' : 'text-muted'
              }`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-0 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <span className={`hamburger-line ${mobileOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? '-translate-y-[4px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg/95 backdrop-blur-xl border-t border-line/50 overflow-hidden"
            aria-label="Navigation principale"
          >
            <div className={`${containerClasses} py-4 flex flex-col gap-3`}>
              {navLinks.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`text-base py-2 font-medium ${
                    activeSection === id ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-line/50">
                <button
                  className={`border-0 bg-transparent px-3 py-1.5 text-sm font-semibold cursor-pointer ${
                    lang === 'fr' ? 'text-accent' : 'text-muted'
                  }`}
                  onClick={() => { setLang('fr'); setMobileOpen(false); }}
                >
                  FR
                </button>
                <button
                  className={`border-0 bg-transparent px-3 py-1.5 text-sm font-semibold cursor-pointer ${
                    lang === 'en' ? 'text-accent' : 'text-muted'
                  }`}
                  onClick={() => { setLang('en'); setMobileOpen(false); }}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;
