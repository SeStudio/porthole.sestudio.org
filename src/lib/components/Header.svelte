<script>
  import { localizedPath } from '$lib/i18n/index.js';
  import { STEAM_APP_URL, GITHUB_URL, DISCORD_URL, SUPPORTER_URL } from '$lib/data/site.js';
  import Logo from './Logo.svelte';
  import Icon from './Icon.svelte';
  import LangSwitcher from './LangSwitcher.svelte';

  let { t, lang, page = '' } = $props();
  const home = $derived(localizedPath(lang));
  const base = $derived(home === '/' ? '' : home);
</script>

<header class="site-header">
  <div class="container bar">
    <a class="brand" href={home} aria-label="Porthole home">
      <Logo size={30} wordmark />
    </a>

    <nav class="nav" aria-label="Primary">
      <a href={`${base}/#how`}>{t.nav.how}</a>
      <a href={`${base}/#compare`}>{t.nav.compare}</a>
      <a href={`${base}/#faq`}>{t.nav.faq}</a>
      <a href={localizedPath(lang, 'security')}>{t.nav.security}</a>
    </nav>

    <div class="actions">
      <a class="ghost-link" href={DISCORD_URL} target="_blank" rel="noopener" aria-label="Discord">
        <Icon name="discord" size={20} />
      </a>
      <a class="ghost-link" href={GITHUB_URL} target="_blank" rel="noopener" aria-label={t.nav.github}>
        <Icon name="github" size={20} />
      </a>
      <LangSwitcher {lang} {page} {t} />
      <a
        class="btn btn-support support"
        href={SUPPORTER_URL}
        target="_blank"
        rel="noopener"
        aria-label={t.footer.links.support}
        title={t.footer.links.support}
      >
        <Icon name="heart" size={16} />
        <span>{t.footer.links.support}</span>
      </a>
      <a
        class="btn btn-primary wishlist"
        href={STEAM_APP_URL}
        target="_blank"
        rel="noopener"
        aria-label={t.nav.wishlist}
      >
        <Icon name="steam" size={18} />
        <span>{t.nav.wishlist}</span>
      </a>
    </div>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 70;
    background: rgba(15, 18, 23, 0.72);
    backdrop-filter: saturate(140%) blur(12px);
    border-bottom: 1px solid var(--line);
  }
  /* The action row is busier than the page, so give the header a little more room. */
  .site-header .container {
    max-width: var(--maxw-header);
  }
  .bar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: 12px var(--space-3);
  }
  .brand {
    color: #fff;
    flex: none;
  }
  .brand:hover {
    color: #fff;
  }
  .nav {
    display: flex;
    gap: 20px;
    margin-left: auto;
  }
  .nav a {
    color: var(--muted);
    font-size: 0.92rem;
    font-weight: 500;
    white-space: nowrap;
  }
  .nav a:hover {
    color: var(--text);
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 8px;
    min-width: 0;
  }
  .ghost-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    flex: none;
    border-radius: var(--radius-sm);
    color: var(--muted);
    background: rgba(255, 255, 255, 0.06);
  }
  .ghost-link:hover {
    color: var(--text);
    background: rgba(255, 255, 255, 0.11);
  }
  .support {
    flex: none;
    padding: 0.55rem 0.9rem;
    font-size: 0.94rem;
  }
  .wishlist {
    padding: 0.55rem 0.95rem;
    font-size: 0.94rem;
  }
  /* The nav is wide in some languages (e.g. Russian); collapse it before the
     action row runs out of room. */
  @media (max-width: 1080px) {
    .nav {
      display: none;
    }
    .actions {
      margin-left: auto;
    }
  }
  /* In the crowded mid-widths, keep the Support button as just its heart so the
     primary CTA never gets clipped; the full label returns on wider screens. */
  @media (max-width: 1260px) {
    .support span {
      display: none;
    }
    .support {
      width: 38px;
      height: 38px;
      padding: 0;
    }
  }
  @media (max-width: 460px) {
    .ghost-link {
      display: none;
    }
    .wishlist span {
      display: none;
    }
    .wishlist {
      padding: 0.55rem 0.7rem;
    }
  }
</style>
