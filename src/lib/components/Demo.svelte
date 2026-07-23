<script>
  let { t } = $props();
</script>

<section class="section-sm demo">
  <div class="container narrow center">
    <h2>{t.demo.heading}</h2>
    <p class="lead">{t.demo.body}</p>
  </div>
  <div class="container">
    <figure class="demo-fig">
      <div class="frame">
        <img
          src="/media/porthole-demo.gif"
          width="1280"
          height="720"
          alt={t.demo.caption}
          loading="eager"
          decoding="async"
        />
      </div>
      <figcaption>{t.demo.caption}</figcaption>
    </figure>
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
  .demo-fig {
    margin: var(--space-4) auto 0;
    max-width: 900px;
  }
  .frame {
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 30px 70px -45px rgba(0, 0, 0, 0.8);
  }
  .frame img {
    display: block;
    width: 100%;
    height: auto;
  }
  figcaption {
    margin-top: var(--space-3);
    text-align: center;
    color: var(--muted);
    font-size: 0.88rem;
  }
</style>
