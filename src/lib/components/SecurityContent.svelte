<script>
  import { localizedPath } from '$lib/i18n/index.js';
  import { GITHUB_URL } from '$lib/data/site.js';
  import Seo from './Seo.svelte';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import Icon from './Icon.svelte';

  let { lang, t } = $props();
  const s = $derived(t.security);
  const icons = ['eye', 'plug', 'lock', 'key', 'code'];
</script>

<Seo {t} {lang} page="security" />
<Header {t} {lang} page="security" />

<article class="sec">
  <div class="container narrow">
    <a class="back" href={localizedPath(lang)}>
      <Icon name="arrow" size={16} /> <span>{s.backHome}</span>
    </a>
    <h1>{s.title}</h1>
    <p class="lead intro">{s.intro}</p>

    {#each s.sections as sec, i (i)}
      <section class="block">
        <div class="head">
          <span class="ic"><Icon name={icons[i] ?? 'shield'} size={20} /></span>
          <h2>{sec.heading}</h2>
        </div>
        <p>{sec.body}</p>
        {#if sec.bullets && sec.bullets.length}
          <ul>
            {#each sec.bullets as b (b)}
              <li><Icon name="check" size={16} /> <span>{b}</span></li>
            {/each}
          </ul>
        {/if}
      </section>
    {/each}

    <a class="btn btn-ghost src" href={GITHUB_URL} target="_blank" rel="noopener">
      <Icon name="github" size={18} /> {s.cta}
    </a>
  </div>
</article>

<Footer {t} {lang} />

<style>
  .sec {
    padding: var(--space-5) 0 var(--space-4);
  }
  .back {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--muted);
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: var(--space-4);
  }
  .back :global(svg) {
    transform: rotate(180deg);
  }
  .back:hover {
    color: var(--text);
  }
  .intro {
    margin-bottom: var(--space-5);
  }
  .block {
    padding: var(--space-4) 0;
    border-top: 1px solid var(--line);
  }
  .head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }
  .head h2 {
    font-size: 1.35rem;
    margin: 0;
  }
  .ic {
    display: inline-flex;
    flex: none;
    color: var(--accent-soft);
  }
  .block p {
    color: var(--muted);
    max-width: none;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: var(--space-2) 0 0;
    display: grid;
    gap: 10px;
  }
  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: var(--text);
    font-size: 0.95rem;
  }
  li :global(svg) {
    color: var(--success);
    flex: none;
    margin-top: 3px;
  }
  .src {
    margin-top: var(--space-4);
  }
</style>
