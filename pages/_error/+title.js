// The single pre-rendered 404.html is served for both locales, so the title is
// bilingual for the same reason the page body is.
export default (pageContext) => {
  const is404 = pageContext.is404 ?? pageContext.abortStatusCode === 404;
  return is404 ? 'Page introuvable · Page not found — AL-SI' : 'Erreur · Error — AL-SI';
};
