import { translations } from '../i18n';

const hero1200 = '/hero-1200w.webp';
const hero800 = '/hero-800w.webp';
const hero480 = '/hero-480w.webp';

const Hero = ({ lang }) => {
  const { heading, subtitle, alt } = translations[lang].hero;

  return (
    <section id="accueil" className="hero">
      <div className="hero__text">
        <h1>
          {heading.map((line) => (
            <span key={line} className="hero__line">
              {line}
            </span>
          ))}
        </h1>
        <p className="hero__subtitle">{subtitle}</p>
      </div>
      <div className="hero__image">
        <img
          src={hero800}
          srcSet={`${hero480} 480w, ${hero800} 800w, ${hero1200} 1200w`}
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
          alt={alt}
          width="800"
          height="1067"
          loading="eager"
        />
      </div>
    </section>
  );
};

export default Hero;
