import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { X, ArrowRight, CheckCircle2, Clock, Users, BookOpen, Briefcase, GraduationCap, FileDown, HelpCircle } from 'lucide-react';

export const CourseDetailModal: React.FC = () => {
  const { selectedCourseId, setSelectedCourseId, courses, setCurrentPage } = useCollege();

  if (!selectedCourseId) return null;

  const course = courses.find(c => c.id === selectedCourseId);
  if (!course) return null;

  const handleApply = () => {
    setSelectedCourseId(null);
    setCurrentPage('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-50/50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                {course.code}
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-xs font-semibold text-[#7E192E] uppercase tracking-wider">
                {course.degreeLevel} ({course.stream})
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                {course.status}
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">{course.title}</h2>
            <p className="text-xs text-stone-600 mt-1">{course.departmentName}</p>
          </div>
          <button
            onClick={() => setSelectedCourseId(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-stone-700">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-center">
            <div>
              <span className="text-stone-400 block text-[11px]">Duration</span>
              <span className="font-semibold text-stone-900 text-xs mt-0.5 block">{course.duration}</span>
            </div>
            <div className="border-x border-stone-200">
              <span className="text-stone-400 block text-[11px]">Autonomous Intake</span>
              <span className="font-bold font-mono text-stone-900 text-sm mt-0.5 block">{course.intake} Seats</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Affiliation</span>
              <span className="font-semibold text-stone-900 text-xs mt-0.5 block">Mangalore Univ.</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-2">Programme Overview</h3>
            <p className="leading-relaxed text-stone-600">{course.description}</p>
          </div>

          {/* Eligibility & Regulations */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <h4 className="font-semibold text-stone-900 text-xs mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7E192E]" />
              Prescribed Eligibility Criteria
            </h4>
            <p className="text-stone-600 leading-relaxed">{course.eligibility}</p>
            <p className="text-[11px] text-stone-400 mt-2 italic">
              Note: {course.feeInfo}
            </p>
          </div>

          {/* Curriculum Structure */}
          <div>
            <h3 className="font-serif font-bold text-base text-stone-900 mb-2.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#7E192E]" />
              Autonomous Curriculum Highlights
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600">
              {course.curriculumOverview.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-stone-50/70 p-2.5 rounded-lg border border-stone-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7E192E] mt-1.5 shrink-0" />
                  <span className="text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career & Higher Education */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
              <h4 className="font-semibold text-stone-900 text-xs mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#C59B27]" />
                Career Opportunities
              </h4>
              <ul className="space-y-1.5 text-stone-600">
                {course.careerOpportunities.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-xs">
                    <span className="text-stone-400">·</span> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
              <h4 className="font-semibold text-stone-900 text-xs mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#7E192E]" />
                Higher Study Pathways
              </h4>
              <ul className="space-y-1.5 text-stone-600">
                {course.higherStudyOptions.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-xs">
                    <span className="text-stone-400">·</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQs */}
          {course.faqs && course.faqs.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900 mb-2.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-stone-500" />
                Frequently Answered Questions
              </h3>
              <div className="space-y-2">
                {course.faqs.map((faq, i) => (
                  <div key={i} className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                    <p className="font-semibold text-stone-900 text-xs">{faq.question}</p>
                    <p className="text-stone-600 text-xs mt-1 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <button
            onClick={() => {
              alert(`Informational Brochure for ${course.title} is available at the college admissions counter and can be downloaded from the Downloads repository.`);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 px-3 py-2 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 transition-colors"
          >
            <FileDown className="w-4 h-4 text-stone-500" />
            Download Course Brochure
          </button>

          <button
            onClick={handleApply}
            className="inline-flex items-center gap-2 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white px-5 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <span>Apply for this Programme</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
