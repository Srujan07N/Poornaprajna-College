import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { ShieldCheck, History, Compass, Award, Building2, Users } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { settings, setCurrentPage } = useCollege();

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Institutional Heritage & Vision
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              About Poornaprajna College
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              An autonomous institution founded in 1960 under the divine guidance of Sri Admar Mutt, nurturing ethical intellect and scientific scholarship in Udupi, Karnataka.
            </p>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-stone-900">Institutional Vision</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              "To mold morally sound, academically accomplished, socially sensitive, and globally competent citizens imbued with the timeless values of Indian philosophical heritage and empirical scientific enquiry."
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-stone-900">Institutional Mission</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#DEB038] font-bold">·</span>
                <span>To impart holistic, value-integrated higher education in Arts, Science, Commerce, Management, and Computing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DEB038] font-bold">·</span>
                <span>To exercise autonomous curriculum design ensuring alignment with national research benchmarks and employment trends.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#DEB038] font-bold">·</span>
                <span>To foster social responsibility through active community outreach, NSS, NCC, and cultural preservation.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Foundational History */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Six Decades of Scholarship</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Foundational Legacy & Sri Admar Mutt
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed max-w-4xl">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#6B1426] first-letter:float-left first-letter:mr-3 first-letter:mt-1 leading-relaxed">
              {settings.aboutSummary[0]}
            </p>
            {settings.aboutSummary[1] && (
              <p className="leading-relaxed">
                {settings.aboutSummary[1]}
              </p>
            )}
            <p className="leading-relaxed">
              The Sri Admar Mutt Education Council (AMEC) has continuously spearheaded the modernization of the campus infrastructure while safeguarding its austere collegiate ambiance. Over the decades, thousands of alumni have graduated to serve in premier research laboratories, the judiciary, administrative civil services, and multinational corporations worldwide.
            </p>
          </div>
        </div>

        {/* Governance & Leadership Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white border border-stone-200/80 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center mb-2">
              <Building2 className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-lg text-stone-900">Governing Body</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Comprising trustees of Sri Admar Mutt Education Council, UGC nominees, state government educational representatives, and senior collegiate faculty.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-stone-200/80 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center mb-2">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-lg text-stone-900">Academic Council</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Formulates autonomous curricula, endorses examination evaluation standards, and recommends new programmes to Mangalore University.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-stone-200/80 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-lg text-stone-900">Internal Quality Assurance (IQAC)</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Continually audits institutional teaching standards, faculty development, research outputs, and NAAC accreditation benchmarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
