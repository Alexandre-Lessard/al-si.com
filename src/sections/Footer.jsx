import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { translations } from '../i18n';

const Footer = ({ lang, setLang }) => {
  const t = translations[lang] || translations.fr;
  const footerContent = t.footer;
  const navLabels = t.nav;

  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsCollapsed(false);
      return;
    }
    if (isCollapsed) return;

    const timer = setTimeout(() => setIsCollapsed(true), 3000);
    const handleScroll = () => setIsCollapsed(true);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, isCollapsed]);

  return (
    <>
      <footer className="pt-12 pb-2 text-center text-muted text-sm">
        <span>© {new Date().getFullYear()} Alexandre Lessard — {footerContent.text}</span>
      </footer>

      <div className="fixed left-1/2 bottom-8 -translate-x-1/2 z-[999] w-[min(520px,calc(100%-32px))] flex justify-center">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.nav
              key="nav"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="nav-content w-full flex justify-between gap-2 px-4.5 py-3.5 rounded-[18px] bg-[rgba(5,5,5,0.9)] border border-line shadow-[0_20px_45px_rgba(0,0,0,0.55)] backdrop-blur-md max-[960px]:flex-wrap max-[960px]:gap-1.5 max-[960px]:p-3"
            >
              <a href="#accueil">AL-SI</a>
              <a href="#about">{navLabels.about}</a>
              <a href="#services">{navLabels.services}</a>
              <a href="#contact">{navLabels.contact}</a>
              <div className="flex items-center justify-center border border-line rounded-full overflow-hidden ml-2 max-[960px]:flex-[1_1_100%] max-[960px]:justify-center">
                <button
                  className={`border-0 bg-transparent px-3 py-1.5 font-semibold cursor-pointer flex items-center justify-center flex-1 ${
                    lang === 'fr' ? 'bg-white/[0.08] text-text' : 'text-muted'
                  }`}
                  onClick={() => setLang('fr')}
                >
                  FR
                </button>
                <button
                  className={`border-0 bg-transparent px-3 py-1.5 font-semibold cursor-pointer flex items-center justify-center flex-1 ${
                    lang === 'en' ? 'bg-white/[0.08] text-text' : 'text-muted'
                  }`}
                  onClick={() => setLang('en')}
                >
                  EN
                </button>
              </div>
            </motion.nav>
          ) : (
            <motion.button
              key="toggle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-16 h-16 p-0 inline-flex flex-col justify-center items-center gap-1.5 rounded-full border border-line bg-[rgba(5,5,5,0.9)] shadow-[0_12px_35px_rgba(0,0,0,0.45)] cursor-pointer max-[960px]:w-[90px]"
              onClick={() => setIsCollapsed(false)}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Footer;
