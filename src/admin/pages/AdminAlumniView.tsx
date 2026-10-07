import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Check, X, Award, Briefcase, MapPin, Mail } from 'lucide-react';

export const AdminAlumniView: React.FC = () => {
  const { alumni, approveAlumni } = useCollege();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Alumni Association Oversight</span>
        <h1 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Poornaprajna Alumni Network Submissions</h1>
        <p className="text-xs text-stone-500 mt-1">
          Review alumni registrations, verified achievements, and approve testimonials before they display on the public alumni directory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {alumni.map((alum) => (
          <div key={alum.id} className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold font-mono text-[#7E192E]">Batch {alum.batchYear}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  alum.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {alum.isApproved ? 'Approved & Public' : 'Pending Verification'}
                </span>
              </div>

              <h3 className="font-serif font-bold text-stone-900 text-base">{alum.fullName}</h3>
              <p className="text-xs text-stone-500 mb-2">{alum.courseStudied}</p>

              <div className="space-y-1 text-xs text-stone-600 mb-3">
                <p className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                  <span className="font-medium">{alum.currentDesignation}</span>, {alum.currentCompanyOrInstitute}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{alum.location}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span className="font-mono text-[11px]">{alum.email}</span>
                </p>
              </div>

              {alum.testimonial && (
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs italic text-stone-700">
                  "{alum.testimonial}"
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-end gap-2">
              {alum.isApproved ? (
                <button
                  onClick={() => approveAlumni(alum.id, false)}
                  className="px-3 py-1.5 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Unpublish
                </button>
              ) : (
                <button
                  onClick={() => approveAlumni(alum.id, true)}
                  className="px-3 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Approve & Publish
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
