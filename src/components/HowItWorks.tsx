import React from 'react';
import { HOW_IMAGE, HOW_IT_WORKS, SEO } from '../data/iptvData';
import { Check, GlassButton, SectionHeading } from './ui';

export const HowItWorks: React.FC = () => {
  return (
  <section id="how" className="relative overflow-hidden bg-page py-12 sm:py-20">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-[0.16]"
      style={{ backgroundImage: `url('${HOW_IMAGE}')` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-page/92 via-page/88 to-page/95" />
    <div className="warm-wash-top" aria-hidden="true" />

    <div className="relative mx-auto max-w-[1180px] px-5">
      <SectionHeading
        index={7}
        eyebrow="So funktioniert es"
        sub={
          <>
            Mit dem <strong className="font-bold text-ink">IPTV-Abo</strong> genießt du das{' '}
            <strong className="font-bold text-ink">beste IPTV in Deutschland</strong>: schnelle
            Installation, HD/4K-Qualität, unbegrenztes VOD und Support rund um die Uhr.
          </>
        }
      >
        So funktioniert {SEO.keyword} — einfach, schnell und unbegrenzt
      </SectionHeading>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {HOW_IT_WORKS.map((step) => (
          <article key={step.id} className="card-lift rounded-2xl border border-hairline bg-tint/80 px-6 py-7 backdrop-blur-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-orange/40 bg-surface-2 text-lg font-extrabold text-orange-deep">
              {step.number}
            </span>
            <h3 className="mt-5 text-lg font-extrabold text-ink">{step.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{step.body}</p>
            <ul className="mt-4 space-y-2">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-[13.5px] text-muted">
                  <Check className="text-orange-deep" />
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <GlassButton variant="primary" size="lg" fullWidth className="sm:w-auto" href="#pricing">
          Preise ansehen
        </GlassButton>
        <GlassButton variant="ghost" size="lg" fullWidth className="sm:w-auto" href="#faq">
          FAQ
        </GlassButton>
      </div>
    </div>
  </section>
  );
};
