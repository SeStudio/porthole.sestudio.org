// Shared SvelteKit page-loader wiring for the localized routes. English lives
// at the site root; every other language is prerendered under /<slug>/.
import { error } from '@sveltejs/kit';
import { bySlug, NON_DEFAULT_SLUGS, DEFAULT_LANG } from './langs.js';
import { loadMessages } from './index.js';

export const prerender = true;

export const entries = () => NON_DEFAULT_SLUGS.map((lang) => ({ lang }));

/** @param {{ params: { lang: string } }} event */
export async function load({ params }) {
  const lang = bySlug[params.lang];
  if (!lang || lang.root) error(404, 'Not found');
  return { lang: params.lang, t: await loadMessages(params.lang) };
}

// Root (English) pages carry no [lang] param.
export async function rootLoad() {
  return { lang: DEFAULT_LANG, t: await loadMessages(DEFAULT_LANG) };
}
