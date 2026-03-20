const LanguageToggle = ({ lang, setLang, onSelect, variant = 'pill' }) => {
  const handle = (newLang) => {
    setLang(newLang);
    onSelect?.();
  };

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 pt-2 border-t border-line/50">
        <button
          className={`border-0 bg-transparent px-3 py-1.5 text-sm font-semibold cursor-pointer ${
            lang === 'fr' ? 'text-accent' : 'text-muted'
          }`}
          onClick={() => handle('fr')}
        >
          FR
        </button>
        <button
          className={`border-0 bg-transparent px-3 py-1.5 text-sm font-semibold cursor-pointer ${
            lang === 'en' ? 'text-accent' : 'text-muted'
          }`}
          onClick={() => handle('en')}
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center border border-line rounded-full overflow-hidden">
      <button
        className={`border-0 bg-transparent px-2.5 py-1 text-xs font-semibold cursor-pointer ${
          lang === 'fr' ? 'bg-white/[0.08] text-text' : 'text-muted'
        }`}
        onClick={() => handle('fr')}
      >
        FR
      </button>
      <button
        className={`border-0 bg-transparent px-2.5 py-1 text-xs font-semibold cursor-pointer ${
          lang === 'en' ? 'bg-white/[0.08] text-text' : 'text-muted'
        }`}
        onClick={() => handle('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
