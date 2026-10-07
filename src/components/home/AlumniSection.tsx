import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Quote, ArrowRight, HeartHandshake, Briefcase } from 'lucide-react';

export const AlumniSection: React.FC = () => {
  const { alumni, setCurrentPage } = useCollege();
  const approvedAlumni = alumni.filter(a => a.isApproved);

  return (
    <section className="py-20 lg:py-24 bg-[#FCFBF7] border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
              <span>Six Decades of Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Global Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Poornaprajna Alumni Network
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Spanning civil servants, scientists, corporate leaders, chartered accountants, and academicians across the world.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('alumni')}
              className="px-4 py-2 rounded-lg bg-[#6B1426] hover:bg-[#520F1D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Join Alumni Association</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approvedAlumni.map((alum) => (
            <div
              key={alum.id}
              className="bg-white rounded-xl border border-stone-200/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-[#DEB038]/60" />

                <p className="text-stone-700 italic text-sm leading-relaxed font-serif">
                  "{alum.testimonial}"
                </p>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">{alum.fullName}</h4>
                    <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="w-3 h-3 text-stone-400" />
                      <span>{alum.currentDesignation} · {alum.currentCompanyOrInstitute}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-semibold text-[#7E192E] block">Batch {alum.batchYear}</span>
                    <span className="text-[11px] text-stone-400 block">{alum.courseStudied}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
