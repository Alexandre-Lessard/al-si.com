// Single source of truth for the shape of a public URL.
//
// Cloudflare Pages serves every prerendered page at its directory URL — with a
// trailing slash — and answers the slashless form with a 308. So the canonical
// tag, the hreflang alternates, the sitemap and every internal link have to
// carry that slash too. A canonical pointing at a URL that redirects is
// discarded by Google, which then picks its own canonical instead.

// Extracts the locale-free path from a URL: '/fr/article/x' -> '/article/x'.
export function barePath(url) {
  const path = url || '/';
  const match = path.match(/^\/(fr|en)(\/.*)?$/);
  return match ? match[2] || '/' : path;
}

// Builds the canonical, slash-terminated URL for a page in a given locale.
export function localePath(locale, bare = '/') {
  const inner = bare.replace(/^\/+|\/+$/g, '');
  return inner ? `/${locale}/${inner}/` : `/${locale}/`;
}
