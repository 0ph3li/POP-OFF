/* =========================================================
   POP OFF — sets.js (the sets)
   concept, design & code by ghostly.grl ♥
   ========================================================= */
(() => {
  const P = window.PO, { $, $$ } = P;
  const M = P.motion;

  /* the fourteen sets. photo = img/SETS/<id>.jpg, the ten tips = img/SETS/<id>-tips.png, a = the photo's tone while it loads */
  const SETS = [
    { id: 'milk-spikes', name: 'Milk Spikes', a: '#b9b2ad', shape: 'stiletto', len: 'extra long', price: 42, note: 'milk white, silver spikes, a rhinestone cross and "hollywood" in script. two clear jelly tips to keep it honest.' },
    { id: 'cherry-leopard', name: 'Cherry Leopard', a: '#7a4a35', shape: 'square', len: 'long', price: 40, note: 'tortoiseshell spots, two glossy cherries, an orchid in 3D and gold beads. a brown blush french on the rest.' },
    { id: 'blush-ballet', name: 'Blush Ballet', a: '#d9b3b0', shape: 'almond', len: 'long', price: 34, note: 'pink ribbon laced like ballet shoes, a 3D bow on the ring finger, a pink french on the other four.' },
    { id: 'holy-nude', name: 'Holy Nude', a: '#c9a99a', shape: 'coffin', len: 'extra long', price: 36, note: 'a peach glaze with silver studs, and one black cross straight down the middle finger. church, but late.' },
    { id: 'mint-happiness', name: 'Mint Happiness', a: '#9fb9b3', shape: 'almond', len: 'medium', price: 34, note: 'mint glaze, "happiness" written on the thumb, a studded cross, white lace flowers on sheer pink.' },
    { id: 'rose-piercing', name: 'Rose Piercing', a: '#b8bcbd', shape: 'almond', len: 'medium', price: 40, note: 'milky ice with white 3D roses, pink crosses, crystals, and belly-bar piercings looped through the nail.' },
    { id: 'snow-leopard', name: 'Snow Leopard', a: '#a7a3a2', shape: 'almond', len: 'medium', price: 38, note: 'grey spots and zebra on milk, crystal bands on pink, a rhinestone cross. pretty in pink, deadly in grey.' },
    { id: 'candy-safari', name: 'Candy Safari', a: '#b7a6c2', shape: 'coffin', len: 'long', price: 44, ltd: true, note: 'airbrushed pink into baby blue, leopard and tiger by hand, white flowers, one lilac orchid in 3D. 200 boxes.' },
    { id: 'cinnamon-stars', name: 'Cinnamon Stars', a: '#7d5a45', shape: 'almond', len: 'medium', price: 38, note: 'cinnamon, caramel and tortoiseshell, gold stars, gold frames, one nail dipped in glitter. the cinnamon ad, on ten fingers.' },
    { id: 'baby-boomer', name: 'Baby Boomer', a: '#cdb2ae', shape: 'almond', len: 'long', price: 36, note: 'pink at the cuticle, milk at the tip, silver swirls, three pearls and a few crystals. the one your mum still asks about.' },
    { id: 'chrome-claws', name: 'Chrome Claws', a: '#5a5658', shape: 'stiletto', len: 'extra long', price: 42, note: 'mirror chrome filed to a needle. one milk nail with a gothic silver cross and an emerald. LACQ energy.' },
    { id: 'french-kiss', name: 'French Kiss', a: '#b49c97', shape: 'square', len: 'medium', price: 30, note: 'a deep white french, a <3 across two nails and one white drip. the french, but she texts back.' },
    { id: 'liquid-metal', name: 'Liquid Metal', a: '#8c8885', shape: 'stiletto', len: 'long', price: 42, note: 'milk and sheer pink, with liquid silver crawling up the nail: beaded chains, molten flames, one silver vein.' },
    { id: 'polka-punk', name: 'Polka Punk', a: '#c6a9ad', shape: 'coffin', len: 'medium', price: 36, note: 'pink french, black polka dots, a chrome nail with a black star, a black tip with four silver studs.' },
  ];
  const byId = Object.fromEntries(SETS.map((s) => [s.id, s]));

  /* ================= 01 · THE POSTER ================= */
  if (M) {
    gsap.timeline({ delay: .1 })
      .from('.sp__photo .slot', { scale: 1.18, duration: 1.3, ease: 'expo.out' }, 0)
      .from('.sp__serif', { yPercent: 60, opacity: 0, duration: .7, ease: 'back.out(1.8)' }, .1)
      .from('.sp__script', { opacity: 0, scale: .5, rotation: -20, duration: .8, ease: 'back.out(1.8)' }, .3)
      .from('.sp__spark', { scale: 0, rotation: -180, duration: .6, ease: 'back.out(2)' }, .4)
      .from('.sp__tiny, .sp__ru, .sp__dl > div, .sp__go, .sp__by, .sp__dj', { opacity: 0, y: 16, duration: .5, stagger: .05, ease: 'power3.out' }, .45);
    gsap.timeline({ scrollTrigger: { trigger: '.sp', start: 'top top', end: 'bottom top', scrub: true } })
      .to('.sp__photo .slot', { yPercent: 10, ease: 'none' }, 0)
      .to('.sp__script', { xPercent: 12, ease: 'none' }, 0);
  }

  /* ================= 02 · THE SHOP ================= */
  const two = (name) => { const [a, ...b] = name.split(' '); return [a.toUpperCase(), b.join(' ')]; };
  const grid = $('#shopGrid');
  grid.innerHTML = SETS.map((s, i) => {
    const [a, b] = two(s.name);
    return `<button class="tile" data-id="${s.id}" data-shape="${s.shape}" data-cursor="open the set">
      <div class="tile__ph">
        <div class="slot" data-img="img/SETS/${s.id}.jpg" data-label="${s.id}.jpg · ${s.name.toLowerCase()} on a hand, close. portrait 4:5" style="--tone:${s.a}"></div>
        ${s.ltd ? '<span class="tile__ltd">limited</span>' : ''}
        <span class="tile__hover"><b>${a}</b><em>${b}</em><img class="tile__tips" src="img/SETS/${s.id}-tips.png" alt="" loading="lazy" /><small>view the set</small></span>
      </div>
      <p class="tile__cap"><span>${String(i + 1).padStart(2, '0')} · ${s.name}</span><span>€${s.price}</span></p>
    </button>`;
  }).join('');
  P.slots(grid);
  $('.shop__filters [data-shape="all"] sup').textContent = SETS.length;
  const tiles = $$('.tile', grid);

  $$('.shop__filters button').forEach((b) => b.addEventListener('click', () => {
    $$('.shop__filters button').forEach((x) => x.classList.toggle('is-on', x === b));
    const sh = b.dataset.shape, show = tiles.filter((t) => sh === 'all' || t.dataset.shape === sh);
    tiles.forEach((t) => t.classList.toggle('is-hidden', !show.includes(t)));
    if (M) gsap.fromTo(show, { y: 40, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .5, stagger: .05, ease: 'back.out(1.4)' });
    ScrollTrigger.refresh();
  }));

  if (M) {
    gsap.from('.shop__k, .shop__title, .shop__filters', { y: 30, opacity: 0, duration: .6, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.shop', start: 'top 75%', once: true } });
    gsap.from(tiles, { y: 70, opacity: 0, duration: .7, stagger: { each: .06, grid: 'auto', from: 'start' }, ease: 'expo.out', scrollTrigger: { trigger: grid, start: 'top 85%', once: true } });
  }

  /* ================= THE SET POSTER ================= */
  const po = $('#po');
  let cur = 0, lastFocus = null;
  const fill = (i) => {
    cur = (i + SETS.length) % SETS.length;
    const s = SETS[cur], [a, b] = two(s.name);
    $('#poTiny').textContent = `set no. ${String(cur + 1).padStart(2, '0')}${s.ltd ? ' · limited, 200 boxes' : ''}`;
    $('#poSerif').textContent = a; $('#poScript').textContent = b;
    $('#poNote').textContent = s.note;
    $('#poShape').innerHTML = `${s.shape}`; $('#poLen').innerHTML = `${s.len} <em>of attitude</em>`;
    $('#poPrice').textContent = `€${s.price}`;
    $('#poN').textContent = `${String(cur + 1).padStart(2, '0')} / ${String(SETS.length).padStart(2, '0')}`;
    $('#poPhoto').innerHTML = `<div class="slot" data-img="img/SETS/${s.id}.jpg" data-label="${s.id}.jpg · ${s.name.toLowerCase()} on a hand, close. portrait 4:5" style="--tone:${s.a}"></div>`;
    P.slots($('#poPhoto'));
    const tp = $('#poTips'); tp.src = `img/SETS/${s.id}-tips.png`; tp.alt = `the ten tips of ${s.name.toLowerCase()}`;
    if (M) {
      gsap.timeline()
        .fromTo('#poPhoto .slot', { scale: 1.15 }, { scale: 1, duration: 1, ease: 'expo.out' }, 0)
        .fromTo('.po__serif', { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .55, ease: 'back.out(1.8)' }, 0)
        .fromTo('.po__script', { opacity: 0, scale: .5, rotation: -20 }, { opacity: 1, scale: 1, rotation: -5, duration: .7, ease: 'back.out(1.8)' }, .12)
        .fromTo('.po__ru, .po__dl > div, .po__tips, .po__buy', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, stagger: .05, ease: 'power3.out' }, .2);
    }
  };
  const openPo = (i) => {
    lastFocus = document.activeElement;
    po.hidden = false; document.body.classList.add('po-open'); P.lenis?.stop();
    if (M) gsap.fromTo(po, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: .7, ease: 'expo.inOut' });
    fill(i);
    $('#poClose').focus();
  };
  const closePo = () => {
    const done = () => { po.hidden = true; document.body.classList.remove('po-open'); P.lenis?.start(); lastFocus?.focus?.(); };
    if (M) gsap.to(po, { clipPath: 'inset(0 0 100% 0)', duration: .55, ease: 'expo.inOut', onComplete: done }); else done();
  };
  grid.addEventListener('click', (e) => { const t = e.target.closest('.tile'); if (t) openPo(SETS.findIndex((s) => s.id === t.dataset.id)); });
  $('#poClose').addEventListener('click', closePo);
  $('#poPrev').addEventListener('click', () => fill(cur - 1));
  $('#poNext').addEventListener('click', () => fill(cur + 1));
  $('#poAdd').addEventListener('click', (e) => { const s = SETS[cur]; P.fly(e.currentTarget); P.bag.add({ id: s.id, name: s.name, price: s.price, shape: s.shape, len: s.len }); P.toast(`${s.name.toLowerCase()} is in your bag. 24 tips, all yours. claws out.`); });
  addEventListener('keydown', (e) => {
    if (po.hidden) return;
    if (e.key === 'Escape') closePo();
    if (e.key === 'ArrowRight') fill(cur + 1);
    if (e.key === 'ArrowLeft') fill(cur - 1);
  });
  // a link like sets.html#cherry-leopard opens that poster straight away
  const hash = location.hash.slice(1);
  if (byId[hash]) setTimeout(() => openPo(SETS.findIndex((s) => s.id === hash)), 300);
  // sets.html#shape-almond (from the shapes quiz) opens the shop filtered
  const sh = hash.startsWith('shape-') && $(`.shop__filters [data-shape="${hash.slice(6)}"]`);
  if (sh) setTimeout(() => { sh.click(); P.scrollTo('#shop'); }, 300);

  document.fonts?.ready.then(() => { if (P.hasGsap) ScrollTrigger.refresh(); });
})();
