import React, { useState } from 'react';
import {
  Euro,
  Headphones,
  Infinity as InfinityIcon,
  List,
  Monitor,
  RefreshCw,
  Smartphone,
  Star,
  Trophy,
  Zap,
} from 'lucide-react';
import { BRAND, COMPARISON_ROWS, WHY_CARDS } from '../data/iptvData';
import { ChapterMark, Check, Cross, TriRule, WhatsAppGlyph } from './ui';

const ROW_ICONS: Record<string, React.ReactNode> = {
  zap: <Zap className="h-4 w-4" />,
  monitor: <Monitor className="h-4 w-4" />,
  smartphone: <Smartphone className="h-4 w-4" />,
  list: <List className="h-4 w-4" />,
  football: <Trophy className="h-4 w-4" />,
  whatsapp: <WhatsAppGlyph className="h-4 w-4" />,
  euro: <Euro className="h-4 w-4" />,
  refresh: <RefreshCw className="h-4 w-4" />,
};

const WHY_ICONS = [
  <InfinityIcon key="i" className="h-5 w-5" />,
  <Star key="s" className="h-5 w-5" />,
  <Headphones key="h" className="h-5 w-5" />,
];

/* Wie bei Preisen und Bewertungen: auf dem Telefon vier Kriterien zeigen,
 * die übrigen vier auf Tippen. Ab `sm` ersetzt die echte Tabelle diese
 * Liste ohnehin. */
const ROW_PREVIEW = 4;

export const Comparison: React.FC = () => {
  const [showAllRows, setShowAllRows] = useState(false);
  return (
  <section id="warum" className="bg-tint py-12 sm:py-20">
    <div className="mx-auto max-w-[1180px] px-5">
      {/* Chapter 8 in the running order — same editorial rhythm as every
          other section: numbered mark, eyebrow, oversized tight-tracked
          headline, rule. */}
      <div className="text-center">
        <ChapterMark n={8} />
        <span className="eyebrow">Vergleich</span>
        <h2 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
          <span className="text-gradient">{BRAND.full}</span>{' '}
          <span className="text-ink">— warum wir?</span>
        </h2>
        <TriRule />
      </div>

      {/* Phones: stacked cards — a 640px-wide table forced to scroll is not
          a restack, so below sm it becomes a real list instead. */}
      <div className="mt-8 space-y-2.5 sm:hidden">
        {COMPARISON_ROWS.map((row, idx) => (
          <div
            key={row.id}
            className={`card-hairline rounded-2xl p-3.5 ${
              idx >= ROW_PREVIEW && !showAllRows ? 'hidden' : ''
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-orange-deep">
                {ROW_ICONS[row.iconName]}
              </span>
              <span className="text-[13.5px] font-bold leading-snug text-ink">{row.criterion}</span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <span className="flex items-center justify-center gap-1.5 rounded-lg bg-orange/10 py-1.5 text-[10.5px] font-bold text-orange-deep">
                <Check className="text-success" /> {BRAND.full}
              </span>
              <span className="flex items-center justify-center gap-1.5 rounded-lg bg-hairline/40 py-1.5 text-[10.5px] font-bold text-muted">
                <Cross /> Andere
              </span>
            </div>
          </div>
        ))}

        {COMPARISON_ROWS.length > ROW_PREVIEW && (
          <button
            type="button"
            onClick={() => setShowAllRows((v) => !v)}
            aria-expanded={showAllRows}
            className="flex min-h-[44px] w-full items-center justify-center rounded-xl border border-hairline bg-surface text-[13.5px] font-bold text-orange-deep"
          >
            {showAllRows
              ? 'Weniger anzeigen'
              : `Alle ${COMPARISON_ROWS.length} Kriterien anzeigen`}
          </button>
        )}
      </div>

      {/* sm and up: the real comparison table. */}
      <div className="mt-8 hidden overflow-hidden rounded-2xl card-hairline sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-hairline">
                <th className="px-6 py-5 text-[15px] font-bold text-ink">Wichtige Kriterien</th>
                <th className="border-b-[3px] border-orange bg-surface-2 px-6 py-5 text-center text-[15px] font-bold text-orange-deep">
                  {BRAND.full} (IPTV Deutschland)
                </th>
                <th className="px-6 py-5 text-center text-[15px] font-bold text-muted">
                  Andere Anbieter
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-hairline last:border-0">
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-orange-deep">
                        {ROW_ICONS[row.iconName]}
                      </span>
                      <span className="text-[14.5px] font-bold text-ink">{row.criterion}</span>
                    </span>
                  </td>
                  <td className="bg-surface-2/40 px-6 py-4 text-center">
                    <span className="inline-flex justify-center">
                      <Check className="text-success" />
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex justify-center">
                      <Cross />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {WHY_CARDS.map((card, i) => (
          <article key={card.id} className="card-lift card-hairline rounded-2xl px-6 py-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-orange/40 bg-surface-2 text-orange-deep">
              {WHY_ICONS[i]}
            </span>
            <h3 className="mt-4 text-[17px] font-extrabold text-ink">{card.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};
