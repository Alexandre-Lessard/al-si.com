import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import Card from '../components/Card';

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-accent/30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
  </svg>
);

const Testimonials = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, items } = t.testimonials;

  return (
    <section id="testimonials" className={sectionClasses}>
      <ScrollReveal>
        <SectionHeader title={title} />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <Card className="p-8 flex flex-col justify-between">
              <div>
                <QuoteIcon />
                <blockquote className="text-sm text-muted leading-relaxed mt-4">{item.quote}</blockquote>
              </div>
              <div className="mt-6 pt-6 border-t border-line">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-muted">{item.role}</p>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
