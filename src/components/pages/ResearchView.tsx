import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Microscope, BookOpen, GraduationCap, Award, FileText } from 'lucide-react';

export const ResearchView: React.FC = () => {
  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Autonomous Scholarly Inquiry
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Research & Innovation Centre
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              Fostering scientific temper, empirical investigation, and peer-reviewed scholarly publications among faculty and undergraduate/postgraduate researchers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900">Institutional Research Ethics Committee</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Supervises academic integrity, research proposals, plagiarism compliance, and seed grant allocations for departmental faculty initiatives.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900">Faculty Publications in UGC-CARE</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Active research outputs across Commerce, Condensed Matter Physics, Graph Theory, Coordination Chemistry, and Regional Karnataka Epigraphy.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900">Undergraduate & PG Student Projects</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Mandatory research dissertations for M.Com. and M.Sc. students, along with capstone software development projects in B.C.A.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
