import { motion, useReducedMotion } from 'framer-motion';
import { translations } from '../i18n';
import { containerClasses } from '../styles';
import { Button } from '../components/ui';

const Hero = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { eyebrow, heading, subtitle, proofAnchor, cta, alt } = t.hero;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="accueil"
      className={`${containerClasses} flex gap-12 items-center min-h-[85vh] pt-24 pb-20 border-b border-line max-[1450px]:gap-8 max-[1200px]:flex-col max-[1200px]:text-center max-[1200px]:pt-28 max-[1200px]:gap-10`}
    >
      <motion.div
        className="flex-1 max-[1450px]:max-w-[640px] max-[1200px]:max-w-none"
        initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-accent text-sm font-medium uppercase tracking-[0.15em] mb-4">{eyebrow}</p>
        <h1 className="text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-tight leading-[1.15] mb-6 max-w-3xl max-[1450px]:text-[2.4rem] max-[1200px]:mx-auto max-[480px]:text-[1.6rem] max-[480px]:leading-[1.2] max-[480px]:mb-4 max-[400px]:text-[1.35rem]">
          <span className="block whitespace-nowrap max-[1200px]:whitespace-normal">{heading[0]}</span>
          <span className="block whitespace-nowrap max-[1200px]:whitespace-normal">{heading[1]}</span>
        </h1>
        <p className="text-lg text-muted mb-6 max-w-xl max-[1200px]:mx-auto max-[480px]:text-base max-[480px]:mb-4">
          {subtitle}
        </p>
        {proofAnchor && (
          <p className="text-xs text-accent/80 font-medium uppercase tracking-wider mb-8 max-[480px]:text-[0.65rem] max-[480px]:tracking-wide max-[480px]:mb-6">
            {proofAnchor}
          </p>
        )}
        <div className="flex gap-4 max-[1200px]:justify-center flex-wrap">
          <Button
            href={cta.primary.href}
            variant="primary"
            {...(cta.primary.href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
          >
            {cta.primary.label}
          </Button>
          <Button
            href={cta.secondary.href}
            variant="secondary"
            {...(cta.secondary.href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
          >
            {cta.secondary.label}
          </Button>
        </div>
        {cta.reassurance && <p className="text-xs text-muted mt-4">{cta.reassurance}</p>}
      </motion.div>

      <motion.div
        className="relative z-0 w-[300px] max-[1450px]:w-[240px] max-[1200px]:w-[220px] max-[480px]:w-[160px] shrink-0"
        initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="aspect-square overflow-hidden rounded-[48px] ring-1 ring-white/[0.08] shadow-[0_12px_60px_rgba(0,0,0,0.7),0_4px_20px_rgba(0,0,0,0.5)]">
          <img
            className="w-full h-full object-cover scale-110"
            src="/alexandre-lessard.webp"
            alt={alt}
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
