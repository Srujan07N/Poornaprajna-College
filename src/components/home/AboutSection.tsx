import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { ArrowRight, BookOpen, ShieldCheck, History } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings, setCurrentPage } = useCollege();

  return (
    <section className="py-20 lg:py-24 bg-[#FCFBF7] border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Context (5 columns) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase">
              <span>Heritage & Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Ethos</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              An Institution Rooted in Excellence
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed">
              Poornaprajna College was founded to bridge sacred Indian traditions of character formation with empirical scientific inquiry and modern professional competencies.
            </p>

            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center shrink-0 mt-0.5">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Sri Admar Mutt Education Council</h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Steered under the visionary leadership of H.H. Sri Vibhudhesha Theertha Swamiji, establishing colleges, schools, and research centers across India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Academic Autonomy with Mangalore University</h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Autonomous freedom to innovate syllabi, conduct timely examinations, and introduce industry-aligned specializations under the National Education Policy.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('about')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors"
              >
                <span>Read Institutional History & Leadership</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Essay Narrative with Drop Cap (7 columns) */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 leading-relaxed text-sm">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F2EB] border border-stone-200/80 space-y-4">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#6B1426] first-letter:float-left first-letter:mr-3 first-letter:mt-1 leading-relaxed">
                {settings.aboutSummary[0]}
              </p>

              {settings.aboutSummary[1] && (
                <p className="leading-relaxed">
                  {settings.aboutSummary[1]}
                </p>
              )}

              <div className="pt-4 border-t border-stone-300/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 text-[11px] block">Campus Spread</span>
                  <span className="font-serif font-bold text-stone-900 text-sm">Volakadu Campus</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[11px] block">Central Library</span>
                  <span className="font-serif font-bold text-stone-900 text-sm">50,000+ Volumes</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[11px] block">NAAC Grade</span>
                  <span className="font-serif font-bold text-stone-900 text-sm">Re-accredited</span>
                </div>
              </div>
            </div>

            {/* Quick sub-pages pills / links */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-stone-500 mr-2">Institutional Sections:</span>
              {['Vision & Mission', 'History', 'Leadership', 'Principal Desk', 'Governing Body', 'IQAC', 'Policies'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setCurrentPage('about')}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-colors"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
