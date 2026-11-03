/* =========================================================
   POP OFF — coven.js (the coven)
   concept, design & code by ghostly.grl ♥
   ========================================================= */
(() => {
  const P = window.PO, { $, $$ } = P;
  const M = P.motion;
  const BASE = 4812; // same count as the coven on the home

  /* ---------- who you are (if you already swore) ---------- */
  let name = P.store.get('coven-name') || '';
  let no = Number(P.store.get('coven-no')) || 0;
  const fmt = (n) => n.toLocaleString('en-US');
  const cvN = $('#cvN'), oathNo = $('#oathNo');
  const paintMember = () => {
    cvN.textContent = fmt(no || BASE);
    oathNo.textContent = no ? `member no. ${fmt(no)} · welcome home, ${name.toLowerCase()}` : 'member no. — · it\'s free, it\'s forever';
  };

  /* ================= 01 · THE CAT ================= */
  if (M) {
    gsap.timeline({ delay: .1 })
      .from('.cv__ph .slot', { scale: 1.12, opacity: 0, duration: 1.4, ease: 'expo.out' }, 0)
      .from('.cv__the', { opacity: 0, scale: .5, rotation: -14, duration: .8, ease: 'back.out(1.8)' }, .3)
      .from('.cv__serif', { yPercent: 60, opacity: 0, duration: .7, ease: 'back.out(1.8)' }, .2)
      .from('.cv__k, .cv__p, .cv__go', { opacity: 0, y: 16, duration: .5, stagger: .06, ease: 'power3.out' }, .5)
      .from('.cv__sig', { opacity: 0, x: -20, duration: .8, ease: 'power3.out' }, .8);
    gsap.to('.cv__ph .slot', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.cv', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ================= 02 · THE FLYERS ================= */
  // the roll: your name five times, shrunk until it fits the flyer
  const roll = $$('.fly__name');
  const paintRoll = () => {
    roll.forEach((el) => { el.textContent = name || 'Kitten'; el.style.fontSize = ''; });
    const el = roll[0], box = el.parentElement.clientWidth - 12;
    let fs = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > box && fs > 14) { fs -= 2; roll.forEach((r) => (r.style.fontSize = `${fs}px`)); }
  };

  // the vote: three sets for the next drop
  const vote = $('#vote'), vbs = $$('button', vote);
  const counts = [412, 389, 266];
  const showVote = (pick) => {
    const c = counts.map((n, i) => n + (i === pick ? 1 : 0)), tot = c.reduce((a, b) => a + b, 0);
    vbs.forEach((b, i) => {
      const p = Math.round((c[i] / tot) * 100);
      $('.vote__p', b).textContent = `${p}%`;
      $('.vote__bar', b).style.width = `${p}%`;
      b.classList.toggle('is-mine', i === pick);
    });
    vote.classList.add('is-done');
  };
  vbs.forEach((b, i) => b.addEventListener('click', () => {
    showVote(i); // not saved: on reload the vote starts blank again
    P.toast(`one vote for ${$('.vote__n', b).textContent.toLowerCase()}. results on friday, 20:00.`);
  }));

  if (M) {
    gsap.from('.fly', { y: 70, opacity: 0, rotation: (i) => (i % 2 ? 2.5 : -2.5), duration: .8, stagger: .07, ease: 'expo.out', scrollTrigger: { trigger: '.fl__grid', start: 'top 80%', once: true } });
    gsap.from('.fly__name', { x: -30, opacity: 0, duration: .6, stagger: .08, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.fly--names', start: 'top 80%', once: true } });
  }

  /* ================= 03 · THE OATH — the name in tiny stars ================= */
  const cvA = $('#oathA'), cvB = $('#oathB'), input = $('#oathName');
  let stA, stB, tw;
  const write = (text, animate = true) => {
    const t = text || 'the coven';
    stA = P.starText(cvA, t, { seed: 7, size: .62 });
    stB = P.starText(cvB, t, { colors: ['#fff', '#fff', '#fbeee8'], seed: 7, size: .62 });
    tw?.kill();
    if (!animate || !M) { stA.draw(1); stB.draw(1); return; }
    const o = { p: 0 };
    tw = gsap.to(o, { p: 1, duration: 1.1, ease: 'power1.inOut', onUpdate: () => { stA.draw(o.p); stB.draw(o.p); } });
  };
  input.value = name;
  let typing;
  input.addEventListener('input', () => { clearTimeout(typing); typing = setTimeout(() => write(input.value.trim()), 260); });
  $('#oathForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) { input.focus(); P.toast('a name, kitten. any name. we don\'t check.'); return; }
    const first = !no;
    name = v.charAt(0).toUpperCase() + v.slice(1);
    if (first) no = BASE + 1;
    P.store.set('coven-name', name); P.store.set('coven-no', no);
    paintMember(); paintRoll(); write(name);
    P.toast(first ? `welcome to the coven, ${name.toLowerCase()}. member no. ${fmt(no)}.` : `name changed. still member no. ${fmt(no)}.`);
    if (first && P.rip) setTimeout(() => P.rip(), 500);
  });

  // write it the first time the paper scrolls in
  if (M && P.hasGsap) ScrollTrigger.create({ trigger: '.oath', start: 'top 70%', once: true, onEnter: () => write(name) });
  else write(name, false);

  paintMember();
  const fonts = document.fonts?.load('60px "Great Vibes"') || Promise.resolve();
  fonts.then(() => { paintRoll(); if (P.hasGsap) ScrollTrigger.refresh(); });
  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { paintRoll(); if (stA) write(name || input.value.trim(), false); }, 200); });
})();
