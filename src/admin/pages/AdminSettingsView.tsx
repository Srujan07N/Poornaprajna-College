import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Save, Check, Phone, Mail, MapPin, Globe, Clock, Shield } from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const { settings, updateSettings } = useCollege();
  const [formData, setFormData] = useState({
    institutionName: settings.institutionName,
    autonomousStatusText: settings.autonomousStatusText,
    affiliationText: settings.affiliationText,
    naacText: settings.naacText,
    line1: settings.address.line1,
    line2: settings.address.line2,
    city: settings.address.city,
    district: settings.address.district,
    state: settings.address.state,
    pincode: settings.address.pincode,
    phone1: settings.phones[0] || '',
    phone2: settings.phones[1] || '',
    email1: settings.emails[0] || '',
    email2: settings.emails[1] || '',
    whatsappNumber: settings.whatsappNumber,
    officeHours: settings.officeHours,
    googleMapsEmbedUrl: settings.googleMapsEmbedUrl
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings({
        institutionName: formData.institutionName,
        autonomousStatusText: formData.autonomousStatusText,
        affiliationText: formData.affiliationText,
        naacText: formData.naacText,
        address: {
          line1: formData.line1,
          line2: formData.line2,
          city: formData.city,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode,
          country: 'India'
        },
        phones: [formData.phone1, formData.phone2].filter(Boolean),
        emails: [formData.email1, formData.email2].filter(Boolean),
        whatsappNumber: formData.whatsappNumber,
        officeHours: formData.officeHours,
        googleMapsEmbedUrl: formData.googleMapsEmbedUrl
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
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Institutional Configuration</span>
          <h1 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Contact, Location & Metadata Settings</h1>
          <p className="text-xs text-stone-500 mt-1">
            Global institution parameters, official phone numbers, WhatsApp contact link, and administrative address.
          </p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Check className="w-4 h-4 text-emerald-600" /> Settings Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs text-stone-700">
        {/* Core Identity */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-200 pb-2">Institutional Identity & Accreditation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block font-semibold text-stone-800 mb-1">Full Legal Institutional Name</label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Autonomous Conformation</label>
              <input
                type="text"
                value={formData.autonomousStatusText}
                onChange={(e) => setFormData({ ...formData, autonomousStatusText: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Affiliation & Management Council</label>
              <input
                type="text"
                value={formData.affiliationText}
                onChange={(e) => setFormData({ ...formData, affiliationText: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-stone-800 mb-1">NAAC Re-accreditation Label</label>
              <input
                type="text"
                value={formData.naacText}
                onChange={(e) => setFormData({ ...formData, naacText: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-200 pb-2">Communications & Hotlines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Primary Landline</label>
              <input
                type="text"
                value={formData.phone1}
                onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                placeholder="+91 820 2520415"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Secondary Landline / Office</label>
              <input
                type="text"
                value={formData.phone2}
                onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                placeholder="+91 820 2520335"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">WhatsApp Admissions Desk Number</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="+91 94801 23456"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Office General Email</label>
              <input
                type="email"
                value={formData.email1}
                onChange={(e) => setFormData({ ...formData, email1: e.target.value })}
                placeholder="office@ppc.edu.in"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Admissions Inquiries Email</label>
              <input
                type="email"
                value={formData.email2}
                onChange={(e) => setFormData({ ...formData, email2: e.target.value })}
                placeholder="admissions@ppc.edu.in"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Administrative Working Hours</label>
              <input
                type="text"
                value={formData.officeHours}
                onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                placeholder="Mon - Fri: 9:00 AM - 5:00 PM"
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Location & Address */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold text-stone-900 border-b border-stone-200 pb-2">Postal Address & Coordinates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Campus Name / Line 1</label>
              <input
                type="text"
                value={formData.line1}
                onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">Street / Locality</label>
              <input
                type="text"
                value={formData.line2}
                onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">District</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">PIN Code</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block font-semibold text-stone-800 mb-1">Google Maps Embed URL</label>
              <input
                type="text"
                value={formData.googleMapsEmbedUrl}
                onChange={(e) => setFormData({ ...formData, googleMapsEmbedUrl: e.target.value })}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Updating Settings...' : 'Save Institutional Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
