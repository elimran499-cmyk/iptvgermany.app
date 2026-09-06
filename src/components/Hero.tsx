import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BRAND, CONTACT, SEO } from '../data/iptvData';
import { ALL_CHANNELS, TOTAL_CHANNELS } from '../data/catalog';
import { GlassButton, WhatsAppGlyph } from './ui';

/** Three columns of channel logos, dealt round-robin so no column repeats a
 *  neighbour's rhythm. Each column list is used twice back-to-back — with
 *  `translateY(-50%)` cycling the track, the seam lands exactly on the
 *  duplicate and the drift reads as endless. The third column is dropped on
 *  phone (below `sm`) so the panel stays a modest strip and never dominates
 *  the fold. */
const COLUMN_COUNT = 3;
const CHANNEL_COLUMNS = Array.from({ length: COLUMN_COUNT }, (_, col) =>
  ALL_CHANNELS.filter((_, i) => i % COLUMN_COUNT === col),
);
/** Seconds for one full loop per column — deliberately uneven so the columns
 *  never line up, and never in lockstep with the middle one, which drifts
 *  the other way. Same calm pace as the Channels/FilmsSeries marquees. */
const COLUMN_DURATIONS = [24, 30, 20];

/* One uniform warm-dark plate for every logo — matches the Channels section:
   every remaining mark reads cleanly at luminance ≥0.34, and alternating
   white/dark plates read as a checkerboard, which the user flagged. */
const ChannelLogoTile: React.FC<{ channel: (typeof ALL_CHANNELS)[number] }> = ({ channel }) => (
  <div
    className="flex h-16 w-full shrink-0 items-center justify-center rounded-xl border border-[var(--ink-plate-border)] bg-[var(--ink-solid)] p-2 shadow-[0_10px_20px_-14px_rgba(var(--brand-a-deep-rgb), 0.4)] sm:h-20 sm:p-2.5"
    title={channel.name}
  >
    <img
      src={channel.logo}
      alt={channel.name}
      loading="lazy"
      decoding="async"
      className="h-full max-h-11 w-full object-contain sm:max-h-14"
    />
  </div>
);

/** The hero's motion centrepiece: 2–3 columns of channel logos drifting past
 *  a masked, rounded panel — "endless channels" without a video file. Freezes
 *  into a tidy static grid under reduced motion. Kept short and two-column on
 *  phone by design — it sits below the fold-critical headline and CTAs and
 *  must never compete with them. */
const ChannelDriftPanel: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  if (reduceMotion) {
    return (
      <div className="grid grid-cols-3 gap-3 p-4 sm:gap-4 sm:p-5">
        {ALL_CHANNELS.slice(0, 9).map((channel) => (
          <ChannelLogoTile key={channel.id} channel={channel} />
        ))}
      </div>
    );
  }

  return (
    <div className="channel-mask flex h-full gap-3 p-3 sm:gap-4 sm:p-5">
      {CHANNEL_COLUMNS.map((col, i) => (
        <div
          key={i}
          className={`flex-1 overflow-hidden ${i === 2 ? 'hidden sm:block' : ''}`}
        >
          <div
            className={`channel-col-track flex flex-col gap-3 will-change-transform sm:gap-4 ${
              i === 1 ? 'channel-col-track-reverse' : ''
            }`}
            style={{ animationDuration: `${COLUMN_DURATIONS[i]}s` }}
          >
            {[...col, ...col].map((channel, j) => (
              <ChannelLogoTile key={`${channel.id}-${j}`} channel={channel} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/** Compact trust chips — three short claims on one line, never a wrapping
 * block. Same copy the hero always carried, just reset as chips instead of a
 * bullet-separated sentence. */
/* Der dritte Chip trägt das Keyword der Seite — dieselbe Zeile, ein Wort
 * mehr Relevanz, ohne dass irgendwo Text doppelt steht. */
const TRUST_CHIPS = ['Sichere Zahlung', 'WhatsApp-Support', SEO.keyword];

export const Hero: React.FC = () => {
  const reduceMotion = !!useReducedMotion();
  const [readMore, setReadMore] = useState(false);
  /* Gibt className + animation-delay zurueck; die Kurve steht in index.css.
     Unter `prefers-reduced-motion` greift dort ohnehin `animation: none`,
     die Klasse kann also bleiben. */
  const rise = (delay: number) => ({
    className: 'rise',
    style: { animationDelay: `${Math.round(delay * 1000)}ms` },
  });

  return (
    <section id="top" className="relative overflow-hidden bg-page pb-14 pt-[4.75rem] sm:pb-20 sm:pt-16">
      {/* Warm blurred blobs — the glow that gives the glass CTAs and channel
          panel something to blur against. Opacity/position only, never blur
          radius, so this stays cheap on a phone. */}
      <div className="blob blob-orange -left-24 -top-24 h-[26rem] w-[26rem]" aria-hidden="true" />
      <div
        className="blob blob-magenta -right-28 top-24 h-[24rem] w-[24rem] sm:top-10"
        aria-hidden="true"
      />
      <div className="blob blob-orange bottom-[-8rem] left-1/3 h-[20rem] w-[20rem]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="text-left">
          {/* Kept off the phone fold entirely — one clear idea, no badge
              competing with the headline for attention there. */}
          <span
            className="rise eyebrow hidden rounded-full border border-hairline bg-surface/80 px-4 py-2 shadow-soft backdrop-blur-sm sm:inline-flex"
            style={{ animationDelay: '0ms' }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'linear-gradient(135deg,var(--color-orange),var(--color-magenta))' }}
            />
            Exklusive Angebote heute — sofortige Aktivierung
          </span>

          {/* Editorial headline — oversized, tight tracking, left-set so it
              breaks ragged-right rather than centring like a UI heading. */}
          <h1
            className="rise mt-2 text-[clamp(2.75rem,11vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-ink sm:mt-6"
            style={{ animationDelay: '80ms' }}
          >
            {SEO.h1Before} <span className="text-gradient">{BRAND.full}</span>
          </h1>

          {/* The one supporting line the fold gets — everything else moves
              to the measure block below the grid. */}
          <p
            className="rise mt-4 max-w-[46ch] text-[17px] font-semibold leading-snug text-orange-deep sm:mt-3 sm:text-[clamp(1.05rem,3vw,1.4rem)]"
            style={{ animationDelay: '160ms' }}
          >
            {SEO.tagline}
          </p>

          {/* One weighted pair, not two matching pills: the order CTA carries
              the row (flex-1, its own arrow), WhatsApp rides beside it as a
              compact circular affordance — a different shape language
              entirely, not a smaller copy of the same pill. Both clear the
              48px target; the circle is a true 60px tap area. */}
          <div className="rise mt-7 flex items-stretch gap-3 sm:mt-9 sm:max-w-[420px]" style={{ animationDelay: '240ms' }}>
            <GlassButton
              variant="primary"
              size="lg"
              className="min-h-[60px] flex-1 justify-between"
              href="#pricing"
            >
              Angebote ansehen
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </GlassButton>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kontakt über WhatsApp"
              title="WhatsApp"
              className="glass-btn glass-btn-secondary flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full text-wa"
            >
              <WhatsAppGlyph className="h-6 w-6" />
            </a>
          </div>

          {/* Trust row — three compact chips, one line, never a block. */}
          <div
            className="rise mt-6 flex flex-wrap items-center gap-1.5 sm:mt-8 sm:gap-2"
            style={{ animationDelay: '300ms' }}
          >
            {TRUST_CHIPS.map((chip) => (
              <span
                key={chip}
                className="whitespace-nowrap rounded-full border border-hairline bg-surface-2/70 px-2.5 py-1 text-[10.5px] font-bold tracking-wide text-muted sm:px-3 sm:text-[11px]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Channel drift panel — 2–3 columns of logos scrolling upward at
            different speeds, masked top/bottom, paused on hover/focus. Reads
            as "endless channels" and gives the hero real motion without a
            video file. Sits below the headline/CTAs in source order on
            phone, and is kept short there by design. Distinct from the
            Channels section's horizontal rows further down the page. */}
        <div
          className="rise channel-panel relative mx-auto h-[210px] w-full max-w-[420px] overflow-hidden rounded-[1.75rem] border border-hairline shadow-card sm:h-[300px] sm:rounded-[2rem] lg:h-auto lg:aspect-[4/5]"
          style={{
            animationDelay: '180ms',
            background: 'linear-gradient(180deg, var(--color-tint) 0%, #FFFFFF 60%)',
          }}
        >
          <ChannelDriftPanel reduceMotion={reduceMotion} />

          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-white/90 px-3.5 py-2.5 text-left shadow-soft backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:px-4 sm:py-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-deep sm:text-[11px]">
                Jetzt live
              </p>
              <p className="text-[12px] font-bold text-ink sm:text-[13px]">
                {TOTAL_CHANNELS} Sender • HD/4K
              </p>
            </div>
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            </span>
          </div>
        </div>
      </div>

      {/* Relocated intro/SEO copy — kept, word for word, but out of the fold
          and set at a proper editorial reading measure instead of stretched
          across a UI column. A hairline standfirst rule doubles as the seam
          between the "masthead" above and the rest of the page.
          On phone, set left (a centred paragraph at this width reads as a
          jagged little wall of text, not running copy) at a comfortable
          measure, and held to its lead sentence with the rest behind a
          "Lees meer" disclosure — a magazine standfirst, not the second
          thing a phone visitor has to read in full. From `sm` the full
          passage always shows, centred, as before. */}
      <div className="rise relative mx-auto mt-10 max-w-[1240px] px-5 sm:mt-20" style={{ animationDelay: '100ms' }}>
        <div className="measure mx-auto max-w-[38ch] border-t border-hairline pt-7 text-left sm:max-w-[64ch] sm:pt-10 sm:text-center">
          <p className="text-[15px] leading-7 text-muted sm:text-lg sm:leading-8">
            <span className="drop-cap" aria-hidden="true">E</span>
            <span className="sr-only">E</span>ntdecke das ultimative{' '}
            <strong className="font-bold text-ink">IPTV-Abo</strong> für{' '}
            <strong className="font-bold text-ink">IPTV Deutschland</strong>: tausende Sender, Filme,
            Serien und Live-Sport — alles in{' '}
            <strong className="font-bold text-ink">HD/4K-Qualität</strong>.
            <span className={`${readMore ? 'inline' : 'hidden'} sm:inline`}>
              {' '}
              Inklusive VOD, Replay und EPG. Einfach zu installieren auf Smart TV, Android, iOS, Fire
              Stick, Box &amp; PC. Mit unserem{' '}
              <strong className="font-bold text-ink">Premium-IPTV</strong> genießt du stabiles,
              pufferfreies Streaming und persönlichen Support an sieben Tagen die Woche.
            </span>
          </p>
          <button
            type="button"
            onClick={() => setReadMore((v) => !v)}
            aria-expanded={readMore}
            className="mt-2.5 inline-flex items-center gap-1 text-[13px] font-bold tracking-wide text-orange-deep sm:hidden"
          >
            {readMore ? 'Weniger lesen' : 'Mehr lesen'}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${readMore ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
