import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';

const Articles = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, comingSoon, items } = t.articles;

  return (
    <section id="articles" className={sectionClasses}>
      <ScrollReveal>
        <SectionHeader title={title} />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((article, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <article className="border border-line rounded-2xl p-6 bg-surface hover:border-accent/30 transition-all duration-300 opacity-60 h-full flex flex-col">
              <span className="text-xs text-muted mb-3">{article.date}</span>
              <h3 className="text-base font-semibold mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-muted line-clamp-3 mb-4 flex-1">{article.excerpt}</p>
              <span className="text-accent text-sm font-medium">{comingSoon}</span>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Articles;
