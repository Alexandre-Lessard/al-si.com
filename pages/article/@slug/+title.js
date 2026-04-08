import { translations } from '../../../src/i18n.js';

export default (pageContext) => {
  const locale = pageContext.locale || 'fr';
  const slug = pageContext.routeParams?.slug;
  const t = translations[locale] || translations.fr;
  const article = t.articles.items.find((a) => a.slug === slug);
  if (!article) return locale === 'en' ? 'Article — AL-SI' : 'Article — AL-SI';
  return locale === 'en' ? `${article.title} — AL-SI` : `${article.title} — AL-SI`;
};
