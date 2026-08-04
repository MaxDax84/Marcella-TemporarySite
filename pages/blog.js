import { useState } from "react";
import { useRouter } from "next/router";
import LocalizedLink from "../components/LocalizedLink";
import Layout from "../components/Layout";
import { posts } from "../data/posts";
import { localizePost } from "../lib/posts";
import { ui } from "../data/i18n";

export default function Blog() {
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).blog;
  const localizedPosts = posts.map((p) => localizePost(p, locale));
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredPosts = localizedPosts.filter((p) => {
    const matchesCategory = !activeCategory || p.category === activeCategory;
    const matchesQuery =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query) ||
      p.keywords.toLowerCase().includes(query) ||
      p.author.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <Layout
      title={t.pageTitle}
      description={t.metaDesc}
      keywords="gravidanza, parto, depressione post partum, aborto, morte fetale, PMA, infertilità, ambientamento, asilo nido, ciuccio, pannolino, regole, educazione prima infanzia, psicologia perinatale"
      canonicalPath="/blog"
    >
      <div className="page-header">
        <div className="container">
          <span className="page-header-label">{t.pageLabel}</span>
          <h1>{t.pageTitle}</h1>
          <p>
            {t.pageDesc}
          </p>
        </div>
      </div>

      <section className="section blog-section">
        <div className="container">
          <input
            type="search"
            className="blog-search"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={t.searchPlaceholder}
          />

          <div className="blog-filters">
            <button
              className={`blog-filter${activeCategory === null ? " active" : ""}`}
              onClick={() => setActiveCategory(null)}
            >
              {t.allCategories}
            </button>
            {t.categories.map((cat) => (
              <button
                key={cat}
                className={`blog-filter${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="blog-no-results">{t.noResults}</p>
          )}

          <div className="blog-grid">
            {filteredPosts.map((post) => (
              <LocalizedLink
                href={`/blog/${post.slug}`}
                className="blog-card"
                key={post.id}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  className="blog-card-image"
                  style={{ background: `linear-gradient(135deg, ${post.bgColor}cc, ${post.bgColor})` }}
                >
                  <span className="blog-card-category">{post.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-title">{post.title}</div>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-meta">
                      {post.readTime}
                    </span>
                    <span className="blog-read-more">
                      {t.readMore}
                    </span>
                  </div>
                </div>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
