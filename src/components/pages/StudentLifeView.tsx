import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Trophy, Shield, HeartHandshake, Sparkles, Users, Award } from 'lucide-react';

export const StudentLifeView: React.FC = () => {
  const clubs = [
    {
      title: 'NCC 21 Karnataka Battalion (Army Wing)',
      role: 'National Defense & Leadership',
      desc: 'Active senior division unit offering ' +
        'rigorous military drill, weapon training, adventure camps, and leadership camps. PPC cadets regularly participate in the Republic Day Parade (RDC) in New Delhi.'
    },
    {
      title: 'National Service Scheme (NSS Units I & II)',
      role: 'Community Engagement & Rural Welfare',
      desc: 'Two dynamic units spearheading annual special camping programmes in rural villages of Udupi district, health awareness workshops, literacy drives, and environmental conservation.'
    },
    {
      title: 'Prajna Kala Vedike (Yakshagana & Heritage Arts)',
      role: 'Traditional Arts Preservation',
      desc: 'Dedicated cultural troupe training students in Yakshagana Badagutittu performance, coastal folk arts, classical dance, music, and theatre.'
    },
    {
      title: 'Youth Red Cross & Rovers/Rangers',
      role: 'First Aid & Humanitarian Service',
      desc: 'Voluntary youth service wings training undergraduates in disaster response, blood donor registries, first-aid techniques, and community relief operations.'
    },
    {
      title: 'Commerce Association & Management Club',
      role: 'Business Competitions & Industry Insights',
      desc: 'Organizes annual intercollegiate management fests, stock trading simulations, business plan pitches, and interactive sessions with chartered accountants.'
    },
    {
      title: 'Science Forum (Vijnana Parishat)',
      role: 'Scientific Temper & Demonstrations',
      desc: 'Promotes science literacy through workshops, National Science Day symposiums, sky-watching astronomical sessions, and visits to scientific establishments.'
    }
  ];

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Beyond the Classroom
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Student Life & Co-Curricular Culture
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              At Poornaprajna College, intellectual growth is complemented by active participation in national youth wings, sports, fine arts, and community outreach.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#7E192E] block mb-2">
                  {club.role}
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                  {club.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {club.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DEB038]" />
                <span>Open to All Enrolled Students</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
