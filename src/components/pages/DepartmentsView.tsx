import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Building2, BookOpen, FlaskConical, Users, Mail, ArrowRight } from 'lucide-react';

export const DepartmentsView: React.FC = () => {
  const { departments, courses, setSelectedCourseId } = useCollege();

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Autonomous Academic Divisions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Academic Departments Directory
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              Directory of collegiate departments spanning Commerce, Natural & Physical Sciences, Computer Science, Management, Humanities, and Postgraduate Mathematics.
            </p>
          </div>
        </div>

        {/* Departments Dossier List */}
        <div className="space-y-8">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <span className="font-bold text-[#7E192E]">{dept.code}</span>
                    <span>·</span>
                    <span>{dept.stream} Division</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-stone-900 mt-0.5">
                    {dept.name}
                  </h3>
                </div>
                <div className="text-right text-xs text-stone-500 font-mono">
                  <span>{dept.contactExtension}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Overview & Leadership */}
                <div className="lg:col-span-2 space-y-4 text-xs text-stone-700">
                  <p className="leading-relaxed text-stone-600 text-sm">
                    {dept.overview}
                  </p>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h5 className="font-semibold text-stone-900 mb-1">Head of Department Statement</h5>
                    <p className="italic text-stone-600">"{dept.hodMessage}"</p>
                    <p className="font-semibold text-stone-800 mt-2">— {dept.hodName} ({dept.hodQualification})</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-stone-900 mb-2">Key Research & Specialization Areas</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.researchAreas.map((ra, idx) => (
                        <span key={idx} className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded text-xs">
                          {ra}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Facilities & Programmes */}
                <div className="space-y-4 text-xs text-stone-700 bg-stone-50/60 p-5 rounded-xl border border-stone-200/70">
                  <div>
                    <h5 className="font-semibold text-stone-900 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#7E192E]" />
                      Programmes Offered
                    </h5>
                    <ul className="space-y-1 text-stone-600">
                      {dept.programmesOffered.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7E192E]" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-stone-900 mb-2 flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-[#C59B27]" />
                      Departmental Facilities
                    </h5>
                    <ul className="space-y-1 text-stone-600">
                      {dept.facilities.map((fac, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-stone-400">·</span>
                          <span>{fac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
