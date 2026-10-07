import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { ContactSection } from '../home/ContactSection';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings } = useCollege();

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Official Institutional Directory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Contact & Campus Location
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              Poornaprajna Campus, Fish Market Road, Volakadu, Udupi – 576101, Karnataka, India. Connect with the college administrative office, admissions desk, or examination section.
            </p>
          </div>
        </div>

        <ContactSection />
      </div>
    </div>
  );
};
