/* =========================================================
   POP OFF — index.js (home)
   concept, design & code by ghostly.grl ♥
   ========================================================= */
(() => {
  const P = window.PO, { $, $$ } = P;
  const M = P.motion;

  /* ================= 01 · HERO ================= */
  const heroLetters = [...P.split($('.hero__pop')), ...P.split($('.hero__off'))];

  P.ready.then(() => {
    if (!M) return;
    gsap.timeline()
      .from('.hero__media', { scale: 1.2, duration: 1.2, ease: 'expo.out' }, 0)
      .from('.hero__mark', { scale: 0, rotation: -180, duration: .7, ease: 'back.out(2)' }, .05)
      .from(heroLetters, { yPercent: 50, scale: 0, opacity: 0, duration: .55, stagger: .045, ease: 'back.out(2.4)' }, .1)
      .from('.hero__k, .hero__sub', { opacity: 0, y: 12, duration: .4, stagger: .04, ease: 'power3.out' }, .35);

    // the face drifts, the word floats up and away
    gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      .to('.hero__img', { yPercent: 14, scale: 1.08, ease: 'none' }, 0)
      .to('.hero__word', { yPercent: -60, scale: .85, ease: 'none' }, 0);

    if (P.fine) {
      const xTo = gsap.quickTo('.hero__media', 'x', { duration: 1.2, ease: 'power3.out' });
      const yTo = gsap.quickTo('.hero__media', 'y', { duration: 1.2, ease: 'power3.out' });
      $('.hero').addEventListener('pointermove', (e) => { xTo((e.clientX / innerWidth - .5) * -26); yTo((e.clientY / innerHeight - .5) * -18); });
    }
  });

  /* ================= PRESS ON. — the hand drops in, the chrome catches the light ================= */
  if (M) {
    gsap.timeline({ scrollTrigger: { trigger: '.lacq', start: 'top 75%', once: true } })
      .from('.lacq__card', { y: 60, opacity: 0, duration: .7, stagger: .1, ease: 'expo.out' }, 0)
      .from('.lacq__hand', { yPercent: -70, duration: 1, ease: 'back.out(1.4)' }, .1)
      .from('.lacq__word > *', { y: 30, opacity: 0, duration: .5, stagger: .08, ease: 'power3.out' }, .4);
    gsap.fromTo('.lacq__plate', { '--shine': '-100%' }, { '--shine': '100%', ease: 'none', scrollTrigger: { trigger: '.lacq', start: 'top 80%', end: 'bottom 20%', scrub: true } });
    gsap.fromTo('.lacq__hand .slot', { rotation: -3 }, { rotation: 3, transformOrigin: '50% 0', ease: 'none', scrollTrigger: { trigger: '.lacq', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ================= 02 · CLAWS OUT ================= */
  const swash = $('.out__swash path');
  swash?.setAttribute('pathLength', '1');
  if (M) {
    gsap.set(swash, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.timeline({ scrollTrigger: { trigger: '.out', start: 'top 75%', once: true } })
      .from('.out__band', { scaleX: 0, duration: .8, ease: 'expo.out' }, 0)
      .from('.out__ph', { clipPath: 'inset(50% 0 50% 0)', duration: .6, stagger: .07, ease: 'expo.out' }, .1)
      .from('.out__w', { opacity: 0, scale: .6, rotation: (i) => (i ? 10 : -16), duration: .7, stagger: .1, ease: 'back.out(1.8)' }, .15)
      .to(swash, { strokeDashoffset: 0, duration: .7, ease: 'power2.out' }, .3)
      .from('.out__q, .out__top', { opacity: 0, y: 14, duration: .45, stagger: .05, ease: 'power3.out' }, .3);
    gsap.timeline({ scrollTrigger: { trigger: '.out', start: 'top bottom', end: 'bottom top', scrub: true } })
      .fromTo('.out__w--1', { x: -60 }, { x: 60, ease: 'none' }, 0)
      .fromTo('.out__w--2', { x: 80 }, { x: -50, ease: 'none' }, 0)
      .fromTo('.out__band .slot', { xPercent: -3 }, { xPercent: 3, ease: 'none' }, 0)
      .fromTo('.out__stack', { y: 50 }, { y: -50, ease: 'none' }, 0);
  }

  /* ================= 03 · SET NO. 07 ================= */
  const serif = P.split($('.set__serif'));
  if (M) {
    gsap.timeline({ scrollTrigger: { trigger: '.set', start: 'top 72%', once: true } })
      .from(serif, { yPercent: 80, opacity: 0, rotation: 8, duration: .55, stagger: .035, ease: 'back.out(2)' }, 0)
      .from('.set__script', { opacity: 0, scale: .5, rotation: -20, duration: .65, ease: 'back.out(2)' }, .2)
      .from('.set__spark:not(.set__spark--b)', { scale: 0, rotation: -270, duration: .7, ease: 'back.out(2.5)' }, .35)
      .from('.set__ru, .set__dl > div, .set__price, .set__add, .set__tiny', { y: 20, opacity: 0, duration: .45, stagger: .045, ease: 'power3.out' }, .3)
      .from('.set__photo .slot', { clipPath: 'inset(0 0 0 100%)', duration: .8, ease: 'expo.out' }, 0);
    // the star opens on scroll, like an eye
    gsap.timeline({ scrollTrigger: { trigger: '.set__band', start: 'top bottom', end: 'bottom 30%', scrub: true } })
      .fromTo('.set__star', { scale: .25, rotation: -40 }, { scale: 1.05, rotation: 0, ease: 'none' }, 0)
      .fromTo('.set__star .slot', { scale: 1.4 }, { scale: 1, ease: 'none' }, 0)
      .fromTo('.set__ghost', { xPercent: 0 }, { xPercent: -14, ease: 'none' }, 0)
      .fromTo('.set__spark--b', { rotation: 0 }, { rotation: 180, ease: 'none' }, 0);
  }
  $('#addSet')?.addEventListener('click', (e) => {
    P.fly(e.currentTarget); P.bag.add({ id: 'cherry-leopard', name: 'Cherry Leopard', price: 40, shape: 'square', len: 'long' });
    P.toast('cherry leopard is in your bag. 24 tips, all yours. claws out.');
  });

  /* ================= ALMOND — the claw is sliced into strips; they line up as you scroll ================= */
  const al = $('#almondImg');
  if (al) {
    const N = 22, r = P.seeded(8);
    const [file, desc] = al.dataset.label.split(' · ');
    al.innerHTML = Array.from({ length: N }, (_, i) => `<i style="--bs:${N * 100}% 100%;--bp:${(i / (N - 1)) * 100}% 50%"></i>`).join('') + `<span class="slot-label">${file}<small>${desc}</small></span>`;
    const strips = $$('i', al);
    const img = new Image();
    img.onload = () => { al.classList.add('has-img'); strips.forEach((st, i) => { st.style.backgroundImage = `url(${al.dataset.src})`; st.style.backgroundSize = `${N * 100}% 100%`; st.style.backgroundPosition = `${(i / (N - 1)) * 100}% 50%`; }); };
    img.src = al.dataset.src;
    if (M) {
      gsap.fromTo(strips, { yPercent: () => (r() - .5) * 40, scaleY: () => .8 + r() * .25 }, { yPercent: 0, scaleY: 1, ease: 'none', stagger: { each: .01, from: 'center' }, scrollTrigger: { trigger: al, start: 'top 95%', end: 'center 45%', scrub: true } });
      gsap.timeline({ scrollTrigger: { trigger: '.almond', start: 'top 72%', once: true } })
        .from('.almond__script', { opacity: 0, scale: .7, rotation: -6, duration: .7, ease: 'back.out(1.8)' }, 0)
        .from('.almond__side, .almond__sans', { y: 30, opacity: 0, duration: .5, stagger: .08, ease: 'power3.out' }, .2);
      gsap.from('.almond__pills span, .almond__txt, .almond__foot', { y: 20, opacity: 0, duration: .5, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: '.almond__pills', start: 'top 92%', once: true } });
    }
  }

  /* ================= 04 · COLOR PAIRING ================= */
  const PAIRS = [
    { a: 'DRIED BLOOD', hex: '#310101', top: '#5a090c', tex: 'croc', n: '#b39062', b: 'LEOPARD', pat: 'leo-warm', nb: '#7a0a10', note: 'wear it to a funeral. yours or his.' },
    { a: 'CINNAMON', hex: '#a8644f', top: '#a8644f', tex: 'gloss', n: '#f6e3d6', b: 'CREAM', pat: 'stars', nb: '#a8644f', note: 'a bun, a lip gloss, a text you shouldn\'t send.' },
    { a: 'DUSTY ROSE', hex: '#d5547f', top: '#d5547f', tex: 'gloss', n: '#f3ebde', b: 'TEAL', pat: 'waves', nb: '#f3ebde', note: 'tiger energy. the dragon is optional.' },
    { a: 'MILK', hex: '#ece4e2', top: '#ece4e2', tex: 'gloss', n: '#8f0f1c', b: 'CHROME', pat: 'chrome', nb: '#1b1b1b', note: 'clean girl, but she owns a chain.' },
    { a: 'BLUSH', hex: '#e7a6ac', top: '#e7a6ac', tex: 'gloss', n: '#310101', b: 'SNOW LEOPARD', pat: 'leo-cool', nb: '#310101', note: 'pretty in pink, deadly in grey.' },
  ];
  const pc = $('#pairCanvas');
  const pattern = (cv, name) => {
    if (name.startsWith('leo-')) return P.leopard(cv, name.slice(4), 21);
    const d = P.dpr(), w = (cv.width = Math.round(cv.clientWidth * d)), h = (cv.height = Math.round(cv.clientHeight * d));
    const ctx = cv.getContext('2d'), r = P.seeded(5);
    if (name === 'stars') {
      // cream paper with little rose-gold stars, the cinnamon lip
      ctx.fillStyle = '#f2ebe2'; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 60; i++) {
        const x = r() * w, y = r() * h, s = (3 + r() * 9) * d, a = r() * 6.28;
        ctx.fillStyle = r() > .5 ? '#c98f78' : '#e5c3b2';
        ctx.beginPath();
        for (let k = 0; k < 10; k++) { const rr = k % 2 ? s * .45 : s; ctx.lineTo(x + Math.cos(a + k * .628) * rr, y + Math.sin(a + k * .628) * rr); }
        ctx.fill();
      }
    } else if (name === 'waves') {
      // teal silk with ivory waves, like the painted scroll
      const g = ctx.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#b9d8cb'); g.addColorStop(1, '#42979a');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(246,234,200,.75)'; ctx.lineWidth = 1.6 * d;
      for (let k = 0; k < 9; k++) {
        const y0 = (k / 8) * h, amp = (8 + r() * 18) * d;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6 * d) ctx.lineTo(x, y0 + Math.sin(x / (40 * d) + k) * amp + Math.sin(x / (13 * d)) * 3 * d);
        ctx.stroke();
      }
      for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(r() * w, r() * h, (2 + r() * 6) * d, 0, 7); ctx.stroke(); }
    } else if (name === 'chrome') {
      const g = ctx.createLinearGradient(0, 0, w * .4, h);
      [['#5b5e63', 0], ['#e9ecef', .22], ['#8c9096', .38], ['#fbfbfb', .52], ['#6f7379', .7], ['#d4d7db', .86], ['#4b4e52', 1]].forEach(([c, s]) => g.addColorStop(s, c));
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }
    return cv;
  };
  let pi = 0;
  const paint = (p) => {
    const top = $('#pairTop');
    top.className = `pair__top tex--${p.tex}`;
    top.style.setProperty('--a', p.top);
    top.style.setProperty('--n', p.n);
    $('#pairBot').style.setProperty('--nb', p.nb);
    $('#pairA').textContent = p.a; $('#pairHex').textContent = p.hex; $('#pairB').textContent = p.b;
    $('#pairNote').textContent = p.note;
    $('#pairN').textContent = `${P.pad(pi + 1)} / ${P.pad(PAIRS.length)}`;
    pattern(pc, p.pat);
  };
  paint(PAIRS[0]);
  let busy = false;
  const go = (dir) => {
    if (busy) return;
    pi = (pi + dir + PAIRS.length) % PAIRS.length;
    if (!M) { paint(PAIRS[pi]); return; }
    busy = true;
    gsap.timeline({ onComplete: () => (busy = false) })
      .to('#pairTop', { clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', duration: .45, ease: 'power3.in' }, 0)
      .to('#pairBot', { clipPath: dir > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)', duration: .45, ease: 'power3.in' }, .05)
      .add(() => paint(PAIRS[pi]))
      .fromTo('#pairTop', { clipPath: dir > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0% 0 0%)', duration: .6, ease: 'expo.out' })
      .fromTo('#pairBot', { clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0%)', duration: .6, ease: 'expo.out' }, '<.06')
      .add(() => { P.scramble($('#pairA'), PAIRS[pi].a, .6); P.scramble($('#pairB'), PAIRS[pi].b, .6); }, '<');
  };
  $('#pairNext')?.addEventListener('click', () => go(1));
  $('#pairPrev')?.addEventListener('click', () => go(-1));
  $('#pairCard')?.addEventListener('click', () => go(1));
  if (M) {
    gsap.from('.pair__card', { y: 90, rotationX: 25, opacity: 0, transformPerspective: 1200, duration: .8, ease: 'expo.out', scrollTrigger: { trigger: '.pair', start: 'top 70%', once: true } });
    gsap.fromTo('.pair__bg', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.pair', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ================= 05 · HOW TO POP OFF + the scratch card ================= */
  if (M) {
    gsap.timeline({ scrollTrigger: { trigger: '.claws', start: 'top 72%', once: true } })
      .from('.claws__title .ln', { yPercent: 110, duration: .6, stagger: .08, ease: 'expo.out' }, 0)
      .from('.claws__steps li', { x: 40, opacity: 0, duration: .5, stagger: .06, ease: 'power3.out' }, .15)
      .from('.scratch', { y: 40, rotation: -4, opacity: 0, duration: .6, ease: 'back.out(1.8)' }, .3)
      .from('.claws__photo .slot', { clipPath: 'inset(100% 0 0 0)', duration: .8, ease: 'expo.out' }, 0);
    gsap.fromTo('.claws__photo .slot', { backgroundPosition: '50% 0%' }, { backgroundPosition: '50% 100%', ease: 'none', scrollTrigger: { trigger: '.claws', start: 'top bottom', end: 'bottom top', scrub: true } });
  }
  const sc = $('#scratch'), cv = $('#scratchCv');
  if (sc && cv) {
    let ctx, w, h, d, moves = 0, done = false, last = null;
    const cover = () => {
      P.leopard(cv, 'warm', 41);
      d = P.dpr(); w = cv.width; h = cv.height;
      ctx = cv.getContext('2d', { willReadFrequently: true });
      ctx.filter = 'none'; ctx.globalAlpha = 1; ctx.strokeStyle = '#000'; // the leopard painter leaves its blur and a 12% stroke on, and the claws must cut clean
      ctx.fillStyle = 'rgba(49,1,1,.18)'; ctx.fillRect(0, 0, w, h);
      if (done) ctx.clearRect(0, 0, w, h);
    };
    cover();
    // three parallel claws, perpendicular to the direction you scratch in
    const claw = (x0, y0, x1, y1) => {
      const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len, gap = 22 * d;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      [-1, 0, 1].forEach((k) => {
        ctx.lineWidth = (k ? 12 : 16) * d;
        ctx.beginPath(); ctx.moveTo(x0 + nx * gap * k, y0 + ny * gap * k); ctx.lineTo(x1 + nx * gap * k, y1 + ny * gap * k); ctx.stroke();
      });
      ctx.globalCompositeOperation = 'source-over';
    };
    const cleared = () => {
      const data = ctx.getImageData(0, 0, w, h).data;
      let c = 0, t = 0;
      for (let i = 3; i < data.length; i += 4 * 24) { t++; if (data[i] < 20) c++; }
      return c / t;
    };
    const finish = () => {
      if (done) return; done = true;
      sc.classList.add('is-done');
      P.rip(getComputedStyle(document.documentElement).getPropertyValue('--cherry'));
      try { navigator.clipboard?.writeText('CLAWSOUT'); } catch (e) {}
      P.store.set('scratched', '1');
      P.toast('CLAWSOUT is yours. 10% off your first set, already copied. good kitty.', 4200);
    };
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * d, (e.clientY - r.top) * d]; };
    cv.addEventListener('pointerdown', (e) => { last = pos(e); last.t = 0; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', (e) => {
      if (!last || done) return;
      const p = pos(e);
      if (Math.hypot(p[0] - last[0], p[1] - last[1]) < 3 * d) return;
      claw(last[0], last[1], p[0], p[1]); last = [...p, 1];
      sc.classList.add('is-scratched');
      if (++moves % 12 === 0 && cleared() > .42) finish();
    });
    const up = (e) => {
      if (last && !last.t && !done) {
        // a tap is one big swipe, so it works with a thumb too
        const [x, y] = last;
        claw(x + 40 * d, y - 60 * d, x - 40 * d, y + 60 * d);
        sc.classList.add('is-scratched');
        if (cleared() > .42) finish();
      }
      last = null;
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', () => (last = null));
    addEventListener('resize', () => { if (!done) cover(); });
  }

  /* ================= 06 · WORN BY THE COVEN ================= */
  if (M) {
    gsap.timeline({ scrollTrigger: { trigger: '.worn', start: 'top 70%', end: 'top top', scrub: true } })
      .fromTo('.worn__stripes > i', { scaleY: 0 }, { scaleY: 1, stagger: .12, ease: 'none' }, 0)
      .fromTo('.worn__mast', { letterSpacing: '1.2em', opacity: 0 }, { letterSpacing: '.32em', opacity: 1, ease: 'none' }, 0);
    gsap.timeline({ scrollTrigger: { trigger: '.worn__copy', start: 'top 70%', once: true } })
      .from('.worn__big', { y: 30, opacity: 0, duration: .6, ease: 'expo.out' }, 0)
      .from('.worn__rule', { scaleY: 0, duration: .6, ease: 'expo.out' }, .15)
      .from('.worn__feel', { opacity: 0, scale: .5, rotation: -14, duration: .65, ease: 'back.out(2)' }, .35)
      .from('.worn__small', { opacity: 0, duration: .5 }, .5);
    $$('.worn__ph').forEach((ph) => {
      const dep = +ph.dataset.depth || 1;
      gsap.fromTo(ph, { y: 140 * dep }, { y: -140 * dep, ease: 'none', scrollTrigger: { trigger: '.worn__field', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.from('.worn__w, .worn__and', { opacity: 0, scale: .6, duration: .55, stagger: .08, ease: 'back.out(2)', scrollTrigger: { trigger: '.worn__field', start: 'top 70%', once: true } });
    if (P.fine) {
      const field = $('#wornField');
      const movers = $$('.worn__ph').map((ph) => ({ dep: +ph.dataset.depth || 1, x: gsap.quickTo(ph, 'xPercent', { duration: 1.2, ease: 'power3.out' }), y: gsap.quickTo(ph, 'yPercent', { duration: 1.2, ease: 'power3.out' }) }));
      field.addEventListener('pointermove', (e) => {
        const r = field.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width - .5, my = (e.clientY - r.top) / r.height - .5;
        movers.forEach((m) => { m.x(mx * -10 * m.dep); m.y(my * -10 * m.dep); });
      });
    }
  }
  // the coven grows while you watch
  const cn = $('#covenN');
  if (cn) {
    let n = 4812;
    const show = () => (cn.textContent = n.toLocaleString('en-US'));
    if (M) {
      const o = { v: 0 };
      ScrollTrigger.create({ trigger: cn, start: 'top 90%', once: true, onEnter: () => gsap.to(o, { v: n, duration: 2, ease: 'power3.out', onUpdate: () => (cn.textContent = Math.round(o.v).toLocaleString('en-US')) }) });
    }
    setInterval(() => { if (Math.random() > .5) { n++; show(); } }, 4000);
  }

  /* ================= the pink guidelines sheet ================= */
  if (M) {
    gsap.timeline({ scrollTrigger: { trigger: '.rules', start: 'top 72%', once: true } })
      .from('.rules__spec, .rules__rows > div', { y: 30, opacity: 0, duration: .5, stagger: .07, ease: 'power3.out' }, 0)
      .from('.rules__ghost', { opacity: 0, x: 60, duration: .8, ease: 'expo.out' }, .3);
  }

  /* ================= VELVET — the name over the table, the tins tumble in ================= */
  if (M) {
    gsap.timeline({ scrollTrigger: { trigger: '.velvet', start: 'top 70%', once: true } })
      .from('.velvet__script', { opacity: 0, scale: .8, duration: .8, ease: 'back.out(1.6)' }, 0)
      .from('.velvet__txt, .velvet__sub', { opacity: 0, y: 20, duration: .5, stagger: .1 }, .2);
    gsap.fromTo('.velvet__hero .slot', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.velvet__hero', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.velvet__tex .slot', { clipPath: 'inset(100% 0 0 0)', duration: .7, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: '.velvet__tex', start: 'top 85%', once: true } });
    gsap.from('.tin', { y: (i) => -500 - i * 80, rotation: (i) => `+=${[-50, 70, -30, 60, -80, 40][i]}`, opacity: 0, stagger: .06, ease: 'power2.out', scrollTrigger: { trigger: '#tins', start: 'top 95%', end: 'top 25%', scrub: true } });
  }

  /* ================= 07 · THE BOX ================= */
  P.leopards($('#box'));
  if (M) {
    const from = [[-60, -80, -30], [70, -90, 25], [-80, 30, -18], [80, 40, 22], [-30, 110, -40], [40, 140, 30]];
    gsap.timeline({ scrollTrigger: { trigger: '.box__lay', start: 'top 90%', end: 'top 30%', scrub: true } })
      .from('.bx', { xPercent: (i) => from[i][0] * 3, yPercent: (i) => from[i][1] * 3, rotation: (i) => `+=${from[i][2]}`, opacity: 0, stagger: .08, ease: 'power2.out' }, 0);
    gsap.from('.box__list li', { y: 20, opacity: 0, stagger: .04, duration: .45, ease: 'power3.out', scrollTrigger: { trigger: '.box__list', start: 'top 92%', once: true } });
    gsap.from('.box__title > *', { yPercent: 60, opacity: 0, scale: .7, stagger: .08, duration: .6, ease: 'back.out(2)', scrollTrigger: { trigger: '.box', start: 'top 75%', once: true } });
  }

  /* ================= 08 · REFER A FRIEND ================= */
  P.leopards($('#refer'));
  const card = $('#card');
  const qr = (str) => {
    const c = $('#cardQr'); if (!c) return;
    const ctx = c.getContext('2d'), N = 25;
    let hsh = 0; [...str].forEach((ch) => (hsh = (hsh * 31 + ch.charCodeAt(0)) | 0));
    const r = P.seeded(hsh);
    ctx.clearRect(0, 0, N, N); ctx.fillStyle = '#5a0d12';
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (r() > .52) ctx.fillRect(x, y, 1, 1);
    [[0, 0], [N - 7, 0], [0, N - 7]].forEach(([x, y]) => {
      ctx.clearRect(x, y, 8, 8); ctx.fillRect(x, y, 7, 7);
      ctx.clearRect(x + 1, y + 1, 5, 5); ctx.fillRect(x + 2, y + 2, 3, 3);
    });
  };
  qr('popoff');
  const flip = () => card.classList.toggle('is-flipped');
  $('.card__face--front')?.addEventListener('click', flip);
  $('#cardFlip')?.addEventListener('click', flip);
  $('#referForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.currentTarget, to = f.to.value.trim(), by = f.by.value.trim();
    if (!to || !by) { P.toast('two names, kitten. who are you sending the claws to, and who are you?'); return; }
    const code = `POPOFF-${by.split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8) || 'KITTEN'}-10`;
    qr(code);
    P.store.set('refer', JSON.stringify({ to, by, code }));
    P.rip();
    P.toast(`sent. ${to} gets €10 off with ${code}, and so do you, ${by}. claws out.`, 4600);
  });
  try { const saved = JSON.parse(P.store.get('refer') || 'null'); if (saved) { $('#referForm').by.value = saved.by; qr(saved.code); } } catch (e) {}
  if (M) {
    gsap.from('.card', { y: -120, rotation: -14, opacity: 0, duration: .8, ease: 'back.out(1.8)', clearProps: 'transform', scrollTrigger: { trigger: '.refer', start: 'top 70%', once: true } });
    gsap.fromTo('.refer__bg', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.refer', start: 'top bottom', end: 'bottom top', scrub: true } });
    if (P.fine) {
      const st = $('.refer__stage');
      const rx = gsap.quickTo(st, 'rotationX', { duration: .8, ease: 'power3.out' }), ry = gsap.quickTo(st, 'rotationY', { duration: .8, ease: 'power3.out' });
      $('.refer').addEventListener('pointermove', (e) => { ry((e.clientX / innerWidth - .5) * 18); rx((e.clientY / innerHeight - .5) * -14); });
      $('.refer').addEventListener('pointerleave', () => { rx(0); ry(0); });
    }
  }

  // fonts change sizes: tell the triggers
  document.fonts?.ready.then(() => { if (P.hasGsap) ScrollTrigger.refresh(); });
})();
