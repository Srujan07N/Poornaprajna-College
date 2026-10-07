import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Search, X, BookOpen, Building2, Bell, Calendar, ArrowRight, Download } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    courses,
    departments,
    notices,
    events,
    downloads,
    setSelectedCourseId,
    setCurrentPage
  } = useCollege();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedCourses = q ? courses.filter(c => c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) : [];
  const matchedDepartments = q ? departments.filter(d => d.name.toLowerCase().includes(q) || d.overview.toLowerCase().includes(q)) : [];
  const matchedNotices = q ? notices.filter(n => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)) : [];
  const matchedEvents = q ? events.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)) : [];
  const matchedDownloads = q ? downloads.filter(d => d.title.toLowerCase().includes(q)) : [];

  const totalResults = matchedCourses.length + matchedDepartments.length + matchedNotices.length + matchedEvents.length + matchedDownloads.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, departments, notices, exam circulars, syllabus..."
            className="w-full text-sm font-sans focus:outline-none placeholder-stone-400 bg-transparent text-stone-900"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-stone-400 hover:text-stone-700">
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
          {!q ? (
            <div className="py-8 text-center text-stone-400">
              <span className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Popular Searches
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
                {['B.Com', 'B.C.A.', 'Autonomous Results', 'Admissions 2026', 'Examination Calendar', 'Physics Lab', 'M.Com'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-[#7E192E]/10 hover:text-[#7E192E] text-stone-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-10 text-center text-stone-500">
              No matching institutional records found for "{query}".
            </div>
          ) : (
            <>
              {/* Courses */}
              {matchedCourses.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7E192E] block mb-2">
                    Academic Programmes ({matchedCourses.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedCourses.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSelectedCourseId(c.id);
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-lg bg-stone-50 hover:bg-[#7E192E]/5 border border-stone-200/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-stone-900">{c.title}</p>
                          <span className="text-[11px] text-stone-500">{c.degreeLevel} · {c.duration}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Departments */}
              {matchedDepartments.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Departments ({matchedDepartments.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedDepartments.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          setCurrentPage('departments');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-stone-900">{d.name}</p>
                          <span className="text-[11px] text-stone-500">Stream: {d.stream}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notices */}
              {matchedNotices.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Notices & Circulars ({matchedNotices.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedNotices.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setCurrentPage('notices');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-stone-900">{n.title}</p>
                          <span className="text-[11px] text-stone-500 font-mono">{n.date} · {n.category}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Downloads */}
              {matchedDownloads.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Downloadable Documents ({matchedDownloads.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedDownloads.map((dl) => (
                      <div
                        key={dl.id}
                        onClick={() => {
                          setCurrentPage('downloads');
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200/60 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-stone-900">{dl.title}</p>
                          <span className="text-[11px] text-stone-500">{dl.category} · {dl.fileSize}</span>
                        </div>
                        <Download className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
