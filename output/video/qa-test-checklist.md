# Web Project Testing and Quality Assurance Checklist

Project: Fluid Typographic Engine Magazine Article  
Guide: IT161 Web Project Testing & Quality Assurance Guide  
Test date: July 24, 2026

## Phase 1: Functionality Walkthrough

| Test case | Result | Evidence |
|---|---|---|
| Navigation links | N/A | The article contains no links. |
| Forms and input validation | N/A | The article contains no forms or input controls. |
| Interactive components | N/A | The article contains no menus, accordions, modals, or buttons. |
| Page and stylesheet loading | Pass | `styles.css` loaded by relative URL; no browser console warnings or errors were recorded. |

## Phase 2: Deployment and Cross-Browser Testing

| Test case | Result | Evidence |
|---|---|---|
| Live URL in a private window | Not passed | The GitHub Pages API returned HTTP 404; a deployed Pages site is not configured. |
| Broken assets | Pass locally | The stylesheet loaded. No images or custom web fonts are present. |
| Cross-browser check | Not completed | Only the embedded browser was available; a second browser was not tested. |
| Mobile at 375px | Pass | No horizontal overflow, overlap, or clipping. Body font: 16.09px; H1: 44px. |
| Tablet at 768px | Pass | No horizontal overflow. Article width: approximately 669px. |
| Desktop at 1440px | Pass | No horizontal overflow. Article width: approximately 735px and capped at `70ch`. |

## Phase 3: Automated Quality Audits

| Test case | Result | Evidence |
|---|---|---|
| Lighthouse performance | Not completed | No deployed live URL or Google Chrome/Lighthouse runtime was available. |
| Lighthouse accessibility | Not completed | No Lighthouse score is claimed. Manual checks are listed below. |
| Lighthouse SEO | Not completed | No Lighthouse score is claimed. Manual checks are listed below. |
| Language and headings | Pass manually | `lang="en"`; one H1 followed by two H2 headings. |
| Color contrast | Pass manually | Lowest calculated foreground/background ratio: approximately 5.55:1. |
| Image alternative text | N/A | The project contains no images. |
| Page title | Pass manually | A descriptive `<title>` is present. |
| Meta description | Not passed | No `<meta name="description">` is present. |

## Phase 4: Code Validation

| Test case | Result | Evidence |
|---|---|---|
| W3C HTML validation | Pass | The official Nu HTML Checker returned zero messages. |
| W3C CSS validation | Needs follow-up | The validator reported invalid output, modern-syntax handling errors, and vendor-extension warnings. Its JSON response was malformed. |

## Additional Visual Finding

The blockquote displays two opening quotation marks. The HTML includes a literal
quote while `blockquote::before` adds another decorative opening quote.

## Repository Safety

No source files were changed. These QA artifacts are intentionally uncommitted
and have not been pushed.
