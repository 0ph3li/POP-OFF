# POP OFF

**claws, made to come off.**

*a press-on nail house. hand-painted sets, 24 tips each, on in ten minutes in the back of a taxi, off whenever you want.*

`HTML` · `CSS` · `vanilla JS` · `GSAP` · `Lenis` · `Canvas`

</div>

---

**POP OFF** is a concept website for a press-on nail brand that doesn't exist. No salon, no drill, no two hours in a chair: every set is painted by hand, comes as **24 tips in 12 sizes**, goes on in ten minutes and comes off whenever you want, without damage. A new set drops **every friday at 21:00, Milano time**.

The whole idea is the **claw**. A press-on is a claw you can take off, so the site scratches, clicks and pops. Three claw marks rip across the screen when something big happens, a scratch card hides the first-order code, and the konami code scratches the entire website.

The look is copied, screen by screen, from a moodboard of twenty references: warm cream paper, **dried blood** (#310101), girls-night pink, lilac flyers and a lot of **leopard**, with big calligraphy (Great Vibes) laid over tall didone caps (Bodoni Moda). Every leopard on the site is painted live on a canvas, so there isn't a single leopard texture file.

> Personal portfolio project · concept, design & code by **ghostly.grl** ♥

---

## ✦ The palette

| colour | hex | where |
|---|---|---|
| cream | `#f3ebde` | the paper, the default background |
| bone | `#ebe3df` | the *For such a time* beige |
| dried blood | `#310101` | ink, theme colour |
| cherry | `#8f0f1c` | the red script, buttons, signatures |
| girls night | `#ee8fb8` | the pink of the posters |
| blush | `#f5cfdc` | toasts, soft panels |
| rose | `#d48d95` | the stiletto card |
| lilac | `#e2d0da` | the MtrlGrl flyers, the footer |
| cocoa | `#3f2311` | velvet, cinnamon |
| jade | `#a2c3b1` | the square card, the dragon |

**Type:** Bodoni Moda (the tall caps), Great Vibes (the flourish), Manrope (small caps and body), Mrs Saint Delafield (signatures).

---

## ✦ The pages

### 00 · Loader: *Cinnamon*
Copied from a lip-treatment ad. *Pop off* is written in **hundreds of tiny rose-gold stars** on cream paper, and the same words in white stars over a photo of glossy lips biting a cinnamon bun. The stars appear from left to right, like handwriting. Then the paper slides up, the photo slides down, and the home is underneath. The stars are placed by `PO.starText`: the word is drawn on an offscreen canvas, and a star goes only on the **edge** of each letter, so together they draw an outline, just like the ad.

### 01 · Home: one reference per screen

| # | screen | reference | what happens |
|---|---|---|---|
| 01 | **hero** | Mowenkur nail studio | a face framed by two hands, the pink name in the middle; it floats away as you scroll |
| 02 | **press on.** | nailtherapy + LACQ atelier | a hand on a silver chain drops in from the top, light sweeps across a chrome *Pop Off* plate |
| 03 | **claws out.** | *For such a time* | a band of leopard eyes opens, three photos rise, *Claws out.* pops in red script and a swash draws itself under it; three little poems sit in the corners |
| 04 | **set no. 07** | Girls Night poster | CHERRY rises, the star-shaped cutout opens like an eye as you scroll, and you can add the set to your bag |
| 05 | **stiletto** | *Orchids* poster | the photo of the claws is cut into 22 strips that slide into place as you scroll |
| 06 | **color pairing** | *Dried Blood × Leopard* | two black cherries blown up behind **fluted glass** (CSS blur + ribs), five pairings; the two halves slice in opposite directions |
| 07 | **how to pop off** | the cat licking her claws | three steps, then a **scratch card**: scratch with three parallel claws to find `CLAWSOUT` (10% off, copied to your clipboard) |
| 08 | **the coven** | Dezia Washington | pink stripes, floating black & white photos that turn to colour on hover, then the pink **care guidelines** printed as a type-specimen sheet |
| 09 | **velvet** | Velvet desserts | *Pop off* over a café table, three polish textures (milk, cocoa, strawberry), tins tumbling in |
| 10 | **the box** | the black flat-lay | envelope, cards, a pink box and the leopard bag fly onto black |
| 11 | **refer a friend** | The Skin Goddess card | a 3D leopard-fur card on grey snow-leopard velvet. Flip it to find a real form, and your referral code turns into a QR code drawn on a canvas |
| — | **footer** | MtrlGrl social flyers | lilac flyers, the countdown to friday's drop, the newsletter |

### 02 · The sets: *fourteen of them*
- **The poster**: the Girls Night language again. THE rises, *Sets* pops in pink, the photo zooms out.
- **The shop**: a white four-column feed, one photo per set on a hand. Hover a tile and the real tips of that set float over it. Filter by shape: almond, stiletto, square, coffin.
- **The set poster**: click a tile and a full-screen poster wipes up over the page. It has the name, a note, the shape, the length, the **ten real tips** cut out on transparent, the price and *add to bag*. ← → (or the arrows) move to the next set, and Esc closes it.
- **Deep links**: `sets.html#cherry-leopard` opens that poster directly, and `sets.html#shape-stiletto` opens the shop already filtered (the Shapes quiz uses it).

| | set | shape | length | price |
|---|---|---|---|---|
| 01 | Milk Spikes | stiletto | extra long | €42 |
| 02 | Cherry Leopard | square | long | €40 |
| 03 | Blush Ballet | almond | long | €34 |
| 04 | Holy Nude | coffin | extra long | €36 |
| 05 | Mint Happiness | almond | medium | €34 |
| 06 | Rose Piercing | almond | medium | €40 |
| 07 | Snow Leopard | almond | medium | €38 |
| 08 | Candy Safari *(limited, 200 boxes)* | coffin | long | €44 |
| 09 | Cinnamon Stars | almond | medium | €38 |
| 10 | Baby Boomer | almond | long | €36 |
| 11 | Chrome Claws | stiletto | extra long | €42 |
| 12 | French Kiss | square | medium | €30 |
| 13 | Liquid Metal | stiletto | long | €42 |
| 14 | Polka Punk | coffin | medium | €36 |

### 03 · Shapes: *almond, stiletto, square, coffin*
- **RÊVESCAPE**: one photo is the whole hero, with a huge script *Shapes* in the bottom right.
- **Stems by Lem**: the submark. The four shapes, drawn as a hollow hand-drawn mark, **draw themselves** as you scroll, pink on top and dark underneath.
- **The palette cards**: a dark panel with four rounded cards in four colours (`#E7A6AC`, `#D48D95`, `#A2C3B1`, `#B6D6C7`) and **gold clouds painted on canvas**. Each card is one shape, with a real tip lying across it. Open a card to see its sets.
- **The tiger palette quiz**: the white tiger on the left and three swatches (dusty rose, teal, warm ivory) as the answers. After three questions you get your shape, with a link that opens the shop already filtered.

### 04 · Sizing: *measure twice, scratch once*
- **The leopard on grey**: a cut-out leopard looking back over a black and white tail, with "MEASURE *twice*, scratch once."
- **The sizing kit**: drawn as packaging in the style of *The Désire*: the bag with the leopard lining, the card with the grey ribbon, the pouch with its sleeve, the note, the box and the close-up bag. It's all CSS plus ink-leopard canvases, so it needs no photos. It costs €6, which you get back on your first set.
- **The size finder** floats over the tiger and dragon panorama.
  - One slider per finger sets the nail width in millimetres, and a real tip grows with it.
  - Size 0 is 18 mm and size 11 is 7 mm. Between two sizes it rounds to the bigger one.
  - There are presets xs / s / m / l, and *save my sizes* keeps them for the bag.

### 05 · The coven: *members only, free*
- **The cat**: a cut-out black cat licking her claws, sitting on warm cream, next to *the* COVEN and the member count. A "the coven" signature sits where the reference has the photographer's name.
- **The flyers**: six social flyers on lilac, one per perk:
  - the girl in the pink tracksuit, front and back
  - ***An Hour Early***: every drop at 20:00 instead of 21:00
  - **the roll**: your name written five times in script, shrunk until it fits
  - ***Birthday Set***
  - **the vote** for the next drop, with live percentages (on purpose, a reload starts it blank again)
  - ***Sized Once Forever***: the sizing kit is free for the coven
- **The oath**: paper on top, a night photo underneath, and five rules (*file, never bite. pop off, don't rip off…*).
  - Type your name and it's **redrawn in tiny stars** as you type, rose gold on the paper and white over the photo.
  - *Swear it* makes you member no. 4,813. The count, the roll and the receipt all pick it up, and the page gets clawed.

### 06 · The bag
- **The Désire bag**: a white paper bag on grey, with snow-leopard ink and black rope handles. The **real tips of every set inside poke out of the top**, fanned out.
  - Next to it is the list: photo, shape · length, − / +, price, and *pop it off* to remove one.
  - An empty bag says *"your bag is empty. so are your nails, probably."* and offers three sets.
- **The receipt**, as Skin Goddess stationery: the leopard fur card and the cream card on cherry satin.
  - subtotal
  - the sizing kit: free for the coven, otherwise €6 back when there's a set in the bag
  - codes: `CLAWSOUT` (the scratch card, 10% off) and `POPOFF-NAME-10` (the referral card, €10 off)
  - shipping, free over €40
  - your saved sizes, *"we'll pack them on top"*
  - the total
- **Check out**: checkout opens with the friday drop, so the button tells you when (an hour early if you're in the coven) and claws the page.

---

## ✦ Easter eggs

| | how | what |
|---|---|---|
| 🐾 | the **konami code** ↑ ↑ ↓ ↓ ← → ← → B A | *claws out*: the whole website gets scratched, twice |
| 🦷 | type **`bite`** | *don't. that's literally why we exist.* |
| 💅 | type **`acrylic`** | *two hours in a chair and a drill. or ten minutes on your couch.* |
| 🚕 | type **`salon`** | *the salon is wherever you are. the taxi counts.* |
| 🧴 | type **`glue`** | *the good one. it holds for two weeks and lets go when you ask nicely.* |
| 🐈‍⬛ | type **`meow`** | a scratch across the screen, and an apology |
| 👋 | leave the tab | *come back, kitten. your nails are drying.* (and *claws retracted ♥* when you come back) |
| 🎟️ | scratch the card on the home | `CLAWSOUT`, already copied |
| ⌨️ | open the **console** | the cat, and a list of what you can call: `popoff.claws()`, `popoff.rip()`, `popoff.toast()`, `popoff.missing()` |

---

## ✦ How it works

- **One small engine.** `js/main.js` exposes `window.PO` (alias `popoff`). It handles smooth scrolling, image slots, the toast, split text, magnetic buttons, the cursor, the claws, the leopard painter, the star writer, the bag and the friday clock. Each page adds its own small file on top.
- **Leopards in code.** `PO.leopard(canvas, kind, seed)` paints a leopard print from a seeded random generator: each rosette is a lighter, lumpy core inside a broken ring of fat, uneven blobs, with loose spots in between and a soft blur. There are four kinds:
  - `warm`: classic leopard
  - `cool`: snow leopard
  - `fur`: the soft Skin Goddess card
  - `ink`: the watercolour Désire bag

  The same seed always paints the same spots.
- **Claw marks.** `PO.rip()` draws three tapered SVG strokes across the screen at a random angle, then lets them fade.
- **Stars that write.** `PO.starText(canvas, text)` writes the text offscreen and puts a tiny five-point star on every pixel at the edge of the letters. `draw(progress)` pops them in from left to right. The loader and the coven oath both use it.
- **The scratch card.** A painted leopard canvas covers the code. Each pointer move erases three parallel strokes, perpendicular to the direction you scratch in. Once enough of the card is gone, the rest fades away.
- **Real tips.** The set tips are product photos. They were rotated so the free edge points up, the black background was removed with a flood fill from the edges, and they were saved as transparent PNGs.
- **The bag.** `PO.bag` stores the items in `localStorage` (`add`, `setQ`, `clear`) and fires a `bag:change` event. Any page can add to it, and `PO.fly()` throws a tiny nail from the button into the header bag.
- **The friday clock.** `PO.nextDrop()` works out the next friday at 21:00 in **Europe/Rome**, whatever your time zone. The footer, the coven and the receipt count down to it.
- **Image slots.** Every photo is a slot with `data-img`. Put a file with that name in `img/<PAGE>/` and it appears; the extension doesn't matter (jpg, png or webp). Until then, a placeholder in the photo's own tone describes what goes there, and `popoff.missing()` lists what's still missing.

## ✦ Privacy

Nothing leaves the browser. There is no server, no analytics and no tracking. Your bag, your sizes, your code, and your coven name and member number are kept on your device in `localStorage` (keys start with `po-`). The checkout never asks for a card: it only tells you when the drop opens.

## ✦ Run it locally

There is no build step. Serve the folder with any static server:

```bash
python3 -m http.server 5660
```

then open <http://localhost:5660>.

## ✦ Structure

```
index.html · sets.html · shapes.html · sizing.html · coven.html · bag.html

css/   style.css (shared: header, cursor, slots, toast, claw marks, footer)
       + one file per page
js/    main.js  (shared: the PO engine, the loader, the bag, easter eggs)
       + one file per page
img/   HOME · SETS · SHAPES · SIZING · COVEN
       (_originals inside a folder keeps the full-size files)
       img/README.md lists every photo and where it goes
VIBES/ the moodboard: the twenty references the pages are copied from
reel/  the case-study reel
```

## ✦ Built with

- Plain **HTML, CSS and JavaScript**: no framework, no build step
- [GSAP 3](https://gsap.com/) + ScrollTrigger · [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling
- Canvas 2D for the leopards, the stars, the gold clouds, the scratch card and the QR code
- Google Fonts: Bodoni Moda, Great Vibes, Manrope, Mrs Saint Delafield

Designed for desktop and mobile. Respects `prefers-reduced-motion`: the animations are skipped and every page shows its finished state.

## ✦ Credits

Concept, design & code: **ghostly.grl** ♥
Photos in `img/` and `VIBES/` are stock images and moodboard references and belong to their authors. They're used here for a non-commercial portfolio project.

---

<div align="center">

✦ claws out ✦ every friday ✦ 21:00 ✦

```
   *    /\_/\      +
       ( o.o )   <3  ghostly.grl
   +    > ^ <          *
```
