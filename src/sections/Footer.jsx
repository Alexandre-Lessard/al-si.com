import { translations } from '../i18n';

const Footer = ({ lang }) => {
  const t = translations[lang] || translations.fr;

  return (
    <footer className="py-16 text-center text-muted text-sm border-t border-line">
      <span>© {new Date().getFullYear()} Alexandre Lessard — {t.footer.text}</span>
    </footer>
  );
};

export default Footer;
