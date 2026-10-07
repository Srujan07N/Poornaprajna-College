import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { AdmissionApplication, ApplicationStatus } from '../../types';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileCheck,
  Calendar,
  Phone,
  Mail,
  MapPin,
  X
} from 'lucide-react';

export const AdminAdmissionsView: React.FC = () => {
  const { applications, courses, updateApplicationStatus } = useCollege();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [newRemarks, setNewRemarks] = useState('');
  const [updating, setUpdating] = useState(false);

  // Filtering
  const filteredApps = applications.filter((app) => {
    if (statusFilter !== 'all' && app.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (courseFilter !== 'all' && app.preferredCourseId !== courseFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        app.fullName.toLowerCase().includes(q) ||
        app.applicationId.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.mobileNumber.includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleOpenDetail = (app: AdmissionApplication) => {
    setSelectedApp(app);
    setNewRemarks(app.adminRemarks || '');
  };

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!selectedApp) return;
    setUpdating(true);
    try {
      await updateApplicationStatus(selectedApp.id, status, newRemarks);
      setSelectedApp({ ...selectedApp, status, adminRemarks: newRemarks });
    } finally {
      setUpdating(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Application ID', 'Full Name', 'Programme', '12th Marks %', 'Category', 'Mobile', 'Email', 'Status', 'Submitted At'];
    const rows = filteredApps.map(a => [
      a.applicationId,
      `"${a.fullName}"`,
      `"${a.preferredCourseTitle}"`,
      a.percentageMarks,
      a.category,
      a.mobileNumber,
      a.email,
      a.status,
      a.submittedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Poornaprajna_Admissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Official Admissions Management</span>
          <h1 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Online Application Desk (2026–27)</h1>
          <p className="text-xs text-stone-500 mt-1">
            Total records: <span className="font-semibold text-stone-800">{applications.length}</span> | Showing filtered: <span className="font-semibold text-stone-800">{filteredApps.length}</span>
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors flex items-center gap-1.5 self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          Export Applications (CSV)
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white border border-stone-200/80 rounded-xl p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name, App ID (e.g. PPC-2026-1042)..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7E192E] bg-stone-50/50"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7E192E] bg-stone-50/50"
          >
            <option value="all">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7E192E] bg-stone-50/50"
          >
            <option value="all">All Programmes</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Data Table */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">App ID</th>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Programme</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">12th Score</th>
                <th className="py-3 px-4">Submission Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-stone-500">
                    No admission applications match the criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-[#7E192E]">{app.applicationId}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-stone-900">{app.fullName}</p>
                      <span className="text-[11px] text-stone-500">{app.mobileNumber}</span>
                    </td>
                    <td className="py-3 px-4 text-stone-700 font-medium">{app.preferredCourseTitle}</td>
                    <td className="py-3 px-4 text-stone-600">{app.category}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-stone-800">{app.percentageMarks}%</td>
                    <td className="py-3 px-4 text-stone-500">{app.submittedAt.split('T')[0]}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${
                        app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-800' :
                        app.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(app)}
                        className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-[#7E192E]/10 hover:text-[#7E192E] text-stone-700 rounded transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicant Detailed Inspection Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7E192E]">Application Dossier</span>
                <h3 className="text-lg font-serif font-bold text-stone-900">{selectedApp.fullName}</h3>
                <span className="text-xs font-mono text-stone-500">{selectedApp.applicationId}</span>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-stone-700">
              {/* Status Header */}
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div>
                  <span className="text-stone-500 block text-[11px]">Current Status</span>
                  <span className="font-semibold text-sm text-stone-900">{selectedApp.status}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Submission Time</span>
                  <span className="font-mono text-stone-700">{selectedApp.submittedAt}</span>
                </div>
              </div>

              {/* Personal & Contact Grid */}
              <div>
                <h4 className="font-semibold text-stone-900 mb-2 border-b border-stone-200 pb-1">Personal & Contact Credentials</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Date of Birth / Gender</span>
                    <span className="font-medium">{selectedApp.dob} · {selectedApp.gender}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Category</span>
                    <span className="font-medium">{selectedApp.category}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Mobile Number</span>
                    <span className="font-medium font-mono">{selectedApp.mobileNumber}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Email Address</span>
                    <span className="font-medium">{selectedApp.email}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-500 block text-[11px]">Address</span>
                    <span className="font-medium">{selectedApp.address}, {selectedApp.city}, {selectedApp.state} - {selectedApp.pincode}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Parent / Guardian</span>
                    <span className="font-medium">{selectedApp.parentName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Parent Mobile</span>
                    <span className="font-medium font-mono">{selectedApp.parentMobile}</span>
                  </div>
                </div>
              </div>

              {/* Academic History */}
              <div>
                <h4 className="font-semibold text-stone-900 mb-2 border-b border-stone-200 pb-1">Academic Qualification</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Sought Programme</span>
                    <span className="font-bold text-[#7E192E]">{selectedApp.preferredCourseTitle}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Qualifying 12th/PUC Percentage</span>
                    <span className="font-bold font-mono text-emerald-800 text-sm">{selectedApp.percentageMarks}%</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Examination Board</span>
                    <span className="font-medium">{selectedApp.pucBoard}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Year of Passing</span>
                    <span className="font-medium">{selectedApp.passingYear}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-500 block text-[11px]">Previous Institution</span>
                    <span className="font-medium">{selectedApp.previousInstitution || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              {/* Document Checklist Verification */}
              <div>
                <h4 className="font-semibold text-stone-900 mb-2 border-b border-stone-200 pb-1">Uploaded Document Dossier</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2 rounded bg-stone-50 border border-stone-200 text-center">
                    <span className="block text-[11px] text-stone-500">Passport Photo</span>
                    <span className={`text-[11px] font-semibold ${selectedApp.documentsUploaded.photograph ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {selectedApp.documentsUploaded.photograph ? '✓ Uploaded' : 'Missing'}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-stone-50 border border-stone-200 text-center">
                    <span className="block text-[11px] text-stone-500">Govt ID Proof</span>
                    <span className={`text-[11px] font-semibold ${selectedApp.documentsUploaded.idProof ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {selectedApp.documentsUploaded.idProof ? '✓ Uploaded' : 'Missing'}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-stone-50 border border-stone-200 text-center">
                    <span className="block text-[11px] text-stone-500">12th Marks Card</span>
                    <span className={`text-[11px] font-semibold ${selectedApp.documentsUploaded.marksCard ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {selectedApp.documentsUploaded.marksCard ? '✓ Uploaded' : 'Missing'}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-stone-50 border border-stone-200 text-center">
                    <span className="block text-[11px] text-stone-500">Transfer Cert.</span>
                    <span className={`text-[11px] font-semibold ${selectedApp.documentsUploaded.transferCertificate ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {selectedApp.documentsUploaded.transferCertificate ? '✓ Uploaded' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Internal Admin Remarks */}
              <div>
                <label className="block font-semibold text-stone-900 mb-1">Administrative Remarks & Decision Notes</label>
                <textarea
                  rows={2}
                  value={newRemarks}
                  onChange={(e) => setNewRemarks(e.target.value)}
                  placeholder="e.g., Documents verified by scrutiny committee. Merit seat offered in B.Com Batch A."
                  className="w-full p-2.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7E192E]"
                />
              </div>

              {/* Action Buttons to update status */}
              <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-stone-700 mr-2">Change Status:</span>
                <button
                  onClick={() => handleStatusChange('Under Review')}
                  disabled={updating}
                  className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => handleStatusChange('Shortlisted')}
                  disabled={updating}
                  className="px-3 py-1.5 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Shortlist for Merit List
                </button>
                <button
                  onClick={() => handleStatusChange('Approved')}
                  disabled={updating}
                  className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  Approve Admission
                </button>
                <button
                  onClick={() => handleStatusChange('Rejected')}
                  disabled={updating}
                  className="px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
