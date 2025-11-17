import { translations } from '../i18n';

const Contact = ({ lang }) => {
  const contactContent = translations[lang].contact;

  return (
    <section id="contact" className="contact">
      <h2>{contactContent.title}</h2>
      {contactContent.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <div className="contact__channels">
        {contactContent.channels.map(({ label, href }) => (
          <a key={label} href={href} className="pill contact__pill" target="_blank" rel="noreferrer">
            {label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
