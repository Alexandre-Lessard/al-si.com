import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { translations } from '../i18n';

const Footer = ({ lang, setLang }) => {
  const footerContent = translations[lang].footer;
  const navLabels =
    lang === 'fr'
      ? { about: 'À propos', services: 'Services', contact: 'Contact', menu: 'Menu' }
      : { about: 'About', services: 'Services', contact: 'Contact', menu: 'Menu' };

  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const navRef = useRef(null);

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
      <footer className="footer">
        <span>© {new Date().getFullYear()} Alexandre Lessard — {footerContent.text}</span>
      </footer>

      <div className="floating-nav-container">
        <CSSTransition
          in={!isCollapsed}
          timeout={500}
          classNames="floating-nav"
          nodeRef={navRef}
          unmountOnExit
          onEnter={() => setShowToggle(false)}
          onExited={() => setShowToggle(true)}
        >
          <nav ref={navRef} className="floating-nav-content">
            <a href="#accueil">AL-SI</a>
            <a href="#about">{navLabels.about}</a>
            <a href="#services">{navLabels.services}</a>
            <a href="#contact">{navLabels.contact}</a>
            <div className="floating-nav__lang">
              <button
                className={lang === 'fr' ? 'active' : ''}
                onClick={() => setLang('fr')}
              >
                FR
              </button>
              <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
          </nav>
        </CSSTransition>

        {showToggle && (
          <button
            className="floating-nav__toggle show"
            onClick={() => {
              setIsCollapsed(false);
              setShowToggle(false);
            }}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>
    </>
  );
};

export default Footer;
