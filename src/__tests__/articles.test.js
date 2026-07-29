import { describe, it, expect } from 'vitest';
import { translations } from '../i18n';
import { articles } from '../articles/index';

describe('article registry', () => {
  it('every slug in FR i18n should have a matching component', () => {
    const slugs = translations.fr.articles.items.filter((item) => item.slug).map((item) => item.slug);

    slugs.forEach((slug) => {
      expect(articles[slug], `Missing article component for slug "${slug}"`).toBeDefined();
    });
  });

  it('every slug in EN i18n should have a matching component', () => {
    const slugs = translations.en.articles.items.filter((item) => item.slug).map((item) => item.slug);

    slugs.forEach((slug) => {
      expect(articles[slug], `Missing article component for slug "${slug}"`).toBeDefined();
    });
  });

  it('every registered component should have a matching i18n entry', () => {
    const frSlugs = translations.fr.articles.items.filter((item) => item.slug).map((item) => item.slug);

    Object.keys(articles).forEach((slug) => {
      expect(frSlugs, `Orphan article component "${slug}" with no i18n entry`).toContain(slug);
    });
  });
});
