import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  UploadCloud,
  FileCheck,
  Building
} from 'lucide-react';
import { ApplicationTrackModal } from '../modals/ApplicationTrackModal';

export const AdmissionsView: React.FC = () => {
  const { settings, courses, submitApplication } = useCollege();
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'Male',
    mobileNumber: '',
    email: '',
    address: '',
    city: 'Udupi',
    state: 'Karnataka',
    pincode: '576101',
    pucBoard: 'Karnataka Department of Pre-University Education',
    passingYear: '2026',
    percentageMarks: '',
    preferredCourseId: courses[0]?.id || 'crs-bcom',
    preferredCourseTitle: courses[0]?.title || 'Bachelor of Commerce (B.Com.)',
    category: 'General',
    previousInstitution: '',
    parentName: '',
    parentMobile: '',
    documentsUploaded: {
      photograph: true,
      idProof: true,
      marksCard: true,
      transferCertificate: false
    }
  });

  const [submittedApp, setSubmittedApp] = useState<{ applicationId: string; fullName: string; course: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCourseChange = (courseId: string) => {
    const selected = courses.find(c => c.id === courseId);
    setFormData(prev => ({
      ...prev,
      preferredCourseId: courseId,
      preferredCourseTitle: selected?.title || prev.preferredCourseTitle
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await submitApplication(formData);
      setSubmittedApp({
        applicationId: res.applicationId,
        fullName: formData.fullName,
        course: formData.preferredCourseTitle
      });
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Banner */}
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#DEB038] tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Admissions Portal · Academic Year {settings.academicYear}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Undergraduate & Postgraduate Admissions
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl font-sans">
              Welcome to the official online application portal of Poornaprajna College (Autonomous), Udupi. Complete your online registration to be considered for autonomous merit selection.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setTrackModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-stone-700"
              >
                <FileCheck className="w-3.5 h-3.5 text-[#DEB038]" />
                Track Already Submitted Application
              </button>
            </div>
          </div>
        </div>

        {/* Admission Guidelines & Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-xs">
            <span className="text-xs font-bold font-mono text-[#7E192E] block mb-1">STEP 01</span>
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">Verify Eligibility</h4>
            <p className="text-xs text-stone-600">Review minimum percentage requirements and subject combinations for your sought programme.</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-xs">
            <span className="text-xs font-bold font-mono text-[#7E192E] block mb-1">STEP 02</span>
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">Fill Application</h4>
            <p className="text-xs text-stone-600">Enter personal credentials, qualifying 12th/PUC marks, and parent details in the digital form below.</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-xs">
            <span className="text-xs font-bold font-mono text-[#7E192E] block mb-1">STEP 03</span>
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">Get Application ID</h4>
            <p className="text-xs text-stone-600">Receive your unique reference ID (e.g. PPC-2026-XXXX) for scrutiny tracking.</p>
          </div>
          <div className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-xs">
            <span className="text-xs font-bold font-mono text-[#7E192E] block mb-1">STEP 04</span>
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">Document Scrutiny</h4>
            <p className="text-xs text-stone-600">Visit campus administrative office with originals for final seat confirmation upon merit list announcement.</p>
          </div>
        </div>

        {/* Application Submission Container */}
        {submittedApp ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">
                Application Submitted Successfully
              </span>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Poornaprajna College Admission Desk
              </h2>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
              <p className="text-stone-500">Your Official Application Reference ID is:</p>
              <p className="font-mono font-bold text-2xl text-[#7E192E] tracking-wider">
                {submittedApp.applicationId}
              </p>
              <div className="pt-2 border-t border-stone-200/80 text-left space-y-1">
                <p><span className="text-stone-500">Candidate:</span> <span className="font-semibold">{submittedApp.fullName}</span></p>
                <p><span className="text-stone-500">Selected Programme:</span> <span className="font-semibold">{submittedApp.course}</span></p>
                <p><span className="text-stone-500">Status:</span> <span className="font-semibold text-blue-700">Submitted for Scrutiny</span></p>
              </div>
            </div>

            <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
              Please note down your Application ID. You can track your admission scrutiny status at any time using the "Track Application" feature on this portal.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setSubmittedApp(null)}
                className="px-5 py-2.5 rounded-lg bg-[#6B1426] hover:bg-[#520F1D] text-white text-xs font-semibold transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-10 shadow-xs">
            <div className="border-b border-stone-200 pb-5 mb-8">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Application Form 2026–27</span>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">Candidate Registration Form</h2>
              <p className="text-xs text-stone-500 mt-1">
                Fill in all details carefully as per your Class 10 and 12th/PUC marks cards.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 text-xs text-stone-700">
              {/* Section 1: Desired Programme */}
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-sm mb-3 pb-1 border-b border-stone-200">
                  1. Programme Preference
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-stone-800 mb-1">Preferred Autonomous Course *</label>
                    <select
                      value={formData.preferredCourseId}
                      onChange={(e) => handleCourseChange(e.target.value)}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs bg-stone-50/50"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.degreeLevel} - {c.stream})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Personal Credentials */}
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-sm mb-3 pb-1 border-b border-stone-200">
                  2. Personal Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-stone-800 mb-1">Full Name (as per 10th Marks Card) *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vignesh A. Bhat"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Mobile Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      placeholder="+91 9845X XXXXX"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="candidate@example.com"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Social Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    >
                      <option value="General">General Merit</option>
                      <option value="OBC">OBC (Category 1, 2A, 2B, 3A, 3B)</option>
                      <option value="SC">Scheduled Caste (SC)</option>
                      <option value="ST">Scheduled Tribe (ST)</option>
                      <option value="EWS">EWS</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-stone-800 mb-1">Residential Address *</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Door No, Street Name, Locality"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Academic Qualifications */}
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-sm mb-3 pb-1 border-b border-stone-200">
                  3. Qualifying Examination (12th / 2nd PUC)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-stone-800 mb-1">Examination Board *</label>
                    <input
                      type="text"
                      required
                      value={formData.pucBoard}
                      onChange={(e) => setFormData({ ...formData, pucBoard: e.target.value })}
                      placeholder="Karnataka DPUE / CBSE / ICSE / Other State Board"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Year of Passing *</label>
                    <input
                      type="text"
                      required
                      value={formData.passingYear}
                      onChange={(e) => setFormData({ ...formData, passingYear: e.target.value })}
                      placeholder="2026"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Aggregate Marks Percentage (%) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.percentageMarks}
                      onChange={(e) => setFormData({ ...formData, percentageMarks: e.target.value })}
                      placeholder="e.g. 88.50"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-stone-800 mb-1">Previous Institution Attended *</label>
                    <input
                      type="text"
                      required
                      value={formData.previousInstitution}
                      onChange={(e) => setFormData({ ...formData, previousInstitution: e.target.value })}
                      placeholder="e.g. Poornaprajna PU College / MGM PU College"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Parent / Guardian Information */}
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-sm mb-3 pb-1 border-b border-stone-200">
                  4. Parent / Guardian Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Father's / Mother's Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="Parent Full Name"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Parent Mobile Contact *</label>
                    <input
                      type="tel"
                      required
                      value={formData.parentMobile}
                      onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })}
                      placeholder="+91 9448X XXXXX"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Document Checkboxes */}
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-sm mb-3 pb-1 border-b border-stone-200">
                  5. Document Dossier Checklist
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <label className="p-3 rounded-lg border border-stone-200 bg-stone-50 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.documentsUploaded.photograph}
                      onChange={(e) => setFormData({
                        ...formData,
                        documentsUploaded: { ...formData.documentsUploaded, photograph: e.target.checked }
                      })}
                      className="rounded text-[#7E192E]"
                    />
                    <span className="text-xs">Photograph Ready</span>
                  </label>

                  <label className="p-3 rounded-lg border border-stone-200 bg-stone-50 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.documentsUploaded.idProof}
                      onChange={(e) => setFormData({
                        ...formData,
                        documentsUploaded: { ...formData.documentsUploaded, idProof: e.target.checked }
                      })}
                      className="rounded text-[#7E192E]"
                    />
                    <span className="text-xs">Aadhaar/ID Proof</span>
                  </label>

                  <label className="p-3 rounded-lg border border-stone-200 bg-stone-50 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.documentsUploaded.marksCard}
                      onChange={(e) => setFormData({
                        ...formData,
                        documentsUploaded: { ...formData.documentsUploaded, marksCard: e.target.checked }
                      })}
                      className="rounded text-[#7E192E]"
                    />
                    <span className="text-xs">12th Marks Card</span>
                  </label>

                  <label className="p-3 rounded-lg border border-stone-200 bg-stone-50 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.documentsUploaded.transferCertificate}
                      onChange={(e) => setFormData({
                        ...formData,
                        documentsUploaded: { ...formData.documentsUploaded, transferCertificate: e.target.checked }
                      })}
                      className="rounded text-[#7E192E]"
                    />
                    <span className="text-xs">TC (if available)</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-stone-500">
                  By submitting this form, I affirm that all statements made herein are authentic and verified against official marks records.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 bg-[#6B1426] hover:bg-[#520F1D] text-white text-xs font-semibold rounded-lg shadow-sm transition-all shrink-0"
                >
                  {submitting ? 'Generating Application ID...' : 'Submit Admission Application'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <ApplicationTrackModal isOpen={trackModalOpen} onClose={() => setTrackModalOpen(false)} />
    </div>
  );
};
