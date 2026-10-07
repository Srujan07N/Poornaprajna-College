import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Bell, ArrowRight, FileText, AlertCircle, Calendar } from 'lucide-react';

export const NoticesSection: React.FC = () => {
  const { notices, setCurrentPage } = useCollege();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Examination', 'Admission', 'Results', 'Circular'];

  const filteredNotices = notices.filter(n => {
    if (activeCategory === 'All') return true;
    return n.category === activeCategory;
  });

  return (
    <section className="py-20 lg:py-24 bg-[#FCFBF7] border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
              <span>Official Bulletin</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Circulars</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Latest Notices & Announcements
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Official circulars, autonomous examination schedules, revaluation notifications, and scholarship deadlines.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('notices')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors self-start md:self-auto"
          >
            <span>Browse Full Notice Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl mb-8 max-w-fit">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Notices Cards List */}
        <div className="space-y-3">
          {filteredNotices.slice(0, 4).map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs hover:border-[#7E192E]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{notice.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans font-semibold text-[#7E192E]">{notice.category}</span>
                  {notice.isImportant && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.2 rounded font-sans">
                        <AlertCircle className="w-3 h-3" /> Priority Notice
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed max-w-3xl line-clamp-2">
                  {notice.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => alert(`Official document "${notice.fileName || 'Notice.pdf'}" is available in the download repository.`)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#7E192E]" />
                  <span>View Circular</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
