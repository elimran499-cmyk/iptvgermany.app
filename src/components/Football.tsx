import React from 'react';
import { FOOTBALL_IMAGE } from '../data/iptvData';
import { ChapterMark, PullQuote } from './ui';

/** No heading-plus-paragraph preamble here — the existing headline and
 *  tagline carry the section on their own, reset as an asymmetric pull-quote
 *  breaking out of the centred rhythm every other section runs. The quote
 *  itself doubles as the section's heading (rendered `h1` when this is the
 *  page's subject), since nothing else here is a heading element. */
export const Football: React.FC = () => {
  const headingTag = 'h2' as const;
  return (
    <section id="sport" className="relative overflow-hidden bg-page py-12 sm:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.14]"
        style={{ backgroundImage: `url('${FOOTBALL_IMAGE}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-page/88 via-page/80 to-page/92" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(55% 60% at 50% 0%, rgba(var(--brand-a-rgb), 0.14), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1180px] px-5">
        <ChapterMark n={9} align="left" />
        <span className="eyebrow">Live-Sport</span>

        <PullQuote
          as={headingTag}
          className="mt-5"
          quote="Das Beste vom Fußball — dein IPTV-Abo"
          cite="Stabiles Streaming • HD/4K-Qualität • WhatsApp-Support 24/7"
        />
      </div>
    </section>
  );
};
