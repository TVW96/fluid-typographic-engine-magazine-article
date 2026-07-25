# Assignment: The Fluid Typographic Engine (Magazine Article)

## Site Audit
The CSS passes all four checks. No code changes were necessary.
### Fluid scaling: 
Pass. There are no breakpoint-based font-size changes. Computed h1 sizes increased continuously:
800px viewport: 60px
1000px: 68.4px
1200px: 76.8px
1440px: 86.88px
### Zoom friendly: 
Pass by formula and rendered-equivalent measurement. Every type-scale clamp() combines rem and vw. Under 200%-equivalent conditions, body text grows from 18.88px to approximately 34.11 physical pixels. A viewport-only formula would remain physically unchanged.
### Reading measure: 
Pass. .article-body and its parent are capped at 70ch. On a 1920px viewport, the measured article width was approximately 735px, rather than stretching edge-to-edge.
### Cascade isolation: 
Pass. There is no declared html font size—especially no 62.5% override. The browser’s root remained its default 16px, and all text sizes derive from rem-based custom properties.

## Video Demonstration


https://github.com/user-attachments/assets/8678ea92-da92-48aa-8c6e-fd2cad7343df

