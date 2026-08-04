import { useRouter } from "next/router";
import LocalizedLink from "../../components/LocalizedLink";
import Layout from "../../components/Layout";
import { posts } from "../../data/posts";
import { localizePost } from "../../lib/posts";
import { ui } from "../../data/i18n";

export async function getStaticPaths() {
  const locales = ["it", "en"];
  return {
    paths: locales.flatMap((locale) =>
      posts.map((p) => ({ params: { slug: p.slug }, locale }))
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const rawPost = posts.find((p) => p.slug === params.slug) || null;
  const rawRelated = posts.filter((p) => p.slug !== params.slug).slice(0, 3);
  const post = rawPost ? localizePost(rawPost, locale) : null;
  const related = rawRelated.map((p) => localizePost(p, locale));
  return { props: { post, related } };
}

function renderBlock(block, i) {
  switch (block.type) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "p":
      return <p key={i}>{block.text}</p>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "highlight":
      return (
        <div className="highlight-box" key={i}>
          <p>{block.text}</p>
        </div>
      );
    case "img":
      return (
        <figure className="article-figure" key={i}>
          <img src={block.src} alt={block.alt || ""} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "artwork-link":
      return (
        <div className="artwork-link-box" key={i}>
          {block.text}{" "}
          <a href={block.href} target="_blank" rel="noopener noreferrer">
            {block.linkText}
          </a>
        </div>
      );
    case "video":
      return (
        <figure className="article-figure" key={i}>
          <video src={block.src} controls preload="metadata" playsInline />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}

export default function BlogPost({ post, related }) {
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).blogPost;
  if (!post) return null;

  const siteUrl = process.env.SITE_URL || "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${siteUrl}/og-image.png`,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sostegno alla Genitorialità",
    },
    ...(post.date && { "datePublished": post.date, "dateModified": post.date }),
  };

  return (
    <Layout
      title={post.title}
      description={post.excerpt}
      keywords={post.keywords}
      canonicalPath={`/blog/${post.slug}`}
      jsonLd={jsonLd}
    >
      <div className="article-wrapper">
        <div className="container">
          <LocalizedLink href="/blog" className="article-back">
            {t.back}
          </LocalizedLink>

          <div className="article-layout">
            {/* ── MAIN CONTENT ── */}
            <article>
              <div
                className="article-banner"
                style={{
                  background: `linear-gradient(145deg, ${post.bgColor}ee, ${post.bgColor}99)`,
                }}
              >
                <span className="article-banner-category">{post.category}</span>
                <h1 className="article-banner-title">{post.title}</h1>
                <div className="article-banner-meta">
                  {post.readTime} {t.readTimeSuffix}
                </div>
              </div>

              <div className="article-body">
                {post.content.map((block, i) => renderBlock(block, i))}
              </div>

              <div
                style={{
                  marginTop: 48,
                  padding: "24px",
                  background: "var(--white)",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  className="sidebar-avatar"
                  style={{ background: post.authorColor, width: 52, height: 52, fontSize: "1rem" }}
                >
                  {post.authorAvatar}
                </div>
                <div>
                  {post.authorSlug ? (
                    <LocalizedLink
                      href={`/team/${post.authorSlug}`}
                      style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--green)", textDecoration: "underline", textUnderlineOffset: 3 }}
                    >
                      {post.author}
                    </LocalizedLink>
                  ) : (
                    <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text)" }}>
                      {post.author}
                    </div>
                  )}
                  <div style={{ fontSize: "0.82rem", color: "var(--text-light)", marginTop: 2 }}>
                    {post.authorRole}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-light)", marginTop: 2 }}>
                    {post.readTime} {t.readTimeSuffix}
                  </div>
                </div>
              </div>
            </article>

            {/* ── SIDEBAR ── */}
            <aside className="article-sidebar">
              <div className="sidebar-card">
                <h3>{t.relatedTitle}</h3>
                {related.map((p) => (
                  <LocalizedLink href={`/blog/${p.slug}`} className="sidebar-post" key={p.id}>
                    <div className="sidebar-post-title">{p.title}</div>
                    <div className="sidebar-post-date">{p.readTime}</div>
                  </LocalizedLink>
                ))}
              </div>

              <div className="sidebar-card">
                <h3>{t.needSupportTitle}</h3>
                <p style={{ fontSize: "0.86rem", color: "var(--text-mid)", lineHeight: 1.7, marginBottom: 16 }}>
                  {t.needSupportDesc}
                </p>
                <a
                  href="mailto:mmarcone@me.com"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
                >
                  {t.writeUs}
                </a>
              </div>

              <div className="sidebar-card">
                <h3>{t.teamTitle}</h3>
                <LocalizedLink href="/team" style={{ display: "block", marginTop: 8 }}>
                  <div style={{ fontSize: "0.86rem", color: "var(--text-mid)", lineHeight: 1.7, marginBottom: 12 }}>
                    {t.teamDesc}
                  </div>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--green)" }}>
                    {t.teamCta}
                  </span>
                </LocalizedLink>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
