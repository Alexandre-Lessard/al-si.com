import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';

const ChevronIcon = ({ open, animate }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 shrink-0 ${animate ? 'transition-transform duration-200' : ''} ${open ? 'rotate-180' : ''}`}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FaqItem = ({ item, isOpen, onToggle, id, animate }) => {
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  return (
    <div className="border border-line rounded-2xl bg-surface hover:border-accent/30 transition-colors duration-300 overflow-hidden">
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={buttonId}
          className="w-full flex items-center justify-between gap-4 p-6 text-left bg-transparent border-0 cursor-pointer hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
        >
          <span className="text-base font-semibold">{item.question}</span>
          <ChevronIcon open={isOpen} animate={animate} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={animate ? { height: 0, opacity: 0 } : false}
            animate={{ height: 'auto', opacity: 1 }}
            exit={animate ? { height: 0, opacity: 0 } : { opacity: 0 }}
            transition={animate ? { duration: 0.2, ease: 'easeOut' } : { duration: 0 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm text-muted leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, items } = t.faq;
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;
  const [openItems, setOpenItems] = useState(() => new Set());

  const toggle = (key) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section id="faq" className={sectionClasses}>
      <ScrollReveal>
        <SectionHeader title={title} />
      </ScrollReveal>

      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <FaqItem
              item={item}
              isOpen={openItems.has(i)}
              onToggle={() => toggle(i)}
              id={`faq-${i}`}
              animate={animate}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Faq;
