import React from 'react';
import { useCollege } from '../../context/CollegeContext';

export const HighlightsSection: React.FC = () => {
  const { settings } = useCollege();

  const highlights = [
    { label: 'Foundation Year', value: `Est. ${settings.establishedYear}`, sub: 'By Sri Admar Mutt Council' },
    { label: 'Academic Standing', value: 'Autonomous Status', sub: 'Conferred by UGC' },
    { label: 'Academic Divisions', value: 'Arts · Science · Commerce', sub: 'Management & Computer Apps' },
    { label: 'Education Scope', value: 'UG & PG Programmes', sub: 'B.Com, B.Sc, BCA, M.Com, M.Sc' },
    { label: 'Campus Location', value: 'Volakadu, Udupi', sub: 'Coastal Karnataka, 576101' }
  ];

  return (
    <section className="bg-[#F5F2EB] border-b border-stone-200/80 font-sans py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-stone-300/60">
          {highlights.map((item, idx) => (
            <div key={idx} className={`pt-3 lg:pt-0 ${idx !== 0 ? 'lg:pl-6' : ''}`}>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-0.5">
                {item.label}
              </span>
              <p className="font-serif font-bold text-stone-900 text-base leading-tight">
                {item.value}
              </p>
              <span className="text-[11px] text-stone-500 block mt-0.5">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
