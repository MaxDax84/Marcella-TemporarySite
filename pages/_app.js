import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/router";
import { Playfair_Display, Inter } from "next/font/google";
import "../styles/globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const FADE_OUT = 220; // ms pagina corrente svanisce
const FADE_IN  = 260; // ms nuova pagina appare

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // "shown" mantiene il vecchio componente visibile durante il fade-out
  const [shown, setShown] = useState(() => ({ Component, pageProps }));
  const [visible, setVisible] = useState(true);

  // Ref sempre aggiornato con il componente/props più recenti
  const latest = useRef({ Component, pageProps });
  const timer = useRef(null);

  // Aggiorna il ref ad ogni render (senza ricreare i listener)
  useEffect(() => {
    latest.current = { Component, pageProps };
  });

  useEffect(() => {
    const handleStart = () => {
      clearTimeout(timer.current);
      setVisible(false); // inizia fade-out del vecchio componente
    };

    const handleDone = () => {
      // Aspetta che il fade-out finisca, poi:
      // 1. swappa il componente (mentre opacity è 0, invisibile)
      // 2. fade-in del nuovo componente
      timer.current = setTimeout(() => {
        flushSync(() => setShown({ ...latest.current })); // render sincrono
        window.scrollTo(0, 0);
        setVisible(true); // inizia fade-in del nuovo componente
      }, FADE_OUT);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);

    return () => {
      clearTimeout(timer.current);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
    };
  }, [router.events]);

  const { Component: Shown, pageProps: shownProps } = shown;

  return (
    <div
      className={`${playfairDisplay.variable} ${inter.variable}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${visible ? FADE_IN : FADE_OUT}ms ease`,
      }}
    >
      <Shown {...shownProps} />
    </div>
  );
}
