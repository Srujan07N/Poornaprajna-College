import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Building2, ArrowRight, BookOpen, FlaskConical, Mail } from 'lucide-react';

export const DepartmentsSection: React.FC = () => {
  const { departments, setCurrentPage } = useCollege();

  return (
    <section className="py-20 lg:py-24 bg-[#F5F2EB] border-b border-stone-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
              <span>Academic Departments</span>
              <span aria-hidden="true">·</span>
              <span>Faculty Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Departments of Study
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Centers of scholarly instruction and student mentoring across undergraduate and postgraduate divisions.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('departments')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors self-start md:self-auto"
          >
            <span>Explore Department Portals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between hover:border-[#7E192E]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-[#7E192E]">{dept.code}</span>
                  <span className="text-stone-500 font-medium">{dept.stream}</span>
                </div>

                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                  {dept.name}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed">
                  {dept.overview}
                </p>

                <div className="space-y-2 border-t border-stone-100 pt-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Academic Leadership</span>
                    <span className="font-semibold text-stone-800">{dept.hodName}</span>
                    <span className="text-stone-500 text-[11px] block">{dept.hodQualification}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[11px]">Programmes Conducted</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dept.programmesOffered.map((p, i) => (
                        <span key={i} className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-mono text-[11px]">{dept.contactExtension}</span>
                <button
                  onClick={() => setCurrentPage('departments')}
                  className="inline-flex items-center gap-1 font-semibold text-[#7E192E] hover:text-[#4D0E1B]"
                >
                  <span>Department Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
