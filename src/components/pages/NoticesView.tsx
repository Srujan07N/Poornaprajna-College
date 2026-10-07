import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { NoticeCategory } from '../../types';
import { Search, Filter, Calendar, FileText, Download, AlertCircle } from 'lucide-react';

export const NoticesView: React.FC = () => {
  const { notices } = useCollege();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Admission', 'Examination', 'Results', 'Circular', 'Scholarships', 'Holidays', 'General'];

  const filteredNotices = notices.filter(n => {
    if (categoryFilter !== 'All' && n.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Official Bulletin Board
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Institutional Notices & Circulars
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              Authentic announcements issued by the College Principal, Autonomous Examination Section, Admissions Office, and Academic Council.
            </p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search circulars, examination notices, deadlines..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#7E192E] bg-stone-50/50"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 text-xs border border-stone-300 rounded-lg bg-stone-50/50"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Notice Categories' : c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notices Cards */}
        <div className="space-y-4">
          {filteredNotices.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500 bg-white rounded-xl border border-stone-200">
              No circulars found matching your query.
            </div>
          ) : (
            filteredNotices.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#7E192E]/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>{n.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-sans font-semibold text-[#7E192E]">{n.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-400 font-sans">Audience: {n.targetAudience}</span>
                    {n.isImportant && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.2 rounded font-sans">
                          <AlertCircle className="w-3 h-3" /> Priority Notice
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-lg leading-snug">
                    {n.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                    {n.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => alert(`Official document "${n.fileName || 'Notice.pdf'}" downloaded successfully.`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 px-3.5 py-2 rounded-lg border border-stone-300 hover:bg-stone-50 transition-colors shadow-2xs"
                  >
                    <FileText className="w-4 h-4 text-[#7E192E]" />
                    <span>Download Official PDF</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
