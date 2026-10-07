import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Notice, NoticeCategory } from '../../types';
import { Plus, Trash2, Edit2, FileText, Bell, AlertCircle, X, Check } from 'lucide-react';

export const AdminNoticesView: React.FC = () => {
  const { notices, createNotice, updateNotice, deleteNotice } = useCollege();
  const [editingNotice, setEditingNotice] = useState<Partial<Notice> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleStartCreate = () => {
    setIsNew(true);
    setEditingNotice({
      title: '',
      category: 'General',
      date: new Date().toISOString().split('T')[0],
      description: '',
      fileName: 'Official_Circular.pdf',
      fileUrl: '#download',
      isImportant: false,
      isPublished: true,
      targetAudience: 'All'
    });
  };

  const handleStartEdit = (notice: Notice) => {
    setIsNew(false);
    setEditingNotice({ ...notice });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice || !editingNotice.title) return;
    setSubmitting(true);
    try {
      if (isNew) {
        await createNotice(editingNotice);
      } else if (editingNotice.id) {
        await updateNotice(editingNotice.id, editingNotice);
      }
      setEditingNotice(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete notice "${title}"?`)) {
      await deleteNotice(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Notice Board & Circulars</span>
          <h1 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Official Institutional Notifications</h1>
          <p className="text-xs text-stone-500 mt-1">
            Publish examination time tables, circulars, admission bulletins, and academic alerts to the official student notice board.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-3.5 py-2 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Publish New Notice
        </button>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Title & Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Target Audience</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-stone-500 whitespace-nowrap">{notice.date}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-stone-900">{notice.title}</p>
                    <p className="text-stone-500 line-clamp-1 text-[11px] mt-0.5">{notice.description}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-stone-700">{notice.category}</span>
                  </td>
                  <td className="py-3 px-4 text-stone-600">{notice.targetAudience}</td>
                  <td className="py-3 px-4">
                    {notice.isImportant ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                        <AlertCircle className="w-3 h-3" /> Urgent
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-500">Standard</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleStartEdit(notice)}
                        className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                        title="Edit Notice"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id, notice.title)}
                        className="p-1 rounded text-rose-600 hover:text-rose-900 hover:bg-rose-50"
                        title="Delete Notice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice Edit/Create Modal */}
      {editingNotice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-base font-serif font-bold text-stone-900">
                {isNew ? 'Publish Official Notice' : 'Edit Notice'}
              </h3>
              <button
                onClick={() => setEditingNotice(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3.5 text-xs text-stone-700">
              <div>
                <label className="block font-semibold text-stone-900 mb-1">Notice Heading</label>
                <input
                  type="text"
                  required
                  value={editingNotice.title || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  placeholder="e.g. Schedule of Autonomous End-Semester Examinations"
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Category</label>
                  <select
                    value={editingNotice.category || 'General'}
                    onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value as NoticeCategory })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="Admission">Admission</option>
                    <option value="Examination">Examination</option>
                    <option value="Results">Results</option>
                    <option value="Circular">Circular</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Holidays">Holidays</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Publication Date</label>
                  <input
                    type="date"
                    required
                    value={editingNotice.date || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, date: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-900 mb-1">Target Audience</label>
                <select
                  value={editingNotice.targetAudience || 'All'}
                  onChange={(e) => setEditingNotice({ ...editingNotice, targetAudience: e.target.value as any })}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                >
                  <option value="All">All Visitors & Students</option>
                  <option value="Students">Registered Students</option>
                  <option value="Faculty">Faculty & Staff</option>
                  <option value="Applicants">Admission Applicants</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-900 mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  value={editingNotice.description || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, description: e.target.value })}
                  placeholder="Official notification text to be read by students..."
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isImportant"
                  checked={Boolean(editingNotice.isImportant)}
                  onChange={(e) => setEditingNotice({ ...editingNotice, isImportant: e.target.checked })}
                  className="rounded text-[#7E192E] focus:ring-[#7E192E]"
                />
                <label htmlFor="isImportant" className="font-semibold text-stone-800 text-xs">
                  Mark as High Priority / Urgent Notice
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingNotice(null)}
                  className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg"
                >
                  {submitting ? 'Publishing...' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
