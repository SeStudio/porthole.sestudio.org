<script>
  import { STEAM_APP_URL, GITHUB_URL, SUPPORTER_URL } from '$lib/data/site.js';
  import Icon from './Icon.svelte';
  let { t } = $props();
</script>

<section class="section cta-band">
  <div class="container">
    <div class="panel">
      <h2>{t.cta.heading}</h2>
      <p class="lead">{t.cta.body}</p>
      <div class="cta">
        <a class="btn btn-primary" href={STEAM_APP_URL} target="_blank" rel="noopener">
          <Icon name="steam" size={19} />
          {t.cta.primary}
        </a>
        <a class="btn btn-support" href={SUPPORTER_URL} target="_blank" rel="noopener">
          <Icon name="heart" size={18} />
          {t.footer.links.support}
        </a>
        <a class="btn btn-ghost" href={GITHUB_URL} target="_blank" rel="noopener">
          <Icon name="github" size={18} />
          {t.cta.secondary}
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .panel {
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: clamp(36px, 6vw, 72px) var(--space-3);
    border-radius: var(--radius);
    border: 0;
    background: var(--panel);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .panel .lead {
    margin: 0 auto var(--space-4);
  }
  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
</style>
