import React from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { TOTAL_VOD, VOD_TITLES } from '../data/catalog';
import { SectionHeading } from './ui';

/** One poster — 2:3, warm scrim over the lower third so the caption reads over
 *  any artwork. Fixed px width because it sits in a flex marquee track. */
const PosterTile: React.FC<{ title: (typeof VOD_TITLES)[number] }> = ({ title }) => (
  <article className="group relative aspect-[2/3] w-[134px] shrink-0 overflow-hidden rounded-2xl border border-hairline bg-tint shadow-soft transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-card sm:w-[168px]">
    <img
      src={title.poster}
      alt={`${title.title} (${title.year})`}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    />

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
      style={{
        background:
          'linear-gradient(180deg, rgba(var(--ink-rgb), 0) 0%, rgba(var(--brand-b-deep-rgb), 0.55) 55%, rgba(var(--ink-rgb), 0.92) 100%)',
      }}
    />

    <div className="absolute inset-x-0 bottom-0 p-3">
      <h3 className="truncate text-[12.5px] font-extrabold leading-tight text-white sm:text-[14px]">
        {title.title}
      </h3>
    </div>
  </article>
);

/**
 * One lane of the poster wall. Duplicated once so translateX(-50%) lands back
 * on the first copy and the loop is seamless. Reversed lane runs the catalogue
 * backwards so the two lanes never pass showing the same poster.
 */
/* The two visible rows must never show the same item at once, so the list is
 * split in half rather than reused whole — each row duplicates only its own
 * half in the DOM, purely to loop seamlessly. Duration scales with row length
 * so the drift speed stays constant however long the list grows. */
const HALF = Math.ceil(VOD_TITLES.length / 2);
const ROW_A = VOD_TITLES.slice(0, HALF);
const ROW_B = VOD_TITLES.slice(HALF);
const SECONDS_PER_TILE = 7.5;
const DURATION_A = `${Math.round(ROW_A.length * SECONDS_PER_TILE)}s`;
const DURATION_B = `${Math.round(ROW_B.length * SECONDS_PER_TILE * 1.13)}s`;

const PosterRow: React.FC<{ reverse?: boolean; reduceMotion: boolean }> = ({
  reverse,
  reduceMotion,
}) => {
  if (reduceMotion) {
    return (
      <div className="rail-snap flex gap-4 overflow-x-auto px-5 pb-1">
        {VOD_TITLES.map((title) => (
          <PosterTile key={title.id} title={title} />
        ))}
      </div>
    );
  }

  const list = reverse ? ROW_B : ROW_A;

  return (
    <div className="marquee-row overflow-hidden">
      <div
        className={`marquee-track flex w-max gap-4 will-change-transform ${
          reverse ? 'marquee-track-reverse' : ''
        }`}
        style={{ animationDuration: reverse ? DURATION_B : DURATION_A }}
      >
        {[...list, ...list].map((title, i) => (
          <PosterTile key={`${title.id}-${i}`} title={title} />
        ))}
      </div>
    </div>
  );
};

export const FilmsSeries: React.FC = () => {
  const reduceMotion = !!useReducedMotion();

  return (
    <section id="films" className="relative overflow-hidden bg-page py-12 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-5">
        <SectionHeading
          index={2}
          align="left"
          eyebrow="Filme & Serien"
          sub={
            <>
              <strong className="font-bold text-ink">{TOTAL_VOD} Filme &amp; Serien</strong>{' '}
              on demand — unten eine Auswahl aus dem Katalog, in{' '}
              <strong className="font-bold text-ink">HD/4K</strong> und stets aktuell.
            </>
          }
        >
          {TOTAL_VOD} Filme &amp; Serien
        </SectionHeading>
      </div>

      {/* Full-bleed wall — the wrapper clips so the doubled track never causes
          page-level horizontal scroll. */}
      <div className="relative mt-10 space-y-4 overflow-x-hidden sm:space-y-5">
        <PosterRow reduceMotion={reduceMotion} />
        <PosterRow reverse reduceMotion={reduceMotion} />
      </div>
    </section>
  );
};
