import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { ArrowRight, ShieldCheck, Clock, CheckCircle2, FileCheck } from 'lucide-react';
import { ApplicationTrackModal } from '../modals/ApplicationTrackModal';

export const AdmissionCTASection: React.FC = () => {
  const { settings, setCurrentPage } = useCollege();
  const [trackOpen, setTrackOpen] = useState(false);

  return (
    <section className="py-20 lg:py-24 bg-[#1C1917] text-white border-b border-stone-800 font-sans relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#6B1426]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#DEB038] tracking-widest uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>{settings.admissionStatus}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white max-w-2xl mx-auto leading-tight text-balance">
          Begin Your Academic Journey at Poornaprajna College
        </h2>

        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Applications for undergraduate and postgraduate autonomous admissions for Academic Year {settings.academicYear} are currently active. Apply through our verified online portal.
        </p>

        {/* Benefits ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-400 font-medium pt-2">
          <span className="flex items-center gap-1.5 text-stone-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#DEB038]" /> Autonomous Syllabus Design
          </span>
          <span className="flex items-center gap-1.5 text-stone-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#DEB038]" /> Well-Equipped Laboratories
          </span>
          <span className="flex items-center gap-1.5 text-stone-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#DEB038]" /> CA/CS Foundation Guidance
          </span>
          <span className="flex items-center gap-1.5 text-stone-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#DEB038]" /> Central Udupi Location
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setCurrentPage('admissions')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#6B1426] hover:bg-[#520F1D] text-white text-xs font-semibold shadow-md transition-all hover:translate-y-[-1px]"
          >
            <span>Start Online Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTrackOpen(true)}
            className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-lg border border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-200 text-xs font-semibold transition-colors"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#DEB038]" />
            <span>Track Submitted Application</span>
          </button>
        </div>
      </div>

      <ApplicationTrackModal isOpen={trackOpen} onClose={() => setTrackOpen(false)} />
    </section>
  );
};
