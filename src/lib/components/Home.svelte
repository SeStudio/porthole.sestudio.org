<script>
  import Seo from './Seo.svelte';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import Hero from './Hero.svelte';
  import Demo from './Demo.svelte';
  import HowItWorks from './HowItWorks.svelte';
  import Features from './Features.svelte';
  import UseCases from './UseCases.svelte';
  import Compare from './Compare.svelte';
  import Faq from './Faq.svelte';
  import SteamWidget from './SteamWidget.svelte';
  import CtaBand from './CtaBand.svelte';

  let { lang, t } = $props();
</script>

<Seo {t} {lang} />
<Header {t} {lang} />

<Hero {t} />
<Demo {t} />
<HowItWorks {t} />
<Features {t} />
<UseCases {t} />
<Compare {t} />
<Faq {t} />
<SteamWidget {t} />
<CtaBand {t} />

<Footer {t} {lang} />
