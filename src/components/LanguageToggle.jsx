import { usePageContext } from 'vike-react/usePageContext';

// Build the URL of the same page in the requested locale, with explicit prefix.
function getAlternateUrl(currentUrl, targetLocale) {
  const path = currentUrl || '/';
  const match = path.match(/^\/(fr|en)(\/.*)?$/);
  const barePath = match ? match[2] || '/' : path;
  const prefix = `/${targetLocale}`;
  return barePath === '/' ? prefix : `${prefix}${barePath}`;
}

// Persist the user's manual language choice for one year. The Cloudflare
// middleware reads this cookie on the next visit to '/' and routes accordingly.
function rememberLocale(targetLocale) {
  if (typeof document === 'undefined') return;
  document.cookie = `lang=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
}

const LanguageToggle = ({ lang: langProp, onSelect, variant = 'pill' }) => {
  // usePageContext returns undefined outside a Vike provider (e.g., unit tests).
  const pageContext = usePageContext() || {};
  const currentLang = langProp || pageContext.locale || 'fr';
  const currentUrl = pageContext.urlPathname || '/';
  const frHref = getAlternateUrl(currentUrl, 'fr');
  const enHref = getAlternateUrl(currentUrl, 'en');

  // Vike's link interceptor reads the `keep-scroll-position` HTML attribute on
  // the <a> and preserves scroll natively. We just need to set the cookie before
  // Vike takes over the navigation, and let the click bubble through.
  const handleClick = (targetLocale) => {
    rememberLocale(targetLocale);
    if (onSelect) onSelect();
  };

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 pt-2 border-t border-line/50">
        <a
          href={frHref}
          keep-scroll-position=""
          onClick={() => handleClick('fr')}
          className={`border-0 bg-transparent px-3 py-1.5 text-sm font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            currentLang === 'fr' ? 'text-accent' : 'text-muted'
          }`}
        >
          FR
        </a>
        <a
          href={enHref}
          keep-scroll-position=""
          onClick={() => handleClick('en')}
          className={`border-0 bg-transparent px-3 py-1.5 text-sm font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            currentLang === 'en' ? 'text-accent' : 'text-muted'
          }`}
        >
          EN
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center border border-line rounded-full overflow-hidden">
      <a
        href={frHref}
        keep-scroll-position=""
        onClick={() => handleClick('fr')}
        className={`border-0 bg-transparent px-2.5 py-1 text-xs font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          currentLang === 'fr' ? 'bg-white/[0.08] text-text' : 'text-muted'
        }`}
      >
        FR
      </a>
      <a
        href={enHref}
        keep-scroll-position=""
        onClick={() => handleClick('en')}
        className={`border-0 bg-transparent px-2.5 py-1 text-xs font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          currentLang === 'en' ? 'bg-white/[0.08] text-text' : 'text-muted'
        }`}
      >
        EN
      </a>
    </div>
  );
};

export default LanguageToggle;
