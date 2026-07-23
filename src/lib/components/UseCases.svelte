<script>
  import Icon from './Icon.svelte';
  let { t } = $props();
  const icons = ['plug', 'globe', 'shield'];
</script>

<section class="section-sm usecases">
  <div class="container narrow center">
    <h2>{t.usecases.heading}</h2>
  </div>
  <div class="container">
    <div class="grid">
      {#each t.usecases.items as u, i (i)}
        <div class="card use">
          <span class="ic"><Icon name={icons[i] ?? 'check'} size={22} /></span>
          <h3>{u.title}</h3>
          <p>{u.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .center {
    text-align: center;
  }
  .grid {
    margin-top: var(--space-4);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
  }
  .use {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ic {
    display: inline-flex;
    color: var(--accent-soft);
    margin-bottom: 4px;
  }
  .use h3 {
    font-size: 1.05rem;
    margin: 0;
  }
  .use p {
    margin: 0;
    color: var(--muted);
    font-size: 0.94rem;
  }
  @media (max-width: 820px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
