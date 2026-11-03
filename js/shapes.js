/* =========================================================
   POP OFF — shapes.js (the four shapes)
   concept, design & code by ghostly.grl ♥
   ========================================================= */
(() => {
  const P = window.PO, { $, $$ } = P;
  const M = P.motion;

  /* the four shapes, in the palette card colours. sets = the ids in js/sets.js */
  const SHAPES = [
    { id: 'almond', hex: '#E7A6AC', c0: '#f7d9cb', c1: '#E7A6AC', best: 'every day, every hand', len: 'short → long', note: 'soft at the sides, a point that\'s polite about it. the one that makes short fingers look long and long fingers look rich.', why: 'you want claws that still say good morning. a point, but a polite one.',
      sets: [['blush-ballet', 'Blush Ballet'], ['mint-happiness', 'Mint Happiness'], ['rose-piercing', 'Rose Piercing'], ['snow-leopard', 'Snow Leopard'], ['cinnamon-stars', 'Cinnamon Stars'], ['baby-boomer', 'Baby Boomer']] },
    { id: 'stiletto', hex: '#D48D95', c0: '#f2cbb9', c1: '#D48D95', best: 'pointing at things', len: 'long → extra long', note: 'filed to a needle. it opens letters, ends conversations and never once types a full sentence.', why: 'you point, people listen. you will never open a can again and you are fine with it.',
      sets: [['milk-spikes', 'Milk Spikes'], ['chrome-claws', 'Chrome Claws'], ['liquid-metal', 'Liquid Metal']] },
    { id: 'square', hex: '#A2C3B1', c0: '#e3eedd', c1: '#A2C3B1', best: 'typing, texting, working', len: 'short → long', note: 'a flat, clean edge, the strongest of the four. the french was born here and it never left.', why: 'you text back. you also open your own cans. a flat edge for a straight answer.',
      sets: [['cherry-leopard', 'Cherry Leopard'], ['french-kiss', 'French Kiss']] },
    { id: 'coffin', hex: '#B6D6C7', c0: '#eef6ea', c1: '#B6D6C7', best: 'the club till close', len: 'medium → extra long', note: 'long, tapered, cut flat at the end like a ballet shoe, or a coffin, depending on your night.', why: 'ballerina by day, coffin by 3am. you want length and a flat end to put art on.',
      sets: [['holy-nude', 'Holy Nude'], ['candy-safari', 'Candy Safari'], ['polka-punk', 'Polka Punk']] },
  ];
  const byId = Object.fromEntries(SHAPES.map((s) => [s.id, s]));

  /* ================= gold clouds — the curls on the palette cards ================= */
  const clouds = (cv, seed) => {
    const d = P.dpr(), W = (cv.width = Math.round(cv.clientWidth * d)), H = (cv.height = Math.round(cv.clientHeight * d));
    const ctx = cv.getContext('2d'), r = P.seeded(seed);
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';
    const gold = ['rgba(246,222,160,.95)', 'rgba(233,196,122,.85)', 'rgba(255,240,205,.9)'];
    const curl = (x, y, R, turns, dir) => {
      ctx.beginPath();
      for (let t = 0; t <= turns * Math.PI * 2; t += .12) { const rr = R * (1 - t / (turns * Math.PI * 2 + .6)); ctx.lineTo(x + Math.cos(t * dir) * rr, y + Math.sin(t * dir) * rr); }
      ctx.stroke();
    };
    // the waves: long lines that end in a curl
    for (let k = 0; k < 7; k++) {
      ctx.strokeStyle = gold[k % 3]; ctx.lineWidth = (1 + r() * 1.2) * d;
      const y = H * (.1 + r() * .85), x0 = W * (.25 + r() * .2), amp = H * (.06 + r() * .1), len = W * (.3 + r() * .4);
      ctx.beginPath();
      for (let x = 0; x <= len; x += 4 * d) ctx.lineTo(x0 + x, y + Math.sin(x / (W * .07) + k) * amp);
      ctx.stroke();
      const ex = x0 + len, ey = y + Math.sin(len / (W * .07) + k) * amp;
      curl(ex, ey - H * .05, H * (.05 + r() * .05), 1.6, r() > .5 ? 1 : -1);
    }
    // the clouds: little clusters of curls and bubbles
    for (let c = 0; c < 5; c++) {
      const cx = W * (.38 + r() * .58), cy = H * (.15 + r() * .7), s = H * (.07 + r() * .07);
      ctx.strokeStyle = gold[c % 3]; ctx.lineWidth = (1.1 + r()) * d;
      for (let i = 0; i < 4; i++) curl(cx + (i - 1.5) * s * 1.3, cy + Math.sin(i * 1.7) * s * .5, s * (.8 + r() * .5), 1.8, i % 2 ? 1 : -1);
      ctx.beginPath(); ctx.moveTo(cx - s * 2.8, cy + s * 1.1); ctx.bezierCurveTo(cx - s, cy + s * 1.6, cx + s, cy + s * .6, cx + s * 2.8, cy + s * 1.2); ctx.stroke();
      ctx.fillStyle = gold[(c + 1) % 3];
      for (let b = 0; b < 6; b++) { ctx.beginPath(); ctx.arc(cx + (r() - .5) * s * 6, cy - s * (1 + r() * 1.5), (1.5 + r() * 3) * d, 0, 7); ctx.globalAlpha = .9; ctx.stroke(); ctx.globalAlpha = 1; }
    }
  };

  /* ================= 01 · RÊVESCAPE ================= */
  if (M) {
    gsap.timeline({ delay: .1 })
      .from('.sh__ph .slot', { scale: 1.2, duration: 1.6, ease: 'expo.out' }, 0)
      .from('.sh__script', { opacity: 0, x: 60, duration: 1, ease: 'expo.out' }, .25)
      .from('.sh__k, .sh__tiny, .sh__go', { opacity: 0, y: 14, duration: .5, stagger: .06, ease: 'power3.out' }, .5);
    gsap.to('.sh__ph .slot', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.sh', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ================= 02 · THE SUBMARK — drawn by hand as you scroll ================= */
  $$('.sub__mark').forEach((svg) => {
    // <use> can't be stroke-animated from outside, so copy the symbol inline
    const sym = $('#submark');
    svg.setAttribute('viewBox', sym.getAttribute('viewBox'));
    svg.innerHTML = sym.innerHTML;
    if (!M) return;
    const paths = $$('path', svg);
    paths.forEach((p) => { const l = p.getTotalLength(); p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
    gsap.to(paths, { strokeDashoffset: 0, ease: 'none', stagger: .08, scrollTrigger: { trigger: svg.closest('.sub__half'), start: 'top 75%', end: 'center 45%', scrub: .6 } });
  });
  if (M) {
    gsap.from('.sub__line', { opacity: 0, y: 20, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '.sub__line', start: 'top 90%', once: true } });
    gsap.to('.sub__half--dark .slot', { yPercent: -8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.sub__half--dark', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ================= 03 · THE PALETTE CARDS ================= */
  const list = $('#cardList');
  list.innerHTML = SHAPES.map((s, i) => `
    <div class="card" data-id="${s.id}" style="--c0:${s.c0};--c1:${s.c1};--ink2:#d0607a">
      <button class="card__top" aria-expanded="false" data-cursor="open">
        <canvas></canvas>
        <span class="card__txt">
          <span class="card__name">${s.id}</span>
          <span class="card__data">${s.hex}<br />best for / ${s.best}<br />lengths / ${s.len}<br />sets / ${P.pad(s.sets.length)}</span>
        </span>
        <img class="card__tip" src="img/SHAPES/tip-${s.id}.png" alt="a ${s.id} tip" />
        <span class="card__plus" aria-hidden="true">+</span>
      </button>
      <div class="card__more"><div>
        <p class="card__note">${s.note}</p>
        <div class="card__sets">${s.sets.map(([id, name]) => `<a class="card__set" href="sets.html#${id}" data-cursor="see it"><div class="slot" data-img="img/SETS/${id}.jpg" style="--tone:${s.c1}"></div><span>${name}</span></a>`).join('')}</div>
      </div></div>
    </div>`).join('');
  P.slots(list);
  const cards = $$('.card', list);
  const paintClouds = () => cards.forEach((c, i) => clouds($('canvas', c), 21 + i * 9));
  paintClouds();
  cards.forEach((c) => $('.card__top', c).addEventListener('click', () => {
    const open = !c.classList.contains('is-open');
    cards.forEach((x) => { x.classList.toggle('is-open', x === c && open); $('.card__top', x).setAttribute('aria-expanded', String(x === c && open)); });
    if (open && M) gsap.fromTo($$('.card__set', c), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .05, delay: .15, ease: 'back.out(1.6)' });
    setTimeout(() => P.hasGsap && ScrollTrigger.refresh(), 650);
  }));
  if (M) {
    gsap.from('.cards__panel', { y: 80, opacity: 0, duration: .9, ease: 'expo.out', scrollTrigger: { trigger: '.cards', start: 'top 75%', once: true } });
    gsap.from(cards, { x: -60, opacity: 0, duration: .7, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: list, start: 'top 80%', once: true } });
    gsap.from($$('.card__tip', list), { rotation: 160, opacity: 0, duration: .9, stagger: .1, ease: 'back.out(1.4)', scrollTrigger: { trigger: list, start: 'top 75%', once: true } });
  }

  /* ================= 04 · THE QUIZ — three questions, three swatches ================= */
  const Q = [
    { q: 'your nails, mostly:', a: [['pointing at things', { stiletto: 2, coffin: 1 }], ['typing, texting, opening cans', { square: 2, almond: 1 }], ['holding a coffee, looking expensive', { almond: 2, coffin: 1 }]] },
    { q: 'friday night:', a: [['the club till the lights come on', { coffin: 2, stiletto: 1 }], ['a gig, a pit, a lost earring', { stiletto: 2, square: 1 }], ['dinner, then a second dinner', { almond: 2, square: 1 }]] },
    { q: 'your ex would say you are:', a: [['a lot', { stiletto: 2, coffin: 1 }], ['honest, unfortunately', { square: 2, almond: 1 }], ['the best thing that happened to him', { coffin: 2, almond: 1 }]] },
  ];
  let step = 0, score = {};
  const sw = $$('.sw'), qq = $('#quizQ'), qk = $('#quizK'), box = $('#quizSw'), res = $('#quizRes');
  const ask = () => {
    qk.textContent = `question ${step + 1} of ${Q.length}`;
    qq.textContent = Q[step].q;
    sw.forEach((b, i) => { $('.sw__t', b).textContent = Q[step].a[i][0]; });
    if (M) gsap.fromTo([qq, ...sw], { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .45, stagger: .06, ease: 'power3.out' });
  };
  const result = () => {
    const best = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0], s = byId[best];
    qk.textContent = 'three questions later'; qq.textContent = 'your file is in.';
    $('#resName').textContent = s.id; $('#resWhy').textContent = s.why;
    $('#resTip').src = `img/SHAPES/tip-${s.id}.png`; $('#resTip').alt = `a ${s.id} tip`;
    $('#resGo').href = `sets.html#shape-${s.id}`; $('#resGo').textContent = `see the ${s.id} sets`;
    box.hidden = true; res.hidden = false;
    P.store?.set?.('shape', s.id);
    if (M) gsap.timeline().fromTo('#resTip', { rotation: -120, scale: .4, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: .8, ease: 'back.out(1.6)' }).fromTo('.quiz__res > div > *', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, stagger: .06, ease: 'power3.out' }, .2);
  };
  sw.forEach((b, i) => b.addEventListener('click', () => {
    Object.entries(Q[step].a[i][1]).forEach(([k, v]) => { score[k] = (score[k] || 0) + v; });
    step += 1;
    if (step < Q.length) ask(); else result();
  }));
  $('#resAgain').addEventListener('click', () => { step = 0; score = {}; res.hidden = true; box.hidden = false; ask(); });
  ask();
  if (M) gsap.from('.quiz__art .slot', { scale: 1.2, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.quiz', start: 'top 70%', once: true } });

  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(paintClouds, 200); });
  document.fonts?.ready.then(() => { if (P.hasGsap) ScrollTrigger.refresh(); });
})();
