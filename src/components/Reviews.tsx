import React, { useState } from 'react';
import { BRAND, REVIEWS } from '../data/iptvData';
import { GlassButton, PullQuote, SectionHeading } from './ui';

const Stars: React.FC = () => (
  <span className="text-[15px] tracking-tight text-orange-deep" aria-label="5 von 5 Sternen">
    ★★★★★
  </span>
);

/* Auf dem Telefon standen alle acht Karten untereinander — gut 2.200px für
 * eine Sektion, die niemand vollständig liest. Drei bleiben sichtbar, der
 * Rest kommt auf Tippen; ab `sm` greift das Raster und alle acht stehen da.
 * Die verborgenen Karten bleiben im DOM, nur `hidden` — nichts geht für
 * Suchmaschinen oder Screenreader verloren. */
const REVIEW_PREVIEW = 3;

export const Reviews: React.FC = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  return (
  <section id="reviews" className="relative overflow-hidden bg-tint py-12 sm:py-20">
    <div className="warm-wash-top" aria-hidden="true" />
    <div className="relative mx-auto max-w-[1320px] px-5">
      <div className="text-center">
        <SectionHeading
          index={10}
          eyebrow="Kundenstimmen"
          sub={
            <>
              <strong className="font-bold text-ink">HD/4K</strong>-Qualität, sofortige Aktivierung
              und Support <strong className="font-bold text-ink">rund um die Uhr</strong> — das{' '}
              <strong className="font-bold text-ink">beste IPTV Deutschland</strong> und{' '}
              <a
                href="#pricing"
                className="font-bold text-orange-deep underline underline-offset-2"
              >
                IPTV Österreich
              </a>{' '}
              nach Aussage unserer Kunden.
            </>
          }
        >
          Sie vertrauen uns — <span className="text-orange-deep">{BRAND.full}</span>
        </SectionHeading>

        <GlassButton variant="primary" size="lg" className="mt-8" href="#pricing">
          Angebote und Preise ansehen
        </GlassButton>
      </div>

      {/* One review set large and left-set, breaking the centred rhythm of
          everything around it — a magazine pull-quote, not a dashboard
          stat. Deliberately narrower than the section (no mx-auto), so real
          asymmetric whitespace opens up beside it on wider screens. */}
      <PullQuote
        className="mt-14 sm:mt-16"
        quote={REVIEWS[0].comment}
        cite={`${REVIEWS[0].author} — ${REVIEWS[0].location}`}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {REVIEWS.map((review, idx) => (
          <figure
            key={review.id}
            className={`card-lift card-hairline flex-col rounded-2xl px-5 py-5 ${
              idx >= REVIEW_PREVIEW && !showAllReviews ? 'hidden sm:flex' : 'flex'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <Stars />
              <span className="rounded-md border border-hairline px-2.5 py-1 text-[11px] font-bold text-muted">
                Verifiziert
              </span>
            </div>
            <blockquote className="mt-3 flex-1 text-[14px] leading-relaxed text-ink/90">
              &ldquo;{review.comment}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2 text-[13px]">
              <span className="text-muted">—</span>
              <span className="font-bold text-ink">{review.author}</span>
              <span className="text-muted">{review.location}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {REVIEWS.length > REVIEW_PREVIEW && (
        <button
          type="button"
          onClick={() => setShowAllReviews((v) => !v)}
          aria-expanded={showAllReviews}
          className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl border border-hairline bg-surface text-[13.5px] font-bold text-orange-deep sm:hidden"
        >
          {showAllReviews ? 'Weniger anzeigen' : `Alle ${REVIEWS.length} Bewertungen lesen`}
        </button>
      )}
    </div>
  </section>
  );
};
