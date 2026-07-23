<script>
  import Home from '$lib/components/Home.svelte';
  let { data } = $props();
</script>

<Home lang={data.lang} t={data.t} />
