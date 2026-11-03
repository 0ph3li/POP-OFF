/* =========================================================
   POP OFF — bag.js (your bag)
   concept, design & code by ghostly.grl ♥
   ========================================================= */
(() => {
  const P = window.PO, { $, $$ } = P;
  const M = P.motion;

  /* the sets you can start from when the bag is empty (same data as js/sets.js) */
  const PICKS = [
    { id: 'cherry-leopard', name: 'Cherry Leopard', price: 40, shape: 'square', len: 'long' },
    { id: 'blush-ballet', name: 'Blush Ballet', price: 34, shape: 'almond', len: 'long' },
    { id: 'chrome-claws', name: 'Chrome Claws', price: 42, shape: 'stiletto', len: 'extra long' },
    { id: 'french-kiss', name: 'French Kiss', price: 30, shape: 'square', len: 'medium' },
    { id: 'milk-spikes', name: 'Milk Spikes', price: 42, shape: 'stiletto', len: 'extra long' },
    { id: 'snow-leopard', name: 'Snow Leopard', price: 38, shape: 'almond', len: 'medium' },
  ];
  /* the codes the site hands out: the scratch card on the home, the referral card */
  const CODES = {
    CLAWSOUT: { label: 'clawsout · 10% off', off: (sub) => Math.round(sub * 0.1) },
  };
  const referCode = () => { try { return JSON.parse(P.store.get('refer') || 'null')?.code || ''; } catch (e) { return ''; } };
  const codeOf = (raw) => {
    const c = raw.trim().toUpperCase();
    if (CODES[c]) return CODES[c];
    if (/^POPOFF-[A-Z]{1,8}-10$/.test(c)) return { label: `${c.toLowerCase()} · €10 off`, off: () => 10 };
    return null;
  };
  let code = P.store.get('bag-code') || '';
  const coven = !!P.store.get('coven-no');
  const eur = (n) => `€${n}`;

  /* ================= 01 · THE BAG ================= */
  const list = $('#bgList'), empty = $('#bgEmpty'), peek = $('#bgPeek');
  const leo = () => $$('canvas[data-leo]').forEach((cv, i) => P.leopard(cv, cv.dataset.leo, 31 + i * 7));

  const row = (it) => `
    <li class="it" data-id="${it.id}">
      <div class="it__ph">${it.kit ? '<canvas data-leo="ink"></canvas>' : `<div class="slot" data-img="img/SETS/${it.id}.jpg" style="--tone:#c9b5ad"></div>`}</div>
      <div><p class="it__name">${it.name}</p><p class="it__meta">${it.kit ? '12 blank tips · a file · a paper tape' : `${it.shape} · ${it.len} · 24 tips`}</p></div>
      <div class="it__q"><button data-q="-1" aria-label="one less">−</button><b>${it.q}</b><button data-q="1" aria-label="one more">+</button></div>
      <p class="it__price">${eur(it.price * it.q)}</p>
      <button class="it__off" data-off data-cursor="pop it off">pop it off</button>
    </li>`;

  // the tips sticking out of the top of the bag, one fan per set (the kit has no tips)
  const paintPeek = (animate) => {
    const sets = P.bag.items.filter((it) => !it.kit).slice(0, 5);
    peek.innerHTML = sets.map((it, i) => {
      const k = sets.length === 1 ? 0 : i / (sets.length - 1) - .5;
      return `<img src="img/SETS/${it.id}-tips.png" alt="" style="left:${50 + k * 30}%;transform:translateX(-50%) rotate(${k * 26}deg)" />`;
    }).join('');
    if (animate && M) gsap.from($$('img', peek), { yPercent: 70, opacity: 0, duration: .8, stagger: .08, ease: 'back.out(1.6)' });
  };

  const paintBag = (animate = false) => {
    const items = P.bag.items;
    list.innerHTML = items.map(row).join('');
    list.hidden = !items.length;
    empty.hidden = !!items.length;
    $('#bgNo').textContent = items.length ? `${P.bag.n} inside` : 'empty';
    P.slots(list); leo();
    paintPeek(animate);
    paintReceipt();
  };

  list.addEventListener('click', (e) => {
    const li = e.target.closest('.it'); if (!li) return;
    const it = P.bag.items.find((x) => x.id === li.dataset.id);
    const q = e.target.closest('[data-q]');
    if (q) { P.bag.setQ(it.id, it.q + Number(q.dataset.q)); return; }
    if (e.target.closest('[data-off]')) {
      const go = () => { P.bag.setQ(it.id, 0); P.toast(`${it.name.toLowerCase()} popped off. no damage.`); };
      if (M) gsap.to(li, { x: 60, opacity: 0, duration: .35, ease: 'power2.in', onComplete: go }); else go();
    }
  });
  document.addEventListener('bag:change', () => paintBag(false));

  // empty bag: three sets to start with
  const picks = PICKS.sort(() => Math.random() - .5).slice(0, 3);
  $('#bgPicks').innerHTML = picks.map((s) => `
    <button class="pick" data-id="${s.id}" data-cursor="add">
      <div class="slot" data-img="img/SETS/${s.id}.jpg" style="--tone:#c9b5ad"></div>
      <span>${s.name} · ${eur(s.price)}</span><b>+</b>
    </button>`).join('');
  P.slots($('#bgPicks'));
  $('#bgPicks').addEventListener('click', (e) => {
    const b = e.target.closest('.pick'); if (!b) return;
    const s = picks.find((x) => x.id === b.dataset.id);
    P.fly(b); P.bag.add(s); paintPeek(true);
    P.toast(`${s.name.toLowerCase()} is in your bag. 24 tips, all yours. claws out.`);
  });

  /* ================= 02 · THE RECEIPT ================= */
  const rows = $('#rcRows');
  function paintReceipt() {
    const items = P.bag.items;
    const sets = items.filter((it) => !it.kit), kit = items.find((it) => it.kit);
    const sub = items.reduce((a, it) => a + it.price * it.q, 0);
    const lines = [['subtotal', eur(sub)]];
    let minus = 0;
    // the sizing kit: free for the coven, otherwise €6 back on your first set
    if (kit && (coven || sets.length)) {
      const k = Math.min(kit.q, 1) * kit.price;
      lines.push([coven ? 'sizing kit · free for the coven' : 'sizing kit · back on your first set', `−${eur(k)}`, true]); minus += k;
    }
    const c = code && codeOf(code);
    if (c && sub) { const o = Math.min(c.off(sub - minus), sub - minus); lines.push([c.label, `−${eur(o)}`, true]); minus += o; }
    const after = sub - minus;
    const ship = !items.length || after >= 40 ? 0 : 4;
    lines.push(['shipping · free over €40', ship ? eur(ship) : 'free']);
    rows.innerHTML = lines.map(([t, v, m]) => `<div class="${m ? 'is-minus' : ''}"><dt>${t}</dt><dd>${v}</dd></div>`).join('');
    $('#rcTotal').textContent = eur(after + ship);
    $('#rcGo').disabled = !items.length;
    // your sizes, from the size finder
    const sz = P.store.get('sizes');
    $('#rcSizes').innerHTML = sz
      ? `your sizes, thumb to pinky: <b>${sz.split(',').join(' · ')}</b>. we'll pack them on top.`
      : 'no sizes yet. <a href="sizing.html#finder">find them in two minutes</a>, or add the kit.';
  }

  const codeIn = $('#rcCodeIn');
  codeIn.value = code;
  if (!code && referCode()) codeIn.placeholder = referCode();
  $('#rcCode').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = codeIn.value.trim();
    if (!v) { code = ''; P.store.set('bag-code', ''); paintReceipt(); return; }
    const c = codeOf(v);
    if (!c) { P.toast('that code doesn\'t scratch. try CLAWSOUT, it\'s under the card on the home.'); return; }
    code = v.toUpperCase(); codeIn.value = code; P.store.set('bag-code', code); paintReceipt();
    P.toast(`${c.label}. good kitty.`);
  });

  // checkout opens with the drop: friday 21:00 in milano, 20:00 for the coven
  const drop = P.nextDrop(), days = Math.round((drop - P.milano()) / 864e5);
  $('#rcWhen').textContent = `friday ${coven ? '20:00, an hour early for the coven' : '21:00'}${days < 1 ? ' · tonight' : ` · in ${days} day${days > 1 ? 's' : ''}`}`;
  $('#rcGo').addEventListener('click', () => {
    P.toast(`your bag is saved. checkout opens friday at ${coven ? '20:00 (coven hour)' : '21:00'}. we'll keep your claws warm.`, 4200);
    if (P.rip) P.rip();
  });

  /* ================= motion ================= */
  if (M) {
    gsap.timeline({ delay: .1 })
      .from('.bg__bag', { y: 120, rotation: -6, opacity: 0, duration: 1.1, ease: 'expo.out' }, 0)
      .from('.bg__the', { opacity: 0, scale: .5, rotation: -14, duration: .8, ease: 'back.out(1.8)' }, .25)
      .from('.bg__serif', { yPercent: 60, opacity: 0, duration: .7, ease: 'back.out(1.8)' }, .15)
      .from('.bg__k, .bg__list, .bg__empty', { opacity: 0, y: 16, duration: .5, stagger: .06, ease: 'power3.out' }, .45);
    gsap.timeline({ scrollTrigger: { trigger: '.rc', start: 'top 70%', once: true } })
      .from('.rc__fur', { y: -80, rotation: -10, opacity: 0, duration: .9, ease: 'expo.out' }, 0)
      .from('.rc__card', { y: 120, rotation: 6, opacity: 0, duration: 1, ease: 'expo.out' }, .15);
  }

  paintBag(true);
  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(leo, 200); });
  document.fonts?.ready.then(() => { if (P.hasGsap) ScrollTrigger.refresh(); });
})();
