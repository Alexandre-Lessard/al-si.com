import { motion, useReducedMotion } from 'framer-motion';
import { containerClasses } from '../styles';

const ArticleLayout = ({ title, subtitle, date, lang, children, backHref = '/fr/', badge, author, readingTime }) => {
  const backLabel = lang === 'en' ? 'Back' : 'Retour';
  const prefersReducedMotion = useReducedMotion();

  return (
    <article className={`${containerClasses} pt-28 pb-20`}>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
      >
        <a
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors duration-200 mb-10"
        >
          <span aria-hidden="true">&larr;</span> {backLabel}
        </a>

        <header className="mb-12">
          {date && <span className="text-sm text-accent font-medium block mb-3">{date}</span>}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">{title}</h1>
          {subtitle && <p className="text-lg text-muted mb-0">{subtitle}</p>}
          {(author || readingTime) && (
            <div className="article-byline" aria-label={lang === 'en' ? 'Article details' : "Détails de l'article"}>
              {author && <span>{author}</span>}
              {readingTime && <span>{readingTime}</span>}
            </div>
          )}
          {badge && (
            <div className="mt-5">
              <span className="inline-block text-xs text-muted border border-accent/20 bg-accent/[0.04] rounded-full px-3 py-1.5">
                {badge}
              </span>
            </div>
          )}
        </header>

        <div className="prose-custom">{children}</div>
      </motion.div>
    </article>
  );
};

export default ArticleLayout;
