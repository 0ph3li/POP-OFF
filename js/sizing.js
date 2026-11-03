/* =========================================================
   POP OFF — sizing.js (the sizing kit)
   concept, design & code by ghostly.grl ♥
   ========================================================= */
(() => {
  const P = window.PO, { $, $$ } = P;
  const M = P.motion;

  /* the twelve sizes: size 0 covers an 18mm nail, size 11 a 7mm one. between two? go bigger */
  const sizeOf = (mm) => P.clamp(Math.floor(18 - mm), 0, 11);
  const FINGERS = ['thumb', 'index', 'middle', 'ring', 'pinky'];
  const PRE = { xs: [14, 10.5, 11, 10, 8], s: [15, 11.5, 12, 11, 9], m: [16, 12, 13, 12, 10], l: [17, 13, 14, 13, 11] };

  /* ================= 01 · THE LEOPARD ON GREY ================= */
  if (M) {
    gsap.timeline({ delay: .1 })
      .from('.sz__cat .slot', { xPercent: -14, opacity: 0, duration: 1.4, ease: 'expo.out' }, 0)
      .from('.sz__serif', { yPercent: 60, opacity: 0, duration: .7, ease: 'back.out(1.8)' }, .15)
      .from('.sz__script', { opacity: 0, scale: .5, rotation: -14, duration: .8, ease: 'back.out(1.8)' }, .35)
      .from('.sz__k, .sz__sub, .sz__p, .sz__go', { opacity: 0, y: 16, duration: .5, stagger: .06, ease: 'power3.out' }, .5);
    gsap.to('.sz__cat .slot', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.sz', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ================= 02 · THE DÉSIRE GRID ================= */
  const leo = () => $$('.kit canvas[data-leo]').forEach((cv, i) => P.leopard(cv, 'ink', 31 + i * 5));
  leo();
  if (M) {
    const kts = $$('.kt');
    gsap.from(kts, { y: 80, opacity: 0, rotation: (i) => (i % 2 ? 3 : -3), duration: .9, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: '.kit__grid', start: 'top 80%', once: true } });
    gsap.from('.kit__buy > *', { y: 24, opacity: 0, duration: .6, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: '.kit__buy', start: 'top 88%', once: true } });
    // the lining and the sleeve slide a little as you scroll, like paper
    gsap.to('.kt__lining, .kt__sleeve, .kt__ribbon', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.kit', start: 'top bottom', end: 'bottom top', scrub: true } });
  }
  $('#kitAdd').addEventListener('click', (e) => { P.fly(e.currentTarget); P.bag.add({ id: 'sizing-kit', name: 'The Sizing Kit', price: 6, kit: true }); P.toast('the sizing kit is in your bag. €6, and it comes back on your first set.'); });

  /* ================= 03 · THE SIZE FINDER ================= */
  const hand = $('#fdHand');
  const saved = (P.store.get('sizes-mm') || '').split(',').map(Number);
  const start = saved.length === 5 && saved.every((n) => n > 0) ? saved : PRE.m;
  hand.innerHTML = FINGERS.map((f, i) => `
    <div class="fg">
      <div class="fg__nail"><img src="img/SHAPES/tip-square.png" alt="" /></div>
      <p class="fg__size">0</p>
      <p class="fg__mm">0 mm</p>
      <input type="range" min="6.5" max="18.5" step="0.5" value="${start[i]}" aria-label="${f} nail width in millimetres" />
      <p class="fg__name">${f}</p>
    </div>`).join('');
  const fgs = $$('.fg', hand), nums = $('#fdNums');
  const read = () => fgs.map((g) => Number($('input', g).value));
  const paint = () => {
    const mm = read(), sz = mm.map(sizeOf);
    fgs.forEach((g, i) => {
      $('.fg__size', g).textContent = sz[i];
      $('.fg__mm', g).textContent = `${mm[i]} mm`;
      $('img', g).style.setProperty('--w', `${(mm[i] * 3.6).toFixed(1)}px`);
    });
    nums.textContent = sz.join(' · ');
  };
  fgs.forEach((g) => $('input', g).addEventListener('input', () => { $$('.fd__pre button').forEach((b) => b.classList.remove('is-on')); paint(); }));
  $$('.fd__pre button').forEach((b) => b.addEventListener('click', () => {
    $$('.fd__pre button').forEach((x) => x.classList.toggle('is-on', x === b));
    PRE[b.dataset.pre].forEach((v, i) => { $('input', fgs[i]).value = v; });
    paint();
    if (M) gsap.fromTo($$('.fg__size', hand), { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .04, ease: 'back.out(2)' });
  }));
  if (saved.length === 5) $$('.fd__pre button').forEach((b) => b.classList.remove('is-on'));
  paint();
  $('#fdSave').addEventListener('click', () => {
    P.store.set('sizes-mm', read().join(','));
    P.store.set('sizes', read().map(sizeOf).join(','));
    P.toast(`saved: ${nums.textContent}. we'll put them on every box you order.`);
  });

  if (M) {
    gsap.from('.fd__card', { y: 90, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.fd', start: 'top 70%', once: true } });
    gsap.from($$('.fg__nail img', hand), { y: 50, opacity: 0, rotation: -30, duration: .7, stagger: .07, ease: 'back.out(1.6)', scrollTrigger: { trigger: hand, start: 'top 85%', once: true } });
    gsap.to('.fd__pano .slot', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.fd', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(leo, 200); });
  document.fonts?.ready.then(() => { if (P.hasGsap) ScrollTrigger.refresh(); });
})();
