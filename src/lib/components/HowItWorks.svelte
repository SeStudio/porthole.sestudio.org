<script>
  import CosmicDiagram from './CosmicDiagram.svelte';
  let { t } = $props();
</script>

<section id="how" class="section how">
  <div class="container narrow center">
    <h2>{t.how.heading}</h2>
    <p class="lead">{t.how.body}</p>
  </div>

  <div class="container diagram-wrap">
    <CosmicDiagram d={t.how.diagram} />
  </div>

  <div class="container">
    <ol class="steps">
      {#each t.how.steps as step, i (i)}
        <li class="step">
          <span class="num">{i + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .center {
    text-align: center;
  }
  .center .lead {
    margin-left: auto;
    margin-right: auto;
  }
  .diagram-wrap {
    margin: var(--space-5) auto var(--space-5);
  }
  .steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-3);
    counter-reset: step;
  }
  .step {
    padding: var(--space-3) var(--space-2);
  }
  .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: rgba(76, 134, 240, 0.14);
    border: 1px solid rgba(76, 134, 240, 0.3);
    color: var(--accent-soft);
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 12px;
  }
  .step h3 {
    font-size: 1.02rem;
    margin-bottom: 6px;
  }
  .step p {
    color: var(--muted);
    font-size: 0.92rem;
    margin: 0;
  }
  @media (max-width: 900px) {
    .steps {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 520px) {
    .steps {
      grid-template-columns: 1fr;
    }
    .step {
      display: grid;
      grid-template-columns: 34px 1fr;
      column-gap: 14px;
      align-items: center;
      padding: 12px 0;
    }
    .num {
      grid-row: span 2;
      margin-bottom: 0;
    }
    .step h3 {
      align-self: end;
      margin-bottom: 2px;
    }
  }
</style>
