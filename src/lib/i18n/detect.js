// Client-side language auto-selection for the English root pages. GitHub Pages
// can't read Accept-Language, so we match the visitor's browser languages here
// and send them to their localized page. A choice made in the language switcher
// is remembered and always wins over auto-detection (so switching back sticks).
import { LANGS, DEFAULT_LANG } from './langs.js';
import { localizedPath } from './index.js';

const STORE_KEY = 'porthole-lang';

// Spanish-speaking regions we route to the Latin American build rather than Spain.
const LATAM = new Set([
  'mx', 'ar', 'co', 'cl', 'pe', 've', 'ec', 'gt', 'cu', 'bo', 'do',
  'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'pr', '419'
]);

/**
 * Map a BCP-47 browser language tag to one of our locale slugs, or null.
 * @param {string} tag
 * @returns {string | null}
 */
function matchLocale(tag) {
  const t = tag.toLowerCase();
  const parts = t.split('-');
  const base = parts[0];
  const region = parts[parts.length - 1];

  if (base === 'zh') return t.includes('hant') || ['tw', 'hk', 'mo'].includes(region) ? 'zh-hant' : 'zh-hans';
  if (base === 'pt') return region === 'br' ? 'pt-br' : 'pt-pt';
  if (base === 'es') return region !== base && LATAM.has(region) ? 'es-419' : 'es';
  if (base === 'no' || base === 'nb' || base === 'nn') return 'no';

  // Exact hreflang match, then any locale sharing the primary language subtag.
  const exact = LANGS.find((l) => l.hreflang.toLowerCase() === t);
  if (exact) return exact.slug;
  const byBase = LANGS.find((l) => l.hreflang.toLowerCase().split('-')[0] === base);
  return byBase ? byBase.slug : null;
}

/**
 * Remember the language the visitor picked so auto-detection never overrides it.
 * @param {string} slug
 */
export function rememberLang(slug) {
  try {
    localStorage.setItem(STORE_KEY, slug);
  } catch {
    // Storage can be blocked (private mode); the switcher link still navigates.
  }
}

/**
 * On an English root page, send the visitor to their preferred locale: a stored
 * choice if they have one, otherwise the best match for their browser languages.
 * @param {string} [page]  '' for home, 'security' for the security page
 */
export function autoLocale(page = '') {
  let stored = null;
  try {
    stored = localStorage.getItem(STORE_KEY);
  } catch {
    stored = null;
  }

  if (stored) {
    if (stored !== DEFAULT_LANG && LANGS.some((l) => l.slug === stored)) {
      location.replace(localizedPath(stored, page));
    }
    return;
  }

  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const slug = matchLocale(tag);
    if (!slug) continue;
    if (slug !== DEFAULT_LANG) location.replace(localizedPath(slug, page));
    return; // first supported language in the visitor's order wins (English included)
  }
}
