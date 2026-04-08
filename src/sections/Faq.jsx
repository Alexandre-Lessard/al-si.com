import { useState } from 'react';
import { translations } from '../i18n';
import { sectionClasses } from '../styles';
import { SectionHeader } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';

const ChevronIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FaqItem = ({ item, isOpen, onToggle, index }) => {
  const id = `faq-${index}`;
  return (
    <div className="border border-line rounded-2xl bg-surface overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        className="w-full flex items-center justify-between gap-4 p-6 text-left bg-transparent border-0 cursor-pointer hover:text-accent transition-colors duration-200"
      >
        <span className="text-base font-semibold">{item.question}</span>
        <ChevronIcon open={isOpen} />
      </button>
      {isOpen && (
        <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} className="px-6 pb-6 -mt-1">
          <p className="text-sm text-muted leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = ({ lang }) => {
  const t = translations[lang] || translations.fr;
  const { title, items } = t.faq;
  const [openSet, setOpenSet] = useState(new Set());

  const toggle = (index) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
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
            <FaqItem item={item} isOpen={openSet.has(i)} onToggle={() => toggle(i)} index={i} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Faq;
