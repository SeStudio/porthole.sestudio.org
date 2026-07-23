<script>
  import { STEAM_APP_URL } from '$lib/data/site.js';
  import Icon from './Icon.svelte';
  import NetworkBg from './NetworkBg.svelte';

  let { t } = $props();
</script>

<section class="hero">
  <NetworkBg />
  <div class="container hero-inner">
    <span class="badge">
      <span class="dot"></span>
      {t.hero.badge}
    </span>

    <h1>
      <!-- keep hyphenated words (e.g. self-hosted) from breaking across lines -->
      {#each t.hero.title.split(' ') as w, i (i)}<span class:nowrap={w.includes('-')}>{w}</span>{' '}{/each}<span class="accent">{t.hero.titleAccent}</span>
    </h1>

    <p class="lead sub">{t.hero.sub}</p>

    <ul class="points">
      {#each t.hero.points as p (p)}
        <li><Icon name="check" size={15} /> {p}</li>
      {/each}
    </ul>

    <div class="cta">
      <a class="btn btn-primary" href={STEAM_APP_URL} target="_blank" rel="noopener">
        <Icon name="steam" size={19} />
        {t.hero.ctaPrimary}
      </a>
      <a class="btn btn-ghost" href="#how">
        {t.hero.ctaSecondary}
        <Icon name="arrow" size={18} />
      </a>
    </div>

    <p class="note">{t.hero.note}</p>
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    padding: clamp(56px, 9vw, 120px) 0 clamp(40px, 6vw, 80px);
    border-bottom: 1px solid var(--line);
  }
  .hero::after {
    /* fade the network texture into the page */
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(70% 60% at 50% 42%, rgba(15, 18, 23, 0) 40%, var(--bg-deep) 100%);
  }
  .hero-inner {
    position: relative;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    margin-bottom: var(--space-3);
  }
  .badge .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
  h1 {
    max-width: 18ch;
    margin-bottom: var(--space-3);
  }
  .accent {
    color: var(--accent-soft);
  }
  .nowrap {
    white-space: nowrap;
  }
  .sub {
    margin: 0 auto var(--space-3);
    text-align: center;
  }
  .points {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--space-4);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px 20px;
  }
  .points li {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--text);
  }
  .points :global(svg) {
    color: var(--success);
  }
  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
  .note {
    margin: var(--space-3) 0 0;
    color: var(--faint);
    font-size: 0.86rem;
  }
</style>
