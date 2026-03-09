import { translations } from '../i18n';
import { sectionClasses } from '../styles';

const Services = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const serviceContent = t.services;

  return (
    <section id="services" className={sectionClasses}>
      <h2 className="mt-0 mb-8 leading-tight">{serviceContent.title}</h2>
      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {serviceContent.categories.map((category, i) => (
          <article
            key={i}
            className="p-6 border border-line rounded-2xl bg-white/[0.02] shadow-[0_15px_30px_rgba(0,0,0,0.35)]"
          >
            <h3 className="mt-5 mb-2.5 leading-tight">{category.title}</h3>
            <ul className="list-disc pl-5 m-0 text-muted">
              {category.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
