import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Microscope, BookOpen, GraduationCap, ArrowRight, FileCheck } from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const { setCurrentPage } = useCollege();

  const initiatives = [
    {
      title: 'Undergraduate Research Mentorship',
      desc: 'Encouraging final-year B.Sc., B.C.A., and B.Com students to formulate empirical investigations and present posters at regional and national conferences.'
    },
    {
      title: 'Postgraduate Mathematics Dissertations',
      desc: 'Research dissertations in graph theory, topology, differential geometry, and scientific computing under guided faculty supervision.'
    },
    {
      title: 'Faculty Research & Peer Publications',
      desc: 'Faculty publications indexed in UGC-CARE, Scopus, and peer-reviewed scholarly journals across Commerce, Physical Sciences, and Humanities.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#F5F2EB] border-b border-stone-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
              <span>Academic Inquiry</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Research Cell</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Research & Scholarly Innovation
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Promoting an investigative spirit among collegiate faculty and students under autonomous guidelines.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('research')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors self-start md:self-auto"
          >
            <span>Research Committee & Papers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initiatives.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center mb-3">
                  <Microscope className="w-4 h-4" />
                </div>

                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Autonomous Faculty Guided</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
