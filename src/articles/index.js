import { lazy } from 'react';

export const articles = {
  'seo-etude-de-cas': lazy(() => import('./SeoEtudeDeCas.jsx')),
};
