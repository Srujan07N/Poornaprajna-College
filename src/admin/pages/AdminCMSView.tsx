import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Save, Check, RefreshCw } from 'lucide-react';

export const AdminCMSView: React.FC = () => {
  const { settings, updateSettings } = useCollege();
  const [formData, setFormData] = useState({
    tagline: settings.tagline,
    announcementText: settings.announcementText,
    announcementActive: settings.announcementActive,
    principalName: settings.principalMessage.name,
    principalDesignation: settings.principalMessage.designation,
    principalQual: settings.principalMessage.qualifications,
    principalParagraph1: settings.principalMessage.text[0] || '',
    principalParagraph2: settings.principalMessage.text[1] || '',
    principalParagraph3: settings.principalMessage.text[2] || '',
    aboutSummary1: settings.aboutSummary[0] || '',
    aboutSummary2: settings.aboutSummary[1] || '',
    admissionStatus: settings.admissionStatus,
    academicYear: settings.academicYear
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings({
        tagline: formData.tagline,
        announcementText: formData.announcementText,
        announcementActive: formData.announcementActive,
        admissionStatus: formData.admissionStatus as any,
        academicYear: formData.academicYear,
        principalMessage: {
          name: formData.principalName,
          designation: formData.principalDesignation,
          qualifications: formData.principalQual,
          text: [formData.principalParagraph1, formData.principalParagraph2, formData.principalParagraph3].filter(Boolean)
        },
        aboutSummary: [formData.aboutSummary1, formData.aboutSummary2].filter(Boolean)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Website Content Management (CMS)</span>
          <h1 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Live Institutional Content Editor</h1>
          <p className="text-xs text-stone-500 mt-1">
            Update homepage hero headlines, announcement banners, principal's desk letter, and heritage narrative without touching code.
          </p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Check className="w-4 h-4 text-emerald-600" /> Changes Published Live
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs text-stone-700">
        {/* Announcement Ticker Bar */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h2 className="text-sm font-semibold text-stone-900">Top Announcement Banner</h2>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="annActive"
                checked={formData.announcementActive}
                onChange={(e) => setFormData({ ...formData, announcementActive: e.target.checked })}
                className="rounded text-[#7E192E] focus:ring-[#7E192E]"
              />
              <label htmlFor="annActive" className="text-xs font-semibold text-stone-800">
                Active on Website Header
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-800 mb-1">Banner Announcement Text</label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
              className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Hero Section Copy */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-200 pb-2">Homepage Hero & Tagline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-semibold text-stone-800 mb-1">Institutional Motto / Hero Headline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Current Academic Year</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Public Admission Status</label>
              <select
                value={formData.admissionStatus}
                onChange={(e) => setFormData({ ...formData, admissionStatus: e.target.value as any })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              >
                <option value="Admissions Open 2026–27">Admissions Open 2026–27</option>
                <option value="Admissions Closing Soon">Admissions Closing Soon</option>
                <option value="Admissions Closed">Admissions Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Principal's Message */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-200 pb-2">Principal's Desk Message</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Principal Name</label>
              <input
                type="text"
                value={formData.principalName}
                onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Designation</label>
              <input
                type="text"
                value={formData.principalDesignation}
                onChange={(e) => setFormData({ ...formData, principalDesignation: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Qualifications</label>
              <input
                type="text"
                value={formData.principalQual}
                onChange={(e) => setFormData({ ...formData, principalQual: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Principal Message - Paragraph 1</label>
              <textarea
                rows={3}
                value={formData.principalParagraph1}
                onChange={(e) => setFormData({ ...formData, principalParagraph1: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Principal Message - Paragraph 2</label>
              <textarea
                rows={3}
                value={formData.principalParagraph2}
                onChange={(e) => setFormData({ ...formData, principalParagraph2: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* About College History Narrative */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-200 pb-2">About Section & Heritage Narrative</h2>
          <div>
            <label className="block font-semibold text-stone-800 mb-1">Foundational History (Sri Admar Mutt & 1960)</label>
            <textarea
              rows={3}
              value={formData.aboutSummary1}
              onChange={(e) => setFormData({ ...formData, aboutSummary1: e.target.value })}
              className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold text-stone-800 mb-1">Autonomous Status & Modern Growth</label>
            <textarea
              rows={3}
              value={formData.aboutSummary2}
              onChange={(e) => setFormData({ ...formData, aboutSummary2: e.target.value })}
              className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? 'Saving...' : 'Publish Content Updates'}
          </button>
        </div>
      </form>
    </div>
  );
};
