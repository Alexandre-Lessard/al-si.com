import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';

const About = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, paragraphs, audience, method, recent, stats } = t.about;

  return (
    <section id="about" className={sectionClasses}>
      <ScrollReveal>
        <SectionHeader title={title} />
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-12 items-start">
        <ScrollReveal>
          <div>
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base text-muted leading-relaxed mb-6">
                {p}
              </p>
            ))}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">{audience.label}</h3>
              <p className="text-base text-muted leading-relaxed">{audience.text}</p>
            </div>
            <div className="mt-8 mb-2">
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">{method.title}</h3>
              <ul className="space-y-3">
                {method.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-muted leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-8 border-t border-line">
              <h3 className="text-lg font-semibold mb-1">{recent.title}</h3>
              <p className="text-sm text-accent mb-4">{recent.subtitle}</p>
              <p className="text-base text-muted leading-relaxed">{recent.text}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="bg-surface border border-line rounded-2xl p-8">
            {stats.map((stat, i) => (
              <div key={i} className={`${i > 0 ? 'mt-6 pt-6 border-t border-line' : ''}`}>
                <span className="text-3xl font-bold text-accent block mb-1">{stat.value}</span>
                <span className="text-sm text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
