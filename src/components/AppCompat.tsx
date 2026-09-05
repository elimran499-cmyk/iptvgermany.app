import React from 'react';
import { APP_LOGOS, SEO } from '../data/iptvData';
import { SectionHeading } from './ui';

export const AppCompat: React.FC = () => (
  <section id="apps" className="bg-page py-12 sm:py-20">
    <div className="mx-auto max-w-[1180px] px-5">
      <SectionHeading
        index={4}
        eyebrow="Kompatibilität"
        sub={
          <>
            Genieße das beste <strong className="font-bold text-ink">IPTV Deutschland</strong> in{' '}
            <strong className="font-bold text-ink">HD/4K</strong> mit einer denkbar einfachen
            Einrichtung. Unser <strong className="font-bold text-ink">IPTV-Abo</strong> läuft mit den
            gängigsten Apps auf <strong className="font-bold text-ink">Smart TV</strong>,{' '}
            <strong className="font-bold text-ink">Android</strong>,{' '}
            <strong className="font-bold text-ink">iOS</strong>, Box &amp; PC.
          </>
        }
      >
        {SEO.keyword} — kompatibel mit deinen Lieblings-Apps
      </SectionHeading>

      <div className="mx-auto mt-10 grid max-w-[1000px] grid-cols-2 gap-4 sm:grid-cols-4">
        {APP_LOGOS.map((app) => (
          <div
            key={app.id}
            className="card-lift flex h-[74px] items-center justify-center rounded-xl bg-tint px-4 shadow-soft"
          >
            {app.logo ? (
              <img
                src={app.logo}
                alt={app.name}
                loading="lazy"
                decoding="async"
                className="max-h-[40px] w-auto max-w-full object-contain"
              />
            ) : (
              <span className="text-center text-[13px] font-extrabold" style={{ color: app.color }}>
                {app.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
