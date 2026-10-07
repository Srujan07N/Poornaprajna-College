import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { events, setCurrentPage } = useCollege();

  return (
    <section className="py-20 lg:py-24 bg-[#F5F2EB] border-b border-stone-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
              <span>Campus Calendar</span>
              <span aria-hidden="true">·</span>
              <span>Conferences & Fests</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Upcoming Events & Academic Colloquia
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              National seminars, science exhibitions, intercollegiate fests, and athletic championships hosted on the Poornaprajna campus.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('events')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors self-start md:self-auto"
          >
            <span>Full Academic Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between hover:border-[#7E192E]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-[#7E192E] text-[11px] uppercase tracking-wider">
                    {event.category}
                  </span>
                  <span className="font-mono text-stone-500 font-semibold text-[11px]">
                    {event.date}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-stone-900 text-lg leading-snug mb-2">
                  {event.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                  {event.description}
                </p>

                <div className="space-y-1.5 border-t border-stone-100 pt-3 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 text-[11px]">{event.departmentName}</span>
                {event.registrationOpen ? (
                  <span className="text-emerald-700 font-semibold text-[11px]">Registration Open</span>
                ) : (
                  <span className="text-stone-400 text-[11px]">Institutional Schedule</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
