import { describe, it, expect } from 'vitest';
import { translations } from '../i18n';

function getKeys(obj, prefix = '') {
  const keys = [];
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getKeys(obj[key], path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

describe('i18n translations', () => {
  const frKeys = getKeys(translations.fr);
  const enKeys = getKeys(translations.en);

  it('should have all FR keys in EN', () => {
    const missingInEn = frKeys.filter((key) => !enKeys.includes(key));
    expect(missingInEn).toEqual([]);
  });

  it('should have all EN keys in FR', () => {
    const missingInFr = enKeys.filter((key) => !frKeys.includes(key));
    expect(missingInFr).toEqual([]);
  });

  it('should have matching array lengths for projects.items', () => {
    expect(translations.fr.projects.items.length).toBe(translations.en.projects.items.length);
  });

  it('should have matching array lengths for articles.items', () => {
    expect(translations.fr.articles.items.length).toBe(translations.en.articles.items.length);
  });
});
