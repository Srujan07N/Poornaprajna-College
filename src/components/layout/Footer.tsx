import React from 'react';
import { useCollege, PublicPage } from '../../context/CollegeContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setCurrentPage, setIsStudentPortalOpen, setIsFacultyPortalOpen, setIsAdminView } = useCollege();

  const handleNav = (page: PublicPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-stone-300 font-sans border-t border-stone-800 text-xs">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Institutional Heritage (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#6B1426] text-white flex items-center justify-center font-serif font-bold text-lg border border-[#C59B27]/40 shadow-xs">
                PPC
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white block tracking-tight">
                  Poornaprajna College
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#DEB038] font-semibold block">
                  Autonomous · Udupi, Karnataka
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Conceived in 1960 under the spiritual and educational vision of H.H. Sri Vibhudhesha Theertha Swamiji of Sri Admar Mutt. An autonomous institution committed to academic excellence, ethical character, scientific enquiry, and holistic student development.
            </p>

            <div className="pt-2 text-[11px] text-stone-400 space-y-1">
              <p className="flex items-center gap-1.5 text-stone-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DEB038]" />
                {settings.affiliationText}
              </p>
              <p className="text-stone-400 pl-5">
                {settings.autonomousStatusText}
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Institutional Links
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About College & Vision
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('academics')} className="hover:text-white transition-colors">
                  Academic Programmes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admissions')} className="hover:text-white transition-colors">
                  Admissions 2026–27
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('departments')} className="hover:text-white transition-colors">
                  Departments Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('campus')} className="hover:text-white transition-colors">
                  Campus Facilities
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('student-life')} className="hover:text-white transition-colors">
                  Student Life & Clubs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('placements')} className="hover:text-white transition-colors">
                  Career Guidance & Placement
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Portals & Academics */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Student & Examination
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNav('examination')} className="hover:text-[#DEB038] text-stone-300 font-medium transition-colors">
                  Autonomous Examination & Results
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('notices')} className="hover:text-white transition-colors">
                  Official Notice Board
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('downloads')} className="hover:text-white transition-colors">
                  Download Center (Syllabus/Forms)
                </button>
              </li>
              <li>
                <button onClick={() => setIsStudentPortalOpen(true)} className="hover:text-white transition-colors">
                  Student Academic Portal
                </button>
              </li>
              <li>
                <button onClick={() => setIsFacultyPortalOpen(true)} className="hover:text-white transition-colors">
                  Faculty Administration Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('alumni')} className="hover:text-white transition-colors">
                  Poornaprajna Alumni Network
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('research')} className="hover:text-white transition-colors">
                  Research & Publications
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Campus Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Campus Coordinates
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DEB038] shrink-0 mt-0.5" />
                <p className="leading-snug">
                  {settings.address.line1}, {settings.address.line2}, {settings.address.city} – {settings.address.pincode}, Karnataka, India
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <a href={`tel:${settings.phones[0]}`} className="hover:text-white font-mono">
                  {settings.phones[0]}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <a href={`mailto:${settings.emails[0]}`} className="hover:text-white">
                  {settings.emails[0]}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1 text-[11px] text-stone-400">
                <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                <span>{settings.officeHours}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsAdminView(true);
                    window.location.hash = 'admin';
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-[#DEB038] transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  Administrative Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-stone-800/80 py-6 px-4 sm:px-6 lg:px-8 bg-[#141211]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-[11px]">
          <p>© {new Date().getFullYear()} Poornaprajna College (Autonomous), Udupi. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Autonomous Regulations</span>
            <span>·</span>
            <span>UGC & NAAC Compliance</span>
            <span>·</span>
            <span>Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
