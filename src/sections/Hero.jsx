import { translations } from '../i18n';
import { sectionClasses } from '../styles';

const hero1200 = '/hero-1200w.webp';
const hero800 = '/hero-800w.webp';
const hero480 = '/hero-480w.webp';

const Hero = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { heading, subtitle, alt } = t.hero;

  return (
    <section
      id="accueil"
      className={`${sectionClasses} flex gap-16 items-center min-h-[90vh] max-[960px]:flex-col max-[960px]:text-center`}
    >
      <div className="flex-1">
        <h1 className="flex flex-col gap-1.5 text-[clamp(2.5rem,5vw,3rem)] uppercase mt-0 mb-6 leading-tight">
          {heading.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h1>
        <p className="text-lg text-muted">{subtitle}</p>
      </div>
      <div className="hero-image-glow flex-[0_0_40%] relative z-0 aspect-[3/4] w-full">
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
