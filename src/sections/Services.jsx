import { translations } from '../i18n';

const Services = ({ lang }) => {
  const serviceContent = translations[lang].services;

  return (
    <section id="services" className="services">
      <h2>{serviceContent.title}</h2>
      <div className="services__grid">
        {serviceContent.categories.map((category) => (
          <article key={category.title}>
            <h3>{category.title}</h3>
            <ul>
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
