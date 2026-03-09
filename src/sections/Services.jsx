import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import { CodeIcon, NetworkIcon, ServerIcon } from '../icons';

const icons = [CodeIcon, NetworkIcon, ServerIcon];

const Services = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, categories } = t.services;

  return (
    <section id="services" className={sectionClasses}>
      <ScrollReveal>
        <SectionHeader title={title} />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, i) => {
          const Icon = icons[i] || CodeIcon;
          return (
            <ScrollReveal key={i} delay={i * 0.1}>
              <article className="p-8 border border-line rounded-2xl bg-surface hover:bg-surface-hover hover:border-accent/30 transition-all duration-300 group h-full">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-dim text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <ul className="space-y-2.5">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
