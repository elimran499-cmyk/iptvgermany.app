import React, { useEffect } from 'react';
import { Award, Monitor, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { DurationPack, DURATION_PACKS, PACKAGE_TIERS, PackageTier } from '../data/catalog';
import { BRAND, CONTACT } from '../data/iptvData';
import { ChapterMark, PaymentRow, TriRule, WhatsAppGlyph } from './ui';

/* Three duration packs sit side by side as equal-height cards — one column
 * on phone, two at `md`, three at `lg` — in catalogue order (12+3 months is
 * `bestDeal` and sits first; the showcase treatment follows that flag, not a
 * position). Each keeps its own oversized animated price numeral and a
 * plain, hairline-divided feature list instead of check-chips. */

const formatEuro = (val: number) => `${val.toFixed(2).replace('.', ',')} €`;

const waLink = (message: string) => `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

/**
 * A price (or per-month figure) that rolls to its new value over ~0.45s,
 * ease-out — weighty and deliberate, never bouncy. Reused for every numeral
 * on the page so tier/device changes always read as a considered update, not
 * a jump cut. Never remounted on tier/device change (callers key on
 * `pack.id` only) — it stays mounted and this effect just retargets the
 * running tween, so the count never restarts from zero. Tabular numerals
 * keep digit widths fixed while the value counts, so nothing around it
 * jitters mid-tween. Reduced motion jumps straight to the value.
 */
const AnimatedEuro: React.FC<{ value: number; className?: string }> = ({ value, className }) => {
  const reduceMotion = !!useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => formatEuro(v));

  useEffect(() => {
    if (reduceMotion) {
      mv.jump(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduceMotion]);

  return <motion.span className={`tabular-nums ${className ?? ''}`}>{text}</motion.span>;
};

const DEVICE_COUNTS = [1, 2, 3, 4] as const;


export const Pricing: React.FC = () => {
  const [tier, setTier] = React.useState<PackageTier['id']>('basic');
  const [devices, setDevices] = React.useState<number>(1);
  const reduceMotion = !!useReducedMotion();

  const activeTier = PACKAGE_TIERS.find((t) => t.id === tier) ?? PACKAGE_TIERS[0];
  const isVip = tier === 'vip';

  const orderMessage = (label: string, price: number) =>
    `Hallo ${BRAND.full}! Ich möchte das Paket ${activeTier.name} — ${label} bestellen ` +
    `für ${devices} ${devices === 1 ? 'Gerät' : 'Geräte'} (${formatEuro(price)}). ` +
    `Könnt ihr mir die Zahlungsdaten und die Aktivierungsschritte schicken?`;

  return (
    <section id="pricing" className="relative overflow-hidden bg-tint py-12 sm:py-24">
      {/* Section wash — transitions between tiers rather than cutting. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(var(--brand-b-rgb), 0.12), transparent 70%)' }}
        animate={{ opacity: isVip ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <div className="blob blob-orange -left-20 top-10 h-[24rem] w-[24rem]" aria-hidden="true" />
      <div className="blob blob-magenta -right-24 bottom-0 h-[26rem] w-[26rem]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1240px] px-5">
        {/* Header — narrow measure, chapter mark, oversized headline */}
        <div className="mx-auto max-w-[70ch] text-center">
          <ChapterMark n={3} />
          <span className="eyebrow rounded-full border border-hairline bg-white px-4 py-2 shadow-soft">
            Transparente Preise • Keine versteckten Kosten
          </span>
          <h2 className="mt-3 text-[clamp(2.25rem,6vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
            Wähle dein <span className="text-gradient">Paket</span>
          </h2>
          <TriRule />
          <p className="measure mx-auto text-[15px] leading-relaxed text-muted">
            Paket wählen, uns eine WhatsApp schicken — deine Zugangsdaten stehen in 5 Minuten
            bereit. Jederzeit kündbar, kein Vertrag.
          </p>
        </div>

        {/* Tier switch — a pill slides between the two options with a
            shared layoutId; the background crossfades rather than snapping. */}
        <div className="mt-9 flex justify-center">
          <div className="relative inline-flex items-center gap-1 rounded-full border border-hairline bg-white p-1 shadow-soft">
            {PACKAGE_TIERS.map((t) => {
              const active = tier === t.id;
              const vipActive = t.id === 'vip' && active;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTier(t.id)}
                  className="relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold sm:px-7"
                >
                  {active && (
                    <motion.span
                      layoutId="tier-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: vipActive
                          ? 'linear-gradient(135deg,var(--color-orange),var(--color-magenta))'
                          : 'var(--color-tint)',
                        boxShadow: vipActive ? '0 10px 24px -12px rgba(var(--brand-b-deep-rgb), 0.55)' : 'none',
                      }}
                      transition={reduceMotion ? { duration: 0 } : { type: 'tween', duration: 0.32, ease: 'easeOut' }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${active ? (vipActive ? 'text-white' : 'text-ink') : 'text-muted'}`}>
                    {t.id === 'vip' && <Sparkles className={`h-4 w-4 ${active ? '' : 'opacity-60'}`} />}
                    {t.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reserved-height wash line — fades/rises rather than mounting and
            unmounting, so nothing below it snaps into place. */}
        <div className="mt-5 flex h-6 items-center justify-center">
          <motion.div
            className="flex items-center gap-2 text-orange-deep"
            animate={{ opacity: isVip ? 1 : 0, y: isVip ? 0 : -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              Komplettpaket — alles inklusive
            </span>
          </motion.div>
        </div>

        {/* Device selector — same sliding-pill treatment as the tier switch. */}
        <div className="mt-8 sm:mt-9">
          <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
            Wie viele Geräte gleichzeitig?
          </p>

          <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5 sm:hidden">
            {DEVICE_COUNTS.map((n) => {
              const active = devices === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setDevices(n)}
                  className="relative flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-2xl text-sm font-bold"
                >
                  {active && (
                    <motion.span
                      layoutId="device-pill-mobile"
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: 'linear-gradient(135deg,var(--color-orange),var(--color-magenta))' }}
                      transition={reduceMotion ? { duration: 0 } : { type: 'tween', duration: 0.28, ease: 'easeOut' }}
                    />
                  )}
                  {!active && <span className="absolute inset-0 rounded-2xl border border-hairline bg-white" />}
                  <span className={`relative z-10 flex items-center gap-2 ${active ? 'text-white' : 'text-muted'}`}>
                    <Monitor className="h-4 w-4" />
                    {n} {n === 1 ? 'Gerät' : 'Geräte'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden justify-center sm:flex">
            <div className="inline-flex items-center gap-1 rounded-full border border-hairline bg-white p-1 shadow-soft">
              {DEVICE_COUNTS.map((n) => {
                const active = devices === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setDevices(n)}
                    className="relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold"
                  >
                    {active && (
                      <motion.span
                        layoutId="device-pill-desktop"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(135deg,var(--color-orange),var(--color-magenta))' }}
                        transition={reduceMotion ? { duration: 0 } : { type: 'tween', duration: 0.28, ease: 'easeOut' }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-1.5 ${active ? 'text-white' : 'text-muted hover:text-ink'}`}>
                      <Monitor className="h-3.5 w-3.5" />
                      {n} {n === 1 ? 'Gerät' : 'Geräte'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side-by-side cards — one column on phone, two at `md`, three at
            `lg`, catalogue order preserved. `bestDeal` is whichever pack the
            data marks (currently 12+3 months, first); the showcase treatment
            follows the flag, not a grid position. */}
        <div className="mx-auto mt-14 grid grid-cols-1 items-stretch gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {DURATION_PACKS.map((pack, i) => (
            <PackCard
              key={pack.id}
              pack={pack}
              index={i + 1}
              tier={tier}
              devices={devices}
              isVip={isVip}
              activeTierName={activeTier.name}
              activeTierHeadline={activeTier.headline}
              features={activeTier.features}
              orderMessage={orderMessage}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Not sure banner */}
        <div className="relative mx-auto mt-14 flex max-w-[720px] flex-col items-center justify-between gap-4 rounded-[1.75rem] card-hairline p-5 sm:flex-row">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-wa text-white shadow-[0_10px_24px_-12px_rgba(37,211,102,0.6)]">
              <WhatsAppGlyph className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink">
                Du weißt nicht, welches Paket zu dir passt?
              </h4>
              <p className="mt-0.5 text-xs text-muted">
                Schreib uns per WhatsApp — wir finden gemeinsam die passende Laufzeit und die
                richtige Geräteanzahl.
              </p>
            </div>
          </div>
          <a
            href={waLink(`Hallo ${BRAND.full}! Welches Abo passt am besten zu mir?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn glass-btn-secondary flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-xs font-bold no-underline"
          >
            <WhatsAppGlyph className="h-4 w-4 text-wa" />
            Chat über WhatsApp
          </a>
        </div>

        {/* Trust / payment strip */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-col flex-wrap items-center justify-center gap-3 rounded-3xl card-hairline px-6 py-4 sm:flex-row sm:gap-6 sm:rounded-full sm:px-7 sm:py-3.5">
            <span className="flex items-center gap-2 text-[11px] text-muted sm:text-xs">
              <ShieldCheck className="h-4 w-4 text-orange-deep" /> Kreditkarte, PayPal, Überweisung
              oder Krypto
            </span>
            <span className="flex items-center gap-2 text-[11px] text-muted sm:text-xs">
              <Zap className="h-4 w-4 text-orange-deep" /> M3U- &amp; Xtream-Zugang über den Chat
            </span>
            <span className="flex items-center gap-2 text-[11px] text-muted sm:text-xs">
              <Award className="h-4 w-4 text-magenta-deep" /> 7 Tage Geld-zurück-Garantie
            </span>
          </div>
          <PaymentRow className="mx-auto mt-5 w-fit" />
        </div>
      </div>
    </section>
  );
};

interface PackCardProps {
  pack: DurationPack;
  index: number;
  tier: PackageTier['id'];
  devices: number;
  isVip: boolean;
  activeTierName: string;
  activeTierHeadline: string;
  features: string[];
  orderMessage: (label: string, price: number) => string;
  reduceMotion: boolean;
}

/**
 * One pack, one equal-height card in the 1/2/3-column grid. Always the same
 * DOM shape whether or not it is the showcase — the specular sweep and
 * gradient rim are always mounted, just toggled by an `is-active` class — so
 * the price counter never remounts (and loses its roll animation) when the
 * tier switch flips VIP on or off. The best-deal pack (wherever the data
 * puts it) gets the largest numeral and, only while VIP is active, the
 * showcase treatment: a slow specular sweep, a rotating gradient rim, and a
 * settled (not sprung) badge. `.price-card` adds a real, gated hover: the
 * whole card lifts with a deeper shadow, and hairline-bordered (non-best)
 * cards also warm their border colour — transform/box-shadow/border-color
 * only, disabled under `prefers-reduced-motion` in index.css.
 */
const PackCard: React.FC<PackCardProps> = ({
  pack,
  index,
  tier,
  devices,
  isVip,
  activeTierName,
  activeTierHeadline,
  features,
  orderMessage,
  reduceMotion,
}) => {
  const price = pack.prices[tier][devices - 1];
  const perMonth = price / pack.months;
  const best = !!pack.bestDeal;
  const showcase = best && isVip;

  const cta = (
    <a
      data-cta="order"
      href={waLink(orderMessage(pack.label, price))}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full text-sm font-bold no-underline ${
        best ? 'glass-btn glass-btn-primary' : 'glass-btn glass-btn-secondary'
      }`}
    >
      <WhatsAppGlyph className={`h-4 w-4 ${best ? '' : 'text-wa'}`} />
      Jetzt bestellen
    </a>
  );

  return (
    <article
      className={`price-card relative flex h-full flex-col rounded-[1.75rem] p-6 sm:p-8 ${
        best ? 'bg-tint' : 'card-hairline bg-surface'
      }`}
    >
      {best && <span aria-hidden="true" className={`gradient-rim ${showcase ? 'is-active' : ''}`} />}

      {best && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(155deg, rgba(var(--brand-a-rgb), 0.10) 0%, rgba(var(--brand-a-deep-rgb), 0.06) 45%, rgba(var(--brand-b-deep-rgb), 0.08) 100%)',
              opacity: showcase ? 1 : 0,
            }}
          />
          <span className={`specular-sweep ${showcase ? 'is-active' : ''}`} />
        </span>
      )}

      {/* Duration title with its chapter numeral riding beside it as a small
          marker, and the pack's own saving badge — every pack carries one,
          not just the best, so the three read apart at a glance. */}
      <div className="relative text-center">
        <div className="flex items-center justify-center gap-2.5 text-[11px] font-bold tracking-[0.3em] text-orange-deep">
          <span>{String(index).padStart(2, '0')}</span>
          <span aria-hidden="true" className="h-px w-5 bg-orange/40" />
          <span className="uppercase tracking-[0.22em]">{pack.label}</span>
        </div>

        <motion.span
          key={`${pack.id}-${isVip ? 'vip' : 'basic'}`}
          initial={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`mt-3 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] ${
            best
              ? showcase
                ? 'bg-white/70 text-orange-deep'
                : 'border border-orange/30 bg-orange/10 text-orange-deep'
              : 'border border-hairline bg-tint text-muted'
          }`}
        >
          {best ? `Bestes Angebot · -${pack.savePercent}%` : `-${pack.savePercent}%`}
        </motion.span>

        <div className="mt-4 flex flex-wrap items-end justify-center gap-x-3 gap-y-1">
          <AnimatedEuro
            value={price}
            className={`font-extrabold leading-none tracking-tight text-ink ${
              best ? 'text-[clamp(2.75rem,8vw,3.75rem)]' : 'text-[clamp(2.25rem,6.5vw,3.1rem)]'
            }`}
          />
        </div>
        <p className="mt-2 text-[13px] text-muted">
          ≈ <AnimatedEuro value={perMonth} className="font-semibold text-ink" /> / Monat
        </p>

        <p className="mt-3 flex items-center justify-center gap-2 text-[12px] font-semibold text-muted">
          <Monitor className="h-3.5 w-3.5 text-orange-deep" />
          {devices} {devices === 1 ? 'Gerät' : 'Geräte'}
        </p>
      </div>

      <div className="relative mt-6">{cta}</div>

      <div className="relative my-6 h-px bg-[var(--divider)]" aria-hidden="true" />

      <div className="relative flex items-center gap-2.5">
        <span className="shrink-0 rounded-full border border-hairline bg-tint px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-deep">
          {activeTierName}
        </span>
        <h4 className="text-[13px] font-bold text-ink">{activeTierHeadline}</h4>
      </div>

      {/* Keyed on `tier`, not on feature text — Basis and VIP share a few
          rows verbatim ("Alle Geräte"), and without the tier in the key
          React would reuse that DOM node across a tier switch and skip its
          enter animation entirely. Keying the whole list on tier forces
          every row to crossfade out/in and re-stagger on every switch,
          never on a device-count change (features don't depend on
          `devices`). Variants propagate from the <ul> so the rows stagger
          together instead of needing individual transitions. */}
      <AnimatePresence mode="popLayout">
        <motion.ul
          key={tier}
          className="relative mt-3 divide-y divide-[var(--divider)] border-t border-[var(--divider)] text-[13.5px]"
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          exit={reduceMotion ? undefined : 'exit'}
          variants={
            reduceMotion
              ? undefined
              : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.03 } },
                  exit: { transition: { staggerChildren: 0.015 } },
                }
          }
        >
          {features.map((feature, idx) => (
            <motion.li
              key={feature}
              variants={
                reduceMotion
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 6 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
                      exit: { opacity: 0, y: -4, transition: { duration: 0.18, ease: 'easeOut' } },
                    }
              }
              className={`feature-row -mx-2 flex items-baseline gap-3 rounded-lg px-2 py-2.5 ${
                idx < 2 ? 'font-semibold text-ink' : 'text-muted'
              }`}
            >
              <span className="text-orange-deep" aria-hidden="true">—</span>
              {feature}
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

    </article>
  );
};
