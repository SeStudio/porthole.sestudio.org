<script>
  // "How it works": Steam is a black hole at the centre (its logo at the
  // core, an accretion disk around it). Your game and your friend's game are planets.
  // Packets flow from host to friend on one continuous path that loops each planet and
  // curves AROUND Steam (hugging over its top and back under its bottom, crossing at
  // its two sides) rather than punching through the middle, pulled by its gravity.
  // rAF loop: speed climbs steeply near any mass (v ~ sqrt(sum GM/r)).
  import { onMount } from 'svelte';
  import { STEAM_PATH } from './Icon.svelte';

  let { d } = $props();

  // Flight path is a three-loop figure-8: it wraps the host, self-crosses left of
  // Steam, wraps Steam as its own middle loop, self-crosses right of Steam, wraps the
  // guest. The two crossings (305,200) and (695,200) appear twice each so the closed
  // Catmull-Rom spline passes through them at crossing angles (never through Steam).
  const WP = [
    [120, 118], [305, 200], [500, 292], [695, 200], [880, 118], [968, 200],
    [880, 282], [695, 200], [500, 92], [305, 200], [120, 282], [32, 200]
  ];
  const catmull = (/** @type {number[][]} */ pts) => {
    const n = pts.length;
    let s = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      s += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1]}`;
    }
    return s + ' Z';
  };
  const PATH = catmull(WP);

  const stars = [
    [70, 60, 1.6], [160, 116, 1], [250, 50, 1.3], [360, 150, 0.9], [470, 40, 1.2],
    [640, 58, 1], [742, 128, 1.4], [846, 54, 1.1], [930, 118, 1.3], [92, 250, 1.2],
    [200, 332, 1.5], [332, 300, 1], [500, 360, 1.2], [664, 322, 1.4], [800, 300, 1],
    [912, 320, 1.3], [40, 176, 1], [962, 214, 1.2], [420, 336, 0.9], [590, 40, 1.1]
  ];

  /** @type {SVGSVGElement} */
  let svgEl;
  /** @type {SVGPathElement} */
  let pathEl;

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const q = (/** @type {string} */ s) => /** @type {SVGElement} */ (svgEl.querySelector(s));

    // Gravity wells: Steam (strong) and each planet. Small floor + large K + tight
    // core = speed climbs sharply the closer a packet gets to any mass.
    const bodies = [
      { x: 500, y: 200, K: 2400000, r2: 1700 },
      { x: 120, y: 200, K: 1900000, r2: 1300 },
      { x: 880, y: 200, K: 1900000, r2: 1300 }
    ];
    const GBASE = 1, PERIOD = 17;
    const gravV = (/** @type {{ x: number, y: number }} */ p) => {
      let g = GBASE;
      for (const b of bodies) {
        const dx = p.x - b.x, dy = p.y - b.y;
        g += b.K / (dx * dx + dy * dy + b.r2);
      }
      return Math.sqrt(g);
    };

    const path = pathEl;
    const len = path.getTotalLength();
    const NS = 480, dS = len / NS;
    const shape = new Array(NS);
    let unit = 0;
    // Speed depends only on how close the packet is to a mass (pure gravity), so it
    // falls in fast and coasts out slow, never braking just because the path turns.
    for (let i = 0; i < NS; i++) {
      shape[i] = gravV(path.getPointAtLength(dS * i));
      unit += dS / shape[i];
    }
    const scale = unit / PERIOD;
    const flow = [...svgEl.querySelectorAll('.pk')].map((el, i, a) => ({ el, dist: (len * i) / a.length }));

    const disk = [...svgEl.querySelectorAll('.pk-d')];
    const diskOrbit = { cx: 500, cy: 200, rx: 104, ry: 46, cos: Math.cos(-0.332), sin: Math.sin(-0.332), period: 7, offs: [0, Math.PI] };

    // Satellites: a back copy (drawn behind the planet) and a front copy, toggled by
    // depth so the moon slips behind its planet on the far half of its orbit.
    const sats = [
      { b: q('.sat-a-b'), f: q('.sat-a-f'), cx: 120, cy: 200, rx: 44, ry: 15, cos: Math.cos(-0.314), sin: Math.sin(-0.314), period: 5 },
      { b: q('.sat-b-b'), f: q('.sat-b-f'), cx: 880, cy: 200, rx: 44, ry: 15, cos: Math.cos(0.279), sin: Math.sin(0.279), period: 5.6 }
    ];

    /** @type {number} */
    let raf;
    /** @type {number | null} */
    let last = null;
    let tsec = 0;
    const step = (/** @type {number} */ t) => {
      if (last == null) last = t;
      let dt = (t - last) / 1000;
      last = t;
      if (dt > 0.05) dt = 0.05;
      tsec += dt;

      for (const p of flow) {
        const at = ((p.dist % len) + len) % len;
        const pt = path.getPointAtLength(at);
        p.el.setAttribute('cx', pt.x.toFixed(2));
        p.el.setAttribute('cy', pt.y.toFixed(2));
        const fi = at / dS, i0 = Math.floor(fi) % NS, fr = fi - Math.floor(fi);
        p.dist += scale * (shape[i0] * (1 - fr) + shape[(i0 + 1) % NS] * fr) * dt;
      }

      const dw = (2 * Math.PI) / diskOrbit.period;
      disk.forEach((el, i) => {
        const a = tsec * dw + diskOrbit.offs[i];
        const ca = Math.cos(a) * diskOrbit.rx, sa = Math.sin(a) * diskOrbit.ry;
        el.setAttribute('cx', (diskOrbit.cx + ca * diskOrbit.cos - sa * diskOrbit.sin).toFixed(2));
        el.setAttribute('cy', (diskOrbit.cy + ca * diskOrbit.sin + sa * diskOrbit.cos).toFixed(2));
      });

      for (const s of sats) {
        const a = tsec * ((2 * Math.PI) / s.period);
        const ca = Math.cos(a) * s.rx, sa = Math.sin(a) * s.ry;
        const x = s.cx + ca * s.cos - sa * s.sin;
        const y = s.cy + ca * s.sin + sa * s.cos;
        const behind = y > s.cy;
        for (const el of [s.b, s.f]) {
          el.setAttribute('cx', x.toFixed(2));
          el.setAttribute('cy', y.toFixed(2));
        }
        s.b.setAttribute('opacity', behind ? '1' : '0');
        s.f.setAttribute('opacity', behind ? '0' : '1');
      }

      raf = requestAnimationFrame(step);
    };

    // Only run while the diagram is actually on screen.
    let running = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = null;
        raf = requestAnimationFrame(step);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(svgEl);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  });
</script>

<figure class="cosmos">
  <svg bind:this={svgEl} class="scene" viewBox="0 0 1000 400" aria-hidden="true">
    <defs>
      <radialGradient id="cd-grav" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#4c86f0" stop-opacity="0.4" />
        <stop offset="0.55" stop-color="#4c86f0" stop-opacity="0.12" />
        <stop offset="1" stop-color="#4c86f0" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="cd-hole" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#04060a" />
        <stop offset="0.72" stop-color="#070a10" />
        <stop offset="1" stop-color="#0e1420" />
      </radialGradient>
      <linearGradient id="cd-disk" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#7ea8f7" stop-opacity="0" />
        <stop offset="0.25" stop-color="#9dc0fb" stop-opacity="0.9" />
        <stop offset="0.5" stop-color="#eaf1fe" stop-opacity="1" />
        <stop offset="0.75" stop-color="#9dc0fb" stop-opacity="0.9" />
        <stop offset="1" stop-color="#7ea8f7" stop-opacity="0" />
      </linearGradient>
      <radialGradient id="cd-atmo" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0.72" stop-color="#4c86f0" stop-opacity="0" />
        <stop offset="0.86" stop-color="#6ea0f6" stop-opacity="0.45" />
        <stop offset="1" stop-color="#6ea0f6" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="cd-planet-a" cx="0.36" cy="0.3" r="0.85">
        <stop offset="0" stop-color="#8fb0e6" />
        <stop offset="0.45" stop-color="#3d5a86" />
        <stop offset="1" stop-color="#0f1622" />
      </radialGradient>
      <radialGradient id="cd-planet-b" cx="0.36" cy="0.3" r="0.85">
        <stop offset="0" stop-color="#67d5c0" />
        <stop offset="0.45" stop-color="#2f6f74" />
        <stop offset="1" stop-color="#0d1622" />
      </radialGradient>
      <radialGradient id="cd-phole" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#4c86f0" stop-opacity="0.95" />
        <stop offset="0.55" stop-color="#4c86f0" stop-opacity="0.4" />
        <stop offset="1" stop-color="#4c86f0" stop-opacity="0" />
      </radialGradient>
      <filter id="cd-soft" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.2" />
      </filter>
      <clipPath id="cd-clip-a"><circle cx="120" cy="200" r="32" /></clipPath>
      <clipPath id="cd-clip-b"><circle cx="880" cy="200" r="32" /></clipPath>
      <clipPath id="cd-clip-h"><circle cx="500" cy="200" r="34" /></clipPath>
    </defs>

    <!-- stars -->
    <g fill="#cfe0fb">
      {#each stars as [x, y, r], i (i)}
        <circle class="star" cx={x} cy={y} {r} style="--d:{(i % 6) * 0.5}s" />
      {/each}
    </g>

    <!-- gravity glow; the flight path stays invisible (only drives packet motion) -->
    <circle cx="500" cy="200" r="190" fill="url(#cd-grav)" />
    <path bind:this={pathEl} d={PATH} fill="none" stroke="none" />

    <!-- host planet -->
    <g>
      <circle cx="120" cy="200" r="46" fill="url(#cd-atmo)" />
      <g transform="rotate(-18 120 200)">
        <ellipse cx="120" cy="200" rx="52" ry="15" fill="none" stroke="rgba(157,192,251,0.28)" stroke-width="3" />
      </g>
      <circle class="sat-a-b sat" cx="164" cy="196" r="2.8" fill="#eaf1fe" opacity="0" />
      <circle cx="120" cy="200" r="32" fill="url(#cd-planet-a)" />
      <g clip-path="url(#cd-clip-a)">
        <g transform="translate(120 200) rotate(-16) scale(0.9) translate(-26.5 -24.25)">
          <circle cx="26.5" cy="18.5" r="14" fill="url(#cd-phole)" />
          <g style="mix-blend-mode: soft-light" opacity="0.95">
            <path d="M12.5 44V17" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
            <circle cx="26.5" cy="18.5" r="14" fill="none" stroke="#ffffff" stroke-width="7" />
          </g>
        </g>
      </g>
      <g transform="rotate(-18 120 200)">
        <path d="M68 200 A52 15 0 0 1 172 200" fill="none" stroke="rgba(210,226,255,0.5)" stroke-width="2.5" />
      </g>
      <circle class="sat-a-f sat" cx="164" cy="196" r="2.8" fill="#eaf1fe" />
      <text x="120" y="270" text-anchor="middle" fill="#e7e9ec" font-size="13" font-weight="600">{d.hostGame}</text>
      <text x="120" y="146" text-anchor="middle" fill="#8b93a1" font-size="12" font-weight="600">{d.hostTitle}</text>
    </g>

    <!-- guest planet -->
    <g>
      <circle cx="880" cy="200" r="46" fill="url(#cd-atmo)" />
      <g transform="rotate(16 880 200)">
        <ellipse cx="880" cy="200" rx="52" ry="15" fill="none" stroke="rgba(157,192,251,0.28)" stroke-width="3" />
      </g>
      <circle class="sat-b-b sat" cx="924" cy="204" r="2.8" fill="#eaf1fe" opacity="0" />
      <circle cx="880" cy="200" r="32" fill="url(#cd-planet-b)" />
      <g clip-path="url(#cd-clip-b)">
        <g transform="translate(880 200) rotate(16) scale(0.9) translate(-26.5 -24.25)">
          <circle cx="26.5" cy="18.5" r="14" fill="url(#cd-phole)" />
          <g style="mix-blend-mode: soft-light" opacity="0.95">
            <path d="M12.5 44V17" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
            <circle cx="26.5" cy="18.5" r="14" fill="none" stroke="#ffffff" stroke-width="7" />
          </g>
        </g>
      </g>
      <g transform="rotate(16 880 200)">
        <path d="M828 200 A52 15 0 0 1 932 200" fill="none" stroke="rgba(210,226,255,0.5)" stroke-width="2.5" />
      </g>
      <circle class="sat-b-f sat" cx="924" cy="204" r="2.8" fill="#eaf1fe" />
      <text x="880" y="270" text-anchor="middle" fill="#e7e9ec" font-size="13" font-weight="600">{d.guestGame}</text>
      <text x="880" y="146" text-anchor="middle" fill="#8b93a1" font-size="12" font-weight="600">{d.guestTitle}</text>
    </g>

    <!-- black hole: soft glowing accretion disk + hole + Steam core -->
    <g transform="rotate(-19 500 200)">
      <ellipse cx="500" cy="200" rx="104" ry="46" fill="none" stroke="#6ea0f6" stroke-width="20" opacity="0.14" filter="url(#cd-soft)" />
      <ellipse cx="500" cy="200" rx="104" ry="46" fill="none" stroke="url(#cd-disk)" stroke-width="4" stroke-linecap="round" opacity="0.6" filter="url(#cd-soft)" />
    </g>
    <circle cx="500" cy="200" r="34" fill="url(#cd-hole)" />
    <circle cx="500" cy="200" r="35" fill="none" stroke="#cfe0fb" stroke-width="3.5" opacity="0.85" filter="url(#cd-soft)" />
    <g transform="rotate(-19 500 200)">
      <path d="M398 200 A104 46 0 0 0 602 200" fill="none" stroke="url(#cd-disk)" stroke-width="4.5" stroke-linecap="round" filter="url(#cd-soft)" />
    </g>
    <circle cx="500" cy="200" r="27" fill="#4c86f0" opacity="0.28" />
    <g clip-path="url(#cd-clip-h)">
      <g transform="translate(500 200) rotate(-8) scale(2.5) translate(-12 -12)" fill="#dce9fd" opacity="0.95">
        <path d={STEAM_PATH} />
      </g>
    </g>

    <!-- packets (positions driven by the rAF loop) -->
    <g class="particles">
      <circle class="pk" cx="120" cy="118" r="4" fill="#eaf1fe" />
      <circle class="pk" cx="500" cy="268" r="3.6" fill="#9dc0fb" />
      <circle class="pk" cx="880" cy="118" r="4" fill="#cfe0fb" />
      <circle class="pk" cx="880" cy="282" r="3.6" fill="#eaf1fe" />
      <circle class="pk" cx="500" cy="132" r="4" fill="#9dc0fb" />
      <circle class="pk" cx="120" cy="282" r="3.6" fill="#cfe0fb" />
      <circle class="pk-d" cx="612" cy="182" r="2.6" fill="#eaf1fe" />
      <circle class="pk-d" cx="388" cy="218" r="2.2" fill="#9dc0fb" />
    </g>

    <!-- labels -->
    <text x="500" y="300" text-anchor="middle" fill="#e7e9ec" font-size="15" font-weight="700">{d.network}</text>
  </svg>

  <figcaption>{d.flow}. {d.caption}</figcaption>
</figure>

<style>
  .cosmos {
    margin: 0;
  }
  .scene {
    display: block;
    width: 100%;
    max-width: 940px;
    margin: 0 auto;
    height: auto;
  }
  .star {
    animation: cd-tw 5s ease-in-out infinite;
    animation-delay: var(--d);
  }
  @keyframes cd-tw {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 1; }
  }
  figcaption {
    margin-top: var(--space-3);
    text-align: center;
    color: var(--muted);
    font-size: 0.9rem;
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
  }
  @media (prefers-reduced-motion: reduce) {
    .particles,
    .sat {
      display: none;
    }
    .star {
      animation: none;
    }
  }
</style>
