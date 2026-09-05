import React from 'react';
import { BUY_STEPS, SEO } from '../data/iptvData';
import { SectionHeading } from './ui';

export const BuySteps: React.FC = () => (
  <section id="schritte" className="bg-tint py-12 sm:py-20">
    <div className="mx-auto max-w-[1180px] px-5">
      <SectionHeading index={6} eyebrow="In 3 Schritten">
        {SEO.keyword} kaufen, aktivieren und schauen — in 3 Schritten
      </SectionHeading>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {BUY_STEPS.map((step) => (
          <article key={step.id} className="card-lift card-hairline rounded-2xl px-6 py-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-orange/40 bg-surface-2 text-lg font-extrabold text-orange-deep">
              {step.number}
            </span>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              <strong className="font-bold text-ink">{step.title}</strong>
              <br />
              {step.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
