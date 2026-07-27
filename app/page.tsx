"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const products = [
  {
    id: "arca-vase",
    name: "Arca Vase",
    maker: "Atelier Tiga",
    location: "Malang, Indonesia",
    price: "$142",
    image: "/vase.jpg",
    alt: "Sculptural stoneware vase displayed in a warm wooden alcove",
    badge: "Editor’s pick",
    className: "product-featured",
  },
  {
    id: "noma-lamp",
    name: "Noma Lamp",
    maker: "Rhamely Studio",
    location: "Lisbon, Portugal",
    price: "$189",
    image: "/lamp.jpg",
    alt: "Table lamp casting a warm pool of light in a quiet bedroom",
    badge: "Small batch",
    className: "product-portrait",
  },
  {
    id: "kyst-chair",
    name: "Kyst Chair",
    maker: "Object Type",
    location: "Copenhagen, Denmark",
    price: "$440",
    image: "/chair.jpg",
    alt: "Close view of a rounded light-oak chair on a pale background",
    badge: "New arrival",
    className: "product-portrait",
  },
  {
    id: "nocturne-vessel",
    name: "Nocturne Vessel",
    maker: "Merrilee Schultz",
    location: "Portland, USA",
    price: "$96",
    image: "/black-vase.jpg",
    alt: "Sculptural black vessel illuminated against a black background",
    badge: "Only 4 left",
    className: "product-wide",
  },
];

const moods = [
  {
    number: "01",
    title: "Quiet forms",
    description: "Soft silhouettes, tactile finishes, and room to breathe.",
  },
  {
    number: "02",
    title: "Warm utility",
    description: "Everyday objects with honest materials and thoughtful detail.",
  },
  {
    number: "03",
    title: "After dark",
    description: "Sculptural pieces that come alive in low, layered light.",
  },
];

type Theme = "light" | "dark";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [bagCount, setBagCount] = useState(0);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("common-form-theme");
    const preferredTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      [product.name, product.maker, product.location, product.badge]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("common-form-theme", nextTheme);
    setStatus(`${nextTheme === "dark" ? "Dark" : "Light"} theme applied.`);
  }

  function toggleSaved(productId: string, productName: string) {
    setSaved((current) => {
      const next = new Set(current);
      const isRemoving = next.has(productId);

      if (isRemoving) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      setStatus(
        `${productName} ${isRemoving ? "removed from" : "added to"} saved items.`,
      );
      return next;
    });
  }

  function addToBag(productName: string) {
    setBagCount((count) => count + 1);
    setStatus(`${productName} added to your bag.`);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const resultCount = filteredProducts.length;
    setStatus(
      query.trim()
        ? `${resultCount} ${resultCount === 1 ? "piece" : "pieces"} found for “${query.trim()}”.`
        : "Showing the full edit.",
    );
    document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(`You’re on the list. A welcome note is headed to ${email}.`);
    setEmail("");
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <p className="announcement">
          Complimentary carbon-neutral delivery on orders over $150
        </p>

        <nav className="primary-nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Common Form home">
            Common Form
          </a>

          <ul className="nav-links">
            <li>
              <a href="#collection">New edit</a>
            </li>
            <li>
              <a href="#moods">Objects</a>
            </li>
            <li>
              <a href="#journal">Journal</a>
            </li>
          </ul>

          <ul className="nav-actions">
            <li>
              <button
                className="text-button"
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? "Dark" : "Light"} mode
              </button>
            </li>
            <li>
              <a href="#collection">
                Saved <strong>{saved.size}</strong>
              </a>
            </li>
            <li>
              <button
                className="bag-button"
                type="button"
                onClick={() =>
                  setStatus(
                    `Your bag contains ${bagCount} ${bagCount === 1 ? "item" : "items"}.`,
                  )
                }
              >
                Bag <strong>{bagCount}</strong>
              </button>
            </li>
          </ul>
        </nav>

        <form className="search-form" role="search" onSubmit={handleSearch}>
          <label htmlFor="site-search">Find an object, maker, or place</label>
          <input
            id="site-search"
            name="search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “ceramic” or “Copenhagen”"
          />
          <button type="submit">Search the edit</button>
        </form>

        <nav className="category-nav" aria-label="Shop by category">
          <ul>
            <li>
              <a href="#collection">All objects</a>
            </li>
            <li>
              <a href="#collection">Living</a>
            </li>
            <li>
              <a href="#collection">Lighting</a>
            </li>
            <li>
              <a href="#collection">Table</a>
            </li>
            <li>
              <a href="#collection">Textiles</a>
            </li>
            <li>
              <a href="#collection">Art &amp; editions</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <header className="hero-copy">
            <p className="eyebrow">The July curation · 24 considered pieces</p>
            <h1 id="hero-title">Objects for a slower kind of home.</h1>
            <p className="hero-intro">
              Independent design, found with care. This month: grounded forms,
              honest materials, and the quiet confidence of things made to last.
            </p>
            <footer className="hero-actions">
              <a className="primary-cta" href="#collection">
                Explore the edit
              </a>
              <a className="secondary-cta" href="#curator-note">
                Meet the curator
              </a>
            </footer>
          </header>

          <figure className="hero-visual">
            <img
              src="/vase.jpg"
              alt="Stoneware vase framed by warm geometric timber shelving"
              width="1600"
              height="2400"
            />
            <figcaption>
              <strong>Object 07</strong>
              Arca Vase by Atelier Tiga
            </figcaption>
          </figure>

          <aside className="hero-note" aria-label="Curation principle">
            <p>Chosen by people, not an algorithm.</p>
          </aside>
        </section>

        <section className="collection shell" id="collection" aria-labelledby="collection-title">
          <header className="section-heading">
            <p className="eyebrow">Freshly considered</p>
            <h2 id="collection-title">The current edit</h2>
            <p>
              A short list of useful, beautiful things from independent makers
              and thoughtful studios.
            </p>
          </header>

          {filteredProducts.length > 0 ? (
            <ul className="product-grid">
              {filteredProducts.map((product) => {
                const isSaved = saved.has(product.id);

                return (
                  <li className={product.className} key={product.id}>
                    <article className="product-card">
                      <figure>
                        <img
                          src={product.image}
                          alt={product.alt}
                          width="1600"
                          height="2000"
                          loading="lazy"
                        />
                        <figcaption>{product.badge}</figcaption>
                        <button
                          className="save-button"
                          type="button"
                          aria-pressed={isSaved}
                          aria-label={
                            isSaved
                              ? `Remove ${product.name} from saved items`
                              : `Save ${product.name}`
                          }
                          onClick={() => toggleSaved(product.id, product.name)}
                        >
                          {isSaved ? "Saved" : "Save"}
                        </button>
                      </figure>

                      <header className="product-details">
                        <p>{product.maker}</p>
                        <h3>{product.name}</h3>
                        <p>{product.location}</p>
                      </header>

                      <footer className="product-purchase">
                        <p aria-label={`Price ${product.price}`}>{product.price}</p>
                        <button
                          type="button"
                          aria-label={`Add ${product.name} to bag`}
                          onClick={() => addToBag(product.name)}
                        >
                          Add to bag
                        </button>
                      </footer>
                    </article>
                  </li>
                );
              })}
            </ul>
          ) : (
            <section className="empty-state" aria-labelledby="empty-title">
              <h3 id="empty-title">No pieces found</h3>
              <p>Try a maker, place, or a broader material.</p>
              <button type="button" onClick={() => setQuery("")}>
                Clear search
              </button>
            </section>
          )}
        </section>

        <aside className="curator-note shell" id="curator-note" aria-labelledby="curator-title">
          <figure>
            <img
              src="/lamp.jpg"
              alt="Warm table lamp glowing in a dim, intimate room"
              width="1600"
              height="1067"
              loading="lazy"
            />
            <figcaption>Light as material, not afterthought.</figcaption>
          </figure>

          <section>
            <p className="eyebrow">The human filter</p>
            <h2 id="curator-title">“A good object earns its place slowly.”</h2>
            <p>
              Mara Bell, our guest curator, spent three weeks with this month’s
              selection. She looked for evidence of the hand, materials that
              improve with use, and forms that don’t ask for attention.
            </p>
            <a className="secondary-cta" href="#journal">
              Read Mara’s field notes
            </a>
          </section>

          <dl>
            <div>
              <dt>Objects reviewed</dt>
              <dd>186</dd>
            </div>
            <div>
              <dt>Makers selected</dt>
              <dd>17</dd>
            </div>
            <div>
              <dt>Countries represented</dt>
              <dd>9</dd>
            </div>
          </dl>
        </aside>

        <section className="moods shell" id="moods" aria-labelledby="moods-title">
          <header className="section-heading">
            <p className="eyebrow">Browse intuitively</p>
            <h2 id="moods-title">Find your feeling</h2>
            <p>Start with an atmosphere. We’ll show you the objects that shape it.</p>
          </header>

          <ol className="mood-list">
            {moods.map((mood) => (
              <li key={mood.number}>
                <article>
                  <p aria-hidden="true">{mood.number}</p>
                  <h3>{mood.title}</h3>
                  <p>{mood.description}</p>
                  <a href="#collection" aria-label={`Explore ${mood.title}`}>
                    Explore
                  </a>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="journal shell" id="journal" aria-labelledby="journal-title">
          <header className="section-heading">
            <p className="eyebrow">The journal</p>
            <h2 id="journal-title">Stories behind the objects</h2>
          </header>

          <article className="journal-feature">
            <figure>
              <img
                src="/chair.jpg"
                alt="Close detail of the curved back and seat of a pale oak chair"
                width="1600"
                height="2000"
                loading="lazy"
              />
            </figure>
            <section>
              <p>
                Field notes · <time dateTime="2026-07-24">July 24, 2026</time>
              </p>
              <h3>Why the best chair in the room may be the quietest</h3>
              <p>
                On proportion, patience, and the small decisions that make a
                familiar form feel entirely new.
              </p>
              <a href="#newsletter">Read the 6-minute story</a>
            </section>
          </article>
        </section>

        <section className="newsletter" id="newsletter" aria-labelledby="newsletter-title">
          <header>
            <p className="eyebrow">A considered inbox</p>
            <h2 id="newsletter-title">One good thing, every other Thursday.</h2>
            <p>
              New makers, useful essays, and first access to our smallest editions.
            </p>
          </header>

          <form onSubmit={handleNewsletter}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
            <button type="submit">Join the list</button>
            <p>By subscribing, you agree to our privacy policy. Unsubscribe anytime.</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-wordmark" href="#top">
          Common Form
        </a>
        <p>Independent objects for considered homes.</p>

        <nav aria-label="Customer care">
          <h2>Customer care</h2>
          <ul>
            <li>
              <a href="#newsletter">Delivery &amp; returns</a>
            </li>
            <li>
              <a href="#newsletter">Contact</a>
            </li>
            <li>
              <a href="#newsletter">Accessibility</a>
            </li>
          </ul>
        </nav>

        <nav aria-label="About Common Form">
          <h2>About</h2>
          <ul>
            <li>
              <a href="#curator-note">Our curation</a>
            </li>
            <li>
              <a href="#journal">Journal</a>
            </li>
            <li>
              <a href="#collection">Makers</a>
            </li>
          </ul>
        </nav>

        <p>
          © <time dateTime="2026">2026</time> Common Form
        </p>
      </footer>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {status}
      </p>
    </>
  );
}
