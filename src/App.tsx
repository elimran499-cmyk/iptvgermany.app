import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Channels } from './components/Channels';
import { FilmsSeries } from './components/FilmsSeries';
import { Pricing } from './components/Pricing';
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

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-page pb-[76px] font-sans text-ink sm:pb-0">
      <Navbar />

      <main>
        <Hero />
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
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
    </div>
  );
}
