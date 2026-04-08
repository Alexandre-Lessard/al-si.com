// Extracts /fr or /en prefix from URL and exposes it via pageContext.locale.
// Bare URLs (without prefix) should never reach here in production — the
// Cloudflare middleware redirects them. We default to 'fr' as a safety net.
export default function onBeforeRoute(pageContext) {
  const url = pageContext.urlOriginal;
  const match = url.match(/^\/(fr|en)(\/.*)?$/);
  if (match) {
    return {
      pageContext: {
        locale: match[1],
        urlLogical: match[2] || '/',
      },
    };
  }
  return {
    pageContext: {
      locale: 'fr',
      urlLogical: url,
    },
  };
}
