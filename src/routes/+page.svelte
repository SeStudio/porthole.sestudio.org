<script>
  import { onMount } from 'svelte';
  import Home from '$lib/components/Home.svelte';
  import { autoLocale } from '$lib/i18n/detect.js';
  let { data } = $props();
  onMount(() => autoLocale(''));
</script>

<Home lang={data.lang} t={data.t} />
