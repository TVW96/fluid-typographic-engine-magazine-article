import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Common Form storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Common Form — Independent objects for considered homes<\/title>/i,
  );
  assert.match(html, /<header\b/i);
  assert.match(html, /<nav\b/i);
  assert.match(html, /<main\b[^>]*id="main-content"/i);
  assert.match(html, /<section\b/i);
  assert.match(html, /<article\b/i);
  assert.match(html, /<aside\b/i);
  assert.match(html, /<footer\b/i);
  assert.match(html, /<h1\b[^>]*>Objects for a slower kind of home\.<\/h1>/i);
  assert.match(html, /<time\b[^>]*datetime="2026-07-24"/i);
  assert.match(html, /<dl>/i);
  assert.match(html, /Skip to main content/i);
  assert.match(html, /aria-live="polite"/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps accessibility, OKLCH themes, and Pages output explicit", async () => {
  const [page, css, layout, packageJson, pagesHtml] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../github-pages/index.html", import.meta.url), "utf8"),
  ]);

  for (const element of [
    "header",
    "nav",
    "main",
    "section",
    "article",
    "aside",
    "footer",
    "ul",
    "ol",
    "dl",
    "time",
  ]) {
    assert.match(page, new RegExp(`<${element}\\b`, "i"));
  }

  assert.doesNotMatch(page, /<span\b/i);
  assert.match(page, /aria-pressed=\{isSaved\}/);
  assert.match(page, /aria-label=\{`Add \$\{product\.name\} to bag`\}/);
  assert.match(page, /role="search"/);

  assert.match(css, /--color-bg:\s*oklch\(0\.97 0\.01 85\)/);
  assert.match(css, /--color-text:\s*oklch\(0\.22 0\.025 55\)/);
  assert.match(css, /:root\[data-theme="dark"\]/);
  assert.match(
    css,
    /--font-size-title:\s*clamp\(1\.75rem,\s*calc\(1\.3099rem \+ 1\.8779vw\),\s*3rem\)/,
  );
  assert.match(css, /\.hero h1\s*\{[^}]*font-size:\s*var\(--font-size-title\)/s);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);

  assert.match(layout, /Common Form — Independent objects for considered homes/);
  assert.match(packageJson, /"build:pages": "vite build --config vite\.pages\.config\.ts"/);
  assert.match(
    pagesHtml,
    /tvw96\.github\.io\/fluid-typographic-engine-magazine-article\/common-form/,
  );
});
