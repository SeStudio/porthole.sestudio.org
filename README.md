# porthole.sestudio.org

Landing page for [Porthole](https://store.steampowered.com/app/4963920/), a tool
that shares a chosen local game port with your Steam friends over Steam's network,
so they connect as if they were on your LAN. No port forwarding, no public IP, no
router setup.

Static SvelteKit site, prerendered and deployed to GitHub Pages. Localized into the
same 30 languages as the Steam store page.

## Develop

```bash
nvm use            # Node 20
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # static output in build/
npm run preview    # serve the build locally
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes
to Pages on every push to `main`. `static/CNAME` pins the domain.

## Structure

```
src/
  routes/
    +page.svelte              English home (/)
    security/+page.svelte     English privacy and security page
    [lang]/                   the 29 non-English languages (prerendered)
    sitemap.xml/+server.js    generated multilingual sitemap
  lib/
    components/               Header, Hero, HowItWorks, Compare, Faq, ...
    i18n/
      langs.js                the 30 languages (slug, hreflang, endonym)
      index.js                URL and hreflang helpers
      loaders.js              per-route locale loading (one catalog per page)
      messages/<slug>.json    one catalog per language (en.json is the source)
    data/site.js              external URLs (Steam, GitHub, studio)
  app.css                     Porthole brand tokens and base styles
```

## Copy and translations

`src/lib/i18n/messages/en.json` is the source of all copy. Every other language is
the same JSON shape with translated values. Keep brand names verbatim (Porthole,
Steam, Valve, Hamachi, Radmin, playit.gg) and use a plain hyphen, never an em or en
dash. Add a language by adding it to `langs.js` and dropping in its message file.

## License

[MIT](LICENSE) © SeStudio.
