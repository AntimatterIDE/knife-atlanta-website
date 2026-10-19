---
name: luxury-serif
description: "Build high-end fashion, hospitality and jewellery pages where restraint reads as expensive: a high-contrast display serif, wide small-caps tracking, hairline rules and slow, deliberate motion. Use when the user is building a fashion, jewellery, hospitality, beauty, watch or luxury brand page, asks for an elegant, high-end, refined or understated aesthetic, or wants high-contrast serif type, wide small-caps tracking and slow deliberate motion."
---

# Luxury Serif

A landing-page system for the top of the market: couture fashion, five-star
hospitality, fine jewellery, branded residences. The style argues that the brand
does not need to try. Every rule removes urgency, decoration and noise, because in
this category **visible effort reads as cheap**. Confidence comes from space,
stillness and precision, not colour or motion.

Guard against the "luxury-inspired" page: a normal SaaS layout with the body font
swapped to Playfair Display, a gold CTA gradient, a pill badge over the hero, three
feature cards, and a stock handshake photo. That page is not expensive. It is a
template in a costume. The difference is almost entirely typography, photography
and restraint. Read the anti-patterns (§13) before writing a line.

The second failure mode is technical: a high-contrast display serif at 15px on a
`#EDEAE3` background is genuinely unreadable and fails WCAG. §14 gives the rules.

## 1. The core idea

> The most expensive thing on the page is the emptiness around the product.

Luxury design signals value by withholding. A mass-market page fills every pixel
because it competes on features and price. A luxury page leaves 70% of the viewport
empty because the brand competes on desire. Each element should feel placed by a
human with taste and restraint.

Three consequences that drive every other rule:

1. **Negative space is the primary material.** If a section feels too empty, it is
   probably close to correct. Add space before you add content.
2. **Nothing is bright, nothing is fast, nothing shouts.** No saturated colour, no
   spring physics, no urgency copy, no "Shop now: 20% off". Price is stated once,
   quietly, and never discounted on the page.
3. **The serif carries the brand.** A single high-contrast display serif, set very
   large, is the strongest brand signal you have. It does more than any logo.

## 2. Page architecture

The canonical order for a product/property/collection page. Sections are tall and
few. Six art-directed sections beat twelve generic sections.

| # | Section | Height | Purpose |
|---|---------|--------|---------|
| 1 | Nav | `72–88px`, transparent over hero | Brand wordmark, 3–5 links, one quiet action. |
| 2 | Hero | `100vh` | Full-bleed image, brand/collection name in display serif, one line. |
| 3 | Statement | `80–100vh` | The house philosophy as a single centred serif paragraph. |
| 4 | Feature/craft | `auto`, tall | One material or detail, full-bleed image beside a short caption. |
| 5–7 | Product/property | `auto` | The pieces, presented one or two per screen with vast margins. |
| 8 | Editorial break | `100vh` | A full-bleed image with a single line of type, no CTA. |
| 9 | Detail/spec | `auto` | Understated specifics: materials, dimensions, provenance. |
| 10 | Enquiry / reserve | `70–90vh` | Not "Buy". "Enquire", "Reserve", "Request an appointment". |
| 11 | Footer | `auto` | Small caps, hairline-separated, generous padding. |

**Rule:** never a pricing grid, never a comparison table of tiers, never a features
matrix. This category does not compare itself to competitors on the page.

## 3. Typography: the display serif

This is the most identifying element. Get the typeface class and sizing right and
the page is 60% there; get it wrong and nothing else can save it.

**Use a high-contrast display serif for headlines.** High contrast means a large
difference between thick and thin strokes. A **Didone** (Didot, Bodoni), with
hairline serifs and vertical stress, is canonical. Warmer alternatives with slightly
less contrast, such as a **transitional** serif (Canela, GT Sectra Display), read
luxurious without a true Didone's fragility.

**The optical-size trap (read this):** a true Didone's thin strokes vanish at small
sizes and low weights, shredding legibility and looking broken on cheap rendering.
Rules:

- **Didone only at `48px` and above.** Below that its hairlines break up.
- **Use an optical-size axis if the font has one** (`opsz`), set to match the render
  size. A display cut at body size is unreadable; a text cut at display size is flat.
- **Never set a Didone below `20px` or below weight 400.** For anything smaller, use
  the sans (below).
- **Over photography the floor is higher.** Hairlines that survive on paper
  vanish against texture and scrims: a hyphen in a `22px` italic lead can drop
  out entirely at 1x. On imagery, set serif text at `24px` and above, prefer the
  roman to the italic below `32px`, and check the render at 1x, not only on a
  retina screen.
- **If you only have a text serif, do not fake a Didone by making it thin and huge.**
  Choose a transitional serif instead.

Pair the display serif with **one quiet sans** for UI, labels, nav and small print:
a neutral grotesque (Söhne, Neue Haas, Inter as a fallback). The sans is invisible
by design and never competes with the serif.

| Token | Desktop | Mobile | Family | Weight | Tracking | Leading |
|-------|---------|--------|--------|--------|----------|---------|
| `display-xl` | `clamp(72px, 10vw, 168px)` | `48px` | Serif | 400 | `-0.01em` | `0.98` |
| `display-l` | `clamp(48px, 6vw, 96px)` | `36px` | Serif | 400 | `-0.005em` | `1.05` |
| `display-m` | `clamp(32px, 3.5vw, 56px)` | `28px` | Serif | 400 | `0` | `1.15` |
| `lead` | `22px` | `19px` | Serif | 400 | `0` | `1.5` |
| `body` | `16px` | `16px` | Sans | 400 | `0` | `1.65` |
| `eyebrow` | `12px` | `11px` | Sans | 500 | `0.22em` | `1` |
| `caption` | `13px` | `12px` | Sans | 400 | `0.02em` | `1.5` |

**Hard rules:**

- **Display serifs are set at weight 400, never bold.** A Didone at weight 700 looks
  clumsy; its beauty is in the thin strokes. If you need emphasis, go bigger, not
  bolder.
- **Negative tracking on large serif type, near zero on medium, and positive only on
  small caps and eyebrows** (see §4).
- **Body copy is the sans**, `16px`, `leading-[1.65]`, max `62ch`. The serif is for
  display and the occasional lead paragraph only. A full article body in Didone is
  a legibility failure.
- **One serif, one sans. Never two serifs.** Never a script or handwritten font.

## 4. Letter-spacing: the small-caps rule

Positive tracking signals luxury in two exact places. Everywhere else, it cheapens
the page.

- **Eyebrows / section labels:** all-caps or small-caps, sans, `tracking-[0.22em]`
  (roughly `0.2em–0.28em`), weight 500, at `11–12px`. This is the page's widest
  tracking. It appears above section headlines and as nav-adjacent labels.
- **Small-caps navigation, footer links, text links and buttons:** `12–13px`,
  `tracking-[0.12em]`, `uppercase`, weight 400–500. Slightly tighter than the
  eyebrow. Every small-caps action on the page shares this one value.
- **Nowhere else.** Body copy is `tracking-0`. Large serif headlines are *negative*
  tracked. Never apply `0.1em+` tracking to a paragraph or a serif headline; it
  reads as a template default, not a decision.

The mechanism: wide tracking works because small caps are already a whisper;
stretching them feels engraved. On normal-case body or display type, it looks
broken.

## 5. Colour: warm and cool neutral palettes

No bright colour. Use neutrals only, with one slightly tinted text "ink". Pick
**one** of the two variants for a project and commit.

```
Warm neutral (fashion, hospitality, beauty)
  Background        #F4F1EA   (bone / oat)
  Alternate section #EDE8DE   (one step deeper, never a third)
  Paper card        #FBF9F4
  Ink primary       #1A1712   (near-black warm brown, not #000)
  Ink secondary     #6E665A
  Hairline          #D8D1C4
  Accent            none: the photography is the colour

Cool neutral (jewellery, residences, tech-luxury)
  Background        #F5F5F3   (cool white)
  Alternate section #E9E9E6
  Paper card        #FCFCFB
  Ink primary       #14161A   (near-black cool grey)
  Ink secondary     #63676E
  Hairline          #D2D3D2
  Accent            none
```

**Hard rules:**

- **Never pure `#000` on pure `#FFF`.** Luxury neutrals are always slightly tinted
  and slightly off-white. Pure black on pure white reads as a default, not a choice.
- **No gold gradient. No gold at all unless it is a real foil in a real photograph.**
  A CSS `linear-gradient` gold CTA is the single fastest way to cheapen the page.
- **No accent colour.** The only colour on the page comes from the photography. If
  the page has photography and still feels grey, the photos are wrong (§6), not the
  palette.
- **Two neutral tones maximum:** background and one alternate. A third grey turns
  the page into a wireframe.
- **Dark variant** (optional): a warm near-black `#14110C` with ink `#EAE4D8`. Never
  pure black; photography must be graded for a dark ground.

## 6. Photography and art direction

Photography is the only colour and the largest quality signal. Good type cannot
rescue bad photography. This section is mandatory.

**What makes a stock photo instantly cheapen the page:**

- Smiling models looking at the camera; handshakes; "diverse team in a bright
  office"; anything that looks like a stock library thumbnail.
- HDR over-processing, punchy saturation, heavy clarity/structure sliders.
- Centred subject with a busy background; no negative space to place type into.
- Watermark-era compositions: product floating on pure white with a hard shadow.

**Art-direction spec:**

| Property | Rule |
|---|---|
| Subject | Product/place in context, off-centre, with intentional empty space for type. |
| Crop | Tight and confident, or vast and architectural. Never a timid mid-crop. |
| Colour grade | Desaturated, slightly warm or cool to match the palette, lifted blacks. |
| Contrast | Low to medium. No crushed shadows, no blown highlights. |
| Aspect ratios | Hero `3:2` or full-bleed `16:9`; portrait product `4:5`; editorial `1:1`. |
| Grain | A very faint film grain is acceptable; digital noise is not. |
| People | Candid, unposed, often looking away or cropped; never eye-contact-to-camera. |

- **Full-bleed by default.** The hero and editorial-break images touch all four
  viewport edges. Contained images sit in generous margins with no border, no shadow,
  no rounded corners beyond `2px`.
- **One consistent grade across every image.** Mixed grades (one warm, one cool, one
  punchy) destroy the sense of a single art director.
- **If you have no real photography, use a single neutral placeholder at the correct
  aspect ratio.** Never fabricate a UI, never composite a fake product shot.

## 7. Full-bleed and edge-to-edge treatment

- **Hero, editorial breaks and craft sections are full-bleed** (`w-screen`, image
  covers the viewport). Type sits on a contrast scrim (§14) or in the image's empty
  space.
- **Content sections are inset** to `max-w-[1280px]` with gutters of
  `max(32px, (100vw - 1280px) / 2)`. The contrast between full-bleed image sections
  and tightly-inset type sections is the page's main rhythm device.
- **Text over a full-bleed image needs a gradient scrim**, not a solid overlay:
  `bg-gradient-to-t from-black/45 via-black/10 to-transparent`. Never darken the
  whole image with `bg-black/40`.
- **Never a rounded full-bleed image.** Full-bleed media has `0` radius; contained
  media has at most `2px`.

## 8. Navigation

- **Transparent over the hero.** No background, no border. Wordmark and links sit
  directly on the photograph in `#FBF9F4` / white, with a subtle text-shadow or the
  hero's own scrim guaranteeing contrast.
- **On scroll past `~80vh` (past the hero), the nav gains a background:** the page
  background at `92%` opacity with `backdrop-blur-md` and a single hairline bottom
  border. Ink flips from light to dark. Transition `400ms ease`.
- **Keep the solid nav off full-bleed images.** A translucent, blurred bar over a
  later full-bleed photograph smears it into a muddy band. Start image-led
  sections below the nav's height, or keep the nav transparent over them and let
  it turn solid only over a type section.
- **Type:** brand wordmark in the serif or a small-caps sans at `18–20px`; links in
  small-caps sans, `13px`, `tracking-[0.12em]`, weight 400. Links are quiet and few
  (3–5): e.g. `Collections · Atelier · Journal · Contact`.
- **One action, and it is not a filled button.** A small-caps text link
  (`Enquire`, `Book`) or a hairline-underlined link. No pill, no filled CTA in the
  nav.
- **No mega-menu, no search field, no cart badge with a count.** If there is a cart,
  it is a single small-caps `Bag` link, no number bubble.
- Mobile: a hamburger opens a **full-screen** overlay in the background colour, with
  `display-m` serif links centred and widely spaced.
## 9. Hero

The hero is a full-bleed photograph, the collection or brand name in the display
serif, and one line. Nothing else.

```
[full-bleed art-directed image]
  [eyebrow: optional, small-caps, e.g. "Autumn 2026"]
  [Collection / brand name: display-xl serif]
  [one line: lead serif or small-caps sans, max 40 characters]
  [one quiet link: "Discover the collection ›" or "Enquire"]
```

**Rules:**

- **No pill badge, no "New", no discount, no countdown, no trust bar.** None of it.
- **The line is evocative, not a value proposition.** "Made in Florence since 1921"
  or "A house on the water". Never "The best luxury watches for modern buyers".
- **Type is bottom-left or optically centred in the image's empty space**, never over
  a busy subject.
- **One action maximum**, and it is a text link with a `›`, not a filled button.
- The image is the largest element and should be allowed to be *quiet*. A calm
  photograph beats a dramatic one here.

## 10. Product and property presentation

Understatement is the rule. The product is shown, named, and priced once, quietly.

- **One or two products per screen, never a grid of six.** Each gets a large image,
  the name in `display-m` serif, a one-line material/description in the sans, and the
  price in the sans at body size, **not** enlarged, not coloured, not bold.
- **Price is stated once and never emphasised.** `$4,200` in `16px` ink-secondary.
  No "was/now", no strikethrough, no "Save $800", no sale badge. If the brand
  discounts, it does not do so on this page.
- **Property/residence presentation:** a full-bleed image, then an inset block with
  the name in `display-l`, a short paragraph, and understated specifics
  (`4 bedrooms · 320 m² · Private garden`) as a small-caps hairline-separated row.
- **The CTA on a product is "Enquire" / "Reserve" / "Add to bag"** as a hairline
  link or bordered small-caps button, never a filled "BUY NOW".

## 11. Motion

Motion is slow, restrained and almost subliminal. If visitors notice it, it is too
fast or too large. Nothing bounces, springs or loops.

**The only motions you need:**

1. **Slow fade-and-rise on first view:** content arrives once, gently.
   ```tsx
   <motion.div
     initial={{ opacity: 0, y: 16 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, margin: "-12% 0px" }}
     transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
   />
   ```
   `y` is **16px max** and duration is **long** (`1.1–1.4s`). Fast, short reveals
   read as consumer, not luxury.

2. **Slow image scale on the hero / editorial break:** a `1.0 → 1.06` scale over the
   scroll of the section, via `useScroll` + `useTransform`, clamped. Almost
   imperceptible. Use at most twice on the page.

3. **Hairline underline draw on link hover:** a `1px` rule expands from `0` to full
   width over `500ms`. This is the signature micro-interaction (§12).

**Timing constants:**

| Interaction | Duration | Easing |
|---|---|---|
| Content reveal | `1200ms` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Image scale (scroll) | scroll-linked | linear progress, clamped |
| Link underline | `500ms` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Nav background | `400ms` | `ease` |

**Why fast motion destroys the style:** speed communicates urgency, a mass-market
signal ("act now, limited stock"). Luxury communicates permanence and calm. A
`300ms` spring says "startup"; a `1200ms` fade says "heritage".

**Never:** spring physics, bounce, marquees, autoplaying carousels, count-up
numbers, letter-by-letter text scrambles, parallax on more than one element, hover
tilt, cursor followers, looping background video that moves quickly.

## 12. Buttons and links

Filled buttons are rare. The default action is a link or hairline bordered
small-caps button. The entire page has at most one filled element, often zero.

```tsx
{/* Primary action: a bordered small-caps button, not a filled block */}
<a className="inline-flex items-center gap-2 border border-[#1A1712] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-[#1A1712] transition-colors duration-500 hover:bg-[#1A1712] hover:text-[#F4F1EA]">
  Enquire
</a>

{/* Text link with animated hairline underline */}
<a className="group relative inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] text-[#1A1712]">
  Discover
  <span aria-hidden="true">&rsaquo;</span>
  <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
</a>
```

- **The bordered button uses a hairline `1px` border, small-caps, wide tracking, and
  fills with ink on hover.** No rounded-full, no filled accent, no gradient.
- **Corner radius is `0` on buttons.** Sharp corners read as considered; `rounded-2xl`
  reads as consumer app.
- **No outlined + filled button pairs.** The secondary action is always a text link.
- **No icon inside buttons** except a `›` chevron on text links.

**Signature micro-interaction:** every inline text link and nav link reveals a
`1px`, `bg-current` underline that draws from `0` to full width over `500ms` on
hover. Apply it consistently. It is quiet and precise, unlike a colour change or
background fill. Never a
`2px+` underline, never a permanent solid underline, never a fade-in-opacity underline.

## 13. Anti-patterns: what makes a page fail this style

Each is a default agent move. Any one can break the style.

**Composition**
1. A three- or four-column product card grid with hover-lift shadows.
2. Cards with borders, shadows, or `bg-muted` rounded rectangles.
3. A pricing table comparing tiers, or a features comparison matrix.
4. A bento grid.
5. Content constrained to `max-w-7xl` with tight `py-16` sections; luxury needs air.
6. A sticky sidebar, breadcrumb bar, or filter rail on a brand page.
7. Sections padded at `py-12`/`py-16`; the vertical rhythm must be `py-32`+.
**Typography**
8. Playfair Display (or any free Didone) set at weight 700 for headlines.
9. A Didone rendered at `14–16px` where its hairlines break up and blur.
10. Positive `tracking` on body paragraphs or on serif headlines.
11. Two serif families, or a serif paired with a script/handwritten font.
12. Bold serif headlines instead of larger, lighter ones.
13. All-caps applied to a full headline or paragraph, not just the eyebrow.
14. A drop-cap gimmick, or an italic pull-quote in a coloured box.

**Colour**
15. A gold `linear-gradient` on the CTA. The single fastest cheapening choice.
16. Pure `#000` text on pure `#FFF` background.
17. Any saturated accent colour (a purple button, a teal link).
18. A third and fourth grey turning the page into a wireframe.
19. Gradient text on the headline via `bg-clip-text`.
20. A coloured glow, mesh gradient, or aurora behind the hero.

**Photography**
21. A stock photo of a smiling handshake, a bright open-plan office, or a diverse
    team high-fiving.
22. Over-saturated, HDR-processed, high-clarity images.
23. A floating product on pure white with a hard drop shadow.
24. Mixed colour grades across images (one warm, one cool, one punchy).
25. A fabricated UI screenshot or a composited fake product render.
26. Rounded corners and shadows on a full-bleed hero image.

**Motion**
27. Spring physics or bounce on any reveal.
28. An autoplaying product carousel that advances every 3 seconds.
29. Count-up animation on a "since 1921" or a price.
30. Fast (`200–300ms`) consumer-style slide-ups with `40px+` travel.
31. Letter-by-letter headline scramble or typewriter effect.

**Content**
32. Urgency copy: "Sale ends tonight", "Only 3 left", a countdown timer.
33. A pill badge over the hero ("New Collection" in a rounded chip).
34. Marketing-speak headlines: "The best luxury watches for modern buyers",
    "Elevate your lifestyle", "Discover premium quality today".
## 14. Responsive behaviour

- **Mobile keeps the restraint; it does not add density.** Sections stay tall, type
  drops ~35%, gutters stay generous (`24–32px` minimum), full-bleed stays full-bleed.
- **Display serif at 375px:** verify the collection name fits on at most two lines and
  that hairline strokes still render. Drop to a slightly heavier optical cut at small
  sizes if the thin strokes disappear on low-DPI screens.
- **Full-bleed hero type moves to the lower third** on mobile so it clears the image's
  subject; keep the scrim.
- **Two-up product rows collapse to one column**, image first, type below,
  consistently aligned.
- **Scroll-linked image scale disabled below `lg`:** replace with a static image.
- Touch targets `44×44px` minimum despite the quiet, small link styling.
- Test at 375, 768, 1024, 1440, 1920, 2560. At `2560` the container caps at
  `1280px` and gutters grow; the serif does not keep scaling past its `clamp()` max.

## 15. Accessibility: keeping the style AA-safe

Thin serifs and low-contrast neutrals risk WCAG failures. These rules keep the look
AA-safe.

- **Ink-secondary must pass 4.5:1 for body text.** `#6E665A` is 5.02:1 on
  `#F4F1EA` and 4.63:1 on the darker `#EDE8DE` alternate: both pass, but the
  second barely does, so use `#5A5348` (6.22:1) for secondary text on the
  alternate to keep a margin. Always verify the actual pairing, not just the
  token.
- **Never set body copy in the thin Didone.** Body is the sans at weight 400. Thin
  serif strokes at small sizes fail both contrast and clarity even when the colour
  ratio passes.
- **Text over full-bleed imagery needs a guaranteed-contrast scrim** (§7). Do not
  rely on the photograph alone; the same image at a different crop can drop contrast
  below AA. The gradient scrim ensures the type sits on a controlled tone.
- **Eyebrows and small-caps at `11–13px` still need 4.5:1** (they are small text).
  Keep them at ink-primary or a tested ink-secondary, never a light grey.
- **Focus rings stay visible:** a `1px` ink outline at `2px` offset. Do not remove
  focus styling "for aesthetics".
- **Underline-on-hover links must also have a non-hover affordance** for keyboard and
  reduced-motion users: a persistent `1px` underline at `40%` opacity, going solid on
  hover/focus, satisfies "links distinguishable without colour".
- One `<h1>` (the hero name); section headlines are `<h2>`; sections are `<section>`
  with `aria-labelledby`. The `›` glyph is `aria-hidden`.
- Full `prefers-reduced-motion` path: reveals become instant, image-scale becomes a
  static frame, the underline appears immediately on hover without the draw.

## 16. Performance

- **The hero image is the LCP element.** Serve AVIF/WebP, set explicit `width`/
  `height`, mark it `priority` / `fetchpriority="high"`, and preload it. Full-bleed
  hero imagery is large, so target the hero at `< 350KB` after compression.
- **Budget: LCP < 2.2s, CLS < 0.05, total page weight < 2MB** on a 6-image page.
  Luxury pages lean image-heavy; compress aggressively and lazy-load below the fold.
- **Webfont strategy:** the display serif is critical and small (headlines only), so
  subset it to the characters used, preload the one display weight, and use
  `font-display: swap` with a metric-matched serif fallback (`size-adjust` in
  `@font-face`) so the headline does not reflow. The sans loads normally.
- **Do not load six serif weights.** You need one display weight (400) and one or two
  sans weights. Every extra weight is wasted bytes.
- Only animate `transform` and `opacity`. Add `will-change: transform` to the
  scroll-scaled hero image and remove it when the section leaves the viewport.

## 17. Implementation notes

Tailwind v4 token setup (warm variant):

```css
@theme {
  --font-display: "Canela", "Didot", Georgia, serif;
  --font-sans:    "Söhne", "Inter", system-ui, sans-serif;

  --text-display-xl: clamp(4.5rem, 10vw, 10.5rem);
  --text-display-l:  clamp(3rem, 6vw, 6rem);
  --text-display-m:  clamp(2rem, 3.5vw, 3.5rem);
  --text-lead:       1.375rem;

  --color-surface:    #F4F1EA;
  --color-surface-2:  #EDE8DE;
  --color-ink:        #1A1712;
  --color-ink-muted:  #6E665A;
  --color-hairline:   #D8D1C4;

  --ease-lux: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Full-bleed hero shell with scrim and overlaid type:

```tsx
<section className="relative h-screen w-full">
  <img
    src="/img/hero.avif"
    alt="Autumn collection, shot on location in Florence"
    className="absolute inset-0 h-full w-full object-cover"
    fetchPriority="high"
    width={2400}
    height={1600}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
  <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1280px] px-8 pb-24">
    <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.22em] text-white/80">
      Autumn 2026
    </p>
    <h1 className="font-display text-[length:var(--text-display-xl)] font-normal leading-[0.98] tracking-[-0.01em] text-[#FBF9F4] text-balance">
      A house on the water
    </h1>
  </div>
</section>
```

Inset product row (understated price):

```tsx
<div className="mx-auto grid w-full max-w-[1280px] items-center gap-16 px-8 py-32 lg:grid-cols-2 lg:gap-24">
  <div className="relative aspect-[4/5] w-full overflow-hidden">
    <img src="/img/piece.avif" alt="Silk gown, hand-finished" className="h-full w-full object-cover" />
  </div>
  <div className="max-w-[46ch]">
    <h2 className="font-display text-[length:var(--text-display-m)] leading-[1.15]">The Aria gown</h2>
    <p className="mt-4 font-sans text-[16px] leading-[1.65] text-ink-muted">
      Hand-finished silk, cut on the bias in the Florence atelier.
    </p>
    <p className="mt-6 font-sans text-[16px] text-ink-muted">$4,200</p>
  </div>
</div>
```

## 18. Pairs well with React Bits Pro (optional)

You do **not** need React Bits Pro to use this skill. Build from scratch if the
project has no registry configured. If the `@reactbits-pro` and `@reactbits-starter`
registries *are* configured, these accelerate the build without fighting the style:

- `@reactbits-starter/blur-highlight-tw`: a quiet hover treatment for editorial
  links, tuned slow (§11).
- `@reactbits-pro/hero-3`, `@reactbits-pro/gallery-2`: full-bleed section shells.
  Strip any pill badge, filled CTA and card wrapper before use, and re-time motion to
  the `1.2s` luxury curve.

Ignore this section if the registries are not configured. Never add a dependency on
them just to satisfy the style.

## 19. Self-verification loop

Re-read the rendered output and check every item. If any fails, fix it and run the
loop again. Do not report completion with known failures.

**Composition**
- [ ] Sections are `py-32`+ on desktop; no section is shorter than `py-24` on mobile.
- [ ] There is no product card grid, pricing table, or comparison matrix.
- [ ] Full-bleed image sections alternate with tightly-inset type sections.
- [ ] 60%+ of each content viewport is empty space.

**Typography**
- [ ] Exactly one display serif and one sans are loaded.
- [ ] The serif is only used at `20px`+ and only at weight 400.
- [ ] Positive tracking appears only on eyebrows and small-caps nav/footer links.
- [ ] Body copy is the sans at `16px`, max `62ch`, `tracking-0`.
- [ ] No gradient text, no bold serif headline.

**Colour**
- [ ] Background is off-white/tinted; text is tinted near-black, never `#000`/`#FFF`.
- [ ] There is zero saturated colour and zero gold gradient on the page.
- [ ] At most two neutral tones are in use.

**Photography**
- [ ] Every image shares one colour grade; none is HDR/over-saturated stock.
- [ ] Full-bleed images have `0` radius, no shadow; type over them has a scrim.
- [ ] No fabricated UI, no floating-product-on-white, no smiling-handshake stock.

**Motion**
- [ ] Reveals are `1.1s`+ with `16px` travel; nothing springs, bounces or loops.
- [ ] At most two scroll-linked image scales, disabled below `lg`.
- [ ] Link hover draws a `1px` underline; `prefers-reduced-motion` is fully static.

**Anti-patterns (§13)**
- [ ] Re-read all 34 anti-patterns against the page. Zero hits.
- [ ] Specifically: no gold gradient CTA, no pill badge, no urgency copy, no Playfair
      at weight 700.

**Accessibility**
- [ ] Every text/background pairing verified at 4.5:1, including on the alternate
      section and over imagery.
- [ ] One `<h1>`; sections labelled; focus rings visible; links distinguishable
      without relying on the hover underline.

**Generic-AI smell test**
- [ ] Could this be re-skinned into a mid-market e-commerce page by swapping the font?
      If yes, the restraint and photography are wrong, not the colours.
- [ ] Does any headline say "elevate", "premium quality", "best luxury", or
      "discover"? Rewrite it into something specific and evocative.
