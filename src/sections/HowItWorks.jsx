import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';

const HowItWorks = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, subtitle, steps } = t.howItWorks;

  return (
    <section id="how-it-works" className={sectionClasses}>
      <ScrollReveal>
        <SectionHeader title={title} className="mb-4" />
        <p className="text-base text-muted max-w-2xl mb-12">{subtitle}</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="relative h-full p-7 border border-line rounded-2xl bg-surface hover:border-accent/30 transition-all duration-300">
              <span className="text-4xl font-bold text-accent/40 leading-none block mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-base font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
