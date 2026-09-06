import { useEffect, useState } from 'react';

/**
 * `prefers-reduced-motion` als Hook — ohne Animationsbibliothek.
 *
 * Channels, FilmsSeries, Hero und Navbar brauchten von `motion/react` nichts
 * weiter als diese Abfrage und zogen dafuer 45 KB (gzip) in den kritischen
 * Pfad. Fuenf Zeilen matchMedia leisten dasselbe.
 *
 * Startwert `false`, damit Server- und Erstauslieferung uebereinstimmen; der
 * Effekt korrigiert ihn vor dem ersten Frame, in dem etwas animiert wird.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
