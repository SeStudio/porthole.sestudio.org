<script>
  import { STEAM_WIDGET_URL, STEAM_APP_URL } from '$lib/data/site.js';
  import Icon from './Icon.svelte';
  let { t } = $props();
</script>

<section class="section-sm steam">
  <div class="container narrow center">
    <h2>{t.steam.heading}</h2>
    <p class="lead">{t.steam.body}</p>
    <div class="widget">
      <iframe
        src={STEAM_WIDGET_URL}
        title="Porthole on Steam"
        width="646"
        height="190"
        frameborder="0"
        loading="lazy"
      ></iframe>
    </div>
    <a class="btn btn-primary" href={STEAM_APP_URL} target="_blank" rel="noopener">
      <Icon name="steam" size={19} />
      {t.hero.ctaPrimary}
    </a>
  </div>
</section>

<style>
  .center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .center .lead {
    margin-left: auto;
    margin-right: auto;
  }
  .widget {
    position: relative;
    width: 100%;
    max-width: 646px;
    margin: var(--space-4) 0;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--line);
    /* Branded fallback shown until (or if) the Steam widget iframe renders. */
    background: linear-gradient(180deg, rgba(15, 18, 23, 0.55), rgba(15, 18, 23, 0.85)),
      url('/media/porthole-store-header.png') center / cover no-repeat, var(--panel);
    min-height: 190px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .widget iframe {
    display: block;
    width: 100%;
    border: 0;
    position: relative;
  }
</style>
