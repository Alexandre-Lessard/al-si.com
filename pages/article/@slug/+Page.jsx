import { usePageContext } from 'vike-react/usePageContext';
import { articles } from '../../../src/articles/index.js';

export default function Page() {
  const pageContext = usePageContext();
  const lang = pageContext.locale || 'fr';
  const slug = pageContext.routeParams.slug;
  const ArticleComponent = articles[slug];

  if (!ArticleComponent) return null;

  const handleBack = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return <ArticleComponent lang={lang} onBack={handleBack} />;
}
