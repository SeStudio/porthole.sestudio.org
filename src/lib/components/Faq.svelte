<script>
  let { t } = $props();
</script>

<section id="faq" class="section faq">
  <div class="container narrow center">
    <h2>{t.faq.heading}</h2>
  </div>
  <div class="container narrow list">
    {#each t.faq.items as item, i (i)}
      <details class="qa">
        <summary>
          <span class="q">{item.q}</span>
          <span class="mark" aria-hidden="true"></span>
        </summary>
        <div class="a"><p>{item.a}</p></div>
      </details>
    {/each}
  </div>
</section>

<style>
  .center {
    text-align: center;
  }
  .list {
    margin-top: var(--space-4);
    display: grid;
    gap: 10px;
  }
  .qa {
    border: 0;
    border-radius: var(--radius-sm);
    background: var(--panel);
    overflow: hidden;
  }
  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 18px;
    cursor: pointer;
    list-style: none;
    font-weight: 600;
    color: var(--text);
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary:hover {
    color: #fff;
  }
  .q {
    font-size: 1rem;
  }
  .mark {
    position: relative;
    flex: none;
    width: 16px;
    height: 16px;
  }
  .mark::before,
  .mark::after {
    content: '';
    position: absolute;
    background: var(--accent-soft);
    border-radius: 2px;
  }
  .mark::before {
    top: 7px;
    left: 0;
    width: 16px;
    height: 2px;
  }
  .mark::after {
    top: 0;
    left: 7px;
    width: 2px;
    height: 16px;
    transition: transform 160ms ease, opacity 160ms ease;
  }
  .qa[open] .mark::after {
    transform: rotate(90deg);
    opacity: 0;
  }
  .a {
    padding: 0 18px 18px;
  }
  .a p {
    margin: 0;
    color: var(--muted);
    max-width: none;
  }
</style>
