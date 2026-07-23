import { LANGS, localizedUrl, alternates } from '$lib/i18n/index.js';

export const prerender = true;

const PAGES = ['', 'security'];

/** @param {string} slug @param {string} page */
function urlEntry(slug, page) {
  const loc = localizedUrl(slug, page);
  const links = alternates(page)
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
    .join('\n');
  return `  <url>\n    <loc>${loc}</loc>\n${links}\n  </url>`;
}

export function GET() {
  const entries = [];
  for (const page of PAGES) {
    for (const l of LANGS) {
      entries.push(urlEntry(l.slug, page));
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
