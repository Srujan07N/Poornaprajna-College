import React from 'react';
import { useCollege } from '../../context/CollegeContext';
import {
  Users,
  GraduationCap,
  Clock,
  CheckCircle2,
  Building2,
  FileText,
  Mail,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { applications, courses, departments, enquiries, notices, setAdminSubPage } = useCollege();

  const totalApps = applications.length;
  const pendingApps = applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length;
  const approvedApps = applications.filter(a => a.status === 'Approved').length;
  const shortlistedApps = applications.filter(a => a.status === 'Shortlisted').length;
  const newEnquiries = enquiries.filter(e => e.status === 'New').length;

  // Group applications by programme
  const courseCountMap: Record<string, number> = {};
  applications.forEach(a => {
    courseCountMap[a.preferredCourseTitle] = (courseCountMap[a.preferredCourseTitle] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-white border border-stone-200/80 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Academic Year 2026–27 Dashboard</span>
          <h1 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">Poornaprajna Institutional Administration</h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time management for admissions, autonomous course offerings, examination records, circulars, and institutional CMS.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminSubPage('admissions')}
            className="px-3.5 py-2 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            Review Applications ({pendingApps})
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setAdminSubPage('cms')}
            className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
          >
            Edit Website CMS
          </button>
        </div>
      </div>

      {/* Primary Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-medium text-stone-600">Total Applicants</span>
            <Users className="w-4 h-4 text-[#7E192E]" />
          </div>
          <p className="text-2xl font-bold font-serif text-stone-900 tabular-nums">{totalApps}</p>
          <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
            <TrendingUp className="w-3 h-3" /> 2026–27 intake
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-medium text-stone-600">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold font-serif text-amber-900 tabular-nums">{pendingApps}</p>
          <span className="text-[11px] text-stone-500 mt-1 block">Requires action</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-medium text-stone-600">Approved Seats</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold font-serif text-emerald-800 tabular-nums">{approvedApps}</p>
          <span className="text-[11px] text-stone-500 mt-1 block">{shortlistedApps} Shortlisted</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-medium text-stone-600">Active Courses</span>
            <GraduationCap className="w-4 h-4 text-[#C59B27]" />
          </div>
          <p className="text-2xl font-bold font-serif text-stone-900 tabular-nums">{courses.length}</p>
          <span className="text-[11px] text-stone-500 mt-1 block">UG & PG Autonomous</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-medium text-stone-600">Departments</span>
            <Building2 className="w-4 h-4 text-stone-600" />
          </div>
          <p className="text-2xl font-bold font-serif text-stone-900 tabular-nums">{departments.length}</p>
          <span className="text-[11px] text-stone-500 mt-1 block">Arts, Sci, Com, IT</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-xs font-medium text-stone-600">New Enquiries</span>
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold font-serif text-blue-900 tabular-nums">{newEnquiries}</p>
          <span className="text-[11px] text-stone-500 mt-1 block">{enquiries.length} total received</span>
        </div>
      </div>

      {/* Two Column: Program Distribution + Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications by Course */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-stone-900">Admissions by Academic Programme</h2>
              <p className="text-xs text-stone-500">Breakdown of online student registrations for Academic Year 2026–27</p>
            </div>
            <button
              onClick={() => setAdminSubPage('courses')}
              className="text-xs font-semibold text-[#7E192E] hover:underline"
            >
              Manage Programmes
            </button>
          </div>

          <div className="space-y-3">
            {courses.map((course) => {
              const count = courseCountMap[course.title] || 0;
              const percent = totalApps > 0 ? Math.round((count / totalApps) * 100) : 0;
              return (
                <div key={course.id} className="p-3 rounded-lg bg-stone-50/70 border border-stone-200/60">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-stone-800">{course.title}</span>
                    <span className="text-stone-600 font-mono tabular-nums">
                      {count} applicants ({percent}%) · Intake: {course.intake}
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#6B1426] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, percent))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admissions Status Pipeline */}
        <div className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-stone-900 mb-1">Application Pipeline</h2>
            <p className="text-xs text-stone-500 mb-4">Current verification workflow status</p>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-xs">
                <span className="font-medium text-blue-900">Submitted (Awaiting check)</span>
                <span className="font-bold text-blue-900 font-mono">{applications.filter(a => a.status === 'Submitted').length}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 border border-amber-100 text-xs">
                <span className="font-medium text-amber-900">Under Review</span>
                <span className="font-bold text-amber-900 font-mono">{applications.filter(a => a.status === 'Under Review').length}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-purple-50 border border-purple-100 text-xs">
                <span className="font-medium text-purple-900">Shortlisted (Merit)</span>
                <span className="font-bold text-purple-900 font-mono">{shortlistedApps}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs">
                <span className="font-medium text-emerald-900">Approved (Provisional)</span>
                <span className="font-bold text-emerald-900 font-mono">{approvedApps}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-50 border border-rose-100 text-xs">
                <span className="font-medium text-rose-900">Rejected / Incomplete</span>
                <span className="font-bold text-rose-900 font-mono">{applications.filter(a => a.status === 'Rejected').length}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-200">
            <button
              onClick={() => setAdminSubPage('admissions')}
              className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors text-center"
            >
              Open Full Admissions Desk
            </button>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-200/80 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-stone-900">Recent Online Admissions</h2>
            <p className="text-xs text-stone-500">Latest applicant records received through the official web portal</p>
          </div>
          <button
            onClick={() => setAdminSubPage('admissions')}
            className="text-xs font-semibold text-[#7E192E] hover:underline"
          >
            View All ({applications.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Selected Programme</th>
                <th className="py-3 px-4">12th/PUC %</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70">
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-[#7E192E]">{app.applicationId}</td>
                  <td className="py-3 px-4 font-medium text-stone-900">{app.fullName}</td>
                  <td className="py-3 px-4 text-stone-600">{app.preferredCourseTitle}</td>
                  <td className="py-3 px-4 font-mono tabular-nums">{app.percentageMarks}%</td>
                  <td className="py-3 px-4 text-stone-500">{app.mobileNumber}</td>
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
                      onClick={() => setAdminSubPage('admissions')}
                      className="text-stone-700 hover:text-[#7E192E] font-semibold hover:underline"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
