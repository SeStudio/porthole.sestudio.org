<script>
  import SecurityContent from '$lib/components/SecurityContent.svelte';
  let { data } = $props();
</script>

<SecurityContent lang={data.lang} t={data.t} />
