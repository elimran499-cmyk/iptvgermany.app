import React, { Suspense, lazy, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Channels } from './components/Channels';
import { FilmsSeries } from './components/FilmsSeries';
import { AppCompat } from './components/AppCompat';
import { Benefits } from './components/Benefits';
import { BuySteps } from './components/BuySteps';
import { HowItWorks } from './components/HowItWorks';
import { Comparison } from './components/Comparison';
import { Football } from './components/Football';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileCtaBar } from './components/MobileCtaBar';

/*
 * Genau eine Aufteilung, und zwar diese: der Preisblock ist das einzige Stueck,
 * das die Animationsbibliothek wirklich braucht (Schiebe-Pille, Preiszaehler).
 * Als eigener Chunk bleiben deren 45 KB gzip aus dem kritischen Pfad.
 *
 * Alles andere laedt eager. Eine frühere Fassung hatte jeden Abschnitt einzeln
 * verzoegert — 24 JS-Chunks, der letzte lokal erst nach 2,6 s. Auf dem Telefon
 * sind das zwei Dutzend zusaetzliche Rundreisen, und mit `fallback={null}`
 * stand unter dem Hero solange Leere, in die die Abschnitte einzeln
 * hereinpoppten. Vier Anfragen und eine geschlossene Darstellung sind auf
 * einem Mobilfunknetz klar besser als neun eingesparte Kilobyte.
 */
const Pricing = lazy(() => import('./components/Pricing').then((m) => ({ default: m.Pricing })));

/**
 * Meldet der HTML-Huelle, dass die Seite steht.
 *
 * Setzt ein Attribut *und* feuert ein Event, beides sofort und ohne
 * requestAnimationFrame: die frühere Fassung wartete zwei Frames und raeumte
 * den rAF im Cleanup wieder ab — setzte die Suspense-Grenze zwischendurch aus,
 * verwarf React den Effekt und der Frame kam nie. Der Vorspann hing dann bis
 * zum Notausstieg. Das Attribut ueberlebt jedes Aus- und Wiedereinhaengen.
 */
const Ready: React.FC = () => {
  useEffect(() => {
    document.documentElement.dataset.appReady = '1';
    window.dispatchEvent(new Event('app-ready'));
  }, []);
  return null;
};

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-page pb-[76px] font-sans text-ink sm:pb-0">
      <Navbar />

      <main>
        <Hero />
        <Channels />
        <FilmsSeries />
        {/* Der Vorspann liegt darueber, bis auch dieser Chunk da ist —
            `Ready` steht innerhalb derselben Grenze. */}
        <Suspense fallback={null}>
          <Pricing />
          <Ready />
        </Suspense>
        <AppCompat />
        <Benefits />
        <BuySteps />
        <HowItWorks />
        <Comparison />
        <Football />
        <Reviews />
        <FAQ />
        <FinalCta />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
    </div>
  );
}
