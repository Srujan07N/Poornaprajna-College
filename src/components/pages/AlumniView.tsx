import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { HeartHandshake, Briefcase, MapPin, Mail, Quote, CheckCircle2 } from 'lucide-react';

export const AlumniView: React.FC = () => {
  const { alumni, submitAlumni } = useCollege();
  const [formData, setFormData] = useState({
    fullName: '',
    batchYear: '',
    courseStudied: 'B.Com.',
    currentDesignation: '',
    currentCompanyOrInstitute: '',
    location: '',
    email: '',
    phone: '',
    testimonial: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const approvedAlumni = alumni.filter(a => a.isApproved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitAlumni(formData);
      setSubmitted(true);
      setFormData({
        fullName: '',
        batchYear: '',
        courseStudied: 'B.Com.',
        currentDesignation: '',
        currentCompanyOrInstitute: '',
        location: '',
        email: '',
        phone: '',
        testimonial: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Poornaprajna Alumni Association
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Alumni Network & Directory
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              Celebrating six decades of institutional graduates making significant contributions in science, civil services, chartered accountancy, industry, and academia worldwide.
            </p>
          </div>
        </div>

        {/* Testimonials from Approved Alumni */}
        <div className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Distinguished Alumni Voices</h2>
            <p className="text-xs text-stone-500 mt-0.5">Reflections on the formative collegiate experience at Poornaprajna Campus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approvedAlumni.map((alum) => (
              <div key={alum.id} className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <Quote className="w-6 h-6 text-[#DEB038]/60" />
                  <p className="text-stone-700 italic text-sm leading-relaxed font-serif">
                    "{alum.testimonial}"
                  </p>
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-stone-900 text-base">{alum.fullName}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {alum.currentDesignation} · {alum.currentCompanyOrInstitute}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-semibold text-[#7E192E] block">Batch {alum.batchYear}</span>
                      <span className="text-[11px] text-stone-400 block">{alum.courseStudied}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Registration Form */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-10 shadow-xs max-w-3xl mx-auto">
          <div className="border-b border-stone-200 pb-4 mb-6">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Alumni Association Membership</span>
            <h3 className="font-serif font-bold text-2xl text-stone-900 mt-1">Register in the Alumni Network</h3>
            <p className="text-xs text-stone-500 mt-1">
              Join the official directory to mentor current students, participate in reunions, and stay connected with the college. (Entries are published following administrative verification).
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-stone-900 text-base">Alumni Details Received</h4>
              <p className="text-xs text-stone-600">
                Thank you for registering with Poornaprajna Alumni Association. Your submission has been saved for administrative verification.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Batch (Year of Graduation) *</label>
                  <input
                    type="text"
                    required
                    value={formData.batchYear}
                    onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                    placeholder="e.g. 2004"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Programme Completed *</label>
                  <input
                    type="text"
                    required
                    value={formData.courseStudied}
                    onChange={(e) => setFormData({ ...formData, courseStudied: e.target.value })}
                    placeholder="e.g. B.Sc. (PCM) / B.Com."
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Current Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.currentDesignation}
                    onChange={(e) => setFormData({ ...formData, currentDesignation: e.target.value })}
                    placeholder="e.g. Senior Manager / Principal Scientist"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Organization / Enterprise *</label>
                  <input
                    type="text"
                    required
                    value={formData.currentCompanyOrInstitute}
                    onChange={(e) => setFormData({ ...formData, currentCompanyOrInstitute: e.target.value })}
                    placeholder="Company or Institute Name"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Current City / Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Bengaluru, India"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-800 mb-1">Alumni Testimonial / Memory of PPC</label>
                  <textarea
                    rows={3}
                    value={formData.testimonial}
                    onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                    placeholder="Share a few words on how Poornaprajna College influenced your career and values..."
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 bg-[#6B1426] hover:bg-[#520F1D] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                {submitting ? 'Submitting Registration...' : 'Register as Alumnus'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
