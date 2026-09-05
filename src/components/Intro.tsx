import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BRAND } from '../data/iptvData';
import { LogoMark } from './ui';

/* Branded intro — a short title card that plays on every load, never gated
 * behind localStorage/sessionStorage/a cookie because the user wants it
 * every single time. ~1.5s total including the fade-out, skippable by any
 * click/tap/key/scroll, and it never blocks the real page underneath: App
 * renders normally from the first paint, this is purely a fixed overlay on
 * top of it that unmounts itself. Animates transform/opacity (and, for the
 * one deliberate typographic flourish — the wordmark's letter-spacing
 * settling — a short, non-looping letter-spacing tween) only; disabled
 * entirely under prefers-reduced-motion.
 *
 * Reliability: the effect's cleanup always restores `body.style.overflow`
 * itself — it does not solely depend on AnimatePresence's `onExitComplete`
 * firing. If the component is ever removed before the exit transition runs
 * (a hot reload mid-intro, a fast unmount), the page must never end up
 * permanently unscrollable. */

const HOLD_MS = 1100;
const FADE_MS = 400;

export const Intro: React.FC = () => {
  const reduceMotion = !!useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion) return;

    document.body.style.overflow = 'hidden';

    const holdTimer = window.setTimeout(() => setVisible(false), HOLD_MS);

    let skipped = false;
    const skip = () => {
      if (skipped) return;
      skipped = true;
      window.clearTimeout(holdTimer);
      setVisible(false);
    };
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener('pointerdown', skip, opts);
    window.addEventListener('keydown', skip);
    window.addEventListener('wheel', skip, opts);
    window.addEventListener('touchstart', skip, opts);

    return () => {
      window.clearTimeout(holdTimer);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchstart', skip);
      // Defensive restore — see note above. Idempotent alongside
      // onExitComplete's own reset below.
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  // Never animate under reduced motion — skip the overlay entirely.
  if (reduceMotion) return null;

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = ''; }}>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'var(--ink-solid)' }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <LogoMark className="h-12 w-12" gradientId="mytvGradIntro" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.55em' }}
              animate={{ opacity: 1, letterSpacing: '0.02em' }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 flex items-baseline text-[22px]"
            >
              <span className="font-extrabold text-white">{BRAND.mark1}</span>
              <span className="font-medium text-white/70">{BRAND.mark2}</span>
            </motion.div>

            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
              className="mt-4 h-px w-24 origin-left"
              style={{ background: 'linear-gradient(90deg, transparent, var(--color-orange), var(--color-magenta), transparent)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
