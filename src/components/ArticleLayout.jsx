import { motion } from 'framer-motion';
import { containerClasses } from '../styles';

const ArticleLayout = ({ title, subtitle, date, lang, children, onBack, badge }) => {
  const backLabel = lang === 'en' ? 'Back' : 'Retour';

  return (
    <article className={`${containerClasses} pt-28 pb-20`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors duration-200 mb-10 bg-transparent border-0 cursor-pointer p-0"
        >
          <span aria-hidden="true">&larr;</span> {backLabel}
        </button>

        <header className="mb-12">
          {date && <span className="text-sm text-accent font-medium block mb-3">{date}</span>}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">{title}</h1>
          {subtitle && <p className="text-lg text-muted mb-0">{subtitle}</p>}
          {badge && <div className="mt-4">{badge}</div>}
        </header>

        <div className="prose-custom">
          {children}
        </div>
      </motion.div>
    </article>
  );
};

export default ArticleLayout;
