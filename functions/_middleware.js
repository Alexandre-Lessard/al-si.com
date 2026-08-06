// Cloudflare Pages middleware: routes bare URLs (without /fr or /en prefix)
// to the right locale based on a 'lang' cookie or Accept-Language header.
// Static assets and already-prefixed URLs pass through untouched.
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Already prefixed → let Pages serve the static HTML
  if (path === '/fr' || path === '/en' || path.startsWith('/fr/') || path.startsWith('/en/')) {
    return next();
  }

  // Static assets (anything with a file extension) → pass through
  if (/\.[a-z0-9]+$/i.test(path)) {
    return next();
  }

  // Determine target locale: explicit cookie wins over Accept-Language
  let locale;
  const cookie = request.headers.get('Cookie') || '';
  const cookieMatch = cookie.match(/(?:^|;\s*)lang=(fr|en)/);
  if (cookieMatch) {
    locale = cookieMatch[1];
  } else {
    const acceptLang = (request.headers.get('Accept-Language') || '').toLowerCase();
    locale = acceptLang.startsWith('fr') ? 'fr' : 'en';
  }

  // Build the prefixed redirect target. It carries a trailing slash because
  // that is the form Pages serves — landing on the slashless variant would
  // cost the visitor (and Googlebot) a second, 308 hop.
  const inner = path.replace(/^\/+|\/+$/g, '');
  const newPath = inner ? `/${locale}/${inner}/` : `/${locale}/`;
  const target = new URL(newPath + url.search, url.origin);

  // 302: temporary, because the response varies by user (cookie + Accept-Language).
  // A 301 would be cached aggressively and break the detection for other users.
  return Response.redirect(target.toString(), 302);
}
