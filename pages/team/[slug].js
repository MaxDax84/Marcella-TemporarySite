import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import LocalizedLink from "../../components/LocalizedLink";
import Layout from "../../components/Layout";
import EmailReveal from "../../components/EmailReveal";
import WhatsAppReveal from "../../components/WhatsAppReveal";
import { teamMembers } from "../../data/team";
import { posts } from "../../data/posts";
import { localizeMember } from "../../lib/team";
import { localizePost } from "../../lib/posts";
import { ui } from "../../data/i18n";

export async function getStaticPaths() {
  const locales = ["it", "en"];
  return {
    paths: locales.flatMap((locale) =>
      teamMembers.map((m) => ({ params: { slug: m.slug }, locale }))
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const rawMember = teamMembers.find((m) => m.slug === params.slug) ?? null;
  const rawPosts = posts.filter((p) => p.authorSlug === params.slug);
  const member = rawMember ? localizeMember(rawMember, locale) : null;
  const memberPosts = rawPosts.map((p) => {
    const { slug, category, title, readTime } = localizePost(p, locale);
    return { slug, category, title, readTime };
  });
  return { props: { member, memberPosts } };
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

export default function TeamMember({ member, memberPosts }) {
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).member;
  const categoryOrder = (ui[locale] || ui.it).blog.categories;
  const articleGroups = categoryOrder
    .map((category) => ({
      category,
      items: memberPosts.filter((p) => p.category === category),
    }))
    .filter((g) => g.items.length > 0);
  const [expandedCategory, setExpandedCategory] = useState(null);

  if (!member) return null;

  const description = truncate(
    `${member.name} – ${member.role} a ${member.city}. ${member.specialties.slice(0, 2).join(", ")}.`,
    155
  );

  return (
    <Layout
      title={member.name}
      description={description}
      keywords={member.specialties.join(", ").toLowerCase() + ", " + member.city.toLowerCase()}
      canonicalPath={`/team/${member.slug}`}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "description": member.bio,
        "image": `${process.env.SITE_URL || ""}${member.photo}`,
        "url": `${process.env.SITE_URL || ""}/${locale}/team/${member.slug}`,
        "worksFor": { "@type": "Organization", "name": "Sostegno alla Genitorialità" },
      }}
    >
      <div className="page-header page-header-short">
        <div className="container">
          <LocalizedLink href="/team" className="article-back">
            {t.back}
          </LocalizedLink>
        </div>
      </div>

      <div className="member-wrapper">
        <div className="container">
          <div className="member-layout">
            {/* Sidebar */}
            <aside className="member-sidebar">
              <div className="member-photo-card">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="member-photo-full"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                ) : (
                  <div
                    className="member-avatar-lg"
                    style={{
                      background: `linear-gradient(135deg, ${member.bgColor}, ${member.color})`,
                    }}
                  >
                    {member.avatar}
                  </div>
                )}
                <div className="member-photo-info">
                  <h1 className="member-photo-name">{member.name}</h1>
                  <div className="member-photo-role">{member.role}</div>
                  <div className="member-photo-city">
                    📍 {member.address || member.city}
                    {member.experience && <> · {member.experience}</>}
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h2>{t.modesTitle}</h2>
                {member.modes.map((m) => (
                  <div key={m} className="member-mode-item">
                    ✓ {m}
                  </div>
                ))}
              </div>

              {member.publications && (
                <div className="sidebar-card">
                  <h2>{t.pubsTitle}</h2>
                  {member.publications.map((p) => (
                    <div key={p} className="member-pub-item">
                      📖 {p}
                    </div>
                  ))}
                </div>
              )}

              <EmailReveal email={member.contact} btnClass="btn btn-primary member-cta-btn" />
              <WhatsAppReveal number={member.whatsapp} btnClass="btn btn-whatsapp member-cta-btn" />
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline member-cta-btn"
                >
                  🌐 {(ui[locale] || ui.it).contact.website}
                </a>
              )}
              {member.instagram && (
                <a
                  href={`https://instagram.com/${member.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-instagram member-cta-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ flexShrink: 0 }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  {" "}@{member.instagram}
                </a>
              )}
              {member.facebook && (
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-facebook member-cta-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ flexShrink: 0 }}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  {" "}Facebook
                </a>
              )}
              {member.youtube && (
                <a
                  href={member.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-youtube member-cta-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ flexShrink: 0 }}>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  {" "}YouTube
                </a>
              )}
            </aside>

            {/* Main content */}
            <main className="member-main">
              <div className="member-section">
                <h2>{t.sectionProfile}</h2>
                <p>{member.bio}</p>
              </div>

              <div className="member-section">
                <h2>{t.sectionSpecialties}</h2>
                <div className="member-specialties">
                  {member.specialties.map((s) => (
                    <div key={s} className="member-specialty-item">
                      <span className="member-specialty-dot" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {member.education && (
                <div className="member-section">
                  <h2>{t.sectionEducation}</h2>
                  <ul className="member-edu-list">
                    {member.education.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              {articleGroups.length > 0 && (
                <div className="member-section">
                  <h2>{t.sectionArticles}</h2>
                  <div className="member-article-groups">
                    {articleGroups.map(({ category, items }) => {
                      const isExpanded = expandedCategory === category;
                      return (
                        <div key={category} className="member-article-group">
                          <button
                            type="button"
                            className="member-article-group-header"
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpandedCategory(isExpanded ? null : category)
                            }
                          >
                            <span className="member-article-group-title">{category}</span>
                            <span className="member-article-group-count">
                              {items.length} {items.length === 1 ? t.articleCountOne : t.articleCountOther}
                            </span>
                            <span
                              className={`member-article-group-chevron${isExpanded ? " is-open" : ""}`}
                              aria-hidden="true"
                            >
                              ▾
                            </span>
                          </button>
                          {isExpanded && (
                            <div className="member-articles">
                              {items.map((p) => (
                                <LocalizedLink
                                  key={p.slug}
                                  href={`/blog/${p.slug}`}
                                  className="member-article-item"
                                >
                                  <span className="member-article-title">{p.title}</span>
                                  <span className="member-article-read">{p.readTime} →</span>
                                </LocalizedLink>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

    </Layout>
  );
}
