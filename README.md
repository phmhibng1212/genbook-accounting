# Genbook Accounting — landing page

Implementation of the Figma file `Accounting-Genbook` (`BSo47xDdofOAWXTIADvGwI`):
Desktop `70:3392` (1440) · Tablet `78:4735` (800) · Mobile `78:5103` (375).
React 19 + Vite, CSS Modules, no UI framework, no animation library.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Breakpoints

| Range | Layout | Figma frame |
| --- | --- | --- |
| >= 1280 | Desktop | 1440 |
| 768 – 1279 | Tablet | 800 |
| < 768 | Mobile | 375 |

CSS uses `@media (max-width: 1279px)` / `(max-width: 767px)`; `hooks/useBreakpoint.js` mirrors them for the
two places the DOM differs (Value accordion vs carousel, hero decoration).

## Structure

- `src/styles/tokens.css` — Figma variables (names kept) + clearly marked `--proposed-*`, `--space-*`,
  `--radius-*` values that the design uses but has no variable for.
- `src/components/` — Button, Logo, LanguageToggle, Header, ClipPlayer, FeatureRow, PlanCard, FaqItem,
  SocialLink, FooterColumn, Footer.
- `src/sections/` — Hero, Value, Reporting, Pricing, Faq, Cta.
- `src/data/content.js` — all copy and media.
- `src/hooks/` — `useScrollReveal` (one shared IntersectionObserver), `useBreakpoint`, `useScrolled`.

## Languages (EN / VI)

`src/i18n/LanguageContext.jsx` holds the language. First visit: the browser language (vi -> VI, otherwise EN); the
visitor's choice is remembered in `localStorage` and written to `<html lang>`. `data/content.js` is the English
content (copy + media + layout flags); `data/content.vi.js` is a patch over it (see `i18n/merge.js`), so anything
not translated falls back to English. Everything is translated in VI now.

VI frames follow the design except where the owner chose otherwise: EN type sizes for the FAQ heading, the
Reporting intro and the CTA heading; menu gap 20px (and 0 -> 8px fluid menu spacing between 1280 and 1330px) so the logo
does not run into the longer Vietnamese menu; the FAQ open state from the VI design is used in both languages.

## Animation

- Scroll reveal: elements with `data-reveal` fade + translateY(24px -> 0, 12px on mobile), 700ms ease-out,
  at 85% of the viewport, once. `data-reveal="image"` scales 1.05 -> 1. Children of `data-reveal-group`
  stagger by 100ms. Only `transform` and `opacity` animate. `prefers-reduced-motion` shows everything at once.
- Clips (`ClipPlayer`): the five exported WebM files replace the static product images. No controls, no
  loop, play once when 40% of the frame is visible, hold the last frame, rewind when the frame fully leaves
  the viewport so scrolling back replays it. They play even when the OS asks for reduced motion (the clip is
  the content the page was asked to show); `play()` waits for data so `video.load()` cannot abort it.
- Safari and every iOS browser cannot decode a WebM's alpha channel (black background). There `ClipPlayer` plays
  `<name>.stack.mp4` instead: H.264 with the premultiplied colour on the left and the alpha matte on the right,
  merged by a small WebGL canvas (`stackedAlpha.js`); the video is only a hidden decoder, so no native player
  UI appears, and without WebGL the static poster shows. Rebuild the files with
  `node scripts/encode-stacked-clips.mjs` (uses the `ffmpeg-static` dev dependency). Not tested on a real iPhone.
- `useScrollReveal` also registers elements that mount later (a MutationObserver), so nothing stays hidden after a
  resize swaps the Value accordion for the carousel.
- Plan cards float up 8px with a soft shadow on hover (`--lift-*` tokens); it also applies under reduced motion,
  just without the glide.
- Buttons: every "Start free trial" goes to `data/links.js` `signIn`; "Contact us" / "Talk to us" / the support
  address open a Gmail compose window (`links.contact`), in a new tab.
- With `prefers-reduced-motion` the scroll reveals become a plain 500ms fade (no travel, no scale).
- Value section: desktop rows open on hover (60ms intent delay), click or keyboard focus; tablet/mobile is a
  title strip + swipeable slides (touch swipe, mouse drag, arrow keys, dots, titles) after Figma `1:2972`.
- Header gains its shadow after 10px of scroll on desktop.
- Figma has no motion spec for this file, so the above is the default set.

## Figma quirks handled

- Gradient strokes (open Value row, Enterprise banner) come through the API as a flat green border; they are
  rebuilt as a masked brand-gradient ring (`.gradient-outline`).
- Rotated hero bands report swapped `left`/`top`; the rendered offsets are used (`sections/Hero/heroBands.js`).
- Figma lays out with integer "auto" line heights; the `--proposed-*` type tokens carry those.
