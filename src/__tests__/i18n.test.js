import { describe, it, expect } from 'vitest';
import { translations } from '../i18n';

function getKeys(obj, prefix = '') {
  const keys = [];
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (item !== null && typeof item === 'object') {
          keys.push(...getKeys(item, `${path}[${i}]`));
        } else {
          keys.push(`${path}[${i}]`);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      keys.push(...getKeys(value, path));
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
});
