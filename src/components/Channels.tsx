import React from 'react';
import { useReducedMotion } from 'motion/react';
import { Channel, CHANNELS_DOCS, CHANNELS_FAMILY_SPORT, TOTAL_CHANNELS } from '../data/catalog';
import { SEO } from '../data/iptvData';
import { SectionHeading } from './ui';

/** One logo tile — one uniform warm-dark plate for every mark. Every
 *  remaining logo (post-curation) measures at least 0.34 luminance, so a
 *  single dark plate reads cleanly for all of them; alternating white/dark
 *  plates read as a checkerboard, which the user flagged. `tone` stays in
 *  the data as accurate metadata — it just no longer picks the plate. */
const ChannelTile: React.FC<{ channel: Channel }> = ({ channel }) => (
  <div
    className="flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-[var(--ink-plate-border)] bg-[var(--ink-solid)] p-3 shadow-[0_14px_28px_-18px_rgba(var(--brand-a-deep-rgb), 0.35)] sm:h-28 sm:w-52 sm:p-4"
    title={channel.name}
  >
    <img
      src={channel.logo}
      alt={channel.name}
      loading="lazy"
      decoding="async"
      className="h-full max-h-16 w-full object-contain sm:max-h-20"
    />
  </div>
);

const SECONDS_PER_TILE = 7.5;
/* Conservative tile-width-plus-gap estimate (desktop size), used only to size
 * the loop safely — not for actual layout. */
const TILE_UNIT_PX = 192;
/* One loop period must comfortably exceed the widest realistic viewport, or
 * the seam shows a gap of bare tint before the track catches up. */
const MIN_PERIOD_PX = 2600;

/** How many times a strip's list must be repeated in the DOM so that half of
 * the rendered track (the distance `translateX(-50%)` actually travels)
 * still exceeds `MIN_PERIOD_PX`. Always even, always at least 2 — the
 * seamless-loop trick needs at least one full duplicate. */
const repeatsFor = (length: number) => {
  const listWidth = length * TILE_UNIT_PX;
  const needed = Math.ceil((2 * MIN_PERIOD_PX) / listWidth);
  const even = needed % 2 === 0 ? needed : needed + 1;
  return Math.max(2, even);
};

/**
 * One labelled strip — a heading plus its own seamless marquee row. TV and
 * Sport are genuinely different lists now (not two halves of one list), so
 * each strip repeats its own full list enough times to stay gapless, and the
 * two strips run in opposite directions for contrast. Falls back to a normal
 * snap-scrollable row (no duplicates) under prefers-reduced-motion.
 */
const MarqueeStrip: React.FC<{
  label: string;
  list: Channel[];
  reverse?: boolean;
  reduceMotion: boolean;
}> = ({ label, list, reverse, reduceMotion }) => {
  const repeats = repeatsFor(list.length);
  // Duration scales with the actual distance travelled (half the rendered
  // track) so the drift speed stays the same calm pace regardless of how
  // many copies the seam-safety calculation needed.
  const duration = `${Math.round((repeats / 2) * list.length * SECONDS_PER_TILE)}s`;

  return (
    <div>
      <p className="mx-auto max-w-[1320px] px-5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-deep">
        {label}
      </p>

      {reduceMotion ? (
        <div className="rail-snap mt-3 flex gap-4 overflow-x-auto px-5 pb-1">
          {list.map((channel) => (
            <ChannelTile key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="marquee-row mt-3 overflow-hidden">
          <div
            className={`marquee-track flex w-max gap-4 will-change-transform ${
              reverse ? 'marquee-track-reverse' : ''
            }`}
            style={{ animationDuration: duration }}
          >
            {Array.from({ length: repeats }).flatMap((_, r) =>
              list.map((channel, i) => (
                <ChannelTile key={`${channel.id}-${r}-${i}`} channel={channel} />
              )),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const Channels: React.FC = () => {
  const reduceMotion = !!useReducedMotion();

  return (
    <section id="channels" className="relative overflow-hidden bg-tint py-12 sm:py-20">
      <div className="warm-wash-top" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px] px-5">
        <SectionHeading
          index={1}
          align="left"
          eyebrow="Sender"
          sub={
            <>
              <strong className="font-bold text-ink">{SEO.keyword}</strong> mit{' '}
              <strong className="font-bold text-ink">{TOTAL_CHANNELS} Sendern</strong> weltweit —
              unten eine Auswahl aus dem deutschen Programm: Discovery, National Geographic, HISTORY,
              Eurosport, Comedy Central, Disney Channel und mehr, alle in{' '}
              <strong className="font-bold text-ink">HD/4K</strong>.
            </>
          }
        >
          {TOTAL_CHANNELS} Sender — deutsche Sender zuerst
        </SectionHeading>
      </div>

      <div className="relative mt-10 space-y-8 sm:space-y-10">
        <MarqueeStrip label="Doku & Unterhaltung" list={CHANNELS_DOCS} reduceMotion={reduceMotion} />
        <MarqueeStrip
          label="Sport, Musik & Familie"
          list={CHANNELS_FAMILY_SPORT}
          reverse
          reduceMotion={reduceMotion}
        />
      </div>
    </section>
  );
};
