import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { ContactEnquiry } from '../../types';
import { Mail, Phone, Calendar, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const AdminEnquiriesView: React.FC = () => {
  const { enquiries, updateEnquiryStatus } = useCollege();
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [replyNotes, setReplyNotes] = useState('');

  const handleUpdate = async (id: string, status: string) => {
    await updateEnquiryStatus(id, status, replyNotes);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: status as any, adminNotes: replyNotes });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Public Relations & Admissions Helpdesk</span>
        <h1 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Visitor & Applicant Inquiries</h1>
        <p className="text-xs text-stone-500 mt-1">
          Review general queries, course questions, and requests submitted via the official contact and quick enquiry forms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* List of Enquiries */}
        <div className="md:col-span-2 bg-white rounded-xl border border-stone-200/80 shadow-xs divide-y divide-stone-200/70 overflow-hidden">
          {enquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500">No enquiries received yet.</div>
          ) : (
            enquiries.map((enq) => (
              <div
                key={enq.id}
                onClick={() => {
                  setSelectedEnquiry(enq);
                  setReplyNotes(enq.adminNotes || '');
                }}
                className={`p-4 cursor-pointer hover:bg-stone-50 transition-colors ${
                  selectedEnquiry?.id === enq.id ? 'bg-[#7E192E]/5 border-l-4 border-l-[#7E192E]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-stone-900">{enq.name}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    enq.status === 'New' ? 'bg-blue-100 text-blue-800' :
                    enq.status === 'Replied' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-stone-100 text-stone-700'
                  }`}>
                    {enq.status}
                  </span>
                </div>
                <h4 className="text-xs font-medium text-stone-800 mb-1">{enq.subject}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-2">{enq.message}</p>
                <div className="flex items-center gap-4 text-[10px] text-stone-400 mt-2 font-mono">
                  <span>{enq.mobile}</span>
                  <span>·</span>
                  <span>{enq.submittedAt.split('T')[0]}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Enquiry Details & Action */}
        <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs p-5 flex flex-col justify-between">
          {selectedEnquiry ? (
            <div className="space-y-4 text-xs text-stone-700">
              <div className="border-b border-stone-200 pb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Enquiry Sender</span>
                <h3 className="font-semibold text-stone-900 text-sm mt-0.5">{selectedEnquiry.name}</h3>
                <div className="mt-1 space-y-0.5 text-stone-600">
                  <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-stone-400" /> {selectedEnquiry.email}</p>
                  <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-stone-400" /> {selectedEnquiry.mobile}</p>
                  {selectedEnquiry.programme && (
                    <p className="text-[#7E192E] font-medium pt-1">Programme: {selectedEnquiry.programme}</p>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Subject & Query</span>
                <p className="font-semibold text-stone-800 mt-1">{selectedEnquiry.subject}</p>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 mt-1.5 text-stone-700 whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-800 mb-1">Administrative Notes / Action Taken</label>
                <textarea
                  rows={3}
                  value={replyNotes}
                  onChange={(e) => setReplyNotes(e.target.value)}
                  placeholder="e.g. Telephonic call made on 4th April. Prospectus emailed to candidate."
                  className="w-full p-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center gap-2">
                <button
                  onClick={() => handleUpdate(selectedEnquiry.id, 'Replied')}
                  className="px-3 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors"
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => handleUpdate(selectedEnquiry.id, 'Closed')}
                  className="px-3 py-1.5 text-xs font-semibold bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg transition-colors"
                >
                  Close Query
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-stone-400">
              Select an enquiry from the list to review details and document communications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
