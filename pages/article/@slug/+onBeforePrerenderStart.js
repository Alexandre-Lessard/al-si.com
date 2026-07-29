import { articles } from '../../../src/articles/index.js';

export default function onBeforePrerenderStart() {
  const slugs = Object.keys(articles);
  const urls = [];
  for (const slug of slugs) {
    urls.push(`/fr/article/${slug}`);
    urls.push(`/en/article/${slug}`);
  }
  return urls;
}
