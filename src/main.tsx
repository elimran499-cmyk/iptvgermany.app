import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {trackConversions} from './conversions';

// Counts WhatsApp and order CTA clicks as Google Ads conversions.
trackConversions();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Der Vorspann steht in index.html und zeichnet mit dem ersten Byte, lange
// bevor dieses Bundle da ist. Er wartet auf dieses Signal — nicht auf eine
// feste Zeit —, damit er exakt so lange bleibt, wie das Laden wirklich
// dauert. Zwei Frames Vorlauf, damit der erste Anstrich der Seite steht,
// bevor die Ueberblendung startet.
requestAnimationFrame(() => {
  requestAnimationFrame(() => window.dispatchEvent(new Event('app-ready')));
});
