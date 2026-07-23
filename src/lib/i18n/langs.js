// The 30 languages Porthole ships in on Steam.
// key    = Steam localization key (used to line up with store copy / assets)
// slug   = URL segment (english lives at the site root, no slug)
// hreflang = BCP-47 code emitted in <link rel="alternate" hreflang>
// name   = endonym shown in the language switcher
export const LANGS = [
  { key: 'english', slug: 'en', hreflang: 'en', name: 'English', root: true },
  { key: 'brazilian', slug: 'pt-br', hreflang: 'pt-BR', name: 'Português (Brasil)' },
  { key: 'bulgarian', slug: 'bg', hreflang: 'bg', name: 'Български' },
  { key: 'czech', slug: 'cs', hreflang: 'cs', name: 'Čeština' },
  { key: 'danish', slug: 'da', hreflang: 'da', name: 'Dansk' },
  { key: 'dutch', slug: 'nl', hreflang: 'nl', name: 'Nederlands' },
  { key: 'finnish', slug: 'fi', hreflang: 'fi', name: 'Suomi' },
  { key: 'french', slug: 'fr', hreflang: 'fr', name: 'Français' },
  { key: 'german', slug: 'de', hreflang: 'de', name: 'Deutsch' },
  { key: 'greek', slug: 'el', hreflang: 'el', name: 'Ελληνικά' },
  { key: 'hungarian', slug: 'hu', hreflang: 'hu', name: 'Magyar' },
  { key: 'indonesian', slug: 'id', hreflang: 'id', name: 'Bahasa Indonesia' },
  { key: 'italian', slug: 'it', hreflang: 'it', name: 'Italiano' },
  { key: 'japanese', slug: 'ja', hreflang: 'ja', name: '日本語' },
  { key: 'koreana', slug: 'ko', hreflang: 'ko', name: '한국어' },
  { key: 'latam', slug: 'es-419', hreflang: 'es-419', name: 'Español (Latinoamérica)' },
  { key: 'malay', slug: 'ms', hreflang: 'ms', name: 'Bahasa Melayu' },
  { key: 'norwegian', slug: 'no', hreflang: 'nb', name: 'Norsk' },
  { key: 'polish', slug: 'pl', hreflang: 'pl', name: 'Polski' },
  { key: 'portuguese', slug: 'pt-pt', hreflang: 'pt-PT', name: 'Português (Portugal)' },
  { key: 'romanian', slug: 'ro', hreflang: 'ro', name: 'Română' },
  { key: 'russian', slug: 'ru', hreflang: 'ru', name: 'Русский' },
  { key: 'schinese', slug: 'zh-hans', hreflang: 'zh-Hans', name: '简体中文' },
  { key: 'spanish', slug: 'es', hreflang: 'es', name: 'Español (España)' },
  { key: 'swedish', slug: 'sv', hreflang: 'sv', name: 'Svenska' },
  { key: 'tchinese', slug: 'zh-hant', hreflang: 'zh-Hant', name: '繁體中文' },
  { key: 'thai', slug: 'th', hreflang: 'th', name: 'ไทย' },
  { key: 'turkish', slug: 'tr', hreflang: 'tr', name: 'Türkçe' },
  { key: 'ukrainian', slug: 'uk', hreflang: 'uk', name: 'Українська' },
  { key: 'vietnamese', slug: 'vi', hreflang: 'vi', name: 'Tiếng Việt' }
];

export const DEFAULT_LANG = 'en';

export const NON_DEFAULT_SLUGS = LANGS.filter((l) => !l.root).map((l) => l.slug);

export const bySlug = Object.fromEntries(LANGS.map((l) => [l.slug, l]));
