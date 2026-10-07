import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Search, Filter, BookOpen, Clock, Users, ArrowRight, ArrowUpRight } from 'lucide-react';

export const AcademicsView: React.FC = () => {
  const { courses, setSelectedCourseId, setCurrentPage } = useCollege();
  const [search, setSearch] = useState('');
  const [streamFilter, setStreamFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');

  const streams = ['All', 'Commerce', 'Science', 'Computer Applications', 'Management', 'Arts'];
  const levels = ['All', 'Undergraduate', 'Postgraduate'];

  const filtered = courses.filter((c) => {
    if (levelFilter !== 'All' && c.degreeLevel !== levelFilter) return false;
    if (streamFilter !== 'All' && c.stream !== streamFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner */}
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Autonomous Academic Catalog
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Academic Programmes & Syllabi
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              Explore undergraduate and postgraduate degrees formulated under Autonomous Regulations affiliated with Mangalore University, combining foundational depth and industry application.
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search programmes (e.g. B.Com, BCA, Mathematics, Physics)..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-1 focus:ring-[#7E192E] bg-stone-50/50"
            />
          </div>

          <div>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full p-2 text-xs border border-stone-300 rounded-lg bg-stone-50/50"
            >
              <option value="All">All Degree Levels</option>
              <option value="Undergraduate">Undergraduate (UG)</option>
              <option value="Postgraduate">Postgraduate (PG)</option>
            </select>
          </div>

          <div>
            <select
              value={streamFilter}
              onChange={(e) => setStreamFilter(e.target.value)}
              className="w-full p-2 text-xs border border-stone-300 rounded-lg bg-stone-50/50"
            >
              <option value="All">All Academic Streams</option>
              {streams.filter(s => s !== 'All').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs text-stone-500">
              No academic programmes match your filter selection. Try resetting filters.
            </div>
          ) : (
            filtered.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between hover:border-[#7E192E]/40 hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span className="font-mono font-semibold text-[#7E192E]">{course.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.degreeLevel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.stream}</span>
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-xl leading-snug mb-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                    {course.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Duration:</span>
                      <span className="font-medium text-stone-800">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Autonomous Intake:</span>
                      <span className="font-semibold text-stone-900 font-mono">{course.intake} Seats</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedCourseId(course.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B]"
                  >
                    <span>Curriculum & Brochure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setCurrentPage('admissions')}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Apply Now</span>
                    <ArrowUpRight className="w-3 h-3" />
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
