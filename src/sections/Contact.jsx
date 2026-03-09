import { translations } from '../i18n';
import { sectionClasses } from '../styles';

const Contact = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const contactContent = t.contact;

  return (
    <section
      id="contact"
      className={`${sectionClasses} border-b-0 pb-12`}
    >
      <h2 className="mt-0 mb-8 leading-tight">{contactContent.title}</h2>
      {contactContent.paragraphs.map((paragraph, i) => (
        <p key={i} className="text-text leading-relaxed mb-6">
          {paragraph}
        </p>
      ))}

      <div className="flex flex-wrap gap-3">
        {contactContent.channels.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="inline-flex items-center gap-1.5 border border-text rounded-full px-8 py-2.5 font-semibold transition-all duration-300 hover:bg-white hover:text-bg hover:border-white"
            target="_blank"
            rel="noreferrer"
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
