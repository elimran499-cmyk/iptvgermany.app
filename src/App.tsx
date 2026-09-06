import React, { Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

/*
 * Nur Kopfzeile und Hero liegen im ersten Bundle — mehr sieht beim Aufschlagen
 * niemand. Alles darunter kommt als eigener Chunk.
 *
 * Das ist keine Verzoegerung auf Verdacht: die Chunks werden sofort
 * angefordert, weil die Komponenten direkt im Baum stehen. Der Browser darf
 * den Hero nur eben zeichnen, bevor sie da sind, statt erst das ganze
 * Programm zu parsen. Nebenbei faellt damit die Animationsbibliothek aus dem
 * kritischen Pfad: sie haengt nur noch am Preisblock (45 KB gzip), und der
 * steht ohnehin unterhalb des Falzes.
 *
 * Fuer Suchmaschinen aendert sich nichts Wesentliches: die Seite wird
 * ohnehin im Browser gerendert, und die Chunks laden unmittelbar mit — nicht
 * erst beim Scrollen.
 */
const Channels = lazy(() => import('./components/Channels').then((m) => ({ default: m.Channels })));
const FilmsSeries = lazy(() => import('./components/FilmsSeries').then((m) => ({ default: m.FilmsSeries })));
const Pricing = lazy(() => import('./components/Pricing').then((m) => ({ default: m.Pricing })));
const AppCompat = lazy(() => import('./components/AppCompat').then((m) => ({ default: m.AppCompat })));
const Benefits = lazy(() => import('./components/Benefits').then((m) => ({ default: m.Benefits })));
const BuySteps = lazy(() => import('./components/BuySteps').then((m) => ({ default: m.BuySteps })));
const HowItWorks = lazy(() => import('./components/HowItWorks').then((m) => ({ default: m.HowItWorks })));
const Comparison = lazy(() => import('./components/Comparison').then((m) => ({ default: m.Comparison })));
const Football = lazy(() => import('./components/Football').then((m) => ({ default: m.Football })));
const Reviews = lazy(() => import('./components/Reviews').then((m) => ({ default: m.Reviews })));
const FAQ = lazy(() => import('./components/FAQ').then((m) => ({ default: m.FAQ })));
const FinalCta = lazy(() => import('./components/FinalCta').then((m) => ({ default: m.FinalCta })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));
const FloatingWhatsApp = lazy(() => import('./components/FloatingWhatsApp').then((m) => ({ default: m.FloatingWhatsApp })));
const MobileCtaBar = lazy(() => import('./components/MobileCtaBar').then((m) => ({ default: m.MobileCtaBar })));

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-page pb-[76px] font-sans text-ink sm:pb-0">
      <Navbar />

      <main>
        <Hero />
        {/* Ein einziges Suspense um alles Nachgelagerte: `null` als Rueckfall,
            damit unterhalb des Falzes kein Platzhalter aufblitzt. */}
        <Suspense fallback={null}>
          <Channels />
          <FilmsSeries />
          <Pricing />
          <AppCompat />
          <Benefits />
          <BuySteps />
          <HowItWorks />
          <Comparison />
          <Football />
          <Reviews />
          <FAQ />
          <FinalCta />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <FloatingWhatsApp />
        <MobileCtaBar />
      </Suspense>
    </div>
  );
}
