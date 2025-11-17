import { translations } from '../i18n';

const About = ({ lang }) => {
  const aboutContent = translations[lang].about;

  return (
    <section id="about" className="about">
      <h2>{aboutContent.title}</h2>
      {aboutContent.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
};

export default About;
