<script>
  import { onMount } from 'svelte';
  import SecurityContent from '$lib/components/SecurityContent.svelte';
  import { autoLocale } from '$lib/i18n/detect.js';
  let { data } = $props();
  onMount(() => autoLocale('security'));
</script>

<SecurityContent lang={data.lang} t={data.t} />
