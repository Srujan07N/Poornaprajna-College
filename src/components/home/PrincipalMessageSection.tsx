import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Quote, ArrowRight, ShieldCheck } from 'lucide-react';

export const PrincipalMessageSection: React.FC = () => {
  const { settings, setCurrentPage } = useCollege();
  const { principalMessage } = settings;

  return (
    <section className="py-20 lg:py-24 bg-[#F5F2EB] border-b border-stone-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Leadership Portrait Graphic / Profile (4 cols) */}
            <div className="lg:col-span-4 bg-[#1C1917] text-white p-8 sm:p-10 flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#DEB038] block mb-2">
                  Institutional Leadership
                </span>
                <h3 className="font-serif font-bold text-2xl text-white">
                  {principalMessage.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1 font-mono">
                  {principalMessage.qualifications}
                </p>
                <p className="text-xs text-[#DEB038] font-semibold mt-0.5">
                  {principalMessage.designation}
                </p>
              </div>

              {/* Dignified Academic Crest / Iconography */}
              <div className="py-8 flex items-center justify-center">
                <div className="w-28 h-28 rounded-2xl bg-[#6B1426] border-2 border-[#DEB038]/50 flex flex-col items-center justify-center text-center p-3 shadow-md">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
                    <ShieldCheck className="w-6 h-6 text-[#DEB038]" />
                  </div>
                  <span className="font-serif font-bold text-xs tracking-wider text-white">PPC UDUPI</span>
                  <span className="text-[9px] uppercase tracking-widest text-stone-300">Est. 1960</span>
                </div>
              </div>

              <div className="border-t border-stone-800 pt-4 text-stone-400 text-xs">
                <p className="font-sans">Poornaprajna College (Autonomous)</p>
                <p className="text-[11px] text-stone-400">Affiliated to Mangalore University</p>
              </div>
            </div>

            {/* Right: Letter from Principal's Desk (8 cols) */}
            <div className="lg:col-span-8 p-8 sm:p-12 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase">
                <Quote className="w-4 h-4 text-[#DEB038]" />
                <span>From the Principal's Desk</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                "Nurturing rigorous scholarship in harmony with ethical character."
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                {principalMessage.text.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-serif font-bold text-stone-900 block text-sm">
                    {principalMessage.name}
                  </span>
                  <span className="text-stone-500 text-xs">
                    Principal & Academic Council Chair
                  </span>
                </div>

                <button
                  onClick={() => setCurrentPage('about')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors"
                >
                  <span>Governing Body & Academic Council</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
