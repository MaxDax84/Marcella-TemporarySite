import { useRouter } from "next/router";
import Layout from "../components/Layout";
import LocalizedLink from "../components/LocalizedLink";
import { ui } from "../data/i18n";

export default function NotFound() {
  const { locale } = useRouter();
  const t = (ui[locale] || ui.it).notFound;

  return (
    <Layout title={t.title} noIndex>
      <div className="page-header">
        <span className="page-header-label">404</span>
        <h1>{t.title}</h1>
        <p>{t.desc}</p>
      </div>
      <div className="section" style={{ textAlign: "center" }}>
        <LocalizedLink href="/" className="btn btn-primary">
          {t.cta}
        </LocalizedLink>
      </div>
    </Layout>
  );
}
