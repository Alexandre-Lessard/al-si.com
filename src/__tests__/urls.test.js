import { describe, it, expect } from 'vitest';
import { barePath, localePath } from '../urls.js';

describe('barePath', () => {
  it('strips the locale prefix', () => {
    expect(barePath('/fr')).toBe('/');
    expect(barePath('/en/')).toBe('/');
    expect(barePath('/fr/article/some-slug')).toBe('/article/some-slug');
    expect(barePath('/en/article/some-slug/')).toBe('/article/some-slug/');
  });

  it('leaves an unprefixed path alone', () => {
    expect(barePath('/article/some-slug')).toBe('/article/some-slug');
    expect(barePath(undefined)).toBe('/');
  });
});

describe('localePath', () => {
  // Pages serves directory URLs and 308s the slashless form, so a missing
  // trailing slash here turns every canonical tag into a pointer at a redirect.
  it('always terminates with a slash', () => {
    expect(localePath('fr', '/')).toBe('/fr/');
    expect(localePath('en', '/')).toBe('/en/');
    expect(localePath('fr', '/article/some-slug')).toBe('/fr/article/some-slug/');
    expect(localePath('en', '/article/some-slug/')).toBe('/en/article/some-slug/');
  });

  it('defaults to the locale home', () => {
    expect(localePath('fr')).toBe('/fr/');
  });
});
