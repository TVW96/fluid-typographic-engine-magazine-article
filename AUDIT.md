# Typography and Layout Audit

Audit date: July 24, 2026

## Items That Have Not Fully Passed

### 1. A true 200% browser zoom test was not completed

The controlled browser did not expose a working browser-chrome zoom control. The
earlier test used a 720 CSS-pixel viewport as the mathematical equivalent of
viewing a 1440-pixel-wide page at 200% zoom.

That calculation indicates the typography should enlarge because every fluid
font-size formula combines `rem` and `vw`. It is not a substitute for changing
Chrome, Firefox, or Safari to 200% and visually checking the rendered page.

Manual verification still required:

1. Open `index.html` in a desktop browser at 100% zoom.
2. Set browser zoom to 200%.
3. Confirm that body copy and headings become visibly larger.
4. Confirm that no text is clipped, overlaps another element, or requires
   horizontal scrolling.
5. Confirm that the article remains readable when the effective viewport becomes
   narrower.

### 2. The blockquote renders two opening quotation marks

The blockquote text begins with a literal quotation mark in the HTML, while
`blockquote::before` inserts another decorative opening quotation mark. The DOM
inspection exposed both marks:

```text
“ "Typography is the craft of framing human thought..."
```

This is a presentation defect. Either remove the literal quotation marks from
the HTML or remove the generated `blockquote::before` quotation mark.

## Verification Gaps

These areas were outside the completed audit and must not be described as
passing:

- Mobile layouts below 720 CSS pixels were not visually tested.
- Dark-mode color contrast was not measured against WCAG contrast ratios.
- Optical trimming was not tested across browser engines. Browsers that do not
  support `text-box`, `text-box-trim`, or `text-box-edge` may ignore those
  declarations and use the line-height fallback.
- The `70ch` declaration and measured desktop width passed the reading-measure
  check, but `ch` represents the width of the font's zero glyph. It cannot
  guarantee that every rendered line contains exactly 65–75 characters.
- No dedicated CSS parser or cross-browser compatibility suite was run for the
  newer `text-box`, `oklch()`, `color-mix()`, and logical-property syntax.

## Items That Passed

- Fluid font sizes changed continuously across tested viewport widths; no
  width-based typography media queries were present.
- The article remained constrained to `70ch` on a 1920-pixel-wide viewport.
- The stylesheet does not override the root font size with `62.5%` or another
  fixed percentage.

## Repository State

This report is intentionally uncommitted. No source files were changed by this
documentation update.
