import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Briefcase, GraduationCap, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const PlacementsView: React.FC = () => {
  const { setCurrentPage } = useCollege();

  const services = [
    {
      title: 'Career Guidance & Competitive Exam Cell',
      desc: 'Conducts regular orientation sessions, aptitude workshops, and mentorship for UPSC, KPSC, banking examinations (IBPS/SBI), and UGC-NET/KSET.'
    },
    {
      title: 'CA / CS / CMA Mentorship Coordination',
      desc: 'Coordinates specialized Foundation and Intermediate guidance with alumni practicing chartered accountants for commerce undergraduates.'
    },
    {
      title: 'Industry Soft-Skills & Interview Bootcamps',
      desc: 'Pre-placement training covering resume building, group discussion etiquette, technical interview problem-solving, and communication enhancement.'
    },
    {
      title: 'Corporate Internship Assistance',
      desc: 'Facilitates mandatory degree project internships for final-year B.B.A., B.C.A., and M.Com students with regional commercial and financial organizations.'
    }
  ];

  const recruiters = [
    'Infosys', 'Wipro Technologies', 'Tata Consultancy Services',
    'Cognizant', 'L&T Infotech', 'Robosoft Technologies Udupi',
    'ICICI Bank', 'HDFC Bank', 'Canara Bank', 'Rao & Shenoy CA Firm'
  ];

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Professional Pathways
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Training & Career Guidance Cell
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              Equipping undergraduates and postgraduates with analytical rigor, interview competencies, and professional connections for corporate careers, civil services, and higher research.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-[#7E192E] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Active Student Support Cell</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recruiter Partners */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <h3 className="font-serif font-bold text-2xl text-stone-900">
              Recruitment & Internship Partners
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Major commercial institutions and technology companies actively engaging Poornaprajna students through campus placement drives and pooled recruitment.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {recruiters.map((r, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center font-medium text-xs text-stone-800">
                {r}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-stone-400 italic text-center">
            Note: All placement reports and annual recruitment records are documented transparently under autonomous institutional audit standards.
          </p>
        </div>
      </div>
    </div>
  );
};
