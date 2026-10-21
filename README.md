# Genbook Accounting — landing page

Implementation of the Figma file `Accounting-Genbook` (`BSo47xDdofOAWXTIADvGwI`), section **EN** `194:51227` and section
**VI** `194:51228`: Desktop (1280) · Tablet (800) · Mobile (375), the six FAQ answers, the menu panel and the
"Schedule a demo" modal. React 19 + Vite, CSS Modules, no UI framework, no animation library.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Breakpoints

| Range | Layout | Figma frame |
| --- | --- | --- |
| >= 1280 | Desktop | 1280 (content 1120, 80px inset) |
| 768 – 1279 | Tablet | 800 |
| < 768 | Mobile | 375 |

CSS uses `@media (max-width: 1279px)` / `(max-width: 767px)`; `hooks/useBreakpoint.js` mirrors them for the places where
the DOM differs (the Hero decoration). Wider than 1280 the page keeps its 80px inset and the content grows up to
`--container-max` (1728px), centred.

## Structure

- `src/styles/tokens.css` — Figma variables (names kept) + clearly marked `--proposed-*`, `--space-*`, `--radius-*`
  values that the design uses but has no variable for.
- `src/components/` — Button, Logo, LanguageToggle, Header, MediaSlot, ClipPlayer, FrameBreak, FeatureRow, PlanCard, FaqItem,
  SocialLink, FooterColumn, Footer, ContactModal.
- `src/sections/` — Hero, Steps ("3 Simple Steps"), Features, Pricing, Faq, Cta.
- `src/data/content.js` — all copy (EN); `content.vi.js` patches it for Vietnamese.
- `src/data/media.js` — picks up the animated artwork by file name (see below).
- `src/data/contact.js` — where the contact form is sent (Google Sheet via Apps Script, see "Contact form → Google Sheet").
- `src/hooks/` — `useScrollReveal` (one shared IntersectionObserver), `useBreakpoint`, `useScrolled`.

Pricing, the contact panel (CTA) and the footer are unchanged from the previous design; they were kept as they were.

## Animated artwork

Every illustration lives in `src/assets/media/` as `<slot>.<lang>.<ext>`:

| Slot | Where |
| --- | --- |
| `hero` | Hero dashboard |
| `step-1` · `step-2` · `step-3` | the three "Just 3 Simple Steps" cards, left to right |
| `feature-1` … `feature-4` | the four feature rows, top to bottom |

Files are found by name (`data/media.js`), so adding or replacing one needs no code change, and a Vietnamese slot without
its own `.vi.` file falls back to the English file. A slot without a file keeps its reserved frame (the aspect ratio of
the design) and shows nothing. The sparkle at the start of each feature bullet is `src/assets/icons/bullet-sparkle.svg`
(optional for the same reason).

Two kinds of file:

- **GIF / animated WebP** (`step-1.en.gif` …): shown by `MediaSlot`, lazy-loaded and async-decoded; the browser animates it
  (looping) and pauses it while it is off screen.
- **Transparent WebM clip** (`hero.en.webm`, `hero.vi.webm`): played by `ClipPlayer`. No controls, no loop, starts from the first
  frame when 40% of the frame is visible, holds the last frame, rewinds when the frame has fully left the viewport so scrolling
  back replays it. It plays whatever `prefers-reduced-motion` says (the clip is the content). Safari and every iOS browser
  cannot decode a WebM's alpha channel (black background), so there `ClipPlayer` plays `<slot>.<lang>.stack.mp4` instead: H.264
  with the premultiplied colour on the left and the alpha matte on the right, merged by a small WebGL canvas
  (`stackedAlpha.js`); without WebGL the still picture `<slot>.<lang>.poster.webp` (the last frame) shows.
  After adding or replacing a WebM: run `node scripts/optimise-clips.mjs` (the Figma export is ~3.4 Mbit/s; at CRF 30 a clip is
  4–6x smaller with no visible difference, and an optimised file is never compressed twice), then
  `node scripts/encode-clips.mjs --force` to rebuild the `.stack.mp4` and `.poster.webp`. Both need `ffmpeg` on the PATH with
  libvpx, libx264 and libwebp. Safari / iOS playback has not been tested on a real device.

## Contact modal ("Schedule a demo")

`ContactModalProvider` (App) owns it; the Hero's second button opens it (`useContactModal().openContact`).
Desktop and tablet: a 683px card centred over a 60% black backdrop. Mobile: a sheet that rises from the bottom edge,
20px in from each side. Escape, the close button and a tap on the backdrop close it; focus is trapped inside and returned
to the button; the page behind is `inert` and does not scroll (`position: fixed` body, so it also holds on iOS).

The form validates on the client: name, phone and email are required (phone: 8–15 digits, `+ ( ) . -` and spaces allowed;
email: `a@b.cc`); industry, company and message are optional. A valid form calls `submitContact(values)` in
`data/contact.js`; the modal shows its success view when it resolves and an error line when it throws.

## Contact form → Google Sheet

`data/contact.js` POSTs the form (plus `language` and `page`) to a Google Apps Script web app, which appends a row to a
Google Sheet. Until `VITE_CONTACT_ENDPOINT` is set the submit is only simulated.

Sheet layout (built by `setup()` in `scripts/google-sheets/Code.gs`): **Data** (one row per submission: time, day
`2026-10-21`, ISO week `2026-W43`, month `2026-10`, year, language, name, phone, email, industry, company, message,
page), then **Ngày / Tuần / Tháng / Năm** (choose a period in B1 to list its contacts; columns K:L count contacts per
period) and **Hướng dẫn**. Times use `Asia/Ho_Chi_Minh`.

Set-up (once):

1. Open the target Google Sheet → Extensions → Apps Script. Replace the code with `scripts/google-sheets/Code.gs`.
2. Run `setup()` (authorise when asked): it creates the tabs, formulas and formatting.
3. Deploy → New deployment → type *Web app* → Execute as **Me**, Who has access **Anyone** → copy the `/exec` URL
   (opening it in a browser must answer `{"ok":true,…}`).
4. Put the URL in `.env.local` as `VITE_CONTACT_ENDPOINT=<url>` (see `.env.example`) and rebuild. After changing
   `Code.gs`, use Deploy → Manage deployments → Edit → New version (the URL stays the same).

The script validates again on the server (required fields, email shape, length caps) and takes a script lock so
simultaneous submissions never overwrite each other. The web app URL is public by nature; anyone who has it can add rows,
so keep it out of public docs and treat the sheet as untrusted input.

## Languages (EN / VI)

`src/i18n/LanguageContext.jsx` holds the language. First visit: the browser language (vi -> VI, otherwise EN); the
visitor's choice is remembered in `localStorage` and written to `<html lang>`. `data/content.js` is the English content;
`data/content.vi.js` is a patch over it (see `i18n/merge.js`), so anything not translated falls back to English. Where an
English array carries a layout flag that does not apply to the Vietnamese text, the patch resets it to `null`.

## Animation

- Scroll reveal: elements with `data-reveal` fade + translateY(24px -> 0, 12px on mobile), 700ms ease-out,
  at 85% of the viewport, once. `data-reveal="image"` scales 1.05 -> 1. Children of `data-reveal-group`
  stagger by 100ms. Only `transform` and `opacity` animate. `prefers-reduced-motion` shows everything at once.
- With `prefers-reduced-motion` the scroll reveals become a plain 500ms fade (no travel, no scale), and the modal only fades.
- The modal fades and scales in (260ms) on desktop/tablet and slides up (320ms) on mobile; `transform` and `opacity` only.
- Plan cards float up 8px with a soft shadow on hover (`--lift-*` tokens).
- Buttons: every "Start free trial" goes to `data/links.js` `signIn`; "Contact us" / "Talk to us" / the support
  address open a Gmail compose window (`links.contact`), in a new tab. "Schedule a demo" opens the modal.
- Header gains its shadow after 10px of scroll on desktop.

## Figma quirks handled

- Gradient strokes (Enterprise banner) come through the API as a flat green border; they are rebuilt as a masked
  brand-gradient ring (`.gradient-outline`).
- A headline whose gradient part sits on a later line uses ONE gradient over the whole block (`.gradient-block`,
  `.solid` for the plain fragments), like the gradient fill on a Figma text node.
- Rotated hero bands report swapped `left`/`top`; the rendered offsets are used (`sections/Hero/heroBands.js`).
- Some headings break their line only in some frames (`components/FrameBreak`).
- Figma lays out with integer "auto" line heights; the `--proposed-*` type tokens carry those.
