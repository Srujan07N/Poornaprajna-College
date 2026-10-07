import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, courses, submitEnquiry } = useCollege();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    programme: 'Bachelor of Commerce (B.Com.)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitEnquiry(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        programme: 'Bachelor of Commerce (B.Com.)',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
            <span>Institutional Connect</span>
            <span aria-hidden="true">·</span>
            <span>Volakadu, Udupi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
            Contact & Campus Location
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Reach out to our administrative office for admissions, autonomous course information, or academic inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Campus Coordinates & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-4 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">Official Campus Postal Address</h4>
                  <p className="text-stone-600 leading-relaxed mt-1">
                    {settings.institutionName}<br />
                    {settings.address.line1}, {settings.address.line2}<br />
                    {settings.address.city} – {settings.address.pincode}, {settings.address.state}, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">Office Hotlines</h4>
                  <div className="space-y-0.5 mt-1 font-mono text-stone-600">
                    <p>{settings.phones[0]}</p>
                    {settings.phones[1] && <p>{settings.phones[1]}</p>}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">Electronic Mail</h4>
                  <p className="mt-1 text-stone-600">{settings.emails[0]}</p>
                  {settings.emails[1] && <p className="text-stone-600">{settings.emails[1]}</p>}
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-[#6B1426]/10 text-[#6B1426] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 text-xs">Administrative Hours</h4>
                  <p className="mt-1 text-stone-600">{settings.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Container */}
            <div className="rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs h-60 bg-stone-100">
              <iframe
                title="Poornaprajna College Campus Map"
                src={settings.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-1">
              Send an Official Enquiry
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Our administrative reception will review your enquiry and provide guidance regarding admissions, curriculum, or documentation.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-base">Enquiry Dispatched Successfully</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Thank you for writing to Poornaprajna College. The administrative desk has registered your query.
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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Candidate or Parent Name"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#7E192E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#7E192E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Mobile Contact *</label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 9845X XXXXX"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-[#7E192E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Programme of Interest</label>
                    <select
                      value={formData.programme}
                      onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#7E192E]"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Subject of Enquiry *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Admission Criteria, Laboratory Details, CA Foundation"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#7E192E]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Detailed Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query..."
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#7E192E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#6B1426] hover:bg-[#520F1D] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Transmitting...' : 'Submit Institutional Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
