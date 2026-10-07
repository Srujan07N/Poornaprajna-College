import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Course, AcademicStream, DegreeLevel } from '../../types';
import { ArrowRight, BookOpen, Clock, Users, ArrowUpRight } from 'lucide-react';

export const ProgrammesSection: React.FC = () => {
  const { courses, setSelectedCourseId, setCurrentPage } = useCollege();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = [
    'All',
    'Undergraduate',
    'Postgraduate',
    'Commerce',
    'Science',
    'Computer Applications',
    'Management',
    'Arts'
  ];

  const filteredCourses = courses.filter((c) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Undergraduate') return c.degreeLevel === 'Undergraduate';
    if (activeFilter === 'Postgraduate') return c.degreeLevel === 'Postgraduate';
    return c.stream === activeFilter;
  });

  return (
    <section className="py-20 lg:py-24 bg-[#F5F2EB] border-b border-stone-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
              <span>Curricular Offerings</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Syllabi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Academic Programmes
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Curricula formulated by Autonomous Boards of Studies to provide deep disciplinary grounding, laboratory expertise, and career competencies.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('academics')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors self-start md:self-auto"
          >
            <span>View All Course Regulations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Functional Filter Tabs (Buttons allowed under Constitution) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl mb-10 max-w-fit">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between hover:border-[#7E192E]/40 hover:shadow-sm transition-all"
            >
              <div>
                {/* Clean unboxed metadata with typographic separators */}
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

                {/* Metrics */}
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

              {/* Card Actions */}
              <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedCourseId(course.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B] transition-colors"
                >
                  <span>Curriculum & Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setCurrentPage('admissions')}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>Apply</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
