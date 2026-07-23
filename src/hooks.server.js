import { LANGS } from '$lib/i18n/langs.js';

// Set <html lang> on each prerendered page from its URL prefix so the static
// output carries the right language attribute for crawlers and screen readers.
export async function handle({ event, resolve }) {
  const seg = event.url.pathname.split('/')[1];
  const match = LANGS.find((l) => l.slug === seg && !l.root);
  const code = match ? match.hreflang : 'en';
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('<html lang="en">', `<html lang="${code}">`)
  });
}
