import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { BookOpen, FlaskConical, Monitor, Trophy, Building, Trees, MapPin } from 'lucide-react';

export const CampusView: React.FC = () => {
  const { settings } = useCollege();

  const facilities = [
    {
      title: 'Veda & Central Heritage Library',
      desc: 'Established in 1960, the central library houses over 50,000 academic titles, reference encyclopedias, national journals, and access to digital research databases through INFLIBNET. Equipped with quiet reading cubicles and high-speed terminals.',
      specs: '50,000+ volumes · INFLIBNET N-LIST · Reading Halls'
    },
    {
      title: 'Advanced Science Laboratories',
      desc: 'Autonomous practical laboratories in Physics (optics, solid state, electronics), Chemistry (organic synthesis, analytical instruments), Botany (plant physiology and herbarium), and Zoology (specimen museum and microtechnique).',
      specs: '4 Major Disciplinary Labs · Modern Optical Benches'
    },
    {
      title: 'Central Computing & Software Studios',
      desc: 'Networked laboratories with 150+ workstations on gigabit fiber-optic backbones running Linux, database servers, and licensed development environments for BCA and B.Sc. IT students.',
      specs: '150+ Networked PCs · High-Speed Leased Line'
    },
    {
      title: 'Poornaprajna Sports Grounds & Arena',
      desc: 'Full-size track and field sports ground at Volakadu hosting inter-collegiate cricket, volleyball, kabaddi, and athletic tournaments with physical education coaching.',
      specs: 'Athletic Track · Cricket Turf · Badminton Court'
    },
    {
      title: 'Sri Vibhudhesha Theertha Mini Auditorium',
      desc: 'Teak-paneled acoustic hall used for national academic conferences, endowment lectures, student union inaugurations, and cultural assemblies.',
      specs: 'Acoustic Sound System · Tiered Seating'
    },
    {
      title: 'Botanical Garden & Herbal Flora',
      desc: 'An outdoor living laboratory featuring medicinal plants indigenous to coastal Karnataka and the Western Ghats, maintained for botanical research and ecological awareness.',
      specs: 'Medicinal Flora · Rain Water Harvesting System'
    }
  ];

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Volakadu Campus Infrastructure
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Campus Facilities & Infrastructure
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              An enriching academic ecosystem in the heart of Udupi, harmonizing historic stone architecture with modern science research and computational facilities.
            </p>
          </div>
        </div>

        {/* Facilities Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((fac, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-xl mb-2">
                  {fac.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {fac.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>{fac.specs}</span>
                <span className="text-emerald-700 font-semibold font-sans">Active Facility</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
