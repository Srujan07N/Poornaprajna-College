import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { X, User, GraduationCap, CheckCircle2, Clock, Calendar, Download, LogOut, FileText } from 'lucide-react';

export const StudentPortalModal: React.FC = () => {
  const { isStudentPortalOpen, setIsStudentPortalOpen, results } = useCollege();
  const [regNo, setRegNo] = useState('22PPC1042');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isStudentPortalOpen) return null;

  const currentResult = results.find(r => r.registerNumber.toUpperCase() === regNo.toUpperCase()) || results[0];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#1C1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6B1426] text-[#DEB038] flex items-center justify-center font-bold text-xs border border-stone-700">
              PPC
            </div>
            <div>
              <h3 className="font-serif font-bold text-base leading-tight">Student Academic Portal</h3>
              <p className="text-[10px] text-stone-400">Autonomous Evaluation & Student Information System</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsStudentPortalOpen(false);
              setIsLoggedIn(false);
            }}
            className="p-1 rounded text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-xs text-stone-700">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto py-6 space-y-4">
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Student Verification</span>
                <h4 className="text-lg font-serif font-bold text-stone-900 mt-1">Access Autonomous Student Dashboard</h4>
                <p className="text-xs text-stone-500 mt-1">Enter your College Autonomous Register Number to view marks, attendance, and hall tickets.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">College Register Number</label>
                  <input
                    type="text"
                    required
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    placeholder="e.g. 22PPC1042"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Student Portal PIN / DOB</label>
                  <input
                    type="password"
                    defaultValue="••••••"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg text-xs font-semibold transition-colors mt-2"
                >
                  Sign In to Student Portal
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-stone-200">
                <span className="text-[11px] font-semibold text-stone-500 block mb-2">Pre-configured Demo Student:</span>
                <button
                  type="button"
                  onClick={() => {
                    setRegNo('22PPC1042');
                    setIsLoggedIn(true);
                  }}
                  className="w-full text-left p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-stone-900">Aditya S. Shenoy (22PPC1042)</span>
                    <span className="text-stone-500 block text-[11px]">B.Com Semester IV · Distinction</span>
                  </div>
                  <span className="text-[10px] bg-[#6B1426]/10 text-[#6B1426] px-1.5 py-0.5 rounded font-semibold">1-Click Test</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Profile Card */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#6B1426] text-white flex items-center justify-center font-bold text-base">
                    {currentResult?.studentName?.charAt(0) || 'S'}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">{currentResult?.studentName || 'Student Name'}</h4>
                    <p className="text-stone-600 font-mono text-[11px]">Register No: {currentResult?.registerNumber}</p>
                    <p className="text-[#7E192E] font-medium text-[11px]">{currentResult?.courseTitle} · {currentResult?.semester}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 self-start sm:self-auto"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>

              {/* Academic Metrics */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-stone-400 block text-[11px]">Semester SGPA</span>
                  <span className="font-bold font-mono text-base text-stone-900">{currentResult?.sgpa || '8.84'}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold block">{currentResult?.resultStatus || 'Distinction'}</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-stone-400 block text-[11px]">Cumulative Attendance</span>
                  <span className="font-bold font-mono text-base text-emerald-800">89.2%</span>
                  <span className="text-[10px] text-stone-500 block">Eligible for Exams</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-stone-400 block text-[11px]">Autonomous Credits</span>
                  <span className="font-bold font-mono text-base text-stone-900">76 / 132</span>
                  <span className="text-[10px] text-stone-500 block">NEP Compliant</span>
                </div>
              </div>

              {/* Registered Courses & Internal Marks */}
              <div>
                <h5 className="font-semibold text-stone-900 mb-2">Registered Autonomous Papers & Examination Statement</h5>
                <div className="border border-stone-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 text-[11px]">
                      <tr>
                        <th className="p-2.5">Code</th>
                        <th className="p-2.5">Subject</th>
                        <th className="p-2.5">Internal</th>
                        <th className="p-2.5">External</th>
                        <th className="p-2.5">Total</th>
                        <th className="p-2.5">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 font-mono text-[11px]">
                      {currentResult?.subjects?.map((sub, i) => (
                        <tr key={i}>
                          <td className="p-2.5 font-bold text-stone-800">{sub.code}</td>
                          <td className="p-2.5 font-sans font-medium text-stone-900">{sub.name}</td>
                          <td className="p-2.5 text-stone-600">{sub.internalMarks}</td>
                          <td className="p-2.5 text-stone-600">{sub.externalMarks}</td>
                          <td className="p-2.5 font-bold text-stone-900">{sub.totalMarks}</td>
                          <td className="p-2.5 text-emerald-700 font-bold">{sub.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Downloads & Action items */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => alert(`Official Provisional Marksheet for Reg No: ${currentResult?.registerNumber} generated and sent to print queue.`)}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download Provisional Grade Card (PDF)
                </button>
                <button
                  onClick={() => alert(`Examination Hall Ticket for Odd-Even Semester 2026 is validated.`)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> View Exam Hall Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
