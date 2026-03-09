import { motion } from 'framer-motion';
import { translations } from '../i18n';
import { containerClasses } from '../styles';
import { Button } from '../components/ui';

const Hero = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { heading, subtitle, cta } = t.hero;

  return (
    <section
      id="accueil"
      className={`${containerClasses} flex gap-16 items-center min-h-[85vh] pt-24 pb-20 max-[960px]:flex-col max-[960px]:text-center max-[960px]:pt-28 max-[960px]:gap-10`}
    >
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-accent text-sm font-medium uppercase tracking-[0.15em] mb-4">
          {heading[1]}
        </p>
        <h1 className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.1] mb-6">
          {heading[0]}
        </h1>
        <p className="text-lg text-muted mb-10 max-w-lg max-[960px]:mx-auto">{subtitle}</p>
        <div className="flex gap-4 max-[960px]:justify-center flex-wrap">
          <Button href="#contact" variant="primary">{cta.primary}</Button>
          <Button href="#services" variant="secondary">{cta.secondary}</Button>
        </div>
      </motion.div>

      <motion.div
        className="hero-photo-glow relative z-0 w-[320px] max-[960px]:w-[240px] shrink-0"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="aspect-square overflow-hidden rounded-[48px]">
          <img
            className="w-full h-full object-cover scale-110"
            src="/alexandre-lessard.webp"
            alt="Alexandre Lessard développeur full-stack"
            width="1047"
            height="971"
            loading="eager"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
