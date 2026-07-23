<script>
  import Logo from './Logo.svelte';
  let { t } = $props();
  const c = $derived(t.compare);
  // Column order comes from the catalog itself, so each language renders a table
  // consistent with its own data even before a re-translation adds new columns.
  const cols = $derived(Object.keys(c.columns));
</script>

<section id="compare" class="section compare">
  <div class="container narrow center">
    <h2>{c.heading}</h2>
    <p class="lead">{c.body}</p>
  </div>

  <div class="container">
    <div class="scroll">
      <table>
        <thead>
          <tr>
            <td class="corner"></td>
            {#each cols as key (key)}
              <th scope="col" class:ph={key === 'porthole'}>
                {#if key === 'porthole'}
                  <span class="ph-h"><Logo size={18} /> {c.columns[key]}</span>
                {:else}
                  {c.columns[key]}
                {/if}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each c.rows as row, i (i)}
            <tr>
              <th scope="row">{row.label}</th>
              {#each cols as key (key)}
                <td class:ph={key === 'porthole'}>{row[key]}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p class="footnote muted">{c.footnote}</p>
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
  .scroll {
    margin-top: var(--space-4);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  table {
    width: 100%;
    min-width: 860px;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  thead td,
  thead th {
    padding: 14px 14px;
    vertical-align: bottom;
    text-align: left;
    font-weight: 700;
    color: var(--text);
    border-bottom: 1px solid var(--line-strong);
  }
  .ph-h {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #fff;
  }
  tbody th {
    text-align: left;
    font-weight: 600;
    color: var(--muted);
    padding: 12px 14px;
    white-space: nowrap;
  }
  tbody td {
    padding: 12px 14px;
    color: var(--text);
  }
  tbody tr + tr th,
  tbody tr + tr td {
    border-top: 1px solid var(--line);
  }
  /* Porthole column: brand tint to set it apart */
  th.ph,
  td.ph {
    background: rgba(76, 134, 240, 0.08);
    color: #eaf1fe;
    font-weight: 600;
  }
  thead th.ph {
    background: rgba(76, 134, 240, 0.16);
    box-shadow: inset 0 3px 0 var(--accent);
  }
  .footnote {
    margin-top: var(--space-3);
    font-size: 0.8rem;
    max-width: 82ch;
  }
</style>
