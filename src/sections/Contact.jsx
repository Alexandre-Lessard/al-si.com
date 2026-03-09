import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader, Button } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';

const Contact = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, paragraphs, channels } = t.contact;

  return (
    <section id="contact" className={`${sectionClasses} border-b-0`}>
      <ScrollReveal>
        <div className="bg-surface border border-line rounded-3xl p-10 md:p-16 text-center">
          <SectionHeader title={title} className="mb-6" />
          {paragraphs.map((p, i) => (
            <p key={i} className="text-base text-muted max-w-xl mx-auto mb-4 last:mb-8">{p}</p>
          ))}
          <div className="flex flex-col items-center gap-4">
            <Button
              href={channels[0].href}
              variant="primary"
              target="_blank"
              rel="noreferrer"
            >
              {channels[0].label}
            </Button>
            <div className="flex gap-4">
              {channels.slice(1).map(({ label, href }, i) => (
                <Button
                  key={i}
                  href={href}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Contact;
