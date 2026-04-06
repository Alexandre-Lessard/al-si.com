import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import Card from '../components/Card';

const ProofBand = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, subtitle, cases, footer } = t.proofBand;

  return (
    <section id="proof" className={sectionClasses}>
      <ScrollReveal>
        <SectionHeader title={title} className="mb-4" />
        <p className="text-base text-muted max-w-2xl mb-12">{subtitle}</p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((c, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <Card className="p-7 h-full flex flex-col">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">{c.tag}</p>
              <h3 className="text-base font-semibold mb-3">{c.client}</h3>
              <p className="text-sm text-muted leading-relaxed mb-5 flex-1">{c.text}</p>
              <p className="text-xs text-muted/80 pt-4 border-t border-line">{c.stack}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      {footer && (
        <ScrollReveal delay={0.3}>
          <p className="text-center text-xs text-accent/80 font-medium uppercase tracking-wider mt-12">{footer}</p>
        </ScrollReveal>
      )}
    </section>
  );
};

export default ProofBand;
