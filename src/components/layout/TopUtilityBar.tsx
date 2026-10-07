import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { User, Shield, GraduationCap, Award, Lock } from 'lucide-react';

export const TopUtilityBar: React.FC = () => {
  const {
    setCurrentPage,
    setIsStudentPortalOpen,
    setIsFacultyPortalOpen,
    setIsAdminView
  } = useCollege();

  return (
    <div className="bg-[#1C1917] text-stone-300 text-[11px] py-1.5 px-4 border-b border-stone-800/80 font-sans hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Affiliation & Status */}
        <div className="flex items-center gap-3 text-stone-400">
          <span className="text-[#DEB038] font-medium tracking-wide">Autonomous Institution</span>
          <span className="text-stone-600">·</span>
          <span>Affiliated to Mangalore University</span>
          <span className="text-stone-600">·</span>
          <span>Udupi – 576101, Karnataka</span>
        </div>

        {/* Right: Quick Utility Portals */}
        <div className="flex items-center gap-4 text-stone-300">
          <button
            onClick={() => setCurrentPage('admissions')}
            className="hover:text-white transition-colors"
          >
            Admissions
          </button>
          <span className="text-stone-700">·</span>
          <button
            onClick={() => setCurrentPage('examination')}
            className="hover:text-white transition-colors"
          >
            Examination
          </button>
          <span className="text-stone-700">·</span>
          <button
            onClick={() => setCurrentPage('examination')}
            className="hover:text-[#DEB038] text-stone-200 font-medium transition-colors"
          >
            Results Lookup
          </button>
          <span className="text-stone-700">·</span>
          <button
            onClick={() => setIsStudentPortalOpen(true)}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <User className="w-3 h-3 text-stone-400" />
            Student Login
          </button>
          <span className="text-stone-700">·</span>
          <button
            onClick={() => setIsFacultyPortalOpen(true)}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <GraduationCap className="w-3 h-3 text-stone-400" />
            Faculty Login
          </button>
          <span className="text-stone-700">·</span>
          <button
            onClick={() => setCurrentPage('alumni')}
            className="hover:text-white transition-colors"
          >
            Alumni
          </button>
          <span className="text-stone-700">·</span>
          <button
            onClick={() => {
              setIsAdminView(true);
              window.location.hash = 'admin';
            }}
            className="text-stone-400 hover:text-[#DEB038] transition-colors flex items-center gap-1 font-mono"
            title="Institutional Governance Portal"
          >
            <Lock className="w-2.5 h-2.5" />
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};
