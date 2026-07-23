<script>
  import Icon from './Icon.svelte';
  let { t } = $props();
  // Icons are positional, matching the order of features.items in the catalog.
  const icons = ['plug', 'globe', 'eye', 'users', 'key', 'bolt', 'code', 'grid'];
</script>

<section class="section features">
  <div class="container narrow center">
    <h2>{t.features.heading}</h2>
  </div>
  <div class="container">
    <div class="grid">
      {#each t.features.items as f, i (i)}
        <div class="card feat">
          <span class="ic"><Icon name={icons[i] ?? 'check'} size={22} /></span>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
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
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
  }
  .feat {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ic {
    display: inline-flex;
    color: var(--accent-soft);
    margin-bottom: 4px;
  }
  .feat h3 {
    font-size: 1rem;
    margin: 0;
  }
  .feat p {
    margin: 0;
    color: var(--muted);
    font-size: 0.9rem;
  }
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 520px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
