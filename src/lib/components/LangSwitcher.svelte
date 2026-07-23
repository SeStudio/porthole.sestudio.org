<script>
  import { LANGS, localizedPath } from '$lib/i18n/index.js';
  import { rememberLang } from '$lib/i18n/detect.js';
  import Icon from './Icon.svelte';

  let { lang, page = '', t } = $props();
  const current = $derived(LANGS.find((l) => l.slug === lang) ?? LANGS[0]);
</script>

<details class="lang">
  <summary aria-label={t.misc.changeLanguage} title={t.misc.changeLanguage}>
    <Icon name="globe" size={17} />
    <span class="cur">{current.name}</span>
    <svg class="caret" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"
      ><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg
    >
  </summary>
  <div class="menu">
    {#each LANGS as l (l.slug)}
      <a
        href={localizedPath(l.slug, page)}
        hreflang={l.hreflang}
        lang={l.hreflang}
        onclick={() => rememberLang(l.slug)}
        aria-current={l.slug === lang ? 'true' : undefined}
        class:active={l.slug === lang}>{l.name}</a
      >
    {/each}
  </div>
</details>

<style>
  .lang {
    position: relative;
  }
  summary {
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 11px;
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.06);
    color: var(--muted);
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary:hover {
    color: var(--text);
    background: rgba(255, 255, 255, 0.11);
  }
  .cur {
    max-width: 12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .caret {
    transition: transform 150ms ease;
  }
  details[open] .caret {
    transform: rotate(180deg);
  }
  .menu {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    z-index: 90;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    width: min(94vw, 420px);
    max-height: 62vh;
    overflow: auto;
    padding: 8px;
    border-radius: var(--radius);
    border: 1px solid var(--line-strong);
    background: var(--panel-2);
    box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.8);
  }
  .menu a {
    display: block;
    padding: 8px 10px;
    border-radius: 8px;
    color: var(--muted);
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .menu a:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text);
  }
  .menu a.active {
    color: var(--text);
    background: rgba(76, 134, 240, 0.15);
  }
  @media (max-width: 520px) {
    .menu {
      grid-template-columns: 1fr;
      position: fixed;
      left: 12px;
      right: 12px;
      width: auto;
    }
  }
</style>
