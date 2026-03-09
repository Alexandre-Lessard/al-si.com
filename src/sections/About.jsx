import { translations } from '../i18n';
import { sectionClasses } from '../styles';

const About = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const aboutContent = t.about;

  return (
    <section id="about" className={sectionClasses}>
      <h2 className="mt-0 mb-8 leading-tight">{aboutContent.title}</h2>
      {aboutContent.paragraphs.map((paragraph, i) => (
        <p key={i} className="text-text leading-relaxed mb-6">
          {paragraph}
        </p>
      ))}
    </section>
  );
};

export default About;
