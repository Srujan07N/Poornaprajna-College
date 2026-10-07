import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Award, Compass, FlaskConical, Users, ShieldCheck, HeartHandshake } from 'lucide-react';

export const WhyPPCSection: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: 'Autonomous Curricular Autonomy',
      desc: 'Flexibility to formulate contemporary, industry-grounded curricula under Mangalore University, integrating choice-based credit systems and NEP honours frameworks.'
    },
    {
      icon: Compass,
      title: 'Spiritual & Ethical Anchor',
      desc: 'Rooted in the educational vision of H.H. Sri Vibhudhesha Theertha Swamiji of Sri Admar Mutt, cultivating integrity, civic duty, and scholarly discipline.'
    },
    {
      icon: FlaskConical,
      title: 'Empirical Laboratory Culture',
      desc: 'Spacious scientific research and computing facilities in Physics, Chemistry, Botany, Zoology, and Software Development for hands-on experimental inquiry.'
    },
    {
      icon: Users,
      title: 'Holistic Student Character',
      desc: 'Active NCC 21 Kar Battalion, dual NSS units, Youth Red Cross, traditional Yakshagana preservation, and university championship sports infrastructure.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FCFBF7] border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
            <span>Institutional Distinctions</span>
            <span aria-hidden="true">·</span>
            <span>Educational Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
            Why Poornaprajna College
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Balancing the heritage of classical knowledge with progressive higher education in Udupi, Karnataka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-2 text-[11px] font-semibold text-[#7E192E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DEB038]" />
                  <span>Poornaprajna Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
