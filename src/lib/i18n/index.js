import { LANGS, DEFAULT_LANG, bySlug } from './langs.js';

export const SITE = 'https://porthole.sestudio.org';
export { LANGS, DEFAULT_LANG, bySlug };

// Each catalog is its own chunk, loaded one locale at a time from the page
// loader, so a page ships only its own language instead of all thirty.
const catalogs = import.meta.glob('./messages/*.json');

/**
 * Load one language's catalog, falling back to English for an unknown slug.
 * @param {string} slug
 * @returns {Promise<Record<string, any>>}
 */
export async function loadMessages(slug) {
  const load = catalogs[`./messages/${slug}.json`] ?? catalogs['./messages/en.json'];
  const mod = /** @type {{ default: Record<string, any> }} */ (await load());
  return mod.default;
}

/**
 * Canonical path for a page in a given language.
 * @param {string} slug  language slug (e.g. 'en', 'de')
 * @param {string} [page]  '' for home, 'security' for the security page
 */
export function localizedPath(slug, page = '') {
  const suffix = page ? `/${page}` : '';
  if (slug === DEFAULT_LANG) return suffix || '/';
  return `/${slug}${suffix}`;
}

/**
 * Absolute URL for a page in a given language.
 * @param {string} slug
 * @param {string} [page]
 */
export function localizedUrl(slug, page = '') {
  const p = localizedPath(slug, page);
  return p === '/' ? `${SITE}/` : `${SITE}${p}`;
}

/**
 * hreflang alternates for a page across all languages, plus x-default (English).
 * @param {string} [page]
 */
export function alternates(page = '') {
  const list = LANGS.map((l) => ({ hreflang: l.hreflang, href: localizedUrl(l.slug, page) }));
  list.push({ hreflang: 'x-default', href: localizedUrl(DEFAULT_LANG, page) });
  return list;
}
