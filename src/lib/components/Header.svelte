<script>
  import { localizedPath } from '$lib/i18n/index.js';
  import { STEAM_APP_URL, GITHUB_URL } from '$lib/data/site.js';
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
      <a class="ghost-link" href={GITHUB_URL} target="_blank" rel="noopener" aria-label={t.nav.github}>
        <Icon name="github" size={20} />
      </a>
      <LangSwitcher {lang} {page} {t} />
      <a class="btn btn-primary wishlist" href={STEAM_APP_URL} target="_blank" rel="noopener">
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
  }
  .ghost-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: var(--radius-sm);
    color: var(--muted);
    background: rgba(255, 255, 255, 0.06);
  }
  .ghost-link:hover {
    color: var(--text);
    background: rgba(255, 255, 255, 0.11);
  }
  .wishlist {
    padding: 0.55rem 0.95rem;
    font-size: 0.94rem;
  }
  @media (max-width: 960px) {
    .nav {
      display: none;
    }
    .actions {
      margin-left: auto;
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
