/**
 * Schreibt das gerenderte Markup in dist/index.html.
 *
 * Vite liefert ein leeres <div id="root"></div> aus — der gesamte Text
 * entsteht erst, wenn React im Browser laeuft. Googlebot rendert JavaScript
 * zwar, aber in einer zweiten, verzoegerten Welle; Bing und die KI-Crawler
 * tun es gar nicht. Da die Seite keine nutzerabhaengigen Daten kennt, ist das
 * Ergebnis fuer jeden Besucher identisch und laesst sich zur Bauzeit einmal
 * erzeugen.
 *
 * Kein Framework-Wechsel, kein Server: das Ergebnis bleibt eine statische
 * Datei, die Vercel wie bisher ausliefert.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const file = path.resolve('dist/index.html');
const html = fs.readFileSync(file, 'utf8');

const LEER = '<div id="root"></div>';
if (!html.includes(LEER)) {
  throw new Error(`Anker ${LEER} nicht in dist/index.html gefunden — Prerender abgebrochen.`);
}

const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const markup = await render();

fs.writeFileSync(file, html.replace(LEER, `<div id="root">${markup}</div>`), 'utf8');

const woerter = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
console.log(`  prerender: ${markup.length} Zeichen Markup, ~${woerter} Woerter in dist/index.html`);
