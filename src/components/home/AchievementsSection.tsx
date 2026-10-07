import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Trophy, Shield, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { setCurrentPage } = useCollege();

  const wings = [
    {
      title: 'NCC 21 Karnataka Battalion',
      desc: 'Army wing contingent with extensive history of cadets representing Karnataka & Goa Directorate at Republic Day Parade (RDC) and Thal Sainik Camp (TSC).',
      badge: 'Senior Division'
    },
    {
      title: 'National Service Scheme (NSS)',
      desc: 'Two operational autonomous units conducting regular village adoption camps, coastal cleanliness drives, blood donation camps, and community health forums.',
      badge: 'Units I & II'
    },
    {
      title: 'Yakshagana & Cultural Troupe',
      desc: 'Preserving the heritage art of coastal Tulunadu through regular student performances, costume workshops, and traditional music training.',
      badge: 'Prajna Kala Vedike'
    },
    {
      title: 'Intercollegiate Sports & Athletics',
      desc: 'University champions across Mangalore University athletic circuits in track events, volleyball, badminton, and weightlifting.',
      badge: 'Physical Education'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FCFBF7] border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
              <span>Student Co-Curricular Excellence</span>
              <span aria-hidden="true">·</span>
              <span>National Wings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Character Formation & Student Wings
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Nurturing leadership, national service, cultural preservation, and athletic prowess beyond classroom lectures.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('student-life')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors self-start md:self-auto"
          >
            <span>Explore Clubs & Student Life</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wings.map((wing, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                  {wing.badge}
                </span>

                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                  {wing.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {wing.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-[#7E192E] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DEB038]" />
                <span>Active Student Unit</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
