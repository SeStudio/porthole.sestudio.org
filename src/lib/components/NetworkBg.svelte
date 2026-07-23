<script>
  // Ambient brand texture: faint blue network lines with softly glowing nodes.
  // Purely decorative; nodes twinkle slowly and settle static under reduced motion.
  const nodes = [
    [120, 90], [340, 180], [560, 70], [780, 200], [1020, 120], [1140, 300],
    [70, 340], [280, 430], [520, 340], [700, 470], [900, 380], [1080, 520],
    [200, 560], [430, 610], [660, 640], [860, 590]
  ];
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [1, 8], [6, 7], [7, 8],
    [8, 9], [3, 8], [9, 10], [10, 5], [10, 11], [7, 12], [12, 13], [13, 14],
    [8, 13], [14, 15], [9, 14], [11, 15]
  ];
</script>

<svg class="netbg" viewBox="0 0 1200 680" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <radialGradient id="nb-node" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#4C86F0" stop-opacity="0.9" />
      <stop offset="1" stop-color="#4C86F0" stop-opacity="0" />
    </radialGradient>
  </defs>
  <g stroke="#4C86F0" stroke-width="1.5" stroke-opacity="0.12">
    {#each links as [a, b], i (i)}
      <line x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
    {/each}
  </g>
  <g>
    {#each nodes as [x, y], i (i)}
      <circle class="glow" cx={x} cy={y} r="12" fill="url(#nb-node)" style="--d:{(i % 7) * 0.6}s" />
      <circle cx={x} cy={y} r="2.4" fill="#7ea8f7" />
    {/each}
  </g>
</svg>

<style>
  .netbg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
  .glow {
    animation: tw 6s ease-in-out infinite;
    animation-delay: var(--d);
    transform-box: fill-box;
    transform-origin: center;
  }
  @keyframes tw {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 1; }
  }
</style>
