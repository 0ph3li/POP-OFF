/* =========================================================
   POP OFF — main.js (shared engine, every page)
   a press-on nail house. claws, made to come off.
   concept, design & code by ghostly.grl ♥
   ========================================================= */
(() => {
  const P = (window.PO = {});
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  P.$ = $; P.$$ = $$;
  P.page = document.body.dataset.page || 'home';
  P.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  P.fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  P.hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  P.motion = P.hasGsap && !P.reduced;
  document.documentElement.classList.toggle('motion', P.motion);
  P.rand = (a, b) => a + Math.random() * (b - a);
  P.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  P.pad = (n, l = 2) => String(Math.max(0, Math.floor(n))).padStart(l, '0');
  P.clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  P.dpr = () => Math.min(2, devicePixelRatio || 1);
  // seeded random, so a leopard keeps her spots between redraws
  P.seeded = (seed = 7) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

  // storage that never throws
  P.store = {
    get(k) { try { return localStorage.getItem('po-' + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('po-' + k, v); } catch (e) {} },
  };

  if (P.hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* the loader always opens at the top: a reload mid-page would fire every 'once' trigger at birth */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ---------- smooth scroll ---------- */
  if (window.Lenis && !P.reduced) {
    P.lenis = new Lenis({ lerp: .1, smoothWheel: true });
    if (P.hasGsap) {
      P.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => P.lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { P.lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  P.scrollTo = (target) => {
    const el = typeof target === 'string' ? $(target) : target;
    if (P.lenis) P.lenis.scrollTo(el ?? 0, { duration: 1.6 });
    else (el || document.body).scrollIntoView({ behavior: 'smooth' });
  };

  /* ---------- toast: a little pink card, signed ---------- */
  const toastEl = $('#toast');
  let toastT;
  P.toast = (msg, ms = 3400) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.remove('is-on'); void toastEl.offsetWidth;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('is-on'), ms);
  };
  document.addEventListener('click', (e) => { const t = e.target.closest('[data-toast]'); if (t) { e.preventDefault(); P.toast(t.dataset.toast); } });

  /* ---------- image slots: drop a file at data-img and it shows up ---------- */
  // tries .jpg/.png/.webp/… on its own, so the extension never matters
  P.exts = ['jpg', 'png', 'webp', 'jpeg', 'avif'];
  P.slot = (slot) => {
    if (slot.dataset.label && !$('.slot-label', slot)) {
      const [file, ...rest] = slot.dataset.label.split(' · ');
      const lab = document.createElement('span');
      lab.className = 'slot-label';
      lab.innerHTML = `${file}<small>${rest.join(' · ')}</small>`;
      slot.append(lab);
    }
    const src = slot.dataset.img; if (!src || slot.dataset.loaded === src) return;
    slot.dataset.loaded = src;
    const base = src.replace(/\.[a-z0-9]+$/i, '');
    const own = (src.match(/\.([a-z0-9]+)$/i) || [])[1];
    const tries = [own, ...P.exts.filter((x) => x !== own)].filter(Boolean).map((x) => `${base}.${x}`);
    const attempt = (i) => {
      if (i >= tries.length) return;
      const img = new Image();
      img.decoding = 'async'; img.draggable = false;
      img.alt = slot.dataset.alt || '';
      if (slot.dataset.pos) img.style.objectPosition = slot.dataset.pos;
      img.onload = () => {
        if (slot.dataset.img !== src) return;
        $(':scope > img', slot)?.remove();
        slot.prepend(img);
        slot.classList.add('has-img');
        slot.dispatchEvent(new CustomEvent('slot:loaded', { bubbles: true, detail: { img } }));
      };
      img.onerror = () => attempt(i + 1);
      img.src = tries[i];
    };
    attempt(0);
  };
  P.slots = (root = document) => $$('.slot', root).forEach(P.slot);
  P.slots();
  P.missing = () => console.table([...new Set($$('.slot:not(.has-img)').map((s) => s.dataset.img))].map((f) => ({ put_your_photo_here: f })));

  /* ---------- text helpers ---------- */
  P.split = (el) => {
    if (el._split) return el._split;
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.textContent = '';
    el._split = [...text].map((p) => {
      if (p === ' ') { el.append(' '); return null; }
      const s = document.createElement('span');
      s.className = 'c'; s.setAttribute('aria-hidden', 'true'); s.textContent = p;
      el.append(s);
      return s;
    }).filter(Boolean);
    return el._split;
  };

  // scramble: letters shuffle like a nail rack, then settle
  const GLYPHS = 'popOFF✦*+·°♥#';
  P.scramble = (el, text = el.dataset.text || el.textContent, dur = .9) => {
    if (!el.dataset.text) el.dataset.text = el.textContent;
    if (!P.motion) { el.textContent = text; return; }
    const keepHTML = el.innerHTML;
    const hasMarkup = el.children.length && text === el.dataset.text;
    const o = { p: 0 };
    gsap.to(o, {
      p: 1, duration: dur, ease: 'none',
      onUpdate: () => {
        const n = Math.floor(o.p * text.length);
        el.textContent = text.slice(0, n) + [...text.slice(n)].map((c) => (c === ' ' || c === '\n' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join('');
      },
      onComplete: () => { if (hasMarkup) el.innerHTML = keepHTML; else el.textContent = text; },
    });
  };
  if (P.motion) {
    $$('[data-scramble]').forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => P.scramble(el) });
    });
  }

  /* ---------- leopard: painted on a canvas, spot by spot ---------- */
  // warm = classic leopard · cool = snow leopard · fur = the skin goddess card · ink = watercolour, the désire bag
  const LEO = {
    warm: { base: ['#d9ae6c', '#b98443'], ring: '#1d120b', core: '#8f5a2c', fur: 'rgba(60,30,10,.12)', s: 64 },
    cool: { base: ['#d4cec6', '#a7a199'], ring: '#262220', core: '#7d766e', fur: 'rgba(30,30,30,.12)', s: 54 },
    fur:  { base: ['#f4e6d3', '#e3cfb6'], ring: '#5e3d27', core: '#c7a585', fur: 'rgba(120,80,50,.14)', s: 78, blur: 6, swirl: 1 },
    ink:  { base: ['#f3f0ea', '#e6e1d9'], ring: '#1e1e1e', core: '#8a857e', fur: 'rgba(0,0,0,.04)', s: 70, blur: 4 },
  };
  P.leopard = (cv, kind = 'warm', seed = 11) => {
    const o = LEO[kind] || LEO.warm, d = P.dpr();
    const w = (cv.width = Math.max(2, Math.round(cv.clientWidth * d)));
    const h = (cv.height = Math.max(2, Math.round(cv.clientHeight * d)));
    const ctx = cv.getContext('2d'), r = P.seeded(seed);
    const g = ctx.createRadialGradient(w * .5, h * .45, 0, w * .5, h * .5, Math.max(w, h) * .75);
    g.addColorStop(0, o.base[0]); g.addColorStop(1, o.base[1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const s = o.s * d * (w < 300 * d ? .55 : 1);
    if (o.blur) ctx.filter = `blur(${o.blur * d * (w < 300 * d ? .5 : 1)}px)`;
    for (let y = -s; y < h + s; y += s * .86) {
      for (let x = -s; x < w + s; x += s) {
        let cx = x + (r() - .5) * s * .7 + ((y / s) % 2 ? s * .5 : 0), cy = y + (r() - .5) * s * .5;
        if (o.swirl) { const a = Math.atan2(cy - h / 2, cx - w / 2), dd = Math.hypot(cx - w / 2, cy - h / 2); cx = w / 2 + Math.cos(a + .25) * dd * 1.05; cy = h / 2 + Math.sin(a + .25) * dd * .9; }
        const rad = s * (.3 + r() * .14);
        // the core, lighter, a little lumpy
        ctx.fillStyle = o.core; ctx.globalAlpha = .7;
        ctx.beginPath(); ctx.ellipse(cx, cy, rad * .85, rad * .66, r() * 3, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx + rad * .2, cy - rad * .1, rad * .6, rad * .5, r() * 3, 0, 7); ctx.fill();
        // the rosette: broken, fat, uneven blobs around it
        ctx.fillStyle = o.ring; ctx.globalAlpha = .94;
        const n = 3 + Math.floor(r() * 3), start = r() * 6.28;
        for (let i = 0; i < n; i++) {
          const a = start + (i / n) * 6.28 + (r() - .5) * .5, bx = cx + Math.cos(a) * rad, by = cy + Math.sin(a) * rad * .82;
          const L = rad * (.42 + r() * .3), T = rad * (.24 + r() * .14);
          ctx.beginPath(); ctx.ellipse(bx, by, L, T, a + 1.57 + (r() - .5) * .4, 0, 7); ctx.fill();
          ctx.beginPath(); ctx.ellipse(bx + Math.cos(a) * T * .3, by + Math.sin(a) * T * .3, L * .6, T * .9, a + 1.2, 0, 7); ctx.fill();
        }
        // loose solid spots in between
        for (let k = 0; k < 2; k++) if (r() > .45) { ctx.beginPath(); ctx.ellipse(cx + (r() - .2) * s * .9, cy + (r() - .2) * s * .7, rad * (.14 + r() * .14), rad * (.12 + r() * .1), r() * 3, 0, 7); ctx.fill(); }
      }
    }
    ctx.filter = 'none'; ctx.globalAlpha = 1;
    // fur: thousands of tiny strokes
    ctx.strokeStyle = o.fur; ctx.lineWidth = d * .8;
    for (let i = 0; i < (w * h) / (60 * d * d); i++) {
      const x = r() * w, y = r() * h, a = (o.swirl ? Math.atan2(y - h / 2, x - w / 2) + 1.4 : 1.1) + (r() - .5) * .6, l = (3 + r() * 6) * d;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke();
    }
    return cv;
  };
  P.leopards = (root = document) => $$('canvas[data-leo]', root).forEach((cv, i) => P.leopard(cv, cv.dataset.leo, 11 + i * 7));

  /* ---------- the rip: three claw marks across the whole screen ---------- */
  P.rip = (color) => {
    const svg = $('#rip'); if (!svg) return;
    const paths = $$('path', svg);
    const x0 = P.rand(55, 95), tilt = P.rand(30, 48);
    paths.forEach((p, i) => {
      const xs = x0 + i * 9 - 13, xe = xs - tilt, w = i === 0 || i === 3 ? .9 : 1.6;
      p.setAttribute('d', `M${xs} -6 Q${(xs + xe) / 2 - w} 50 ${xe} 106 Q${(xs + xe) / 2 + w} 50 ${xs} -6Z`);
      p.style.fill = color || '';
    });
    if (!P.hasGsap) return;
    gsap.killTweensOf(paths);
    gsap.timeline()
      .set(paths, { opacity: 1, scale: 0, transformOrigin: '100% 0%' })
      .to(paths, { scale: 1, duration: .32, stagger: .05, ease: 'power4.out' })
      .to(paths, { opacity: 0, duration: .8, stagger: .05, ease: 'power2.in' }, '+=.5');
  };

  /* ---------- cursor: a little almond tip ---------- */
  const cur = $('#cursor');
  if (cur && P.fine && P.hasGsap) {
    document.documentElement.classList.add('has-cursor');
    const label = $('#cursorLabel');
    const xTo = gsap.quickTo(cur, 'x', { duration: .15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cur, 'y', { duration: .15, ease: 'power3.out' });
    addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); cur.classList.add('is-on'); }, { passive: true });
    document.addEventListener('pointerleave', () => cur.classList.remove('is-on'));
    addEventListener('pointerdown', () => cur.classList.add('is-down'));
    addEventListener('pointerup', () => cur.classList.remove('is-down'));
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor], a, button, label');
      const txt = t ? (t.dataset.cursor || '') : '';
      label.textContent = txt;
      cur.classList.toggle('has-label', !!txt);
      cur.classList.toggle('is-hover', !!t);
    });
  }

  /* ---------- magnetic buttons ---------- */
  P.mag = (root = document) => {
    if (!P.fine || !P.hasGsap) return;
    $$('[data-mag]', root).forEach((b) => {
      if (b._mag) return; b._mag = 1;
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .35, y: (e.clientY - r.top - r.height / 2) * .35, duration: .5, ease: 'power3.out' });
      });
      b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, .3)' }));
    });
  };
  P.mag();

  /* ---------- the bag: what you're taking home. items live in po-bag-items, bag.html shows them ---------- */
  const bagN = $('#bagN'), bagBtn = $('#bagBtn');
  P.bag = {
    items: (() => { try { return JSON.parse(P.store.get('bag-items') || '[]'); } catch (e) { return []; } })(),
    get n() { return this.items.reduce((a, it) => a + it.q, 0); },
    save() {
      P.store.set('bag-items', JSON.stringify(this.items)); this.paint();
      document.dispatchEvent(new CustomEvent('bag:change'));
    },
    paint() { if (bagN) bagN.textContent = this.n; },
    // item = { id, name, price, shape?, len?, kit? }
    add(item, q = 1) {
      const it = this.items.find((x) => x.id === item.id);
      if (it) it.q = Math.min(5, it.q + q); else this.items.push({ ...item, q });
      this.save();
      bagBtn?.classList.remove('is-bump'); void bagBtn?.offsetWidth; bagBtn?.classList.add('is-bump');
    },
    setQ(id, q) {
      const it = this.items.find((x) => x.id === id); if (!it) return;
      if (q <= 0) this.items = this.items.filter((x) => x !== it); else it.q = Math.min(5, q);
      this.save();
    },
    clear() { this.items = []; this.save(); },
  };
  P.bag.paint();
  bagBtn?.addEventListener('click', () => { if (document.body.dataset.page !== 'bag') location.href = 'bag.html'; });
  // a tip flies from a button into the bag
  P.fly = (from) => {
    if (!P.hasGsap || !bagBtn || !from) return;
    const a = from.getBoundingClientRect(), b = bagBtn.getBoundingClientRect();
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    t.innerHTML = '<use href="#tip"/>';
    t.style.cssText = `position:fixed;z-index:120;left:${a.left + a.width / 2 - 10}px;top:${a.top}px;width:20px;height:40px;fill:${getComputedStyle(document.documentElement).getPropertyValue('--cherry')};pointer-events:none`;
    document.body.append(t);
    gsap.timeline({ onComplete: () => t.remove() })
      .to(t, { x: b.left - a.left - a.width / 2 + b.width / 2, duration: .9, ease: 'power1.inOut' }, 0)
      .to(t, { y: b.top - a.top - 10, duration: .9, ease: 'back.in(1.6)' }, 0)
      .to(t, { rotation: 400, scale: .4, duration: .9, ease: 'power2.in' }, 0);
  };

  /* ---------- milano time ---------- */
  P.milano = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
  const tick = () => {
    const d = P.milano();
    $$('[data-clock]').forEach((c) => (c.textContent = `milano ${P.pad(d.getHours())}:${P.pad(d.getMinutes())}`));
  };
  tick(); setInterval(tick, 10000);
  // new drops every friday at 21:00, milano time
  P.nextDrop = (d = P.milano()) => {
    const n = new Date(d); n.setHours(21, 0, 0, 0);
    n.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7));
    if (n <= d) n.setDate(n.getDate() + 7);
    return n;
  };

  /* ---------- header hides on the way down ---------- */
  const hdr = $('#hdr');
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    hdr?.classList.toggle('is-hidden', y > lastY && y > innerHeight * .6);
    lastY = y;
  }, { passive: true });

  /* ---------- links: jumps + pages still drying ---------- */
  const SOON = {
    'sets.html': 'the sets are still drying. top coat needs ten more minutes.',
    'shapes.html': 'almond, coffin, stiletto, square. the page is being filed into shape.',
    'sizing.html': 'the sizing kit is on its way. until then: measure your nail beds, not your exes.',
    'coven.html': 'the coven meets soon. bring your claws.',
  };
  document.addEventListener('click', (e) => {
    const soon = e.target.closest('[data-soon]');
    if (soon) { e.preventDefault(); P.toast(SOON[soon.getAttribute('href')] || 'still drying. soon.'); return; }
    const jump = e.target.closest('[data-jump]');
    if (jump) { e.preventDefault(); P.scrollTo(jump.getAttribute('href')); }
  });

  /* ---------- tiny stars: a word written in five-point stars, like the cinnamon ad ---------- */
  // samples the inside of the letters on an offscreen canvas and puts a star on some of the dots
  P.starText = (cv, text, { font = 'Great Vibes', colors = ['#c98f78', '#e9cbbd', '#a8644f', '#f6e7de'], size = .5, seed = 3 } = {}) => {
    const d = P.dpr(), w = (cv.width = Math.round(cv.clientWidth * d)), h = (cv.height = Math.round(cv.clientHeight * d));
    const fs = Math.min(w / (text.length * .5), h * size * 1.15);
    const off = document.createElement('canvas'); off.width = w; off.height = h;
    const o = off.getContext('2d');
    o.font = `${fs}px "${font}"`; o.textAlign = 'center'; o.textBaseline = 'middle';
    o.fillText(text, w / 2, h / 2);
    const data = o.getImageData(0, 0, w, h).data, r = P.seeded(seed), step = Math.max(4, Math.round(fs / 46)), pts = [];
    for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) {
      const jx = Math.round(x + (r() - .5) * step), jy = Math.round(y + (r() - .5) * step);
      if (jx < 0 || jy < 0 || jx >= w || jy >= h) continue;
      const A = (xx, yy) => (xx < 0 || yy < 0 || xx >= w || yy >= h ? 0 : data[(yy * w + xx) * 4 + 3]);
      const e = Math.max(2, step * .6);
      // only on the edge of the letters, so the stars draw an outline like the ad
      if (A(jx, jy) > 140 && (A(jx - e, jy) < 140 || A(jx + e, jy) < 140 || A(jx, jy - e) < 140 || A(jx, jy + e) < 140)) pts.push({ x: jx, y: jy, s: step * (.5 + r() * .45), a: r() * 6.28, c: colors[Math.floor(r() * colors.length)], t: (jx / w) * .85 + r() * .15 });
    }
    // a few loose stars scattered around, like confetti
    for (let i = 0; i < 14; i++) pts.push({ x: r() * w, y: r() * h, s: step * (.8 + r() * 1.6), a: r() * 6.28, c: colors[Math.floor(r() * colors.length)], t: r() });
    const ctx = cv.getContext('2d');
    const star = (p, k) => {
      const s = p.s * k; if (s <= 0) return;
      ctx.fillStyle = p.c; ctx.beginPath();
      for (let i = 0; i < 10; i++) { const rr = i % 2 ? s * .42 : s; ctx.lineTo(p.x + Math.cos(p.a + i * .6283) * rr, p.y + Math.sin(p.a + i * .6283) * rr); }
      ctx.closePath(); ctx.fill();
    };
    // draw(p): 0 → nothing, 1 → every star in place; stars pop in left to right, like handwriting
    const draw = (prog) => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => { const k = P.clamp((prog * 1.15 - p.t) / .15, 0, 1); star(p, k < 1 ? k * (1.4 - .4 * k) : 1); });
    };
    draw(0);
    return { draw, count: pts.length };
  };

  /* ---------- loader: 'pop off' written in tiny stars on paper and over the lips, then the two halves part ---------- */
  P.ready = new Promise((resolve) => {
    const loader = $('#loader');
    const done = () => { document.body.classList.remove('is-loading'); loader?.remove(); resolve(); };
    if (!loader || !P.motion) { done(); return; }
    const go = () => {
      const a = P.starText($('#ldStars'), 'Pop off', { seed: 3 });
      const b = P.starText($('#ldStars2'), 'Pop off', { colors: ['#fff', '#fff', '#fbeee8'], seed: 3 });
      const o = { p: 0 };
      gsap.timeline({ onComplete: done })
        .to(o, { p: 1, duration: 1.3, ease: 'power1.inOut', onUpdate: () => { a.draw(o.p); b.draw(o.p); } }, 0)
        .from('.ld-photo .slot', { scale: 1.15, duration: 2, ease: 'power2.out' }, 0)
        .from('.ld-k, .ld-brand', { opacity: 0, duration: .5 }, .1)
        .to('.ld-paper', { yPercent: -100, duration: .7, ease: 'expo.inOut' }, 1.6)
        .to('.ld-photo', { yPercent: 100, duration: .7, ease: 'expo.inOut' }, 1.6);
    };
    // wait for the script font, so the stars trace the right letters (but never longer than a second)
    Promise.race([document.fonts?.load('100px "Great Vibes"') || Promise.resolve(), new Promise((r) => setTimeout(r, 1000))]).then(go);
  });

  /* ---------- tab title ---------- */
  const baseTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) document.title = 'come back, kitten. your nails are drying.';
    else {
      document.title = 'claws retracted ♥';
      setTimeout(() => (document.title = baseTitle), 2400);
    }
  });

  /* ---------- easter eggs ---------- */
  // konami: claws out. the whole page gets scratched
  const KONAMI = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a';
  P.claws = () => {
    P.rip();
    setTimeout(() => P.rip(getComputedStyle(document.documentElement).getPropertyValue('--pink')), 420);
    P.toast('claws out. you scratched the whole website. we love that for you.', 4000);
  };
  let keys = [], typed = '';
  addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    keys = [...keys, e.key].slice(-10);
    if (keys.join(',') === KONAMI) P.claws();
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-12);
    const hit = (w) => typed.endsWith(w);
    if (hit('bite')) P.toast('don\'t. that\'s literally why we exist.');
    if (hit('acrylic')) P.toast('two hours in a chair and a drill. or ten minutes on your couch. your call, babe.');
    if (hit('salon')) P.toast('the salon is wherever you are. the taxi counts.');
    if (hit('glue')) P.toast('the good one. it holds for two weeks and lets go when you ask nicely.');
    if (hit('ghostly')) P.toast('concept, design & code by ghostly.grl ♥');
    if (hit('meow')) { P.rip(); P.toast('/ᐠ｡ꞈ｡ᐟ\\  hiss. sorry. she was in a mood.', 3800); }
  });

  /* ---------- footer, every page: friday countdown + the coven list ---------- */
  const dw = $('#dropWhen');
  if (dw) {
    const n = P.nextDrop(), days = Math.round((n - P.milano()) / 864e5);
    dw.textContent = `friday · 21:00 · ${days < 1 ? 'tonight' : `in ${days} day${days > 1 ? 's' : ''}`}`;
  }
  $('#newsForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    P.store.set('news', '1');
    P.toast('you\'re in the coven. friday 21:00, check your inbox before your nails dry.');
    e.currentTarget.reset();
  });
  if (P.motion) {
    gsap.from('.ft__tile', { y: 60, opacity: 0, rotation: (i) => [-3, 2, -1, 3, -2, 1][i], duration: .7, stagger: .06, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.ft', start: 'top 80%', once: true } });
    gsap.from('.ft__tile--lines span', { opacity: 0, x: -24, duration: .45, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: '.ft', start: 'top 70%', once: true } });
  }

  /* ---------- console ---------- */
  const css = 'font-family:monospace;color:#f5cfdc;background:#310101;padding:6px 10px;line-height:1.4';
  console.log(`%c
   *    /\\_/\\      ✦
       ( o.o )   <3  ghostly.grl
   ✦    > ^ <   💅     *

  POP OFF — claws, made to come off.
  type popoff.help() for the nail bar notes`, css);
  P.help = () => {
    console.log('%cpopoff.missing()  — which photos are still missing\npopoff.claws()    — konami code: claws out\npopoff.rip()      — one scratch\npopoff.toast(msg) — a little pink card\ntype "bite", "acrylic", "salon", "glue", "meow"', 'font-family:monospace;color:#310101;background:#f5cfdc;padding:8px');
    return '♥';
  };
  window.popoff = P;
})();
