import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { BookOpen, FlaskConical, Monitor, Trophy, Building, Trees, ArrowRight } from 'lucide-react';

export const CampusExperienceSection: React.FC = () => {
  const { setCurrentPage } = useCollege();

  const facilities = [
    {
      title: 'Veda & Central Heritage Library',
      category: 'Academic Learning',
      desc: 'Over 50,000 reference volumes, rare Indological manuscripts, e-journal subscriptions (INFLIBNET/N-LIST), and calm reading halls.',
      icon: BookOpen
    },
    {
      title: 'Physical & Biological Laboratories',
      category: 'Experimental Research',
      desc: 'Spacious dedicated laboratories in Optics, Condensed Matter, Organic Synthesis, Botanical Plant Taxonomy, and Zoological Specimens.',
      icon: FlaskConical
    },
    {
      title: 'Advanced Computing Centers',
      category: 'Digital Infrastructure',
      desc: 'High-speed fiber-optic network connecting 150+ workstations with licensed software engineering stacks, cloud sandboxes, and compilers.',
      icon: Monitor
    },
    {
      title: 'Poornaprajna Sports Grounds',
      category: 'Athletics & Fitness',
      desc: 'Expansive track and field arena at Volakadu supporting cricket, volleyball, badminton, coastal athletics, and annual university championships.',
      icon: Trophy
    },
    {
      title: 'Sri Vibhudhesha Theertha Auditorium',
      category: 'Cultural & Academic Halls',
      desc: 'Mini auditorium and seminar spaces equipped with acoustic public address systems for national conferences and endowment lectures.',
      icon: Building
    },
    {
      title: 'Botanical Herbarium & Campus Greenery',
      category: 'Environmental Stewardship',
      desc: 'Verdant coastal Karnataka trees, medicinal botanical collections, and rain-water conservation points across the campus quadrangle.',
      icon: Trees
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FCFBF7] border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
              <span>Volakadu Campus Environment</span>
              <span aria-hidden="true">·</span>
              <span>Udupi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Campus Infrastructure & Learning Spaces
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Equipped with modern educational resources while retaining the tranquility of its historic Udupi grounds.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('campus')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors self-start md:self-auto"
          >
            <span>View Full Campus Facility Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold text-[#7E192E] uppercase tracking-wider">
                      {fac.category}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                    {fac.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {fac.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Maintained under Autonomous Governance</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
