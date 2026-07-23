<script module>
  // A module-scoped counter gives each logo a unique, deterministic gradient id
  // that matches across SSR and hydration (a random id would mismatch and warn).
  let count = 0;
</script>

<script>
  // The Porthole mark: a "P" whose bowl is a porthole, with the brand glow baked
  // into the exact centre of the hole. Wordmark is drawn in Roboto (never from the
  // lockup SVG, which has no font-family and falls back to a serif).
  let { size = 34, wordmark = false } = $props();
  const uid = `phole-${++count}`;
</script>

<span class="logo" style="--s:{size}px">
  <svg class="mark" viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id={uid} cx="26.5" cy="18.5" r="15" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#4C86F0" stop-opacity="0.95" />
        <stop offset="0.55" stop-color="#4C86F0" stop-opacity="0.35" />
        <stop offset="1" stop-color="#4C86F0" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx="26.5" cy="18.5" r="14" fill="url(#{uid})" />
    <path d="M12.5 44V17" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linecap="round" />
    <circle cx="26.5" cy="18.5" r="14" fill="none" stroke="currentColor" stroke-width="7.5" />
  </svg>
  {#if wordmark}
    <span class="name">Porthole</span>
  {/if}
</span>

<style>
  .logo {
    display: inline-flex;
    align-items: center;
    gap: 0.55em;
    color: #fff;
    line-height: 1;
  }
  .mark {
    flex: none;
    filter: drop-shadow(0 0 10px rgba(76, 134, 240, 0.35));
  }
  .name {
    font-family: var(--font-sans);
    font-weight: 700;
    letter-spacing: -0.02em;
    font-size: calc(var(--s) * 0.72);
    color: #fff;
  }
</style>
