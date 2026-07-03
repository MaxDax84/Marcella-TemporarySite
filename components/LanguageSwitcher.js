import Link from "next/link";
import { useRouter } from "next/router";
import { localeHref } from "../lib/locale";
import { FlagGB, FlagIT } from "./FlagIcons";

const FLAGS = { en: FlagGB, it: FlagIT };

export default function LanguageSwitcher({ className }) {
  const router = useRouter();
  const otherLocale = router.locale === "en" ? "it" : "en";
  const Flag = FLAGS[otherLocale];
  // On the custom 404 page, asPath diverges between server (static "/404")
  // and client (the real mistyped URL) — link home instead to avoid a
  // hydration mismatch and a broken cross-locale link.
  const path = router.pathname === "/404" ? "/" : router.asPath;

  return (
    <Link
      href={localeHref(otherLocale, path)}
      locale={false}
      className={`lang-flag${className ? ` ${className}` : ""}`}
      aria-label={otherLocale === "en" ? "Switch to English" : "Passa all'italiano"}
      title={otherLocale === "en" ? "Switch to English" : "Passa all'italiano"}
    >
      <Flag className="lang-flag-icon" />
    </Link>
  );
}
