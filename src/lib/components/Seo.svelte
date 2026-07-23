<script>
  import { SITE, localizedUrl, alternates } from '$lib/i18n/index.js';
  import { STEAM_APP_URL, STUDIO_URL, STEAM_PUBLISHER_URL, GITHUB_URL } from '$lib/data/site.js';
  import JsonLd from './JsonLd.svelte';

  let { t, lang, page = '' } = $props();

  const isHome = $derived(page === '');
  const title = $derived(isHome ? t.meta.homeTitle : t.meta.securityTitle);
  const description = $derived(isHome ? t.meta.homeDescription : t.meta.securityDescription);
  const canonical = $derived(localizedUrl(lang, page));
  const alts = $derived(alternates(page));
  const ogImage = `${SITE}/og-card.jpg`;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SeStudio',
    alternateName: 'Steam Engine Studio',
    url: STUDIO_URL,
    sameAs: [STEAM_PUBLISHER_URL, 'https://github.com/SeStudio']
  };

  const software = $derived({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Porthole',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows, Linux, SteamOS',
    description: t.meta.homeDescription,
    url: SITE + '/',
    downloadUrl: STEAM_APP_URL,
    softwareHelp: SITE + '/security',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: 'SeStudio', url: STUDIO_URL },
    sameAs: [STEAM_APP_URL, GITHUB_URL]
  });

  const faqSchema = $derived({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((/** @type {{ q: string, a: string }} */ it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a }
    }))
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  {#each alts as a (a.hreflang)}
    <link rel="alternate" hreflang={a.hreflang} href={a.href} />
  {/each}

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={t.meta.ogAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<JsonLd data={organization} />
{#if isHome}
  <JsonLd data={software} />
  <JsonLd data={faqSchema} />
{/if}
