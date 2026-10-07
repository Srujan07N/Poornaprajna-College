import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { ArrowRight, BookOpen, Compass, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { settings, setCurrentPage } = useCollege();

  return (
    <section className="relative bg-[#1C1917] text-[#FCFBF7] overflow-hidden border-b border-stone-800">
      {/* Cinematic Collegiate Background Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="collegiate-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(222, 176, 56, 0.4)" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#collegiate-grid)" />
        </svg>
      </div>

      {/* Subtle Ambient Radial Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6B1426]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#DEB038]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl space-y-6">
          {/* Institutional Kicker without static pill enclosure */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#DEB038] tracking-widest uppercase">
            <span>Poornaprajna College</span>
            <span aria-hidden="true">·</span>
            <span>Autonomous</span>
            <span aria-hidden="true">·</span>
            <span>Udupi</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] text-balance">
            {settings.tagline}
          </h1>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl font-sans">
            Founded in 1960 under the spiritual aegis of Sri Admar Mutt Education Council, Poornaprajna College combines six decades of academic prestige with autonomous curricular dynamism in coastal Karnataka.
          </p>

          {/* Institutional Trust markers */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-400 font-medium pt-1">
            <span className="flex items-center gap-1.5 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-[#DEB038]" /> Conferred Autonomous Status
            </span>
            <span aria-hidden="true">·</span>
            <span>Re-accredited by NAAC</span>
            <span aria-hidden="true">·</span>
            <span>Mangalore University Affiliation</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => setCurrentPage('admissions')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6B1426] hover:bg-[#520F1D] text-white text-xs font-semibold shadow-md transition-all hover:translate-y-[-1px]"
            >
              <span>Apply for Admissions (2026–27)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentPage('academics')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-200 text-xs font-semibold transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#DEB038]" />
              <span>Explore Academics</span>
            </button>

            <button
              onClick={() => setCurrentPage('about')}
              className="inline-flex items-center gap-1.5 px-4 py-3 text-stone-400 hover:text-white text-xs font-semibold transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Discover Our Heritage</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
