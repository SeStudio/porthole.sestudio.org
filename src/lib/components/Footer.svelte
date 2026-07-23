<script>
  import { localizedPath } from '$lib/i18n/index.js';
  import { STEAM_APP_URL, GITHUB_URL, STUDIO_URL } from '$lib/data/site.js';
  import Logo from './Logo.svelte';

  let { t, lang } = $props();
</script>

<footer class="site-footer">
  <div class="container">
    <div class="top">
      <div class="brandcol">
        <Logo size={30} wordmark />
        <p class="tagline">{t.footer.tagline}</p>
      </div>
      <nav class="links" aria-label="Footer">
        <a href={localizedPath(lang, 'security')}>{t.footer.links.security}</a>
        <a href={STEAM_APP_URL} target="_blank" rel="noopener">{t.footer.links.steam}</a>
        <a href={GITHUB_URL} target="_blank" rel="noopener">{t.footer.links.github}</a>
        <a href={STUDIO_URL} target="_blank" rel="noopener">{t.footer.links.studio}</a>
      </nav>
    </div>
    <hr class="rule" />
    <div class="bottom">
      <span class="muted">{t.footer.copyright}</span>
      <span class="muted disclaimer">{t.footer.disclaimer}</span>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    border-top: 1px solid var(--line);
    padding: var(--space-5) 0 var(--space-4);
    margin-top: var(--space-5);
  }
  .top {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
    margin-bottom: var(--space-3);
  }
  .tagline {
    margin: 14px 0 4px;
    color: var(--text);
    font-weight: 500;
  }
  .links {
    display: grid;
    gap: 10px;
    align-content: start;
  }
  .links a {
    color: var(--muted);
    font-size: 0.94rem;
  }
  .links a:hover {
    color: var(--text);
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    gap: var(--space-3);
    flex-wrap: wrap;
    padding-top: var(--space-3);
    font-size: 0.8rem;
  }
  .disclaimer {
    max-width: 60ch;
    text-align: right;
  }
  @media (max-width: 640px) {
    .disclaimer {
      text-align: left;
    }
  }
</style>
