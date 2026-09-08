/**
 * SSR-Einstiegspunkt fuer den Prerender-Schritt.
 *
 * Wird von Vite als eigenes Bundle fuer Node gebaut (`vite build --ssr`).
 * Der Umweg ueber Vite ist noetig, weil die Komponenten Bilder importieren
 * (`import logoMark from '../assets/logo-mark.png'`) — Node kann .png und
 * .webp nicht laden, Vite loest sie zu den fertigen Asset-URLs auf.
 *
 * `prerenderToNodeStream` statt `renderToString`: der Preisblock haengt an
 * einem React.lazy hinter einer Suspense-Grenze mit `fallback={null}`.
 * renderToString gaebe genau dieses null aus und der Preisblock fehlte im
 * HTML. Die static-API wartet die Grenze aus.
 */
import { prerenderToNodeStream } from 'react-dom/static';
import App from './App';

export async function render(): Promise<string> {
  const { prelude } = await prerenderToNodeStream(<App />);
  return new Promise<string>((resolve, reject) => {
    let out = '';
    prelude.setEncoding('utf8');
    prelude.on('data', (c: string) => { out += c; });
    prelude.on('end', () => resolve(out));
    prelude.on('error', reject);
  });
}
